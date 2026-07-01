## Context

Actualmente el Feed (compuesto por tarjetas de Quedadas y Rutas) solo sirve como vista de lectura ("Read"). Los botones para editar, eliminar, asistir a un evento o guardar una ruta están en la UI pero carecen de manejadores de eventos. El backend ya tiene configurada parte de la lógica (ej. crear asistencias mediante `POST /events/:id/attend`, borrar rutas/eventos), pero faltan endpoints complementarios para leer el estado del usuario y eliminar asistencias o bookmarks.

El modelo frontend en Angular 18 utiliza Signals para almacenar `events()` y `routes()`.

## Goals / Non-Goals

**Goals:**

- Que un usuario logueado pueda ver visualmente a qué eventos asiste y qué rutas tiene guardadas en el Feed.
- Permitir al usuario apuntarse y desapuntarse de las quedadas en tiempo real.
- Permitir guardar y quitar rutas de favoritos.
- Poder eliminar un evento o ruta propio pidiendo confirmación.
- Reutilizar `CreateEventComponent` y `CreateRouteComponent` en modo edición pasándoles un `:id` por la ruta.

**Non-Goals:**

- No se implementarán perfiles de usuario completos o vista de "Mis Rutas Guardadas" en este cambio (se limitará la lógica a su visualización en el feed).
- No se enviarán notificaciones PUSH u otro tipo de alertas a los organizadores.

## Decisions

1. **Gestión de estado en Frontend**: En lugar de hacer una consulta SQL `LEFT JOIN` gigantesca y compleja para todos, el frontend hará peticiones a `/api/events/my-attendances` y `/api/routes/my-bookmarks` nada más cargar las listas principales. Luego actualizará el Signal local para inyectar `isAttending` o `isBookmarked` en memoria, reduciendo carga y complejidad RLS en Supabase.
2. **Modo Edición paramétrico**: `CreateEventComponent` verificará en su `ngOnInit` si la URL tiene un parámetro `:id` (`ActivatedRoute`). Si es así, entrará en modo de actualización (`PUT /api/events/:id`). Esto evita duplicar formularios.
3. **Reutilización de Modales**: Se usará `ConfirmModalComponent` con `@if` en la vista, activándolo programáticamente antes de llamar a `deleteEvent` o `deleteRoute`.

## Risks / Trade-offs

- **Condiciones de Carrera (Race conditions)**: Si el usuario pulsa "Asistir" repetidas veces antes de que el servidor responda, podría intentar insertar duplicados en `event_attendees`. Esto está parcialmente mitigado por la restricción UNIQUE en la base de datos (se captura el error `23505`), pero el botón debe deshabilitarse (`disabled`) mientras la petición HTTP está "en vuelo".
- **Limites de Aforo**: Al desapuntarse de un evento, el número `attendees[0].count` debe decrementar en la UI sin necesidad de refrescar la página, esto requerirá manipulación directa del Signal.
