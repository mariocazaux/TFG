## 1. Modificaciones en Base de Datos (Supabase)

- [x] 1.1 En `schema.sql`, modificar la tabla `routes` para añadir las columnas `vehicle_category` (ENUM o VARCHAR limitados a car/motorcycle/both) y `difficulty` (ENUM o VARCHAR limitados a low/medium/high).
- [x] 1.2 En `schema.sql`, modificar la tabla `events` para añadir la columna `max_attendees` (INT).
- [x] 1.3 Aplicar la migración de `schema.sql` en el entorno local (y posteriormente en producción) usando el CLI de Supabase o SQL Editor.

## 2. Desarrollo Backend (Express)

- [x] 2.1 Crear `routes.controller.ts` y exponer los métodos `createRoute` y `getAllRoutes` (parsesando GeoJSON a PostGIS usando `ST_GeomFromGeoJSON`).
- [x] 2.2 Crear `events.controller.ts` y exponer los métodos `createEvent` (guardando el Point geográfico) y `getAllEvents`.
- [x] 2.3 Implementar el endpoint `POST /events/:id/attend` para registrar la asistencia verificando el límite de `max_attendees`.

## 3. Frontend - Módulo de Rutas (Angular)

- [x] 3.1 Instalar dependencias `leaflet`, `@types/leaflet` y `leaflet-routing-machine` en el proyecto Angular.
- [x] 3.2 Crear `map-explore.component` y configurar el mapa base de Leaflet con OpenStreetMap.
- [x] 3.3 Crear `create-route.component` con el formulario reactivo (Título, Categoría, Dificultad).
- [x] 3.4 Implementar la lógica de clics en el mapa en `create-route.component` para invocar a `leaflet-routing-machine`, renderizar la polilínea resultante y extraer su GeoJSON.
- [x] 3.5 Conectar el submit del formulario con el servicio HTTP para enviar el payload al backend.

## 4. Frontend - Módulo de Eventos Estáticos (Angular)

- [x] 4.1 Crear `create-event.component` con su formulario (Título, Fecha, Descripción, Asistentes máximos).
- [x] 4.2 Integrar un mapa de Leaflet en `create-event.component` que permita al usuario soltar un único marcador (Pin) y extraer sus coordenadas (Point GeoJSON).
- [x] 4.3 Crear `event-feed.component` para listar los eventos próximos consumiendo el API, mostrando visualmente si están llenos o con plazas disponibles.
- [x] 4.4 Integrar el botón "Asistir" en la tarjeta de evento, llamando al endpoint y reflejando el error visualmente si el aforo (max_attendees) está completo.
