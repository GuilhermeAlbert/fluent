import { describe, expect, it } from "vitest";
import type { HomeSessionSnapshot } from "../session";
import {
  countCompletedDailyWords,
  createDailyWordItems,
  selectDailyWordForStudy,
  setDailyWordCompleted,
} from "./index";
import type { VocabularyWord } from "../../types/word";

const storedAt = "2026-05-16T12:00:00.000Z";

const dailyWords: VocabularyWord[] = [
  {
    id: "advice",
    word: "Advice",
    partOfSpeech: "Word",
    pronunciation: "",
    meaning: "A suggestion.",
    examples: [],
    note: { summary: "", avoid: "", use: "" },
    difficulty: "easy",
    frequencyLabel: "Top 500",
    tags: [],
    status: "new",
  },
  {
    id: "by",
    word: "By",
    partOfSpeech: "Word",
    pronunciation: "",
    meaning: "A preposition.",
    examples: [],
    note: { summary: "", avoid: "", use: "" },
    difficulty: "easy",
    frequencyLabel: "Top 100",
    tags: [],
    status: "new",
  },
  {
    id: "context",
    word: "Context",
    partOfSpeech: "Word",
    pronunciation: "",
    meaning: "Surrounding information.",
    examples: [],
    note: { summary: "", avoid: "", use: "" },
    difficulty: "medium",
    frequencyLabel: "Top 1000",
    tags: [],
    status: "new",
  },
];

function createSession(overrides: Partial<HomeSessionSnapshot> = {}): HomeSessionSnapshot {
  return {
    completedToday: 0,
    currentWordIndex: 0,
    dailyGoal: 5,
    streak: 0,
    wordProgress: {},
    ...overrides,
  };
}

describe("daily words", () => {
  it("creates the planned words for the selected learning language", () => {
    const items = createDailyWordItems({
      filter: "all",
      session: createSession({ dailyGoal: 3 }),
      words: dailyWords,
    });

    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({
      position: 1,
      word: "Advice",
      isCompleted: false,
      isCurrent: true,
    });
  });

  it("marks a daily word as completed and recomputes today's progress", () => {
    const state = createSession();
    const nextState = setDailyWordCompleted(state, "advice", true, storedAt);

    expect(nextState.completedToday).toBe(1);
    expect(nextState.streak).toBe(1);
    expect(nextState.wordProgress.advice).toEqual({
      wordId: "advice",
      status: "completed",
      lastStudiedAt: storedAt,
      completedToday: true,
    });
  });

  it("clears today's streak when the last completed daily word is unchecked", () => {
    const state = createSession({
      completedToday: 1,
      streak: 1,
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "completed",
          lastStudiedAt: storedAt,
          completedToday: true,
        },
      },
    });

    const nextState = setDailyWordCompleted(state, "advice", false, storedAt);

    expect(nextState.completedToday).toBe(0);
    expect(nextState.streak).toBe(0);
  });

  it("filters completed and remaining daily words", () => {
    const session = setDailyWordCompleted(createSession({ dailyGoal: 2 }), "advice", true, storedAt);

    expect(
      createDailyWordItems({ filter: "completed", session, words: dailyWords }).map((item) => item.word),
    ).toEqual(["Advice"]);
    expect(
      createDailyWordItems({ filter: "remaining", session, words: dailyWords }).map((item) => item.word),
    ).toEqual(["By"]);
  });

  it("counts completed progress only for the current daily plan", () => {
    const session = createSession({
      completedToday: 1,
      wordProgress: {
        outside: {
          wordId: "outside",
          status: "completed",
          lastStudiedAt: storedAt,
          completedToday: true,
        },
      },
    });

    expect(countCompletedDailyWords(session, dailyWords)).toBe(0);
  });

  it("selects a daily word for the study screen", () => {
    const result = selectDailyWordForStudy(createSession({ currentWordIndex: 0 }), 4);

    expect(result.route).toBe("/");
    expect(result.session.currentWordIndex).toBe(3);
  });
});
