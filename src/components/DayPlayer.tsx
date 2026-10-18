// Plays one day: section navigation at the top, the current step in the
// middle, the control bar at the bottom. Works the same for every day.

import { useCallback, useEffect, useRef, useState } from "react";
import type { Beat, DayContent, Mode, SceneIntroBeat, SectionId } from "../content/types";
import type { DayProgress, Evening } from "../state/progress";
import { eveningLabel, stepsFor } from "../content/paths";
import { stops } from "../content/journey";
import { narrator } from "../audio/speech";
import { SayName } from "./SayName";
import { ControlBar, type MediaControls } from "./ControlBar";
import { SoundToggle } from "./SoundToggle";
import { sound } from "../audio/sound";
import type { Mood } from "../audio/moods";
import { ContextDrawer, TranscriptDrawer } from "./Drawers";
import type { Common } from "./beats/common";
import { ChoiceView } from "./beats/ChoiceView";
import { ComparisonView } from "./beats/ComparisonView";
import { IdeaView } from "./beats/IdeaView";
import { ReflectionView } from "./beats/ReflectionView";
import { SceneIntroView } from "./beats/SceneIntroView";
import { StoryView } from "./beats/StoryView";
import { ThinkView } from "./beats/ThinkView";
import { TodayView } from "./beats/TodayView";

const SECTIONS: { id: SectionId; letter: string; label: string }[] = [
  { id: "enter", letter: "A", label: "Enter" },
  { id: "story", letter: "B", label: "Story" },
  { id: "choice", letter: "C", label: "Choice" },
  { id: "idea", letter: "D", label: "Idea" },
  { id: "marvel", letter: "E", label: "Marvel" },
  { id: "compare", letter: "F", label: "Compare" },
  { id: "today", letter: "G", label: "Today" },
  { id: "reflect", letter: "H", label: "Reflect" },
];

interface Props {
  day: DayContent;
  dayProgress: DayProgress;
  updateDay: (fn: (d: DayProgress) => DayProgress) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  cinematic: boolean;
  toggleCinematic: () => void;
  onExit: () => void;
  onFinish: () => void;
  people: string[];
  setPeople: (names: string[]) => void;
  soundOn: boolean;
  volume: number;
  setSound: (on: boolean) => void;
  setVolume: (v: number) => void;
  evening: Evening;
  setEvening: (e: Evening) => void;
  readAloud: boolean;
  setReadAloud: (on: boolean) => void;
}

/** Music for steps that aren't animated: quiet beds that leave room for talk. */
function moodFor(beat: Beat): Mood {
  const film = beat.section === "marvel";
  switch (beat.type) {
    case "choice":
      return film ? "filmHold" : "hold";
    case "sceneIntro":
      return "filmQuiet";
    case "reflection":
      return "devotion";
    default:
      return "reflect";
  }
}

