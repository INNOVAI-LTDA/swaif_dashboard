# Copilot-CLI Runbook (How to build this repo using copilot-cli)

This runbook is the step-by-step workflow you will execute on branch `dev`.

## Ground Rules for copilot-cli prompts
Always include:
- Repo context: `INNOVAI-LTDA/swaif_dashboard`, branch `dev`
- Folder constraint: UI only in `apps/web/`, orchestrator in `services/orchestrator/`, agent in `services/agent/`
- Do not modify `ui-for-sell` branch
- Do not hard-code UI labels; keep text configurable

## Phase A — Preparation (this phase)
1) Ensure folder structure exists (done)
2) Commit docs under `ARTIFACT_BUNDLE/` (this bundle)

## Phase B — Implementation (next phase)
### Step B1: Create minimal end-to-end “hello run”
copilot-cli prompt should request:
- a minimal orchestrator API implementing the contract skeleton
- a minimal agent loop (poll → execute → logs → complete)
- a minimal UI that can create a run and display logs

Output expectation:
- app can run locally with three processes and show logs end-to-end

### Step B2: Add stage model + two gates
copilot-cli prompt should request:
- stage persistence model
- gate records
- UI approvals panel
- env toggles to enable/disable gates

### Step B3: Add git diff artifact and Gate 2
copilot-cli prompt should request:
- post-implement diff collection
- UI diff viewer
- gate that blocks commit/push until approved

### Step B4: Add GitHub Actions trigger + observe
copilot-cli prompt should request:
- integration via `gh` CLI first
- store workflow run URL/id as artifact
- show it in UI

## Checkpoints
- After each step, run local app to verify before continuing.
- Commit frequently on `dev`.