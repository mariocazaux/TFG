## Context

El proyecto (TFG) necesita implementar su primera página (Landing Page) para establecer la primera impresión visual y atraer a los usuarios de la comunidad de motor. Tenemos un diseño aprobado en Figma que hay que trasladar a código. Además, para garantizar que la aplicación escale de forma limpia a nivel de estilos, necesitamos implementar desde este primer componente una base sólida de CSS usando la arquitectura ITCSS, metodología BEM y un sistema de "Design Tokens" mapeados directamente desde Figma. También se ha decidido actualizar el "naming" del proyecto a "Kachaoo".

## Goals / Non-Goals

**Goals:**

- Implementar la UI responsiva (Mobile-First) de la Landing Page utilizando Angular Standalone Components.
- Extraer los tokens visuales (colores, fuentes, espaciados) del prototipo de Figma y traducirlos a variables SCSS.
- Estructurar los estilos globales bajo la arquitectura ITCSS (creando las capas `settings`, `tools`, `generic`, `elements`, `objects`, `components`, `utilities`).
- Aplicar la convención de nomenclatura BEM en las clases HTML/CSS de la Landing Page.

**Non-Goals:**

- No se implementarán formularios funcionales, autenticación, ni llamadas reales a la base de datos (Supabase) en esta fase. Solo estructura visual.
- No se crearán componentes genéricos complejos (como DatePickers o Modals) si no son requeridos inmediatamente por la Landing.

## Decisions

- **ITCSS + BEM**: Angular ya ofrece `ViewEncapsulation` para aislar estilos, pero usar ITCSS + BEM para los estilos globales y estructurales es una excelente práctica de ingeniería de software que asegura consistencia entre todos los componentes y evita la especificidad excesiva (uno de los grandes problemas en proyectos grandes).
- **Design Tokens en SCSS**: Las variables de Figma se extraerán a la capa `settings` de ITCSS (`_settings.colors.scss`, `_settings.typography.scss`). Todos los componentes deberán referenciar estas variables, sin colores "hardcodeados".
- **Enrutamiento**: La Landing Page será el componente asociado a la ruta vacía `path: ''` en el router principal de Angular.

## Risks / Trade-offs

- **Riesgo**: Sobreingeniería inicial en la configuración de estilos ITCSS.
  - **Mitigación**: Crearemos la jerarquía de carpetas ITCSS, pero solo añadiremos archivos para las capas que realmente usemos ahora (Settings, Generic, Objects, Components).
- **Riesgo**: Desincronización con futuros cambios de diseño en Figma.
  - **Mitigación**: Usar nombres semánticos para los tokens (`$color-primary`, `$font-size-lg`) en lugar de nombres literales (`$color-red`, `$size-24px`) para que el código no deba reescribirse si el diseño cambia los valores.
