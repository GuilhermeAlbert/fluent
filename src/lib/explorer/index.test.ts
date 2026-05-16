import { describe, expect, it } from "vitest";
import { createHomeSessionSnapshot } from "../session";
import { filterExplorerWords, getExplorerTags, selectExplorerWordForStudy } from "./index";
import type { VocabularyWord, WordDifficulty } from "../../types/word";

function createWord(
  id: string,
  word: string,
  difficulty: WordDifficulty,
  meaning: string,
  tags: string[] = [],
): VocabularyWord {
  return {
    id,
    word,
    partOfSpeech: "Word",
    pronunciation: "",
    meaning,
    examples: [{ id: `${id}-example-1`, text: `${word} improves pronunciation.` }],
    note: { summary: "", avoid: "", use: "" },
    difficulty,
    frequencyLabel: "Top 1000",
    tags,
    status: "new",
  };
}

const explorerWords: VocabularyWord[] = [
  createWord("advice", "Advice", "easy", "A suggestion or recommendation.", ["daily-life"]),
  createWord("affair", "Affair", "easy", "An event or situation."),
  createWord("again", "Again", "easy", "One more time."),
  createWord("context", "Context", "medium", "The situation around something."),
  createWord("improve", "Improve", "medium", "To become better.", ["learning"]),
];

describe("explorer", () => {
  it("filters words by query across word, meaning, examples, and tags", () => {
    expect(
      filterExplorerWords(explorerWords, {
        difficulty: "all",
        letter: "all",
        query: "pronunciation",
      }).map((word) => word.word),
    ).toContain("Improve");
  });

  it("filters by difficulty and alphabet letter", () => {
    const results = filterExplorerWords(explorerWords, {
      difficulty: "easy",
      letter: "a",
      query: "",
    });

    expect(results.map((word) => word.word)).toEqual(["Advice", "Affair", "Again"]);
  });

  it("returns sorted unique tags", () => {
    expect(getExplorerTags(explorerWords)).toEqual(["daily-life", "learning"]);
  });

  it("selects an explorer word for the study screen", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });

    const result = selectExplorerWordForStudy(session, "context", explorerWords);

    expect(result.route).toBe("/");
    expect(result.session.currentWordIndex).toBe(3);
  });
});
