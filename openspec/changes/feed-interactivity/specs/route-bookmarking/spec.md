## ADDED Requirements

### Requirement: Bookmark Routes

Los usuarios autenticados pueden guardar rutas en sus favoritos y quitarlas si ya las tienen guardadas. El botón de la tarjeta reflejará este estado de forma dinámica.

#### Scenario: User bookmarks a route

- **GIVEN** an authenticated user and a route not yet bookmarked
- **WHEN** the user clicks the "Guardar" button on a route card
- **THEN** the system adds the route to the user's bookmarks
- **AND** the button text changes to "Guardado"

#### Scenario: User removes bookmark

- **GIVEN** an authenticated user who has bookmarked a route
- **WHEN** the user clicks "Guardado"
- **THEN** the system removes the route from bookmarks
- **AND** the button text changes back to "Guardar"
