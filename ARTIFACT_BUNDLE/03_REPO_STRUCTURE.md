# Repo Structure (dev/main)

Target structure (already created with .gitkeep placeholders):

- `apps/web/` — Next.js UI
- `services/orchestrator/` — FastAPI orchestrator
- `services/agent/` — local agent
- `ARTIFACT_BUNDLE/` — specs, runbooks, prompt packs, diagrams
- `.github/workflows/` — workflows (later)

Notes:
- `INNOVAI_Logo.png` is a shared asset and must remain available.
- Sales UI is preserved on branch `ui-for-sell` and is not part of the product build workflow.