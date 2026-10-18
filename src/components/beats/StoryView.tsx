// A story step: the animated stage plus the narration beside it.
// Handles slow motion, one or more freeze-frames (some with small choices),
// replay and inspecting hotspots.

import { useEffect, useRef, useState } from "react";
import { sound } from "../../audio/sound";
import { narrator } from "../../audio/speech";
import type { Ambience, Mood } from "../../audio/moods";
import { filmVisuals } from "../../visuals";
import type { StoryBeat } from "../../content/types";
import { useClock } from "../../engine/useClock";
import { KindTag, SourceLine } from "../Bits";
import { Stage } from "../Stage";
import type { Common } from "./common";

const SLOW_RATE = 0.35;

export function StoryView({ beat, c }: { beat: StoryBeat; c: Common }) {
  const freezes = beat.freezes ?? [];
  /** How many freeze-frames have been passed. */
  const [passed, setPassed] = useState(0);
  const [frozen, setFrozen] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [inspect, setInspect] = useState<string | null>(null);

  // ---- Read aloud ---------------------------------------------------------
  // Each caption is read as it appears. If the next caption is due while the
  // narrator is still speaking, the story waits for the voice to finish.
  const caps = beat.captions;
  const readOn = c.readAloud && c.cinematic && narrator.available();
  /** Index of the last caption the narrator has started. */
  const [spoken, setSpoken] = useState(-1);
  const [speaking, setSpeaking] = useState(false);
  const [voiceHold, setVoiceHold] = useState(false);
  const holdAt = readOn && speaking ? caps[spoken + 1]?.at : undefined;
  const freezeAt = freezes[passed]?.at;
  const holding = holdAt !== undefined && (freezeAt === undefined || holdAt < freezeAt);

  const clock = useClock({
    duration: beat.duration,
    slow: beat.slow,
    stopAt: holding ? holdAt : freezeAt,
    onStop: holding ? () => setVoiceHold(true) : () => setFrozen(passed),
    enabled: c.cinematic,
    userRate: c.slow ? SLOW_RATE : 1,
  });

  const quiet = (upTo: number) => {
    narrator.cancel();
    setSpeaking(false);
    setVoiceHold(false);
    setSpoken(upTo);
  };

  const continueOn = () => {
    narrator.cancel();
    setSpeaking(false);
    setFrozen(null);
    setPassed((p) => p + 1);
    clock.play();
  };

  /** Moving the playhead also decides which freeze-frames still lie ahead. */
  const seek = (to: number) => {
    setFrozen(null);
    setPassed(freezes.filter((f) => f.at < to - 0.01).length);
    quiet(caps.filter((cap) => cap.at < to - 0.01).length - 1);
    clock.seek(to);
  };

  const replay = () => {
    setFrozen(null);
    setPassed(0);
    setInspect(null);
    quiet(-1);
    clock.replay();
  };

  /** Replay the pivotal moment, optionally in slow motion. */
  const replayMoment = (slowly: boolean, freezeAt?: number) => {
    const anchor = freezeAt ?? beat.slow?.from ?? 0;
    const start = Math.max(0, Math.min(beat.slow && !freezeAt ? beat.slow.from : anchor, anchor) - 2.4);
    if (slowly !== c.slow) c.setSlow(slowly);
    seek(start);
    clock.play();
  };

  const toggle = () => (frozen !== null ? continueOn() : clock.toggle());

  const onInspect = (id: string) => {
    setInspect((cur) => (cur === id ? null : id));
    clock.pause();
  };

  const t = clock.t;

  // Start reading the next caption that has appeared, once the voice is free.
  useEffect(() => {
    if (!readOn || speaking || frozen !== null) return;
    if (!clock.playing && !voiceHold) return;
    const due = caps.findIndex((cap, i) => i > spoken && t >= cap.at - 0.02);
    if (due === -1) {
      if (voiceHold) {
        setVoiceHold(false);
        clock.play();
      }
      return;
    }
    const cap = caps[due];
    setSpoken(due);
    setSpeaking(true);
    if (voiceHold) {
      setVoiceHold(false);
      clock.play();
    }
    narrator.speak(c.mode === "deeper" && cap.deep ? `${cap.text} ${cap.deep}` : cap.text, () => setSpeaking(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, speaking, readOn, voiceHold, frozen, clock.playing]);

  // Pausing stops the voice; turning read-aloud off releases any wait.
  useEffect(() => {
    if (!clock.playing && !voiceHold && frozen === null && speaking) {
      narrator.cancel();
      setSpeaking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock.playing]);

  useEffect(() => {
    if (!readOn) {
      if (speaking) setSpeaking(false);
      if (voiceHold) {
        setVoiceHold(false);
        clock.play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOn]);

  // At a freeze-frame, read its question.
  useEffect(() => {
    if (!readOn || frozen === null) return;
    const f = freezes[frozen];
    narrator.speak(`${f.title}. ${f.text} ${f.think ?? ""}`, () => setSpeaking(false));
    setSpeaking(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frozen]);

  // In reading mode, read the whole step once.
  useEffect(() => {
    if (!(c.readAloud && !c.cinematic && narrator.available())) return;
    narrator.speak(caps.map((cap) => cap.text).join(" "));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat.id, c.readAloud, c.cinematic]);

  // ---- Music follows the story -------------------------------------------
  const cues = beat.sound?.cues ?? [];
  const film = filmVisuals.has(beat.visual);

  /** The mood and ambience the music should have at time `at`. */
  const applyStateAt = (at: number) => {
    let mood: Mood = beat.sound?.mood ?? (film ? "filmQuiet" : "reflect");
    let amb: Ambience | undefined;
    for (const cue of cues) {
      if (cue.at > at) continue;
      if (cue.mood) mood = cue.mood;
      if (cue.ambience) amb = cue.ambience;
    }
    sound.setMood(mood);
    if (amb) sound.setAmbience(amb);
  };

  useEffect(() => {
    applyStateAt(c.cinematic ? 0 : beat.duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat.id]);

  useEffect(() => {
    sound.setHeld(c.cinematic ? !clock.playing || frozen !== null : false);
  }, [c.cinematic, clock.playing, frozen]);

  useEffect(() => {
    sound.setRate(c.cinematic ? clock.effectiveRate : 1);
  }, [c.cinematic, clock.effectiveRate]);

  useEffect(() => {
    if (frozen !== null) sound.hit(film ? "heartbeat" : "bellSoft");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frozen]);

  const lastT = useRef(0);
  useEffect(() => {
    const prev = lastT.current;
    lastT.current = t;
    if (!c.cinematic) return;
    // A jump (scrubbing or replay) resets the music to match, without replaying sounds.
    if (t < prev - 0.05 || t - prev > 0.75) {
      applyStateAt(t);
      return;
    }
    for (const cue of cues) {
      if (cue.at > prev && cue.at <= t) {
        if (cue.mood) sound.setMood(cue.mood);
        if (cue.ambience) sound.setAmbience(cue.ambience);
        if (cue.hit) sound.hit(cue.hit);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);
  // -------------------------------------------------------------------------

  const shown = beat.captions.filter((cap) => !c.cinematic || t >= cap.at);
  const hotspot = beat.hotspots?.find((h) => h.id === inspect);
  const slowPrompt = c.cinematic && clock.inSlow ? beat.slow?.prompt : null;
  const availableHotspots = (beat.hotspots ?? []).filter((h) => !c.cinematic || t >= (h.from ?? 0));
  const visibleFreezes = c.cinematic ? (frozen !== null ? [frozen] : []) : freezes.map((_, i) => i);

  return (
    <>
      <div className="story-layout">
        <Stage
          visual={beat.visual}
          t={t}
          duration={beat.duration}
          label={beat.title}
          frozen={frozen !== null}
          slowPrompt={slowPrompt}
          rate={clock.effectiveRate}
          hotspots={beat.hotspots}
          activeHotspot={inspect}
          onInspect={onInspect}
          allHotspots={!c.cinematic}
        />

        <section className="narration" aria-labelledby={`h-${beat.id}`}>
          <KindTag kind={beat.kind} />
          <h2 id={`h-${beat.id}`} className="beat-title">
            {beat.title}
          </h2>

          <div className="captions" aria-live="polite">
            {shown.map((cap, i) => (
              <div key={cap.at} className={`caption ${i === shown.length - 1 ? "is-current" : ""}`}>
                <p>{cap.text}</p>
                {c.mode === "deeper" && cap.deep && (
                  <p className="deep-line">
                    <span className="deep-mark">Go deeper</span> {cap.deep}
                  </p>
                )}
              </div>
            ))}
            {shown.length === 0 && <p className="caption-wait">The story is beginning…</p>}
          </div>

          {!c.cinematic && beat.slow && (
            <div className="callout">
              <span className="callout-mark">Pause on this</span>
              <p>{beat.slow.prompt}</p>
            </div>
          )}

          {visibleFreezes.map((fi) => {
            const f = freezes[fi];
            const chosen = answers[fi];
            const needsAnswer = !!f.options && chosen === undefined;
            return (
              <div key={fi} className="freeze-card" role="group" aria-label={`Freeze-frame: ${f.title}`}>
                <span className="callout-mark">{f.title}</span>
                <p className="freeze-text">{f.text}</p>
                {c.mode === "deeper" && f.deep && <p className="deep-line">{f.deep}</p>}
                <p className="think">{f.think ?? "Take a moment. What would you be thinking if you were there?"}</p>
                {f.options && (
                  <div className="mini-options">
                    {f.options.map((o, oi) => (
                      <button
                        key={o.label}
                        className={`option small-option ${chosen === oi ? "is-chosen" : ""}`}
                        style={{ ["--i" as string]: oi }}
                        onClick={() => setAnswers((a) => ({ ...a, [fi]: oi }))}
                        aria-pressed={chosen === oi}
                      >
                        {o.label}
                      </button>
                    ))}
                    {chosen !== undefined && <p className="mini-response">{f.options[chosen].response}</p>}
                  </div>
                )}
                {c.cinematic && (
                  <div className="btn-row">
                    <button className={needsAnswer ? "btn-quiet" : "btn-primary"} onClick={continueOn}>
                      {f.continueLabel ?? "Continue the story"}
                    </button>
                    <button className="btn-quiet" onClick={() => replayMoment(true, f.at)}>
                      Replay in slow motion
                    </button>
                    <button className="btn-quiet" onClick={() => replayMoment(false, f.at)}>
                      Replay at normal speed
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {availableHotspots.length > 0 && (
            <div className="inspect">
              <p className="inspect-hint">Look closer: select a glowing point in the picture, or a name here.</p>
              <div className="chip-row">
                {availableHotspots.map((h) => (
                  <button key={h.id} className={`chip-btn ${inspect === h.id ? "is-on" : ""}`} onClick={() => onInspect(h.id)} aria-pressed={inspect === h.id}>
                    {h.label}
                  </button>
                ))}
              </div>
              {hotspot && (
                <div className="inspect-card">
                  <KindTag kind={hotspot.kind} />
                  <h3>{hotspot.title}</h3>
                  <p>{hotspot.text}</p>
                  {c.mode === "deeper" && hotspot.deep && <p className="deep-line">{hotspot.deep}</p>}
                  {hotspot.source && (
                    <p className="source-line">
                      <span className="source-label">Source</span> {hotspot.source}
                    </p>
                  )}
                  <button className="btn-quiet" onClick={() => setInspect(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          )}

          {beat.parentNote && (
            <details className="parent-note">
              <summary>For the parent</summary>
              <p>{beat.parentNote}</p>
            </details>
          )}

          {c.cinematic && clock.ended && (
            <p className="end-hint">
              <button className="link-btn" onClick={replay}>
                Replay
              </button>{" "}
              or continue when you're ready.
            </p>
          )}

          <SourceLine sources={beat.sources} />
        </section>
      </div>

      {c.bar(c.cinematic ? { playing: clock.playing, t, duration: beat.duration, toggle, replay, seek, frozen: frozen !== null } : undefined)}
    </>
  );
}
