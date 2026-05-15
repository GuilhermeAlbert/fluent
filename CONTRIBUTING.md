# Contributing

Thank you for contributing to Fluent.

Fluent is a local-first vocabulary learning app built around Markdown word files, calm interface design, and focused daily study. Contributions should keep the project minimal, readable, and easy to run locally.

## Contribution Workflow

1. Fork the repository.
2. Create a focused branch.
3. Make the smallest useful change.
4. Run the relevant checks.
5. Open a pull request with a clear summary.

Before starting larger changes, open an issue to discuss the scope.

## Branch Naming

Use short, descriptive branch names:

- `feat/daily-practice`
- `fix/word-progress`
- `docs/word-format`
- `chore/update-tooling`
- `content/add-english-words`

## Commit Conventions

Use Conventional Commits:

- `feat: add daily word review`
- `fix: preserve local progress state`
- `docs: document word file structure`
- `style: refine settings layout`
- `chore: update project metadata`
- `content: add English word entries`

Keep commits focused. Avoid mixing content, UI, and tooling changes in the same commit unless they are tightly related.

## Pull Request Checklist

Before opening a pull request, confirm:

- [ ] The change has a clear purpose.
- [ ] The interface remains minimal and readable.
- [ ] Markdown word files follow the documented structure.
- [ ] LocalStorage behavior is preserved when relevant.
- [ ] Documentation is updated when behavior or structure changes.
- [ ] Screenshots are included for visual changes.
- [ ] The app builds successfully.

## How to Add Words

Word files live in:

```text
words/<language>/<letter>/<word>.md
```

Example:

```text
words/english/a/advice.md
```

When adding a word:

1. Use lowercase file names.
2. Place the file under the first letter of the word.
3. Keep examples natural and short.
4. Prefer common everyday usage.
5. Add notes only when they help learners avoid real mistakes.
6. Use consistent front matter.

## Markdown Structure Rules

Each word file should start with front matter:

```markdown
---
word: advice
language: english
pronunciation: /ədˈvaɪs/
difficulty: easy
frequency_rank: 320
tags:
  - communication
  - daily-life
---
```

Use clear Markdown sections:

```markdown
# Advice

## Meaning

A suggestion or recommendation about what someone should do.

## Examples

- She gave me good advice.
- I need your advice.

## Notes

"Advice" is uncountable in English.
```

Rules:

- Use one `#` heading with the word as the title.
- Use sentence case for section headings.
- Keep definitions direct.
- Keep examples realistic.
- Avoid long grammar explanations.
- Use tags that help search and study.
- Do not include sensitive personal information in examples or notes.

## Code Style Guidelines

- Use TypeScript for application code.
- Prefer small React components with clear names.
- Keep state close to the feature that owns it.
- Use LocalStorage intentionally and document stored keys.
- Keep Tailwind classes readable and consistent.
- Favor semantic HTML and accessible controls.
- Keep visual design quiet, spacious, and typography-led.
- Avoid unnecessary dependencies.

## Design Principles

Fluent should feel:

- calm
- precise
- minimal
- modern
- fast
- focused

Avoid clutter, heavy decoration, gamified patterns, and loud interface states.
