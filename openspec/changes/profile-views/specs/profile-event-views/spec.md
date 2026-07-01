## ADDED Requirements

### Requirement: Ver eventos apuntados en el perfil

Los usuarios pueden consultar la lista completa de eventos a los que se han apuntado directamente desde la pestaña "Quedadas" en su página de perfil.

#### Scenario: Visualización de eventos apuntados

- **GIVEN** un usuario autenticado que está apuntado a al menos un evento
- **WHEN** navega a su perfil y hace clic en la pestaña "Quedadas"
- **THEN** el sistema debe mostrar una cuadrícula de tarjetas (`EventCardComponent`)
- **AND** cada tarjeta debe corresponder a un evento en el que participa.

#### Scenario: Desapuntarse desde el perfil

- **GIVEN** un usuario viendo sus eventos apuntados en el perfil
- **WHEN** el usuario hace clic en "Desapuntarse" en la tarjeta de un evento
- **THEN** el evento es eliminado de la vista de "Mis Quedadas" de forma inmediata
- **AND** se envía la petición de borrado al backend para mantener sincronización.
