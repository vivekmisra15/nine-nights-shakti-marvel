// ---------------------------------------------------------------------------
// Day 2 illustrations: Brahmacharini.
// Discipline is shown through the passing of time: seasons turning on the
// same peak, beads counted one by one, sparks that fail until they don't.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, lin, seeded, seg } from "../../engine/anim";
import {
  Flame,
  Ground,
  H,
  Light,
  Mist,
  Mountains,
  PEAK,
  Particles,
  RIDGE_FAR,
  RIDGE_MID,
  RIDGE_NEAR,
  Ripple,
  Sky,
  Stars,
  W,
  type Visual,
} from "../shared";

// ---------- shared pieces ---------------------------------------------------

/** A ring of prayer beads that light up one at a time. */
function Beads({ cx, cy, r, count, lit, t, size = 7 }: { cx: number; cy: number; r: number; count: number; lit: number; t: number; size?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const a = -Math.PI / 2 + (i / count) * Math.PI * 2 + t * 0.03;
        const on = i < lit;
        const head = Math.floor(lit) === i;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * r}
            cy={cy + Math.sin(a) * r}
            r={head ? size * 1.5 : size}
            fill={on ? "var(--gold)" : "none"}
            stroke="var(--gold)"
            strokeWidth={1.5}
            opacity={on ? 0.95 : 0.35}
          />
        );
      })}
    </g>
  );
}

/** The snowy peak where Parvati practises. */
function Peak({ snow = 0.6 }: { snow?: number }) {
  return (
    <g>
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={PEAK} fill="var(--ridge-mid)" />
      <path d={PEAK} fill="none" stroke="var(--snow)" strokeWidth={3} opacity={snow * 0.6} />
    </g>
  );
}

// ---------- tradition scenes ------------------------------------------------

const d2Opening: Visual = ({ t }) => {
  const name = seg(t, 2.6, 5);
  const beads = Math.min(27, Math.max(0, (t - 0.6) * 2.6));
  const born = seg(t, 7.6, 10);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Peak />
      <Mist t={t} y={760} />
      <Particles t={t} kind="snow" count={40} speed={0.5} seed={51} />
      <Light x={800} y={345} r={7} color="pale" core="var(--pale-core)" t={t} seed={11} breathe={1} />
      <Beads cx={800} cy={345} r={150} count={27} lit={beads} t={t} size={6} />
      <text x={800} y={140} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        ब्रह्मचारिणी
      </text>
      <text x={800} y={192} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        BRAHMACHARINI · THE ONE WHO PRACTISES
      </text>
      <Light x={420} y={790} r={7} t={t} seed={3} opacity={born} breathe={1} />
      {born > 0 && <Ripple x={420} y={790} t={t} from={7.6} period={2.4} max={140} color="var(--gold)" count={2} />}
    </g>
  );
};

/** Blossoms that open on bare branches when spring arrives. */
function Blossoms({ t, bloom }: { t: number; bloom: number }) {
  const r = seeded(61);
  const spots = Array.from({ length: 26 }, () => ({ x: 120 + r() * 1360, y: 520 + r() * 220, s: 0.6 + r() }));
  return (
    <g>
      {spots.map((p, i) => (
        <g key={i} opacity={bloom}>
          <line x1={p.x} y1={p.y + 50} x2={p.x} y2={p.y} stroke="var(--branch)" strokeWidth={2} />
          <circle cx={p.x} cy={p.y} r={7 * p.s * bloom * (1 + 0.06 * Math.sin(t * 2 + i))} fill="var(--petal)" />
        </g>
      ))}
    </g>
  );
}

