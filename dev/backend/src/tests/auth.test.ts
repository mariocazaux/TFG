import 'dotenv/config';
import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../index.ts';

// Mockeamos el cliente de supabase para no hacer peticiones reales y evitar 'email rate limit exceeded'
vi.mock('../config/supabase', () => {
  return {
    supabase: {
      auth: {
        signUp: vi.fn().mockImplementation(({ email }) => {
          if (!email) {
            return { error: { message: 'Falta email' } };
          }
          return {
            data: {
              user: { email, id: 'test-user-id' },
              session: { access_token: 'fake-jwt-token-register' },
            },
            error: null,
          };
        }),
        signInWithPassword: vi.fn().mockImplementation(({ email, password }) => {
          if (password === 'WrongPassword!') {
            return {
              error: { message: 'Invalid credentials' },
              data: { user: null, session: null },
            };
          }
          return {
            data: {
              user: { email, id: 'test-user-id' },
              session: { access_token: 'fake-jwt-token-login' },
            },
            error: null,
          };
        }),
      },
    },
  };
});

describe('Auth Endpoints', () => {
  const testEmail = `testuser@example.com`;
  const testPassword = 'SecurePassword123!';
  const testUsername = 'testuser123';

  it('Debería registrar un nuevo usuario y devolver JWT', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: testEmail,
      password: testPassword,
      username: testUsername,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
    expect(res.body).toHaveProperty('session');
    expect(res.body.session).toHaveProperty('access_token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testEmail);
  });

  it('Debería fallar al registrar si faltan campos', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: testEmail,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Faltan campos obligatorios (email, password, username).');
  });

  it('Debería iniciar sesión y devolver JWT con las credenciales correctas', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Inicio de sesión exitoso');
    expect(res.body).toHaveProperty('session');
    expect(res.body.session).toHaveProperty('access_token');
  });

  it('Debería fallar al iniciar sesión con contraseña incorrecta', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'WrongPassword!',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Credenciales inválidas.');
  });
});
