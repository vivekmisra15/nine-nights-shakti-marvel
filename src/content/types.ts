// ---------------------------------------------------------------------------
// Content types for Nine Nights (V2).
//
// All lesson text lives in data files (day1.ts, day2.ts). The interface reads
// these shapes and never hard-codes lesson content, so you can revise wording,
// sources or questions without touching any component.
// ---------------------------------------------------------------------------

import type { Ambience, Hit, Mood } from "../audio/moods";

/** Audience setting. "explore" suits the 11-year-old, "deeper" the 15-year-old. */
export type Mode = "explore" | "deeper";

/**
 * What kind of claim a piece of content is. The interface shows it as a label
 * so a learner can tell a traditional narrative from a modern reading.
 */
export type ClaimKind =
  | "tradition" // what a named traditional source narrates
  | "interpretation" // a traditional devotional or philosophical reading
  | "contemporary" // a modern reading, including ours
  | "comparison" // our own educational comparison
  | "marvel" // what happens in a Marvel film or series
  | "hypothetical"; // imagined; not in any source

export interface Source {
  label: string;
  url?: string;
  note?: string;
}

/** A line of narration that appears at `at` seconds into a story beat. */
export interface Caption {
  at: number;
  text: string;
  /** Extra layer shown only in "Go deeper" mode. */
  deep?: string;
}

/** A selectable part of an illustration. x and y are in the 1600 x 900 stage space. */
export interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Seconds into the beat when this hotspot becomes available. */
  from?: number;
  title: string;
  text: string;
  deep?: string;
  kind: ClaimKind;
  source?: string;
}

/** The animation runs slower between `from` and `to`, with a question on screen. */
export interface SlowWindow {
  from: number;
  to: number;
  prompt: string;
  /** Playback speed inside the window (0.3 means 30% speed). */
  rate?: number;
}

/**
 * The animation stops at `at` and waits for the learner. A freeze can simply
 * pose the dilemma, or offer small options (each answered, never graded)
 * before the story carries on.
 */
export interface Freeze {
  at: number;
  title: string;
  text: string;
  deep?: string;
  /** Replaces the default "What would you be thinking?" line. */
  think?: string;
  options?: { label: string; response: string }[];
  /** Label for the continue button. */
  continueLabel?: string;
}

export type SectionId =
  | "enter"
  | "story"
  | "choice"
  | "idea"
  | "marvel"
  | "compare"
  | "today"
  | "reflect";

interface BeatBase {
  id: string;
  section: SectionId;
  title: string;
  kind: ClaimKind;
  sources?: Source[];
}

export interface StoryBeat extends BeatBase {
  type: "story";
  /** Which illustration to draw (see visuals/index.ts). */
  visual: string;
  /** Length of the animation in seconds at normal speed. */
  duration: number;
  captions: Caption[];
  slow?: SlowWindow;
  /** One or more freeze-frames, in time order. */
  freezes?: Freeze[];
  hotspots?: Hotspot[];
  /** A short note for the parent, shown in a fold-out. */
  parentNote?: string;
  /** Music for this step: a mood, plus cues at moments in the animation. */
  sound?: SoundCue;
}

/**
 * Music cues. `mood` sets the music for the step (see audio/moods.ts).
 * Each cue fires when the animation passes `at` seconds: a one-off sound
 * (`hit`), a change of mood, or a change of ambience.
 */
export interface SoundCue {
  mood: Mood;
  cues?: { at: number; hit?: Hit; mood?: Mood; ambience?: Ambience }[];
}

export interface ChoiceOption {
  id: string;
  label: string;
  /** Acknowledges the reasoning behind this choice without grading it. */
  reasoning: string;
}

export interface ChoiceBeat extends BeatBase {
  type: "choice";
  /** Illustration shown, held still, behind the choice. */
  visual: string;
  visualTime: number;
  /** "should": what ought to happen. "will": predict. "weigh": what matters most. */
  framing: "should" | "will" | "weigh";
  prompt: string;
  deepPrompt?: string;
  options: ChoiceOption[];
  reveal: {
    title: string;
    text: string;
    deep?: string;
    why: string;
  };
  /** An imagined alternative, always labelled as not in any source. */
  hypothetical?: { title: string; text: string };
  parentNote?: string;
}

