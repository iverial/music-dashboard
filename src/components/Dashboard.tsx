"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { PeriodKey, PeriodView } from "@/data/types";
import { usePlayer } from "@/hooks/usePlayer";
import { withViewTransition } from "@/lib/viewTransition";
import { Artists } from "./Artists";
import { GenreDonut } from "./GenreDonut";
import { Heatmap } from "./Heatmap";
import { Hero } from "./Hero";
import { Kpis } from "./Kpis";
import { Player } from "./Player";
import { Sidebar } from "./Sidebar";
import { StreamsChart } from "./StreamsChart";
import { Ticker } from "./Ticker";
import { TrackList } from "./TrackList";
import { Topbar, type Accent } from "./Topbar";

interface DashboardProps {
  views: Record<PeriodKey, PeriodView>;
  /** Server Components passed in as slots, so they render on the server and ship no JS */
  playlists: ReactNode;
  about: ReactNode;
  footer: ReactNode;
}

export function Dashboard({ views, playlists, about, footer }: DashboardProps) {
  const [period, setPeriod] = useState<PeriodKey>("week");
  const [query, setQuery] = useState("");
  const [accent, setAccent] = useState<Accent>("green");

  const view = views[period];
  const top = view.all.slice(0, 10);
  const lookup = useMemo(() => new Map(views.week.all.map((track) => [track.id, track])), [views]);
  const player = usePlayer(top, lookup, views.week.all[0].id);

  // reordering the list inside a View Transition makes the rows glide to their new rank
  const changePeriod = (next: PeriodKey) => {
    if (next !== period) withViewTransition(() => setPeriod(next));
  };

  const hero = top[0];

  return (
    <div className={player.playing ? "app is-playing" : "app"} data-accent={accent}>
      <div className="shell">
        <Sidebar playlists={playlists} />

        <main className="main" id="main">
          <p className="demo-banner" role="note">
            <span className="demo-banner__dot" aria-hidden="true" />
            <span>
              <strong>Design demo.</strong> Not a real product: it monetizes nothing, plays no audio and is not affiliated with Spotify.
              Every artist, track and number is made up.
            </span>
          </p>

          <Topbar period={period} onPeriod={changePeriod} query={query} onQuery={setQuery} accent={accent} onAccent={setAccent} />

          <section className="intro rise" id="overview">
            <p className="eyebrow">Overview</p>
            <h1>
              Top tracks, <span className="shine">{view.label}</span>
            </h1>
            <p className="lead">The most played songs, ranked by streams, with how each one moved since the previous period.</p>
          </section>

          <Ticker tracks={top} />

          <div className="grid">
            <Hero
              track={hero}
              periodLabel={view.label}
              previousLabel={view.prev}
              isCurrent={player.current.id === hero.id}
              playing={player.playing}
              onPlay={() => player.select(hero.id)}
            />
            <GenreDonut genres={view.genres} periodKey={view.key} />
            <Kpis kpis={view.kpis} periodKey={view.key} />

            <TrackList
              tracks={top}
              periodLabel={view.label}
              currentId={player.current.id}
              playing={player.playing}
              query={query}
              onSelect={player.select}
            />

            <div className="stack">
              <Artists artists={view.artists} periodLabel={view.label} periodKey={view.key} />
              <Heatmap levels={view.heat} periodKey={view.key} />
            </div>

            <StreamsChart rows={view.buckets.rows} peak={view.buckets.peak} periodKey={view.key} />

            {about}
          </div>

          {footer}
        </main>
      </div>

      <Player
        track={player.current}
        playing={player.playing}
        shuffle={player.shuffle}
        repeat={player.repeat}
        onToggle={player.toggle}
        onPrev={player.prev}
        onNext={player.next}
        onShuffle={player.toggleShuffle}
        onRepeat={player.toggleRepeat}
        onEnded={player.next}
      />
    </div>
  );
}
