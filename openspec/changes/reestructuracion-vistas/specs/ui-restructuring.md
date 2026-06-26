## ADDED Requirements

### Requirement: Map Layout Size

El mapa en la página `map-explore` no debe ocupar toda la altura del viewport de forma forzada, sino que debe tener una altura máxima razonable (ej. `60vh` o `600px`), dejando que el layout principal controle la página.

#### Scenario: Viewing Map

- **GIVEN** un usuario en la página de Explorar Mapa
- **WHEN** la pantalla carga
- **THEN** el mapa ocupa una porción controlada de la pantalla, sin hacer desaparecer la barra de navegación o requerir scroll excesivo.

### Requirement: Standardized Styles & Factored Components

Todos los elementos interactivos y tarjetas deben abstraerse en componentes Angular reutilizables (`<app-event-card>`, `<app-route-card>`).
Las clases utilitarias de Tailwind se traducirán a clases dentro del sistema existente en `src/styles/` (BEM/ITCSS), y NO se copiarán localmente en los componentes.

#### Scenario: Theming and Component Reusability

- **GIVEN** un componente de la UI exportado desde Figma (ej. Tarjeta de Evento)
- **WHEN** se implementa en Angular
- **THEN** no debe contener HTML duplicado a lo largo de varias vistas, sino que se renderizará mediante un componente standalone reutilizable, el cual usará mixins y clases globales importadas de `src/styles/` para aplicar sus gradientes y efectos de glow sin definir código de color crudo en su hoja de estilos local.

### Requirement: Global Refactoring of Legacy Code

Todo el código frontend desarrollado previamente a este OpenSpec debe ser auditado y migrado al nuevo sistema de componentes compartidos (`shared/components`).

#### Scenario: Legacy Form Refactoring

- **GIVEN** una vista antigua que contiene un formulario de creación o login
- **WHEN** se audita el código durante esta refactorización
- **THEN** el marcado HTML duplicado del formulario, los botones y los inputs se debe extraer y reemplazar por la llamada a los nuevos componentes globales (ej. `<app-button>`), eliminando las clases CSS redundantes de los archivos SCSS locales.
