// ---------------------------------------------------------------------------
// Day 7 illustrations: Kalaratri.
// Night that keeps watch, a fierce form with gentle hands, a demon who
// multiplies until the drops are caught. The Werewolf by Night scenes are
// drawn in greys, as the special was shot in black and white.
// Original abstract drawings; no Marvel imagery is reproduced.
// ---------------------------------------------------------------------------

import { lerp, seeded, seg } from "../../engine/anim";
import { Ground, H, Light, Mist, RIDGE_FAR, RIDGE_MID, RIDGE_NEAR, Ripple, Sky, Stars, W, type Visual } from "../shared";
import { Radiate, Sword } from "../kit";

/** The dark form: flowing hair, three eyes, fiery breath. */
export function DarkForm({ x, y, t, eyes = 1, breath = 0, scale = 1 }: { x: number; y: number; t: number; eyes?: number; breath?: number; scale?: number }) {
  const flash = 0.6 + 0.4 * Math.abs(Math.sin(t * 3.3));
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r={260} fill="url(#halo-shadow)" opacity={0.9} />
      {/* Shoulders, so the form reads as a figure */}
      <path d="M -170 300 Q -150 120 0 100 Q 150 120 170 300 Z" fill="var(--kali)" stroke="var(--shadow-line)" strokeWidth={2} />
      {/* Hair, unbound: a mane that falls past the shoulders */}
      {Array.from({ length: 14 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const k = Math.floor(i / 2);
        const sway = Math.sin(t * 1.2 + i) * 14;
        const sx = side * (30 + k * 8);
        const ex = side * (110 + k * 22) + sway;
        const ey = 160 + k * 26;
        return (
          <path
            key={i}
            d={`M ${sx} -60 C ${side * (120 + k * 10)} ${-90 + k * 6} ${side * (90 + k * 16) + sway * 0.5} ${60 + k * 10} ${ex} ${ey}`}
            fill="none"
            stroke="var(--kali-hair)"
            strokeWidth={9}
            strokeLinecap="round"
            opacity={0.9}
          />
        );
      })}
      <circle r={78} fill="var(--kali)" stroke="var(--shadow-line)" strokeWidth={2} />
      {/* Three eyes */}
      <g opacity={eyes}>
        <ellipse cx={-26} cy={-6} rx={12} ry={6} fill="var(--bolt)" opacity={flash} />
        <ellipse cx={26} cy={-6} rx={12} ry={6} fill="var(--bolt)" opacity={flash} />
        <ellipse cx={0} cy={-36} rx={6} ry={11} fill="var(--bolt)" opacity={flash} />
      </g>
      {/* Breath of fire */}
      {breath > 0 &&
        Array.from({ length: 6 }, (_, i) => {
          const p = ((t * 1.2 + i / 6) % 1) * breath;
          return <circle key={i} cx={p * 140} cy={34 + p * 30} r={6 + p * 14} fill="var(--amber)" opacity={(1 - p) * 0.7} />;
        })}
    </g>
  );
}

/** A hand: raised palm (abhaya) or lowered open palm (varada). */
export function Hand({ x, y, down = false, opacity = 1, stroke = "var(--gold)" }: { x: number; y: number; down?: boolean; opacity?: number; stroke?: string }) {
  return (
    <g transform={`translate(${x} ${y}) ${down ? "rotate(180)" : ""}`} opacity={opacity} fill="none" stroke={stroke} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
      <circle r={74} fill="url(#halo-gold)" stroke="none" opacity={0.5} />
      <path d="M -30 50 L -34 0 L -34 -46 M -18 -6 L -18 -60 M -2 -6 L -2 -64 M 14 -4 L 14 -56 M 28 4 L 34 -30 M -30 50 Q 0 70 28 46 L 30 4" />
    </g>
  );
}

/** A donkey in profile, facing right. */
function Donkey({ x, y, size = 1, opacity = 1, t = 0 }: { x: number; y: number; size?: number; opacity?: number; t?: number }) {
  const ear = Math.sin(t * 1.5) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} opacity={opacity}>
      <path d="M -130 -40 Q -130 -90 -60 -90 L 60 -90 Q 90 -90 100 -120 L 130 -150 L 170 -130 Q 180 -110 160 -100 L 120 -60 L 110 0 L 104 60 L 84 60 L 80 0 L -70 0 L -86 60 L -106 60 L -110 -10 Q -130 -20 -130 -40 Z" fill="var(--donkey)" />
      <path d={`M 128 -150 L ${118 + ear} -200 L 140 -152 M 140 -148 L ${150 + ear} -196 L 152 -146`} fill="var(--donkey)" stroke="var(--donkey)" strokeWidth={6} strokeLinejoin="round" />
      <circle cx={150} cy={-128} r={4} fill="var(--night)" />
    </g>
  );
}

