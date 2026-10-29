import type { IconName } from "@/components/Icon";

export type PeriodKey = "week" | "month" | "year";
export type GenreKey = "pop" | "electronic" | "latin" | "indie" | "rnb" | "rock";
export type ArtKind = "rings" | "stripes" | "grid" | "sun" | "dots" | "checker";

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: GenreKey;
  /** seconds */
  length: number;
  /** weekly streams, in thousands */
  base: number;
  /** oklch hues of the generated cover */
  h1: number;
  h2: number;
  art: ArtKind;
}

export interface RankedTrack extends Track {
  genreName: string;
  streams: number;
  prevStreams: number;
  rank: number;
  /** positions gained (+) or lost (-) since the previous period, or "new" in the top 10 */
  trend: number | "new";
}

export interface GenreShare {
  key: GenreKey;
  name: string;
  streams: number;
  share: number;
}

export interface ArtistStat {
  name: string;
  streams: number;
  tracks: number;
  h1: number;
  h2: number;
  initials: string;
  /** 0-100, relative to the top artist */
  width: number;
}

export interface Kpi {
  id: "streams" | "listeners" | "hours" | "genre";
  label: string;
  icon: IconName;
  /** integer and decimal digit, split so CSS counters can animate them */
  n: number;
  f: number;
  suffix: string;
  /** plain text version, for screen readers */
  text: string;
  delta: number;
  deltaUnit: string;
  foot: string;
  spark: number[];
}

export interface Bucket {
  label: string;
  value: number;
  /** 0-100, relative to the busiest bucket */
  height: number;
}

export interface HeatCell {
  /** 0-1 */
  level: number;
  day: string;
  hour: number;
}

export interface PeriodView {
  key: PeriodKey;
  label: string;
  prev: string;
  top: RankedTrack[];
  all: RankedTrack[];
  kpis: Kpi[];
  genres: GenreShare[];
  artists: ArtistStat[];
  buckets: { rows: Bucket[]; peak: number };
  heat: HeatCell[];
}
