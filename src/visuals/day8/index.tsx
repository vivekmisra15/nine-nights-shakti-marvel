// ---------------------------------------------------------------------------
// Day 8 illustrations: Mahagauri.
// Seasons that leave their dust, a river that washes it away, the dark night
// and the bright one side by side, and a festive Ashtami.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Flame, Ground, H, Light, Mist, Mountains, PEAK, Particles, RIDGE_FAR, RIDGE_MID, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { Crescent, Radiate, Trident } from "../kit";
import { DarkForm, Hand } from "../day7";

/** A white bull, abstract, facing right. */
function Bull({ x, y, size = 1, opacity = 1, t = 0 }: { x: number; y: number; size?: number; opacity?: number; t?: number }) {
  const b = 1 + Math.sin(t * 1.2) * 0.015;
  return (
    <g transform={`translate(${x} ${y}) scale(${size} ${size * b})`} opacity={opacity}>
      <path d="M -150 -40 Q -150 -110 -40 -110 L 70 -112 Q 110 -112 130 -90 Q 170 -96 190 -70 Q 196 -40 170 -30 L 130 -20 L 120 60 L 98 60 L 96 0 L -80 0 L -96 60 L -118 60 L -124 -6 Q -150 -14 -150 -40 Z" fill="var(--moon-white)" opacity={0.9} />
      <path d="M -20 -110 Q 0 -150 30 -112" fill="var(--moon-white)" />
      <path d="M 150 -96 Q 160 -130 140 -140 M 176 -88 Q 196 -120 186 -132" fill="none" stroke="var(--moon-white)" strokeWidth={6} strokeLinecap="round" />
      <circle cx={170} cy={-66} r={4} fill="var(--night)" />
    </g>
  );
}

/** A damaru: Shiva's small hourglass drum. */
function Damaru({ x, y, size = 1, opacity = 1, t = 0 }: { x: number; y: number; size?: number; opacity?: number; t?: number }) {
  const s = Math.sin(t * 8) * 6;
  return (
    <g transform={`translate(${x} ${y}) scale(${size}) rotate(${s})`} opacity={opacity} fill="var(--gold)">
      <path d="M -40 -50 L 40 -50 L 4 0 L 40 50 L -40 50 L -4 0 Z" />
      <line x1={-40} y1={-50} x2={40} y2={-50} stroke="var(--lamp)" strokeWidth={3} />
      <circle cx={-56} cy={-6} r={7} />
      <circle cx={56} cy={6} r={7} />
      <path d="M -4 0 Q -30 -6 -56 -6 M 4 0 Q 30 6 56 6" stroke="var(--gold)" strokeWidth={2} fill="none" />
    </g>
  );
}

// ---------- tradition scenes ------------------------------------------------

const d8Opening: Visual = ({ t }) => {
  const moon = seg(t, 0.3, 4.0);
  const name = seg(t, 3.0, 5.4);
  const pair = seg(t, 4.0, 6.0);
  return (
    <g>
      <Sky />
      <Stars t={t} />
      <circle cx={800} cy={lerp(520, 300, moon)} r={70} fill="var(--moon-white)" opacity={moon * 0.95} />
      <circle cx={800} cy={lerp(520, 300, moon)} r={260} fill="url(#halo-pale)" opacity={moon} />
      <Mountains />
      <Mist t={t} y={700} opacity={0.14} color="var(--moon-white)" />
      <text x={800} y={560} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--moon-white)" opacity={name * 0.95}>
        महागौरी
      </text>
      <text x={800} y={612} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        MAHAGAURI · THE GREATLY BRIGHT ONE
      </text>
      <g opacity={pair * 0.7}>
        <Light x={300} y={760} r={7} color="shadow" core="var(--kali)" t={t} seed={801} />
        <path d="M 320 760 Q 800 680 1280 760" fill="none" stroke="var(--moon-white)" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="6 10" />
        <Light x={1300} y={760} r={7} color="pale" core="var(--moon-white)" t={t} seed={802} />
      </g>
      <Particles t={t} kind="motes" count={20} seed={803} opacity={seg(t, 6, 8)} />
    </g>
  );
};

