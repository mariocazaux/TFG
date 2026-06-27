## 1. Ajustes en Event Feed (Quedadas)

- [x] 1.1 Refactorizar el botón "Crear Quedada" en `event-feed.html` para usar `<app-button>`.
- [x] 1.2 Aplicar el mixin `gradient-text` al título `h2` ("Próximas Quedadas") en `event-feed.scss`, importando `tools.mixins`.
- [x] 1.3 Rediseñar el "Empty State" en `event-feed.html` y `event-feed.scss` usando un contenedor con glassmorphism, eliminando mensajes de carga residuales y añadiendo un icono de pin descriptivo.

## 2. Ajustes en Explorar Mapa (Map Explore)

- [x] 2.1 Refactorizar el botón "Crear Ruta" en `map-explore.html` para usar `<app-button>`.
- [x] 2.2 Modificar `.floating-header` en `map-explore.scss` para añadir el color de fondo azul estándar de la app, combinándolo con el glassmorphism actual.

## 3. Ajustes en Formularios de Creación (Create Route & Create Event)

- [x] 3.1 Revisar `create-event.html` y `create-route.html` para asegurar que los inputs y botones usan `<app-form-input>` y `<app-button>`.
- [x] 3.2 Modificar `create-event.scss` y `create-route.scss` para aplicar `gradient-text` en los títulos laterales y `glassmorphism` en el contenedor principal del formulario.
