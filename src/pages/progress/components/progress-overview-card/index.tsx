import { cn } from "../../../../lib/styles";
import {
  progressOverviewCardStyles,
  progressOverviewToneClasses,
} from "./styles";
import type { ProgressOverviewCardProps } from "./types";

export function ProgressOverviewCard({
  icon: Icon,
  label,
  meta,
  tone = "neutral",
  value,
}: ProgressOverviewCardProps) {
  return (
    <article className={progressOverviewCardStyles.root}>
      <div className={progressOverviewCardStyles.header}>
        <span
          className={cn(
            progressOverviewCardStyles.icon,
            progressOverviewToneClasses[tone],
          )}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <p className={progressOverviewCardStyles.value}>{value}</p>
      <p className={progressOverviewCardStyles.label}>{label}</p>
      <p className={progressOverviewCardStyles.meta}>{meta}</p>
    </article>
  );
}
