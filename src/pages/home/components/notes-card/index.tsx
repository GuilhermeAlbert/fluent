import { CheckCircle2, X } from "lucide-react";
import { Card } from "../../../../components/card";
import type { NotesCardProps } from "./types";

export function NotesCard({ copy, note }: NotesCardProps) {
  return (
    <Card className="min-h-[252px] shadow-sm" padding="md">
      <h2 className="text-[22px] font-semibold leading-none text-[#070B1A]">
        {copy.home.notes}
      </h2>
      <p className="mt-8 text-[17px] leading-6 text-[#111827]">{note.summary}</p>

      <div className="mt-7 space-y-6">
        <p className="flex items-center gap-3 text-[17px] text-[#111827]">
          <X aria-hidden="true" className="h-6 w-6 text-red-500" strokeWidth={2.4} />
          {note.avoid}
        </p>
        <p className="flex items-center gap-3 text-[17px] text-[#111827]">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-[#39B54A]" strokeWidth={2.2} />
          {note.use}
        </p>
      </div>
    </Card>
  );
}
