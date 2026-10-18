// ---------------------------------------------------------------------------
// Day 5 illustrations: Skandamata.
// A spark passed from hand to hand, six babies gathered into one child, and a
// spear given for the road. The Marvel scenes are about being sent on.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Flame, Ground, H, Light, Mist, Mountains, Particles, RIDGE_FAR, RIDGE_MID, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { BigCat, Lotus, Radiate, Skyline, Spear } from "../kit";

/** The six Krittikas: the Pleiades cluster. */
const PLEIADES = [
  { x: 0, y: 0 },
  { x: 46, y: -22 },
  { x: 90, y: 6 },
  { x: 60, y: 44 },
  { x: 12, y: 54 },
  { x: -36, y: 30 },
];

/** A reed bed along a river bank. */
function Reeds({ t, y = 760, opacity = 1 }: { t: number; y?: number; opacity?: number }) {
  const r = seeded(501);
  const reeds = Array.from({ length: 70 }, () => ({ x: r() * W, h: 120 + r() * 200, d: r() * 6 }));
  return (
    <g opacity={opacity}>
      {reeds.map((rd, i) => {
        const sway = Math.sin(t * 1.2 + rd.d) * 12;
        return <path key={i} d={`M ${rd.x} ${y + 40} Q ${rd.x + sway * 0.5} ${y - rd.h * 0.5} ${rd.x + sway} ${y - rd.h}`} stroke="var(--reed)" strokeWidth={3} fill="none" opacity={0.7 + (i % 3) * 0.1} />;
      })}
    </g>
  );
}

/** Six small faces arranged round a centre, gathering in as `p` grows. */
function SixFaces({ x, y, p, t, spread = 160 }: { x: number; y: number; p: number; t: number; spread?: number }) {
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => {
        const a = -Math.PI / 2 + (i / 6) * Math.PI * 2 + t * 0.05;
        const rr = lerp(spread, 22, p);
        return <Light key={i} x={x + Math.cos(a) * rr} y={y + Math.sin(a) * rr} r={lerp(6, 5, p)} t={t} seed={510 + i} opacity={0.95} />;
      })}
    </g>
  );
}

// ---------- tradition scenes ------------------------------------------------

const d5Opening: Visual = ({ t }) => {
  const mother = seg(t, 0.2, 2.2);
  const child = seg(t, 1.4, 3.2);
  const name = seg(t, 2.8, 5.0);
  const stars = seg(t, 7.0, 9.4);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Mountains />
      <Mist t={t} y={720} />
      <g transform="translate(1180 160)" opacity={stars}>
        {PLEIADES.map((s, i) => (
          <Light key={i} x={s.x} y={s.y} r={3} color="pale" core="var(--star)" t={t} seed={i} />
        ))}
      </g>
      <Lotus x={800} y={520} size={1.6} open={mother} opacity={mother} />
      <Light x={800} y={360} r={14} t={t} seed={3} opacity={mother} breathe={1} />
      <Light x={800} y={450} r={7} t={t} seed={502} opacity={child} breathe={1} />
      <text x={800} y={640} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        स्कन्दमाता
      </text>
      <text x={800} y={692} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        SKANDAMATA · MOTHER OF SKANDA
      </text>
    </g>
  );
};

