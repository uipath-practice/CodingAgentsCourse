# Invoice Matching with a Coding Agent

**Have a coding agent build a two-way invoice matching process in Maestro: a script compares each invoice with its purchase order, an agent sorts the differences, and a person reviews the rest.**

## Overview

Suppliers send invoices for purchase orders, and anything that isn't an exact match usually goes to a person. Most of those differences are harmless. In this exercise you describe the process in one prompt, and your coding agent builds it as a **Maestro** process in your **Studio Web** workspace. A script handles the exact matches, an agent built in **Agent Builder** rates the differences green, yellow or red, and the invoices that need a decision go to a reviewer in **Action Center**. Paid invoices land in **Data Fabric**, and rejected ones get an e-mail through **Integration Service**.

You pick the flavour: a **Maestro BPMN process** or a **Maestro Flow**. The business logic and the prompt are the same; only the flavour's name changes.

!!! info "Before you begin: prerequisites"
    Have these ready **before** the session:

    - **[Build Your First Agent](../getting-started/4-build-your-first-agent.md) done** — the `uip` CLI and the UiPath skills installed, and your coding agent logged in to the course tenant.
    - **A coding agent**, such as **Claude Code**.
    - **A UiPath Cloud account** in `{{ training_url }}`, tenant **CodingAgentsCourse**. Talk to your trainer if you are not invited.

| Step | Focus |
| ---: | :--- |
| [**Build the Invoice Matching Solution**](1-build-the-solution.md) | One prompt builds the process; you run it in Studio Web, review invoices in Action Center and check the payments |
| [**You did it!**](you-did-it.md) | What you built, and how to take it further |

!!! tip "Training Environment"
    Log in at **[{{ training_url }}]({{ training_url }})** and use tenant **CodingAgentsCourse** for this exercise, both in the browser and in the `uip` CLI your coding agent uses.
