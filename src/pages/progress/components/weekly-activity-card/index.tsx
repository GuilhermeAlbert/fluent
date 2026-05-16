import { weeklyActivityCardStyles } from "./styles";
import type { WeeklyActivityCardProps } from "./types";

const localeByInterfaceLanguage = {
  english: "en-US",
  portuguese: "pt-BR",
  spanish: "es-ES",
};

export function WeeklyActivityCard({
  copy,
  interfaceLanguage,
  items,
}: WeeklyActivityCardProps) {
  const maxCount = Math.max(...items.map((item) => item.count), 1);
  const totalCount = items.reduce((total, item) => total + item.count, 0);
  const dayFormatter = new Intl.DateTimeFormat(localeByInterfaceLanguage[interfaceLanguage], {
    weekday: "short",
  });

  return (
    <section className={weeklyActivityCardStyles.root}>
      <div className={weeklyActivityCardStyles.header}>
        <h2 className={weeklyActivityCardStyles.title}>{copy.progress.sevenDayActivity}</h2>
        <p className={weeklyActivityCardStyles.meta}>
          {copy.progress.activityCount(totalCount)}
        </p>
      </div>

      <div className={weeklyActivityCardStyles.chart}>
        {items.map((item) => {
          const height = item.count > 0 ? Math.max((item.count / maxCount) * 100, 12) : 0;
          const dayLabel = dayFormatter.format(new Date(`${item.date}T00:00:00.000Z`));

          return (
            <div className={weeklyActivityCardStyles.barGroup} key={item.date}>
              <div
                aria-label={`${dayLabel}: ${copy.progress.activityCount(item.count)}`}
                className={weeklyActivityCardStyles.barWrap}
                role="img"
              >
                <div
                  className={weeklyActivityCardStyles.bar}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className={weeklyActivityCardStyles.label}>{dayLabel}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
