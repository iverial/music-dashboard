import type { ArtistStat, PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";
import { compact } from "@/lib/format";

interface ArtistsProps {
  artists: ArtistStat[];
  periodLabel: string;
  periodKey: PeriodKey;
}

export function Artists({ artists, periodLabel, periodKey }: ArtistsProps) {
  return (
    <article className="card artists reveal" id="artists" aria-labelledby="artists-title">
      <header className="card__head">
        <h2 id="artists-title">Top artists</h2>
        <span className="muted">{periodLabel}</span>
      </header>

      <ul className="artists__list" key={periodKey}>
        {artists.map((artist, index) => (
          <li className="artist" key={artist.name} style={cssVars({ "--i": index })}>
            <span className="artist__avatar" aria-hidden="true" style={cssVars({ "--h1": artist.h1, "--h2": artist.h2 })}>
              {artist.initials}
            </span>
            <span className="artist__meta">
              <strong>{artist.name}</strong>
              <span className="artist__bar" aria-hidden="true">
                <i style={cssVars({ "--w": artist.width })} />
              </span>
            </span>
            <span className="artist__streams">{compact(artist.streams)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
