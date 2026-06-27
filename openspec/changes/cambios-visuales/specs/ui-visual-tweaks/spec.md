## ADDED Requirements

### Requirement: Consistencia de Botones e Inputs

Todos los formularios y vistas clave (`event-feed`, `map-explore`, `create-event`, `create-route`) deben renderizar inputs y botones usando los componentes compartidos.

#### Scenario: Botones principales renderizados

- **WHEN** un usuario visualiza el botón "Crear Quedada" o "Crear Ruta"
- **THEN** este se renderiza usando el componente `<app-button>` (o heredando su estilo exacto), encajando en el ecosistema visual de la app.

### Requirement: Estética Neon y Títulos

Los títulos principales deben reflejar la estética de la app.

#### Scenario: Título Próximas Quedadas

- **WHEN** el usuario ingresa al feed de quedadas
- **THEN** el título "Próximas Quedadas" muestra un texto con degradado (`gradient-text`).

### Requirement: Empty States Claros

Las listas vacías deben guiar al usuario visualmente sin causar confusión con los estados de carga.

#### Scenario: Feed de Quedadas sin elementos

- **WHEN** la aplicación termina de cargar la lista de quedadas y el resultado es vacío
- **THEN** la pantalla muestra un contenedor estilo glassmorphism en el centro con un icono grande de una chincheta (pin) y un texto descriptivo.
- **AND THEN** no se muestra ningún texto de "Cargando eventos...".

### Requirement: Barra superior de Map Explore

El contenedor superior en el modo exploración debe tener alta legibilidad.

#### Scenario: Navegación en Explorar Mapa

- **WHEN** el usuario está en `map-explore`
- **THEN** la barra de navegación superior flota sobre el mapa y tiene un color de fondo azul coherente, junto a su efecto glassmorphism.
