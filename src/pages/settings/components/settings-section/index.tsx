import { Card } from "../../../../components/card";
import type { SettingsSectionProps } from "./types";

export function SettingsSection({ children, icon: Icon, title }: SettingsSectionProps) {
  return (
    <Card className="shadow-sm" padding="md">
      <div className="grid gap-5 sm:grid-cols-[38px_1fr]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFECFF] text-fluent-accent">
          <Icon aria-hidden="true" className="h-6 w-6" />
        </div>

        <div className="min-w-0">
          <h2 className="text-[20px] font-semibold leading-10 text-[#070B1A]">{title}</h2>
          <div className="mt-4 divide-y divide-fluent-border">{children}</div>
        </div>
      </div>
    </Card>
  );
}
