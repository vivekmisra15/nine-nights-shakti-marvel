// The spiritual idea, revealed in three layers after the story has been lived:
// the simple idea, the deeper insight, and exactly which moments support it.

import { useEffect, useState } from "react";
import { narrator } from "../../audio/speech";
import type { IdeaBeat } from "../../content/types";
import { KindTag } from "../Bits";
import type { Common } from "./common";

export function IdeaView({ beat, c }: { beat: IdeaBeat; c: Common }) {
  const [layer, setLayer] = useState(c.mode === "deeper" ? 1 : 0);
  const more = () => setLayer((l) => Math.min(3, l + 1));
  const labels = ["Go further", "Where does this come from?", "How do people read it?"];

  useEffect(() => {
    if (c.readAloud) narrator.speak(`${c.theme}. ${beat.simple}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (c.readAloud && layer === 1) narrator.speak(beat.deeper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer]);

  return (
    <>
      <div className="page-layout">
        <section className="text-page idea" aria-labelledby={`h-${beat.id}`}>
          <span className="eyebrow">What the story is about</span>
          <p className="idea-theme">
            <span>Night {c.day}</span> {c.theme}
          </p>
          <h2 id={`h-${beat.id}`} className="idea-simple">
            {beat.simple}
          </h2>

          {layer >= 1 && (
            <div className="layer">
              <span className="layer-mark">The deeper insight</span>
              <p className="lead">{beat.deeper}</p>
            </div>
          )}

          {layer >= 2 && (
            <div className="layer">
              <span className="layer-mark">Where it comes from in the story</span>
              <ol className="connections">
                {beat.connections.map((k) => (
                  <li key={k.event}>
                    <p className="conn-event">{k.event}</p>
                    <p className="conn-meaning">{k.meaning}</p>
                    {k.jumpTo && (
                      <button className="link-btn" onClick={() => c.goTo(k.jumpTo!)}>
                        Revisit this moment
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {layer >= 3 && (
            <div className="layer">
              <span className="layer-mark">Three kinds of claim</span>
              <div className="readings">
                {beat.readings.map((r) => (
                  <div key={r.label} className="reading">
                    <KindTag kind={r.kind} />
                    <h3>{r.label}</h3>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
              <p className="invite">{beat.invite}</p>
            </div>
          )}

          {layer < 3 && (
            <button className="btn-primary" onClick={more}>
              {labels[layer]}
            </button>
          )}
        </section>
      </div>
      {c.bar()}
    </>
  );
}
