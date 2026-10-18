// Building blocks shared by the illustrations: sky, stars, ridges, lights,
// flames and moving particles (embers, snow, rain, petals, motes).
// Every illustration lives in a 1600 x 900 space and is drawn from time `t`,
// so pausing, slow motion and replay all apply to every moving part.

import type { ReactNode } from "react";
import { flicker, seeded } from "../engine/anim";

export const W = 1600;
export const H = 900;

export type Visual = (props: { t: number }) => ReactNode;

/** Gradients and masks used across scenes. Rendered once inside each <svg>. */
export function Defs() {
  return (
    <defs>
      <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--sky-top)" }} />
        <stop offset="1" style={{ stopColor: "var(--sky-low)" }} />
      </linearGradient>
      <linearGradient id="sky-steel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--steel-sky-top)" }} />
        <stop offset="1" style={{ stopColor: "var(--steel-sky-low)" }} />
      </linearGradient>
      <linearGradient id="sky-violet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--violet-top)" }} />
        <stop offset="1" style={{ stopColor: "var(--violet-low)" }} />
      </linearGradient>
      <linearGradient id="sky-dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--sky-top)" }} />
        <stop offset="0.7" style={{ stopColor: "var(--dawn-mid)" }} />
        <stop offset="1" style={{ stopColor: "var(--dawn-low)" }} />
      </linearGradient>
      <linearGradient id="sky-spring" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--sky-top)" }} />
        <stop offset="1" style={{ stopColor: "var(--spring-low)" }} />
      </linearGradient>
      {(["gold", "ember", "steel", "pale", "shadow", "rose", "green"] as const).map((name) => (
        <radialGradient key={name} id={`halo-${name}`}>
          <stop offset="0" style={{ stopColor: `var(--halo-${name})`, stopOpacity: 0.9 }} />
          <stop offset="0.35" style={{ stopColor: `var(--halo-${name})`, stopOpacity: 0.35 }} />
          <stop offset="1" style={{ stopColor: `var(--halo-${name})`, stopOpacity: 0 }} />
        </radialGradient>
      ))}
      <linearGradient id="pillar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: "var(--halo-pale)", stopOpacity: 0 }} />
        <stop offset="0.4" style={{ stopColor: "var(--halo-pale)", stopOpacity: 0.28 }} />
        <stop offset="1" style={{ stopColor: "var(--halo-pale)", stopOpacity: 0.05 }} />
      </linearGradient>
      <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" style={{ stopColor: "var(--halo-gold)", stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: "var(--halo-gold)", stopOpacity: 0 }} />
      </linearGradient>
      <mask id="crescent">
        <rect x="-60" y="-60" width="120" height="120" fill="black" />
        <circle cx="0" cy="0" r="34" fill="white" />
        <circle cx="13" cy="-9" r="30" fill="black" />
      </mask>
    </defs>
  );
}

const starRand = seeded(7);
const STARS = Array.from({ length: 130 }, () => ({
  x: starRand() * W,
  y: starRand() * H * 0.64,
  r: 0.6 + starRand() * 1.6,
  o: 0.25 + starRand() * 0.6,
  delay: starRand() * 3,
  speed: 0.6 + starRand() * 2.2,
}));

/** A twinkling field of stars that fades in from `from` seconds. */
export function Stars({ t, from = 0, opacity = 1 }: { t: number; from?: number; opacity?: number }) {
  return (
    <g>
      {STARS.map((s, i) => {
        const p = Math.max(0, Math.min(1, (t - from - s.delay * 0.4) / 1.5));
        const tw = 0.7 + 0.3 * Math.sin(t * s.speed + i);
        return <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--star)" opacity={s.o * p * opacity * tw} />;
      })}
    </g>
  );
}

/** A mountain ridge as a closed path, generated from a seed. */
export function ridgePath(seed: number, baseY: number, amp: number, step = 80, peak?: { x: number; h: number }) {
  const r = seeded(seed);
  let d = `M -20 ${H + 20} L -20 ${baseY}`;
  for (let x = 0; x <= W + step; x += step) {
    let y = baseY - r() * amp;
    if (peak) {
      const dist = Math.abs(x - peak.x);
      y -= Math.max(0, peak.h * (1 - dist / 520));
    }
    d += ` L ${x} ${y.toFixed(1)}`;
  }
  d += ` L ${W + 20} ${H + 20} Z`;
  return d;
}

