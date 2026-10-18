// A present-day dilemma linked to the day's story. Choosing an option shows
// perspectives, not a verdict. Learners can try the other options too.

import { useState } from "react";
import type { TodayBeat } from "../../content/types";
import { KindTag } from "../Bits";
import type { Common } from "./common";

export function TodayView({ beat, c }: { beat: TodayBeat; c: Common }) {
  const [picked, setPicked] = useState<string | undefined>(c.dayProgress.today);
  const option = beat.options.find((o) => o.id === picked);

  const choose = (id: string) => {
    setPicked(id);
    c.updateDay((d) => ({ ...d, today: id }));
  };

  return (
    <>
      <div className="page-layout">
        <section className="text-page today" aria-labelledby={`h-${beat.id}`}>
          <KindTag kind={beat.kind} />
          <span className="eyebrow">Setting · {beat.setting}</span>
          <h2 id={`h-${beat.id}`} className="beat-title">
            {beat.title}
          </h2>
          <p className="lead">{beat.scenario}</p>
          {c.mode === "deeper" && beat.deep && <p className="deep-line">{beat.deep}</p>}

          <h3 className="prompt">{beat.prompt}</h3>
          <div className="options" role="group" aria-label="Your response">
            {beat.options.map((o, i) => (
              <button
                key={o.id}
                className={`option ${picked === o.id ? "is-chosen" : ""}`}
                style={{ ["--i" as string]: i }}
                onClick={() => choose(o.id)}
                aria-pressed={picked === o.id}
              >
                {o.label}
              </button>
            ))}
          </div>

          {option && (
            <div className="perspectives" aria-live="polite" key={option.id}>
              {option.perspectives.map((p, i) => (
                <div key={p.label} className="perspective" style={{ ["--i" as string]: i }}>
                  <span className="layer-mark">{p.label}</span>
                  <p>{p.text}</p>
                </div>
              ))}
              <p className="small muted">Try another option to see how the picture changes.</p>
            </div>
          )}

          {option && <p className="closing">{beat.closing}</p>}

          {option && beat.talk && (
            <div className="talk">
              <span className="layer-mark">Keep talking</span>
              <ul>
                {beat.talk.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
      {c.bar()}
    </>
  );
}
