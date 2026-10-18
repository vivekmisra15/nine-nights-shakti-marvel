// ---------------------------------------------------------------------------
// Day 9: Siddhidatri
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 9),
// reworked around the theme Wholeness (union with the infinite).
//
// Source note: siddhis are named in the yoga traditions (Yoga Sutras, Book 3);
// Yoga Sutra 3.37 calls them obstacles to samadhi, and in the Bhagavata Purana
// (11.15) Krishna tells Uddhava not to pursue them. The story that Shiva
// received the siddhis through her and became Ardhanarishvara is a popular
// devotional account; no primary-text passage was located. The Devi Gita
// (Devi Bhagavata Purana, Book 7, last ten chapters) is the source for the
// Goddess appearing as a blinding light (Brahman) when the gods were
// oppressed by Taraka, promising Gauri to Himalaya, and teaching Himalaya the
// oneness of the self with her. "A wave and the ocean" is an image commonly
// used by Vedanta teachers, offered here as an illustration, not a quotation.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const SIDDHI = { label: "Siddhidatri: iconography and the devotional account", url: "https://en.wikipedia.org/wiki/Siddhidhatri" };
const YS = { label: "Yoga Sutras 3.37: siddhis as obstacles to samadhi", url: "https://satyori.com/source-texts/yoga-sutras-of-patanjali/vibhuti-pada/37/" };
const BHAG = { label: "Bhagavata Purana 11.15: Krishna on the siddhis", url: "https://en.wikipedia.org/wiki/Siddhi" };
const GITA = { label: "Devi Gita (Devi Bhagavata Purana, Book 7)", url: "https://en.wikipedia.org/wiki/Devi_Gita" };
const DM1 = { label: "Devi Mahatmya 1.57: the supreme knowledge, the cause of liberation", url: "https://en.wikipedia.org/wiki/Devi_Mahatmya" };
const THOR = { label: "Thor (2011)", url: "https://en.wikipedia.org/wiki/Thor_(film)", note: "Dialogue paraphrased." };
const IW = { label: "Avengers: Infinity War (2018)", url: "https://en.wikipedia.org/wiki/Avengers:_Infinity_War", note: "Dialogue paraphrased." };

