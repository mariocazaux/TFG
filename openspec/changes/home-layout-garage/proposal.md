## Why

El usuario acaba de loguearse en la aplicación y necesita un panel principal (Layout) y una vista de "Mi Garaje" funcional que le permita ver sus estadísticas y registrar sus vehículos. Esta funcionalidad es la base del MVP ("Fase 1") de Kachaoo. Además, necesitamos asegurar que el formulario de vehículos envíe datos reales a Supabase y cumpla con las reglas de accesibilidad (`config.yaml`), como que los labels tengan referencia (uso de `for`/`id`).

## What Changes

- Creación del esqueleto principal de la aplicación (`HomeLayoutComponent`) con barra lateral en desktop y barra inferior en dispositivos móviles, utilizando estilos de Figma.
- Creación de la página "Mi Garaje" (`ProfilePageComponent`) para listar vehículos del usuario.
- Implementación de un formulario modal (`AddVehicleComponent`) reactivo y con accesibilidad (`labels` enlazados a `ids`) para añadir vehículos a Supabase (conectado con el endpoint correspondiente o cliente de Supabase).
- Actualización del sistema de rutas (`app.routes.ts`) para proteger la ruta de `/app` con `AuthGuard`.

## Capabilities

### New Capabilities

- `home-layout`: Esqueleto UI de navegación principal para desktop y móvil.
- `profile-garage`: Visualización de datos de perfil y cuadrícula de vehículos.
- `add-vehicle-form`: Formulario modal accesible y validado para la inserción de nuevos vehículos.

### Modified Capabilities

- `<existing-name>`: N/A

## Impact

- Modificación de `dev/frontend/src/app/app.routes.ts` para enrutar el Layout.
- Generación de los componentes en `dev/frontend/src/app/features/home/` y `dev/frontend/src/app/features/profile/`.
- Impacto en el entorno local (y producción una vez desplegado) para las interacciones con la base de datos a través del Backend Express.
- Las variables de entorno para Supabase y URL de la API seguirán funcionando como están (usando el token JWT guardado en localstorage tras el registro/login).
