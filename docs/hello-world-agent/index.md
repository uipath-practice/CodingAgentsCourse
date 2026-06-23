# Your First Agent: Claims Eligibility

**Build a low-code agent that reads a claim and a policy, then decides whether the claim is eligible for review — using Claude Code to do the building.**

## Overview

This is your hello-world agent. The business case is simple: an insurer receives a **First Notice of Loss (FNOL)** claim from a claimant, along with the homeowner's **policy** it refers to. Before anyone assesses the claim in detail, someone has to check the basics — is the policy active, is the claimant the policyholder, does the address match, did the loss happen during the coverage period, and was the claim filed on time?

You'll hand that job to an agent. You won't click it together in **Agent Builder** — you'll describe it to **Claude Code**, and the UiPath agent skill will scaffold the solution, configure the prompt and input/output schema, and push it to **Studio Web** where you run and validate it.

To keep this exercise self-contained, the agent reads the raw PDF files directly. Later in the course you'll rebuild this same logic with **IXP** for structured, validated extraction — and it becomes the first of a **family of agents that handle claims processing end to end** in the Maestro orchestration part.

| Step | Focus |
| ---: | :--- |
| [**Build the Eligibility Agent**](1-build-the-eligibility-agent.md) | Use Claude Code + the UiPath agent skill to generate the agent from a prompt and an output schema |
| [**Run and Review**](2-run-and-review.md) | Push to Studio Web, run against the sample claims, and read the eligibility result |

!!! tip "Training Environment"
    Log in at **[{{ training_url }}]({{ training_url }})** using tenant **{{ training_tenant }}**.

!!! info "Exercise files"
    The agent prompt and output schema are shown inline in the next steps — copy them straight into Claude Code. The sample claim and policy PDFs are linked in **Run and Review**. (Once the course is finalized, all files will be available as a single clonable package.)
