// Small shared pieces: claim labels, source lines and icons.

import type { ClaimKind, Source } from "../content/types";

export const KIND_LABEL: Record<ClaimKind, string> = {
  tradition: "Traditional narrative",
  interpretation: "Traditional interpretation",
  contemporary: "Contemporary reading",
  comparison: "Our comparison",
  marvel: "Marvel film",
  hypothetical: "Hypothetical · not in any source",
};

/** Which side of the interface a kind belongs to: the lamp (tradition) or the film frame (Marvel). */
export const kindFamily = (kind: ClaimKind) =>
  kind === "tradition" || kind === "interpretation" ? "lamp" : kind === "marvel" ? "film" : kind === "hypothetical" ? "imagine" : "ours";

export function LampIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M12 3c2 3 2.5 5 0 7-2.5-2-2-4 0-7Z" fill="currentColor" />
      <path d="M3 13h18c-1 4-4.5 6-9 6s-8-2-9-6Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function FilmIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
    </svg>
  );
}

function OursIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  );
}

function ImagineIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export function KindTag({ kind }: { kind: ClaimKind }) {
  const fam = kindFamily(kind);
  return (
    <span className={`kind-tag kind-${fam}`}>
      {fam === "lamp" ? <LampIcon /> : fam === "film" ? <FilmIcon /> : fam === "imagine" ? <ImagineIcon /> : <OursIcon />}
      {KIND_LABEL[kind]}
    </span>
  );
}

export function SourceLine({ sources }: { sources?: Source[] }) {
  if (!sources?.length) return null;
  return (
    <p className="source-line">
      <span className="source-label">Source</span>{" "}
      {sources.map((s, i) => (
        <span key={s.label}>
          {i > 0 && " · "}
          {s.url ? (
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ) : (
            s.label
          )}
          {s.note && <span className="source-note"> ({s.note})</span>}
        </span>
      ))}
    </p>
  );
}

export function DevNote({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="dev-note" role="note">
      <strong>Development note.</strong> {text}
    </p>
  );
}
