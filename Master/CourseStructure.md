# Course Structure

How courses are organized into pages, and what each page type contains. Includes full templates for each page type.

Reference implementation: **Invoice Matching with IXP** exercise.

---

## Page types

Every exercise consists of three page types in this order:

| Page type | File | Purpose |
|-----------|------|---------|
| **Overview** | `index.md` | What the exercise is about, what you'll build, links to all lessons |
| **Lesson** (1–N) | `N-verb-noun.md` | Theory + hands-on steps for one part of the exercise |
| **Summary** | `you-did-it.md` | Congratulations, what you built, next steps, learn more |

---

## 1. Overview Page

The overview page is the entry point for an exercise. It should be short and scannable — a learner glances at it and knows what they're getting into.

### Structure

```
# Title                           ← Exercise name (noun phrase)
**Headline**                      ← One sentence: what the learner builds
## Overview                       ← 2–3 sentences + platform features used
Step table                        ← Table with links to each lesson
Training environment callout      ← Standard tip admonition
```

### Content rules

- **Title** — The exercise name as a noun phrase. Examples: "Categorizing Incidents", "Invoice Matching with IXP"
- **Headline** — Bold, one sentence describing what the learner builds. Examples: "Build an end-to-end 2-way matching process using IXP, Robots, an AI Agent, and human review."
- **Overview** — 2–3 sentences. Names the key platform features (bold on first use). Explains the business case briefly.
- **Steps table** — One row per lesson. Columns: `Step` (right-aligned, linked) and `Focus` (left-aligned, brief description). Links use relative paths to lesson files.
- **Training environment** — Standard callout at the bottom (see template).

### Template

````markdown
# Exercise Name

**One sentence describing what the learner builds in this exercise.**

## Overview

Two to three sentences about the business process and what platform features are used. Bold platform names on first appearance: **Agent Builder**, **Maestro**, **IXP** (Intelligent eXtraction & Processing), **Action Center**.

| Step | Focus |
| ---: | :--- |
| [**Lesson One Title**](1-verb-noun.md) | Brief description of what the learner does |
| [**Lesson Two Title**](2-verb-noun.md) | Brief description |
| [**Lesson Three Title**](3-verb-noun.md) | Brief description |

