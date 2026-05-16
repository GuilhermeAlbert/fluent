import { Menu } from "lucide-react";
import { headerStyles } from "./styles";
import type { HeaderProps } from "./types";

export function Header({ children, copy, description, onMenuClick, title }: HeaderProps) {
  return (
    <header className={headerStyles.root}>
      <div className={headerStyles.headingGroup}>
        <button
          aria-label={copy.navigation.openMenu}
          className={headerStyles.menuButton}
          onClick={onMenuClick}
          type="button"
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
        <div>
          <h1 className={headerStyles.title}>{title}</h1>
          {description ? <p className={headerStyles.description}>{description}</p> : null}
        </div>
      </div>
      {children}
    </header>
  );
}
