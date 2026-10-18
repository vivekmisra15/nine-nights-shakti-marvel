// One registry for every day's illustrations.
// To add a day: import its visuals and film list here.

import type { Visual } from "./shared";
import { day1Film, day1Visuals } from "./day1";
import { day2Film, day2Visuals } from "./day2";
import { day3Film, day3Visuals } from "./day3";
import { day4Film, day4Visuals } from "./day4";
import { day5Film, day5Visuals } from "./day5";
import { day6Film, day6Visuals } from "./day6";
import { day7Film, day7Visuals } from "./day7";
import { day8Film, day8Visuals } from "./day8";
import { day9Film, day9Visuals } from "./day9";

export const visuals: Record<string, Visual> = { ...day1Visuals, ...day2Visuals, ...day3Visuals, ...day4Visuals, ...day5Visuals, ...day6Visuals, ...day7Visuals, ...day8Visuals, ...day9Visuals };

/** Visuals drawn as Marvel scenes: letterboxed, cooler colours. */
export const filmVisuals = new Set<string>([...day1Film, ...day2Film, ...day3Film, ...day4Film, ...day5Film, ...day6Film, ...day7Film, ...day8Film, ...day9Film]);
