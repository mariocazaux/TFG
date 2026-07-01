## ADDED Requirements

### Requirement: Introducir hora explícita al crear un evento

El formulario de creación de eventos debe permitir introducir la hora exacta de la quedada además del día.

#### Scenario: Usuario rellena el formulario de evento con hora

- **GIVEN** que el usuario está en el formulario de "Crear Quedada"
- **WHEN** introduce la fecha y una hora específica en el campo de hora (`time`)
- **THEN** el evento se guarda con esa hora asignada en la base de datos

### Requirement: Mostrar la hora en la tarjeta de evento

Las tarjetas de evento en el feed deben mostrar la hora (además del día) para facilitar la organización.

#### Scenario: Visualización del horario del evento

- **GIVEN** que un evento tiene un campo temporal de fecha y hora
- **WHEN** la tarjeta se renderiza
- **THEN** la interfaz debe mostrar la hora legible (ej. "10:30 AM") junto al día de la quedada
