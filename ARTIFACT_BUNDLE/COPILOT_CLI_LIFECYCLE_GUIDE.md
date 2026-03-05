# Copilot-CLI Lifecycle Guide (Template + Project Guide)

This guide shows how to run the full project lifecycle using **copilot-cli** with small, repeatable deliverables.

It is designed to work for this repo (`INNOVAI-LTDA/swaif_dashboard`) and to be reusable as a template for other projects.

> Rule: always work on branch `dev` unless you explicitly intend otherwise.

---

## 0) Prerequisites / One-time setup

### Repo prerequisites
- `ARTIFACT_BUNDLE/` exists and is committed
- `copilot-instructions.md` exists at repo root and is committed
- Folder boundaries exist (even if empty):
  - `apps/web/`
  - `services/orchestrator/`
  - `services/agent/`

### Local prerequisites (Windows)
- Git installed and authenticated for push
- Node + npm installed (for UI later)
- Python installed (for services later)

---

## 1) How to call copilot-cli (two supported modes)

Because copilot-cli variants differ, this guide uses **generic placeholders** for commands.

### Mode A — Interactive (recommended)
1. Start copilot-cli:
   - **Command**: `copilot` (or your equivalent)
2. Paste the prompt text from the “Prompt Input” sections below.
3. Copy the output into the specified file(s).

### Mode B — Prompt-file driven (best for repeatability)
If your copilot-cli supports reading from stdin, store prompts in a file and pipe them in.

- **Command pattern (example)**:
  - `Get-Content <prompt-file> | copilot chat`

> If you paste `copilot --help` output into the chat later, we can rewrite this guide with the exact command syntax for your installed version.

---

## 2) Lifecycle Overview (requirements → code → test → build → deploy → verify)

Each step below documents:
- **Command**: what you run in the terminal
- **Prompt Input**: prompt text and/or input files
- **Expected Output**: what copilot-cli should produce (and where you store it)
- **Human check**: what you review before moving on

We recommend running the lifecycle in **small feature slices**, as defined in `ARTIFACT_BUNDLE/FEATURE_CATALOG.md`.

---

# STEP 1 — Requirements (Doc-only)

### Command
- Start copilot-cli in interactive mode (or pipe a prompt file).

### Prompt Input
**Inputs (files):**
- `ARTIFACT_BUNDLE/01_REQUIREMENTS.md`
- `ARTIFACT_BUNDLE/07_ACCEPTANCE_CRITERIA.md`
- `ARTIFACT_BUNDLE/FEATURE_CATALOG.md` (if you use feature slicing)

