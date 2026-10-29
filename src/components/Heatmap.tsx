import { Fragment } from "react";
import type { HeatCell, PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";

interface HeatmapProps {
  cells: HeatCell[];
  periodKey: PeriodKey;
}

const HOUR_LABELS = ["0h", "6h", "12h", "18h"];

export function Heatmap({ cells, periodKey }: HeatmapProps) {
  const days = Array.from({ length: 7 }, (_, day) => cells.slice(day * 24, day * 24 + 24));
  const busiest = cells.reduce((best, cell) => (cell.level > best.level ? cell : best), cells[0]);

  return (
    <article className="card heat reveal" aria-labelledby="heat-title">
      <header className="card__head">
        <h2 id="heat-title">When you listen</h2>
        <span className="muted">weekday × hour</span>
      </header>

      <div
        className="heat__grid"
        key={periodKey}
        role="img"
        aria-label={`Listening heatmap by weekday and hour. Busiest slot: ${busiest.day} around ${busiest.hour}:00.`}
      >
        {days.map((row, day) => (
          <Fragment key={row[0].day}>
            <span className="heat__day">{row[0].day}</span>
            {row.map((cell) => (
              <i
                key={cell.hour}
                className="heat__cell"
                title={`${cell.day} ${cell.hour}:00 · ${Math.round(cell.level * 100)}% of peak`}
                style={cssVars({ "--l": cell.level, "--i": day * 24 + cell.hour })}
              />
            ))}
          </Fragment>
        ))}

        <span />
        {HOUR_LABELS.map((label) => (
          <span className="heat__hour" key={label} style={{ gridColumn: "span 6" }}>
            {label}
          </span>
        ))}
      </div>

      <div className="heat__scale" aria-hidden="true">
        <span>Quiet</span>
        <i />
        <span>Busy</span>
      </div>
    </article>
  );
}
