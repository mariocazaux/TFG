## 1. SCSS Architecture & Design Tokens Setup

- [x] 1.1 Crear la estructura de directorios ITCSS (`settings`, `tools`, `generic`, `elements`, `objects`, `components`, `utilities`) dentro de `dev/frontend/src/styles/`.
- [x] 1.2 Analizar el Figma y extraer los tokens de color a `styles/settings/_settings.colors.scss` (ej. `$color-primary`, `$color-background`).
- [x] 1.3 Extraer los tokens de tipografía y espaciado a `styles/settings/_settings.typography.scss` y `_settings.spacing.scss`.
- [x] 1.4 Configurar el archivo raíz `dev/frontend/src/styles.scss` para importar todas las capas ITCSS en el orden correcto.

## 2. Core Elements & BEM Utilities

- [x] 2.1 Definir los estilos globales básicos (body, h1-h6, a) en la capa `elements` utilizando las variables de `settings`.
- [x] 2.2 Crear clases de utilidad genéricas (flexbox, márgenes, contenedores) en la capa `utilities` necesarias para la maqueta.

## 3. Landing Page Component Generation

- [x] 3.1 Generar el componente `LandingPage` (Standalone) en la carpeta `src/app/features/landing/` usando Angular CLI.
- [x] 3.2 Configurar el enrutador en `app.routes.ts` para que la ruta raíz (`''`) cargue el `LandingPageComponent`.

## 4. UI Implementation (Figma to Code)

- [x] 4.1 Implementar la estructura HTML del `Header` en la Landing Page, asegurando que el logo o texto muestre el nuevo nombre **"Kachaoo"**.
- [x] 4.2 Estilar el `Header` aplicando metodología BEM (ej. `header`, `header__logo`, `header__nav`) en su respectivo archivo SCSS o en la capa `components`.
- [x] 4.3 Implementar la sección `Hero` (Mobile-First) guiándose estrictamente por el prototipo de Figma y usando clases BEM (ej. `hero`, `hero__title`, `hero__cta`).
- [x] 4.4 Implementar el resto de secciones visibles de la Landing Page siguiendo la fidelidad visual (sombras, radios, espaciados) del prototipo.

## 5. Verification

- [x] 5.1 Comprobar que la vista es 100% responsiva (Mobile-First hacia Desktop) redimensionando el navegador.
- [x] 5.2 Confirmar que no hay errores de compilación SCSS ni errores en la consola de Angular.
