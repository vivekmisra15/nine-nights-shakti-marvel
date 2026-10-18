// Progress is saved in this browser only (localStorage). No accounts and no
// personal information: just where you are, your settings, your choices and
// the first names (or nicknames) you type for the stance line.

import { useCallback, useEffect, useState } from "react";
import type { Mode } from "../content/types";

export interface DayProgress {
  beat: number;
  visited: boolean;
  completed: boolean;
  /** Which beats have been reached, so the map can show how far you got. */
  furthest: number;
  choices: Record<string, string>;
  today?: string;
  note: string;
  /** Positions on each stance line (0 to 100), one per person; null = not placed yet. */
  stances: Record<string, (number | null)[]>;
}

export interface Progress {
  seenIntro: boolean;
  mode: Mode;
  cinematic: boolean;
  people: string[];
  /** Music on or off, and its volume (0 to 1). */
  sound: boolean;
  volume: number;
  /** "short": story, idea, one Marvel scene and the reflection (about 20 minutes). */
  evening: Evening;
  /** Read story captions aloud with the device's voice. */
  readAloud: boolean;
  days: Record<number, DayProgress>;
}

export type Evening = "full" | "short";

const KEY = "nine-nights-progress-v2";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const emptyDay = (): DayProgress => ({
  beat: 0,
  visited: false,
  completed: false,
  furthest: 0,
  choices: {},
  note: "",
  stances: {},
});

const fresh = (): Progress => ({
  seenIntro: false,
  mode: "explore",
  cinematic: !reducedMotion(),
  people: ["Parent", "Child 1", "Child 2"],
  sound: false,
  volume: 0.7,
  evening: "full",
  readAloud: false,
  days: {},
});

function load(): Progress {
  const fallback = fresh();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as Partial<Progress>;
    const days: Record<number, DayProgress> = {};
    for (const [k, v] of Object.entries(saved.days ?? {})) days[Number(k)] = { ...emptyDay(), ...v };
    return { ...fallback, ...saved, days };
  } catch {
    return fallback;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // Storage can be unavailable (private windows). The app still works.
    }
  }, [progress]);

  const update = useCallback((fn: (p: Progress) => Progress) => setProgress((p) => fn(p)), []);

  const updateDay = useCallback(
    (day: number, fn: (d: DayProgress) => DayProgress) =>
      setProgress((p) => ({ ...p, days: { ...p.days, [day]: fn(p.days[day] ?? emptyDay()) } })),
    [],
  );

  const reset = useCallback(() => setProgress(fresh()), []);

  return { progress, update, updateDay, reset };
}
