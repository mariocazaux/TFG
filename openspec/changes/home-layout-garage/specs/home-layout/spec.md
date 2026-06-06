## ADDED Requirements

### Requirement: Layout UI

El esqueleto principal de la app debe mostrar un panel lateral en escritorio y una barra de navegación inferior en móviles, respetando el diseño de "Layout" de Figma. Debe incluir opciones para Mapa, Eventos, Rutas y Garaje.

#### Scenario: User opens app on Desktop

- **WHEN** the user navigates to `/app` with a screen width >= 1024px.
- **THEN** the left sidebar is visible, and the bottom mobile navigation is hidden.

#### Scenario: User opens app on Mobile

- **WHEN** the user navigates to `/app` with a screen width < 1024px.
- **THEN** the top header and bottom mobile navigation are visible, and the left sidebar is hidden.

### Requirement: Protected Routing

La ruta `/app` y sus rutas hijas deben estar protegidas y solo ser accesibles para usuarios autenticados.

#### Scenario: Unauthenticated access

- **WHEN** an unauthenticated user navigates to `/app/profile`.
- **THEN** they are redirected to `/auth` by the `AuthGuard`.
