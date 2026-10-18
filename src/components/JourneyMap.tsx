// The nine-night map: a path of lamps through the night. Lit lamps are
// finished nights, and the path glows as far as you have travelled.
// This is a journey, not a scoreboard.

import { useEffect, useState } from "react";
import { sound } from "../audio/sound";
import { SoundToggle } from "./SoundToggle";
import { stops } from "../content/journey";
import type { Evening, Progress } from "../state/progress";
import { eveningLabel } from "../content/paths";
import { SayName } from "./SayName";

// Positions along the path, as percentages of the map box.
const POS = [
  { x: 6, y: 72 },
  { x: 17, y: 46 },
  { x: 29, y: 64 },
  { x: 41, y: 36 },
  { x: 52, y: 58 },
  { x: 63, y: 30 },
  { x: 74, y: 52 },
  { x: 85, y: 26 },
  { x: 94, y: 48 },
];

const pathThrough = (count: number) => {
  const pts = POS.slice(0, count).map((p) => [p.x * 12, p.y * 4.2]);
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
  }
  return d;
};

const FULL = pathThrough(9);

interface Props {
  soundOn: boolean;
  volume: number;
  setSound: (on: boolean) => void;
  setVolume: (v: number) => void;
  title: string;
  progress: Progress;
  justLit: number | null;
  onEnter: (day: number) => void;
  onReplayIntro: () => void;
  onReset: () => void;
  evening: Evening;
  setEvening: (e: Evening) => void;
  onPrep: () => void;
}

export function JourneyMap({ title, progress, justLit, onEnter, onReplayIntro, onReset, soundOn, volume, setSound, setVolume, evening, setEvening, onPrep }: Props) {
  // A temple bell when a lamp is lit.
  useEffect(() => {
    if (justLit === null) return;
    sound.hit("bell");
    const id = window.setTimeout(() => sound.hit("shimmer"), 700);
    return () => window.clearTimeout(id);
  }, [justLit]);

  const firstOpen = stops.find((s) => s.built && !progress.days[s.day]?.completed)?.day ?? 1;
  const [selected, setSelected] = useState(justLit && stops[justLit]?.built ? justLit + 1 : firstOpen);
  const [confirmReset, setConfirmReset] = useState(false);
  const stop = stops[selected - 1];
  const dp = progress.days[selected];

  // The glowing path runs through every completed night in a row from night 1.
  let lit = 0;
  while (lit < stops.length && progress.days[lit + 1]?.completed) lit++;
  const litPath = pathThrough(Math.min(9, lit + (lit > 0 ? 1 : 0)));

  const status = (day: number, built: boolean) => {
    const d = progress.days[day];
    if (!built) return "coming";
    if (d?.completed) return "complete";
    if (d?.visited) return "visited";
    return "open";
  };

  const statusText: Record<string, string> = {
    coming: "Being written",
    complete: "Lamp lit",
    visited: "In progress",
    open: "Ready",
  };

  const [name, ...rest] = title.split(" – ");

  return (
    <div className="map-screen">
      <header className="map-head">
        <p className="eyebrow">An interactive journey through Navaratri</p>
        <h1 className="map-title">
          {name}
          {rest.length > 0 && <span className="map-title-sub"> – {rest.join(" – ")}</span>}
        </h1>
        <p className="map-sub">What is power for? Each night asks it differently.</p>
        <div className="map-sound">
          <SoundToggle on={soundOn} volume={volume} onToggle={setSound} onVolume={setVolume} />
          <button className="chip-btn prep-btn" onClick={onPrep}>
            Parent prep sheet
          </button>
        </div>
      </header>

      <div className="map-box">
        <svg className="map-path" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
          <path d={FULL} fill="none" stroke="var(--path)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {litPath && <path className="lit-path" d={litPath} fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} />}
        </svg>
        <ol className="stops">
          {stops.map((s, i) => {
            const st = status(s.day, s.built);
            return (
              <li
                key={s.day}
                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%`, ["--i" as string]: i }}
                className={`stop stop-${st} ${selected === s.day ? "is-selected" : ""} ${justLit === s.day ? "just-lit" : ""}`}
              >
                <button onClick={() => setSelected(s.day)} aria-pressed={selected === s.day} aria-label={`Night ${s.day}, ${s.name}. ${statusText[st]}.`}>
                  <span className="lamp" aria-hidden="true" />
                  <span className="stop-num">{s.day}</span>
                  <span className="stop-name">{s.name}</span>
                  <span className="stop-theme-mini">{s.theme}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <section className="stop-detail" aria-live="polite" key={stop.day}>
        <div className="stop-detail-head">
          <span className="day-num">Night {stop.day}</span>
          <span className="stop-dev" lang="sa">
            {stop.devanagari}
          </span>
          <h2>{stop.name}</h2>
          <span className="stop-theme">{stop.theme}</span>
          <SayName name={stop.name} devanagari={stop.devanagari} say={stop.say} />
        </div>
        <p className="stop-question">{stop.question}</p>
        {stop.built && (
          <div className="evening-choice" role="radiogroup" aria-label="How long is tonight?">
            {(["full", "short"] as Evening[]).map((e) => (
              <button key={e} role="radio" aria-checked={evening === e} className={`evening-opt ${evening === e ? "is-on" : ""}`} onClick={() => setEvening(e)}>
                <strong>{eveningLabel[e].name}</strong>
                <span>{eveningLabel[e].time}</span>
                <small>{e === "full" ? "Both Marvel scenes, side by side, and in your world" : "The story, the core idea, one Marvel scene and the reflection"}</small>
              </button>
            ))}
          </div>
        )}
        {stop.built ? (
          <div className="btn-row">
            <button className="btn-primary big" onClick={() => onEnter(stop.day)}>
              {dp?.completed ? "Revisit this night" : dp?.visited ? "Continue this night" : "Enter this night"}
            </button>
            {dp?.visited && !dp.completed && <span className="small muted">You reached step {dp.furthest + 1}.</span>}
            {justLit === stop.day - 1 && <span className="small muted">Night {stop.day - 1}'s lamp is lit.</span>}
          </div>
        ) : (
          <p className="dev-note" role="note">
            <strong>Being written.</strong> This night's story, scenes and questions are drafted in the V2 learning plan and will be built next.
          </p>
        )}
      </section>

      <footer className="map-foot">
        <p className="small muted">After the ninth night comes Vijayadashami, the day of victory.</p>
        <div className="btn-row">
          <button className="link-btn" onClick={onPrep}>
            Parent prep sheet
          </button>
          <button className="link-btn" onClick={onReplayIntro}>
            Watch the opening again
          </button>
          {!confirmReset ? (
            <button className="link-btn" onClick={() => setConfirmReset(true)}>
              Start over
            </button>
          ) : (
            <span className="small">
              Clear progress and notes on this device?{" "}
              <button className="link-btn" onClick={onReset}>
                Yes, clear
              </button>{" "}
              <button className="link-btn" onClick={() => setConfirmReset(false)}>
                Keep
              </button>
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
