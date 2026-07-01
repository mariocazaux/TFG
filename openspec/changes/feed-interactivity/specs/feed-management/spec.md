## ADDED Requirements

### Requirement: Delete Content

Los usuarios pueden eliminar eventos y rutas que hayan sido creados por ellos mismos desde el Feed.

#### Scenario: User deletes their own event

- **GIVEN** a user who is the creator of an event shown in the feed
- **WHEN** the user clicks "Eliminar"
- **THEN** a confirmation modal is shown
- **WHEN** the user confirms the deletion
- **THEN** the event is deleted from the backend
- **AND** the event is removed from the feed UI immediately

### Requirement: Edit Content

Los usuarios pueden editar eventos y rutas que hayan sido creados por ellos mismos desde el Feed.

#### Scenario: User edits their own route

- **GIVEN** a user who is the creator of a route shown in the feed
- **WHEN** the user clicks "Editar"
- **THEN** the application navigates to the create-route view with the route ID in the URL
- **AND** the form is pre-populated with the route's current data
