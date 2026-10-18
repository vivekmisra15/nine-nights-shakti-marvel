// ---------------------------------------------------------------------------
// Day 8: Mahagauri
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 8),
// reworked around the theme Renewal.
//
// Source note: tellings of how Parvati became Mahagauri differ. We tell the
// most common devotional Navaratri version: her years of tapas left her
// covered in the dust of years outdoors, and Shiva washed her with the waters
// of the Ganga, after which she shone. Other tellings exist (for example, the
// Devi Mahatmya ch. 5, where the goddess Kaushiki emerges from Parvati's body);
// we mention that tellings vary without retelling them here.
// Ashtami (the eighth day) is also the day of Kanya Puja in many homes.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const MAHA = { label: "Mahagauri: devotional account and iconography", url: "https://en.wikipedia.org/wiki/Mahagauri" };
const DM5 = { label: "Devi Mahatmya ch. 5: Kaushiki emerges from Parvati", url: "https://en.wikipedia.org/wiki/Devi_Mahatmya" };
const KANYA = { label: "Kanya Puja on Ashtami", url: "https://en.wikipedia.org/wiki/Kanya_Puja" };
const GOTG2 = { label: "Guardians of the Galaxy Vol. 2 (2017)", url: "https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._2", note: "Dialogue paraphrased." };
const FATWS = { label: "The Falcon and the Winter Soldier (2021), Disney+ series", url: "https://en.wikipedia.org/wiki/The_Falcon_and_the_Winter_Soldier", note: "Episodes 1 and 6. Dialogue paraphrased." };

