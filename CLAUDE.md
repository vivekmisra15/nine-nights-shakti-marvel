# Nine Nights

An interactive Navaratri journey for a family with two children (aged 11 and 15). Each of the nine nights tells the traditional story of one form of the Devi, distils it into one theme word and one core idea, and explores that idea through two Marvel scenes, discussion questions and a short activity. Live, generated raga-based music plays throughout.

The owner is learning to build applications. Keep the code simple, readable and editable, with no unnecessary infrastructure: no backend, no accounts, no analytics, no new dependencies unless clearly needed.

## Commands

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the build
npm run typecheck  # tsc --noEmit
```

There is no test runner in the repo. After changes, run `npm run typecheck` and walk through the affected night in the browser (both "Full evening" and "Short evening", and "Explore" and "Go deeper" modes).

## Stack

React 19 + TypeScript + Vite. Plain CSS in `src/styles.css`. Illustrations are SVG drawn by React. Music uses the Web Audio API; read-aloud uses the Web Speech API. Progress is stored in `localStorage` only.

## Where things live

```
src/
  App.tsx                 screens: intro → map → night, plus the prep sheet
  content/                ALL lesson text. Edit content here, not in components.
    types.ts              the shapes every night follows (beats, claims, scenes)
    day1.ts … day9.ts     one file per night
    journey.ts            app title, the nine map stops (theme, say, question), opening text
    paths.ts              which steps make up the full and short evenings
  components/             interface: map, day player, control bar, drawers, prep sheet
    beats/                one view per step type
  visuals/
    shared.tsx            sky, stars, mountains, lights, flames, particles
    kit.tsx               bells, moons, lotuses, big cats, skylines, weapons
    day1/ … day9/         each night's illustrations (exports dayNVisuals, dayNFilm)
    index.ts              registry of all illustrations and the film set
  audio/
    moods.ts              the score: ragas, instruments, ambience per mood
    engine.ts             the synthesiser
    sound.ts              music on/off, moods, ducking
    speech.ts             the narrator (read-aloud and name pronunciation)
  engine/useClock.ts      play, pause, slow motion, seek, freeze-frames
  state/progress.ts       saved progress and settings
