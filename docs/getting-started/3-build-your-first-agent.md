# Build, Test and Improve Your First Agent

!!! tip "Here is our plan for this lesson:"

    1. Ask your coding agent to build a small agent from a prompt, then try it on a sample claim.
    2. Generate test documents and turn them into an evaluation set.
    3. Run the evaluation, let your coding agent fix what fails, and run it again.

## Goal

By the end of this lesson you'll have a working agent in **Studio Web** and a set of tests that tell you whether it still works. You'll also have run the loop you'll use for every agent after this one: describe it, build it, test it, fix it, test again.

The agent is deliberately small, so the focus stays on that loop. Later exercises build richer agents with context, tools and structured extraction.

## What you'll build

An insurer receives a **First Notice of Loss (FNOL)** claim together with the homeowner's policy it refers to. Before anyone assesses the damage, someone checks the basics. Your agent does that check. It reads both PDFs and runs five checks:

1. **Policy status**: is the policy Current or Paid, rather than Lapsed, Cancelled or Expired?
2. **Identity**: is the claimant the person named on the policy?
3. **Address**: do the claim and the policy describe the same property?
4. **Coverage period**: did the loss happen while the policy was in force?
5. **Filing deadline**: was the claim filed within 60 days of the loss, or does it explain why not?

It returns a yes or no on eligibility, a flag for claims a person should look at, a short summary, and the result of each check as JSON. Other apps and agents in later exercises read that JSON, so the field names are fixed.

## Why test an agent at all?

An LLM doesn't always give the same answer twice. A prompt that works on the two samples you tried can still trip on a date written as `10.10.2026`, on a claimant who shares a surname with the policyholder, or on an explanation hidden in the middle of a paragraph. A small change to the prompt, or a new model, can break a case that used to pass.

An **evaluation set** catches that. It's a list of test cases, each one an input plus the answer you expect. You run the whole set after every change and compare scores. The checks that do the scoring are called evaluators. You'll use three kinds:

| Evaluator | What it checks here |
| :--- | :--- |
| Exact match | The decision fields `out_isEligible` and `out_Escalate` are exactly right |
| JSON similarity | The five check results and the values behind them match |
| LLM judge | The summary gives the same decision and the same reason, in any wording |

Writing good test cases is the hard part. Here a document generator does it for you: it creates a claim and a policy with one known problem planted in them, so you know what the right answer is.

!!! tip "Training Environment"
    Log in at **[{{ training_url }}]({{ training_url }})** and use tenant **{{ training_tenant }}** for this exercise.

## Steps

### 1. Set up your working folder

Create an empty folder with a `samples` subfolder:

```bash
mkdir first-agent
cd first-agent
mkdir samples
```

Download the two sample pairs into `samples`. Each claim refers to its policy by number, so always use a claim with its own policy.

| Claim | Policy | Scenario |
| :--- | :--- | :--- |
| [CLM-2026-357861-claim.pdf](assets/claim-samples/CLM-2026-357861-claim.pdf) | [HO-5534416561.pdf](assets/claim-samples/HO-5534416561.pdf) | Mumbai (INR), water damage, Rajesh Kumar Sharma |
| [CLM-2026-896147-claim.pdf](assets/claim-samples/CLM-2026-896147-claim.pdf) | [HO-3883873532.pdf](assets/claim-samples/HO-3883873532.pdf) | Melbourne (AUD), fire damage, Mei Lin Tan |

Open a couple of them. You'll notice the dates are written day first, and that both losses happened on the last day of the policy. Your agent will have to get both of those right.

<details markdown="1">
<summary>Optional: define your conventions (AGENTS.md)</summary>

Before you build much, drop a small file in the folder with your conventions: naming, structure, and rules like "*keep workflows small; don't put everything in one folder*".

- Your coding agent reads it automatically and follows it in every new session.
- It steers the agent beyond a single prompt, which keeps the output consistent across sessions and across coding agents.
- There's no single file name yet (**`CLAUDE.md`**, **`AGENTS.md`**, **`GEMINI.md`** and so on). If you use several coding agents, keep one real file and symlink the others to it.
- Here's a starting point. Expand it as you go:

```markdown
# Creating new projects

- When I ask to build something in this workspace folder, create a new project folder (short, lowercase, hyphenated) instead of working in the workspace root.
- Initialize with `git init` unless already inside an existing repo.
- Add a project-level `AGENTS.md` (like this one) before substantial implementation, so future sessions keep the same behavior.
- Continue all implementation, validation, and file edits inside the new project folder.

# UiPath projects

- If a request mentions UiPath, RPA, Orchestrator, Maestro, Studio Web, `.xaml`, `.flow`, `.bpmn`, context grounding, queues, assets, robots, jobs, triggers, or `uip`, use the installed UiPath agent skills when relevant.
- Prefer the uip CLI for setup, validation, build, packaging, run, and platform operations.
- Ask before publishing, deploying, deleting, or modifying any UiPath Cloud/Orchestrator resource (package, folder, queue item, etc).
```
</details>

### 2. Build the agent

Open **Claude Code** (or your coding agent) in the `first-agent` folder and give it this prompt:

```text
Using the UiPath agent skill, build a low-code agent called "EligibilityCheckAgent" in a solution called "EligibilityCheck" followed by my first name. If you can't tell my first name, use today's date instead. Use Claude Sonnet 5 as the agent's model. The agent takes two PDF files, a claim and a policy, reads both, and checks the claim against the policy.

Inputs:
- in_ClaimPDF: the First Notice of Loss (FNOL) claim form submitted by the claimant (PDF).
- in_PolicyPDF: the homeowner's insurance policy referenced by the claim (PDF).

Things the agent needs to check between the two documents:
1. Policy Status Check. Find the Payment Status on the policy. Acceptable statuses are "Current"
   and "Paid". If it is "Lapsed", "Cancelled", or "Expired", the check fails.
2. Identity Verification. Compare the Claimant Name on the claim to the Named Insured on the
   policy. Allow minor variations (nicknames, middle names, minor spelling). If they refer to
   different people, the check fails.
3. Property Address Match. Compare the property address on the claim and the policy. Normalize
   formatting (e.g. "St." vs "Street"). If they differ, the check fails. This exercise has no
   separate incident report, so set report_address to "N/A — no incident report in this exercise".
4. Coverage Period Check. Confirm the Incident Date falls on or after the policy Effective Date
   and on or before the Expiration Date. A loss on the first or last day passes. If outside this
   window, the check fails.
5. Filing Deadline Check. Calculate calendar days between the Incident Date and the Date of
   Submission. More than 60 days: check whether the claim gives an explicit explanation for the delay.
   Explanation → pass (and escalate, see below). No explanation → fail. The form's pre-printed
   60-day notice is not an explanation.

The agent must return output matching this structure. Downstream apps and agents depend on it:
{
  "out_isEligible": "boolean: whether the claim is eligible for assessment",
  "out_EligibilityAnalysisSummary": "string: brief plain-language explanation of the decision",
  "out_Escalate": "boolean: true if a person needs to look at the claim (late filing with an explanation, or a document that can't be read)",
  "out_EligibilityChecksJSON": {
    "claim_id": "string",
    "policy_number": "string",
    "checks": {
      "policy_status": {
        "result": "pass | fail",
        "summary": "string"
      },
      "identity_match": {
        "result": "pass | fail",
        "claimant_name": "string",
        "policyholder_name": "string",
        "summary": "string"
      },
      "address_match": {
        "result": "pass | fail",
        "claim_address": "string",
        "policy_address": "string",
        "report_address": "string",
        "summary": "string"
      },
      "coverage_period": {
        "result": "pass | fail",
        "incident_date": "string",
        "effective_date": "string",
        "expiration_date": "string",
        "summary": "string"
      },
      "filing_deadline": {
        "result": "pass | fail",
        "incident_date": "string",
        "claim_date": "string",
        "days_elapsed": "number",
        "summary": "string"
      }
    }
  }
}

- All checks pass → out_isEligible = true, otherwise false.
- Late filing with an explanation → out_isEligible = true, out_Escalate = true.
- The agent should not infer information that isn't explicitly in the documents.
- This is the FNOL eligibility step for property claims. Write the prompt with common practice in
  this area in mind. That can guide how values are read and normalized, but must not add checks,
  escalation reasons or pass/fail rules beyond the ones above.
- The decision must follow from the checks: the agent produces the five check results before
  out_isEligible, and inside each check writes the detail before the result. The summary must
  agree with the check results.
- Every output field always gets a value of the right type, even when a document can't be read.
  In that case the checks fail and out_Escalate = true.
- The prompt should be well structured and easy for a person to read.

There are a couple of sample documents in the samples folder. When the agent is built, upload it to Studio Web and try it on one of the samples. Don't deploy it.
```