export const RIDGE_FAR = ridgePath(3, 640, 90, 70, { x: 820, h: 260 });
export const RIDGE_MID = ridgePath(11, 720, 70, 90, { x: 560, h: 150 });
export const RIDGE_NEAR = ridgePath(19, 800, 40, 120);
export const PEAK = ridgePath(41, 820, 30, 60, { x: 800, h: 520 });

/** Three layers of mountains that can rise into place. */
export function Mountains({ rise = 1, tone = 1, snow = 0 }: { rise?: number; tone?: number; snow?: number }) {
  const off = (1 - rise) * 260;
  return (
    <g>
      <path d={RIDGE_FAR} fill="var(--ridge-far)" transform={`translate(0 ${off * 1.2})`} opacity={tone} />
      {snow > 0 && <path d={RIDGE_FAR} fill="none" stroke="var(--snow)" strokeWidth={3} opacity={snow * 0.6} transform={`translate(0 ${off * 1.2})`} />}
      <path d={RIDGE_MID} fill="var(--ridge-mid)" transform={`translate(0 ${off})`} />
      <path d={RIDGE_NEAR} fill="var(--ridge-near)" transform={`translate(0 ${off * 0.8})`} />
    </g>
  );
}

export function Sky({ id = "sky-night" }: { id?: string }) {
  return <rect width={W} height={H} fill={`url(#${id})`} />;
}

export function Ground({ y = 700, fill = "var(--ground)" }: { y?: number; fill?: string }) {
  return <rect x={0} y={y} width={W} height={H - y} fill={fill} />;
}

/** Slow mist bands drifting across the scene. */
export function Mist({ t, y = 600, opacity = 0.12, color = "var(--mist)" }: { t: number; y?: number; opacity?: number; color?: string }) {
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const x = ((t * (14 + i * 6) + i * 520) % (W + 900)) - 450;
        return <ellipse key={i} cx={x} cy={y + i * 40} rx={420} ry={26 + i * 6} fill={color} opacity={opacity} />;
      })}
    </g>
  );
}

type HaloColor = "gold" | "ember" | "steel" | "pale" | "shadow" | "rose" | "green";

/** A point of light with a soft halo. Used for Sati, Thor and others. */
export function Light({
  x,
  y,
  r = 10,
  color = "gold",
  core = "var(--lamp)",
  opacity = 1,
  t = 0,
  seed = 0,
  breathe = 0,
}: {
  x: number;
  y: number;
  r?: number;
  color?: HaloColor;
  core?: string;
  opacity?: number;
  t?: number;
  seed?: number;
  /** 0 to 1: how much the light slowly swells and settles, like breathing. */
  breathe?: number;
}) {
  const f = flicker(t, seed) * (1 + breathe * 0.18 * Math.sin(t * 1.4 + seed));
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <circle r={r * 7 * f} fill={`url(#halo-${color})`} />
      <circle r={r} fill={core} />
    </g>
  );
}

