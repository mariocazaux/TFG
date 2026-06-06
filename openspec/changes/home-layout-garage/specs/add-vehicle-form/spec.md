## ADDED Requirements

### Requirement: Add Vehicle Form & Accessibility

El formulario debe ser accesible (cumpliendo `config.yaml`) asignando atributos `for` a todos los `<label>` y usando identificadores (`id`) correspondientes en los controles `<input>`. Además, el backend debe registrar la entrada de forma segura validando al usuario con su token.

#### Scenario: Open modal and see accessible form

- **WHEN** the user clicks "Añadir Vehículo" on the profile page.
- **THEN** a modal opens with a reactive form where every `label` correctly targets an `input` using `for`/`id`.

#### Scenario: Successfully add vehicle

- **WHEN** the user fills out the form (type, brand, model, year) and submits it.
- **THEN** the frontend sends a `POST` to `/api/vehicles` including the user's JWT in the `Authorization` header.

#### Scenario: Backend respects RLS on insert

- **WHEN** the backend receives a `POST` to `/api/vehicles`.
- **THEN** the backend uses the provided JWT to instantiate a Supabase client and perform the `INSERT` to the `vehicles` table, allowing Supabase's RLS to verify `auth.uid() = owner_id`.
