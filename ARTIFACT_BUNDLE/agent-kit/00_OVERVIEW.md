# Agent Kit Overview (Template)

## Purpose
The Agent executes work items issued by the Orchestrator and streams logs/results back.

This kit is designed to be copied to other repos with minimal changes:
- update service URLs
- update allowlists
- update workspace rules

## Modes
- Mode A (MVP): Local agent running on the operator machine
- Mode B (Future): Remote runner / server agent

## Security posture (MVP)
- Default-deny: agent should only execute commands in an allowlist.
- Default workspace root: a dedicated folder on disk (not arbitrary paths).
- Logs must be streamed back to orchestrator for auditability.