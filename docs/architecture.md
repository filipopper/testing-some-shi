# Architecture Overview

## Top-level client architecture
- `client/app/`: application bootstrap and router wiring.
- `client/js/`: legacy shared MVC layers still global (`controllers`, `views`, `models`) plus platform scripts.
- `client/features/`: domain modules with owned config/data/components/styles/services.
- `client/assets/css/`: global design system and shared layout styles.

## Ownership rules
- Put route registration in `client/app/router/view-registry.js`.
- Put feature logic/config/data inside `client/features/<feature>/`.
- Keep only cross-feature/shared runtime in `client/js/`.
- Keep global tokens/layout/reset in `client/assets/css/`.
