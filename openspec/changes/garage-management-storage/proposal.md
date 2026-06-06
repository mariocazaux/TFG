# Proposal: Gestión Avanzada de Garaje y Formulario de Vehículo

## Contexto y Problema

Actualmente, el registro de vehículos es muy básico, utilizando imágenes mockeadas ("placeholders") y no permite la edición ni el borrado de vehículos. Además, el formulario carece de campos importantes que ya existen en la base de datos como `color`, `engine_specs` y `displacement_cc`. Por otro lado, no es posible subir un avatar personalizado.

## Solución Propuesta

Implementar la subida real de imágenes a Supabase Storage y habilitar un ciclo de vida completo (CRUD) para los vehículos del garaje, además de extender el formulario.

1. **Supabase Storage:** Crear buckets públicos (`avatars` y `vehicles`) con políticas RLS (Row Level Security) para permitir la subida únicamente a usuarios autenticados.
2. **Ampliación del CRUD (Backend):** Crear endpoints `PUT` y `DELETE` en `vehicle.controller.ts` para permitir editar y eliminar vehículos, comprobando que el `owner_id` corresponde al usuario actual.
3. **Extensión del Formulario (Frontend):**
   - Añadir selector de color (rojo, azul, verde, negro, blanco, amarillo, plata, gris).
   - Añadir input de texto para `engine_specs`.
   - Añadir input numérico para `displacement_cc` condicionado a `type === 'motorcycle'`.
   - Soporte para subida de imagen principal del vehículo.
4. **Gestión de Garaje (Frontend):** Las tarjetas de vehículos (`vehicle-card`) incluirán botones para "Editar" y "Eliminar". Se podrá subir un avatar personalizado haciendo clic en la imagen de perfil actual.
