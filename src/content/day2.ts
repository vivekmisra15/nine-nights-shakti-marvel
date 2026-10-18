// ---------------------------------------------------------------------------
// Day 2: Brahmacharini
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 2).
//
// Same structure as day1.ts. The tapas sequence uses several freeze-frames in
// one beat so the learner faces the same decision again and again as the
// seasons pass.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const KS3 = {
  label: "Kalidasa, Kumarasambhava, Canto 3 (the burning of Kama)",
  url: "https://en.wikipedia.org/wiki/Kum%C4%81rasambhava",
};
const KS5 = {
  label: "Kalidasa, Kumarasambhava, Canto 5 (Parvati's tapas)",
  url: "https://sri-aurobindo.co.in/workings/sa/03/0045_e.htm",
  note: "Sri Aurobindo's notes on Canto 5.",
};
const KS1 = {
  label: "Kumarasambhava 1.26 (how Parvati got the name Uma)",
  url: "https://en.wikipedia.org/wiki/Kum%C4%81rasambhava",
};
const SHIVA_PURANA = { label: "Shiva Purana, Rudra Samhita, Parvati Khanda", note: "A parallel telling." };
const STRANGE = {
  label: "Doctor Strange (2016)",
  url: "https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film)",
  note: "Dialogue paraphrased.",
};
const CAP = {
  label: "Captain America: The First Avenger (2011)",
  url: "https://en.wikipedia.org/wiki/Captain_America:_The_First_Avenger",
  note: "Dialogue paraphrased.",
};

