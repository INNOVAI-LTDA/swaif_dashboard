# Feature Catalog (MVP slices)

This catalog breaks the product into small deliverables (“features”).  
Each feature must be implemented independently and merged on `dev` as a small PR/commit series.

Conventions:
- Feature IDs: `F001`, `F002`, ...
- Each feature has its own spec at: `ARTIFACT_BUNDLE/features/F###_<slug>.md`
- Each feature has its own copilot prompt file at: `ARTIFACT_BUNDLE/prompts/F###_<slug>.txt`
- Each feature must define:
  - scope
  - out of scope
  - acceptance criteria
  - affected folders (apps/web, services/*)
  - run instructions (Windows)

## MVP Feature List

### F001 — Repo bootstrap & run instructions
- Goal: root README explains how to run UI/API/agent (even before they exist), env vars, branch policy.
- Output: docs only.

### F010 — Orchestrator skeleton + health check
- Goal: FastAPI service starts; `/healthz` responds.
- No persistence.

### F011 — In-memory Run model + create/list/get
- Goal: create run; list runs; get run details.

### F012 — In-memory WorkItem queue + agent registration
- Goal: register agent; agent can poll `work-items/next`.

### F013 — Log ingestion + log retrieval (cursor-based)
- Goal: agent can send logs; UI can poll logs.

### F014 — Agent executes “hello command” work item
- Goal: agent runs a safe command and marks complete.

### F020 — Next.js UI skeleton + home page
- Goal: web app starts; shows basic navigation.

### F021 — UI can create run + show run list
- Goal: UI calls orchestrator to create and list runs.

### F022 — UI run detail page with live logs
- Goal: UI polls logs with cursor and displays streaming log view.

### F030 — Stage model (minimal) + stage status API
- Goal: stages exist and are visible in UI (no gates yet).

### F031 — Gate 1 (pre-implement) approval flow
- Goal: orchestrator pauses after plan; UI can approve/reject.

### F032 — Gate 2 (pre-commit) approval flow + diff artifact placeholder
- Goal: orchestrator pauses; UI shows artifact; approval recorded.

### F040 — GitHub Actions trigger + record run URL
- Goal: trigger workflow and store reference as artifact.

Notes:
- You can stop after F022 and still have a convincing end-to-end MVP.
- F031+ requires more orchestration logic; keep those later.