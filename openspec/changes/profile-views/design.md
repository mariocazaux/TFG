## Context

Actualmente `ProfilePageComponent` solo muestra los vehículos del usuario ("Mi Garaje"). Con los recientes cambios introducidos en el Feed (`feed-interactivity`), el usuario puede guardar rutas y apuntarse a quedadas. Estos elementos interactuados deben ser accesibles directamente desde su perfil personal.

El componente `EventFeedComponent` introdujo un sistema de pestañas (`activeTab`) que cambia la vista entre eventos y rutas.

## Goals / Non-Goals

**Goals:**

- Extender `events.controller.ts` para devolver los detalles completos de los eventos a los que el usuario asiste.
- Extender `routes.controller.ts` para devolver los detalles completos de las rutas guardadas por el usuario.
- Modificar `ProfilePageComponent` para tener tres pestañas: "Garaje" (por defecto), "Quedadas" y "Rutas".
- Reutilizar `EventCardComponent` y `RouteCardComponent` en el perfil del usuario sin necesidad de duplicar lógica visual.
- Permitir la desvinculación (desapuntarse / quitar de guardados) directamente desde la tarjeta renderizada en el perfil, eliminándola localmente del array en memoria si se tiene éxito, para reflejar el cambio inmediato.

**Non-Goals:**

- No se implementarán perfiles públicos de otros usuarios en esta iteración. Toda esta lógica está diseñada para el propio perfil autenticado.
- No se modificará la estructura de base de datos, pues `event_attendees` y `route_bookmarks` ya existen y están aseguradas con RLS.

## Decisions

1. **Obtención de Datos Backend**: Para los eventos, `GET /api/events/my-attended-events` hará una query SQL usando Supabase:
   `.from('event_attendees').select('events(*, organizer:profiles!events_organizer_id_fkey(username, avatar_url, full_name), attendees:event_attendees(count))')`
   Esta estructura anidada de PostgREST devolverá el evento entero basándose en la relación.
   Análogamente para `route_bookmarks`.

2. **Frontend UI Tabs**:
   Se añadirá una variable `activeTab = signal<'garage' | 'events' | 'routes'>('garage');` en `ProfilePageComponent`.
   Se renderizará el HTML condicionalmente usando `@if (activeTab() === '...')`.

3. **Inyección de Estados de Frontend**:
   Las tarjetas necesitan las flags booleanas `isAttending` e `isBookmarked` a `true`. Ya que el endpoint `/my-attended-events` devuelve exclusivamente lo que asiste, en el mapeo de RxJS/Signals, se forzará `isAttending = true` para todos los elementos recibidos. Al hacer "Desapuntarse", simplemente se filtra y se quita de la lista `events` del perfil.

## Risks / Trade-offs

- **Consultas anidadas en Supabase**: Traer objetos relacionados (`events(*, ...)`) a través de una tabla de unión (`event_attendees`) requiere que el modelo Foreign Key esté bien referenciado. Si las referencias no son bidireccionales por defecto, la consulta de PostgREST puede requerir especificar la Foreign Key explicitamente en la cadena del `select()`.
- **Rendimiento**: Cargar todo el perfil de golpe (vehículos, rutas guardadas, eventos apuntados) requerirá 3 llamadas HTTP en `ngOnInit()`. Se considera aceptable para esta fase en lugar de usar un mega-endpoint GraphQL.
