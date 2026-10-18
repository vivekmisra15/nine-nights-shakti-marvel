// The close of the day: questions to talk about, a private note, a takeaway,
// and a "finish" that the learner chooses. No score.

import { useEffect, useState } from "react";
import { narrator } from "../../audio/speech";
import type { ReflectionBeat } from "../../content/types";
import type { Common } from "./common";

export function ReflectionView({ beat, c }: { beat: ReflectionBeat; c: Common }) {
  const [other, setOther] = useState(false);
  const mine = c.mode === "deeper" ? beat.older : beat.younger;
  const theirs = c.mode === "deeper" ? beat.younger : beat.older;
  const done = c.dayProgress.completed;

  useEffect(() => {
    if (c.readAloud) narrator.speak(`${beat.both} And to carry with you: ${beat.takeaway}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page-layout">
        <section className="text-page reflect" aria-labelledby={`h-${beat.id}`}>
          <span className="eyebrow">Reflection</span>
          <h2 id={`h-${beat.id}`} className="beat-title">
            {beat.title}
          </h2>

          <div className="question-card big">
            <span className="callout-mark">To talk about together</span>
            <p>{beat.both}</p>
          </div>

          <div className="question-card">
            <span className="callout-mark">{c.mode === "deeper" ? "Go deeper" : "Explore"}</span>
            <p>{mine}</p>
          </div>
          <button className="link-btn" onClick={() => setOther((v) => !v)} aria-expanded={other}>
            {other ? "Hide" : "Show"} the {c.mode === "deeper" ? "Explore" : "Go deeper"} question
          </button>
          {other && (
            <div className="question-card quiet">
              <p>{theirs}</p>
            </div>
          )}

          <label className="note">
            <span className="layer-mark">Your thought (stays on this device)</span>
            <textarea
              id="day-note"
              rows={3}
              value={c.dayProgress.note}
              onChange={(e) => c.updateDay((d) => ({ ...d, note: e.target.value }))}
              placeholder="Write a sentence, or skip this."
            />
          </label>

          <div className="takeaway">
            <span className="layer-mark">To carry with you · {c.theme}</span>
            <p>{beat.takeaway}</p>
          </div>

          <button className="btn-primary" onClick={c.finish}>
            {done ? "Return to the nine nights" : `Finish Day ${c.day} and light the lamp`}
          </button>
        </section>
      </div>
      {c.bar(undefined, { nextLabel: "Finish", onNext: c.finish })}
    </>
  );
}
