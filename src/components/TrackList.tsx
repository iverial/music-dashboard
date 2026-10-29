"use client";

import { useEffect, useState } from "react";
import type { RankedTrack } from "@/data/types";
import { cssVars } from "@/lib/css";
import { compact, duration } from "@/lib/format";
import { Cover } from "./Cover";
import { Icon } from "./Icon";

interface TrackListProps {
  tracks: RankedTrack[];
  periodLabel: string;
  currentId: string;
  playing: boolean;
  query: string;
  onSelect: (id: string) => void;
}

function Trend({ trend }: { trend: RankedTrack["trend"] }) {
  if (trend === "new") return <span className="trend trend--new">NEW</span>;
  if (trend === 0) return <span className="trend" aria-label="No change">–</span>;
  const up = trend > 0;
  return (
    <span className={up ? "trend trend--up" : "trend trend--down"} aria-label={`${up ? "Up" : "Down"} ${Math.abs(trend)}`}>
      <Icon name={up ? "up" : "down"} />
      {Math.abs(trend)}
    </span>
  );
}

export function TrackList({ tracks, periodLabel, currentId, playing, query, onSelect }: TrackListProps) {
  // the slide-in only runs on first paint; later reorders are handled by View Transitions
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const needle = query.trim().toLowerCase();
  const matches = (track: RankedTrack) =>
    !needle || track.title.toLowerCase().includes(needle) || track.artist.toLowerCase().includes(needle);
  const visible = tracks.filter(matches).length;
  const maxStreams = tracks[0].streams;

  return (
    <article className="card tracks" id="tracks" aria-labelledby="tracks-title">
      <header className="card__head">
        <h2 id="tracks-title">Top 10</h2>
        <span className="muted">Ranked by streams {periodLabel}</span>
      </header>

      <div className="tracks__head" aria-hidden="true">
        <span>#</span>
        <span />
        <span>Title</span>
        <span>Popularity</span>
        <span>Streams</span>
        <span>Move</span>
        <span>Time</span>
      </div>

      <ol className={entering ? "tracks__list is-enter" : "tracks__list"}>
        {tracks.map((track, index) => {
          const isCurrent = track.id === currentId;
          const label = isCurrent && playing ? "Pause" : "Play";
          return (
            <li
              key={track.id}
              className={isCurrent ? "track is-current" : "track"}
              data-rank={track.rank}
              hidden={!matches(track)}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => onSelect(track.id)}
              style={cssVars({ "--i": index, "--vt": `row-${track.id}` })}
            >
              <span className="track__rank">
                <span className="track__num">{track.rank}</span>
                <button className="track__play" type="button" aria-label={`${label} ${track.title} by ${track.artist}`}>
                  <Icon name="play" className="i-play" />
                  <Icon name="pause" className="i-pause" />
                </button>
                <span className="eq" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <Cover art={track.art} h1={track.h1} h2={track.h2} />
              <span className="track__meta">
                <strong className="track__title">{track.title}</strong>
                <span className="track__artist">{track.artist}</span>
              </span>
              <span className="track__bar" aria-hidden="true">
                <span style={cssVars({ "--w": Math.round((track.streams / maxStreams) * 100) })} />
              </span>
              <span className="track__streams">{compact(track.streams)}</span>
              <Trend trend={track.trend} />
              <span className="track__time">{duration(track.length)}</span>
            </li>
          );
        })}
      </ol>

      {visible === 0 && <p className="tracks__empty">No tracks match “{query.trim()}”.</p>}
    </article>
  );
}
