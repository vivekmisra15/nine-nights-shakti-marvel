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

export function DisclaimerDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Disclaimer and Statement of Intent">
      <section className="ctx">
        <h3>No Affiliation with Marvel Entertainment or The Walt Disney Company</h3>
        <p>This project is an independent, non-commercial, educational work. It is not affiliated with, endorsed by, sponsored by, or in any way connected to Marvel Entertainment, LLC, Marvel Studios, LLC, or The Walt Disney Company, or any of their subsidiaries or affiliates.</p>
        <p>All Marvel character names, film titles, and related marks are trademarks and/or registered trademarks of Marvel Entertainment, LLC and/or The Walt Disney Company. All rights in those marks and the associated characters, stories, and films remain with their respective owners.</p>
      </section>
      <section className="ctx">
        <h3>No Copyrighted Material Is Reproduced</h3>
        <p>This project does not contain, embed, display, reproduce, or transmit any images, screenshots, stills, video clips, audio recordings, or verbatim dialogue from any Marvel film, series, or other production. The application contains no links to streaming or video-sharing platforms.</p>
      </section>
      <section className="ctx">
        <h3>Paraphrase, Commentary, and Original Illustration</h3>
        <p><strong>Paraphrase only.</strong> Every scene description is an original prose retelling written from scratch. No dialogue is quoted verbatim.</p>
        <p><strong>Original illustrations.</strong> All visuals are procedurally generated, abstract, original artworks created in code. They are not derived from or substantially similar to any frame of any Marvel production.</p>
        <p><strong>Commentary and interpretation.</strong> References identify a scene as an illustrative example of a philosophical concept and invite discussion. This is educational commentary, not reproduction. Users wishing to view the actual scenes locate them independently on licensed platforms.</p>
      </section>
      <section className="ctx">
        <h3>Educational and Non-Commercial Purpose</h3>
        <p>This project is offered free of charge for personal, family, and educational use. No revenue is generated. Its purpose is to help families explore traditional Hindu devotional stories drawn from the Devi Mahatmya, the Rig Veda, the Devi Bhagavata Purana, and the Yoga Sutras, and to connect those ideas to narratives that younger audiences may recognise. The Marvel references serve solely as comparative discussion prompts.</p>
      </section>
      <section className="ctx">
        <h3>Interpretations Are the Authors' Own</h3>
        <p>All interpretations of both the traditional stories and the Marvel scenes are solely the authors' own. They do not represent the official position of any religious institution, cultural body, or rights holder, nor the intentions of Marvel's creators, writers, or directors.</p>
      </section>
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
