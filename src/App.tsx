// The app shell: opening sequence → nine-night map → a day.

import { useEffect, useState } from "react";
import { appTitle, days } from "./content/journey";
import type { Mode } from "./content/types";
import { emptyDay, useProgress, type Evening } from "./state/progress";
import { PrepSheet } from "./components/PrepSheet";
import { sound } from "./audio/sound";
import { DayPlayer } from "./components/DayPlayer";
import { Intro } from "./components/Intro";
import { JourneyMap } from "./components/JourneyMap";

type Screen = { name: "intro" } | { name: "map" } | { name: "prep" } | { name: "day"; day: number };

export default function App() {
  const { progress, update, updateDay, reset } = useProgress();
  const [screen, setScreen] = useState<Screen>(progress.seenIntro ? { name: "map" } : { name: "intro" });
  /** The night whose lamp was just lit, so the map can animate it. */
  const [justLit, setJustLit] = useState<number | null>(null);

  useEffect(() => {
    document.title = appTitle;
    // Music starts at the first click or key press if it was on last time.
    sound.restore(progress.sound, progress.volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The opening and the map have their own quiet music.
  useEffect(() => {
    if (screen.name === "intro") sound.setMood("intro");
    if (screen.name === "map") {
      sound.setMood("map");
      sound.setHeld(false);
      sound.setRate(1);
    }
  }, [screen.name]);

  useEffect(() => {
    if (justLit === null) return;
    const id = window.setTimeout(() => setJustLit(null), 4000);
    return () => window.clearTimeout(id);
  }, [justLit]);

  const setMode = (mode: Mode) => update((p) => ({ ...p, mode }));
  const toggleCinematic = () => update((p) => ({ ...p, cinematic: !p.cinematic }));
  const setPeople = (people: string[]) => update((p) => ({ ...p, people }));
  const setSound = (on: boolean) => update((p) => ({ ...p, sound: on }));
  const setVolume = (volume: number) => update((p) => ({ ...p, volume }));
  const soundProps = { soundOn: progress.sound, volume: progress.volume, setSound, setVolume };
  const setEvening = (evening: Evening) => update((p) => ({ ...p, evening }));
  const setReadAloud = (readAloud: boolean) => update((p) => ({ ...p, readAloud }));

  if (screen.name === "intro") {
    return (
      <Intro
        {...soundProps}
        title={appTitle}
        cinematic={progress.cinematic}
        onBegin={() => {
          update((p) => ({ ...p, seenIntro: true }));
          setScreen({ name: "map" });
        }}
      />
    );
  }

  if (screen.name === "day") {
    const day = days[screen.day];
    if (day) {
      const n = screen.day;
      const wasDone = !!progress.days[n]?.completed;
      return (
        <DayPlayer
          key={n}
          day={day}
          dayProgress={progress.days[n] ?? emptyDay()}
          updateDay={(fn) => updateDay(n, fn)}
          mode={progress.mode}
          setMode={setMode}
          cinematic={progress.cinematic}
          toggleCinematic={toggleCinematic}
          people={progress.people}
          setPeople={setPeople}
          {...soundProps}
          evening={progress.evening}
          setEvening={setEvening}
          readAloud={progress.readAloud}
          setReadAloud={setReadAloud}
          onExit={() => setScreen({ name: "map" })}
          onFinish={() => {
            // Animate the lamp only the first time a night is finished.
            if (!wasDone) setJustLit(n);
          }}
        />
      );
    }
  }

  if (screen.name === "prep") {
    return <PrepSheet evening={progress.evening} onBack={() => setScreen({ name: "map" })} />;
  }

  return (
    <JourneyMap
      {...soundProps}
      evening={progress.evening}
      setEvening={setEvening}
      onPrep={() => setScreen({ name: "prep" })}
      title={appTitle}
      progress={progress}
      justLit={justLit}
      onEnter={(day) => setScreen({ name: "day", day })}
      onReplayIntro={() => setScreen({ name: "intro" })}
      onReset={() => {
        reset();
        setScreen({ name: "intro" });
      }}
    />
  );
}
