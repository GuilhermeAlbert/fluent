import { Library } from "lucide-react";
import { difficultWordsEmptyStateStyles } from "./styles";
import type { DifficultWordsEmptyStateProps } from "./types";

export function DifficultWordsEmptyState({
  copy,
  onBrowseWords,
}: DifficultWordsEmptyStateProps) {
  return (
    <div className={difficultWordsEmptyStateStyles.root}>
      <div className={difficultWordsEmptyStateStyles.icon}>
        <Library aria-hidden="true" className="h-6 w-6" />
      </div>
      <h2 className={difficultWordsEmptyStateStyles.title}>
        {copy.difficultWords.emptyTitle}
      </h2>
      <p className={difficultWordsEmptyStateStyles.description}>
        {copy.difficultWords.emptyDescription}
      </p>
      <button
        className={difficultWordsEmptyStateStyles.action}
        onClick={onBrowseWords}
        type="button"
      >
        {copy.difficultWords.browseWords}
      </button>
    </div>
  );
}
