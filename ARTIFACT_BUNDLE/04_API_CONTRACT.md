# API Contract (Draft, MVP)

The API contract defines UI ↔ Orchestrator and Agent ↔ Orchestrator.

## UI ↔ Orchestrator
### Runs
- `POST /api/runs`
  - input: requirement prompt, repo info (optional), settings (optional)
  - output: run_id
- `GET /api/runs/{runId}`
- `GET /api/runs/{runId}/stages`
- `GET /api/runs/{runId}/artifacts`
- `GET /api/runs/{runId}/logs?after=<cursor>`

### Approvals / Gates
- `GET /api/runs/{runId}/approvals`
- `POST /api/runs/{runId}/approvals/{gateId}`
  - input: decision approve/reject + notes + optional edits
  - output: updated gate status

## Agent ↔ Orchestrator
- `POST /api/agents/register`
- `GET /api/agents/{agentId}/work-items/next`
- `POST /api/work-items/{workItemId}/logs`
- `POST /api/work-items/{workItemId}/complete`

## Data shapes (conceptual)
- Run: id, status, createdAt, updatedAt
- Stage: key, status, timestamps
- WorkItem: id, type, payload, status, assignedTo
- Log: ts, stream, message, workItemId
- Artifact: name, type, content/uri, createdAt
- Approval: gateId, status, decision, notes, timestamps