/** A thunderbolt, simply. */
function Bolt({ x, y, opacity = 1 }: { x: number; y: number; opacity?: number }) {
  return <path d={`M ${x} ${y - 70} L ${x - 24} ${y} L ${x + 4} ${y} L ${x - 16} ${y + 70} L ${x + 30} ${y - 12} L ${x + 2} ${y - 12} L ${x + 20} ${y - 70} Z`} fill="var(--gold)" opacity={opacity} />;
}

// ---------- tradition scenes ------------------------------------------------

const d7Opening: Visual = ({ t }) => {
  const eyes = seg(t, 0.6, 2.4);
  const name = seg(t, 3.2, 5.6);
  const hand = seg(t, 8.0, 9.8);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <Stars t={t} opacity={0.5} />
      <path d={RIDGE_FAR} fill="var(--ridge-near)" opacity={0.8} />
      <DarkForm x={800} y={340} t={t} eyes={eyes} breath={seg(t, 5, 7)} scale={0.9} />
      <text x={800} y={700} textAnchor="middle" className="svg-devanagari" fontSize={78} fill="var(--gold)" opacity={name * 0.9}>
        कालरात्रि
      </text>
      <text x={800} y={748} textAnchor="middle" className="svg-mono" fontSize={20} letterSpacing={6} fill="var(--muted)" opacity={name}>
        KALARATRI · THE DARK NIGHT
      </text>
      <Hand x={1120} y={380} opacity={hand} />
      {hand > 0.9 && <Ripple x={1120} y={380} t={t} from={9.8} period={2.4} max={120} color="var(--gold)" count={2} />}
    </g>
  );
};

const r7 = seeded(701);
const EYES = Array.from({ length: 90 }, () => ({ x: r7() * W, y: r7() * 520, d: r7() * 6, s: 0.8 + r7() * 1.6 }));

const d7Night: Visual = ({ t }) => {
  const eyes = (i: number) => seg(t, 0.4 + EYES[i].d * 0.6, 1.4 + EYES[i].d * 0.6);
  const walk = lin01(t / 14);
  const wolves = seg(t, 7.0, 8.4) * (1 - seg(t, 9.0, 10.6));
  const back = seg(t, 9.0, 11);
  const dawn = seg(t, 11.5, 14);
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={dawn * 0.6} />
      {/* Night looks out with all her eyes */}
      {EYES.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={e.s * (1 + 0.2 * Math.sin(t * 2 + i))} fill="var(--star)" opacity={eyes(i) * 0.9} />
      ))}
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <path d={RIDGE_NEAR} fill="var(--ridge-near)" />
      {/* A path through the hills, and travellers on it */}
      <path d="M 0 820 Q 400 760 800 800 T 1600 780" fill="none" stroke="var(--path)" strokeWidth={6} />
      {[0, 1].map((i) => (
        <Light key={i} x={lerp(80 + i * 50, 1300 + i * 50, walk)} y={800 - Math.sin(walk * Math.PI) * 20} r={5} t={t} seed={i + 702} />
      ))}
      {/* Village lamps */}
      {[1380, 1430, 1470].map((x, i) => (
        <Light key={x} x={x} y={760 - i * 6} r={4} color="gold" core="var(--window)" t={t} seed={i + 704} />
      ))}
      {/* Eyes in the dark that slink away */}
      {[
        { x: 300, y: 740 },
        { x: 1100, y: 730 },
      ].map((w, i) => (
        <g key={i} opacity={wolves} transform={`translate(${(i ? 1 : -1) * back * 200} 0)`}>
          <circle cx={w.x} cy={w.y} r={4} fill="var(--amber)" />
          <circle cx={w.x + 14} cy={w.y} r={4} fill="var(--amber)" />
        </g>
      ))}
      {back > 0 && back < 1 && <Ripple x={800} y={300} t={t} from={9} period={2.4} max={600} color="var(--star)" count={1} />}
    </g>
  );
};

function lin01(v: number) {
  return Math.max(0, Math.min(1, v));
}

