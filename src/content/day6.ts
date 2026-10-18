// ---------------------------------------------------------------------------
// Day 6: Katyayani
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 6).
//
// Source note: three strands from different texts. The gods' light and their
// gifts: Devi Mahatmya ch. 2. The battle with Mahishasura: ch. 3. The hymn
// that names her Katyayani: ch. 11. The boon ("only a woman") and the marriage
// proposal: Devi Bhagavata Purana, Book 5. The sage Katyayana's hermitage:
// Vamana Purana (the Kalika Purana says instead that he worshipped her first).
// The Devi Mahatmya (ch. 1) also says she is eternal: the gods' light is the
// occasion of her appearing, not her maker. We keep that distinction visible.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const DM2 = { label: "Devi Mahatmya ch. 2: the gods' light and their gifts", url: "https://en.wikipedia.org/wiki/Devi_Mahatmya" };
const DM3 = { label: "Devi Mahatmya ch. 3: the defeat of Mahishasura", url: "https://en.wikipedia.org/wiki/Mahishasura" };
const DM11 = { label: "Devi Mahatmya ch. 11: the hymn that names her Katyayani", url: "https://en.wikipedia.org/wiki/Devi_Mahatmya" };
const DBP5 = { label: "Devi Bhagavata Purana, Book 5: Mahisha's boon and proposal", url: "https://en.wikipedia.org/wiki/Devi_Bhagavata_Purana" };
const KATY = { label: "Katyayani: the Vamana and Kalika Purana accounts, and iconography", url: "https://en.wikipedia.org/wiki/Katyayani" };
const AVENGERS = { label: "The Avengers (2012)", url: "https://en.wikipedia.org/wiki/The_Avengers_(2012_film)", note: "Dialogue paraphrased." };
const CAPTAIN = { label: "Captain Marvel (2019)", url: "https://en.wikipedia.org/wiki/Captain_Marvel_(film)", note: "Dialogue paraphrased." };

