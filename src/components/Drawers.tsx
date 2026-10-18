// Two side panels: the whole day as readable text, and context with sources.
// Uses the native <dialog> element, which handles focus and Escape for us.

import { useEffect, useRef, type ReactNode } from "react";
import type { DayContent, Mode } from "../content/types";
import { KIND_LABEL, KindTag } from "./Bits";

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog ref={ref} className="drawer" onClose={onClose} aria-label={title}>
      <header className="drawer-head">
        <h2>{title}</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>
      <div className="drawer-body">{children}</div>
    </dialog>
  );
}

/** The full day as text, in order. Choice outcomes stay folded so they don't spoil the decision. */
export function TranscriptDrawer({ open, onClose, day, mode, onJump }: { open: boolean; onClose: () => void; day: DayContent; mode: Mode; onJump: (i: number) => void }) {
  const deep = mode === "deeper";
  return (
    <Drawer open={open} onClose={onClose} title={`Day ${day.day} as text`}>
      {day.beats.map((b, i) => (
        <article key={b.id} className="tx-beat">
          <div className="tx-head">
            <span className="tx-kind">{KIND_LABEL[b.kind]}</span>
            <button className="link-btn" onClick={() => onJump(i)}>
              Go to step {i + 1}
            </button>
          </div>
          <h3>{b.title}</h3>
          {b.type === "story" && (
            <>
              {b.captions.map((cap) => (
                <p key={cap.at}>
                  {cap.text}
                  {deep && cap.deep && <span className="tx-deep"> {cap.deep}</span>}
                </p>
              ))}
              {b.slow && <p className="tx-callout">Pause on this: {b.slow.prompt}</p>}
              {b.freezes?.map((f) => (
                <p key={f.at} className="tx-callout">
                  {f.title}: {f.text} {deep && f.deep}
                </p>
              ))}
              {b.hotspots && (
                <ul className="tx-list">
                  {b.hotspots.map((h) => (
                    <li key={h.id}>
                      <strong>{h.title}.</strong> {h.text} {deep && h.deep}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {b.type === "choice" && (
            <>
              <p>{b.prompt}</p>
              <ul className="tx-list">
                {b.options.map((o) => (
                  <li key={o.id}>{o.label}</li>
                ))}
              </ul>
              <details>
                <summary>{b.reveal.title}</summary>
                <p>{b.reveal.text}</p>
                {deep && b.reveal.deep && <p>{b.reveal.deep}</p>}
                <p>{b.reveal.why}</p>
              </details>
            </>
          )}
          {b.type === "idea" && (
            <>
              <p className="tx-strong">{b.simple}</p>
              <p>{b.deeper}</p>
            </>
          )}
          {b.type === "sceneIntro" && (
            <>
              <p>
                {b.film} ({b.year}). {b.scene}
              </p>
              <p>{b.context}</p>
              {b.find && (
                <p>
                  Find the scene: {b.find.where} Search for "{b.find.search}".
                </p>
              )}
            </>
          )}
          {b.type === "think" && (
            <>
              <p>{b.connection}</p>
              <ol className="tx-list">
                {b.ladder.map((q) => (
                  <li key={q.text}>{deep && q.deep ? q.deep : q.text}</li>
                ))}
              </ol>
              <p className="tx-callout">Where do you stand? “{b.stance.statement}”</p>
              <p>
                <strong>{b.activity.title}.</strong> {b.activity.steps.join(" ")}
              </p>
            </>
          )}
          {b.type === "comparison" &&
            b.rows.map((r) => (
              <div key={r.question}>
                <p className="tx-strong">{r.question}</p>
                <p>Tradition: {r.tradition}</p>
                {r.marvel.map((m) => (
                  <p key={m.who}>
                    {m.who}: {m.text}
                  </p>
                ))}
              </div>
            ))}
          {b.type === "today" && (
            <>
              <p>{b.scenario}</p>
              <ul className="tx-list">
                {b.options.map((o) => (
                  <li key={o.id}>{o.label}</li>
                ))}
              </ul>
            </>
          )}
          {b.type === "reflection" && (
            <>
              <p>{b.both}</p>
              <p>{deep ? b.older : b.younger}</p>
              <p className="tx-strong">{b.takeaway}</p>
            </>
          )}
        </article>
      ))}
    </Drawer>
  );
}

export function ContextDrawer({ open, onClose, day }: { open: boolean; onClose: () => void; day: DayContent }) {
  return (
    <Drawer open={open} onClose={onClose} title="Context and sources">
      {day.context.map((c) => (
        <section key={c.title} className="ctx">
          <h3>{c.title}</h3>
          {c.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}

      <section className="ctx">
        <h3>How to read the labels</h3>
        <div className="label-key">
          {(["tradition", "interpretation", "contemporary", "comparison", "marvel", "hypothetical"] as const).map((k) => (
            <KindTag key={k} kind={k} />
          ))}
        </div>
      </section>

      <section className="ctx">
        <h3>Sources</h3>
        <ul className="tx-list">
          {day.sources.map((s) => (
            <li key={s.label}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ) : (
                s.label
              )}
              {s.note && <span className="source-note"> {s.note}</span>}
            </li>
          ))}
        </ul>
      </section>
    </Drawer>
  );
}
