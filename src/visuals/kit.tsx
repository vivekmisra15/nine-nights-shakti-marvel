// Small drawing pieces used from Night 3 onward: bells, moons, lotuses,
// radiating arms, a big cat, city skylines and a few simple props.
// Everything is abstract and original.

import { seeded } from "../engine/anim";
import { W } from "./shared";

/** A temple bell centred on its mouth. `swing` in degrees. */
export function Bell({ x, y, size = 60, swing = 0, fill = "var(--gold)", opacity = 1 }: { x: number; y: number; size?: number; swing?: number; fill?: string; opacity?: number }) {
  const s = size;
  return (
    <g transform={`translate(${x} ${y}) rotate(${swing} 0 ${-s * 0.9})`} opacity={opacity}>
      <line x1={0} y1={-s * 0.9} x2={0} y2={-s * 0.7} stroke={fill} strokeWidth={s * 0.08} strokeLinecap="round" />
      <path d={`M ${-s * 0.55} ${s * 0.35} Q ${-s * 0.58} ${-s * 0.72} 0 ${-s * 0.72} Q ${s * 0.58} ${-s * 0.72} ${s * 0.55} ${s * 0.35} L ${s * 0.72} ${s * 0.48} L ${-s * 0.72} ${s * 0.48} Z`} fill={fill} />
      <circle cx={Math.sin((swing * Math.PI) / 180) * -s * 0.2} cy={s * 0.58} r={s * 0.12} fill={fill} />
    </g>
  );
}

/** A crescent moon using the shared mask (radius about 34 before scaling). */
export function Crescent({ x, y, scale = 1, fill = "var(--gold)", opacity = 1, rotate = 0 }: { x: number; y: number; scale?: number; fill?: string; opacity?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <rect x={-60} y={-60} width={120} height={120} fill={fill} mask="url(#crescent)" />
    </g>
  );
}

/** A lotus seen from the side. `open` from 0 to 1. */
export function Lotus({ x, y, size = 1, open = 1, fill = "var(--lotus)", opacity = 1 }: { x: number; y: number; size?: number; open?: number; fill?: string; opacity?: number }) {
  const petals = [-60, -35, -12, 12, 35, 60];
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      {petals.map((a, i) => (
        <path key={i} d="M 0 0 C -16 -30 -10 -62 0 -78 C 10 -62 16 -30 0 0 Z" fill={fill} opacity={0.65 + (i % 2) * 0.25} transform={`rotate(${a * open})`} />
      ))}
      <ellipse cx={0} cy={2} rx={34} ry={8} fill={fill} opacity={0.5} />
    </g>
  );
}

/** Lines radiating from a centre: many arms, or rays. */
export function Radiate({ x, y, count, r0, r1, spread = 360, start = -90, stroke = "var(--gold)", width = 4, grow = 1, opacity = 1, spin = 0 }: { x: number; y: number; count: number; r0: number; r1: number; spread?: number; start?: number; stroke?: string; width?: number; grow?: number; opacity?: number; spin?: number }) {
  return (
    <g opacity={opacity} strokeLinecap="round">
      {Array.from({ length: count }, (_, i) => {
        const frac = spread >= 360 ? i / count : count === 1 ? 0.5 : i / (count - 1);
        const a = ((start + spin + frac * spread) * Math.PI) / 180;
        const len = r0 + (r1 - r0) * grow;
        return <line key={i} x1={x + Math.cos(a) * r0} y1={y + Math.sin(a) * r0} x2={x + Math.cos(a) * len} y2={y + Math.sin(a) * len} stroke={stroke} strokeWidth={width} />;
      })}
    </g>
  );
}

