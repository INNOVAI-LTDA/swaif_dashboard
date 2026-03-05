# Agent Install (Windows / VSCode)

## Prereqs
- Python 3.11+ (or your standard)
- Git
- (Optional later) GitHub CLI `gh`
- VSCode

## Recommended setup
1) Create venv in `services/agent/.venv`
2) Install dependencies from `services/agent/requirements.txt`
3) Copy `ARTIFACT_BUNDLE/agent-kit/agent.env.example` to a local `.env` (do NOT commit secrets)
4) Start agent from VSCode terminal

## Verification
- Agent registers to orchestrator
- Agent polls and receives "no work items" cleanly