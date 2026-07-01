import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const createRoute = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { title, description, vehicle_category, difficulty, coordinates, distance_km } = req.body;

    if (!title || !coordinates || !Array.isArray(coordinates)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios o coordenadas inválidas' });
    }

    // PostgREST transforma un objeto GeoJSON automáticamente en PostGIS GEOMETRY
    const geojson = {
      type: 'LineString',
      coordinates: coordinates, // array of [lng, lat]
    };

    const { data, error } = await userSupabase
      .from('routes')
      .insert({
        creator_id: userData.user.id,
        title,
        description,
        vehicle_category: vehicle_category || 'both',
        difficulty: difficulty || 'medium',
        path_coords: geojson,
        distance_km,
      })
      .select()
      .single();

    if (error) {
      console.error('Error insertando ruta:', error);
      return res
        .status(500)
        .json({ error: 'Error interno guardando la ruta', details: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    // Para endpoints públicos (si las rutas son públicas), usamos Service Role o anon key
    // En este caso, reutilizamos cliente normal (que tiene anon key)
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('routes')
      .select(
        `
        *,
        creator:profiles!routes_creator_id_fkey(username, avatar_url, full_name)
      `,
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo rutas:', error);
      return res.status(500).json({ error: 'Error interno obteniendo rutas' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getRouteById = async (req: Request, res: Response) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const routeId = req.params.id;

    const { data, error } = await supabase
      .from('routes')
      .select(`*, creator:profiles!routes_creator_id_fkey(username, avatar_url, full_name)`)
      .eq('id', routeId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const updateRoute = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const routeId = req.params.id;
    const { title, description, vehicle_category, difficulty, coordinates, distance_km } = req.body;

    if (!title || !coordinates || !Array.isArray(coordinates)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios o coordenadas inválidas' });
    }

    const geojson = {
      type: 'LineString',
      coordinates: coordinates,
    };

    const { data, error } = await userSupabase
      .from('routes')
      .update({
        title,
        description,
        vehicle_category: vehicle_category || 'both',
        difficulty: difficulty || 'medium',
        path_coords: geojson,
        distance_km,
      })
      .eq('id', routeId)
      .eq('creator_id', userData.user.id) // Only allow update if user is the creator
      .select()
      .single();

    if (error) {
      console.error('Error actualizando ruta:', error);
      return res
        .status(500)
        .json({ error: 'Error interno actualizando la ruta o no tienes permisos' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const routeId = req.params.id;

    const { error } = await userSupabase
      .from('routes')
      .delete()
      .eq('id', routeId)
      .eq('creator_id', userData.user.id);

    if (error) {
      console.error('Error borrando ruta:', error);
      return res.status(500).json({ error: 'Error interno borrando la ruta o no tienes permisos' });
    }

    return res.status(200).json({ message: 'Ruta eliminada con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const bookmarkRoute = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];
    const routeId = req.params.id;

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { error: insertError } = await userSupabase.from('route_bookmarks').insert({
      route_id: routeId,
      user_id: userData.user.id,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(400).json({ error: 'Ya tienes guardada esta ruta' });
      }
      console.error('Error guardando ruta:', insertError);
      return res
        .status(500)
        .json({ error: 'Error al guardar la ruta', details: insertError.message });
    }

    return res.status(200).json({ message: 'Ruta guardada con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const unbookmarkRoute = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];
    const routeId = req.params.id;

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { error: deleteError } = await userSupabase
      .from('route_bookmarks')
      .delete()
      .eq('route_id', routeId)
      .eq('user_id', userData.user.id);

    if (deleteError) {
      console.error('Error quitando ruta guardada:', deleteError);
      return res
        .status(500)
        .json({ error: 'Error al quitar ruta guardada', details: deleteError.message });
    }

    return res.status(200).json({ message: 'Ruta quitada de guardados con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getMyBookmarks = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];

    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: userData, error: userError } = await userSupabase.auth.getUser();
    if (userError || !userData.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { data, error } = await userSupabase
      .from('route_bookmarks')
      .select('route_id')
      .eq('user_id', userData.user.id);

    if (error) {
      console.error('Error obteniendo mis rutas guardadas:', error);
      return res.status(500).json({ error: 'Error interno obteniendo rutas guardadas' });
    }

    const routeIds = data.map((item: any) => item.route_id);
    return res.status(200).json(routeIds);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