const d8Tapas: Visual = ({ t }) => {
  const season = (t * 0.55) % 3;
  const sun = season < 1 ? Math.sin(season * Math.PI) : 0;
  const rain = season >= 1 && season < 2 ? Math.sin((season - 1) * Math.PI) : 0;
  const snow = season >= 2 ? Math.sin((season - 2) * Math.PI) : 0;
  const dust = seg(t, 3.8, 9.0);
  const inner = 0.5 + 0.5 * Math.sin(t * 1.2);
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={sun * 0.6} />
      <Stars t={t} opacity={1 - sun * 0.8} />
      <circle cx={1300} cy={180} r={60} fill="var(--sun-core)" opacity={sun} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={PEAK} fill="var(--ridge-mid)" />
      <Particles t={t} kind="rain" count={90} opacity={rain} seed={804} />
      <Particles t={t} kind="snow" count={70} opacity={snow} seed={805} />
      {/* Parvati, gathering the dust of years */}
      <Light x={800} y={345} r={9} t={t} seed={3} breathe={1} opacity={1 - dust * 0.55} />
      <circle cx={800} cy={345} r={30 + dust * 36} fill="var(--ash)" opacity={dust * 0.55} />
      <Particles t={t} kind="ash" count={40} seed={806} opacity={dust} box={{ x: 640, y: 180, w: 320, h: 220 }} speed={0.5} />
      {/* The resolve inside still burns */}
      {t > 8.4 && <circle cx={800} cy={345} r={6 + inner * 3} fill="var(--lamp)" opacity={0.9} />}
      {t > 8.4 && <Ripple x={800} y={345} t={t} from={8.4} period={2.6} max={120} color="var(--gold)" count={2} />}
    </g>
  );
};

const d8Ganga: Visual = ({ t }) => {
  const pour = seg(t, 0.8, 4.0);
  const wash = seg(t, 4.2, 8.0);
  const shine = seg(t, 8.0, 10.6);
  const r = seeded(807);
  const streams = Array.from({ length: 9 }, () => ({ dx: (r() - 0.5) * 120, w: 3 + r() * 5, sp: 0.6 + r() }));
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.8 - shine * 0.3} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      {/* Shiva above, the river coming down */}
      <Light x={800} y={110} r={10} color="pale" core="var(--pale-core)" t={t} seed={11} />
      <Crescent x={830} y={86} scale={0.4} fill="var(--moon-white)" rotate={-30} />
      {streams.map((s, i) => {
        const len = pour * 300;
        const off = ((t * 200 * s.sp) % 40) - 20;
        return <line key={i} x1={800 + s.dx * 0.3} y1={130} x2={800 + s.dx} y2={130 + len} stroke="var(--ganga)" strokeWidth={s.w} strokeDasharray="22 14" strokeDashoffset={-off * 4} opacity={0.75 * (1 - shine * 0.6)} />;
      })}
      {/* Parvati: dust washing away, then radiance */}
      <circle cx={800} cy={470} r={(66) * (1 - wash)} fill="var(--ash)" opacity={0.55 * (1 - wash)} />
      <Particles t={t} kind="ash" count={36} seed={808} opacity={wash * (1 - shine)} box={{ x: 700, y: 480, w: 200, h: 320 }} speed={2.4} />
      <circle cx={800} cy={470} r={80 + shine * 280} fill="url(#halo-pale)" opacity={0.3 + shine * 0.7} />
      <Light x={800} y={470} r={9 + shine * 9} color="pale" core="var(--moon-white)" t={t} seed={809} breathe={1} />
      <Radiate x={800} y={470} count={20} r0={34} r1={170} grow={shine} opacity={shine * 0.8} stroke="var(--moon-white)" width={3} spin={t * 3} />
      {shine > 0.9 && <Ripple x={800} y={470} t={t} from={10.6} period={2.6} max={500} color="var(--moon-white)" count={2} />}
      {/* The river below */}
      <path d={`M 0 820 Q 400 790 800 820 T ${W} 810 L ${W} ${H} L 0 ${H} Z`} fill="var(--water)" opacity={0.8} />
    </g>
  );
};

