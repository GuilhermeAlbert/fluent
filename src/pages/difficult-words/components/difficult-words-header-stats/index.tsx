import { Flag, ListChecks } from "lucide-react";
import { difficultWordsHeaderStatsStyles } from "./styles";
import type { DifficultWordsHeaderStatsProps } from "./types";

export function DifficultWordsHeaderStats({
  copy,
  progress,
  stats,
}: DifficultWordsHeaderStatsProps) {
  return (
    <div className={difficultWordsHeaderStatsStyles.root}>
      <div className={difficultWordsHeaderStatsStyles.stat}>
        <span className={difficultWordsHeaderStatsStyles.warningIconWrap}>
          <Flag aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className={difficultWordsHeaderStatsStyles.value}>{stats.markedCount}</p>
          <p className={difficultWordsHeaderStatsStyles.meta}>
            {copy.difficultWords.markedCount}
          </p>
        </div>
      </div>

      <div className={difficultWordsHeaderStatsStyles.stat}>
        <span className={difficultWordsHeaderStatsStyles.iconWrap}>
          <ListChecks aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className={difficultWordsHeaderStatsStyles.value}>
            {progress.completed} / {progress.planned}
          </p>
          <p className={difficultWordsHeaderStatsStyles.meta}>{copy.home.today}</p>
        </div>
      </div>
    </div>
  );
}