const d7Form: Visual = ({ t }) => {
  const eyes = seg(t, 0.4, 1.6);
  const breath = seg(t, 2.6, 3.6);
  const donkey = seg(t, 4.6, 6.0);
  const weapons = seg(t, 5.6, 7.0);
  const hands = seg(t, 9.4, 11.0);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <Stars t={t} opacity={0.4} />
      {t > 2.8 && t < 3.4 && <rect width={W} height={H} fill="var(--bolt)" opacity={0.2} />}
      <DarkForm x={800} y={330} t={t} eyes={eyes} breath={breath} />
      <Donkey x={780} y={800} size={0.8} t={t} opacity={donkey} />
      {/* Weapons in the left hands */}
      <g opacity={weapons}>
        <Sword x={480} y={520} size={1} fill="var(--steel)" />
        <Bolt x={400} y={580} />
      </g>
      {/* Fearlessness and blessing in the right hands */}
      <Hand x={1100} y={460} opacity={hands} />
      <Hand x={1100} y={640} down opacity={hands} />
      {hands > 0.9 && <Ripple x={1100} y={550} t={t} from={11} period={2.6} max={200} color="var(--gold)" count={2} />}
    </g>
  );
};

const r7b = seeded(710);
const CLONES = Array.from({ length: 15 }, (_, i) => ({ x: 900 + r7b() * 620, y: 560 + r7b() * 220, s: 0.6 + r7b() * 0.5, order: i }));

const d7Raktabija: Visual = ({ t }) => {
  const kali = seg(t, 0.8, 3.2);
  const raktabija = seg(t, 4.4, 5.4);
  const count = t < 5.4 ? 0 : t < 7.0 ? 2 : t < 8.4 ? 6 : 14;
  const spread = seg(t, 11.6, 12.8);
  const fadeClone = (i: number) => (t < 12.6 ? 1 : 1 - Math.min(1, Math.max(0, (t - 12.6 - i * 0.12) / 0.5)));
  const fall = seg(t, 14.6, 15.8);
  const strikes = [5.4, 7.0, 8.4];
  return (
    <g>
      <Sky id="sky-violet" />
      <rect width={W} height={H} fill="var(--storm)" opacity={0.55 * (1 - fall * 0.7)} />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Ground y={800} />
      {/* The Devi, and Kali springing from her brow */}
      <Light x={360} y={420} r={15} t={t} seed={3} breathe={1} />
      <Radiate x={360} y={420} count={10} r0={26} r1={100} spread={300} start={-240} opacity={0.6} stroke="var(--gold)" width={3} />
      <g transform={`translate(${lerp(360, 620, kali)} ${lerp(380, 380, kali)})`} opacity={kali}>
        <circle r={120 + spread * 260} fill="url(#halo-shadow)" />
        <Light x={0} y={0} r={13} color="shadow" core="var(--kali)" t={t} seed={711} />
        <circle r={24} fill="none" stroke="var(--bolt)" strokeOpacity={0.5} />
      </g>
      {/* Kali spreads wide, a dark cloak over the ground */}
      {spread > 0 && <ellipse cx={1080} cy={790} rx={560 * spread} ry={70 * spread} fill="var(--kali)" stroke="var(--shadow-line)" strokeWidth={3} opacity={0.95} />}
      {/* Raktabija and the copies */}
      {CLONES.slice(0, count).map((c, i) => (
        <Light key={i} x={c.x} y={c.y} r={9 * c.s} color="ember" core="var(--blood)" t={t} seed={i + 712} opacity={fadeClone(i) * 0.9} />
      ))}
      <Light x={1080} y={lerp(480, 760, fall)} r={14} color="ember" core="var(--blood)" t={t} seed={730} opacity={raktabija * (1 - fall * 0.85)} />
      {/* Each strike: drops fall, and each drop becomes another of him */}
      {strikes.map((s, k) => {
        if (t < s || t > s + 1.4) return null;
        const p = (t - s) / 1.4;
        return (
          <g key={k}>
            <circle cx={1080} cy={480} r={30 + p * 60} fill="none" stroke="var(--gold)" strokeWidth={3} opacity={1 - p} />
            {Array.from({ length: 4 + k * 2 }, (_, i) => (
              <circle key={i} cx={1080 + (i - (2 + k)) * 40 * p} cy={480 + p * p * 300} r={5} fill="var(--blood)" />
            ))}
          </g>
        );
      })}
      {/* After Kali spreads, drops fall into her, not the ground */}
      {t > 11.8 && t < 14.6 &&
        Array.from({ length: 8 }, (_, i) => {
          const p = ((t * 1.3 + i / 8) % 1);
          return <circle key={i} cx={1080 + (i - 4) * 50} cy={480 + p * 280} r={5} fill="var(--blood)" opacity={1 - p * 0.4} />;
        })}
      {t > 14.6 && <Ripple x={1080} y={600} t={t} from={14.6} period={2.2} max={800} color="var(--gold)" count={3} />}
    </g>
  );
};

