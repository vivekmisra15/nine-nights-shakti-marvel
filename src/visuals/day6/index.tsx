// ---------------------------------------------------------------------------
// Day 6 illustrations: Katyayani.
// Many lights becoming one, gifts arriving from every side, and a shape-
// shifter who cannot change the one thing that matters.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Flame, Ground, H, Light, Mist, Particles, RIDGE_FAR, RIDGE_MID, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { BigCat, Bell, Bow, Lotus, Radiate, Skyline, Sword, Trident } from "../kit";

/** A buffalo in profile, facing left unless `flip`. */
function Buffalo({ x, y, size = 1, fill = "var(--shadow-core)", stroke = "var(--shadow-line)", opacity = 1, t = 0 }: { x: number; y: number; size?: number; fill?: string; stroke?: string; opacity?: number; t?: number }) {
  const breathe = 1 + Math.sin(t * 1.4) * 0.02;
  return (
    <g transform={`translate(${x} ${y}) scale(${size} ${size * breathe})`} opacity={opacity}>
      <path
        d="M 170 -10 Q 180 -110 70 -120 L -40 -118 Q -70 -150 -110 -130 Q -140 -150 -170 -136 Q -150 -128 -140 -112 Q -180 -90 -170 -50 Q -160 -30 -130 -36 L -120 60 L -96 60 L -90 0 L 60 6 L 70 60 L 94 60 L 104 10 Q 170 20 170 -10 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={2.5}
      />
      <path d="M -112 -128 Q -150 -190 -96 -200 M -128 -126 Q -200 -150 -196 -96" fill="none" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
      <circle cx={-142} cy={-90} r={5} fill="var(--ember)" />
    </g>
  );
}

/** An elephant, abstract, facing left. */
function Elephant({ x, y, size = 1, opacity = 1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path
        d="M 150 0 Q 160 -150 30 -160 Q -80 -170 -120 -110 Q -150 -70 -150 0 Q -152 60 -176 70 L -160 76 Q -126 60 -124 10 L -110 70 L -84 70 L -80 20 L 60 20 L 70 70 L 96 70 L 104 10 Q 150 20 150 0 Z"
        fill="var(--shadow-core)"
        stroke="var(--shadow-line)"
        strokeWidth={2.5}
      />
      <path d="M -60 -120 Q -20 -60 -70 -30" fill="none" stroke="var(--shadow-line)" strokeWidth={3} />
    </g>
  );
}

/** A discus: a spinning ring with teeth. */
export function Discus({ x, y, r = 46, t, opacity = 1 }: { x: number; y: number; r?: number; t: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${t * 120})`} opacity={opacity}>
      <circle r={r} fill="none" stroke="var(--gold)" strokeWidth={8} />
      <circle r={r * 0.3} fill="var(--gold)" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={0} y1={-r} x2={0} y2={-r - 14} stroke="var(--gold)" strokeWidth={6} transform={`rotate(${i * 30})`} />
      ))}
    </g>
  );
}

/** A conch shell. */
export function Conch({ x, y, size = 1, opacity = 1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size}) rotate(-20)`} opacity={opacity} fill="none" stroke="var(--gold)" strokeWidth={5} strokeLinecap="round">
      <path d="M -60 20 Q -40 -50 30 -40 Q 70 -30 60 10 Q 40 50 -60 20 Z" fill="var(--gold)" fillOpacity={0.2} />
      <path d="M -10 -20 Q 20 -10 30 10 M 10 -36 Q 40 -20 46 0" />
      <path d="M 60 10 L 84 26" />
    </g>
  );
}

/** A thunderbolt (vajra). */
function Vajra({ x, y, size = 1, opacity = 1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity} fill="none" stroke="var(--gold)" strokeWidth={5} strokeLinecap="round">
      <line x1={-60} y1={0} x2={60} y2={0} />
      <circle r={10} fill="var(--gold)" />
      <path d="M 20 0 Q 50 -30 70 0 Q 50 30 20 0 M -20 0 Q -50 -30 -70 0 Q -50 30 -20 0" />
    </g>
  );
}

const r6 = seeded(601);
const GODS = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (0.12 + (i / 8) * 0.76);
  return { x: 800 - Math.cos(a) * 560, y: 640 - Math.sin(a) * 300, s: r6() };
});

