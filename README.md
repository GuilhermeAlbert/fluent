<p align="center">
    <img src="public/favicon.png" alt="Fluent favicon" width="120" />
</p>

<h1 align="center">
  Fluent
</h1>

<p align="center">
  Learn languages through real words, real context, and daily repetition.
</p>

## The project

Fluent is a local-first vocabulary learning app built with React. It helps users study frequent words in English and other languages through Markdown-based word pages, daily practice, examples, pronunciation, notes, and progress saved in the browser.

The project is designed to feel calm, fast, and typography-focused, with references from Notion, Linear, Buffer, Granola, and Raycast.

Read the project manifesto in [`content/manifesto.md`](content/manifesto.md).

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

## Markdown Word Structure

Word files live in `languages/<language>/words/<letter>/<word>.md`.

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

## Deployment

Fluent is deployed with GitHub Pages. The workflow in `.github/workflows/deploy.yml`
runs on every push to `main`, installs dependencies with `npm ci`, builds the Vite app,
uploads the `dist` folder, and deploys it with the official GitHub Pages actions.

GitHub Pages must be configured in the repository settings to use **GitHub Actions** as
the source. The Vite `base` value in `vite.config.ts` is set to `/fluent/` and must match
the GitHub repository name.

The app uses `HashRouter` for SPA-friendly GitHub Pages routes such as `#/`,
`#/daily-words`, `#/explorer`, `#/difficult-words`, `#/progress`, and `#/settings`.

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
