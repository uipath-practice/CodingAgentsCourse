# Filesystem Structure

Everything about how the project is organized on disk — folders, files, naming conventions, and where things go.

---

## Project root

```
AgenticPracticeCourse/
├── CLAUDE.md                          ← Auto-loaded by Claude Code every session
├── README.md                          ← Human-facing repo guide
├── mkdocs.yml                         ← Site config: theme, nav, plugins, extensions
├── mkdocs.local.yml                   ← Local nav with draft exercises (gitignored)
├── requirements.txt                   ← Python deps for MkDocs + plugins
├── Master/                            ← Authoritative course rules (this directory)
│   ├── README.md
│   ├── Filesystem.md
│   ├── CourseStructure.md
│   ├── Formatting.md
│   ├── Language.md
│   └── HOWTO.md
├── docs/                              ← All page content
│   ├── index.md                       ← Home page
│   ├── next-steps.md                  ← Global site-level outro
│   ├── assets/
│   │   └── images/                    ← Images shared across multiple pages
│   ├── stylesheets/
│   │   └── extra.css                  ← Custom CSS (do not modify without reason)
│   ├── javascripts/
│   │   └── extra.js                   ← Custom JS (external links → new tab)
│   └── <exercise-slug>/              ← One folder per exercise (see below)
├── Archive/                           ← Archived exercises and lessons (gitignored)
│   └── <exercise-slug>/              ← One folder per archived exercise
├── hooks/
│   └── split_cols.py                  ← MkDocs hook: two-column layout shorthand
├── scripts/                           ← Screenshot metadata extraction pipeline
│   ├── extract_metadata.py            ← CLI entry point
│   ├── doc_context.py                 ← Per-exercise documentation embedding
│   ├── context_resolver.py            ← Resolves context per image
│   ├── context_ingest.py              ← Builds global RAG vector store
│   ├── llm_client.py                  ← Azure OpenAI vision API calls
│   ├── image_scanner.py               ← Discovers images needing processing
│   ├── metadata_writer.py             ← Writes JSON metadata files
│   ├── config.py                      ← Script configuration
│   ├── .env                           ← Azure OpenAI credentials (gitignored)
│   ├── requirements.txt               ← Python deps for scripts
│   └── context/
│       ├── README.md
│       └── vector_store.json          ← Global RAG embeddings
├── .claude/
│   ├── commands/                      ← Claude Code skills
│   │   ├── new-exercise.md
│   │   ├── new-lesson.md
│   │   ├── publish-exercise.md
│   │   ├── remove-lesson.md
│   │   ├── remove-exercise.md
│   │   ├── review-lesson.md
│   │   └── review-exercise.md
│   └── settings.local.json            ← Local Claude Code permissions
├── .github/
│   └── workflows/
│       └── deploy.yml                 ← Auto-deploy on push to main
└── site/                              ← Build output (gitignored)
```

---

## Exercise folder structure

Each exercise lives under `docs/` in its own folder. The **Invoice Matching with IXP** exercise is the reference implementation:

```
docs/invoice-matching-ixp/
├── index.md                             ← Overview page (ALWAYS named index.md)
├── 1-create-bpmn.md                     ← Lesson 1
├── 2-configure-robot.md                 ← Lesson 2
├── 3-configure-agent.md                 ← Lesson 3
├── 4-configure-human-validation.md      ← Lesson 4
├── 5-configure-api.md                   ← Lesson 5
├── you-did-it.md                        ← Summary/outro page (no numeric prefix)
├── documentation.txt                    ← Links to official docs (for metadata extraction)
├── documentation.cache.json             ← Embedded doc context cache (gitignored)
├── dependencies/                        ← Downloadable files referenced by lessons
│   └── 2-Way Matching Process.bpmn
├── 1-create-bpmn.images/                ← Images for lesson 1
│   ├── 1-bpmn-diagram.png
│   ├── 2-wise-robot.png
│   └── ...
├── 2-configure-robot.images/            ← Images for lesson 2
│   ├── 1-new-agentic-process.png
│   ├── 1-new-agentic-process.metadata.json
│   └── ...
├── 3-configure-agent.images/            ← Images for lesson 3
├── 4-configure-human-validation.images/ ← Images for lesson 4
├── 5-configure-api.images/              ← Images for lesson 5
└── you-did-it.images/                   ← Images for summary page
```

---

## Archive folder

Exercises and lessons removed with `/remove-exercise` or `/remove-lesson` are moved to `Archive/` rather than deleted. The `Archive/` folder mirrors the structure of `docs/`:

```
Archive/
└── invoice-matching-ixp/      ← Archived exercise folder (same structure as docs/)
    ├── 2-configure-robot.md
    └── 2-configure-robot.images/
```

The `Archive/` folder is **gitignored** — archived content is never pushed to the repository or deployed to the live site.

---

## Naming conventions

### Exercise folders

- Lowercase, hyphenated: `categorizing-incidents`, `invoice-matching-ixp`
- Descriptive of the business use case, not the technology

### Overview page

- **Always** `index.md` (never `0-index.md`)
- This ensures the folder URL `/exercise-slug/` serves the overview page by default

### Lesson files

- Pattern: **`N-verb-noun.md`** — numeric prefix + descriptive action
- The numeric prefix makes reading order obvious in file explorers and IDEs
- Examples: `1-create-bpmn.md`, `2-configure-robot.md`, `3-configure-agent.md`
- Numbers must be sequential with no gaps (1, 2, 3... not 1, 3, 5)

