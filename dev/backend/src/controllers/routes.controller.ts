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
        creator:profiles(username, avatar_url, full_name)
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
