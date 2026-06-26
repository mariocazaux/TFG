## ADDED Requirements

### Requirement: Trazado dinámico de rutas

El usuario debe poder crear una ruta definiendo puntos (origen, intermedios, destino) haciendo clics en un mapa, y la aplicación debe trazar y guardar el recorrido por carretera. Además, se deben especificar las características de la ruta como la categoría de vehículo y la dificultad.

#### Scenario: Trazado exitoso de una ruta en carretera

- **GIVEN** que el usuario está autenticado y se encuentra en la pantalla de "Crear Ruta" (Figma: Pantalla Explorar/Crear Ruta)
- **WHEN** el usuario hace al menos dos clics en el mapa interactivo (marcando origen y destino)
- **THEN** el sistema debe calcular y mostrar una línea (LineString) que sigue la carretera entre esos puntos usando el servicio de routing.

#### Scenario: Guardado de una nueva ruta

- **GIVEN** que el usuario ha trazado una ruta válida en el mapa
- **WHEN** el usuario rellena el título, selecciona el tipo de vehículo (ej. "Moto") y la dificultad (ej. "Media") y pulsa en Guardar
- **THEN** la aplicación extrae el trazado (GeoJSON LineString) y lo guarda junto con los metadatos de la ruta en la base de datos (PostGIS).

#### Scenario: Listado de rutas disponibles

- **GIVEN** que existen rutas públicas en la base de datos
- **WHEN** el usuario navega a la sección de "Explorar Mapas"
- **THEN** debe ver un listado de rutas (feed) y, al seleccionar una, visualizar su recorrido exacto en el mapa.