**Prompt (example):**
- “Read copilot-instructions.md and ARTIFACT_BUNDLE/*.md. Propose 5–10 small features (F###) that implement the MVP. For each feature: goal, scope, out-of-scope, acceptance criteria. Output as markdown.”

### Expected Output
- `ARTIFACT_BUNDLE/FEATURE_CATALOG.md` (new or updated)
- Optionally: feature specs created under `ARTIFACT_BUNDLE/features/`

### Human check
- Features are small (1–2 hours each), testable, and respect folder constraints.

---

# STEP 2 — Planning (Plan-only; no code)

### Command
- copilot-cli (interactive or prompt-file driven)

### Prompt Input
**Inputs (files):**
- `ARTIFACT_BUNDLE/02_ARCHITECTURE_AND_FLOW.md`
- `ARTIFACT_BUNDLE/04_API_CONTRACT.md`
- `ARTIFACT_BUNDLE/05_GATES_AND_POLICIES.md`

**Prompt (example):**
- “PLAN ONLY. Implement feature F0XX. Do not write code. Produce a step plan: endpoints, data model, files to create/modify, manual test commands (PowerShell). Output as ARTIFACT_BUNDLE/features/F0XX_<slug>.md or ARTIFACT_BUNDLE/plan/F0XX_PLAN.md.”

### Expected Output
- One markdown plan/spec document for the chosen feature, saved under:
  - `ARTIFACT_BUNDLE/features/` (preferred) or
  - `ARTIFACT_BUNDLE/plan/`

### Human check
- No scope creep.
- Clear manual tests.
- Clear file paths.
- Aligns with two-gate future design (even if gates not implemented yet).

---

# STEP 3 — Implement (Code changes; small scope)

### Command
- copilot-cli (interactive or prompt-file driven)
- git for staging/committing after review

### Prompt Input
**Inputs (files):**
- `copilot-instructions.md`
- A single feature spec: `ARTIFACT_BUNDLE/features/F0XX_<slug>.md`

**Prompt (example):**
- “Implement ONLY feature F0XX as specified. Provide file-by-file contents. Keep changes minimal. Do not implement other features.”

### Expected Output
- A set of file changes (paths + content) that you apply locally under:
  - `apps/web/` and/or `services/*`
- Updated docs if the feature requires it.

### Human check (before staging)
- Confirm changes touched only the expected files.
- Confirm no secret files were introduced.
- Run the feature’s manual test commands.

### Git commands (after passing manual test)
```powershell
git status
git add -A
git diff --staged
git commit -m "feat: F0XX <short description>"
git push origin dev
```

---

# STEP 4 — Test (Local test & test automation)

### Command
- copilot-cli (to generate tests) + run tests locally

### Prompt Input
**Inputs (files):**
- the implemented feature spec
- any existing test conventions in the repo (once they exist)

**Prompt (example):**
- “Add minimal tests for feature F0XX. Keep tests fast. Provide commands to run tests on Windows.”

### Expected Output
- New/updated test files
- A documented test command (e.g., `pytest`, `npm test`, etc.)

### Human check
- Tests pass locally.
- Tests are deterministic and minimal.

---

# STEP 5 — Build (Local build + CI readiness)

### Command
- Run local build commands
- (Later) add GitHub Actions workflows under `.github/workflows/`

### Prompt Input
**Prompt (example):**
- “Add/adjust build scripts and document build commands for UI and services. Keep minimal.”

### Expected Output
- Updated build scripts (package.json / requirements / docs)
- Build instructions in README or an artifact doc

### Human check
- `npm run build` works (for UI once it exists)
- Python packaging/deps are consistent

---

# STEP 6 — Deploy (GitHub Actions integration)

### Command
- copilot-cli to draft workflows
- `gh` (optional) to dispatch workflows
- `git push` triggers workflows if push-based

### Prompt Input
**Inputs (files):**
- `ARTIFACT_BUNDLE/05_GATES_AND_POLICIES.md`
- Deployment expectations (to be added when ready)

**Prompt (example):**
- “Create a minimal GitHub Actions workflow to build/test. Store workflow run reference as an artifact in the orchestrator design.”

### Expected Output
- `.github/workflows/<workflow>.yml`
- Docs describing how to trigger it and where to see results

### Human check
- Workflow runs on push to `dev` (or dispatch) and is visible in GitHub.

---

# STEP 7 — Verify (Post-deploy verification + reporting)

### Command
- copilot-cli to propose verification scripts/checklists

### Prompt Input
**Prompt (example):**
- “Define verification checks and a final report artifact for runs, aligned to acceptance criteria.”

### Expected Output
- A verification checklist and report format (docs first; later code)

### Human check
- Verifications map directly to acceptance criteria.

---

## 3) Expected artifacts (what you should see accumulating)
As you progress, you should accumulate:
- Feature specs: `ARTIFACT_BUNDLE/features/*.md`
- Prompt files: `ARTIFACT_BUNDLE/prompts/*.txt` (optional but recommended)
- Plans: `ARTIFACT_BUNDLE/plan/*.md` (optional)
- Diagrams: `ARTIFACT_BUNDLE/uml/*.mmd`

---

## 4) Minimal “command + inputs + outputs” table (quick reference)

| Step | Command (conceptual) | Prompt Inputs | Expected Outputs |
|------|----------------------|--------------|------------------|
| Requirements | copilot-cli chat | `01_REQUIREMENTS.md` | Feature list/spec updates |
| Plan | copilot-cli chat | `04_API_CONTRACT.md` | `features/F0XX_*.md` plan |
| Implement | copilot-cli chat | `features/F0XX_*.md` | Code changes in `apps/`/`services/` |
| Test | copilot-cli chat + run tests | feature spec + code | Test files + test command |
| Build | run build + copilot-cli | build constraints | Build scripts/docs |
| Deploy | copilot-cli + git push/gh | workflow goals | `.github/workflows/*.yml` |
| Verify | copilot-cli | acceptance criteria | verification checklist/report |

---

## 5) Project-specific notes (this repo)
- Repo: `INNOVAI-LTDA/swaif_dashboard`
- Branch: `dev`
- Sales UI is isolated on `ui-for-sell` (do not modify in product build)
- Windows is the primary environment
- The Agent Kit template is under `ARTIFACT_BUNDLE/agent-kit/`
