# Install UiPath Skills
Install your coding agent, the UiPath CLI, and the skills that give the agent the knowledge it needs to generate Studio workflows, coded agents, React apps, and Maestro processes.

## 1. Install the UiPath CLI

```bash
npm install -g @uipath/cli@latest
```

Verify: `uip --version` — you should see `1.195.1` or later.

## 2. Install UiPath Skills into Your Coding Agent

=== "Claude Code"

    ```bash
    # 1. Add the marketplace (once)
    claude plugin marketplace add https://github.com/UiPath/skills
    # 2. Install the plugin from it
    claude plugin install uipath@uipath-marketplace
    uip skills install
    ```

=== "Codex"

    ```bash
    # 1. Add the marketplace (once)
    codex plugin marketplace add UiPath/skills --ref main
    uip skills install
    ```

You should see output similar to this:

```json
{
  "Result": "Success",
  "Code": "SkillsInstall",
  "Data": {
    "RootDir": "/Users/YourUser",
    "Skills": [
      "uipath-admin",
      "uipath-agents",
      "uipath-api-workflow",
      "uipath-automation-discovery",
      "uipath-coded-apps",
      "uipath-data-fabric",
      "uipath-feedback",
      "uipath-governance",
      "uipath-human-in-the-loop",
      "uipath-maestro-bpmn",
      "uipath-maestro-case",
      "uipath-maestro-flow",
      "uipath-mcp-servers",
      "uipath-planner",
      "uipath-platform",
      "uipath-review",
      "uipath-rpa",
      "uipath-solution",
      "uipath-tasks",
      "uipath-test",
      "uipath-troubleshoot"
    ],
    "Agents": [
      "claude",
      "codex"
    ],
    "Installed": 42
  }
}
```

Confirm the following skills appear in the output:

- `uipath-rpa` — for the Studio XAML intake workflow
- `uipath-agents` — for the Python LangGraph underwriting agent
- `uipath-coded-apps` — for the React loan officer dashboard
- `uipath-maestro-flow` — for the Maestro orchestration process

Each skill gives the agent deep knowledge of one part of the UiPath platform:

| Skill | What it knows |
|---|---|
| **uipath-rpa** | Studio XAML structure, activity libraries, selectors, error handling, Orchestrator Assets, packaging |
| **uipath-agents** | Python agent project layout, LangGraph patterns, tool definitions, UiPath AI Trust Layer |
| **uipath-coded-apps** | React/TypeScript app structure, `@uipath/uipath-typescript` SDK, `action-schema.json`, publishing |
| **uipath-maestro-flow** | Flow JSON structure, node types, condition expressions, variable mappings, process publishing |

## 3. Install the Coded Apps Tool

The Coded Apps skill requires an additional CLI tool:

```bash
uip tools install @uipath/codedapp-tool
```

Verify both tools are available:

```bash
uip tools list
```

## 4. Authenticate with Your Tenant

```bash
uip login --authority https://cloud.uipath.com --organization tpenlabs -t AgenticPractice
```

## 5. Open Your Project and Start a Session

```bash
cd my-project && claude
# or
cd my-project && codex
```

Skills are auto-discovered on session start. Ask the agent to build a coded agent and it will load the right skill automatically.