!!! tip "Training Environment"
    Log in at **[cloud.uipath.com/tpenlabs](https://cloud.uipath.com/tpenlabs)** and remember using tenant **AgenticPractice** for this exercise.
````

### Real example (Invoice Matching with IXP)

````markdown
# Invoice Matching with IXP

**Build an end-to-end 2-way matching process using IXP, Robots, an AI Agent, and human review.**

## Overview

**UiPath Maestro** enables agentic orchestration — coordinating long-running enterprise processes between humans, robots, and AI agents across different systems of record and engagement. This exercise adds **IXP** (Intelligent eXtraction & Processing) to the mix, using it to extract structured invoice data from PDF documents.

| Step | Focus |
| ---: | :--- |
| [**Create BPMN Process**](1-create-bpmn.md) | Design the end-to-end workflow for the process |
| [**Configure a Robot**](2-configure-robot.md) | RPA job to retrieve the invoice PDF document |
| [**Configure an Agent**](3-configure-agent.md) | Extract invoice data using IXP, look up the Purchase Order, and run 2-way matching |
| [**Configure Human Validation**](4-configure-human-validation.md) | Action App in Action Center for human review of invoice exceptions |
| [**Configure API Integration**](5-configure-api.md) | Send rejection emails and store approved invoices for payment processing |

!!! tip "Training Environment"
    Log in at **[cloud.uipath.com/tpenlabs](https://cloud.uipath.com/tpenlabs)** and remember using tenant **AgenticPractice** for this exercise.
````

---

## 2. Lesson Page

Lesson pages are the core of the course. Each one teaches background concepts and then walks the learner through hands-on steps.

### Structure

```
# Title                           ← Descriptive phrase (see rules below)
!!! tip "Plan admonition"         ← 2–3 high-level actions for this lesson
## Goal                           ← One paragraph: what the learner will have built
## Concept Section(s)             ← 1+ sections covering theory and background
## Steps                          ← Numbered step-by-step instructions with screenshots
  ### 1. Substep heading
  ### 2. Substep heading
  ### ...
```

### Content rules

**Title:**
- A descriptive phrase, not a generic "Step N" label
- Can vary in style: "Modeling Business Processes using BPMN canvas", "Automating Tasks using Robots", "LLM with Context"
- Should convey what the lesson is about at a glance

**Plan admonition (tip):**
- Opens the page immediately after the title
- Lists 2–3 high-level actions the learner will take
- Title text can vary: "Here is our plan for this lesson:", "Let's start!", "What you'll do"
- Use a numbered list inside

```markdown
!!! tip "Here is our plan for this lesson:"

    1. Build the matching AI Agent from scratch.
    2. Configure testing and build an evaluations dataset.
    3. Configure the Agent in the Maestro workflow.
```

**Goal section:**
- One paragraph, 2–4 sentences
- Describes what the learner will have *built* by the end (not what they will *do*)
- Second person: "you'll have configured", "your agent will be able to"

**Concept sections:**
- One `##` section per key concept or background needed before hands-on steps
- Explain *why* this approach was chosen, how a platform feature works, what inputs/outputs to expect
- Keep each section short: 2–4 sentences per paragraph
- These are not optional filler — they provide the context a first-time learner needs

**Steps section:**
- Use `## Steps` as the section heading (or a descriptive heading like "Build the diagram")
- Use `### N. Descriptive substep heading` for each substep
- Number substeps sequentially: `### 1. Create the agent`, `### 2. Configure the prompts`
- Each substep has action text followed by screenshots
- Steps are numbered with `1. 2. 3.` inside the prose, not bullet points
- Screenshots sit inside numbered lists with 4-space indent to preserve numbering

**What NOT to include:**
- No bottom navigation links (`[← Previous]` / `[Next →]`) — the MkDocs sidebar handles this
- No horizontal rules (`---`) within lesson pages — use `##` headings for separation
- No `!!! note "Content migration in progress"` unless migrating real content that hasn't been transferred yet

### Template

````markdown
# Descriptive Lesson Title

!!! tip "Here is our plan for this lesson:"

    1. First high-level action the learner will take
    2. Second high-level action
    3. Third action (if applicable)

## Goal

One paragraph describing what the learner will have built or configured by the end of this lesson. Keep it to 2–4 sentences. Use second person and future tense.

## Background Concept

Background explanation that the learner needs before starting the hands-on steps. Why this approach matters, how the platform feature works, what to expect.

Keep paragraphs short — 2–4 sentences maximum.

## Steps

### 1. First substep heading

Action text explaining what to do.

[[[
Additional context or instructions.
|30|
![Alt text describing what the screenshot shows](step-slug.images/1-filename.png){ .screenshot }
]]]

### 2. Second substep heading

More action text.

![Alt text](step-slug.images/2-filename.png){ .screenshot }

### 3. Third substep heading

Continue the hands-on steps until the lesson goal is achieved.
````

### Real example excerpt (from 2-configure-robot.md)

````markdown
# Automating Tasks using Robots

!!! tip "Here is our plan for this lesson:"

    1. Create a **Maestro** agentic process in **Studio Web** and import your BPMN diagram
    2. Connect the RPA robotic task to the **RetrieveInvoiceDocument** process
    3. Run a debug session to verify the robot's output
    4. Learn how process inputs and outputs work

## Goal

Create a Maestro Agentic Process, import your BPMN diagram, and connect the first task to the **RetrieveInvoiceDocument** RPA process. The robot simulates retrieving an invoice PDF and outputs the file name stored in a Storage Bucket. The agent in the next step will extract structured data from that PDF using IXP.

## About the Robot Process

In this simulated scenario, the company processes hundreds of invoices per day. Data is stored in ERP and Accounts Payable systems that don't always have APIs or direct database access. RPA automation using UI interaction is often the only way to extract that data, and this is where UiPath shines.

## Steps

### 1. Create the Agentic Process

In [**Studio Web**](https://cloud.uipath.com/tpenlabs/studio_/projects), make sure you are building in the right Tenant (**AgenticPractice**), click **Create New** and select **Agentic Process**.

![New Agentic Process in Studio Web](configure-robot.images/1-new-agentic-process.png){ .screenshot }
````

---

## 3. Summary Page (you-did-it.md)

The summary page celebrates completion and gives the learner directions for what to do next.

### Structure

```
# You did it!
!!! tip "Congratulations!"          ← One-line celebration
---
## What you built                   ← Summary + component table
---
## Next steps                       ← Publish, explore results
  ### 1. First next step
  ### 2. Second next step
---
## Keep iterating                   ← Suggestions for extending the exercise
---
## Learn more                       ← Resource table
```

### Content rules

- **Congratulations admonition** — One sentence summarizing what was built
- **What you built** — 2–3 sentences, then a component/role table
- **Next steps** — Practical steps: publish, run, explore dashboards
- **Keep iterating** — 2–3 suggestions for extending or improving the exercise
- **Learn more** — Table with links to documentation, academy, community. Pull links from `documentation.txt` in the exercise folder.

### Template

````markdown
# You did it!

!!! tip "Congratulations!"

    You've built a complete [one-line description of what they built].

---

## What you built

Two to three sentences summarizing the end-to-end process and what makes it work.

| Component | Role |
|-----------|------|
| **Component 1** | What it does in this exercise |
| **Component 2** | What it does |
| **Component 3** | What it does |

---

## Next steps

### 1. Publish and run your process

Brief instructions on publishing and triggering a run.

### 2. Explore the results

What to look at after a successful run — dashboards, logs, outputs.

---

## Keep iterating

**Improve the agent prompt**

- Suggestion for how to iterate on the prompt.

**Test the boundaries**

- Suggestion for edge case testing.

**Expand the process**

- Suggestion for extending with new capabilities.

---

## Learn more

| Resource | Description |
|----------|-------------|
| Resource Name | One-sentence description |
````

### Real example (Invoice Matching with IXP — you-did-it.md)

The existing `you-did-it.md` in the Invoice Matching exercise follows this structure exactly. See it for a complete reference.

---

## Home Page (docs/index.md)

The home page is the site-wide entry point. It lists all available exercises.

### Structure

```
# Site Title
**Bold subtitle**
---
Training environment callout
## What You'll Build               ← 2–3 sentences framing all exercises
Exercise links                     ← Links to each exercise
---
Core principle callout
---
## Key Concepts                    ← Glossary of platform terms
```

When adding a new exercise, add a link and brief description under the exercise links section. Match the format of existing entries.

---

## Global Outro (docs/next-steps.md)

A standalone page at the site level that wraps up the entire workshop. Structure is similar to `you-did-it.md` but covers all exercises, not just one.

---

## Generation vs. Review

**When generating new content** (creating an exercise or lesson from scratch):
- Follow the templates above exactly
- Include all required sections
- Use placeholder content for sections you can't fill yet

**When reviewing existing content** (human has already written or edited the page):
- Assume the human's structural choices are intentional
- Flag deviations from the standard but do not rewrite without confirmation
- Focus on formatting, language, and consistency rather than restructuring
