// The comparison: four questions, one at a time. Each question is asked
// first ("think before you look"), then its answer is revealed, with the
// tradition on the lamp side and the Marvel scenes on the film side.

import { useState } from "react";
import type { ComparisonBeat } from "../../content/types";
import { FilmIcon, KindTag, LampIcon } from "../Bits";
import type { Common } from "./common";

export function ComparisonView({ beat, c }: { beat: ComparisonBeat; c: Common }) {
  const [asked, setAsked] = useState(1);
  const [revealed, setRevealed] = useState(0);
  const last = beat.rows.length - 1;
  const waiting = revealed < asked;

  const advance = () => (waiting ? setRevealed((r) => r + 1) : setAsked((a) => a + 1));

  return (
    <>
      <div className="page-layout">
        <section className="text-page compare" aria-labelledby={`h-${beat.id}`}>
          <KindTag kind={beat.kind} />
          <h2 id={`h-${beat.id}`} className="beat-title">
            {beat.title}
          </h2>

          <ol className="compare-rows">
            {beat.rows.slice(0, asked).map((row, i) => (
              <li key={row.question} className={`compare-row ${i === last ? "is-aha" : ""}`}>
                <h3>
                  <span className="row-num">{i + 1}</span> {row.question}
                </h3>
                {i >= revealed ? (
                  <div className="ask-first">
                    <span className="callout-mark">Think first</span>
                    <p>{row.askFirst ?? "Say your answer out loud before you reveal it."}</p>
                  </div>
                ) : (
                  <>
                    <div className="compare-cols">
                      <div className="col-lamp">
                        <span className="col-mark">
                          <LampIcon /> The tradition
                        </span>
                        <p>{row.tradition}</p>
                        {row.traditionJump && (
                          <button className="link-btn" onClick={() => c.goTo(row.traditionJump!)}>
                            Back to this moment
                          </button>
                        )}
                      </div>
                      <div className="col-film">
                        <span className="col-mark">
                          <FilmIcon /> The Marvel scenes
                        </span>
                        {row.marvel.map((m) => (
                          <p key={m.who}>
                            <strong>{m.who}.</strong> {m.text}{" "}
                            {m.jumpTo && (
                              <button className="link-btn" onClick={() => c.goTo(m.jumpTo!)}>
                                Back to this moment
                              </button>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                    {c.mode === "deeper" && row.deep && <p className="deep-line">{row.deep}</p>}
                  </>
                )}
              </li>
            ))}
          </ol>

          {(waiting || asked <= last) && (
            <button className="btn-primary" onClick={advance}>
              {waiting ? "Reveal" : `Next question: ${beat.rows[asked].question}`}
            </button>
          )}
        </section>
      </div>
      {c.bar()}
    </>
  );
}
