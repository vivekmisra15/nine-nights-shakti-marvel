# Nine Nights

An interactive journey through Navaratri. Each night tells the traditional story of one form of the Devi, lets the learner make choices at the turning points, then looks at the same idea through two Marvel scenes, with questions to think through together.

> **Disclaimer:** This is an independent, non-commercial, educational project. It has no affiliation with Marvel Entertainment, LLC or The Walt Disney Company. No Marvel images, footage, dialogue, or audio are reproduced. All scene descriptions are original paraphrases; all illustrations are original artworks generated in code. All thematic interpretations are the authors' own. Marvel character names and film titles are trademarks of their respective owners. [Full disclaimer →](DISCLAIMER.md)

This version contains all nine nights. Each night has a one-word **theme** and one **core idea**. The core idea is the headline of "What the story is about" and, word for word, the line "To carry with you" at the end of the night.

| Night | Devi | Theme | Core idea |
| --- | --- | --- | --- |
| 1 | Shailaputri | Rootedness | What you are rooted in can survive what you lose. |
| 2 | Brahmacharini | Resolve | What you practise, day after day, changes who you are. |
| 3 | Chandraghanta | Readiness | Strength can protect just by being ready. |
| 4 | Kushmanda | Creation | What you make carries something of why you made it. |
| 5 | Skandamata | Nurture | True care helps someone grow strong enough to go their own way. |
| 6 | Katyayani | Courage | When something is wrong, stand up to it, and stand together. |
| 7 | Kalaratri | Fearlessness | Face the dark without becoming part of it. |
| 8 | Mahagauri | Renewal | After a hard time, you can begin again, clearer than before. |
| 9 | Siddhidatri | Wholeness | You are whole when you know you are part of the whole. |

To change a theme or core idea, edit `theme` at the top of the day's file, and `simple`, `deeper` and `takeaway` in its `idea` and `reflection` steps (keep `simple` and `takeaway` identical). The map reads themes from `content/journey.ts`.

## Stories and scenes

| Night | Story | Marvel scenes | Question |
| --- | --- | --- | --- |
| 3 Chandraghanta | The wedding procession; the bell in the Devi Mahatmya (ch. 2 and 9) and the gods' hymn (ch. 4) | Okoye faces W'Kabi's rhino (Black Panther); Banner's "always angry" and the diner (Avengers, Endgame) | Can the same strength feel like safety to one person and a threat to another? |
| 4 Kushmanda | Darkness (Rig Veda 10.129), the smile and the cosmic egg, the sun | Tony in the cave (Iron Man); Ultron and Vision in the forest (Age of Ultron) | Does it matter why someone creates something? |
| 5 Skandamata | Taraka, the spark, six Krittikas, six babies gathered into one; the vel (Tamil tradition) | Frigga and Thor (Endgame); the suit taken, then the rubble (Homecoming) | When does protecting someone start holding them back? |
| 6 Katyayani | Mahisha's boon (Devi Bhagavata 5); the gods' light becomes the Devi, their gifts, the battle (Devi Mahatmya ch. 2–3) | Fury and Coulson's cards (The Avengers); Carol and Yon-Rogg (Captain Marvel) | What do people feel safe from only because they don't take it seriously? |
| 7 Kalaratri | Night as protector (Rig Veda 10.127); the fierce form with gentle hands; Kali and Raktabija (Devi Mahatmya ch. 7–8) | Strange and Dormammu (Doctor Strange); the cage (Werewolf by Night, preview first) | Have you ever made a problem bigger by fighting it? |
| 8 Mahagauri | Years of tapas, washed by the Ganga; Kalaratri and Mahagauri as one Devi; Kanya Puja | Nebula and Gamora (Guardians of the Galaxy Vol. 2); Bucky and Yori (The Falcon and the Winter Soldier) | When someone is renewed after a hard time, what washes away and what stays? |
| 9 Siddhidatri | The siddhis and the caution about them (Yoga Sutras 3.37); Ardhanarishvara (devotional); the Devi Gita's light with no edges; the wave and the ocean; nine lamps | Thor becomes worthy (Thor); "Everything" (Avengers: Infinity War) | What makes you feel part of something bigger than yourself? |

## Evenings, names and reading aloud

- **Full or short evening.** Choose on the map before entering a night, or switch with the chip at the top of a night. The full evening (about 45 to 60 minutes) has every step. The short evening (about 20 minutes) keeps the story, the choice, the core idea, the first Marvel scene with its questions, and the reflection; it skips "How she is pictured", the second Marvel scene, "Side by side" and "In your world". The rule lives in `src/content/paths.ts`.
- **How to say each name.** The map shows a rough respelling (for example "koosh-MAAN-daa") and a speaker button. The button uses a Hindi voice for the Devanagari name if the device has one, otherwise an English voice. Respellings are in `src/content/journey.ts` (`say`).
- **Read aloud.** The "Read aloud" chip (or the V key) reads each caption as it appears, using the device's built-in voices. If the next caption is due while the voice is still speaking, the story waits for it. Music dips while the voice speaks. Pausing stops the voice. The core idea and the reflection are read too. Voices vary by device; the button only appears when the device has one.

## Parent prep sheet