export interface IdeaBeat extends BeatBase {
  type: "idea";
  simple: string;
  deeper: string;
  connections: { event: string; meaning: string; jumpTo?: string }[];
  readings: { kind: ClaimKind; label: string; text: string }[];
  invite: string;
}

/**
 * How to find the real scene yourself. The app has no links to footage:
 * the parent searches Disney+ or YouTube. No timestamps, only story position.
 */
export interface FindScene {
  /** Where the scene falls in the film's story. */
  where: string;
  /** A phrase to type into Disney+ or YouTube search. */
  search: string;
  /** Anything the parent should know first, such as "preview this". */
  note?: string;
}

/** Introduces a Marvel scene: which film, why this scene, and how to find it. */
export interface SceneIntroBeat extends BeatBase {
  type: "sceneIntro";
  role: "primary" | "counterpoint";
  roleNote: string;
  film: string;
  year: number;
  character: string;
  scene: string;
  context: string;
  find?: FindScene;
  /** The US age rating of the film or series, e.g. "PG-13". */
  rating?: string;
  /** What to watch for while viewing. */
  watchFor: string[];
  /** Guidance shown to the parent before watching. */
  parentNote?: string;
}

/** The levels of the question ladder, from concrete to stretching. */
export type QuestionLevel = "notice" | "feel" | "wonder" | "stretch" | "flip" | "connect";

export interface LadderQuestion {
  level: QuestionLevel;
  text: string;
  /** A harder phrasing for "Go deeper" mode. */
  deep?: string;
  /** For the parent: if a child answers like this, try asking that. */
  followUps?: { ifTheySay: string; ask: string }[];
}

/**
 * "Think it through": the teaching heart of each Marvel scene.
 * A question ladder, a stance line both children place themselves on,
 * and a short activity.
 */
export interface ThinkBeat extends BeatBase {
  type: "think";
  turningPoint: string;
  connection: string;
  ladder: LadderQuestion[];
  stance: {
    statement: string;
    left: string;
    right: string;
    afterwards: string;
  };
  activity: { title: string; minutes: number; steps: string[] };
}

export interface ComparisonRow {
  question: string;
  tradition: string;
  marvel: { who: string; text: string; jumpTo?: string }[];
  traditionJump?: string;
  deep?: string;
  /** A question to ask before revealing this row. */
  askFirst?: string;
}

export interface ComparisonBeat extends BeatBase {
  type: "comparison";
  rows: ComparisonRow[];
}

export interface TodayBeat extends BeatBase {
  type: "today";
  setting: string;
  scenario: string;
  deep?: string;
  prompt: string;
  options: {
    id: string;
    label: string;
    perspectives: { label: string; text: string }[];
  }[];
  closing: string;
  /** Questions to keep the conversation going after choosing. */
  talk?: string[];
}

export interface ReflectionBeat extends BeatBase {
  type: "reflection";
  both: string;
  younger: string;
  older: string;
  takeaway: string;
}

export type Beat =
  | StoryBeat
  | ChoiceBeat
  | IdeaBeat
  | SceneIntroBeat
  | ThinkBeat
  | ComparisonBeat
  | TodayBeat
  | ReflectionBeat;

export interface DayContent {
  day: number;
  name: string;
  devanagari: string;
  meaning: string;
  /** The night's theme in one word, e.g. "Rootedness". */
  theme: string;
  question: string;
  beats: Beat[];
  /** Panels for the "Context" drawer. */
  context: { title: string; paragraphs: string[] }[];
  sources: Source[];
}

/** One stop on the nine-night map. */
export interface JourneyStop {
  day: number;
  name: string;
  devanagari: string;
  theme: string;
  /** A rough English respelling of the name, e.g. "SHY-luh-POO-tree". */
  say: string;
  question: string;
  built: boolean;
}
