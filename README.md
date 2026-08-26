# UiPath Coding Agents Workshop — Site

Hands-on course teaching clients & partners to build UiPath agents and Maestro
orchestrations with coding agents (Claude Code) and the `uip` CLI.

Built on the same MkDocs framework as the
[Agentic Practice Workshop](https://github.com/uipath-practice/AgenticPracticeCourse),
with three additions: a private knowledge base, a configurable training environment,
and a CLI/KB-driven lesson-generation path alongside the screenshot path.

## How it works

```
../knowledge-base/  (private SSOT, NOT in this repo)
        ↓  used as context to generate accurate lessons
docs/*.md  →  MkDocs builds HTML  →  GitHub Actions  →  gh-pages  →  GitHub Pages
```

| Path | Purpose |
|------|---------|
| `docs/` | Published page content — one `.md` per page |
| `mkdocs.yml` | Site config + **published** nav |
| `mkdocs.local.yml` | Local-only nav incl. work-in-progress (gitignored) |
| `main.py` | Environment variables (staging vs prod) for the training callout |
| `Master/` | Authoring rules & templates (copied from base framework) |
| `.claude/commands/` | Authoring slash commands (copied from base framework) |
| `hooks/`, `scripts/` | Two-column hook; screenshot metadata pipeline (copied) |
| `.github/workflows/deploy.yml` | Auto-deploy to GitHub Pages on push to `main` |

The knowledge base is intentionally kept **outside this public repo** (`../knowledge-base/`)
so internal material is never published.

## First-time setup

```bash
# 1. Pull the reusable framework files from the base repo
./bootstrap-framework.sh

# 2. Install dependencies
pip install -r requirements.txt

# 3. Preview locally (authoring environment + WIP nav)
COURSE_ENV=staging mkdocs serve -f mkdocs.local.yml
# open http://127.0.0.1:8000

# 4. Release-equivalent build check
COURSE_ENV=prod mkdocs build
```

## Publishing to GitHub

This repo is scaffolded locally. To create the remote and deploy:

```bash
cd coding-agents-course
git init && git add . && git commit -m "Initial scaffold"
gh repo create uipath-practice/CodingAgentsCourse --public --source=. --push
# then enable GitHub Pages on the gh-pages branch (created by the deploy workflow)
```

## Trainer Notes (Internal)

This section is for trainers/facilitators only. It stays in this README rather
than `docs/` because GitHub Pages has no way to restrict access by email —
anything admin-only needs to live in the repo itself, not on the public site.
Do not move this content into `docs/` or reference it from
`mkdocs.yml`/`mkdocs.local.yml`.

### Environment & Tenant Setup

The site's `main.py` defines a `COURSE_ENV` switch with two profiles (`staging`
and `prod`) driving the `{{ training_url }}` / `{{ training_tenant }}` macros
used throughout the lessons. In practice, only the cloud environment below is
real — there is no separate staging UiPath org/tenant to author or test
against. Treat the `staging` profile in `main.py` as unused/vestigial.

| Organization | URL | Tenant | Used for |
|---|---|---|---|
| `tpenlabs` | https://cloud.uipath.com/tpenlabs | `CodingAgentsPractice` | The one real environment — both authoring/testing and the live participant-facing environment (CI builds with `COURSE_ENV=prod`) |

All exercises operate inside a single shared Orchestrator folder in this
org/tenant (`tpenlabs` / `CodingAgentsPractice`):

- **Folder name:** `CodingAgentsILT`
- **Folder key:** `c30345cd-5543-46a9-b42b-0354e60b4f15`

Every deployable artifact (agent, coded app, Maestro flow, RPA process) is
named with a `{YourName}` prefix (e.g. `{YourName}LoanUnderwritingAgent`) so
participants sharing the same tenant/folder don't collide with each other's
packages, processes, or Orchestrator entities.

### Inviting Participants

Before a cohort starts, invite each participant to the `tpenlabs` org so they
can log in with their own email:

1. In the `tpenlabs` org, go to the **Admin** tab.
2. Go to **Accounts and Local Groups**.
3. Invite each participant using their email address.
4. Make sure each invited participant is added to the **CodingAgentsGroup**
   local group — this is what grants them access to the `CodingAgentsPractice`
   tenant and the `CodingAgentsILT` folder.

### Before Each Training

- [ ] Confirm the **LoanUnderwriting** storage bucket exists in the
      **CodingAgentsILT** folder in Orchestrator — the RPA lesson (Application
      Intake & Enrichment) uploads results there, and the run fails if it's
      missing.

### TODO — fill in before the next cohort

- [ ] Is there a reset/cleanup step needed between cohorts (stale processes,
      packages, jobs, Action Center tasks left in the shared folder from the
      previous run)? Document the steps or the script here.
- [ ] Any UiBank API seed-data reset needed, or is `https://uibank-api.uipath.com`
      stable/shared indefinitely across cohorts?
- [ ] Who to contact if a participant needs their credentials/tenant access
      re-issued mid-workshop?

### Timing & Agenda

_Not yet documented — add suggested pacing per lesson here._

### Answer Keys / Expected Outputs

_Not yet documented — add reference solutions / expected results here._