const d5Taraka: Visual = ({ t }) => {
  const rise = seg(t, 0.4, 3.6);
  const shiva = seg(t, 4.0, 5.6) * (1 - seg(t, 8.4, 9.6));
  const flee = seg(t, 8.6, 12);
  const flash = t > 0.4 && t < 0.9 ? 1 - (t - 0.4) / 0.5 : 0;
  return (
    <g>
      <Sky id="sky-violet" />
      <rect width={W} height={H} fill="var(--storm)" opacity={0.5} />
      <rect width={W} height={H} fill="var(--bolt)" opacity={flash * 0.35} />
      {/* Heaven on the clouds: pillars */}
      <g>
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={300 + i * 110} y={360} width={30} height={200} fill="var(--panel-svg)" stroke="var(--rim)" strokeOpacity={0.4} />
        ))}
        <rect x={270} y={340} width={520} height={24} fill="var(--panel-svg)" stroke="var(--rim)" strokeOpacity={0.4} />
        <ellipse cx={540} cy={580} rx={360} ry={50} fill="var(--cloud)" />
      </g>
      {/* The gods, driven out */}
      {Array.from({ length: 7 }, (_, i) => (
        <Light key={i} x={360 + i * 60 - flee * (i - 3) * 30} y={520 + flee * (260 + (i % 3) * 30)} r={6} color="pale" core="var(--pale-core)" t={t} seed={520 + i} opacity={0.85 - flee * 0.3} />
      ))}
      {/* Taraka */}
      <g opacity={rise}>
        <circle cx={1060} cy={lerp(700, 360, rise)} r={260} fill="url(#halo-shadow)" />
        <Light x={1060} y={lerp(700, 360, rise)} r={22} color="shadow" core="var(--shadow-core)" t={t} seed={521} breathe={1} />
        {t > 6 && <Ripple x={1060} y={360} t={t} from={6} period={2.4} max={360} color="var(--shadow-line)" count={2} />}
      </g>
      {/* Far away, Shiva in meditation */}
      <g opacity={shiva}>
        <path d="M 1220 720 L 1400 560 L 1580 720 Z" fill="var(--ridge-far)" />
        <path d="M 1360 596 L 1400 560 L 1440 596" fill="none" stroke="var(--snow)" strokeWidth={3} opacity={0.6} />
        <Light x={1400} y={540} r={6} color="pale" core="var(--pale-core)" t={t} seed={11} />
      </g>
    </g>
  );
};