const d8Pair: Visual = ({ t }) => {
  const kal = seg(t, 0.4, 2.4);
  const maha = seg(t, 1.6, 3.6);
  const join = seg(t, 4.4, 7.0);
  const dawn = seg(t, 8.4, 11.5);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <defs>
        <linearGradient id="night-to-day" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--cosmos)" }} />
          <stop offset="1" style={{ stopColor: "var(--dawn-low)" }} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#night-to-day)" opacity={0.4 + dawn * 0.5} />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-near)" />
      <g opacity={kal}>
        <DarkForm x={480} y={360} t={t} scale={0.75} />
        <text x={480} y={700} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={5} fill="var(--muted)">
          NIGHT 7 · KALARATRI
        </text>
      </g>
      <g opacity={maha}>
        <circle cx={1120} cy={380} r={220} fill="url(#halo-pale)" />
        <Light x={1120} y={380} r={16} color="pale" core="var(--moon-white)" t={t} seed={809} breathe={1} />
        <Radiate x={1120} y={380} count={16} r0={34} r1={130} stroke="var(--moon-white)" width={3} spin={t * 3} opacity={0.7} />
        <text x={1120} y={700} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={5} fill="var(--muted)">
          NIGHT 8 · MAHAGAURI
        </text>
      </g>
      {/* One Devi: a single thread of light joining them */}
      {join > 0 && (
        <g>
          <path d={`M 560 380 Q 800 ${380 - 160 * join} 1040 380`} fill="none" stroke="var(--gold)" strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - join} />
          <Light x={800} y={380 - 80 * join} r={7} t={t} seed={3} opacity={join} breathe={1} />
        </g>
      )}
      {dawn > 0 && <Ripple x={800} y={300} t={t} from={8.4} period={3} max={600} color="var(--gold)" count={2} />}
    </g>
  );
};

const d8Kanya: Visual = ({ t }) => {
  const lamps = seg(t, 0.4, 2.0);
  const girls = seg(t, 1.6, 3.6);
  const meal = seg(t, 4.2, 6.0);
  const r = seeded(810);
  return (
    <g>
      <rect width={W} height={H} fill="var(--night-2)" />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={0.5} />
      {/* Marigold garlands */}
      {[0, 1].map((k) => (
        <g key={k}>
          {Array.from({ length: 32 }, (_, i) => {
            const x = 40 + i * 49;
            const y = 80 + k * 50 + Math.sin((i / 31) * Math.PI) * 60 + Math.sin(t * 1.2 + i) * 2;
            return <circle key={i} cx={x} cy={y} r={9} fill={i % 3 === 0 ? "var(--amber)" : "var(--marigold)"} />;
          })}
        </g>
      ))}
      <Ground y={640} fill="var(--altar-dark)" />
      {/* Rangoli */}
      <g transform="translate(800 790)">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={0} cy={-46} rx={14} ry={40} fill={i % 2 ? "var(--petal)" : "var(--marigold)"} opacity={0.7} transform={`rotate(${i * 30 + t * 4}) scale(1 0.45)`} />
        ))}
        <circle r={14} fill="var(--gold)" />
      </g>
      {/* Lamps */}
      {[220, 420, 1180, 1380].map((x, i) => (
        <Flame key={x} x={x} y={700} size={0.14} t={t + i} intensity={lamps} />
      ))}
      {/* Girls, honoured as the goddess, with their plates */}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 440 + i * 120;
        const bob = Math.sin(t * 2 + i) * 3;
        return (
          <g key={i} opacity={girls}>
            <Light x={x} y={560 + bob} r={7} color="rose" core="var(--petal)" t={t} seed={811 + i} />
            <circle cx={x} cy={560 + bob} r={30} fill="none" stroke="var(--gold)" strokeOpacity={0.35} />
            <ellipse cx={x} cy={630} rx={34} ry={10} fill="var(--gold)" opacity={0.6 * meal} />
            {meal > 0 && [0, 1, 2].map((k) => <circle key={k} cx={x - 14 + k * 14} cy={624} r={5} fill={["var(--amber)", "var(--lamp)", "var(--ember)"][k]} opacity={meal} />)}
          </g>
        );
      })}
      <Particles t={t} kind="petals" count={30} seed={812 + Math.floor(r() * 2)} opacity={seg(t, 7.6, 9.6)} />
    </g>
  );
};

