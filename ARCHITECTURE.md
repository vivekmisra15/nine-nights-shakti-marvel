# Nine Nights — Architecture and Key Decisions

*A learning document. Written at the completion of the project to capture why things are the way they are.*

---

## The one governing principle

The owner is learning to build applications. Every structural decision flows from one rule stated in `CLAUDE.md`:

> Keep the code simple, readable and editable, with no unnecessary infrastructure: no backend, no accounts, no analytics, no new dependencies unless clearly needed.

That is not a constraint — it is the design. Everything below is an expression of it.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 | Component model is the right fit for an app with many distinct screen types (map, intro, player, drawers). No opinion on routing or data fetching needed. |
| Language | TypeScript | The content schema is complex (8 beat types, each with different fields). Types catch mistakes at edit time rather than at run time. |
| Build tool | Vite | Fast local development, straightforward config, and produces a single inlined HTML file for GitHub Pages with one flag (`build`). |
| Styling | One plain CSS file | No CSS-in-JS overhead, no build-time magic. Every style is visible in one place. Custom properties (`--step-3`, `--gold`, `--figure`) give the app a consistent visual language without a design-system dependency. |
| Hosting | GitHub Pages via GitHub Actions | Zero cost, zero ops. The `deploy.yml` workflow runs on every push to `main`: install, build, upload the `dist/` folder as a Pages artifact. |
| Storage | `localStorage` only | No server, no accounts, no personal data leaves the device. Progress, choices, stances, and names are stored per-browser in a single JSON blob under the key `nine-nights-progress-v2`. All reads and writes are wrapped in `try/catch` because private-mode browsers refuse storage access. |

---

## How the codebase is divided

```
content/        ← all lesson text
engine/         ← time and animation primitives
visuals/        ← illustrations as pure functions of time
audio/          ← music synthesis and speech
components/     ← the interface
state/          ← progress persistence
styles.css      ← the entire visual system
```

The most important division is **content vs. components**. Every word the learner reads lives in `content/day1.ts` through `content/day9.ts`. No component ever contains lesson text. This means a parent, teacher, or content editor can open a day file and change wording, questions, sources, or scene descriptions without touching any React code at all.

---

## The beat and section system

Each night is a `DayContent`: a flat, ordered list of `beats`. A beat has a `type` (one of eight: `story`, `choice`, `idea`, `sceneIntro`, `think`, `comparison`, `today`, `reflection`) and a `section` (one of eight: `enter`, `story`, `choice`, `idea`, `marvel`, `compare`, `today`, `reflect`).

**Why flat?** A flat array is easy to index, easy to iterate, and easy to filter. The short-evening view is produced by `paths.ts` — a single pure function that takes the full beat array and returns a filtered list of indexes. No content is duplicated; no alternate data structure exists. Switch the evening setting and you walk a different subset of the same array.

**Why typed beats?** Each beat type has its own TypeScript interface in `types.ts`. The interface — not any component — is the contract. Adding a new field to a beat type makes the compiler point to every component that needs to handle it. This was the right call: the content schema evolved substantially during the nine-night build, and TypeScript caught every mismatch.

**The `kind` label system.** Every beat carries a `kind` field: `tradition`, `interpretation`, `contemporary`, `comparison`, `marvel`, or `hypothetical`. The interface shows it as a coloured tag. This is an epistemic honesty system built into the data model. It is not possible to write a beat without declaring what kind of claim it is.

---

## Visuals: illustrations as pure functions of time

Every illustration is a React component of a single prop, `t`, measured in seconds:

```tsx
const marriage: Visual = ({ t }) => {
  const daksha = seg(t, 0.2, 2.2);
  // ...
};
```

`seg(t, a, b)` returns a smoothly eased value from 0 to 1 as `t` moves from `a` to `b`. All animation — fades, movements, colour changes — is expressed as arithmetic on `t`.

**Why this matters.** Because the visual is a pure function:
- **Pause** is just stopping `t` from advancing.
- **Slow motion** is just advancing `t` more slowly.
- **Scrubbing** is just setting `t` to any value.
- **Replay** is just resetting `t` to 0.
- **Freeze-frames** are just stopping `t` at an exact value.

None of these features required special illustration code. The `useClock` hook owns `t`; every visual gets the correct frame for free.

Randomness in illustrations (star positions, particle drift) uses `seeded(n)`, a deterministic PRNG. The same seed always produces the same sequence, so a star field looks identical at `t = 4` whether you played forward, scrubbed, or replayed.

---

## The clock: `useClock`

The clock is the most carefully engineered piece in the project. It uses a `requestAnimationFrame` loop, but the loop reads from `useRef` values, not from React state — this avoids stale closures without restarting the loop on every render.

