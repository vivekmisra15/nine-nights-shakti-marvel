// ---------------------------------------------------------------------------
// The music engine. Everything is synthesised with the Web Audio API, so the
// app needs no audio files and every note is original.
//
//   drone / pad  →┐
//   melody       →├→ music bus → slow-motion filter → master → compressor → speakers
//   hits (bells) →┘          ↘ reverb ↗
//   ambience (wind, rain, fire) ───────→ master
//
// The engine is told what the story is doing (mood, playing or held, playback
// speed, one-off hits) and schedules notes a little ahead of time.
// It works with a live AudioContext or an OfflineAudioContext (for testing).
// ---------------------------------------------------------------------------

import { DRONE_SA, FILM_ROOT, MOODS, type Ambience, type Hit, type Mood, type MoodDef } from "./moods";

const semis = (base: number, s: number) => base * Math.pow(2, s / 12);

/** A small deterministic random generator so phrases have shape, not noise. */
function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export class MusicEngine {
  readonly ctx: BaseAudioContext;
  private master: GainNode;
  private musicBus: GainNode;
  private fxBus: GainNode;
  private ambBus: GainNode;
  private slowFilter: BiquadFilterNode;
  private reverbSend: GainNode;
  private noise: AudioBuffer;
  private amb: Record<Exclude<Ambience, "none">, GainNode>;

  private mood: MoodDef = MOODS.intro;
  private moodName: Mood = "intro";
  private held = false;
  private rate = 1;

  private nextDrone = 0;
  private droneStep = 0;
  private nextMelody = 0;
  private nextBar = 0;
  private barIndex = 0;
  private nextPulse = 0;
  private nextCrackle = 0;
  private nextBell = 0;
  private melodyIndex = 4;
  private phraseLeft = 4;
  private lastFreq = 0;
  private random = rng(108);

  /** Counts scheduled notes; read by tests. */
  notes = 0;

  constructor(ctx: BaseAudioContext) {
    this.ctx = ctx;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.02;
    compressor.release.value = 0.4;
    compressor.connect(ctx.destination);

    // A fixed lift so the music carries on laptop and tablet speakers.
    const makeup = ctx.createGain();
    makeup.gain.value = 1.8;
    makeup.connect(compressor);
    this.master = ctx.createGain();
    this.master.gain.value = 0.7;
    this.master.connect(makeup);

    this.slowFilter = ctx.createBiquadFilter();
    this.slowFilter.type = "lowpass";
    this.slowFilter.frequency.value = 16000;
    this.slowFilter.connect(this.master);

    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = this.mood.level;
    this.musicBus.connect(this.slowFilter);

    this.fxBus = ctx.createGain();
    this.fxBus.gain.value = 0.8;
    this.fxBus.connect(this.master);

    // Reverb: a convolver with a generated, slowly decaying impulse.
    const reverb = ctx.createConvolver();
    reverb.buffer = this.impulse(3.2);
    this.reverbSend = ctx.createGain();
    this.reverbSend.gain.value = 0.32;
    reverb.connect(this.reverbSend);
    this.reverbSend.connect(this.master);
    this.musicBus.connect(reverb);
    this.fxBus.connect(reverb);
    this.reverbInput = reverb;

    this.noise = this.noiseBuffer(2);
    this.ambBus = ctx.createGain();
    this.ambBus.gain.value = 1;
    this.ambBus.connect(this.master);
    this.amb = { wind: this.makeWind(), rain: this.makeRain(), fire: this.makeFire() };
  }

  private reverbInput: ConvolverNode;

  // ------------------------------------------------------------ controls

  get currentMood() {
    return this.moodName;
  }

  setMood(name: Mood) {
    if (name === this.moodName) return;
    const prev = this.mood;
    this.mood = MOODS[name];
    this.moodName = name;
    const now = this.ctx.currentTime;
    this.musicBus.gain.setTargetAtTime(this.mood.level, now, 0.8);
    if (prev.palette !== this.mood.palette) {
      this.nextBar = now + 0.05;
      this.nextDrone = now + 0.05;
    }
    this.phraseLeft = 2 + Math.floor(this.random() * 4);
    this.setAmbience(this.mood.ambience);
  }

  setAmbience(kind: Ambience) {
    const now = this.ctx.currentTime;
    const levels: Record<Exclude<Ambience, "none">, number> = { wind: 0.5, rain: 0.42, fire: 0.5 };
    (Object.keys(this.amb) as Exclude<Ambience, "none">[]).forEach((k) => {
      this.amb[k].gain.setTargetAtTime(k === kind ? levels[k] : 0, now, 1.2);
    });
  }

  /** Held: the story is paused or frozen. Drone and pads continue; melody rests. */
  setHeld(held: boolean) {
    this.held = held;
  }

  /** Playback speed. Below 1 the music slows, softens and opens into reverb. */
  setRate(rate: number) {
    const r = Math.max(0.2, Math.min(1, rate));
    if (Math.abs(r - this.rate) < 0.01) return;
    this.rate = r;
    const now = this.ctx.currentTime;
    this.slowFilter.frequency.setTargetAtTime(r < 0.95 ? 1400 : 16000, now, 0.4);
    this.reverbSend.gain.setTargetAtTime(r < 0.95 ? 0.48 : 0.32, now, 0.6);
  }

  setVolume(v: number) {
    this.master.gain.setTargetAtTime(Math.max(0, Math.min(1, v)), this.ctx.currentTime, 0.15);
  }

  // ------------------------------------------------------------ scheduler

  /** Schedule everything that should start before `until` (in context seconds). */
  schedule(until: number) {
    const m = this.mood;
    const beat = m.beat / this.rate;
    const now = this.ctx.currentTime;
    if (this.nextDrone < now - 1) this.nextDrone = now;
    if (this.nextMelody < now - 1) this.nextMelody = now;
    if (this.nextBar < now - 1) this.nextBar = now;
    if (this.nextPulse < now - 1) this.nextPulse = now;
    if (this.nextCrackle < now - 1) this.nextCrackle = now;

    // Drone: four tanpura strings, Pa – Sa' – Sa' – Sa, round and round.
    if (m.palette === "tanpura") {
      const strings = [semis(DRONE_SA, -5), DRONE_SA, DRONE_SA, DRONE_SA / 2];
      while (this.nextDrone < until) {
        this.tanpura(strings[this.droneStep % 4], this.nextDrone, this.droneStep % 4 === 3 ? 0.07 : 0.05);
        this.droneStep++;
        this.nextDrone += (1.15 / Math.max(0.5, this.rate)) * (this.droneStep % 4 === 0 ? 1.6 : 1);
      }
    } else {
      this.nextDrone = Math.max(this.nextDrone, until);
    }

    // Film pads: one chord per bar of four beats.
    if (m.palette === "film" && m.chords) {
      while (this.nextBar < until) {
        const chord = m.chords[this.barIndex % m.chords.length];
        const bar = beat * 4;
        chord.forEach((s) => this.pad(semis(FILM_ROOT, s - 12), this.nextBar, bar + 1.6, m.choir));
        this.pad(semis(FILM_ROOT, chord[0] - 24), this.nextBar, bar + 1.6, false, 0.6);
        if (m.brass && !this.held) this.brass(semis(FILM_ROOT, chord[0]), this.nextBar + beat * 2, beat * 2);
        this.barIndex++;
        this.nextBar += bar;
      }
    } else {
      this.nextBar = Math.max(this.nextBar, until);
    }

    // Heartbeat pulse.
    if (m.pulse && !this.held) {
      while (this.nextPulse < until) {
        this.heartbeat(this.nextPulse, 0.32);
        this.nextPulse += beat * 2;
      }
    } else {
      this.nextPulse = Math.max(this.nextPulse, until);
    }

    // Temple bell rhythm.
    if (m.bells && !this.held) {
      if (this.nextBell < now - 1) this.nextBell = now;
      while (this.nextBell < until) {
        this.bell(this.nextBell, 660, 0.07, 3.2);
        this.nextBell += beat * m.bells;
      }
    } else {
      this.nextBell = Math.max(this.nextBell, until);
    }

    // Fire crackle.
    if (m.ambience === "fire") {
      while (this.nextCrackle < until) {
        this.crackle(this.nextCrackle);
        this.nextCrackle += 0.06 + this.random() * 0.35;
      }
    } else {
      this.nextCrackle = Math.max(this.nextCrackle, until);
    }

    // Melody: phrases of a few notes, then a breath.
    if (m.voice !== "none" && !this.held) {
      while (this.nextMelody < until) {
        const t = this.nextMelody;
        if (this.phraseLeft <= 0) {
          // Rest between phrases, and return home to Sa or Pa.
          this.phraseLeft = 3 + Math.floor(this.random() * 4);
          this.melodyIndex = this.random() < 0.6 ? 0 : 3;
          this.nextMelody += beat * (1 + Math.floor(this.random() * 3));
          continue;
        }
        const lengths = m.voice === "santoor" || m.voice === "kalimba" ? [0.5, 1, 1, 2] : [1, 1, 2, 3];
        const len = lengths[Math.floor(this.random() * lengths.length)];
        if (this.random() < m.density + 0.25) {
          const f = this.pickNote(m);
          this.voice(m.voice, f, t, len * beat);
          this.phraseLeft--;
        }
        this.nextMelody += len * beat;
      }
    } else {
      this.nextMelody = Math.max(this.nextMelody, until);
    }
  }

  private pickNote(m: MoodDef) {
    const pitches: number[] = [];
    for (const oct of [0, 1]) m.scale.forEach((s) => pitches.push(s + oct * 12));
    pitches.push(24);
    const step = [-2, -1, -1, 1, 1, 2, 0][Math.floor(this.random() * 7)];
    this.melodyIndex = Math.max(0, Math.min(pitches.length - 1, this.melodyIndex + step));
    const base = (m.palette === "film" ? FILM_ROOT : DRONE_SA) * (m.register ?? 1);
    return semis(base, pitches[this.melodyIndex]);
  }

  // ------------------------------------------------------------ instruments

  private env(g: GainNode, t: number, attack: number, peak: number, hold: number, release: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.setValueAtTime(peak, t + attack + hold);
    g.gain.setTargetAtTime(0.0001, t + attack + hold, release / 4);
  }

  /** A tanpura string: bright saw tones through a moving "jawari" band. */
  private tanpura(f: number, t: number, level: number) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 4.2);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = f * 7;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 4;
    bp.frequency.setValueAtTime(f * 14, t);
    bp.frequency.exponentialRampToValueAtTime(f * 3, t + 3.4);
    const bpGain = c.createGain();
    bpGain.gain.value = 0.9;
    for (const d of [1, 1.0028]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f * d;
      o.connect(lp);
      o.connect(bp);
      o.start(t);
      o.stop(t + 4.3);
    }
    lp.connect(g);
    bp.connect(bpGain).connect(g);
    g.connect(this.musicBus);
    this.notes++;
  }

  private voice(kind: MoodDef["voice"], f: number, t: number, dur: number) {
    if (kind === "bansuri") this.bansuri(f, t, dur);
    else if (kind === "santoor") this.santoor(f, t);
    else if (kind === "cello") this.cello(f, t, dur);
    else if (kind === "kalimba") this.kalimba(f, t);
    this.notes++;
  }

  /** Bamboo flute: a sine with breath, a gentle glide (meend) and late vibrato. */
  private bansuri(f: number, t: number, dur: number) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = "sine";
    const from = this.lastFreq || f;
    o.frequency.setValueAtTime(from, t);
    o.frequency.setTargetAtTime(f, t, 0.045);
    this.lastFreq = f;
    const o2 = c.createOscillator();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(from * 2, t);
    o2.frequency.setTargetAtTime(f * 2, t, 0.045);
    const o2g = c.createGain();
    o2g.gain.value = 0.12;
    const lfo = c.createOscillator();
    lfo.frequency.value = 5.2;
    const lfoGain = c.createGain();
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(f * 0.011, t + Math.min(0.6, dur * 0.6));
    lfo.connect(lfoGain);
    lfoGain.connect(o.frequency);
    lfoGain.connect(o2.frequency);
    const g = c.createGain();
    this.env(g, t, 0.12, 0.085, Math.max(0.05, dur - 0.25), 0.5);
    o.connect(g);
    o2.connect(o2g).connect(g);
    // Breath at the start of the note.
    const n = c.createBufferSource();
    n.buffer = this.noise;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = f * 4;
    bp.Q.value = 1.5;
    const ng = c.createGain();
    this.env(ng, t, 0.03, 0.025, 0.05, 0.15);
    n.connect(bp).connect(ng).connect(this.musicBus);
    g.connect(this.musicBus);
    const end = t + dur + 1;
    [o, o2, lfo].forEach((x) => {
      x.start(t);
      x.stop(end);
    });
    n.start(t, Math.random());
    n.stop(t + 0.4);
  }

  /** Santoor: a bright struck string, often struck twice. */
  private santoor(f: number, t: number) {
    const strike = (time: number, level: number) => {
      const c = this.ctx;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(level, time + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);
      const parts: [number, OscillatorType, number][] = [
        [1, "triangle", 1],
        [2.003, "sine", 0.35],
        [3.01, "sine", 0.12],
      ];
      parts.forEach(([mul, type, amp]) => {
        const o = c.createOscillator();
        o.type = type;
        o.frequency.value = f * mul;
        const og = c.createGain();
        og.gain.value = amp;
        o.connect(og).connect(g);
        o.start(time);
        o.stop(time + 1.7);
      });
      g.connect(this.musicBus);
    };
    strike(t, 0.09);
    if (this.random() < 0.45) strike(t + 0.11, 0.05);
  }

  /** Cello-like line for the film scenes. */
  private cello(f: number, t: number, dur: number) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    const lfo = c.createOscillator();
    lfo.frequency.value = 4.8;
    const lg = c.createGain();
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(f * 0.009, t + 0.5);
    lfo.connect(lg).connect(o.frequency);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    lp.Q.value = 1.5;
    const g = c.createGain();
    this.env(g, t, 0.35, 0.05, Math.max(0.1, dur - 0.3), 0.8);
    o.connect(lp).connect(g).connect(this.musicBus);
    [o, lfo].forEach((x) => {
      x.start(t);
      x.stop(t + dur + 1.5);
    });
  }

  /** Kalimba-like pluck: warm and short. */
  private kalimba(f: number, t: number) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.1, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const o2 = c.createOscillator();
    o2.type = "sine";
    o2.frequency.value = f * 5.4;
    const g2 = c.createGain();
    g2.gain.setValueAtTime(0.25, t);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g);
    o2.connect(g2).connect(g);
    g.connect(this.musicBus);
    [o, o2].forEach((x) => {
      x.start(t);
      x.stop(t + 1.2);
    });
  }

  /** A soft string pad note (or a choir-like "aah" when `choir` is set). */
  private pad(f: number, t: number, dur: number, choir = false, level = 1) {
    const c = this.ctx;
    const g = c.createGain();
    this.env(g, t, 1.4, 0.022 * level, Math.max(0.2, dur - 2.2), 1.6);
    const out = c.createBiquadFilter();
    out.type = "lowpass";
    out.frequency.value = choir ? 2400 : 1100;
    for (const cents of [-7, 0, 7]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f * Math.pow(2, cents / 1200);
      o.connect(out);
      o.start(t);
      o.stop(t + dur + 2);
    }
    if (choir) {
      // Two vowel formants make the pad sound sung.
      for (const [fc, q] of [
        [720, 6],
        [1150, 7],
      ]) {
        const bp = c.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = fc;
        bp.Q.value = q;
        const bg = c.createGain();
        bg.gain.value = 2.2;
        out.connect(bp).connect(bg).connect(g);
      }
    } else {
      out.connect(g);
    }
    g.connect(this.musicBus);
    this.notes++;
  }

  /** A brass-like swell under heroic moments. */
  private brass(f: number, t: number, dur: number) {
    const c = this.ctx;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(300, t);
    lp.frequency.linearRampToValueAtTime(1800, t + dur * 0.6);
    lp.frequency.linearRampToValueAtTime(500, t + dur + 0.5);
    const g = c.createGain();
    this.env(g, t, dur * 0.5, 0.04, dur * 0.2, 0.8);
    for (const mul of [1, 1.5, 2]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f * mul;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 1.5);
    }
    lp.connect(g).connect(this.musicBus);
    this.notes++;
  }

  private heartbeat(t: number, level: number) {
    const thump = (time: number, amp: number) => {
      const c = this.ctx;
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(70, time);
      o.frequency.exponentialRampToValueAtTime(38, time + 0.16);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(amp, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
      o.connect(g).connect(this.fxBus);
      o.start(time);
      o.stop(time + 0.35);
    };
    thump(t, level);
    thump(t + 0.26, level * 0.6);
    this.notes++;
  }

  private crackle(t: number) {
    const c = this.ctx;
    const n = c.createBufferSource();
    n.buffer = this.noise;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1800 + this.random() * 2600;
    bp.Q.value = 2;
    const g = c.createGain();
    const amp = 0.02 + this.random() * 0.05;
    g.gain.setValueAtTime(amp, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03 + this.random() * 0.04);
    n.connect(bp).connect(g).connect(this.amb.fire);
    n.start(t, this.random());
    n.stop(t + 0.1);
  }

  // ------------------------------------------------------------ one-off hits

  hit(kind: Hit, at?: number) {
    const t = at ?? this.ctx.currentTime + 0.02;
    switch (kind) {
      case "bell":
        return this.bell(t, 330, 0.22, 6);
      case "bellSoft":
        return this.bell(t, 660, 0.09, 3.5);
      case "boom":
        return this.boom(t, 0.5);
      case "thunder":
        this.boom(t, 0.35);
        return this.noiseSwell(t, 380, 2.8, 0.22);
      case "whoosh":
        return this.whoosh(t);
      case "shimmer":
        return this.shimmer(t);
      case "heartbeat":
        return this.heartbeat(t, 0.4);
    }
  }

  /** A temple bell (ghanta): inharmonic partials with long, staggered decays. */
  private bell(t: number, f: number, level: number, decay: number) {
    const c = this.ctx;
    const partials = [
      [1, 1, 1],
      [2.0, 0.55, 0.7],
      [2.76, 0.45, 0.5],
      [4.07, 0.28, 0.35],
      [5.4, 0.18, 0.25],
    ];
    partials.forEach(([mul, amp, d]) => {
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = f * mul;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(level * amp, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay * d);
      o.connect(g).connect(this.fxBus);
      o.start(t);
      o.stop(t + decay * d + 0.1);
    });
    this.notes++;
  }

  private boom(t: number, level: number) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(90, t);
    o.frequency.exponentialRampToValueAtTime(30, t + 1.4);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    o.connect(g).connect(this.fxBus);
    o.start(t);
    o.stop(t + 1.9);
    this.noiseSwell(t, 160, 1.2, level * 0.5);
    this.notes++;
  }

  private noiseSwell(t: number, cutoff: number, dur: number, level: number) {
    const c = this.ctx;
    const n = c.createBufferSource();
    n.buffer = this.noise;
    n.loop = true;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = cutoff;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(lp).connect(g).connect(this.fxBus);
    n.start(t);
    n.stop(t + dur + 0.1);
  }

  private whoosh(t: number) {
    const c = this.ctx;
    const n = c.createBufferSource();
    n.buffer = this.noise;
    n.loop = true;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(3200, t + 0.7);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.25, t + 0.45);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    n.connect(bp).connect(g).connect(this.fxBus);
    n.start(t);
    n.stop(t + 1.2);
    this.notes++;
  }

  /** A sparkle of high notes from the current scale, for light and realisation. */
  private shimmer(t: number) {
    const c = this.ctx;
    const scale = this.mood.scale;
    const base = (this.mood.palette === "film" ? FILM_ROOT : DRONE_SA) * 4;
    for (let i = 0; i < 7; i++) {
      const s = scale[Math.floor(this.random() * scale.length)] + (i > 3 ? 12 : 0);
      const time = t + i * 0.07;
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = semis(base, s);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, time);
      g.gain.linearRampToValueAtTime(0.035, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 2.2);
      o.connect(g).connect(this.fxBus);
      o.start(time);
      o.stop(time + 2.3);
    }
    this.notes++;
  }

  // ------------------------------------------------------------ ambience

  private loopNoise() {
    const n = this.ctx.createBufferSource();
    n.buffer = this.noise;
    n.loop = true;
    n.start();
    return n;
  }

  private makeWind() {
    const c = this.ctx;
    const out = c.createGain();
    out.gain.value = 0;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 520;
    bp.Q.value = 0.9;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.09;
    const lg = c.createGain();
    lg.gain.value = 260;
    lfo.connect(lg).connect(bp.frequency);
    lfo.start();
    const level = c.createGain();
    level.gain.value = 0.18;
    this.loopNoise().connect(bp).connect(level).connect(out);
    out.connect(this.ambBus);
    return out;
  }

  private makeRain() {
    const c = this.ctx;
    const out = c.createGain();
    out.gain.value = 0;
    const hp = c.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 900;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 6500;
    const level = c.createGain();
    level.gain.value = 0.07;
    this.loopNoise().connect(hp).connect(lp).connect(level).connect(out);
    out.connect(this.ambBus);
    return out;
  }

  private makeFire() {
    const c = this.ctx;
    const out = c.createGain();
    out.gain.value = 0;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 180;
    const level = c.createGain();
    level.gain.value = 0.12;
    this.loopNoise().connect(lp).connect(level).connect(out);
    out.connect(this.ambBus);
    return out;
  }

  // ------------------------------------------------------------ buffers

  private noiseBuffer(seconds: number) {
    const c = this.ctx;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
    const d = buf.getChannelData(0);
    const r = rng(7);
    for (let i = 0; i < d.length; i++) d[i] = r() * 2 - 1;
    return buf;
  }

  private impulse(seconds: number) {
    const c = this.ctx;
    const len = Math.floor(c.sampleRate * seconds);
    const buf = c.createBuffer(2, len, c.sampleRate);
    const r = rng(11);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (r() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    return buf;
  }

  /** Disconnects everything (used when tests finish). */
  dispose() {
    this.master.disconnect();
    this.reverbInput.disconnect();
  }
}
