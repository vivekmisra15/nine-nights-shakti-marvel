// ---------------------------------------------------------------------------
// Day 4 illustrations: Kushmanda.
// Darkness, a smile, a warm egg of light and a sun that stays. The Marvel
// scenes are drawn as small lights made in dark places.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Flame, Ground, H, Light, Particles, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { BigCat, Lotus, Pot, Radiate } from "../kit";

/** The cosmic egg: a warm ellipse that can crack open. */
function Egg({ x, y, size, crack = 0, t }: { x: number; y: number; size: number; crack?: number; t: number }) {
  const glow = 1 + Math.sin(t * 2) * 0.04;
  const gap = crack * 70;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={size * 3.2 * glow} fill="url(#halo-gold)" opacity={0.7} />
      <g transform={`translate(0 ${-gap}) rotate(${-crack * 12})`}>
        <path d={`M ${-size * 0.8} 0 Q ${-size * 0.8} ${-size * 1.25} 0 ${-size * 1.25} Q ${size * 0.8} ${-size * 1.25} ${size * 0.8} 0 L ${size * 0.4} ${size * 0.12} L 0 ${-size * 0.1} L ${-size * 0.4} ${size * 0.12} Z`} fill="var(--sun-core)" />
      </g>
      <g transform={`translate(0 ${gap}) rotate(${crack * 12})`}>
        <path d={`M ${-size * 0.8} 0 Q ${-size * 0.8} ${size} 0 ${size} Q ${size * 0.8} ${size} ${size * 0.8} 0 L ${size * 0.4} ${size * 0.12} L 0 ${-size * 0.1} L ${-size * 0.4} ${size * 0.12} Z`} fill="var(--amber)" />
      </g>
      {crack > 0 && <circle r={size * crack * 0.9} fill="var(--lamp)" opacity={crack} />}
    </g>
  );
}

/** Stars thrown outward from a centre after `from`. */
function Burst({ x, y, t, from, count = 140, seed = 401 }: { x: number; y: number; t: number; from: number; count?: number; seed?: number }) {
  if (t < from) return null;
  const r = seeded(seed);
  const pts = Array.from({ length: count }, () => ({ a: r() * Math.PI * 2, v: 80 + r() * 520, s: 0.5 + r() * 1.6, c: r() }));
  const dt = t - from;
  return (
    <g>
      {pts.map((p, i) => {
        const d = p.v * (1 - Math.exp(-dt * 0.9)) * 1.6;
        const swirl = p.a + dt * 0.08 * (1 - d / 1000);
        return <circle key={i} cx={x + Math.cos(swirl) * d} cy={y + Math.sin(swirl) * d * 0.62} r={p.s * 1.6} fill={p.c > 0.8 ? "var(--halo-rose)" : p.c > 0.6 ? "var(--steel-light)" : "var(--star)"} opacity={Math.min(1, dt * 2) * (0.5 + p.c * 0.5)} />;
      })}
    </g>
  );
}

/** A sun with turning rays. */
function Sun({ x, y, r, t, rays = 1 }: { x: number; y: number; r: number; t: number; rays?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 4} fill="url(#halo-gold)" opacity={0.75} />
      <Radiate x={x} y={y} count={24} r0={r * 1.15} r1={r * 1.9} grow={rays} stroke="var(--sun-core)" width={5} spin={t * 6} opacity={0.7} />
      <circle cx={x} cy={y} r={r} fill="var(--sun-core)" />
      <circle cx={x} cy={y} r={r * 0.6} fill="var(--lamp)" opacity={0.7 + 0.2 * Math.sin(t * 1.4)} />
    </g>
  );
}

/** A curved smile of light. */
function Smile({ x, y, w, p, opacity = 1 }: { x: number; y: number; w: number; p: number; opacity?: number }) {
  return (
    <path
      d={`M ${x - w} ${y} Q ${x} ${y + w * 0.6} ${x + w} ${y}`}
      fill="none"
      stroke="var(--lamp)"
      strokeWidth={8}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - p}
      opacity={opacity}
    />
  );
}

// ---------- tradition scenes ------------------------------------------------

const d4Opening: Visual = ({ t }) => {
  const egg = seg(t, 0.6, 4.0);
  const name = seg(t, 3.0, 5.4);
  const rise = seg(t, 7.6, 11.5);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <Stars t={t} from={5} opacity={0.6} />
      <Egg x={800} y={lerp(360, 330, rise)} size={10 + egg * 60} t={t} />
      <text x={800} y={600} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        कूष्माण्डा
      </text>
      <text x={800} y={652} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        KUSHMANDA · THE WARM EGG OF LIGHT
      </text>
      <rect width={W} height={H} fill="var(--cosmos)" opacity={rise * 0.55} />
    </g>
  );
};