// ---------- tradition scenes ------------------------------------------------

const d6Opening: Visual = ({ t }) => {
  const gather = seg(t, 0.4, 4.0);
  const name = seg(t, 3.0, 5.4);
  const cat = seg(t, 5.6, 8.0);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Mist t={t} y={720} />
      {GODS.map((g, i) => (
        <Light key={i} x={lerp(g.x, 800, gather)} y={lerp(g.y, 330, gather)} r={5} color="ember" core="var(--amber)" t={t} seed={i} opacity={1 - gather * 0.9} />
      ))}
      <Light x={800} y={330} r={6 + gather * 10} t={t} seed={3} opacity={gather} breathe={1} />
      <Radiate x={800} y={330} count={18} r0={30} r1={120} grow={gather} opacity={gather * 0.8} spin={t * 4} stroke="var(--sun-core)" width={3} />
      <text x={800} y={560} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        कात्यायनी
      </text>
      <text x={800} y={612} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        KATYAYANI · THE WARRIOR
      </text>
      <BigCat x={800} y={820} size={0.7} t={t} opacity={cat * 0.9} />
    </g>
  );
};

const d6Boon: Visual = ({ t }) => {
  const brahma = seg(t, 0.6, 2.6);
  const refuse = seg(t, 4.0, 5.2);
  const shield = seg(t, 7.4, 10.0);
  const pulse = t > 10.4 ? 0.5 + 0.5 * Math.sin(t * 4) : 0;
  const gapA = -90; // gap at the top
  const arc = (r: number) => {
    const a0 = ((gapA + 16) * Math.PI) / 180;
    const a1 = ((gapA - 16 + 360 * shield) * Math.PI) / 180;
    const large = 360 * shield - 32 > 180 ? 1 : 0;
    return `M ${600 + Math.cos(a0) * r} ${560 + Math.sin(a0) * r} A ${r} ${r} 0 ${large} 1 ${600 + Math.cos(a1) * r} ${560 + Math.sin(a1) * r}`;
  };
  return (
    <g>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Ground y={720} />
      {/* Mahisha at his tapas, a fire before him */}
      <Flame x={760} y={720} size={0.35} t={t} />
      <Buffalo x={560} y={660} size={0.85} t={t} />
      <circle cx={560} cy={560} r={200} fill="url(#halo-shadow)" opacity={0.6} />
      {/* Brahma, a pale light, granting the boon */}
      <g opacity={brahma}>
        <Light x={1200} y={320} r={12} color="pale" core="var(--pale-core)" t={t} seed={602} breathe={1} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={1200 + Math.cos(i * 1.57 + t * 0.3) * 30} cy={320 + Math.sin(i * 1.57 + t * 0.3) * 30} r={4} fill="var(--pale-core)" opacity={0.7} />
        ))}
      </g>
      {refuse > 0 && refuse < 1 && <circle cx={1200} cy={320} r={40 + refuse * 140} fill="none" stroke="var(--pale-core)" strokeWidth={3} opacity={1 - refuse} />}
      {/* His protection: a ring of light with one gap */}
      {shield > 0 && <path d={arc(220)} fill="none" stroke="var(--gold)" strokeWidth={10} strokeLinecap="round" opacity={0.8} />}
      {shield > 0.95 && <circle cx={600} cy={340} r={18 + pulse * 10} fill="none" stroke="var(--halo-rose)" strokeWidth={3} opacity={0.4 + pulse * 0.6} />}
    </g>
  );
};

