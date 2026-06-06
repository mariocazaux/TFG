## ADDED Requirements

### Requirement: User Registration

El usuario debe poder crear una cuenta proporcionando un email, un nombre de usuario y una contraseña válida. La interfaz visual debe corresponder fielmente al componente `Auth.tsx` del proyecto de Figma.

#### Scenario: Successful Registration

- **WHEN** el usuario introduce un email válido, un nombre de usuario, y una contraseña que cumple los requisitos, y pulsa el botón de registro
- **THEN** se crea su cuenta en la base de datos a través del backend, recibe un token JWT de sesión válido, y es redirigido a la vista de la aplicación (`/app` o similar).

#### Scenario: Email Already Exists

- **WHEN** el usuario intenta registrarse con un correo electrónico que ya existe en el sistema
- **THEN** el formulario debe mostrar un mensaje de error claro indicando que la cuenta ya existe.

### Requirement: User Login

El usuario debe poder acceder a su cuenta introduciendo su email y contraseña.

#### Scenario: Successful Login

- **WHEN** el usuario introduce sus credenciales correctas en la pestaña de inicio de sesión
- **THEN** recibe el token JWT desde el servidor, se almacena en el estado del frontend (Signals / LocalStorage) y es redirigido al panel principal.

#### Scenario: Invalid Credentials

- **WHEN** el usuario introduce un email o contraseña incorrectos
- **THEN** la UI muestra un mensaje de error ("Credenciales inválidas") y no permite el paso.

### Requirement: Tab Navigation in Auth Component

El componente de autenticación debe permitir alternar entre Registro y Login sin recargar la aplicación completa.

#### Scenario: Switch to Registration via Query Params

- **WHEN** el usuario hace clic en "Registrarse" o navega a `/auth?tab=register`
- **THEN** la vista debe mutar de forma fluida mostrando los campos adicionales necesarios para el registro (como "Nombre de usuario").
