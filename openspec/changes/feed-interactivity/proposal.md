## Why

Actualmente, las tarjetas de Rutas y Quedadas (Eventos) en el Feed muestran botones de acción ("Asistir", "Guardar", "Editar", "Eliminar") pero carecen de funcionalidad real. Es necesario implementar la interactividad completa para que los usuarios puedan apuntarse a quedadas, guardar rutas en favoritos, y gestionar (editar/eliminar) los elementos que han creado.

Este cambio resuelve la falta de interacción en el Feed principal y conecta las tablas de base de datos existentes (`event_attendees` y `route_bookmarks`) con el frontend en Angular.

## What Changes

- **Backend (Express)**: Se añaden endpoints para interactuar con eventos y rutas (`DELETE /events/:id/attend`, `GET /events/my-attendances`, `POST /routes/:id/bookmark`, `DELETE /routes/:id/bookmark`, `GET /routes/my-bookmarks`).
- **Frontend (Angular)**:
  - Los componentes de tarjeta `EventCardComponent` y `RouteCardComponent` se actualizan para reflejar si el usuario asiste a la quedada o ha guardado la ruta (cambio visual del botón).
  - El componente principal `EventFeedComponent` obtiene el estado de asistencias y favoritos del usuario al cargar los datos y gestiona los eventos de los botones (ConfirmModalComponent para eliminar).
  - Configuración de edición paramétrica (`/app/create-event/:id` y `/app/create-route/:id`) donde los componentes de creación cargan los datos previos mediante un GET y hacen patchValue al formulario.

## Capabilities

### New Capabilities

- `event-attendance`: Permite a los usuarios apuntarse y desapuntarse de quedadas.
- `route-bookmarking`: Permite a los usuarios guardar y eliminar rutas de favoritos.
- `feed-management`: Permite eliminar y editar rutas o quedadas creadas por el usuario desde el feed.

### Modified Capabilities

## Impact

- **API REST**: Se extenderán los controladores `events.controller.ts` y `routes.controller.ts` y sus respectivos archivos de rutas.
- **Frontend State**: Uso avanzado de Signals en `EventFeedComponent` para inyectar `isAttending` e `isBookmarked` tras llamadas a la API.
- **Formularios**: `CreateEventComponent` y `CreateRouteComponent` soportarán modo edición al recibir un `:id`.
- **Entorno**: Este cambio afecta a desarrollo local y producción, requiriendo validación contra la base de datos Supabase configurada.
