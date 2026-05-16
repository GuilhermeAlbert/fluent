import { Flame } from "lucide-react";
import type { CSSProperties } from "react";
import { headerStatsStyles } from "./styles";
import type { DailyWordsHeaderStatsProps } from "./types";

export function DailyWordsHeaderStats({ copy, progress }: DailyWordsHeaderStatsProps) {
  const percentage =
    progress.planned > 0 ? Math.min(Math.round((progress.completed / progress.planned) * 100), 100) : 0;

  return (
    <div className={headerStatsStyles.root}>
      <div className={headerStatsStyles.streak}>
        <Flame
          aria-hidden="true"
          className={headerStatsStyles.streakIcon}
          fill="#4F46E5"
          strokeWidth={1.8}
        />
        <div>
          <p className={headerStatsStyles.streakValue}>{progress.streak}</p>
          <p className={headerStatsStyles.meta}>{copy.navigation.dayStreak}</p>
        </div>
      </div>

      <div className={headerStatsStyles.progress}>
        <div
          aria-label={copy.home.progressLabel(progress.completed, progress.planned)}
          aria-valuemax={progress.planned}
          aria-valuemin={0}
          aria-valuenow={progress.completed}
          className={headerStatsStyles.ring}
          role="progressbar"
          style={{ "--progress": `${percentage}%` } as CSSProperties}
        >
          <div className={headerStatsStyles.ringInner} />
        </div>
        <div>
          <p className={headerStatsStyles.progressValue}>
            {progress.completed} / {progress.planned}
          </p>
          <p className={headerStatsStyles.meta}>{copy.home.today}</p>
        </div>
      </div>
    </div>
  );
}
