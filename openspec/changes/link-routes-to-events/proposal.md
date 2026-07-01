## Why

Actualmente en la aplicación, las "Rutas" (mapas, trazados) y los "Eventos" (quedadas en un momento específico) están completamente separados. Los usuarios no pueden organizar una quedada para hacer una ruta específica de manera nativa. Además, los eventos no tienen un campo de "hora" explícito en la creación, lo que dificulta la organización precisa de las quedadas. Este cambio resuelve ambas necesidades permitiendo vincular una ruta a un evento y añadiendo la hora.

## What Changes

- Se añadirá una columna opcional `route_id` a la tabla `events` en Supabase.
- Se añadirá un campo `time` a la tabla `events` en Supabase (o se integrará en un único campo de tipo TIMESTAMP que contenga la hora, dependiendo del diseño final en `design.md`).
- El formulario de "Crear Quedada" se actualizará para incluir un selector de rutas del usuario (las que tenga guardadas o creadas) y un campo de hora (`<input type="time">`).
- La vista de tarjetas de evento (`EventCardComponent`) se actualizará para mostrar la hora exacta y, si el evento tiene una ruta asociada, mostrar un indicador visual y un enlace o mini-mapa de la ruta.
- El endpoint `GET /events` se modificará para devolver la información de la ruta asociada usando joins de PostgREST.

## Capabilities

### New Capabilities

- `event-route-linking`: Permite a los usuarios seleccionar una ruta opcional al crear una quedada y visualizar dicha ruta en la tarjeta de evento.
- `event-time-scheduling`: Añade precisión horaria a la programación de los eventos, permitiendo seleccionar la hora exacta de encuentro.

### Modified Capabilities

- N/A

## Impact

- **Base de Datos**: Requiere añadir campos `route_id` (foreign key) y `time` (o modificar `date` a timestamp) en la tabla `events`.
- **API REST**: Los endpoints de creación y obtención de eventos en `events.controller.ts` deben manejar los nuevos campos.
- **Frontend (UI/UX)**: Formularios en `create-event.ts` y tarjetas en `EventCardComponent`.
- **Entorno**: Estos cambios aplican tanto a local como a producción y requerirán ejecutar comandos SQL en Supabase para alterar la tabla `events`.
