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

## Environments

| `COURSE_ENV` | Account / URL | Tenant | When |
|--------------|---------------|--------|------|
| `staging` | staging.uipath.com/partnersuccess | Workshops | While authoring |
| `prod` (default) | cloud.uipath.com/tpenlabs | CodingAgentsPractice | Live site (CI) |

CI always builds with `prod`. Switch locally with the `COURSE_ENV` variable.

## Publishing to GitHub

This repo is scaffolded locally. To create the remote and deploy:

```bash
cd coding-agents-course
git init && git add . && git commit -m "Initial scaffold"
gh repo create uipath-practice/CodingAgentsCourse --public --source=. --push
# then enable GitHub Pages on the gh-pages branch (created by the deploy workflow)
```
