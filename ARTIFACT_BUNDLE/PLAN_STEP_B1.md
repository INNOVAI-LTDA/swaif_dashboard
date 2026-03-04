 # PLAN_STEP_B1 — Minimal End-to-End "Hello Run"

   **Goal:** prove the full loop: UI creates a run → orchestrator enqueues a work item →
   agent polls, executes a simple shell command, streams logs back → UI displays the logs.

   No gates, no stages model, no persistence to disk — all in-memory for this step.
   Gates and the full stage model come in Step B2.

   ---

   ## 1. Endpoints to Implement

   ### 1.1 Orchestrator (FastAPI) — `services/orchestrator/`

   #### POST /api/runs
   Create a run and immediately enqueue one "hello" work item.

   Request:
   ```json
   {
     "requirement": "echo hello from agent"
   }

  Response 201 Created:

   {
     "run_id": "550e8400-e29b-41d4-a716-446655440000",
     "status": "pending"
   }

  GET /api/runs/{runId}

  Return run status.

  Response 200:

   {
     "run_id": "550e...",
     "status": "pending | running | completed | failed",
     "requirement": "echo hello from agent",
     "created_at": "2026-03-04T20:00:00Z",
     "updated_at": "2026-03-04T20:00:05Z"
   }

  GET /api/runs/{runId}/logs?after={cursor}

  Return log lines for the run since cursor (cursor = last log id seen; 0 means all). UI polls this endpoint every 2 s.

  Response 200:

   {
     "logs": [
       { "id": 1, "ts": "2026-03-04T20:00:03Z", "stream": "stdout", "message": "hello from agent" }
     ],
     "next_cursor": 1
   }

  POST /api/agents/register

  Agent calls this once on startup.

  Request:

   {
     "name": "local-agent-1"
   }

  Response 200:

   {
     "agent_id": "agt-abc123"
   }

  GET /api/agents/{agentId}/work-items/next

  Agent polls this. Returns 204 when queue is empty.

  Response 200 (work item available):

   {
     "work_item_id": "wi-xyz789",
     "run_id": "550e...",
     "type": "shell_command",
     "payload": {
       "command": "echo hello from agent"
     }
   }

  Response 204 No Content — no work item available.

  POST /api/work-items/{workItemId}/logs

  Agent streams log lines (one call per line, or batched).

  Request:

   {
     "lines": [
       { "stream": "stdout", "message": "hello from agent" }
     ]
   }

  Response 200:

   { "accepted": 1 }

  POST /api/work-items/{workItemId}/complete

  Agent signals completion.

  Request:

   {
     "exit_code": 0,
     "status": "completed"
   }

  Response 200:

   { "ok": true }

  --------------------------------------------------------------------------------------------------------------------------

  2. Data Model (In-Memory)

  All state lives in module-level Python dicts/lists. No database in B1.

   Run
     run_id:       str (UUID4)
     status:       "pending" | "running" | "completed" | "failed"
     requirement:  str
     created_at:   datetime
     updated_at:   datetime

   WorkItem
     work_item_id: str (UUID4)
     run_id:       str
     type:         "shell_command"
     payload:      dict  (e.g. {"command": "echo hello from agent"})
     status:       "pending" | "assigned" | "completed" | "failed"
     assigned_to:  str | None   (agent_id)
     created_at:   datetime
     completed_at: datetime | None
     exit_code:    int | None

   LogEntry
     id:           int (auto-increment, global counter)
     run_id:       str
     work_item_id: str
     ts:           datetime
     stream:       "stdout" | "stderr"
     message:      str

   Agent
     agent_id:     str (UUID4)
     name:         str
     registered_at: datetime

  Global in-memory stores (Python dicts, keyed by id):

   runs:       dict[str, Run]
   work_items: dict[str, WorkItem]
   logs:       list[LogEntry]          # append-only; id = index+1
   agents:     dict[str, Agent]
   log_counter: int                    # auto-increment

  --------------------------------------------------------------------------------------------------------------------------

  3. Minimal UI Pages and Components

  Stack: Next.js with TypeScript. No UI library required yet — plain HTML/Tailwind or inline styles are acceptable for B1.

  Pages

  ┌─────────────────┬─────────────────────────────┬──────────────────────────────┐
  │ Route           │ File                        │ Purpose                      │
  ├─────────────────┼─────────────────────────────┼──────────────────────────────┤
  │ /               │ app/page.tsx                │ Run list + create-run form   │
  ├─────────────────┼─────────────────────────────┼──────────────────────────────┤
  │ /runs/[runId]   │ app/runs/[runId]/page.tsx   │ Run detail + live log viewer │
  └─────────────────┴─────────────────────────────┴──────────────────────────────┘

  Component breakdown

  app/page.tsx — Home

   - <CreateRunForm> — textarea for requirement, submit button.
    - Calls POST /api/runs, then redirects to /runs/{runId}.
   - <RunList> — fetches GET /api/runs (add this lightweight list endpoint to the
   orchestrator alongside the required ones) and renders id, status, created_at as a
   table. Refresh on load only (no live polling needed here).

   Note: GET /api/runs is a small convenience endpoint not in the original contract. Add it to the orchestrator in B1 only
  for
   the run list. It returns [{ run_id, status, created_at }].

  app/runs/[runId]/page.tsx — Run Detail

   - <RunStatus> — shows run_id and current status. Polls GET /api/runs/{runId} every
   3 s until status is completed or failed.
   - <LogViewer> — polls GET /api/runs/{runId}/logs?after={cursor} every 2 s.
   Appends new lines to a scrollable <pre> block. Stops polling when run status is
   terminal.

  lib/api.ts — thin fetch wrapper

  Centralise ORCHESTRATOR_URL (from NEXT_PUBLIC_ORCHESTRATOR_URL env var, default http://localhost:8000) and expose typed
  helper functions:

   - createRun(requirement: string)
   - getRun(runId: string)
   - getLogs(runId: string, after: number)
   - listRuns()

  --------------------------------------------------------------------------------------------------------------------------

  4. Agent Behavior Loop

  File: services/agent/main.py

   startup:
     1. Read SWAIF_ORCHESTRATOR_URL (default http://localhost:8000)
        Read SWAIF_AGENT_NAME (default "local-agent-1")
     2. POST /api/agents/register  →  store agent_id

   poll loop (runs forever):
     3. GET /api/agents/{agent_id}/work-items/next
        - 204 → sleep 2 s, retry
        - 200 → proceed to execute

   execute:
     4. Extract command from work_item.payload["command"]
     5. subprocess.Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
        - read stdout and stderr line by line (interleaved via threads or select)
        - for each line: POST /api/work-items/{work_item_id}/logs
          with {"lines": [{"stream": "stdout"|"stderr", "message": "<line>"}]}

   complete:
     6. Wait for process to finish, capture exit_code
     7. POST /api/work-items/{work_item_id}/complete
        with {"exit_code": <n>, "status": "completed" if exit_code==0 else "failed"}
     8. Go back to step 3

  Error handling: wrap step 5–7 in try/except; on exception POST complete with status="failed", exit_code=-1.

  --------------------------------------------------------------------------------------------------------------------------

  5. Windows PowerShell Run Instructions (3 Terminals)

  Terminal 1 — Orchestrator

   cd services\orchestrator
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install fastapi "uvicorn[standard]"
   $env:SWAIF_RUNNER_MODE = "local_agent"
   uvicorn main:app --reload --port 8000

  Verify: Invoke-RestMethod http://localhost:8000/api/runs should return [].

  Terminal 2 — Agent

   cd services\agent
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install requests
   $env:SWAIF_ORCHESTRATOR_URL = "http://localhost:8000"
   $env:SWAIF_AGENT_NAME = "local-agent-1"
   python main.py

  Expected output: Registered as agent agt-<id>. Polling for work...

  Terminal 3 — UI

   cd apps\web
   npm install
   $env:NEXT_PUBLIC_ORCHESTRATOR_URL = "http://localhost:8000"
   npm run dev

  Open http://localhost:3000.

  End-to-End Smoke Test (Terminal 1 after all three are running)

   # Create a run
   $body = '{"requirement": "echo hello from agent"}'
   $r = Invoke-RestMethod -Uri http://localhost:8000/api/runs `
        -Method Post -Body $body -ContentType "application/json"
   $runId = $r.run_id
   Write-Host "Run ID: $runId"

   # Poll logs until they appear
   Start-Sleep 4
   Invoke-RestMethod "http://localhost:8000/api/runs/$runId/logs?after=0"

  Expected: logs array contains { stream: "stdout", message: "hello from agent" }.

  --------------------------------------------------------------------------------------------------------------------------

  6. Commit Plan

  All commits land on dev. Keep each commit self-contained and individually runnable (or at minimum not breaking existing
  code).

  ┌────┬──────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────┐
  │ #  │ Commit message                   │ What it contains                                                                │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 1  │ chore(orchestrator)*#COLON|* add │ services/orchestrator/ folder with main.py skeleton (app starts, returns 404 on │
  │    │ project scaffold and             │ unknown routes), requirements.txt (fastapi, uvicorn)                            │
  │    │ requirements.txt                 │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 2  │ feat(orchestrator)*#COLON|*      │ models.py with Run/WorkItem/LogEntry/Agent dataclasses; POST /api/runs creates  │
  │    │ in-memory data model and POST    │ run + enqueues one shell_command work item; GET /api/runs list; GET             │
  │    │ /api/runs                        │ /api/runs/{runId}                                                               │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 3  │ feat(orchestrator)*#COLON|*      │ POST /api/agents/register; GET /api/agents/{agentId}/work-items/next; marks     │
  │    │ agent registration and work-item │ work item as assigned                                                           │
  │    │ polling endpoints                │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 4  │ feat(orchestrator)*#COLON|* log  │ POST /api/work-items/{workItemId}/logs; POST                                    │
  │    │ ingestion and run log retrieval  │ /api/work-items/{workItemId}/complete; GET /api/runs/{runId}/logs with cursor   │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 5  │ chore(agent)*#COLON|* add        │ services/agent/ folder with main.py skeleton (reads env vars, prints startup    │
  │    │ project scaffold and             │ message), requirements.txt (requests)                                           │
  │    │ requirements.txt                 │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 6  │ feat(agent)*#COLON|* register,   │ Full agent loop: register → poll → subprocess → stream logs → complete          │
  │    │ poll, execute, stream logs,      │                                                                                 │
  │    │ complete                         │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 7  │ chore(ui)*#COLON|* init Next.js  │ npx create-next-app output, .env.local.example with                             │
  │    │ app in apps/web                  │ NEXT_PUBLIC_ORCHESTRATOR_URL                                                    │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 8  │ feat(ui)*#COLON|* add lib/api.ts │ lib/api.ts; app/page.tsx with <CreateRunForm> and <RunList>                     │
  │    │ and run list + create-run form   │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 9  │ feat(ui)*#COLON|* add run detail │ app/runs/[runId]/page.tsx with <RunStatus> and <LogViewer>                      │
  │    │ page with status and live log    │                                                                                 │
  │    │ viewer                           │                                                                                 │
  ├────┼──────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
  │ 10 │ chore*#COLON|* add local run     │ ARTIFACT_BUNDLE/PLAN_STEP_B1.md (this file, post-implementation notes if any)   │
  │    │ instructions to ARTIFACT_BUNDLE  │                                                                                 │
  └────┴──────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────┘

   After commit 10: verify the full loop manually (smoke test above), then proceed to Step B2 (stage model + gates).

  --------------------------------------------------------------------------------------------------------------------------

  Acceptance Check for B1

  Before moving to B2, confirm all of the following:

   - [ ]  POST /api/runs returns a run_id.
   - [ ]  Agent terminal prints Received work item wi-<id> within 3 s of run creation.
   - [ ]  Agent terminal prints the command output line(s).
   - [ ]  GET /api/runs/{runId}/logs?after=0 returns the expected log lines.
   - [ ]  UI at http://localhost:3000 can create a run via the form.
   - [ ]  UI run detail page at /runs/{runId} shows logs auto-updating without page reload.
   - [ ]  Run status transitions to completed after agent finishes.