const d6Light: Visual = ({ t }) => {
  const take = seg(t, 0.4, 3.6);
  const fall = seg(t, 1.6, 4.0);
  const beams = seg(t, 4.6, 8.4);
  const merge = seg(t, 8.4, 11.0);
  const form = seg(t, 10.0, 12.6);
  return (
    <g>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.6} />
      {/* Heaven, taken over */}
      <g opacity={1 - merge * 0.6}>
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={1060 + i * 90} y={160} width={24} height={150} fill="var(--panel-svg)" stroke="var(--rim)" strokeOpacity={0.3} />
        ))}
        <rect x={1040} y={145} width={440} height={18} fill="var(--panel-svg)" />
        <ellipse cx={1260} cy={320} rx={260} ry={34} fill="var(--cloud)" />
        <Light x={1260} y={260} r={14} color="shadow" core="var(--shadow-core)" t={t} seed={603} opacity={take} />
      </g>
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      {/* The gods: driven down, then blazing */}
      {GODS.map((g, i) => {
        const x = lerp(1100 + (i % 3) * 60, g.x, fall);
        const y = lerp(260, g.y, fall);
        const bx = lerp(x, 800, beams);
        const by = lerp(y, 420, beams);
        return (
          <g key={i}>
            <Light x={x} y={y} r={6} color={beams > 0 ? "ember" : "pale"} core={beams > 0 ? "var(--amber)" : "var(--pale-core)"} t={t} seed={i + 10} opacity={0.9 - merge * 0.4} />
            {beams > 0 && <line x1={x} y1={y} x2={bx} y2={by} stroke="var(--amber)" strokeWidth={8 * (1 - merge * 0.6)} strokeLinecap="round" opacity={0.75} />}
            {beams > 0 && <line x1={x} y1={y} x2={bx} y2={by} stroke="var(--lamp)" strokeWidth={2} opacity={0.9} />}
          </g>
        );
      })}
      {/* One form */}
      <circle cx={800} cy={420} r={60 + merge * 260} fill="url(#halo-gold)" opacity={merge} />
      <Light x={800} y={420} r={6 + merge * 14} t={t} seed={3} opacity={merge} breathe={1} />
      <Radiate x={800} y={420} count={18} r0={40} r1={200} grow={form} opacity={form} spin={Math.sin(t * 0.5) * 4} stroke="var(--sun-core)" width={4} />
      {form > 0.9 && <Ripple x={800} y={420} t={t} from={12.6} period={2.4} max={700} color="var(--gold)" count={2} />}
    </g>
  );
};

const d6Gifts: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.2);
  const fly = (at: number, x: number, y: number, fx: number, fy: number) => ({ x: lerp(fx, x, a(at)), y: lerp(fy, y, a(at)), o: a(at) });
  const tr = fly(0.6, 420, 330, -100, 200);
  const di = fly(1.2, 1180, 330, 1700, 200);
  const vj = fly(1.8, 800, 170, 800, -100);
  const bw = fly(2.4, 330, 620, -150, 800);
  const co = fly(3.0, 1270, 600, 1750, 800);
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.4} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <circle cx={800} cy={440} r={300} fill="url(#halo-gold)" opacity={0.35} />
      <Radiate x={800} y={440} count={18} r0={40} r1={160} stroke="var(--sun-core)" width={3} opacity={0.6} spin={t * 3} />
      <Light x={800} y={440} r={18} t={t} seed={3} breathe={1} />
      <Trident x={tr.x} y={tr.y} size={1.1} opacity={tr.o} />
      <Discus x={di.x} y={di.y} t={t} opacity={di.o} />
      <Vajra x={vj.x - 50} y={vj.y + 20} size={0.8} opacity={vj.o} />
      <Bell x={vj.x + 70} y={vj.y + 30} size={34} swing={Math.sin(t * 4) * 8} opacity={vj.o} />
      <Bow x={bw.x} y={bw.y} size={0.8} opacity={bw.o} />
      <Conch x={co.x} y={co.y} size={0.9} opacity={co.o} />
      <BigCat x={830} y={820} size={0.75} t={t} opacity={a(3.6)} />
      {[0.6, 1.2, 1.8, 2.4, 3.0, 3.6].map((at, i) => (t > at + 1.2 ? <Ripple key={i} x={800} y={440} t={t} from={at + 1.2} period={3} max={120} color="var(--gold)" count={1} /> : null))}
    </g>
  );
};

