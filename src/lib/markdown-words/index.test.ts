import { describe, expect, it } from "vitest";
import {
  createVocabularyWordsFromMarkdownModules,
  parseMarkdownVocabularyWord,
} from "./index";

const reasonMarkdown = `---
word: reason
language: english
pronunciation:
difficulty:
frequency_rank:
tags: []
studied: false
favorite: false
---

# Reason

## Meaning

Reason is a rational motive for a belief or action.

## Examples

- The reason that war was declared.
- We talked about the reason.

## Notes

Commonly used as a noun.
`;

describe("markdown words", () => {
  it("parses a vocabulary word from markdown frontmatter and sections", () => {
    expect(
      parseMarkdownVocabularyWord({
        content: reasonMarkdown,
        path: "../languages/english/words/r/reason.md",
      }),
    ).toMatchObject({
      id: "english-reason",
      word: "Reason",
      language: "english",
      meaning: "Reason is a rational motive for a belief or action.",
      examples: [
        { id: "english-reason-example-1", text: "The reason that war was declared." },
        { id: "english-reason-example-2", text: "We talked about the reason." },
      ],
      tags: ["english", "r"],
    });
  });

  it("builds words for the selected language from imported markdown modules", () => {
    const words = createVocabularyWordsFromMarkdownModules(
      {
        "../languages/english/words/r/reason.md": reasonMarkdown,
        "../languages/spanish/words/r/razon.md": reasonMarkdown.split("english").join("spanish"),
      },
      "english",
    );

    expect(words.map((word) => word.id)).toEqual(["english-reason"]);
  });
});
