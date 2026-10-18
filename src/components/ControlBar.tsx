// The persistent story control bar. Media controls are live only on story
// beats (where there is animation); everything else stays available always.

import type { ReactNode } from "react";
import type { Mode } from "../content/types";

export interface MediaControls {
  playing: boolean;
  t: number;
  duration: number;
  toggle: () => void;
  replay: () => void;
  seek: (t: number) => void;
  /** True while a freeze-frame is waiting; play then means "continue". */
  frozen: boolean;
}

interface Props {
  media?: MediaControls;
  slow: boolean;
  onSlow: () => void;
  canPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
  nextLabel: string;
  nextBlocked?: boolean;
  beatIndex: number;
  beatCount: number;
  mode: Mode;
  onMode: (m: Mode) => void;
  cinematic: boolean;
  onCinematic: () => void;
  onTranscript: () => void;
  onContext: () => void;
  /** The music switch, supplied by the day player. */
  soundSlot?: ReactNode;
}

const fmt = (s: number) => `0:${Math.floor(s).toString().padStart(2, "0")}`;

export function ControlBar(p: Props) {
  const m = p.media;
  return (
    <div className="control-bar" role="toolbar" aria-label="Story controls">
      <div className="cb-group">
        <button className="icon-btn" onClick={p.onPrev} disabled={!p.canPrev} aria-label="Previous step" title="Previous step (←)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
          className="icon-btn"
          onClick={m?.toggle}
          disabled={!m}
          aria-label={m?.playing ? "Pause" : m?.frozen ? "Continue from freeze-frame" : "Play"}
          title={m ? "Play or pause (Space)" : "No animation on this step"}
        >
          {m?.playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" className="fill" /></svg>
          )}
        </button>
        <button className="icon-btn" onClick={m?.replay} disabled={!m} aria-label="Replay this sequence" title="Replay (R)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" /></svg>
        </button>
        <button
          className={`chip-btn ${p.slow ? "is-on" : ""}`}
          onClick={p.onSlow}
          aria-pressed={p.slow}
          title="Slow motion (S)"
        >
          {p.slow ? "Slow 0.35×" : "Speed 1×"}
        </button>
      </div>

      <div className="cb-progress">
        {m ? (
          <label className="scrub">
            <span className="visually-hidden">Position in this sequence</span>
            <input
              id="scrubber"
              type="range"
              min={0}
              max={m.duration}
              step={0.05}
              value={m.t}
              onChange={(e) => m.seek(parseFloat(e.target.value))}
            />
            <span className="scrub-time">
              {fmt(m.t)} / {fmt(m.duration)}
            </span>
          </label>
        ) : (
          <span className="scrub-time muted">No animation on this step</span>
        )}
        <span className="step-count">
          Step {p.beatIndex + 1} of {p.beatCount}
        </span>
      </div>

      <div className="cb-group cb-right">
        {p.soundSlot}
        <div className="segmented" role="radiogroup" aria-label="Audience">
          {(["explore", "deeper"] as Mode[]).map((mode) => (
            <button
              key={mode}
              role="radio"
              aria-checked={p.mode === mode}
              className={p.mode === mode ? "is-on" : ""}
              onClick={() => p.onMode(mode)}
            >
              {mode === "explore" ? "Explore" : "Go deeper"}
            </button>
          ))}
        </div>
        <button className={`chip-btn ${p.cinematic ? "" : "is-on"}`} onClick={p.onCinematic} aria-pressed={!p.cinematic} title="Turn animation off and read">
          {p.cinematic ? "Cinematic" : "Reading"}
        </button>
        <button className="chip-btn" onClick={p.onTranscript} title="Read the whole day as text (T)">
          Text
        </button>
        <button className="chip-btn" onClick={p.onContext} title="Context and sources (C)">
          Context
        </button>
        <button className={`next-btn ${p.nextBlocked ? "is-pending" : ""}`} onClick={p.onNext} title={p.nextBlocked ? "Reveal what happens" : "Next step (→)"}>
          {p.nextLabel}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
