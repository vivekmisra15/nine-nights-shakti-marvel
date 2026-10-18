// ---------------------------------------------------------------------------
// useClock: the heart of the cinematic controls.
//
// Every illustration is drawn as a pure function of time `t` (in seconds).
// This hook advances `t` with requestAnimationFrame, so:
//   - pause really stops time,
//   - slow motion really advances time more slowly,
//   - replay really resets time to 0,
//   - the scrubber can jump to any moment,
//   - a freeze point stops time exactly where the story needs it.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import type { SlowWindow } from "../content/types";

interface ClockOptions {
  duration: number;
  /** Automatic slow-motion window inside the beat. */
  slow?: SlowWindow;
  /** Time at which to stop and call onStop (a freeze-frame). */
  stopAt?: number;
  onStop?: () => void;
  /** When false, time sits still at the end (reading mode). */
  enabled: boolean;
  /** Learner's chosen speed: 1 for normal, below 1 for slow motion. */
  userRate: number;
}

export interface Clock {
  t: number;
  playing: boolean;
  ended: boolean;
  inSlow: boolean;
  /** The speed time is actually moving at right now. */
  effectiveRate: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (t: number) => void;
  replay: () => void;
}

export function useClock({ duration, slow, stopAt, onStop, enabled, userRate }: ClockOptions): Clock {
  const [t, setT] = useState(enabled ? 0 : duration);
  const [playing, setPlaying] = useState(enabled);

  // Refs let the animation loop read the latest values without restarting.
  const tRef = useRef(t);
  const playingRef = useRef(playing);
  const opts = useRef({ duration, slow, stopAt, onStop, userRate });
  opts.current = { duration, slow, stopAt, onStop, userRate };

  const set = useCallback((value: number) => {
    tRef.current = value;
    setT(value);
  }, []);

  const setPlay = useCallback((value: boolean) => {
    playingRef.current = value;
    setPlaying(value);
  }, []);

  // Reset whenever the beat changes (duration identifies the beat closely
  // enough together with `enabled`; DayPlayer also remounts per beat).
  useEffect(() => {
    set(enabled ? 0 : duration);
    setPlay(enabled);
  }, [enabled, duration, set, setPlay]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000); // cap long gaps (tab switch)
      last = now;
      if (playingRef.current) {
        const o = opts.current;
        const cur = tRef.current;
        const slowFactor = o.slow && cur >= o.slow.from && cur < o.slow.to ? o.slow.rate ?? 0.3 : 1;
        let next = cur + dt * o.userRate * slowFactor;

        if (o.stopAt !== undefined && cur < o.stopAt && next >= o.stopAt) {
          next = o.stopAt;
          set(next);
          setPlay(false);
          o.onStop?.();
        } else if (next >= o.duration) {
          set(o.duration);
          setPlay(false);
        } else {
          set(next);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, set, setPlay]);

  const play = useCallback(() => {
    if (!enabled) return;
    if (tRef.current >= opts.current.duration) set(0);
    setPlay(true);
  }, [enabled, set, setPlay]);

  const pause = useCallback(() => setPlay(false), [setPlay]);
  const toggle = useCallback(() => (playingRef.current ? pause() : play()), [pause, play]);
  const seek = useCallback(
    (value: number) => set(Math.max(0, Math.min(opts.current.duration, value))),
    [set],
  );
  const replay = useCallback(() => {
    if (!enabled) return;
    set(0);
    setPlay(true);
  }, [enabled, set, setPlay]);

  const inSlow = !!slow && t >= slow.from && t < slow.to;
  const effectiveRate = userRate * (inSlow ? slow?.rate ?? 0.3 : 1);

  return { t, playing, ended: t >= duration, inSlow, effectiveRate, play, pause, toggle, seek, replay };
}
