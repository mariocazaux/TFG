## ADDED Requirements

### Requirement: Ver rutas guardadas en el perfil

Los usuarios pueden consultar la lista completa de rutas que han guardado directamente desde la pestaña "Rutas" en su página de perfil.

#### Scenario: Visualización de rutas guardadas

- **GIVEN** un usuario autenticado que ha guardado al menos una ruta
- **WHEN** navega a su perfil y hace clic en la pestaña "Rutas"
- **THEN** el sistema debe mostrar una cuadrícula de tarjetas (`RouteCardComponent`)
- **AND** cada tarjeta debe corresponder a una ruta guardada por el usuario.

#### Scenario: Quitar ruta de guardados desde el perfil

- **GIVEN** un usuario viendo sus rutas guardadas en el perfil
- **WHEN** el usuario hace clic en "Guardado" en la tarjeta de una ruta para quitarla
- **THEN** la ruta es eliminada de la vista de "Mis Rutas" de forma inmediata
- **AND** se envía la petición de borrado al backend para mantener sincronización.
