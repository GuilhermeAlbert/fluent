import { progressFillClasses, progressTrackClasses } from "./styles";
import type { ProgressBarProps } from "./types";

export function ProgressBar({ label, max, value }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  return (
    <div aria-label={label} aria-valuemax={max} aria-valuemin={0} aria-valuenow={value} role="progressbar">
      <div className={progressTrackClasses}>
        <div className={progressFillClasses} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