export const day8: DayContent = {
  day: 8,
  name: "Mahagauri",
  devanagari: "महागौरी",
  meaning: "The greatly bright one",
  theme: "Renewal",
  question: "When someone is renewed after a hard time, what washes away and what stays?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d8-enter",
      type: "story",
      section: "enter",
      title: "Night eight",
      kind: "interpretation",
      visual: "d8Opening",
      sound: { mood: "renewal", cues: [{ at: 1.0, hit: "bellSoft" }, { at: 6.0, hit: "shimmer" }] },
      duration: 12,
      sources: [MAHA],
      captions: [
        { at: 0.6, text: "Night eight. Tonight's form is Mahagauri: \"the greatly bright one\"." },
        { at: 4.0, text: "Last night was Kalaratri, the darkest night. Tonight is radiance. They are the same Devi." },
        { at: 8.0, text: "Tonight's story is about what happens after a long, hard time." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d8-tapas",
      type: "story",
      section: "story",
      title: "Years outdoors",
      kind: "interpretation",
      visual: "d8Tapas",
      sound: { mood: "tapas", cues: [{ at: 4.0, hit: "whoosh" }, { at: 8.6, hit: "bellSoft" }] },
      duration: 13,
      sources: [MAHA],
      captions: [
        { at: 0.5, text: "Remember Parvati's tapas on Night Two? Years on the mountain: blazing summers, monsoon rain, winter snow." },
        { at: 4.4, text: "Wind and weather left her covered in the dust and ash of all those years outdoors." },
        { at: 8.4, text: "Her resolve had held. But she carried the whole long struggle on her." },
      ],
    },
    {
      id: "d8-ganga",
      type: "story",
      section: "story",
      title: "The river's water",
      kind: "interpretation",
      visual: "d8Ganga",
      sound: { mood: "renewal", cues: [{ at: 3.6, hit: "whoosh" }, { at: 8.0, hit: "shimmer" }, { at: 8.4, hit: "bell" }] },
      duration: 14,
      sources: [MAHA],
      captions: [
        { at: 0.5, text: "When Shiva accepted her, the devotional story says, he poured the waters of the river Ganga over her." },
        { at: 4.4, text: "The dust of the years washed away." },
        {
          at: 8.2,
          text: "And she shone, radiant as moonlight: Mahagauri, the greatly bright one.",
          deep: "This is the most common Navaratri telling, found mainly in devotional sources. Other tellings of how she became Mahagauri differ.",
        },
      ],
      slow: { from: 4.2, to: 8.0, rate: 0.35, prompt: "The dust washes away. What doesn't?" },
    },

    // ================================================================ C CHOICE
    {
      id: "d8-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d8Ganga",
      visualTime: 12,
      sources: [MAHA],
      framing: "weigh",
      prompt: "After a long, hard time, what should be washed away, and what should stay?",
      deepPrompt: "Is a fresh start about forgetting what happened, or about carrying it differently?",
      options: [
        { id: "all", label: "Wash away everything: start completely fresh", reasoning: "A clean slate means the hard time can't weigh on you any more." },
        { id: "none", label: "Keep it all: the hard time is part of you", reasoning: "Pretending it never happened would mean losing what you learned." },
        { id: "weight", label: "Let the weight go, keep what you learned", reasoning: "Not everything from a hard time is worth carrying, but some of it is." },
      ],
      reveal: {
        title: "What the story shows",
        text: "The dust washes away, but Mahagauri is still Parvati: the same person who held her resolve through every season. The radiance doesn't replace her. It's what she looks like with the weight gone.",
        why: "Renewal isn't becoming someone else. It's the same you, clearer than before.",
      },
    },

    // ================================================================ B STORY (continued)
    {
      id: "d8-pair",
      type: "story",
      section: "story",
      title: "Night, then light",
      kind: "interpretation",
      visual: "d8Pair",
      sound: { mood: "ratri", cues: [{ at: 4.4, mood: "renewal" }, { at: 4.4, hit: "shimmer" }, { at: 8.6, hit: "bell" }] },
      duration: 13,
      sources: [MAHA],
      captions: [
        { at: 0.5, text: "Kalaratri, the dark night, comes on the seventh night. Mahagauri, the radiant, comes on the eighth." },
        { at: 4.4, text: "They are the same Devi. The festival puts them side by side, and neither outranks the other." },
        { at: 8.6, text: "And the night comes first. Renewal follows the dark; it doesn't skip it." },
      ],
    },
    {
      id: "d8-kanya",
      type: "story",
      section: "story",
      title: "Honouring the girls",
      kind: "tradition",
      visual: "d8Kanya",
      sound: { mood: "festive", cues: [{ at: 0.8, hit: "bell" }, { at: 6.0, hit: "shimmer" }] },
      duration: 12,
      sources: [KANYA],
      captions: [
        { at: 0.5, text: "In many homes, the eighth day (Ashtami) is also the day of Kanya Puja." },
        {
          at: 4.0,
          text: "Young girls are invited in and honoured as the goddess herself: their feet are washed, they are fed a festive meal, and they are given gifts.",
          deep: "Some families hold Kanya Puja on the ninth day instead. Practices vary by region and family.",
        },
        { at: 8.4, text: "On the night of renewal, the goddess is honoured in the youngest people in the room." },
      ],
    },
    {
      id: "d8-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d8Emblems",
      sound: { mood: "renewal" },
      duration: 10,
      sources: [MAHA],
      captions: [
        { at: 0.5, text: "Mahagauri is pictured calm and radiant, dressed in white, riding a white bull." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "white", label: "White", x: 800, y: 300, title: "Dressed in white", text: "White here is the colour of calm, peace and a fresh start, like moonlight after a long night.", kind: "interpretation" },
        { id: "trident", label: "Trident", x: 540, y: 380, title: "Trident", text: "Shiva's trident. Even the gentlest form still carries strength.", kind: "interpretation", source: "Devotional iconography" },
        { id: "damaru", label: "Small drum", x: 1060, y: 380, title: "Damaru (hand drum)", text: "Shiva's drum, whose beat is said to keep the rhythm of creation: a new beginning, in sound.", kind: "interpretation", source: "Devotional iconography" },
        { id: "abhaya", label: "Raised palm", x: 560, y: 560, title: "Do not fear (abhaya)", text: "One hand raised: \"do not be afraid\". The same gesture as last night's Kalaratri.", kind: "interpretation" },
        { id: "varada", label: "Open palm", x: 1040, y: 560, title: "Giving (varada)", text: "One hand open in blessing. She is linked with forgiveness and peace.", kind: "interpretation" },
        { id: "bull", label: "White bull", x: 800, y: 760, title: "The white bull", text: "Often identified with Nandi, Shiva's bull: patient, steady and strong. After the long tapas, strength that is calm.", kind: "interpretation" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d8-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "After a hard time, you can begin again, clearer than before.",
      deeper:
        "In a common devotional telling, Parvati's long tapas left her covered in the dust and darkness of years outdoors. When Shiva accepted her, he washed her with the waters of the Ganga, and she shone radiant: Mahagauri, \"the greatly bright one\". She's pictured calm, dressed in white, riding a bull, with hands of fearlessness and blessing. Renewal here doesn't mean pretending the hard time never happened. The tapas made her who she is. What washes away is the weight; what stays is what you learned. She's linked with calm, forgiveness and fresh starts.",
      connections: [
        { event: "Years of weather on the mountain.", meaning: "The hard time was real, and it left its mark.", jumpTo: "d8-tapas" },
        { event: "The Ganga's water.", meaning: "The weight washes away; the person stays.", jumpTo: "d8-ganga" },
        { event: "Dark night, then radiance.", meaning: "Renewal follows the dark; it doesn't skip it.", jumpTo: "d8-pair" },
      ],
      readings: [
        { kind: "tradition", label: "What the tradition tells", text: "In the devotional telling, Shiva washes Parvati with Ganga water after her tapas and she becomes radiant. On Ashtami, many homes honour young girls as the goddess." },
        { kind: "interpretation", label: "A devotional reading", text: "Mahagauri is worshipped as calm, pure and forgiving; devotees pray to her to wash away past wrongs and troubles." },
        { kind: "contemporary", label: "Our reading", text: "Renewal isn't becoming someone else: it's the same you, with the weight put down. This is our interpretation, offered to argue with." },
      ],
      invite: "In the next two scenes, watch what each person has to do before they can begin again.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "n-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Two sisters",
      kind: "marvel",
      role: "primary",
      roleNote: "Two sisters, years of hurt, and a fresh start that begins when the hurt is finally said out loud.",
      film: "Guardians of the Galaxy Vol. 2",
      year: 2017,

      rating: "PG-13",
      character: "Nebula and Gamora",
      scene: "Nebula and Gamora's fight on Ego's planet, and what Nebula finally says.",
      context:
        "Thanos raised Nebula and Gamora as his daughters and made them fight each other again and again. Gamora always won. Nebula has spent years angry at her sister, and has come to settle it.",
      find: {
        where: "The second half of the film, on Ego's planet, before the final battle.",
        search: "Guardians of the Galaxy Vol 2 Nebula Gamora sister",
      },
      parentNote: "Nebula describes being badly treated by Thanos. It's told without graphic detail, but it is about cruelty in a family. Preview it if your younger child may find that upsetting.",
      watchFor: ["Who keeps winning, and who keeps losing.", "What Nebula says she really wanted.", "How Gamora reacts when she finally hears it."],
      sources: [GOTG2],
    },
    {
      id: "n-fight",
      type: "story",
      section: "marvel",
      title: "One more fight",
      kind: "marvel",
      visual: "d8Wreck",
      sound: { mood: "filmStruggle", cues: [{ at: 2.6, hit: "boom" }, { at: 5.0, hit: "boom" }, { at: 8.4, mood: "filmLament" }] },
      duration: 13,
      sources: [GOTG2],
      captions: [
        { at: 0.5, text: "Nebula hunts Gamora across Ego's planet. The fight nearly destroys them both." },
        { at: 4.6, text: "Then Nebula has the chance to finish it, and she can't." },
        { at: 8.4, text: "Gamora sees, for the first time, that her sister is fighting back tears." },
      ],
      freezes: [
        {
          at: 11.0,
          title: "Years of it",
          text: "Both sisters have carried this fight their whole lives.",
          think: "What do you think Nebula has never said?",
          options: [
            { label: "That she hates Gamora", response: "That's what it has looked like. Watch what she actually says." },
            { label: "That she's been hurt", response: "That's close. Watch." },
          ],
        },
      ],
    },
    {
      id: "n-sister",
      type: "story",
      section: "marvel",
      title: "I just wanted a sister",
      kind: "marvel",
      visual: "d8Sisters",
      sound: { mood: "filmLament", cues: [{ at: 6.8, mood: "filmWonder" }, { at: 7.0, hit: "shimmer" }] },
      duration: 13,
      sources: [GOTG2],
      captions: [
        { at: 0.5, text: "Nebula says it at last: Gamora was the one who always wanted to win. All Nebula wanted was a sister." },
        { at: 4.0, text: "Every time she lost, Thanos replaced a part of her with machinery." },
        { at: 7.4, text: "Gamora realises she never saw what her sister was going through. They fight side by side after that, and later part as sisters." },
      ],
    },
    {
      id: "n-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Nebula and Gamora",
      kind: "comparison",
      turningPoint: "Nebula naming the hurt she has carried for years, and Gamora hearing it.",
      connection:
        "Like Mahagauri, the sisters come through a long hard time into something new, and they're still the same people. But Parvati's tapas was chosen; Nebula's suffering was forced on her. And the sisters' fresh start begins when the hurt is spoken out loud.",
      ladder: [
        { level: "notice", text: "What did Nebula say she really wanted?" },
        { level: "feel", text: "How do you think Gamora felt when she heard it?" },
        {
          level: "wonder",
          text: "Why did it take Nebula so long to say it?",
          followUps: [{ ifTheySay: "She was too angry", ask: "What was underneath the anger?" }],
        },
        {
          level: "stretch",
          text: "Can two people start fresh without first saying what went wrong?",
          deep: "Gamora wasn't the one who hurt Nebula, Thanos was. Does Gamora still owe her something? Who has to change for a fresh start to happen?",
        },
        { level: "flip", text: "What if Gamora had won the fight and walked away?" },
        { level: "connect", text: "The Ganga washed away the dust, but Parvati stayed Parvati. What washed away between the sisters, and what stayed?" },
      ],
      stance: {
        statement: "You can't really start again until the hurt has been said out loud.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Siblings: is there a small thing you've never said? You don't have to say it now.",
      },
      activity: {
        title: "Wash away, keep",
        minutes: 6,
        steps: [
          "Each person thinks of one hard time: a bad term, a fight, a disappointment.",
          "Name one thing you'd like to wash away from it.",
          "Name one thing you learned from it that you'd keep.",
          "Is anything on the \"wash away\" list actually worth keeping?",
        ],
      },
      sources: [GOTG2],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "b-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "The list",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A man trying to begin again after doing real harm, and finding that renewal starts with the truth.",
      film: "The Falcon and the Winter Soldier",
      year: 2021,

      rating: "TV-14",
      character: "Bucky Barnes and Yori Nakajima",
      scene: "Bucky's lunch with Yori (Episode 1), and his confession in the finale (Episode 6).",
      context:
        "For decades, Bucky was the Winter Soldier, an assassin controlled by his captors. Free at last, he is working through a notebook listing people he harmed. He has befriended Yori, an elderly man whose son he killed during a mission. Yori doesn't know.",
      find: {
        where: "The lunch is in Episode 1, \"New World Order\". The confession is in Episode 6, \"One World, One People\".",
        search: "Falcon and the Winter Soldier Bucky Yori",
      },
      parentNote: "This series deals with trauma, violence and therapy, and suits your older child better. For your younger child, the retelling here may be enough. One important difference to say aloud: Bucky's past is real harm he did. Parvati's dust was the mark of her effort, never of anything wrong.",
      watchFor: ["What Yori tells Bucky about his son.", "Why Bucky can't say it at first.", "What Bucky does with the notebook at the end."],
      sources: [FATWS],
    },
    {
      id: "b-lunch",
      type: "story",
      section: "marvel",
      title: "Lunch with Yori",
      kind: "marvel",
      visual: "d8Lunch",
      sound: { mood: "filmQuiet", cues: [{ at: 7.6, hit: "heartbeat" }] },
      duration: 12,
      sources: [FATWS],
      captions: [
        { at: 0.5, text: "Bucky and Yori have lunch together. Yori talks about the son he lost, and about never knowing why." },
        { at: 4.8, text: "Bucky knows why. He was there." },
        { at: 7.8, text: "He can't bring himself to say it. He carries the secret for the rest of the series." },
      ],
      freezes: [
        {
          at: 10.2,
          title: "The truth, or the friendship?",
          text: "Telling Yori could end their friendship. Not telling him means Yori never knows.",
          think: "What should Bucky do?",
          options: [
            { label: "Tell him", response: "Hard. Keep that answer in mind for the finale." },
            { label: "Protect him from it", response: "Some would agree. Ask: who is Bucky really protecting?" },
          ],
        },
      ],
    },
    {
      id: "b-book",
      type: "story",
      section: "marvel",
      title: "The book is finished",
      kind: "marvel",
      visual: "d8Notebook",
      sound: { mood: "filmLament", cues: [{ at: 6.2, mood: "filmWonder" }, { at: 6.4, hit: "shimmer" }] },
      duration: 13,
      sources: [FATWS],
      captions: [
        { at: 0.5, text: "In the finale, Bucky goes to Yori and tells him the truth: the Winter Soldier killed his son, and that was him." },
        { at: 4.2, text: "It's devastating for Yori. But now he knows." },
        { at: 7.0, text: "Bucky leaves his therapist the notebook, every name crossed off, with a note: he finished the book. Then he joins Sam's family and neighbours in Louisiana, laughing on the docks." },
      ],
    },
    {
      id: "b-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Bucky",
      kind: "comparison",
      turningPoint: "The confession: renewal begins not with being forgiven, but with telling the truth, even at the cost of a friendship.",
      connection:
        "Like Mahagauri, Bucky comes through a long darkness and begins again, still himself. But the difference matters: Bucky's past is real harm he did, while Parvati's dust was the mark of her effort, never of a wrong. Use the scene for the idea of beginning again, not to equate the two.",
      ladder: [
        { level: "notice", text: "What did Bucky keep in his notebook? What did he do with it at the end?" },
        { level: "feel", text: "How do you think Yori felt when he heard the truth?" },
        {
          level: "wonder",
          text: "Why did Bucky need to tell Yori, even though it hurt him?",
          followUps: [{ ifTheySay: "To feel better", ask: "Is that a good reason, or a selfish one? Can it be both?" }],
        },
        {
          level: "stretch",
          text: "Does peace come from being forgiven, or from telling the truth?",
          deep: "Yori never says he forgives Bucky. Bucky still finishes the book. Can you begin again without being forgiven?",
        },
        { level: "flip", text: "What if Bucky had never told Yori, and stayed his friend?" },
        { level: "connect", text: "For Bucky, what washed away, and what stayed?" },
      ],
      stance: {
        statement: "You can begin again even if the person you hurt doesn't forgive you.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "What would you need, to feel you'd really started fresh?",
      },
      activity: {
        title: "The notebook",
        minutes: 5,
        steps: [
          "Each person thinks (privately) of one thing they'd like to put right.",
          "Don't say what it is. Just say: is it small, medium or big?",
          "What would \"crossing it off\" actually take?",
          "Choose one small step you could take this week, if you want to.",
        ],
      },
      sources: [FATWS],
    },

    // ================================================================ F COMPARE
    {
      id: "d8-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "After years of tapas, the dust is washed away and Parvati shines as Mahagauri, still herself.",
          traditionJump: "d8-ganga",
          marvel: [
            { who: "Nebula and Gamora", text: "After years of hurt, Nebula says it out loud and the sisters begin again.", jumpTo: "n-sister" },
            { who: "Bucky", text: "After years of harm, Bucky tells the truth and finishes his list.", jumpTo: "b-book" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What had to happen before each fresh start?",
          tradition: "After a hard time, you can begin again, clearer than before.",
          marvel: [
            { who: "Nebula and Gamora", text: "The hurt had to be said and heard." },
            { who: "Bucky", text: "The truth had to be told." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Whose hard time was chosen, and whose was forced or caused?",
          tradition: "Parvati chose her tapas. Her dust was the mark of effort, never of a wrong.",
          marvel: [
            { who: "Nebula and Gamora", text: "Nebula's suffering was forced on her by Thanos." },
            { who: "Bucky", text: "Bucky's past is real harm he did, even if he wasn't free." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Renewal is the same person, with the weight put down.",
          marvel: [
            { who: "Nebula and Gamora", text: "Renewal can happen between people, not just inside one." },
            { who: "Bucky", text: "Renewal can begin without being forgiven." },
          ],
          deep: "One reading: you can't skip the dark night to reach the bright one. Every fresh start tonight came after facing something. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d8-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Friendship",
      scenario: "Last term you fell out badly with a friend, and you said something hurtful. A new term is starting. You've thought about it a lot since.",
      deep: "They said hurtful things too. Neither of you has spoken about it.",
      prompt: "What would you do?",
      options: [
        {
          id: "nothing",
          label: "Act as if nothing happened",
          perspectives: [
            { label: "What it protects", text: "Everyone avoids an awkward conversation." },
            { label: "What it risks", text: "The dust stays where it is. It may never quite feel fresh." },
            { label: "Question", text: "Can you start again without saying anything?" },
          ],
        },
        {
          id: "sorry",
          label: "Say sorry for your part, simply",
          perspectives: [
            { label: "What it protects", text: "Your friendship, and your own peace." },
            { label: "What it risks", text: "They might not say sorry back, or not be ready." },
            { label: "Question", text: "Does your apology depend on theirs?" },
          ],
        },
        {
          id: "space",
          label: "Give it time, and be kind when you see them",
          perspectives: [
            { label: "What it protects", text: "Room for both of you to come back to it." },
            { label: "What it risks", text: "Time alone doesn't always wash things away." },
            { label: "Question", text: "How long is long enough?" },
          ],
        },
      ],
      closing: "The Ganga washed away the dust, not the person. Nebula said the hurt out loud; Bucky told the truth. A fresh start usually begins with something faced, not something forgotten.",
      talk: [
        "When did you get a fresh start after a hard time?",
        "What's something you learned from a hard time that you'd keep?",
        "Parents: what helps you begin again after a bad day?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "d8-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "When someone is renewed after a hard time, what washes away and what stays?",
      younger: "Kalaratri and Mahagauri are the same goddess. Why do you think the festival puts them next to each other?",
      older: "Bucky told the truth, knowing it might end a friendship. Does peace come from being forgiven, or from telling the truth?",
      takeaway: "After a hard time, you can begin again, clearer than before.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "The app tells the most common Navaratri version: after Parvati's long tapas, Shiva washes her with the waters of the Ganga and she shines as Mahagauri. This telling is found mainly in devotional sources; other tellings of how she became Mahagauri differ.",
        "Mahagauri's iconography (white garments, a white bull, trident and damaru, hands of fearlessness and blessing) comes from devotional verses.",
        "Kanya Puja, honouring young girls as the goddess, is held on Ashtami in many families and on Navami in others.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [MAHA, DM5, KANYA, GOTG2, FATWS],
};
