## ADDED Requirements

### Requirement: AuthGuard Session Retention

El `AuthGuard` debe permitir la navegación entre componentes protegidos (`/app/*`) siempre y cuando exista un token válido en `localStorage`, independientemente de si la navegación es por carga directa de URL o por enrutamiento SPA.

#### Scenario: Client-side Navigation

- **GIVEN** el usuario ha iniciado sesión y tiene el token guardado en `localStorage`
- **WHEN** el usuario hace clic en un enlace a otra página dentro de `/app/` (ej. de Mi Garaje a Explorar Mapa)
- **THEN** la vista de Explorar Mapa debe renderizarse sin pedir inicio de sesión.
