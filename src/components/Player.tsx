"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import type { RankedTrack } from "@/data/types";
import { cssVars } from "@/lib/css";
import { duration } from "@/lib/format";
import { Cover } from "./Cover";
import { Icon } from "./Icon";

// the player starts a bit into the first track so the progress bar is not empty
const START_AT = 56;

interface PlayerProps {
  track: RankedTrack;
  playing: boolean;
  shuffle: boolean;
  repeat: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onEnded: () => void;
}

/** Visual only: there is no audio, the clock just advances while "playing" */
export function Player({ track, playing, shuffle, repeat, onToggle, onPrev, onNext, onShuffle, onRepeat, onEnded }: PlayerProps) {
  // The clock remembers which track it belongs to, so changing track resets it
  // without needing an effect that calls setState.
  const [clock, setClock] = useState({ id: track.id, seconds: START_AT });
  const elapsed = Math.min(clock.id === track.id ? clock.seconds : 0, track.length);
  const finished = (clock.id === track.id ? clock.seconds : 0) >= track.length;

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      setClock((previous) => {
        const next = (previous.id === track.id ? previous.seconds : 0) + delta;
        return { id: track.id, seconds: next >= track.length && repeat ? 0 : next };
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [playing, repeat, track.id, track.length]);

  useEffect(() => {
    if (finished) onEnded();
  }, [finished, onEnded]);

  const position = Math.round((elapsed / track.length) * 1000);

  function seek(event: ChangeEvent<HTMLInputElement>) {
    setClock({ id: track.id, seconds: (Number(event.target.value) / 1000) * track.length });
  }

  return (
    <section className="player" aria-label="Music player (visual only)">
      <div className="player__track">
        <Cover art={track.art} h1={track.h1} h2={track.h2} />
        <div className="player__meta">
          <strong>{track.title}</strong>
          <span>{track.artist}</span>
        </div>
        <label className="like like--sm">
          <input type="checkbox" aria-label={`Like ${track.title}`} />
          <Icon name="heart" />
        </label>
      </div>

      <div className="player__center">
        <div className="player__controls">
          <button className="icon-btn icon-btn--aux" type="button" aria-pressed={shuffle} aria-label="Shuffle" onClick={onShuffle}>
            <Icon name="shuffle" />
          </button>
          <button className="icon-btn" type="button" aria-label="Previous track" onClick={onPrev}>
            <Icon name="prev" />
          </button>
          <button className="play-btn" type="button" aria-label={playing ? "Pause" : "Play"} onClick={onToggle}>
            <Icon name="play" className="i-play" />
            <Icon name="pause" className="i-pause" />
          </button>
          <button className="icon-btn" type="button" aria-label="Next track" onClick={onNext}>
            <Icon name="next" />
          </button>
          <button className="icon-btn icon-btn--aux" type="button" aria-pressed={repeat} aria-label="Repeat" onClick={onRepeat}>
            <Icon name="repeat" />
          </button>
        </div>

        <div className="player__scrub">
          <time>{duration(elapsed)}</time>
          <input
            className="range"
            type="range"
            min={0}
            max={1000}
            value={position}
            onChange={seek}
            style={cssVars({ "--p": `${position / 10}%` })}
            aria-label="Seek"
            aria-valuetext={`${duration(elapsed)} of ${duration(track.length)}`}
          />
          <time>{duration(track.length)}</time>
        </div>
      </div>

      <div className="player__side">
        <span className="player__hint">Visual only · no audio</span>
        <span className="eq eq--lg" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    </section>
  );
}
