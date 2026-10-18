// The nine stops on the journey map, and the opening sequence text.
// Set `built: true` for a day once its content file exists and is registered
// in `days` below.

import type { DayContent, JourneyStop } from "./types";
import { day1 } from "./day1";
import { day2 } from "./day2";
import { day3 } from "./day3";
import { day4 } from "./day4";
import { day5 } from "./day5";
import { day6 } from "./day6";
import { day7 } from "./day7";
import { day8 } from "./day8";
import { day9 } from "./day9";

export const days: Record<number, DayContent> = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
  9: day9,
};

export const stops: JourneyStop[] = [
  { day: 1, name: "Shailaputri", theme: "Rootedness", say: "SHY-luh-POO-tree", devanagari: "शैलपुत्री", question: "When everything around you changes, what is still you?", built: true },
  { day: 2, name: "Brahmacharini", theme: "Resolve", say: "BRUH-muh-CHAA-ri-nee", devanagari: "ब्रह्मचारिणी", question: "Is discipline about getting what you want, or becoming someone?", built: true },
  { day: 3, name: "Chandraghanta", theme: "Readiness", say: "CHUN-druh-GHUN-taa", devanagari: "चन्द्रघण्टा", question: "Can the same strength feel like safety to one person and a threat to another?", built: true },
  { day: 4, name: "Kushmanda", theme: "Creation", say: "koosh-MAAN-daa", devanagari: "कूष्माण्डा", question: "Does it matter why someone creates something?", built: true },
  { day: 5, name: "Skandamata", theme: "Nurture", say: "SKUN-duh-MAA-taa", devanagari: "स्कन्दमाता", question: "When does protecting someone start holding them back?", built: true },
  { day: 6, name: "Katyayani", theme: "Courage", say: "kaat-YAA-yuh-nee", devanagari: "कात्यायनी", question: "What is worth standing up for, even when others underestimate you?", built: true },
  { day: 7, name: "Kalaratri", theme: "Fearlessness", say: "KAA-luh-RAA-tree", devanagari: "कालरात्रि", question: "How can you face something frightening without becoming part of it?", built: true },
  { day: 8, name: "Mahagauri", theme: "Renewal", say: "muh-HAA-gow-ree", devanagari: "महागौरी", question: "When someone is renewed after a hard time, what washes away and what stays?", built: true },
  { day: 9, name: "Siddhidatri", theme: "Wholeness", say: "SID-dhi-DAA-tree", devanagari: "सिद्धिदात्री", question: "What makes you feel part of something bigger than yourself?", built: true },
];

export const appTitle = "Nine Nights";

export const opening = {
  question: "What is power for?",
  questions: [
    "What makes someone truly strong?",
    "When is protecting someone different from controlling them?",
    "Can creating something good still cause harm?",
    "Is doing the right thing always the same as winning?",
    "Can losing something change how we understand ourselves?",
  ],
  premise:
    "Across nine nights, we meet nine forms of the Devi. We hear their traditional stories, then look at the same questions through particular scenes from Marvel films.",
  difference:
    "These are different kinds of stories. The Devi is sacred in a living tradition; Marvel is fiction. We compare ideas, not goddesses and superheroes.",
};
