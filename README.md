# SWAIF Dashboard (Product Repo)

This repository will host the full SWAIF web application (UI + Orchestrator + Local Agent).

## Branches
- `ui-for-sell`: preserved sales/demo UI (do not use for product development)
- `dev`: active development branch
- `main`: stable product branch (will be updated from `dev`)

## Repository Structure (target)
- `apps/web/` — Web UI (Next.js)
- `services/orchestrator/` — Orchestrator API (Python, FastAPI)
- `services/agent/` — Local Runner Agent (Python)
- `ARTIFACT_BUNDLE/` — Specifications, diagrams, runbooks, prompt packs
- `archive/` — Archived demo-only assets (kept for reference)

## Branding
- `INNOVAI_Logo.png` is a shared branding asset and should remain available to the product UI.

## Status
Preparation phase: defining structure + workflow artifacts for copilot-cli.
Implementation will be driven by documents under `ARTIFACT_BUNDLE/`.