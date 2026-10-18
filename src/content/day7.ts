// ---------------------------------------------------------------------------
// Day 7: Kalaratri
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 7).
//
// Source note: two different teachings meet in this form, and we keep them
// apart. (1) The fearsome form that protects: Kalaratri's iconography comes
// from devotional verses; she is called Shubhankari, "the auspicious one";
// "Kalaratri" appears among the goddess's names in the Devi Mahatmya's
// opening hymn (ch. 1); the Vedic Ratri Sukta (Rig Veda 10.127) praises Night
// as a protecting goddess. (2) Raktabija (Devi Mahatmya ch. 8), linked to her
// through Kali, who springs from the Devi's brow in ch. 7. Kali and Kalaratri
// are often treated as one, but not by everyone. The Ratri Sukta lines below
// are our own plain-English rendering.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const RATRI = { label: "Rig Veda 10.127, the Ratri Sukta (our own rendering)", url: "https://sacred-texts.com/hin/rigveda/rv10127.htm" };
const KAL = { label: "Kalaratri: iconography, the name Shubhankari, and links with Kali", url: "https://en.wikipedia.org/wiki/Kalaratri" };
const DM7 = { label: "Devi Mahatmya ch. 7: Kali springs from the Devi's brow", url: "https://en.wikipedia.org/wiki/Devi_Mahatmya" };
const DM8 = { label: "Devi Mahatmya ch. 8: Raktabija", url: "https://en.wikipedia.org/wiki/Raktabija" };
const STRANGE = { label: "Doctor Strange (2016)", url: "https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film)", note: "Dialogue paraphrased." };
const WEREWOLF = { label: "Werewolf by Night (2022), Disney+ special", url: "https://en.wikipedia.org/wiki/Werewolf_by_Night_(TV_special)", note: "Rated TV-14. Dialogue paraphrased." };

