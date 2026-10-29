"use client";

import { useRef, type PointerEvent } from "react";
import type { RankedTrack } from "@/data/types";
import { cssVars } from "@/lib/css";
import { compact, duration } from "@/lib/format";
import { Cover } from "./Cover";
import { Icon } from "./Icon";

interface HeroProps {
  track: RankedTrack;
  periodLabel: string;
  previousLabel: string;
  isCurrent: boolean;
  playing: boolean;
  onPlay: () => void;
}

export function Hero({ track, periodLabel, previousLabel, isCurrent, playing, onPlay }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const growth = (track.streams / track.prevStreams - 1) * 100;
  const up = growth >= 0;
  const showPause = isCurrent && playing;

  // 3D tilt: the pointer position becomes two variables, the transform is in hero.css
  function tilt(event: PointerEvent<HTMLElement>) {
    const stage = stageRef.current;
    if (!stage) return;
    const box = event.currentTarget.getBoundingClientRect();
    stage.style.setProperty("--rx", String(((event.clientX - box.left) / box.width - 0.5) * 2));
    stage.style.setProperty("--ry", String(((event.clientY - box.top) / box.height - 0.5) * 2));
  }

  function untilt() {
    stageRef.current?.style.setProperty("--rx", "0");
    stageRef.current?.style.setProperty("--ry", "0");
  }

  return (
    <section
      className={isCurrent ? "card card--glow hero rise is-current" : "card card--glow hero rise"}
      style={cssVars({ "--d": 2, "--h1": track.h1, "--h2": track.h2 })}
      aria-label="Number one track"
      onPointerMove={tilt}
      onPointerLeave={untilt}
    >
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__body" key={track.id}>
        <p className="eyebrow">
          <span className="pill">#1</span>
          Most streamed {periodLabel}
        </p>
        <h2 className="hero__title">{track.title}</h2>
        <p className="hero__artist">
          {track.artist} <span aria-hidden="true">·</span> {track.genreName}
        </p>
        <dl className="hero__stats">
          <div>
            <dt>Streams</dt>
            <dd>{compact(track.streams)}</dd>
          </div>
          <div>
            <dt>Vs {previousLabel}</dt>
            <dd className={up ? "is-up" : "is-down"}>
              <Icon name={up ? "up" : "down"} />
              {Math.abs(growth).toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{duration(track.length)}</dd>
          </div>
        </dl>
        <div className="hero__actions">
          <button className="btn btn--primary" type="button" onClick={onPlay}>
            <Icon name={showPause ? "pause" : "play"} />
            {showPause ? "Pause" : "Play"}
          </button>
          <label className="like">
            <input type="checkbox" aria-label={`Like ${track.title}`} />
            <Icon name="heart" />
          </label>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true" key={`${track.id}-art`}>
        <div className="hero__stage" ref={stageRef}>
          <div className="vinyl" />
          <Cover className="sleeve" art={track.art} h1={track.h1} h2={track.h2} />
        </div>
      </div>
    </section>
  );
}
