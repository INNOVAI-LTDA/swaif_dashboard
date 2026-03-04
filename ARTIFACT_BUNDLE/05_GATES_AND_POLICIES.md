# Gates & Policies (MVP)

## Environment configuration
Orchestrator env vars (MVP):
- `SWAIF_GATES_PRE_IMPLEMENT=true|false`
- `SWAIF_GATES_PRE_COMMIT=true|false`
- `SWAIF_GATES_TEST_FIX=true|false`
- `SWAIF_RUNNER_MODE=local_agent` (future: server)

Agent env vars (MVP):
- `SWAIF_ORCHESTRATOR_URL=http://localhost:8000`
- `SWAIF_AGENT_NAME=...`
- `SWAIF_WORKSPACE_ROOT=...` (future)

## Gate behavior definitions
### Gate 1: pre-implement
Trigger: Plan stage completed.
UI must show: plan, intended commands, expected file touch list (best-effort).
Action: operator approves or rejects.

### Gate 2: pre-commit
Trigger: Implement stage executed file changes and `git diff` artifact collected.
UI must show: actual diff.
Action: operator approves commit/push or rejects to revise.

## Audit requirement
All approvals and all executed work items must be recorded with timestamps.