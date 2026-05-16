import type { CSSProperties } from "react";
import { Flame } from "lucide-react";
import { explorerHeaderStatsStyles } from "./styles";
import type { ExplorerHeaderStatsProps } from "./types";

export function ExplorerHeaderStats({ copy, progress }: ExplorerHeaderStatsProps) {
  const percentage =
    progress.planned > 0 ? Math.min(Math.round((progress.completed / progress.planned) * 100), 100) : 0;

  return (
    <div className={explorerHeaderStatsStyles.root}>
      <div className={explorerHeaderStatsStyles.stat}>
        <Flame
          aria-hidden="true"
          className={explorerHeaderStatsStyles.icon}
          fill="#4F46E5"
          strokeWidth={1.8}
        />
        <div>
          <p className={explorerHeaderStatsStyles.value}>{progress.streak}</p>
          <p className={explorerHeaderStatsStyles.meta}>{copy.navigation.dayStreak}</p>
        </div>
      </div>

      <div className={explorerHeaderStatsStyles.stat}>
        <div
          aria-label={copy.home.progressLabel(progress.completed, progress.planned)}
          aria-valuemax={progress.planned}
          aria-valuemin={0}
          aria-valuenow={progress.completed}
          className={explorerHeaderStatsStyles.progressRing}
          role="progressbar"
          style={{ "--progress": `${percentage}%` } as CSSProperties}
        >
          <div className={explorerHeaderStatsStyles.progressInner} />
        </div>
        <div>
          <p className="text-lg font-semibold leading-none text-[#070B1A]">
            {progress.completed} / {progress.planned}
          </p>
          <p className={explorerHeaderStatsStyles.meta}>{copy.home.today}</p>
        </div>
      </div>
    </div>
  );
}
