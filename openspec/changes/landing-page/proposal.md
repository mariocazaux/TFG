## Why

El objetivo es establecer la primera impresión de la aplicación (enfocada a entusiastas del motor) creando la Landing Page inicial basada fielmente en el diseño aprobado en Figma. Se actualiza el nombre del proyecto en el frontend de "RevUp" a "Kachaoo". Además, necesitamos asentar una base escalable y sólida para la arquitectura de estilos CSS desde el primer día, utilizando SCSS, metodología BEM, arquitectura ITCSS y Design Tokens extraídos de Figma.

## What Changes

- Creación de una Landing Page en Angular (Standalone Components), siguiendo el enfoque Mobile-First y estética Premium.
- Actualización del branding: el nombre que aparece en el Header pasará a ser "Kachaoo".
- Estructuración global de los estilos SCSS bajo el estándar ITCSS (Inverted Triangle CSS) y la metodología de nombres BEM (Block Element Modifier).
- Definición de Design Tokens globales (colores, tamaños, fuentes) en SCSS basados en las variables del documento de Figma.

## Capabilities

### New Capabilities

- `landing-page-ui`: Implementación visual responsiva (Mobile-First) de la Landing Page siguiendo el diseño de Figma, con el nombre "Kachaoo" en el Header.
- `global-design-system`: Infraestructura global de estilos SCSS (ITCSS + BEM) y generación de tokens de diseño globales.

### Modified Capabilities

## Impact

- **Frontend (Angular):** Reestructuración del archivo `styles.scss` y creación de una jerarquía de carpetas de estilos (Settings, Tools, Generic, Elements, Objects, Components, Utilities).
- **Frontend (Routing):** Creación y asignación del componente de Landing a la ruta raíz `/`.
- **Diseño (Figma):** Extracción activa de tokens desde el prototipo para crear las variables base.
- **Entornos:** Los cambios serán visibles inmediatamente en `local` y, una vez integrados, en `produccion` (Render Static Site).
