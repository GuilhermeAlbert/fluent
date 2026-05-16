import { Flame, ListChecks } from "lucide-react";
import { progressHeaderStatsStyles } from "./styles";
import type { ProgressHeaderStatsProps } from "./types";

export function ProgressHeaderStats({ copy, overview }: ProgressHeaderStatsProps) {
  return (
    <div className={progressHeaderStatsStyles.root}>
      <div className={progressHeaderStatsStyles.stat}>
        <span className={progressHeaderStatsStyles.successIconWrap}>
          <ListChecks aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className={progressHeaderStatsStyles.value}>
            {overview.completedToday} / {overview.dailyGoal}
          </p>
          <p className={progressHeaderStatsStyles.meta}>{copy.home.today}</p>
        </div>
      </div>

      <div className={progressHeaderStatsStyles.stat}>
        <span className={progressHeaderStatsStyles.iconWrap}>
          <Flame aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className={progressHeaderStatsStyles.value}>{overview.streak}</p>
          <p className={progressHeaderStatsStyles.meta}>{copy.navigation.dayStreak}</p>
        </div>
      </div>
    </div>
  );
}
