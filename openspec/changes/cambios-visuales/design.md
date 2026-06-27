## Context

En refactorizaciones anteriores se migraron algunas vistas a componentes globales y estilos compartidos (ITCSS), pero las vistas de creación (`create-route`, `create-event`), el feed (`event-feed`) y el mapa (`map-explore`) mantuvieron algunos estilos antiguos o perdieron su integración nativa con los nuevos componentes (`<app-button>`, `<app-form-input>`).

## Goals / Non-Goals

**Goals:**

- Asegurar que todas las vistas clave usen los componentes UI estándar (`app-button`, `app-form-input`).
- Aplicar diseño Neon/Glassmorphism a encabezados, fondos y paneles flotantes usando `tools.mixins`.
- Mejorar el Empty State de Quedadas para que sea intuitivo visualmente.

**Non-Goals:**

- Modificar lógica de negocio, enrutamiento o consumo de APIs.
- Crear nuevos componentes globales aparte de los que ya existen.

## Decisions

- **`<app-button>` y `<app-form-input>`**: Se inyectarán directamente en lugar de usar `<input>` y `<button>` con clases nativas.
- **Empty State en Event Feed**: Se reemplazará el simple texto con un contenedor que aplique `mixins.glassmorphism` y un icono "pin".
- **Floating Header en Map Explore**: Se pintará de azul corporativo el fondo además del glassmorphism para mejor legibilidad sobre el mapa.

## Risks / Trade-offs

- Posibles desajustes de padding o alineación al cambiar tags nativos por Web Components (`app-button`, `app-form-input`), lo que requerirá pruebas visuales una vez aplicados.
