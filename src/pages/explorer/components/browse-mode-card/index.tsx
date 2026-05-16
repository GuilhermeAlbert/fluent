import { cn } from "../../../../lib/styles";
import { browseModeCardStyles } from "./styles";
import type { BrowseModeCardProps } from "./types";

export function BrowseModeCard({
  hint,
  icon: Icon,
  isActive,
  mode,
  onSelect,
  title,
}: BrowseModeCardProps) {
  return (
    <button
      className={cn(
        browseModeCardStyles.root,
        isActive ? browseModeCardStyles.active : browseModeCardStyles.inactive,
      )}
      onClick={() => onSelect(mode)}
      type="button"
    >
      <span
        className={cn(
          browseModeCardStyles.iconWrap,
          isActive ? browseModeCardStyles.iconWrapActive : "",
        )}
      >
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <span>
        <span className={browseModeCardStyles.title}>{title}</span>
        <span className={browseModeCardStyles.hint}>{hint}</span>
      </span>
    </button>
  );
}
