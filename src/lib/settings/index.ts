import type { FluentStorageData } from "../storage/types";
import type { SettingsPreferences } from "../../types/settings";

export const defaultSettingsPreferences: SettingsPreferences = {
  dailyGoal: 10,
  includeDifficultWords: true,
  learningLanguage: "english",
  interfaceLanguage: "english",
};

export function updateStorageSettings(
  storage: FluentStorageData,
  settings: SettingsPreferences,
): FluentStorageData {
  return {
    ...storage,
    dailyGoal: settings.dailyGoal,
    settings,
  };
}

export function resetProgressForSettings(storage: FluentStorageData): FluentStorageData {
  return {
    ...storage,
    completedToday: 0,
    currentWordIndex: 0,
    streak: 0,
    wordProgress: {},
  };
}
