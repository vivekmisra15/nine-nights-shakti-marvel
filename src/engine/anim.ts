// Small helpers for drawing animations as functions of time.

export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Smooth start and finish. */
export const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** Progress from 0 to 1 between times a and b, eased. */
export const seg = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)));

/** Linear progress from 0 to 1 between times a and b. */
export const lin = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

/** A gentle flicker, for flames and lamps. */
export const flicker = (t: number, seed = 0) =>
  0.85 + 0.08 * Math.sin(t * 7.3 + seed) + 0.07 * Math.sin(t * 13.1 + seed * 2.1);

/** Deterministic pseudo-random numbers, so star fields look the same every time. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
