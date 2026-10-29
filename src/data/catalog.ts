import type { GenreKey, PeriodKey, Track } from "./types";

/* Everything here is fictional: no real artists, tracks or numbers. */

export const GENRES: { key: GenreKey; name: string }[] = [
  { key: "pop", name: "Pop" },
  { key: "electronic", name: "Electronic" },
  { key: "latin", name: "Latin" },
  { key: "indie", name: "Indie" },
  { key: "rnb", name: "R&B" },
  { key: "rock", name: "Rock" },
];

export const TRACKS: Track[] = [
  { id: "t01", title: "Midnight Static", artist: "Luna Vega", genre: "pop", length: 201, base: 4820, h1: 160, h2: 215, art: "rings" },
  { id: "t02", title: "Golden Hour Drive", artist: "The Paper Suns", genre: "indie", length: 228, base: 4310, h1: 75, h2: 25, art: "sun" },
  { id: "t03", title: "Velvet Skyline", artist: "Kairo", genre: "rnb", length: 177, base: 3950, h1: 330, h2: 285, art: "stripes" },
  { id: "t04", title: "Echoes in Cobalt", artist: "Nova Lane", genre: "electronic", length: 245, base: 3720, h1: 250, h2: 210, art: "grid" },
  { id: "t05", title: "Paper Planes at Dawn", artist: "Mara Ibsen", genre: "indie", length: 213, base: 3380, h1: 40, h2: 340, art: "dots" },
  { id: "t06", title: "Satellite Heart", artist: "Orion & The Tides", genre: "pop", length: 192, base: 3100, h1: 295, h2: 250, art: "rings" },
  { id: "t07", title: "Low Tide Lullaby", artist: "Sable Moon", genre: "rnb", length: 260, base: 2870, h1: 210, h2: 265, art: "checker" },
  { id: "t08", title: "Chrome Hearts", artist: "DJ Halcyon", genre: "electronic", length: 169, base: 2650, h1: 120, h2: 175, art: "grid" },
  { id: "t09", title: "Afterglow Avenue", artist: "Jules Mercer", genre: "pop", length: 219, base: 2400, h1: 15, h2: 330, art: "sun" },
  { id: "t10", title: "Bossa for Rainy Days", artist: "Quinto Verde", genre: "latin", length: 185, base: 2210, h1: 95, h2: 145, art: "stripes" },
  { id: "t11", title: "Gravity Wells", artist: "Atlas Bloom", genre: "rock", length: 238, base: 1990, h1: 25, h2: 300, art: "checker" },
  { id: "t12", title: "Sunday Static", artist: "Pia Roldán", genre: "latin", length: 207, base: 1830, h1: 60, h2: 20, art: "dots" },
  { id: "t13", title: "Neon Cathedral", artist: "Vanta", genre: "electronic", length: 252, base: 1700, h1: 285, h2: 190, art: "rings" },
  { id: "t14", title: "Fireflies in July", artist: "The Paper Suns", genre: "indie", length: 224, base: 1560, h1: 130, h2: 85, art: "sun" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export const PERIODS: Record<PeriodKey, { label: string; prev: string; factor: number; seed: number; buckets: number }> = {
  week: { label: "this week", prev: "last week", factor: 1, seed: 11, buckets: 7 },
  month: { label: "this month", prev: "last month", factor: 4.3, seed: 23, buckets: 30 },
  year: { label: "this year", prev: "last year", factor: 52, seed: 37, buckets: 12 },
};
