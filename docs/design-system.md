# Styling Conventions

## Global vs feature styles
- Global style entrypoint: `client/assets/css/all-styles.css`.
- Global concerns (reset/tokens/layout/theme): stay in `client/assets/css/`.
- Feature-specific styling is colocated under `client/features/<feature>/styles/` and imported from the global entrypoint.

## Token usage
- Reuse existing variables from `core.css` for color/spacing/type/radius/shadow.
- Avoid hardcoded values when token equivalents exist.
