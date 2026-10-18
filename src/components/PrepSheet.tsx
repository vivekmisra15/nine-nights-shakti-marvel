// The parent prep sheet: every Marvel scene in the nine nights on one page,
// with where to find it, what to search for, its age rating and whether to
// preview it first. Ticks are saved in this browser only. Prints cleanly.

import { useState } from "react";
import { days, stops } from "../content/journey";
import type { SceneIntroBeat } from "../content/types";
import type { Evening } from "../state/progress";
import { eveningLabel } from "../content/paths";
import { FilmIcon } from "./Bits";

const KEY = "nine-nights-prep-v1";

function loadTicks(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

function CopyPhrase({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="find-search">
      <code>{text}</code>
      <button
        className="chip-btn no-print"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          } catch {
            // Clipboard blocked: the phrase is on screen to type.
          }
        }}
        aria-label={`Copy the search phrase: ${text}`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}

export function PrepSheet({ evening, onBack }: { evening: Evening; onBack: () => void }) {
  const [onlyShort, setOnlyShort] = useState(evening === "short");
  const [ticks, setTicks] = useState<Record<string, boolean>>(loadTicks);

  const toggle = (id: string) =>
    setTicks((t) => {
      const next = { ...t, [id]: !t[id] };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Not saved, but still works for this visit.
      }
      return next;
    });

  const nights = stops.map((stop) => {
    const day = days[stop.day];
    const scenes = (day?.beats.filter((b) => b.type === "sceneIntro") ?? []) as SceneIntroBeat[];
    return { stop, scenes: onlyShort ? scenes.filter((s) => s.role === "primary") : scenes };
  });
  const all = nights.flatMap((n) => n.scenes);
  const ready = all.filter((s) => ticks[s.id]).length;
  const preview = all.filter((s) => s.parentNote).length;

  return (
    <div className="prep-screen">
      <header className="prep-head">
        <button className="back-btn no-print" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Nine nights
        </button>
        <p className="eyebrow">For the parent</p>
        <h1>Prep sheet: the Marvel scenes</h1>
        <p className="lead">
          Every scene the nine nights use, in order. Find each one on Disney+, where the films and series are, or look for an official clip on YouTube. The app retells each scene, so watching is optional.
        </p>
        <div className="prep-tools no-print">
          <div className="seg" role="radiogroup" aria-label="Which scenes to show">
            <button role="radio" aria-checked={!onlyShort} className={!onlyShort ? "is-on" : ""} onClick={() => setOnlyShort(false)}>
              All {nights.reduce((n, x) => n + (days[x.stop.day]?.beats.filter((b) => b.type === "sceneIntro").length ?? 0), 0)} scenes ({eveningLabel.full.name.toLowerCase()})
            </button>
            <button role="radio" aria-checked={onlyShort} className={onlyShort ? "is-on" : ""} onClick={() => setOnlyShort(true)}>
              Scene one only ({eveningLabel.short.name.toLowerCase()})
            </button>
          </div>
          <button className="btn-quiet" onClick={() => window.print()}>
            Print
          </button>
        </div>
        <p className="small muted">
          {ready} of {all.length} ready · {preview} marked "preview first" · Ratings are the US ratings; your country's may differ.
        </p>
      </header>

      <ol className="prep-nights">
        {nights.map(({ stop, scenes }) => (
          <li key={stop.day} className="prep-night">
            <div className="prep-night-head">
              <span className="day-num">Night {stop.day}</span>
              <h2>{stop.name}</h2>
              <span className="stop-theme">{stop.theme}</span>
            </div>
            {scenes.map((s) => (
              <article key={s.id} className={`prep-scene ${ticks[s.id] ? "is-ready" : ""}`}>
                <label className="prep-tick">
                  <input type="checkbox" checked={!!ticks[s.id]} onChange={() => toggle(s.id)} />
                  <span>{ticks[s.id] ? "Ready" : "Found and previewed?"}</span>
                </label>
                <div className="prep-scene-body">
                  <p className="prep-role">
                    <FilmIcon /> {s.role === "primary" ? "Scene one" : "Scene two"}
                    {s.role === "primary" && <span className="prep-badge short">Short evening</span>}
                    {s.parentNote && <span className="prep-badge warn">Preview first</span>}
                    {s.rating && <span className="prep-badge">{s.rating}</span>}
                  </p>
                  <h3>
                    {s.film} <span>({s.year})</span>
                  </h3>
                  <p className="prep-scene-what">{s.scene}</p>
                  {s.find && (
                    <>
                      <p>
                        <span className="find-label">Where it is</span> {s.find.where}
                      </p>
                      <p>
                        <span className="find-label">Search for</span> <CopyPhrase text={s.find.search} />
                      </p>
                    </>
                  )}
                  {s.parentNote && <p className="prep-note">{s.parentNote}</p>}
                </div>
              </article>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