export function DayPlayer({ day, dayProgress, updateDay, mode, setMode, cinematic, toggleCinematic, onExit, onFinish, people, setPeople, soundOn, volume, setSound, setVolume, evening, setEvening, readAloud, setReadAloud }: Props) {
  const beats = day.beats;
  /** The steps in tonight's evening (all of them, or the short path), as indexes into `beats`. */
  const steps = stepsFor(beats, evening);
  const saved = Math.min(dayProgress.beat, beats.length - 1);
  // If the saved step isn't part of this evening, continue from the next one that is.
  const pos = Math.max(0, steps.findIndex((i) => i >= saved) === -1 ? steps.length - 1 : steps.findIndex((i) => i >= saved));
  const index = steps[pos];
  const beat = beats[index];
  const stop = stops[day.day - 1];
  const [slow, setSlow] = useState(false);
  const [drawer, setDrawer] = useState<"none" | "text" | "context">("none");
  const media = useRef<MediaControls | undefined>(undefined);
  const nextOverride = useRef<(() => void) | undefined>(undefined);
  const mainRef = useRef<HTMLElement>(null);

  const go = useCallback(
    (i: number) => {
      const target = Math.max(0, Math.min(beats.length - 1, i));
      updateDay((d) => ({ ...d, visited: true, beat: target, furthest: Math.max(d.furthest, target) }));
    },
    [beats.length, updateDay],
  );

  const goTo = useCallback((id: string) => go(beats.findIndex((b) => b.id === id)), [beats, go]);

  const finish = useCallback(() => {
    updateDay((d) => ({ ...d, completed: true }));
    onFinish();
    onExit();
  }, [updateDay, onExit, onFinish]);

  const next = useCallback(() => {
    if (nextOverride.current) return nextOverride.current();
    if (pos >= steps.length - 1) return finish();
    go(steps[pos + 1]);
  }, [pos, steps, go, finish]);

  const prev = useCallback(() => go(steps[Math.max(0, pos - 1)]), [go, pos, steps]);

  // Stop any narration when the step changes or the night closes.
  useEffect(() => () => narrator.cancel(), [index]);

  // Steps without animation get a calm bed; story steps set their own music.
  useEffect(() => {
    if (beat.type === "story") return;
    sound.setMood(moodFor(beat));
    sound.setHeld(false);
    sound.setRate(1);
  }, [beat]);

  // Move focus to the new step's heading so screen readers and keyboards follow.
  useEffect(() => {
    const h = mainRef.current?.querySelector<HTMLElement>("h2");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0 });
  }, [index]);

  // Mark the day as visited once, when it opens.
  useEffect(() => {
    updateDay((d) => (d.visited ? d : { ...d, visited: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (drawer !== "none") return;
      const el = e.target as HTMLElement;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onButton = tag === "BUTTON" || el.getAttribute("role") === "button" || el.getAttribute("role") === "radio";
      switch (e.key) {
        case " ":
          if (onButton) return;
          e.preventDefault();
          media.current?.toggle();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "r":
        case "R":
          media.current?.replay();
          break;
        case "s":
        case "S":
          setSlow((s) => !s);
          break;
        case "t":
        case "T":
          setDrawer("text");
          break;
        case "c":
        case "C":
          setDrawer("context");
          break;
        case "m":
        case "M":
          sound.setEnabled(!soundOn);
          setSound(!soundOn);
          break;
        case "v":
        case "V":
          setReadAloud(!readAloud);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer, next, prev, soundOn, setSound, readAloud, setReadAloud]);

  // The Marvel scene this step belongs to: the nearest scene intro before it.
  let scene: SceneIntroBeat | undefined;
  for (let i = index; i >= 0; i--) {
    const b = beats[i];
    if (b.section !== "marvel") break;
    if (b.type === "sceneIntro") {
      scene = b;
      break;
    }
  }

  const common: Common = {
    day: day.day,
    theme: day.theme,
    readAloud,
    people,
    setPeople,
    scene,
    mode,
    cinematic,
    slow,
    setSlow,
    next,
    goTo,
    finish,
    dayProgress,
    updateDay,
    bar: (m, opts) => {
      media.current = m;
      nextOverride.current = opts?.onNext;
      return (
        <ControlBar
          media={m}
          slow={slow}
          onSlow={() => setSlow((s) => !s)}
          canPrev={pos > 0}
          onPrev={prev}
          onNext={next}
          nextLabel={opts?.nextLabel ?? (pos === steps.length - 1 ? "Finish" : "Next")}
          nextBlocked={opts?.nextBlocked}
          beatIndex={pos}
          beatCount={steps.length}
          mode={mode}
          onMode={setMode}
          cinematic={cinematic}
          onCinematic={toggleCinematic}
          onTranscript={() => setDrawer("text")}
          onContext={() => setDrawer("context")}
          soundSlot={<SoundToggle on={soundOn} volume={volume} onToggle={setSound} onVolume={setVolume} label={false} />}
        />
      );
    },
  };

  const sectionStart = (id: SectionId) => {
    const i = steps.find((s) => beats[s].section === id);
    return i === undefined ? -1 : i;
  };
  const visitedSection = (id: SectionId) => sectionStart(id) !== -1 && sectionStart(id) <= dayProgress.furthest;

  return (
    <div className={`day day-${day.day}`}>
      <header className="day-head">
        <button className="back-btn" onClick={onExit}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          Nine nights
        </button>
        <div className="day-name">
          <span className="day-num">Night {day.day}</span>
          <span className="day-dev" lang="sa">{day.devanagari}</span>
          <span className="day-en">{day.name}</span>
          {stop && <SayName name={day.name} devanagari={day.devanagari} say={stop.say} showRespelling={false} />}
          <span className="day-theme">{day.theme}</span>
        </div>
        <div className="day-options">
          <button
            className={`chip-btn evening-btn ${evening === "short" ? "is-on" : ""}`}
            onClick={() => setEvening(evening === "short" ? "full" : "short")}
            aria-pressed={evening === "short"}
            title={evening === "short" ? `Short evening (${eveningLabel.short.time}). Select for the full evening.` : `Full evening (${eveningLabel.full.time}). Select for a short evening.`}
          >
            {evening === "short" ? "Short evening" : "Full evening"}
          </button>
          {narrator.available() && (
            <button
              className={`chip-btn read-btn ${readAloud ? "is-on" : ""}`}
              onClick={() => {
                if (readAloud) narrator.cancel();
                setReadAloud(!readAloud);
              }}
              aria-pressed={readAloud}
              title="Read the story aloud (V)"
            >
              {readAloud ? "Reading aloud" : "Read aloud"}
            </button>
          )}
        </div>
        <nav className="sections" aria-label="Parts of this day">
          {SECTIONS.map((s) => {
            const start = sectionStart(s.id);
            const current = beat.section === s.id;
            return (
              <button
                key={s.id}
                className={`section-btn ${current ? "is-current" : ""} ${visitedSection(s.id) ? "is-visited" : ""}`}
                onClick={() => start !== -1 && go(start)}
                disabled={start === -1}
                aria-current={current ? "step" : undefined}
                title={s.label}
              >
                <span className="sec-letter">{s.letter}</span>
                <span className="sec-label">{s.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <main ref={mainRef} className="day-main" key={beat.id}>
        <BeatView beat={beat} c={common} />
      </main>

      <TranscriptDrawer
        open={drawer === "text"}
        onClose={() => setDrawer("none")}
        day={day}
        mode={mode}
        onJump={(i) => {
          setDrawer("none");
          go(i);
        }}
      />
      <ContextDrawer open={drawer === "context"} onClose={() => setDrawer("none")} day={day} />
    </div>
  );
}

function BeatView({ beat, c }: { beat: Beat; c: Common }) {
  switch (beat.type) {
    case "story":
      return <StoryView beat={beat} c={c} />;
    case "choice":
      return <ChoiceView beat={beat} c={c} />;
    case "idea":
      return <IdeaView beat={beat} c={c} />;
    case "sceneIntro":
      return <SceneIntroView beat={beat} c={c} />;
    case "think":
      return <ThinkView beat={beat} c={c} />;
    case "comparison":
      return <ComparisonView beat={beat} c={c} />;
    case "today":
      return <TodayView beat={beat} c={c} />;
    case "reflection":
      return <ReflectionView beat={beat} c={c} />;
  }
}
