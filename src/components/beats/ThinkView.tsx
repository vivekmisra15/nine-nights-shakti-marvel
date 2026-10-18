// "Think it through": the teaching heart of each Marvel scene.
//  1. The turning point and the connection to the Devi's story.
//  2. A question ladder, from noticing to stretching, revealed one rung at a
//     time, with follow-ups for the parent ("if they say… try asking…").
//  3. A stance line: everyone places themselves, then explains.
//  4. A short activity with a timer.

import { useEffect, useRef, useState } from "react";
import type { QuestionLevel, ThinkBeat } from "../../content/types";
import { KindTag, SourceLine } from "../Bits";
import { FindSceneCard } from "../FindScene";
import { pick, type Common } from "./common";

const LEVELS: Record<QuestionLevel, { label: string; hint: string }> = {
  notice: { label: "Notice", hint: "What happened?" },
  feel: { label: "Feel", hint: "What was it like?" },
  wonder: { label: "Wonder", hint: "Why?" },
  stretch: { label: "Stretch", hint: "Harder" },
  flip: { label: "Turn it around", hint: "What if?" },
  connect: { label: "Connect", hint: "Back to the Devi" },
};

export function ThinkView({ beat, c }: { beat: ThinkBeat; c: Common }) {
  const [rungs, setRungs] = useState(1);
  const all = beat.ladder.length;

  return (
    <>
      <div className="page-layout">
        <section className="text-page think-page" aria-labelledby={`h-${beat.id}`}>
          <KindTag kind={beat.kind} />
          <h2 id={`h-${beat.id}`} className="beat-title">
            {beat.title}
          </h2>

          <div className="two-col">
            <div className="layer">
              <span className="layer-mark">The turning point</span>
              <p className="lead">{beat.turningPoint}</p>
            </div>
            <div className="layer">
              <span className="layer-mark">The connection</span>
              <p>{beat.connection}</p>
            </div>
          </div>

          {c.scene?.find && <FindSceneCard film={c.scene.film} year={c.scene.year} rating={c.scene.rating} find={c.scene.find} compact />}

          {/* 2. Question ladder */}
          <div className="ladder-wrap">
            <div className="ladder-head">
              <h3>Questions to think about</h3>
              <p className="small muted">
                One at a time. Let everyone answer before moving on. {c.mode === "deeper" ? "Showing the harder version where there is one." : "Switch to Go deeper for harder versions."}
              </p>
            </div>
            <ol className="ladder">
              {beat.ladder.slice(0, rungs).map((q, i) => (
                <li key={q.text} className={`rung rung-${q.level}`} style={{ ["--i" as string]: i }}>
                  <div className="rung-mark">
                    <span className="rung-level">{LEVELS[q.level].label}</span>
                    <span className="rung-hint">{LEVELS[q.level].hint}</span>
                  </div>
                  <div className="rung-body">
                    <p className="rung-q">{pick(c.mode, q.text, q.deep)}</p>
                    {c.mode === "explore" && q.deep && <p className="small muted">Harder version: {q.deep}</p>}
                    {q.followUps && (
                      <details className="follow-ups">
                        <summary>For the parent: if they say…</summary>
                        <ul>
                          {q.followUps.map((f) => (
                            <li key={f.ifTheySay}>
                              <span className="fu-say">“{f.ifTheySay}”</span>
                              <span className="fu-ask">try asking: {f.ask}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="btn-row">
              {rungs < all && (
                <button className="btn-primary" onClick={() => setRungs((r) => r + 1)}>
                  Next question: {LEVELS[beat.ladder[rungs].level].label}
                </button>
              )}
              {rungs < all && (
                <button className="link-btn" onClick={() => setRungs(all)}>
                  Show all questions
                </button>
              )}
            </div>
          </div>

          {/* 3. Stance line */}
          <Stance beat={beat} c={c} />

          {/* 4. Activity */}
          <Activity activity={beat.activity} />

          <SourceLine sources={beat.sources} />
        </section>
      </div>
      {c.bar()}
    </>
  );
}

const MARKER_CLASSES = ["m-gold", "m-steel", "m-ours"];

function Stance({ beat, c }: { beat: ThinkBeat; c: Common }) {
  const values = c.dayProgress.stances[beat.id] ?? c.people.map(() => null);
  const [editing, setEditing] = useState(false);
  const placed = values.filter((v) => v !== null).length;

  const set = (i: number, v: number) =>
    c.updateDay((d) => {
      const cur = [...(d.stances[beat.id] ?? c.people.map(() => null))];
      cur[i] = v;
      return { ...d, stances: { ...d.stances, [beat.id]: cur } };
    });

  return (
    <div className="stance">
      <div className="ladder-head">
        <h3>Where do you stand?</h3>
        <p className="small muted">Everyone places their marker without talking first. Then explain.</p>
      </div>
      <p className="stance-statement">“{beat.stance.statement}”</p>

      <div className="stance-track" aria-hidden="true">
        <div className="stance-line" />
        {values.map((v, i) =>
          v === null ? null : (
            <span key={i} className={`stance-marker ${MARKER_CLASSES[i % 3]}`} style={{ left: `${v}%` }}>
              <span className="stance-name">{c.people[i]}</span>
            </span>
          ),
        )}
        <span className="stance-end left">{beat.stance.left}</span>
        <span className="stance-end right">{beat.stance.right}</span>
      </div>

      <div className="stance-sliders">
        {c.people.map((name, i) => (
          <label key={i} className={`stance-slider ${MARKER_CLASSES[i % 3]}`}>
            {editing ? (
              <input
                id={`person-${i}`}
                className="name-input"
                value={name}
                maxLength={16}
                onChange={(e) => {
                  const next = [...c.people];
                  next[i] = e.target.value;
                  c.setPeople(next);
                }}
                aria-label={`Name ${i + 1}`}
              />
            ) : (
              <span className="stance-who">{name}</span>
            )}
            <input
              id={`stance-${beat.id}-${i}`}
              type="range"
              min={0}
              max={100}
              value={values[i] ?? 50}
              onChange={(e) => set(i, Number(e.target.value))}
              aria-label={`${name}: from ${beat.stance.left} to ${beat.stance.right}`}
              className={values[i] === null ? "unplaced" : ""}
            />
          </label>
        ))}
        <button className="link-btn" onClick={() => setEditing((v) => !v)}>
          {editing ? "Done" : "Change names"}
        </button>
      </div>

      {placed >= 2 && (
        <div className="question-card quiet stance-after">
          <span className="callout-mark">Now talk</span>
          <p>{beat.stance.afterwards}</p>
        </div>
      )}
    </div>
  );
}

function Activity({ activity }: { activity: ThinkBeat["activity"] }) {
  const total = activity.minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const endAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    endAt.current = Date.now() + left * 1000;
    const id = window.setInterval(() => {
      const remaining = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) setRunning(false);
    }, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const p = 1 - left / total;
  const mm = Math.floor(left / 60);
  const ss = (left % 60).toString().padStart(2, "0");
  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div className="activity">
      <div className="activity-text">
        <span className="layer-mark">Try this together · about {activity.minutes} minutes</span>
        <h3>{activity.title}</h3>
        <ol>
          {activity.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="timer">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r={R} className="timer-track" />
          <circle cx="40" cy="40" r={R} className="timer-fill" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 40 40)" />
        </svg>
        <span className="timer-time" aria-live="off">
          {mm}:{ss}
        </span>
        <div className="btn-row">
          <button className="chip-btn" onClick={() => (left === 0 ? setLeft(total) : setRunning((r) => !r))}>
            {running ? "Pause" : left === total ? "Start timer" : left === 0 ? "Time's up · reset" : "Resume"}
          </button>
          {left !== total && (
            <button
              className="chip-btn"
              onClick={() => {
                setRunning(false);
                setLeft(total);
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
