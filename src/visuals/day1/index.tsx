// ---------------------------------------------------------------------------
// Day 1 illustrations. Each is a function of time `t` (seconds).
// They are original, abstract drawings: Sati and other figures appear as
// light, and no Marvel imagery is reproduced.
// The keys in `day1Visuals` match the `visual` field in content/day1.ts.
// ---------------------------------------------------------------------------

import { flicker, lerp, lin, seeded, seg } from "../../engine/anim";
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
  RIDGE_NEAR,
  Ripple,
  Sky,
  Stars,
  W,
  type Visual,
} from "../shared";

// ---------- shared shapes for the sacrifice scenes --------------------------

// Seats around the sacrifice: an arc behind the altar.
const SEATS = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (1.08 + (i / 8) * 0.84);
  return { x: 800 + Math.cos(a) * 470, y: 560 + Math.sin(a) * 150 };
});
const EMPTY_SEAT = { x: 1230, y: 470 };

function Altar({ t, intensity = 1 }: { t: number; intensity?: number }) {
  return (
    <g>
      <path d="M 690 700 L 910 700 L 880 660 L 720 660 Z" fill="var(--altar-dark)" />
      <path d="M 720 660 L 880 660 L 860 628 L 740 628 Z" fill="var(--altar)" />
      {intensity > 0.02 && <Flame x={800} y={630} t={t} size={0.9} intensity={intensity} />}
      {intensity > 0.02 && <Particles t={t} kind="embers" count={22} box={{ x: 720, y: 280, w: 160, h: 340 }} opacity={Math.min(1, intensity)} seed={5} />}
    </g>
  );
}

