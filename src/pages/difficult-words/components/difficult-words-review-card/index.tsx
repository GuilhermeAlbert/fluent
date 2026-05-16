import { ArrowRight, Flag } from "lucide-react";
import { difficultWordsReviewCardStyles } from "./styles";
import type { DifficultWordsReviewCardProps } from "./types";

export function DifficultWordsReviewCard({
  copy,
  firstWordId,
  onStartReview,
  stats,
}: DifficultWordsReviewCardProps) {
  return (
    <section className={difficultWordsReviewCardStyles.root}>
      <div>
        <div className={difficultWordsReviewCardStyles.content}>
          <span className={difficultWordsReviewCardStyles.icon}>
            <Flag aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <h2 className={difficultWordsReviewCardStyles.title}>
              {copy.difficultWords.reviewQueue}
            </h2>
            <p className={difficultWordsReviewCardStyles.description}>
              {copy.difficultWords.reviewDescription(stats.totalCount)}
            </p>
          </div>
        </div>

        <div className={difficultWordsReviewCardStyles.stats}>
          <div className={difficultWordsReviewCardStyles.stat}>
            <p className={difficultWordsReviewCardStyles.value}>{stats.markedCount}</p>
            <p className={difficultWordsReviewCardStyles.label}>
              {copy.difficultWords.markedCount}
            </p>
          </div>
          <div className={difficultWordsReviewCardStyles.stat}>
            <p className={difficultWordsReviewCardStyles.value}>{stats.hardCount}</p>
            <p className={difficultWordsReviewCardStyles.label}>
              {copy.difficultWords.hardCount}
            </p>
          </div>
          <div className={difficultWordsReviewCardStyles.stat}>
            <p className={difficultWordsReviewCardStyles.value}>{stats.totalCount}</p>
            <p className={difficultWordsReviewCardStyles.label}>
              {copy.difficultWords.totalCount}
            </p>
          </div>
        </div>
      </div>

      <button
        className={difficultWordsReviewCardStyles.action}
        disabled={!firstWordId}
        onClick={() => {
          if (firstWordId) {
            onStartReview(firstWordId);
          }
        }}
        type="button"
      >
        <span>{copy.difficultWords.startReview}</span>
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </section>
  );
}
