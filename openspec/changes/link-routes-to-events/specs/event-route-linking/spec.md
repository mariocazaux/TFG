## ADDED Requirements

### Requirement: Vincular ruta durante la creación de evento

Al crear un evento, el usuario debe tener la opción de seleccionar una ruta que haya guardado o creado previamente para asociarla a la quedada.

#### Scenario: Usuario selecciona una ruta para la quedada

- **GIVEN** que el usuario está en el formulario de "Crear Quedada"
- **WHEN** abre el selector de rutas y escoge una ruta existente
- **THEN** el evento se guarda correctamente asociado a dicha ruta

#### Scenario: Usuario crea evento sin ruta (Quedada estática)

- **GIVEN** que el usuario está en el formulario de "Crear Quedada"
- **WHEN** deja el selector de rutas vacío y envía el formulario
- **THEN** el evento se guarda correctamente sin ruta asociada

### Requirement: Visualización de ruta en la tarjeta de evento

Las tarjetas de evento (`EventCardComponent`) en el Feed y en el Perfil deben mostrar claramente si el evento tiene una ruta asociada.

#### Scenario: Evento con ruta asociada

- **GIVEN** que un evento en el feed tiene una ruta vinculada
- **WHEN** la tarjeta se renderiza
- **THEN** debe aparecer un indicador visual ("📍 Incluye Ruta: [Nombre]")

#### Scenario: Evento sin ruta asociada

- **GIVEN** que un evento en el feed NO tiene una ruta vinculada
- **WHEN** la tarjeta se renderiza
- **THEN** no debe mostrar ningún indicador de ruta y debe mostrarse como un meetup normal
