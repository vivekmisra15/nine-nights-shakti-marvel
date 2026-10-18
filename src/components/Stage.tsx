// The illustrated stage. Draws the visual for the current time with a slow
// camera move, frames Marvel scenes as film, and overlays selectable hotspots,
// slow-motion and freeze-frame states.

import type { Hotspot } from "../content/types";
import { ease } from "../engine/anim";
import { Defs, H, W } from "../visuals/shared";
import { filmVisuals, visuals } from "../visuals";

interface StageProps {
  visual: string;
  t: number;
  duration?: number;
  label: string;
  frozen?: boolean;
  slowPrompt?: string | null;
  rate?: number;
  hotspots?: Hotspot[];
  activeHotspot?: string | null;
  onInspect?: (id: string) => void;
  /** Show all hotspots regardless of time (reading mode). */
  allHotspots?: boolean;
}

/** A gentle push-in across the beat: the camera drifts closer as the story builds. */
function camera(t: number, duration: number) {
  const p = ease(Math.min(1, t / Math.max(duration, 8)));
  const s = 1 + 0.07 * p;
  const dx = -18 * p;
  const dy = -10 * p;
  return `translate(${W / 2 + dx} ${H / 2 + dy}) scale(${s}) translate(${-W / 2} ${-H / 2})`;
}

export function Stage({ visual, t, duration = 12, label, frozen, slowPrompt, rate, hotspots, activeHotspot, onInspect, allHotspots }: StageProps) {
  const Draw = visuals[visual];
  const film = filmVisuals.has(visual);
  const visible = (hotspots ?? []).filter((h) => allHotspots || t >= (h.from ?? 0));

  return (
    <figure className={`stage ${film ? "stage-film" : "stage-lamp"} ${frozen ? "is-frozen" : ""}`}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <Defs />
        <g transform={camera(t, duration)}>
          {Draw ? <Draw t={t} /> : <rect width={W} height={H} fill="var(--night)" />}
          {visible.map((h, i) => (
            <g
              key={h.id}
              className={`hotspot ${activeHotspot === h.id ? "is-active" : ""}`}
              transform={`translate(${h.x} ${h.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Look closer: ${h.label}`}
              aria-pressed={activeHotspot === h.id}
              onClick={() => onInspect?.(h.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onInspect?.(h.id);
                }
              }}
            >
              <circle r={44} className="hotspot-hit" />
              <circle r={22} className="hotspot-ring" style={{ animationDelay: `${i * 0.3}s` }} />
              <circle r={7} className="hotspot-dot" />
              <text y={-36} textAnchor="middle" className="hotspot-label">
                {h.label}
              </text>
            </g>
          ))}
        </g>
        {film && (
          <g aria-hidden="true">
            <rect x={0} y={0} width={W} height={84} fill="var(--letterbox)" />
            <rect x={0} y={H - 84} width={W} height={84} fill="var(--letterbox)" />
          </g>
        )}
        {frozen && <rect className="freeze-flash" width={W} height={H} fill="var(--lamp)" aria-hidden="true" />}
      </svg>

      <figcaption className="stage-label">{label}</figcaption>

      {slowPrompt && !frozen && (
        <div className="stage-badge slow" aria-live="polite">
          <span className="badge-mark">Slow motion · {rate?.toFixed(2).replace(/0$/, "")}×</span>
          <span className="badge-text">{slowPrompt}</span>
        </div>
      )}
      {frozen && (
        <div className="stage-badge freeze" aria-hidden="true">
          <span className="badge-mark">Freeze-frame</span>
        </div>
      )}
    </figure>
  );
}
