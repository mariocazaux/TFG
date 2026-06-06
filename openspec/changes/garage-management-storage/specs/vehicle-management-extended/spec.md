## ADDED Requirements

### Requirement: Extended Vehicle Form

The vehicle form includes advanced details based on the vehicle type.

#### Scenario: User fills in new form fields

- **GIVEN** the user opens the "Add Vehicle" modal
- **WHEN** the user selects a "Color" and inputs "Engine Specs"
- **THEN** these fields are saved and associated with the vehicle.

#### Scenario: User adds a motorcycle

- **GIVEN** the user opens the "Add Vehicle" modal
- **WHEN** the user selects "motorcycle" as type
- **THEN** a mandatory "Displacement (cc)" input appears.

#### Scenario: User adds a car

- **GIVEN** the user opens the "Add Vehicle" modal
- **WHEN** the user selects "car" as type
- **THEN** the "Displacement (cc)" input does NOT appear.

### Requirement: Edit & Delete Vehicles

Users can manage their existing garage.

#### Scenario: Deleting a vehicle

- **GIVEN** the user has a vehicle
- **WHEN** they click delete and confirm
- **THEN** the vehicle is removed from the database.

#### Scenario: Editing a vehicle

- **GIVEN** the user clicks edit on a vehicle
- **WHEN** the modal opens
- **THEN** it's pre-filled with the vehicle data, and submitting updates the existing database record.
