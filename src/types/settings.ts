export type DailyGoal = 5 | 10 | 15 | 20;

export type LearningLanguage = "english" | "spanish";

export type InterfaceLanguage = "english" | "portuguese" | "spanish";

export interface SettingsPreferences {
  dailyGoal: DailyGoal;
  includeDifficultWords: boolean;
  learningLanguage: LearningLanguage;
  interfaceLanguage: InterfaceLanguage;
}
