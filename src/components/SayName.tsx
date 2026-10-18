// The Devi's name with a rough respelling and a button to hear it spoken.

import { useEffect, useState } from "react";
import { narrator } from "../audio/speech";

interface Props {
  name: string;
  devanagari: string;
  say: string;
  /** Show the respelling as text next to the button. */
  showRespelling?: boolean;
}

export function SayName({ name, devanagari, say, showRespelling = true }: Props) {
  const [, force] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => narrator.subscribe(() => force((n) => n + 1)), []);
  const can = narrator.available();

  const hear = () => {
    setSpeaking(true);
    // A Hindi voice reads the Devanagari well; otherwise read the English name.
    if (narrator.hasHindiVoice()) narrator.speak(devanagari, () => setSpeaking(false), { lang: "hi" });
    else narrator.speak(name, () => setSpeaking(false), { lang: "en" });
  };

  return (
    <span className="say-name">
      {showRespelling && (
        <span className="say-text" title={`How to say ${name}`}>
          {say}
        </span>
      )}
      {can && (
        <button className={`say-btn ${speaking ? "is-on" : ""}`} onClick={hear} aria-label={`Hear how to say ${name}`} title={`Hear how to say ${name}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9h4l5-4v14l-5-4H4z" />
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" />
          </svg>
        </button>
      )}
    </span>
  );
}