The pattern:

```ts
const tRef = useRef(t);           // ref for the loop
const [t, setT] = useState(0);    // state for React renders

// In the loop:
tRef.current = next;
setT(next);  // triggers a render with the new t
```

This means the `rAF` callback never captures a stale value of `t`, while React components still re-render on every frame. The loop is started once (per `enabled` change) and reads the latest user settings (`userRate`, `stopAt`, `slow`) from a separate `opts` ref that is updated synchronously on every render.

**Slow-motion windows** are defined in content: `slow: { from, to, rate }`. The clock applies the rate automatically when `t` falls in the window. The music engine listens separately and applies a lowpass filter at the same moment.

**Freeze-frames** are time values at which the clock stops and calls `onStop`. The content defines them; the clock enforces them; the component handles the UI.

---

## Music: synthesised, not sampled

There are no audio files in this project. Every sound — tanpura drone, bansuri melody, santoor phrases, string pads, cello, kalimba, choir vowels, wind, rain, fire — is generated in real time by the `MusicEngine` class using the Web Audio API.

The music engine builds a small routing graph once:

```
drone/pad  ──┐
melody      ──┼──► music bus ──► slow-motion filter ──► master ──► compressor ──► speakers
bell hits   ──┘         ↘ reverb ↗
ambience (wind, rain, fire) ──────────────────────────────► master
```

Each mood (`bhupali`, `yaman`, `marwa`, etc.) is a data object that specifies the scale (as semitone intervals above Sa), the voice (bansuri, santoor, cello, kalimba), the density of melody notes, the tempo, the level, and the ambience. Switching mood cross-fades the gain nodes over about two seconds.

**Trade-off.** Synthesis gives complete originality and zero licensing concerns, but the melodies are algorithmic rather than performed. They are musical enough to set atmosphere without being intrusive, which is exactly what a teaching app needs.

---

## Speech: the narrator

Read-aloud uses the browser's built-in `SpeechSynthesis` API. Nothing is sent to any server.

**Chrome's 14-second bug.** Chrome's TTS engine silently stops speaking after roughly 14 seconds on a long utterance and never fires the `onend` event. The fix is two-part:
1. Split every caption into individual sentences (split on `[.!?]` followed by whitespace). Each sentence is a separate `SpeechSynthesisUtterance` queued via `onend` callbacks.
2. A `keepAlive` interval calls `pause()` then `resume()` every 10 seconds to prevent the synthesis engine going idle between queued sentences.

**Epoch counter.** Cancelling narration (on pause, skip, or exit) increments a counter. Each queued sentence checks the counter before speaking. Stale queued sentences from a cancelled chain drop silently.

---

## Deployment

The build produces a single `index.html` with all CSS and JavaScript inlined. No external resources are fetched at runtime except Google Fonts (for Devanagari and the display typeface). This means the app works on a slow connection once the page has loaded.

The GitHub Actions workflow (`deploy.yml`):
1. Checks out the code.
2. Runs `npm ci` (requires `package-lock.json` to be committed).
3. Runs `npm run build` with `VITE_BASE=/nine-nights-shakti-marvel/`.
4. Uploads `dist/` as a GitHub Pages artifact.
5. Deploys to `https://vivekmisra15.github.io/nine-nights-shakti-marvel/`.

`vite.config.ts` sets `base: "/nine-nights-shakti-marvel/"` so all asset paths are relative to the repository subdirectory, not the domain root.

---

## What was deliberately left out

| Thing | Why not included |
|---|---|
| Backend / API | Nothing requires server state. Progress is per-device by design. |
| User accounts | Unnecessary complexity. The family using this knows whose browser is whose. |
| Analytics | No personal data of any kind leaves the device. |
| A component library | The visual language is specific and hand-crafted. A library would fight it. |
| A state manager (Redux, Zustand) | `useProgress` (one hook, one `useState`) covers all global state. |
| A router | Three screens (intro, map, night) navigated by a single `screen` state variable in `App.tsx`. A router would add more than it gives. |
| Test runner | Mentioned in `CLAUDE.md` as absent. The app is verified by playing through each night in the browser. The TypeScript compiler catches structural mistakes at build time. |
| Audio files | Synthesis gives complete originality and eliminates licensing risk entirely. |

---

## Summary

Nine Nights is a deliberately small app. Its complexity lives in its content schema, its music engine, and its time-as-function animation model — all of which are self-contained and well-separated. The interface (components, CSS) is conventional React. Deployment is standard GitHub Pages. Storage is `localStorage`. Nothing here requires a specialist to maintain.

That is the point.
