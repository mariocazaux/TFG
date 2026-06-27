## Why

Actualmente, tras la reestructuración de las vistas de Quedadas y Rutas, ciertos elementos UI (botones, inputs, títulos y fondos) han perdido los estilos consistentes del diseño de la aplicación. Para mantener la cohesión con la arquitectura Neon/Glassmorphism y el prototipo de Figma original, es necesario aplicar explícitamente los componentes compartidos (como `<app-button>`, `<app-form-input>`) y los mixins globales (`gradient-text`, fondos). Además, se detectó una experiencia confusa en los Empty States de eventos, mostrando mensajes temporales en lugar de una pantalla vacía clara.

## What Changes

- Reemplazar los botones nativos en `event-feed`, `map-explore`, `create-event` y `create-route` por `<app-button>`.
- Reemplazar los inputs nativos en los formularios de `create-event` y `create-route` por `<app-form-input>`.
- Aplicar mixins de texto degradado (`gradient-text`) en los títulos (`h2`) de `event-feed` y en los laterales de creación.
- Modificar el Empty State de la vista `event-feed` para que, cuando no haya eventos después de cargar, se muestre un contenedor (glassmorphism) con un icono de "pin" y texto descriptivo.
- Establecer el color de fondo azul estándar de la aplicación en el submenú superior de `map-explore`, para que la superposición con el mapa se vea integrada.

## Capabilities

### New Capabilities

- `ui-visual-tweaks`: Ajustes cosméticos y de usabilidad (Empty States y componentes UI compartidos) en las vistas de mapas, eventos y formularios.

### Modified Capabilities

## Impact

- **Componentes Afectados**: `event-feed.ts/.html/.scss`, `map-explore.scss/.html`, `create-event.scss/.html`, `create-route.scss/.html`.
- **Experiencia de Usuario**: Mejora significativa de la consistencia visual y la percepción de calidad del diseño (Mobile-First y Neon).
- **Arquitectura de CSS**: Consolida la dependencia de `_tools.mixins.scss` en lugar de código cosmético disperso.