Approve the steps as they come. In our test runs this took about four minutes, and the coding agent worked through roughly this sequence:

- read the UiPath agent skill and the sample PDFs;
- create the solution and the agent inside it;
- write the agent's system prompt, the two file inputs and the output schema, and add the built-in **Analyze Files** tool, which is how a low-code agent reads a PDF;
- validate the project, upload it to Studio Web, and run the agent once on a sample pair.

Watch the last step. In one of our runs the five checks came back right, but the summary said the claim was eligible and filed after 53 days. The coding agent spotted the contradiction, tightened the prompt so the summary is written last, and ran it again. The checks and the summary come from the same model and can still disagree, which is what the LLM judge in step 4 will catch.

<details markdown="1">
<summary>Here is the output from one of our runs (claim CLM-2026-896147)</summary>

```json
{
  "out_EligibilityChecksJSON": {
    "claim_id": "CLM-2026-896147",
    "policy_number": "HO-3883873532",
    "checks": {
      "policy_status": {
        "summary": "The policy's Payment Status is printed as 'Current - Paid in Full', which qualifies as Current/Paid.",
        "result": "pass"
      },
      "identity_match": {
        "claimant_name": "Mei Lin Tan",
        "policyholder_name": "Mei Lin Tan",
        "summary": "The claimant name 'Mei Lin Tan' exactly matches the sole Named Insured 'Mei Lin Tan' on the policy.",
        "result": "pass"
      },
      "address_match": {
        "claim_address": "4/16 Chapel Street, St Kilda, VIC, 3182",
        "policy_address": "4/16 Chapel Street, St Kilda, VIC 3182",
        "report_address": "N/A — no incident report in this exercise",
        "summary": "Both addresses are the same unit 4 at 16 Chapel Street, St Kilda, VIC, 3182, after normalizing the unit notation; street number, name, unit, city and postal code all match.",
        "result": "pass"
      },
      "coverage_period": {
        "incident_date": "2026-04-14",
        "effective_date": "2025-04-14",
        "expiration_date": "2026-04-14",
        "summary": "The incident date of 2026-04-14 falls on the policy's last day of coverage (expiration date 2026-04-14), which is within the effective period 2025-04-14 to 2026-04-14 inclusive.",
        "result": "pass"
      },
      "filing_deadline": {
        "incident_date": "2026-04-14",
        "claim_date": "2026-07-06",
        "days_elapsed": 83.0,
        "summary": "83 calendar days elapsed between the incident date (2026-04-14) and the submission date (2026-07-06), which exceeds the 60-day limit, and the claimant provided no explanation for the delay.",
        "result": "fail"
      }
    }
  },
  "out_isEligible": false,
  "out_Escalate": false,
  "out_EligibilityAnalysisSummary": "This claim is not eligible for assessment. Four of the five checks passed (policy status, identity match, address match, and coverage period), but the filing deadline check failed: 83 days elapsed between the incident date (2026-04-14) and the submission date (2026-07-06), exceeding the 60-day limit, and the claimant provided no explanation for the delay. Because the late filing has no explanation, this does not meet the escalation criteria, so the claim is not escalated."
}
```

</details>

!!! note "Exact wording will vary"
    The summaries are generated, so yours won't match ours word for word. The structure, each check's `result` and the decision should match. Both samples are filed late without an explanation, so both should come back `out_isEligible: false`.

!!! note "Field names in the terminal"
    When the coding agent runs the agent from the CLI, the output it prints may show the field names in PascalCase (`OutIsEligible`, `ClaimId`). That's only how the CLI displays them. The agent's real output uses the names from your schema.

### 3. Add one test case by hand

Before the coding agent builds the evaluation set, give it one working example to copy.

1. Open the solution your coding agent uploaded in Studio Web. It's called **EligibilityCheck** followed by your first name (or today's date).
2. Open **EligibilityCheckAgent** and select **Debug**.
3. Set `in_ClaimPDF` and `in_PolicyPDF` to a sample claim and its policy, and run it.
4. When the run finishes, add it to the **Default Evaluation Set**.