"Parent prep sheet" on the map lists all 18 Marvel scenes in order: the film or series, its US age rating, which scene, where it falls in the story, a search phrase to copy, and a "Preview first" flag with the reason where one is needed. Switch to "Scene one only" for short evenings. Tick each scene once you've found and previewed it (ticks are saved in this browser). It prints cleanly on white paper.

## Finding the Marvel scenes

The app has no links to video sites. Each Marvel scene has a **Find the scene** card: the film, where the scene falls in the story (not a timestamp), and a phrase to search for on Disney+ or YouTube, with a Copy button. The parent finds and previews the scene; the app retells it in words and original drawings, so it works without watching too.

## What changed in V2

- "Where the comparison breaks down", spoiler warnings, suitability notes and verification lists are gone.
- Each Marvel scene now ends with **Think it through**: a ladder of six questions (Notice, Feel, Wonder, Stretch, Turn it around, Connect), follow-ups for the parent ("if they say… try asking…"), a **stance line** where each person places themselves, and a short activity with a timer.
- More animation: a slow camera push on every scene, moving weather (embers, snow, rain, petals, ash), new scenes, several freeze-frames in one scene (the seasons of Parvati's tapas), entrance animations, and lamps that light up on the map.
- Sati's story is told more gently, with notes for the parent.

## Music

The app composes its music live in the browser, so there are no audio files and every note is original.

- **Tradition scenes:** a tanpura drone with bansuri (flute) or santoor phrases. The raga changes with the moment: Bhupali for dawn and devotion, Yaman for union and Shiva's reveal, Bageshri for Parvati's longing and tapas, Marwa for the tension at the sacrifice, and a grave Asavari-like scale for grief.
- **Marvel scenes:** a separate film palette of string pads, cello, kalimba and choir-like voices, with low pulses for tension.
- **Ambience:** wind on the mountains, rain in the monsoon, crackling fire at the sacrifice.
- **It follows the story.** Pausing rests the melody while the drone continues. Slow motion slows and softens the music. Freeze-frames ring a soft bell. Scrubbing back resets the music to match.
- **Nights 3 to 5:** a Durga-scale santoor with a temple bell on the beat for Chandraghanta, near-silence then Yaman for Kushmanda's darkness and creation, and a Khamaj lullaby and a Durga-scale march for Skandamata.
- **Nights 6 and 7:** Hamsadhwani for the gods' light gathering into the Devi, and Malkauns, a deep-night raga, for Kalaratri.
- **Nights 8 and 9:** Bhupali with rain for the Ganga's water, a festive Khamaj for Kanya Puja, and a slow Yaman with distant bells for the infinite.
- **Bells:** the reveal after each choice, and lighting a night's lamp on the map.
- Pages for reading, deciding and talking get a quiet bed that won't compete with conversation.

Music is off until you turn it on (the Music button, or press M). Browsers only allow sound after a click, so if music was on last time it starts at your first click. The score lives in `src/audio/moods.ts`, and each story step's cues are in the `sound` field of each day's file.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
cd nine-nights
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

- `npm run build` makes a finished copy in `dist/` for any web host.
- `npm run preview` serves that finished copy locally.
- `npm run typecheck` checks the TypeScript.

## Where things live

```
src/
  content/          ← all lesson text. Edit here, not in components.
    types.ts        the shapes every day's content follows
    day1.ts … day9.ts   one file per night
    journey.ts      the app title, nine map stops and the opening text
  engine/
    useClock.ts     play, pause, slow motion, replay, freeze-frames
    anim.ts         easing helpers for the illustrations
  visuals/
    shared.tsx      sky, stars, mountains, lights, flames, particles
    kit.tsx         bells, moons, lotuses, big cats, skylines, spears
    day1/ … day9/   each night's illustrations, drawn from a time value
    index.ts        registry of all illustrations
  audio/
    moods.ts        the score: ragas, instruments and ambience for each mood
    engine.ts       the synthesiser (Web Audio): drone, voices, bells, ambience
    sound.ts        turns music on and off and passes story events to the engine
  components/       the interface (map, opening, day player, control bar, find-the-scene card…)
    beats/          one view per kind of step
  state/progress.ts saves progress in this browser only
  styles.css        the whole visual system
```

## Editing content

Each day is a list of **beats** (steps). Types: `story`, `choice`, `idea`, `sceneIntro`, `think`, `comparison`, `today`, `reflection`. Every beat has a `kind` label (`tradition`, `interpretation`, `contemporary`, `comparison`, `marvel`, `hypothetical`) that the app shows.

**To change where a scene is or what to search for:** in the day's file, find the `sceneIntro` beat and edit `find.where` and `find.search`. `parentNote` adds guidance shown before the scene.

**Each night** is one content file plus one illustrations folder, registered in `content/journey.ts` and `visuals/index.ts`.

## Controls

| Key | Action |
| --- | --- |
| Space | play or pause (continues from a freeze-frame) |
| ← → | previous or next step |
| R | replay the current sequence |
| S | slow motion on or off |
| T | read the whole day as text |
| C | context and sources |
| M | music on or off |
| V | read aloud on or off |

"Reading" mode turns animation off and shows every step complete. It turns on automatically if the device asks for reduced motion.

## Notes

- Marvel scenes are retold in words and drawn as original abstract illustrations. The app has no links to footage and never copies any. All dialogue is paraphrased.
- Progress, notes and stance names are stored only in this browser. Nothing is sent anywhere.
