import type { Kpi, PeriodKey } from "@/data/types";
import { cssVars } from "@/lib/css";
import { Icon } from "./Icon";

interface KpisProps {
  kpis: Kpi[];
  periodKey: PeriodKey;
}

export function Kpis({ kpis, periodKey }: KpisProps) {
  return (
    <div className="kpis rise" style={cssVars({ "--d": 4 })}>
      {kpis.map((kpi) => {
        const up = kpi.delta >= 0;
        return (
          // the period in the key remounts the card, which replays the count-up
          <article className="card kpi" key={`${periodKey}-${kpi.id}`} aria-label={kpi.label}>
            <div className="kpi__top">
              <span className="kpi__icon">
                <Icon name={kpi.icon} />
              </span>
              <div className="spark" aria-hidden="true">
                {kpi.spark.map((value, index) => (
                  <i key={index} style={cssVars({ "--v": value })} />
                ))}
              </div>
            </div>
            <p className="kpi__label">{kpi.label}</p>
            <p className="kpi__value">
              <span
                className={kpi.suffix === "%" ? "count count--int" : "count"}
                data-suffix={kpi.suffix}
                style={cssVars({ "--n": kpi.n, "--f": kpi.f })}
                aria-hidden="true"
              />
              <span className="sr-only">{kpi.text}</span>
            </p>
            <p className="kpi__foot">
              <span className={up ? "delta is-up" : "delta is-down"}>
                <Icon name={up ? "up" : "down"} />
                {Math.abs(kpi.delta).toFixed(1)}
                {kpi.deltaUnit}
              </span>
              {kpi.foot}
            </p>
          </article>
        );
      })}
    </div>
  );
}
