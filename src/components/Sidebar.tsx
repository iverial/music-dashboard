"use client";

import type { ReactNode } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Icon, type IconName } from "./Icon";
import { Logo } from "./Logo";

const SECTIONS: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "home" },
  { id: "tracks", label: "Top tracks", icon: "music" },
  { id: "artists", label: "Artists", icon: "users" },
  { id: "trends", label: "Trends", icon: "trend" },
  { id: "about", label: "About", icon: "code" },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

interface SidebarProps {
  /** server-rendered playlists, passed in as a slot so they ship no JavaScript */
  playlists: ReactNode;
}

export function Sidebar({ playlists }: SidebarProps) {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <aside className="sidebar">
      <a className="brand" href="#main" aria-label="Wavelength, back to top">
        <Logo />
        <span className="brand__name">Wavelength</span>
      </a>

      <nav className="nav" aria-label="Sections">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            className={active === section.id ? "nav__link is-active" : "nav__link"}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
          >
            <Icon name={section.icon} />
            <span>{section.label}</span>
          </a>
        ))}
      </nav>

      {playlists}

      <a className="sidebar__note" href="#about">
        <strong>Fictional data</strong>
        <span>A visual showcase. Nothing here is real or monetized.</span>
      </a>
    </aside>
  );
}
