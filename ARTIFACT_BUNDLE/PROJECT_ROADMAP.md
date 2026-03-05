# Project Roadmap (Feature-sliced)

Repo: INNOVAI-LTDA/swaif_dashboard  
Branch: dev

This roadmap sequences implementation as small, testable features (see `FEATURE_CATALOG.md`).
`PLAN_STEP_B1.md` remains the technical reference for the “hello loop” behavior.

---

## Milestone M0 — Documentation & Template Readiness (DONE)
Definition of done:
- ARTIFACT_BUNDLE exists and is committed
- copilot-instructions.md exists and is committed
- agent-kit exists and is committed
- lifecycle guide exists and is committed

Features:
- F001 (docs) ✅

---

## Milestone M1 — Hello Loop (Backend-first)
Goal: Orchestrator + Agent can complete a hello command and store logs (no UI required yet).

Definition of done:
- Can POST /api/runs and see a run created
- Agent registers, polls, receives a work item, executes safe command
- Agent streams logs; orchestrator returns logs for the run
- Run status reaches a terminal state

Features (in order):
1) F010 — Orchestrator skeleton + /healthz
2) F011 — Runs create/list/get (in-memory)
3) F012 — Work items + agent registration + polling
4) F013 — Log ingest + log retrieval with cursor/after
5) F014 — Agent executes hello work item and completes it

---

## Milestone M2 — Hello Loop with UI
Goal: UI can create run and show live logs.

Definition of done:
- UI can create a run via form
- UI can list runs
- UI run detail shows live logs updating
- No CORS issues in local dev

Features (in order):
6) F020 — Next.js UI skeleton
7) F021 — UI create run + list runs
8) F022 — UI run detail + live logs

---

## Milestone M3 — Stage Model (no gates)
Goal: Make the run lifecycle explicit in data model and UI.

Features:
- F030 — Stage model + stage status API

---

## Milestone M4 — Gates (approvals)
Goal: Add pre-implement + pre-commit approvals and block progression when enabled.

Features:
- F031 — Gate 1 (pre-implement)
- F032 — Gate 2 (pre-commit) + diff artifact placeholder

---

## Milestone M5 — Deploy & Verify (GitHub Actions integration)
Goal: Trigger workflows and record run references as artifacts.

Features:
- F040 — Trigger GitHub Actions + record run URL/id

---

## Notes / Guardrails
- Implement one feature at a time.
- Each feature must include manual test steps (Windows PowerShell).
- Avoid refactors across features unless explicitly planned.
- Keep everything on `dev`.