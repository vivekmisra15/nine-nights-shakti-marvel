// ---------------------------------------------------------------------------
// Day 3 illustrations: Chandraghanta.
// The bell is the motif: its sound is drawn as rings that push harm back.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Ground, H, Light, Mist, Mountains, Particles, RIDGE_FAR, RIDGE_MID, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { BigCat, Bell, Bow, Crescent, Radiate, Skyline, Sword, Trident } from "../kit";

/** The half-moon with a bell hanging beneath it: her emblem. */
function BellMoon({ x, y, scale = 1, t, swing = 0, opacity = 1 }: { x: number; y: number; scale?: number; t: number; swing?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <Crescent x={x} y={y} scale={scale} rotate={-120} />
      <Bell x={x} y={y + 62 * scale} size={34 * scale} swing={swing * Math.sin(t * 5)} />
    </g>
  );
}

// ---------- tradition scenes ------------------------------------------------

const d3Opening: Visual = ({ t }) => {
  const moon = seg(t, 0.2, 2.6);
  const name = seg(t, 2.8, 5);
  const ring = t > 1 ? Math.max(0, 1 - (t - 1) / 3) : 0;
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Mountains />
      <Mist t={t} y={720} />
      <BellMoon x={800} y={lerp(420, 300, moon)} scale={1.6} t={t} swing={ring * 14} opacity={moon} />
      {t > 1 && <Ripple x={800} y={400} t={t} from={1} period={3} max={460} color="var(--gold)" count={3} />}
      <text x={800} y={600} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        चन्द्रघण्टा
      </text>
      <text x={800} y={652} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        CHANDRAGHANTA · THE MOON-BELL
      </text>
      <Particles t={t} kind="motes" count={24} seed={301} opacity={seg(t, 6, 8)} />
    </g>
  );
};

const PALACE_X = 380;
const r3 = seeded(303);
const COMPANIONS = Array.from({ length: 16 }, (_, i) => ({ dx: 120 + (i % 8) * 70 + r3() * 30, dy: (Math.floor(i / 8) - 0.5) * 70 + r3() * 30, s: r3() }));

const d3Procession: Visual = ({ t }) => {
  const arrive = seg(t, 3.6, 9.0);
  const faint = seg(t, 8.0, 9.4);
  const shake = t > 4 && t < 9 ? Math.sin(t * 9) * 2 : 0;
  const sx = lerp(1700, 1120, arrive);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Ground y={700} />
      {/* The palace, decorated for a royal groom */}
      <g>
        <rect x={PALACE_X - 200} y={420} width={400} height={280} fill="var(--altar-dark)" />
        <path d={`M ${PALACE_X - 230} 430 L ${PALACE_X} 300 L ${PALACE_X + 230} 430 Z`} fill="var(--altar)" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={PALACE_X - 180 + i * 60} cy={440 + Math.sin(t * 2 + i) * 4} r={7} fill="var(--lamp)" opacity={0.85} />
        ))}
        <rect x={PALACE_X - 40} y={560} width={80} height={140} fill="var(--window)" opacity={0.35} />
      </g>
      {/* Guests */}
      {[0, 1, 2, 3].map((i) => (
        <Light key={i} x={PALACE_X - 120 + i * 80 - faint * (i - 1.5) * 30} y={740 + shake} r={5} t={t} seed={i + 40} opacity={0.7} />
      ))}
      {/* Mena, Parvati's mother: falls when she sees the groom */}
      <Light x={PALACE_X + 160} y={lerp(640, 690, faint)} r={7} color="rose" core="var(--petal)" t={t} seed={41} opacity={1 - faint * 0.6} />
      {/* Parvati, between the two */}
      <Light x={760} y={640} r={9} t={t} seed={3} breathe={1} />
      {/* Shiva's wild procession */}
      <g transform={`translate(${shake} 0)`}>
        {COMPANIONS.map((c, i) => (
          <Light key={i} x={sx + c.dx + Math.sin(t * 3 + i) * 10} y={640 + c.dy + Math.abs(Math.sin(t * 4 + i)) * -14} r={4 + c.s * 3} color="shadow" core="var(--shadow-line)" t={t} seed={i} />
        ))}
        {/* The bull */}
        <path d={`M ${sx - 70} 700 l 0 -50 q 10 -40 70 -40 l 70 0 q 40 0 50 -20 l 18 -6 l -4 22 q 10 30 -20 44 l 0 50 Z`} fill="var(--panel-svg)" stroke="var(--ash)" strokeOpacity={0.4} />
        <Light x={sx + 10} y={560} r={10} color="pale" core="var(--ash)" t={t} seed={42} />
      </g>
      <Particles t={t} kind="ash" count={36} seed={304} opacity={arrive} box={{ x: 900, y: 300, w: 700, h: 500 }} />
      {t > 8.4 && <rect width={W} height={H} fill="var(--night)" opacity={0.15 * seg(t, 8.4, 10)} />}
    </g>
  );
};