```

## How a night is built

A night is a `DayContent` (see `types.ts`): `day`, `name`, `devanagari`, `meaning`, `theme`, `question`, an ordered list of `beats`, `context` panels and `sources`.

Beat types: `story`, `choice`, `idea`, `sceneIntro`, `think`, `comparison`, `today`, `reflection`. Every beat has a `section` (A enter, B story, C choice, D idea, E marvel, F compare, G today, H reflect) and a `kind` claim label: `tradition`, `interpretation`, `contemporary`, `comparison`, `marvel`, `hypothetical`. The app shows these labels, so use them honestly.

Each night has two Marvel scenes: a `sceneIntro` with `role: "primary"` then one with `role: "counterpoint"`, each followed by its story, choice and `think` beats.

### Rules that must hold for every night

- **Theme and core idea.** Each night has one theme word (`theme` in the day file and in `journey.ts`). The idea beat's `simple` line and the reflection's `takeaway` must be **identical**: that sentence is the night's core idea. `deeper` is the "Go further" explanation.
- **Short evening.** `paths.ts` drops beats whose id contains `emblems`, the `compare` and `today` sections, and everything from the counterpoint `sceneIntro` to the end of the Marvel section. Keep ids and roles consistent so this rule still works.
- **Map stops.** A night appears on the map only when it is registered in `days` in `journey.ts`, its stop has `built: true`, and its visuals are registered in `visuals/index.ts`.

## Content principles (the most important part)

These come from the project brief. Follow them for every change to lesson text.

1. **Tradition first.** Establish the traditional story before any Marvel connection. Never start from a Marvel character and retrofit a Hindu story.
2. **Similarity is not equivalence.** Hindu deities are sacred figures in a living tradition; Marvel characters are fiction. Never present a Marvel character as the equivalent of a Devi, or a Hindu story as a version of a superhero story. Every comparison states both what is similar and what is different.
3. **Separate the layers.** Keep apart (a) what a named source says, (b) traditional devotional or philosophical readings, and (c) contemporary interpretations ("Our reading … offered to argue with"). Never present a modern interpretation as ancient teaching.
4. **Cite sources honestly.** Name the text and chapter where known (for example "Devi Mahatmya ch. 2"). Where a story is devotional or a popular retelling with no located primary source, say so in the text and the `context` panel. Where tellings differ, say they differ.
5. **Never invent.** No invented quotes, scene details, episode references or timestamps. Marvel dialogue is always paraphrased and sources say "Dialogue paraphrased." Sanskrit renderings of our own are labelled "our own rendering".
6. **No links to footage.** Each `sceneIntro` has a `find` object: `where` (story position, never a timestamp) and `search` (a phrase to type into Disney+ or YouTube). Do not add YouTube or other video URLs or embeds. Illustrations are original and abstract; never reproduce Marvel imagery, logos or characters' likenesses.
7. **Let the children think.** Questions should not have one approved answer. Each `think` beat has a six-rung ladder (notice, feel, wonder, stretch, flip, connect); the 11-year-old prompts are concrete, the 15-year-old prompts (`deep`) explore motive, ambiguity and consequences rather than harder vocabulary.
8. **Care with sensitive material.** Tell Sati's self-sacrifice gently (yogic power, not fire), with a `parentNote`. Soften violent moments in retellings ("she ends his rule", "catches every drop") and say what the text says in `deep` or `parentNote`. Add a `parentNote` to any `sceneIntro` the parent should preview (violence, abuse themes, major emotional spoilers). On Night 8, do not introduce skin-colour framing of the Mahagauri story; tell it as washing away the dust of tapas.
9. **Style.** Plain, warm British English. Complete sentences. No hype, no theatrical language, no em dashes.

## Visuals

- Each illustration is a `Visual`: `({ t }) => ReactNode`, a pure function of time `t` in seconds, drawn in a 1600 × 900 SVG space. Never use timers, state or randomness that isn't seeded (`seeded()` from `engine/anim.ts`), so pause, slow motion, scrubbing and replay all work.
- Use `seg(t, a, b)` and `lerp` for timing, and align animation with the beat's caption times, `slow` window and `freezes`.
- People are drawn as `Light`s. Keep it abstract.
- Colours are CSS variables on `:root` in `styles.css`; add new tokens there rather than hard-coding hex values in SVG.
- Marvel-scene visuals must be added to the night's `dayNFilm` list so the stage letterboxes them.
- Keep important shapes between y≈100 and y≈780; the letterbox crops film visuals at the top and bottom.

## Music and speech

- Story beats set music through their `sound` field: a starting `mood` and `cues` (`at`, `hit`, `mood`, `ambience`). New moods go in `audio/moods.ts`.
- Music is off until the user turns it on and only starts after a user gesture.
- `narrator.speak()` always ducks the music. `onEnd` fires when a line finishes, fails or times out, but not when speech is cancelled on purpose. Story playback waits for the narrator when read-aloud is on (see `StoryView.tsx`).

## Gotchas

- Never animate `transform` on `.day-main` or any ancestor of the fixed control bar; it breaks `position: fixed`. Animate `.day-main > .story-layout` and `.day-main > .page-layout` instead.
- `DayProgress.beat` and `furthest` are indexes into the full `beats` array, even in the short evening. Use `stepsFor()` to navigate.
- `localStorage` access is always wrapped in try/catch; the app must work without it.
- The hosted copy is a single self-contained HTML file (CSS and JS inlined; only Google Fonts load externally). When bundling, escape any `</script` inside the JS.
- Respect `prefers-reduced-motion`: the app switches to reading mode (no animation) automatically.

## Before you finish a change

- `npm run typecheck` passes.
- The changed night plays through in full and short evenings without console errors.
- New or changed claims follow the content principles above, and `simple` still equals `takeaway`.
- README.md is updated if behaviour or structure changed.
