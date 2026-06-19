# Language and Tone

How to write course content that is clear, approachable, and consistent. With examples.

---

## Audience

First-time workshop participants. Assume no prior UiPath knowledge. They are not developers and not UiPath experts — they're here to learn by doing.

---

## Voice

### Person and tense

- **Second person** throughout: "you'll configure", "your agent", "open the panel"
- **Present tense** for descriptions: "the robot retrieves invoices", "the agent compares the data"
- **Future tense** for instructions: "you'll add a connection", "in the next step you'll configure"

### Register

Conversational and approachable. Warm, lively, with personality. Not stiff corporate tone, not casual slang. Think: a knowledgeable colleague walking you through something they find genuinely interesting.

**Good:** "Luckily, you can import them all at once by switching to JSON editor mode."
**Good:** "RPA automation using UI interaction is often the only way to extract that data, and this is where UiPath shines."
**Good:** "Let's agree that the App could use a better design, but all in all — it does the job well enough."

**Too formal:** "It should be noted that the aforementioned functionality enables users to import arguments simultaneously."
**Too casual:** "Just yeet the JSON in there and you're golden lol."

### Humour

Humour is welcome — it makes the content more engaging and memorable. Use it sparingly and naturally:

- Light asides and self-aware comments are good: "another piece of advice from gpt-4o"
- Wry observations about real-world complexity work well: "Companies often set tolerance levels (e.g., a 5% price variance) to determine if minor differences are acceptable."
- Visual jokes (e.g., a "wise robot" image with a generated quote) add personality
- Do not force humour where it doesn't fit — technical accuracy always comes first
- Avoid jokes that require cultural context the audience may not share

### Sentence length

Short. One idea per sentence. If a sentence runs more than two lines on screen, split it.

**Good:** "Context Grounding anchors the agent to a real data source. Every decision traces back to valid entries in your context."

**Too long:** "Context Grounding is a technique that anchors the agent to a real data source so that every decision it makes can be traced back to valid entries in your context, which eliminates the risk of the agent inventing new categories that don't exist in your system."

### Paragraphs

Two to four sentences maximum. After four sentences, start a new paragraph or use a list.

---

## Word choices

### Words and phrases to avoid

| Avoid | Use instead |
|-------|------------|
| "leverage" | "use" |
| "utilize" | "use" |
| "robust" | (describe what makes it strong instead) |
| "seamlessly" | (describe the actual integration) |
| "In this section we will" | (just start doing it) |
| "Please note that" | (just state the fact) |
| "It is important to" | (just state why) |
| "feel free to" | (just say "you can") |
| "As mentioned earlier" | (just restate if needed) |

### Transitions that work

These keep the conversational flow without being filler:

- "Next, ..." / "Now ..."
- "Let's ..." (for collaborative framing)
- "Here's what changes:" / "Here's the structure:"
- "Done." (for a satisfying end to a configuration step)
- "Time to give it a try" / "Time to move on"

### Platform names

Bold on **first appearance per page**, plain text after. Always use the exact name:

| Correct | Incorrect |
|---------|-----------|
| **Agent Builder** | Agent builder, agent-builder |
| **Maestro** | maestro, Maestro™ |
| **IXP** (Intelligent eXtraction & Processing) | IXP (define on first use) |
| **Action Center** | action center, ActionCenter |
| **ServiceNow** | Servicenow, service now |
| **Studio Web** | studio web, Studio web |
| **Data Fabric** | data fabric |
| **Integration Service** | integration service |
| **Orchestrator** | orchestrator |

### Acronyms

Define on first use per page:

```markdown
**IXP** (Intelligent eXtraction & Processing)
```

After the first mention, use just the acronym: IXP.

---

## Capitalisation

### Domain concepts

Capitalised mid-sentence nouns are acceptable when they match UI labels or are domain terms used consistently. Do not lowercase them:

- Invoice, Purchase Order, Storage Bucket, Payments Queue
- Category, Subcategory (when referring to ServiceNow fields)
- Incident Number, Incident ID (when referring to specific system identifiers)

### Headings

- `# Title` and `## Section` — title case or sentence case, be consistent within a page
- `### N. Substep heading` — sentence case: "1. Create the agent and configure arguments"

---

## Content principles

### Don't remove explanatory content

Paragraphs that give context or motivation are not "filler." When reviewing or editing:

- Rephrase awkward sentences — don't delete the paragraph
- Preserve all technical explanations and background context
- Only remove genuinely redundant content (exact same paragraph verbatim in two places)

### Describing the same scenario in more than one place is acceptable

A concept may appear in the overview, be explained in a concept section, and then referenced in the steps. This is intentional reinforcement, not duplication.

### Don't over-stub

Only add `!!! note "Content migration in progress"` placeholder blocks when real source content exists but hasn't been transferred yet. Don't add stubs to sections that are intentionally left as future work by the author.

---

## Examples from real courses

### Good opening tip (Invoice Matching — lesson 2)

```markdown
!!! tip "Here is our plan for this lesson:"

    1. Create a **Maestro** agentic process in **Studio Web** and import your BPMN diagram
    2. Connect the RPA robotic task to the **RetrieveInvoiceDocument** process
    3. Run a debug session to verify the robot's output
    4. Learn how process inputs and outputs work
```

### Good conversational transition (Invoice Matching — lesson 3)

> "Think about what could be the right way to test this agent and make sure that future changes in prompts or in LLM model do not affect the results?"

### Good practical aside (Invoice Matching — lesson 4)

> "In real life, it is absolutely not ok to approve an invoice and send it for payment if the Purchase Order was for something different — in some countries it's a crime. But for this practice, assume that humans can do whatever they want."

### Good concise ending (Invoice Matching — lesson 5)

The lesson ends with two screenshots showing results (payments queue, rejection email). No summary paragraph needed — the screenshots speak for themselves.

### Good use of quotes for personality (Invoice Matching — lesson 2)

```markdown
> ***The art of keeping your projects organized is rooted in habits — and habits are nurtured through consistent practice.***
<div align=right><i>Generated by a wise ancient LLM</i></div>
```
