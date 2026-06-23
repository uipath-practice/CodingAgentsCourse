# Build the Eligibility Agent

!!! tip "Here is our plan for this lesson:"

    1. Set up a working folder with the sample files and the agent prompt.
    2. Ask **Claude Code** to generate the agent with the UiPath agent skill.
    3. Watch it scaffold the solution, configure the schema, and validate.

## Goal

By the end of this lesson you'll have a low-code agent — built entirely through Claude Code — that takes a claim PDF and a policy PDF as inputs and returns a structured eligibility decision. You won't open Agent Builder by hand; you'll describe what you want and let the agent skill do the scaffolding.

## What the agent decides

The agent is a **Claims Eligibility Specialist**. It doesn't calculate payouts or judge coverage — it only runs five threshold checks, in order, and stops at the first hard failure:

1. **Policy status** — is the policy Current/Paid (not Lapsed/Cancelled/Expired)?
2. **Identity** — does the claimant match the named insured?
3. **Address** — do the claim and policy addresses match?
4. **Coverage period** — did the incident happen within the policy dates?
5. **Filing deadline** — was the claim filed within 60 days of the loss?

The full validation logic and the required output structure are shown below — you'll copy both into Claude Code in Step 2.

## Steps

### 1. Set up your working folder

Create an empty folder to work in. Download the sample claim and policy PDFs (from [Run and Review](2-run-and-review.md)) and drop them here too, so the agent can use them later.

```bash
mkdir claims-eligibility-agent
cd claims-eligibility-agent
# add the sample claim + policy PDFs to this folder
```

### 2. Open Claude Code and generate the agent

Open **Claude Code** in that folder (make sure the UiPath skills are installed — see the Getting Started exercise). Give it the instruction below, then paste in the two blocks that follow it:

```text
Using the UiPath agent skill, generate a low-code agent named "claims-eligibility".
The agent takes two file inputs: in_ClaimPDF (an FNOL claim PDF) and in_PolicyPDF (a
homeowner's policy PDF). It reads both PDFs and validates the claim against the policy,
using the system prompt and output schema below.
```

**System prompt** — the validation logic. Copy this in:

```text
You are a Claims Eligibility Specialist. Your sole responsibility is to verify that a property
insurance claim meets the threshold requirements for processing. You do not evaluate coverage,
calculate payouts, or assess credibility. You only determine whether the claim is eligible to be reviewed.

Inputs:
- in_ClaimPDF — the First Notice of Loss (FNOL) claim form submitted by the claimant (PDF).
- in_PolicyPDF — the homeowner's insurance policy referenced by the claim (PDF).
Read both PDFs directly to find the values each check needs.

Perform the following checks in order. If any check fails, stop and report the failure. Do not
continue to subsequent checks after a hard failure.

1. Policy Status Check. Find the Payment Status on the policy. Acceptable statuses are "Current"
   and "Paid". If it is "Lapsed", "Cancelled", or "Expired", the check fails.
2. Identity Verification. Compare the Claimant Name on the claim to the Named Insured on the
   policy. Allow minor variations (nicknames, middle names, minor spelling). If they refer to
   different people, the check fails.
3. Property Address Match. Compare the property address on the claim and the policy. Normalize
   formatting (e.g. "St." vs "Street"). If they differ, the check fails. This exercise has no
   separate incident report, so set report_address to "N/A — no incident report in this exercise".
4. Coverage Period Check. Confirm the Incident Date falls on or after the policy Effective Date
   and on or before the Expiration Date. If outside this window, the check fails.
5. Filing Deadline Check. Calculate calendar days between the Incident Date and the Date of
   Submission. If greater than 60 days, check whether the claim provides any explanation for the
   delay. No explanation → fail. Explanation present → flag as "late_with_justification" rather
   than a hard fail.

Special rules:
- All checks pass → eligible = true, recommendation = "proceed_to_coverage_analysis".
- Any hard fail → eligible = false, stop checking, recommendation = "deny".
- Only issue is a late filing with justification → eligible = true, recommendation = "escalate".
- Do not infer information that is not explicitly present in the documents.

User prompt: Check eligibility for the attached claim (in_ClaimPDF) against the attached policy (in_PolicyPDF).
```

**Output schema** — the agent must return output matching this:

```json
{
  "out_isEligible": "boolean — whether the claim is eligible for assessment",
  "out_EligibilityChecksJSON": {
    "claim_id": "string",
    "policy_number": "string",
    "checks": {
      "policy_status":   { 
         "result": "pass | fail", 
         "detail": "string" 
      },
      "identity_match":  { 
         "result": "pass | fail", 
         "claimant_name": "string", 
         "policyholder_name": "string", 
         "detail": "string" 
      },
      "address_match":   { 
         "result": "pass | fail", 
         "claim_address": "string", 
         "policy_address": "string", 
         "detail": "string" },
      "coverage_period": { "result": "pass | fail", "incident_date": "string", "effective_date": "string", "expiration_date": "string", "detail": "string" },
      "filing_deadline": { "result": "pass | fail ", "incident_date": "string", "claim_date": "string", "days_elapsed": "number", "detail": "string" }
    },
    "failure_reason": "string | null — populated only if eligible is false",
    "recommendation": "proceed_to_coverage_analysis | deny | escalate"
  },
  "out_EligibilityAnalysisSummary": "string — brief plain-language explanation of the decision"
}
```

!!! tip "Ask for the outcome, not the commands"
    You don't need to know the CLI commands. The skill encodes the sequence — your job is to describe the agent and approve the steps as Claude Code proposes them.

### 3. Watch it scaffold

Claude Code will work through roughly this sequence (approve each step as it goes):

- create a **solution**, then initialize the agent inside it;
- add the agent project to the solution;
- write the **system prompt** and configure the **input/output schema** (the two file inputs and the three outputs);
- run a **validate** step to confirm the configuration is supported by Studio Web.

![Claude Code scaffolding the agent: solution created, agent initialized, schema configured](1-build-the-eligibility-agent.images/claude-scaffolds-agent.png){ .screenshot }

!!! note "Heads up (preview)"
    Two things you'll likely see: the skill may create a brand-new solution rather than reusing an existing one, and you can't debug the agent from the CLI yet — that's why the next lesson pushes it to Studio Web to run it. Both are known preview behaviors.

Done. The agent is built and validated locally. Next, you'll push it to Studio Web and run it against the sample claims.
