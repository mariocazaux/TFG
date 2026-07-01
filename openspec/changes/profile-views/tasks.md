## 1. Backend: Endpoints para datos completos

- [x] 1.1 En `events.controller.ts`, implementar `GET /api/events/my-attended-events` que use PostgREST para hacer join con `event_attendees` devolviendo los eventos completos.
- [x] 1.2 En `routes.controller.ts`, implementar `GET /api/routes/my-bookmarked-routes` que haga lo mismo pero con `route_bookmarks` para devolver rutas completas.
- [x] 1.3 Registrar los nuevos endpoints en `events.routes.ts` y `routes.routes.ts` (asegurar el orden de rutas para evitar colisiones con `:id`).

## 2. Frontend: Navegación por Pestañas

- [x] 2.1 En `ProfilePageComponent` (TS), crear la variable reactiva (Signal) `activeTab` para cambiar entre 'garage', 'events' y 'routes'.
- [x] 2.2 En `profile-page.html`, modificar la interfaz añadiendo los botones de las pestañas al estilo del feed, y envolver el contenido del garaje en `@if (activeTab() === 'garage')`.

## 3. Frontend: Carga de Datos en Perfil

- [x] 3.1 En `ProfilePageComponent` (TS), crear las funciones `loadMyAttendedEvents()` y `loadMyBookmarkedRoutes()` y almacenar resultados en Signals `attendedEvents` y `bookmarkedRoutes`.
- [x] 3.2 Modificar el mapeo de RxJS para que los eventos traídos tengan la propiedad `isAttending = true`, y las rutas tengan `isBookmarked = true` por defecto (dado que provienen de estos endpoints específicos).

## 4. Frontend: Renderizado e Interactividad

- [x] 4.1 En `profile-page.html`, añadir las cuadrículas (`events-grid`) para las pestañas de 'events' y 'routes' usando `EventCardComponent` y `RouteCardComponent`.
- [x] 4.2 Conectar el evento `(attend)` del EventCard para que, si el usuario hace "Desapuntarse", lance la petición DELETE al backend y remueva el evento del signal `attendedEvents` localmente.
- [x] 4.3 Conectar el evento `(bookmark)` del RouteCard para que lance la petición DELETE y remueva la ruta del signal `bookmarkedRoutes` localmente.
