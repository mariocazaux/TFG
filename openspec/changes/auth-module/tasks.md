## 1. Configuración de Base de Datos (Supabase)

- [x] 1.1 Configurar el cliente de `@supabase/supabase-js` en el backend para la conexión a la base de datos y validación de credenciales (Afecta a Local y Producción).
- [x] 1.2 Verificar en el entorno local (variables `.env`) que existen los campos `SUPABASE_URL` y `SUPABASE_KEY` necesarios para operar con Auth.

## 2. Desarrollo Backend (Node.js/Express)

- [x] 2.1 Implementar endpoint genérico para el registro `POST /api/auth/register` delegando en la API de Supabase `auth.signUp` y devolviendo sesión.
- [x] 2.2 Implementar endpoint genérico para el inicio de sesión `POST /api/auth/login` delegando en la API de Supabase `auth.signInWithPassword` y devolviendo sesión JWT.
- [x] 2.3 Crear los tests unitarios/E2E para confirmar que ambos endpoints devuelven el token JWT correctamente antes de conectar con el frontend.

## 3. Desarrollo Frontend (Angular)

- [x] 3.1 Generar componente `AuthComponent` en la ruta `/auth` y servicio `AuthService` para la gestión de las peticiones HTTP al backend.
- [x] 3.2 Implementar el maquetado visual en HTML del `AuthComponent` basado estrictamente en el diseño de `Auth.tsx` de Figma (incluyendo la división Login/Registro).
- [x] 3.3 Implementar la hoja de estilos en SCSS usando BEM, con las clases de utilidades de los colores y extrayendo los media queries al bloque `RESPONSIVE`.
- [x] 3.4 Conectar el formulario de registro al `AuthService` y validar manejo de errores (ej. "El correo ya existe").
- [x] 3.5 Conectar el formulario de inicio de sesión al `AuthService` y guardar el token JWT recibido en LocalStorage/Signal global.
- [x] 3.6 Implementar sistema de pestañas guiado por parámetros de ruta (`?tab=register` y `?tab=login`) para intercambiar la vista dinámicamente sin recargar la página completa.