const d7Dawn: Visual = ({ t }) => {
  const dawn = seg(t, 3.6, 8.0);
  const sun = seg(t, 5.0, 10.0);
  const pale = seg(t, 7.8, 10.0);
  return (
    <g>
      <Sky />
      <rect width={W} height={H} fill="url(#sky-dawn)" opacity={dawn} />
      <Stars t={t} opacity={1 - dawn} />
      <circle cx={800} cy={lerp(900, 700, sun)} r={120} fill="url(#halo-gold)" opacity={sun} />
      <path d={RIDGE_FAR} fill="var(--ridge-far)" />
      <path d={RIDGE_MID} fill="var(--ridge-mid)" />
      <Mist t={t} y={720} opacity={0.12 + dawn * 0.1} />
      <DarkForm x={800} y={380} t={t} scale={lerp(0.7, 0.5, dawn)} eyes={1 - dawn * 0.6} />
      <Light x={800} y={260} r={10} color="pale" core="var(--pale-core)" t={t} seed={740} opacity={pale} breathe={1} />
      {pale > 0.8 && <Ripple x={800} y={260} t={t} from={10} period={2.4} max={200} color="var(--pale-core)" count={2} />}
    </g>
  );
};

const d7Emblems: Visual = ({ t }) => {
  const a = (at: number) => seg(t, at, at + 1.6);
  return (
    <g>
      <rect width={W} height={H} fill="var(--cosmos)" />
      <Stars t={t} opacity={0.5} />
      <text x={800} y={90} textAnchor="middle" className="svg-devanagari" fontSize={46} fill="var(--gold)" opacity={a(0.3) * 0.8}>
        कालरात्रि
      </text>
      <DarkForm x={800} y={300} t={t} eyes={a(0.4)} breath={a(0.9)} scale={0.85} />
      <g opacity={a(1.2)}>
        <Sword x={540} y={560} size={0.9} fill="var(--steel)" />
        <Bolt x={470} y={600} />
      </g>
      <Hand x={1080} y={470} opacity={a(1.6)} />
      <Hand x={1080} y={620} down opacity={a(1.9)} />
      <Donkey x={790} y={830} size={0.6} t={t} opacity={a(2.2)} />
    </g>
  );
};

// ---------- Marvel scenes: letterboxed by the Stage -------------------------

/** The Dark Dimension: slowly turning shapes in purple and orange. */
function DarkDimension({ t }: { t: number }) {
  return (
    <g>
      <rect width={W} height={H} fill="var(--dim-dark)" />
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse
          key={i}
          cx={800 + Math.cos(i * 1.7) * 360}
          cy={450 + Math.sin(i * 2.3) * 220}
          rx={260 - i * 20}
          ry={80 + i * 10}
          fill="none"
          stroke={i % 2 ? "var(--dim-orange)" : "var(--aurora)"}
          strokeOpacity={0.35}
          strokeWidth={10}
          transform={`rotate(${t * (6 + i * 3) * (i % 2 ? 1 : -1) + i * 40} ${800 + Math.cos(i * 1.7) * 360} ${450 + Math.sin(i * 2.3) * 220})`}
        />
      ))}
    </g>
  );
}

const DEATHS = [3.0, 5.6, 7.8, 9.6];

