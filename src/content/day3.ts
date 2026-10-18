// ---------------------------------------------------------------------------
// Day 3: Chandraghanta
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 3).
//
// Source note: no classical text ties the Chandraghanta form to Parvati's
// wedding. The Shiva Purana tells of Shiva's frightening procession and Mena
// fainting; the link to Chandraghanta is a popular modern retelling, and it is
// labelled that way below. The bell is documented in the Devi Mahatmya.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const DM_BELL = {
  label: "Devi Mahatmya ch. 2 and 9: the bell in battle",
  url: "https://dx.doi.org/10.3390/rel10050322",
  note: "Discussed in a Religions journal article on sound in the Devi Mahatmya.",
};
const DM_HYMN = {
  label: "Devi Mahatmya ch. 4, the gods' hymn (Shakradi Stuti)",
  url: "https://hindupedia.com/en/Sakradhi_Sthuthi",
};
const SHIVA_PURANA = {
  label: "Shiva Purana, Rudra Samhita, Parvati Khanda (the wedding procession)",
};
const ICON = { label: "Chandraghanta's iconography (brhat.in)", url: "https://brhat.in/dhiti/chandraghanta" };
const BP = {
  label: "Black Panther (2018)",
  url: "https://en.wikipedia.org/wiki/Black_Panther_(film)",
  note: "Dialogue as widely quoted; other lines paraphrased.",
};
const AVENGERS = { label: "The Avengers (2012)", url: "https://en.wikipedia.org/wiki/The_Avengers_(2012_film)", note: "Dialogue paraphrased." };
const ENDGAME = { label: "Avengers: Endgame (2019)", url: "https://en.wikipedia.org/wiki/Avengers:_Endgame", note: "Dialogue paraphrased." };