function Daksha({ x, y, scale = 1, opacity = 1, turn = 0 }: { x: number; y: number; scale?: number; opacity?: number; turn?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * (1 - turn * 0.25)} ${scale})`} opacity={opacity}>
      <path d="M -70 240 L -52 40 Q -46 0 -16 -12 L 16 -12 Q 46 0 52 40 L 70 240 Z" fill="var(--figure)" stroke="var(--rim)" strokeWidth={1.5} />
      <circle cx={0} cy={-40} r={26} fill="var(--figure)" stroke="var(--rim)" strokeWidth={1.5} />
      <path d="M -18 -60 L -10 -104 L 0 -76 L 10 -104 L 18 -60 Z" fill="var(--figure)" stroke="var(--rim)" strokeWidth={1.5} />
    </g>
  );
}

function Assembly({ t, guests = 1, dim = 0, scatter = 0 }: { t: number; guests?: number; dim?: number; scatter?: number }) {
  return (
    <g>
      {SEATS.map((s, i) => {
        const dx = (s.x - 800) * scatter * 0.6;
        const dy = -scatter * 60 * ((i % 3) + 1);
        const rot = scatter * (i % 2 ? 40 : -40);
        return (
          <g key={i} opacity={guests * (1 - scatter * 0.7)} transform={`translate(${dx} ${dy}) rotate(${rot} ${s.x} ${s.y})`}>
            <rect x={s.x - 44} y={s.y} width={88} height={16} rx={8} fill="var(--seat)" />
            <Light x={s.x} y={s.y - 28} r={6} color="gold" core="var(--guest)" t={t} seed={i} opacity={0.8 - dim * 0.45} />
          </g>
        );
      })}
      <g opacity={guests * (1 - scatter)}>
        <rect x={EMPTY_SEAT.x - 44} y={EMPTY_SEAT.y} width={88} height={16} rx={8} fill="none" stroke="var(--gold)" strokeDasharray="8 6" strokeWidth={3} />
      </g>
    </g>
  );
}

/** Daksha's palace, a stepped outline on the left. */
function Palace({ opacity = 1 }: { opacity?: number }) {
  return (
    <g opacity={opacity} fill="var(--figure)" stroke="var(--rim)" strokeWidth={1.5}>
      <path d="M 180 700 L 180 520 L 230 520 L 230 470 L 300 420 L 370 470 L 370 520 L 420 520 L 420 700 Z" />
      <path d="M 280 700 L 280 600 Q 300 575 320 600 L 320 700 Z" fill="var(--ground)" />
    </g>
  );
}

// ---------- Day 1 visuals ---------------------------------------------------

const mountainDawn: Visual = ({ t }) => {
  const rise = seg(t, 0, 4.5);
  const name = seg(t, 2.4, 4.8);
  const lamp = seg(t, 6.2, 8.2);
  return (
    <g>
      <Sky />
      <Stars t={t} from={0} />
      <text x={800} y={250} textAnchor="middle" className="svg-devanagari" fontSize={92} fill="var(--gold)" opacity={name * 0.85}>
        शैलपुत्री
      </text>
      <text x={800} y={310} textAnchor="middle" className="svg-mono" fontSize={22} letterSpacing={6} fill="var(--muted)" opacity={name}>
        SHAILAPUTRI · DAUGHTER OF THE MOUNTAIN
      </text>
      <Mountains rise={rise} />
      <Mist t={t} y={690} />
      <Light x={820} y={752} r={7} t={t} opacity={lamp} breathe={1} />
      <Particles t={t} kind="motes" count={16} opacity={lamp} box={{ x: 600, y: 420, w: 440, h: 340 }} />
    </g>
  );
};

const threeLayers: Visual = ({ t }) => {
  const bands = [
    { y: 250, at: 3.2, dev: "सती", name: "Sati", src: "SHIVA PURANA" },
    { y: 450, at: 6.0, dev: "पार्वती", name: "Parvati", src: "KUMARASAMBHAVA" },
    { y: 650, at: 8.8, dev: "शैलपुत्री", name: "Shailaputri", src: "DEVOTIONAL TRADITION" },
  ];
  const thread = seg(t, 1.0, 10.5);
  const dotY = lerp(150, 650, seg(t, 1.0, 10.5));
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.5} />
      <line x1={800} y1={150} x2={800} y2={lerp(150, 760, thread)} stroke="var(--gold)" strokeOpacity={0.45} strokeWidth={2} />
      {bands.map((b) => {
        const p = seg(t, b.at - 0.6, b.at + 0.8);
        return (
          <g key={b.name} opacity={0.15 + p * 0.85} transform={`translate(${(1 - p) * -40} ${(1 - p) * 14})`}>
            <rect x={380} y={b.y - 62} width={840} height={124} rx={62} fill="var(--panel-svg)" stroke="var(--rim)" strokeOpacity={p} />
            <text x={470} y={b.y + 14} className="svg-devanagari" fontSize={46} fill="var(--gold)">
              {b.dev}
            </text>
            <text x={1130} y={b.y - 4} textAnchor="end" className="svg-display" fontSize={34} fill="var(--text)">
              {b.name}
            </text>
            <text x={1130} y={b.y + 30} textAnchor="end" className="svg-mono" fontSize={17} letterSpacing={3} fill="var(--muted)">
              {b.src}
            </text>
          </g>
        );
      })}
      <Light x={800} y={dotY} r={8} t={t} breathe={1} />
    </g>
  );
};

const marriage: Visual = ({ t }) => {
  const daksha = seg(t, 0.2, 2.2);
  const shiva = seg(t, 3.6, 5.6);
  const go = seg(t, 7.4, 10.6);
  const snap = seg(t, 9.4, 10.2);
  const satiX = lerp(470, 1110, go);
  const satiY = lerp(640, 440, go) - Math.sin(go * Math.PI) * 120;
  // The thread between father and daughter stretches, then frays.
  const tx = 300;
  const ty = 560;
  const midX = (tx + satiX) / 2;
  const midY = (ty + satiY) / 2 + 60 * (1 - go);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <g transform="translate(0 40)">
        <path d={RIDGE_NEAR} fill="var(--ridge-near)" />
      </g>
      <Mist t={t} y={620} opacity={0.1} />
      <Palace opacity={daksha} />
      <Daksha x={300} y={470} scale={0.55} opacity={daksha} turn={seg(t, 10, 11.5)} />
      {/* Shiva: pale light on the mountain, with drifting ash motes */}
      <Light x={1160} y={420} r={9} color="pale" core="var(--pale-core)" t={t} seed={11} opacity={shiva} breathe={1} />
      <Particles t={t} kind="motes" count={14} opacity={shiva * 0.8} box={{ x: 1040, y: 260, w: 240, h: 220 }} seed={11} />
      {/* Thread */}
      {snap < 1 ? (
        <path
          d={`M ${tx} ${ty} Q ${midX} ${midY} ${satiX} ${satiY}`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={2}
          strokeDasharray={snap > 0 ? "6 10" : undefined}
          opacity={(0.5 - snap * 0.5) * daksha}
        />
      ) : (
        <g opacity={0.3 * (1 - seg(t, 10.2, 12))}>
          <path d={`M ${tx} ${ty} q 60 40 120 50`} fill="none" stroke="var(--gold)" strokeWidth={2} />
          <path d={`M ${satiX} ${satiY} q -60 50 -120 60`} fill="none" stroke="var(--gold)" strokeWidth={2} />
        </g>
      )}
      <Light x={satiX} y={satiY} r={9} t={t} seed={3} opacity={daksha} breathe={0.6} />
      {go >= 1 && <circle cx={1135} cy={430} r={80 + 20 * Math.sin(t * 2)} fill="url(#halo-gold)" opacity={0.35} />}
    </g>
  );
};

const yajnaArrive: Visual = ({ t }) => {
  const guests = seg(t, 0.8, 3.4);
  const satiVis = seg(t, 4.2, 5.2);
  const warn = t >= 8.4 && t < 10.6;
  const leave = seg(t, 10.6, 14.2);
  const hesitate = seg(t, 9.2, 10.4) * 30;
  const sx = lerp(300 - hesitate * 0.0, 170, leave);
  const sy = lerp(270 + hesitate, 640, leave) + Math.sin(leave * Math.PI) * -40;
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.55} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" opacity={0.6} />
      <Ground y={560} />
      {/* Shiva on the far mountain, top left */}
      <Light x={230} y={250} r={8} color="pale" core="var(--pale-core)" t={t} seed={11} breathe={1} />
      {warn && <Ripple x={230} y={250} t={t} from={8.4} period={1.6} max={160} color="var(--halo-pale)" />}
      <Assembly t={t} guests={guests} />
      <Daksha x={520} y={400} opacity={seg(t, 0.2, 2)} />
      <Altar t={t} />
      <Light x={sx} y={sy} r={10} t={t} seed={3} opacity={satiVis} breathe={0.5} />
    </g>
  );
};

const yajnaConfront: Visual = ({ t }) => {
  const walk = seg(t, 6.0, 10.4);
  const mock = lin(t, 3.0, 6.4);
  const loom = seg(t, 2.8, 4.4);
  const satiX = lerp(170, 640, walk);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.4} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" opacity={0.6} />
      <Ground y={560} />
      <Assembly t={t} dim={loom} />
      {mock > 0 && mock < 1 && <Ripple x={520} y={360} t={t} from={3.0} period={1.1} max={560} color="var(--rim)" />}
      <Daksha x={520} y={400} scale={1 + loom * 0.12} />
      <Altar t={t} intensity={1 + walk * 0.2} />
      <Light x={satiX} y={640} r={10 + walk * 3} t={t} seed={3} breathe={0.4} />
    </g>
  );
};

const departure: Visual = ({ t }) => {
  const still = seg(t, 0.5, 3.4);
  const rise = seg(t, 3.6, 8.4);
  const silence = seg(t, 7.0, 10);
  const y = lerp(640, 120, rise);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.4 + rise * 0.5} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" opacity={0.6} />
      <Ground y={560} />
      <Assembly t={t} dim={0.6 + silence * 0.4} />
      <Daksha x={520} y={400} scale={1.1} opacity={1 - silence * 0.3} />
      <Altar t={t} intensity={1.2 - silence * 0.85} />
      {/* The place where she sat dims */}
      <circle cx={640} cy={640} r={90} fill="url(#halo-gold)" opacity={(still * 0.6) * (1 - rise)} />
      {/* A soft column of light rising from within her */}
      <rect x={630} y={y} width={20} height={Math.max(0, 640 - y)} fill="url(#beam)" opacity={rise * (1 - seg(t, 8.4, 10.6))} />
      <Light x={640} y={y} r={lerp(13, 5, rise)} t={t} seed={3} opacity={1 - seg(t, 9, 10.8) * 0.6} breathe={1} />
      <Particles t={t} kind="motes" count={20} opacity={rise * (1 - seg(t, 9, 11))} box={{ x: 560, y: 140, w: 160, h: 520 }} seed={9} />
    </g>
  );
};

const grief: Visual = ({ t }) => {
  const flare = seg(t, 0.4, 2.6);
  const storm = seg(t, 3.0, 5.0) * (1 - seg(t, 7.4, 9.2));
  const scatter = seg(t, 3.6, 7.0);
  const quiet = seg(t, 7.6, 10.0);
  return (
    <g>
      {/* Storm layer: the sacrifice undone */}
      <g opacity={1 - quiet}>
        <Sky />
        <Stars t={t} opacity={0.3 * (1 - storm)} />
        <path d={RIDGE_FAR} fill="var(--ridge-far)" opacity={0.6} />
        <Ground y={560} />
        <Assembly t={t} dim={1} scatter={scatter} />
        <Daksha x={520} y={400} opacity={1 - scatter} />
        <Altar t={t} intensity={Math.max(0, 0.6 - scatter)} />
        <Light x={230} y={250} r={8 + flare * 10} color="pale" core="var(--pale-core)" t={t} seed={11} />
        {flare > 0 && <Ripple x={230} y={250} t={t} from={0.4} period={1.2} max={900} color="var(--halo-pale)" />}
        <Particles t={t} kind="ash" count={70} opacity={storm} speed={3} seed={21} />
        <rect width={W} height={H} fill="var(--storm)" opacity={storm * 0.35} />
      </g>
      {/* Quiet layer: Shiva alone on the snowy peak */}
      <g opacity={quiet}>
        <Sky />
        <Stars t={t} opacity={0.8} />
        <path d={PEAK} fill="var(--ridge-mid)" />
        <path d={PEAK} fill="none" stroke="var(--snow)" strokeWidth={3} opacity={0.5} />
        <Mist t={t} y={760} opacity={0.14} />
        <Light x={800} y={345} r={7} color="pale" core="var(--pale-core)" t={t} seed={11} breathe={1} />
        <Particles t={t} kind="snow" count={60} speed={0.6} seed={13} />
      </g>
    </g>
  );
};

const rebirth: Visual = ({ t }) => {
  const rise = seg(t, 0.4, 4.0);
  const descend = seg(t, 4.0, 8.8);
  const parents = seg(t, 2.0, 4.5);
  const name = seg(t, 9.4, 11.4);
  const x = lerp(800, 820, descend);
  const y = lerp(150, 742, descend);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <Mountains rise={rise} snow={rise} />
      <Mist t={t} y={700} opacity={0.12} />
      <Particles t={t} kind="snow" count={30} speed={0.5} opacity={0.6} seed={17} />
      <Light x={700} y={760} r={5} color="ember" core="var(--amber)" t={t} seed={8} opacity={parents * 0.85} breathe={1} />
      <Light x={940} y={760} r={5} color="ember" core="var(--amber)" t={t} seed={9} opacity={parents * 0.85} breathe={1} />
      {descend > 0 && descend < 1 && (
        <path d={`M 800 150 Q 790 ${lerp(150, 742, descend * 0.6)} ${x} ${y}`} fill="none" stroke="var(--gold)" strokeOpacity={0.3} strokeWidth={2} />
      )}
      <Light x={x} y={y} r={lerp(4, 9, descend)} t={t} seed={3} breathe={descend} />
      {descend >= 1 && <Ripple x={820} y={742} t={t} from={8.8} period={2.4} max={240} color="var(--gold)" count={2} />}
      <text x={820} y={850} textAnchor="middle" className="svg-devanagari" fontSize={40} fill="var(--gold)" opacity={name * 0.9}>
        पार्वती · शैलपुत्री
      </text>
    </g>
  );
};

const emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  const draw = (at: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - seg(t, at, at + 2) });
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={RIDGE_NEAR} fill="var(--ridge-near)" />
      <Mist t={t} y={680} />
      {/* Moon */}
      <g transform={`translate(800 ${120 + (1 - a(0.5)) * 30})`} opacity={a(0.5)}>
        <rect x={-60} y={-60} width={120} height={120} fill="var(--gold)" mask="url(#crescent)" />
      </g>
      <Light x={800} y={460} r={14} t={t} seed={3} opacity={a(0.2)} breathe={1} />
      {/* Bull: drawn on as a line */}
      <g transform="translate(380 640)" fill="none" stroke="var(--gold)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path {...draw(1.0)} d="M -120 40 Q -130 -30 -60 -40 Q -20 -70 30 -42 Q 80 -36 96 -10 Q 110 20 100 40 Z" />
        <path {...draw(1.6)} d="M 96 -10 Q 130 -30 150 -12 Q 162 6 146 22 Q 128 30 104 22" />
        <path {...draw(2.0)} d="M 138 -22 Q 132 -54 112 -60" />
        <path {...draw(2.0)} d="M 150 -16 Q 168 -46 188 -48" />
        <path {...draw(2.2)} d="M -60 40 L -60 60 M 40 40 L 40 60" />
      </g>
      {/* Trident */}
      <g transform="translate(1140 520)" fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round">
        <path {...draw(2.0)} d="M 0 -150 L 0 170" />
        <path {...draw(2.6)} d="M -56 -110 Q -56 -40 0 -30 Q 56 -40 56 -110" />
        <path {...draw(3.0)} d="M 0 -150 L -10 -130 M 0 -150 L 10 -130" />
        <path {...draw(3.0)} d="M -56 -110 L -66 -92 M 56 -110 L 66 -92" />
      </g>
      {/* Lotus: petals open */}
      <g transform="translate(1310 700)" opacity={a(2.8)} fill="var(--lotus)" stroke="var(--gold)" strokeWidth={1.5}>
        {[-60, -30, 0, 30, 60].map((r) => (
          <ellipse key={r} cx={0} cy={-40} rx={18} ry={46} transform={`rotate(${r * seg(t, 2.8, 5)})`} />
        ))}
      </g>
      <Particles t={t} kind="motes" count={18} opacity={a(1)} box={{ x: 500, y: 200, w: 600, h: 500 }} seed={4} />
    </g>
  );
};

// ---------- Marvel scenes: steel-blue grade, letterboxed by the Stage -------

const towerRand = seeded(29);
const TOWERS = Array.from({ length: 14 }, (_, i) => ({
  x: 1130 + i * 34 + towerRand() * 10,
  h: 120 + towerRand() * 300,
  w: 18 + towerRand() * 16,
}));

function City({ t, burn = 0, collapse = 0 }: { t: number; burn?: number; collapse?: number }) {
  return (
    <g>
      {burn > 0 && <circle cx={1350} cy={480} r={420 * burn * flicker(t, 2)} fill="url(#halo-ember)" opacity={burn} />}
      {TOWERS.map((tw, i) => {
        const h = tw.h * (1 - collapse * (0.4 + (i % 3) * 0.2));
        const tilt = collapse * (i % 2 ? 6 : -6);
        return (
          <path
            key={i}
            d={`M ${tw.x} 560 L ${tw.x} ${560 - h} L ${tw.x + tw.w / 2} ${560 - h - 30} L ${tw.x + tw.w} ${560 - h} L ${tw.x + tw.w} 560 Z`}
            fill={burn > 0.2 ? "var(--burnt)" : "var(--tower)"}
            stroke="var(--steel)"
            strokeOpacity={0.4}
            transform={`rotate(${tilt} ${tw.x} 560)`}
          />
        );
      })}
    </g>
  );
}

function Bridge() {
  const bands = ["var(--band-1)", "var(--band-2)", "var(--band-3)"];
  return (
    <g>
      {bands.map((c, i) => (
        <rect key={i} x={0} y={556 + i * 6} width={1180} height={6} fill={c} opacity={0.55} />
      ))}
    </g>
  );
}

function Ship({ x, y, people = 1, t }: { x: number; y: number; people?: number; t: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${Math.sin(t * 0.8) * 1.5})`}>
      <path d="M -130 0 L 130 0 L 100 40 L -100 40 Z" fill="var(--hull)" stroke="var(--steel)" strokeOpacity={0.6} />
      {Array.from({ length: 11 }, (_, i) => (
        <circle key={i} cx={-100 + i * 20} cy={-8 - (i % 2) * 6} r={3.2} fill="var(--steel-light)" opacity={people * (0.6 + 0.4 * Math.sin(t * 2 + i))} />
      ))}
    </g>
  );
}

