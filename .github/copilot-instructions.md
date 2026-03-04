# Copilot Instructions — SWAIF Dashboard

## Project Overview

SWAIF Dashboard ("Solutions Creator") is a web application that orchestrates a full software delivery lifecycle (requirements → code → test → build → deploy → verify) using a local agent, an API orchestrator, and a Next.js UI.

**Owner:** INNOVAI-LTDA  
**Repo:** `INNOVAI-LTDA/swaif_dashboard`  
**Source of truth for building:** `ARTIFACT_BUNDLE/*.md`

---

## Architecture

Three processes run locally:

```
Next.js UI (apps/web/)
    ↕ HTTP
FastAPI Orchestrator (services/orchestrator/)
    ↕ HTTP polling
Local Agent (services/agent/)
    ↓ shell calls
git / gh / copilot-cli / npm → GitHub Repo + Actions
```

**Core concept — Work Items:** the Orchestrator creates a queue of work items; the Agent polls for the next item, executes it locally, streams logs, and reports completion. This separation allows future migration to a server-side runner (Mode B) without rewriting the orchestrator or UI.

### Lifecycle stages

```
Requirements → Plan → [Gate 1] → Implement → [Gate 2] → Test → Build → Deploy → Verify → Report
```

- **Gate 1 (pre-implement):** operator reviews plan and intended commands before any files are touched.  
- **Gate 2 (pre-commit):** operator reviews `git diff` artifact before commit/push.  
- Both gates are human-in-the-loop checkpoints configurable via env vars (see below).

---

If there is a conflict between a request and these documents, ask for clarification.

## Output requirements (for responses)
When asked to produce implementation:
- Provide a short plan first, then file-by-file changes
- Keep changes scoped to the current step only
- Avoid large refactors unless explicitly requested

## Human-in-the-loop gates (conceptual)
The product must support two approval gates (configurable via env):
- Gate 1: pre-implement
- Gate 2: pre-commit (diff review)

## Branch Policy

- **`dev`** — all implementation work happens here.
- **`main`** — stable; updated from `dev` when ready.
- **`ui-for-sell`** — preserved sales/demo UI. **Never modify this branch during product development.**

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI | Next.js (JS/TS), `apps/web/` |
| Orchestrator API | Python, FastAPI, `services/orchestrator/` |
| Local Agent | Python, `services/agent/` |

---

## API Contract Summary

### UI ↔ Orchestrator
- `POST /api/runs` — create a run (input: requirement prompt, repo info, settings)
- `GET /api/runs/{runId}` — run status
- `GET /api/runs/{runId}/stages`
- `GET /api/runs/{runId}/artifacts`
- `GET /api/runs/{runId}/logs?after=<cursor>` — streamed logs with cursor pagination
- `GET /api/runs/{runId}/approvals`
- `POST /api/runs/{runId}/approvals/{gateId}` — approve or reject a gate (with optional notes/edits)

### Agent ↔ Orchestrator
- `POST /api/agents/register`
- `GET /api/agents/{agentId}/work-items/next` — polling endpoint
- `POST /api/work-items/{workItemId}/logs` — stream log lines
- `POST /api/work-items/{workItemId}/complete`

---

## Environment Variables

### Orchestrator
| Variable | Values |
|---|---|
| `SWAIF_GATES_PRE_IMPLEMENT` | `true` / `false` |
| `SWAIF_GATES_PRE_COMMIT` | `true` / `false` |
| `SWAIF_GATES_TEST_FIX` | `true` / `false` |
| `SWAIF_RUNNER_MODE` | `local_agent` (future: `server`) |

### Agent
| Variable | Example |
|---|---|
| `SWAIF_ORCHESTRATOR_URL` | `http://localhost:8000` |
| `SWAIF_AGENT_NAME` | any string |
| `SWAIF_WORKSPACE_ROOT` | path to workspace (future) |

---

## Key Conventions

- **Do not hard-code UI labels.** All user-visible text must be configurable or sourced from constants — copy visual style, not wording.
- **Audit everything.** Every work item execution and every gate approval must be persisted with timestamps (command/payload, start/end timestamps, exit code, decision, notes).
- **Folder constraints are strict.** UI code only in `apps/web/`, orchestrator only in `services/orchestrator/`, agent only in `services/agent/`.
- **`INNOVAI_Logo.png`** at repo root is a shared branding asset; keep it available to the UI.
- Implementation phases are tracked in `ARTIFACT_BUNDLE/06_COPILOT_CLI_RUNBOOK.md`. Read it before starting a new phase step.

---

## Implementation Phases

The build is incremental. Read `ARTIFACT_BUNDLE/06_COPILOT_CLI_RUNBOOK.md` for the full runbook.

- **Phase A** (complete): repo structure + `ARTIFACT_BUNDLE/` docs committed.
- **Step B1:** Minimal end-to-end "hello run" — UI creates a run, agent executes a work item, logs appear in UI.
- **Step B2:** Stage model + two gates + approvals panel + env toggles.
- **Step B3:** `git diff` artifact collection + UI diff viewer + Gate 2 blocking commit.
- **Step B4:** GitHub Actions trigger via `gh` CLI + store workflow run URL as artifact.

After each step: run the app locally to verify, then commit to `dev`.

---

## Reference Documents

All specs live in `ARTIFACT_BUNDLE/`:

| File | Content |
|---|---|
| `01_REQUIREMENTS.md` | Goals, constraints, key outcomes |
| `02_ARCHITECTURE_AND_FLOW.md` | Component overview, lifecycle stages, two-gates design |
| `03_REPO_STRUCTURE.md` | Folder layout |
| `04_API_CONTRACT.md` | Full API contract |
| `05_GATES_AND_POLICIES.md` | Gate behavior and env var reference |
| `06_COPILOT_CLI_RUNBOOK.md` | Step-by-step build runbook |
| `07_ACCEPTANCE_CRITERIA.md` | MVP acceptance criteria |
| `uml/*.mmd` | Mermaid diagrams (architecture, state flow, build workflow) |
