// ---------------------------------------------------------------------------
// The narrator: reads captions aloud with the browser's built-in voices
// (the Web Speech API). Nothing is downloaded or sent anywhere.
//
// Voices differ by device. We prefer an Indian English voice, then any
// English voice. Hindi is used only for the SayName pronunciation helper.
// ---------------------------------------------------------------------------

import { sound } from "./sound";

const synth = (): SpeechSynthesis | null =>
  typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;

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

/**
 * Prefer American English (en-US), then Canadian (en-CA), then any English.
 * British and Indian English are deliberately not preferred — their TTS voices
 * sound unnatural with sentence-split pauses on most browsers.
 */
function pickEnglish(): SpeechSynthesisVoice | undefined {
  const byUS = voices.find((v) => v.lang.toLowerCase().startsWith("en-us"));
  if (byUS) return byUS;
  const byCA = voices.find((v) => v.lang.toLowerCase().startsWith("en-ca"));
  if (byCA) return byCA;
  // Skip en-GB and en-IN; take any other English voice
  return voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith("en") &&
      !v.lang.toLowerCase().startsWith("en-gb") &&
      !v.lang.toLowerCase().startsWith("en-in"),
  ) ?? voices.find((v) => v.lang.toLowerCase().startsWith("en"));
}

// ---------------------------------------------------------------------------
// Chrome / Android TTS bug: speechSynthesis spontaneously stops after ~14 s
// on long utterances and never fires "onend". Two mitigations:
//   1. Split text into sentences — each utterance is a short sentence,
//      well under the cutoff, queued via onend callbacks.
//   2. keepAlive interval calls pause()+resume() every 10 s to prevent the
//      synthesis engine from going idle between queued sentences.
// ---------------------------------------------------------------------------

let keepAliveId: number | undefined;

function startKeepAlive() {
  if (keepAliveId !== undefined) return;
  keepAliveId = window.setInterval(() => {
    const s = synth();
    if (s?.speaking) { s.pause(); s.resume(); }
  }, 10_000);
}

function clearKeepAlive() {
  window.clearInterval(keepAliveId);
  keepAliveId = undefined;
}

/** Split at sentence boundaries, keeping punctuation with each sentence. */
function splitSentences(text: string): string[] {
  // Use a try/catch in case the lookbehind assertion isn't supported.
  try {
    return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  } catch {
    return [text];
  }
}

/**
 * Epoch counter: incremented on every cancel(). Each queued sentence checks
 * that the epoch still matches before speaking, so stale queues stop cleanly.
 */
let epoch = 0;

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
    return () => { listeners.delete(fn); };
  },

  /**
   * Speak `text`. `onEnd` is called once all sentences have been read.
   * It is NOT called when speech is cancelled on purpose (pause, skip, exit).
   * Text is split into sentences and queued sequentially to work around the
   * Chrome long-utterance cutoff bug.
   */
  speak(text: string, onEnd?: () => void, opts: { lang?: "en" | "hi" } = {}) {
    const s = synth();
    narrator.cancel();

    if (!s || voices.length === 0) {
      // No voice available: behave as if the line was read so the story continues.
      window.setTimeout(() => onEnd?.(), 0);
      return;
    }

    const myEpoch = ++epoch;
    const voice =
      opts.lang === "hi"
        ? pick(["hi"]) ?? pickEnglish()
        : pickEnglish();

    const parts = splitSentences(text);
    if (parts.length === 0) { onEnd?.(); return; }

    sound.duck(true);
    startKeepAlive();

    let i = 0;
    let safeTimer: number | undefined;

    function speakNext() {
      if (epoch !== myEpoch) return; // cancelled — stop the chain silently
      if (i >= parts.length) {
        clearKeepAlive();
        sound.duck(false);
        onEnd?.();
        return;
      }
      const u = new SpeechSynthesisUtterance(parts[i++]);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = opts.lang === "hi" ? 0.8 : 0.95;

      // Per-sentence safety timeout — much shorter than the old whole-text timeout.
      const words = u.text.split(/\s+/).length;
      safeTimer = window.setTimeout(() => {
        if (epoch === myEpoch) speakNext();
      }, (words / 2.2 + 3) * 1000);

      u.onend = () => { window.clearTimeout(safeTimer); speakNext(); };
      u.onerror = () => { window.clearTimeout(safeTimer); speakNext(); };

      s!.speak(u);
    }

    speakNext();
  },

  cancel() {
    epoch++;
    clearKeepAlive();
    window.clearTimeout(undefined); // no-op; safe
    sound.duck(false);
    const s = synth();
    if (s && (s.speaking || s.pending)) s.cancel();
  },
};
