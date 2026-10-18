// ---------------------------------------------------------------------------
// Day 1: Shailaputri
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 1).
//
// Edit freely. Each beat is one step of the story. Times are in seconds.
// Labels ("kind") tell the learner whether a passage is a traditional
// narrative, an interpretation, our comparison, a Marvel scene or a
// hypothetical. Keep those labels honest when you change the text.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const KUMARASAMBHAVA = {
  label: "Kalidasa, Kumarasambhava, Canto 1 (summary)",
  url: "https://en.wikipedia.org/wiki/Kum%C4%81rasambhava",
};
const SHIVA_PURANA = {
  label: "Shiva Purana, Rudra Samhita, Sati Khanda",
  note: "Also told, with variations, in the Devi Bhagavata and Bhagavata Puranas.",
};
const KAVACHAM = {
  label: "Devi Kavacham: the nine names in order (quoted on brhat.in)",
  url: "https://brhat.in/dhiti/chandraghanta",
};
const RAGNAROK = {
  label: "Thor: Ragnarok (2017)",
  url: "https://en.wikipedia.org/wiki/Thor:_Ragnarok",
  note: "Dialogue paraphrased.",
};
const BLACK_PANTHER = {
  label: "Black Panther (2018)",
  url: "https://en.wikipedia.org/wiki/Black_Panther_(film)",
  note: "Dialogue paraphrased.",
};

