import { describe, expect, it } from "vitest";
import {
  completeCurrentWord,
  createHomeSessionSnapshot,
  markCurrentWordDifficult,
  resetHomeSession,
  skipCurrentWord,
} from "./index";

const baseStoredAt = "2026-05-16T12:00:00.000Z";

describe("home session interactions", () => {
  it("completes the current word once and advances to the next word", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 3,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 12,
      wordProgress: {},
    });

    const nextState = completeCurrentWord(state, "advice", baseStoredAt);

    expect(nextState.currentWordIndex).toBe(1);
    expect(nextState.completedToday).toBe(4);
    expect(nextState.wordProgress.advice).toEqual({
      wordId: "advice",
      status: "completed",
      lastStudiedAt: baseStoredAt,
      completedToday: true,
    });
  });

  it("does not double count a word that was already completed today", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 4,
      currentWordIndex: 1,
      dailyGoal: 10,
      streak: 12,
      wordProgress: {
        by: {
          wordId: "by",
          status: "completed",
          lastStudiedAt: baseStoredAt,
          completedToday: true,
        },
      },
    });

    const nextState = completeCurrentWord(state, "by", "2026-05-16T12:05:00.000Z");

    expect(nextState.currentWordIndex).toBe(2);
    expect(nextState.completedToday).toBe(4);
  });

  it("starts the daily streak when the first word is completed", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });

    const nextState = completeCurrentWord(state, "advice", baseStoredAt);

    expect(nextState.completedToday).toBe(1);
    expect(nextState.streak).toBe(1);
  });

  it("skips the current word without increasing completed progress", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 3,
      currentWordIndex: 2,
      dailyGoal: 10,
      streak: 12,
      wordProgress: {},
    });

    const nextState = skipCurrentWord(state, "again", baseStoredAt);

    expect(nextState.currentWordIndex).toBe(3);
    expect(nextState.completedToday).toBe(3);
    expect(nextState.wordProgress.again).toEqual({
      wordId: "again",
      status: "learning",
      lastStudiedAt: baseStoredAt,
      completedToday: false,
    });
  });

  it("marks the current word as difficult and advances without completing it", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 0,
      currentWordIndex: 2,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });

    const nextState = markCurrentWordDifficult(state, "again", baseStoredAt);

    expect(nextState.currentWordIndex).toBe(3);
    expect(nextState.completedToday).toBe(0);
    expect(nextState.wordProgress.again).toEqual({
      wordId: "again",
      status: "difficult",
      lastStudiedAt: baseStoredAt,
      completedToday: false,
    });
  });

  it("wraps around when advancing past the final planned word", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 9,
      currentWordIndex: 9,
      dailyGoal: 10,
      streak: 12,
      wordProgress: {},
    });

    expect(skipCurrentWord(state, "focus", baseStoredAt).currentWordIndex).toBe(0);
  });

  it("resets today's session and clears the current day streak", () => {
    const state = createHomeSessionSnapshot({
      completedToday: 6,
      currentWordIndex: 4,
      dailyGoal: 10,
      streak: 12,
      wordProgress: {
        clear: {
          wordId: "clear",
          status: "completed",
          lastStudiedAt: baseStoredAt,
          completedToday: true,
        },
      },
    });

    expect(resetHomeSession(state)).toEqual({
      completedToday: 0,
      currentWordIndex: 0,
      dailyGoal: 10,
      streak: 0,
      wordProgress: {},
    });
  });
});
