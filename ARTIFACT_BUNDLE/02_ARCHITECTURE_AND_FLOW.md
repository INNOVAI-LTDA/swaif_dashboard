# Architecture & Flow (MVP)

## Components
1) **UI (Next.js, JS/TS)** in `apps/web/`
2) **Orchestrator API (FastAPI, Python)** in `services/orchestrator/`
3) **Local Agent (Python)** in `services/agent/`

## Core Concept: Work Items
Orchestrator creates a queue of work items.
Agent pulls work items, executes them locally, streams logs and returns results.

This separation enables later migration to server runner without rewriting the orchestrator/UI.

## Stages (conceptual)
1) Requirements (capture + normalize input)
2) Plan (produce step plan and expected changes)
3) Implement (apply changes)
4) Test
5) Build
6) Deploy (trigger GitHub Actions)
7) Verify (post-deploy checks, accept criteria validation)
8) Report (summary)

## Two Gates (must exist in workflow)
- **Gate 1: pre-implement** (after Plan stage)
- **Gate 2: pre-commit** (after Implement stage, after diff collected)

## GitHub Actions
MVP uses GitHub Actions for build/deploy/verify:
- either push-based workflow triggers, or `workflow_dispatch` via `gh`.

(Actual workflow definitions come later; for now the system must be able to record workflow run identifiers/URLs as artifacts.)