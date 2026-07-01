## Context

Las quedadas (eventos) y las rutas están actualmente aisladas. Si alguien quiere quedar para hacer una ruta, debe indicarlo en la descripción del evento y la hora de la quedada se sobreentiende con la fecha y la descripción. Añadir un enlace nativo entre eventos y rutas, junto con un control preciso de horario, mejora sustancialmente la utilidad de la aplicación.

## Goals / Non-Goals

**Goals:**

- Añadir campo `route_id` (foreign key referenciando a `routes.id`) en la tabla `events`.
- Modificar el campo temporal de `events`. Si el campo actual `date` es un DATE, se debe migrar/modificar o añadir un campo `time` de tipo TIME, o combinarlos en un `meeting_time` (TIMESTAMP WITH TIME ZONE).
- Permitir a los usuarios vincular sus rutas (o crear una nueva durante el flujo si se desea, aunque de base solo las suyas guardadas/creadas) a la quedada.
- Reflejar visualmente en la tarjeta de evento (Feed) que incluye ruta, y la hora exacta.

**Non-Goals:**

- Unificar las tablas de eventos y rutas. Deben seguir siendo conceptos separados (Composition over Inheritance).
- No se implementará por el momento navegación paso a paso nativa al evento, simplemente se enlaza a la previsualización de la ruta.

## Decisions

1. **Gestión de Fecha y Hora en BD**:
   Actualmente la tabla `events` usa un campo de fecha. Se propone añadir un campo `time` de tipo `TIME` (e.g., '10:00:00') o convertir el almacenamiento a un solo TIMESTAMP `date_time`. Para simplificar compatibilidad con el frontend y no romper datos existentes, añadiremos un campo `time` independiente (tipo TIME).

2. **Foreign Key `route_id`**:
   Se añadirá a `events` referenciando `routes.id` con `ON DELETE SET NULL`. Si se borra la ruta original, el evento sobrevive pero pierde la asociación a la ruta.

3. **Modificación de los Endpoints**:
   En `events.controller.ts`, el `getAllEvents`, `getEventById` y `getMyAttendedEvents` (creado recientemente) tendrán que incluir `routes(*)` en su `.select()` de PostgREST:
   `select('*, organizer:profiles(...), attendees:event_attendees(count), route:routes(*)')`

4. **UI del Formulario (Angular)**:
   En `create-event.html`, añadiremos un `<app-form-input type="time" formControlName="time">`.
   También añadiremos un `select` o dropdown para seleccionar la ruta. Antes de esto, el componente `CreateEventComponent` deberá precargar las rutas del usuario (`GET /routes` o similar) para poblar el dropdown.

## Risks / Trade-offs

- **Migración de Datos**: Los eventos existentes no tienen el campo `time` ni `route_id`. Se deben considerar nulos o manejar valores por defecto (ej. hora 00:00) en el frontend si no existe.
- **Rendimiento**: Hacer un join adicional hacia `routes` para todos los eventos del feed añade un ligero coste extra, pero PostgREST (Supabase) lo gestiona eficientemente.
