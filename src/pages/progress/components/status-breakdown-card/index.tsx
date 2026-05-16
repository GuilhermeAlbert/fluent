import { cn } from "../../../../lib/styles";
import type { ProgressStatus } from "../../../../lib/progress";
import {
  statusBreakdownCardStyles,
  statusDotClasses,
  statusFillClasses,
} from "./styles";
import type { StatusBreakdownCardProps } from "./types";

function getStatusLabel(copy: StatusBreakdownCardProps["copy"], status: ProgressStatus) {
  if (status === "new") {
    return copy.progress.newWords;
  }

  return copy.common.wordStatus[status];
}

export function StatusBreakdownCard({ copy, items }: StatusBreakdownCardProps) {
  return (
    <section className={statusBreakdownCardStyles.root}>
      <h2 className={statusBreakdownCardStyles.title}>{copy.progress.statusBreakdown}</h2>

      <div className={statusBreakdownCardStyles.list}>
        {items.map((item) => (
          <div className={statusBreakdownCardStyles.row} key={item.status}>
            <div className={statusBreakdownCardStyles.rowHeader}>
              <span className={statusBreakdownCardStyles.labelGroup}>
                <span
                  className={cn(
                    statusBreakdownCardStyles.dot,
                    statusDotClasses[item.status],
                  )}
                />
                <span className={statusBreakdownCardStyles.label}>
                  {getStatusLabel(copy, item.status)}
                </span>
              </span>
              <span className={statusBreakdownCardStyles.value}>
                {item.count} · {item.percentage}%
              </span>
            </div>
            <div className={statusBreakdownCardStyles.track}>
              <div
                className={cn(
                  statusBreakdownCardStyles.fill,
                  statusFillClasses[item.status],
                )}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
