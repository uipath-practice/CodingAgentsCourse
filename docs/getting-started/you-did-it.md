# You did it!

!!! tip "Congratulations!"

    You've set up the UiPath CLI and skills, and you've driven the platform from your terminal.

## What you built

You have a working coding-agent environment: the `uip` CLI authenticated to your tenant, the UiPath skills loaded into Claude Code, and a feel for the commands the agent will use on your behalf.

| Component | Role |
|-----------|------|
| **UiPath CLI** (`uip`) | The interface your coding agent uses to talk to the platform |
| **UiPath skills** | Instruction packs that teach the agent when and how to use the CLI |
| **docsai** | Answers UiPath questions from the terminal, grounded in the docs |

## Next steps

### 1. Keep your setup current

During preview, skills and tools change often. Refresh them now and then:

```bash
uip skills update --agent claude
uip tools update
```

### 2. Build your first agent

With the environment ready, you're set to build. In the next exercise you'll create your first low-code agent and watch the coding agent scaffold it end to end.

## Keep iterating

**Ask for outcomes, not commands**

- Describe what you want done and let the agent choose the commands. Build the habit now.

**Trust the model**

- Don't over-optimize for tokens early. A stronger model often costs less because it makes fewer mistakes. Use it, and your intuition will follow.

## Learn more

| Resource | Description |
|----------|-------------|
| [Using UiPath CLI with Coding Agents](https://docs.uipath.com/uipath-cli/standalone/latest/user-guide/coding-agents) | Per-agent setup walkthroughs |
| [uip skills reference](https://docs.uipath.com/uipath-cli/standalone/latest/user-guide/uip-skills) | Full command and flag reference |
| [UiPath/skills (GitHub)](https://github.com/uipath/skills) | The source of the UiPath skills |
