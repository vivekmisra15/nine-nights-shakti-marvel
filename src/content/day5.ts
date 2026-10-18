// ---------------------------------------------------------------------------
// Day 5: Skandamata
// Content source: "Navaratri × Marvel V2: Ideas, Scenes and Insights" (Day 5).
//
// Source note: Skanda's birth is told, with variations, in Kalidasa's
// Kumarasambhava, the Shiva Purana (Rudra Samhita, Kumara Khanda) and the
// Skanda Purana. Who carries the spark (Agni, Ganga, the reeds) and how the
// six Krittikas and Parvati are involved differ between tellings; we follow a
// common combined version and say so. The gift of the vel is Tamil tradition
// (Murugan), celebrated at Thaipusam.
// ---------------------------------------------------------------------------

import type { DayContent } from "./types";

const SHIVA_P = { label: "Shiva Purana, Rudra Samhita, Kumara Khanda", url: "https://en.wikipedia.org/wiki/Kartikeya" };
const KUMARA = { label: "Kalidasa, Kumarasambhava (The Birth of Kumara)", url: "https://en.wikipedia.org/wiki/Kum%C4%81rasambhava" };
const SKANDA_BRIT = { label: "Britannica: Skanda", url: "https://www.britannica.com/topic/Skanda" };
const VEL = { label: "The vel in Tamil tradition, and Thaipusam", url: "https://en.wikipedia.org/wiki/Vel" };
const ICON5 = { label: "Skandamata: iconography and meditation verse (brhat.in)", url: "https://brhat.in/dhiti/skandamata" };
const ENDGAME = { label: "Avengers: Endgame (2019)", url: "https://en.wikipedia.org/wiki/Avengers:_Endgame", note: "Dialogue paraphrased." };
const HOMECOMING = { label: "Spider-Man: Homecoming (2017)", url: "https://en.wikipedia.org/wiki/Spider-Man:_Homecoming", note: "Dialogue paraphrased." };

