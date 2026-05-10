# Architecture

## Runtime structure
- `client/js/app.js`: SPA router + view bootstrapping.
- `client/js/config/view-registry.js`: single source of truth for route -> controller mapping.
- `client/js/controllers/*`: route orchestration layer.
- `client/js/views/*`: DOM rendering and view-specific behavior.
- `client/js/models/*`: data access and transformation.
- `client/js/components/*`: reusable UI components (urgency banner).
- `client/js/services/*`: shared behavior (banner persistence).
- `client/js/config/*`: app-level configuration.

## Rules
- Keep MVC split: controller orchestrates, model fetches, view renders.
- Add new routes only through `view-registry.js`.
- Reusable cross-view behavior belongs in `components/` or `services/`.
