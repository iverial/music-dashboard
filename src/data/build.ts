import { clamp, createRng, sum } from "@/lib/rng";
import { DAYS, GENRES, MONTHS, PERIODS, TRACKS } from "./catalog";
import type {
  ArtistStat,
  Bucket,
  GenreShare,
  HeatCell,
  Kpi,
  PeriodKey,
  PeriodView,
  RankedTrack,
  Track,
} from "./types";

/*
 * Turns the fictional catalogue into one view per period. Everything is derived
 * from seeded random numbers, so the server render and the client agree and the
 * charts are stable between reloads.
 */

const round1 = (value: number) => Math.round(value * 10) / 10;
const CATALOGUE_SCALE = 6; // the 14 tracks stand for a much bigger catalogue

function score(seed: number, factor: number) {
  const rand = createRng(seed);
  return TRACKS.map((track) => ({
    ...track,
    streams: Math.round(track.base * 1000 * factor * (0.72 + rand() * 0.56)),
  })).sort((a, b) => b.streams - a.streams);
}

/** Split a big number so CSS counters can animate "48.2M" as 48 . 2 + suffix */
function split(value: number) {
  const units: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (value >= size) {
      const scaled = value / size;
      const n = Math.floor(scaled);
      return { n, f: Math.floor((scaled - n) * 10), suffix, text: `${round1(scaled)}${suffix}` };
    }
  }
  return { n: Math.round(value), f: 0, suffix: "", text: String(Math.round(value)) };
}

function sparkline(rand: () => number, growth: number) {
  let value = 45;
  return Array.from({ length: 12 }, (_, index) => {
    value = clamp(value + (rand() - 0.5) * 28 + growth * 0.6, 18, 96);
    return Math.round(index === 11 ? Math.max(value, 55) : value);
  });
}

function genreShares(all: RankedTrack[]): GenreShare[] {
  const total = sum(all.map((track) => track.streams));
  const rows = GENRES.map((genre) => ({
    ...genre,
    streams: sum(all.filter((track) => track.genre === genre.key).map((track) => track.streams)),
  }))
    .filter((genre) => genre.streams > 0)
    .sort((a, b) => b.streams - a.streams)
    .map((genre) => ({ ...genre, share: Math.round((genre.streams / total) * 100) }));

  rows[0].share += 100 - sum(rows.map((row) => row.share)); // make the shares add up to 100
  return rows;
}

function topArtists(all: RankedTrack[]): ArtistStat[] {
  const byName = new Map<string, Omit<ArtistStat, "initials" | "width">>();
  for (const track of all) {
    const entry = byName.get(track.artist) ?? {
      name: track.artist,
      streams: 0,
      tracks: 0,
      h1: track.h1,
      h2: track.h2,
    };
    entry.streams += track.streams;
    entry.tracks += 1;
    byName.set(track.artist, entry);
  }

  const list = [...byName.values()].sort((a, b) => b.streams - a.streams).slice(0, 6);
  const max = list[0].streams;
  return list.map((artist) => ({
    ...artist,
    initials: artist.name
      .replace(/&/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase(),
    width: Math.round((artist.streams / max) * 100),
  }));
}

function streamsOverTime(key: PeriodKey, total: number, seed: number) {
  const rand = createRng(seed * 7);
  const count = PERIODS[key].buckets;

  const weight = (i: number) => {
    if (key === "week") return [0.86, 0.8, 0.9, 0.96, 1.12, 1.32, 1.2][i];
    if (key === "month") return 1 + 0.26 * Math.sin((i / 7) * Math.PI * 2 - 1) + (i / count) * 0.18;
    return 1 + 0.28 * Math.sin(((i - 2) / 12) * Math.PI * 2) + i * 0.025;
  };
  const label = (i: number) => (key === "week" ? DAYS[i] : key === "month" ? `Day ${i + 1}` : MONTHS[i]);

  const raw = Array.from({ length: count }, (_, i) => weight(i) * (0.82 + rand() * 0.36));
  const all = sum(raw);
  const values = raw.map((w) => Math.round((w / all) * total));
  const max = Math.max(...values);

  const rows: Bucket[] = values.map((value, i) => ({
    label: label(i),
    value,
    height: Math.max(7, Math.round((value / max) * 100)),
  }));
  return { rows, peak: values.indexOf(max) };
}

function listeningHeat(seed: number): HeatCell[] {
  const rand = createRng(seed * 13);

  const curve = (hour: number, weekend: boolean) => {
    const morning = weekend ? 0.34 * Math.exp(-((hour - 10.5) ** 2) / 8) : 0.55 * Math.exp(-((hour - 8.5) ** 2) / 5);
    const noon = 0.38 * Math.exp(-((hour - 13) ** 2) / 9);
    const night = (weekend ? 1.05 : 0.92) * Math.exp(-((hour - (weekend ? 21.5 : 20.5)) ** 2) / 10);
    return 0.07 + morning + noon + night;
  };

  const raw: number[] = [];
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      raw.push(curve(hour, day >= 5) * (0.8 + rand() * 0.4));
    }
  }
  const max = Math.max(...raw);

  return raw.map((value, index) => ({
    level: Math.round(clamp(value / max, 0.05, 1) * 100) / 100,
    day: DAYS[Math.floor(index / 24)],
    hour: index % 24,
  }));
}