const d5Sparks: Visual = ({ t }) => {
  // The spark's path: from above, to Agni, to the river, to the reeds.
  const p1 = seg(t, 0.6, 4.4);
  const p2 = seg(t, 5.6, 7.6);
  const p3 = seg(t, 8.2, 9.8);
  const fire = seg(t, 3.6, 4.6) * (1 - seg(t, 6.6, 8));
  const river = seg(t, 5.4, 6.8);
  const reeds = seg(t, 8.0, 9.6);
  const six = seg(t, 9.6, 11.4);
  const x = p3 > 0 ? lerp(980, 1180, p3) : p2 > 0 ? lerp(420, 980, p2) : lerp(800, 420, p1);
  const y = p3 > 0 ? lerp(700, 620, p3) : p2 > 0 ? lerp(640, 700, p2) : lerp(120, 600, p1);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.7} />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      {/* The river */}
      <g opacity={river}>
        <path d={`M 0 700 Q 400 660 800 700 T ${W} 690 L ${W} ${H} L 0 ${H} Z`} fill="var(--water)" />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M ${((t * 60 + i * 280) % (W + 200)) - 200} ${740 + (i % 3) * 30} q 40 -10 80 0`} stroke="var(--river)" strokeWidth={2} fill="none" opacity={0.5} />
        ))}
      </g>
      <Ground y={H - 40} fill="var(--ground)" />
      {/* Agni, the fire god, who could not hold it */}
      {fire > 0 && <Flame x={420} y={700} size={0.9} t={t} intensity={fire} />}
      <Reeds t={t} y={720} opacity={reeds} />
      {/* The spark itself */}
      {six < 1 && <Light x={x} y={y} r={9} color="ember" core="var(--lamp)" t={t} seed={530} opacity={1 - six} breathe={1} />}
      {six < 1 && <Particles t={t} kind="embers" count={18} seed={531} box={{ x: x - 40, y: y - 120, w: 80, h: 130 }} />}
      {/* Six baby boys among the reeds */}
      {six > 0 && <SixFaces x={1180} y={620} p={0} t={t} spread={60 + six * 90} />}
      {six > 0 && <Ripple x={1180} y={620} t={t} from={9.6} period={2.6} max={220} color="var(--gold)" count={2} />}
    </g>
  );
};

const d5Mothers: Visual = ({ t }) => {
  const descend = seg(t, 0.6, 4.4);
  const glow = seg(t, 4.6, 6.4);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Reeds t={t} y={760} />
      <Ground y={800} />
      {/* Six star-women come down to six babies */}
      {PLEIADES.map((s, i) => {
        const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
        const bx = 800 + Math.cos(a) * 150;
        const by = 620 + Math.sin(a) * 60;
        return (
          <g key={i}>
            <Light x={lerp(1180 + s.x, bx, descend)} y={lerp(140 + s.y, by - 60, descend)} r={6} color="pale" core="var(--star)" t={t} seed={540 + i} />
            <Light x={bx} y={by} r={5} t={t} seed={510 + i} opacity={0.9} />
            {glow > 0 && <circle cx={bx} cy={by - 30} r={50 * glow} fill="url(#halo-pale)" opacity={0.5 * glow} />}
          </g>
        );
      })}
      <Mist t={t} y={760} opacity={0.08} />
    </g>
  );
};

const d5Gathered: Visual = ({ t }) => {
  const come = seg(t, 0.4, 3.2);
  const gather = seg(t, 3.4, 6.6);
  const lull = seg(t, 8.4, 10.6);
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.5} />
      <Reeds t={t} y={780} opacity={0.8} />
      <Ground y={820} />
      {/* Parvati arrives */}
      <Light x={lerp(300, 800, come)} y={420} r={14} t={t} seed={3} breathe={1} />
      <circle cx={lerp(300, 800, come)} cy={460} r={260 * gather} fill="url(#halo-gold)" opacity={0.35 * gather} />
      {/* Six become one with six faces */}
      <SixFaces x={800} y={lerp(640, 530, gather)} p={gather} t={t} spread={170} />
      {gather > 0.95 && <Light x={800} y={530} r={9} t={t} seed={502} breathe={1} />}
      {gather > 0.95 && <Ripple x={800} y={530} t={t} from={6.6} period={2.4} max={220} color="var(--gold)" count={2} />}
      {/* Arms that hold: a soft cradle arc */}
      <path d="M 660 520 Q 800 640 940 520" stroke="var(--gold)" strokeWidth={6} fill="none" strokeLinecap="round" opacity={gather * 0.8} transform={`rotate(${Math.sin(t * 1.1) * 2 * lull} 800 560)`} />
      <Particles t={t} kind="motes" count={20} seed={550} opacity={lull} box={{ x: 500, y: 300, w: 600, h: 400 }} />
    </g>
  );
};

const d5Vel: Visual = ({ t }) => {
  const give = seg(t, 0.8, 3.4);
  const glow = seg(t, 3.4, 4.6);
  const demon = seg(t, 5.0, 7.4);
  const throwP = seg(t, 8.0, 9.0);
  const broken = seg(t, 9.0, 10.4);
  const sx = lerp(720, 860, give);
  const fan = seg(t, 1.4, 4.0);
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.4} />
      <Mountains />
      {/* Peacock fan behind Murugan */}
      <g opacity={fan * 0.85}>
        {Array.from({ length: 13 }, (_, i) => {
          const a = ((-160 + (i / 12) * 140) * Math.PI) / 180;
          const len = 210 * fan;
          const cx = 900 + Math.cos(a) * len;
          const cy = 560 + Math.sin(a) * len;
          return (
            <g key={i}>
              <line x1={900} y1={560} x2={cx} y2={cy} stroke="var(--peacock)" strokeWidth={3} />
              <circle cx={cx} cy={cy} r={14} fill="var(--peacock)" />
              <circle cx={cx} cy={cy} r={6} fill="var(--gold)" />
            </g>
          );
        })}
      </g>
      {/* Parvati gives the vel */}
      <Light x={560} y={420} r={14} t={t} seed={3} breathe={1} />
      <Light x={900} y={500} r={10} color="gold" core="var(--lamp)" t={t} seed={502} breathe={1} />
      {throwP <= 0 && <Spear x={sx} y={560} length={200} angle={lerp(-30, 0, give)} blade={1} fill={glow > 0 ? "var(--lamp)" : "var(--gold)"} />}
      {glow > 0 && throwP <= 0 && <circle cx={sx} cy={300} r={120 * glow} fill="url(#halo-gold)" opacity={glow} />}
      {/* The demon */}
      <g opacity={demon * (1 - broken)}>
        <circle cx={1360} cy={380} r={200} fill="url(#halo-shadow)" />
        <Light x={1360} y={380} r={18} color="shadow" core="var(--shadow-core)" t={t} seed={560} />
      </g>
      {throwP > 0 && throwP < 1 && <Spear x={lerp(900, 1180, throwP)} y={lerp(560, 450, throwP)} length={140} angle={69} fill="var(--lamp)" />}
      {broken > 0 && <Ripple x={1360} y={380} t={t} from={9} period={1.6} max={500} color="var(--lamp)" count={3} />}
      {broken > 0 && <Particles t={t} kind="motes" count={30} seed={561} opacity={broken} box={{ x: 1160, y: 200, w: 400, h: 400 }} />}
    </g>
  );
};

const d5Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <text x={800} y={110} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--gold)" opacity={a(0.4) * 0.8}>
        स्कन्दमाता
      </text>
      <circle cx={800} cy={460} r={240} fill="url(#halo-gold)" opacity={0.3 + 0.04 * Math.sin(t * 1.4)} />
      <Radiate x={800} y={420} count={4} r0={50} r1={150} spread={200} start={-190} grow={a(0.8)} opacity={a(0.8)} />
      <Light x={800} y={420} r={15} t={t} seed={3} breathe={1} />
      <Light x={800} y={560} r={9} t={t} seed={502} opacity={a(0.6)} breathe={1} />
      <Lotus x={800} y={800} size={1.5} open={a(1.0)} opacity={a(1.0)} />
      <Lotus x={560} y={400} size={0.55} opacity={a(1.4)} />
      <Lotus x={480} y={420} size={0.45} opacity={a(1.6)} />
      {/* Open palm: the boon-giving gesture */}
      <g transform="translate(1040 440)" opacity={a(1.8)} fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M -30 50 L -34 0 L -34 -46 M -18 -6 L -18 -60 M -2 -6 L -2 -64 M 14 -4 L 14 -56 M 28 4 L 34 -30 M -30 50 Q 0 70 28 46 L 30 4" />
        <circle cx={0} cy={-10} r={90} strokeOpacity={0.2} />
      </g>
      <BigCat x={1300} y={780} size={0.65} t={t} opacity={a(2.2)} />
    </g>
  );
};

// ---------- Marvel scenes: steel grade, letterboxed by the Stage ------------

/** Golden towers at dusk, drawn as plain spires. */
function Spires({ opacity = 1 }: { opacity?: number }) {
  const r = seeded(570);
  return (
    <g opacity={opacity}>
      {Array.from({ length: 16 }, (_, i) => {
        const x = 40 + i * 100 + r() * 30;
        const h = 140 + r() * 300;
        return <path key={i} d={`M ${x} 700 L ${x} ${700 - h} L ${x + 18} ${700 - h - 70} L ${x + 36} ${700 - h} L ${x + 36} 700 Z`} fill="var(--spire)" opacity={0.22 + (i % 3) * 0.08} />;
      })}
    </g>
  );
}

const d5Asgard: Visual = ({ t }) => {
  const talk = t > 4.2 && t < 8.2;
  const step = seg(t, 8.4, 10.0);
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.3} />
      <Spires />
      <Mist t={t} y={600} opacity={0.1} color="var(--window)" />
      {/* Balcony */}
      <rect x={0} y={700} width={W} height={12} fill="var(--rim)" opacity={0.6} />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 80} y={712} width={6} height={110} fill="var(--rim)" opacity={0.35} />
      ))}
      <Ground y={820} fill="var(--steel-sky-top)" />
      {/* Frigga, steady; Thor, dim and slumped, then reaching */}
      <Light x={940} y={600} r={10} color="gold" core="var(--lamp)" t={t} seed={571} breathe={0.8} />
      <Light x={lerp(640, 740, step)} y={lerp(640, 610, step)} r={9} color="steel" core="var(--steel-light)" t={t} seed={572} opacity={0.65 + step * 0.3} />
      {talk && <Ripple x={940} y={600} t={t} from={4.2} period={1.8} max={130} color="var(--halo-gold)" count={2} />}
      {t > 9.6 && <Ripple x={740} y={610} t={t} from={9.6} period={1.2} max={80} color="var(--steel-light)" count={1} />}
    </g>
  );
};

const d5Hammer: Visual = ({ t }) => {
  const fly = seg(t, 0.8, 3.6);
  const strike = t > 3.6 && t < 4.4 ? 1 - (t - 3.6) / 0.8 : 0;
  const bright = seg(t, 3.6, 5.6);
  const hx = lerp(-100, 900, fly);
  const hy = lerp(260, 520, fly) - Math.sin(fly * Math.PI) * 60;
  return (
    <g>
      <Sky id="sky-steel" />
      <Spires opacity={0.5} />
      <Ground y={760} fill="var(--steel-sky-top)" />
      <rect width={W} height={H} fill="var(--bolt)" opacity={strike * 0.4} />
      {/* The hand reaching out */}
      <Light x={940} y={600} r={lerp(9, 14, bright)} color="steel" core="var(--steel-light)" t={t} seed={572} breathe={bright} />
      <line x1={940} y1={600} x2={910} y2={540} stroke="var(--steel-light)" strokeWidth={5} strokeLinecap="round" />
      {/* The hammer, flying in */}
      {fly < 1 && (
        <g transform={`translate(${hx} ${hy}) rotate(${-fly * 20})`}>
          <rect x={-40} y={-24} width={80} height={48} rx={6} fill="var(--hull)" stroke="var(--steel-light)" strokeWidth={2} />
          <rect x={-5} y={24} width={10} height={60} fill="var(--door)" />
          <line x1={-40} y1={0} x2={-240 * fly} y2={0} stroke="var(--bolt)" strokeOpacity={0.35} strokeWidth={6} />
        </g>
      )}
      {fly >= 1 && (
        <g transform="translate(905 520)">
          <rect x={-40} y={-24} width={80} height={48} rx={6} fill="var(--hull)" stroke="var(--steel-light)" strokeWidth={2} />
          <rect x={-5} y={24} width={10} height={40} fill="var(--door)" />
        </g>
      )}
      {strike > 0 && (
        <path d="M 905 0 L 880 160 L 930 240 L 890 380 L 915 500" stroke="var(--bolt)" strokeWidth={6} fill="none" opacity={strike} />
      )}
      {t > 3.6 && <Ripple x={905} y={520} t={t} from={3.6} period={2.2} max={360} color="var(--bolt)" count={2} />}
    </g>
  );
};

const d5Ferry: Visual = ({ t }) => {
  const night = seg(t, 4.2, 5.6);
  const take = seg(t, 6.0, 8.0);
  return (
    <g>
      <g opacity={1 - night}>
        <Sky id="sky-steel" />
        <Skyline seed={580} base={560} maxH={260} lit={0.5} />
        <rect x={0} y={560} width={W} height={H - 560} fill="var(--water)" opacity={0.8} />
        {/* The ferry, split in two and held together */}
        <g transform="rotate(-4 600 620)">
          <path d="M 260 600 L 760 600 L 730 680 L 300 680 Z" fill="var(--hull)" stroke="var(--steel)" />
        </g>
        <g transform="rotate(5 1000 620)">
          <path d="M 840 600 L 1340 600 L 1300 680 L 870 680 Z" fill="var(--hull)" stroke="var(--steel)" />
        </g>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={760} y1={600 + i * 10} x2={840} y2={600 + i * 10 + Math.sin(t * 6 + i) * 3} stroke="var(--steel-light)" strokeOpacity={0.6} />
        ))}
        <Light x={800} y={lerp(200, 560, seg(t, 0.4, 2.4))} r={9} color="ember" core="var(--amber)" t={t} seed={581} />
      </g>
      {/* Night, on a rooftop: the suit is taken back */}
      <g opacity={night}>
        <Sky id="sky-steel" />
        <Stars t={t} opacity={0.4} />
        <Skyline seed={582} base={700} maxH={360} lit={0.8} />
        <Ground y={700} fill="var(--steel-sky-top)" />
        <Light x={600} y={640} r={7} color="steel" core="var(--steel-light)" t={t} seed={583} opacity={1 - take * 0.3} />
        <Light x={1000} y={630} r={9} color="ember" core="var(--amber)" t={t} seed={581} />
        {/* The suit, as a glowing outline, moving away from Peter */}
        <rect x={lerp(560, 960, take)} y={540} width={60} height={110} rx={20} fill="none" stroke="var(--halo-rose)" strokeWidth={3} opacity={0.8 - take * 0.3} />
      </g>
    </g>
  );
};

const d5Rubble: Visual = ({ t }) => {
  const collapse = seg(t, 0.3, 1.4);
  const call = t > 4.4 && t < 8;
  const puddle = seg(t, 8.0, 9.4);
  const lift = seg(t, 11.8, 14);
  const strain = t > 9.4 && t < 11.8 ? Math.sin(t * 22) * 3 : 0;
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-top)" />
      <Particles t={t} kind="ash" count={40} seed={590} speed={0.5} />
      <Ground y={760} fill="var(--cave)" />
      {/* The puddle and the reflection */}
      <ellipse cx={980} cy={790} rx={160} ry={22} fill="var(--water)" opacity={puddle * 0.8} />
      <Light x={980} y={792} r={5} color="steel" core="var(--steel-light)" t={t} seed={591} opacity={puddle * 0.6} />
      {/* Peter, pinned */}
      <Light x={800} y={lerp(720, 600, lift)} r={lerp(7, 11, lift)} color="steel" core="var(--steel-light)" t={t} seed={592} breathe={lift} />
      {call && <Ripple x={800} y={720} t={t} from={4.4} period={1.4} max={70} color="var(--steel-light)" count={1} />}
      {t > 9.2 && t < 11.8 && <circle cx={800} cy={720} r={30} fill="url(#halo-steel)" opacity={0.6} />}
      {/* The rubble: beams and slabs that fall, then lift */}
      <g transform={`translate(${strain} ${lerp(-500, 0, collapse) - lift * 260}) rotate(${lift * -8} 800 640)`}>
        <rect x={420} y={600} width={760} height={70} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.5} transform="rotate(-6 800 640)" />
        <rect x={500} y={520} width={520} height={60} fill="var(--tower)" stroke="var(--steel)" strokeOpacity={0.4} transform="rotate(8 760 550)" />
        <rect x={700} y={430} width={420} height={70} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.4} transform="rotate(-12 900 460)" />
        {[460, 620, 1040].map((x, i) => (
          <line key={x} x1={x} y1={420 - i * 30} x2={x + 120} y2={700} stroke="var(--steel)" strokeWidth={8} opacity={0.6} />
        ))}
      </g>
      {lift > 0 && <Ripple x={800} y={620} t={t} from={11.8} period={1.8} max={420} color="var(--steel-light)" count={2} />}
      {lift > 0.3 && <Particles t={t} kind="ash" count={40} seed={593} opacity={lift} box={{ x: 400, y: 300, w: 800, h: 400 }} speed={2} />}
    </g>
  );
};

export const day5Visuals: Record<string, Visual> = {
  d5Opening,
  d5Taraka,
  d5Sparks,
  d5Mothers,
  d5Gathered,
  d5Vel,
  d5Emblems,
  d5Asgard,
  d5Hammer,
  d5Ferry,
  d5Rubble,
};

export const day5Film = ["d5Asgard", "d5Hammer", "d5Ferry", "d5Rubble"];
