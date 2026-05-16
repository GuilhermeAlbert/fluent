import type { FluentStorageData, StorageWordProgress } from "./types";
import { defaultSettingsPreferences } from "../settings";
import type {
  DailyGoal,
  InterfaceLanguage,
  LearningLanguage,
  SettingsPreferences,
} from "../../types/settings";

export const FLUENT_STORAGE_KEY = "fluent.storage.v1";

export const defaultFluentStorageData: FluentStorageData = {
  version: 1,
  dailyGoal: 10,
  completedToday: 3,
  streak: 12,
  currentWordIndex: 0,
  settings: defaultSettingsPreferences,
  wordProgress: {},
};

const validStatuses = new Set(["new", "learning", "completed", "difficult"]);
const validDailyGoals = new Set([5, 10, 15, 20]);
const validLearningLanguages = new Set(["english", "spanish"]);
const validInterfaceLanguages = new Set(["english", "portuguese", "spanish"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStorageWordProgress(value: unknown): value is StorageWordProgress {
  if (!isRecord(value)) {
    return false;
  }

  const completedToday = value.completedToday;

  return (
    typeof value.wordId === "string" &&
    typeof value.status === "string" &&
    validStatuses.has(value.status) &&
    typeof value.lastStudiedAt === "string" &&
    (completedToday === undefined || typeof completedToday === "boolean")
  );
}

function parseWordProgress(value: unknown) {
  if (!isRecord(value)) {
    return null;
  }

  const entries = Object.entries(value);
  const progress: FluentStorageData["wordProgress"] = {};

  for (const [wordId, wordProgress] of entries) {
    if (!isStorageWordProgress(wordProgress)) {
      return null;
    }

    progress[wordId] = wordProgress;
  }

  return progress;
}

function parseSettingsPreferences(value: unknown, dailyGoal: number): SettingsPreferences {
  if (!isRecord(value)) {
    return {
      ...defaultSettingsPreferences,
      dailyGoal: validDailyGoals.has(dailyGoal) ? (dailyGoal as DailyGoal) : 10,
    };
  }

  const settingsDailyGoal = value.dailyGoal;
  const parsedDailyGoal = typeof settingsDailyGoal === "number" && validDailyGoals.has(settingsDailyGoal)
    ? (settingsDailyGoal as DailyGoal)
    : validDailyGoals.has(dailyGoal)
      ? (dailyGoal as DailyGoal)
      : 10;

  return {
    dailyGoal: parsedDailyGoal,
    includeDifficultWords:
      typeof value.includeDifficultWords === "boolean"
        ? value.includeDifficultWords
        : defaultSettingsPreferences.includeDifficultWords,
    learningLanguage:
      typeof value.learningLanguage === "string" &&
      validLearningLanguages.has(value.learningLanguage)
        ? (value.learningLanguage as LearningLanguage)
        : defaultSettingsPreferences.learningLanguage,
    interfaceLanguage:
      typeof value.interfaceLanguage === "string" &&
      validInterfaceLanguages.has(value.interfaceLanguage)
        ? (value.interfaceLanguage as InterfaceLanguage)
        : defaultSettingsPreferences.interfaceLanguage,
  };
}

export function parseStorageData(payload: string | null): FluentStorageData | null {
  if (!payload) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(payload);

    if (!isRecord(parsed) || parsed.version !== 1) {
      return null;
    }

    const wordProgress = parseWordProgress(parsed.wordProgress);

    if (
      typeof parsed.dailyGoal !== "number" ||
      typeof parsed.completedToday !== "number" ||
      typeof parsed.streak !== "number" ||
      !wordProgress
    ) {
      return null;
    }

    const parsedDailyGoal = parsed.dailyGoal;
    const settings = parseSettingsPreferences(parsed.settings, parsedDailyGoal);

    return {
      version: 1,
      dailyGoal: settings.dailyGoal,
      completedToday: parsed.completedToday,
      streak: parsed.streak,
      currentWordIndex:
        typeof parsed.currentWordIndex === "number" ? parsed.currentWordIndex : 0,
      settings,
      wordProgress,
    };
  } catch {
    return null;
  }
}

export function readFluentStorage(): FluentStorageData | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return parseStorageData(window.localStorage.getItem(FLUENT_STORAGE_KEY));
}

export function writeFluentStorage(data: FluentStorageData) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(FLUENT_STORAGE_KEY, JSON.stringify(data));
}