const d6Battle: Visual = ({ t }) => {
  const armies = seg(t, 0.4, 4.0) * (1 - seg(t, 4.0, 5.0));
  // Shapes: buffalo, lion, man, elephant, buffalo again
  const shapes = [4.4, 5.2, 6.0, 6.8, 7.6];
  const shapeIndex = t < 4.4 ? 0 : shapes.filter((s) => t >= s).length - 1;
  const fadeIn = (i: number) => (t < shapes[i] ? 0 : Math.min(1, (t - shapes[i]) / 0.3));
  const show = (i: number) => (shapeIndex === i ? (i === 0 && t < 4.4 ? seg(t, 0.4, 2) : fadeIn(i)) : 0);
  const leap = seg(t, 8.8, 9.6);
  const down = seg(t, 9.6, 11.0);
  const dx = lerp(560, 1060, leap);
  const dy = lerp(470, 470 - Math.sin(leap * Math.PI) * 120, leap) + down * 60;
  return (
    <g>
      <Sky id="sky-violet" />
      <rect width={W} height={H} fill="var(--storm)" opacity={0.45 * (1 - down)} />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Ground y={780} />
      {/* His armies */}
      {Array.from({ length: 16 }, (_, i) => (
        <Light key={i} x={1000 + (i % 8) * 70} y={720 + Math.floor(i / 8) * 40} r={5} color="shadow" core="var(--shadow-core)" t={t} seed={i} opacity={armies} />
      ))}
      {/* Mahisha's changing shapes */}
      <g transform={`translate(0 ${down * 30})`} opacity={1 - down * 0.8}>
        <Buffalo x={1080} y={700} size={1} opacity={show(0)} t={t} />
        <BigCat x={1080} y={720} size={0.9} flip fill="var(--shadow-core)" opacity={show(1)} t={t} />
        <g opacity={show(2)}>
          <Light x={1080} y={520} r={16} color="shadow" core="var(--shadow-core)" t={t} seed={604} />
          <Sword x={1150} y={560} size={1.2} />
        </g>
        <Elephant x={1080} y={710} size={1} opacity={show(3)} />
        <Buffalo x={1080} y={700} size={1} opacity={show(4)} t={t} />
      </g>
      {t > 4.4 && t < 8.6 && <Ripple x={1080} y={620} t={t} from={4.4} period={0.8} max={160} color="var(--shadow-line)" count={1} />}
      {/* The Devi on her lion */}
      <BigCat x={lerp(520, 980, leap)} y={760} size={0.85} t={t} />
      <Light x={dx} y={dy} r={16} t={t} seed={3} breathe={1} />
      <Radiate x={dx} y={dy} count={10} r0={26} r1={110} spread={300} start={-240} opacity={0.75} stroke="var(--gold)" width={3} />
      {leap > 0 && <Trident x={dx + 40} y={dy + 40 + down * 40} size={0.9} />}
      {down > 0 && <Ripple x={1080} y={640} t={t} from={9.6} period={2.2} max={800} color="var(--gold)" count={3} />}
      <Particles t={t} kind="ash" count={30} seed={605} opacity={1 - down} />
    </g>
  );
};

const d6Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <text x={800} y={120} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--gold)" opacity={a(0.3) * 0.8}>
        कात्यायनी
      </text>
      <circle cx={800} cy={430} r={260} fill="url(#halo-gold)" opacity={0.35 + 0.05 * Math.sin(t * 1.4)} />
      <Radiate x={800} y={430} count={4} r0={50} r1={190} spread={260} start={-220} grow={a(0.6)} opacity={a(0.6)} />
      <Light x={800} y={430} r={17} t={t} seed={3} breathe={1} />
      <Sword x={560} y={330} size={0.9} opacity={a(1.0)} />
      <Lotus x={560} y={560} size={0.6} opacity={a(1.3)} />
      {/* Raised palm and open palm */}
      <g transform="translate(1040 330)" opacity={a(1.6)} fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M -30 50 L -34 0 L -34 -46 M -18 -6 L -18 -60 M -2 -6 L -2 -64 M 14 -4 L 14 -56 M 28 4 L 34 -30 M -30 50 Q 0 70 28 46 L 30 4" />
      </g>
      <g transform="translate(1040 530) rotate(180)" opacity={a(1.9)} fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M -30 50 L -34 0 L -34 -46 M -18 -6 L -18 -60 M -2 -6 L -2 -64 M 14 -4 L 14 -56 M 28 4 L 34 -30 M -30 50 Q 0 70 28 46 L 30 4" />
      </g>
      <BigCat x={830} y={800} size={0.75} t={t} opacity={a(2.2)} />
    </g>
  );
};

// ---------- Marvel scenes: steel grade, letterboxed by the Stage ------------