const d2Kama: Visual = ({ t }) => {
  const spring = seg(t, 4.4, 7.4) * (1 - seg(t, 12.0, 15.0));
  const parvati = seg(t, 7.8, 9.0);
  const kama = seg(t, 4.6, 6.4) * (1 - seg(t, 12.2, 13.4));
  const draw = seg(t, 8.4, 9.4);
  const fly = seg(t, 9.4, 11.6);
  const eye = seg(t, 11.4, 12.0) * (1 - seg(t, 13.2, 14.4));
  const ash = seg(t, 12.2, 13.0);
  const ax = lerp(400, 1050, fly);
  const ay = lerp(510, 400, fly) - Math.sin(fly * Math.PI) * 60;
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-spring)" opacity={spring} />
      <Stars t={t} opacity={1 - spring * 0.7} />
      <Mountains snow={1 - spring} />
      <Blossoms t={t} bloom={spring} />
      <Particles t={t} kind="petals" count={40} opacity={spring} seed={62} />
      {/* Shiva in meditation */}
      <Light x={1100} y={420} r={9} color="pale" core="var(--pale-core)" t={t} seed={11} breathe={1} />
      <circle cx={1100} cy={420} r={70} fill="none" stroke="var(--halo-pale)" strokeOpacity={0.25} />
      {/* Third eye */}
      <ellipse cx={1100} cy={330} rx={14} ry={22 * eye} fill="var(--lamp)" opacity={eye} />
      {eye > 0.3 && (
        <g opacity={eye}>
          <line x1={1100} y1={330} x2={400} y2={500} stroke="var(--ember)" strokeWidth={22 * eye} strokeLinecap="round" opacity={0.6} />
          <line x1={1100} y1={330} x2={400} y2={500} stroke="var(--lamp)" strokeWidth={6 * eye} strokeLinecap="round" />
        </g>
      )}
      {/* Kama with his bow */}
      <g opacity={kama}>
        <Light x={400} y={520} r={9} color="rose" core="var(--petal)" t={t} seed={12} />
        <path d={`M 440 ${470 - draw * 6} Q ${470 + draw * 26} 520 440 ${570 + draw * 6}`} fill="none" stroke="var(--petal)" strokeWidth={3} />
        <line x1={440} y1={470} x2={440 - draw * 30} y2={520} stroke="var(--petal)" strokeWidth={1} opacity={0.7} />
        <line x1={440} y1={570} x2={440 - draw * 30} y2={520} stroke="var(--petal)" strokeWidth={1} opacity={0.7} />
      </g>
      {fly > 0 && fly < 1 && (
        <g transform={`translate(${ax} ${ay}) rotate(-10)`}>
          <line x1={-50} y1={0} x2={0} y2={0} stroke="var(--petal)" strokeWidth={3} />
          <circle cx={4} cy={0} r={8} fill="var(--petal)" />
        </g>
      )}
      <Particles t={t} kind="ash" count={30} opacity={ash * (1 - seg(t, 14.5, 16))} box={{ x: 330, y: 470, w: 140, h: 240 }} seed={63} speed={0.4} />
      {/* Parvati, bringing flowers */}
      <Light x={820} y={610} r={9} t={t} seed={3} opacity={parvati} breathe={0.5} />
    </g>
  );
};

const d2Resolve: Visual = ({ t }) => {
  const dusk = seg(t, 0, 3);
  const shed = seg(t, 4.0, 7.0);
  const mena = seg(t, 7.2, 8.4);
  const climb = seg(t, 11.0, 14.0);
  const px = lerp(800, 800, climb);
  const py = lerp(520, 300, climb);
  const r = seeded(71);
  const orn = Array.from({ length: 10 }, (_, i) => ({ a: (i / 10) * Math.PI * 2, fall: 0.6 + r() * 0.8, dx: (r() - 0.5) * 60 }));
  return (
    <g>
      <Sky id="sky-dawn" />
      <rect width={W} height={H} fill="var(--sky-top)" opacity={1 - dusk * 0.6} />
      <Stars t={t} opacity={0.5} />
      <Peak snow={0.4} />
      <path d={RIDGE_NEAR} fill="var(--ridge-near)" />
      <Mist t={t} y={700} />
      {/* Ornaments orbit her, then fall away */}
      {orn.map((o, i) => {
        const orbit = o.a + t * 0.6;
        const ox = 800 + Math.cos(orbit) * 46;
        const oy = 520 + Math.sin(orbit) * 46;
        const fx = ox + o.dx * shed;
        const fy = oy + shed * shed * 260 * o.fall;
        return <circle key={i} cx={fx} cy={fy} r={5} fill="none" stroke="var(--gold)" strokeWidth={2} opacity={(1 - seg(t, 6.0, 8.0)) * (1 - climb)} />;
      })}
      {/* Mena's cry */}
      <Light x={420} y={640} r={6} color="ember" core="var(--amber)" t={t} seed={8} opacity={mena * (1 - climb * 0.5)} />
      {mena > 0 && <Ripple x={420} y={640} t={t} from={7.4} period={1.4} max={300} color="var(--amber)" count={2} />}
      <text x={420} y={560} textAnchor="middle" className="svg-devanagari" fontSize={44} fill="var(--amber)" opacity={mena * (1 - seg(t, 10.4, 11.6))}>
        उ मा
      </text>
      {climb > 0 && <path d={`M 800 520 L ${px} ${py}`} stroke="var(--gold)" strokeOpacity={0.3} strokeWidth={2} />}
      <Light x={px} y={py} r={9 + shed * 2} t={t} seed={3} breathe={0.6} />
    </g>
  );
};