const d7Loop: Visual = ({ t }) => {
  const arrive = seg(t, 0.3, 2.0);
  const sinceDeath = DEATHS.filter((d) => t >= d).map((d) => t - d).pop();
  const gone = sinceDeath !== undefined && sinceDeath < 0.4;
  const flash = sinceDeath !== undefined && sinceDeath < 0.25 ? 1 - sinceDeath / 0.25 : 0;
  const tired = DEATHS.filter((d) => t >= d).length;
  return (
    <g>
      <DarkDimension t={t} />
      {/* Dormammu: a vast face of fire and dark */}
      <g opacity={0.9}>
        <circle cx={1060} cy={380} r={300} fill="url(#halo-shadow)" />
        <circle cx={1060} cy={380} r={230} fill="none" stroke="var(--dim-orange)" strokeWidth={6} strokeOpacity={0.5 + 0.2 * Math.sin(t * 2)} />
        <ellipse cx={990} cy={350} rx={34} ry={14} fill="var(--dim-orange)" />
        <ellipse cx={1130} cy={350} rx={34} ry={14} fill="var(--dim-orange)" />
      </g>
      <rect width={W} height={H} fill="var(--dim-orange)" opacity={flash * 0.35} />
      {/* Strange, the green ring of time around him */}
      {!gone && (
        <g>
          <Light x={lerp(200, 520, arrive)} y={500} r={9} color="steel" core="var(--steel-light)" t={t} seed={750} />
          <g transform={`translate(${lerp(200, 520, arrive)} 500) rotate(${t * 90})`} opacity={0.8}>
            <circle r={40} fill="none" stroke="var(--eye-green)" strokeWidth={3} />
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={0} y1={-40} x2={0} y2={-48} stroke="var(--eye-green)" strokeWidth={3} transform={`rotate(${i * 30})`} />
            ))}
          </g>
        </g>
      )}
      {/* A tally of returns */}
      {Array.from({ length: tired }, (_, i) => (
        <line key={i} x1={160 + i * 22} y1={760} x2={160 + i * 22} y2={810} stroke="var(--eye-green)" strokeWidth={4} opacity={0.7} />
      ))}
      {t > 10.8 && <Ripple x={520} y={500} t={t} from={10.8} period={1.2} max={140} color="var(--eye-green)" count={2} />}
    </g>
  );
};

const d7Mordo: Visual = ({ t }) => {
  const crack = seg(t, 4.0, 6.0);
  const leave = seg(t, 7.8, 10.6);
  return (
    <g>
      <Sky id="sky-steel" />
      <Stars t={t} opacity={0.3} />
      <path d={RIDGE_FAR} fill="var(--tower)" opacity={0.7} />
      <Ground y={720} fill="var(--steel-sky-top)" />
      {/* A ring of law, cracking */}
      <g transform="translate(800 360)">
        <circle r={150} fill="none" stroke="var(--eye-green)" strokeWidth={4} strokeOpacity={0.6 * (1 - crack * 0.5)} strokeDasharray={crack > 0 ? `${900 - crack * 200} ${crack * 200}` : undefined} />
        {crack > 0 && <path d={`M 120 -90 L ${120 + crack * 40} ${-60 + crack * 30} L ${100 + crack * 50} ${-20 + crack * 10}`} stroke="var(--eye-green)" strokeWidth={3} fill="none" opacity={crack} />}
      </g>
      <Light x={700} y={660} r={9} color="steel" core="var(--steel-light)" t={t} seed={750} />
      <Light x={lerp(900, 1500, leave)} y={660} r={9} color="ember" core="var(--amber)" t={t} seed={751} opacity={1 - seg(t, 9.6, 10.8)} />
    </g>
  );
};

/** A gothic manor, in greys. */
function Manor() {
  return (
    <g>
      <rect x={420} y={260} width={760} height={420} fill="var(--mono-3)" />
      {[420, 1100].map((x) => (
        <g key={x}>
          <rect x={x} y={160} width={80} height={520} fill="var(--mono-3)" />
          <path d={`M ${x - 10} 160 L ${x + 40} 60 L ${x + 90} 160 Z`} fill="var(--mono-3)" />
        </g>
      ))}
      <path d="M 400 260 L 800 140 L 1200 260 Z" fill="var(--mono-3)" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M ${520 + (i % 5) * 120} ${360 + Math.floor(i / 5) * 140} l 0 -40 q 20 -30 40 0 l 0 40 Z`} fill="var(--mono-1)" opacity={(i * 7) % 3 === 0 ? 0.7 : 0.25} />
      ))}
    </g>
  );
}

const d7Manor: Visual = ({ t }) => {
  const maze = seg(t, 4.0, 5.4);
  const ted = seg(t, 4.6, 6.0);
  const stone = seg(t, 8.0, 9.0);
  return (
    <g>
      <rect width={W} height={H} fill="var(--mono-4)" />
      <Stars t={t} opacity={0.25} />
      <circle cx={1360} cy={150} r={44} fill="var(--mono-1)" opacity={0.85} />
      <Manor />
      <Ground y={680} fill="var(--mono-4)" />
      {/* The hedge maze */}
      <g opacity={0.6 + maze * 0.4} fill="none" stroke="var(--mono-2)" strokeWidth={16}>
        <path d="M 160 780 L 160 700 L 1440 700 L 1440 780 M 300 780 L 300 740 L 700 740 M 900 740 L 1300 740 L 1300 780" />
      </g>
      {/* Hunters in their finery */}
      {[560, 660, 940, 1040].map((x, i) => (
        <Light key={x} x={x} y={640} r={6} color="pale" core="var(--mono-1)" t={t} seed={i + 760} opacity={0.8} />
      ))}
      {/* Jack and Ted */}
      <Light x={lerp(400, 640, maze)} y={730} r={7} color="pale" core="var(--mono-1)" t={t} seed={765} />
      <g opacity={ted}>
        <ellipse cx={760} cy={700} rx={60} ry={70} fill="var(--mono-2)" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M ${720 + i * 12} 660 q ${Math.sin(t * 2 + i) * 6} 40 0 90`} stroke="var(--mono-3)" strokeWidth={4} fill="none" />
        ))}
        <circle cx={746} cy={680} r={5} fill="var(--mono-1)" />
        <circle cx={774} cy={680} r={5} fill="var(--mono-1)" />
      </g>
      {/* The Bloodstone: the only colour in the scene */}
      <g opacity={stone}>
        <circle cx={640} cy={710} r={60} fill="url(#halo-ember)" />
        <circle cx={640} cy={710} r={9} fill="var(--bloodstone)" />
      </g>
    </g>
  );
};

