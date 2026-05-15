import { cn } from "../../lib/styles";
import { cardBaseClasses, cardPaddingClasses } from "./styles";
import type { CardProps } from "./types";

export function Card({
  children,
  className,
  elevated = false,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardBaseClasses,
        cardPaddingClasses[padding],
        elevated && "shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