const d3Form: Visual = ({ t }) => {
  const moon = seg(t, 0.4, 2.0);
  const arms = seg(t, 1.2, 3.6);
  const cat = seg(t, 2.4, 4.0);
  const split = seg(t, 4.4, 6.0) * (1 - seg(t, 8.6, 10.4));
  const settle = seg(t, 8.8, 11);
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Ground y={760} />
      {/* Fierce half toward the procession (right), gentle half toward Mena (left) */}
      <circle cx={800} cy={430} r={260 * split} fill="url(#halo-ember)" opacity={0.55 * split} transform={`translate(${split * 120} 0)`} />
      <circle cx={800} cy={430} r={260 * split} fill="url(#halo-rose)" opacity={0.55 * split} transform={`translate(${split * -120} 0)`} />
      <Radiate x={800} y={430} count={10} r0={40} r1={170} spread={300} start={-240} grow={arms} opacity={arms} spin={Math.sin(t * 0.6) * 3} />
      <BigCat x={830} y={720} size={0.9} stripes t={t} opacity={cat} />
      <Light x={800} y={430} r={14} t={t} seed={3} breathe={1} />
      <BellMoon x={800} y={300} scale={0.8} t={t} swing={6} opacity={moon} />
      {/* The procession settles on the right; Mena rises on the left */}
      {Array.from({ length: 8 }, (_, i) => (
        <Light key={i} x={1260 + (i % 4) * 60} y={700 - Math.floor(i / 4) * 50 + Math.sin(t * (4 - settle * 3.5) + i) * 12 * (1 - settle)} r={5} color={settle > 0.5 ? "pale" : "shadow"} core="var(--shadow-line)" t={t} seed={i} opacity={0.8} />
      ))}
      <Light x={300} y={lerp(720, 660, settle)} r={7} color="rose" core="var(--petal)" t={t} seed={41} opacity={0.4 + settle * 0.6} />
      {settle > 0 && <Ripple x={800} y={430} t={t} from={8.8} period={3} max={600} color="var(--gold)" count={2} />}
    </g>
  );
};

const r3b = seeded(305);
const DEMONS = Array.from({ length: 22 }, (_, i) => {
  const left = i % 2 === 0;
  return { x: left ? 80 + r3b() * 420 : 1100 + r3b() * 420, y: 560 + r3b() * 220, s: r3b(), left };
});

const d3Battle: Visual = ({ t }) => {
  const advance = seg(t, 0.4, 4.4);
  const ring1 = 4.6;
  const calm = seg(t, 8.6, 11);
  return (
    <g>
      <Sky id="sky-violet" />
      <rect width={W} height={H} fill="var(--storm)" opacity={0.5 * (1 - calm)} />
      <Stars t={t} opacity={calm} />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Ground y={780} />
      <BigCat x={830} y={760} size={0.75} stripes t={t} />
      <Light x={800} y={470} r={13} t={t} seed={3} breathe={0.6} />
      <Bell x={880} y={420} size={36} swing={t > 4.4 && t < 7.4 ? Math.sin(t * 9) * 22 : 0} />
      {/* Demon armies close in from both sides, until the sound reaches them */}
      {DEMONS.map((d, i) => {
        const dir = d.left ? 1 : -1;
        const ax = d.x + dir * advance * 220;
        const dist = Math.hypot(ax - 800, d.y - 470);
        const fall = Math.max(0, Math.min(1, (t - ring1 - dist / 640) / 0.8));
        const x = ax - dir * fall * 60;
        return (
          <Light key={i} x={x} y={d.y + fall * 40} r={6 + d.s * 6} color="shadow" core="var(--shadow-core)" t={t} seed={i} opacity={(1 - fall * 0.85) * 0.95} />
        );
      })}
      {t > ring1 && <Ripple x={800} y={470} t={t} from={ring1} period={1.4} max={900} color="var(--lamp)" count={3} />}
      {t > 6 && <Ripple x={800} y={470} t={t} from={6} period={2} max={900} color="var(--gold)" count={2} />}
      <Particles t={t} kind="ash" count={40} seed={306} opacity={1 - calm} />
    </g>
  );
};