const d7Cage: Visual = ({ t }) => {
  const speak = t > 4.2 && t < 6.6;
  const change = seg(t, 6.6, 8.0);
  const guards = 1 - seg(t, 7.8, 10.0);
  const over = seg(t, 9.6, 10.8);
  const spikes = 18;
  const wx = lerp(720, 860, over);
  return (
    <g>
      <rect width={W} height={H} fill="var(--mono-4)" />
      <Ground y={760} fill="var(--mono-3)" />
      {/* Guards at the edges */}
      {[180, 280, 1320, 1420].map((x, i) => (
        <Light key={x} x={x + (i < 2 ? -1 : 1) * (1 - guards) * 120} y={700} r={6} color="pale" core="var(--mono-1)" t={t} seed={i + 770} opacity={guards * 0.85} />
      ))}
      {/* The cage */}
      <rect x={520} y={260} width={560} height={500} fill="none" stroke="var(--mono-1)" strokeWidth={6} opacity={0.6} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={540 + i * 52} y1={260} x2={540 + i * 52} y2={760} stroke="var(--mono-1)" strokeWidth={4} opacity={change > 0.8 && (i === 4 || i === 5) ? 0.15 : 0.55} />
      ))}
      {/* Elsa */}
      <Light x={960} y={660} r={8} color="pale" core="var(--mono-1)" t={t} seed={771} />
      {/* Jack, then the werewolf */}
      <g transform={`translate(${wx} ${lerp(660, 600, change)})`}>
        <circle r={20 + change * 80} fill="url(#halo-pale)" opacity={0.25 + change * 0.2} />
        {change > 0 && (
          <path
            d={Array.from({ length: spikes * 2 }, (_, i) => {
              const a = (i / (spikes * 2)) * Math.PI * 2;
              const rr = (i % 2 ? 54 : 80) * change + Math.sin(t * 6 + i) * 4;
              return `${i ? "L" : "M"} ${Math.cos(a) * rr} ${Math.sin(a) * rr}`;
            }).join(" ") + " Z"}
            fill="var(--mono-3)"
            stroke="var(--mono-1)"
            strokeWidth={2}
          />
        )}
        <Light x={0} y={0} r={8} color="pale" core="var(--mono-1)" t={t} seed={772} opacity={1 - change * 0.5} />
        {change > 0.6 && (
          <g>
            <circle cx={-16} cy={-14} r={5} fill="var(--mono-1)" />
            <circle cx={16} cy={-14} r={5} fill="var(--mono-1)" />
          </g>
        )}
      </g>
      {speak && <Ripple x={720} y={660} t={t} from={4.2} period={1.2} max={90} color="var(--mono-1)" count={2} />}
      {t > 10.8 && <Ripple x={wx} y={600} t={t} from={10.8} period={2} max={120} color="var(--mono-1)" count={1} />}
    </g>
  );
};

export const day7Visuals: Record<string, Visual> = {
  d7Opening,
  d7Night,
  d7Form,
  d7Raktabija,
  d7Dawn,
  d7Emblems,
  d7Loop,
  d7Mordo,
  d7Manor,
  d7Cage,
};

export const day7Film = ["d7Loop", "d7Mordo", "d7Manor", "d7Cage"];