const d4Void: Visual = ({ t }) => {
  const warmth = seg(t, 12.6, 15.5);
  const r = seeded(402);
  const swirls = Array.from({ length: 5 }, () => ({ x: r() * W, y: r() * H, rr: 200 + r() * 300 }));
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      {/* Darkness hidden in darkness: barely visible folds */}
      {swirls.map((s, i) => (
        <ellipse key={i} cx={s.x + Math.sin(t * 0.2 + i) * 40} cy={s.y} rx={s.rr} ry={s.rr * 0.4} fill="var(--night-3)" opacity={0.18 + 0.08 * Math.sin(t * 0.4 + i)} transform={`rotate(${t * 2 + i * 30} ${s.x} ${s.y})`} />
      ))}
      <Particles t={t} kind="motes" count={14} seed={403} speed={0.3} opacity={0.12} />
      {/* A question, hanging */}
      <text x={800} y={460} textAnchor="middle" className="svg-display" fontSize={120} fill="var(--muted)" opacity={0.08 + 0.08 * seg(t, 8, 10) * (1 - warmth)}>
        ?
      </text>
      {warmth > 0 && <Light x={800} y={450} r={2 + warmth * 6} t={t} seed={404} opacity={warmth} breathe={1} />}
    </g>
  );
};

const d4Smile: Visual = ({ t }) => {
  const smile = seg(t, 0.4, 2.8);
  const egg = seg(t, 2.8, 6.0);
  const crack = seg(t, 6.2, 7.4);
  const space = seg(t, 7.0, 12);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <rect width={W} height={H} fill="url(#sky-violet)" opacity={space * 0.7} />
      <Stars t={t} from={7} opacity={space} />
      <Smile x={800} y={300} w={140} p={smile} opacity={1 - egg * 0.7} />
      {smile > 0.3 && <circle cx={800} cy={360} r={180} fill="url(#halo-gold)" opacity={smile * 0.25 * (1 - egg)} />}
      {egg > 0 && crack < 1 && <Egg x={800} y={lerp(380, 450, egg)} size={egg * 90} crack={crack} t={t} />}
      <Burst x={800} y={450} t={t} from={6.6} />
      {crack >= 1 && <Ripple x={800} y={450} t={t} from={6.8} period={3} max={900} color="var(--gold)" count={3} />}
      {crack >= 1 && <Light x={800} y={450} r={10} t={t} seed={405} breathe={1} />}
    </g>
  );
};

const d4Sun: Visual = ({ t }) => {
  const sun = seg(t, 0.2, 2.6);
  const reach = seg(t, 3.6, 7.0);
  const life = seg(t, 5.6, 9.0);
  const ex = 1260 + Math.cos(t * 0.25) * 30;
  const ey = 660 + Math.sin(t * 0.25) * 12;
  return (
    <g>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.7} />
      {/* Orbits */}
      {[220, 360, 500].map((rr, i) => (
        <ellipse key={i} cx={620} cy={400} rx={rr} ry={rr * 0.42} fill="none" stroke="var(--rim)" strokeOpacity={0.2} />
      ))}
      {[220, 360].map((rr, i) => {
        const a = t * (0.4 - i * 0.15) + i * 2;
        return <circle key={i} cx={620 + Math.cos(a) * rr} cy={400 + Math.sin(a) * rr * 0.42} r={10 + i * 4} fill={i ? "var(--ember)" : "var(--ash)"} />;
      })}
      <Sun x={620} y={400} r={60 + sun * 30} t={t} rays={sun} />
      {/* She dwells at the core */}
      <Light x={620} y={400} r={10} color="gold" core="var(--lamp)" t={t} seed={406} breathe={1} opacity={sun} />
      {/* Warmth travelling to a living world */}
      <path d={`M 690 430 L ${lerp(690, ex, reach)} ${lerp(430, ey - 40, reach)} L ${lerp(690, ex, reach)} ${lerp(430, ey + 40, reach)} Z`} fill="var(--halo-gold)" opacity={0.18} />
      <circle cx={ex} cy={ey} r={50} fill="var(--river)" />
      <path d={`M ${ex - 40} ${ey - 10} q 20 -30 40 -10 q 20 20 36 0 L ${ex + 40} ${ey + 20} q -30 30 -70 10 Z`} fill="var(--halo-green)" opacity={0.5 + life * 0.4} />
      <circle cx={ex} cy={ey} r={52} fill="none" stroke="var(--lamp)" strokeOpacity={reach * 0.6} strokeWidth={3} />
      <Particles t={t} kind="motes" count={20} opacity={life} seed={407} box={{ x: ex - 90, y: ey - 120, w: 180, h: 160 }} />
    </g>
  );
};

