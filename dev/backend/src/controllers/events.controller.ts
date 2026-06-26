import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const createEvent = async (req: Request, res: Response) => {
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

    const { title, description, event_date, max_attendees, location } = req.body;

    if (!title || !event_date || !location || !Array.isArray(location)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios o ubicación inválida' });
    }

    const geojson = {
      type: 'Point',
      coordinates: location, // [lng, lat]
    };

    const { data, error } = await userSupabase
      .from('events')
      .insert({
        organizer_id: userData.user.id,
        title,
        description,
        event_date,
        max_attendees,
        location_coords: geojson,
      })
      .select()
      .single();

    if (error) {
      console.error('Error insertando evento:', error);
      return res
        .status(500)
        .json({ error: 'Error interno guardando el evento', details: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('events')
      .select(
        `
        *,
        organizer:profiles(username, avatar_url, full_name),
        attendees:event_attendees(count)
      `,
      )
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error obteniendo eventos:', error);
      return res.status(500).json({ error: 'Error interno obteniendo eventos' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

export const attendEvent = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Falta el token de autorización' });
    }
    const token = authHeader.split(' ')[1];
    const eventId = req.params.id;

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

    // Comprobar aforo máximo usando count
    const { data: eventData, error: eventError } = await userSupabase
      .from('events')
      .select(`max_attendees, attendees:event_attendees(count)`)
      .eq('id', eventId)
      .single();

    if (eventError || !eventData) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    const currentAttendees = eventData.attendees[0]?.count || 0;

    if (eventData.max_attendees && currentAttendees >= eventData.max_attendees) {
      return res.status(400).json({ error: 'El evento ha alcanzado el límite de asistentes' });
    }

    // Insertar asistencia
    const { error: insertError } = await userSupabase.from('event_attendees').insert({
      event_id: eventId,
      user_id: userData.user.id,
    });

    if (insertError) {
      // Si el código de error es 23505 significa unique violation (ya está apuntado)
      if (insertError.code === '23505') {
        return res.status(400).json({ error: 'Ya estás apuntado a este evento' });
      }
      console.error('Error insertando asistencia:', insertError);
      return res
        .status(500)
        .json({ error: 'Error guardando tu asistencia', details: insertError.message });
    }

    return res.status(200).json({ message: 'Asistencia registrada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
