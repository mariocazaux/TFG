## ADDED Requirements

### Requirement: Upload Images to Supabase Storage

Users can upload their profile avatars and vehicle pictures directly to Supabase Storage.

#### Scenario: User uploads an avatar image

- **GIVEN** the user is authenticated
- **WHEN** the user selects an image for their avatar
- **THEN** the image is uploaded to the `avatars` bucket and the profile is updated.

#### Scenario: User uploads a vehicle image

- **GIVEN** the user is adding or editing a vehicle
- **WHEN** they select an image and submit the form
- **THEN** the image is uploaded to `vehicles` bucket and its public URL is saved in the database.
