// ---------------------------------------------------------------------------
// Day 9 illustrations: Siddhidatri.
// Powers shown and set aside, two halves made whole, a light with no edges,
// a wave that finds the ocean, and nine lamps lit together.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Flame, Ground, H, Light, Mist, Mountains, PEAK, Particles, RIDGE_FAR, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { Crescent, Lotus, Radiate } from "../kit";
import { Conch, Discus } from "../day6";

/** A mace (gada). */
function Mace({ x, y, size = 1, opacity = 1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size}) rotate(-20)`} opacity={opacity}>
      <rect x={-5} y={-20} width={10} height={110} rx={4} fill="var(--gold)" />
      <circle cx={0} cy={-46} r={32} fill="var(--gold)" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={0} y1={-46} x2={Math.cos((i * Math.PI) / 4) * 40} y2={-46 + Math.sin((i * Math.PI) / 4) * 40} stroke="var(--gold)" strokeWidth={6} />
      ))}
    </g>
  );
}

/** Beings bowing: small lights that lower and rise. */
function Bowing({ x, y, n, t, opacity = 1, spread = 60 }: { x: number; y: number; n: number; t: number; opacity?: number; spread?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: n }, (_, i) => {
        const bow = Math.max(0, Math.sin(t * 1.2 - i * 0.4)) * 14;
        return <Light key={i} x={x + i * spread} y={y + bow} r={5} color="pale" core="var(--pale-core)" t={t} seed={900 + i} opacity={0.85} />;
      })}
    </g>
  );
}

const THEMES = ["Rootedness", "Resolve", "Readiness", "Creation", "Nurture", "Courage", "Fearlessness", "Renewal", "Wholeness"];

// ---------- tradition scenes ------------------------------------------------

const d9Opening: Visual = ({ t }) => {
  const bloom = seg(t, 0.3, 3.4);
  const name = seg(t, 3.0, 5.4);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Mountains />
      <Mist t={t} y={720} />
      <circle cx={800} cy={320} r={260} fill="url(#halo-gold)" opacity={bloom * 0.8} />
      <Lotus x={800} y={420} size={2} open={bloom} opacity={bloom} />
      <Light x={800} y={300} r={14} t={t} seed={3} breathe={1} opacity={bloom} />
      <Radiate x={800} y={300} count={24} r0={30} r1={150} grow={bloom} opacity={bloom * 0.6} stroke="var(--sun-core)" width={2} spin={t * 2} />
      <text x={800} y={600} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        सिद्धिदात्री
      </text>
      <text x={800} y={652} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        SIDDHIDATRI · GIVER OF PERFECTION
      </text>
    </g>
  );
};

const d9Siddhis: Visual = ({ t }) => {
  // One demonstration light on the right shows the powers in turn.
  const shrink = seg(t, 3.6, 4.8) * (1 - seg(t, 4.8, 5.4));
  const vast = seg(t, 5.4, 6.6) * (1 - seg(t, 6.6, 7.0));
  const lightP = seg(t, 6.6, 7.2) * (1 - seg(t, 7.2, 7.4));
  const heavy = t > 7.4 && t < 8.4 ? 1 - (t - 7.4) : 0;
  const bow = seg(t, 9.0, 10.4);
  const dx = 1160;
  const dy = 440 - lightP * 200 + heavy * 0;
  const dr = 10 * (1 - shrink * 0.9) + vast * 160;
  return (
    <g>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.7} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Ground y={800} />
      {/* Siddhidatri */}
      <circle cx={520} cy={420} r={220} fill="url(#halo-gold)" opacity={0.5} />
      <Lotus x={520} y={520} size={1.1} />
      <Light x={520} y={420} r={15} t={t} seed={3} breathe={1} />
      <Radiate x={520} y={420} count={4} r0={36} r1={120} spread={200} start={-190} opacity={0.7} />
      {/* The powers */}
      <circle cx={dx} cy={dy} r={Math.max(2, dr) * 3} fill="url(#halo-gold)" opacity={0.5} />
      <circle cx={dx} cy={dy} r={Math.max(2, dr)} fill="var(--lamp)" opacity={vast > 0 ? 0.35 : 0.95} />
      {heavy > 0 && <Ripple x={dx} y={780} t={t} from={7.4} period={1} max={260} color="var(--gold)" count={1} />}
      {heavy > 0 && <path d={`M ${dx - 120} 800 L ${dx} 660 L ${dx + 120} 800 Z`} fill="var(--ridge-mid)" opacity={heavy} />}
      {/* Gods, sages and others bowing */}
      <Bowing x={260} y={lerp(860, 760, bow)} n={12} t={t} spread={95} opacity={bow} />
    </g>
  );
};

/** Two half-discs: left pale (Shiva), right gold (Shakti). */
function Halves({ x, y, r, gap, t }: { x: number; y: number; r: number; gap: number; t: number }) {
  return (
    <g transform={`rotate(${Math.sin(t * 0.4) * 3} ${x} ${y})`}>
      <path d={`M ${x - gap} ${y - r} A ${r} ${r} 0 0 0 ${x - gap} ${y + r} Z`} fill="var(--ash)" />
      <path d={`M ${x + gap} ${y - r} A ${r} ${r} 0 0 1 ${x + gap} ${y + r} Z`} fill="var(--gold)" />
    </g>
  );
}

const d9Ardhanari: Visual = ({ t }) => {
  const meet = seg(t, 3.6, 6.4);
  const whole = seg(t, 6.2, 8.0);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <circle cx={800} cy={420} r={200 + whole * 120} fill="url(#halo-gold)" opacity={0.3 + whole * 0.5} />
      <Halves x={800} y={420} r={110} gap={lerp(260, 0, meet)} t={t} />
      {/* Crescent on the Shiva side; a mark of Shakti on hers */}
      <Crescent x={lerp(510, 760, meet)} y={300} scale={0.5} fill="var(--moon-white)" opacity={0.85} rotate={-20} />
      <circle cx={lerp(1090, 840, meet)} cy={330} r={10} fill="var(--ember)" />
      {whole > 0 && <circle cx={800} cy={420} r={112} fill="none" stroke="var(--lamp)" strokeWidth={4} opacity={whole} />}
      {whole > 0.9 && <Ripple x={800} y={420} t={t} from={8} period={2.6} max={400} color="var(--gold)" count={2} />}
    </g>
  );
};

const r9 = seeded(910);
const BEINGS = Array.from({ length: 60 }, () => ({ x: r9() * W, y: 120 + r9() * 640, s: r9() }));

const d9Light: Visual = ({ t }) => {
  const taraka = 1 - seg(t, 4.0, 5.4);
  const blaze = seg(t, 4.2, 6.0);
  const settle = seg(t, 6.0, 8.0);
  const himalaya = seg(t, 8.2, 9.6);
  const threads = seg(t, 12.0, 14.0);
  const whiteOut = blaze * (1 - settle * 0.7);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={1 - whiteOut} />
      {/* The gods in trouble; Taraka's shadow */}
      <g opacity={taraka}>
        <circle cx={1200} cy={300} r={240} fill="url(#halo-shadow)" />
        <Light x={1200} y={300} r={18} color="shadow" core="var(--shadow-core)" t={t} seed={911} />
        {Array.from({ length: 7 }, (_, i) => (
          <Light key={i} x={300 + i * 70} y={700} r={5} color="pale" core="var(--pale-core)" t={t} seed={912 + i} opacity={0.8} />
        ))}
      </g>
      {/* The mountain king, from Night One */}
      <g opacity={himalaya}>
        <path d={PEAK} fill="var(--ridge-mid)" />
        <Light x={800} y={720} r={8} color="pale" core="var(--snow)" t={t} seed={913} />
      </g>
      {/* A light with no edges */}
      <circle cx={800} cy={360} r={80 + blaze * 1400} fill="url(#halo-pale)" opacity={blaze * 0.9} />
      <rect width={W} height={H} fill="var(--moon-white)" opacity={whiteOut * 0.75} />
      <Light x={800} y={360} r={8 + settle * 10} color="gold" core="var(--lamp)" t={t} seed={3} opacity={settle} breathe={1} />
      {/* Every being, connected to the one light */}
      {threads > 0 &&
        BEINGS.map((b, i) => (
          <g key={i} opacity={threads}>
            <line x1={800} y1={360} x2={b.x} y2={b.y} stroke="var(--gold)" strokeOpacity={0.12 + 0.1 * Math.sin(t * 2 + i)} strokeWidth={1} />
            <circle cx={b.x} cy={b.y} r={2 + b.s * 2} fill="var(--lamp)" opacity={0.8} />
          </g>
        ))}
      {himalaya > 0 && t > 9 && t < 12 && <Ripple x={800} y={720} t={t} from={9} period={1.6} max={80} color="var(--snow)" count={1} />}
    </g>
  );
};

const d9Wave: Visual = ({ t }) => {
  const rise = seg(t, 3.4, 7.2);
  const fall = seg(t, 8.0, 10.6);
  const h = rise * (1 - fall) * 300;
  const cx = 800;
  const sea = 620;
  const spread = seg(t, 9.6, 12.4);
  const wavePath = () => {
    let d = `M 0 ${sea}`;
    for (let x = 0; x <= W; x += 20) {
      const dist = (x - cx) / 180;
      const crest = h * Math.exp(-dist * dist);
      const ripple = Math.sin(x / 60 + t * 1.6) * 8;
      d += ` L ${x} ${sea - crest + ripple}`;
    }
    return d + ` L ${W} ${H} L 0 ${H} Z`;
  };
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <circle cx={1260} cy={170} r={50} fill="var(--moon-white)" opacity={0.85} />
      <path d={wavePath()} fill="var(--water)" />
      <path d={wavePath()} fill="none" stroke="var(--ganga)" strokeWidth={3} opacity={0.6} />
      {/* The wave's own little light at its crest */}
      <Light x={cx} y={sea - h - 14} r={7 * (1 - spread)} t={t} seed={920} opacity={(rise > 0 ? 1 : 0) * (1 - spread)} />
      {/* Then the light spreads across the whole ocean */}
      {spread > 0 &&
        Array.from({ length: 40 }, (_, i) => {
          const x = cx + (i - 20) * 40 * spread;
          return <circle key={i} cx={x} cy={sea + Math.sin(x / 60 + t * 1.6) * 8 + 6} r={3} fill="var(--lamp)" opacity={spread * (0.4 + 0.4 * Math.sin(t * 3 + i))} />;
        })}
      {spread > 0.5 && <Ripple x={cx} y={sea} t={t} from={11} period={2.6} max={700} color="var(--gold)" count={2} />}
      <Mist t={t} y={sea - 40} opacity={0.08} color="var(--moon-white)" />
    </g>
  );
};

const d9Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <text x={800} y={110} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--gold)" opacity={a(0.3) * 0.8}>
        सिद्धिदात्री
      </text>
      <circle cx={800} cy={430} r={270} fill="url(#halo-gold)" opacity={0.4 + 0.05 * Math.sin(t * 1.4)} />
      <Radiate x={800} y={430} count={4} r0={50} r1={190} spread={260} start={-220} grow={a(0.6)} opacity={a(0.6)} />
      <Light x={800} y={430} r={17} t={t} seed={3} breathe={1} />
      <Discus x={560} y={330} r={34} t={t} opacity={a(1.0)} />
      <Conch x={1040} y={330} size={0.8} opacity={a(1.2)} />
      <Mace x={560} y={560} size={0.75} opacity={a(1.4)} />
      <Lotus x={1040} y={570} size={0.6} opacity={a(1.6)} />
      <Lotus x={800} y={800} size={1.6} open={a(1.9)} opacity={a(1.9)} />
      <Bowing x={160} y={720} n={4} t={t} spread={80} opacity={a(2.2)} />
    </g>
  );
};

const d9Nine: Visual = ({ t }) => {
  const all = seg(t, 10.4, 12.0);
  const dawn = seg(t, 13.0, 15.6);
  const pos = (i: number) => {
    const a = Math.PI * (1.08 - (i / 8) * 1.16);
    return { x: 800 + Math.cos(a) * 600, y: 640 - Math.sin(a) * 340 };
  };
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={dawn} />
      <Stars t={t} opacity={1 - dawn * 0.7} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Ground y={800} />
      {all > 0 && <circle cx={800} cy={480} r={120 + all * 520} fill="url(#halo-gold)" opacity={all * 0.6} />}
      {THEMES.map((name, i) => {
        const p = pos(i);
        const lit = seg(t, 0.8 + i * 1.2, 1.4 + i * 1.2);
        return (
          <g key={name}>
            <path d={`M ${p.x - 26} ${p.y + 6} Q ${p.x} ${p.y + 30} ${p.x + 26} ${p.y + 6} Z`} fill="var(--altar)" />
            {lit > 0 && <Flame x={p.x} y={p.y + 4} size={0.12} t={t + i} intensity={lit} />}
            <text x={p.x} y={p.y + 62} textAnchor="middle" className="svg-mono" fontSize={18} letterSpacing={2} fill={i === 8 ? "var(--gold)" : "var(--text)"} opacity={lit * 0.9}>
              {name.toUpperCase()}
            </text>
          </g>
        );
      })}
      {all > 0 &&
        THEMES.map((_, i) => {
          const p = pos(i);
          return <line key={i} x1={800} y1={480} x2={p.x} y2={p.y - 10} stroke="var(--gold)" strokeOpacity={0.25 * all} strokeWidth={2} />;
        })}
      <Light x={800} y={480} r={6 + all * 10} t={t} seed={3} opacity={all} breathe={1} />
      {all > 0.9 && <Ripple x={800} y={480} t={t} from={12} period={2.8} max={700} color="var(--gold)" count={2} />}
      <Particles t={t} kind="motes" count={26} seed={930} opacity={all} />
    </g>
  );
};

// ---------- Marvel scenes: letterboxed by the Stage -------------------------

/** A hammer lying in, or flying from, its crater. */
function Hammer({ x, y, rot = 0, glow = 0 }: { x: number; y: number; rot?: number; glow?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {glow > 0 && <circle r={90} fill="url(#halo-steel)" opacity={glow} />}
      <rect x={-40} y={-26} width={80} height={52} rx={6} fill="var(--hull)" stroke="var(--steel-light)" strokeWidth={2} />
      <rect x={-5} y={26} width={10} height={60} fill="var(--door)" />
    </g>
  );
}

const d9Crater: Visual = ({ t }) => {
  const approach = seg(t, 0.4, 3.0);
  const strain = t > 3.0 && t < 4.6 ? Math.sin(t * 30) * 3 : 0;
  const kneel = seg(t, 4.6, 6.0);
  const flash = t > 4.6 && t < 5.0 ? 1 - (t - 4.6) / 0.4 : 0;
  const loki = seg(t, 8.0, 9.4);
  return (
    <g>
      <Sky id="sky-steel" />
      <rect width={W} height={H} fill="var(--bolt)" opacity={flash * 0.3} />
      <Ground y={640} fill="var(--sand)" />
      <ellipse cx={800} cy={680} rx={420} ry={90} fill="var(--steel-sky-top)" stroke="var(--steel)" strokeOpacity={0.4} />
      <Hammer x={800 + strain} y={640} rot={-90} glow={0.4} />
      <Particles t={t} kind="rain" count={110} seed={940} />
      <Light x={lerp(420, 740, approach) + strain} y={lerp(600, 640, kneel)} r={9} color="steel" core="var(--steel-light)" t={t} seed={941} opacity={0.95} />
      {loki > 0 && <Light x={1140} y={600} r={8} color="green" core="var(--halo-green)" t={t} seed={942} opacity={loki} />}
      {loki > 0.9 && <Ripple x={1140} y={600} t={t} from={9.4} period={1.4} max={80} color="var(--halo-green)" count={2} />}
    </g>
  );
};

const d9Destroyer: Visual = ({ t }) => {
  const blast = (k: number) => (t > k && t < k + 0.6 ? 1 - (t - k) / 0.6 : 0);
  const flee = seg(t, 3.0, 6.4);
  const walk = seg(t, 6.6, 9.8);
  const fireFace = 0.6 + 0.4 * Math.abs(Math.sin(t * 5));
  return (
    <g>
      <Sky id="sky-dawn" />
      <Ground y={720} fill="var(--sand)" />
      {/* A small town street */}
      {[120, 300, 470, 640].map((x, i) => (
        <rect key={x} x={x} y={560 - (i % 2) * 40} width={140} height={160 + (i % 2) * 40} fill="var(--tower)" />
      ))}
      {[0.6, 3.0].map((k) => (blast(k) > 0 ? <circle key={k} cx={1060} cy={600} r={60 + (1 - blast(k)) * 120} fill="var(--amber)" opacity={blast(k) * 0.6} /> : null))}
      <Particles t={t} kind="embers" count={30} seed={943} box={{ x: 900, y: 400, w: 400, h: 320 }} />
      {/* The Destroyer */}
      <g>
        <rect x={1180} y={380} width={140} height={300} rx={16} fill="var(--hull)" stroke="var(--steel)" strokeWidth={3} />
        <rect x={1200} y={300} width={100} height={90} rx={12} fill="var(--hull)" stroke="var(--steel)" strokeWidth={3} />
        <rect x={1220} y={320} width={60} height={50} fill="var(--amber)" opacity={fireFace} />
        <circle cx={1250} cy={345} r={80} fill="url(#halo-ember)" opacity={fireFace * 0.6} />
      </g>
      {/* People getting to safety */}
      {Array.from({ length: 6 }, (_, i) => (
        <Light key={i} x={lerp(760 + i * 40, 80 + i * 30, flee)} y={700} r={5} color="gold" core="var(--lamp)" t={t} seed={944 + i} opacity={1 - flee * 0.8} />
      ))}
      {/* Thor, walking towards it alone */}
      <Light x={lerp(500, 980, walk)} y={690} r={9} color="steel" core="var(--steel-light)" t={t} seed={941} />
      {t > 9.8 && <Ripple x={980} y={690} t={t} from={9.8} period={1.6} max={90} color="var(--steel-light)" count={2} />}
    </g>
  );
};

const d9Worthy: Visual = ({ t }) => {
  const fly = seg(t, 0.6, 3.6);
  const strike = t > 3.6 && t < 4.4 ? 1 - (t - 3.6) / 0.8 : 0;
  const rise = seg(t, 3.8, 6.0);
  const hx = lerp(-80, 900, fly);
  const hy = lerp(300, 640, fly) - Math.sin(fly * Math.PI) * 80;
  return (
    <g>
      <Sky id="sky-dawn" />
      <rect width={W} height={H} fill="var(--bolt)" opacity={strike * 0.4} />
      <Ground y={720} fill="var(--sand)" />
      {[120, 300, 470].map((x, i) => (
        <rect key={x} x={x} y={560 - (i % 2) * 40} width={140} height={160 + (i % 2) * 40} fill="var(--tower)" />
      ))}
      {/* Thor, struck down, then rising */}
      <Light x={920} y={lerp(700, 600, rise)} r={lerp(7, 14, rise)} color="steel" core="var(--steel-light)" t={t} seed={941} breathe={rise} />
      {fly < 1 && <Hammer x={hx} y={hy} rot={-fly * 30} glow={0.3} />}
      {fly >= 1 && <Hammer x={900} y={lerp(640, 560, rise)} rot={0} glow={0.6} />}
      {strike > 0 && <path d="M 905 0 L 870 180 L 930 280 L 890 420 L 915 560" stroke="var(--bolt)" strokeWidth={6} fill="none" opacity={strike} />}
      {t > 3.6 && <Ripple x={910} y={600} t={t} from={3.6} period={2.2} max={420} color="var(--bolt)" count={2} />}
      {rise > 0.5 && <Radiate x={920} y={600} count={14} r0={30} r1={140} grow={rise} opacity={rise * 0.6} stroke="var(--steel-light)" width={3} spin={t * 6} />}
    </g>
  );
};

const d9Vormir: Visual = ({ t }) => {
  const tears = seg(t, 4.6, 6.0);
  const gone = seg(t, 8.6, 10.0);
  const stone = seg(t, 9.6, 11.0);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cliff)" />
      <rect width={W} height={H} fill="url(#sky-violet)" opacity={0.5} />
      <Stars t={t} opacity={0.3} />
      {/* Cliff and the ring below */}
      <path d="M 0 900 L 0 560 L 820 560 L 900 900 Z" fill="var(--tower)" />
      <ellipse cx={1180} cy={860} rx={260} ry={30} fill="none" stroke="var(--steel)" strokeOpacity={0.4} strokeWidth={3} />
      <Mist t={t} y={760} opacity={0.18} />
      {/* The guardian */}
      <Light x={240} y={500} r={7} color="ember" core="var(--blood)" t={t} seed={950} opacity={0.5} />
      {/* Gamora and Thanos at the edge */}
      <Light x={600} y={520} r={8} color="green" core="var(--halo-green)" t={t} seed={951} opacity={1 - gone} />
      <Light x={500} y={510} r={13} color="shadow" core="var(--thanos)" t={t} seed={952} />
      {tears > 0 && [0, 1].map((i) => <circle key={i} cx={496 + i * 10} cy={500 + ((t * 26 + i * 12) % 26)} r={3} fill="var(--ganga)" opacity={tears * 0.8 * (1 - gone)} />)}
      {/* The stone in his hand */}
      {stone > 0 && (
        <g>
          <circle cx={530} cy={520} r={40} fill="url(#halo-ember)" opacity={stone} />
          <circle cx={530} cy={520} r={7} fill="var(--soul)" opacity={stone} />
        </g>
      )}
      {gone > 0 && gone < 1 && <circle cx={600} cy={520} r={10 + gone * 60} fill="none" stroke="var(--halo-green)" strokeWidth={2} opacity={1 - gone} />}
    </g>
  );
};

const d9SoulWorld: Visual = ({ t }) => {
  const child = 1 - seg(t, 7.6, 9.4);
  const dim = seg(t, 8.6, 11.0);
  return (
    <g>
      <rect width={W} height={H} fill="var(--soul)" />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={0.35} />
      <rect x={0} y={560} width={W} height={340} fill="var(--amber)" opacity={0.5} />
      <line x1={0} y1={560} x2={W} y2={560} stroke="var(--lamp)" strokeOpacity={0.4} />
      {/* Reflections in still water */}
      <Light x={700} y={520} r={14 - dim * 4} color="shadow" core="var(--thanos)" t={t} seed={952} opacity={1 - dim * 0.4} />
      <circle cx={700} cy={600} r={10} fill="var(--thanos)" opacity={0.25 * (1 - dim * 0.4)} />
      <Light x={900} y={530} r={6} color="green" core="var(--halo-green)" t={t} seed={953} opacity={child} />
      <circle cx={900} cy={590} r={5} fill="var(--halo-green)" opacity={0.25 * child} />
      {t > 3.8 && t < 6.6 && <Ripple x={700} y={520} t={t} from={3.8} period={1.4} max={70} color="var(--thanos)" count={1} />}
      {t > 6.6 && t < 7.2 && <Ripple x={900} y={530} t={t} from={6.6} period={1.2} max={60} color="var(--halo-green)" count={1} />}
      {/* Emptiness, growing */}
      <rect width={W} height={H} fill="var(--cliff)" opacity={dim * 0.35} />
    </g>
  );
};

export const day9Visuals: Record<string, Visual> = {
  d9Opening,
  d9Siddhis,
  d9Ardhanari,
  d9Light,
  d9Wave,
  d9Emblems,
  d9Nine,
  d9Crater,
  d9Destroyer,
  d9Worthy,
  d9Vormir,
  d9SoulWorld,
};

export const day9Film = ["d9Crater", "d9Destroyer", "d9Worthy", "d9Vormir", "d9SoulWorld"];
