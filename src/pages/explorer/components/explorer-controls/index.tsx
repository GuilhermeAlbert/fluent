import { Search } from "lucide-react";
import type { ExplorerDifficultyFilter } from "../../../../lib/explorer";
import type { LearningLanguage } from "../../../../types/settings";
import { explorerControlsStyles } from "./styles";
import type { ExplorerControlsProps } from "./types";

export function ExplorerControls({
  copy,
  difficulty,
  learningLanguage,
  onDifficultyChange,
  onLearningLanguageChange,
  onQueryChange,
  query,
}: ExplorerControlsProps) {
  const languageOptions: Array<{ label: string; value: LearningLanguage }> = [
    { label: copy.common.languageNames.english, value: "english" },
    { label: copy.common.languageNames.spanish, value: "spanish" },
  ];
  const difficultyOptions: Array<{ label: string; value: ExplorerDifficultyFilter }> = [
    { label: copy.explorer.allDifficulty, value: "all" },
    { label: copy.common.difficulty.easy, value: "easy" },
    { label: copy.common.difficulty.medium, value: "medium" },
    { label: copy.common.difficulty.hard, value: "hard" },
  ];

  return (
    <div className={explorerControlsStyles.root}>
      <label className={explorerControlsStyles.searchWrap}>
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#667085]" />
        <span className="sr-only">{copy.explorer.searchPlaceholder}</span>
        <input
          className={explorerControlsStyles.search}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={copy.explorer.searchPlaceholder}
          type="search"
          value={query}
        />
      </label>

      <select
        aria-label={copy.explorer.language}
        className={explorerControlsStyles.select}
        onChange={(event) => onLearningLanguageChange(event.target.value as LearningLanguage)}
        value={learningLanguage}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        aria-label={copy.explorer.difficulty}
        className={explorerControlsStyles.select}
        onChange={(event) => onDifficultyChange(event.target.value as ExplorerDifficultyFilter)}
        value={difficulty}
      >
        {difficultyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
