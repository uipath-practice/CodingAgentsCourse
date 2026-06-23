# Run and Review

!!! tip "Here is our plan for this lesson:"

    1. Push the agent to **Studio Web**.
    2. Run it against a sample claim and policy.
    3. Read the eligibility result and check it against the answer key.

## Goal

Get your agent running in **Studio Web**, feed it a claim and its policy, and read back a structured eligibility decision. By the end you'll have seen the full loop — build with Claude Code, run on the platform — and you'll know how to read the JSON the agent returns.

## The sample claims

Download the paired claim and policy files below. Each claim references its policy by number, and must be run with its **matching** policy.

| Claim | Policy | Scenario |
| :--- | :--- | :--- |
| [CLM-2026-357861-claim.pdf](assets/claim-samples/CLM-2026-357861-claim.pdf) | [HO-5534416561.pdf](assets/claim-samples/HO-5534416561.pdf) | Mumbai (INR) — water damage, Rajesh Kumar Sharma |
| [CLM-2026-896147-claim.pdf](assets/claim-samples/CLM-2026-896147-claim.pdf) | [HO-3883873532.pdf](assets/claim-samples/HO-3883873532.pdf) | Melbourne (AUD) — fire damage, Mei Lin Tan |

_(Once the course is finalized, all sample files will ship together as a single clonable package.)_

## Steps

### 1. Push the agent to Studio Web

Ask Claude Code to publish what it built:

```text
Push this agent to Studio Web so I can run it.
```

It bundles and uploads the solution, then returns a link. Open it.

![The agent open in Studio Web after the push](2-run-and-review.images/agent-in-studio-web.png){ .screenshot }

### 2. Run a sample claim

In Studio Web, provide the two file inputs and run the agent.

1. Set **in_ClaimPDF** to `CLM-2026-357861-claim.pdf`.
2. Set **in_PolicyPDF** to `HO-5534416561.pdf`.
3. Select **Run** (or **Save & Debug**).

![Providing the claim and policy PDFs as inputs and running the agent](2-run-and-review.images/run-with-inputs.png){ .screenshot }

### 3. Read the result

When the run finishes, open the output. You'll get the three fields from the schema — `out_isEligible`, `out_EligibilityChecksJSON`, and `out_EligibilityAnalysisSummary`.

For claim `CLM-2026-357861`, the agent should land on **ineligible — deny**, because the claim was filed well past the 60-day deadline:

```json
{
  "out_isEligible": false,
  "out_EligibilityChecksJSON": {
    "claim_id": "CLM-2026-357861",
    "policy_number": "HO-5534416561",
    "eligible": false,
    "checks": {
      "policy_status": { "result": "pass", "detail": "Current - Paid in Full" },
      "identity_match": {
        "result": "pass",
        "claimant_name": "Rajesh Kumar Sharma",
        "policyholder_name": "Rajesh Kumar Sharma",
        "detail": "Names match exactly"
      },
      "address_match": {
        "result": "pass",
        "claim_address": "Flat 5B, Shantidham Apartments, Carter Road, Mumbai, Maharashtra 400006",
        "policy_address": "Flat 5B, Shantidham Apartments, Carter Road, Mumbai, Maharashtra 400006",
        "report_address": "N/A — no incident report in this exercise",
        "detail": "Claim and policy addresses match"
      },
      "coverage_period": {
        "result": "pass",
        "incident_date": "27/04/2026",
        "effective_date": "27/04/2025",
        "expiration_date": "27/04/2026",
        "detail": "Incident falls on the final day of the coverage period"
      },
      "filing_deadline": {
        "result": "fail",
        "incident_date": "27/04/2026",
        "claim_date": "25/07/2026",
        "days_elapsed": 89,
        "detail": "Claim filed 89 days after the loss, exceeding the 60-day deadline, with no explanation provided"
      }
    },
    "failure_reason": "Claim filed 89 days after the date of loss, beyond the 60-day filing deadline, with no justification provided.",
    "recommendation": "deny"
  },
  "out_EligibilityAnalysisSummary": "The policy is active, the claimant matches the policyholder, the address matches, and the loss occurred within the coverage period. However, the claim was filed 89 days after the loss — past the 60-day deadline — with no explanation, so it is not eligible for review."
}
```

!!! note "Exact wording will vary"
    The `detail` and summary text are generated, so your wording won't match character-for-character. What should match is the structure, each check's `result`, and the final `recommendation`.

### 4. Try the second claim

Now run `CLM-2026-896147-claim.pdf` with `HO-3883873532.pdf`. Read the result before peeking:

??? note "What you should see"
    Same outcome, different numbers: policy active, identity and address match, incident within the coverage period — but the claim was filed about **83 days** after the loss (incident 14/04/2026, filed 06/07/2026), past the 60-day deadline with no justification. So `eligible` is **false** and `recommendation` is **"deny"**.

Done. You built an agent with Claude Code and ran it on real-looking claims — your first end-to-end loop.
