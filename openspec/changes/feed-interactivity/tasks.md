## 1. Backend: Endpoints de Eventos

- [x] 1.1 Implementar `DELETE /api/events/:id/attend` en `events.controller.ts` para permitir a un usuario borrar su asistencia.
- [x] 1.2 Implementar `GET /api/events/my-attendances` en `events.controller.ts` para devolver un array con los IDs de eventos a los que asiste el usuario actual.
- [x] 1.3 Registrar las nuevas rutas en `events.routes.ts`.

## 2. Backend: Endpoints de Rutas

- [x] 2.1 Implementar `POST /api/routes/:id/bookmark` en `routes.controller.ts` para guardar una ruta en `route_bookmarks`.
- [x] 2.2 Implementar `DELETE /api/routes/:id/bookmark` en `routes.controller.ts` para eliminar una ruta de guardados.
- [x] 2.3 Implementar `GET /api/routes/my-bookmarks` en `routes.controller.ts` para devolver los IDs guardados por el usuario.
- [x] 2.4 Registrar las nuevas rutas en `routes.routes.ts`.

## 3. Frontend: Componentes de Tarjeta

- [x] 3.1 Actualizar la interfaz `EventData` con la propiedad opcional `isAttending: boolean`.
- [x] 3.2 Modificar el HTML y SCSS de `EventCardComponent` para que si `isAttending` es `true`, el botón diga "Desapuntarse" y cambie su color a secundario/neutro. Emitir el evento de clic.
- [x] 3.3 Actualizar la interfaz `RouteData` con `isBookmarked: boolean`.
- [x] 3.4 Modificar el HTML de `RouteCardComponent` para que el botón de guardar reaccione al estado de `isBookmarked` (ej. texto "Guardado").

## 4. Frontend: Lógica del Feed

- [x] 4.1 En `EventFeedComponent`, modificar `loadEvents` para que tras obtener eventos, llame a `/my-attendances` si el usuario está logueado, y asigne `isAttending` al signal.
- [x] 4.2 Repetir lógica en `loadRoutes` para `/my-bookmarks` y asignar `isBookmarked`.
- [x] 4.3 Implementar manejadores `onAttendEvent` y `onBookmarkRoute` que hagan POST/DELETE a la API y actualicen el Signal reactivamente sin refrescar la página.
- [x] 4.4 Integrar `ConfirmModalComponent` con `@if` en el feed para pedir confirmación al eliminar y enlazarlo con las funciones `requestDeleteEvent` y `requestDeleteRoute`.

## 5. Frontend: Edición Paramétrica

- [x] 5.1 En `app.routes.ts`, añadir rutas para `/create-event/:id` y `/create-route/:id`.
- [x] 5.2 En `event-feed.ts`, programar la redirección en los botones Editar (`router.navigate`).
- [x] 5.3 En `CreateEventComponent`, leer el `id` en el `ngOnInit`. Si existe, hacer GET del evento y rellenar el formulario con `patchValue`.
- [x] 5.4 Repetir paso 5.3 en `CreateRouteComponent` para editar rutas.
