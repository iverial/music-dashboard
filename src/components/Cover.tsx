import { cssVars } from "@/lib/css";
import type { ArtKind } from "@/data/types";

interface CoverProps {
  art: ArtKind;
  h1: number;
  h2: number;
  className?: string;
}

/** Generated cover art. Two hues and a pattern name; the rest is CSS (cover.css). */
export function Cover({ art, h1, h2, className }: CoverProps) {
  return (
    <span
      className={className ? `cover ${className}` : "cover"}
      data-art={art}
      style={cssVars({ "--h1": h1, "--h2": h2 })}
      aria-hidden="true"
    />
  );
}
