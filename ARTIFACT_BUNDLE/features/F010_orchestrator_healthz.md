# F010 — Orchestrator skeleton + health check

## Goal
Start a FastAPI service under `services/orchestrator/` and expose a health endpoint.

## Scope
- Create `services/orchestrator/main.py` with a FastAPI app
- Add `GET /healthz` returning `{ "ok": true }`
- Add `services/orchestrator/requirements.txt` with:
  - `fastapi`
  - `uvicorn[standard]`

## Out of scope
- Runs, work items, logs, persistence, CORS

## Affected folders
- `services/orchestrator/`

## Acceptance criteria
- [ ] `uvicorn main:app --reload --port 8000` starts successfully
- [ ] `Invoke-RestMethod http://localhost:8000/healthz` returns `{ ok: true }`

## Manual test (Windows)
```powershell
cd services\orchestrator
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Invoke-RestMethod http://localhost:8000/healthz
```