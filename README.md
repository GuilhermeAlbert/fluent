# Fluent

Learn words in context.

Fluent is a local-first vocabulary learning app built with React. It helps users study frequent words in English and other languages through Markdown-based word pages, daily practice, examples, pronunciation, notes, and progress saved in the browser.

The project is designed to feel calm, fast, and typography-focused, with references from Notion, Linear, Buffer, Granola, and Raycast.

## Features

- Markdown-based word files
- Daily vocabulary practice
- Contextual examples and usage notes
- Pronunciation fields for each word
- Difficulty, frequency, and tag metadata
- Local progress saved with browser LocalStorage
- Offline-friendly learning flow
- Minimal interface for focused study
- Extensible folder structure for multiple languages

## Screenshots

Prototype images are stored in `images/prototypes`.

| Home | Daily words |
| --- | --- |
| ![Fluent home prototype](../images/prototypes/home.png) | ![Fluent daily words prototype](../images/prototypes/daily-words.png) |

| Explorer | Progress |
| --- | --- |
| ![Fluent explorer prototype](../images/prototypes/explorer.png) | ![Fluent progress prototype](../images/prototypes/progress.png) |

| Difficult words | Settings |
| --- | --- |
| ![Fluent difficult words prototype](../images/prototypes/difficult-words.png) | ![Fluent settings prototype](../images/prototypes/settings.png) |

## Getting Started

### Requirements

- Node.js 18 or newer
- npm, pnpm, or yarn

### Installation

```bash
git clone <repository-url>
cd fluent
npm install
```

### Development

```bash
npm run dev
```

Open the local Vite URL shown in your terminal.

## Scripts

Common project scripts:

| Script | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run code quality checks. |

## Folder Structure

```text
.
├── app/
├── words/
│   └── english/
│       ├── a/
│       │   └── advice.md
│       └── b/
│           └── by.md
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── LICENSE
├── .env.example
└── .gitignore
```

Prototype assets are kept in `images/prototypes`. Logo and favicon assets are kept in `images/logo` and `images/favicon`.

## Markdown Word Structure

Word files live in `words/<language>/<letter>/<word>.md`.

Each file starts with front matter, followed by readable Markdown content:

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

# Advice

Advice means a suggestion or recommendation about what someone should do.

## Examples

- She gave me good advice.
- I need your advice.
- Let me give you some advice.

## Notes

"Advice" is uncountable in English.

- Use: some advice
- Avoid: an advice
```

Recommended front matter fields:

- `word`
- `language`
- `pronunciation`
- `difficulty`
- `frequency_rank`
- `tags`

Recommended content sections:

- `# Word`
- `## Meaning`
- `## Examples`
- `## Notes`
- `## Related`

## Roadmap

- Expand the English word library
- Add more language folders
- Improve daily practice selection
- Add stronger progress views
- Add audio pronunciation support
- Add import and export tools for local study data
- Improve offline behavior
- Refine typography and reading experience

## Contributing

Contributions are welcome. Fluent is especially suited for small, focused improvements:

- Add or improve word files
- Polish Markdown content
- Refine the interface
- Improve accessibility
- Improve documentation

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Fluent is open source under the [MIT License](LICENSE).
