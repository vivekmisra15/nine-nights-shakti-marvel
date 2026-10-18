// ---------------------------------------------------------------------------
// The app's single sound controller. Components call these functions; they
// do nothing until the learner turns music on (browsers only allow sound to
// start after a click or key press).
// ---------------------------------------------------------------------------

import { MusicEngine } from "./engine";
import type { Ambience, Hit, Mood } from "./moods";

let ctx: AudioContext | null = null;
let engine: MusicEngine | null = null;
let timer = 0;
let wanted = false;
let volume = 0.7;
let ducked = false;
let pendingMood: Mood = "intro";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function start() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    engine = new MusicEngine(ctx);
    engine.setVolume(volume);
    engine.setMood(pendingMood);
    timer = window.setInterval(() => {
      if (ctx && engine && ctx.state === "running") engine.schedule(ctx.currentTime + 0.35);
    }, 60);
  }
  void ctx.resume().then(notify);
}

/** Browsers block sound until the first click or key press, so wait for one. */
function armUnlock() {
  const unlock = () => {
    if (wanted) start();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
}

export const sound = {
  /** Call from a click handler to turn music on or off. */
  setEnabled(on: boolean) {
    wanted = on;
    if (on) start();
    else if (ctx) void ctx.suspend().then(notify);
    notify();
  },
  /** On page load: remember the learner's choice, and start at the first interaction. */
  restore(on: boolean, vol: number) {
    wanted = on;
    volume = vol;
    if (on) armUnlock();
  },
  setVolume(v: number) {
    volume = v;
    engine?.setVolume(ducked ? v * 0.35 : v);
  },
  /** Lower the music while the narrator is speaking, then bring it back. */
  duck(on: boolean) {
    ducked = on;
    engine?.setVolume(on ? volume * 0.35 : volume);
  },
  setMood(m: Mood) {
    pendingMood = m;
    engine?.setMood(m);
  },
  setHeld(h: boolean) {
    engine?.setHeld(h);
  },
  setRate(r: number) {
    engine?.setRate(r);
  },
  setAmbience(a: Ambience) {
    engine?.setAmbience(a);
  },
  hit(h: Hit) {
    if (ctx?.state === "running") engine?.hit(h);
  },
  isOn() {
    return wanted;
  },
  isRunning() {
    return ctx?.state === "running";
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  /** For tests: a peek at what the engine is doing. */
  debug() {
    return { state: ctx?.state ?? "none", mood: engine?.currentMood ?? pendingMood, notes: engine?.notes ?? 0 };
  },
  dispose() {
    window.clearInterval(timer);
  },
};

if (typeof window !== "undefined") (window as unknown as { __sound: typeof sound }).__sound = sound;
