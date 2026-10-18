// What every step view receives from the day player.

import type { ReactNode } from "react";
import type { Mode, SceneIntroBeat } from "../../content/types";
import type { DayProgress } from "../../state/progress";
import type { MediaControls } from "../ControlBar";

export interface Common {
  day: number;
  /** The night's one-word theme. */
  theme: string;
  /** Read story captions aloud. */
  readAloud: boolean;
  mode: Mode;
  cinematic: boolean;
  slow: boolean;
  setSlow: (on: boolean) => void;
  /** Renders the shared control bar with this step's media controls. */
  bar: (media?: MediaControls, opts?: { nextBlocked?: boolean; nextLabel?: string; onNext?: () => void }) => ReactNode;
  next: () => void;
  goTo: (beatId: string) => void;
  dayProgress: DayProgress;
  updateDay: (fn: (d: DayProgress) => DayProgress) => void;
  finish: () => void;
  people: string[];
  setPeople: (names: string[]) => void;
  /** The Marvel scene this step belongs to, if any (for the "Find the scene" card). */
  scene?: SceneIntroBeat;
}

/** Pick the "Go deeper" variant when that mode is on and one exists. */
export const pick = (mode: Mode, base: string, deep?: string) => (mode === "deeper" && deep ? deep : base);
