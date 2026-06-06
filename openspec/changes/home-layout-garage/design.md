## Context

Tras finalizar el registro y login (Landing v1.0), el usuario necesita un entorno privado (`/app`) donde pueda navegar y gestionar sus datos. Actualmente la base de datos de Supabase está creada con soporte RLS. Necesitamos crear las vistas de layout y garaje de la aplicación e integrarlas correctamente, solucionando los problemas de importaciones cruzadas que surgieron anteriormente y aplicando accesibilidad (`for`/`id` en inputs).

## Goals / Non-Goals

**Goals:**

- Proteger la ruta `/app` utilizando un `AuthGuard` funcional.
- Crear `HomeLayoutComponent` con lazy loading en `app.routes.ts`.
- Crear `ProfilePageComponent` y sus subcomponentes (`VehicleCardComponent`, `AddVehicleComponent`).
- El formulario de `AddVehicleComponent` debe tener identificadores explícitos (`id`) vinculados a sus etiquetas (`for` en el `label`) para cumplir con `config.yaml`.
- Crear el backend endpoint en Express `POST /api/vehicles` y estructurarlo adecuadamente en `vehicle.routes.ts` y `vehicle.controller.ts`.
- Asegurar que el backend pase el token del frontend a Supabase para cumplir con las políticas RLS.

**Non-Goals:**

- Implementar la funcionalidad completa del "Mapa", "Rutas" o "Chat" en este ciclo.
- Implementar subida de imágenes de vehículos (por ahora usaremos imágenes de stock o placeholder de Unsplash).

## Decisions

- **Arquitectura de Frontend:** Se usarán Angular Standalone Components para simplificar las importaciones y evitar el uso de NgModules. Las rutas hijas se definirán directamente en `app.routes.ts`.
- **Accesibilidad del Formulario:** Para cumplir con la regla del config.yaml, todo `<label>` incluirá un atributo `for` que coincida con el `id` del `<input>` o `<select>` correspondiente en `AddVehicleComponent`.
- **Autenticación en el Backend:** Se implementará un cliente Supabase por petición en `vehicle.controller.ts` que inyecte el JWT del usuario en la cabecera `Authorization` a nivel global (`global.headers`), garantizando así que la base de datos asuma el rol del usuario y se cumpla el RLS (`auth.uid() = owner_id`).

## Risks / Trade-offs

- **Complejidad de RLS:** Si el token JWT caduca, el usuario recibirá un error al guardar. El frontend debe estar preparado para redirigir al login en caso de 401.
- **Rutas Relativas vs Absolutas:** El manejo de importaciones relativas (ej. `../components/add-vehicle`) puede dar lugar a errores (como los que obligaron a hacer rollback). Se deben revisar minuciosamente las rutas de importación de los _standalone components_.
