import type { RankedTrack } from "@/data/types";
import { cssVars } from "@/lib/css";

interface TickerProps {
  tracks: RankedTrack[];
}

/** The list is rendered twice so the CSS marquee can loop at -50% without a jump */
export function Ticker({ tracks }: TickerProps) {
  return (
    <div className="ticker rise" style={cssVars({ "--d": 1 })} aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <div className="ticker__group" key={copy}>
            {tracks.map((track) => (
              <span className="ticker__item" key={track.id}>
                <b>#{track.rank}</b>
                <span>{track.title}</span>
                {track.artist}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