export const day5: DayContent = {
  day: 5,
  name: "Skandamata",
  devanagari: "स्कन्दमाता",
  meaning: "Mother of Skanda",
  theme: "Nurture",
  question: "When does protecting someone start holding them back?",

  beats: [
    // ================================================================ A ENTER
    {
      id: "d5-enter",
      type: "story",
      section: "enter",
      title: "Night five",
      kind: "interpretation",
      visual: "d5Opening",
      sound: { mood: "lullaby", cues: [{ at: 1.0, hit: "bellSoft" }] },
      duration: 12,
      sources: [ICON5],
      captions: [
        { at: 0.6, text: "Night five. Tonight's form is Skandamata: the mother of Skanda." },
        {
          at: 3.6,
          text: "Skanda is the warrior-god also known as Kartikeya, Kumara, and in Tamil Nadu as Murugan.",
          deep: "He is one of the most widely worshipped gods in South India, Sri Lanka, Malaysia and Singapore, where Thaipusam is a major festival.",
        },
        { at: 7.6, text: "She is the form of the nine pictured with a child on her lap. Tonight's story is about raising someone who will one day have to go." },
      ],
    },

    // ================================================================ B STORY
    {
      id: "d5-taraka",
      type: "story",
      section: "story",
      title: "A demon only a child can stop",
      kind: "tradition",
      visual: "d5Taraka",
      sound: { mood: "menace", cues: [{ at: 0.4, hit: "thunder" }, { at: 6.0, hit: "boom" }] },
      duration: 13,
      sources: [SHIVA_P, KUMARA],
      captions: [
        { at: 0.6, text: "Remember Parvati's long tapas on Night Two? This is why the gods needed it to succeed." },
        {
          at: 4.0,
          text: "A demon named Taraka had won a boon: only a son of Shiva could defeat him. And Shiva, grieving Sati, was lost in meditation.",
          deep: "Taraka chose this boon because Shiva seemed unlikely ever to have a child. Boons with loopholes are a common pattern in these stories.",
        },
        { at: 8.6, text: "So Taraka drove the gods out of heaven, and waited." },
      ],
    },
    {
      id: "d5-sparks",
      type: "story",
      section: "story",
      title: "A spark too bright to hold",
      kind: "tradition",
      visual: "d5Sparks",
      sound: { mood: "creation", cues: [{ at: 2.0, hit: "shimmer" }, { at: 6.4, hit: "whoosh" }, { at: 9.6, hit: "shimmer" }] },
      duration: 14,
      sources: [SHIVA_P, KUMARA, SKANDA_BRIT],
      captions: [
        { at: 0.5, text: "After Shiva and Parvati were married, a blazing seed of Shiva's energy came forth, too fierce for anyone to hold." },
        {
          at: 4.4,
          text: "The fire god Agni carried it, until it burned him. He gave it to the river Ganga, who carried it until she could not either.",
          deep: "The tellings differ here: who carries the spark, for how long, and why. We follow a common combined version.",
        },
        { at: 9.0, text: "She left it in a forest of reeds on her bank. There the spark became six baby boys." },
      ],
      slow: { from: 4.4, to: 9.0, rate: 0.35, prompt: "Watch how many hands this spark passes through before it becomes a child. Who looks after it at each stage?" },
    },
    {
      id: "d5-mothers",
      type: "story",
      section: "story",
      title: "Six mothers",
      kind: "tradition",
      visual: "d5Mothers",
      sound: { mood: "lullaby", cues: [{ at: 3.0, hit: "bellSoft" }] },
      duration: 12,
      sources: [SHIVA_P, SKANDA_BRIT],
      captions: [
        { at: 0.5, text: "Six star-women, the Krittikas (the stars we call the Pleiades), found the babies and nursed them." },
        { at: 4.6, text: "That is why he is called Kartikeya: the one raised by the Krittikas." },
        { at: 8.0, text: "A child of fire, carried by a river, born in reeds, raised by stars. Many hands had already cared for him." },
      ],
    },
    {
      id: "d5-gathered",
      type: "story",
      section: "story",
      title: "Gathered in",
      kind: "tradition",
      visual: "d5Gathered",
      sound: { mood: "lullaby", cues: [{ at: 4.2, hit: "shimmer" }, { at: 4.2, hit: "bell" }] },
      duration: 13,
      sources: [SHIVA_P, KUMARA],
      captions: [
        { at: 0.5, text: "Then Parvati came to the reed forest." },
        {
          at: 3.4,
          text: "She took the six babies into her arms, and as she held them close, they became one child with six faces: Shanmukha, \"six-faced\".",
          deep: "In some tellings, Parvati embraces the six so tightly they merge. In others, she simply claims and raises them. This is the moment Skandamata is remembered for.",
        },
        { at: 8.6, text: "She raised him as her own." },
      ],
      freezes: [
        {
          at: 7.0,
          title: "Six faces",
          text: "One child who sees in every direction at once.",
          think: "Why might a story give its hero six faces?",
          options: [
            { label: "To remember all six mothers", response: "A lovely reading: he carries every person who raised him." },
            { label: "To see everything at once", response: "A common reading too: a leader who sees in every direction. Both can be true." },
          ],
        },
      ],
    },

    // ================================================================ C CHOICE
    {
      id: "d5-choice",
      type: "choice",
      section: "choice",
      title: "Your turn",
      kind: "interpretation",
      visual: "d5Gathered",
      visualTime: 11,
      sources: [SHIVA_P, KUMARA],
      framing: "weigh",
      prompt: "Skanda is still very young. The gods ask him to lead their whole army against Taraka. If you were Parvati, would you let him go?",
      deepPrompt: "He was born for this. He is also your child. Which matters more, and who gets to decide?",
      options: [
        { id: "keep", label: "Keep him home: he's too young", reasoning: "Protecting a child from danger is the most natural instinct there is." },
        { id: "go", label: "Let him go: it's who he is", reasoning: "He was born for this task, and the world needs him. Holding him back could cost everyone." },
        { id: "prepare", label: "Let him go, but prepare him first", reasoning: "Love can mean giving someone what they'll need, not keeping them from the road." },
      ],
      reveal: {
        title: "What the story tells",
        text: "Skanda becomes the commander of the gods' army, and defeats Taraka. His mother doesn't hold him back; she sends him out, and, as Tamil tradition tells, she arms him.",
        why: "In this story, a mother's love is measured by what it makes possible for the child, not by how close it keeps him.",
      },
      hypothetical: {
        title: "Imagine: she keeps him home",
        text: "Taraka would still rule the heavens, and the gods would still be exiles. And Skanda would never discover what he was for. This branch is ours, to help you think. It is not in any source.",
      },
      parentNote: "Some children may find a young child going to war unsettling. You can frame it as Skanda being a god who grows up very fast, which is how the texts describe him.",
    },

    // ================================================================ B STORY (continued)
    {
      id: "d5-vel",
      type: "story",
      section: "story",
      title: "The spear",
      kind: "tradition",
      visual: "d5Vel",
      sound: { mood: "march", cues: [{ at: 3.6, hit: "shimmer" }, { at: 3.6, hit: "bell" }, { at: 9.0, hit: "boom" }] },
      duration: 13,
      sources: [VEL, SKANDA_BRIT],
      captions: [
        { at: 0.5, text: "In Tamil tradition, before Murugan (Skanda) goes to fight the demon Surapadman, Parvati gives him a gift: the vel, a shining spear." },
        {
          at: 4.6,
          text: "The vel is said to hold her own power. With it, he defeats the demon.",
          deep: "Thaipusam, celebrated by Tamil communities around the world, commemorates the day Parvati gave Murugan the vel. In northern tellings, the main enemy is Taraka.",
        },
        { at: 9.2, text: "She doesn't fight for him. She gives him what he needs to fight for himself." },
      ],
    },
    {
      id: "d5-emblems",
      type: "story",
      section: "story",
      title: "How she is pictured",
      kind: "interpretation",
      visual: "d5Emblems",
      sound: { mood: "lullaby" },
      duration: 10,
      sources: [ICON5],
      captions: [
        { at: 0.5, text: "Skandamata sits on a lotus, with the child Skanda on her lap. She has four arms and rides a lion." },
        { at: 5.0, text: "Select each detail to look closer." },
      ],
      hotspots: [
        { id: "child", label: "The child", x: 800, y: 560, title: "Skanda on her lap", text: "The child sits on her lap, not hidden behind her. Close, but facing outward, towards the world he will go into.", kind: "interpretation" },
        { id: "lotuses", label: "Two lotuses", x: 560, y: 360, title: "Two lotuses", text: "Two of her hands hold lotuses: flowers that grow up out of mud into light. A common image for growth.", kind: "interpretation", source: "Devotional verse" },
        { id: "boon", label: "Open palm", x: 1040, y: 440, title: "The boon-giving hand", text: "One hand is open in the gesture of giving: the varada mudra. She is shown giving, not holding.", kind: "interpretation" },
        { id: "seat", label: "Lotus seat", x: 800, y: 780, title: "Seated on a lotus", text: "She is sometimes called Padmasana, the one seated on a lotus. She is pictured calm, unhurried.", kind: "interpretation" },
        { id: "lion", label: "Lion", x: 1300, y: 740, title: "The lion", text: "Like Durga, she rides a lion. The gentle mother is also fierce when she needs to be.", kind: "interpretation" },
      ],
    },

    // ================================================================ D IDEA
    {
      id: "d5-idea",
      type: "idea",
      section: "idea",
      title: "What the story is about",
      kind: "contemporary",
      simple: "True care helps someone grow strong enough to go their own way.",
      deeper:
        "Skanda's story is full of carers: a fire god, a river, six star-mothers, and Parvati. Each carries him for a while; none of them keeps him. Parvati gathers him close, and then, when the gods need him, she sends him out. In Tamil tradition she arms him with the vel, a spear holding her own power. She's pictured with the child on her lap, facing outward towards the world. Nurture here means both holding close and getting ready to let go. Good care prepares someone to need you less.",
      connections: [
        { event: "The spark passes from hand to hand.", meaning: "Many people care for a child, each for a time.", jumpTo: "d5-sparks" },
        { event: "Parvati gathers six into one.", meaning: "Love that holds a person together.", jumpTo: "d5-gathered" },
        { event: "She gives him the vel.", meaning: "Love that equips, not only protects.", jumpTo: "d5-vel" },
      ],
      readings: [
        { kind: "tradition", label: "What the texts tell", text: "Skanda is born to defeat Taraka, raised by the Krittikas and Parvati, and leads the gods' army to victory." },
        { kind: "interpretation", label: "A devotional reading", text: "Skandamata is worshipped as the loving mother; worshipping her is said to bring the blessing of the child Skanda too." },
        { kind: "contemporary", label: "Our reading", text: "Good care prepares someone to need you less. This is our interpretation, offered to argue with." },
      ],
      invite: "Hold this question for the next two scenes: is it harder to protect someone, or to let them go?",
    },

    // ================================================================ E MARVEL: scene 1
    {
      id: "f-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "A mother who already knows",
      kind: "marvel",
      role: "primary",
      roleNote: "A mother who could hold her son back, and chooses to send him on instead.",
      film: "Avengers: Endgame",
      year: 2019,

      rating: "PG-13",
      character: "Thor and Frigga",
      scene: "Thor travels back in time to Asgard and talks with his mother Frigga on the balcony.",
      context:
        "Thor is grieving and lost after failing to stop Thanos. On a mission into the past, he unexpectedly meets his mother Frigga, who died years earlier, on the day of her death.",
      find: {
        where: "The middle of the film, during the time-travel mission: Thor's trip to Asgard in 2013.",
        search: "Avengers Endgame Thor Frigga",
      },
      watchFor: ["How quickly Frigga realises who this Thor is.", "What Thor tries to tell her.", "What she tells him instead."],
      sources: [ENDGAME],
    },
    {
      id: "f-meet",
      type: "story",
      section: "marvel",
      title: "The balcony",
      kind: "marvel",
      visual: "d5Asgard",
      sound: { mood: "filmLament", cues: [{ at: 4.0, mood: "filmWonder" }] },
      duration: 13,
      sources: [ENDGAME],
      captions: [
        { at: 0.5, text: "Frigga sees at once that this Thor is from the future, and that he is hurting." },
        { at: 4.2, text: "She listens. She tells him that everyone fails at who they are supposed to be, and that the measure of a person is how well they succeed at being who they are." },
        { at: 8.4, text: "Thor realises this is the day she dies. He starts to warn her." },
      ],
      freezes: [
        {
          at: 10.4,
          title: "The warning",
          text: "Thor is about to tell his mother how to avoid her death.",
          deep: "Frigga is wise enough to guess what he's about to say. She could take the warning and change her fate. Her son could keep her.",
        },
      ],
    },
    {
      id: "f-choice",
      type: "choice",
      section: "marvel",
      title: "Predict",
      kind: "marvel",
      visual: "d5Asgard",
      visualTime: 10.4,
      sources: [ENDGAME],
      framing: "will",
      prompt: "What do you think Frigga does?",
      options: [
        { id: "listen", label: "She listens, to save herself", reasoning: "Anyone would want to know how to avoid their own death." },
        { id: "stop", label: "She stops him", reasoning: "You sense she cares more about his path than her own." },
        { id: "keep", label: "She asks him to stay with her", reasoning: "Mothers want their children close, especially after hardship." },
      ],
      reveal: {
        title: "What happens in the film",
        text: "Frigga stops him. She tells him that her fate is hers, and that he must go back and do what he came to do: to be who he is. Thor leaves, and as he goes, he summons his old hammer to his hand. It still answers him.",
        why: "Frigga's love shows itself by sending him back to his own task, not by keeping him with her.",
      },
    },
    {
      id: "f-hammer",
      type: "story",
      section: "marvel",
      title: "Still worthy",
      kind: "marvel",
      visual: "d5Hammer",
      sound: { mood: "filmEpic", cues: [{ at: 3.6, hit: "thunder" }, { at: 4.0, hit: "shimmer" }] },
      duration: 10,
      sources: [ENDGAME],
      captions: [
        { at: 0.5, text: "Thor holds out his hand." },
        { at: 3.6, text: "The hammer flies to him. He is still worthy." },
        { at: 6.8, text: "He came to the past broken. He leaves knowing who he is." },
      ],
    },
    {
      id: "f-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Frigga",
      kind: "comparison",
      turningPoint: "Frigga stopping Thor from warning her, and sending him back to his task.",
      connection: "Like Skandamata sending Skanda out with the vel, Frigga gives her son what he needs, a sense of who he is, and lets him go, even at a cost to herself.",
      ladder: [
        { level: "notice", text: "What does Thor try to tell his mother? What does she do?" },
        { level: "feel", text: "How do you think Thor felt walking away, knowing what would happen to her?" },
        {
          level: "wonder",
          text: "Why didn't Frigga want to know?",
          followUps: [{ ifTheySay: "She didn't want to change time", ask: "Do you think that's the only reason? What else might she have been protecting?" }],
        },
        {
          level: "stretch",
          text: "Was Frigga being selfless, or was she just accepting what she couldn't change?",
          deep: "Is it braver to accept something hard, or to fight it? Can letting go ever be the stronger choice?",
        },
        { level: "flip", text: "What if Frigga had asked Thor to stay in the past with her? What would he have lost?" },
        { level: "connect", text: "Parvati gives Skanda the vel. What does Frigga give Thor instead?" },
      ],
      stance: {
        statement: "Sometimes the most loving thing is to let someone go.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Does it change if the person is a child? A friend? A parent?",
      },
      activity: {
        title: "What would you hand them?",
        minutes: 5,
        steps: [
          "Parvati gave Skanda a spear. Frigga gave Thor words.",
          "Each person: imagine your sibling is leaving home for the first time. What one thing (object or words) would you give them?",
          "Explain why.",
          "Siblings: what would you actually want to be given?",
        ],
      },
      sources: [ENDGAME],
    },

    // ================================================================ E MARVEL: scene 2
    {
      id: "p-intro",
      type: "sceneIntro",
      section: "marvel",
      title: "The suit comes off",
      kind: "marvel",
      role: "counterpoint",
      roleNote: "A mentor who protects by taking something away, and a young hero who finds out what's left.",
      film: "Spider-Man: Homecoming",
      year: 2017,

      rating: "PG-13",
      character: "Peter Parker and Tony Stark",
      scene: "After the ferry, Tony takes back the suit. Later, trapped under the collapsed warehouse, Peter frees himself.",
      context:
        "Fifteen-year-old Peter Parker is desperate to prove himself to his mentor Tony Stark. Against Tony's instructions, he chases a dangerous arms dealer, and a ferry is nearly torn in half.",
      find: {
        where: "Tony takes back the suit after the ferry, about halfway through. The rubble scene comes in the final act.",
        search: "Spider-Man Homecoming rubble scene",
      },
      watchFor: ["Why Tony takes the suit back.", "What Peter says he is without it.", "What Peter tells himself under the rubble."],
      sources: [HOMECOMING],
    },
    {
      id: "p-ferry",
      type: "story",
      section: "marvel",
      title: "After the ferry",
      kind: "marvel",
      visual: "d5Ferry",
      sound: { mood: "filmStruggle", cues: [{ at: 4.6, mood: "filmQuiet" }] },
      duration: 12,
      sources: [HOMECOMING],
      captions: [
        { at: 0.5, text: "Tony arrives to hold the ferry together. Afterwards, he is furious and frightened." },
        { at: 4.6, text: "He takes back the suit. Peter protests that he's nothing without it." },
        { at: 8.2, text: "Tony answers that if he's nothing without the suit, then he shouldn't have it." },
      ],
    },
    {
      id: "p-rubble",
      type: "story",
      section: "marvel",
      title: "Under the rubble",
      kind: "marvel",
      visual: "d5Rubble",
      sound: { mood: "filmStruggle", cues: [{ at: 0.4, hit: "boom" }, { at: 9.2, hit: "heartbeat" }, { at: 11.4, mood: "filmEpic" }, { at: 11.4, hit: "boom" }] },
      duration: 15,
      sources: [HOMECOMING],
      captions: [
        { at: 0.5, text: "Later, wearing his old homemade suit, Peter is crushed under a collapsed building." },
        { at: 4.4, text: "No Tony. No high-tech suit. He calls for help. No one comes." },
        { at: 8.2, text: "He sees his reflection in a puddle and remembers Tony's words." },
        { at: 11.6, text: "He pushes, and pushes, and lifts the whole weight off himself." },
      ],
      freezes: [
        {
          at: 10.4,
          title: "Alone",
          text: "Peter has only what he is, not what he was given.",
          think: "What do you think is going through his head?",
          options: [
            { label: "\"I need Tony.\"", response: "That's what he was thinking at the start. Watch what changes." },
            { label: "\"I can do this.\"", response: "Watch: in the film, he has to talk himself into it, more than once." },
          ],
        },
      ],
    },
    {
      id: "p-think",
      type: "think",
      section: "marvel",
      title: "Think it through: Peter and Tony",
      kind: "comparison",
      turningPoint: "Tony taking the suit, and Peter discovering under the rubble that his strength was his own.",
      connection:
        "Tony protects Peter by taking something away; Parvati prepares Skanda by giving him something. Both are trying to help a young person find out what they can do. Which one works better is worth arguing about.",
      ladder: [
        { level: "notice", text: "What does Tony take away from Peter? Why?" },
        { level: "feel", text: "How did Peter feel when the suit was taken? How about under the rubble?" },
        {
          level: "wonder",
          text: "Was taking the suit kind or unkind?",
          followUps: [{ ifTheySay: "Unkind", ask: "What might have happened if Peter kept the suit and kept going?" }, { ifTheySay: "Kind", ask: "Did Tony explain himself well? Could he have done it differently?" }],
        },
        {
          level: "stretch",
          text: "Tony took the suit to protect Peter. Did it also help him grow? Did Tony mean it to?",
          deep: "Sometimes a protector's choice has an effect they never intended. Does the result count if it wasn't the plan?",
        },
        { level: "flip", text: "What if Tony had trained Peter properly instead of taking the suit?" },
        { level: "connect", text: "Parvati gives a spear; Tony takes a suit. Which is more like the people who look after you?" },
      ],
      stance: {
        statement: "Taking something away can be a way of caring.",
        left: "Strongly disagree",
        right: "Strongly agree",
        afterwards: "Each person names one thing taken away from them that they're glad about now, or still aren't.",
      },
      activity: {
        title: "Ready or not",
        minutes: 8,
        steps: [
          "Each child names one thing they feel ready to do alone that they're not yet allowed to.",
          "The parent says what they'd need to see first, honestly.",
          "Together, agree one small step towards it: something like Parvati's vel, not Tony's suit-taking.",
          "Swap: the parent names something they find hard to let go of.",
        ],
      },
      sources: [HOMECOMING],
    },

    // ================================================================ F COMPARE
    {
      id: "d5-compare",
      type: "comparison",
      section: "compare",
      title: "Side by side",
      kind: "comparison",
      rows: [
        {
          question: "What happens in each story?",
          askFirst: "One sentence each.",
          tradition: "Parvati gathers a child raised by many, then sends him to his task, armed with her power.",
          traditionJump: "d5-gathered",
          marvel: [
            { who: "Frigga", text: "She stops Thor saving her and sends him back to be who he is.", jumpTo: "f-meet" },
            { who: "Tony and Peter", text: "Tony takes the suit; Peter finds his own strength under the rubble.", jumpTo: "p-rubble" },
          ],
        },
        {
          question: "What idea do they share?",
          askFirst: "What do the three carers want for the young person?",
          tradition: "Love that equips someone to go, rather than keeping them close.",
          marvel: [
            { who: "Frigga", text: "She lets him go, at a cost to herself." },
            { who: "Tony", text: "He wants Peter to be more than the suit." },
          ],
        },
        {
          question: "Where do they part ways?",
          askFirst: "Which carer would you rather have?",
          tradition: "Parvati gives: a weapon, her power, her blessing.",
          marvel: [
            { who: "Frigga", text: "She gives words and acceptance, not a weapon." },
            { who: "Tony", text: "He takes away, and Peter has to find the gift himself." },
          ],
        },
        {
          question: "What do we see only by looking at them together?",
          askFirst: "Guess before you reveal.",
          tradition: "Protecting and preparing are different jobs, and every carer has to choose between them again and again.",
          marvel: [
            { who: "Frigga", text: "Prepares, by refusing protection for herself." },
            { who: "Tony", text: "Protects, and preparation happens almost by accident." },
          ],
          deep: "One reading: Skanda's many mothers suggest care is shared, passed from one person to the next. No single carer has to do everything. You may disagree.",
        },
      ],
    },

    // ================================================================ G TODAY
    {
      id: "d5-today",
      type: "today",
      section: "today",
      title: "In your world",
      kind: "contemporary",
      setting: "Growing up",
      scenario: "You want to take the bus to a friend's house across town on your own for the first time. Your parent wants to drive you, like always.",
      deep: "You've done the route with them before. You have a phone. But last month a friend got lost on the same route.",
      prompt: "What would be the fairest way to decide?",
      options: [
        {
          id: "drive",
          label: "Parent drives, as usual",
          perspectives: [
            { label: "What it protects", text: "Safety, and the parent's peace of mind." },
            { label: "What it risks", text: "You may feel you're never trusted, and stay unprepared." },
            { label: "Question", text: "If not now, when? What would have to change?" },
          ],
        },
        {
          id: "alone",
          label: "Go alone, no conditions",
          perspectives: [
            { label: "What it protects", text: "Independence, and your sense that you're trusted." },
            { label: "What it risks", text: "If something goes wrong, you have no plan." },
            { label: "Question", text: "Is being ready the same as feeling ready?" },
          ],
        },
        {
          id: "vel",
          label: "Go alone, with a plan agreed together",
          perspectives: [
            { label: "What it protects", text: "Both: freedom and safety, like a vel for the journey." },
            { label: "What it risks", text: "Both sides have to compromise, and trust the plan." },
            { label: "Question", text: "What would be in your plan?" },
          ],
        },
      ],
      closing: "Parvati armed Skanda. Frigga sent Thor back. Tony took the suit. Every carer chooses between protecting and preparing, again and again.",
      talk: ["What's one thing you were allowed to do for the first time that made you feel trusted?", "Parents: what's the hardest thing to let your children do?", "Who else, besides parents, has helped raise you?"],
    },

    // ================================================================ H REFLECT
    {
      id: "d5-reflect",
      type: "reflection",
      section: "reflect",
      title: "Before the lamp goes out",
      kind: "contemporary",
      both: "When does protecting someone start holding them back?",
      younger: "Tony took Peter's suit away. Was that kind or unkind? What would you have done?",
      older: "Skanda had six mothers, a river, a fire god and Parvati. What does that say about who gets to count as a parent?",
      takeaway: "True care helps someone grow strong enough to go their own way.",
    },
  ],

  context: [
    {
      title: "Where tonight's story comes from",
      paragraphs: [
        "Skanda's birth is told in Kalidasa's Kumarasambhava, the Shiva Purana (Rudra Samhita, Kumara Khanda) and the Skanda Purana. The tellings differ on who carries the spark and on how the six Krittikas and Parvati are involved. We follow a common combined version.",
        "The gift of the vel to Murugan before his battle with Surapadman comes from Tamil tradition and is celebrated at Thaipusam. Northern tellings centre the battle with Taraka.",
        "Skandamata's iconography (the child on her lap, the lotuses, the lion) comes from devotional meditation verses.",
      ],
    },
    {
      title: "Comparing, not equating",
      paragraphs: ["Hindu deities are sacred figures in a living tradition. Marvel characters are fiction. We use the scenes to look at an idea from another angle."],
    },
  ],

  sources: [SHIVA_P, KUMARA, SKANDA_BRIT, VEL, ICON5, ENDGAME, HOMECOMING],
};
