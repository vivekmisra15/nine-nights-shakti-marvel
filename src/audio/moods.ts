// ---------------------------------------------------------------------------
// The score: each mood says which instruments play, in which raga or key,
// how busy the melody is and what ambience sits underneath.
//
// Tradition scenes use a tanpura drone with bansuri (flute) or santoor
// (hammered strings), in ragas chosen for the feeling of the moment.
// Marvel scenes use a separate "film" palette: string pads, cello, low pulses.
// All music is generated live in the browser; there are no recordings.
// ---------------------------------------------------------------------------

/** Scales, as semitones above Sa (tradition) or the root (film). */
export const SCALES = {
  /** Raga Bhupali: serene, devotional, pentatonic. */
  bhupali: [0, 2, 4, 7, 9],
  /** Raga Yaman: evening, tender, hopeful. */
  yaman: [0, 2, 4, 6, 7, 9, 11],
  /** Raga Bageshri: longing, used for Parvati's yearning and tapas. */
  bageshri: [0, 2, 3, 5, 9, 10],
  /** Raga Marwa: dusk, unsettled; used for tension at the sacrifice. */
  marwa: [0, 1, 4, 6, 9, 11],
  /** Asavari-like: grave and sorrowful; used for grief. */
  asavari: [0, 2, 3, 5, 7, 8, 10],
  /** Raga Durga: bright, steady, auspicious; used for the Devi's strength. */
  durga: [0, 2, 5, 7, 9],
  /** Raga Khamaj: tender and folk-like; used for mother and child. */
  khamaj: [0, 2, 4, 5, 7, 9, 10],
  /** Raga Hamsadhwani: bright and rising; used for the gods' light gathering. */
  hamsadhwani: [0, 2, 4, 7, 11],
  /** Raga Malkauns: deep night, grave and powerful; used for Kalaratri. */
  malkauns: [0, 3, 5, 8, 10],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
} as const;

export type Ambience = "none" | "wind" | "rain" | "fire";
export type Voice = "bansuri" | "santoor" | "cello" | "kalimba" | "none";
export type Hit = "bell" | "bellSoft" | "boom" | "whoosh" | "shimmer" | "heartbeat" | "thunder";

export interface MoodDef {
  /** "tanpura" drone for tradition, "film" pads for Marvel, or nothing. */
  palette: "tanpura" | "film" | "none";
  scale: readonly number[];
  voice: Voice;
  /** Chance (0–1) that a beat starts a melody note. */
  density: number;
  /** Seconds per beat at normal speed. */
  beat: number;
  /** Overall level of this mood (0–1). */
  level: number;
  ambience: Ambience;
  /** A soft heartbeat every two beats. */
  pulse?: boolean;
  /** Film chords, as semitones above the root, one per bar. */
  chords?: number[][];
  brass?: boolean;
  /** Ring a soft temple bell every N beats (Chandraghanta's bell). */
  bells?: number;
  choir?: boolean;
  /** Melody octave: 1 = around Sa, 2 = an octave higher. */
  register?: number;
  /** Drone pitch: tradition moods default to Sa = D3. */
  sa?: number;
}

const SA = 146.83; // D3, a warm, common tanpura pitch for a mixed group of voices

const FILM_MINOR = [
  [0, 3, 7, 12],
  [-4, 0, 5, 8],
  [3, 7, 10, 15],
  [-2, 2, 5, 10],
];
const FILM_TENSION = [
  [0, 3, 7],
  [0, 3, 8],
  [-1, 3, 6],
  [0, 3, 7, 13],
];
const FILM_HOPE = [
  [0, 3, 7, 12],
  [3, 7, 10, 15],
  [-2, 2, 5, 10],
  [5, 9, 12, 17],
];
const FILM_LAMENT = [
  [0, 3, 7],
  [5, 8, 12],
  [-4, 0, 5],
  [-5, -1, 2],
];
const FILM_WARM = [
  [0, 3, 7, 10],
  [-2, 2, 5, 9],
  [0, 3, 7, 10],
  [-4, 0, 3, 7],
];
const FILM_WONDER = [
  [0, 4, 7, 11],
  [2, 6, 9, 14],
  [0, 4, 7, 11],
  [-3, 2, 6, 9],
];

