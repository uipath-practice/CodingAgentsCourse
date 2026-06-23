# You did it!

!!! tip "Congratulations!"

    You built your first UiPath agent with Claude Code — and ran it end to end against real-looking claims.

## What you built

A low-code **Claims Eligibility** agent that reads a claim PDF and a policy PDF, runs five threshold checks, and returns a structured eligibility decision — all scaffolded by Claude Code through the UiPath agent skill, then run in Studio Web.

| Component | Role |
|-----------|------|
| **Claude Code + UiPath agent skill** | Generated the solution, agent, prompt, and schema from your description |
| **Eligibility agent (low-code)** | Validates the claim against the policy and returns the decision |
| **Studio Web** | Where you pushed, ran, and reviewed the agent |

## Next steps

### 1. Change the logic and rebuild

Edit the prompt — try lowering the filing deadline, or add a check — and ask Claude Code to apply it. Notice how fast the change is compared to clicking through the designer.

### 2. Test the boundaries

Run a claim with its wrong policy, or imagine a lapsed policy, and see how the checks respond. Good agents are judged by how they handle the messy cases.

## Keep iterating

**Make the data more reliable**

- This agent reads raw PDFs. In a real build you'd add **IXP** for structured, validated extraction — which is exactly what you'll do later in the course.

**Think about the bigger picture**

- This eligibility agent is the first of a **family of agents** that, in the orchestration part of the course, work together to process a property claim end to end with **Maestro**.

## Learn more

| Resource | Description |
|----------|-------------|
| [Building an agent in Studio Web](https://docs.uipath.com/agents/automation-cloud/latest/user-guide/building-an-agent-in-studio-web) | The low-code Agent Builder reference |
| [Agent tools](https://docs.uipath.com/agents/automation-cloud/latest/user-guide/agent-tools) | Contexts, built-in tools (Analyze files), and more |
| [Agent evaluations](https://docs.uipath.com/agents/automation-cloud/latest/user-guide/agent-evaluations) | Turn good runs into a test set |
