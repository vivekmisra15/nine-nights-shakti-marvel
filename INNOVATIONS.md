# Nine Nights — Technical Innovations

*A learning document. Written as a homage to Saraswati — the Devi of knowledge, learning, and the creative arts — on the completion of a project built in her honour.*

---

There is a recurring habit in software: reach for a library, a service, a framework when you meet a hard problem. Nine Nights took the opposite path at several points. The results are worth naming.

---

## 1. Illustrations as pure functions of time

Every one of the sixty-plus illustrations in the app is a React component with a single prop:

```tsx
type Visual = ({ t }: { t: number }) => ReactNode;
```

`t` is time in seconds, advancing with `requestAnimationFrame`. The entire visual — fades, movements, colour shifts, particle drifts — is expressed as arithmetic on `t`.

This is unusual. Most animation systems track state: "this element is currently here, moving toward there." This app tracks nothing. Given the same `t`, the illustration draws the same frame, every time, without exception.

The consequence is that pause, slow motion, scrubbing, replay, and freeze-frames came for free. None of those features required any illustration code. The clock owns `t`; the illustrations respond. That clean separation — time owner and time responder — is the most elegant engineering decision in the project.

---

## 2. Deterministic randomness

Star fields, particle drifts, and flame flickers all look random. They are not random — they are deterministic.

```ts
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
```

This is a Park-Miller linear congruential generator. The same seed always produces the same sequence. Every star in the Night 1 sky is at the same position every time the app loads, because its position is computed from a fixed seed rather than from `Math.random()`.

Why does this matter? Because scrubbing backward to `t = 3` must draw exactly the same star field as playing forward to `t = 3`. If stars moved on scrub, the illustration would flicker and break the illusion. Determinism is what makes a scrub-able animation possible.

---

## 3. A music engine with no audio files

The entire score — nine ragas, two Marvel soundscapes, ambient wind, rain, and fire, bells, a tanpura drone, bansuri phrases, santoor figures, cello, kalimba, choir vowels — is generated in real time in the browser using the Web Audio API. There are no `.mp3` or `.ogg` files anywhere in the project.

The engine builds a small audio graph once:

```
drone/pad  ──┐
melody      ──┼──► music bus ──► slow-motion filter ──► master ──► compressor ──► speakers
bell hits   ──┘         ↘ reverb ↗
ambience ──────────────────────────────────────────────────────► master
```

Each raga is a list of semitone intervals above Sa (the tonic). The engine schedules notes a short time ahead, chooses scale degrees according to mood density, and shapes each note with attack and decay gain envelopes. Wind, rain, and fire are filtered noise buffers. The reverb is a convolution reverb rendered from a synthetic impulse response at startup.

When the learner switches to slow motion, a lowpass filter in the music bus cuts the high frequencies — the music literally sounds slower and heavier. When the narrator speaks, all music gain nodes duck. When a freeze-frame rings, a bell is struck by shaping a sine wave with a sharp attack and a long exponential decay.

This is not a common approach. It works because the score is atmospheric and not tightly beat-matched to video — the algorithmic phrases need only to feel right for the moment, not hit exact cues. The trade-off is that the melodies cannot be performed with the same nuance a musician would bring. The payoff is that the music is completely original, requires no licensing, and is zero kilobytes.

---

## 4. Fixing Chrome's TTS silence bug

The Web Speech API has a well-known fault on Chrome and Android: speech synthesis stops silently after roughly 14 seconds on any long utterance and never fires the `onend` event. For a read-aloud feature that narrates multi-sentence captions, this breaks the experience entirely.

The fix is two-part, without any external library:

**Sentence splitting.** Instead of passing a whole caption as one utterance, the text is split at sentence boundaries using a lookbehind regex:

```ts
text.split(/(?<=[.!?])\s+/)
```

Each sentence becomes its own `SpeechSynthesisUtterance`, queued via `onend` callbacks. Short sentences are well inside the 14-second limit.

**Keep-alive.** Between queued sentences, the synthesis engine can go idle. A `setInterval` running every 10 seconds calls `pause()` then `resume()` on the `SpeechSynthesis` object, which prevents the engine from sleeping.

**Epoch counter.** Cancelling narration (on pause, skip, or exit) increments a counter. Each sentence closure captures the counter value at the time it was queued. Before speaking, it checks that the current counter still matches — if not, it drops silently. This prevents a cancelled narration chain from continuing to speak after the learner has moved on.

Three separate problems, three clean solutions, no dependencies.

---

## 5. The clock's ref-and-state dual write

The `requestAnimationFrame` loop in `useClock` reads time-sensitive values without stale closures and without restarting the loop on every render. The technique:

```ts
const tRef = useRef(t);
const [t, setT] = useState(0);

// Inside the rAF callback:
tRef.current = next;
setT(next);
```

The ref is read by the loop (never stale); the state is written to trigger React renders. A separate `opts` ref holds the current `userRate`, `stopAt`, and `slow` window and is updated synchronously on every render — so the loop always sees the latest settings without being restarted.

This pattern avoids both of the common pitfalls: a loop that captures stale state values (and therefore ignores slider changes), and a loop that restarts on every render (and therefore drops frames). It is a small thing, but it is why the scrubber, the speed chip, and the slow-motion window all respond instantly.

---

## 6. Epistemic honesty as a data field

Every beat in every night carries a `kind` field:

```ts
type ClaimKind =
  | "tradition"       // what a named traditional source says
  | "interpretation"  // a traditional devotional or philosophical reading
  | "contemporary"    // a modern reading, including ours
  | "comparison"      // our own educational comparison
  | "marvel"          // what happens in a Marvel film
  | "hypothetical";   // imagined; not in any source
```

The interface displays this as a coloured tag on every step. It is not possible to write a beat without declaring what kind of claim it is.

This is not a common pattern in educational apps. Most simply present content. Here the data model itself enforces intellectual honesty — the difference between what the Devi Mahatmya says, what a devotional reading adds, and what the authors invented for discussion is always visible to the learner. TypeScript makes this a compile-time requirement, not a guideline.

---

## 7. A single HTML file ships the whole app

The Vite build produces one `index.html` with all CSS and JavaScript inlined. No CDN, no asset bucket, no separate chunk loading. The app is that file.

This matters for the hosting choice (GitHub Pages, free tier) and for the experience on slow connections: once the page has loaded, everything is local. There are no waterfall requests for fonts, chunks, or images, because there are no external images. Every illustration is SVG drawn by React at runtime.

---

These seven things were not planned as a set. They emerged from the same governing constraint — no unnecessary infrastructure — applied repeatedly to specific problems. That is perhaps what innovation usually is: a constraint held long enough that it forces an original path.