function buildView(key: PeriodKey): PeriodView {
  const period = PERIODS[key];
  const now = score(period.seed, period.factor);
  const before = score(period.seed + 101, period.factor * 0.93);
  const previousRank = new Map(before.map((track, i) => [track.id, i + 1]));
  const previousStreams = new Map(before.map((track) => [track.id, track.streams]));
  const genreName = new Map(GENRES.map((genre) => [genre.key, genre.name]));

  const all: RankedTrack[] = now.map((track: Track & { streams: number }, i) => {
    const rank = i + 1;
    const was = previousRank.get(track.id) ?? rank;
    return {
      ...track,
      genreName: genreName.get(track.genre) ?? track.genre,
      rank,
      prevStreams: previousStreams.get(track.id) ?? track.streams,
      trend: was > 10 && rank <= 10 ? "new" : was - rank,
    };
  });

  const rand = createRng(period.seed * 3);
  const totalStreams = sum(all.map((track) => track.streams)) * CATALOGUE_SCALE;
  const previousTotal = sum(before.map((track) => track.streams)) * CATALOGUE_SCALE;
  const growth = round1((totalStreams / previousTotal - 1) * 100);
  const genres = genreShares(all);
  const genreDelta = round1((rand() - 0.35) * 4);
  const hours = sum(all.map((track) => (track.streams * track.length) / 3600)) * CATALOGUE_SCALE;
  const versus = `vs ${period.prev}`;

  const kpis: Kpi[] = [
    { id: "streams", label: "Total streams", icon: "headphones", ...split(totalStreams), delta: growth, deltaUnit: "%", foot: versus, spark: sparkline(rand, growth) },
    { id: "listeners", label: "Listeners", icon: "users", ...split(totalStreams / 5.4), delta: round1(growth * 0.6 + 0.8), deltaUnit: "%", foot: versus, spark: sparkline(rand, growth) },
    { id: "hours", label: "Hours listened", icon: "clock", ...split(hours), delta: round1(growth * 1.1 - 0.6), deltaUnit: "%", foot: versus, spark: sparkline(rand, growth) },
    { id: "genre", label: "Top genre", icon: "music", n: genres[0].share, f: 0, suffix: "%", text: `${genres[0].share}%`, delta: genreDelta, deltaUnit: " pts", foot: `${genres[0].name} share`, spark: sparkline(rand, genreDelta) },
  ];

  return {
    key,
    label: period.label,
    prev: period.prev,
    top: all.slice(0, 10),
    all,
    kpis,
    genres,
    artists: topArtists(all),
    buckets: streamsOverTime(key, totalStreams, period.seed),
    heat: listeningHeat(period.seed),
  };
}

export const VIEWS: Record<PeriodKey, PeriodView> = {
  week: buildView("week"),
  month: buildView("month"),
  year: buildView("year"),
};
