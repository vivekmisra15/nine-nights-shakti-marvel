// The doorway into a Marvel scene: which film, what has happened so far,
// what to watch for, and where to find the scene yourself.

import type { SceneIntroBeat } from "../../content/types";
import { FilmIcon, SourceLine } from "../Bits";
import { FindSceneCard } from "../FindScene";
import type { Common } from "./common";

export function SceneIntroView({ beat, c }: { beat: SceneIntroBeat; c: Common }) {
  return (
    <>
      <div className="page-layout">
        <section className="text-page film-page" aria-labelledby={`h-${beat.id}`}>
          <span className="eyebrow film">
            <FilmIcon /> {beat.role === "primary" ? "Marvel scene one" : "Marvel scene two"}
          </span>
          <div className="film-slate">
            <div className="slate-reel" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} style={{ ["--i" as string]: i }} />
              ))}
            </div>
            <p className="slate-film">
              {beat.film} <span>({beat.year})</span>
            </p>
            <h2 id={`h-${beat.id}`} className="beat-title">
              {beat.title}
            </h2>
            <p className="role-note">{beat.roleNote}</p>
            <dl className="slate-grid">
              <div>
                <dt>Character</dt>
                <dd>{beat.character}</dd>
              </div>
              <div>
                <dt>Scene</dt>
                <dd>{beat.scene}</dd>
              </div>
            </dl>
          </div>

          <div className="two-col">
            <div className="layer">
              <span className="layer-mark">What has happened so far</span>
              <p className="lead">{beat.context}</p>
            </div>
            <div className="layer watch-for">
              <span className="layer-mark">Watch for</span>
              <ul>
                {beat.watchFor.map((w, i) => (
                  <li key={w} style={{ ["--i" as string]: i }}>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {beat.parentNote && (
            <details className="parent-note" open>
              <summary>For the parent</summary>
              <p>{beat.parentNote}</p>
            </details>
          )}

          {beat.find && <FindSceneCard film={beat.film} year={beat.year} rating={beat.rating} find={beat.find} />}

          <p className="small muted">
            <FilmIcon /> The next steps retell the scene in words and pictures, so you can follow it without watching.
          </p>
          <SourceLine sources={beat.sources} />
        </section>
      </div>
      {c.bar(undefined, { nextLabel: "Enter the scene" })}
    </>
  );
}
