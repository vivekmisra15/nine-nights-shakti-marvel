// "Find the scene": tells the parent where the real Marvel scene is, so they
// can look it up themselves on Disney+ or YouTube. The app deliberately has no
// links to footage and never plays or stores any.

import { useState } from "react";
import type { FindScene } from "../content/types";
import { FilmIcon } from "./Bits";

interface Props {
  film: string;
  year: number;
  rating?: string;
  find: FindScene;
  compact?: boolean;
}

export function FindSceneCard({ film, year, rating, find, compact = false }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(find.search);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the phrase is still on screen to type.
    }
  };

  return (
    <div className={`find-card ${compact ? "compact" : ""}`}>
      <div className="find-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="21" cy="21" r="13" />
          <path d="M31 31l10 10" />
        </svg>
      </div>
      <div className="find-text">
        <span className="eyebrow film">
          <FilmIcon /> Find the scene
        </span>
        <p className="find-film">
          {film} <span>({year}{rating ? ` · ${rating}` : ""})</span>
        </p>
        <p className="find-where">
          <span className="find-label">Where it is</span> {find.where}
        </p>
        <div className="find-search">
          <span className="find-label">Search for</span>
          <code>{find.search}</code>
          <button className="chip-btn" onClick={copy} aria-label={`Copy the search phrase: ${find.search}`}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {!compact && (
          <p className="small muted">
            Watch it on Disney+, where you can see the whole thing, or look for an official clip on YouTube. Preview it first, then watch together, before or after the retelling.
          </p>
        )}
        {!compact && find.note && <p className="small find-note">{find.note}</p>}
      </div>
    </div>
  );
}