/** A huge flying ship seen side-on, abstract. */
function Carrier({ t, y = 520 }: { t: number; y?: number }) {
  return (
    <g>
      <path d={`M 80 ${y} L 1520 ${y} L 1440 ${y + 90} L 160 ${y + 90} Z`} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.5} strokeWidth={2} />
      <rect x={1100} y={y - 80} width={120} height={80} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.5} />
      {[300, 620, 980, 1300].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={y + 110} rx={110} ry={16} fill="none" stroke="var(--steel)" strokeOpacity={0.4} strokeWidth={3} />
          <line x1={x - 100 * Math.cos(t * 9 + i)} y1={y + 110} x2={x + 100 * Math.cos(t * 9 + i)} y2={y + 110} stroke="var(--steel-light)" strokeOpacity={0.5} strokeWidth={4} />
        </g>
      ))}
    </g>
  );
}

const HEROES = [
  { x: 420, c: "steel" as const },
  { x: 560, c: "ember" as const },
  { x: 700, c: "green" as const },
  { x: 840, c: "steel" as const },
  { x: 980, c: "rose" as const },
];

const d6Helicarrier: Visual = ({ t }) => {
  const argue = 1 - seg(t, 4.2, 5.2);
  const loki = seg(t, 4.6, 7.0);
  const lost = seg(t, 8.6, 10.6);
  const scatter = seg(t, 9.2, 12);
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.3} />
      <Mist t={t * 2} y={760} opacity={0.18} color="var(--cloud)" />
      <Carrier t={t} />
      {/* The heroes, quarrelling: jagged lines between them */}
      {HEROES.map((h, i) => {
        const sx = h.x + (i - 2) * 120 * scatter;
        const sy = 470 + Math.sin(t * 2 + i) * 4 * argue + scatter * (i % 2 ? 20 : -20);
        return <Light key={i} x={sx} y={sy} r={8} color={h.c} core="var(--steel-light)" t={t} seed={i + 610} opacity={0.9 - scatter * 0.3} />;
      })}
      {argue > 0 &&
        [0, 1, 2, 3].map((i) => {
          const x1 = HEROES[i].x;
          const x2 = HEROES[i + 1].x;
          const j = (k: number) => Math.sin(t * 13 + i * 3 + k) * 12;
          return (
            <path key={i} d={`M ${x1 + 12} 470 L ${(x1 + x2) / 2 - 20} ${470 + j(1)} L ${(x1 + x2) / 2} ${470 - j(2)} L ${(x1 + x2) / 2 + 20} ${470 + j(3)} L ${x2 - 12} 470`} fill="none" stroke="var(--ember)" strokeWidth={2} opacity={argue * 0.7} />
          );
        })}
      {/* The sceptre's glow, feeding it */}
      <Light x={700} y={380} r={6} color="steel" core="var(--reactor)" t={t * 2} seed={611} opacity={argue} />
      {/* Loki slips out; Coulson stands in the way, then is gone */}
      <Light x={lerp(1240, 1380, loki)} y={460} r={8} color="green" core="var(--halo-green)" t={t} seed={612} opacity={loki > 0 ? 0.9 : 0.3} />
      <Light x={1310} y={470} r={6} t={t} seed={613} opacity={seg(t, 4.8, 5.6) * (1 - lost)} />
      {lost > 0 && lost < 1 && <circle cx={1310} cy={470} r={10 + lost * 50} fill="none" stroke="var(--lamp)" strokeWidth={2} opacity={1 - lost} />}
    </g>
  );
};

/** A small trading card, falling and turning. */
function Card({ x, y, rot, stain = 0, opacity = 1 }: { x: number; y: number; rot: number; stain?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={opacity}>
      <rect x={-34} y={-48} width={68} height={96} rx={4} fill="var(--page)" stroke="var(--steel)" strokeWidth={1.5} />
      <rect x={-26} y={-40} width={52} height={56} fill="var(--band-1)" opacity={0.5} />
      <rect x={-26} y={24} width={52} height={6} fill="var(--steel)" opacity={0.6} />
      {stain > 0 && <ellipse cx={10} cy={8} rx={18 * stain} ry={12 * stain} fill="var(--blood)" opacity={0.75} />}
    </g>
  );
}

const CARDS = [
  { x: 720, y: 600, r: -14 },
  { x: 800, y: 606, r: 6 },
  { x: 880, y: 598, r: 18 },
];

