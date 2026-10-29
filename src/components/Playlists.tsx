import { Cover } from "./Cover";
import type { ArtKind } from "@/data/types";

const PLAYLISTS: { name: string; songs: number; art: ArtKind; h1: number; h2: number }[] = [
  { name: "Late Night Drive", songs: 42, art: "rings", h1: 160, h2: 215 },
  { name: "Focus Flow", songs: 58, art: "stripes", h1: 295, h2: 250 },
  { name: "Sunday Slow", songs: 31, art: "sun", h1: 40, h2: 340 },
  { name: "Gym Pulse", songs: 64, art: "dots", h1: 95, h2: 145 },
];

/** Server component: static markup, zero client JavaScript */
export function Playlists() {
  return (
    <section className="playlists" aria-label="Playlists">
      <h2 className="eyebrow">Playlists</h2>
      <ul>
        {PLAYLISTS.map((playlist) => (
          <li key={playlist.name}>
            <Cover art={playlist.art} h1={playlist.h1} h2={playlist.h2} />
            <span>
              <b>{playlist.name}</b>
              <small>Playlist · {playlist.songs} songs</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