const d4Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.5} />
      <Sun x={800} y={130} r={40} t={t} rays={a(0.2)} />
      <text x={800} y={250} textAnchor="middle" className="svg-devanagari" fontSize={40} fill="var(--gold)" opacity={a(0.4) * 0.7}>
        कूष्माण्डा
      </text>
      <circle cx={800} cy={420} r={230} fill="url(#halo-gold)" opacity={0.35} />
      <Radiate x={800} y={420} count={8} r0={50} r1={190} spread={260} start={-220} grow={a(0.8)} opacity={a(0.8)} spin={Math.sin(t) * 2} />
      <Light x={800} y={400} r={16} t={t} seed={3} breathe={1} />
      <Smile x={800} y={300} w={50} p={a(0.6)} />
      <Pot x={560} y={520} size={0.8} liquid="var(--sun-core)" opacity={a(1.2)} />
      <Pot x={660} y={560} size={0.6} liquid="var(--ember)" opacity={a(1.4)} />
      <Lotus x={1040} y={560} size={0.7} opacity={a(1.6)} />
      <BigCat x={760} y={800} size={0.6} t={t} opacity={a(1.8) * 0.85} />
      {/* The ash gourd */}
      <g transform="translate(1280 760)" opacity={a(2.2)}>
        <ellipse rx={90} ry={56} fill="var(--gourd)" />
        <ellipse rx={90} ry={56} fill="none" stroke="var(--snow)" strokeOpacity={0.35} strokeWidth={3} />
        {[-50, -16, 18, 52].map((x) => (
          <path key={x} d={`M ${x} -52 q 10 52 0 104`} fill="none" stroke="var(--snow)" strokeOpacity={0.2} strokeWidth={2} />
        ))}
        <path d="M 0 -56 q 6 -20 22 -24" stroke="var(--leaf)" strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// ---------- Marvel scenes: steel grade, letterboxed by the Stage ------------

/** A cave mouth framing the scene. */
function Cave() {
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-top)" />
      <path d={`M 0 0 L ${W} 0 L ${W} ${H} L 1400 ${H} Q 1460 300 800 160 Q 140 300 200 ${H} L 0 ${H} Z`} fill="var(--cave)" />
      <Ground y={760} fill="var(--cave)" />
    </g>
  );
}

const d4Cave: Visual = ({ t }) => {
  const reactor = seg(t, 4.2, 5.6);
  const captors = seg(t, 8.2, 9.6);
  const plan = seg(t, 8.6, 10.6);
  const sparks = t < 8.4 ? 1 : 1 - seg(t, 8.4, 9);
  return (
    <g>
      <Cave />
      {/* A bare bulb */}
      <line x1={800} y1={160} x2={800} y2={300} stroke="var(--steel)" strokeWidth={2} />
      <Light x={800} y={310} r={6} color="ember" core="var(--window)" t={t} seed={410} opacity={0.6} />
      {/* Workbench */}
      <rect x={420} y={620} width={560} height={24} fill="var(--door)" />
      {/* Welding sparks */}
      {sparks > 0 && <Particles t={t * 3} kind="embers" count={26} seed={411} opacity={sparks} box={{ x: 640, y: 480, w: 120, h: 140 }} />}
      {/* Yinsen beside him */}
      <Light x={400} y={560} r={8} color="gold" core="var(--lamp)" t={t} seed={412} opacity={0.75} />
      {/* Tony, with the small light in his chest */}
      <Light x={600} y={540} r={10} color="steel" core="var(--steel-light)" t={t} seed={413} />
      <circle cx={600} cy={580} r={6 + reactor * 10} fill="var(--reactor)" opacity={reactor} />
      <circle cx={600} cy={580} r={60 * reactor} fill="url(#halo-steel)" opacity={reactor * 0.8} />
      {reactor > 0.9 && <Ripple x={600} y={580} t={t} from={5.6} period={2.4} max={80} color="var(--reactor)" count={1} />}
      {/* The order: a missile drawn as a blueprint */}
      <g opacity={plan} stroke="var(--ember)" strokeWidth={3} fill="none" strokeDasharray="10 8">
        <path d="M 1000 420 L 1340 420 L 1400 450 L 1340 480 L 1000 480 Z" />
        <path d="M 1000 420 L 960 390 M 1000 480 L 960 510" />
      </g>
      {[1180, 1260, 1340].map((x, i) => (
        <Light key={x} x={x} y={600} r={8} color="ember" core="var(--amber)" t={t} seed={414 + i} opacity={captors} />
      ))}
    </g>
  );
};

