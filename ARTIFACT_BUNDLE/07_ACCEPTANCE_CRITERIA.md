# Acceptance Criteria (MVP)

## Basic running loop
- UI can create a run.
- Agent can pull a work item and execute it.
- Logs appear in UI.

## Two gates
- Gate 1 stops before file modifications.
- Gate 2 stops after modifications and shows diff before commit/push.
- Gates can be toggled via env vars.

## Observability & audit
- Each work item records: command/payload, timestamps, exit code.
- Logs are stored per run/work item.
- Approvals are recorded with timestamp and decision.

## GitHub Actions (later MVP stage)
- Can trigger a workflow and record a run reference.
- Can display the outcome link/status in UI.