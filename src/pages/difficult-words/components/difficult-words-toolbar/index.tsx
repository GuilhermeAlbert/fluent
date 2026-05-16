import { Search } from "lucide-react";
import type { DifficultWordsFilter } from "../../../../lib/difficult-words";
import type { LearningLanguage } from "../../../../types/settings";
import { difficultWordsToolbarStyles } from "./styles";
import type { DifficultWordsToolbarProps } from "./types";

export function DifficultWordsToolbar({
  copy,
  filter,
  learningLanguage,
  onFilterChange,
  onLearningLanguageChange,
  onQueryChange,
  query,
}: DifficultWordsToolbarProps) {
  const filterOptions: Array<{ label: string; value: DifficultWordsFilter }> = [
    { label: copy.difficultWords.all, value: "all" },
    { label: copy.difficultWords.marked, value: "marked" },
    { label: copy.difficultWords.hard, value: "hard" },
  ];
  const languageOptions: Array<{ label: string; value: LearningLanguage }> = [
    { label: copy.common.languageNames.english, value: "english" },
    { label: copy.common.languageNames.spanish, value: "spanish" },
  ];

  return (
    <div className={difficultWordsToolbarStyles.root}>
      <label className={difficultWordsToolbarStyles.searchWrap}>
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#667085]" />
        <span className="sr-only">{copy.difficultWords.searchPlaceholder}</span>
        <input
          className={difficultWordsToolbarStyles.search}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={copy.difficultWords.searchPlaceholder}
          type="search"
          value={query}
        />
      </label>

      <select
        aria-label={copy.difficultWords.filter}
        className={difficultWordsToolbarStyles.select}
        onChange={(event) => onFilterChange(event.target.value as DifficultWordsFilter)}
        value={filter}
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        aria-label={copy.difficultWords.language}
        className={difficultWordsToolbarStyles.select}
        onChange={(event) => onLearningLanguageChange(event.target.value as LearningLanguage)}
        value={learningLanguage}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
