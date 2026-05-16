import { headerStyles } from "./styles";
import type { HeaderProps } from "./types";

export function Header({ children, description, title }: HeaderProps) {
  return (
    <header className={headerStyles.root}>
      <div>
        <h1 className={headerStyles.title}>{title}</h1>
        {description ? <p className={headerStyles.description}>{description}</p> : null}
      </div>
      {children}
    </header>
  );
}
