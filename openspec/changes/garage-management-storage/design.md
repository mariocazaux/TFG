# Design Document

## Arquitectura

La funcionalidad se apoyará en **Supabase Storage** y la API existente de **Express**.

### Supabase Storage

Se emplearán dos buckets públicos (`avatars`, `vehicles`).
El cliente de Angular, mediante la librería `@supabase/supabase-js`, realizará la subida del archivo directamente a Supabase (usando el Bearer token almacenado en local storage para cumplir las RLS). Esto evita enviar el archivo en Base64 o FormData a través del backend Express, descargando de trabajo al servidor NodeJS.

### Backend (Express)

Se modificarán los endpoints en `vehicle.controller.ts`:

- `POST /api/vehicles`: Aceptará los nuevos campos (`color`, `displacement_cc`, `engine_specs`) y la `main_image_url` obtenida desde el frontend tras la subida a Storage.
- `PUT /api/vehicles/:id`: Endpoint nuevo para actualizar los datos.
- `DELETE /api/vehicles/:id`: Endpoint nuevo para eliminar el vehículo.

### Frontend (Angular)

- **domain.models.ts**: Se reutilizarán las propiedades ya existentes (`color`, `engineSpecs`, `displacementCc`, `mainImageUrl`).
- **add-vehicle.component.ts**: Se añadirá lógica para leer un vehículo existente mediante un `@Input() vehicleToEdit`, lo que poblará el formulario para la edición. Se añadirá también validación dinámica condicional para `displacement_cc`.
- **profile-page.component.ts**: Centralizará el control de eventos (abrir modal de edición, confirmación de borrado, recarga de la lista de vehículos).