/** A flame drawn from three layered teardrops. */
export function Flame({ x, y, size = 1, t, intensity = 1 }: { x: number; y: number; size?: number; t: number; intensity?: number }) {
  const f1 = flicker(t, 1);
  const f2 = flicker(t, 4);
  const sway = Math.sin(t * 3.1) * 6;
  const drop = (h: number, w: number) =>
    `M0 0 C ${-w} ${-h * 0.25} ${-w * 0.6 + sway * 0.4} ${-h * 0.7} ${sway} ${-h} C ${w * 0.6 + sway * 0.4} ${-h * 0.7} ${w} ${-h * 0.25} 0 0 Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <circle r={180 * intensity} cy={-60} fill="url(#halo-ember)" opacity={0.7 * intensity} />
      <path d={drop(150 * f1 * intensity, 60)} fill="var(--ember)" opacity={0.85} />
      <path d={drop(110 * f2 * intensity, 42)} fill="var(--amber)" />
      <path d={drop(62 * f1 * intensity, 22)} fill="var(--lamp)" />
    </g>
  );
}

type ParticleKind = "embers" | "snow" | "rain" | "petals" | "motes" | "ash" | "leaves";

const PARTICLES: Record<number, { x: number; y: number; s: number; v: number; d: number }[]> = {};
function particleSet(seed: number, n: number) {
  const key = seed * 1000 + n;
  if (!PARTICLES[key]) {
    const r = seeded(seed);
    PARTICLES[key] = Array.from({ length: n }, () => ({ x: r(), y: r(), s: 0.5 + r(), v: 0.6 + r() * 0.8, d: r() * Math.PI * 2 }));
  }
  return PARTICLES[key];
}

/**
 * Moving particles driven by time. `box` limits where they appear.
 * Embers and motes rise; snow, rain, petals, ash and leaves fall.
 */
export function Particles({
  t,
  kind,
  count = 40,
  opacity = 1,
  box = { x: 0, y: 0, w: W, h: H },
  seed = 3,
  speed = 1,
}: {
  t: number;
  kind: ParticleKind;
  count?: number;
  opacity?: number;
  box?: { x: number; y: number; w: number; h: number };
  seed?: number;
  speed?: number;
}) {
  if (opacity <= 0) return null;
  const set = particleSet(seed, count);
  const rising = kind === "embers" || kind === "motes";
  const base: Record<ParticleKind, number> = { embers: 70, snow: 45, rain: 900, petals: 50, motes: 18, ash: 30, leaves: 60 };
  return (
    <g opacity={opacity} aria-hidden="true">
      {set.map((p, i) => {
        const travel = (t * base[kind] * p.v * speed) / box.h;
        let fy = (p.y + travel) % 1;
        if (rising) fy = 1 - fy;
        const sway = kind === "rain" ? 0 : Math.sin(t * 1.3 * p.v + p.d) * (kind === "leaves" || kind === "petals" ? 40 : 14);
        const x = box.x + p.x * box.w + sway + (kind === "rain" ? fy * 60 : 0);
        const y = box.y + fy * box.h;
        const edge = Math.min(1, fy * 6, (1 - fy) * 6);
        switch (kind) {
          case "embers":
            return <circle key={i} cx={x} cy={y} r={2 * p.s} fill="var(--amber)" opacity={edge * (0.4 + 0.6 * p.s * 0.6)} />;
          case "motes":
            return <circle key={i} cx={x} cy={y} r={1.6 * p.s} fill="var(--pale-core)" opacity={edge * 0.6} />;
          case "snow":
            return <circle key={i} cx={x} cy={y} r={2.2 * p.s} fill="var(--snow)" opacity={edge * 0.85} />;
          case "ash":
            return <rect key={i} x={x} y={y} width={3 * p.s} height={3 * p.s} fill="var(--ash)" opacity={edge * 0.7} transform={`rotate(${t * 40 * p.v + i * 30} ${x} ${y})`} />;
          case "rain":
            return <line key={i} x1={x} y1={y} x2={x - 8} y2={y - 34 * p.s} stroke="var(--rain)" strokeWidth={1.6} opacity={edge * 0.6} />;
          case "petals":
            return (
              <ellipse key={i} cx={x} cy={y} rx={6 * p.s} ry={3 * p.s} fill="var(--petal)" opacity={edge * 0.85} transform={`rotate(${t * 60 * p.v + i * 40} ${x} ${y})`} />
            );
          case "leaves":
            return (
              <path
                key={i}
                d={`M ${x} ${y} q 8 -6 16 0 q -8 6 -16 0 Z`}
                fill="var(--leaf)"
                opacity={edge * 0.9}
                transform={`rotate(${t * 70 * p.v + i * 50} ${x + 8} ${y})`}
              />
            );
        }
      })}
    </g>
  );
}

/** A slowly expanding ring, used for sound, realisation and ripples of words. */
export function Ripple({ x, y, t, from, period = 2.4, max = 400, color = "var(--rim)", count = 3 }: { x: number; y: number; t: number; from: number; period?: number; max?: number; color?: string; count?: number }) {
  if (t < from) return null;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const p = (((t - from) / period + i / count) % 1 + 1) % 1;
        return <circle key={i} cx={x} cy={y} r={20 + p * max} fill="none" stroke={color} strokeWidth={2} opacity={(1 - p) * 0.5} />;
      })}
    </g>
  );
}
