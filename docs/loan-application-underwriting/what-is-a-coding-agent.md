# What's a Coding Agent?
Learn how coding agents work and what makes them useful for UiPath automation work.

A coding agent is an AI assistant that reads, writes, and reasons about code — not just autocompletes it. Instead of suggesting the next line, it understands a goal described in plain English, explores the codebase, makes decisions, and generates entire working components. You stay in control: you review what it builds, ask it to adjust, and iterate until it's right.

Several coding agents are available today, each with their own strengths:

- **Claude Code** — Anthropic's CLI-based agent, runs in your terminal, deeply integrated with the file system. This is the one used in this exercise.
- **Codex CLI** — OpenAI's command-line coding agent, similar terminal-first approach
- **Cursor** — an IDE built around AI, tight editor integration with inline generation and multi-file context
- **Gemini CLI** — Google's terminal agent, strong on reasoning and long context
- **GitHub Copilot Agent** — embedded in VS Code and JetBrains, well suited for in-editor workflows

What makes coding agents especially powerful for UiPath work is the skill layer: by loading domain-specific knowledge about UiPath activities, APIs, and project conventions, the agent can generate production-ready automation code — not generic boilerplate. That's exactly what the UiPath skills in this exercise do.

## The Mental Model

Five concepts show up in every coding agent:

| Concept | What it is |
|---|---|
| **Tools** | Built-in actions the agent can take: read a file, run a bash command, search the web, edit code, etc. |
| **Skills** | Domain knowledge bundles the agent loads when it sees a matching task. Like a playbook for one thing. |
| **Commands** | Manual shortcuts you type: `/commit`, `/test`, `/deploy`. Triggered by you, not the agent. |
| **Hooks** | Run automatically at lifecycle events: before an edit, after a commit, on session start. Used for guardrails. |
| **Subagents** | Specialised workers spawned by the main agent. Used to parallelise or isolate complex tasks. |

!!! info "Plugins"
    A plugin is a package that bundles any of these together — like a Marketplace app for your coding agent. The UiPath skills used in this exercise are plugins.

## Tools, in practice

Claude Code's built-in tools are always available — no setup required:

| Tool | What it does |
|---|---|
| **Read** | Read any file in your project |
| **Edit / Write** | Modify or create files |
| **Bash** | Execute shell commands |
| **Glob / Grep** | Search across the codebase |
| **WebSearch / WebFetch** | Look things up online |
| **Task** | Spawn a subagent |

!!! info "Extension Tools (MCP)"
    MCP (Model Context Protocol) is the standard way to give your coding agent new tools without changing the agent itself.

    - **GitHub MCP** — read issues, open PRs
    - **Atlassian MCP** — Jira, Confluence
    - **Slack MCP** — read channels, post messages
    - **Custom UiPath MCP** — call Orchestrator, Maestro

## Skills, in practice

A skill is a folder — sitting in `.claude/skills/` (or equivalent), with a `SKILL.md` inside.

| Property | What it means |
|---|---|
| **Discovered automatically** | The agent reads each `SKILL.md`'s description. When your prompt matches, it loads the full skill on demand. |
| **More than just text** | Skills can bundle reference docs, code patterns, helper scripts, even compiled binaries the agent can run. |
| **Scoped permissions** | A skill declares which tools it's allowed to use. Bash access can be tightly controlled. |

### What's in a SKILL.md file

Every skill is built around a single `SKILL.md` file. Here's what one looks like:

```yaml
---
name: uipath-coded-agents
description: Scaffold, build, run, evaluate, and deploy UiPath coded agents...
allowed-tools: [Read, Edit, Bash(uip:*), Bash(uipath:*)]
---

# How to build a UiPath coded agent

When the user asks for a new coded agent:

1. Run `uipath new --framework langgraph`
2. Create agent.py following the pattern in references/
3. Add an evals/ folder with at least 5 test cases
4. Run `uipath eval` before deploying

## References
- references/sdk-methods.md
- references/langgraph-patterns.md
```

The file has four parts:

| Part | What it does |
|---|---|
| **Frontmatter** | Declares the skill's name, description, and which tools it's allowed to use. |
| **Discovery prompt** | The `description` field is what the agent matches against your request — this is how the skill gets loaded automatically. |
| **Instructions** | The body of the file: a step-by-step prompt the agent follows when the skill is active. |
| **References** | Paths to files in the skill folder the agent can read for deeper context — API docs, code patterns, example projects. |

## Where UiPath fits in this picture

UiPath ships a plugin for Claude Code. It bundles skills, hooks, and references — giving the agent domain knowledge about UiPath products out of the box.

```bash
npm -g install @uipath/cli
uip skills install
```

The plugin contains three things:

| What | Details |
|---|---|
| **10+ skills** | Domain knowledge for every UiPath product: `uipath-agents`, `uipath-coded-apps`, `uipath-rpa`, `uipath-maestro-flow`, `uipath-platform`, `uipath-test`, and more. |
| **1 subagent** | `uipath-project-discovery-agent` — auto-runs on first contact with a UiPath project and builds context for the agent. |
| **Hooks & references** | Session-start nudges, activity docs, and allowlists for safe read-only commands. |

## The UiPath skill catalog

The plugin includes skills for every part of the UiPath platform. Three of them drive the labs in this exercise:

| Skill | Description |
|---|---|
| **`uipath-agents`** | Scaffold, build, run, evaluate, and deploy coded agents (LangGraph, LlamaIndex, OpenAI Agents) |
| **`uipath-rpa`** | Generate and edit RPA workflows (XAML) for Studio Desktop with a discovery-first approach |
| **`uipath-coded-apps`** | Push/pull TypeScript + React apps to Studio Web, pack & publish to Orchestrator |
| `uipath-solution` | Create and deploy solutions |
| `uipath-maestro-flow` | Create, validate, and debug UiPath Flow projects using the .flow JSON format |
| `uipath-platform` | Auth, Orchestrator management, solution lifecycle, Integration Service, CLI tools |
| `uipath-test` | Generate, run, and maintain automated test suites for UiPath projects |

!!! tip "Skills used in this exercise"
    The three skills in bold — `uipath-agents`, `uipath-rpa`, and `uipath-coded-apps` — are the ones you'll use to build the loan underwriting pipeline.
