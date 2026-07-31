# Loan Officer Review Dashboard
Use the `uipath-coded-apps` skill to generate a React Coded Action App that renders inside Maestro's human task review — showing the AI credit assessment and letting the loan officer approve or reject the application.

## 1. Open Your Project Folder in Your Coding Agent

Create an empty folder called `{yourname}loanofficerdashboard` and open it in your coding agent (e.g. Claude Code, Codex):

```bash
mkdir {yourname}loanofficerdashboard
```

## 2. Describe the App

Give your coding agent a plain-English description of what to build. Be specific about what the officer sees, where the data comes from, and what the decision buttons do:

```text
Build a Coded Action App using UiPath TypeScript SDK called
{yourname}loanofficerdashboardApp. It should:

1. Receives twelve inputs: LoanId (string), ApplicantFirstName (string),
   ApplicantLastName (string), LoanAmount (number), LoanTerm (number),
   YearlyIncome (number) — passed from the Maestro process — and the six
   outputs of the coded agent: CreditScore (number, 0–100), RiskBand
   (string — Low / Medium / High), AssessmentSummary (string),
   MonthlyRepayment (number), DebtToIncomeRatio (number), and
   LoanToMarketRatio (number)
2. Display a two-panel dashboard: left panel shows the applicant name, LoanId,
   loan amount, loan term, and yearly income; right panel shows CreditScore as
   a progress bar, RiskBand as a colour-coded badge (green = Low, yellow =
   Medium, red = High), AssessmentSummary as a text block, and the three
   financial metrics (monthly repayment, debt-to-income ratio,
   loan-to-market ratio) as labelled values
3. Provide an optional Notes text area for the loan officer to add comments
4. Let the loan officer submit a decision via Approve (green) or Reject (red)
   buttons — defined as outcomes in action-schema.json, no external API calls
   needed
```

Your coding agent reads the `uipath-coded-apps` skill context and generates a complete app project:

- `src/App.tsx` — the main React component with the two-panel layout
- `action-schema.json` — defines all inputs and the `Approve`/`Reject` outcomes
- `package.json` — project dependencies
- `vite.config.ts` — Vite config with `base: './'`

## 3. Review the Generated Code

Open the project in your IDE. You should see:

- **`action-schema.json`** — `inputs` section with `LoanId`, `CreditScore`, `RiskBand`, `AssessmentSummary`, and `outcomes` section with `Approve` and `Reject`
- **`App.tsx`** — two-panel layout, progress bar for the credit score, colour-coded risk badge, inputs read directly from the action schema context

Check that the risk badge colours match the bands. If anything looks off, ask your coding agent to fix it:

```text
The credit score progress bar doesn't change colour — make it green
below 40, yellow between 40 and 70, and red above 70
```

## 4. Run Locally

!!! note
    Run these commands inside the app folder. Navigate to it first:
    ```bash
    cd LoanOfficerDashboard
    ```

```bash
npm install
npm run dev
```

When the server starts successfully you should see:

```text
  VITE v8.0.16  ready in 308 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Opening `http://localhost:5174/` directly will show the app layout with no data — fields will be empty since no parameters are passed. The port may vary (5173, 5174, etc.) — use whichever Vite reports in the terminal.

### Workshop prompt — demo mode

For a richer local preview with interactive buttons and no Action Center dependency, ask your coding agent:

```text
Start a local test version of the Coded Action App and provide a clickable URL
where I can preview the interface with realistic dummy data.

Add a safe demo mode that:

- Works only on localhost and does not require an Action Center task
- Populates every input defined in action-schema.json
- Keeps notes, theme switching, and outcome buttons interactive
- Does not call UiPath APIs or complete a real task
- Leaves normal production behavior unchanged

Rebuild and lint the app, start the local development server, verify the URL
returns HTTP 200, and give me the clickable demo URL.
```

## 5. Build, Pack, and Publish

```bash
npm run build
uip codedapp pack dist -n {yourname}loanofficerdashboard --version 1.0.0
uip codedapp publish -t Action
```

The `-t Action` flag is required — it registers the app as a Coded Action App so Maestro can route human tasks to it.

## 6. Deploy to Orchestrator

```bash
uip codedapp deploy -n {yourname}loanofficerdashboard --folder-key <CodingAgentsILT-folder-key>
```

For example:

```bash
uip codedapp deploy -n {yourname}loanofficerdashboard --folder-key 6a80fc2e-2d7e-41dd-b307-2752acab8690
```

To find the folder key for AgenticPractice:

```bash
uip or folders list --output json
```

Look for the entry where `Name` is `AgenticPractice` and copy its `Key` value.

The app is now live. In Lesson 3, Maestro pauses at the human review step and renders this app for the loan officer to complete.

