# Master — Course Authoring Reference

This directory is the **single source of truth** for all rules, templates, and conventions used to create, review, and maintain courses on the Agentic Automation Workshop site.

---

## Who is this for?

- **Humans** — course authors, reviewers, and trainers who create or edit exercise content
- **AI agents** — Claude Code skills read these files to produce consistent output

---

## Files

| File | What it covers | When to read |
|------|---------------|--------------|
| [Filesystem.md](Filesystem.md) | Project directory structure, folder naming, file naming, image folders, config files, Archive folder | Setting up a new exercise or repository |
| [CourseStructure.md](CourseStructure.md) | Page types (Overview, Lesson, Summary), their structure, and full templates | Writing or reviewing any page |
| [Formatting.md](Formatting.md) | Images, two-column layouts, code blocks, admonitions, tables, prompt diffs, argument docs | Formatting any element on a page |
| [Language.md](Language.md) | Voice, tone, humour, word choices, platform names, capitalisation rules | Writing or reviewing any text |
| [HOWTO.md](HOWTO.md) | End-to-end workflows: create exercise, generate lesson, publish, remove, review, validate | First time doing any of these tasks |

## Templates

The `Templates/` folder contains a complete sample exercise that demonstrates every building block:

| File | Page type | What it demonstrates |
|------|-----------|---------------------|
| [Templates/index.md](Templates/index.md) | Overview | Title, headline, overview, step table, training callout |
| [Templates/1-sample-lesson.md](Templates/1-sample-lesson.md) | Lesson | Plan tip, goal, concept sections, two-column layouts, code blocks, arguments pattern, prompt diff, gateway expressions, admonitions, wide images |
| [Templates/you-did-it.md](Templates/you-did-it.md) | Summary | Congratulations, component table, next steps, keep iterating, learn more |

These are realistic, copy-and-adapt examples — not abstract skeletons. Skills (`/new-exercise`, `/new-lesson`) use them as the reference for generated content.

---

## How these files relate to everything else

```
Master/                    ← Authoritative rules (you are here)
  ├── README.md            ← This file — entry point
  ├── Filesystem.md
  ├── CourseStructure.md
  ├── Formatting.md
  ├── Language.md
  ├── HOWTO.md
  └── Templates/           ← Complete sample exercise with all building blocks
      ├── index.md
      ├── 1-sample-lesson.md
      └── you-did-it.md

CLAUDE.md                  ← Auto-loaded every Claude Code session; points here for details
.claude/commands/          ← Skills that reference Master/ files
  ├── new-exercise.md      ← Scaffold a new exercise (draft — not published to nav)
  ├── new-lesson.md        ← Build a lesson from screenshots
  ├── publish-exercise.md  ← Add a draft exercise to the navigation
  ├── remove-lesson.md     ← Archive a lesson and remove it from navigation
  ├── remove-exercise.md   ← Archive an entire exercise and remove it from navigation
  ├── review-lesson.md     ← Check a single lesson against standards
  └── review-exercise.md   ← Check an entire exercise for coherence
```

- **CLAUDE.md** contains a compact summary of critical rules and points to `Master/` for full details. It is loaded automatically into every Claude Code session.
- **Skills** (`.claude/commands/`) reference specific Master files instead of duplicating rules.
- **Memory** (`.claude/projects/.../memory/`) stores user preferences and project context that can't be derived from these files.

---

## Exercise lifecycle

Exercises go through three states:

1. **Draft** — created with `/new-exercise`. Files exist in `docs/` but the exercise is not in the nav. Accessible via direct URL for testing. Add to `mkdocs.local.yml` with `[Unpublished]` in the title for full local nav preview.
2. **Published** — promoted with `/publish-exercise`. Nav section and home page card added. Visible to learners.
3. **Archived** — removed with `/remove-exercise` or `/remove-lesson`. Files moved to `Archive/` (gitignored). Removed from nav and home page.

---

## Sanity rules

1. **One source of truth.** If a rule is in a Master file, it should not be duplicated in CLAUDE.md, skills, or memory. Other files should reference Master/ instead.
2. **Master files describe the standard.** Existing courses may deviate — that's OK. When *creating* new content, follow the standard. When *reviewing*, flag deviations but don't rewrite without confirmation.
3. **Templates are starting points.** The structure templates in CourseStructure.md define what a page *should* contain. Human authors can adjust structure after generation — the review process checks alignment, not exact match.
4. **Prefer examples from real courses.** When a rule has a corresponding example in the Invoice Matching with IXP exercise, that exercise is the reference implementation.
