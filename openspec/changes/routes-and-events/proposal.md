## Why

El núcleo de Kachaoo es fomentar la interacción en el mundo real entre los amantes del motor. Hasta ahora, hemos construido la gestión de perfiles (garaje virtual) y autenticación. El siguiente paso crucial es proporcionar la herramienta para organizar salidas (Rutas) y reuniones estáticas (Eventos/Quedadas). Esta propuesta busca implementar estas capacidades para que los usuarios puedan planificar recorridos en un mapa interactivo de forma sencilla (usando tecnología open-source sin coste) y organizar encuentros en ubicaciones específicas, resolviendo el problema central de la app: combatir el aislamiento social fomentando los encuentros físicos.

## What Changes

1. **Gestor de Rutas Dinámicas**: Integración de Leaflet y Leaflet Routing Machine en Angular para que los usuarios puedan trazar rutas en carretera mediante simples clics (Origen, Intermedios, Destino). El sistema calculará el `LineString` y lo guardará en la base de datos (PostGIS).
2. **Gestor de Eventos Estáticos**: Creación de eventos (Quedadas) limitados a puntos estáticos. Los usuarios podrán organizar un evento aportando detalles y soltando un Pin en un mapa de Leaflet.
3. **Base de Datos (Supabase)**: Modificación del `schema.sql` para acomodar los nuevos requerimientos del diseño (Figma): añadir `vehicle_category` y `difficulty` a la tabla de rutas, y añadir `max_attendees` a la tabla de eventos.

## Capabilities

### New Capabilities

- `dynamic-routes`: Visualización, creación y exploración de rutas dinámicas (trazados) generadas a través de mapas con Leaflet y guardadas mediante PostGIS.
- `static-events`: Creación, listado y gestión de asistencia para eventos estáticos limitados por aforo, geolocalizados mediante un punto exacto en el mapa.

### Modified Capabilities

- Ninguna

## Impact

- **Frontend (Angular)**:
  - Nuevas dependencias: `leaflet`, `@types/leaflet`, y plugins de routing.
  - Nuevos módulos `map-explore` y `events`.
  - Impacto visual: Estilo minimalista y _Mobile-First_, respetando estrictamente los diseños en Figma.
- **Backend (Node/Express)**:
  - Nuevos controladores para `routes` y `events`.
  - Manipulación de objetos GeoJSON para insertarlos/leerlos como tipos espaciales.
- **Base de Datos**:
  - La migración de `schema.sql` afectará a las tablas `routes` y `events`.
- **Entorno**:
  - Estos cambios funcionarán tanto en local como en producción. No requieren variables de entorno nuevas (ya que no se usan APIs de terceros de pago como Mapbox/Google), pero se dependerá del cliente de Supabase (ya configurado) para ejecutar el SQL espacial.
