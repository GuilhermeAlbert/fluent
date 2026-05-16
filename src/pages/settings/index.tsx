import {
  BookOpen,
  Cloud,
  Download,
  Globe2,
  Heart,
  Info,
  Languages,
  ListChecks,
  Target,
  Trash2,
  Type,
} from "lucide-react";
import { AppShell } from "../../components/layout/app-shell";
import { useSettingsData } from "../../hooks/use-settings-data";
import type { DailyGoal, InterfaceLanguage, LearningLanguage } from "../../types/settings";
import { SettingsRow } from "./components/settings-row";
import { SettingsSection } from "./components/settings-section";
import { SettingsSelect } from "./components/settings-select";
import { SettingsToggle } from "./components/settings-toggle";

export function SettingsPage() {
  const {
    aboutFluent,
    aboutMessage,
    clearData,
    copy,
    exportData,
    preferences,
    setDailyGoal,
    setIncludeDifficultWords,
    setInterfaceLanguage,
    setLearningLanguage,
    streak,
  } = useSettingsData();

  const dailyGoalOptions: Array<{ label: string; value: DailyGoal }> = [
    { label: copy.settings.words(5), value: 5 },
    { label: copy.settings.words(10), value: 10 },
    { label: copy.settings.words(15), value: 15 },
    { label: copy.settings.words(20), value: 20 },
  ];

  const learningLanguageOptions: Array<{ label: string; value: LearningLanguage }> = [
    { label: copy.common.languageNames.english, value: "english" },
    { label: copy.common.languageNames.spanish, value: "spanish" },
  ];

  const interfaceLanguageOptions: Array<{ label: string; value: InterfaceLanguage }> = [
    { label: copy.common.languageNames.english, value: "english" },
    { label: copy.common.languageNames.portuguese, value: "portuguese" },
    { label: copy.common.languageNames.spanish, value: "spanish" },
  ];

  return (
    <AppShell
      copy={copy}
      description={copy.settings.description}
      streak={streak}
      title={copy.settings.title}
    >
      <div className="space-y-5">
        <SettingsSection icon={BookOpen} title={copy.settings.learning}>
          <SettingsRow
            action={
              <SettingsSelect
                aria-label={copy.settings.dailyGoal}
                onChange={setDailyGoal}
                options={dailyGoalOptions}
                value={preferences.dailyGoal}
              />
            }
            description={copy.settings.dailyGoalDescription}
            icon={Target}
            title={copy.settings.dailyGoal}
          />
          <SettingsRow
            action={
              <SettingsToggle
                checked={preferences.includeDifficultWords}
                label={copy.settings.includeDifficultWords}
                onChange={setIncludeDifficultWords}
              />
            }
            description={copy.settings.includeDifficultWordsDescription}
            icon={ListChecks}
            title={copy.settings.includeDifficultWords}
          />
        </SettingsSection>

        <SettingsSection icon={Globe2} title={copy.settings.language}>
          <SettingsRow
            action={
              <SettingsSelect
                aria-label={copy.settings.learningLanguage}
                onChange={setLearningLanguage}
                options={learningLanguageOptions}
                value={preferences.learningLanguage}
              />
            }
            description={copy.settings.learningLanguageDescription}
            icon={Languages}
            title={copy.settings.learningLanguage}
          />
          <SettingsRow
            action={
              <SettingsSelect
                aria-label={copy.settings.interfaceLanguage}
                onChange={setInterfaceLanguage}
                options={interfaceLanguageOptions}
                value={preferences.interfaceLanguage}
              />
            }
            description={copy.settings.interfaceLanguageDescription}
            icon={Type}
            title={copy.settings.interfaceLanguage}
          />
        </SettingsSection>

        <SettingsSection icon={Cloud} title={copy.settings.data}>
          <SettingsRow
            action={
              <button
                className="h-[43px] min-w-[130px] rounded-xl border border-fluent-border bg-white px-6 text-sm font-semibold text-fluent-accent transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
                onClick={exportData}
                type="button"
              >
                {copy.settings.export}
              </button>
            }
            description={copy.settings.exportDataDescription}
            icon={Download}
            title={copy.settings.exportData}
          />
          <SettingsRow
            action={
              <button
                className="h-[43px] min-w-[130px] rounded-xl border border-red-300 bg-white px-6 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                onClick={clearData}
                type="button"
              >
                {copy.settings.clear}
              </button>
            }
            description={copy.settings.clearDataDescription}
            icon={Trash2}
            title={copy.settings.clearData}
            tone="danger"
          />
        </SettingsSection>

        <SettingsSection icon={Info} title={copy.settings.about}>
          <div className="grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[34px_1fr_auto] sm:items-center">
            <Heart aria-hidden="true" className="h-6 w-6 text-fluent-muted" />
            <div>
              <p className="font-semibold text-[#070B1A]">
                {copy.settings.version}{" "}
                <span className="ml-2 rounded-lg bg-[#EFECFF] px-3 py-1 text-sm font-medium text-fluent-accent">
                  1.0.0
                </span>
              </p>
              <p className="mt-2 text-sm leading-5 text-fluent-muted">
                {copy.settings.madeForLearners.split("♥")[0]}
                <span className="text-red-500">♥</span>
                {copy.settings.madeForLearners.split("♥")[1]}
              </p>
              {aboutMessage ? (
                <p className="mt-2 text-sm leading-5 text-fluent-accent">{aboutMessage}</p>
              ) : null}
            </div>
            <button
              className="h-[43px] min-w-[146px] rounded-xl border border-fluent-border bg-white px-6 text-sm font-semibold text-fluent-accent transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
              onClick={aboutFluent}
              type="button"
            >
              {copy.settings.aboutFluent}
            </button>
          </div>
        </SettingsSection>
      </div>
    </AppShell>
  );
}