const d8Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <Sky />
      <Stars t={t} opacity={0.6} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <text x={800} y={110} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--moon-white)" opacity={a(0.3) * 0.85}>
        महागौरी
      </text>
      <circle cx={800} cy={420} r={260} fill="url(#halo-pale)" opacity={0.6 + 0.05 * Math.sin(t * 1.4)} />
      <Light x={800} y={420} r={18} color="pale" core="var(--moon-white)" t={t} seed={809} breathe={1} />
      <circle cx={800} cy={300} r={36} fill="none" stroke="var(--moon-white)" strokeWidth={3} opacity={a(0.5) * 0.7} />
      <Trident x={540} y={400} size={1} opacity={a(0.9)} fill="var(--moon-white)" />
      <Damaru x={1060} y={380} size={0.8} opacity={a(1.2)} t={t} />
      <Hand x={560} y={560} opacity={a(1.5)} stroke="var(--moon-white)" />
      <Hand x={1040} y={560} down opacity={a(1.8)} stroke="var(--moon-white)" />
      <Bull x={790} y={830} size={0.75} t={t} opacity={a(2.1)} />
    </g>
  );
};

// ---------- Marvel scenes: letterboxed by the Stage -------------------------

/** Ego's planet: pastel bubbles and spires. */
function EgoWorld({ t }: { t: number }) {
  const r = seeded(820);
  const bubbles = Array.from({ length: 14 }, () => ({ x: r() * W, y: 100 + r() * 400, s: 20 + r() * 60, c: r() }));
  return (
    <g>
      <rect width={W} height={H} fill="var(--ego-sky)" />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={0.4} />
      {bubbles.map((b, i) => (
        <circle key={i} cx={b.x + Math.sin(t * 0.4 + i) * 10} cy={b.y + Math.cos(t * 0.3 + i) * 8} r={b.s} fill="none" stroke={b.c > 0.5 ? "var(--halo-rose)" : "var(--aurora)"} strokeOpacity={0.4} strokeWidth={3} />
      ))}
      <path d="M 0 760 Q 300 700 600 740 Q 900 780 1200 720 Q 1400 690 1600 730 L 1600 900 L 0 900 Z" fill="var(--violet-low)" />
    </g>
  );
}

const d8Wreck: Visual = ({ t }) => {
  const clash = (k: number) => (t > k && t < k + 0.35 ? 1 - (t - k) / 0.35 : 0);
  const flash = Math.max(clash(2.6), clash(5.0));
  const over = seg(t, 4.4, 5.6);
  const tears = seg(t, 8.4, 9.4);
  const gx = lerp(lerp(620, 700, Math.sin(t * 3) * 0.5 + 0.5), 760, over);
  const nx = lerp(lerp(980, 900, Math.sin(t * 3 + 1) * 0.5 + 0.5), 860, over);
  return (
    <g>
      <EgoWorld t={t} />
      <rect width={W} height={H} fill="var(--bolt)" opacity={flash * 0.3} />
      {/* Smoke and debris from the fight */}
      <Particles t={t} kind="ash" count={34} seed={821} opacity={1 - over * 0.5} />
      <Light x={gx} y={lerp(640, 700, over)} r={9} color="green" core="var(--halo-green)" t={t} seed={822} />
      <Light x={nx} y={lerp(640, 620, over)} r={9} color="steel" core="var(--nebula)" t={t} seed={823} />
      {over > 0.5 && t < 8.4 && <line x1={nx} y1={620} x2={gx + 20} y2={690} stroke="var(--nebula)" strokeWidth={3} opacity={0.6} />}
      {/* Tears, held back */}
      {tears > 0 && [0, 1].map((i) => <circle key={i} cx={nx - 6 + i * 12} cy={612 + ((t * 30 + i * 10) % 30)} r={3} fill="var(--ganga)" opacity={tears * 0.8} />)}
      {t > 8.4 && <Ripple x={nx} y={620} t={t} from={8.4} period={2.2} max={80} color="var(--nebula)" count={1} />}
    </g>
  );
};

