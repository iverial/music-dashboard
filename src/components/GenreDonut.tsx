import type { GenreShare, PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";

interface GenreDonutProps {
  genres: GenreShare[];
  periodKey: PeriodKey;
}

/**
 * Each genre is its own full-circle conic-gradient that only paints its slice,
 * so slices can be dimmed or scaled independently from CSS (:has() on the legend).
 */
export function GenreDonut({ genres, periodKey }: GenreDonutProps) {
  const top = genres[0];
  const slices = genres.map((genre, index) => ({
    ...genre,
    start: genres.slice(0, index).reduce((total, item) => total + item.share, 0),
  }));

  return (
    <article className="card donut rise" style={cssVars({ "--d": 3 })} aria-labelledby="donut-title">
      <header className="card__head">
        <h2 id="donut-title">Genre mix</h2>
        <span className="muted">share of streams</span>
      </header>

      <div className="donut__body" key={periodKey}>
        <div className="donut__plot">
          <div className="donut__ring" aria-hidden="true">
            {slices.map((slice) => (
              <i
                key={slice.key}
                className="seg"
                data-g={slice.key}
                style={cssVars({ "--start": slice.start, "--len": slice.share, "--c": `var(--g-${slice.key})` })}
              />
            ))}
          </div>
          <div className="donut__center">
            <span
              className="count count--int"
              data-suffix="%"
              style={cssVars({ "--n": top.share })}
              aria-hidden="true"
            />
            <span className="muted">{top.name}</span>
          </div>
        </div>

        <ul className="donut__legend">
          {slices.map((slice) => (
            <li key={slice.key} data-g={slice.key} style={cssVars({ "--c": `var(--g-${slice.key})` })}>
              <i aria-hidden="true" />
              <span>{slice.name}</span>
              <b>{slice.share}%</b>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