/** Four seasons on the same peak. The light grows steadier as the years pass. */
const d2Seasons: Visual = ({ t }) => {
  const summer = 1 - seg(t, 6.6, 7.6);
  const rains = seg(t, 6.6, 7.6) * (1 - seg(t, 13.6, 14.6));
  const winter = seg(t, 13.6, 14.6) * (1 - seg(t, 20.6, 21.6));
  const leaves = seg(t, 20.6, 21.6);
  const leafFall = 1 - seg(t, 22, 26);
  const steady = seg(t, 0, 27);
  const sunR = 90 + 6 * Math.sin(t * 2);
  const flash = rains > 0.5 && Math.sin(t * 1.7) > 0.985;
  const fires = [
    { x: 640, y: 640 },
    { x: 960, y: 640 },
    { x: 700, y: 720 },
    { x: 900, y: 720 },
  ];
  const labels = ["SUMMER", "RAINS", "WINTER", "LEAVES"];
  const current = t < 7 ? 0 : t < 14 ? 1 : t < 21 ? 2 : 3;
  return (
    <g>
      <Sky />
      {/* Summer heat */}
      <rect width={W} height={H} fill="var(--heat)" opacity={summer * 0.28} />
      <g opacity={summer}>
        <circle cx={800} cy={150} r={sunR * 2.4} fill="url(#halo-ember)" />
        <circle cx={800} cy={150} r={sunR * 0.6} fill="var(--amber)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 + t * 0.2;
          return <line key={i} x1={800 + Math.cos(a) * 70} y1={150 + Math.sin(a) * 70} x2={800 + Math.cos(a) * 120} y2={150 + Math.sin(a) * 120} stroke="var(--amber)" strokeWidth={4} opacity={0.6} />;
        })}
      </g>
      <Stars t={t} opacity={winter * 0.9 + leaves * 0.6} />
      {/* Rain clouds */}
      <g opacity={rains}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={((t * 20 + i * 420) % 1900) - 150} cy={130 + (i % 2) * 40} rx={300} ry={70} fill="var(--cloud)" />
        ))}
      </g>
      {flash && <rect width={W} height={H} fill="var(--bolt)" opacity={0.25} />}
      <Peak snow={winter + leaves * 0.6} />
      {/* Winter's icy pool */}
      <ellipse cx={800} cy={700} rx={260 * winter} ry={46 * winter} fill="var(--ice)" opacity={winter * 0.8} />
      <ellipse cx={800} cy={700} rx={260 * winter} ry={46 * winter} fill="none" stroke="var(--snow)" strokeOpacity={winter * 0.6} />
      {/* The four fires */}
      {fires.map((f, i) => (
        <g key={i} opacity={summer}>
          <Flame x={f.x} y={f.y} t={t + i} size={0.35} intensity={summer} />
        </g>
      ))}
      <Particles t={t} kind="embers" count={20} opacity={summer} box={{ x: 600, y: 360, w: 400, h: 340 }} seed={81} />
      <Particles t={t} kind="rain" count={90} opacity={rains} speed={1} seed={82} />
      <Particles t={t} kind="snow" count={70} opacity={winter} speed={0.7} seed={83} />
      {/* The last tree, losing its leaves */}
      <g opacity={leaves}>
        <path d="M 1240 900 L 1250 560 M 1250 640 L 1180 560 M 1250 600 L 1320 520 M 1250 700 L 1330 650" stroke="var(--branch)" strokeWidth={8} strokeLinecap="round" fill="none" />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M ${1180 + (i % 5) * 34} ${520 + Math.floor(i / 5) * 40} q 8 -6 16 0 q -8 6 -16 0 Z`} fill="var(--leaf)" opacity={leafFall > i / 14 ? 1 : 0} />
        ))}
      </g>
      <Particles t={t} kind="leaves" count={14} opacity={leaves * leafFall} box={{ x: 1100, y: 500, w: 300, h: 400 }} seed={84} speed={0.6} />
      <text x={800} y={250} textAnchor="middle" className="svg-devanagari" fontSize={56} fill="var(--gold)" opacity={seg(t, 24.4, 26.4)}>
        अपर्णा · Aparna
      </text>
      {/* Parvati: steadier and brighter as the years pass */}
      <Light x={800} y={600} r={lerp(7, 13, steady)} t={t} seed={3} breathe={1 - steady} />
      <circle cx={800} cy={600} r={lerp(30, 70, steady)} fill="none" stroke="var(--gold)" strokeOpacity={steady * 0.5} />
      {/* Season track */}
      <g transform="translate(880 790)">
        {labels.map((l, i) => (
          <g key={l} transform={`translate(${i * 150} 0)`}>
            <circle cx={0} cy={0} r={i === current ? 9 : 6} fill={i <= current ? "var(--gold)" : "none"} stroke="var(--gold)" strokeWidth={1.5} />
            <text x={0} y={34} textAnchor="middle" className="svg-mono" fontSize={16} letterSpacing={3} fill={i === current ? "var(--gold)" : "var(--muted)"}>
              {l}
            </text>
            {i < 3 && <line x1={14} y1={0} x2={136} y2={0} stroke="var(--gold)" strokeOpacity={i < current ? 0.7 : 0.2} strokeWidth={1.5} />}
          </g>
        ))}
      </g>
    </g>
  );
};

/** The hermitage, used in the visitor and reveal scenes. */
function Hermitage() {
  return (
    <g>
      <Peak snow={0.5} />
      <path d={RIDGE_NEAR} fill="var(--ridge-near)" />
      <path d="M 1100 700 L 1160 640 L 1220 700 Z" fill="var(--figure)" stroke="var(--rim)" strokeWidth={1.5} />
    </g>
  );
}

const d2Visitor: Visual = ({ t }) => {
  const enter = seg(t, 0.5, 3.6);
  const vx = lerp(-40, 620, enter);
  const friend = t >= 4.0 && t < 7.2;
  const mock = t >= 7.4;
  const flare = seg(t, 8.6, 11.0);
  const turn = seg(t, 11.4, 13.6);
  const step = Math.abs(Math.sin(t * 6)) * 6 * (enter < 1 ? 1 : 0);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.8} />
      <Hermitage />
      <Mist t={t} y={720} />
      {/* Visitor: a pale light with a staff */}
      <g transform={`translate(${vx} ${600 - step})`}>
        <line x1={24} y1={-40} x2={24} y2={60} stroke="var(--rim)" strokeWidth={3} />
        <Light x={0} y={0} r={8} color="pale" core="var(--pale-core)" t={t} seed={14} />
      </g>
      {/* Friend explaining */}
      <Light x={1080} y={640} r={6} color="rose" core="var(--petal)" t={t} seed={15} />
      {friend && <Ripple x={1080} y={640} t={t} from={4.0} period={1.2} max={140} color="var(--petal)" count={2} />}
      {/* Mockery: jagged waves travel toward Parvati */}
      {mock &&
        [0, 1, 2].map((i) => {
          const p = (((t - 7.4) / 1.4 + i / 3) % 1 + 1) % 1;
          const x = lerp(660, 940, p);
          return (
            <path
              key={i}
              d={`M ${x} 540 l 12 20 l -12 20 l 12 20 l -12 20 l 12 20`}
              fill="none"
              stroke="var(--shadow-line)"
              strokeWidth={3}
              opacity={(1 - p) * 0.8 * (1 - turn)}
            />
          );
        })}
      {/* Parvati */}
      <circle cx={980} cy={600} r={60 + flare * 60} fill="url(#halo-gold)" opacity={flare * 0.6} />
      <Light x={lerp(980, 1040, turn)} y={600} r={11 + flare * 3} t={t} seed={3} />
    </g>
  );
};

const d2Revealed: Visual = ({ t }) => {
  const reveal = seg(t, 0.4, 3.6);
  const river = seg(t, 3.8, 7.0);
  const warm = seg(t, 7.4, 11);
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-spring)" opacity={warm * 0.6} />
      <Stars t={t} opacity={0.8} />
      <Hermitage />
      {/* Shiva revealed: the pale light opens out, crowned by the crescent */}
      <circle cx={640} cy={560} r={lerp(30, 260, reveal)} fill="url(#halo-pale)" opacity={0.8} />
      <Light x={640} y={560} r={lerp(8, 16, reveal)} color="pale" core="var(--pale-core)" t={t} seed={14} breathe={1} />
      <g transform={`translate(640 ${lerp(560, 400, reveal)})`} opacity={reveal}>
        <rect x={-60} y={-60} width={120} height={120} fill="var(--pale-core)" mask="url(#crescent)" transform="scale(0.6)" />
      </g>
      {/* The simile: a river stopped by a mountain in its path */}
      <g opacity={river * (1 - seg(t, 10, 12) * 0.6)}>
        <path
          d="M 1500 820 C 1380 780 1300 840 1200 800 S 1040 780 980 800"
          fill="none"
          stroke="var(--river)"
          strokeWidth={10}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.08 0.04"
          strokeDashoffset={-t * 0.08 * (1 - seg(t, 5.6, 7))}
        />
        <path d="M 900 860 L 960 760 L 1010 860 Z" fill="var(--ridge-mid)" stroke="var(--rim)" strokeWidth={1.5} />
      </g>
      <Light x={1040} y={600} r={12} t={t} seed={3} breathe={warm} />
      <Particles t={t} kind="petals" count={24} opacity={warm} seed={91} />
    </g>
  );
};

const d2Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  const draw = (at: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - seg(t, at, at + 2) });
  const counted = Math.max(0, (t - 1) * 3) % 28;
  const steps = Math.floor(Math.max(0, t - 2.5) * 1.2);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Mist t={t} y={660} />
      <text x={800} y={168} textAnchor="middle" className="svg-devanagari" fontSize={54} fill="var(--gold)" opacity={a(0.4) * 0.8}>
        ब्रह्मचारिणी
      </text>
      <Light x={800} y={440} r={14} t={t} seed={3} opacity={a(0.2)} breathe={1} />
      {/* Rosary, counted bead by bead */}
      <g opacity={a(0.8)}>
        <Beads cx={520} cy={450} r={90} count={27} lit={counted} t={0} size={6} />
      </g>
      {/* Water pot, drawn on */}
      <g transform="translate(1080 460)" fill="none" stroke="var(--gold)" strokeWidth={3} strokeLinejoin="round">
        <path {...draw(1.6)} d="M -60 0 Q -70 80 0 90 Q 70 80 60 0 Q 50 -30 20 -36 L 20 -60 L -20 -60 L -20 -36 Q -50 -30 -60 0 Z" />
        <path {...draw(2.4)} d="M 60 0 Q 110 -20 120 -70" />
        <path {...draw(2.8)} d="M -26 -60 L 26 -60" />
      </g>
      {/* Footsteps, walking on */}
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse
          key={i}
          cx={360 + i * 96}
          cy={780 + (i % 2) * 22}
          rx={10}
          ry={16}
          fill="var(--gold)"
          opacity={i < steps ? 0.65 - (steps - i) * 0.05 : 0}
          transform={`rotate(${i % 2 ? 8 : -8} ${360 + i * 96} ${780 + (i % 2) * 22})`}
        />
      ))}
      <Particles t={t} kind="motes" count={16} seed={92} box={{ x: 400, y: 200, w: 800, h: 500 }} />
    </g>
  );
};

// ---------- Marvel scenes: steel grade, letterboxed by the Stage ------------

const d2Door: Visual = ({ t }) => {
  const approach = seg(t, 0.4, 3.4);
  const open = seg(t, 3.6, 4.6) * (1 - seg(t, 7.2, 8.2));
  const worlds = seg(t, 3.8, 5.0) * (1 - seg(t, 6.8, 7.8));
  const pushed = seg(t, 7.4, 8.6);
  const night = seg(t, 7, 12.5);
  const sx = lerp(200, 720, approach) - pushed * 160;
  const sy = 640 + pushed * 20;
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={night} />
      <circle cx={1350} cy={lerp(340, 180, night)} r={30} fill="var(--steel-light)" opacity={night * 0.8} />
      <path d={RIDGE_FAR} fill="var(--tower)" />
      {/* Courtyard wall and roofs */}
      <rect x={480} y={430} width={640} height={230} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.4} />
      <path d="M 450 430 L 800 330 L 1150 430 Z" fill="var(--tower)" stroke="var(--steel)" strokeOpacity={0.4} />
      <path d="M 560 360 L 640 320 L 720 360 Z M 880 360 L 960 320 L 1040 360 Z" fill="var(--tower)" />
      {/* Door: two leaves that swing open */}
      <rect x={740} y={510} width={120} height={150} fill="var(--steel-ink)" />
      {worlds > 0 && (
        <g opacity={worlds}>
          {Array.from({ length: 6 }, (_, i) => (
            <circle
              key={i}
              cx={800}
              cy={585}
              r={20 + i * 26 + Math.sin(t * 2 + i) * 6}
              fill="none"
              stroke={["var(--band-1)", "var(--band-2)", "var(--band-3)"][i % 3]}
              strokeWidth={6}
              strokeDasharray="20 14"
              transform={`rotate(${t * (i % 2 ? 40 : -40)} 800 585)`}
            />
          ))}
        </g>
      )}
      <rect x={740} y={510} width={60 * (1 - open * 0.9)} height={150} fill="var(--door)" stroke="var(--steel)" strokeOpacity={0.5} />
      <rect x={800 + 60 * open * 0.9} y={510} width={60 * (1 - open * 0.9)} height={150} fill="var(--door)" stroke="var(--steel)" strokeOpacity={0.5} />
      <Ground y={660} fill="var(--steel-sky-low)" />
      {/* Strange, then the long wait */}
      <Light x={sx} y={sy} r={8} color="steel" core="var(--steel-light)" t={t} seed={21} />
      {t > 9 && <Ripple x={sx} y={sy} t={t} from={9} period={3} max={70} color="var(--steel-light)" count={1} />}
      <rect width={W} height={H} fill="var(--steel-sky-top)" opacity={night * 0.35} />
    </g>
  );
};

/** A ring of sparks that only partly forms until `success` reaches 1. */
function SparkRing({ x, y, t, attempt, success }: { x: number; y: number; t: number; attempt: number; success: number }) {
  const arc = success >= 1 ? 1 : 0.25 + 0.55 * Math.abs(Math.sin(t * 2.2)) * attempt;
  const r = 80 + success * 60;
  const count = 34;
  return (
    <g>
      {success > 0 && <circle cx={x} cy={y} r={r * 0.95} fill="var(--portal)" opacity={success * 0.75} />}
      {Array.from({ length: count }, (_, i) => {
        const frac = i / count;
        if (frac > arc) return null;
        const a = frac * Math.PI * 2 + t * 4;
        const jitter = seeded(i + Math.floor(t * 20))() * 10;
        return <circle key={i} cx={x + Math.cos(a) * (r + jitter)} cy={y + Math.sin(a) * (r + jitter)} r={3} fill="var(--amber)" opacity={0.9} />;
      })}
    </g>
  );
}

const d2Everest: Visual = ({ t }) => {
  const study = 1 - seg(t, 4.4, 5.6);
  const summit = seg(t, 4.6, 6.0);
  const attempt = seg(t, 7.0, 8.0) * (1 - seg(t, 13.6, 14.8));
  const success = seg(t, 11.6, 12.2) * (1 - seg(t, 14.2, 15.6));
  const through = seg(t, 12.6, 14.4);
  const shake = study > 0.5 ? Math.sin(t * 30) * 3 : 0;
  return (
    <g>
      {/* Study: night, candle, pages, sparks that fail */}
      <g opacity={study}>
        <Sky id="sky-steel" />
        <Stars t={t} opacity={0.4} />
        <rect x={500} y={560} width={600} height={20} fill="var(--door)" />
        {Array.from({ length: 4 }, (_, i) => {
          const flip = (t * 1.2 + i * 0.25) % 1;
          return <rect key={i} x={800} y={500} width={90} height={60} fill="var(--page)" opacity={0.5} transform={`rotate(${-flip * 180} 800 560) skewY(-8)`} />;
        })}
        <Flame x={620} y={556} size={0.18} t={t} />
        <g transform={`translate(${shake} 0)`}>
          <SparkRing x={1000} y={430} t={t} attempt={0.5} success={0} />
        </g>
        <Light x={800} y={470} r={8} color="steel" core="var(--steel-light)" t={t} seed={21} />
      </g>
      {/* Everest */}
      <g opacity={summit}>
        <Sky id="sky-steel" />
        <path d={PEAK} fill="var(--snow-ridge)" />
        <path d={PEAK} fill="none" stroke="var(--snow)" strokeWidth={3} />
        <Particles t={t} kind="snow" count={120} speed={2.4} seed={95} />
        <Mist t={t * 4} y={420} opacity={0.18} color="var(--snow)" />
        <SparkRing x={980} y={360} t={t} attempt={attempt} success={success} />
        <Light x={lerp(800, 980, through)} y={lerp(345, 360, through)} r={8} color="steel" core="var(--steel-light)" t={t} seed={21} opacity={1 - seg(t, 13.6, 14.4)} />
      </g>
    </g>
  );
};

const d2Balcony: Visual = ({ t }) => {
  const fade = seg(t, 10.6, 14.0);
  const speak = t > 5 && t < 9.6;
  const r = seeded(97);
  const skyline = Array.from({ length: 22 }, (_, i) => ({ x: i * 76, h: 80 + r() * 200 }));
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.3} />
      {skyline.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={600 - b.h} width={60} height={b.h} fill="var(--tower)" />
          {Array.from({ length: 4 }, (_, j) => (
            <rect key={j} x={b.x + 10 + (j % 2) * 26} y={600 - b.h + 20 + Math.floor(j / 2) * 40} width={10} height={14} fill="var(--window)" opacity={(i + j) % 3 === 0 ? 0.8 : 0.2} />
          ))}
        </g>
      ))}
      <Particles t={t} kind="snow" count={70} speed={0.35} seed={98} />
      {/* Balcony rail */}
      <rect x={0} y={660} width={W} height={10} fill="var(--steel)" opacity={0.6} />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 80} y={670} width={6} height={140} fill="var(--steel)" opacity={0.4} />
      ))}
      <Ground y={800} fill="var(--steel-sky-top)" />
      {/* The Ancient One fades into the snow; Strange stays */}
      <Light x={660} y={600} r={9} color="pale" core="var(--pale-core)" t={t} seed={23} opacity={0.85 * (1 - fade)} />
      {speak && <Ripple x={660} y={600} t={t} from={5} period={1.6} max={110} color="var(--halo-pale)" count={2} />}
      <Particles t={t} kind="motes" count={20} opacity={fade * (1 - seg(t, 13.5, 15))} box={{ x: 600, y: 300, w: 120, h: 300 }} seed={99} />
      <Light x={lerp(900, 880, fade)} y={600} r={8 + fade * 3} color="steel" core="var(--steel-light)" t={t} seed={21} />
    </g>
  );
};

const RECRUITS = [
  { x: 560, y: 640 },
  { x: 640, y: 640 },
  { x: 720, y: 640 },
  { x: 880, y: 640 },
  { x: 960, y: 640 },
  { x: 600, y: 700 },
  { x: 680, y: 700 },
  { x: 920, y: 700 },
];
const STEVE = { x: 840, y: 700 };
const LAND = { x: 780, y: 690 };

const d2Yard: Visual = ({ t }) => {
  const throwP = lin(t, 2.8, 8.0);
  const scatter = seg(t, 8.0, 9.4);
  const dive = seg(t, 8.4, 9.2);
  const nightP = seg(t, 13.6, 15.0);
  const bob = (i: number) => (t < 8 ? Math.abs(Math.sin(t * 3 + i)) * 10 : 0);
  const gx = lerp(1320, LAND.x, throwP);
  const gy = lerp(560, LAND.y, throwP) - Math.sin(throwP * Math.PI) * 420;
  return (
    <g>
      <g opacity={1 - nightP}>
        <Sky id="sky-dawn" />
        <path d={RIDGE_FAR} fill="var(--tower)" opacity={0.6} />
        <Ground y={600} fill="var(--yard)" />
        {/* Flagpole and sandbags */}
        <line x1={240} y1={600} x2={240} y2={300} stroke="var(--steel)" strokeWidth={4} />
        <path d={`M 240 300 l ${80 + Math.sin(t * 3) * 8} 20 l ${-80 - Math.sin(t * 3) * 8} 20 Z`} fill="var(--steel-light)" opacity={0.6} />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx={1100 + (i % 4) * 46} cy={620 - Math.floor(i / 4) * 22} rx={26} ry={14} fill="var(--sandbag)" />
        ))}
        {/* Colonel */}
        <Light x={1320} y={600} r={10} color="steel" core="var(--steel-light)" t={t} seed={31} />
        {/* Recruits */}
        {RECRUITS.map((r, i) => {
          const dx = (r.x - LAND.x) * 3 * scatter;
          const dy = (r.y - LAND.y + 30) * 2 * scatter;
          return <Light key={i} x={r.x + dx} y={r.y + dy - bob(i)} r={6} color="steel" core="var(--steel-light)" t={t} seed={i} opacity={0.75} />;
        })}
        {/* The grenade, in a slow arc */}
        {throwP > 0 && throwP < 1 && <circle cx={gx} cy={gy} r={9} fill="var(--grenade)" stroke="var(--steel-light)" strokeWidth={1.5} />}
        {throwP >= 1 && <circle cx={LAND.x} cy={LAND.y} r={9} fill="var(--grenade)" opacity={1 - dive} />}
        {/* Steve: smaller, brighter, moves toward it */}
        <Light x={lerp(STEVE.x, LAND.x, dive)} y={lerp(STEVE.y, LAND.y, dive) - bob(9)} r={lerp(6, 9, dive)} color="gold" core="var(--lamp)" t={t} seed={32} />
        {dive >= 1 && <Ripple x={LAND.x} y={LAND.y} t={t} from={9.2} period={1.6} max={200} color="var(--lamp)" count={2} />}
      </g>
      {/* The night before: two lights by a lamp */}
      <g opacity={nightP}>
        <Sky id="sky-steel" />
        <Stars t={t} opacity={0.5} />
        <path d="M 520 700 L 800 420 L 1080 700 Z" fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.5} />
        <Flame x={800} y={640} size={0.16} t={t} />
        <Light x={700} y={650} r={8} color="ember" core="var(--amber)" t={t} seed={33} breathe={1} />
        <Light x={900} y={650} r={7} color="gold" core="var(--lamp)" t={t} seed={32} />
        {t > 14.6 && <Ripple x={700} y={650} t={t} from={14.6} period={2} max={120} color="var(--amber)" count={2} />}
      </g>
    </g>
  );
};

export const day2Visuals: Record<string, Visual> = {
  d2Opening,
  d2Kama,
  d2Resolve,
  d2Seasons,
  d2Visitor,
  d2Revealed,
  d2Emblems,
  d2Door,
  d2Everest,
  d2Balcony,
  d2Yard,
};

export const day2Film = ["d2Door", "d2Everest", "d2Balcony", "d2Yard"];

