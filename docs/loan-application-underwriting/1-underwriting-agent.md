# AI Underwriting Assessment
Use the `uipath-agents` skill to generate a Python LangGraph agent that retrieves loan data from the UiBank API, computes financial metrics, and uses the LLM to interpret the results and produce a credit assessment.

## 1. Open Your Project Folder in Your Coding Agent

Create an empty folder called `LoanUnderwritingAgent` and open it in your coding agent (e.g. Claude Code, Codex):

```bash
mkdir LoanUnderwritingAgent
```

## 2. Describe the Agent

Give your coding agent a plain-English description of what to build:

```text
Build a UiPath Coded Agent in LangGraph that:

1. Takes a loan_id as input
2. Verifies the loan quote by calling the UiBank API (https://uibank-api.uipath.com/explorer/swagger.json, no authentication required) and extracts the applicant's loan amount, loan term, yearly income, and age
3. Retrieves the average loan amount across all UiBank applications for market benchmarking
4. Computes raw financial metrics and surfaces them to the LLM: monthly repayment amount, debt-to-income ratio (the monthly repayment as a share of monthly income), and how the loan compares to the market average
5. Uses the LLM to interpret the metrics, assign a credit score (0–100) and risk band (Low / Medium / High), and generate a plain-English assessment summary

Include an eval set with 5 cases. The name of the agent should be {YourName}LoanUnderwritingAgent. Use the UiPath SDK.
```

Your coding agent reads the `uipath-agents` skill context and generates a complete agent project:

- `main.py` — the agent entry point with the LangGraph graph definition
- `tools.py` — the three tool functions
- `pyproject.toml` — project configuration with `uipath-langgraph` dependency
- `evals/` — a folder with 5 evaluation cases

## 3. Review the Generated Code

Open the project in your IDE. You should see:

- **`main.py`** — the agent entry point named `{YourName}LoanUnderwritingAgent`, with a `SYSTEM_PROMPT` instructing the LLM to interpret financial metrics holistically, a `create_react_agent` call, and a `run(...)` entry function
- **`tools.py`** — three `@tool`-decorated functions:
  - `verify_quote` — calls the UiBank API to confirm the quote exists and retrieve the applicant's financial profile
  - `get_average_loan_amount` — calls the UiBank API and returns the average loan amount across all applications, used as a market benchmark
  - `compute_financial_metrics` — pure Python calculation returning monthly repayment, DTI ratio, and loan-to-market-average ratio for the LLM to interpret
- **`evals/`** — 5 test cases covering a range of risk profiles, used to validate the agent's scoring behaviour with `uipath eval`

Check the system prompt. It should instruct the LLM to reason about the combination of metrics and produce a natural language explanation — not map thresholds to a fixed score. If the prompt is too mechanical, ask your coding agent:

```text
Update the system prompt so the LLM reasons about the combination of
factors rather than applying fixed rules — a high DTI with a small loan
amount should be treated differently from the same DTI with a large loan
```

## 4. Test the Agent Locally

### 1. Navigate to your project folder

Open a terminal and navigate to the `LoanUnderwritingAgent` folder you created:

```bash
cd "/path/to/your/LoanUnderwritingAgent"
```

Replace the path with the actual location on your machine.

### 2. Authenticate

Do this when you first run the agent, or whenever you get a `401` error:

```bash
uv run uipath auth --force
```

This opens a browser — log in with your UiPath credentials. Tokens are saved to `.env` automatically.

### 3. Find a test loan ID

Ask your coding agent to find a valid loan ID from UiBank:

```text
Open and inspect the UiBank Swagger documentation:

https://uibank-api.uipath.com/explorer/swagger.json

Using only endpoints documented by the API, identify the read-only endpoint
for retrieving loan quotes. Make a GET request and return one loan_id that
currently exists in UiBank.

Requirements:
- Do not create, update, or delete any data.
- Do not invent or reuse an unverified ID.
- Verify that the returned record exists.
- Return the loan_id and a PowerShell command for running the agent.
- Escape the JSON correctly for PowerShell.

Command format:

uipath run agent '{\"loan_id\":\"<EXISTING_LOAN_ID>\"}'
```

### 4. Run the agent

Activate the virtual environment first:

=== "Mac / Linux"
    ```bash
    source .venv/bin/activate
    ```

=== "Windows"
    **Command Prompt:**
    ```bash
    .venv\Scripts\activate
    ```
    **PowerShell** (allow scripts first if needed):
    ```bash
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    .\.venv\Scripts\Activate.ps1
    ```

Use the loan ID returned by your coding agent and run:

```bash
uv run uipath run agent '{"loan_id": "6a4203a1f4865600481c657b"}'
```

Replace the value with the actual loan ID.