/** A big cat (lion or tiger) in profile, facing right unless `flip`. */
export function BigCat({ x, y, size = 1, flip = false, fill = "var(--amber)", stripes = false, t = 0, opacity = 1 }: { x: number; y: number; size?: number; flip?: boolean; fill?: string; stripes?: boolean; t?: number; opacity?: number }) {
  const breathe = 1 + Math.sin(t * 1.6) * 0.015;
  const tail = Math.sin(t * 1.8) * 12;
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * size} ${size * breathe})`} opacity={opacity}>
      <path d={`M -150 -40 Q -190 ${-90 + tail} -215 ${-70 + tail}`} fill="none" stroke={fill} strokeWidth={9} strokeLinecap="round" />
      <path d="M -150 -50 Q -140 -110 -40 -105 L 80 -100 Q 130 -100 150 -130 Q 200 -150 215 -110 Q 225 -80 195 -70 L 160 -60 Q 140 -40 130 0 L 120 60 L 98 60 L 100 0 Q 40 -20 -70 -20 L -100 60 L -122 60 L -120 -10 Q -150 -20 -150 -50 Z" fill={fill} />
      <circle cx={185} cy={-115} r={5} fill="var(--night)" />
      {stripes &&
        [-90, -55, -20, 15, 50].map((sx, i) => <path key={i} d={`M ${sx} -104 q 8 22 0 44`} fill="none" stroke="var(--night)" strokeWidth={6} strokeLinecap="round" opacity={0.6} />)}
      {!stripes && <path d="M 130 -112 Q 120 -160 170 -158 Q 222 -156 222 -110 Q 230 -70 190 -60 Q 150 -55 135 -80 Z" fill={fill} opacity={0.75} />}
    </g>
  );
}

/** A row of city towers with lit windows. */
export function Skyline({ seed = 5, base = 640, minH = 80, maxH = 300, fill = "var(--tower)", lit = 1 }: { seed?: number; base?: number; minH?: number; maxH?: number; fill?: string; lit?: number }) {
  const r = seeded(seed);
  const towers = Array.from({ length: 24 }, (_, i) => ({ x: i * 68 - 10, w: 50 + r() * 30, h: minH + r() * (maxH - minH), win: r() }));
  return (
    <g>
      {towers.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h} fill={fill} />
          {Array.from({ length: 6 }, (_, j) => (
            <rect key={j} x={b.x + 8 + (j % 2) * (b.w / 2)} y={base - b.h + 16 + Math.floor(j / 2) * 34} width={8} height={12} fill="var(--window)" opacity={lit * ((i + j + Math.floor(b.win * 5)) % 3 === 0 ? 0.75 : 0.15)} />
          ))}
        </g>
      ))}
    </g>
  );
}

/** A spear: shaft plus a leaf-shaped blade (the vel), pointing up. */
export function Spear({ x, y, length = 300, angle = 0, fill = "var(--gold)", blade = 1, opacity = 1 }: { x: number; y: number; length?: number; angle?: number; fill?: string; blade?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
      <line x1={0} y1={0} x2={0} y2={-length} stroke={fill} strokeWidth={6} strokeLinecap="round" />
      <path d={`M 0 ${-length - 70 * blade} C ${26 * blade} ${-length - 40 * blade} ${22 * blade} ${-length + 6} 0 ${-length + 10} C ${-22 * blade} ${-length + 6} ${-26 * blade} ${-length - 40 * blade} 0 ${-length - 70 * blade} Z`} fill={fill} />
    </g>
  );
}

/** A trident pointing up. */
export function Trident({ x, y, size = 1, fill = "var(--gold)", opacity = 1 }: { x: number; y: number; size?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none" stroke={fill} strokeWidth={6} strokeLinecap="round">
      <line x1={0} y1={60} x2={0} y2={-70} />
      <path d="M -40 -70 Q -40 -20 0 -20 Q 40 -20 40 -70" />
      <path d="M 0 -70 L 0 -92 M -40 -70 L -46 -84 M 40 -70 L 46 -84" />
    </g>
  );
}

/** A sword pointing up. */
export function Sword({ x, y, size = 1, fill = "var(--gold)", opacity = 1 }: { x: number; y: number; size?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d="M -8 30 L -8 -70 L 0 -95 L 8 -70 L 8 30 Z" fill={fill} />
      <rect x={-28} y={30} width={56} height={8} rx={3} fill={fill} />
      <rect x={-5} y={38} width={10} height={30} fill={fill} />
    </g>
  );
}

/** A bow, with a string that vibrates when `twang` is above 0. */
export function Bow({ x, y, size = 1, fill = "var(--gold)", twang = 0, t = 0, opacity = 1 }: { x: number; y: number; size?: number; fill?: string; twang?: number; t?: number; opacity?: number }) {
  const v = Math.sin(t * 60) * 10 * twang;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none" stroke={fill} strokeLinecap="round">
      <path d="M -110 -10 Q 0 -110 110 -10" strokeWidth={7} />
      <path d={`M -110 -10 Q 0 ${-10 + v} 110 -10`} strokeWidth={2} />
    </g>
  );
}

/** A water pot (kalasha). */
export function Pot({ x, y, size = 1, fill = "var(--gold)", liquid, opacity = 1 }: { x: number; y: number; size?: number; fill?: string; liquid?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d="M -50 0 Q -62 70 0 78 Q 62 70 50 0 Q 42 -24 18 -30 L 18 -48 L -18 -48 L -18 -30 Q -42 -24 -50 0 Z" fill="none" stroke={fill} strokeWidth={4} />
      {liquid && <path d="M -48 14 Q -56 68 0 74 Q 56 68 48 14 Z" fill={liquid} opacity={0.8} />}
      <path d="M -24 -48 L 24 -48" stroke={fill} strokeWidth={4} />
    </g>
  );
}

/** Spread items evenly across the width. */
export const across = (n: number, margin = 120) => Array.from({ length: n }, (_, i) => margin + (i * (W - margin * 2)) / Math.max(1, n - 1));