export const day3: DayContent = {
  day: 3,
  name: "Chandraghanta",
  devanagari: "चन्द्रघण्टा",
  meaning: "She who wears the bell-shaped moon",
  theme: "Readiness",
  question: "Can the same strength feel like safety to one person and a threat to another?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d3-enter",
      type: "story",
      section: "enter",
      title: "Night three",
      kind: "interpretation",
      visual: "d3Opening",
      sound: { mood: "bells", cues: [{ at: 1.0, hit: "bell" }, { at: 6.0, hit: "shimmer" }] },
      duration: 12,
      sources: [ICON],
      captions: [
        { at: 0.6, text: "Night three. Tonight's form is Chandraghanta: the Devi who wears a half-moon shaped like a bell." },
        {
          at: 4.2,
          text: "She is pictured calm and radiant, riding a tiger or lion, with ten arms holding weapons. Gentle toward those who come to her; fearsome toward harm.",
          deep: "Her name joins chandra (moon) and ghanta (bell). Devotees say the sound of her bell drives away fear.",
        },
        {
          at: 8.4,
          text: "Tonight is about that bell: a strength that can protect before anything is struck.",
        },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d3-procession",
      type: "story",
      section: "story",
      title: "The wedding procession",
      kind: "tradition",
      visual: "d3Procession",
      sound: { mood: "procession", cues: [{ at: 4.0, hit: "boom" }, { at: 8.2, hit: "heartbeat" }] },
      duration: 13,
      sources: [SHIVA_PURANA],
      captions: [
        {
          at: 0.5,
          text: "After Parvati's tapas, Shiva comes to marry her. Her family has prepared the palace for a royal groom.",
        },
        {
          at: 4.0,
          text: "Instead, Shiva arrives as himself: covered in ash, snakes around his neck, riding his bull, followed by ghosts, goblins and wild companions.",
        },
        {
          at: 8.0,
          text: "Parvati's mother, Mena, takes one look and faints. The guests are terrified.",
          deep: "The Shiva Purana describes this scene at length, with Mena refusing the marriage when she wakes.",
        },
      ],
      slow: { from: 7.6, to: 10.2, rate: 0.35, prompt: "Her family sees a monster. Parvati sees the one she chose." },
      freezes: [
        {
          at: 10.6,
          title: "Caught between",
          text: "Her mother has collapsed. The guests want to run. And the groom is exactly who Parvati spent years of tapas choosing.",
        },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d3-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d3Procession",
      visualTime: 10.6,
      sources: [SHIVA_PURANA, ICON],
      framing: "weigh",
      prompt: "What matters most to Parvati in this moment?",
      deepPrompt: "How do you protect two people you love from each other's fear?",
      options: [
        {
          id: "family",
          label: "Calming her terrified family",
          reasoning: "Her mother has fainted and the guests are frightened. Looking after them first is kind. It might mean seeming to agree that Shiva is someone to fear.",
        },
        {
          id: "shiva",
          label: "Standing by Shiva exactly as he is",
          reasoning: "She chose him knowing who he was. Defending him as he is shows that her choice was real. Her family may stay frightened.",
        },
        {
          id: "both",
          label: "Finding a way to protect both",
          reasoning: "You'd look for a path that honours Shiva and comforts her family. That is the hardest option, and the most delicate.",
        },
      ],
      reveal: {
        title: "What a popular retelling says",
        text: "In a well-loved modern telling, Parvati takes a new form at this moment: radiant and calm, with a bell-shaped moon on her forehead, and fierce enough to face Shiva's terrifying company. She stands between the two worlds, reassures her family, and asks Shiva to appear in a gentle, beautiful form. He does, and the wedding goes ahead. This form is Chandraghanta.",
        deep: "The Shiva Purana tells of the frightening procession, Mena fainting, and Shiva later appearing in a beautiful form after others plead with him. The idea that Parvati became Chandraghanta here comes from modern devotional retellings; no classical source I found makes that link.",
        why: "In this telling, her fierceness isn't aimed at anyone. It holds the moment steady so that no one has to be hurt.",
      },
      hypothetical: {
        title: "Imagine: if she had only sided with one",
        text: "If she had sent Shiva away, her years of tapas would have bent to her family's fear. If she had ignored her family, the wedding would have begun with her mother on the floor. This branch is ours, to help you think. It is not in any source.",
      },
      parentNote: "Be clear with both children that this particular story is a popular retelling, not a classical text. That's a useful lesson in itself: traditions keep growing new stories around old forms.",
    },

    // ================================================================ B STORY (continued)
    {
      id: "d3-form",
      type: "story",
      section: "story",
      title: "Two faces at once",
      kind: "interpretation",
      visual: "d3Form",
      sound: { mood: "bells", cues: [{ at: 1.0, hit: "bell" }, { at: 5.4, hit: "shimmer" }, { at: 9.0, mood: "radiant" }] },
      duration: 13,
      sources: [ICON],
      captions: [
        { at: 0.5, text: "A bell-shaped moon appears on her forehead. Ten arms, ten weapons. A tiger at her side." },
        { at: 4.6, text: "One face of her strength turns toward the fearsome procession. The other turns toward her frightened mother." },
        { at: 8.8, text: "The procession settles. Shiva's terrifying form softens. Mena wakes." },
      ],
      slow: { from: 4.2, to: 8.0, rate: 0.35, prompt: "Fierce toward harm, gentle toward the frightened. Can you be both at once?" },
    },
    {
      id: "d3-battle",
      type: "story",
      section: "story",
      title: "The sound of the bell",
      kind: "tradition",
      visual: "d3Battle",
      sound: { mood: "battle", cues: [{ at: 4.6, hit: "bell" }, { at: 6.0, hit: "bell" }, { at: 8.6, hit: "shimmer" }] },
      duration: 14,
      sources: [DM_BELL],
      captions: [
        {
          at: 0.5,
          text: "The Devi Mahatmya, the central text recited at Navaratri, describes her riding into battle against armies of demons.",
        },
        {
          at: 4.4,
          text: "She carries a bell. When it rings, the text says, demons fall, overwhelmed by its sound.",
          deep: "In chapter 2 she fells demons \"deluded by the sound of her bell\"; in chapter 9 she fills every direction with its ringing.",
        },
        {
          at: 9.0,
          text: "The bell doesn't cut or strike. Its sound alone turns harm back.",
        },
      ],
      slow: { from: 4.2, to: 7.6, rate: 0.3, prompt: "No weapon touches them. What makes them fall?" },
    },
    {
      id: "d3-hymn",
      type: "story",
      section: "story",
      title: "Protect us with your bell",
      kind: "tradition",
      visual: "d3Hymn",
      sound: { mood: "bells", cues: [{ at: 3.6, hit: "bellSoft" }, { at: 6.4, hit: "bell" }] },
      duration: 12,
      sources: [DM_HYMN],
      captions: [
        { at: 0.5, text: "After her victory, the gods sing a hymn of praise." },
        {
          at: 3.6,
          text: "They ask her: protect us with your trident, protect us with your sword, protect us with the sound of your bell and the twang of your bowstring.",
          deep: "This is the Shakradi Stuti in chapter 4 of the Devi Mahatmya: śūlena pāhi no devi pāhi khaḍgena cāmbike, ghaṇṭāsvanena naḥ pāhi cāpajyāniḥsvanena ca.",
        },
        { at: 8.4, text: "In the same breath they ask her to guard them with her gentle forms and her terrifying ones." },
      ],
      hotspots: [
        { id: "trident", label: "Trident", x: 470, y: 380, from: 3.6, title: "Trident", text: "Shiva's weapon, given to the Devi. In the hymn it is the first protection the gods ask for.", kind: "tradition", source: "Devi Mahatmya ch. 4" },
        { id: "sword", label: "Sword", x: 1130, y: 380, from: 3.6, title: "Sword", text: "Often read as the sword of discernment, which cuts through confusion. That reading is devotional, not in the hymn itself.", kind: "interpretation" },
        { id: "bell", label: "Bell", x: 800, y: 250, from: 3.6, title: "The bell (ghanta)", text: "The only weapon in the hymn that protects by sound. Bells are rung in worship to begin a ritual and, many say, to clear the space of harm.", kind: "interpretation" },
        { id: "bow", label: "Bowstring", x: 800, y: 620, from: 3.6, title: "The twang of the bowstring", text: "Like the bell, the hymn asks for protection by its sound: a warning before any arrow flies.", kind: "tradition", source: "Devi Mahatmya ch. 4" },
      ],
    },
    {
      id: "d3-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d3Emblems",
      sound: { mood: "bells" },
      duration: 10,
      sources: [ICON],
      captions: [
        { at: 0.5, text: "Golden, ten-armed, riding a tiger, with a half-moon like a bell on her forehead. Calm face, ready hands." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "moon", label: "Bell-moon", x: 800, y: 170, title: "The half-moon bell", text: "Chandra (moon) and ghanta (bell): coolness and alertness together. Moonlight is soft; a bell is a call to attention.", kind: "interpretation" },
        { id: "arms", label: "Ten arms", x: 800, y: 440, title: "Ten arms", text: "Many arms show the ability to act in every direction at once. Her hands hold weapons, a lotus, a water pot and a rosary, as well as gestures of blessing and fearlessness.", kind: "interpretation", source: "Devotional iconography" },
        { id: "tiger", label: "Tiger", x: 380, y: 690, title: "The tiger", text: "A fierce animal carrying a serene rider. Many devotees read this as power that is ridden, not riding you.", kind: "interpretation" },
        { id: "face", label: "Calm face", x: 1180, y: 300, title: "The calm face", text: "Even armed for battle, she is always shown serene. The fierceness is in her readiness, not her expression.", kind: "interpretation" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d3-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "Strength can protect just by being ready.",
      deeper:
        "Her emblem is a bell, and in the Devi Mahatmya the bell protects by its sound alone: the ringing that overwhelms demons reassures the gods. She is pictured with a calm face and weapons in every hand. She isn't calm first and fierce later. She is both at once, fierce towards harm and serene towards the frightened. Calling her simply \"a warrior\" misses this. Her strength is often a signal that stops a fight before it has to happen. Readiness, held calmly, is itself a kind of protection.",
      connections: [
        { event: "Parvati stands between the procession and her family.", meaning: "Her strength holds two frightened worlds together.", jumpTo: "d3-form" },
        { event: "The bell's sound turns the demons back.", meaning: "Protection without a blow.", jumpTo: "d3-battle" },
        { event: "The gods ask for her gentle and terrible forms.", meaning: "One power, facing two ways.", jumpTo: "d3-hymn" },
      ],
      readings: [
        { kind: "tradition", label: "What the sources narrate", text: "The Devi Mahatmya describes her bell felling demons and the gods asking for its protection (ch. 2, 4, 9)." },
        { kind: "interpretation", label: "A devotional reading", text: "Chandraghanta is worshipped as fierce toward evil and serene toward devotees; the sound of her bell drives away fear." },
        { kind: "contemporary", label: "Our reading", text: "Readiness itself can protect. Strength doesn't always need to be used to work. This is our interpretation, offered to argue with." },
      ],
      invite: "Do you agree that strength works best when it isn't used? Test it against the next two scenes.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "o-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Okoye stands in front of the charging rhino",
      kind: "marvel",
      role: "primary",
      roleNote: "The strongest moment of a battle is a standoff where nobody strikes.",
      film: "Black Panther",
      year: 2018,

      rating: "PG-13",
      character: "Okoye",
      scene: "The final battle on the plains: W'Kabi's charge and the confrontation.",
      context:
        "Okoye commands the Dora Milaje, sworn to the throne of Wakanda. After Killmonger wins the throne, she at first serves him, because her loyalty is to the throne. When T'Challa returns alive, she turns against Killmonger. Her husband W'Kabi has sided with Killmonger and leads the Border Tribe into battle.",
      find: {
        where: "Near the end of the film, in the final battle on the plains outside the city.",
        search: "Black Panther Okoye W'Kabi rhino",
      },
      watchFor: ["Who moves, and who doesn't.", "What Okoye says, and how quickly.", "What the rhino does."],
      sources: [BP],
    },
    {
      id: "o-charge",
      type: "story",
      section: "marvel",
      title: "The charge",
      kind: "marvel",
      visual: "d3Plains",
      sound: { mood: "filmTension", cues: [{ at: 3.0, mood: "filmStruggle" }, { at: 7.0, hit: "heartbeat" }] },
      duration: 12,
      sources: [BP],
      captions: [
        { at: 0.5, text: "The battle for Wakanda spreads across the plains. The Border Tribe rides armoured rhinos." },
        { at: 3.6, text: "W'Kabi charges straight at Okoye. She plants herself in the rhino's path, spear raised." },
      ],
      slow: { from: 6.4, to: 9.6, rate: 0.25, prompt: "Her husband is charging at her. She doesn't move." },
      freezes: [
        {
          at: 9.8,
          title: "The standoff",
          text: "W'Kabi asks whether she would kill him, the man she loves.",
          deep: "Okoye's loyalty is to Wakanda above everything, including her marriage. W'Kabi has to decide whether he believes her.",
        },
      ],
    },
    {
      id: "o-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d3Plains",
      visualTime: 9.8,
      sources: [BP],
      framing: "will",
      prompt: "What do you think happens next?",
      deepPrompt: "What would make W'Kabi back down: fear, love, or something else?",
      options: [
        { id: "strike", label: "Okoye strikes first", reasoning: "She is a soldier in a battle, and he is charging. Striking first is what training says." },
        { id: "step", label: "Okoye steps aside to spare him", reasoning: "Love might win over duty. But stepping aside would let the charge through." },
        { id: "stand", label: "She holds her ground, and he stops", reasoning: "You expect her certainty to do the work. It means trusting that he believes her." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Okoye answers: for Wakanda, without question. Neither moves. The rhino skids to a halt in front of her and licks her face. W'Kabi looks at his wife's certainty and kneels. Every Border Tribe warrior lowers his weapon and kneels with him. The battle on the plains ends without another blow.",
        why: "Her absolute readiness to strike is exactly what makes striking unnecessary.",
      },
    },
    {
      id: "o-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Okoye",
      kind: "comparison",
      turningPoint: "Okoye's answer. She chooses Wakanda over her husband, and her readiness is what spares him.",
      connection:
        "Fierce readiness as protection. Okoye's resolve works like the bell: a signal so clear that the attacker stops. And like Chandraghanta between the procession and her family, Okoye stands between two people she is bound to.",
      ladder: [
        { level: "notice", text: "Nobody strikes in this moment. So how is the battle on the plains won?" },
        {
          level: "feel",
          text: "How do you think Okoye felt, standing in front of her own husband?",
          followUps: [{ ifTheySay: "Angry", ask: "Only angry? What else might be underneath?" }],
        },
        {
          level: "wonder",
          text: "Why did W'Kabi kneel? Was it fear of her spear, or something else?",
          followUps: [
            { ifTheySay: "He was scared", ask: "Scared of what exactly: being hurt, or of what he'd become if he kept going?" },
            { ifTheySay: "He still loved her", ask: "So did love stop the battle? Or her certainty?" },
          ],
        },
        {
          level: "stretch",
          text: "Okoye was ready to kill her husband for her country. Is that admirable, or troubling?",
          deep: "Earlier, Okoye served the usurper Killmonger because her loyalty was to the throne, whoever sat on it. Is loyalty to an institution a strength or a danger? When should it bend?",
          followUps: [{ ifTheySay: "Admirable", ask: "Would you want a friend whose loyalty to a team came before you?" }],
        },
        { level: "flip", text: "What if Okoye had hesitated, even for a second? What would W'Kabi have done?" },
        { level: "connect", text: "Chandraghanta's bell protects by sound; Okoye protects by certainty. What do they have in common?" },
      ],
      stance: {
        statement: "The strongest people rarely need to use their strength.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Each person gives an example from school, sport or home that supports where they stand.",
      },
      activity: {
        title: "Hold the line",
        minutes: 5,
        steps: [
          "One person stands and says one sentence about something they believe in, calmly and without raising their voice.",
          "The others try, politely, to talk them out of it.",
          "The speaker can only repeat their sentence, calmly. No arguing.",
          "Swap. Talk about it: what did it feel like to hold steady without fighting back?",
        ],
      },
      sources: [BP],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "h-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Banner's secret",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A man whose calm hides a rage he spent years running from. Calm and fierce, but not yet at peace.",
      film: "The Avengers and Avengers: Endgame",
      year: 2012,

      rating: "PG-13",
      character: "Bruce Banner",
      scene: "The Battle of New York (2012), then the diner scene with \"Smart Hulk\" (2019).",
      context:
        "Bruce Banner has spent years running from the Hulk, the rage he cannot fully control. In New York, with an alien army pouring through the sky, the team needs him.",
      find: {
        where: "The final battle in New York, near the end of The Avengers (2012). The diner scene is early in Avengers: Endgame (2019).",
        search: "Avengers Banner I'm always angry",
      },
      watchFor: ["How calm Banner seems just before.", "What he says his secret is.", "How different he is in the diner years later."],
      sources: [AVENGERS, ENDGAME],
    },
    {
      id: "h-secret",
      type: "story",
      section: "marvel",
      title: "Always angry",
      kind: "marvel",
      visual: "d3Leviathan",
      sound: { mood: "filmTension", cues: [{ at: 4.0, hit: "heartbeat" }, { at: 7.6, hit: "boom" }, { at: 7.6, mood: "filmEpic" }] },
      duration: 14,
      sources: [AVENGERS],
      captions: [
        { at: 0.5, text: "A huge armoured creature, a Leviathan, bears down on the team in the streets of New York." },
        { at: 3.6, text: "Captain America tells Banner it's time to get angry. Banner says his secret is that he's always angry." },
        { at: 7.6, text: "He turns into the Hulk at will, and stops the creature with a single blow." },
      ],
      slow: { from: 3.4, to: 7.4, rate: 0.3, prompt: "The calm man was never calm. What has he been holding back?" },
      freezes: [
        {
          at: 7.0,
          title: "The secret",
          text: "Banner has kept his rage on a leash every moment of the film. Now he lets it go, on purpose, at a target.",
          deep: "Is this control, or a dam with a door in it?",
        },
      ],
    },
    {
      id: "h-diner",
      type: "story",
      section: "marvel",
      title: "Years later, in a diner",
      kind: "marvel",
      visual: "d3Diner",
      sound: { mood: "filmQuiet", cues: [{ at: 4.0, hit: "shimmer" }] },
      duration: 11,
      sources: [ENDGAME],
      captions: [
        { at: 0.5, text: "In Avengers: Endgame, Banner appears in a diner as a merged Hulk with Banner's mind, friendly and relaxed." },
        { at: 4.4, text: "He explains that he spent months in a lab bringing the brains and the brawn together, instead of treating the Hulk as a disease." },
      ],
    },
    {
      id: "h-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Banner",
      kind: "comparison",
      turningPoint: "In 2012, the shock that the calm man was never calm. In 2019, the peace of a man who stopped fighting himself.",
      connection:
        "Calm and fierceness held together. Banner spends years searching for the integration that Chandraghanta has by nature. But his fierceness started as a wound, not a sacred attribute.",
      ladder: [
        { level: "notice", text: "What does Banner say his secret is? Was it a surprise?" },
        { level: "feel", text: "What would it be like to always be angry, but never let anyone see?" },
        {
          level: "wonder",
          text: "Why do you think Banner could control the Hulk in New York, when he couldn't before?",
          followUps: [{ ifTheySay: "He had a reason", ask: "Does having a target make anger safer? Or more dangerous?" }],
        },
        {
          level: "stretch",
          text: "Is calm-and-fierce something you're born with, or something you build?",
          deep: "Chandraghanta has both by nature; Banner had to make peace with himself to get there. Which is a more useful model for a person, and why?",
        },
        { level: "flip", text: "What if Banner had never found that peace? What happens to people who spend their lives holding in anger?" },
        { level: "connect", text: "Chandraghanta's two faces look in two directions. Which way do Banner's two sides face?" },
      ],
      stance: {
        statement: "Anger can be useful if you know where to point it.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Ask the person furthest from you: when has anger helped you, or hurt you?",
      },
      activity: {
        title: "Two faces",
        minutes: 6,
        steps: [
          "Each person thinks of one thing they'd protect fiercely: a person, a pet, a value.",
          "Say what your \"fierce face\" would look like if it were threatened.",
          "Then say what your \"gentle face\" looks like for the same thing on an ordinary day.",
          "Talk about it: are the two faces really different, or the same care pointed two ways?",
        ],
      },
      sources: [AVENGERS, ENDGAME],
    },

    // ================================================================ F COMPARE
    {
      id: "d3-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "Can you tell each one in a sentence?",
          tradition: "Chandraghanta's bell turns back harm without a blow, and in a popular retelling she stands between Shiva's procession and her frightened family.",
          traditionJump: "d3-battle",
          marvel: [
            { who: "Okoye", text: "Okoye's certainty stops a charge and ends a battle.", jumpTo: "o-charge" },
            { who: "Banner", text: "Banner's hidden rage, unleashed on purpose, stops a monster.", jumpTo: "h-secret" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What's the one thing all three hold in reserve?",
          tradition: "Fierceness held ready, pointed only at harm.",
          marvel: [
            { who: "Okoye", text: "Her readiness is the protection." },
            { who: "Banner", text: "His fierceness is real, and finally aimed." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which of the three seems most at peace?",
          tradition: "Her calm and fierceness are one, by nature. No inner conflict.",
          marvel: [
            { who: "Okoye", text: "She is torn between loyalties, and once served the wrong king." },
            { who: "Banner", text: "His fierceness began as a wound he had to heal." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Strength isn't only about what it does. It's also about what it makes unnecessary.",
          marvel: [
            { who: "Okoye", text: "Her strongest move was standing still." },
            { who: "Banner", text: "His strongest move was making peace with himself." },
          ],
          deep: "One reading: the bell is the opposite of a weapon used in anger. It warns, so that nothing has to be struck. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d3-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Online",
      scenario: "Your younger cousin is being teased in a group chat you're both in. A few people are joining in. Nobody has said anything to stop it.",
      deep: "One of the people teasing is a friend of yours. If you speak up, they might turn on you next.",
      prompt: "What would you do?",
      options: [
        {
          id: "hit",
          label: "Post something harsh back at them",
          perspectives: [
            { label: "What it protects", text: "Your cousin sees someone is on their side, fast." },
            { label: "What it risks", text: "The chat becomes a fight, and the teasing may get worse." },
            { label: "Question", text: "Would this stop the harm, or just move it?" },
          ],
        },
        {
          id: "quiet",
          label: "Message an adult or report it quietly",
          perspectives: [
            { label: "What it protects", text: "Someone with more power can step in, and you're not in the line of fire." },
            { label: "What it risks", text: "Your cousin doesn't know anyone noticed, at least for now." },
            { label: "Question", text: "Is quiet protection still protection?" },
          ],
        },
        {
          id: "bell",
          label: "Post one calm message: \"Not cool. Leave it.\"",
          perspectives: [
            { label: "What it protects", text: "A clear signal, like a bell, that someone is watching and won't join in." },
            { label: "What it risks", text: "You might become the next target, and it might not work." },
            { label: "Question", text: "What makes a calm message stronger than an angry one?" },
          ],
        },
      ],
      closing: "Okoye stopped a charge without a blow. Chandraghanta's bell warns before it strikes. Sometimes being clearly ready is the protection.",
      talk: ["Have you ever seen someone stop something just by speaking up calmly?", "When is it right to be fierce instead of calm?", "Who in our family is good at being both?"],
    },

    // ================================================================ H REFLECT
    {
      id: "d3-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "Can the same strength feel like safety to one person and a threat to another?",
      younger: "Okoye didn't strike W'Kabi, but she still won. How?",
      older: "Okoye was ready to kill her husband for Wakanda. Is that admirable loyalty, or something more troubling?",
      takeaway: "Strength can protect just by being ready.",
    },
  ],

  context: [
    {
      title: "What is documented, and what is a retelling",
      paragraphs: [
        "The bell is documented: in the Devi Mahatmya the goddess's bell fells demons (ch. 2), fills the directions (ch. 9), and the gods ask her to protect them with its sound (ch. 4, the Shakradi Stuti).",
        "The wedding story: the Shiva Purana describes Shiva's frightening procession and Mena fainting. The idea that Parvati took the Chandraghanta form at that moment is a popular modern retelling. No classical source found makes that link.",
        "Her iconography (bell-shaped moon, ten arms, tiger or lion, golden, serene) comes from devotional verses and images.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [DM_BELL, DM_HYMN, SHIVA_PURANA, ICON, BP, AVENGERS, ENDGAME],
};
