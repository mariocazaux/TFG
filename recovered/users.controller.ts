import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['SUPABASE_URL'] || '';
const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';

const getUserIdFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payloadBase64Url = parts[1] || '';
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
    const payload = JSON.parse(payloadJson);
    return payload.sub || null;
  } catch (e) {
    return null;
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const followerId = getUserIdFromToken(req);
    if (!followerId) return res.status(401).json({ error: 'No autorizado' });

    const followingId = req.params['id'];
    if (!followingId) return res.status(400).json({ error: 'ID de usuario a seguir requerido' });

    if (followerId === followingId) {
      return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
    }

    const token = req.headers.authorization!.split(' ')[1];
    const userSupabase = createClient(supabaseUrl, process.env['SUPABASE_ANON_KEY'] || '', {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { error } = await userSupabase
      .from('followers')
      .insert([{ follower_id: followerId, following_id: followingId }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(200).json({ message: 'Ya sigues a este usuario' });
      }
      console.error('Error al seguir usuario:', error);
      return res.status(500).json({ error: 'Error al seguir usuario' });
    }

    return res.status(200).json({ message: 'Usuario seguido correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const followerId = getUserIdFromToken(req);
    if (!followerId) return res.status(401).json({ error: 'No autorizado' });

    const followingId = req.params['id'];
    if (!followingId) return res.status(400).json({ error: 'ID de usuario a dejar de seguir requerido' });

    const token = req.headers.authorization!.split(' ')[1];
    const userSupabase = createClient(supabaseUrl, process.env['SUPABASE_ANON_KEY'] || '', {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { error } = await userSupabase
      .from('followers')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) {
      console.error('Error al dejar de seguir usuario:', error);
      return res.status(500).json({ error: 'Error al dejar de seguir usuario' });
    }

    return res.status(200).json({ message: 'Has dejado de seguir al usuario' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getPublicProfile = async (req: Request, res: Response) => {
  try {
    const requestedUserId = req.params['id'];
    if (!requestedUserId) return res.status(400).json({ error: 'ID de usuario requerido' });

    const currentUserId = getUserIdFromToken(req);
    
    // We can use the service role key to fetch public profile data if RLS allows anon access,
    // or just use anon key. We'll use service_role to ensure we get data, or anon if RLS is public.
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, bio')
      .eq('id', requestedUserId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    // Check if following
    let isFollowing = false;
    if (currentUserId) {
      const { data: followData } = await supabase
        .from('followers')
        .select('*')
        .eq('follower_id', currentUserId)
        .eq('following_id', requestedUserId)
        .single();
      
      if (followData) {
        isFollowing = true;
      }
    }

    // Get follower count
    const { count: followersCount } = await supabase
      .from('followers')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', requestedUserId);

    return res.status(200).json({
      ...profile,
      isFollowing,
      followersCount: followersCount || 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