Watch the terminal — you should see the agent call all three tools in sequence: `verify_quote` → `get_average_loan_amount` → `compute_financial_metrics`, then the LLM produces the credit score, risk band, and assessment summary.

To save the full structured output to a file (optional):

```bash
uv run uipath run agent '{"loan_id": "6a4203a1f4865600481c657b"}' --output-file out.json
```

### 5. Check results

- **Terminal output** — the agent prints the credit score, risk band, and assessment summary when it finishes
- **`out.json`** — only present if you used `--output-file`; contains the full structured output

!!! tip "Test all three profiles"
    Run the agent once for each applicant in the sample data. Verify Alice (small loan, good income ratio) scores Low risk, Ben (large loan, high term) scores Medium, and Clara (young age, tight income ratio) scores High.

### Troubleshooting

| Error | Fix |
|---|---|
| `401 Unauthorized` | Run `uv run uipath auth --force` |
| `Graph 'main.py' not found` | Use `agent` not `main.py` as the entrypoint |
| `unknown command 'agent'` | Use `uv run uipath run`, not `uip agent run` |

## 5. Deploy the Agent

### Publish the Agent

Run setup and initialisation:

```bash
uip codedagent setup --force
```

```text
PythonPath       | python3.13
Package          | uipath
PackageInstalled | Yes
PackageVersion   | 2.11.14
```

Set your tenant and verify you're logged in:

```bash
uip login tenant set CodingAgentsPractice --output json
```

```json
{
  "Result": "Success",
  "Code": "TenantSet",
  "Data": {
    "Name": "CodingAgentsPractice",
    "Id": "ef96660c-6e95-4f8f-b8b6-b1c42f06edf1"
  }
}
```

```bash
uip login status --output json
```

```json
{
  "Result": "Success",
  "Code": "LogIn",
  "Data": {
    "Status": "Logged in",
    "Organization": "tpenlabs",
    "Tenant": "CodingAgentsPractice",
    "Expiration Date": "2026-06-29T14:08:47.000Z"
  }
}
```

Initialise the UiPath project. This generates the entry points, Mermaid diagram, and project manifest:

```bash
uip codedagent init
```

```text
'bindings.json' already exists, skipping.
✓  Created 'entry-points.json' file with 1 entrypoint(s).
✓  Created 1 mermaid diagram file(s).
✓  Updated 'project.uiproj' file.
✓  Updated: CLAUDE.md, CLI_REFERENCE.md, SDK_REFERENCE.md, AGENTS.md, REQUIRED_STRUCTURE.md

  Entrypoint: agent
  ──────────────────────────────────────────────────

                      ┌───────────┐
                      │ __start__ │
                      └─────┬─────┘
                ┌───────────└───────────┐
                ▼                       ▼
      ┌ node ────────────┐    ┌ node ─────────────┐
      │ fetch_loan_quote │    │ fetch_market_data │
      └─────────┬────────┘    └─────────┬─────────┘
                └───────────┌───────────┘
                            ▼
                   ┌ node ───────────┐
                   │ compute_metrics │
                   └────────┬────────┘
                            │
                            ▼
                   ┌ node ──────────┐
                   │ llm_assessment │
                   └────────┬───────┘
                            │
                            ▼
                       ┌─────────┐
                       │ __end__ │
                       └─────────┘
```

### Deploy the Agent

```bash
uip codedagent deploy --tenant
```

```text
⠋ Packaging project ...
Name       : {YourName}LoanUnderwritingAgent
Version    : 0.0.1
Description: Loan underwriting agent that assesses UiBank loan quotes with LLM-driven credit scoring
Authors    : {YourName}
✓  Project successfully packaged.
⠋ Publishing most recent package: {YourName}LoanUnderwritingAgent.0.0.1.nupkg ...
✓  Package published successfully!
```

### Create the Process

First, find the package and its entry point:

```bash
uip or packages list --search "{YourName}LoanUnderwritingAgent" --output json
```

```bash
uip or packages entry-points "{YourName}LoanUnderwritingAgent:0.0.1" --output json
```

Then create the process:

=== "Mac / Linux"
    ```bash
    uip or processes create \
      --name "{YourName}LoanUnderwritingAgent" \
      --package-key "{YourName}LoanUnderwritingAgent" \
      --package-version "0.0.1" \
      --entry-point "agent" \
      --folder-key "6a80fc2e-2d7e-41dd-b307-2752acab8690" \
      --output json
    ```

=== "Windows (PowerShell)"
    ```bash
    uip or processes create `
      --name "{YourName}LoanUnderwritingAgent" `
      --package-key "{YourName}LoanUnderwritingAgent" `
      --package-version "0.0.1" `
      --entry-point "agent" `
      --folder-key "6a80fc2e-2d7e-41dd-b307-2752acab8690" `
      --output json
    ```
