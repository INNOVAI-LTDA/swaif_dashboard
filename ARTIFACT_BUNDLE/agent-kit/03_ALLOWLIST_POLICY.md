# Agent Allowlist Policy (Template)

## Goals
Prevent accidental destructive operations during early development and make executions auditable.

## Command allowlist
Agent may execute only commands matching one of:
- exact command names (e.g., `python`, `node`, `npm`, `git`, `gh`)
- or exact scripts known to the project

## Path allowlist
Agent may only operate under `SWAIF_WORKSPACE_ROOT` and within the repo working directory.

## Recommended phases
- Phase 1: allow only read-only and echo commands
- Phase 2: allow package install/build/test
- Phase 3: allow git commit/push (only after Gate 2 approval)