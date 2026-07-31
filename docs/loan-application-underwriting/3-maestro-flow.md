# Orchestrating with Maestro Flow
Use the `uipath-maestro-flow` skill to generate a UiPath Flow process that wires the coded agent and the loan officer dashboard together and routes applications by risk band.

## 1. Open Your Project Folder in Your Coding Agent

Create an empty folder called `{YourName}LoanUnderwritingProcess` and open it in your coding agent (e.g. Claude Code, Codex):

```bash
mkdir {YourName}LoanUnderwritingProcess
```

## 2. Describe the Process

Give your coding agent a plain-English description of the full flow:

```text
Build a UiPath Flow process using the uipath-maestro-flow skill called
{YourName}LoanUnderwritingProcess. It should:

1. Receive six inputs: loan_id, applicant_first_name, applicant_last_name,
   loan_amount, loan_term, income
2. Call the agent {YourName}LoanUnderwritingAgent (in the CodingAgentsILT
   folder), passing loan_id and storing the returned values as process
   variables: credit_score, risk_band, assessment_summary,
   monthly_repayment, debt_to_income_ratio, loan_to_market_ratio
3. Auto-approve the application and end the process if risk_band is "Low"
4. For Medium or High risk, open the app {yourname}loanofficerdashboard (in the
   CodingAgentsILT folder), passing all twelve inputs: LoanId,
   ApplicantFirstName, ApplicantLastName, LoanAmount, LoanTerm, YearlyIncome,
   CreditScore, RiskBand, AssessmentSummary, MonthlyRepayment,
   DebtToIncomeRatio, LoanToMarketRatio — and capturing officer_decision
5. End with Approved or Rejected based on officer_decision
6. Output final_decision (string — "Approved" or "Rejected") in all cases,
   whether the application was auto-approved or decided by the loan officer
```

Your coding agent reads the `uipath-maestro-flow` skill context and generates a complete project:

- `{YourName}LoanUnderwritingProcess.flow` — the flow definition with all nodes, edges, and variable mappings
- `project.uiproj` — project manifest

## 3. Review the Generated Flow

Open `{YourName}LoanUnderwritingProcess.flow` in your text editor or ask your coding agent to describe the structure. You should see:

- A **Start node** with six process input variables: `loan_id`, `applicant_first_name`, `applicant_last_name`, `loan_amount`, `loan_term`, `income`
- An **Agent node** calling `{YourName}LoanUnderwritingAgent` with `loan_id` as input and six output variables: `credit_score`, `risk_band`, `assessment_summary`, `monthly_repayment`, `debt_to_income_ratio`, `loan_to_market_ratio`
- A **Condition node** branching on `risk_band == "Low"`
- A **Human Task node** wired to `{yourname}loanofficerdashboard` with all twelve variables mapped as inputs (`LoanId`, `ApplicantFirstName`, `ApplicantLastName`, `LoanAmount`, `LoanTerm`, `YearlyIncome`, `CreditScore`, `RiskBand`, `AssessmentSummary`, `MonthlyRepayment`, `DebtToIncomeRatio`, `LoanToMarketRatio`) and `officer_decision` as output
- A second **Condition node** branching on `officer_decision == "Approve"`
- Three **End nodes** — Auto-Approved, Approved, Rejected

If any mapping or condition needs adjusting, ask your coding agent:

```text
Update the risk band condition so the default path goes to the human review
node and the explicit condition branch handles the "Low" auto-approve case
```

!!! tip "Visualise the flow in Studio Web"
    You can import the generated `.flow` file into **Studio Web** to see a visual diagram of the process and test it interactively — without deploying to Orchestrator first. Open **Studio Web**, create a new Flow project, and import `{YourName}LoanUnderwritingProcess.flow`. The canvas will render all nodes, conditions, and connections exactly as the coding agent generated them.

## 4. Test the Generated Flow

Ask your coding agent to fetch a verified loan record from UiBank and generate valid test input for the flow:

