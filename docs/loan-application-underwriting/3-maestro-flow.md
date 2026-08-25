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
  applicant names, use the workshop-safe values John and Doe.
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
  "applicant_first_name": "John",
  "applicant_last_name": "Doe",
  "loan_amount": 15000,
  "loan_term": 3,
  "income": 48000
}
```

## 5. Validate and Pack

=== "Manually"

    Navigate to the parent folder of the generated `.flow` file:

    ```bash
    cd "parent-folder-path/to/{YourName}LoanUnderwritingProcess"
    ```

    Replace the path with the actual location on your machine.

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

=== "Using Your Coding Agent"

    Give this prompt to your coding agent — it validates, publishes, and deploys the flow for you:

    ```text
    Publish and deploy the {YourName}LoanUnderwritingProcess Maestro flow I just built.

    1. Find the generated .flow file and validate it, fixing any warnings it reports.
    2. Publish it to Orchestrator, into the CodingAgentsILT folder
       (folder-key c30345cd-5543-46a9-b42b-0354e60b4f15), as version 1.0.0.
    3. Deploy it by creating a process from the published package in that same folder.
    4. Report back the process key.
    ```

## 6. Test the Full Flow

Trigger the process from Orchestrator three times — once per applicant below. Each `loan_id` is a real, verified record in UiBank (the agent re-fetches and scores off this record, so the amount/term/income below match it exactly):

```json
{"loan_id": "6a8dabd21feca3004834197a", "applicant_first_name": "Alice", "applicant_last_name": "Nguyen", "loan_amount": 25001, "loan_term": 3, "income": 80000}
```

```json
{"loan_id": "6a8c0bb11feca300483416cb", "applicant_first_name": "Ben", "applicant_last_name": "Carter", "loan_amount": 120000, "loan_term": 10, "income": 30000}
```

```json
{"loan_id": "6a8db0e11feca30048341981", "applicant_first_name": "Clara", "applicant_last_name": "Osei", "loan_amount": 12000, "loan_term": 10, "income": 1200}
```

These IDs point to live records in the shared UiBank sandbox — verified to exist at the time this lesson was written, and chosen so the debt-to-income ratio clearly separates each band: Alice ~10% (Low), Ben ~40% (Medium), Clara ~100% (High). If UiBank's data is ever reset, look up 3 fresh records with a similarly clear spread using the swagger lookup from step 4 — since scoring is LLM-driven, always re-run and confirm the resulting `risk_band` before relying on a new record.

| Applicant | Expected path |
|---|---|
| Alice — low loan, solid income | Low risk → auto-approved, no human task |
| Ben — large loan, high term | Medium risk → human task opens in Action Center |
| Clara — young age, tight income | High risk → human task opens in Action Center |

For Ben and Clara, open **Action Center** while the process is paused. The loan officer dashboard should appear with the credit score and risk band pre-filled. Submit a decision and watch the flow route to the matching end state.

!!! tip "Watch the execution trace"
    In Orchestrator, click into a running flow instance to see the live diagram with the active node highlighted. This is the fastest way to confirm routing is correct at each condition.
