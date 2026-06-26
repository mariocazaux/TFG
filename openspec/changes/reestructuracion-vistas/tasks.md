## 1. AuthGuard & Sesión

- [x] 1.1 Revisar `AuthGuard` y `AuthService` para verificar la lectura del token de Supabase en `localStorage`. (Entorno local y producción).
- [x] 1.2 Unificar el key del token (actualmente `kachaoo_auth_token` vs `supabase_token`) para asegurar que la sesión persiste correctamente en todas las rutas SPA protegidas por el guard.

## 2. Refactorización Modular y Arquitectura SCSS (Figma Fidelity)

- [x] 2.1 Estandarizar SCSS global utilizando la estructura ITCSS existente en `src/styles/`: añadir utilidades/mixins en `src/styles/utilities/` y variables en `src/styles/settings/` para los efectos de Figma (glassmorphism, glows y gradientes).
- [x] 2.2 Creación de componentes compartidos: Generar componentes UI reutilizables (p.ej. `<app-event-card>`, `<app-route-card>`) en `src/app/shared/components/` para evitar repetición de HTML a lo largo de las vistas `event-feed`, `create-event`, etc.
- [x] 2.3 Refactorizar `event-feed` y `map-explore` para usar los nuevos componentes, eliminando todos los estilos hardcodeados locales y forzando el consumo de clases globales de `src/styles/`.
- [x] 2.4 Estandarizar variables TypeScript (nombres de interfaces, variables inyectadas) en estos componentes aplicando `clean code` (ej. `inject()` de Angular 17+).

## 3. Ajuste del Explorador de Mapas (`map-explore` basado en `Home.tsx`)

- [x] 3.1 Implementar el layout de mapa flotante (Glassmorphism) mostrado en `Home.tsx`, incluyendo la barra de búsqueda superior flotante y los controles superpuestos.
- [x] 3.2 Limitar la altura del contenedor principal o mantenerlo a pantalla completa pero con las superposiciones correctas, asegurando que no rompa la barra de navegación lateral.

## 4. Refactorización Global de Código Heredado (Legacy)

- [x] 4.1 Extraer componentes UI repetidos (p.ej. botones primarios, inputs de texto, validadores) a `src/app/shared/components/`.
- [x] 4.2 Revisar TODAS las vistas anteriores (ej. Auth/Login, Profile) y reemplazar sus formularios y botones por los nuevos componentes de UI compartidos.
- [x] 4.3 Purgar los archivos SCSS locales de los componentes antiguos para eliminar las definiciones de color y estilos estructurales, forzándolos a depender del directorio `src/styles/`.