export const day1: DayContent = {
  day: 1,
  name: "Shailaputri",
  devanagari: "शैलपुत्री",
  meaning: "Daughter of the mountain",
  theme: "Rootedness",
  question: "When everything around you changes, what is still you?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "enter-night",
      type: "story",
      section: "enter",
      title: "Night one",
      kind: "tradition",
      visual: "mountainDawn",
      sound: { mood: "dawn", cues: [{ at: 2.4, hit: "bellSoft" }, { at: 6.2, hit: "shimmer" }] },
      duration: 11,
      sources: [KAVACHAM],
      captions: [
        { at: 0.6, text: "Night one of Navaratri." },
        {
          at: 2.6,
          text: "In many homes, each of the nine nights honours one form of the Devi, the goddess. Tonight's form is Shailaputri.",
          deep: "The nine names in this order come from the Devi Kavacham, a hymn recited alongside the Devi Mahatmya. Bengal, South India and Gujarat celebrate these nights in other ways, so this sequence is one tradition among several.",
        },
        {
          at: 6.4,
          text: "Her name means \"daughter of the mountain\". To see why that matters, we start with a story that ends before she is born.",
        },
      ],
    },
    {
      id: "enter-layers",
      type: "story",
      section: "enter",
      title: "Three layers",
      kind: "contemporary",
      visual: "threeLayers",
      sound: { mood: "layers", cues: [{ at: 3.2, hit: "bellSoft" }, { at: 6.0, hit: "bellSoft" }, { at: 8.8, hit: "bellSoft" }] },
      duration: 12,
      sources: [SHIVA_PURANA, KUMARASAMBHAVA],
      captions: [
        { at: 0.5, text: "Day 1 holds three layers that people often blend into one story." },
        { at: 3.2, text: "First, Sati: a daughter who stands up to her father. Her story is told in the Shiva Purana." },
        { at: 6.0, text: "Second, Parvati: Sati born again as the daughter of the mountain king, as Kalidasa's poem tells it." },
        {
          at: 8.8,
          text: "Third, Shailaputri: the form worshipped tonight. Select a layer to see where it comes from.",
          deep: "Popular retellings fold Sati's story into Shailaputri's as backstory. That is legitimate, but it helps to know which layer you are hearing at any moment.",
        },
      ],
      hotspots: [
        {
          id: "layer-sati",
          label: "Sati",
          x: 800,
          y: 250,
          from: 3.2,
          title: "Layer one: Sati's story",
          text: "Sati marries Shiva against her father Daksha's wishes. Daksha later insults Shiva in public, and Sati's response ends her life in that body.",
          deep: "Told in the Shiva Purana (Rudra Samhita, Sati Khanda), the Bhagavata Purana and the Devi Bhagavata Purana, with variations in detail.",
          kind: "tradition",
          source: "Shiva Purana; Bhagavata Purana; Devi Bhagavata Purana",
        },
        {
          id: "layer-parvati",
          label: "Parvati",
          x: 800,
          y: 450,
          from: 6.0,
          title: "Layer two: Parvati's birth",
          text: "Sati is born again to Himavat, lord of the mountains, and his queen Mena. This daughter is Parvati.",
          deep: "Kalidasa's Kumarasambhava opens with this birth and names the earlier life as Sati's. Parvati means \"of the mountain\".",
          kind: "tradition",
          source: "Kalidasa, Kumarasambhava, Canto 1",
        },
        {
          id: "layer-shailaputri",
          label: "Shailaputri",
          x: 800,
          y: 650,
          from: 8.8,
          title: "Layer three: Shailaputri",
          text: "Shailaputri is the mountain's daughter as she is worshipped on the first night. Her picture comes from devotional verses.",
          deep: "Linking her to the root chakra (muladhara) is a later yogic reading, not part of the story.",
          kind: "interpretation",
          source: "Devotional tradition",
        },
      ],
    },

    // ================================================================ B STORY
    {
      id: "story-marriage",
      type: "story",
      section: "story",
      title: "A daughter's choice",
      kind: "tradition",
      visual: "marriage",
      sound: { mood: "union", cues: [{ at: 3.6, hit: "shimmer" }, { at: 9.6, hit: "heartbeat" }, { at: 10.6, hit: "bellSoft" }] },
      duration: 13,
      sources: [SHIVA_PURANA],
      captions: [
        { at: 0.5, text: "Daksha is a powerful lord, proud of his family and his rituals. His daughter is Sati." },
        {
          at: 3.8,
          text: "From her youth, Sati is devoted to Shiva: an ascetic who lives on mountains, wears ash and keeps company with ghosts and wanderers.",
        },
        {
          at: 7.6,
          text: "Sati marries Shiva. Daksha never accepts it. To him, his daughter has chosen someone beneath the family.",
          deep: "In the Shiva Purana, Sati wins Shiva through her own devotion. Daksha's resentment grows after an incident in which Shiva does not rise to greet him at a gathering of the gods.",
        },
      ],
      slow: {
        from: 7.4,
        to: 10.4,
        rate: 0.35,
        prompt: "Two lights move together. A third holds back. Who decides who belongs in a family?",
      },
    },
    {
      id: "story-invite",
      type: "story",
      section: "story",
      title: "The sacrifice without Shiva",
      kind: "tradition",
      visual: "yajnaArrive",
      sound: { mood: "gathering", cues: [{ at: 8.4, hit: "bellSoft" }, { at: 12.6, mood: "tension" }] },
      duration: 16,
      sources: [SHIVA_PURANA],
      captions: [
        {
          at: 0.5,
          text: "Daksha holds a great yajna, a fire sacrifice. Every god is invited and given a seat. One seat is left out: Shiva's.",
        },
        {
          at: 4.4,
          text: "Sati hears of it. She wants to go. It is her father's house.",
        },
        {
          at: 8.6,
          text: "Shiva warns her: going uninvited will bring her only insult.",
          deep: "Her wish to go is partly love for her family and partly a refusal to accept that her husband can be shut out. Both loyalties are real.",
        },
        { at: 12.6, text: "She goes anyway. Select the glowing points to look closer." },
      ],
      freezes: [
        {
          at: 10.4,
          title: "Before she leaves",
          text: "Shiva has warned her. Her family is gathered, and her husband has been deliberately left out.",
          think: "If you were Sati, would you go?",
          options: [
            {
              label: "Go: it's my family, and I should be there",
              response: "Many people would. Family gatherings matter, and staying away can feel like accepting the insult.",
            },
            {
              label: "Stay: if my husband isn't welcome, neither am I",
              response: "That keeps her loyalty to Shiva clear and avoids being humiliated. The cost is missing her family entirely.",
            },
          ],
          continueLabel: "See what Sati does",
        },
      ],
      hotspots: [
        {
          id: "altar",
          label: "The fire altar",
          x: 800,
          y: 700,
          title: "The yajna",
          text: "A yajna is a ritual offering into a sacred fire. Hosting a great one shows a ruler's standing. Who gets a share of the offering, and a seat, says who is honoured.",
          kind: "tradition",
          source: "Shiva Purana",
        },
        {
          id: "seat",
          label: "The missing seat",
          x: 1230,
          y: 470,
          title: "Shiva's missing place",
          text: "Leaving Shiva out is not an oversight. It tells every guest that Daksha considers his daughter's husband unworthy.",
          kind: "tradition",
          source: "Shiva Purana",
        },
        {
          id: "daksha",
          label: "Daksha",
          x: 520,
          y: 400,
          title: "Daksha",
          text: "Sati's father, a lord of creation in the Puranas. He sees Shiva's ash-smeared, ascetic life as an insult to his family.",
          kind: "tradition",
          source: "Shiva Purana",
        },
        {
          id: "sati",
          label: "Sati",
          x: 170,
          y: 640,
          from: 12.6,
          title: "Sati",
          text: "Daksha's daughter and Shiva's wife. In these pictures she is drawn as light, because the story is about what she carries, not how she looks.",
          kind: "comparison",
        },
      ],
    },
    {
      id: "story-confront",
      type: "story",
      section: "story",
      title: "In front of everyone",
      kind: "tradition",
      visual: "yajnaConfront",
      sound: { mood: "tension", cues: [{ at: 3.0, hit: "boom" }] },
      duration: 14,
      sources: [SHIVA_PURANA],
      captions: [
        { at: 0.5, text: "Sati arrives. Her father barely greets her." },
        {
          at: 3.0,
          text: "Before the gathered gods, Daksha mocks Shiva. Everyone hears it. No one speaks up.",
        },
        {
          at: 6.2,
          text: "Sati walks to the centre of the gathering.",
        },
      ],
      slow: {
        from: 6.0,
        to: 10.4,
        rate: 0.3,
        prompt: "Everyone is watching. Her father has just humiliated the person she chose.",
      },
      freezes: [
        {
          at: 10.6,
          title: "The turning point",
          text: "Sati stands between two loyalties: the father who raised her, and the husband he has insulted in public.",
          deep: "In the Shiva Purana she first speaks, rebuking her father before the assembly. What she does next is the act the whole story turns on.",
        },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "choice-sati",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "tradition",
      visual: "yajnaConfront",
      visualTime: 10.6,
      sources: [SHIVA_PURANA],
      framing: "weigh",
      prompt: "What matters most to Sati in this moment?",
      deepPrompt: "What does Sati owe her father, and what does she owe Shiva?",
      options: [
        {
          id: "peace",
          label: "Keeping peace with her father",
          reasoning:
            "He is her father, and the family is gathered. Keeping peace protects everyone from a bigger rupture. The cost is that the insult stands, unanswered, in front of everyone.",
        },
        {
          id: "shiva",
          label: "Standing up for Shiva",
          reasoning:
            "She chose him, and he has been humiliated in public. Defending him is loyalty. The difficulty is that Daksha holds the power here.",
        },
        {
          id: "dignity",
          label: "Her own dignity",
          reasoning:
            "Her father's contempt for her husband is also contempt for her choice. Refusing to accept it protects who she is, whatever it costs her with her family.",
        },
      ],
      reveal: {
        title: "What the Shiva Purana says",
        text: "Sati speaks out against her father before the whole assembly. Then she sits in stillness, and through her own yogic power she leaves the body her father gave her.",
        deep: "Tellings differ. In some she enters the sacrificial fire. In the Bhagavata Purana a fire rises from within her as she meditates. Kalidasa says she gave up her body through yoga.",
        why: "The story treats her loyalty to Shiva, and to what is right, as stronger than her tie to her father. It also treats her death as a catastrophe, as the next step shows, and it does not end there.",
      },
      hypothetical: {
        title: "Imagine: if she had gone home quietly",
        text: "The insult would have stood, and Daksha's contempt would have gone unanswered. There would also be no rebirth to tell, and no mountain's daughter. This branch is ours, to help you think. It is not in any source.",
      },
      parentNote:
        "Say this part once, calmly, and move on. Make it clear this is a sacred story about the Devi, not a way to answer hurt. In real life, when someone humiliates us, the brave thing is to tell someone and get help.",
    },

    // ================================================================ B STORY (continued)
    {
      id: "story-departure",
      type: "story",
      section: "story",
      title: "The light leaves",
      kind: "tradition",
      visual: "departure",
      sound: { mood: "departure", cues: [{ at: 3.6, hit: "shimmer" }, { at: 7.4, hit: "bellSoft" }] },
      duration: 11,
      sources: [SHIVA_PURANA],
      captions: [
        { at: 0.5, text: "Sati sits in stillness at the centre of her father's gathering." },
        { at: 3.6, text: "A light rises from within her. She leaves the body her father gave her." },
        {
          at: 7.4,
          text: "The gathering falls silent. Nobody expected this.",
        },
      ],
      parentNote:
        "If a child asks why she did it, you can say: the story shows her refusing to stay tied to someone who treated what she loved with contempt. It is a sacred story about the Devi, and it is told as a tragedy.",
    },
    {
      id: "story-grief",
      type: "story",
      section: "story",
      title: "Shiva's grief",
      kind: "tradition",
      visual: "grief",
      sound: { mood: "storm", cues: [{ at: 0.4, hit: "thunder" }, { at: 3.4, hit: "boom" }, { at: 8.0, mood: "grief" }] },
      duration: 15,
      sources: [SHIVA_PURANA],
      captions: [
        { at: 0.5, text: "When Shiva hears, his grief is enormous." },
        {
          at: 3.4,
          text: "His anger sweeps through Daksha's sacrifice and ends it.",
          deep: "In the Shiva Purana, Shiva creates the fierce Virabhadra from his anger, and Virabhadra destroys the sacrifice. Daksha is later restored to life and asks Shiva's forgiveness.",
        },
        {
          at: 8.4,
          text: "Then Shiva withdraws to the snowy Himalaya, alone, into deep meditation. For a long time, the world goes without him.",
        },
      ],
      slow: {
        from: 8.0,
        to: 12.0,
        rate: 0.4,
        prompt: "The story doesn't celebrate what happened. It grieves it.",
      },
    },
    {
      id: "story-rebirth",
      type: "story",
      section: "story",
      title: "Born of the mountain",
      kind: "tradition",
      visual: "rebirth",
      sound: { mood: "rebirth", cues: [{ at: 8.8, hit: "bell" }, { at: 9.6, hit: "shimmer" }] },
      duration: 15,
      sources: [KUMARASAMBHAVA],
      captions: [
        { at: 0.5, text: "Far to the north rise the Himalaya. Their lord, Himavat, and his queen, Mena, long for a child." },
        {
          at: 4.2,
          text: "A daughter is born to them. Kalidasa's poem says plainly who she is: Sati, born again.",
        },
        {
          at: 9.6,
          text: "They call her Parvati, \"of the mountain\". On the first night of Navaratri she is honoured as Shailaputri, the mountain's daughter.",
        },
      ],
      slow: {
        from: 4.0,
        to: 8.8,
        rate: 0.35,
        prompt: "Look at the light. What has come back, and what is new?",
      },
    },
    {
      id: "story-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "emblems",
      sound: { mood: "devotion", cues: [{ at: 0.6, hit: "bellSoft" }] },
      duration: 10,
      sources: [{ label: "Devotional verses and iconography" }],
      captions: [
        {
          at: 0.5,
          text: "When devotees picture Shailaputri, they see a calm figure riding a bull, holding a trident and a lotus, with a crescent moon on her head.",
        },
        {
          at: 5.0,
          text: "Each detail can be read more than one way. Select one to look closer, and notice which readings are old and which are modern.",
        },
      ],
      hotspots: [
        {
          id: "mountain",
          label: "The mountain",
          x: 800,
          y: 330,
          title: "The mountain",
          text: "The texts name the Himalaya as her father. Many devotees read the mountain as steadiness: something that does not move when everything around it does.",
          deep: "The family link is in the narrative. The \"steadiness\" meaning is a devotional interpretation built on it.",
          kind: "interpretation",
        },
        {
          id: "bull",
          label: "The bull",
          x: 380,
          y: 640,
          title: "The bull",
          text: "She rides a bull, usually identified as Nandi, Shiva's companion and mount. From the very first night, Shiva's world is beside her.",
          kind: "interpretation",
        },
        {
          id: "trident",
          label: "The trident",
          x: 1140,
          y: 520,
          title: "The trident (trishula)",
          text: "The trident is Shiva's weapon too. People read its three points in different ways, for example as past, present and future. Those readings vary and are not fixed by the story.",
          kind: "interpretation",
        },
        {
          id: "lotus",
          label: "The lotus",
          x: 1310,
          y: 700,
          title: "The lotus",
          text: "A lotus grows out of mud and opens clean. It is one of the most common symbols in Hindu imagery, often read as purity or awakening.",
          kind: "interpretation",
        },
        {
          id: "moon",
          label: "The crescent moon",
          x: 800,
          y: 120,
          title: "The crescent moon",
          text: "Her meditation verse places a half-moon on her head, as Shiva wears one.",
          deep: "The verse usually recited is: vande vāñchhita lābhāya chandrārdhakṛta śekharām, vṛṣārūḍhāṁ śūladharāṁ śailaputrīṁ yaśasvinīm. It describes her crowned with a half-moon, mounted on a bull and holding a trident.",
          kind: "interpretation",
          source: "Devotional verse",
        },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "What you are rooted in can survive what you lose.",
      deeper:
        "The first form of the Devi is named for a relationship, not for something she did: she is the daughter of the mountain. The festival starts with where you stand before it asks what you'll do. Sati loses her body, her family and her home. What survives is her devotion, which returns whole in Parvati, rooted in a new place. Devotees often link Shailaputri with the mountain's steadiness. Our reading is that your roots are less about where you live or who you came from, and more about what you're devoted to. That's what carries you through change.",
      connections: [
        {
          event: "Sati refuses her father's contempt for Shiva.",
          meaning: "Her commitment matters more to her than her family's approval.",
          jumpTo: "story-confront",
        },
        {
          event: "The same light returns as the mountain's daughter.",
          meaning: "Her devotion carries into a new life, rooted in a new place.",
          jumpTo: "story-rebirth",
        },
        {
          event: "Night one honours a daughter, not a warrior.",
          meaning: "The journey begins with belonging and ground to stand on.",
          jumpTo: "story-emblems",
        },
      ],
      readings: [
        {
          kind: "tradition",
          label: "What the sources narrate",
          text: "Sati gives up her body in protest at her father's insult and is born again as Parvati, daughter of Himavat.",
        },
        {
          kind: "interpretation",
          label: "A traditional reading",
          text: "Devotees honour Shailaputri as the first form and the beginning of the nine nights, often associating her with steadiness, like the mountain.",
        },
        {
          kind: "contemporary",
          label: "Our reading",
          text: "Identity is carried by what we are devoted to, more than by where we live or who we came from. This is our interpretation, offered to argue with.",
        },
      ],
      invite: "Do you read it differently? Keep your version in mind; you will test it against two Marvel scenes next.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "m1-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Thor chooses to lose Asgard",
      kind: "marvel",
      role: "primary",
      roleNote: "A hero loses everything he thought made him who he was, and finds out what was left.",
      film: "Thor: Ragnarok",
      year: 2017,

      rating: "PG-13",
      character: "Thor",
      scene: "The final battle for Asgard, and the decision to unleash Surtur.",
      context:
        "Thor's father Odin has died. Hela, the older sister Thor never knew, has destroyed his hammer Mjolnir with one hand and seized Asgard. Thor has fought his way back from captivity on a faraway planet to save his people.",
      find: {
        where: "Near the end of the film, in the final battle for Asgard, as its people escape across the Bifrost bridge.",
        search: "Thor Ragnarok Surtur destroys Asgard",
      },
      watchFor: [
        "Where Thor is looking when Asgard burns.",
        "Who is on the ship, and who isn't.",
        "Whether Thor looks like someone who lost, or someone who won.",
      ],
      sources: [RAGNAROK],
    },
    {
      id: "m1-context",
      type: "story",
      section: "marvel",
      title: "What Odin said",
      kind: "marvel",
      visual: "bridgeContext",
      sound: { mood: "filmQuiet", cues: [{ at: 7.8, hit: "boom" }] },
      duration: 11,
      sources: [RAGNAROK],
      captions: [
        { at: 0.5, text: "Before he died, Odin told his sons something Thor did not yet understand: Asgard is its people, not a place." },
        { at: 4.6, text: "Now Hela stands in the city. The people of Asgard flee across the rainbow bridge." },
        { at: 8.0, text: "Thor has no hammer. He has always believed his power lived in it." },
      ],
    },
    {
      id: "m1-bridge",
      type: "story",
      section: "marvel",
      title: "Without the hammer",
      kind: "marvel",
      visual: "bridgeFight",
      sound: { mood: "filmStruggle", cues: [{ at: 2.6, hit: "boom" }, { at: 3.8, hit: "shimmer" }, { at: 7.8, hit: "thunder" }, { at: 7.8, mood: "filmEpic" }, { at: 11.8, mood: "filmTension" }] },
      duration: 16,
      sources: [RAGNAROK],
      captions: [
        { at: 0.5, text: "Thor faces Hela in the palace. He is losing. She takes one of his eyes." },
        {
          at: 3.8,
          text: "Half-conscious, he sees his father. Odin asks whether he is the god of hammers. The hammer, he says, only helped Thor focus power that was always his.",
        },
        { at: 8.0, text: "Thor rises and calls the lightning without Mjolnir." },
        {
          at: 12.0,
          text: "It still isn't enough. Hela draws strength from Asgard itself. The longer she stands there, the stronger she gets.",
        },
      ],
      slow: {
        from: 7.6,
        to: 11.2,
        rate: 0.3,
        prompt: "The power was never in the hammer. So where was it?",
      },
      freezes: [
        {
          at: 14.4,
          title: "The turning point",
          text: "Thor cannot win this fight. His people are on a ship behind him. His home is under his sister's feet, making her stronger.",
          deep: "Everything Thor was raised to defend is the city. Everything Odin told him points to the people. He has seconds to decide which is Asgard.",
        },
      ],
    },
    {
      id: "m1-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "bridgeFight",
      visualTime: 14.4,
      sources: [RAGNAROK],
      framing: "will",
      prompt: "What do you think Thor will do?",
      deepPrompt: "Which does Thor owe more to: the place he was born to rule, or the people who live there?",
      options: [
        {
          id: "fight",
          label: "Keep fighting to win back the city",
          reasoning:
            "You expect a hero to defend his home to the end. That is what Thor was raised to do, and giving up the city would feel like giving up himself.",
        },
        {
          id: "flee",
          label: "Escape with the people and leave Asgard to Hela",
          reasoning:
            "You would put lives first and accept the loss. The risk is that Hela, still powerful, could follow them anywhere.",
        },
        {
          id: "destroy",
          label: "Destroy Asgard himself so Hela loses her power",
          reasoning:
            "You see that the city is Hela's strength, so taking it away ends the fight. It would mean Thor deliberately destroying his own home.",
        },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Thor sends Loki to wake Surtur, the fire giant whose coming was prophesied to end Asgard. Surtur destroys the city, and Hela with it. Thor watches his home burn from the ship carrying his people.",
        why: "He chooses his people over his home. What Odin told him turns out to be true: Asgard survives on that ship.",
      },
    },
    {
      id: "m1-burn",
      type: "story",
      section: "marvel",
      title: "Asgard is a people",
      kind: "marvel",
      visual: "bridgeBurn",
      sound: { mood: "filmTension", cues: [{ at: 0.3, hit: "boom" }, { at: 1.6, hit: "thunder" }, { at: 5.6, mood: "filmLament" }] },
      duration: 14,
      sources: [RAGNAROK],
      captions: [
        { at: 0.5, text: "Surtur rises. The city burns. The ship carries everyone who is left." },
        {
          at: 6.0,
          text: "Thor has lost his father, his hammer, an eye and his home in one story. What remains is the thing Odin said Asgard always was.",
        },
      ],
      slow: {
        from: 5.6,
        to: 9.6,
        rate: 0.35,
        prompt: "Look at the ship, not the fire.",
      },
    },
    {
      id: "m1-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Thor",
      kind: "comparison",
      turningPoint: "The moment Thor stops fighting for the place and chooses the people.",
      connection:
        "Sati loses her family and her body; Thor loses his father and his homeland. In both stories, something essential survives the loss of what seemed essential. The scene makes the idea of \"what carries over\" something you can see.",
      ladder: [
        {
          level: "notice",
          text: "Count what Thor loses in this one film. What's on the list?",
          followUps: [
            { ifTheySay: "His hammer and his home", ask: "Anything else? Think about his family, and his body." },
            { ifTheySay: "Everything", ask: "Everything? What does he still have on the ship?" },
          ],
        },
        {
          level: "feel",
          text: "When Thor watches Asgard burn, what do you think he's feeling?",
          deep: "Can someone feel grief and certainty at the same moment? Have you ever felt both at once?",
          followUps: [
            { ifTheySay: "Sad", ask: "Only sad? What else could be mixed in with it?" },
            { ifTheySay: "Relieved", ask: "Relieved about what, exactly? What does that tell you about what he cared about most?" },
          ],
        },
        {
          level: "wonder",
          text: "Odin said Asgard is its people, not a place. Why do you think Thor didn't understand that until now?",
          followUps: [
            { ifTheySay: "He wasn't listening", ask: "Do we sometimes need to lose something before advice makes sense? Why?" },
            { ifTheySay: "He loved the city", ask: "Is loving a place wrong? When does it get in the way?" },
          ],
        },
        {
          level: "stretch",
          text: "Thor made this choice for everyone. Should a leader be able to destroy a home on behalf of the people who live there?",
          deep: "Thor decided alone, in seconds, for a whole people. Does an emergency change who gets a say? What would make the decision fair?",
          followUps: [
            { ifTheySay: "There wasn't time to ask", ask: "Does that make it right, or only necessary? Are those the same?" },
            { ifTheySay: "No, it wasn't his to decide", ask: "Then what should he have done in those few seconds?" },
          ],
        },
        {
          level: "flip",
          text: "Imagine Thor had won the fight and saved the city. Would he have learned the same thing?",
          followUps: [{ ifTheySay: "No", ask: "So was losing necessary? Is that ever true in real life?" }],
        },
        {
          level: "connect",
          text: "Sati lost her body; Thor lost his home. What carried over in each story?",
          deep: "Sati's devotion returns in a new birth; Thor's people go on without their city. Which kind of carrying-over seems stronger to you, and why?",
        },
      ],
      stance: {
        statement: "Thor was right to destroy Asgard.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Before talking, each person says one reason they're where they are. Then: what would it take to move you one step along the line?",
      },
      activity: {
        title: "Pack the ship",
        minutes: 5,
        steps: [
          "Imagine you have to leave home tonight, and you can carry three things.",
          "Each person names their three things, without explaining yet.",
          "Now each person names one thing you can't pack that would still come with you.",
          "Compare the two lists. Which list says more about who you are?",
        ],
      },
      sources: [RAGNAROK],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "m2-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "T'Challa tells his father he was wrong",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A son who loves his father has to decide whether that love means keeping his father's secret.",
      film: "Black Panther",
      year: 2018,

      rating: "PG-13",
      character: "T'Challa",
      scene: "T'Challa's second visit to the ancestral plane.",
      context:
        "T'Challa has learned that his revered father, King T'Chaka, killed his own brother and left that brother's young son, Erik, behind in America. Erik has returned as Killmonger, defeated T'Challa in ritual combat and thrown him from a waterfall.",
      find: {
        where: "Late in the film, after T'Challa loses the challenge to Killmonger and is revived: his second visit to the ancestral plane.",
        search: "Black Panther T'Challa ancestral plane father",
      },
      watchFor: [
        "How T'Challa speaks to his father: angry, sad, or both.",
        "What T'Chaka does, and doesn't, say back.",
        "The moment T'Challa decides to leave.",
      ],
      sources: [BLACK_PANTHER],
    },
    {
      id: "m2-plane",
      type: "story",
      section: "marvel",
      title: "The ancestral plane",
      kind: "marvel",
      visual: "ancestralPlane",
      sound: { mood: "filmAncestral", cues: [{ at: 4.2, hit: "shimmer" }] },
      duration: 13,
      sources: [BLACK_PANTHER],
      captions: [
        { at: 0.5, text: "Near death, T'Challa is revived with the heart-shaped herb. His spirit enters the plane of the ancestors." },
        { at: 4.4, text: "His father is there, with the kings who came before. T'Challa could stay with them, at rest." },
        { at: 7.4, text: "His father walks toward him." },
      ],
      slow: {
        from: 7.2,
        to: 10.6,
        rate: 0.3,
        prompt: "He loves his father. His father did something terribly wrong.",
      },
      freezes: [
        {
          at: 11.0,
          title: "The turning point",
          text: "T'Challa faces the father he has always admired, knowing that father abandoned a child to protect a secret.",
          deep: "Staying would mean peace and honour among the kings. Leaving would mean judging his own father in front of them all.",
        },
      ],
    },
    {
      id: "m2-choice",
      type: "choice",
      section: "marvel",
      title: "Your turn",
      kind: "marvel",
      visual: "ancestralPlane",
      visualTime: 11.0,
      sources: [BLACK_PANTHER],
      framing: "should",
      prompt: "What should T'Challa do?",
      deepPrompt: "Can you honour a parent and still name their wrong?",
      options: [
        {
          id: "stay",
          label: "Stay with the ancestors and rest",
          reasoning:
            "He has fought and lost, and peace is offered. That is understandable. It would leave Wakanda in Killmonger's hands.",
        },
        {
          id: "silent",
          label: "Return, but keep his father's secret",
          reasoning:
            "You would protect his father's memory and the throne's honour. The danger is that the wrong that created Killmonger stays hidden.",
        },
        {
          id: "speak",
          label: "Tell his father he was wrong, then return",
          reasoning:
            "You would name the wrong out loud. It means judging someone he loves, in front of every king before him.",
        },
      ],
      reveal: {
        title: "What happens in the film",
        text: "T'Challa tells his father he was wrong to abandon a child to protect a secret. He refuses to join the ancestors and returns to repair what his father broke.",
        why: "A loving son tells a loving father he was wrong, without ceasing to love him.",
      },
    },
    {
      id: "m2-return",
      type: "story",
      section: "marvel",
      title: "Back to the living",
      kind: "marvel",
      visual: "ancestralReturn",
      sound: { mood: "filmAncestral", cues: [{ at: 3.2, mood: "filmSnow" }, { at: 5.4, hit: "heartbeat" }, { at: 8.6, hit: "shimmer" }] },
      duration: 11,
      sources: [BLACK_PANTHER],
      captions: [
        { at: 0.5, text: "T'Challa turns away from the ancestors." },
        { at: 4.0, text: "He wakes in the snow, alive, and goes back to face Killmonger and to repair what his father broke." },
      ],
    },
    {
      id: "m2-think",
      type: "think",
      section: "marvel",
      title: "Think it through: T'Challa",
      kind: "comparison",
      turningPoint: "A son who loves his father refuses to let that love hide a wrong.",
      connection:
        "This scene lights up Sati's conflict with her father rather than Shailaputri herself. Sati chooses dignity and loyalty to Shiva over a father who acts with contempt. T'Challa chooses justice over his father's reputation, and comes back to repair the harm.",
      ladder: [
        {
          level: "notice",
          text: "What did T'Challa say to his father, in front of all the kings?",
          followUps: [{ ifTheySay: "He was angry", ask: "Angry, or heartbroken? Can it be both at once?" }],
        },
        {
          level: "feel",
          text: "How hard would it be to tell someone you admire that they were wrong?",
          deep: "What makes it harder when the person is someone you love, rather than someone you don't?",
          followUps: [
            { ifTheySay: "Really hard", ask: "What makes it hard: fear of their reaction, or something else?" },
            { ifTheySay: "Not that hard", ask: "Would it be just as easy if they had done something good for you every day of your life?" },
          ],
        },
        {
          level: "wonder",
          text: "T'Chaka is a good man in most of the film. Why do you think he left Erik behind?",
          followUps: [{ ifTheySay: "To protect Wakanda", ask: "Did it protect Wakanda in the end? Who paid the price?" }],
        },
        {
          level: "stretch",
          text: "Can a good person do a wrong thing for a good reason? Does the reason make it less wrong?",
          deep: "T'Chaka protected a secret to keep his country safe, and a child grew up abandoned. Who should judge him: his son, his people, or the child he left?",
          followUps: [
            { ifTheySay: "The reason makes it OK", ask: "Would Erik agree? Does the person harmed get a say?" },
            { ifTheySay: "Wrong is wrong", ask: "Have you ever done something unfair for a reason you thought was good?" },
          ],
        },
        {
          level: "flip",
          text: "What if T'Challa had gone back but kept the secret? What would have happened to the truth about Erik?",
        },
        {
          level: "connect",
          text: "Sati and T'Challa both stood up to a father. Why does one story end in death and rebirth, and the other in repair?",
          deep: "Daksha is openly hostile; T'Chaka is a good man who made a terrible choice. Which is the harder parent to stand up to, and why?",
        },
      ],
      stance: {
        statement: "T'Challa should have kept his father's secret to protect Wakanda's honour.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Find the person furthest from you on the line. Ask them one question about their reason before you give yours.",
      },
      activity: {
        title: "Disagree well",
        minutes: 5,
        steps: [
          "Pick something small you genuinely disagree about at the table: a film, a food, a game.",
          "Take turns saying it in one sentence that starts with something you respect about the other person's view.",
          "Then say clearly where you disagree, and why.",
          "Talk about it: did starting with respect change how the disagreement felt?",
        ],
      },
      sources: [BLACK_PANTHER],
    },

    // ================================================================ F COMPARE
    {
      id: "compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "Before you look: can you tell each story in one sentence?",
          tradition: "Sati gives up her body rather than accept her father's contempt for Shiva. She is born again as Parvati, the mountain's daughter.",
          traditionJump: "story-confront",
          marvel: [
            { who: "Thor", text: "Thor destroys his own home to save its people.", jumpTo: "m1-bridge" },
            { who: "T'Challa", text: "T'Challa tells his father he was wrong and returns to repair the harm.", jumpTo: "m2-plane" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What is the one thing all three characters refuse to let go of?",
          tradition: "Something essential survives the loss of family, home and even body.",
          marvel: [
            { who: "Thor", text: "Asgard survives the loss of Asgard, because it was always its people." },
            { who: "T'Challa", text: "His love for his father survives telling him the truth." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which of the three would you most want to talk to, and what would you ask?",
          tradition: "Sati's story is sacred. Her loss leads to rebirth, which the films do not share as an idea.",
          marvel: [
            { who: "Thor", text: "A strategic choice in a war, chosen to win." },
            { who: "T'Challa", text: "A repair within one life, not a protest that ends it." },
          ],
          deep: "The two Marvel scenes also disagree with each other. Thor lets go of what he inherited; T'Challa holds on to his inheritance and repairs it.",
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Make a guess before you reveal this one.",
          tradition:
            "On their own, Sati's story can look like a story about anger and Thor's like a story about a battle. Together, all three ask the same thing: what are you rooted in?",
          marvel: [
            { who: "Thor", text: "His roots turned out to be people, not stone." },
            { who: "T'Challa", text: "His roots needed honesty, not silence, to stay healthy." },
          ],
          deep: "One reading: roots are not only something you inherit. They are partly something you choose, by deciding what you will stay devoted to when everything else changes. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Family",
      scenario:
        "Your grandparents' house, where the whole family gathers every Navaratri, is being sold. Your grandparents are moving into a smaller flat. Everyone says it is the sensible thing to do. You feel like something is ending.",
      deep: "Your cousin says the festival will never feel the same, so there's no point trying to keep it going. Part of you agrees.",
      prompt: "What would you do?",
      options: [
        {
          id: "keep",
          label: "Ask the family not to sell the house",
          perspectives: [
            { label: "What it protects", text: "The place holds real memories, and saying so out loud matters." },
            { label: "What it risks", text: "Your grandparents may need the move for reasons you can't see, like health or stairs." },
            { label: "Question", text: "Is it the house you'd be fighting for, or what happened inside it?" },
          ],
        },
        {
          id: "move-on",
          label: "Accept it and let it go",
          perspectives: [
            { label: "What it protects", text: "You support your grandparents without adding pressure." },
            { label: "What it risks", text: "The gathering itself might quietly fade if no one decides to carry it." },
            { label: "Question", text: "Is letting go of a place the same as letting go of what it meant?" },
          ],
        },
        {
          id: "carry",
          label: "Choose one thing to carry into the new place",
          perspectives: [
            { label: "What it protects", text: "A ritual, a recipe or a role you take on keeps the gathering alive somewhere new." },
            { label: "What it risks", text: "It won't feel the same, at least at first, and that can hurt." },
            { label: "Question", text: "Who decides what is worth carrying?" },
          ],
        },
      ],
      closing: "Thor lost a city and kept a people. Sati lost a life and kept a devotion. There's no single right answer here, only a question about what you'd want to carry.",
      talk: [
        "What is one thing our family does that you'd want to carry anywhere?",
        "Is there something we do that you'd happily let go of? Why?",
        "Who in the family carries the traditions now? Who will carry them next?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "When everything around a person changes, what is left that is still them?",
      younger: "What did Thor lose, and what did he still have at the end? What would you want to still have?",
      older: "Sati's protest and T'Challa's protest end very differently. Which response to a parent's wrong is more powerful, and why?",
      takeaway: "What you are rooted in can survive what you lose.",
    },
  ],

  context: [
    {
      title: "Three layers, kept apart",
      paragraphs: [
        "Sati's story (Shiva Purana, Bhagavata Purana, Devi Bhagavata Purana): she marries Shiva, her father insults him, and she gives up her body in protest.",
        "Parvati's birth (Kalidasa, Kumarasambhava, Canto 1): Sati is born again to Himavat and Mena.",
        "Shailaputri (devotional tradition): the mountain's daughter as worshipped on the first night. Her iconography comes from devotional verses.",
      ],
    },
    {
      title: "Telling Sati's story gently",
      paragraphs: [
        "Say the moment once, calmly, using the gentler version: through her yogic power she leaves the body her father gave her. The story treats it as a catastrophe, not an example, and she returns as Parvati.",
        "It is worth saying out loud: in real life, hurting yourself is never a way to protest or answer humiliation. The brave thing is to tell someone and get help.",
        "With an older child, separate the myth from the later practice called sati, the burning of widows. In the myth Sati was not a widow. The practice was banned in 1829 under the Bengal Sati Regulation after campaigns by reformers such as Ram Mohan Roy.",
      ],
    },
    {
      title: "This is one tradition among several",
      paragraphs: [
        "Assigning one form of Durga to each night, in this order, is strongest in North and West India. Bengal focuses on Durga Puja in the final days; many South Indian homes divide the nights between Durga, Lakshmi and Saraswati; Gujarat centres the festival on garba.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: [
        "Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle, and we don't claim the filmmakers had these stories in mind.",
      ],
    },
  ],

  sources: [SHIVA_PURANA, KUMARASAMBHAVA, KAVACHAM, RAGNAROK, BLACK_PANTHER],
};
