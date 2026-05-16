import { useCallback, useMemo, useState } from "react";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import {
  defaultSettingsPreferences,
  resetProgressForSettings,
  updateStorageSettings,
} from "../lib/settings";
import type { FluentStorageData } from "../lib/storage/types";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import type {
  DailyGoal,
  InterfaceLanguage,
  LearningLanguage,
  SettingsPreferences,
} from "../types/settings";

export interface UseSettingsData {
  aboutFluent: () => void;
  aboutMessage: string | null;
  clearData: () => void;
  copy: InterfaceCopy;
  exportData: () => void;
  preferences: SettingsPreferences;
  streak: number;
  setDailyGoal: (dailyGoal: DailyGoal) => void;
  setIncludeDifficultWords: (includeDifficultWords: boolean) => void;
  setInterfaceLanguage: (interfaceLanguage: InterfaceLanguage) => void;
  setLearningLanguage: (learningLanguage: LearningLanguage) => void;
}

function getInitialStorage(): FluentStorageData {
  const stored = readFluentStorage();

  if (!stored) {
    return defaultFluentStorageData;
  }

  return stored;
}

function downloadJson(data: FluentStorageData) {
  if (typeof document === "undefined" || typeof URL === "undefined" || typeof Blob === "undefined") {
    return;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "fluent-data.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function useSettingsData(): UseSettingsData {
  const [storage, setStorage] = useState(getInitialStorage);
  const [aboutMessage, setAboutMessage] = useState<string | null>(null);

  const preferences = storage.settings ?? defaultSettingsPreferences;
  const copy = getInterfaceCopy(preferences.interfaceLanguage);

  const updatePreferences = useCallback(
    (createPreferences: (preferences: SettingsPreferences) => SettingsPreferences) => {
      setStorage((currentStorage) => {
        const nextPreferences = createPreferences(
          currentStorage.settings ?? defaultSettingsPreferences,
        );
        const nextStorage = updateStorageSettings(currentStorage, nextPreferences);

        writeFluentStorage(nextStorage);
        return nextStorage;
      });
    },
    [],
  );

  return useMemo(
    () => ({
      aboutFluent: () => {
        setAboutMessage(copy.settings.aboutMessage);
      },
      aboutMessage,
      clearData: () => {
        setStorage((currentStorage) => {
          const nextStorage = resetProgressForSettings(currentStorage);

          writeFluentStorage(nextStorage);
          return nextStorage;
        });
      },
      copy,
      exportData: () => downloadJson(storage),
      preferences,
      streak: storage.streak,
      setDailyGoal: (dailyGoal: DailyGoal) =>
        updatePreferences((currentPreferences) => ({
          ...currentPreferences,
          dailyGoal,
        })),
      setIncludeDifficultWords: (includeDifficultWords: boolean) =>
        updatePreferences((currentPreferences) => ({
          ...currentPreferences,
          includeDifficultWords,
        })),
      setInterfaceLanguage: (interfaceLanguage: InterfaceLanguage) =>
        updatePreferences((currentPreferences) => ({
          ...currentPreferences,
          interfaceLanguage,
        })),
      setLearningLanguage: (learningLanguage: LearningLanguage) =>
        updatePreferences((currentPreferences) => ({
          ...currentPreferences,
          learningLanguage,
        })),
    }),
    [aboutMessage, copy, preferences, storage, updatePreferences],
  );
}