function Darkness({ x, y, size, t }: { x: number; y: number; size: number; t: number }) {
  const spikes = 14;
  if (size <= 1) return null;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={size * 2.2} fill="url(#halo-shadow)" />
      {Array.from({ length: spikes }, (_, i) => {
        const a = (i / spikes) * Math.PI * 2 + t * 0.15;
        const len = size * (1.2 + 0.4 * Math.sin(t * 2 + i));
        return <line key={i} x1={0} y1={0} x2={Math.cos(a) * len} y2={Math.sin(a) * len} stroke="var(--shadow-line)" strokeWidth={2} opacity={0.7} />;
      })}
      <circle r={size * 0.5} fill="var(--shadow-core)" />
    </g>
  );
}

function Lightning({ x, y, t, strength }: { x: number; y: number; t: number; strength: number }) {
  if (strength <= 0) return null;
  const bolts = [0, 1, 2, 3].map((b) => {
    const r = seeded(Math.floor(t * 9) * 4 + b + 1);
    const startX = x + (r() - 0.5) * 600;
    let d = `M ${startX} 70`;
    const steps = 8;
    for (let i = 1; i <= steps; i++) {
      const px = lerp(startX, x, i / steps) + (i < steps ? (r() - 0.5) * 80 : 0);
      const py = lerp(70, y, i / steps);
      d += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
    }
    return d;
  });
  return (
    <g opacity={strength}>
      <rect width={W} height={H} fill="var(--bolt)" opacity={strength * 0.06 * (Math.sin(t * 40) > 0.6 ? 1 : 0)} />
      {bolts.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--bolt)" strokeWidth={3.4 - i * 0.6} strokeLinejoin="round" />
      ))}
    </g>
  );
}

