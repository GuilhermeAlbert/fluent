import { describe, expect, it } from "vitest";
import {
  createDifficultWordItems,
  selectDifficultWordForStudy,
  setDifficultWordStatus,
} from "./index";
import { createHomeSessionSnapshot } from "../session";
import type { VocabularyWord, WordDifficulty } from "../../types/word";

function createWord(
  id: string,
  word: string,
  difficulty: WordDifficulty,
  meaning = `${word} meaning.`,
): VocabularyWord {
  return {
    id,
    word,
    partOfSpeech: "Word",
    pronunciation: "",
    meaning,
    examples: [{ id: `${id}-example-1`, text: `${word} example.` }],
    note: { summary: "", avoid: "", use: "" },
    difficulty,
    frequencyLabel: "Top 1000",
    tags: [difficulty],
    status: "new",
  };
}

const difficultWords = [
  createWord("advice", "Advice", "easy"),
  createWord("reason", "Reason", "easy"),
  createWord("subtle", "Subtle", "hard", "Difficult to notice or describe."),
  createWord("throughout", "Throughout", "hard"),
];

describe("difficult words", () => {
  it("shows marked difficult words and hard vocabulary without duplicates", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {
        reason: {
          wordId: "reason",
          status: "difficult",
          lastStudiedAt: "2026-05-16T11:00:00.000Z",
          completedToday: false,
        },
        subtle: {
          wordId: "subtle",
          status: "difficult",
          lastStudiedAt: "2026-05-16T12:00:00.000Z",
          completedToday: false,
        },
      },
    });

    const items = createDifficultWordItems({
      filter: "all",
      query: "",
      session,
      words: difficultWords,
    });

    expect(items.map((item) => item.id)).toEqual(["subtle", "reason", "throughout"]);
    expect(items[0]).toMatchObject({
      id: "subtle",
      isMarkedDifficult: true,
      reason: "marked",
    });
    expect(items[2]).toMatchObject({
      id: "throughout",
      isMarkedDifficult: false,
      reason: "hard",
    });
  });

  it("filters difficult words by query and status group", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {
        reason: {
          wordId: "reason",
          status: "difficult",
          lastStudiedAt: "2026-05-16T11:00:00.000Z",
          completedToday: false,
        },
      },
    });

    expect(
      createDifficultWordItems({
        filter: "marked",
        query: "reason",
        session,
        words: difficultWords,
      }).map((item) => item.word),
    ).toEqual(["Reason"]);

    expect(
      createDifficultWordItems({
        filter: "hard",
        query: "notice",
        session,
        words: difficultWords,
      }).map((item) => item.word),
    ).toEqual(["Subtle"]);
  });

  it("can mark and remove a difficult word without increasing daily progress", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });

    const marked = setDifficultWordStatus(
      session,
      "advice",
      true,
      "2026-05-16T12:00:00.000Z",
    );

    expect(marked.completedToday).toBe(0);
    expect(marked.wordProgress.advice).toEqual({
      wordId: "advice",
      status: "difficult",
      lastStudiedAt: "2026-05-16T12:00:00.000Z",
      completedToday: false,
    });

    const removed = setDifficultWordStatus(
      marked,
      "advice",
      false,
      "2026-05-16T12:05:00.000Z",
    );

    expect(removed.wordProgress.advice).toEqual({
      wordId: "advice",
      status: "learning",
      lastStudiedAt: "2026-05-16T12:05:00.000Z",
      completedToday: false,
    });
  });

  it("selects a difficult word for the study screen", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });

    const result = selectDifficultWordForStudy(session, "subtle", difficultWords);

    expect(result.route).toBe("/");
    expect(result.session.currentWordIndex).toBe(2);
  });
});
