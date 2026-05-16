import type { WordStatus } from "../../../../types/word";
import { recentActivityCardStyles } from "./styles";
import type { RecentActivityCardProps } from "./types";

const localeByInterfaceLanguage = {
  english: "en-US",
  portuguese: "pt-BR",
  spanish: "es-ES",
};

function getStatusLabel(copy: RecentActivityCardProps["copy"], status: WordStatus) {
  return copy.common.wordStatus[status];
}

export function RecentActivityCard({
  copy,
  interfaceLanguage,
  items,
}: RecentActivityCardProps) {
  const dateFormatter = new Intl.DateTimeFormat(localeByInterfaceLanguage[interfaceLanguage], {
    day: "numeric",
    month: "short",
  });

  return (
    <section className={recentActivityCardStyles.root}>
      <h2 className={recentActivityCardStyles.title}>{copy.progress.recentActivity}</h2>

      {items.length ? (
        <div className={recentActivityCardStyles.list}>
          {items.map((item) => {
            const studiedDate = new Date(item.lastStudiedAt);
            const dateLabel = Number.isNaN(studiedDate.getTime())
              ? copy.difficultWords.notStudiedYet
              : dateFormatter.format(studiedDate);

            return (
              <div className={recentActivityCardStyles.row} key={item.id}>
                <div className={recentActivityCardStyles.wordGroup}>
                  <p className={recentActivityCardStyles.word}>{item.word}</p>
                  <p className={recentActivityCardStyles.meta}>{dateLabel}</p>
                </div>
                <span className={recentActivityCardStyles.badge}>
                  {getStatusLabel(copy, item.status)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={recentActivityCardStyles.empty}>
          <p className={recentActivityCardStyles.emptyTitle}>
            {copy.progress.noRecentActivity}
          </p>
          <p className={recentActivityCardStyles.emptyDescription}>
            {copy.progress.noRecentActivityDescription}
          </p>
        </div>
      )}
    </section>
  );
}
