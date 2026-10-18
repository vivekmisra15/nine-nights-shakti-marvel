// A small music switch with a volume slider. The first click also starts
// audio, because browsers only allow sound after the learner interacts.

import { useEffect, useState } from "react";
import { sound } from "../audio/sound";

interface Props {
  on: boolean;
  volume: number;
  onToggle: (on: boolean) => void;
  onVolume: (v: number) => void;
  /** Show the label text as well as the icon. */
  label?: boolean;
}

export function SoundToggle({ on, volume, onToggle, onVolume, label = true }: Props) {
  const [, force] = useState(0);
  useEffect(() => sound.subscribe(() => force((n) => n + 1)), []);
  const waiting = on && !sound.isRunning();

  return (
    <span className={`sound-toggle ${on ? "is-on" : ""}`}>
      <button
        className={`chip-btn sound-btn ${on ? "is-on" : ""}`}
        onClick={() => {
          sound.setEnabled(!on);
          onToggle(!on);
        }}
        aria-pressed={on}
        aria-label="Music"
        title={on ? "Turn music off (M)" : "Turn music on (M)"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={on ? "eq" : ""}>
          {on ? (
            <>
              <rect x="4" y="9" width="3" height="10" rx="1" />
              <rect x="10.5" y="5" width="3" height="14" rx="1" />
              <rect x="17" y="11" width="3" height="8" rx="1" />
            </>
          ) : (
            <path d="M5 9h4l5-4v14l-5-4H5zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        {label ? <span>{on ? (waiting ? "Music: tap to start" : "Music on") : "Music off"}</span> : <span className="sound-short">Music</span>}
      </button>
      {on && (
        <label className="volume">
          <span className="visually-hidden">Music volume</span>
          <input
            id="music-volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              sound.setVolume(v);
              onVolume(v);
            }}
          />
        </label>
      )}
    </span>
  );
}