function BrokenRing({ x, y, spread, opacity }: { x: number; y: number; spread: number; opacity: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity} stroke="var(--steel-light)" strokeWidth={4} fill="none">
      {[0, 1, 2, 3].map((i) => {
        const a0 = (i / 4) * Math.PI * 2 + 0.2;
        const a1 = a0 + 1.2;
        const ox = Math.cos(a0 + 0.6) * spread;
        const oy = Math.sin(a0 + 0.6) * spread;
        return <path key={i} d={`M ${Math.cos(a0) * 28 + ox} ${Math.sin(a0) * 28 + oy} A 28 28 0 0 1 ${Math.cos(a1) * 28 + ox} ${Math.sin(a1) * 28 + oy}`} />;
      })}
    </g>
  );
}

/** A towering fire giant, drawn as an abstract column of fire. */
function FireGiant({ t, rise }: { t: number; rise: number }) {
  if (rise <= 0) return null;
  const h = 640 * rise;
  const f = flicker(t, 6);
  const x = 1360;
  const base = 560;
  return (
    <g>
      <circle cx={x} cy={base - h * 0.6} r={380 * rise * f} fill="url(#halo-ember)" opacity={0.9} />
      <path
        d={`M ${x - 150 * rise} ${base} C ${x - 210 * rise} ${base - h * 0.5} ${x - 90 * rise} ${base - h * 0.85} ${x - 60 * rise} ${base - h}
            L ${x - 20 * rise} ${base - h * 0.9} L ${x} ${base - h * 1.05} L ${x + 20 * rise} ${base - h * 0.9} L ${x + 60 * rise} ${base - h}
            C ${x + 90 * rise} ${base - h * 0.85} ${x + 210 * rise} ${base - h * 0.5} ${x + 150 * rise} ${base} Z`}
        fill="var(--ember)"
        opacity={0.85}
      />
      <path
        d={`M ${x - 80 * rise} ${base} C ${x - 120 * rise} ${base - h * 0.4} ${x - 40 * rise} ${base - h * 0.7} ${x} ${base - h * 0.8 * f} C ${x + 40 * rise} ${base - h * 0.7} ${x + 120 * rise} ${base - h * 0.4} ${x + 80 * rise} ${base} Z`}
        fill="var(--amber)"
      />
      <circle cx={x - 26 * rise} cy={base - h * 0.78} r={7 * rise} fill="var(--lamp)" />
      <circle cx={x + 26 * rise} cy={base - h * 0.78} r={7 * rise} fill="var(--lamp)" />
    </g>
  );
}