export const day9: DayContent = {
  day: 9,
  name: "Siddhidatri",
  devanagari: "सिद्धिदात्री",
  meaning: "Giver of perfection",
  theme: "Wholeness",
  question: "What makes you feel part of something bigger than yourself?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d9-enter",
      type: "story",
      section: "enter",
      title: "Night nine",
      kind: "interpretation",
      visual: "d9Opening",
      sound: { mood: "infinite", cues: [{ at: 1.0, hit: "bell" }, { at: 6.4, hit: "shimmer" }] },
      duration: 12,
      sources: [SIDDHI],
      captions: [
        { at: 0.6, text: "Night nine, the last night. Tonight's form is Siddhidatri: the giver of siddhis." },
        { at: 4.0, text: "Siddhi means perfection, or accomplishment. Siddhidatri is the one who gives it." },
        { at: 8.0, text: "Eight nights of lamps lead here. Tonight we find out what the whole journey was for." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d9-siddhis",
      type: "story",
      section: "story",
      title: "The powers",
      kind: "tradition",
      visual: "d9Siddhis",
      sound: { mood: "infinite", cues: [{ at: 3.6, hit: "shimmer" }, { at: 5.6, hit: "whoosh" }, { at: 7.4, hit: "boom" }] },
      duration: 14,
      sources: [SIDDHI, YS],
      captions: [
        { at: 0.5, text: "In the yoga traditions, siddhis are extraordinary powers said to come through long practice." },
        {
          at: 3.6,
          text: "Eight are often listed: to become as tiny as an atom, as vast as the sky, as light as air, as heavy as a mountain, and more.",
          deep: "The ashta siddhi: anima (tiny), mahima (vast), laghima (weightless), garima (heavy), prapti, prakamya, ishitva and vashitva (reaching anywhere, any wish fulfilled, mastery and control).",
        },
        { at: 9.0, text: "Siddhidatri gives them. Images show gods, sages and other beings bowing to her." },
      ],
    },
    {
      id: "d9-ardhanari",
      type: "story",
      section: "story",
      title: "Half and half, one whole",
      kind: "interpretation",
      visual: "d9Ardhanari",
      sound: { mood: "union", cues: [{ at: 6.4, hit: "bell" }, { at: 6.6, hit: "shimmer" }] },
      duration: 12,
      sources: [SIDDHI],
      captions: [
        { at: 0.5, text: "A devotional story says that even Shiva received his powers through her." },
        {
          at: 4.0,
          text: "And half of his body became hers: Ardhanarishvara, half Shiva, half Shakti.",
          deep: "Ardhanarishvara is an ancient, well-known form. Linking it to Siddhidatri is a popular devotional account; we could not trace it to a specific scripture.",
        },
        { at: 8.0, text: "His greatest gift wasn't a power. It was becoming whole." },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d9-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d9Siddhis",
      visualTime: 12,
      sources: [YS, BHAG],
      framing: "weigh",
      prompt: "If Siddhidatri offered you one of these powers, would you take it?",
      deepPrompt: "What would you want a power for? And would having it change what you want?",
      options: [
        { id: "vast", label: "Yes: to become as vast as the sky", reasoning: "Imagine seeing everything at once." },
        { id: "light", label: "Yes: to be as light as air", reasoning: "Imagine never being held down by anything." },
        { id: "no", label: "No: I'd ask for something else", reasoning: "Maybe a power isn't the best gift there is." },
      ],
      reveal: {
        title: "What the traditions say",
        text: "The traditions that know siddhis best are cautious about them. The Yoga Sutras call them achievements to the outward-looking mind, but obstacles on the way to deep stillness. In the Bhagavata Purana, Krishna lists the siddhis to his friend Uddhava, then tells him not to chase them, because they distract from what matters.",
        deep: "The Devi Mahatmya calls the Goddess \"the supreme knowledge, the cause of liberation\" (1.57). The highest gift, in this view, is freedom, not power.",
        why: "The giver of powers is also the wisdom that sees past them.",
      },
    },

    // ================================================================ B STORY (continued)
    {
      id: "d9-light",
      type: "story",
      section: "story",
      title: "A light with no edges",
      kind: "tradition",
      visual: "d9Light",
      sound: { mood: "menace", cues: [{ at: 4.2, mood: "infinite" }, { at: 4.2, hit: "shimmer" }, { at: 4.4, hit: "bell" }, { at: 12.0, hit: "bellSoft" }] },
      duration: 16,
      sources: [GITA],
      captions: [
        { at: 0.5, text: "In the Devi Gita, the gods are once again in trouble: the demon Taraka, from Night Five, has conquered the worlds." },
        { at: 4.2, text: "They pray, and the Goddess appears as a blinding light, with no edges: infinite being, awareness and joy." },
        { at: 8.4, text: "She promises Gauri to Himalaya, the mountain king from Night One. Then Himalaya asks her: who are you, really?" },
        {
          at: 12.0,
          text: "She teaches him that the self in every being is one with her, the infinite. Knowing this sets you free.",
          deep: "The Devi Gita is the last ten chapters of Book 7 of the Devi Bhagavata Purana. Its teaching draws on Advaita Vedanta: realising the oneness of the self with Brahman is liberation.",
        },
      ],
      slow: { from: 4.0, to: 7.6, rate: 0.3, prompt: "A light with no edges. Where does it end, and where do you begin?" },
    },
    {
      id: "d9-wave",
      type: "story",
      section: "story",
      title: "The wave and the ocean",
      kind: "interpretation",
      visual: "d9Wave",
      sound: { mood: "ocean", cues: [{ at: 9.4, hit: "shimmer" }] },
      duration: 13,
      sources: [GITA],
      captions: [
        { at: 0.5, text: "Teachers of this idea often use an old picture." },
        { at: 3.6, text: "A wave rises. For a moment it has its own shape, its own height, its own name." },
        { at: 9.6, text: "Then it discovers it was always the ocean." },
      ],
      freezes: [
        {
          at: 7.6,
          title: "One wave",
          text: "The wave is tall and proud and separate. Or is it?",
          think: "Is the wave separate from the ocean?",
          options: [
            { label: "Yes: it has its own shape", response: "It does, for a while. Watch what happens." },
            { label: "No: it's made of ocean", response: "That's the discovery. Watch." },
          ],
          continueLabel: "Watch the wave",
        },
      ],
    },
    {
      id: "d9-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d9Emblems",
      sound: { mood: "infinite" },
      duration: 10,
      sources: [SIDDHI],
      captions: [
        { at: 0.5, text: "Siddhidatri sits on a lotus in full bloom, with four arms, sometimes on a lion." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "discus", label: "Discus", x: 560, y: 330, title: "Discus (chakra)", text: "A wheel that turns without beginning or end: the round of time.", kind: "interpretation", source: "Devotional iconography" },
        { id: "conch", label: "Conch", x: 1040, y: 330, title: "Conch (shankha)", text: "Blown to announce something sacred: the sound that begins.", kind: "interpretation", source: "Devotional iconography" },
        { id: "mace", label: "Mace", x: 560, y: 540, title: "Mace (gada)", text: "Strength, held, not swung.", kind: "interpretation" },
        { id: "lotus", label: "Lotus", x: 1040, y: 540, title: "Lotus", text: "Rooted in mud, opening in light: the whole journey in one flower.", kind: "interpretation" },
        { id: "seat", label: "Full bloom", x: 800, y: 780, title: "A lotus in full bloom", text: "On the last night, the flower is completely open.", kind: "interpretation" },
        { id: "bowing", label: "Bowing beings", x: 280, y: 720, title: "All beings bow", text: "Gods, sages, siddhas and even demons are shown honouring her. Every kind of being belongs to the whole.", kind: "interpretation", source: "Devotional iconography" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d9-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "You are whole when you know you are part of the whole.",
      deeper:
        "Siddhidatri is the giver of siddhis, perfected powers, and many images show gods and sages bowing to her. In a devotional account, even Shiva received his powers through her and became Ardhanarishvara, half Shiva and half Shakti: one whole. Yet the tradition keeps saying powers are not the goal. The Yoga Sutras warn they can become obstacles, and the Devi Mahatmya calls the Goddess \"the cause of liberation\". The deepest gift of the ninth night is a discovery, not a power. In the Devi Gita, the Goddess teaches that the self in every being is one with the infinite, and that knowing this sets you free. An old image for it is a wave discovering it was always the ocean. After eight nights of rootedness, resolve, readiness, creation, nurture, courage, fearlessness and renewal, the journey ends there: not with becoming stronger, but with no longer feeling separate.",
      connections: [
        { event: "Shiva becomes half Shakti.", meaning: "The greatest gift is wholeness, not more power.", jumpTo: "d9-ardhanari" },
        { event: "The light with no edges.", meaning: "The self in every being is one with the infinite.", jumpTo: "d9-light" },
        { event: "The wave was always ocean.", meaning: "Wholeness is no longer feeling separate.", jumpTo: "d9-wave" },
      ],
      readings: [
        { kind: "tradition", label: "What the texts say", text: "The yoga traditions treat siddhis as real but distracting. The Devi Gita teaches that the self is one with the Goddess as Brahman, and that knowing this is liberation." },
        { kind: "interpretation", label: "A devotional reading", text: "Siddhidatri grants every perfection to her devotees, and above all the wisdom and freedom that complete the nine nights." },
        { kind: "contemporary", label: "Our reading", text: "Wholeness might mean feeling connected to other people and the world, or something beyond the world. You don't have to choose one answer. This is our interpretation, offered to argue with." },
      ],
      invite: "In the next two scenes, two people give everything. Watch which one ends up whole.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "th-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Worthy",
      kind: "marvel",
      role: "primary",
      roleNote: "A prince loses all his power, and gets it back only when he stops wanting it for himself.",
      film: "Thor",
      year: 2011,

      rating: "PG-13",
      character: "Thor",
      scene: "Thor fails to lift Mjolnir, then offers his life to protect a small town.",
      context:
        "Thor was arrogant and reckless, so his father Odin stripped him of his power and banished him to Earth. Odin sent his hammer, Mjolnir, after him, enchanted so that only someone worthy can lift it.",
      find: {
        where: "The second half of the film: the hammer in the crater, then the fight with the Destroyer in the town.",
        search: "Thor 2011 Thor sacrifice Destroyer hammer returns",
      },
      watchFor: ["What happens when Thor tries to lift the hammer.", "What Thor asks of his brother Loki.", "When the hammer finally comes back."],
      sources: [THOR],
    },
    {
      id: "th-crater",
      type: "story",
      section: "marvel",
      title: "He can't lift it",
      kind: "marvel",
      visual: "d9Crater",
      sound: { mood: "filmStruggle", cues: [{ at: 4.6, hit: "thunder" }, { at: 7.6, mood: "filmLament" }] },
      duration: 12,
      sources: [THOR],
      captions: [
        { at: 0.5, text: "Thor fights his way into the guarded crater where his hammer lies. He grips it and pulls." },
        { at: 4.6, text: "It doesn't move. He drops to his knees in the rain." },
        { at: 8.0, text: "His brother Loki visits and lies: their father is dead, and Thor can never come home. Thor believes him." },
      ],
    },
    {
      id: "th-destroyer",
      type: "story",
      section: "marvel",
      title: "Take me instead",
      kind: "marvel",
      visual: "d9Destroyer",
      sound: { mood: "filmTension", cues: [{ at: 0.6, hit: "boom" }, { at: 3.0, hit: "boom" }, { at: 6.0, mood: "filmLament" }] },
      duration: 12,
      sources: [THOR],
      captions: [
        { at: 0.5, text: "Loki sends the Destroyer, a fiery armoured giant, to a small town where Thor's new friends live." },
        { at: 4.0, text: "Thor has no power. His friends from Asgard can't stop it. He helps get people to safety." },
        { at: 7.0, text: "Thor walks towards the Destroyer alone and asks his brother to take his life instead, and spare the people." },
      ],
      freezes: [
        {
          at: 10.0,
          title: "Nothing left to give but himself",
          text: "He isn't trying to get his power back any more. He's trying to keep the town safe.",
        },
      ],
    },
    {
      id: "th-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d9Destroyer",
      visualTime: 10,
      sources: [THOR],
      framing: "will",
      prompt: "What do you think happens next?",
      options: [
        { id: "spare", label: "Loki spares him", reasoning: "Brothers, after all." },
        { id: "struck", label: "The Destroyer strikes him down", reasoning: "Loki wants him gone." },
        { id: "power", label: "His power comes back", reasoning: "Maybe this is what \"worthy\" means." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "The Destroyer strikes Thor down, and he dies. Then, far away, the hammer rises from its crater and flies to his hand. His power returns, and so does his life. He has become worthy.",
        why: "He got his power back at the moment he stopped wanting it for himself.",
      },
    },
    {
      id: "th-worthy",
      type: "story",
      section: "marvel",
      title: "Worthy",
      kind: "marvel",
      visual: "d9Worthy",
      sound: { mood: "filmEpic", cues: [{ at: 3.6, hit: "thunder" }, { at: 4.0, hit: "shimmer" }] },
      duration: 10,
      sources: [THOR],
      captions: [
        { at: 0.5, text: "The hammer flies across the desert." },
        { at: 3.6, text: "It reaches his hand. Thor is himself again: more himself than before." },
      ],
    },
    {
      id: "th-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Thor",
      kind: "comparison",
      turningPoint: "Thor choosing to protect the town when he's certain he can't win. His power returns only once he no longer seeks it.",
      connection:
        "Like the siddhis, Thor's power is received, not seized, and it comes when he no longer needs it for himself. He becomes whole by giving himself to something bigger than himself. But Mjolnir's test is a magic condition set by Odin; siddhis come through practice and grace.",
      ladder: [
        { level: "notice", text: "When couldn't Thor lift the hammer? When did it come to him?" },
        { level: "feel", text: "How do you think Thor felt kneeling in the rain?" },
        {
          level: "wonder",
          text: "Thor got his power back when he stopped trying to get it. Why do you think that happened?",
          followUps: [{ ifTheySay: "Because he was brave", ask: "He was brave in the crater too. What was different the second time?" }],
        },
        {
          level: "stretch",
          text: "What does \"worthy\" mean in this story?",
          deep: "Is worthiness something you have, or something you show by what you're willing to give up? Could someone be worthy and never know it?",
        },
        { level: "flip", text: "What if the hammer had come to him in the crater, before he changed?" },
        { level: "connect", text: "Shiva became whole by becoming half Shakti. How did Thor become whole?" },
      ],
      stance: {
        statement: "You become your best self by caring about something bigger than yourself.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "What is the \"something bigger\" for each of you?",
      },
      activity: {
        title: "Lift the hammer",
        minutes: 6,
        steps: [
          "Each person names a skill or power they wish they had.",
          "Now say what you'd use it for, honestly.",
          "Would the hammer come to you, with that reason? Why or why not?",
          "Change the reason, if you want, so it would.",
        ],
      },
      sources: [THOR],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "tn-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "What did it cost?",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "The opposite of Siddhidatri: power seized by giving up love, ending alone.",
      film: "Avengers: Infinity War",
      year: 2018,

      rating: "PG-13",
      character: "Thanos and Gamora",
      scene: "Vormir and the Soul Stone, then the quiet place after the snap.",
      context:
        "Thanos is gathering six Infinity Stones to wipe out half of all life, convinced it will save the universe. The Soul Stone demands a terrible price: the life of someone the seeker loves. He has brought Gamora, the daughter he raised.",
      find: {
        where: "Vormir is in the second half of the film. The quiet orange place is in the very last scenes, right after the snap.",
        search: "Infinity War Thanos Gamora Vormir",
      },
      parentNote:
        "Major spoiler, and an emotional scene: Gamora dies. It may upset your younger child. The retelling here avoids showing how it happens. Preview first, or use the retelling only.",
      watchFor: ["What Gamora thinks Thanos loves.", "What Thanos chooses.", "His answer to the last question he's asked."],
      sources: [IW],
    },
    {
      id: "tn-vormir",
      type: "story",
      section: "marvel",
      title: "The price",
      kind: "marvel",
      visual: "d9Vormir",
      sound: { mood: "filmTension", cues: [{ at: 4.6, hit: "heartbeat" }, { at: 8.6, mood: "filmLament" }] },
      duration: 12,
      sources: [IW],
      captions: [
        { at: 0.5, text: "On the cliffs of Vormir, the guardian of the Soul Stone explains the price: a soul for a soul. Someone you love." },
        { at: 4.6, text: "Gamora laughs. Thanos loves nothing, she says. Then she sees him crying." },
        { at: 8.6, text: "He chooses the stone. When he wakes, he holds it, and Gamora is gone." },
      ],
    },
    {
      id: "tn-cost",
      type: "story",
      section: "marvel",
      title: "Everything",
      kind: "marvel",
      visual: "d9SoulWorld",
      sound: { mood: "filmQuiet", cues: [{ at: 7.4, hit: "bellSoft" }] },
      duration: 12,
      sources: [IW],
      captions: [
        { at: 0.5, text: "When Thanos finally uses all six stones, he finds himself in a quiet, orange world." },
        { at: 3.8, text: "A young Gamora asks him if he did it. Yes, he says." },
        { at: 7.2, text: "\"Everything.\"" },
        { at: 9.2, text: "All the power in the universe, and he is completely alone." },
      ],
      freezes: [
        {
          at: 6.6,
          title: "The last question",
          text: "She asks: what did it cost?",
          think: "What do you think he answers?",
          options: [
            { label: "\"Nothing\"", response: "That's what he might have said once. Watch." },
            { label: "\"Everything\"", response: "That's his answer." },
          ],
          continueLabel: "Hear his answer",
        },
      ],
    },
    {
      id: "tn-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Thanos",
      kind: "comparison",
      turningPoint: "\"Everything.\" Thanos gains ultimate power at the price of the one thing that made him human.",
      connection:
        "The exact opposite of Siddhidatri: power seized, not received; love given up to get it; and an ending alone, not whole. It makes the yoga traditions' warning about powers vivid. It's a villain's tragedy, not a spiritual path, but that's what makes it a useful contrast.",
      ladder: [
        { level: "notice", text: "What did Thanos give up to get the stone?" },
        { level: "feel", text: "How did Thanos seem when he said \"everything\"?" },
        {
          level: "wonder",
          text: "Thanos got exactly what he wanted. Why does it feel like he lost?",
        },
        {
          level: "stretch",
          text: "Thanos and Thor both gave everything. Why did one end up whole and the other empty?",
          deep: "Thor gave himself for others; Thanos gave someone else for his goal. Is the difference what they gave, who they gave it for, or what they believed?",
          followUps: [{ ifTheySay: "Thanos was evil", ask: "He believed he was saving the universe. Does that change anything?" }],
        },
        { level: "flip", text: "What if Thanos had refused the price on Vormir?" },
        { level: "connect", text: "The yoga traditions warn that powers can become obstacles. Where do you see that in Thanos?" },
      ],
      stance: {
        statement: "Some things are worth any price.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Name one thing you would never trade, whatever you got for it.",
      },
      activity: {
        title: "What would it cost?",
        minutes: 6,
        steps: [
          "Each person names something they really want: a goal, a prize, a skill.",
          "List what it might cost: time, friends, sleep, other things you love.",
          "Draw a line: which costs are worth it, and which aren't?",
          "Compare lines. Where do you agree?",
        ],
      },
      sources: [IW],
    },

    // ================================================================ F COMPARE
    {
      id: "d9-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "The giver of all powers teaches that the deepest gift is knowing you are one with the infinite.",
          traditionJump: "d9-light",
          marvel: [
            { who: "Thor", text: "He loses his power, gives himself for others, and becomes worthy.", jumpTo: "th-destroyer" },
            { who: "Thanos", text: "He gives up the one he loves for ultimate power, and ends with nothing.", jumpTo: "tn-cost" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "Who ends up whole, and who ends up alone?",
          tradition: "You are whole when you know you are part of the whole.",
          marvel: [
            { who: "Thor", text: "Whole by giving himself to something bigger." },
            { who: "Thanos", text: "Alone, by putting his goal above everyone." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which story is about power, and which about something beyond it?",
          tradition: "Siddhidatri's wholeness is spiritual: union with the infinite, beyond any power.",
          marvel: [
            { who: "Thor", text: "His reward is getting his power back." },
            { who: "Thanos", text: "A villain's tragedy, not a spiritual path." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Power on its own never completes anyone.",
          marvel: [
            { who: "Thor", text: "Power returns once it's no longer for himself." },
            { who: "Thanos", text: "All the power in the universe, and empty." },
          ],
          deep: "One reading: Thor and Thanos both \"gave everything\". Thor gave himself and became part of something bigger; Thanos gave others away and was left separate from everything. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d9-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Music",
      scenario: "Your school band is preparing for a big concert. You hoped for the solo. Instead, the teacher asks you to play the harmony that holds the whole piece together.",
      deep: "You're probably the strongest player. Your friend got the solo, and you think you'd have played it better.",
      prompt: "What would you do?",
      options: [
        {
          id: "ask",
          label: "Ask the teacher to give you the solo",
          perspectives: [
            { label: "What it protects", text: "Your chance to be heard, and your ambition." },
            { label: "What it risks", text: "Your friend, and maybe the balance of the band." },
            { label: "Question", text: "Who would the piece be for, then?" },
          ],
        },
        {
          id: "harmony",
          label: "Play the harmony as well as you possibly can",
          perspectives: [
            { label: "What it protects", text: "The whole piece. Without harmony, the solo sounds thin." },
            { label: "What it risks", text: "Nobody may notice how good you are." },
            { label: "Question", text: "Can you feel proud of something nobody singles out?" },
          ],
        },
        {
          id: "both",
          label: "Play the harmony, and ask for a solo next time",
          perspectives: [
            { label: "What it protects", text: "The band now, and your own growth later." },
            { label: "What it risks", text: "You may need to be patient for a long time." },
            { label: "Question", text: "Is wanting to stand out a bad thing?" },
          ],
        },
      ],
      closing: "A wave is part of the ocean; a harmony is part of the music. Thor became worthy by giving himself to something bigger. Being part of the whole is not the same as disappearing.",
      talk: [
        "When have you felt part of something bigger than yourself?",
        "Is there a \"harmony\" you play in this family?",
        "Parents: what makes you feel connected to something infinite?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "d9-nine",
      type: "story",
      section: "reflect",
      title: "Nine lamps",
      kind: "interpretation",
      visual: "d9Nine",
      sound: {
        mood: "infinite",
        cues: [
          { at: 0.8, hit: "bellSoft" },
          { at: 2.0, hit: "bellSoft" },
          { at: 3.2, hit: "bellSoft" },
          { at: 4.4, hit: "bellSoft" },
          { at: 5.6, hit: "bellSoft" },
          { at: 6.8, hit: "bellSoft" },
          { at: 8.0, hit: "bellSoft" },
          { at: 9.2, hit: "bellSoft" },
          { at: 10.4, hit: "bell" },
          { at: 11.6, hit: "shimmer" },
        ],
      },
      duration: 16,
      captions: [
        { at: 0.5, text: "Nine nights. Nine forms of the Devi. Nine lamps." },
        { at: 4.6, text: "Rootedness. Resolve. Readiness. Creation. Nurture. Courage. Fearlessness. Renewal." },
        { at: 10.4, text: "And wholeness: all of them, together, part of something without edges." },
        { at: 13.4, text: "In many homes, the next day is Vijayadashami: the day of victory." },
      ],
    },
    {
      id: "d9-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "What makes you feel part of something bigger than yourself?",
      younger: "Thor got his power back when he stopped trying to get it. Why do you think that happened?",
      older: "Thanos and Thor both gave everything. Why did one end up whole and the other empty?",
      takeaway: "You are whole when you know you are part of the whole.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "Siddhis are described in the yoga traditions, including the Yoga Sutras (Book 3). Yoga Sutra 3.37 calls them obstacles to samadhi, though they look like accomplishments to the outward-turned mind. In the Bhagavata Purana (11.15), Krishna tells Uddhava not to pursue them.",
        "The story that Shiva received the siddhis through Siddhidatri and became Ardhanarishvara is a popular devotional account. Ardhanarishvara itself is ancient and well attested.",
        "The Devi Gita (the last ten chapters of Book 7 of the Devi Bhagavata Purana) tells of the Goddess appearing as a blinding light when the gods were oppressed by Taraka, promising Gauri to Himalaya, and teaching him that the self is one with her. The Devi Mahatmya (1.57) calls her the supreme knowledge, the cause of liberation.",
        "Verse numbers differ between editions: the Yoga Sutra verse is 3.37 in some and 3.38 in others, and the Devi Mahatmya verse is numbered differently in some translations.",
        "The wave and the ocean is an image teachers commonly use for this idea; it is an illustration, not a quotation from the texts.",
      ],
    },
    {
      title: "A question with room for every answer",
      paragraphs: [
        "Wholeness can be read religiously, as union with the infinite, or as feeling deeply connected to other people and the world. The lesson works with either answer.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [SIDDHI, YS, BHAG, GITA, DM1, THOR, IW],
};
