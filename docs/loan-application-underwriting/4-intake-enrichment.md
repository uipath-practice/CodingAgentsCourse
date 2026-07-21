# Application Intake & Enrichment
Use the `uipath-rpa` skill to generate a Studio XAML workflow that reads applicant data from a CSV, submits each loan application through the UiBank API, and writes the results to `results.csv`.

## 1. Open Your Project Folder in Your Coding Agent

Create an empty folder called `LoanApplicationDispatcher` and open it in your coding agent (e.g. Claude Code, Codex):

```bash
mkdir LoanApplicationDispatcher
```

## 2. Describe the Automation

Give your coding agent a plain-English description of what to build:

```text
Build a UiPath Studio automation called {YourName}LoanApplicationDispatcher that:

1. Reads loan-applications.csv into a DataTable with columns: first_name,
   last_name, email, loan_amount, loan_term, yearly_income, age
2. For each row, submits a loan application to the UiBank API
   (https://uibank-api.uipath.com/explorer/swagger.json, no authentication
   required) via the newquote endpoint — POST request with Content-Type
   application/x-www-form-urlencoded, mapping: loan_amount → amount,
   loan_term → term, yearly_income → income, age → age, email → email
3. If the application is accepted, writes a row to results.csv with loan_id
   (the quoteid from the response), status "Loan Submitted", and all applicant
   fields — then starts the flow process {YourName}LoanUnderwritingProcess in the
   CodingAgentsPractice folder, passing loan_id, applicant_first_name, applicant_last_name,
   loan_amount, loan_term, and income as inputs. Once it completes,
   updates the status in results.csv to "Loan Approved" or "Loan Rejected"
   based on final_decision
4. If the application is rejected, writes a row to results.csv with an empty
   loan_id, status "Failed", and error "Application rejected"
5. Wraps each row in a Try/Catch — on exception, writes a row to results.csv
   with empty loan_id, status "Failed", and the exception message
6. After all rows are processed, uploads results.csv to the LoanUnderwriting
   storage bucket in the CodingAgentsPractice folder in Orchestrator

Create this as a cross-platform project (not Windows). Only generate the
project files.
```

Your coding agent reads the `uipath-rpa` skill context and generates a complete Studio project:

- `Main.xaml` — the main workflow with API authentication, ForEach loop, HTTP requests, and CSV output
- `project.json` — project configuration and activity package dependencies

## 3. Review the Generated Workflow

Open `Main.xaml` in Studio. You should see:

- **Read CSV** — reads `loan-applications.csv` into a DataTable
- **For Each Row in Data Table** — loops over each applicant
  - **HTTP Request** — POST to `/api/quotes/newquote` with form-encoded fields (amount, term, income, age, email)
  - **Deserialize JSON** — parses the response to extract `accepted` and `quoteid`
  - **If** — branches on `accepted`
  - **Append Line / Write CSV** — appends the result row to `results.csv`
- **Try/Catch** — wraps each row to handle failures without stopping the whole run

!!! note "Check the Start Job entry point"
    Find the **Start Job** activity that triggers `{YourName}LoanUnderwritingProcess`. Verify that the process name and folder path are set correctly — they should match exactly what you deployed in Lesson 3. If the entry point path is wrong, the job will fail to start.

If the HTTP Request activity is not correctly setting the form body, ask your coding agent to fix it:

```text
The HTTP Request for /api/quotes/newquote should use Content-Type
application/x-www-form-urlencoded with form fields, not a JSON body.
Update the activity accordingly.
```

## 4. Before You Run

Make sure `loan-applications.csv` is in the project folder. If you haven't created it yet, you can ask your coding agent to generate it using the sample data from the [Overview](index.md):

```text
Create a file called loan-applications.csv in the current folder using this data:

first_name,last_name,email,loan_amount,loan_term,yearly_income,age
Alice,Nguyen,alice.nguyen@example.com,15000,3,48000,34
Ben,Carter,ben.carter@example.com,50000,5,30000,40
Clara,Osei,clara.osei@example.com,70000,5,28000,29

Replace first_name, last_name, and email for each row with different values —
use your own name or make them up, as long as they are not the same as the
ones above. Keep loan_amount, loan_term, yearly_income, and age unchanged.
```

## 5. Run and Test

Open the project in Studio and run `Main.xaml`. Watch the Output panel as the workflow authenticates and submits each application via the API. Then verify:

- **`results.csv`** — open the file and confirm three rows appear, each with a `loan_id` and a status of `Loan Approved` or `Loan Rejected`

## 6. Publish to Orchestrator

First, create a `Package` folder next to your project folder — not inside it. Replace `<working-folder>` with the parent folder that contains `{YourName}LoanApplicationDispatcher`:

```bash
mkdir "<working-folder>\Package"
```

Your folder structure should look like this:

```text
<working-folder>\
    {YourName}LoanApplicationDispatcher\   ← the Studio project
    Package\                    ← where the .nupkg will be saved
```

Then pack the project into a `.nupkg` file:

```bash
uip rpa pack "<working-folder>\{YourName}LoanApplicationDispatcher" "<working-folder>\Package"
```

The packed `.nupkg` file will appear inside the `Package` folder. Upload it to Orchestrator:

```bash
uip or packages upload "<working-folder>\Package\{YourName}LoanApplicationDispatcher.1.0.0.nupkg"
```

Then create a process from the uploaded package:

```bash
uip or processes create --folder-path "CodingAgentsPractice" --name "{YourName}LoanApplicationDispatcher" --package-key {YourName}LoanApplicationDispatcher --package-version 1.0.0
```
