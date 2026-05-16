import { Card } from "../../../../components/card";
import type { ExamplesCardProps } from "./types";

export function ExamplesCard({ examples }: ExamplesCardProps) {
  return (
    <Card className="min-h-[252px] shadow-sm" padding="md">
      <h2 className="text-[22px] font-semibold leading-none text-[#070B1A]">Examples</h2>
      <ul className="mt-7 divide-y divide-fluent-border">
        {examples.map((example) => (
          <li className="flex items-center gap-7 py-4 first:pt-0 last:pb-0" key={example.id}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-fluent-accent shadow-[0_0_0_3px_rgba(79,70,229,0.12)]" />
            <span className="text-[17px] leading-6 text-[#111827]">{example.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