export const day7: DayContent = {
  day: 7,
  name: "Kalaratri",
  devanagari: "कालरात्रि",
  meaning: "The dark night",
  theme: "Fearlessness",
  question: "How can you face something frightening without becoming part of it?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d7-enter",
      type: "story",
      section: "enter",
      title: "Night seven",
      kind: "interpretation",
      visual: "d7Opening",
      sound: { mood: "ratri", cues: [{ at: 1.0, hit: "bellSoft" }] },
      duration: 12,
      sources: [KAL],
      captions: [
        { at: 0.6, text: "Night seven. Tonight's form is Kalaratri: the darkest and fiercest of the nine." },
        {
          at: 3.8,
          text: "Kala can mean black, or time, or death. Ratri means night. So her name is \"the dark night\", or \"the night of time\".",
          deep: "\"Kalaratri\" already appears among the goddess's names in the opening hymn of the Devi Mahatmya (ch. 1).",
        },
        { at: 8.0, text: "And yet she has another name: Shubhankari, the one who does good. Tonight is about how both can be true." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d7-night",
      type: "story",
      section: "story",
      title: "Night, who keeps watch",
      kind: "tradition",
      visual: "d7Night",
      sound: { mood: "ratri", cues: [{ at: 4.0, hit: "shimmer" }, { at: 9.0, hit: "bellSoft" }] },
      duration: 14,
      sources: [RATRI],
      captions: [
        { at: 0.5, text: "Long before Navaratri, a Rig Veda hymn sang to Night as a goddess." },
        { at: 3.6, text: "\"Night comes, looking out with all her eyes. She fills the valleys and the heights. With her own light she drives back the dark.\"" },
        {
          at: 8.4,
          text: "\"Keep away the wolf and the thief, Night. Be easy for us to cross.\"",
          deep: "Rig Veda 10.127, the Ratri Sukta, in our own words. In the hymn, Night is the sister of Dawn, and she brings travellers safely through.",
        },
      ],
    },
    {
      id: "d7-form",
      type: "story",
      section: "story",
      title: "The form that frightens",
      kind: "interpretation",
      visual: "d7Form",
      sound: { mood: "fierce", cues: [{ at: 3.0, hit: "thunder" }, { at: 9.4, mood: "ratri" }, { at: 9.4, hit: "bell" }] },
      duration: 14,
      sources: [KAL],
      captions: [
        { at: 0.5, text: "Kalaratri is pictured dark as night, her hair loose and wild. She has three eyes that flash like lightning, and flames come out with her breath." },
        { at: 4.6, text: "She rides a donkey, not a lion. In two hands she holds weapons." },
        { at: 9.4, text: "But look at her other two hands. One is raised: do not be afraid. One is open: I give." },
      ],
      freezes: [
        {
          at: 8.4,
          title: "First look",
          text: "This is the form of the Devi that people find most frightening.",
          think: "Would you be afraid of her?",
          options: [
            { label: "Yes", response: "Many people are, at first. Now look at her hands." },
            { label: "No", response: "Then you're already halfway to what devotees say about her. Look at her hands." },
          ],
          continueLabel: "Look at her hands",
        },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d7-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d7Form",
      visualTime: 13,
      sources: [KAL],
      framing: "weigh",
      prompt: "Why would a goddess who protects people look so frightening?",
      deepPrompt: "Her face terrifies; her hands say \"do not fear\". Who is the terror for?",
      options: [
        { id: "harm", label: "The fierceness is aimed at what harms", reasoning: "A guard dog looks scary to burglars, not to the family." },
        { id: "face", label: "To show that fear has to be faced", reasoning: "If you can look at her, you can look at what scares you." },
        { id: "honest", label: "Because protection isn't always gentle", reasoning: "Sometimes keeping someone safe takes a force that isn't pretty." },
      ],
      reveal: {
        title: "What devotees say",
        text: "She is called Shubhankari, \"the one who does good\". Devotees say she makes them fearless: her terror is turned towards what threatens them, and her hands bless and protect.",
        deep: "One way to put it: her terrifying face is the face that fearlessness wears when it confronts what should be feared. That is an interpretation, not a line from a text.",
        why: "The thing that looks most frightening may be the thing that protects you. Appearance and purpose are different questions.",
      },
    },

    // ================================================================ B STORY (continued)
    {
      id: "d7-raktabija",
      type: "story",
      section: "story",
      title: "The demon who multiplied",
      kind: "tradition",
      visual: "d7Raktabija",
      sound: {
        mood: "fierce",
        cues: [
          { at: 0.5, hit: "thunder" },
          { at: 5.4, hit: "boom" },
          { at: 7.0, hit: "boom" },
          { at: 8.4, hit: "boom" },
          { at: 11.6, hit: "whoosh" },
          { at: 14.6, hit: "bell" },
          { at: 14.6, mood: "ratri" },
        ],
      },
      duration: 18,
      sources: [DM7, DM8, KAL],
      captions: [
        {
          at: 0.5,
          text: "In a great battle against the demon brothers Shumbha and Nishumbha, Kali springs from the Devi's frowning forehead: dark, terrible, unstoppable.",
          deep: "Devi Mahatmya ch. 7. Kali and Kalaratri are often treated as one form, which is why this story is told tonight. Not every tradition makes that link.",
        },
        { at: 4.6, text: "Then comes the demon Raktabija. Every drop of his blood that touches the ground becomes another Raktabija." },
        { at: 7.6, text: "The harder the goddesses strike, the more of him there are." },
        {
          at: 11.8,
          text: "So Kali spreads herself wide, and catches every drop before it can reach the ground.",
          deep: "The text says she drinks the blood. The point is the same: she stops the harm before it can multiply.",
        },
        { at: 14.8, text: "With nothing left to multiply, Raktabija falls." },
      ],
      freezes: [
        {
          at: 10.6,
          title: "More and more",
          text: "Every blow makes the problem bigger.",
          think: "How would you stop him?",
          options: [
            { label: "Hit harder", response: "That's what the goddesses were doing, and it was making more of him. Watch." },
            { label: "Stop the drops reaching the ground", response: "Exactly where the story goes. Watch." },
          ],
          continueLabel: "See what Kali does",
        },
      ],
      parentNote:
        "The Devi Mahatmya says Kali drinks Raktabija's blood. We say she \"catches every drop\". With the older child you can talk about why the text chose such a shocking image.",
    },
    {
      id: "d7-dawn",
      type: "story",
      section: "story",
      title: "Night ends in dawn",
      kind: "interpretation",
      visual: "d7Dawn",
      sound: { mood: "ratri", cues: [{ at: 4.0, mood: "dawn" }, { at: 4.4, hit: "shimmer" }] },
      duration: 11,
      sources: [RATRI, KAL],
      captions: [
        { at: 0.5, text: "Kalaratri is the darkest night of the nine." },
        { at: 4.2, text: "But in the Rig Veda, Night is Dawn's sister. She brings everyone safely through to morning." },
        { at: 7.8, text: "After tonight, the nights grow lighter: Mahagauri, the radiant, is next." },
      ],
    },
    {
      id: "d7-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d7Emblems",
      sound: { mood: "ratri" },
      duration: 10,
      sources: [KAL],
      captions: [
        { at: 0.5, text: "Every detail of Kalaratri is fierce, except the ones that matter most to her devotees." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "eyes", label: "Three eyes", x: 800, y: 250, title: "Three eyes", text: "Three eyes, flashing like lightning. The third eye sees what ordinary sight misses.", kind: "interpretation", source: "Devotional iconography" },
        { id: "hair", label: "Loose hair", x: 650, y: 400, title: "Hair unbound", text: "Her hair is wild and loose, not tied or decorated: nothing about her is tamed for show.", kind: "interpretation" },
        { id: "breath", label: "Fiery breath", x: 930, y: 350, title: "Breath of fire", text: "Flames come with her breath. Fire burns, and also lights the dark.", kind: "interpretation" },
        { id: "abhaya", label: "Raised palm", x: 1080, y: 470, title: "Do not fear (abhaya)", text: "The fiercest goddess raises her hand in the gesture that says \"do not be afraid\".", kind: "interpretation" },
        { id: "varada", label: "Open palm", x: 1080, y: 620, title: "Giving (varada)", text: "Another hand is open in blessing. This is why she is called Shubhankari.", kind: "interpretation" },
        { id: "weapons", label: "Weapons", x: 520, y: 540, title: "Weapons", text: "Images vary: often a curved sword and a thunderbolt, sometimes a sickle or an iron hook.", kind: "interpretation", source: "Devotional iconography" },
        { id: "donkey", label: "Donkey", x: 800, y: 770, title: "The donkey", text: "Not a lion or a tiger: a humble, hardworking animal. Many readings see it as patience and endurance.", kind: "interpretation" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d7-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "Face the dark without becoming part of it.",
      deeper:
        "Kalaratri is the darkest form: unbound hair, three blazing eyes, fire on her breath. Yet she's called Shubhankari, \"the one who does good\", and her raised hand says \"do not fear\". Her fierceness is aimed at what harms, not at the people she protects. In the Raktabija story, every blow made the demon multiply. Kali didn't strike harder. She caught each drop before it reached the ground. Fearlessness, in this reading, isn't fighting the dark louder. It's facing it steadily, refusing to feed it, and not letting it change you.",
      connections: [
        { event: "Night keeps the wolf away.", meaning: "Darkness can protect.", jumpTo: "d7-night" },
        { event: "Fierce face, open hands.", meaning: "Appearance and purpose differ.", jumpTo: "d7-form" },
        { event: "Every drop becomes another demon.", meaning: "Some problems feed on being fought.", jumpTo: "d7-raktabija" },
      ],
      readings: [
        { kind: "tradition", label: "What the texts say", text: "The Ratri Sukta praises Night as a protector. In the Devi Mahatmya, Kali springs from the Devi's brow and stops Raktabija by catching his blood." },
        { kind: "interpretation", label: "A devotional reading", text: "Kalaratri destroys ignorance and fear. Worshipping her is said to make devotees fearless." },
        { kind: "contemporary", label: "Our reading", text: "Fearlessness is facing the dark steadily: not running from it, not feeding it, not letting it change you. This is our interpretation, offered to argue with." },
      ],
      invite: "Look for both ideas in the next two scenes: a problem that grows when you fight it, and a frightening shape that protects.",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "ds-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "I've come to bargain",
      kind: "marvel",
      role: "primary",
      roleNote: "An enemy no amount of force can beat, so Strange changes the shape of the fight.",
      film: "Doctor Strange",
      year: 2016,

      rating: "PG-13",
      character: "Stephen Strange and Dormammu",
      scene: "Strange enters the Dark Dimension and traps Dormammu in a time loop.",
      context:
        "Dormammu, a being of limitless power, is swallowing Earth into his Dark Dimension. The sorcerers can't stop him. Strange holds the Eye of Agamotto, which can control time.",
      find: {
        where: "The climax of the film, in Hong Kong, when Strange flies into the Dark Dimension.",
        search: "Doctor Strange Dormammu I've come to bargain",
      },
      watchFor: ["What Strange says each time he arrives.", "What Dormammu keeps doing to him.", "Why Mordo walks away at the end."],
      sources: [STRANGE],
    },
    {
      id: "ds-loop",
      type: "story",
      section: "marvel",
      title: "Again",
      kind: "marvel",
      visual: "d7Loop",
      sound: { mood: "filmTension", cues: [{ at: 3.0, hit: "boom" }, { at: 5.6, hit: "boom" }, { at: 7.8, hit: "boom" }, { at: 9.6, hit: "boom" }] },
      duration: 13,
      sources: [STRANGE],
      captions: [
        { at: 0.5, text: "Strange flies into the Dark Dimension and tells Dormammu he has come to bargain." },
        { at: 3.2, text: "Dormammu destroys him instantly. And Strange is back, saying the same words." },
        { at: 6.4, text: "He has bound this moment into an endless loop. Dormammu kills him again. And again. And again." },
      ],
      freezes: [
        {
          at: 11.0,
          title: "Infinite power, one moment",
          text: "Dormammu can win every fight. But every win puts him back in the same moment.",
          deep: "Like Raktabija's blood: every blow Dormammu lands just brings back another Strange.",
        },
      ],
    },
    {
      id: "ds-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d7Loop",
      visualTime: 11,
      sources: [STRANGE],
      framing: "will",
      prompt: "How do you think this ends?",
      options: [
        { id: "power", label: "Strange finds a way to overpower him", reasoning: "Heroes usually win the fight in the end." },
        { id: "quit", label: "Strange gives up", reasoning: "No one could take that many deaths." },
        { id: "bargain", label: "Dormammu gives in", reasoning: "Infinite power is no use if you're stuck in one moment forever." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Dormammu, trapped in a moment that never ends, agrees to Strange's bargain: he will leave Earth and take his followers with him, if Strange breaks the loop.",
        why: "Strange never wins the fight. He changes what the fight is.",
      },
    },
    {
      id: "ds-mordo",
      type: "story",
      section: "marvel",
      title: "The bill comes due",
      kind: "marvel",
      visual: "d7Mordo",
      sound: { mood: "filmLament" },
      duration: 11,
      sources: [STRANGE],
      captions: [
        { at: 0.5, text: "Earth is saved. But Strange's friend Mordo is horrified." },
        { at: 4.0, text: "Strange broke the laws of nature with time itself. Mordo believes every broken rule has a price, and someone always pays it." },
        { at: 7.8, text: "Mordo walks away from the sorcerers." },
      ],
    },
    {
      id: "ds-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Strange",
      kind: "comparison",
      turningPoint: "Strange accepting death after death: victory through endurance and changing the rules, not strength.",
      connection:
        "Raktabija can't be beaten by more blows; Dormammu can't be beaten by more force. Both are solved by changing the shape of the fight. But Kali's answer is direct and ferocious; Strange's is clever, and Mordo says it has a cost.",
      ladder: [
        { level: "notice", text: "What does Strange say every single time he comes back?" },
        { level: "feel", text: "How do you think Strange felt the hundredth time?" },
        {
          level: "wonder",
          text: "Why couldn't Dormammu win, if he was so much more powerful?",
          followUps: [{ ifTheySay: "He was trapped", ask: "Who trapped him: Strange, or Dormammu's own way of fighting?" }],
        },
        {
          level: "stretch",
          text: "Strange won by breaking natural law, and Mordo thought that was wrong. Was Mordo right?",
          deep: "If breaking a rule saves the world, does the rule still matter? Who decides when an exception is allowed, and what happens when everyone makes their own?",
          followUps: [{ ifTheySay: "No, Strange saved everyone", ask: "Mordo later decides there are too many sorcerers breaking rules. Where would you draw the line?" }],
        },
        { level: "flip", text: "What if Strange had kept fighting with spells and weapons?" },
        { level: "connect", text: "Kali stops the blood before it hits the ground. What did Strange stop?" },
      ],
      stance: {
        statement: "Breaking the rules is fine if it saves people.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Name one rule you'd never break, even to save someone. Is there one?",
      },
      activity: {
        title: "Raktabija problems",
        minutes: 8,
        steps: [
          "Together, list three problems that get bigger when you fight them head-on: a rumour, an argument, an itch…",
          "For each, what is the \"blood\" that spreads it?",
          "What would \"catching the drops\" look like for each one?",
          "Pick one you're dealing with now. What's one way to change its shape?",
        ],
      },
      sources: [STRANGE],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "w-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "The monster who remembered",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A terrifying form that protects a friend, and polished people who turn out to be the real monsters.",
      film: "Werewolf by Night",
      year: 2022,

      rating: "TV-14",
      character: "Jack Russell, Elsa Bloodstone and Ted",
      scene: "The hunt at Bloodstone Manor, and the cage.",
      context:
        "Monster hunters gather at Bloodstone Manor to hunt a captured creature for a powerful relic, the Bloodstone. One hunter, Jack Russell, is secretly a werewolf who has come to rescue his friend Ted, the creature being hunted. Elsa, the estranged daughter of the house, wants the relic. They agree to help each other.",
      find: {
        where: "A 53-minute Disney+ special. The cage scene is in the last third; there is also a colour version.",
        search: "Werewolf by Night",
      },
      parentNote:
        "This is a horror special, rated TV-14, with more violence than ordinary Marvel films, including a werewolf attacking guards. Preview it first. For an 11-year-old you may prefer to skip the viewing and use the retelling here, or Kalaratri's own images.",
      watchFor: ["Who the \"monsters\" are at the start.", "What Jack asks Elsa to do before he changes.", "What the werewolf does when he reaches her."],
      sources: [WEREWOLF],
    },
    {
      id: "w-hunt",
      type: "story",
      section: "marvel",
      title: "The hunters",
      kind: "marvel",
      visual: "d7Manor",
      sound: { mood: "filmNight", cues: [{ at: 8.2, hit: "heartbeat" }] },
      duration: 12,
      sources: [WEREWOLF],
      captions: [
        { at: 0.5, text: "Elegant hunters in a grand old manor, all eager to kill a creature for a prize." },
        { at: 4.2, text: "In the maze, Jack finds Ted and frees him. Ted is huge and strange, and gentle with his friend." },
        { at: 8.2, text: "When Jack tries to pick up the Bloodstone for Elsa, it throws him back, revealing that he is a monster. The hunters turn on him." },
      ],
    },
    {
      id: "w-cage",
      type: "story",
      section: "marvel",
      title: "The cage",
      kind: "marvel",
      visual: "d7Cage",
      sound: { mood: "filmTension", cues: [{ at: 4.2, hit: "heartbeat" }, { at: 6.8, hit: "thunder" }, { at: 6.8, mood: "filmStruggle" }] },
      duration: 13,
      sources: [WEREWOLF],
      captions: [
        { at: 0.5, text: "The lady of the house, Verussa, locks Jack and Elsa in a cage together and forces his change, expecting the werewolf to kill Elsa." },
        { at: 4.2, text: "Before he changes, Jack tells Elsa not to break eye contact, and breathes in her scent so the wolf might remember her." },
        { at: 6.8, text: "The werewolf breaks loose and tears into everyone near him. Then he turns to Elsa." },
      ],
      freezes: [
        {
          at: 10.8,
          title: "Face to face",
          text: "The monster stands over Elsa.",
          deep: "Everything in the room says this creature is a killer. Everything in the story so far says Jack is a friend.",
        },
      ],
    },
    {
      id: "w-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d7Cage",
      visualTime: 10.8,
      sources: [WEREWOLF],
      framing: "will",
      prompt: "What do you think the werewolf does?",
      options: [
        { id: "attack", label: "Attacks her: the monster takes over", reasoning: "That's what Verussa is counting on." },
        { id: "flee", label: "Runs away", reasoning: "Maybe some part of Jack wants to keep her safe by leaving." },
        { id: "spare", label: "Recognises her and spares her", reasoning: "Jack tried to make sure the wolf would remember her. Maybe it does." },
      ],
      reveal: {
        title: "What happens in the special",
        text: "The werewolf recognises Elsa and leaves her unharmed, then escapes. When Verussa tries to shoot Elsa, Ted returns and stops Verussa for good. The next morning Jack wakes as himself, and Elsa is safe.",
        why: "The most frightening shape in the room protected his friend. The cruelty came from the people who looked civilised.",
      },
    },
    {
      id: "w-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Jack and Ted",
      kind: "comparison",
      turningPoint: "The werewolf standing over Elsa, and recognising her. The monster's loyalty holds.",
      connection:
        "A terrifying form that protects friends and destroys cruelty, as Kalaratri's form is fierce towards harm. But Jack's form is a curse he can barely control; Kalaratri's is deliberate and divine. The special is horror entertainment; Kalaratri is worshipped.",
      ladder: [
        { level: "notice", text: "Who looked like the monsters at the start? Who acted like monsters?" },
        { level: "feel", text: "How do you think Elsa felt when the werewolf stood over her?" },
        { level: "wonder", text: "Why did the werewolf remember Elsa?" },
        {
          level: "stretch",
          text: "Kalaratri looks scary but is called \"the auspicious one\". Can something that looks frightening be the thing that keeps people safe?",
          deep: "Jack couldn't fully control his form; Kalaratri's fierceness is chosen. Does it matter whether a protector chooses to be frightening?",
        },
        { level: "flip", text: "What if Jack had looked completely ordinary, and the hunters had looked like monsters? Would the story mean the same?" },
        { level: "connect", text: "Kalaratri's hands say \"do not fear\". What was the werewolf's version of that?" },
      ],
      stance: {
        statement: "You can tell a lot about someone from how they look.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Each person: one time a first impression was wrong, either way.",
      },
      activity: {
        title: "Scary but safe",
        minutes: 5,
        steps: [
          "Each person names something that looks frightening but keeps people safe: a guard dog, a firefighter's mask, a vaccination needle…",
          "Then something that looks friendly but isn't safe.",
          "What clues do you actually use to tell the difference?",
          "Look again at Kalaratri's hands. What is the clue there?",
        ],
      },
      sources: [WEREWOLF],
    },

    // ================================================================ F COMPARE
    {
      id: "d7-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "A demon who multiplies with every blow is stopped when Kali catches every drop; a fearsome goddess blesses with open hands.",
          traditionJump: "d7-raktabija",
          marvel: [
            { who: "Strange", text: "An unbeatable enemy is stopped by an endless loop, not a bigger blow.", jumpTo: "ds-loop" },
            { who: "Jack and Ted", text: "Two \"monsters\" turn out to be the protectors; the polished hunters are the danger.", jumpTo: "w-cage" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "Which story fits which teaching?",
          tradition: "Face what frightens you without feeding it or becoming it; don't judge a protector by her face.",
          marvel: [
            { who: "Strange", text: "Force made things worse; changing the rules worked." },
            { who: "Jack and Ted", text: "The frightening form held its loyalty." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which of these is a choice, and which is a curse?",
          tradition: "Kali's answer is direct and fierce; Kalaratri's form is deliberate and divine.",
          marvel: [
            { who: "Strange", text: "Clever and passive, and Mordo says it broke something." },
            { who: "Jack and Ted", text: "Jack's form is a curse he can barely control." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Fierceness and harm are not the same thing. Some of the fiercest acts stop harm from spreading.",
          marvel: [
            { who: "Strange", text: "Enduring can be fiercer than hitting." },
            { who: "Jack and Ted", text: "Fear is often aimed at the wrong thing." },
          ],
          deep: "One reading: Raktabija and the werewolf are the same lesson from two sides: look at what something does, not how it looks or how loudly you can fight it. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d7-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "School",
      scenario: "Someone starts a silly rumour about you. Every time you deny it, more people hear about it.",
      deep: "You know who started it. Some of your friends want you to \"destroy\" them online.",
      prompt: "What would you do?",
      options: [
        {
          id: "deny",
          label: "Deny it loudly to everyone",
          perspectives: [
            { label: "What it protects", text: "Your reputation, as far as you can reach." },
            { label: "What it risks", text: "Raktabija: every denial spreads the rumour further." },
            { label: "Question", text: "Who hadn't heard it until you denied it?" },
          ],
        },
        {
          id: "hit",
          label: "Hit back at the person who started it",
          perspectives: [
            { label: "What it protects", text: "Your pride, and maybe a warning to others." },
            { label: "What it risks", text: "Now there are two rumours, and a feud." },
            { label: "Question", text: "Does hitting back stop it, or feed it?" },
          ],
        },
        {
          id: "catch",
          label: "Tell the people who matter, then stop feeding it",
          perspectives: [
            { label: "What it protects", text: "Your real friends know the truth; the rumour has nothing to grow on." },
            { label: "What it risks", text: "It feels unfair to let it fade instead of winning." },
            { label: "Question", text: "Who are the people who matter? Is a teacher one of them?" },
          ],
        },
      ],
      closing: "Raktabija grew with every blow. Kali caught the drops; Strange changed the fight. Facing the dark doesn't mean becoming part of it.",
      talk: [
        "Have you ever made a problem bigger by fighting it?",
        "What's something that looked scary to you once but turned out to be safe?",
        "Parents: what's one argument you've learned not to feed?",
      ],
    },

    // ================================================================ H REFLECT
    {
      id: "d7-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "How can you face something frightening without becoming part of it?",
      younger: "Kalaratri looks scary but is called \"the auspicious one\". Can you think of something that looks scary but keeps people safe?",
      older: "Strange won by breaking natural law, and Mordo thought that was wrong. Was Mordo right?",
      takeaway: "Face the dark without becoming part of it.",
    },
  ],

  context: [
    {
      title: "Where tonight's stories come from",
      paragraphs: [
        "Kalaratri's form (dark, three-eyed, fiery-breathed, riding a donkey, with hands of fearlessness and blessing) comes from devotional verses; images vary in the weapons she holds. She is called Shubhankari, \"the auspicious one\". \"Kalaratri\" appears among the goddess's names in the Devi Mahatmya's opening hymn.",
        "The Ratri Sukta (Rig Veda 10.127) praises Night as a goddess who watches with all her eyes, drives back the dark and keeps away wolves and thieves. The lines in the app are our own plain-English rendering.",
        "Kali springs from the Devi's brow in Devi Mahatmya ch. 7; the Raktabija battle is ch. 8. Kali and Kalaratri are often treated as one, which is why the Raktabija story is told on this night, but not every tradition makes the link.",
      ],
    },
    {
      title: "About the second scene",
      paragraphs: [
        "Werewolf by Night is a horror special rated TV-14. The retelling in the app leaves out the violence. Preview it before deciding whether to watch it with your younger child.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [RATRI, KAL, DM7, DM8, STRANGE, WEREWOLF],
};
