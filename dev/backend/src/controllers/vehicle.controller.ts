import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];

    // Crear cliente de Supabase asumiendo la identidad del usuario para cumplir con RLS
    const userSupabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { brand, model, year, type } = req.body;

    if (!brand || !model || !year || !type) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const { data, error } = await userSupabase
      .from('vehicles')
      .insert([
        {
          owner_id: user.id,
          brand,
          model,
          year,
          type,
          // Mock image for MVP
          main_image_url:
            type === 'car'
              ? 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400'
              : 'https://images.unsplash.com/photo-1606927131353-c0ad17d60b56?auto=format&fit=crop&q=80&w=400',
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Vehículo creado exitosamente', vehicle: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error interno desconocido';
    return res.status(500).json({ error: 'Error interno del servidor', details: errorMessage });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
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

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { data, error } = await userSupabase
      .from('vehicles')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ vehicles: data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error interno desconocido';
    return res.status(500).json({ error: 'Error interno del servidor', details: errorMessage });
  }
};
