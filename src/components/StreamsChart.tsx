import type { Bucket, PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";
import { compact } from "@/lib/format";

interface StreamsChartProps {
  rows: Bucket[];
  peak: number;
  periodKey: PeriodKey;
}

export function StreamsChart({ rows, peak, periodKey }: StreamsChartProps) {
  const highest = rows[peak];
  const axis = [rows[0], rows[Math.floor(rows.length / 2)], rows[rows.length - 1]];

  return (
    <article className="card bars" id="trends" aria-labelledby="bars-title">
      <header className="card__head">
        <div>
          <h2 id="bars-title">Streams over time</h2>
          <p className="muted">
            Peak: {highest.label} · {compact(highest.value)} streams
          </p>
        </div>
        <span className="chip">
          <i aria-hidden="true" />
          Peak
        </span>
      </header>

      <div
        className="bars__plot"
        key={periodKey}
        role="img"
        aria-label={`Bar chart of streams. The busiest moment is ${highest.label} with ${compact(highest.value)} streams.`}
      >
        <div className="bars__cols" style={cssVars({ "--cols": rows.length })}>
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={index === peak ? "bar is-peak" : "bar"}
              data-tip={`${row.label} · ${compact(row.value)}`}
              style={cssVars({ "--h": row.height, "--i": index })}
            >
              <span />
            </div>
          ))}
        </div>
      </div>

      <div className="bars__axis" aria-hidden="true">
        {axis.map((row) => (
          <span key={row.label}>{row.label}</span>
        ))}
      </div>
    </article>
  );
}
