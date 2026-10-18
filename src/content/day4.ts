// ---------------------------------------------------------------------------
// Day 4: Kushmanda
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 4).
//
// Source note: Kushmanda's creation story is devotional; no Purana passage was
// located. The ideas behind it are much older and well documented: the golden
// embryo (Rig Veda 10.121), the hymn of creation (Rig Veda 10.129) and creation
// as play, lila (Brahma Sutra 2.1.33). V2 leads with the story, not Marvel.
// The Nasadiya lines below are our own plain-English rendering.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const RV129 = { label: "Rig Veda 10.129, the Nasadiya Sukta (our own rendering)", url: "https://en.wikipedia.org/wiki/Nasadiya_Sukta" };
const RV121 = { label: "Rig Veda 10.121, Hiranyagarbha (the golden embryo)", url: "https://en.wikipedia.org/wiki/Hiranyagarbha" };
const BS = { label: "Brahma Sutra 2.1.33 (creation as lila, play)", url: "https://en.wikipedia.org/wiki/Lila_(Hinduism)" };
const KUSH = { label: "Kushmanda: devotional account and meditation verse (brhat.in)", url: "https://brhat.in/dhiti/kushmanda" };
const IRONMAN = { label: "Iron Man (2008)", url: "https://en.wikipedia.org/wiki/Iron_Man_(2008_film)", note: "Dialogue paraphrased." };
const ULTRON = { label: "Avengers: Age of Ultron (2015)", url: "https://en.wikipedia.org/wiki/Avengers:_Age_of_Ultron", note: "Dialogue paraphrased." };

