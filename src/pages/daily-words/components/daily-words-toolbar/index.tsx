import { Filter, Languages } from "lucide-react";
import type { DailyWordsFilter } from "../../../../lib/daily-words";
import type { LearningLanguage } from "../../../../types/settings";
import { dailyWordsToolbarStyles } from "./styles";
import type { DailyWordsToolbarProps } from "./types";

export function DailyWordsToolbar({
  copy,
  filter,
  learningLanguage,
  onFilterChange,
  onLearningLanguageChange,
  progress,
}: DailyWordsToolbarProps) {
  const filterOptions: Array<{ label: string; value: DailyWordsFilter }> = [
    { label: copy.dailyWords.all, value: "all" },
    { label: copy.dailyWords.remaining, value: "remaining" },
    { label: copy.dailyWords.completed, value: "completed" },
  ];
  const languageOptions: Array<{ label: string; value: LearningLanguage }> = [
    { label: copy.common.languageNames.english, value: "english" },
    { label: copy.common.languageNames.spanish, value: "spanish" },
  ];

  return (
    <div className={dailyWordsToolbarStyles.root}>
      <div className={dailyWordsToolbarStyles.headingGroup}>
        <div className={dailyWordsToolbarStyles.titleRow}>
          <h2 className={dailyWordsToolbarStyles.title}>{copy.dailyWords.today}</h2>
          <p className={dailyWordsToolbarStyles.count}>
            {copy.dailyWords.progressLabel(progress.completed, progress.planned)}
          </p>
        </div>
      </div>

      <div className={dailyWordsToolbarStyles.controls}>
        <label className={dailyWordsToolbarStyles.control}>
          <Filter aria-hidden="true" className="h-4 w-4 text-fluent-muted" />
          <span className="sr-only">{copy.dailyWords.filter}</span>
          <select
            aria-label={copy.dailyWords.filter}
            className={dailyWordsToolbarStyles.select}
            onChange={(event) => onFilterChange(event.target.value as DailyWordsFilter)}
            value={filter}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={dailyWordsToolbarStyles.control}>
          <Languages aria-hidden="true" className="h-4 w-4 text-fluent-muted" />
          <span className="sr-only">{copy.dailyWords.language}</span>
          <select
            aria-label={copy.dailyWords.language}
            className={dailyWordsToolbarStyles.select}
            onChange={(event) => onLearningLanguageChange(event.target.value as LearningLanguage)}
            value={learningLanguage}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
