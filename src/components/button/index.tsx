import { cn } from "../../lib/styles";
import { buttonBaseClasses, buttonSizeClasses, buttonVariantClasses } from "./styles";
import type { ButtonProps } from "./types";

export function Button({
  children,
  className,
  icon,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonBaseClasses,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