export const day2: DayContent = {
  day: 2,
  name: "Brahmacharini",
  devanagari: "ब्रह्मचारिणी",
  meaning: "The one who practises austerity",
  theme: "Resolve",
  question: "Is discipline about getting what you want, or becoming someone?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d2-enter",
      type: "story",
      section: "enter",
      title: "Night two",
      kind: "tradition",
      visual: "d2Opening",
      sound: { mood: "devotion", cues: [{ at: 0.6, hit: "bellSoft" }, { at: 7.6, hit: "shimmer" }] },
      duration: 13,
      sources: [KS1],
      captions: [
        { at: 0.6, text: "Night two of Navaratri. Tonight's form is Brahmacharini." },
        {
          at: 3.4,
          text: "Her name is usually explained as \"the one who practises austerity\": steady, disciplined devotion.",
          deep: "Brahmacharya also names the student stage of life, given to learning and self-discipline. Some teachers gloss Brahmacharini as \"one who moves in Brahman\", the ultimate reality.",
        },
        {
          at: 7.6,
          text: "Her story picks up where last night ended. Sati has been born again as Parvati, the mountain's daughter. Shiva is still alone on a snowy peak, deep in meditation.",
        },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d2-kama",
      type: "story",
      section: "story",
      title: "The arrow that failed",
      kind: "tradition",
      visual: "d2Kama",
      sound: { mood: "spring", cues: [{ at: 4.4, hit: "shimmer" }, { at: 9.4, hit: "whoosh" }, { at: 11.5, hit: "boom" }, { at: 11.6, mood: "hold" }, { at: 12.4, ambience: "wind" }] },
      duration: 16,
      sources: [KS3],
      captions: [
        {
          at: 0.5,
          text: "A demon named Taraka is terrorising the gods. Only a son of Shiva can defeat him. But Shiva is lost in meditation and wants nothing.",
        },
        {
          at: 4.4,
          text: "So the gods send Kama, the god of desire, with his flower arrows. He brings spring to the frozen mountain out of season.",
        },
        {
          at: 8.0,
          text: "Parvati comes to serve Shiva, bringing flowers. Kama draws his bow.",
        },
        {
          at: 11.6,
          text: "Shiva opens his third eye. Fire pours out, and Kama is burned to ashes in front of Parvati.",
          deep: "Kalidasa gives the next canto to Rati, Kama's wife, grieving. A voice from the sky promises that Kama will live again once Shiva marries.",
        },
      ],
      slow: {
        from: 9.4,
        to: 12.2,
        rate: 0.3,
        prompt: "This is the shortcut: make Shiva want her. Watch what happens to it.",
      },
      hotspots: [
        {
          id: "kama",
          label: "Kama",
          x: 360,
          y: 520,
          title: "Kama, god of desire",
          text: "Kama shoots arrows made of flowers that make people fall in love. Sending him is the gods' plan to make Shiva marry quickly.",
          kind: "tradition",
          source: "Kumarasambhava, Canto 3",
        },
        {
          id: "eye",
          label: "The third eye",
          x: 1100,
          y: 330,
          title: "Shiva's third eye",
          text: "Shiva's third eye sees beyond appearances. When it opens, its fire destroys. Here it destroys desire that tries to force its way in.",
          deep: "Many readers take the burning of Kama as Shiva's mastery over desire. The story also says desire is not gone for ever: Kama is restored later.",
          kind: "interpretation",
        },
        {
          id: "parvati",
          label: "Parvati",
          x: 820,
          y: 610,
          title: "Parvati",
          text: "She has been serving Shiva faithfully. Now she has to watch her hope burn, in public, in front of him.",
          kind: "tradition",
          source: "Kumarasambhava, Canto 3",
        },
      ],
    },
    {
      id: "d2-resolve",
      type: "story",
      section: "story",
      title: "Beauty was not enough",
      kind: "tradition",
      visual: "d2Resolve",
      sound: { mood: "resolve", cues: [{ at: 4.0, hit: "shimmer" }, { at: 7.4, hit: "bellSoft" }] },
      duration: 14,
      sources: [KS5, KS1],
      captions: [
        {
          at: 0.5,
          text: "Kalidasa says Parvati blamed her own beauty. It had failed to win the one she loved.",
        },
        {
          at: 4.0,
          text: "She decides on another way: tapas, years of disciplined austerity.",
          deep: "Tapas literally means heat. It is the inner fire built by discipline: practice kept up long enough to change the one who practises.",
        },
        {
          at: 7.4,
          text: "Her mother, Mena, begs her not to. \"U, ma!\" she cries: \"Oh, don't!\" Kalidasa says this is how Parvati came to be called Uma.",
        },
        { at: 11.0, text: "With her father's blessing, Parvati climbs to a high peak alone." },
      ],
      hotspots: [
        {
          id: "ornaments",
          label: "Falling ornaments",
          x: 800,
          y: 560,
          from: 4.0,
          title: "Setting beauty aside",
          text: "Parvati takes off her jewellery and dresses as an ascetic. She is not giving up on love. She is giving up on the shortcut to it.",
          kind: "tradition",
          source: "Kumarasambhava, Canto 5",
        },
        {
          id: "mena",
          label: "Mena",
          x: 420,
          y: 640,
          from: 7.4,
          title: "\"U, ma\": Oh, don't",
          text: "A mother sees what her daughter is about to put herself through and tries to stop her. Her cry becomes Parvati's name.",
          deep: "The name Uma has other explanations too; this one is Kalidasa's, in Canto 1 of the Kumarasambhava.",
          kind: "tradition",
          source: "Kumarasambhava 1.26",
        },
      ],
    },
    {
      id: "d2-seasons",
      type: "story",
      section: "story",
      title: "The years of tapas",
      kind: "tradition",
      visual: "d2Seasons",
      sound: { mood: "tapas", cues: [{ at: 7.0, hit: "thunder" }, { at: 7.0, ambience: "rain" }, { at: 14.0, ambience: "wind" }, { at: 14.0, hit: "bellSoft" }, { at: 21.0, hit: "bellSoft" }, { at: 24.4, hit: "shimmer" }] },
      duration: 28,
      sources: [KS5],
      captions: [
        { at: 0.5, text: "Summer. She sits among fires on four sides, with the burning sun as the fifth." },
        { at: 7.4, text: "The rains. She stays out on the bare rock as the storms break over her." },
        { at: 14.4, text: "Winter. Through freezing nights she stands in icy water." },
        {
          at: 21.4,
          text: "She eats only leaves that fall by themselves. Then she refuses even those. People begin calling her Aparna: \"without even a leaf\".",
        },
      ],
      freezes: [
        {
          at: 5.8,
          title: "Summer",
          text: "The heat is crushing. There is no one to see her, and nothing yet to show for it.",
          think: "What would make you keep going here?",
          options: [
            { label: "Keep going", response: "Keeping going isn't one decision. It is the same decision made again tomorrow, and the day after." },
            { label: "Stop for now", response: "Stopping would be completely human. Ask yourself what she has that would make this one different." },
          ],
          continueLabel: "Let the seasons turn",
        },
        {
          at: 12.8,
          title: "The rains",
          text: "A whole season has passed. Nothing has changed, except her.",
          think: "Is she the same person who started?",
          options: [
            { label: "Keep going", response: "Notice that the reason to continue might be shifting. It may now be about who she is becoming, not only what she wants." },
            { label: "Stop for now", response: "If she stopped now, what would she keep from these months? Practice leaves something behind even when it doesn't finish." },
          ],
          continueLabel: "Let the seasons turn",
        },
        {
          at: 19.8,
          title: "Winter",
          text: "Freezing water, night after night. The goal is no closer that she can see.",
          think: "What keeps a practice alive when there is no progress to look at?",
          options: [
            { label: "Keep going", response: "Some of the most important changes happen where nobody can measure them yet." },
            { label: "Stop for now", response: "That is a reasonable choice. The story asks what she knows that makes her continue." },
          ],
          continueLabel: "Let the seasons turn",
        },
      ],
      slow: {
        from: 21.0,
        to: 26.0,
        rate: 0.4,
        prompt: "Fewer and fewer leaves. What is she letting go of now?",
      },
    },
    {
      id: "d2-visitor",
      type: "story",
      section: "story",
      title: "The visitor",
      kind: "tradition",
      visual: "d2Visitor",
      sound: { mood: "devotion", cues: [{ at: 7.4, mood: "test" }] },
      duration: 14,
      sources: [KS5],
      captions: [
        { at: 0.5, text: "One day a young ascetic appears at her hermitage. He is polite, curious and full of praise." },
        { at: 4.0, text: "He asks why someone like her would put herself through this. Her friend explains: she wants Shiva." },
        {
          at: 7.4,
          text: "The stranger laughs. Shiva? He wears ashes and snakes, rides an old bull, lives in cremation grounds. Nobody even knows who his parents were. She is wasting her life.",
        },
      ],
      slow: {
        from: 7.0,
        to: 10.4,
        rate: 0.35,
        prompt: "He isn't testing her strength. What is he testing?",
      },
      freezes: [
        {
          at: 11.2,
          title: "The test",
          text: "Years of tapas. Now someone she welcomed and trusted is mocking the very reason she has endured it.",
          deep: "Notice what the mockery attacks: not her effort, but her judgement. He is asking whether she still believes in what she is doing.",
        },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d2-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "tradition",
      visual: "d2Visitor",
      visualTime: 11.2,
      sources: [KS5],
      framing: "should",
      prompt: "What should Parvati do?",
      deepPrompt: "When someone mocks the reason behind your effort, what does a good answer look like?",
      options: [
        {
          id: "defend",
          label: "Defend Shiva and tell the stranger he's wrong",
          reasoning:
            "You would stand up for what you believe and not let the mockery pass. The risk is getting pulled into an argument that proves nothing.",
        },
        {
          id: "silence",
          label: "Ignore him and keep practising in silence",
          reasoning:
            "You would show that his words can't touch you. That is a kind of strength. It also leaves his contempt unanswered.",
        },
        {
          id: "doubt",
          label: "Stop and ask whether he might be right",
          reasoning:
            "Questioning your reasons is honest, and sometimes wise. But a doubt planted by someone mocking you may not be the best guide.",
        },
      ],
      reveal: {
        title: "What Kalidasa tells",
        text: "Parvati defends Shiva with fire: the stranger doesn't know him, and ashes and snakes say nothing about who he is. She refuses to listen to any more and turns to leave. Then the stranger takes his true form. It is Shiva. He tells her that from this day he is hers, won by her tapas.",
        deep: "In the last verse of Canto 5, Shiva calls himself her servant, bought by her austerities. Kalidasa pictures Parvati caught mid-step, like a river stopped by a mountain in its path: neither going nor staying.",
        why: "The test was never about endurance. Shiva wanted to know whether she still knew why she was doing it, even when it was mocked.",
      },
      hypothetical: {
        title: "Imagine: if she had doubted",
        text: "If one clever argument had shaken her, the years of tapas would have been about getting something, not about who she had become. This branch is ours, to help you think. It is not in any source.",
      },
    },
    {
      id: "d2-revealed",
      type: "story",
      section: "story",
      title: "Like a river stopped by a mountain",
      kind: "tradition",
      visual: "d2Revealed",
      sound: { mood: "revealed", cues: [{ at: 0.4, hit: "bell" }, { at: 3.8, hit: "shimmer" }] },
      duration: 12,
      sources: [KS5, SHIVA_PURANA],
      captions: [
        { at: 0.5, text: "The stranger's form falls away. Shiva stands there." },
        { at: 4.0, text: "Parvati, mid-step, can neither go nor stay." },
        {
          at: 7.6,
          text: "The weariness of all those years leaves her. What beauty and desire could not win, her practice has.",
          deep: "The Shiva Purana tells a parallel version in which the Seven Sages also test her resolve before Shiva himself does.",
        },
      ],
    },
    {
      id: "d2-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d2Emblems",
      sound: { mood: "devotion", cues: [{ at: 0.6, hit: "bellSoft" }] },
      duration: 10,
      sources: [{ label: "Devotional verses and iconography" }],
      captions: [
        {
          at: 0.5,
          text: "Devotees picture Brahmacharini walking barefoot, dressed in white, a string of prayer beads in one hand and a water pot in the other.",
        },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        {
          id: "mala",
          label: "Prayer beads",
          x: 520,
          y: 450,
          title: "The rosary (japa mala)",
          text: "A string of beads for repeating a prayer or a name. Each bead is one repetition. Discipline here looks like counting, patiently, one at a time.",
          kind: "interpretation",
        },
        {
          id: "pot",
          label: "Water pot",
          x: 1080,
          y: 460,
          title: "The water pot (kamandalu)",
          text: "The simple water pot carried by ascetics. It suggests a life cut down to what is needed.",
          kind: "interpretation",
        },
        {
          id: "feet",
          label: "Bare feet",
          x: 800,
          y: 760,
          title: "Walking barefoot",
          text: "She walks rather than rides. Many devotees read this as the slow, steady way: the path is walked, step by step.",
          kind: "interpretation",
        },
        {
          id: "verse",
          label: "Her verse",
          x: 800,
          y: 160,
          title: "Her meditation verse",
          text: "A verse widely recited for her asks the Devi, holding beads and a water pot in her lotus hands, to be gracious.",
          deep: "dadhānā kara-padmābhyām akṣa-mālā-kamaṇḍalū, devī prasīdatu mayi brahmacāriṇy anuttamā.",
          kind: "interpretation",
          source: "Devotional verse",
        },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d2-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "What you practise, day after day, changes who you are.",
      deeper:
        "Her name means \"one who practises\". Parvati first tried the quick way, with Kama's arrow and her own beauty, and it went up in flames. Only then did she choose the slow path of tapas, season after season. Her final test isn't about how much she can endure. Shiva, in disguise, mocks her choice to see whether she still knows why she's doing it. In this story, resolve is less about toughness than about a reason that survives being laughed at. The practice wins Shiva, but first it changes her.",
      connections: [
        { event: "Kama's arrow burns.", meaning: "The shortcut fails, in public.", jumpTo: "d2-kama" },
        { event: "Season after season on the peak.", meaning: "The same choice, made again and again, until it changes her.", jumpTo: "d2-seasons" },
        { event: "The visitor mocks Shiva.", meaning: "The real test is of her reason, not her strength.", jumpTo: "d2-visitor" },
      ],
      readings: [
        {
          kind: "tradition",
          label: "What the sources narrate",
          text: "After Kama is burned, Parvati performs severe tapas. Shiva tests her in disguise and accepts her (Kumarasambhava, Canto 5; Shiva Purana).",
        },
        {
          kind: "interpretation",
          label: "A traditional reading",
          text: "Devotees worship Brahmacharini as steadfast devotion and austerity, and pray to her for perseverance.",
        },
        {
          kind: "contemporary",
          label: "Our reading",
          text: "Discipline is less about toughness than about a motive that survives mockery. This is our interpretation, offered to argue with.",
        },
      ],
      invite: "Is that how you'd put it? Hold on to your version for the next two scenes.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "s1-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Strange at the door of Kamar-Taj",
      kind: "marvel",
      role: "primary",
      roleNote: "A brilliant man trains harder than anyone, and slowly finds out he has been training for the wrong reason.",
      film: "Doctor Strange",
      year: 2016,

      rating: "PG-13",
      character: "Stephen Strange",
      scene: "From his arrival at Kamar-Taj, through training and Everest, to the Ancient One's death.",
      context:
        "Stephen Strange was a brilliant, arrogant neurosurgeon. A car crash ruined his hands. He spent his fortune on failed surgeries, then travelled to Nepal chasing a rumour of healing.",
      find: {
        where: "The first half of the film: Strange's arrival at Kamar-Taj and his training. The Ancient One's last conversation with him comes just before the final act in Hong Kong.",
        search: "Doctor Strange Kamar-Taj Ancient One door",
      },
      watchFor: [
        "How long Strange waits at the door, and what he does while he waits.",
        "What he still wants, even after months of training.",
        "What the Ancient One says is his real weakness.",
      ],
      sources: [STRANGE],
    },
    {
      id: "s1-door",
      type: "story",
      section: "marvel",
      title: "The closed door",
      kind: "marvel",
      visual: "d2Door",
      sound: { mood: "filmQuiet", cues: [{ at: 3.8, hit: "shimmer" }, { at: 3.8, mood: "filmWonder" }, { at: 7.4, hit: "boom" }, { at: 7.6, mood: "filmNight" }] },
      duration: 13,
      sources: [STRANGE],
      captions: [
        { at: 0.5, text: "Strange arrives at Kamar-Taj, sneering at talk of spirit and energy." },
        { at: 3.6, text: "The Ancient One shows him worlds he never imagined. Shaken, he begs her to teach him." },
        { at: 7.4, text: "She refuses. He is put outside. The door closes." },
      ],
      freezes: [
        {
          at: 10.4,
          title: "The closed door",
          text: "He has lost his career, his money and his hands. The one place that might help has shut him out.",
          deep: "Compare Parvati after Kama burns. Both have just watched the obvious route fail in front of them.",
        },
      ],
    },
    {
      id: "s1-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d2Door",
      visualTime: 10.4,
      sources: [STRANGE],
      framing: "will",
      prompt: "What do you think Strange will do?",
      options: [
        {
          id: "leave",
          label: "Walk away and look for another cure",
          reasoning: "He has always found another way before. Pride makes it hard to beg twice.",
        },
        {
          id: "demand",
          label: "Bang on the door and demand to be let in",
          reasoning: "He is used to getting what he wants by force of will. It has worked for him all his life.",
        },
        {
          id: "wait",
          label: "Sit down outside and wait",
          reasoning: "Waiting means accepting that he isn't in control here, which is new for him.",
        },
      ],
      reveal: {
        title: "What happens in the film",
        text: "He sits outside the door for hours, into the night. Mordo persuades the Ancient One to let him in.",
        why: "It is the first thing Strange has done that isn't about controlling the situation. His training begins with waiting.",
      },
    },
    {
      id: "s1-everest",
      type: "story",
      section: "marvel",
      title: "Everest",
      kind: "marvel",
      visual: "d2Everest",
      sound: { mood: "filmNight", cues: [{ at: 5.0, hit: "whoosh" }, { at: 5.0, mood: "filmStruggle" }, { at: 11.8, hit: "shimmer" }, { at: 11.8, mood: "filmEpic" }] },
      duration: 16,
      sources: [STRANGE],
      captions: [
        { at: 0.5, text: "Strange studies through the nights, reading faster than anyone. But his damaged hands shake, and he cannot open a portal." },
        { at: 5.0, text: "The Ancient One takes him to the summit of Everest and leaves him there, alone, in the freezing wind." },
        { at: 10.6, text: "To survive, he has to do the thing he couldn't. At the last moment, the portal opens." },
      ],
      slow: {
        from: 8.8,
        to: 12.6,
        rate: 0.3,
        prompt: "Watch the sparks. Failing, failing, failing…",
      },
    },
    {
      id: "s1-balcony",
      type: "story",
      section: "marvel",
      title: "It isn't about you",
      kind: "marvel",
      visual: "d2Balcony",
      sound: { mood: "filmSnow", cues: [{ at: 10.6, mood: "filmLament" }] },
      duration: 15,
      sources: [STRANGE],
      captions: [
        { at: 0.5, text: "Months later, the Ancient One is mortally wounded in a battle. In spirit form, she stands with Strange on a hospital balcony, watching snow fall." },
        {
          at: 5.0,
          text: "She tells him his fear of failure made him a great surgeon. Now that same fear is what holds him back. And that this was never about him.",
        },
        { at: 10.6, text: "Strange chooses to stay and protect the world instead of going back to his old life." },
      ],
      freezes: [
        {
          at: 9.6,
          title: "The turning point",
          text: "All that discipline was for one goal: getting his hands back. Now he is told the goal was the problem.",
          deep: "His effort was real. His reason was small. The question is whether practice can change the reason, and whether it did.",
        },
      ],
    },
    {
      id: "s1-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Strange",
      kind: "comparison",
      turningPoint: "The deathbed conversation, when Strange learns his discipline has been serving the wrong goal.",
      connection:
        "Both stories begin when the obvious route fails: Kama's arrow for Parvati, surgery for Strange. In both, discipline changes the seeker's reason. Parvati's devotion was clear from the start and the test confirmed it. Strange's reason had to be broken first.",
      ladder: [
        {
          level: "notice",
          text: "At the door, what did Strange do for hours? Why do you think he was finally let in?",
          followUps: [{ ifTheySay: "Because he didn't give up", ask: "Was not giving up enough? What else was different about him at the door?" }],
        },
        {
          level: "feel",
          text: "On Everest he's alone, freezing, and his hands won't do what he wants. What would that feel like?",
          followUps: [{ ifTheySay: "Scary", ask: "Is fear ever useful when you're learning something hard?" }],
        },
        {
          level: "wonder",
          text: "Strange worked harder than anyone. So why does the Ancient One say he still hasn't learned the simplest lesson?",
          followUps: [{ ifTheySay: "He was selfish", ask: "Is wanting your own hands back selfish? Where's the line?" }],
        },
        {
          level: "stretch",
          text: "Does working hard for a selfish reason still count?",
          deep: "Parvati's reason was clear from the start; Strange's changed along the way. Can practice change why you are doing something? Has that ever happened to you?",
          followUps: [
            { ifTheySay: "Yes, effort is effort", ask: "Then what would Shiva's test have shown if Parvati's reason had been small?" },
            { ifTheySay: "No", ask: "So should Strange have quit until he had a better reason?" },
          ],
        },
        {
          level: "flip",
          text: "Imagine surgery had fixed his hands in month three. Would he have stayed at Kamar-Taj?",
        },
        {
          level: "connect",
          text: "Parvati's shortcut burned with Kama; Strange's ended in a car crash. What did each one do once the shortcut was gone?",
        },
      ],
      stance: {
        statement: "If you work hard enough, your reasons don't matter.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Each person gives one example from real life that supports where they stand.",
      },
      activity: {
        title: "Why I started, why I continue",
        minutes: 7,
        steps: [
          "Each person picks something they have practised for a long time: a sport, an instrument, a language, a game.",
          "Write or say one line: why I started.",
          "Then one line: why I keep going now.",
          "Compare the two lines. Did the practice change the reason?",
        ],
      },
      sources: [STRANGE],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "s2-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "The grenade test",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A hidden test reveals character in a single second. Is that the same thing as tapas?",
      film: "Captain America: The First Avenger",
      year: 2011,

      rating: "PG-13",
      character: "Steve Rogers",
      scene: "The grenade test at Camp Lehigh, and Dr Erskine's conversation the night before the serum.",
      context:
        "Steve is frail and asthmatic and has been rejected by army recruiters again and again. He keeps trying. Dr Erskine picks him for an experiment, despite the colonel's doubts.",
      find: {
        where: "Early in the film, during training at Camp Lehigh, before Steve receives the serum.",
        search: "Captain America First Avenger grenade scene",
      },
      watchFor: [
        "Who moves first, and in which direction.",
        "What Steve says to the others while he's on the grenade.",
        "What Erskine says he's looking for.",
      ],
      sources: [CAP],
    },
    {
      id: "s2-yard",
      type: "story",
      section: "marvel",
      title: "Grenade!",
      kind: "marvel",
      visual: "d2Yard",
      sound: { mood: "filmQuiet", cues: [{ at: 2.8, mood: "filmTension" }, { at: 9.2, hit: "shimmer" }, { at: 11.6, mood: "filmQuiet" }, { at: 13.6, mood: "filmNight" }] },
      duration: 20,
      sources: [CAP],
      captions: [
        { at: 0.5, text: "The recruits are training. The colonel picks up a grenade and throws it into the middle of them." },
        { at: 8.4, text: "Every strong recruit dives for cover. Steve throws himself on top of it and tells the others to get back." },
        { at: 11.6, text: "Nothing happens. It was a dummy. The test was never about strength." },
        {
          at: 14.4,
          text: "The night before the serum, Erskine asks Steve whether he wants to kill Nazis. Steve says he doesn't want to kill anyone. He just doesn't like bullies.",
          deep: "Erskine explains his choice: someone who has always had power may not respect it, but someone weak knows its value. He asks Steve to stay who he is: not a perfect soldier, but a good man.",
        },
      ],
      slow: {
        from: 3.0,
        to: 6.6,
        rate: 0.25,
        prompt: "One second to decide. No time to think.",
      },
      freezes: [
        {
          at: 6.8,
          title: "One second",
          text: "The grenade is in the air. Everyone believes it is real.",
          think: "Predict: what will Steve do?",
          options: [
            { label: "Run, like everyone else", response: "That is what almost anyone would do, and it isn't cowardice. Watch what Steve does instead." },
            { label: "Shout a warning", response: "That helps others without risking yourself. Steve goes further." },
            { label: "Throw himself on it", response: "That would mean being ready to die for people he barely knows, in under a second." },
          ],
          continueLabel: "See what Steve does",
        },
      ],
    },
    {
      id: "s2-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Steve",
      kind: "comparison",
      turningPoint: "Steve covering the grenade, which he believes is real, before any power is given to him.",
      connection:
        "Both stories contain a hidden test. Shiva disguised as a stranger tests Parvati's reason; Erskine and the colonel test Steve's character. Both testers want motive, not strength. But Steve's test is a single second, and Parvati's tapas took years: the difference is the discussion.",
      ladder: [
        {
          level: "notice",
          text: "Everyone else ran. What did Steve do, and how long did he have to decide?",
        },
        {
          level: "feel",
          text: "Steve believed the grenade was real. What does it tell you that he moved toward it?",
          followUps: [{ ifTheySay: "He's brave", ask: "Is it bravery if you don't have time to feel afraid? What else could it be?" }],
        },
        {
          level: "wonder",
          text: "Erskine asked if Steve wanted to kill Nazis. Why was \"I don't like bullies\" a better answer?",
          followUps: [{ ifTheySay: "It's kinder", ask: "Kinder, or more honest about what he cares about? What's the difference?" }],
        },
        {
          level: "stretch",
          text: "Is one brave moment the same as years of discipline? Which tells you more about someone?",
          deep: "Erskine chose Steve for who he already was. Parvati's tapas changed who she was. Which is the better test of character: a surprise moment, or a long practice? Could the surprise moment be the result of a long practice nobody saw?",
          followUps: [{ ifTheySay: "The moment", ask: "What might Steve have been practising for years before that second, without knowing it?" }],
        },
        {
          level: "flip",
          text: "What if the grenade test came after the serum made him strong? Would the act mean the same thing?",
        },
        {
          level: "connect",
          text: "Shiva tested Parvati in disguise; the colonel tested Steve with a fake grenade. What were both testers really looking for?",
        },
      ],
      stance: {
        statement: "You can tell who someone really is from one moment under pressure.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Think of Parvati's years on the peak. Does she change where anyone stands?",
      },
      activity: {
        title: "Instant or considered",
        minutes: 5,
        steps: [
          "The parent reads out a quick situation, for example: a friend drops their phone and the screen cracks; you see someone copying in a test; a younger child is being teased.",
          "Everyone answers instantly: what would you do?",
          "Then take thirty seconds and answer again.",
          "Did your instant answer and your considered answer match? Which one is the \"real\" you?",
        ],
      },
      sources: [CAP],
    },

    // ================================================================ F COMPARE
    {
      id: "d2-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "Before you look: can you tell each story in one sentence?",
          tradition: "After Kama's arrow burns, Parvati spends years in tapas. Shiva tests her in disguise and finds her reason unshaken.",
          traditionJump: "d2-seasons",
          marvel: [
            { who: "Strange", text: "Strange trains harder than anyone, and learns his reason was too small.", jumpTo: "s1-balcony" },
            { who: "Steve", text: "Steve covers a grenade in a second and shows who he already is.", jumpTo: "s2-yard" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What were the testers in all three stories looking for?",
          tradition: "The deepest test is of your reason, not your strength.",
          marvel: [
            { who: "Strange", text: "The Ancient One cares less about his skill than about why he wants it." },
            { who: "Steve", text: "Erskine wants a good man, not a perfect soldier." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which of the three would find the others' path hardest?",
          tradition: "Parvati's reason is devotion from the very start. The test only confirms it.",
          marvel: [
            { who: "Strange", text: "His reason begins selfish and has to be broken." },
            { who: "Steve", text: "His test is one second, not years of chosen practice." },
          ],
          deep: "One story is about a practice that changes the practitioner (Strange), one about character revealed (Steve), and Parvati's holds both: years that changed her, and a test that revealed it.",
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Make a guess before you reveal this one.",
          tradition:
            "Tapas isn't toughness. It's what keeps going when nobody is watching, and what doesn't change when someone mocks it.",
          marvel: [
            { who: "Strange", text: "Practice can change your reason, if you let it." },
            { who: "Steve", text: "A single second may show what years of unseen practice made." },
          ],
          deep: "One reading: discipline and character aren't opposites. Steve's second might be the visible tip of a long, invisible tapas. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d2-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Practice",
      scenario:
        "You've been learning a piece of music slowly for months, practising every day. A friend sends you a video: someone online plays the same piece after a week, using an app that lights up which keys to press. \"Why bother doing it the slow way?\"",
      deep: "The app works. Plenty of people use it and enjoy playing. Your teacher says you'll understand the music better your way, but you'll be slower for a long time.",
      prompt: "What would you do?",
      options: [
        {
          id: "switch",
          label: "Switch to the app: it gets results faster",
          perspectives: [
            { label: "What it gains", text: "You'd be playing the piece sooner, and enjoying it." },
            { label: "What it might lose", text: "Whatever the slow practice was building in you that the app doesn't." },
            { label: "Question", text: "Is it the piece you want, or the ability to play pieces?" },
          ],
        },
        {
          id: "stay",
          label: "Keep going the slow way",
          perspectives: [
            { label: "What it gains", text: "Understanding that stays with you, and the satisfaction of earning it." },
            { label: "What it risks", text: "Frustration, and maybe giving up before it pays off." },
            { label: "Question", text: "What would keep you going on the days it feels pointless?" },
          ],
        },
        {
          id: "ask",
          label: "First ask myself what I'm practising for",
          perspectives: [
            { label: "What it gains", text: "A reason that can survive someone saying \"why bother?\"" },
            { label: "What it risks", text: "You might find you don't care that much, and that's worth knowing too." },
            { label: "Question", text: "If someone mocked your reason, would it still stand?" },
          ],
        },
      ],
      closing: "Parvati tried the shortcut first, and it burned. Strange's practice changed his reason. Neither story says shortcuts are always wrong; both ask what the slow way builds.",
      talk: [
        "What's something you've practised long enough that it changed you?",
        "Is there a shortcut you're glad you took? One you regret?",
        "Who do you know who practises something every day without anyone watching?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "d2-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "Is discipline about getting what you want, or becoming someone?",
      younger: "Parvati's first plan failed. What did she do differently the second time?",
      older: "Strange worked incredibly hard for the wrong reason. Does motive matter if the effort is real?",
      takeaway: "What you practise, day after day, changes who you are.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "Kalidasa's Kumarasambhava (\"The Birth of the War God\") tells the story in order: the gods' plan and the burning of Kama (Canto 3), Rati's grief (Canto 4), and Parvati's tapas and Shiva's test (Canto 5).",
        "The Shiva Purana (Rudra Samhita, Parvati Khanda) tells a parallel version with its own details.",
        "Brahmacharini's iconography (white clothes, beads, water pot, bare feet) comes from devotional verses and images.",
      ],
    },
    {
      title: "What tapas means",
      paragraphs: [
        "Tapas literally means heat: the inner fire built up by discipline. In stories it often looks extreme, like Parvati's. In everyday practice it can be as simple as keeping a promise to yourself every day.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: [
        "Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle, and we don't claim the filmmakers had these stories in mind.",
      ],
    },
  ],

  sources: [KS3, KS5, KS1, SHIVA_PURANA, STRANGE, CAP],
};
