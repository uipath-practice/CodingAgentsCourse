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

- `main.py` — the agent entry point with the LangGraph graph definition (tools may be here or in a separate `tools.py`)
- `pyproject.toml` — project configuration with `uipath-langgraph` dependency
- `evals/` — a folder with 5 evaluation cases

## 3. Review the Generated Code

Open the project in your IDE. Every coding agent generates slightly different code — the structure varies. What matters is that the essentials are there.

**What to look for:**

- **Three `@tool`-decorated functions** — one each for `verify_quote`, `get_average_loan_amount`, and `compute_financial_metrics`. These may live in a separate `tools.py` or all inside `main.py` — either is fine.
- **A system prompt** — a `SYSTEM_PROMPT` string instructing the LLM to interpret the financial metrics holistically and produce a credit score, risk band, and assessment summary. It's usually inline in `main.py` rather than a separate file — built as a plain prompt string.
- **An agent entry point** — defined in `langgraph.json`, which points to `main.py:graph` (where `graph = builder.compile()`); this is also registered as the `"agent"` entry point in `entry-points.json`.
- **`evals/`** — 5 test cases covering a range of risk profiles, used to validate the agent's scoring behaviour with `uipath eval`.

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

### 2. Run and Verify Your Agent

Give this prompt to your coding agent — it finds real loan IDs across a spread of risk profiles, runs the agent against each, and checks the output:

```text
Test the LoanUnderwritingAgent I just built.

1. Open and inspect the UiBank Swagger documentation:
   https://uibank-api.uipath.com/explorer/swagger.json

2. Using only documented, read-only endpoints, find 3 existing loan quotes
   that cover a spread of risk profiles — e.g. a small loan with a healthy
   income ratio, a large loan with a long term, and an applicant with a
   tight income-to-loan ratio.

   Requirements:
   - Do not create, update, or delete any data.
   - Do not invent or reuse an unverified loan_id — verify each record exists.

3. For each loan_id, run the coded agent, saving each result to its own output file.

4. Read each out-*.json and confirm it contains:
   - a credit_score between 0 and 100
   - a risk_band of Low, Medium, or High
   - a plain-English assessment summary that actually reasons about the
     metrics (debt-to-income ratio, market comparison) rather than generic text

5. Report a table: loan_id | loan amount | term | income | age | credit score | risk band.
   Flag anything suspicious — identical scores across very different profiles,
   missing fields, or an exception.
```

## 5. Deploy the Agent

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

### Publish the Agent

Run setup and initialisation:

```bash
uip codedagent setup --force
```

```json
{
 "Result": "Success",
 "Code": "CodedAgentsSetup",
 "Data": {
  "PythonPath": "python3.14",
  "Package": "uipath",
  "PackageInstalled": "Yes",
  "PackageVersion": "2.10.73"
 }
}
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
    "Id": "30231678-ca53-438f-8258-4ef8c6cfa266"
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
         │
         ▼
    ┌ node ─────────────┐
    │ verify_loan_quote │
    └─────────┬─────────┘
         │
         ▼
   ┌ node ────────────────┐
   │ get_market_benchmark │
   └───────────┬──────────┘
         │
         ▼
     ┌ node ───────────┐
     │ compute_metrics │
     └────────┬────────┘
         │
         ▼
     ┌ node ─────────┐
     │ assess_credit │
     └───────┬───────┘
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
      --folder-key "c30345cd-5543-46a9-b42b-0354e60b4f15" \
      --output json
    ```

=== "Windows (PowerShell)"
    ```bash
    uip or processes create `
      --name "{YourName}LoanUnderwritingAgent" `
      --package-key "{YourName}LoanUnderwritingAgent" `
      --package-version "0.0.1" `
      --entry-point "agent" `
      --folder-key "c30345cd-5543-46a9-b42b-0354e60b4f15" `
      --output json
    ```

### Find a Test Loan ID

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
```

### Run the Deployed Agent from Orchestrator

In **Orchestrator**, navigate to your **CodingAgentsILT** folder, open `{YourName}LoanUnderwritingAgent`, and start a run with the `loan_id` returned by your coding agent as an input argument. Check the job output for the credit score, risk band, and assessment summary.
