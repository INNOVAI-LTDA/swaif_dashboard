# Template Usage (Copy this bundle to other projects)

This repo’s `ARTIFACT_BUNDLE/` is designed to be reusable across projects.  
To use it as a starting template in a new repository, follow the steps below.

## 1) Copy the bundle
Copy the entire `ARTIFACT_BUNDLE/` directory into the target repo.

Keep these paths the same (they are referenced by prompts and instructions):
- `ARTIFACT_BUNDLE/00_INDEX.md`
- `ARTIFACT_BUNDLE/agent-kit/`
- `ARTIFACT_BUNDLE/uml/`
- (optional) `ARTIFACT_BUNDLE/features/` and `ARTIFACT_BUNDLE/prompts/`

## 2) Set the project identity fields
In the target repo, update the following docs to reflect the new project:

- `ARTIFACT_BUNDLE/00_INDEX.md`  
  - update repo name, branch policy notes if different

- `ARTIFACT_BUNDLE/01_REQUIREMENTS.md`  
  - update product goal, scope, constraints, and target environment

- `ARTIFACT_BUNDLE/03_REPO_STRUCTURE.md`  
  - update folders if the target repo uses different structure

## 3) Configure the Agent Kit (project-specific)
The Agent Kit is intentionally generic. For a new project, update:

- `ARTIFACT_BUNDLE/agent-kit/agent.env.example`
  - `SWAIF_ORCHESTRATOR_URL`
  - `SWAIF_AGENT_NAME`
  - `SWAIF_WORKSPACE_ROOT`

- `ARTIFACT_BUNDLE/agent-kit/allowlist.commands.txt`
  - add/remove allowed commands for that project

- `ARTIFACT_BUNDLE/agent-kit/allowlist.paths.txt`
  - restrict to the safest workspace locations for that project

Recommended: keep allowlists strict during early development.

## 4) Add repo-specific copilot instructions
Create (or update) the repo’s `copilot-instructions.md` to:
- enforce folder boundaries
- point Copilot to this bundle as the source of truth
- specify OS/environment assumptions (Windows/macOS/Linux)
- define “plan-only vs implement” expectations

## 5) Run the workflow using small deliverables
Use the “feature slicing” method:
- define small features (spec + acceptance criteria)
- implement one feature at a time via copilot-cli prompts
- commit frequently

## 6) Keep secrets out of git
Never commit:
- local `.env` files
- tokens, PATs, API keys
Use `.env.example` files for templates instead.