const d3Hymn: Visual = ({ t }) => {
  const sing = seg(t, 0.4, 2.4);
  const a = (at: number) => seg(t, at, at + 1.2);
  const twang = t > 6.4 && t < 7.6 ? 1 - (t - 6.4) / 1.2 : 0;
  return (
    <g>
      <Sky id="sky-dawn" />
      <Stars t={t} opacity={0.5} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <Mist t={t} y={700} />
      <Light x={800} y={420} r={14} t={t} seed={3} breathe={1} />
      <Trident x={470} y={400} size={1.2} opacity={a(3.6)} />
      <Sword x={1130} y={400} size={1.2} opacity={a(4.2)} />
      <Bell x={800} y={260} size={58} swing={Math.sin(t * 4) * 10 * a(4.8)} opacity={a(4.8)} />
      <Bow x={800} y={660} size={1.4} twang={twang} t={t} opacity={a(5.4)} />
      {t > 6.4 && <Ripple x={800} y={260} t={t} from={6.4} period={2.6} max={300} color="var(--gold)" count={2} />}
      {/* The gods singing, in an arc */}
      {Array.from({ length: 9 }, (_, i) => {
        const ang = Math.PI * (0.15 + (i / 8) * 0.7);
        const x = 800 - Math.cos(ang) * 600;
        const y = 820 - Math.sin(ang) * 120;
        return (
          <g key={i} opacity={sing}>
            <Light x={x} y={y} r={6} color="pale" core="var(--pale-core)" t={t} seed={i + 50} />
            <circle cx={x} cy={y} r={14 + 8 * Math.abs(Math.sin(t * 2 + i))} fill="none" stroke="var(--halo-pale)" strokeOpacity={0.25} />
          </g>
        );
      })}
      {/* Gentle and terrifying forms, both asked for */}
      <circle cx={800} cy={420} r={220} fill="url(#halo-rose)" opacity={0.3 * seg(t, 8.4, 9.6)} transform="translate(-90 0)" />
      <circle cx={800} cy={420} r={220} fill="url(#halo-ember)" opacity={0.3 * seg(t, 8.4, 9.6)} transform="translate(90 0)" />
    </g>
  );
};

const d3Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <text x={800} y={90} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--gold)" opacity={a(0.4) * 0.8}>
        चन्द्रघण्टा
      </text>
      <BellMoon x={800} y={160} scale={0.75} t={t} swing={5} opacity={a(0.4)} />
      <Radiate x={800} y={440} count={10} r0={40} r1={150} spread={300} start={-240} grow={a(0.8)} opacity={a(0.8)} />
      <circle cx={800} cy={440} r={200 + 6 * Math.sin(t * 1.5)} fill="url(#halo-gold)" opacity={0.3} />
      <Light x={800} y={440} r={14} t={t} seed={3} breathe={1} />
      <BigCat x={420} y={740} size={0.85} stripes t={t} opacity={a(1.4)} />
      {/* A calm face: closed eyes, a slight smile */}
      <g transform="translate(1180 300)" opacity={a(2)} fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round">
        <circle r={70} strokeOpacity={0.35} />
        <path d="M -36 -10 q 14 10 28 0 M 8 -10 q 14 10 28 0" />
        <path d="M -20 28 q 20 14 40 0" />
      </g>
      <Particles t={t} kind="motes" count={16} seed={307} box={{ x: 400, y: 200, w: 800, h: 500 }} />
    </g>
  );
};

// ---------- Marvel scenes: steel grade, letterboxed by the Stage ------------

