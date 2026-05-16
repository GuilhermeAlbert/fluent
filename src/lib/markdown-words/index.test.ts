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
      pronunciation: "ˈrēzən",
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

  it("keeps an explicit pronunciation from markdown frontmatter", () => {
    const word = parseMarkdownVocabularyWord({
      content: reasonMarkdown.replace("pronunciation:", "pronunciation: /raˈθon/"),
      path: "../languages/spanish/words/r/razon.md",
    });

    expect(word.pronunciation).toBe("/raˈθon/");
  });

  it("creates a dictionary-style English pronunciation fallback instead of wrapping the raw word", () => {
    const word = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("affect")
        .split("Reason")
        .join("Affect"),
      path: "../languages/english/words/a/affect.md",
    });

    expect(word.pronunciation).toBe("əˈfekt");
    expect(word.pronunciation).not.toBe("/affect/");
  });

  it("uses dictionary-style pronunciation marks for junior", () => {
    const word = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("junior")
        .split("Reason")
        .join("Junior"),
      path: "../languages/english/words/j/junior.md",
    });

    expect(word.pronunciation).toBe("ˈjo͞onyər");
  });

  it("uses dictionary-style pronunciation marks for freedom", () => {
    const word = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("freedom")
        .split("Reason")
        .join("Freedom"),
      path: "../languages/english/words/f/freedom.md",
    });

    expect(word.pronunciation).toBe("ˈfrēdəm");
  });

  it("uses dictionary-style pronunciation marks for mary-style words", () => {
    const mary = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("mary")
        .split("Reason")
        .join("Mary"),
      path: "../languages/english/words/m/mary.md",
    });
    const primary = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("primary")
        .split("Reason")
        .join("Primary"),
      path: "../languages/english/words/p/primary.md",
    });

    expect(mary.pronunciation).toBe("ˈmerē");
    expect(primary.pronunciation).toBe("ˈprīˌmerē");
  });

  it("generates dictionary-style fallbacks for English words without a dedicated entry", () => {
    const word = parseMarkdownVocabularyWord({
      content: reasonMarkdown
        .split("reason")
        .join("library")
        .split("Reason")
        .join("Library"),
      path: "../languages/english/words/l/library.md",
    });

    expect(word.pronunciation).toMatch(/^ˈ/);
    expect(word.pronunciation).not.toContain("·");
    expect(word.pronunciation).not.toBe("/library/");
  });
});
