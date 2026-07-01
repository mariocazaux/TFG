## Why

Actualmente, el perfil del usuario solo muestra la sección de "Mi Garaje" con sus vehículos. Sin embargo, el usuario puede interactuar con rutas (guardándolas) y con eventos (apuntándose a ellos) desde el Feed. Es fundamental que el usuario pueda consultar estos elementos de forma centralizada en su perfil personal para mejorar la usabilidad, la navegación y gestionar sus asistencias o rutas guardadas sin tener que buscarlas de nuevo en el Feed general.

## What Changes

1. **Backend**:
   - Se creará un nuevo endpoint `GET /api/events/my-attended-events` en `events.controller.ts` para devolver los objetos completos de los eventos a los que el usuario asiste. Esto requiere hacer un JOIN lógico (o múltiple select) en Supabase apoyándose en la tabla `event_attendees`.
   - Se creará un nuevo endpoint `GET /api/routes/my-bookmarked-routes` en `routes.controller.ts` para devolver las rutas guardadas del usuario apoyándose en `route_bookmarks`.

2. **Frontend**:
   - `ProfilePageComponent` pasará a tener un sistema de pestañas similar a `EventFeedComponent`: "Garaje", "Quedadas", y "Rutas".
   - Cuando se seleccione una pestaña, se mostrará su respectiva grid con `VehicleCardComponent`, `EventCardComponent`, o `RouteCardComponent`.
   - Se añadirá el manejo de eventos a estas tarjetas para que, si el usuario hace click en "Desapuntarse" o "Quitar de Guardados" directamente en su perfil, el cambio se refleje al instante (optimistic update).

## Capabilities

### New Capabilities

- `profile-event-views`: Permite a los usuarios consultar y administrar los eventos a los que asisten desde su perfil.
- `profile-route-views`: Permite a los usuarios consultar y administrar sus rutas guardadas desde su perfil.

### Modified Capabilities

- N/A

## Impact

- **API REST**: Se añadirán endpoints en `events.routes.ts` y `routes.routes.ts`. Se deberá tener cuidado para no solapar la definición de rutas (por ejemplo `/events/:id` vs `/events/my-attended-events`).
- **ProfilePageComponent**: La vista crecerá y manejará un estado más complejo con arrays `events`, `routes` y `vehicles` utilizando Angular Signals.
- **Componentes de Tarjeta**: `EventCardComponent` y `RouteCardComponent` serán reutilizados sin necesidad de modificaciones (ya cuentan con outputs `attend` y `bookmark`).
- **Entorno**: Este cambio afecta a la interacción base de datos de producción/local, pero no cambia el esquema de BBDD, simplemente añade nuevas queries complejas.
