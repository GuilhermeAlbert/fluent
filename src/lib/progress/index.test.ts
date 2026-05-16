import { describe, expect, it } from "vitest";
import { createProgressDashboard } from "./index";
import { createHomeSessionSnapshot } from "../session";
import type { VocabularyWord, WordDifficulty } from "../../types/word";

function createWord(id: string, word: string, difficulty: WordDifficulty = "easy"): VocabularyWord {
  return {
    id,
    word,
    partOfSpeech: "Word",
    pronunciation: "",
    meaning: `${word} meaning.`,
    examples: [{ id: `${id}-example-1`, text: `${word} example.` }],
    note: { summary: "", avoid: "", use: "" },
    difficulty,
    frequencyLabel: "Top 1000",
    tags: [difficulty],
    status: "new",
  };
}

const progressWords = [
  createWord("advice", "Advice"),
  createWord("reason", "Reason"),
  createWord("subtle", "Subtle", "hard"),
  createWord("clear", "Clear"),
  createWord("focus", "Focus"),
];

describe("progress dashboard", () => {
  it("summarizes daily progress and library status counts", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 2,
      currentWordIndex: 0,
      dailyGoal: 5,
      streak: 1,
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "completed",
          lastStudiedAt: "2026-05-16T10:00:00.000Z",
          completedToday: true,
        },
        reason: {
          wordId: "reason",
          status: "learning",
          lastStudiedAt: "2026-05-15T10:00:00.000Z",
          completedToday: false,
        },
        subtle: {
          wordId: "subtle",
          status: "difficult",
          lastStudiedAt: "2026-05-14T10:00:00.000Z",
          completedToday: false,
        },
        outside: {
          wordId: "outside",
          status: "completed",
          lastStudiedAt: "2026-05-16T11:00:00.000Z",
          completedToday: true,
        },
      },
    });

    const dashboard = createProgressDashboard({
      referenceDate: new Date("2026-05-16T12:00:00.000Z"),
      session,
      words: progressWords,
    });

    expect(dashboard.overview).toMatchObject({
      completedToday: 2,
      dailyCompletionPercent: 40,
      dailyGoal: 5,
      difficultWords: 1,
      libraryCompletionPercent: 20,
      remainingToday: 3,
      streak: 1,
      studiedWords: 3,
      totalWords: 5,
    });
    expect(dashboard.statusItems.map((item) => [item.status, item.count])).toEqual([
      ["completed", 1],
      ["learning", 1],
      ["difficult", 1],
      ["new", 2],
    ]);
  });

  it("returns recent activity sorted by last studied date", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 1,
      currentWordIndex: 0,
      dailyGoal: 5,
      streak: 1,
      wordProgress: {
        reason: {
          wordId: "reason",
          status: "learning",
          lastStudiedAt: "2026-05-15T10:00:00.000Z",
          completedToday: false,
        },
        advice: {
          wordId: "advice",
          status: "completed",
          lastStudiedAt: "2026-05-16T10:00:00.000Z",
          completedToday: true,
        },
      },
    });

    const dashboard = createProgressDashboard({
      referenceDate: new Date("2026-05-16T12:00:00.000Z"),
      session,
      words: progressWords,
    });

    expect(dashboard.recentActivity.map((activity) => activity.word)).toEqual([
      "Advice",
      "Reason",
    ]);
  });

  it("builds a seven day activity series from stored study dates", () => {
    const session = createHomeSessionSnapshot({
      completedToday: 1,
      currentWordIndex: 0,
      dailyGoal: 5,
      streak: 1,
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "completed",
          lastStudiedAt: "2026-05-16T10:00:00.000Z",
          completedToday: true,
        },
        reason: {
          wordId: "reason",
          status: "learning",
          lastStudiedAt: "2026-05-15T10:00:00.000Z",
          completedToday: false,
        },
        subtle: {
          wordId: "subtle",
          status: "difficult",
          lastStudiedAt: "2026-05-10T10:00:00.000Z",
          completedToday: false,
        },
        clear: {
          wordId: "clear",
          status: "completed",
          lastStudiedAt: "2026-05-08T10:00:00.000Z",
          completedToday: false,
        },
      },
    });

    const dashboard = createProgressDashboard({
      referenceDate: new Date("2026-05-16T12:00:00.000Z"),
      session,
      words: progressWords,
    });

    expect(dashboard.weeklyActivity).toHaveLength(7);
    expect(dashboard.weeklyActivity.map((item) => [item.date, item.count])).toEqual([
      ["2026-05-10", 1],
      ["2026-05-11", 0],
      ["2026-05-12", 0],
      ["2026-05-13", 0],
      ["2026-05-14", 0],
      ["2026-05-15", 1],
      ["2026-05-16", 1],
    ]);
  });
});
