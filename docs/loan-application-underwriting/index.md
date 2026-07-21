# Loan Application Underwriting (Studio RPA, Coded Agent, Coded App, Maestro)
**Use the UiPath coding skills to build a complete code-first underwriting pipeline for UiBank**

## Overview

UiBank receives loan applications every day. Each one needs a credit assessment — income check, spending analysis, debt-to-income ratio — before a loan officer can make a decision. Doing this manually takes time, introduces inconsistency, and doesn't scale.

This exercise takes a code-first approach to the problem. Instead of configuring low-code workflows, you describe what you want to build in plain English — and your coding agent, equipped with UiPath skills, generates each component for you. You'll see exactly when code beats drag-and-drop, and why.

You'll build four components in this order: the **coded agent** first, then the **loan officer app**, then the **Maestro flow** that wires them together, and finally the **RPA workflow** that drives the whole process. Each lesson is self-contained — by the end, they all run together.

The use case: a CSV of loan applicants is processed row by row. For each applicant, the RPA submits a loan application to the UiBank API and immediately starts a Maestro process with the returned loan ID. Maestro runs the AI credit assessment, routes low-risk applications to an automatic approval, and sends medium and high-risk ones to a loan officer for review.

## What You'll Build

Four components, built in this order:

1. **Coded Agent** — a Python LangGraph agent that receives a `loan_id`, calls the UiBank API to verify the quote and retrieve market data, computes financial metrics, and uses the LLM to produce a credit score, risk band, and assessment summary
2. **Loan Officer App** — a React Coded Action App that presents the AI assessment to a loan officer and captures an Approve or Reject decision
3. **Maestro Flow** — a UiPath Flow process that calls the agent, auto-approves low-risk results, and opens the loan officer app for medium and high-risk cases
4. **RPA Workflow** — a Studio XAML workflow that reads `loan-applications.csv`, submits each row to the UiBank API, and starts the Maestro Flow process for each accepted application

<div style="font-family: sans-serif; max-width: 680px; margin: 2rem auto;">

  <div style="text-align: center; margin-bottom: 8px;">
    <span style="display: inline-block; background: #f5f5f5; border: 2px dashed #bdbdbd; border-radius: 8px; padding: 8px 24px; font-size: 13px; color: #616161; font-family: monospace;">📄 loan-applications.csv</span>
  </div>

  <div style="text-align: center; color: #bdbdbd; font-size: 20px; margin: 4px 0;">↓</div>

  <div style="background: #e8eaf6; border: 2px solid #3f51b5; border-radius: 10px; padding: 14px 18px; margin-bottom: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="font-weight: 700; color: #283593; font-size: 14px;">Studio RPA · LoanApplicationDispatcher</div>
        <div style="font-size: 12px; color: #5c6bc0; margin-top: 6px;">For each row: <code style="background: #c5cae9; padding: 1px 4px; border-radius: 3px; font-size: 11px;">POST /api/quotes/newquote</code> → UiBank API</div>
      </div>
      <span style="background: #3f51b5; color: white; border-radius: 4px; padding: 3px 8px; font-size: 11px; white-space: nowrap; margin-left: 12px;">uipath-rpa</span>
    </div>
  </div>

  <div style="text-align: center; color: #bdbdbd; font-size: 20px; margin: 4px 0;">↓</div>

  <div style="text-align: center; margin-bottom: 8px;">
    <span style="background: #fff8e1; border: 1.5px solid #f9a825; border-radius: 6px; padding: 4px 16px; font-size: 12px; color: #f57f17;">◇ &nbsp;accepted == True?</span>
  </div>

  <div style="display: flex; gap: 12px; margin-bottom: 8px;">
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 11px; color: #888; margin-bottom: 4px;">No</div>
      <div style="background: #ffebee; border: 1px solid #ef9a9a; border-radius: 6px; padding: 6px; font-size: 11px; color: #c62828;">write "Failed" to results.csv</div>
    </div>
    <div style="flex: 1; text-align: center;">
      <div style="font-size: 11px; color: #888; margin-bottom: 4px;">Yes</div>
      <div style="background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 6px; padding: 6px; font-size: 11px; color: #2e7d32;">start Maestro Flow with <code style="font-size: 10px; background: #c8e6c9; padding: 1px 3px; border-radius: 2px;">loan_id</code></div>
    </div>
  </div>

  <div style="text-align: center; color: #bdbdbd; font-size: 20px; margin: 4px 0;">↓</div>

  <div style="background: #fff3e0; border: 2px solid #e65100; border-radius: 10px; padding: 14px 18px;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
      <div style="font-weight: 700; color: #bf360c; font-size: 14px;">Maestro Flow · LoanUnderwritingProcess</div>
      <span style="background: #e65100; color: white; border-radius: 4px; padding: 3px 8px; font-size: 11px; white-space: nowrap; margin-left: 12px;">uipath-maestro-flow</span>
    </div>

    <div style="background: #f3e5f5; border: 2px solid #7b1fa2; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="font-weight: 700; color: #4a148c; font-size: 12px;">Coded Agent · LoanUnderwritingAgent</div>
          <div style="font-size: 11px; color: #8e24aa; margin-top: 4px;">Calls 3 UiBank API tools → returns <code style="background: #e1bee7; padding: 1px 3px; border-radius: 2px; font-size: 10px;">risk_band</code> · <code style="background: #e1bee7; padding: 1px 3px; border-radius: 2px; font-size: 10px;">credit_score</code> · <code style="background: #e1bee7; padding: 1px 3px; border-radius: 2px; font-size: 10px;">assessment_summary</code></div>
        </div>
        <span style="background: #7b1fa2; color: white; border-radius: 4px; padding: 2px 6px; font-size: 10px; white-space: nowrap; margin-left: 8px;">uipath-agents</span>
      </div>
    </div>

    <div style="text-align: center; margin-bottom: 12px;">
      <span style="background: #ffe0b2; border: 1.5px solid #e65100; border-radius: 6px; padding: 4px 16px; font-size: 12px; color: #bf360c;">◇ &nbsp;risk_band == "Low"?</span>
    </div>

    <div style="display: flex; gap: 16px;">
      <div style="flex: 1; text-align: center;">
        <div style="font-size: 11px; color: #888; margin-bottom: 6px;">Yes</div>
        <div style="background: #e8f5e9; border: 2px solid #388e3c; border-radius: 8px; padding: 12px; font-size: 13px; font-weight: 600; color: #1b5e20;">✓ Auto-Approved</div>
      </div>
      <div style="flex: 2;">
        <div style="font-size: 11px; color: #888; margin-bottom: 6px; text-align: center;">No (Medium / High)</div>
        <div style="background: #e0f2f1; border: 2px solid #00796b; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700; color: #004d40; font-size: 12px;">Coded App · loan-officer-dashboard</div>
              <div style="font-size: 11px; color: #00796b; margin-top: 3px;">Loan officer reviews and submits decision</div>
            </div>
            <span style="background: #00796b; color: white; border-radius: 4px; padding: 2px 6px; font-size: 10px; white-space: nowrap; margin-left: 8px;">uipath-coded-apps</span>
          </div>
        </div>
        <div style="text-align: center; margin-bottom: 8px;">
          <span style="background: #ffe0b2; border: 1.5px solid #e65100; border-radius: 6px; padding: 4px 12px; font-size: 11px; color: #bf360c;">◇ &nbsp;officer_decision == "Approve"?</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1; text-align: center;">
            <div style="font-size: 10px; color: #888; margin-bottom: 4px;">Yes</div>
            <div style="background: #e8f5e9; border: 2px solid #388e3c; border-radius: 8px; padding: 8px; font-size: 12px; font-weight: 600; color: #1b5e20;">✓ Approved</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div style="font-size: 10px; color: #888; margin-bottom: 4px;">No</div>
            <div style="background: #ffebee; border: 2px solid #c62828; border-radius: 8px; padding: 8px; font-size: 12px; font-weight: 600; color: #b71c1c;">✗ Rejected</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="text-align: center; color: #bdbdbd; font-size: 20px; margin: 4px 0;">↓</div>

  <div style="text-align: center; margin-bottom: 8px;">
    <div style="display: inline-block; background: #e8eaf6; border: 2px solid #3f51b5; border-radius: 8px; padding: 8px 20px; font-size: 12px; color: #283593;">
      <strong>RPA</strong> · write results to <code style="background: #c5cae9; padding: 1px 4px; border-radius: 3px; font-size: 11px;">results.csv</code> → upload to <strong>LoanUnderwriting</strong> storage bucket
    </div>
  </div>