const d6Cards: Visual = ({ t }) => {
  const drop = seg(t, 0.6, 2.2);
  const tony = seg(t, 8.0, 9.6);
  const close = seg(t, 9.8, 11.6);
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-low)" />
      <rect x={0} y={0} width={W} height={300} fill="var(--steel-sky-top)" opacity={0.6} />
      {/* Table */}
      <path d="M 360 620 L 1240 620 L 1320 700 L 280 700 Z" fill="var(--door)" />
      <Ground y={700} fill="var(--steel-sky-top)" />
      {/* Fury, Steve, Tony */}
      <Light x={800} y={420} r={10} color="shadow" core="var(--shadow-line)" t={t} seed={620} />
      <Light x={lerp(520, 650, close)} y={520} r={9} color="steel" core="var(--steel-light)" t={t} seed={621} />
      <Light x={lerp(lerp(1080, 1160, tony), 950, close)} y={520} r={9} color="ember" core="var(--amber)" t={t} seed={622} />
      <circle cx={lerp(lerp(1080, 1160, tony), 950, close)} cy={540} r={5} fill="var(--reactor)" />
      {/* The cards, dropped on the table */}
      {CARDS.map((c, i) => (
        <Card key={i} x={c.x} y={lerp(380, c.y, drop)} rot={lerp(c.r * 4, c.r, drop)} stain={seg(t, 2.4, 3.6)} opacity={seg(t, 0.4, 0.8)} />
      ))}
      {t > 4.6 && t < 8 && <Ripple x={800} y={420} t={t} from={4.6} period={1.6} max={120} color="var(--steel)" count={2} />}
      {close > 0.9 && <Ripple x={800} y={520} t={t} from={11.6} period={2} max={260} color="var(--steel-light)" count={1} />}
    </g>
  );
};

const d6Locker: Visual = ({ t }) => {
  const open = seg(t, 0.4, 1.6);
  const fade = seg(t, 4.6, 6.0);
  const fly = seg(t, 5.0, 10.0);
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-low)" />
      <g opacity={1 - fade}>
        {/* A row of lockers, one open with the cards inside */}
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={340 + i * 130} y={240} width={120} height={440} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.5} />
        ))}
        <rect x={730} y={240} width={120 * (1 - open * 0.85)} height={440} fill="var(--tower)" stroke="var(--steel)" />
        <g opacity={open}>
          <Card x={800} y={420} rot={-4} />
          <Card x={810} y={430} rot={6} />
        </g>
        <Light x={1180} y={600} r={9} color="steel" core="var(--steel-light)" t={t} seed={623} opacity={0.8} />
        <Light x={1260} y={600} r={10} color="shadow" core="var(--shadow-line)" t={t} seed={620} opacity={0.8} />
      </g>
      {/* Together, toward the city */}
      <g opacity={fade}>
        <Sky id="sky-steel" />
        <Skyline seed={624} base={760} maxH={380} lit={0.6} />
        {HEROES.map((h, i) => {
          const x = lerp(120 + i * 30, 1200 + i * 40, fly);
          const y = lerp(420 + i * 20, 300 + Math.sin(i) * 30, fly);
          return <Light key={i} x={x} y={y} r={8} color={h.c} core="var(--steel-light)" t={t} seed={i + 610} />;
        })}
        {fly > 0 && <path d={`M 120 460 Q 700 ${380 - fly * 60} ${lerp(120, 1200, fly)} ${lerp(460, 320, fly)}`} fill="none" stroke="var(--steel-light)" strokeOpacity={0.3} strokeWidth={14} strokeLinecap="round" />}
      </g>
    </g>
  );
};

