# Research feature data contract

Research intentionally keeps content out of the view layer. The UI consumes a normalized knowledge repository from `data/research-knowledge.json` through `ResearchRepository`.

## Best practices

- Add or edit institutional content in `data/research-knowledge.json`, not in `view.js`.
- Keep every entity addressable with a stable `id`; relationships must use those IDs in `citations`.
- Prefer semantic `tags` over visual-only categories. The graph is built from explicit citations plus shared tags.
- Keep `summary`, `hypothesis`, `methodology`, `evidence`, `versions`, `articles`, `requirements`, `official`, and `markdown` fields structured so the reader can render them consistently.
- If this repository later moves to an API or CMS, update only `DATA_URL` / repository loading logic in `model.js`; the view should remain data-source agnostic.
- Before committing, run syntax checks and `scripts/quality-gate.mjs`, and verify there are no merge-conflict markers.

## Minimal entity fields

Each entity must include:

```json
{
  "id": "stable-id",
  "type": "research",
  "title": "Entity title",
  "status": "Current workflow status",
  "updated": "2026-05-30",
  "owner": "Responsible team",
  "tags": ["semantic tag"],
  "section": "Papers",
  "summary": "Contextual summary"
}
```