/** An armoured rhino, abstract, facing left. */
function Rhino({ x, y, size = 1, t, run = 1 }: { x: number; y: number; size?: number; t: number; run?: number }) {
  const bob = Math.abs(Math.sin(t * 9)) * 10 * run;
  return (
    <g transform={`translate(${x} ${y - bob}) scale(${size})`}>
      <path d="M 160 -20 Q 170 -120 60 -130 L -60 -120 Q -110 -116 -130 -80 L -170 -70 L -205 -120 L -190 -60 L -170 -40 Q -160 0 -120 10 L -110 60 L -80 60 L -76 20 L 60 20 L 70 60 L 100 60 L 110 10 Q 160 10 160 -20 Z" fill="var(--rhino)" stroke="var(--steel)" strokeOpacity={0.5} strokeWidth={2} />
      <path d="M -40 -122 L 40 -128 M -40 -122 L -40 10 M 40 -128 L 40 18" stroke="var(--steel-light)" strokeOpacity={0.35} strokeWidth={3} />
      <circle cx={-115} cy={-80} r={5} fill="var(--steel-light)" />
    </g>
  );
}

const d3Plains: Visual = ({ t }) => {
  const charge = seg(t, 3.4, 9.8);
  const run = t < 9.6 ? 1 : Math.max(0, 1 - (t - 9.6) / 1.4);
  const rx = lerp(1700, 860, charge);
  const brace = seg(t, 3.6, 5);
  return (
    <g>
      <Sky id="sky-steel" />
      <path d={RIDGE_FAR} fill="var(--tower)" opacity={0.7} />
      <Ground y={640} fill="var(--plain)" />
      {/* The wider battle, far off */}
      {Array.from({ length: 14 }, (_, i) => (
        <Light key={i} x={160 + i * 100} y={600 + Math.sin(i) * 14} r={3} color="steel" core="var(--steel-light)" t={t} seed={i} opacity={0.4 + 0.3 * Math.abs(Math.sin(t * 3 + i))} />
      ))}
      <Particles t={t} kind="ash" count={40} seed={308} speed={0.6} box={{ x: 0, y: 300, w: W, h: 400 }} />
      {/* Okoye: still, spear raised */}
      <g>
        <line x1={600} y1={720} x2={lerp(620, 660, brace)} y2={lerp(540, 520, brace)} stroke="var(--steel-light)" strokeWidth={5} strokeLinecap="round" />
        <Light x={600} y={660} r={10} color="steel" core="var(--steel-light)" t={t} seed={310} />
      </g>
      {/* Dust behind the charge */}
      {charge > 0 && charge < 1 && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={rx + 160 + i * 40} cy={730 - (i % 3) * 14} r={20 + i * 5} fill="var(--ash)" opacity={0.18 * (1 - i / 8)} />)}
      <Rhino x={rx} y={720} size={1.1} t={t} run={run} />
      <Light x={rx + 30} y={570 - Math.abs(Math.sin(t * 9)) * 10 * run} r={7} color="steel" core="var(--steel-light)" t={t} seed={311} opacity={0.85} />
      {t > 9.8 && <Ripple x={700} y={680} t={t} from={9.8} period={2.2} max={160} color="var(--steel-light)" count={2} />}
    </g>
  );
};

/** A long armoured creature that swims through the air. */
function Leviathan({ t, x, y, halt = 0 }: { t: number; x: number; y: number; halt: number }) {
  const segs = 16;
  return (
    <g>
      {Array.from({ length: segs }, (_, i) => {
        const k = segs - i;
        const wave = Math.sin(t * 2.2 * (1 - halt * 0.8) - i * 0.5) * 50 * (1 - halt * 0.5);
        const cx = x + i * 70;
        const cy = y + wave + i * 8 + halt * (segs - k) * 4;
        const r = 64 - i * 2.4;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.45} strokeWidth={2} />
            <path d={`M ${cx - r * 0.7} ${cy - r * 0.4} L ${cx} ${cy - r} L ${cx + r * 0.7} ${cy - r * 0.4}`} fill="none" stroke="var(--steel-light)" strokeOpacity={0.3} />
          </g>
        );
      })}
      <circle cx={x - 24} cy={y + Math.sin(t * 2.2) * 50 * (1 - halt * 0.5) - 10} r={7} fill="var(--bolt)" opacity={1 - halt} />
    </g>
  );
}

