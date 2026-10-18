// The opening sequence: darkness, a light, the guiding question, then the
// questions that frame the journey. Nothing is answered here.

import { useEffect, useState } from "react";
import { opening } from "../content/journey";
import { Defs, Stars } from "../visuals/shared";
import { sound } from "../audio/sound";
import { SoundToggle } from "./SoundToggle";

const STEP_MS = 2200;
const LAST = 2 + opening.questions.length; // 0 dark, 1 question, 2..6 questions, 7 premise

interface IntroProps {
  title: string;
  cinematic: boolean;
  onBegin: () => void;
  soundOn: boolean;
  volume: number;
  setSound: (on: boolean) => void;
  setVolume: (v: number) => void;
}

export function Intro({ title, cinematic, onBegin, soundOn, volume, setSound, setVolume }: IntroProps) {
  const [step, setStep] = useState(cinematic ? 0 : LAST);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || step >= LAST) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 1400 : STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, paused]);

  useEffect(() => {
    if (step === 1) sound.hit("bellSoft");
    if (step >= 2 && step < LAST) sound.hit("shimmer");
    if (step === LAST) sound.hit("bell");
  }, [step]);

  const lit = Math.max(0, step - 1); // lamps lit so far
  const shownQuestions = Math.max(0, step - 1);

  return (
    <div className="intro">
      <svg className="intro-sky" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Defs />
        <rect width="1600" height="900" fill="url(#sky-night)" />
        <Stars t={step >= 1 ? 4 : 0.6} />
        <g className={`intro-light ${step >= 1 ? "is-on" : ""}`}>
          <circle cx="800" cy="450" r="420" fill="url(#halo-gold)" opacity="0.5" />
        </g>
        {Array.from({ length: 9 }, (_, i) => {
          const a = -Math.PI / 2 + (i / 9) * Math.PI * 2;
          const on = i < Math.ceil((lit / opening.questions.length) * 9);
          return (
            <circle
              key={i}
              cx={800 + Math.cos(a) * 700}
              cy={450 + Math.sin(a) * 400}
              r={on ? 6 : 3}
              className={`intro-lamp ${on ? "is-on" : ""}`}
            />
          );
        })}
      </svg>

      <div className="intro-copy">
        <p className={`intro-kicker ${step >= 1 ? "is-in" : ""}`}>{title}</p>
        <h1 className={`intro-question ${step >= 1 ? "is-in" : ""}`}>{opening.question}</h1>
        <ul className="intro-questions">
          {opening.questions.map((q, i) => (
            <li key={q} className={i < shownQuestions ? "is-in" : ""} aria-hidden={i >= shownQuestions}>
              {q}
            </li>
          ))}
        </ul>
        <div className={`intro-premise ${step >= LAST ? "is-in" : ""}`} aria-hidden={step < LAST}>
          <p>{opening.premise}</p>
          <p className="intro-difference">{opening.difference}</p>
          <div className="btn-row center">
            <button className="btn-primary big" onClick={onBegin} tabIndex={step >= LAST ? 0 : -1}>
              Begin the journey
            </button>
            <SoundToggle on={soundOn} volume={volume} onToggle={setSound} onVolume={setVolume} />
          </div>
          <p className="intro-disclaimer">
            Independent educational project — no Marvel or Disney content is reproduced.{" "}
            <a href="DISCLAIMER.md" target="_blank" rel="noopener noreferrer">Full disclaimer</a>
          </p>
        </div>
      </div>

      {step < LAST && (
        <div className="intro-controls">
          <SoundToggle on={soundOn} volume={volume} onToggle={setSound} onVolume={setVolume} />
          <button className="chip-btn" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? "Resume" : "Pause"}
          </button>
          <button className="chip-btn" onClick={() => setStep((s) => Math.min(LAST, s + 1))}>
            Next line
          </button>
          <button className="chip-btn" onClick={() => setStep(LAST)}>
            Skip the opening
          </button>
        </div>
      )}
    </div>
  );
}