export const MOODS = {
  // ---- opening and map
  intro: { palette: "tanpura", scale: SCALES.bhupali, voice: "bansuri", density: 0.35, beat: 0.95, level: 0.9, ambience: "none", register: 2 },
  map: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.18, beat: 1.0, level: 0.85, ambience: "none", register: 2 },

  // ---- tradition
  dawn: { palette: "tanpura", scale: SCALES.bhupali, voice: "bansuri", density: 0.4, beat: 0.9, level: 1, ambience: "wind", register: 2 },
  layers: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.3, beat: 0.8, level: 1.0, ambience: "none", register: 2 },
  union: { palette: "tanpura", scale: SCALES.yaman, voice: "bansuri", density: 0.45, beat: 0.8, level: 1, ambience: "none", register: 2 },
  gathering: { palette: "tanpura", scale: SCALES.marwa, voice: "santoor", density: 0.22, beat: 0.85, level: 1.1, ambience: "fire", register: 2 },
  tension: { palette: "tanpura", scale: SCALES.marwa, voice: "bansuri", density: 0.16, beat: 1.0, level: 0.9, ambience: "fire", pulse: true, register: 1 },
  departure: { palette: "tanpura", scale: SCALES.bageshri, voice: "bansuri", density: 0.25, beat: 1.2, level: 0.85, ambience: "none", register: 2 },
  storm: { palette: "tanpura", scale: SCALES.asavari, voice: "none", density: 0, beat: 1.0, level: 0.9, ambience: "wind", pulse: true },
  grief: { palette: "tanpura", scale: SCALES.asavari, voice: "bansuri", density: 0.3, beat: 1.4, level: 0.9, ambience: "wind", register: 1 },
  rebirth: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.42, beat: 0.8, level: 1, ambience: "wind", register: 2 },
  devotion: { palette: "tanpura", scale: SCALES.bhupali, voice: "bansuri", density: 0.3, beat: 1.0, level: 0.9, ambience: "none", register: 2 },
  spring: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.6, beat: 0.6, level: 1.15, ambience: "none", register: 2 },
  resolve: { palette: "tanpura", scale: SCALES.bageshri, voice: "bansuri", density: 0.36, beat: 1.0, level: 0.95, ambience: "none", register: 2 },
  tapas: { palette: "tanpura", scale: SCALES.bageshri, voice: "bansuri", density: 0.2, beat: 1.2, level: 0.9, ambience: "fire", register: 1 },
  test: { palette: "tanpura", scale: SCALES.marwa, voice: "bansuri", density: 0.2, beat: 1.0, level: 0.9, ambience: "none", pulse: true, register: 1 },
  revealed: { palette: "tanpura", scale: SCALES.yaman, voice: "santoor", density: 0.5, beat: 0.75, level: 1.2, ambience: "none", register: 2 },

  // ---- Night 3: Chandraghanta
  bells: { palette: "tanpura", scale: SCALES.durga, voice: "santoor", density: 0.3, beat: 0.9, level: 1.0, ambience: "none", bells: 8, register: 2 },
  procession: { palette: "tanpura", scale: SCALES.marwa, voice: "bansuri", density: 0.25, beat: 0.8, level: 0.95, ambience: "wind", pulse: true, register: 1 },
  battle: { palette: "tanpura", scale: SCALES.durga, voice: "bansuri", density: 0.4, beat: 0.6, level: 1.0, ambience: "none", pulse: true, bells: 4, register: 2 },

  // ---- Night 4: Kushmanda
  void: { palette: "tanpura", scale: SCALES.bhupali, voice: "none", density: 0, beat: 1.6, level: 0.4, ambience: "none" },
  creation: { palette: "tanpura", scale: SCALES.yaman, voice: "santoor", density: 0.55, beat: 0.7, level: 1.15, ambience: "none", register: 2 },
  radiant: { palette: "tanpura", scale: SCALES.yaman, voice: "bansuri", density: 0.42, beat: 0.85, level: 1.05, ambience: "none", register: 2 },

  // ---- Night 5: Skandamata
  lullaby: { palette: "tanpura", scale: SCALES.khamaj, voice: "santoor", density: 0.4, beat: 1.1, level: 1.0, ambience: "none", register: 2 },
  march: { palette: "tanpura", scale: SCALES.durga, voice: "bansuri", density: 0.5, beat: 0.65, level: 1.05, ambience: "none", pulse: true, register: 2 },
  menace: { palette: "tanpura", scale: SCALES.asavari, voice: "bansuri", density: 0.15, beat: 1.2, level: 0.9, ambience: "wind", pulse: true, register: 1 },

  // ---- Night 6: Katyayani
  kindling: { palette: "tanpura", scale: SCALES.hamsadhwani, voice: "santoor", density: 0.5, beat: 0.7, level: 1.1, ambience: "fire", register: 2 },
  shakti: { palette: "tanpura", scale: SCALES.hamsadhwani, voice: "bansuri", density: 0.42, beat: 0.8, level: 1.05, ambience: "none", bells: 8, register: 2 },

  // ---- Night 7: Kalaratri
  ratri: { palette: "tanpura", scale: SCALES.malkauns, voice: "bansuri", density: 0.24, beat: 1.3, level: 0.9, ambience: "wind", register: 1 },
  fierce: { palette: "tanpura", scale: SCALES.malkauns, voice: "santoor", density: 0.38, beat: 0.6, level: 1.0, ambience: "fire", pulse: true, bells: 4, register: 1 },

  // ---- Night 8: Mahagauri
  renewal: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.4, beat: 0.9, level: 1.0, ambience: "rain", register: 2 },
  festive: { palette: "tanpura", scale: SCALES.khamaj, voice: "santoor", density: 0.55, beat: 0.6, level: 1.05, ambience: "none", bells: 8, register: 2 },

  // ---- Night 9: Siddhidatri
  infinite: { palette: "tanpura", scale: SCALES.yaman, voice: "bansuri", density: 0.26, beat: 1.25, level: 0.95, ambience: "none", bells: 16, register: 2 },
  ocean: { palette: "tanpura", scale: SCALES.yaman, voice: "santoor", density: 0.32, beat: 1.0, level: 0.95, ambience: "wind", register: 2 },

  // ---- reading, deciding, talking: quiet beds that don't compete with text
  reflect: { palette: "tanpura", scale: SCALES.bhupali, voice: "santoor", density: 0.1, beat: 1.2, level: 0.55, ambience: "none", register: 2 },
  hold: { palette: "tanpura", scale: SCALES.bhupali, voice: "none", density: 0, beat: 1.2, level: 0.6, ambience: "none" },

  // ---- Marvel scenes: the film palette
  filmQuiet: { palette: "film", scale: SCALES.minor, voice: "none", density: 0, beat: 1.4, level: 0.7, ambience: "none", chords: FILM_MINOR },
  filmHold: { palette: "film", scale: SCALES.minor, voice: "none", density: 0, beat: 1.6, level: 0.55, ambience: "none", chords: FILM_TENSION },
  filmTension: { palette: "film", scale: SCALES.minor, voice: "none", density: 0, beat: 1.0, level: 0.85, ambience: "none", pulse: true, chords: FILM_TENSION },
  filmStruggle: { palette: "film", scale: SCALES.minor, voice: "cello", density: 0.25, beat: 1.0, level: 0.85, ambience: "wind", pulse: true, chords: FILM_MINOR, register: 1 },
  filmEpic: { palette: "film", scale: SCALES.dorian, voice: "cello", density: 0.45, beat: 0.75, level: 1, ambience: "none", brass: true, chords: FILM_HOPE, register: 1 },
  filmLament: { palette: "film", scale: SCALES.minor, voice: "cello", density: 0.35, beat: 1.3, level: 0.9, ambience: "none", chords: FILM_LAMENT, register: 1 },
  filmAncestral: { palette: "film", scale: SCALES.dorian, voice: "kalimba", density: 0.4, beat: 0.9, level: 1.1, ambience: "none", choir: true, chords: FILM_WARM, register: 2 },
  filmWonder: { palette: "film", scale: SCALES.lydian, voice: "kalimba", density: 0.45, beat: 0.8, level: 1.1, ambience: "none", choir: true, chords: FILM_WONDER, register: 2 },
  filmNight: { palette: "film", scale: SCALES.minor, voice: "cello", density: 0.2, beat: 1.5, level: 0.7, ambience: "none", chords: FILM_MINOR, register: 1 },
  filmSnow: { palette: "film", scale: SCALES.minor, voice: "kalimba", density: 0.2, beat: 1.3, level: 0.75, ambience: "wind", chords: FILM_LAMENT, register: 2 },
} satisfies Record<string, MoodDef>;

export type Mood = keyof typeof MOODS;

export const DRONE_SA = SA;
/** Film pads sit on D as well, so moving between the two worlds never jars. */
export const FILM_ROOT = SA;
