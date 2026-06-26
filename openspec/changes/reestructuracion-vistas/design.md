## Context

La aplicación requiere una revisión arquitectónica y de interfaz. Actualmente, la inyección del token y la protección de rutas mediante `authGuard` está presentando fallos al navegar entre componentes, lo que expulsa al usuario al login innecesariamente.
En el apartado de interfaz, el mapa de exploración ocupa demasiada altura (100vh), y las vistas nuevas no aprovechan las clases y variables globales de SCSS definidas para Kachaoo, generando una inconsistencia visual y repetición de código.

## Goals / Non-Goals

**Goals:**

- Arreglar el `AuthGuard` o `AuthService` para garantizar la retención de sesión.
- Refactorizar las hojas de estilo de los nuevos componentes para que hereden y utilicen las variables CSS definidas en los estilos globales (`styles.scss`), especialmente colores y tipografías.
- Ajustar la estructura DOM del componente `map-explore` para que el mapa se integre de forma balanceada con el resto de la vista, limitando su altura máxima.
- Estandarizar la nomenclatura de las variables en los archivos `.ts` (Frontend).

**Non-Goals:**

- No se crearán nuevas funcionalidades de backend en este cambio.
- No se rediseñará el layout principal (`home-layout`).

## Decisions

- **AuthGuard Fix**: Se revisará cómo se recupera el token del `localStorage`. El problema puede derivarse de la hidratación SSR o del borrado de estado.
- **SCSS Global Classes y Factorización**: Para asegurar la fidelidad a Figma sin "crear clases a lo loco", se utilizará estrictamente la arquitectura ITCSS ya existente en `src/styles`:
  - Los colores y tokens de diseño se definirán en `src/styles/settings/`.
  - Los utilitarios como _Glassmorphism_ y _Glows_ se añadirán a `src/styles/utilities/`.
  - Las clases base para componentes HTML estándar se actualizarán en `src/styles/components/` o `src/styles/elements/`.
  - Solo se creará la nueva carpeta `src/app/shared/components/` para los componentes de Angular (.html y .ts), asegurando que encapsulan el marcado y delegan el estilo al SCSS global.
- **Map Container Adjustments**: Se ajustará la vista `map-explore` basándose en `Home.tsx` de Figma. La UI principal (buscador, tarjetas, controles) flotará sobre el mapa. Al separar esto en componentes pequeños, mantendremos el HTML limpio y fácil de mantener.
- **Refactorización Global (Legacy Code)**: Los componentes de interfaz de usuario de las vistas antiguas (formularios, inputs, botones) se extraerán como componentes Angular en `src/app/shared/components/`. Todo el código legado se auditará para asegurar que consume las clases globales de `src/styles`.

## Risks / Trade-offs

- Al modificar el `AuthGuard`, se debe comprobar tanto la navegación directa (URL escrita) como la navegación SPA (RouterLink) para evitar bucles de redirección.
- Al refactorizar el CSS, podría alterarse temporalmente la responsividad de los componentes si no se prueban correctamente en formato móvil.
