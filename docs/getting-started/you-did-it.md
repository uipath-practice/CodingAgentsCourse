# You did it!

!!! tip "Congratulations!"

    You've set up the UiPath CLI and skills, driven the platform from your terminal, built an RPA workflow in Studio with Autopilot, and built and published your first agent.

## What you built

You have a working coding-agent environment — the `uip` CLI authenticated to your tenant and the UiPath skills loaded into your agent — and you've completed the full **build → publish → run** loop once with a simple Claims Eligibility agent.

| Component | Role |
|-----------|------|
| **UiPath CLI** (`uip`) | The interface your coding agent uses to talk to the platform |
| **UiPath skills** | Instruction packs that teach the agent when and how to use the CLI |
| **docsai** | Answers UiPath questions from the terminal, grounded in the docs |
| **Your RPA workflow** | A Studio process that Autopilot built and tested, which fills the RPA Challenge form for 10 records and logs the score |
| **Your first agent** | A low-code agent you generated, published, and ran in Studio Web |

## Next steps

### 1. Keep your setup current

During preview, skills and tools change often, probably daily. Refresh them now and then:

```bash
uip skills update --agent claude
uip tools update
```

### 2. Build a real agent

You've done the loop once with a simple agent. In the next exercise you'll build a richer one — adding context and tools so the agent can reason over grounded data and take real actions.

A BPMN exercise that comes after First Agent is on its way. This page will be updated when it's ready.

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
