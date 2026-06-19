# Practicing the CLI

!!! tip "Here is our plan for this lesson:"

    1. Explore what the CLI can do.
    2. Read something from the platform.
    3. Ask the documentation a question with `docsai`.
    4. Send feedback without leaving your terminal.

## Goal

Get comfortable with the `uip` CLI before you build with it. You'll run a few read-only commands, query the docs from the command line, and learn how to send feedback — so the CLI feels familiar when the agent starts driving it for you.

## Tools and skills

Two extension systems sit beside the core CLI. **Tools** add commands that talk to UiPath services (Orchestrator, Integration Service, and so on). **Skills** teach your coding agent how to use those commands. You install both through the CLI, and during preview they update often — so pull the latest regularly.

## Steps

### 1. See what's available

Start with the built-in help and the installed tools. The help is authoritative — when your agent gets stuck later, the fastest fix is to have it run `--help` and read the output.

```bash
uip --help
uip tools list --output table
```

### 2. Read from the platform

Try a read-only command to confirm you're connected. Listing Orchestrator folders is a safe place to start.

```bash
uip or folders list
```

!!! tip "Let the agent drive"
    You rarely need to memorize these commands. The point of skills is that you ask for an outcome — "list the folders I can publish to" — and the agent picks the command. Running a few yourself just builds intuition.

### 3. Ask the docs with docsai

`docsai` answers UiPath questions from the terminal, grounded in the documentation.

```bash
uip docsai --help
uip docsai ask "How do I list Orchestrator folders with the UiPath CLI?"
```

### 4. Send feedback

This is an internal preview, so feedback matters. The easiest way is to ask your coding agent directly — there's a skill that packages the details and sends them to UiPath for you.

```text
Send UiPath feedback: the docsai answer for X was incomplete because ...
```

!!! info "Where feedback goes"
    The feedback skill routes your report to UiPath. Keep public GitHub issues for the external community — use the agent (or the preview Slack channel) for internal feedback.

Done. You've used the CLI directly, queried the docs, and know how to report issues — everything you need before letting the agent build for you.
