import { describe, expect, it } from "vitest";
import { defaultSettingsPreferences, resetProgressForSettings, updateStorageSettings } from "./index";
import type { FluentStorageData } from "../storage/types";

const storage: FluentStorageData = {
  version: 1,
  dailyGoal: 10,
  completedToday: 4,
  streak: 12,
  currentWordIndex: 2,
  settings: defaultSettingsPreferences,
  wordProgress: {
    advice: {
      wordId: "advice",
      status: "completed",
      lastStudiedAt: "2026-05-16T12:00:00.000Z",
      completedToday: true,
    },
  },
};

describe("settings preferences", () => {
  it("updates settings while preserving existing progress", () => {
    const updated = updateStorageSettings(storage, {
      dailyGoal: 15,
      includeDifficultWords: false,
      learningLanguage: "spanish",
      interfaceLanguage: "portuguese",
    });

    expect(updated.dailyGoal).toBe(15);
    expect(updated.completedToday).toBe(4);
    expect(updated.streak).toBe(12);
    expect(updated.wordProgress.advice?.status).toBe("completed");
    expect(updated.settings).toEqual({
      dailyGoal: 15,
      includeDifficultWords: false,
      learningLanguage: "spanish",
      interfaceLanguage: "portuguese",
    });
  });

  it("clears local progress while preserving settings", () => {
    const cleared = resetProgressForSettings(storage);

    expect(cleared.dailyGoal).toBe(10);
    expect(cleared.completedToday).toBe(0);
    expect(cleared.streak).toBe(0);
    expect(cleared.currentWordIndex).toBe(0);
    expect(cleared.wordProgress).toEqual({});
    expect(cleared.settings).toEqual(defaultSettingsPreferences);
  });
});
