import { describe, expect, it } from "vitest";
import type { HomeSessionSnapshot } from "../session";
import {
  countCompletedDailyWords,
  createDailyWordItems,
  selectDailyWordForStudy,
  setDailyWordCompleted,
} from "./index";
import { getHomeWords } from "../words";

const storedAt = "2026-05-16T12:00:00.000Z";

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
    const words = getHomeWords("spanish", true);
    const items = createDailyWordItems({
      filter: "all",
      session: createSession({ dailyGoal: 3 }),
      words,
    });

    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({
      position: 1,
      word: "Consejo",
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

  it("filters completed and remaining daily words", () => {
    const words = getHomeWords("english", true);
    const session = setDailyWordCompleted(createSession({ dailyGoal: 2 }), "advice", true, storedAt);

    expect(
      createDailyWordItems({ filter: "completed", session, words }).map((item) => item.word),
    ).toEqual(["Advice"]);
    expect(
      createDailyWordItems({ filter: "remaining", session, words }).map((item) => item.word),
    ).toEqual(["By"]);
  });

  it("counts completed progress only for the current daily plan", () => {
    const spanishWords = getHomeWords("spanish", true);
    const session = createSession({
      completedToday: 1,
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "completed",
          lastStudiedAt: storedAt,
          completedToday: true,
        },
      },
    });

    expect(countCompletedDailyWords(session, spanishWords)).toBe(0);
  });

  it("selects a daily word for the study screen", () => {
    const result = selectDailyWordForStudy(createSession({ currentWordIndex: 0 }), 4);

    expect(result.route).toBe("/");
    expect(result.session.currentWordIndex).toBe(3);
  });
});