const bridgeContext: Visual = ({ t }) => {
  const people = seg(t, 4.4, 7.0);
  const ring = seg(t, 7.8, 9.6);
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.35} />
      <City t={t} />
      <Bridge />
      <Ship x={220} y={520} people={people} t={t} />
      {Array.from({ length: 10 }, (_, i) => {
        const p = (t * 0.06 + i / 10) % 1;
        return <circle key={i} cx={lerp(1080, 360, p)} cy={548} r={3} fill="var(--steel-light)" opacity={people * 0.8} />;
      })}
      <Darkness x={1060} y={520} size={46} t={t} />
      <Light x={720} y={538} r={9} color="steel" core="var(--steel-light)" t={t} seed={5} />
      <BrokenRing x={720} y={470} spread={ring * 16} opacity={ring} />
      <Particles t={t} kind="ash" count={24} opacity={0.6} seed={33} />
    </g>
  );
};

const bridgeFight: Visual = ({ t }) => {
  const fallen = seg(t, 2.6, 4.0) * (1 - seg(t, 7.6, 9.0));
  const vision = seg(t, 3.8, 5.0) * (1 - seg(t, 7.2, 8.4));
  const bolt = seg(t, 7.6, 8.4) * (1 - seg(t, 11.0, 12.0));
  const grow = seg(t, 11.8, 14.4);
  const thorY = lerp(538, 552, fallen);
  const shake = bolt > 0.5 ? Math.sin(t * 60) * 3 : 0;
  return (
    <g transform={`translate(${shake} 0)`}>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.3} />
      <City t={t} />
      <Bridge />
      <Ship x={220} y={520} t={t} />
      {grow > 0 &&
        TOWERS.slice(0, 8).map((tw, i) => (
          <line key={i} x1={tw.x + tw.w / 2} y1={560 - tw.h / 2} x2={940} y2={520} stroke="var(--shadow-line)" strokeWidth={1.5} opacity={grow * 0.6} />
        ))}
      <Darkness x={940} y={520} size={50 + grow * 40} t={t} />
      <circle cx={720} cy={300} r={90} fill="url(#halo-pale)" opacity={vision} />
      <Light x={720} y={300} r={6} color="pale" core="var(--pale-core)" t={t} seed={4} opacity={vision} />
      <Lightning x={720} y={thorY} t={t} strength={bolt} />
      <Light x={720} y={thorY} r={9 + bolt * 6} color="steel" core="var(--steel-light)" t={t} seed={5} opacity={1 - fallen * 0.55} />
      <Particles t={t} kind="ash" count={30} opacity={0.7} seed={34} />
    </g>
  );
};