Studio Web now has a test case with real file attachments, stored the way Studio Web stores them. The coding agent can't create file attachments from the CLI on its own yet, so it will copy this one.

### 4. Create the evaluation set

You need seven test cases: one clean claim, one for each check that can fail, and one late claim that explains the delay. Choose the tab that matches your setup. Both give you the same evaluation set.

=== "Run the document generator"

    The **Retrieve Property Claim** process creates a claim and a policy with a planted problem and saves them to storage buckets. Give your coding agent this prompt:

    ```text
    Using the UiPath agent skill, create an evaluation set for the agent. An evaluation set is a list of test cases: input files plus the answer we expect. Create it and upload it to Studio Web, but don't run it yet.

    To get test documents, run the process "Retrieve Property Claim" in the Orchestrator folder "ClaimCase-Pro" once per test case, setting only in_Scenario and in_Discrepancy. It returns the claim ID and saves the claim form as <ClaimID>-claim.pdf in the storage bucket "Claims" in the same folder. The matching policy is <PolicyNumber>.pdf in the bucket "Insurance Policies Repository".

    Test cases (7, one per line):
    - in_Scenario = auto-settle: nothing is wrong, so the claim is eligible
    - in_Scenario = eligibility-fail, with in_Discrepancy =
      - ELIG_POLICY_LAPSED: premium unpaid from before the loss, so policy_status fails
      - ELIG_IDENTITY_MISMATCH: policy in a household member's name, so identity_match fails
      - ELIG_ADDRESS_MISMATCH: the house or unit number differs, so address_match fails
      - ELIG_COVERAGE_PERIOD: policy ended 5–20 days before the loss, so coverage_period fails
      - ELIG_LATE_FILING: loss 75–90 days before filing, no explanation, so filing_deadline fails
    - in_Scenario = review-fail, with in_Discrepancy = REVIEW_LATE_WITH_JUSTIFICATION: filed late,
      but the claim explains why, so the claim is eligible and escalated
    Name each test case after its setting, e.g. "ELIG_LATE_FILING". Call the first one "AUTO_SETTLE".

    Work out the expected answers from the PDFs.

    How to score each test case:
    1) Exact match on out_isEligible and out_Escalate: is the decision right?
    2) JSON similarity on out_EligibilityChecksJSON: are the check results and values right? Compare
       only the results and values, not the wording of the summaries.
    3) LLM judge on out_EligibilityAnalysisSummary: does the summary give the same decision and reason?
       Use a different model for the judge than the agent uses.

    I added a test case in Studio Web; it runs and reads its files fine. Set up the new test cases and their files exactly the way Studio Web did for that one, including how it stores the files, so the evaluation can open them.

    Put everything in a new evaluation set called "Eligibility Scenarios". Don't change or delete other evaluation sets.

    I'm editing in Studio Web in parallel, so merge with my version before uploading.
    ```

    The documents are generated fresh each time, so your claims, names and dates will differ from everyone else's.

=== "Use the offline kit"

    No access to the generator? Download [eval-documents.zip](assets/eval-documents.zip) and unzip it into an `eval-documents` folder next to `samples`. It holds seven claim and policy pairs produced by the same generator, plus `cases.csv`, which says which claim goes with which policy and what's wrong with each pair. Then give your coding agent this prompt:

    ```text
    Using the UiPath agent skill, create an evaluation set for the agent. An evaluation set is a list of test cases: input files plus the answer we expect. Create it and upload it to Studio Web, but don't run it yet.

    The test documents are in the eval-documents folder. cases.csv lists the 7 test cases: which claim and policy go together, and what's wrong with each one. Use one test case per row and name it after the case column, e.g. "ELIG_LATE_FILING".

    Work out the expected answers from the PDFs.

    How to score each test case:
    1) Exact match on out_isEligible and out_Escalate: is the decision right?
    2) JSON similarity on out_EligibilityChecksJSON: are the check results and values right? Compare
       only the results and values, not the wording of the summaries.
    3) LLM judge on out_EligibilityAnalysisSummary: does the summary give the same decision and reason?
       Use a different model for the judge than the agent uses.

    I added a test case in Studio Web; it runs and reads its files fine. Set up the new test cases and their files exactly the way Studio Web did for that one, including how it stores the files, so the evaluation can open them.

    Put everything in a new evaluation set called "Eligibility Scenarios". Don't change or delete other evaluation sets.

    I'm editing in Studio Web in parallel, so merge with my version before uploading.
    ```

