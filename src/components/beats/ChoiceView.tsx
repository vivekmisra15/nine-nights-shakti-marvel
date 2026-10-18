// A decision point. The learner chooses first; the app acknowledges the
// reasoning without grading it, then reveals what the source actually says.
// Hypothetical branches are labelled as such.

import { useEffect, useRef, useState } from "react";
import type { ChoiceBeat } from "../../content/types";
import { sound } from "../../audio/sound";
import { KindTag, SourceLine } from "../Bits";
import { Stage } from "../Stage";
import { pick, type Common } from "./common";

type Step = "choose" | "chosen" | "revealed";

const EYEBROW = { should: "Decide", will: "Predict", weigh: "Weigh it up" } as const;
const VERB = { should: "You chose", will: "You predicted", weigh: "You weighed" } as const;
const REVEAL = { should: "See what the story says", will: "See what happens", weigh: "See what the story says" } as const;

export function ChoiceView({ beat, c }: { beat: ChoiceBeat; c: Common }) {
  const saved = c.dayProgress.choices[beat.id];
  const [step, setStep] = useState<Step>(saved ? "revealed" : "choose");
  const [showHypo, setShowHypo] = useState(false);
  const chosen = beat.options.find((o) => o.id === saved);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const ackRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);

  // Bring each new part into view as it appears (not on first load).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (step === "revealed") sound.hit(beat.section === "marvel" ? "shimmer" : "bellSoft");
    const el = step === "revealed" ? revealRef.current : ackRef.current;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step]);

  const choose = (id: string) => {
    c.updateDay((d) => ({ ...d, choices: { ...d.choices, [beat.id]: id } }));
    if (step === "choose") setStep("chosen");
  };

  return (
    <>
      <div className="story-layout">
        <Stage visual={beat.visual} t={beat.visualTime} duration={beat.visualTime + 2} label={beat.title} frozen />

        <section className="narration choice" aria-labelledby={`h-${beat.id}`}>
          <span className="eyebrow">{EYEBROW[beat.framing]}</span>
          <h2 id={`h-${beat.id}`} className="beat-title">
            {pick(c.mode, beat.prompt, beat.deepPrompt)}
          </h2>

          <div className="options" role="group" aria-label="Choices">
            {beat.options.map((o, i) => (
              <button
                key={o.id}
                className={`option ${saved === o.id ? "is-chosen" : ""}`}
                style={{ ["--i" as string]: i }}
                onClick={() => choose(o.id)}
                aria-pressed={saved === o.id}
              >
                {o.label}
              </button>
            ))}
          </div>

          {step === "choose" && (
            <p className="muted small">
              There is no score here.{" "}
              <button className="link-btn" onClick={() => setStep("revealed")}>
                Skip and show me what happens
              </button>
            </p>
          )}

          {chosen && step !== "choose" && (
            <div className="ack-wrap" ref={ackRef}>
              <div className="ack">
                <span className="callout-mark">
                  {VERB[beat.framing]}: {chosen.label.toLowerCase()}
                </span>
                <p>{chosen.reasoning}</p>
              </div>
              {step === "chosen" && (
                <button className="btn-primary" onClick={() => setStep("revealed")}>
                  {REVEAL[beat.framing]}
                </button>
              )}
            </div>
          )}

          {step === "revealed" && (
            <div className="reveal" ref={revealRef}>
              <KindTag kind={beat.kind} />
              <h3>{beat.reveal.title}</h3>
              <p>{beat.reveal.text}</p>
              {c.mode === "deeper" && beat.reveal.deep && <p className="deep-line">{beat.reveal.deep}</p>}
              <p className="why">
                <span className="callout-mark">Why it matters</span> {beat.reveal.why}
              </p>

              {beat.parentNote && (
                <details className="parent-note" open>
                  <summary>For the parent</summary>
                  <p>{beat.parentNote}</p>
                </details>
              )}

              {beat.hypothetical && (
                <div className="hypo">
                  <button className="link-btn" onClick={() => setShowHypo((v) => !v)} aria-expanded={showHypo}>
                    {showHypo ? "Hide the imagined branch" : "Explore an imagined branch"}
                  </button>
                  {showHypo && (
                    <div className="hypo-card">
                      <KindTag kind="hypothetical" />
                      <h4>{beat.hypothetical.title}</h4>
                      <p>{beat.hypothetical.text}</p>
                    </div>
                  )}
                </div>
              )}
              <SourceLine sources={beat.sources} />
            </div>
          )}
        </section>
      </div>
      {c.bar(undefined, {
        nextBlocked: step !== "revealed",
        onNext: step !== "revealed" ? () => setStep("revealed") : undefined,
        nextLabel: step !== "revealed" ? "Reveal" : "Next",
      })}
    </>
  );
}
