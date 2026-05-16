import { Github, Menu } from "lucide-react";
import { externalLinks } from "../../../../lib/external-links";
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
      <div className={headerStyles.actions}>
        {children}
        <a
          aria-label={copy.navigation.githubRepository}
          className={headerStyles.githubLink}
          href={externalLinks.githubRepository}
          rel="noreferrer"
          target="_blank"
        >
          <Github aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
