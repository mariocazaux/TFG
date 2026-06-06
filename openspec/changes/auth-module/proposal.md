## Why

Actualmente la aplicación cuenta con la Landing Page (Kachaoo) estructurada con un diseño visual completo, pero los botones de acción ("Iniciar Sesión" y "Registrarse") no tienen funcionalidad.
Es fundamental implementar el módulo de autenticación de forma temprana para cerrar el flujo inicial de onboarding de los usuarios, establecer los cimientos de la seguridad mediante JSON Web Tokens (JWT) en el backend (Node.js), y preparar el terreno para las vistas protegidas (`/app`, `/profile`, `/events`). Hacerlo ahora evitará tener que "mockear" sesiones más adelante.

## What Changes

Se implementarán las pantallas de **Inicio de Sesión** y **Registro** tomando como fuente de verdad visual el archivo `Auth.tsx` exportado del proyecto de Figma.
El módulo de Angular se encargará del formulario y validaciones, y se creará el servicio HTTP que comunicará con el backend en Node.js. En el backend, se implementarán los controladores necesarios para registrar un usuario y autenticarlo, devolviendo los JWT correspondientes. Este proceso configurará también la base de datos de usuarios en Supabase.

_Entornos afectados:_

- A nivel local y producción será necesario revisar que las variables de entorno de Supabase y JWT (`JWT_SECRET`) estén correctamente configuradas.

## Capabilities

### New Capabilities

- `user-authentication`: Manejo del registro de nuevos usuarios, inicio de sesión y gestión del almacenamiento local seguro de tokens JWT. Incluye el UI fiel al prototipo de Figma (Mobile-First, estilo Dark/Neon).

### Modified Capabilities

- N/A

## Impact

- **Frontend:** Nuevo módulo `auth` en Angular (`features/auth`), configuración del sistema de routing (`/auth`), e implementación de Guards (opcional en futuras vistas).
- **Backend:** Nuevos endpoints REST en Node.js/Express (`POST /auth/register`, `POST /auth/login`).
- **Base de Datos:** Inicialización de las tablas de usuarios manejadas por Supabase Auth o tablas personalizadas de usuarios.
- **Entorno:** Se requerirán ajustes en las variables de entorno para manejar los tokens JWT.