export const day6: DayContent = {
  day: 6,
  name: "Katyayani",
  devanagari: "कात्यायनी",
  meaning: "She of the sage Katyayana",
  theme: "Courage",
  question: "What is worth standing up for, even when others underestimate you?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d6-enter",
      type: "story",
      section: "enter",
      title: "Night six",
      kind: "interpretation",
      visual: "d6Opening",
      sound: { mood: "shakti", cues: [{ at: 1.0, hit: "bell" }, { at: 6.2, hit: "shimmer" }] },
      duration: 12,
      sources: [KATY],
      captions: [
        { at: 0.6, text: "Night six. Tonight's form is Katyayani, the warrior form of the Devi." },
        {
          at: 3.6,
          text: "Her name links her to the sage Katyayana. One Purana says she first appeared in his hermitage; another says he was the first to worship her.",
          deep: "The Vamana Purana places her appearance in Katyayana's hermitage. The Kalika Purana says instead that Katyayana worshipped her first. Both explain the name; they disagree on how.",
        },
        { at: 8.0, text: "Tonight's story is the most famous in all of Navaratri: the defeat of the buffalo demon, Mahishasura." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d6-boon",
      type: "story",
      section: "story",
      title: "A boon with a gap in it",
      kind: "tradition",
      visual: "d6Boon",
      sound: { mood: "menace", cues: [{ at: 3.8, hit: "boom" }, { at: 8.0, hit: "thunder" }] },
      duration: 13,
      sources: [DBP5],
      captions: [
        { at: 0.5, text: "Mahisha, a demon who could take the shape of a buffalo, spent years in fierce tapas. The god Brahma came to grant him a boon." },
        { at: 4.0, text: "He asked never to die. Brahma refused: everything that is born must die." },
        {
          at: 7.4,
          text: "So Mahisha asked that no god, man or demon could kill him. Only a woman. He was sure no woman could ever be a threat.",
          deep: "The Devi Bhagavata Purana (Book 5) states this outright: he chose a woman because he thought women too weak to matter. The Devi Mahatmya does not tell the boon story.",
        },
      ],
      freezes: [
        {
          at: 11.2,
          title: "The gap",
          text: "Mahisha has written his own protection, and left one door open on purpose.",
          think: "What has he just done?",
          options: [
            { label: "Made himself safe", response: "That's exactly what he thinks. Keep watching." },
            { label: "Left himself a weakness", response: "He doesn't think so. The gap is shaped exactly like what he looks down on." },
          ],
        },
      ],
    },
    {
      id: "d6-light",
      type: "story",
      section: "story",
      title: "Anger becomes light",
      kind: "tradition",
      visual: "d6Light",
      sound: { mood: "menace", cues: [{ at: 4.4, mood: "kindling" }, { at: 4.4, hit: "whoosh" }, { at: 9.6, hit: "shimmer" }, { at: 10.2, hit: "bell" }, { at: 10.2, mood: "shakti" }] },
      duration: 15,
      sources: [DM2, KATY],
      captions: [
        { at: 0.5, text: "Protected by his boon, Mahisha conquered heaven and drove the gods out." },
        { at: 4.4, text: "The gods told Vishnu and Shiva what had happened. As they listened, their anger blazed out of them as light." },
        {
          at: 8.6,
          text: "The light from every god poured together into one blazing form: the Devi.",
          deep: "Devi Mahatmya ch. 2. But ch. 1 insists she is eternal and appears whenever she is needed. In the tradition, the gods' light is the occasion of her appearing, not what made her.",
        },
      ],
      slow: { from: 8.2, to: 11.6, rate: 0.3, prompt: "Many lights, one form. Did the gods make her, or did she appear through them?" },
    },

    // ================================================================ C CHOICE
    {
      id: "d6-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d6Light",
      visualTime: 13,
      sources: [DM2],
      framing: "weigh",
      prompt: "The gods have each been beaten. Now they see a power greater than all of them put together. What should they do with their own weapons?",
      deepPrompt: "They are gods. Giving up their weapons means trusting someone else completely. Is that wisdom, or giving up?",
      options: [
        { id: "keep", label: "Keep them, and fight beside her", reasoning: "Every extra weapon helps. Why make yourself weaker?" },
        { id: "some", label: "Give some, keep some back just in case", reasoning: "Trust, but carefully. It's a sensible hedge." },
        { id: "all", label: "Give them all to her", reasoning: "If she is greater than all of them, she can use them better than they can." },
      ],
      reveal: {
        title: "What the text says",
        text: "Each god gives her his own weapon: Shiva his trident, Vishnu his discus, Indra his thunderbolt and a bell. Even the mountain Himavat gives her a lion to ride. Together they had lost. Now they put everything in her hands.",
        deep: "The Devi Mahatmya lists the gifts one by one in chapter 2. Notice Indra's bell: the same bell we met on Night 3.",
        why: "Adding their powers together hadn't been enough. The win needed them to let go of control and trust someone greater.",
      },
      hypothetical: {
        title: "Imagine: they keep their weapons",
        text: "A crowd of defeated gods, each guarding his own strength, fighting their own way. This branch is ours, to help you think. It is not in any source.",
      },
    },

    // ================================================================ B STORY (continued)
    {
      id: "d6-gifts",
      type: "story",
      section: "story",
      title: "The gifts",
      kind: "tradition",
      visual: "d6Gifts",
      sound: { mood: "shakti", cues: [{ at: 1.0, hit: "bellSoft" }, { at: 4.0, hit: "shimmer" }] },
      duration: 11,
      sources: [DM2],
      captions: [
        { at: 0.5, text: "One by one, the gods give her what they have." },
        { at: 5.0, text: "Select each gift to see who gave it." },
      ],
      hotspots: [
        { id: "trident", label: "Trident", x: 420, y: 330, title: "Trident, from Shiva", text: "Shiva draws a trident out of his own trident and gives it to her.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
        { id: "discus", label: "Discus", x: 1180, y: 330, title: "Discus, from Vishnu", text: "Vishnu gives a discus drawn from his own.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
        { id: "bolt", label: "Thunderbolt and bell", x: 800, y: 200, title: "Thunderbolt and bell, from Indra", text: "Indra, king of the gods, gives a thunderbolt from his own, and a bell from his elephant Airavata.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
        { id: "bow", label: "Bow", x: 330, y: 600, title: "Bow and arrows, from Vayu", text: "The wind god Vayu gives a bow and two quivers of arrows.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
        { id: "conch", label: "Conch", x: 1270, y: 600, title: "Conch, from Varuna", text: "Varuna, god of the waters, gives a conch shell and a noose.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
        { id: "lion", label: "Lion", x: 800, y: 740, title: "Lion, from Himavat", text: "The mountain Himavat (Shailaputri's father, from Night 1) gives her a lion to ride.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
      ],
    },
    {
      id: "d6-battle",
      type: "story",
      section: "story",
      title: "Every shape he takes",
      kind: "tradition",
      visual: "d6Battle",
      sound: { mood: "battle", cues: [{ at: 4.4, hit: "boom" }, { at: 6.0, hit: "boom" }, { at: 9.2, hit: "bell" }, { at: 9.2, hit: "shimmer" }, { at: 11.0, mood: "shakti" }] },
      duration: 14,
      sources: [DBP5, DM3],
      captions: [
        {
          at: 0.5,
          text: "Mahisha hears of her and sends messengers asking her to marry him. She refuses. He sends his armies instead.",
          deep: "The proposal is told in the Devi Bhagavata Purana (Book 5). In the Devi Mahatmya, the armies simply attack.",
        },
        { at: 4.4, text: "In battle he keeps changing shape: buffalo, lion, a man with a sword, an elephant, and a buffalo again." },
        {
          at: 8.8,
          text: "She pins him beneath her foot. As he struggles half out of the buffalo's body, she ends his rule over heaven.",
          deep: "Devi Mahatmya ch. 3. This is the image on almost every Durga statue: the Devi on her lion, the buffalo at her feet. In chapter 11 the gods praise her by the name Katyayani.",
        },
      ],
      slow: { from: 4.4, to: 8.6, rate: 0.35, prompt: "Every shape he takes, she sees through. What is the one thing he can't change?" },
      parentNote:
        "The text describes a beheading. We keep it to \"she ends his rule\". With the older child you can talk about why so many images of the Devi show this exact moment.",
    },
    {
      id: "d6-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d6Emblems",
      sound: { mood: "shakti" },
      duration: 10,
      sources: [KATY],
      captions: [
        { at: 0.5, text: "As Navadurga, Katyayani is shown golden and radiant, with four arms, riding a lion." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "sword", label: "Sword", x: 560, y: 330, title: "Sword", text: "Held in a left hand. Many devotees read it as the courage to cut through what has to end.", kind: "interpretation", source: "Devotional iconography" },
        { id: "lotus", label: "Lotus", x: 560, y: 520, title: "Lotus", text: "In her other left hand: the warrior also carries a flower. Fierceness and gentleness are held together, as on Night 3.", kind: "interpretation" },
        { id: "abhaya", label: "Raised palm", x: 1040, y: 330, title: "Do not fear (abhaya)", text: "A right hand raised, palm out: the gesture that says \"do not be afraid\".", kind: "interpretation" },
        { id: "varada", label: "Open palm", x: 1040, y: 520, title: "Giving (varada)", text: "A right hand lowered, palm open: the gesture of giving blessings.", kind: "interpretation" },
        { id: "lion", label: "Lion", x: 800, y: 760, title: "The lion", text: "The gift of Himavat. The same lion carries Durga in the battle.", kind: "tradition", source: "Devi Mahatmya ch. 2" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d6-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "When something is wrong, stand up to it, and stand together.",
      deeper:
        "Mahisha had driven the gods out of heaven, and each of them, alone, had lost. Their shared anger at the injustice blazed out as light and gathered into one form: the Devi. The Devi Mahatmya says she is eternal and simply appears when she is needed. Each god then gave her his own weapon, trusting her with what he couldn't win alone. Mahisha had asked that only a woman could kill him, because he thought no woman could. In this story, courage isn't the absence of fear. It's refusing to accept a wrong, and it's strongest when it's shared. Often it comes from exactly where the arrogant weren't looking.",
      connections: [
        { event: "The gods' anger at injustice becomes one light.", meaning: "Courage starts by refusing to accept a wrong.", jumpTo: "d6-light" },
        { event: "Each god gives her his weapon.", meaning: "Courage shared is stronger than courage alone.", jumpTo: "d6-gifts" },
        { event: "\"Only a woman.\"", meaning: "Courage often comes from where the arrogant weren't looking.", jumpTo: "d6-boon" },
      ],
      readings: [
        { kind: "tradition", label: "What the texts say", text: "The gods' radiance becomes the Devi; each gives her a weapon; she defeats Mahishasura. The Devi Bhagavata adds that his boon excluded only women." },
        { kind: "interpretation", label: "A devotional reading", text: "Many read Mahisha as ignorance or ego, the animal in us that keeps changing shape. Victory over him is victory over that." },
        { kind: "contemporary", label: "Our reading", text: "Courage is refusing to accept a wrong, and it is strongest when it is shared. This is our interpretation, offered to argue with." },
      ],
      invite: "Carry this into the next two scenes: who stands up, who stands together, and who gets underestimated?",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "c-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Coulson's cards",
      kind: "marvel",
      role: "primary",
      roleNote: "Shared anger at a wrong turns a quarrelling group into one force. But someone arranged the moment.",
      film: "The Avengers",
      year: 2012,

      rating: "PG-13",
      character: "Nick Fury, Tony Stark and Steve Rogers",
      scene: "Agent Coulson's death aboard the Helicarrier, and what Fury does next.",
      context:
        "The heroes have been bickering, sabotaging each other and doubting S.H.I.E.L.D. Loki's sceptre has been feeding their anger. Agent Coulson, a quiet fan of Captain America who collects his vintage trading cards, has been the steady link between them.",
      find: {
        where: "After Loki's escape from the Helicarrier, before the final battle in New York.",
        search: "Avengers 2012 Fury Coulson cards",
      },
      parentNote: "Coulson's death is the most violent moment in the film. The retelling here leaves out how it happens; preview the film yourself before watching with your younger child.",
      watchFor: ["What the team is doing just before Coulson is attacked.", "What Fury puts on the table.", "What Maria Hill says to Fury afterwards."],
      sources: [AVENGERS],
    },
    {
      id: "c-helicarrier",
      type: "story",
      section: "marvel",
      title: "Divided",
      kind: "marvel",
      visual: "d6Helicarrier",
      sound: { mood: "filmTension", cues: [{ at: 5.2, hit: "boom" }, { at: 8.6, mood: "filmLament" }] },
      duration: 13,
      sources: [AVENGERS],
      captions: [
        { at: 0.5, text: "On the Helicarrier, the heroes argue. Each one is powerful. None of them trusts the others." },
        { at: 4.6, text: "Loki uses the chaos to escape. Coulson stands in his way, alone." },
        { at: 8.6, text: "Loki kills Coulson. The team is scattered and beaten." },
      ],
    },
    {
      id: "c-cards",
      type: "story",
      section: "marvel",
      title: "The cards",
      kind: "marvel",
      visual: "d6Cards",
      sound: { mood: "filmLament", cues: [{ at: 2.4, hit: "heartbeat" }] },
      duration: 12,
      sources: [AVENGERS],
      captions: [
        { at: 0.5, text: "Fury finds Steve and Tony. He drops a set of Captain America trading cards on the table, stained with Coulson's blood." },
        { at: 4.6, text: "He says they were in Coulson's jacket. Coulson believed in heroes." },
        { at: 8.0, text: "Tony stares at the place where Coulson fell. Loki has made it personal." },
      ],
      freezes: [
        {
          at: 10.6,
          title: "Two angry heroes",
          text: "An hour ago, Steve and Tony could hardly stand each other.",
          deep: "Grief and anger at a wrong are the same fuel the gods felt in chapter 2. What will it do here?",
        },
      ],
    },
    {
      id: "c-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d6Cards",
      visualTime: 10.6,
      sources: [AVENGERS],
      framing: "will",
      prompt: "What do you think the team does now?",
      options: [
        { id: "split", label: "Each goes after Loki alone", reasoning: "They're each angry enough to want their own revenge." },
        { id: "quit", label: "They give up", reasoning: "They've just been beaten. Maybe it's too much." },
        { id: "unite", label: "They finally act as one", reasoning: "A shared loss can do what arguments couldn't." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Steve and Tony stop arguing. The team gathers and heads to New York together. Then comes a twist: Maria Hill tells Fury that the cards were in Coulson's locker, not his jacket. Fury staged the moment. He says they needed a push.",
        why: "The anger was real and so was the loss, but the scene that set it off was arranged.",
      },
    },
    {
      id: "c-locker",
      type: "story",
      section: "marvel",
      title: "Not his jacket",
      kind: "marvel",
      visual: "d6Locker",
      sound: { mood: "filmQuiet", cues: [{ at: 5.0, mood: "filmEpic" }] },
      duration: 11,
      sources: [AVENGERS],
      captions: [
        { at: 0.5, text: "Maria Hill points out that the cards were in Coulson's locker, not his jacket. Fury had arranged the moment." },
        { at: 5.0, text: "And it worked. The heroes who couldn't stop arguing regroup and head for New York together." },
      ],
      freezes: [
        {
          at: 4.2,
          title: "Was it right?",
          text: "Fury lied to grieving people to get them to fight.",
          think: "Was Fury right?",
          options: [
            { label: "Yes: it saved the world", response: "That's Fury's view. Ask: would it have worked if they had known?" },
            { label: "No: he used their grief", response: "That's a serious objection. Ask: what should he have done instead?" },
          ],
        },
      ],
    },
    {
      id: "c-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Fury's cards",
      kind: "comparison",
      turningPoint: "The bloodied cards: grief and anger turning divided heroes into one purpose, and the reveal that Fury staged it.",
      connection:
        "Like the gods' anger in chapter 2, a shared sense of wrong becomes one power that none of them could produce alone. But the Avengers stay separate people, and someone manipulated them. Nobody manipulated the gods.",
      ladder: [
        { level: "notice", text: "What were the heroes doing just before Coulson was attacked?" },
        { level: "feel", text: "How do you think Steve felt when he saw the cards?" },
        {
          level: "wonder",
          text: "Why did the cards bring them together when nothing else had?",
          followUps: [{ ifTheySay: "Because they were sad", ask: "Sad people don't always unite. What else was going on?" }],
        },
        {
          level: "stretch",
          text: "Fury lied to bring the team together. Was he right to?",
          deep: "Does a good result justify engineering people's emotions? Would your answer change if they found out? If it had failed?",
          followUps: [
            { ifTheySay: "Yes, it worked", ask: "Would it be fine for a teacher or a friend to do the same to you?" },
            { ifTheySay: "No, lying is wrong", ask: "What if telling the truth meant the world was lost?" },
          ],
        },
        { level: "flip", text: "What if Fury had just told them the truth: \"Coulson is dead, and I need you\"? Would it have worked?" },
        { level: "connect", text: "The gods gave their weapons to the Devi freely. The Avengers were nudged. Does that difference matter?" },
      ],
      stance: {
        statement: "It's fine to stir people's feelings if it's for a good cause.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Think of adverts, campaigns and speeches. Where does persuasion end and manipulation begin?",
      },
      activity: {
        title: "Fury's choice",
        minutes: 8,
        steps: [
          "One person argues Fury was right. One argues he was wrong. Two minutes each.",
          "Swap sides and argue the other way for one minute.",
          "Was it easier to argue the side you believe? Why?",
          "Together: write one rule for when it's okay to stir people's feelings, if ever.",
        ],
      },
      sources: [AVENGERS],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "cm-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "Nothing to prove",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "The people who called her weak were the ones holding her back.",
      film: "Captain Marvel",
      year: 2019,

      rating: "PG-13",
      character: "Carol Danvers and Yon-Rogg",
      scene: "Carol's confrontation with the Supreme Intelligence, then her last fight with Yon-Rogg.",
      context:
        "Carol has lived for six years as a Kree soldier with no memory of her past. She has been told her power is a gift from the Kree, kept in check by an implant in her neck, and warned again and again that her emotions make her weak.",
      find: {
        where: "The final act: Carol's showdown inside the Supreme Intelligence's mind, then the end of her fight with Yon-Rogg on Earth.",
        search: "Captain Marvel nothing to prove Yon-Rogg",
      },
      watchFor: ["What the Supreme Intelligence says she is without the Kree.", "What her memories show her.", "What Yon-Rogg asks her to do, and her answer."],
      sources: [CAPTAIN],
    },
    {
      id: "cm-falls",
      type: "story",
      section: "marvel",
      title: "Every time she fell",
      kind: "marvel",
      visual: "d6Falls",
      sound: { mood: "filmStruggle", cues: [{ at: 4.6, mood: "filmWonder" }, { at: 10.6, hit: "boom" }, { at: 10.6, mood: "filmEpic" }] },
      duration: 14,
      sources: [CAPTAIN],
      captions: [
        { at: 0.5, text: "Trapped inside the Supreme Intelligence's mind, Carol is told that her power was a gift from the Kree, and that without them she is weak." },
        { at: 4.6, text: "Then her memories return: falling as a little girl, falling in training, falling again and again. And getting up every time." },
        { at: 10.2, text: "She breaks free of the Kree implant. Her full power floods out." },
      ],
      slow: { from: 4.6, to: 9.8, rate: 0.35, prompt: "Falling isn't the story here. What is?" },
    },
    {
      id: "cm-canyon",
      type: "story",
      section: "marvel",
      title: "Fight me fairly",
      kind: "marvel",
      visual: "d6Canyon",
      sound: { mood: "filmTension" },
      duration: 11,
      sources: [CAPTAIN],
      captions: [
        { at: 0.5, text: "Later, on Earth, her old mentor Yon-Rogg lies beaten in a canyon." },
        { at: 4.0, text: "He tells her to put her powers aside and fight him hand to hand, to prove she can beat him without them." },
      ],
      freezes: [
        {
          at: 8.6,
          title: "His terms",
          text: "Yon-Rogg is setting the rules of the fight, just as he set the rules of who she was.",
          deep: "Mahisha also tried to set the terms: \"only a woman\", then \"marry me\".",
        },
      ],
    },
    {
      id: "cm-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d6Canyon",
      visualTime: 8.6,
      sources: [CAPTAIN],
      framing: "will",
      prompt: "What do you think Carol does?",
      options: [
        { id: "fair", label: "Fights him hand to hand", reasoning: "Beating him on his own terms would prove him wrong for good." },
        { id: "walk", label: "Walks away", reasoning: "He's beaten already. Why bother?" },
        { id: "blast", label: "Refuses his terms entirely", reasoning: "She doesn't owe him a fair fight, or anything else." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Carol blasts him across the canyon with a single burst of power and tells him she has nothing to prove to him. Then she sends him back to the Kree with a message.",
        why: "Carol stops letting the person who underestimated her define what counts as winning.",
      },
    },
    {
      id: "cm-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Carol",
      kind: "comparison",
      turningPoint: "The memory of every fall, and her refusal to fight on Yon-Rogg's terms.",
      connection:
        "Mahisha defined the contest on his own terms; Yon-Rogg tries to set the rules of the fight. In both, the one who underestimated her refuses to see what stands in front of him. But Carol is reclaiming herself; the Devi was never diminished.",
      ladder: [
        { level: "notice", text: "What did the Kree keep telling Carol about her emotions?" },
        { level: "feel", text: "How do you think it felt to remember getting up every single time?" },
        {
          level: "wonder",
          text: "Mahisha thought a woman couldn't beat him. Yon-Rogg thought Carol needed to prove herself. What did they both get wrong?",
        },
        {
          level: "stretch",
          text: "Was Carol's refusal to fight fair strength, or arrogance of her own?",
          deep: "Is there a difference between refusing someone's unfair rules and refusing all rules? When does \"I have nothing to prove\" become its own blind spot?",
          followUps: [{ ifTheySay: "Strength", ask: "Would you say the same if Yon-Rogg had won that way?" }],
        },
        { level: "flip", text: "What if Carol had fought him hand to hand, and lost? Would he have been right about her?" },
        { level: "connect", text: "Who underestimated whom tonight? Mahisha, Loki, Yon-Rogg: what did it cost each of them?" },
      ],
      stance: {
        statement: "You never have to prove yourself to someone who doubts you.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Does it change if the doubter is a coach, a teacher or a parent?",
      },
      activity: {
        title: "Who set the rules?",
        minutes: 6,
        steps: [
          "Each person thinks of a time someone said \"prove it\" to them.",
          "Who decided what counted as proof? You, or them?",
          "Did you take the challenge? Would you now?",
          "Together: what's the difference between a fair challenge and a trap?",
        ],
      },
      sources: [CAPTAIN],
    },

    // ================================================================ F COMPARE
    {
      id: "d6-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "A demon who scorned women is defeated by the Devi, armed with every god's weapon.",
          traditionJump: "d6-battle",
          marvel: [
            { who: "Fury and the team", text: "A staged moment of grief turns quarrelling heroes into one team.", jumpTo: "c-cards" },
            { who: "Carol", text: "Told she is nothing alone, she remembers every fall and refuses her mentor's terms.", jumpTo: "cm-falls" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "Who stands up to what, in each story?",
          tradition: "Courage begins by refusing to accept a wrong, and grows when it is shared.",
          marvel: [
            { who: "Fury and the team", text: "Grief at a wrong turns quarrelling heroes into one team." },
            { who: "Carol", text: "She stands up to the people who told her she was weak." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which story is about one being, and which about many?",
          tradition: "She is one being, greater than the gods who called her, and was never diminished.",
          marvel: [
            { who: "Fury and the team", text: "They stay separate people, and Fury manipulated them." },
            { who: "Carol", text: "Her power came from an accident; she had to win herself back." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "The gods won by letting go of control. Fury won by taking control of people's feelings.",
          marvel: [
            { who: "Fury and the team", text: "Unity by design, and a question about whether that's fair." },
            { who: "Carol", text: "Strength that comes from refusing someone else's definition of you." },
          ],
          deep: "One reading: real unity is given, as the gods gave their weapons; unity that is engineered works, but costs trust. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d6-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "School",
      scenario: "A group in your class keeps mocking one student, every day. Several of you think it's wrong. Nobody has said anything yet.",
      deep: "The group is popular. Speaking up might make you their next target. And the student being mocked has never been friendly to you either.",
      prompt: "What would you do?",
      options: [
        {
          id: "quiet",
          label: "Stay out of it",
          perspectives: [
            { label: "What it protects", text: "You, for now. It isn't your fight." },
            { label: "What it risks", text: "The wrong carries on, and the group learns no one will stop them." },
            { label: "Question", text: "Is staying silent a choice too?" },
          ],
        },
        {
          id: "alone",
          label: "Speak up on your own, right away",
          perspectives: [
            { label: "What it protects", text: "The student, and your own sense of what's right." },
            { label: "What it risks", text: "Standing alone is hard, and they might turn on you." },
            { label: "Question", text: "Does courage have to be lonely?" },
          ],
        },
        {
          id: "together",
          label: "Find the others who think it's wrong, and speak up together",
          perspectives: [
            { label: "What it protects", text: "The student, and each of you: it's harder to mock a group." },
            { label: "What it risks", text: "It takes time, and someone has to go first." },
            { label: "Question", text: "Who would you ask first? Would a teacher be one of them?" },
          ],
        },
      ],
      closing: "Alone, each god had lost. Together they gave their strength to one who could win. Courage is refusing to accept a wrong, and it's strongest when it's shared.",
      talk: [
        "When have you seen someone stand up for someone else?",
        "Has anyone ever underestimated you? What did you do?",
        "Parents: when did you find the courage to stand up for something?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "d6-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "What is worth standing up for, even when others underestimate you?",
      younger: "Alone, the gods couldn't beat Mahisha. When is something easier to stand up to together?",
      older: "Fury lied to bring the team together. Was he right to?",
      takeaway: "When something is wrong, stand up to it, and stand together.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "The gods' radiance becoming the Devi, and their gifts of weapons, are in chapter 2 of the Devi Mahatmya; the battle with Mahishasura is chapter 3. In chapter 11 the gods praise her as Katyayani.",
        "Mahisha's boon, that only a woman could kill him, and his marriage proposal come from the Devi Bhagavata Purana (Book 5).",
        "The Vamana Purana says she appeared in the hermitage of the sage Katyayana; the Kalika Purana says Katyayana was the first to worship her. In the Bhagavata Purana (10.22), the young women of Vraja worship Katyayani for a month, hoping for Krishna as a husband.",
        "The Devi Mahatmya (ch. 1) says she is eternal and appears whenever she is needed. The gods' light is the occasion of her appearing, not her maker.",
      ],
    },
    {
      title: "When is the battle remembered?",
      paragraphs: [
        "Traditions differ on the day. In many places, including Bengal's Durga Puja, Mahishasura's defeat is celebrated later in the festival, with victory on Vijayadashami. If that's your tradition, keep tonight on courage and return to the battle at the end.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [DM2, DM3, DM11, DBP5, KATY, AVENGERS, CAPTAIN],
};
