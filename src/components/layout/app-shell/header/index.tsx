import { headerStyles } from "./styles";
import type { HeaderProps } from "./types";

export function Header({ description, title }: HeaderProps) {
  return (
    <header className={headerStyles.root}>
      <div>
        <h1 className={headerStyles.title}>{title}</h1>
        <p className={headerStyles.description}>{description}</p>
      </div>
      <div aria-hidden="true" className={headerStyles.avatar}>
        F
      </div>
    </header>
  );
}
