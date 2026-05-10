# Arquitectura del cliente

## Filosofía

La arquitectura está diseñada para **evitar entropía**: cada módulo tiene owner explícito, dirección de dependencias controlada y límites verificables.

## Capas y ownership

- `client/app/main.js`: punto de entrada mínimo (composition root).
- `client/app/core/app-shell.js`: orquestación de ciclo de render, navegación y composición MVC.
- `client/app/core/router/hash-router.js`: router hash encapsulado (parse, normalize, navigate).
- `client/app/router/*`: orquestación de navegación y wiring de controllers.
- `client/app/state/*`: estado y acceso a datos transversales de la app.
- `client/app/features/<feature>/*`: dominio funcional aislado (controller/view/services/config/data adapters locales).
- `client/app/shared/*`: reutilizables reales (sin contexto de dominio).
- `client/app/core/*`: infraestructura técnica (scripts runtime, wiring no-domain).
- `client/styles/global/*`: tokens/layout/base global.
- `client/styles/features/*`: estilos de dominio.
- `client/features/<feature>/data/*`: datos estructurados propiedad de dominio.

## Flujo de dependencias permitido

1. `app/main` -> `router/state/features`.
2. `router` -> `features`.
3. `features` -> `shared`, `state`, `core` base classes (`/core/view.js`, `/core/controller.js`) y su propio feature.
4. `shared` no puede depender de `features`.
5. Ningún feature puede importar otro feature directamente.

## Reglas de organización

- **Feature-local primero**: si solo lo usa una feature, vive dentro de esa feature.
- **Shared por criterio estricto**: mínimo 2 consumidores + independencia de dominio.
- **Config junto al owner**:
  - global runtime/router en `app/router` o `app/main`.
  - config de dominio en `app/features/<feature>/config.js`.
- **Servicios**:
  - storage/render helpers globales en `app/shared/services`.
  - lógica de negocio de feature en `app/features/<feature>/service.js`.
- **Estilos**:
  - no duplicar reglas de dominio en global.
  - si un selector representa una feature, su CSS va a `styles/features`.

## Cuándo crear módulo nuevo

Crear módulo nuevo solo cuando exista:
- frontera de dominio clara,
- comportamiento propio,
- y potencial de crecimiento independiente.

## Cuándo NO crear módulo nuevo

No crear módulo para:
- helpers de 1 uso,
- wrappers triviales sin encapsulación real,
- separación “por estética” sin ownership técnico.

## Safeguard automático

- Script de boundaries: `scripts/check-architecture.mjs`.
- Ejecutar: `node scripts/check-architecture.mjs`.
- Falla si hay imports cruzados entre features o dependencias fuera de capa permitida.


## Patrones aplicados (ligeros y prácticos)

- **Composition Root** en `main.js` + `AppShell` para inyección/control de dependencias.
- **Facade** en `AppShell` para coordinar router, estado y controllers sin acoplar vistas entre sí.
- **Strategy-like routing** en `HashRouter` (parse + navegación encapsulada).
- **Service abstraction** para storage en `shared/services/storage.js`.

## Reglas de performance/runtime

- Registrar listeners globales una sola vez desde infraestructura (`AppShell`).
- Evitar trabajo de DOM redundante: routing controla transición y repaint en un solo flujo.
- Mantener fetch/async dentro de modelos o servicios de feature, no en bootstrap global.


## Runtime reliability conventions

- Envolver operaciones async críticas con `safeAsync` y reportar con `reportError` (`client/app/core/runtime-errors.js`).
- Evitar listeners duplicados: registrar listeners globales con `AbortController` desde `AppShell`.
- Toda transición de ruta usa pipeline determinístico: `prepareTransition` -> `waitForScrollSettle` -> `resetTransition` -> `controller.init`.
- Features deben validar datos/config antes de ejecutar flujos (ej. countdown con `endsAt` válido).

## Debugging/observabilidad

- Errores de capa llevan `scope` estable para rastreo (`router.*`, `controller.*`, `model.*`, `feature.*`).
- Evitar `catch {}` silenciosos salvo degradación explícita de almacenamiento local.


## Module contracts

- Controller contract: `constructor(model)` + `async init()` (required).
- View contract: `render(data)` and no cross-feature imports.
- Services: pure domain/infrastructure operations, no direct DOM writes (except feature UI managers like urgency banner component).
- Optional cleanup: modules with global listeners must expose `dispose()` and be called by orchestrator (`AppShell`).

## Quality gates

- `node scripts/check-architecture.mjs` (blocking): layer boundaries and forbidden legacy imports.
- `node scripts/quality-gate.mjs` (blocking on cycles, warns on potential orphans/duplicates).

## Anti-patterns (forbidden)

- Direct feature-to-feature imports.
- Adding new runtime modules under `client/js` (except service worker).
- Silent catches for non-storage critical flows.
- Registering global listeners inside feature render methods without cleanup strategy.
