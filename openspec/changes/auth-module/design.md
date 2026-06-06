## Context

Tras establecer la arquitectura ITCSS/BEM y la Landing Page inicial (Kachaoo), el usuario dispone de enlaces para Iniciar Sesión y Registrarse, pero el flujo está vacío.
El backend en Node.js actualmente no tiene el registro de usuarios implementado y el proyecto hace uso de Supabase como base de datos.
Es necesario implementar una conexión Frontend-Backend segura utilizando JSON Web Tokens (JWT).

## Goals / Non-Goals

**Goals:**

- Implementar el componente visual `AuthComponent` en Angular replicando el prototipo de `Auth.tsx` del proyecto Figma exportado.
- Crear los servicios HTTP en Angular (`AuthService`) para enviar peticiones al backend.
- Crear endpoints en el backend de Node.js (`POST /auth/register`, `POST /auth/login`).
- Generar y devolver JWT desde el backend.
- Guardar de forma segura el JWT en el cliente (localStorage/Cookies) y establecer el estado de la sesión mediante Signals.

**Non-Goals:**

- No se implementará recuperación de contraseña en esta iteración.
- No se implementará Social Login (Google, Apple) por el momento.
- No se implementará la gestión completa del perfil avanzado (vehículos y garaje), solo la creación de la cuenta base.

## Decisions

- **Arquitectura UI (Angular):** Se utilizará un único componente de Autenticación (`auth-page`) que mutará entre los estados de "Login" y "Register" basado en Query Params (`?tab=register`), replicando el comportamiento del Figma `Auth.tsx`. Se aplicará la regla estricta de SCSS (media queries agrupados en `RESPONSIVE`).
- **Arquitectura Backend (Node.js):** Se crearán rutas específicas `/api/auth/register` y `/api/auth/login`. Para la persistencia de usuarios, utilizaremos la tabla genérica de usuarios conectada a Supabase mediante su cliente de JS. Se utilizará `bcryptjs` o el sistema nativo de Supabase Auth para las contraseñas. _Dado que usamos Supabase, la decisión óptima es integrar `@supabase/supabase-js` en el backend para crear el usuario en `auth.users` y retornar la sesión (JWT de Supabase)._
- **Validaciones:** Validaciones de formulario reactivas en Angular (`ReactiveFormsModule`).

## Risks / Trade-offs

- **Dependencia de Supabase Auth:** Si usamos Supabase Auth, el JWT es generado por Supabase y no por nuestro JWT_SECRET manual. Esto es un trade-off aceptable y recomendado porque nos ahorra gestionar la criptografía de contraseñas.
- **Seguridad en Frontend:** Guardar el JWT en LocalStorage expone a ataques XSS, pero es el estándar en arquitecturas SPA/PWA simples sin servidor intermedio que inyecte HTTPOnly cookies.
