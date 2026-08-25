# Trainer Notes (Internal — Not Published)

This file is for trainers/facilitators only. It is **not** part of `docs/` and is
never built into the MkDocs site or deployed to GitHub Pages — GitHub Pages has
no way to restrict access by email, so anything that needs to stay admin-only
lives here in the repo instead, not on the public site. Do not move this content
into `docs/` or reference it from `mkdocs.yml`/`mkdocs.local.yml`.

## Environment & Tenant Setup

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

### TODO — fill in before the next cohort

- [ ] Is there a reset/cleanup step needed between cohorts (stale processes,
      packages, jobs, Action Center tasks left in the shared folder from the
      previous run)? Document the steps or the script here.
- [ ] Any UiBank API seed-data reset needed, or is `https://uibank-api.uipath.com`
      stable/shared indefinitely across cohorts?
- [ ] Who to contact if a participant needs their credentials/tenant access
      re-issued mid-workshop?

## Timing & Agenda

_Not yet documented — add suggested pacing per lesson here._

## Answer Keys / Expected Outputs

_Not yet documented — add reference solutions / expected results here._
