## ADDED Requirements

### Requirement: Profile & Garage View

El usuario puede ver una cabecera de perfil que muestre su nombre, bio, estadísticas, y un listado de tarjetas de sus vehículos en la sección "Mi Garaje".

#### Scenario: View Garage

- **WHEN** the authenticated user navigates to `/app/profile`.
- **THEN** they see their profile header and a list of `VehicleCard` elements representing their stored vehicles.