const d3Leviathan: Visual = ({ t }) => {
  const come = seg(t, 0.2, 7.0);
  const change = seg(t, 7.4, 8.6);
  const hit = seg(t, 8.8, 9.6);
  const halt = seg(t, 9.0, 10.6);
  const lx = lerp(1500, 760, come) + halt * 40;
  return (
    <g>
      <Sky id="sky-steel" />
      <Skyline seed={312} base={760} maxH={420} />
      <Ground y={760} fill="var(--steel-sky-top)" />
      <Particles t={t} kind="ash" count={30} seed={313} />
      <Leviathan t={t} x={lx} y={330} halt={halt} />
      {/* The team, small lights on the street */}
      {[260, 340, 420].map((x, i) => (
        <Light key={i} x={x} y={730} r={6} color="steel" core="var(--steel-light)" t={t} seed={i + 320} opacity={0.8} />
      ))}
      {/* Banner walks in calmly; then the change */}
      <Light x={lerp(80, 540, seg(t, 0.4, 4.0)) + hit * 160} y={730 - change * 120 - hit * 300} r={lerp(7, 26, change)} color="green" core={change > 0.5 ? "var(--halo-green)" : "var(--steel-light)"} t={t} seed={321} breathe={change} />
      {t > 3.6 && t < 7.4 && <Ripple x={lerp(80, 540, 1)} y={730} t={t} from={3.6} period={1.4} max={90} color="var(--halo-green)" count={2} />}
      {hit > 0 && hit < 1 && <circle cx={760} cy={360} r={200 * hit} fill="var(--bolt)" opacity={(1 - hit) * 0.8} />}
      {t > 9 && <Ripple x={760} y={360} t={t} from={9} period={1.8} max={500} color="var(--halo-green)" count={2} />}
    </g>
  );
};

const d3Diner: Visual = ({ t }) => {
  const merge = seg(t, 4.2, 8.2);
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-low)" />
      {/* Window with daylight street outside */}
      <rect x={160} y={140} width={1280} height={360} fill="var(--steel-sky-top)" />
      <Skyline seed={330} base={500} minH={60} maxH={200} lit={0.4} />
      <rect x={0} y={0} width={160} height={H} fill="var(--steel-sky-low)" />
      <rect x={1440} y={0} width={160} height={H} fill="var(--steel-sky-low)" />
      <rect x={0} y={0} width={W} height={140} fill="var(--steel-sky-low)" />
      <rect x={160} y={140} width={1280} height={360} fill="none" stroke="var(--steel)" strokeWidth={10} opacity={0.6} />
      {[587, 1013].map((x) => (
        <rect key={x} x={x} y={140} width={8} height={360} fill="var(--steel)" opacity={0.6} />
      ))}
      {/* Pendant lamps */}
      {[420, 800, 1180].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={90} stroke="var(--steel)" strokeWidth={2} />
          <Light x={x} y={100} r={8} color="gold" core="var(--window)" t={t} seed={i + 331} />
        </g>
      ))}
      {/* Booth and table */}
      <rect x={300} y={560} width={1000} height={30} rx={8} fill="var(--door)" />
      <rect x={260} y={600} width={60} height={240} fill="var(--seat)" />
      <rect x={1280} y={600} width={60} height={240} fill="var(--seat)" />
      <Ground y={840} fill="var(--steel-sky-top)" />
      {/* Friends across the table */}
      <Light x={1080} y={520} r={8} color="steel" core="var(--steel-light)" t={t} seed={332} />
      <Light x={1180} y={520} r={8} color="steel" core="var(--steel-light)" t={t} seed={333} />
      {/* Brains and brawn: two lights becoming one */}
      <Light x={lerp(560, 640, merge)} y={500} r={lerp(8, 4, merge)} color="steel" core="var(--steel-light)" t={t} seed={334} opacity={1 - merge * 0.8} />
      <Light x={lerp(720, 640, merge)} y={lerp(480, 470, merge)} r={lerp(20, 26, merge)} color="green" core="var(--halo-green)" t={t} seed={335} breathe={0.8} />
      {merge > 0.9 && <Ripple x={640} y={470} t={t} from={8.2} period={2.4} max={140} color="var(--halo-green)" count={2} />}
    </g>
  );
};

export const day3Visuals: Record<string, Visual> = {
  d3Opening,
  d3Procession,
  d3Form,
  d3Battle,
  d3Hymn,
  d3Emblems,
  d3Plains,
  d3Leviathan,
  d3Diner,
};

export const day3Film = ["d3Plains", "d3Leviathan", "d3Diner"];
