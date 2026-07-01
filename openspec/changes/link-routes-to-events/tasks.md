## 1. Base de Datos (Supabase)

- [x] 1.1 Ejecutar script SQL en Supabase para añadir `ALTER TABLE events ADD COLUMN time TIME;` y `ALTER TABLE events ADD COLUMN route_id UUID REFERENCES routes(id) ON DELETE SET NULL;`.

## 2. Backend (Express)

- [x] 2.1 En `events.controller.ts`, modificar `createEvent` para que acepte y guarde los campos `time` y `route_id`.
- [x] 2.2 En `events.controller.ts`, modificar las funciones `getAllEvents`, `getEventById` y `getMyAttendedEvents` para que incluyan `, route:routes(*)` en su `.select()`.
- [x] 2.3 En `domain.models.ts` (tanto en backend si existe, como en frontend), actualizar las interfaces `EventData` / `BackendEvent` para incluir `time?: string`, `route_id?: string` y `route?: RouteData`.

## 3. Frontend: Formulario de Creación

- [x] 3.1 En `CreateEventComponent` (`create-event.ts`), añadir los controles `time` y `route_id` al `FormGroup`.
- [x] 3.2 En el método `ngOnInit` de `CreateEventComponent`, realizar una petición `GET /routes/my-routes` (o reutilizar el que devuelva las creadas por el usuario) para poblar el signal de rutas seleccionables.
- [x] 3.3 En `create-event.html`, añadir el `<app-form-input type="time">` para la hora.
- [x] 3.4 En `create-event.html`, añadir un selector `<select>` (o equivalente visual) para el campo `route_id` que itere sobre las rutas obtenidas.

## 4. Frontend: Visualización de Tarjetas

- [x] 4.1 En `EventCardComponent` (`event-card.ts` y `.html`), renderizar la hora del evento junto con la fecha.
- [x] 4.2 En `EventCardComponent`, si existe el campo `event.route`, mostrar un indicador visual ("📍 Incluye Ruta: [Nombre de la Ruta]").
- [x] 4.3 Al hacer click en el indicador de la ruta en la tarjeta del evento, expandir o abrir un modal que muestre la previsualización (mapa) de la ruta usando el componente `MapBox` o simplemente un enlace (routerLink) a los detalles de la ruta.