const d8Sisters: Visual = ({ t }) => {
  const parts = Math.floor(Math.max(0, (t - 4.0) * 2.4));
  const together = seg(t, 7.2, 9.6);
  const nx = lerp(900, 830, together);
  const gx = lerp(700, 770, together);
  return (
    <g>
      <EgoWorld t={t} />
      <Light x={gx} y={640} r={9} color="green" core="var(--halo-green)" t={t} seed={822} />
      <Light x={nx} y={640} r={9} color="steel" core="var(--nebula)" t={t} seed={823} />
      {t > 0.5 && t < 4 && <Ripple x={nx} y={640} t={t} from={0.5} period={1.3} max={90} color="var(--nebula)" count={2} />}
      {/* Pieces of her replaced, one by one */}
      {Array.from({ length: Math.min(8, parts) }, (_, i) => {
        const a0 = (i / 8) * Math.PI * 2;
        const a1 = a0 + Math.PI / 5;
        const rr = 30;
        return (
          <path
            key={i}
            d={`M ${nx + Math.cos(a0) * rr} ${640 + Math.sin(a0) * rr} A ${rr} ${rr} 0 0 1 ${nx + Math.cos(a1) * rr} ${640 + Math.sin(a1) * rr}`}
            fill="none"
            stroke="var(--steel-light)"
            strokeWidth={6}
            opacity={0.7}
          />
        );
      })}
      {together > 0 && <circle cx={800} cy={640} r={70 + together * 60} fill="url(#halo-pale)" opacity={together * 0.6} />}
      {together > 0.9 && <Ripple x={800} y={640} t={t} from={9.6} period={2.6} max={260} color="var(--moon-white)" count={2} />}
    </g>
  );
};

const d8Lunch: Visual = ({ t }) => {
  const secret = seg(t, 4.8, 6.4);
  return (
    <g>
      <rect width={W} height={H} fill="var(--steel-sky-low)" />
      {/* Warm restaurant: lanterns and a window */}
      <rect x={200} y={140} width={1200} height={320} fill="var(--steel-sky-top)" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={220 + i * 84} y={460 - (60 + ((i * 37) % 120))} width={60} height={60 + ((i * 37) % 120)} fill="var(--tower)" />
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={240 + (i * 59) % 1140} y={330 + (i % 4) * 28} width={8} height={10} fill="var(--window)" opacity={0.6} />
      ))}
      {[360, 620, 980, 1240].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={90} stroke="var(--steel)" strokeWidth={2} />
          <ellipse cx={x} cy={110} rx={26} ry={34} fill="var(--ember)" opacity={0.75} />
          <Light x={x} y={110} r={5} color="ember" core="var(--window)" t={t} seed={830 + i} />
        </g>
      ))}
      <rect x={420} y={580} width={760} height={24} rx={6} fill="var(--door)" />
      <Ground y={820} fill="var(--steel-sky-top)" />
      {/* Yori, talking; Bucky, listening */}
      <Light x={1000} y={520} r={9} color="gold" core="var(--lamp)" t={t} seed={834} />
      {t > 0.5 && t < 7.4 && <Ripple x={1000} y={520} t={t} from={0.5} period={1.6} max={90} color="var(--gold)" count={2} />}
      <Light x={600} y={520} r={9} color="steel" core="var(--steel-light)" t={t} seed={835} />
      {/* The secret: a small dark notebook, and a weight */}
      <rect x={470} y={556} width={46} height={30} rx={3} fill="var(--kali)" stroke="var(--steel)" opacity={secret} />
      <circle cx={600} cy={520} r={40} fill="url(#halo-shadow)" opacity={secret * 0.7} />
    </g>
  );
};