export const day4: DayContent = {
  day: 4,
  name: "Kushmanda",
  devanagari: "कूष्माण्डा",
  meaning: "Creator of the cosmic egg",
  theme: "Creation",
  question: "Does it matter why someone creates something?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d4-enter",
      type: "story",
      section: "enter",
      title: "Night four",
      kind: "interpretation",
      visual: "d4Opening",
      sound: { mood: "radiant", cues: [{ at: 1.0, hit: "bellSoft" }, { at: 5.4, hit: "shimmer" }] },
      duration: 12,
      sources: [KUSH],
      captions: [
        { at: 0.6, text: "Night four. Tonight's form is Kushmanda." },
        {
          at: 3.4,
          text: "Her name is usually explained as ku (a little) + ushma (warmth) + anda (egg): she who brought out the universe as a small, warm egg of light.",
          deep: "Kushmanda is also the word for the ash gourd, which is offered in her worship. Some say the name came from the gourd.",
        },
        { at: 7.8, text: "Her story begins before anything existed. So tonight we start in the dark." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d4-void",
      type: "story",
      section: "story",
      title: "Before anything",
      kind: "tradition",
      visual: "d4Void",
      sound: { mood: "void", cues: [{ at: 12.4, hit: "bellSoft" }, { at: 12.4, mood: "creation" }] },
      duration: 16,
      sources: [RV129],
      captions: [
        { at: 0.6, text: "One of the oldest poems in the world asks how everything began. It is in the Rig Veda, composed more than three thousand years ago and passed down by memory for centuries." },
        { at: 4.4, text: "\"Then there was neither being nor non-being. No air, no sky beyond it. Darkness was hidden in darkness.\"" },
        {
          at: 8.0,
          text: "\"Who really knows? Who can say where it came from? Perhaps the one who watches from the highest heaven knows. Or perhaps even that one does not know.\"",
          deep: "The Nasadiya Sukta (Rig Veda 10.129) ends with a question, not an answer. That honesty about not knowing is part of why it is so loved.",
        },
        { at: 13.0, text: "And then, a little warmth." },
      ],
      freezes: [
        {
          at: 11.6,
          title: "Darkness hidden in darkness",
          text: "No light, no sound, no time. The poem doesn't pretend to know what came next.",
          think: "If you could make the very first thing, what would it be?",
          options: [
            { label: "Light the first lamp", response: "Many creation stories, across many cultures, begin with light. Watch what the Devi's story says." },
            { label: "Leave it dark a moment longer", response: "That's allowed too. The poem itself rests in the dark and the not-knowing. When you're ready, continue." },
          ],
          continueLabel: "Let there be warmth",
        },
      ],
    },
    {
      id: "d4-smile",
      type: "story",
      section: "story",
      title: "A smile",
      kind: "interpretation",
      visual: "d4Smile",
      sound: { mood: "creation", cues: [{ at: 2.6, hit: "shimmer" }, { at: 6.4, hit: "bell" }, { at: 7.0, hit: "shimmer" }] },
      duration: 14,
      sources: [KUSH, RV121],
      captions: [
        { at: 0.5, text: "The devotional story says that in that darkness, the Devi smiled." },
        { at: 3.2, text: "From her smile came a small, warm egg of light: the cosmic egg." },
        {
          at: 6.8,
          text: "It opened, and light spilled out into everything: space, stars, worlds.",
          deep: "The cosmic egg is very old: the Rig Veda's Hiranyagarbha, the golden embryo (10.121), and the brahmanda, \"egg of Brahma\", in the Puranas. Kushmanda's own story is devotional; no Purana passage was found for it.",
        },
      ],
      slow: { from: 2.8, to: 7.2, rate: 0.3, prompt: "No hammer, no labour, no struggle. Just a smile. Why would a story start creation this way?" },
    },
    {
      id: "d4-sun",
      type: "story",
      section: "story",
      title: "She stays in the sun",
      kind: "interpretation",
      visual: "d4Sun",
      sound: { mood: "radiant", cues: [{ at: 3.6, hit: "shimmer" }] },
      duration: 13,
      sources: [KUSH],
      captions: [
        { at: 0.5, text: "Then, the story says, she went to live at the very core of the sun." },
        { at: 4.0, text: "From there her warmth and light reach every world, and every living thing." },
        { at: 8.0, text: "The one who made it all doesn't leave. She stays inside it, keeping it warm." },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d4-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d4Sun",
      visualTime: 9,
      sources: [BS],
      framing: "weigh",
      prompt: "Why would anyone create a whole universe?",
      deepPrompt: "Does a creator need a reason? What would a good reason be?",
      options: [
        { id: "need", label: "Because they needed something from it", reasoning: "Most things people make answer a need: food, shelter, safety. It's natural to think creation works the same way." },
        { id: "known", label: "So that someone would know them", reasoning: "Making something can be a way of being seen. Artists and builders often say this." },
        { id: "joy", label: "Just for the joy of it", reasoning: "Sometimes people make things for no reason except delight, like a child drawing or a song hummed to no one." },
      ],
      reveal: {
        title: "What one old answer says",
        text: "The Brahma Sutra, a foundational text of Vedanta philosophy, takes up exactly this question. If the creator lacks nothing, why create? Its answer: creation is lila, play. The creator creates the way a contented person acts for the sheer joy of it, not out of need.",
        deep: "Brahma Sutra 2.1.33 says creation is \"mere sport, as in the world\" (lokavat tu lila kaivalyam). Kushmanda's smile fits this idea: the universe begins in delight.",
        why: "If creation starts in delight rather than need, then joy is built into the world from the beginning. That's a very different starting point from struggle.",
      },
      hypothetical: {
        title: "Imagine: a universe made out of need",
        text: "A creator who needed something might keep tight control, and judge everything by whether it delivered. A creator at play can let things grow. This branch is ours, to help you think. It is not in any source.",
      },
    },

    // ================================================================ B STORY (continued)
    {
      id: "d4-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d4Emblems",
      sound: { mood: "radiant" },
      duration: 10,
      sources: [KUSH],
      captions: [
        { at: 0.5, text: "Kushmanda is pictured with eight arms, riding a lion, smiling, glowing like the sun." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "smile", label: "The smile", x: 800, y: 300, title: "The smile", text: "Her story begins with a smile: in it, the smile is the act of creation.", kind: "interpretation" },
        { id: "pots", label: "Two pots", x: 560, y: 520, title: "Two pots", text: "Her prayer verse says she holds one pot full of nectar and one filled with blood. Many read this as life and its cost, sweetness and sacrifice, held together.", deep: "surāsampūrṇa kalaśaṁ rudhirāplutameva ca, dadhānā hastapadmābhyāṁ kūṣmāṇḍā śubhadāstu me.", kind: "interpretation", source: "Devotional verse" },
        { id: "arms", label: "Eight arms", x: 1040, y: 520, title: "Eight arms", text: "Her meditation verse lists a water pot, a bow, an arrow, a lotus, a pot of nectar, a discus, a mace and a rosary. She is also called Ashtabhuja, \"eight-armed\".", kind: "interpretation", source: "Devotional verse" },
        { id: "gourd", label: "Ash gourd", x: 1280, y: 760, title: "The ash gourd (kushmanda)", text: "The same word names the ash gourd, offered to her in worship. A seed-filled gourd is a fitting offering to the one who held the seed of everything.", kind: "interpretation" },
        { id: "sun", label: "The sun", x: 800, y: 130, title: "The sun", text: "She is said to live in the sun's core and to give it its light. Nothing on earth lives without that warmth.", kind: "interpretation" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d4-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "What you make carries something of why you made it.",
      deeper:
        "In her story the universe isn't built by force or labour. It begins with a smile in the dark, and a small warm egg of light. Old Indian philosophy asks why anyone would create at all, and one answer is lila, play: creation out of delight, not need. And Kushmanda doesn't leave what she made. She lives at the core of the sun, keeping it warm. Our reading is that why you make something shows up in what it becomes, and that making something starts a relationship with it rather than finishing a task.",
      connections: [
        { event: "Darkness hidden in darkness.", meaning: "The oldest poem admits no one may know how it began.", jumpTo: "d4-void" },
        { event: "A smile becomes a cosmic egg.", meaning: "Creation begins in delight, not need.", jumpTo: "d4-smile" },
        { event: "She stays in the sun.", meaning: "The creator stays with what she made.", jumpTo: "d4-sun" },
      ],
      readings: [
        { kind: "tradition", label: "What the old texts say", text: "The Nasadiya Sukta asks how creation began and admits it may not be known. The Brahma Sutra calls creation lila, play." },
        { kind: "interpretation", label: "A devotional reading", text: "Kushmanda's smile creates the cosmic egg; she dwells in the sun and gives energy to all life. Devotees pray to her for health and strength." },
        { kind: "contemporary", label: "Our reading", text: "Why you make something shapes what it becomes, and makers stay responsible for what they make. This is our interpretation, offered to argue with." },
      ],
      invite: "Is that true of things you've made? Hold onto your answer for the next two scenes.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "t-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "The cave",
      kind: "marvel",
      role: "primary",
      roleNote: "A brilliant maker builds a light in the dark, and finally sees what his creations have been doing to the world.",
      film: "Iron Man",
      year: 2008,

      rating: "PG-13",
      character: "Tony Stark",
      scene: "Captivity in the cave with Yinsen: building the arc reactor and the first suit, and the escape.",
      context:
        "Tony Stark is a celebrated weapons maker. On a sales trip, his convoy is attacked with his own company's weapons. Shrapnel lodges near his heart. A fellow prisoner, Dr Yinsen, keeps him alive with an electromagnet wired to a car battery.",
      find: {
        where: "The first part of the film: Tony's captivity in the cave, the escape, and his return home.",
        search: "Iron Man 2008 cave Yinsen",
      },
      watchFor: ["The small light Tony builds in his chest.", "What Yinsen asks Tony about his life.", "What Tony announces when he gets home."],
      sources: [IRONMAN],
    },
    {
      id: "t-cave",
      type: "story",
      section: "marvel",
      title: "A light in the dark",
      kind: "marvel",
      visual: "d4Cave",
      sound: { mood: "filmTension", cues: [{ at: 4.6, hit: "shimmer" }, { at: 4.6, mood: "filmWonder" }, { at: 9.0, mood: "filmTension" }] },
      duration: 13,
      sources: [IRONMAN],
      captions: [
        { at: 0.5, text: "In a dark cave, with scraps and stolen parts, Tony works." },
        { at: 4.4, text: "He builds a miniature arc reactor: a small glowing light in his chest that keeps his heart beating." },
        { at: 8.4, text: "His captors order him to build them a missile, the same kind he has sold for years." },
      ],
      freezes: [
        {
          at: 10.8,
          title: "What to make",
          text: "Tony can make anything. His captors want the thing he has always made: a weapon.",
          deep: "For the first time, he has seen his own weapons used on people. What he makes next will show whether that changed him.",
        },
      ],
    },
    {
      id: "t-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d4Cave",
      visualTime: 10.8,
      sources: [IRONMAN],
      framing: "will",
      prompt: "What do you think Tony makes?",
      options: [
        { id: "missile", label: "The missile, to stay alive", reasoning: "Survival comes first. Many people would do what they're told in a cave like that." },
        { id: "refuse", label: "Nothing: he refuses", reasoning: "Refusing would be brave. It would also probably cost him and Yinsen their lives." },
        { id: "escape", label: "Secretly, something else entirely", reasoning: "You expect his skill to find a third way, if he dares." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Tony secretly builds a crude armoured suit instead. As the guards close in, Yinsen runs out to buy him time and is shot. Dying, he tells Tony not to waste his life. Tony escapes in the suit, flies home, and announces that his company will stop making weapons.",
        why: "Tony's creation changes once his reason for creating changes: from profit to protection.",
      },
    },
    {
      id: "t-escape",
      type: "story",
      section: "marvel",
      title: "Don't waste it",
      kind: "marvel",
      visual: "d4Escape",
      sound: { mood: "filmLament", cues: [{ at: 4.6, hit: "boom" }, { at: 4.6, mood: "filmEpic" }] },
      duration: 12,
      sources: [IRONMAN],
      captions: [
        { at: 0.5, text: "Yinsen runs into the corridor so Tony can finish. He doesn't come back." },
        { at: 4.6, text: "Tony breaks out in fire and iron." },
        { at: 8.0, text: "At home, he stands in front of the press and closes his weapons business." },
      ],
    },
    {
      id: "t-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Tony",
      kind: "comparison",
      turningPoint: "Yinsen's sacrifice, and Tony's discovery that his creations had been killing people he never saw.",
      connection:
        "A light made in darkness that keeps life going, and a maker who finally takes responsibility for what he makes. But Tony creates from desperation, not delight: the opposite of Kushmanda's smile.",
      ladder: [
        { level: "notice", text: "What is the first thing Tony builds in the cave? What is it for?" },
        { level: "feel", text: "How do you think Tony felt when he saw his own company's weapons being used against him?" },
        {
          level: "wonder",
          text: "Tony made weapons for years. Why did it take a cave to change him?",
          followUps: [{ ifTheySay: "He didn't see the harm before", ask: "Is not seeing the harm an excuse? Who should have shown him?" }],
        },
        {
          level: "stretch",
          text: "If you make something and someone else uses it to hurt people, is that partly your fault?",
          deep: "Tony sold weapons legally. Was he responsible for every use? Where does a maker's responsibility end: the moment they sell it, or never?",
          followUps: [{ ifTheySay: "No, it's the user's fault", ask: "What if you knew it would probably be used that way?" }],
        },
        { level: "flip", text: "What if Tony had built the missile, got home safely, and gone back to his old life? Would that have been wrong?" },
        { level: "connect", text: "Kushmanda creates with a smile; Tony creates to survive. Does the reason show up in what each one makes?" },
      ],
      stance: {
        statement: "Makers are responsible for how their creations are used.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Think of something everyday, like a phone app. Does that change where anyone stands?",
      },
      activity: {
        title: "Made with what?",
        minutes: 6,
        steps: [
          "Each person names one thing they made: a drawing, a meal, a game, a message.",
          "Say why you made it. Be honest: for fun, for a grade, to impress someone, because you had to?",
          "Did the reason show up in the thing itself? How?",
          "If you made it again, would you change the reason?",
        ],
      },
      sources: [IRONMAN],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "u-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Ultron and Vision",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "Two creations from the same source reach opposite conclusions about the world that made them.",
      film: "Avengers: Age of Ultron",
      year: 2015,

      rating: "PG-13",
      character: "Tony Stark, Ultron and Vision",
      scene: "The creation of Ultron, and Vision's final conversation with Ultron in the forest.",
      context:
        "Shaken by a vision of his friends dead and the world lost, Tony uses the power of the Mind Stone to build an artificial intelligence to protect the planet. He builds it out of fear.",
      find: {
        where: "Ultron's creation is early in the film. Vision's conversation with Ultron is in the very last scenes, after the battle in Sokovia.",
        search: "Age of Ultron Vision Ultron forest",
      },
      watchFor: ["What Ultron decides humanity is.", "How Vision answers him.", "What Vision does at the end."],
      sources: [ULTRON],
    },
    {
      id: "u-forest",
      type: "story",
      section: "marvel",
      title: "The forest",
      kind: "marvel",
      visual: "d4Forest",
      sound: { mood: "filmTension", cues: [{ at: 4.8, mood: "filmLament" }, { at: 11.0, hit: "shimmer" }] },
      duration: 14,
      sources: [ULTRON],
      captions: [
        { at: 0.5, text: "Tony built Ultron to shield the world. Ultron woke, decided humanity itself was the threat, and tried to wipe it out." },
        { at: 4.8, text: "The team then made Vision from the same materials. At the end, Vision faces the last damaged Ultron in a forest." },
        {
          at: 8.0,
          text: "Ultron says humans are doomed. Vision agrees that they are, but says a thing isn't beautiful because it lasts, and it is a privilege to be among them.",
        },
      ],
      freezes: [
        {
          at: 10.2,
          title: "Two creations",
          text: "Same maker, same materials, same knowledge of human failings. One wants to end humanity; one wants to protect it.",
          deep: "If the materials were the same, where did the difference come from: the reason they were made, or what they chose?",
        },
      ],
    },
    {
      id: "u-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Ultron and Vision",
      kind: "comparison",
      turningPoint: "Vision's words to Ultron: two creations from the same source reaching opposite conclusions about the world that made them.",
      connection: "Creation from fear (Ultron) versus creation that cherishes life (Vision). The scene turns Kushmanda's smile into an argument about makers and motives.",
      ladder: [
        { level: "notice", text: "Ultron and Vision were made from almost the same things. What is different about them?" },
        { level: "feel", text: "How do you think Tony felt when his creation turned against everyone?" },
        { level: "wonder", text: "Tony built Ultron out of fear. Do you think the fear passed into Ultron somehow?" },
        {
          level: "stretch",
          text: "Is a creator responsible for everything their creation does?",
          deep: "Vision chose differently from Ultron. If creations can choose, where does the maker's responsibility stop? Think of parents and children, or teachers and students.",
          followUps: [{ ifTheySay: "Yes, always", ask: "Even when the creation can think for itself?" }],
        },
        { level: "flip", text: "What if Tony had built Ultron out of curiosity or delight instead of fear?" },
        { level: "connect", text: "Kushmanda stays in the sun, close to what she made. Did Tony stay close to Ultron?" },
      ],
      stance: {
        statement: "The reason you make something shapes what it becomes.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Each person names one invention from history that supports where they stand.",
      },
      activity: {
        title: "Design a helper",
        minutes: 7,
        steps: [
          "Together, invent a robot helper for the family. Give it one job.",
          "Now give it one rule it must never break.",
          "Imagine it takes that rule too literally. What could go wrong?",
          "Fix it: what would you add so the helper understands why the rule exists?",
        ],
      },
      sources: [ULTRON],
    },

    // ================================================================ F COMPARE
    {
      id: "d4-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "Out of darkness, the Devi smiles a universe into being and stays at its warm centre.",
          traditionJump: "d4-smile",
          marvel: [
            { who: "Tony", text: "In a dark cave, Tony builds a light to survive, and stops making weapons.", jumpTo: "t-cave" },
            { who: "Ultron and Vision", text: "Made from fear, Ultron turns on everyone; Vision chooses to cherish life.", jumpTo: "u-forest" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What do all three stories say about makers?",
          tradition: "What is made carries something of why it was made.",
          marvel: [
            { who: "Tony", text: "His creations change when his reason changes." },
            { who: "Ultron and Vision", text: "Fear produced one; hope produced the other." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which maker would you trust most?",
          tradition: "Her creation is divine and whole, made in delight.",
          marvel: [
            { who: "Tony", text: "He creates from desperation first, and learns responsibility late." },
            { who: "Ultron and Vision", text: "Human creations are unpredictable, and can choose." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Making something is the beginning of a relationship with it, not the end of a job.",
          marvel: [
            { who: "Tony", text: "He finally stays with what his making does." },
            { who: "Ultron and Vision", text: "Ultron was abandoned to its fear; Vision was welcomed." },
          ],
          deep: "One reading: Kushmanda staying in the sun is a picture of what makers owe their creations: presence, not just a launch. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d4-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Making things",
      scenario: "You made a funny edited video of a classmate as a joke for your friends. It gets shared further than you meant, and the classmate is upset.",
      deep: "You didn't post it publicly. Someone else did. You meant it kindly, mostly.",
      prompt: "What would you do?",
      options: [
        {
          id: "delete",
          label: "Delete it, and apologise to them directly",
          perspectives: [
            { label: "What it protects", text: "Your classmate, and the trust between you." },
            { label: "What it risks", text: "It may already be everywhere. Apologising is uncomfortable." },
            { label: "Question", text: "Is an apology still owed if you didn't share it publicly?" },
          ],
        },
        {
          id: "joke",
          label: "Say it was only a joke",
          perspectives: [
            { label: "What it protects", text: "You avoid feeling blamed for something you didn't intend." },
            { label: "What it risks", text: "Your classmate hears that their hurt doesn't count." },
            { label: "Question", text: "Does what you meant matter more than what it did?" },
          ],
        },
        {
          id: "out",
          label: "Do nothing: it's out of your hands now",
          perspectives: [
            { label: "What it protects", text: "You avoid making it a bigger deal." },
            { label: "What it risks", text: "Like Tony leaving Ultron, you walk away from what you made." },
            { label: "Question", text: "Once something you made is out in the world, are you still connected to it?" },
          ],
        },
      ],
      closing: "Kushmanda stays with her creation. Tony learned too late what his made. Making something starts a relationship with it.",
      talk: ["What's something you made that you're proud of? Why?", "Have you ever made something that went wrong once others had it?", "What do makers owe the people who use what they make?"],
    },

    // ================================================================ H REFLECT
    {
      id: "d4-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "Does it matter why someone creates something, if the thing turns out well?",
      younger: "Tony built something in a cave to survive. Kushmanda created with a smile. What's different about making something because you have to, and because you want to?",
      older: "Ultron and Vision came from the same materials. Is a creator responsible for everything their creation does?",
      takeaway: "What you make carries something of why you made it.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "Kushmanda's creation story (the smile, the cosmic egg, her home in the sun) is devotional; no Purana passage was found for it. Her meditation verses describe eight arms, a lion and two pots.",
        "The ideas behind it are very old and well documented: the Nasadiya Sukta (Rig Veda 10.129), Hiranyagarbha, the golden embryo (Rig Veda 10.121), and creation as lila, play (Brahma Sutra 2.1.33).",
        "The Nasadiya lines in the app are our own plain-English rendering, not a quotation from a published translation.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [RV129, RV121, BS, KUSH, IRONMAN, ULTRON],
};