const d6Falls: Visual = ({ t }) => {
  const si = 1 - seg(t, 4.2, 5.0);
  const montage = seg(t, 4.6, 5.2) * (1 - seg(t, 9.6, 10.2));
  const power = seg(t, 10.2, 11.4);
  const r = seeded(630);
  const falls = Array.from({ length: 6 }, (_, i) => ({ x: 260 + i * 220 + r() * 40, start: 4.6 + i * 0.8, size: 4 + i * 1.4 }));
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-top)" />
      <rect width={W} height={H} fill="url(#sky-violet)" opacity={0.6} />
      {/* The Supreme Intelligence: a looming face of light */}
      <g opacity={si * 0.85}>
        <circle cx={800} cy={360} r={280} fill="none" stroke="var(--kree)" strokeOpacity={0.4} strokeWidth={3} />
        <circle cx={800} cy={360} r={220} fill="var(--kree)" opacity={0.08 + 0.04 * Math.sin(t * 2)} />
        <ellipse cx={720} cy={330} rx={30} ry={12} fill="var(--kree)" opacity={0.6} />
        <ellipse cx={880} cy={330} rx={30} ry={12} fill="var(--kree)" opacity={0.6} />
        {t > 1 && <Ripple x={800} y={360} t={t} from={1} period={1.8} max={380} color="var(--kree)" count={2} />}
      </g>
      {/* Every fall, and every getting up */}
      <g opacity={montage}>
        {falls.map((f, i) => {
          const local = Math.max(0, t - f.start);
          const cycle = local % 1.6;
          const fallY = cycle < 0.5 ? lerp(520, 700, cycle / 0.5) : cycle < 0.9 ? 700 : lerp(700, 520, (cycle - 0.9) / 0.7);
          return t > f.start ? <Light key={i} x={f.x} y={fallY} r={f.size} color="ember" core="var(--carol)" t={t} seed={i + 631} /> : null;
        })}
        <Ground y={720} fill="var(--steel-sky-low)" />
      </g>
      {/* Carol, with the implant; then her full power */}
      <Light x={800} y={560} r={10 + power * 16} color="ember" core="var(--carol)" t={t} seed={632} breathe={power} opacity={1 - montage * 0.7} />
      {power === 0 && <circle cx={812} cy={540} r={4} fill="var(--kree)" opacity={1 - montage} />}
      {power > 0 && <circle cx={800} cy={560} r={80 + power * 340} fill="url(#halo-ember)" opacity={power * 0.8} />}
      <Radiate x={800} y={560} count={24} r0={40} r1={360} grow={power} opacity={power} stroke="var(--carol)" width={4} spin={t * 10} />
      {power > 0 && <Ripple x={800} y={560} t={t} from={10.2} period={1.4} max={900} color="var(--carol)" count={3} />}
    </g>
  );
};

const d6Canyon: Visual = ({ t }) => {
  const rise = seg(t, 3.6, 5.0);
  const speak = t > 4 && t < 8.4;
  return (
    <g>
      <rect width={W} height={H} fill="var(--dusk-sky)" />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={0.5} />
      {/* Canyon walls */}
      <path d="M 0 900 L 0 260 L 120 240 L 200 330 L 330 320 L 380 900 Z" fill="var(--rock-dark)" />
      <path d="M 1600 900 L 1600 220 L 1450 260 L 1380 360 L 1260 380 L 1180 900 Z" fill="var(--rock-dark)" />
      <path d="M 300 900 Q 800 620 1300 900 Z" fill="var(--rock)" />
      <Ground y={800} fill="var(--rock)" />
      <Particles t={t} kind="ash" count={20} seed={640} speed={0.3} opacity={0.5} />
      {/* Yon-Rogg, getting up */}
      <Light x={1040} y={lerp(760, 690, rise)} r={9} color="green" core="var(--kree)" t={t} seed={641} opacity={0.85} />
      {speak && <Ripple x={1040} y={690} t={t} from={4} period={1.4} max={110} color="var(--kree)" count={2} />}
      {/* Carol, hovering, glowing */}
      <circle cx={560} cy={600} r={140} fill="url(#halo-ember)" opacity={0.6 + 0.1 * Math.sin(t * 3)} />
      <Light x={560} y={600 + Math.sin(t * 1.4) * 8} r={12} color="ember" core="var(--carol)" t={t} seed={632} breathe={0.6} />
    </g>
  );
};

export const day6Visuals: Record<string, Visual> = {
  d6Opening,
  d6Boon,
  d6Light,
  d6Gifts,
  d6Battle,
  d6Emblems,
  d6Helicarrier,
  d6Cards,
  d6Locker,
  d6Falls,
  d6Canyon,
};

export const day6Film = ["d6Helicarrier", "d6Cards", "d6Locker", "d6Falls", "d6Canyon"];
