// Which steps make up each kind of evening.
//
// Full evening: every step (about 45 to 60 minutes with both Marvel scenes).
// Short evening: the story, the choice, the core idea, the first Marvel scene
// with its questions, and the reflection (about 20 minutes). It leaves out
// "How she is pictured", the second Marvel scene, "Side by side" and
// "In your world". Nothing is deleted: switch back to the full evening at any
// time and every step is there.

import type { Beat } from "./types";
import type { Evening } from "../state/progress";

export function stepsFor(beats: Beat[], evening: Evening): number[] {
  const all = beats.map((_, i) => i);
  if (evening === "full") return all;
  const secondScene = beats.findIndex((b) => b.type === "sceneIntro" && b.role === "counterpoint");
  return all.filter((i) => {
    const b = beats[i];
    if (b.section === "compare" || b.section === "today") return false;
    if (b.id.includes("emblems")) return false;
    if (b.section === "marvel" && secondScene !== -1 && i >= secondScene) return false;
    return true;
  });
}

export const eveningLabel: Record<Evening, { name: string; time: string }> = {
  full: { name: "Full evening", time: "about 45 to 60 minutes" },
  short: { name: "Short evening", time: "about 20 minutes" },
};