You just edited the solution in Studio Web, so the last line of the prompt tells the coding agent to download your version first and keep your test case. In our runs it compared the two copies, kept the Studio Web changes, and checked again right before uploading.

When it's done, open **Eligibility Scenarios** in Studio Web. You should see seven test cases, each with a claim and a policy attached. Check a couple of expected answers against the PDFs yourself: the coding agent worked them out by reading the documents, and so can you.

### 5. Test and fix

Now the loop. Give your coding agent this prompt:

```text
Next, I want to make sure the agent's prompt works on all known test cases. I'll start each evaluation run in Studio Web; tell me when it's ready, then read the results yourself and see which test cases fail. If one fails, find out why, fix the prompt and run again. Repeat until the decisions are right on every case, the summary scores 95 or more and the JSON similarity 80 or more. Call it done only after two clean runs in a row. At most 3 fix iterations.

Rules
- Improve the agent, not the test. Only change an expected answer if it's clearly wrong, and ask me first.
- Fix it with general rules, not with details from the test files.
- Look at every test case. A case that didn't run counts as failed.
- If the judge itself errors, rerun it; don't change the agent for that.
- Don't change the output format: same field names and types, because other apps depend on them.
- While you debug, don't change the model or add other evaluation sets. Ask me first.
- Don't deploy to Orchestrator.

At the end, show me
- a before-and-after table of scores
- each prompt change and the problem it fixed
```

When the coding agent says it's ready, open **Eligibility Scenarios** in Studio Web and start the run there. It takes about a minute. Tell the coding agent when it's finished; it reads the scores itself.

!!! note "Start evaluation runs from Studio Web"
    Right now, evaluation runs with file inputs only work when you start them in Studio Web. Started from the CLI, every test case fails with `INVALID_ATTACHMENT_ID`. That's why the prompt asks the coding agent to hand the run over to you.

In one of our runs the first baseline looked fine. A second run of the same prompt missed the late claim with an explanation: the agent said it wasn't eligible. The PDF explains the delay in the third person, in the middle of the incident description ("The claim is late because the claimant was admitted to hospital the day after the loss..."). The agent's prompt told it to look for an explanation "written by the claimant", and the model sometimes read past it.

The coding agent fixed it with general rules: read every free-text field on the claim, and count an explanation wherever it appears, in first or third person. After that fix:

| Evaluator | Baseline (run 1 / run 2) | After the fix | Target |
| :--- | ---: | ---: | ---: |
| `out_isEligible` exact match | 100 / 85.7 | 100 | 100 |
| `out_Escalate` exact match | 100 / 85.7 | 100 | 100 |
| JSON similarity | 99.98 / 98.3 | 99.98 | 80 |
| Summary LLM judge | 83.6 / 83.0 | 99.86 | 95 |

The low judge scores in the baseline aren't all the agent's fault. The judge model crashed on one case per run and scored it 0, which is why the prompt says to rerun when the judge itself errors, and why the judge uses a different model from the agent.

Notice that one passing run didn't settle it. The late claim passed once, failed once, then passed after the fix. That's why the prompt asks for two clean runs in a row.

### 6. Optional: try another model

How much does the result depend on the model? Ask your coding agent:

```text
Now change the agent's model to gpt-5.6-luna, run the evaluation once, and show the scores next to the previous run. If any case fails, tell me why.
```

Start the run in Studio Web again. In our run, four of the seven cases failed outright: the new model left out three of the four output fields, so Studio Web rejected the output. The three cases that did run got the decisions right.

The run's overall scores hide this. They still read 100 for both decisions, 99.4 for JSON similarity and 97 for the summary, because the averages only count the cases that finished. Always read the scores per test case, not just the summary line.

Afterwards, ask your coding agent to switch the model back to Claude Sonnet 5.

Done. You built an agent with a coding agent, gave it a set of tests, and used those tests to find and fix a real problem.
