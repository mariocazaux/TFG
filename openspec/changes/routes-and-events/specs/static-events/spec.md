## ADDED Requirements

### Requirement: Quedadas / Eventos Estáticos

El usuario debe poder organizar encuentros físicos (eventos estáticos) definiendo una ubicación exacta en el mapa mediante un marcador (Pin), además de establecer el límite máximo de asistentes.

#### Scenario: Fijar la ubicación de un evento

- **GIVEN** que el usuario está autenticado y accede a "Crear Quedada"
- **WHEN** hace clic en el mapa de ubicación (Figma: Seleccionar punto de encuentro)
- **THEN** aparece un Pin en las coordenadas exactas seleccionadas.

#### Scenario: Creación exitosa de una quedada

- **GIVEN** que se ha seleccionado una ubicación estática en el mapa
- **WHEN** el usuario completa el título, descripción, fecha/hora, límite de asistentes y envía el formulario
- **THEN** el sistema guarda el evento en la base de datos (PostGIS) asegurando que `location_coords` contiene la geometría del punto (Point) exacto.

#### Scenario: Límite de asistencia

- **GIVEN** que un evento tiene un límite de asistentes (ej. 10 plazas) y ya está lleno
- **WHEN** un usuario adicional intenta pulsar el botón "Asistir"
- **THEN** el sistema debe denegar la acción y mostrar visualmente que el evento ha alcanzado su aforo máximo.