const d4Escape: Visual = ({ t }) => {
  const run = seg(t, 0.6, 3.0);
  const gone = seg(t, 3.0, 4.0);
  const burst = seg(t, 4.6, 5.4);
  const press = seg(t, 7.6, 9.0);
  return (
    <g>
      <g opacity={1 - press}>
        <Cave />
        {/* Yinsen runs into the corridor, and doesn't come back */}
        <Light x={lerp(500, 1200, run)} y={600} r={8} color="gold" core="var(--lamp)" t={t} seed={412} opacity={1 - gone} />
        {gone > 0 && gone < 1 && <circle cx={1200} cy={600} r={30 + gone * 60} fill="var(--amber)" opacity={(1 - gone) * 0.6} />}
        {/* The suit breaks out */}
        <g transform={`translate(${lerp(560, 760, burst)} 0)`} opacity={0.4 + burst * 0.6}>
          <rect x={-70} y={430} width={140} height={190} rx={18} fill="var(--hull)" stroke="var(--steel)" strokeWidth={3} />
          <rect x={-50} y={370} width={100} height={70} rx={14} fill="var(--hull)" stroke="var(--steel)" strokeWidth={3} />
          <circle cx={0} cy={490} r={14} fill="var(--reactor)" />
          <circle cx={0} cy={490} r={60} fill="url(#halo-steel)" />
        </g>
        {burst > 0 && <Flame x={lerp(560, 760, burst) + 180} y={700} size={0.8} t={t} intensity={burst} />}
        {burst > 0 && <Particles t={t} kind="embers" count={50} seed={415} opacity={burst} />}
      </g>
      {/* Home: the press conference */}
      <g opacity={press}>
        <rect width={W} height={H} fill="var(--steel-sky-low)" />
        <rect x={0} y={260} width={W} height={60} fill="var(--steel-sky-top)" opacity={0.6} />
        <rect x={720} y={560} width={160} height={180} fill="var(--hull)" stroke="var(--steel)" />
        <Light x={800} y={480} r={10} color="steel" core="var(--steel-light)" t={t} seed={413} />
        <circle cx={800} cy={520} r={8} fill="var(--reactor)" />
        {Array.from({ length: 16 }, (_, i) => {
          const flash = Math.max(0, Math.sin(t * 7 + i * 2.3)) > 0.97;
          return <circle key={i} cx={120 + i * 92} cy={800 - (i % 3) * 22} r={flash ? 16 : 6} fill="var(--bolt)" opacity={flash ? 0.9 : 0.25} />;
        })}
      </g>
    </g>
  );
};

const r4 = seeded(420);
const TREES = Array.from({ length: 26 }, (_, i) => ({ x: i * 64 + r4() * 30, h: 380 + r4() * 300, w: 10 + r4() * 14 }));

const d4Forest: Visual = ({ t }) => {
  const vision = seg(t, 4.6, 6.4);
  const speak = t > 8 && t < 10.2;
  const fade = seg(t, 11.6, 13.6);
  return (
    <g>
      <Sky id="sky-steel" />
      <Particles t={t} kind="leaves" count={24} seed={421} speed={0.4} />
      {TREES.map((tr, i) => (
        <rect key={i} x={tr.x} y={H - tr.h} width={tr.w} height={tr.h} fill="var(--tower)" opacity={0.7 + (i % 3) * 0.1} />
      ))}
      <Ground y={790} fill="var(--steel-sky-top)" />
      {/* Ultron: damaged, flickering red */}
      <g opacity={1 - fade * 0.85}>
        <Light x={560} y={640} r={10} color="ember" core="var(--ember)" t={t * 3} seed={422} />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1={560} y1={640} x2={560 + Math.cos(i * 1.3) * 40} y2={640 + Math.sin(i * 1.3) * 40} stroke="var(--ember)" strokeOpacity={0.4 * Math.abs(Math.sin(t * 7 + i))} strokeWidth={2} />
        ))}
      </g>
      {/* Vision: calm, with a gold light at his brow */}
      <g opacity={vision}>
        <Light x={1040} y={620} r={11} color="rose" core="var(--halo-rose)" t={t} seed={423} breathe={0.6} />
        <circle cx={1040} cy={596} r={5} fill="var(--sun-core)" />
        <circle cx={1040} cy={596} r={26} fill="url(#halo-gold)" />
      </g>
      {speak && <Ripple x={1040} y={620} t={t} from={8} period={1.6} max={140} color="var(--halo-rose)" count={2} />}
      {t > 11 && <line x1={1040} y1={596} x2={lerp(1040, 560, seg(t, 11, 11.8))} y2={lerp(596, 640, seg(t, 11, 11.8))} stroke="var(--sun-core)" strokeWidth={6} opacity={1 - seg(t, 12.6, 13.6)} />}
    </g>
  );
};

export const day4Visuals: Record<string, Visual> = {
  d4Opening,
  d4Void,
  d4Smile,
  d4Sun,
  d4Emblems,
  d4Cave,
  d4Escape,
  d4Forest,
};

export const day4Film = ["d4Cave", "d4Escape", "d4Forest"];

