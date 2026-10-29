import { Fragment } from "react";
import type { PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";

interface HeatmapProps {
  /** 7 days x 24 hours, 0-1, Monday first */
  levels: number[];
  periodKey: PeriodKey;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOUR_LABELS = ["0h", "6h", "12h", "18h"];

export function Heatmap({ levels, periodKey }: HeatmapProps) {
  const busiest = levels.indexOf(Math.max(...levels));

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
        aria-label={`Listening heatmap by weekday and hour. Busiest slot: ${DAYS[Math.floor(busiest / 24)]} around ${busiest % 24}:00.`}
      >
        {DAYS.map((day, dayIndex) => (
          <Fragment key={day}>
            <span className="heat__day">{day}</span>
            {levels.slice(dayIndex * 24, dayIndex * 24 + 24).map((level, hour) => (
              <i key={hour} className="heat__cell" style={cssVars({ "--l": level })} />
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
