# Security

## Supported Versions

| Version | Supported |
| --- | --- |
| `0.1.x` | Yes |
| `< 0.1.0` | No |

## Reporting a Vulnerability

Please report security issues privately.

Use GitHub private vulnerability reporting when available. If it is not available, contact the maintainer privately before sharing technical details in a public issue.

Include:

- A concise description of the issue
- Steps to reproduce
- Affected browser or environment
- Potential impact
- Any suggested fix, if known

Please do not disclose vulnerabilities publicly until they have been reviewed.

## Privacy Note

Fluent stores learning progress in the browser with LocalStorage. Word files, notes, and study progress should be treated as local browser data.

Do not add sensitive personal information to word examples, notes, screenshots, or fixtures.

## Local-First Security Considerations

- LocalStorage can be read by scripts running on the same origin.
- Clearing browser data may remove learning progress.
- Shared devices can expose local study data to other people using the same browser profile.
- Browser extensions may be able to inspect page content.
- Imported Markdown should be handled carefully before rendering.

Keep Markdown rendering, local storage keys, and browser permissions as narrow as possible.
