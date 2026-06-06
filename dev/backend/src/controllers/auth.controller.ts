import type { Request, Response } from 'express';
import { supabase } from '../config/supabase.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: 'Faltan campos obligatorios (email, password, username).' });
    }

    // 1. Sign up en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // 2. Retornar sesión si todo va bien
    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: authData.user,
      session: authData.session,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(500).json({ error: 'Error interno del servidor', details: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (email, password).' });
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: authData.user,
      session: authData.session, // Contiene access_token (JWT) y refresh_token
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(500).json({ error: 'Error interno del servidor', details: errorMessage });
  }
};
