# Local Agent Runbook (Mode A)

## Startup
- register agent
- poll work-items
- execute allowlisted commands
- stream logs
- mark complete

## Failure handling
- timeouts
- non-zero exit codes
- connectivity loss
- partial logs

## Audit trail
Every execution must include:
- work_item_id
- command
- start/end timestamps
- exit code
- stdout/stderr lines (or references)