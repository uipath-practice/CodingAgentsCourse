# Getting Started with Coding Agents

**Set up the UiPath CLI and skills, get a feel for the CLI, then build and publish your first agent — all from your coding agent.**

## Overview

A **coding agent** can build and operate UiPath automations the same way a developer does, once it knows how. You teach it with two things: 

- **UiPath CLI**, the command-line interface agents use to talk to the platform
- **UiPath Skills**, curated instruction packs that tell the agent *when* and *how* to use that CLI

This first exercise is your preparation. You'll get your environment ready, get a feel for the CLI/Skills capabilities and usage, and then run the full **build-and-publish loop once** with a small agent — describe it to your coding agent, watch it scaffold, push it to Studio Web, and run it. The agent is intentionally simple; the point is to learn the workflow you'll reuse for every (richer) agent in the exercises that follow.

!!! info "Before you begin: prerequisites"
    Have these ready **before** the session. The one thing to set up in advance is a coding agent:

    - **A coding agent installed and signed in** — Currently skills are available for: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex, OpenCode. Pick and install it and log in ahead of time; everything else, the agent can help you set up live. You'll also need a valid subscription or API key to interact with LLMs.
    - **A laptop you can install software on** (you usually need admin rights for installers).
    - **A UiPath Cloud account**. In this workshop we will use: `{{ training_url }}/{{ training_tenant }}`. Talk to your trainer if you are not invited.
    - **Node.js / npm** — needed for the UiPath CLI. If it's missing, your coding agent can install it for you.
    - **Reliable internet**, and a **VPN** if your company requires one.

    You'll install the UiPath CLI and skills in first lesson, no need to do that beforehand.

| Step | Focus |
| ---: | :--- |
| [**Install the CLI and Skills**](1-install-the-cli-and-skills.md) | Install `uip`, authenticate, and add the UiPath skills to your coding agent |
| [**Practice the CLI**](2-practice-the-cli.md) | Explore the CLI, read from the platform, ask the docs with `docsai`, and send feedback |
| [**Build Your First Agent**](3-build-your-first-agent.md) | Generate a simple low-code agent with Claude Code, then publish it to Studio Web, run it against sample claims, and review the result |

!!! tip "Training Environment"
    Log in at **[{{ training_url }}]({{ training_url }})** using tenant **{{ training_tenant }}**.
