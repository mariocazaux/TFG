## Why

El usuario ha detectado varios problemas de experiencia de usuario (UX) y arquitectura en las vistas principales que requieren una reestructuración. Actualmente, la navegación entre páginas internas solicita volver a iniciar sesión de forma incorrecta (fallo en el AuthGuard o persistencia del token). Además, el mapa en la sección de exploración ocupa toda la pantalla, lo que dificulta la navegación y va en contra del diseño general.
Finalmente, se ha determinado la necesidad urgente de revisar todo el código implementado anteriormente para factorizarlo, modularizarlo y crear componentes UI globales (formularios, tarjetas, botones), asegurando que el 100% de la aplicación cumpla estrictamente con los principios DRY, SOLID y las normativas BEM especificadas en `config.yaml`.

## What Changes

- **Corrección de AuthGuard/AuthService**: Revisar y arreglar la persistencia del token (localStorage) para que la navegación por el Router de Angular no expulse al usuario.
- **Rediseño de `map-explore`**: Ajustar el contenedor del mapa para que ocupe un espacio más reducido en pantalla, dejando lugar a otros elementos UI.
- **Reestructuración de variables y componentes**:
  - **Refactorización Global (Legacy Code)**: Revisión de todo el código creado previamente para modularizar, reutilizar clases y extraer elementos comunes (formularios, botones, layouts) a componentes de Angular (`src/app/shared/components`).
  - **Reutilización y Factorización (DRY)**: Creación de componentes Angular reutilizables (ej. `<app-event-card>`, `<app-route-card>`) para evitar la duplicación de HTML presente en el prototipo de Figma.
  - Unificación de estilos utilizando la estructura ITCSS existente en `src/styles` (`components/`, `elements/`, `settings/`, `utilities/`). Los efectos recurrentes de Figma (gradientes, glows) se integrarán en estos archivos ya existentes sin inventar arquitecturas nuevas.
  - **Fidelidad al Figma (Proyecto Completo)**: La UI de Figma es la fuente de verdad. Trasladaremos sus tokens de diseño a nuestras variables SCSS existentes en `src/styles/settings` para que TODO el proyecto comparta la estética _Premium/High-End_.
  - Refactorización de las variables dentro de los componentes TypeScript para mayor claridad, cumpliendo con SOLID y clean code.

## Capabilities

### New Capabilities

- `ui-restructuring`: Reestructuración visual de contenedores, tamaños de mapa y variables compartidas.
- `auth-guard-fix`: Persistencia correcta de la sesión al navegar sin recargar la página.

### Modified Capabilities

- `<existing-name>`:

## Impact

- `dev/frontend/src/app/core/guards/auth.guard.ts` y/o `auth.service.ts`
- `dev/frontend/src/app/features/map-explore/map-explore.scss`
- SCSS de `create-event`, `create-route` y `event-feed` para adaptarlos a clases globales.
- Componentes en TypeScript que necesiten renombrado de variables.
