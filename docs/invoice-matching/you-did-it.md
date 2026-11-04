# You did it!

!!! tip "Congratulations!"

    You've had a coding agent build an invoice matching process in Maestro, and you've run it end to end: paid, approved and rejected.

## What you built

A process that pays exact matches straight away, lets an agent sort the differences into cosmetic, acceptable and real, and sends only the invoices that need a decision to a person. You described it in plain language; the coding agent found the provided resources in the tenant and built to them.

| Component | Role |
|-----------|------|
| **Retrieve Invoice Document**, **Extract Invoice Data (IXP)** | Provided: a new invoice and its purchase order, and the invoice data read from the PDF |
| **Compare script** | Yours: decides every invoice that matches its purchase order exactly |
| **Invoice Matching Agent** | Yours: rates the differences green, yellow or red, summarizes them and drafts the supplier e-mail |
| **Invoice Validation** action app | Provided: where the reviewer approves or rejects in **Action Center** |
| **PaymentsQueue** | Provided: the Data Fabric table every paid invoice lands in |
| **Shared Gmail Connection** | Provided: sends the rejection e-mail |

## Next steps

### 1. Send yellow straight to payment

The prompt said yellow goes to a reviewer "for now". Once you trust the agent's yellow ratings, send them to payment too. Your coding agent usually leaves a switch for this in the process; ask it where it is.

### 2. Build the other flavour

Give the same prompt again with the other tab, in a new empty folder. The solution name ends with the flavour, so the two builds sit side by side in your workspace. Compare how the coding agent built the same logic in BPMN and in Flow.

## Keep iterating

**Test the boundaries**

- Run every problem the generator can plant and check the rating against what you'd decide. A rating you disagree with is a change to the agent's instructions.

**Change the rules**

- Ask your coding agent to treat small price differences differently, or to name a new kind of problem. Then rerun the cases that are affected.

## Learn more

| Resource | Description |
|----------|-------------|
| [Maestro](https://docs.uipath.com/maestro/automation-cloud/latest/user-guide/introduction-to-maestro) | Agentic orchestration of people, robots and agents |
| [Using UiPath CLI with Coding Agents](https://docs.uipath.com/uipath-cli/standalone/latest/user-guide/coding-agents) | Per-agent setup walkthroughs |
| [UiPath/skills (GitHub)](https://github.com/uipath/skills) | The source of the UiPath skills |
