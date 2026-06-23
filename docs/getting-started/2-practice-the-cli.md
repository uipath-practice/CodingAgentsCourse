# Practicing the CLI

!!! tip "Here is our plan for this lesson:"

    1. Explore what the CLI can do.
    2. Read something from the platform.
    3. Ask the documentation a question with `docsai`.
    4. Send feedback without leaving your terminal.

## Goal

Get comfortable with the `uip` CLI before you build with it. You'll run a few read-only commands, query the docs from the command line, and learn how to send feedback — so the CLI feels familiar when the agent starts driving it for you.

## Tools and skills

Two extension systems sit beside the core CLI. **Tools** add commands that talk to UiPath services (**Orchestrator**, **Integration Service**, and so on). **Skills** teach your coding agent how to use those commands. You install both through the CLI, and during preview they update often — so pull the latest regularly.

## Steps

### 1. See what's available

Start with the built-in help and the installed tools. The help is authoritative — when your agent gets stuck later, the fastest fix is to have it run `--help` and read the output.

```bash
uip --help
uip tools list --output table
```

### 2. Ask the docs with docsai

`docsai` answers UiPath questions from the terminal, grounded in the documentation.

```bash
uip docsai --help
uip docsai ask "How do I list Orchestrator folders with the UiPath CLI?"
```

### 3. Read from the platform

The docsai step likely surfaced this command — go ahead and run it:

```bash
uip or folders list
```

!!! tip "Let the agent drive"
    You rarely need to memorize these commands. The point of skills is that you ask for an outcome, for example "list the folders I can publish to", and the agent picks the right uip command. Running a few yourself builds intuition. In repeatable cases, scripted commands also save tokens compared to asking the agent each time.


### 4. Send feedback

Coding agents are still in a preview stage, so feedback matters. The easiest way is to ask your coding agent directly — there's a skill that packages the details and sends them to UiPath for you. If something went odd during a session, for example you see agent trying something in loops or retrying multiple times, ask your agent to describe it and use the feedback skill.

```text
Send UiPath feedback: the docsai answer for X was incomplete because ...
```

```text
If you note anything odd during session, for example CLI and skills mismatch or CLI doesn't work as expected, feel free to send that as feedback to UiPath using the send-feedback skill.
```

Done. You've used the CLI directly, queried the docs, and know how to report issues — everything you need before letting the agent build for you.
