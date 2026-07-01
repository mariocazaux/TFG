## ADDED Requirements

### Requirement: Toggle Event Attendance

Los usuarios autenticados pueden apuntarse a eventos y cancelar su asistencia si ya están apuntados. El botón en la UI debe reflejar el estado actual ("Asistir" vs "Desapuntarse").

#### Scenario: User attends an event

- **GIVEN** an authenticated user who is not attending the event
- **WHEN** the user clicks "Asistir"
- **THEN** the system adds the user to the event attendees
- **AND** the button text changes to "Desapuntarse" and button style changes to secondary
- **AND** the attendee count increments by 1

#### Scenario: User cancels attendance

- **GIVEN** an authenticated user who is already attending the event
- **WHEN** the user clicks "Desapuntarse"
- **THEN** the system removes the user from the event attendees
- **AND** the button text changes to "Asistir" and button style changes to primary
- **AND** the attendee count decrements by 1
