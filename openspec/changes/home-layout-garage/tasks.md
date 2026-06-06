## 1. Setup Rutas y Guardián

- [x] 1.1 Implementar `AuthGuard` funcional para verificar que existe un token de sesión.
- [x] 1.2 Configurar `app.routes.ts` para crear la ruta padre `/app` protegida por el guardián.

## 2. Esqueleto Principal (Home Layout)

- [x] 2.1 Crear el componente standalone `HomeLayoutComponent`.
- [x] 2.2 Implementar la plantilla HTML para tener el Sidebar lateral (Desktop) y la barra inferior (Mobile).
- [x] 2.3 Escribir el CSS siguiendo metodología BEM para manejar la responsividad y las transiciones.

## 3. Vista de Garaje (Profile Page)

- [x] 3.1 Crear `ProfilePageComponent` y su estructura HTML/SCSS (cabecera de perfil, bio, estadísticas).
- [x] 3.2 Crear `VehicleCardComponent` para renderizar cada vehículo de la cuadrícula.
- [x] 3.3 Integrar la cuadrícula de vehículos en la vista del perfil.

## 4. Formulario de Añadir Vehículo (Frontend)

- [x] 4.1 Crear componente `AddVehicleComponent` (Modal) y el formulario reactivo con Angular Forms.
- [x] 4.2 **[CRÍTICO]** Configurar la accesibilidad: cada `<label>` debe tener el atributo `for` apuntando al `id` de su respectivo input, como dicta `config.yaml`.
- [x] 4.3 Crear/Actualizar el interceptor HTTP (`auth.interceptor.ts`) e inyectarlo en `app.config.ts` para enviar el token JWT.

## 5. Backend y Supabase (RLS)

- [x] 5.1 Crear el controlador `vehicle.controller.ts` con el endpoint para el POST de vehículos.
- [x] 5.2 **[CRÍTICO]** Extraer el JWT del `Authorization` header en el backend e instanciar el cliente de Supabase asumiendo ese token, garantizando el cumplimiento de las políticas RLS.
- [x] 5.3 Crear `vehicle.routes.ts` y montarlo bajo `/api/vehicles` en `index.ts`.

## 6. Validación y Testing

- [x] 6.1 Comprobar que tanto el frontend como el backend compilan correctamente sin errores de dependencias cruzadas o rutas relativas erróneas.
- [x] 6.2 Ejecutar el flujo completo manualmente (Login -> Perfil -> Añadir Vehículo) y comprobar la consola y el panel de Supabase.
