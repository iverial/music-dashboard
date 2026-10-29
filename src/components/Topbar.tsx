"use client";

import { Fragment, useEffect, useRef } from "react";
import type { PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export type Accent = "green" | "violet" | "pink" | "cyan";

const PERIODS: { value: PeriodKey; label: string }[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const ACCENTS: { value: Accent; label: string; from: string; to: string }[] = [
  { value: "green", label: "Green", from: "#1ed760", to: "#00d4b1" },
  { value: "violet", label: "Violet", from: "#b48cff", to: "#ff7ad9" },
  { value: "pink", label: "Pink", from: "#ff5ea8", to: "#ffb347" },
  { value: "cyan", label: "Cyan", from: "#36d6ff", to: "#6d8bff" },
];

interface TopbarProps {
  period: PeriodKey;
  onPeriod: (period: PeriodKey) => void;
  query: string;
  onQuery: (query: string) => void;
  accent: Accent;
  onAccent: (accent: Accent) => void;
}

export function Topbar({ period, onPeriod, query, onQuery, accent, onAccent }: TopbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box, like most dashboards
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      event.preventDefault();
      searchRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="topbar">
      <a className="brand brand--bar" href="#main" aria-label="Wavelength, back to top">
        <Logo />
      </a>

      <label className="search">
        <Icon name="search" />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search tracks or artists"
          autoComplete="off"
          spellCheck={false}
          aria-label="Search tracks or artists"
        />
        <kbd aria-hidden="true">/</kbd>
      </label>

      <div className="segmented" role="radiogroup" aria-label="Time range">
        {PERIODS.map((option) => (
          <Fragment key={option.value}>
            <input
              type="radio"
              name="period"
              id={`p-${option.value}`}
              value={option.value}
              checked={period === option.value}
              onChange={() => onPeriod(option.value)}
            />
            <label htmlFor={`p-${option.value}`}>{option.label}</label>
          </Fragment>
        ))}
      </div>

      <div className="swatches" role="radiogroup" aria-label="Accent color">
        {ACCENTS.map((option) => (
          <input
            key={option.value}
            type="radio"
            name="accent"
            value={option.value}
            aria-label={option.label}
            checked={accent === option.value}
            onChange={() => onAccent(option.value)}
            style={cssVars({ "--a": option.from, "--b": option.to })}
          />
        ))}
      </div>
    </header>
  );
}