</div>

## Before you start

| | |
| ---: | :--- |
| [**What's a Coding Agent?**](what-is-a-coding-agent.md) | Understand the mental model, tools, skills, and how UiPath fits in |
| [**Installation Guides**](installation-guides.md) | Install Node.js, Python, .NET SDK, UiPath Studio, Git, and a coding agent |
| [**Install UiPath Skills**](install-skills.md) | Install the UiPath CLI, authenticate, and load the skills into your coding agent |

## Steps

| Step | Focus |
| ---: | :--- |
| [**1. AI Underwriting Assessment**](1-underwriting-agent.md) | Use the `uipath-agents` skill to build a Python LangGraph agent that analyses applications and produces a structured credit assessment |
| [**2. Loan Officer Review Dashboard**](2-loan-officer-app.md) | Use the `uipath-coded-apps` skill to build a React Coded Action App for loan officers to review AI assessments and approve or reject applications |
| [**3. Orchestrating with Maestro Flow**](3-maestro-flow.md) | Use the `uipath-maestro-flow` skill to wire the coded agent and loan officer dashboard into a Maestro process with conditional routing by risk band |
| [**4. Application Intake & Enrichment**](4-intake-enrichment.md) | Use the `uipath-rpa` skill to build a Studio XAML workflow that submits applications to UiBank and writes results to a CSV |

## What you need

- A coding agent installed (Claude Code, Codex CLI, Gemini CLI, etc.)
- `uip` CLI installed (`uip --version` should return 1.195.1 or later)
- Node.js LTS (for the UiPath CLI and the React app)
- Python 3.10+ (for the coded agent)
- UiPath Studio installed locally (to open and run the generated XAML)

!!! tip "Training Environment"
    Log in at **[{{ training_url }}]({{ training_url }})** and use tenant **{{ training_tenant }}** for this exercise.

## Sample Data

Create a file called `loan-applications.csv` in your project folder:

```csv
first_name,last_name,email,loan_amount,loan_term,yearly_income,age
Alice,Nguyen,alice.nguyen@example.com,15000,3,48000,34
Ben,Carter,ben.carter@example.com,50000,5,30000,40
Clara,Osei,clara.osei@example.com,70000,5,28000,29
```

Three profiles cover all three risk paths: low, medium, and high. The RPA workflow will submit each row as a loan application to the UiBank API and record the loan ID returned for each accepted application.
