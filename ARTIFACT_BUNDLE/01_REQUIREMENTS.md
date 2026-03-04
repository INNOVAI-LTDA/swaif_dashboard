# Requirements (MVP)

## Goal
Build a web app ("Solutions Creator") that orchestrates a software delivery lifecycle using:
- a **local agent** (runs commands on the operator machine)
- a **Python orchestrator API**
- a **Next.js UI**
- GitHub Actions for build/deploy/verify (later stages)

Lifecycle:
**requirements → code → test → build → deploy → verify**

Human-in-the-loop:
- Gate 1: pre-implement (approve plan before file changes)
- Gate 2: pre-commit (review diff before commit/push)
Gates must be configurable via environment variables.

## Constraints / Scope (MVP)
- Execution is local (Mode A). Design must allow future migration to server-side runners (Mode B).
- GitHub authentication is simplest possible (local git/`gh` session).
- GitHub Actions only for CI/CD integration.
- Avoid hard-coded labels in UI; copy the *visual style*, not wording.

## Key Outcomes
- Operator can create a "run" from the UI, see stage progression, see logs, and approve gates.
- Orchestrator persists: runs, stages, work items, approvals, artifacts, logs.
- Agent executes orchestrator-issued work items and streams logs back.
- At end: a final report artifact summarizing actions/results.