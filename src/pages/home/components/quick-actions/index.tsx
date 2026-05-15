import { ArrowRight, BookMarked, Library, Repeat2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../../../components/card";
import type { QuickAction } from "../../../../types/progress";
import type { QuickActionsProps } from "./types";

const actionIcons: Record<QuickAction["id"], typeof Repeat2> = {
  "daily-practice": Repeat2,
  "browse-words": Library,
  "difficult-words": BookMarked,
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section aria-labelledby="quick-actions-title">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-fluent-text" id="quick-actions-title">
          Quick actions
        </h2>
      </div>

      <div className="grid gap-3">
        {actions.map((action) => {
          const Icon = actionIcons[action.id];

          return (
            <Link key={action.id} to={action.to}>
              <Card className="group transition hover:border-[#D1D5DB] hover:shadow-soft" padding="sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3F4F6] text-fluent-accent">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-fluent-text">{action.title}</p>
                    <p className="mt-1 text-sm leading-5 text-fluent-muted">{action.description}</p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-fluent-muted transition group-hover:translate-x-0.5 group-hover:text-fluent-accent"
                  />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