### Summary/outro page

- `you-did-it.md` (no numeric prefix)
- Alternatively: `next-steps.md` if the exercise doesn't have a celebratory ending

### Image folders (per-lesson)

Each lesson gets its own image folder named after the lesson file (without the `.md` extension):

| Lesson file | Image folder |
|------------|-------------|
| `1-create-bpmn.md` | `1-create-bpmn.images/` |
| `2-configure-robot.md` | `2-configure-robot.images/` |
| `you-did-it.md` | `you-did-it.images/` |

The folder name is derived from the lesson filename by:
1. Removing the `.md` extension (`1-create-bpmn.md` → `1-create-bpmn`)
2. Appending `.images/`

This pattern keeps images organized per-lesson and is required by the metadata extraction script.

### Image files

**Final naming convention:** Descriptive name based on image content, derived from metadata extraction.

- Lowercase, hyphenated: `create-agent.png`, `select-conversational-type.png`, `review-system-prompt.png`
- Names describe the action or UI state shown in the screenshot
- Named by the `/new-lesson` skill during metadata extraction — **do not rename manually after processing**
- Wide screenshots (full-screen, detailed layouts) append `-W`: `agent-system-prompt-W.png`
- The `-W` suffix signals that the image should render at full width (see [Formatting.md](Formatting.md))
- Formats: PNG for screenshots (preferred), JPG for photos, SVG for diagrams, GIF for animations

**Upload and processing workflow:**
1. Take screenshots and save them in the lesson's `.images/` folder. Names can be:
   - **Sequential numeric:** `1.png`, `2.png`, `3.png`, etc.
   - **Mac screenshot format:** `Screenshot 2026-04-07 at 3.38.16 PM.png` (automatically sorted by timestamp)
2. Run `/new-lesson` — the skill extracts metadata from each screenshot, preserving order
3. The skill renames each image based on its `step_instruction` and `ui_description` fields: `1-create-agent.png`, `2-select-conversational-type.png`, etc.
4. Claude references the renamed images in the lesson markdown

The numeric prefix in the final name is derived from the image order, and the descriptive slug comes from the image content — it ensures metadata extraction processes images in the correct order, then each image is renamed with a meaningful name once its content is understood.

### Metadata files

- Same name as the image with `.metadata.json` appended: `1-create-agent.metadata.json`
- Generated by `scripts/extract_metadata.py`, not created manually
- Contains: `filename`, `ocr_text`, `ui_description`, `step_instruction`

### Documentation references file

- **`documentation.txt`** — one per exercise, in the exercise root folder
- Contains links to official UiPath docs relevant to that exercise
- Read by the metadata extraction script for RAG context
- Format: one URL per line, optionally prefixed with `-`

### Dependencies folder

- `dependencies/` — downloadable files referenced by lessons (e.g., `.bpmn` files, sample data)
- Only create when the exercise has downloadable artifacts

---

## Nav registration (mkdocs.yml)

### Draft vs. published exercises

New exercises created with `/new-exercise` start as **drafts** — their files exist in `docs/` but they are not listed in `mkdocs.yml`. Drafts are accessible via direct URL but invisible in the navigation menu and on the home page.

Run `/publish-exercise <slug>` when the exercise is ready for learners. That skill adds the nav section and home page card.

### Published nav structure

Once published, every page in the exercise appears in the `nav:` section:

```yaml
nav:
  - Home: index.md
  - Exercise Display Name:
    - Overview: exercise-slug/index.md
    - 1. Lesson One Title: exercise-slug/1-verb-noun.md
    - 2. Lesson Two Title: exercise-slug/2-verb-noun.md
    - 3. Lesson Three Title: exercise-slug/3-verb-noun.md
    - You did it!: exercise-slug/you-did-it.md
  - Next Steps: next-steps.md
```

Rules:
- Exercise display name matches the `# Title` in `index.md`
- Overview page uses label: `Overview`
- Lesson labels have numeric prefixes: `1. Create BPMN Process`, `2. Configure a Robot`
- Summary page: `You did it!`
- New exercises go before `- Next Steps: next-steps.md`

---

## Config files — do not change without reason

| File | What it controls | Notes |
|------|-----------------|-------|
| `mkdocs.yml` | Theme, nav, plugins, extensions | Theme: Material, palette: deep orange/slate. See `site_url` matches GitHub Pages URL. |
| `docs/stylesheets/extra.css` | Image borders, two-column grids, admonition colours, typography | UiPath brand colours and layout classes |
| `docs/javascripts/extra.js` | External links open in new tab | Tiny script, rarely needs changes |
| `hooks/split_cols.py` | `[[[...|N|...]]]` shorthand → HTML grid | Processes markdown before MkDocs renders |

---

## Local commands

Preview the site locally:
```bash
/Users/sergey/Library/Python/3.9/bin/mkdocs serve
```

Preview locally with draft exercises visible in the navigation:
```bash
/Users/sergey/Library/Python/3.9/bin/mkdocs serve -f mkdocs.local.yml
```

Build check before committing:
```bash
/Users/sergey/Library/Python/3.9/bin/mkdocs build
```

Run metadata extraction for an exercise:
```bash
python -m scripts.extract_metadata --folder docs/<exercise-slug>/
```