const d8Notebook: Visual = ({ t }) => {
  const tell = seg(t, 0.4, 2.0);
  const grief = seg(t, 4.0, 5.6);
  const book = seg(t, 6.6, 7.6) * (1 - seg(t, 9.6, 10.4));
  const docks = seg(t, 9.6, 11.0);
  return (
    <g>
      <g opacity={1 - docks}>
        <rect width={W} height={H} fill="var(--steel-sky-low)" />
        <rect x={680} y={260} width={240} height={440} fill="var(--door)" />
        <rect x={700} y={280} width={200} height={400} fill="var(--window)" opacity={0.25} />
        <Ground y={700} fill="var(--steel-sky-top)" />
        <Light x={800} y={600} r={9} color="gold" core="var(--lamp)" t={t} seed={834} opacity={1 - grief * 0.5} />
        <Light x={lerp(560, 640, tell)} y={610} r={9} color="steel" core="var(--steel-light)" t={t} seed={835} />
        {t > 0.6 && t < 4 && <Ripple x={640} y={610} t={t} from={0.6} period={1.4} max={80} color="var(--steel-light)" count={1} />}
        {/* The notebook, every name crossed off */}
        <g opacity={book} transform="translate(1040 380)">
          <rect x={-110} y={-140} width={220} height={280} rx={8} fill="var(--page)" />
          {Array.from({ length: 8 }, (_, i) => {
            const y = -110 + i * 30;
            const cross = seg(t, 7.0 + i * 0.25, 7.3 + i * 0.25);
            return (
              <g key={i}>
                <line x1={-80} y1={y} x2={60 - (i % 3) * 20} y2={y} stroke="var(--steel)" strokeWidth={4} opacity={0.6} />
                <line x1={-86} y1={y} x2={lerp(-86, 70 - (i % 3) * 20, cross)} y2={y} stroke="var(--blood)" strokeWidth={3} />
              </g>
            );
          })}
        </g>
      </g>
      {/* Louisiana docks at sunset */}
      <g opacity={docks}>
        <rect width={W} height={H} fill="url(#sky-dawn)" />
        <circle cx={1200} cy={500} r={70} fill="var(--sun-core)" opacity={0.85} />
        <rect x={0} y={560} width={W} height={340} fill="var(--water)" />
        <rect x={0} y={600} width={W} height={30} fill="var(--door)" />
        <path d="M 100 470 Q 800 520 1500 470" fill="none" stroke="var(--steel)" strokeWidth={1.5} />
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={100 + i * 93} cy={470 + Math.sin((i / 15) * Math.PI) * 26} r={5} fill="var(--window)" opacity={0.6 + 0.4 * Math.abs(Math.sin(t * 2 + i))} />
        ))}
        {[520, 600, 680, 760, 840, 920].map((x, i) => (
          <Light key={x} x={x} y={580 - Math.abs(Math.sin(t * 3 + i)) * 10} r={7} color={i === 2 ? "steel" : "gold"} core={i === 2 ? "var(--steel-light)" : "var(--lamp)"} t={t} seed={840 + i} />
        ))}
      </g>
    </g>
  );
};

export const day8Visuals: Record<string, Visual> = {
  d8Opening,
  d8Tapas,
  d8Ganga,
  d8Pair,
  d8Kanya,
  d8Emblems,
  d8Wreck,
  d8Sisters,
  d8Lunch,
  d8Notebook,
};

export const day8Film = ["d8Wreck", "d8Sisters", "d8Lunch", "d8Notebook"];
