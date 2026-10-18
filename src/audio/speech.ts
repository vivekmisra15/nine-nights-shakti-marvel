// ---------------------------------------------------------------------------
// The narrator: reads captions aloud with the browser's built-in voices
// (the Web Speech API). Nothing is downloaded or sent anywhere.
//
// Voices differ by device. We prefer an Indian English voice, then any
// English voice. For the Devi's names we use a Hindi voice when the device
// has one, because it pronounces Sanskrit names far better.
// ---------------------------------------------------------------------------

import { sound } from "./sound";

const synth = (): SpeechSynthesis | null => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);

let voices: SpeechSynthesisVoice[] = [];
const listeners = new Set<() => void>();

function loadVoices() {
  const s = synth();
  if (!s) return;
  voices = s.getVoices();
  listeners.forEach((fn) => fn());
}

if (synth()) {
  loadVoices();
  synth()!.addEventListener?.("voiceschanged", loadVoices);
}

const pick = (prefixes: string[]) => {
  for (const p of prefixes) {
    const v = voices.find((x) => x.lang.toLowerCase().startsWith(p));
    if (v) return v;
  }
  return undefined;
};

let current: { cancel: () => void } | null = null;

export const narrator = {
  /** True when this browser can speak and has at least one voice. */
  available() {
    return !!synth() && voices.length > 0;
  },
  hasHindiVoice() {
    return !!pick(["hi"]);
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  /**
   * Speak `text`. `onEnd` is called once when the line has been read, fails,
   * or after a safety timeout (some browsers never fire "end"). It is not
   * called when speech is cancelled on purpose.
   */
  speak(text: string, onEnd?: () => void, opts: { lang?: "en" | "hi" } = {}) {
    const s = synth();
    narrator.cancel();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      sound.duck(false);
      current = null;
      onEnd?.();
    };
    if (!s || voices.length === 0) {
      // No voice on this device: carry on as if the line had been read.
      window.setTimeout(finish, 0);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    const voice = opts.lang === "hi" ? pick(["hi"]) ?? pick(["en-in", "en"]) : pick(["en-in", "en-gb", "en"]);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    }
    u.rate = opts.lang === "hi" ? 0.8 : 0.95;
    u.onend = finish;
    u.onerror = finish;
    // Safety net: about 2.6 words a second, plus a margin.
    const words = text.split(/\s+/).length;
    const timer = window.setTimeout(finish, (words / 2.2 + 3) * 1000);
    current = {
      // Stopping on purpose (pause, skip, leave) does not count as "finished".
      cancel: () => {
        done = true;
        window.clearTimeout(timer);
        sound.duck(false);
      },
    };
    sound.duck(true);
    s.speak(u);
  },
  cancel() {
    const s = synth();
    const c = current;
    current = null;
    if (s && (s.speaking || s.pending)) s.cancel();
    c?.cancel();
  },
};