```text
Open and inspect the UiBank Swagger documentation:

https://uibank-api.uipath.com/explorer/swagger.json

Using only endpoints documented by the API, identify the read-only endpoint for
retrieving loan quotes. Make a GET request and select one loan quote that
currently exists in UiBank.

Use the verified loan record to generate test input for the
{YourName}LoanUnderwritingProcess Flow.

Requirements:
- Use only GET endpoints documented in the Swagger specification.
- Do not create, update, or delete any data.
- Do not invent or reuse an unverified loan_id.
- Verify that the selected loan record exists.
- Populate loan_amount, loan_term, and income from the same verified record.
- loan_term represents years and must be one of: 1, 3, 5, or 10.
- Map the record's yearly income to income.
- Use applicant names from the record when available. If the API does not provide
  applicant names, use the workshop-safe values Madalina and Popescu.
- Return exactly one valid JSON object.
- Do not include Markdown, explanations, comments, or a PowerShell command.

Required output format:

{
  "loan_id": "<VERIFIED_LOAN_ID>",
  "applicant_first_name": "<FIRST_NAME>",
  "applicant_last_name": "<LAST_NAME>",
  "loan_amount": <LOAN_AMOUNT>,
  "loan_term": <1_OR_3_OR_5_OR_10>,
  "income": <YEARLY_INCOME>
}
```

Your coding agent should return something like:

```json
{
  "loan_id": "6a4203a1f4865600481c657b",
  "applicant_first_name": "Madalina",
  "applicant_last_name": "Popescu",
  "loan_amount": 15000,
  "loan_term": 3,
  "income": 48000
}
```

## 5. Validate and Pack

Validate the flow before packing:

```bash
uip maestro flow validate {YourName}LoanUnderwritingProcess.flow
```

If you get a command not found error, the maestro tool may not be installed or on your PATH:

```bash
# 1. Install maestro-tool (only needed once)
npm install -g @uipath/maestro-tool --prefix "$HOME/.npm-global"

# 2. Add it to PATH (needed each new terminal, or add to ~/.zshrc permanently)
export PATH="$HOME/.npm-global/bin:$PATH"

# To avoid step 2 every time, run this once:
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc

# 3. Validate
uip maestro flow validate {YourName}LoanUnderwritingProcess.flow
```

Fix any warnings, then pack:

```bash
uip maestro flow pack "<path-to-your-flow-folder>/{YourName}LoanUnderwritingProcess" /tmp/dist --version 1.0.0 --output json
```

For example:

```bash
uip maestro flow pack "/path/to/{YourName}LoanUnderwritingProcess/{YourName}LoanUnderwritingProcess" /tmp/dist --version 1.0.0 --output json
```

Upload the package to Orchestrator and create a process in the `CodingAgentsILT` folder:

```bash
uip or packages upload /tmp/dist/{YourName}LoanUnderwritingProcess.flow.Flow.1.0.0.nupkg --output json
```

For example:

```bash
uip or packages upload /tmp/dist/MadalinaLoanUnderwritingProcess.flow.Flow.1.0.0.nupkg --output json
```

If you get a command not found error, the maestro tool may not be installed or on your PATH:

```bash
# 1. Install maestro-tool (only needed once)
npm install -g @uipath/maestro-tool --prefix "$HOME/.npm-global"

# 2. Add it to PATH (needed each new terminal, or add to ~/.zshrc permanently)
export PATH="$HOME/.npm-global/bin:$PATH"

# To avoid step 2 every time, run this once:
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc

# 3. Retry the upload
uip or packages upload /tmp/dist/{YourName}LoanUnderwritingProcess.flow.Flow.1.0.0.nupkg --output json
```

Then create the process:

```bash
uip or processes create --name "{YourName}LoanUnderwritingProcess" --package-key "{YourName}LoanUnderwritingProcess.flow.Flow" --package-version "1.0.0" --folder-key "c30345cd-5543-46a9-b42b-0354e60b4f15" --output json
```

For example:

```bash
uip or processes create --name "MadalinaLoanUnderwritingProcess" --package-key "MadalinaLoanUnderwritingProcess.flow.Flow" --package-version "1.0.0" --folder-key "c30345cd-5543-46a9-b42b-0354e60b4f15" --output json
```

## 6. Test the Full Flow

Trigger the process from Orchestrator three times — once per applicant. Use the `loan_id` values from your verified test data as the process input:

| Applicant | Expected path |
|---|---|
| Alice — low loan, solid income | Low risk → auto-approved, no human task |
| Ben — large loan, high term | Medium risk → human task opens in Action Center |
| Clara — young age, tight income | High risk → human task opens in Action Center |

For Ben and Clara, open **Action Center** while the process is paused. The loan officer dashboard should appear with the credit score and risk band pre-filled. Submit a decision and watch the flow route to the matching end state.

!!! tip "Watch the execution trace"
    In Orchestrator, click into a running flow instance to see the live diagram with the active node highlighted. This is the fastest way to confirm routing is correct at each condition.
