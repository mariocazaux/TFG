## 1. Configuración de Supabase Storage

- [x] 1.1 Crear script SQL `storage.sql` con la definición de los buckets `avatars` y `vehicles` y sus políticas RLS públicas de lectura y restringidas (auth) para inserción.
- [x] 1.2 Añadir variables de entorno de Supabase en `environment.ts` y `environment.development.ts`.

## 2. Backend API

- [x] 2.1 En `vehicle.controller.ts`, modificar `createVehicle` para recibir y guardar `color`, `displacement_cc`, `engine_specs` y `main_image_url`.
- [x] 2.2 En `vehicle.controller.ts`, añadir métodos `updateVehicle` y `deleteVehicle`.
- [x] 2.3 Exponer `PUT /:id` y `DELETE /:id` en `vehicle.routes.ts`.

## 3. Frontend: Modal de Añadir Vehículo

- [x] 3.1 Actualizar el FormGroup en `add-vehicle.component.ts` con los nuevos campos (`color`, `engine_specs`, `displacement_cc`).
- [x] 3.2 Añadir validación condicional: si `type === 'motorcycle'`, hacer que `displacement_cc` sea requerido. Si es coche, eliminar validación.
- [x] 3.3 Habilitar el modo de edición añadiendo un input `@Input() vehicleToEdit`, rellenando el formulario inicial si existe, y llamando a `PUT` en lugar de `POST`.
- [x] 3.4 Añadir lógica con `@supabase/supabase-js` para subir el archivo seleccionado de imagen al bucket `vehicles` antes del submit, y usar su URL pública.
- [x] 3.5 Actualizar `add-vehicle.html` para mostrar los inputs de Color, Especificaciones, Cilindrada condicional, y selector de foto.

## 4. Frontend: Página de Perfil y Garaje

- [x] 4.1 En `vehicle-card.component.ts`, crear los `@Output() edit` y `@Output() delete` y mostrarlos en el HTML.
- [x] 4.2 En `profile-page.component.ts`, vincular el evento click del avatar a un selector oculto para subir una imagen al bucket `avatars`.
- [x] 4.3 Manejar los eventos de edición abriendo el modal con los datos y el evento de borrado lanzando un HTTP `DELETE` previo `confirm()`.