const bridgeBurn: Visual = ({ t }) => {
  const giant = seg(t, 0.3, 4.5);
  const burn = seg(t, 1.0, 5);
  const collapse = seg(t, 3.5, 10);
  const away = seg(t, 2, 13);
  const shipX = lerp(260, 140, away);
  const shipY = lerp(500, 360, away);
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.3} />
      <FireGiant t={t} rise={giant * (1 - seg(t, 11, 14) * 0.4)} />
      <City t={t} burn={burn} collapse={collapse} />
      <Particles t={t} kind="embers" count={60} opacity={burn} box={{ x: 1000, y: 0, w: 600, h: 600 }} seed={41} speed={1.6} />
      <Bridge />
      <Darkness x={1000} y={520} size={46 * (1 - collapse)} t={t} />
      <Ship x={shipX} y={shipY} t={t} people={1} />
      <Light x={shipX} y={shipY - 30} r={7} color="steel" core="var(--steel-light)" t={t} seed={5} breathe={1} />
      <circle cx={shipX} cy={shipY - 8} r={120} fill="url(#halo-steel)" opacity={seg(t, 5.6, 8) * 0.5} />
    </g>
  );
};

function AncestralSky({ t }: { t: number }) {
  return (
    <>
      <Sky id="sky-violet" />
      <Stars t={t} opacity={0.7} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M -100 ${200 + i * 60} Q 400 ${150 + i * 60 + Math.sin(t * 0.4 + i) * 50} 800 ${200 + i * 60} T 1700 ${200 + i * 60}`}
          fill="none"
          stroke="var(--aurora)"
          strokeWidth={30 - i * 5}
          opacity={0.08 + i * 0.02}
        />
      ))}
      <rect x={0} y={640} width={W} height={H - 640} fill="var(--plain)" />
      <g transform="translate(1320 640)" fill="var(--figure)">
        <path d="M -6 0 L -4 -120 L 4 -120 L 6 0 Z" />
        <path d="M -4 -110 L -60 -150 M 4 -110 L 70 -160" stroke="var(--figure)" strokeWidth={6} />
        <ellipse cx={0} cy={-170} rx={150} ry={26} />
      </g>
    </>
  );
}

const ancestralPlane: Visual = ({ t }) => {
  const son = seg(t, 0.3, 2.2);
  const father = seg(t, 4.2, 6.2);
  const walk = seg(t, 7.2, 10.6);
  const kings = seg(t, 4.4, 7);
  return (
    <g>
      <AncestralSky t={t} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={980 + i * 70} y={420 - Math.sin(t * 0.8 + i) * 6} width={26} height={220} rx={13} fill="url(#pillar)" opacity={kings} />
      ))}
      <Particles t={t} kind="motes" count={36} opacity={0.8} seed={44} />
      <Light x={400} y={620} r={9} color="steel" core="var(--steel-light)" t={t} seed={6} opacity={son} />
      <Light x={lerp(1200, 860, walk)} y={620} r={9} color="pale" core="var(--pale-core)" t={t} seed={7} opacity={father} breathe={1} />
    </g>
  );
};

const ancestralReturn: Visual = ({ t }) => {
  const turn = seg(t, 0.4, 3.4);
  const fade = seg(t, 3.0, 5.0);
  const wake = seg(t, 5.2, 8.6);
  return (
    <g>
      <g opacity={1 - fade}>
        <AncestralSky t={t} />
        <Particles t={t} kind="motes" count={30} seed={44} />
        <Light x={860} y={620} r={9} color="pale" core="var(--pale-core)" t={t} seed={7} opacity={1 - turn * 0.6} />
        <Light x={lerp(560, 200, turn)} y={620} r={9} color="steel" core="var(--steel-light)" t={t} seed={6} />
      </g>
      <g opacity={fade}>
        <Sky id="sky-steel" />
        <Stars t={t} opacity={0.4} />
        <path d={RIDGE_FAR} fill="var(--snow-ridge)" />
        <Ground y={640} fill="var(--snowfield)" />
        <Particles t={t} kind="snow" count={70} speed={0.8} seed={45} />
        <Light x={800} y={lerp(660, 600, wake)} r={lerp(4, 11, wake)} color="steel" core="var(--steel-light)" t={t} seed={6} breathe={wake} />
        {wake >= 1 && <Ripple x={800} y={600} t={t} from={8.6} period={2} max={260} color="var(--steel-light)" count={2} />}
      </g>
    </g>
  );
};

export const day1Visuals: Record<string, Visual> = {
  mountainDawn,
  threeLayers,
  marriage,
  yajnaArrive,
  yajnaConfront,
  departure,
  grief,
  rebirth,
  emblems,
  bridgeContext,
  bridgeFight,
  bridgeBurn,
  ancestralPlane,
  ancestralReturn,
};

/** Visuals that belong to Marvel scenes get the film frame and cool grade. */
export const day1Film = ["bridgeContext", "bridgeFight", "bridgeBurn", "ancestralPlane", "ancestralReturn"];
