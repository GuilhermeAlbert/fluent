import { describe, expect, it } from "vitest";
import { defaultFluentStorageData, parseStorageData } from "./index";

describe("parseStorageData", () => {
  it("starts a fresh install without completed words or a streak", () => {
    expect(defaultFluentStorageData.completedToday).toBe(0);
    expect(defaultFluentStorageData.streak).toBe(0);
    expect(defaultFluentStorageData.wordProgress).toEqual({});
  });

  it("returns stored progress when the payload is valid", () => {
    const payload = JSON.stringify({
      version: 1,
      dailyGoal: 10,
      completedToday: 3,
      currentWordIndex: 2,
      streak: 5,
      settings: {
        dailyGoal: 10,
        includeDifficultWords: true,
        learningLanguage: "english",
        interfaceLanguage: "english",
      },
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "learning",
          lastStudiedAt: "2026-05-15T12:00:00.000Z",
          completedToday: true,
        },
      },
    });

    expect(parseStorageData(payload)).toEqual({
      version: 1,
      dailyGoal: 10,
      completedToday: 3,
      currentWordIndex: 2,
      streak: 5,
      settings: {
        dailyGoal: 10,
        includeDifficultWords: true,
        learningLanguage: "english",
        interfaceLanguage: "english",
      },
      wordProgress: {
        advice: {
          wordId: "advice",
          status: "learning",
          lastStudiedAt: "2026-05-15T12:00:00.000Z",
          completedToday: true,
        },
      },
    });
  });

  it("returns null when the payload is missing or invalid", () => {
    expect(parseStorageData(null)).toBeNull();
    expect(parseStorageData("not-json")).toBeNull();
    expect(parseStorageData(JSON.stringify({ version: 2 }))).toBeNull();
  });

  it("normalizes legacy demo progress when no words were actually studied", () => {
    const payload = JSON.stringify({
      version: 1,
      dailyGoal: 10,
      completedToday: 3,
      currentWordIndex: 0,
      streak: 12,
      settings: {
        dailyGoal: 10,
        includeDifficultWords: true,
        learningLanguage: "english",
        interfaceLanguage: "english",
      },
      wordProgress: {},
    });

    expect(parseStorageData(payload)).toMatchObject({
      completedToday: 0,
      streak: 0,
      wordProgress: {},
    });
  });
});
