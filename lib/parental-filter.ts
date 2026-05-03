// Parental control word replacements.
// Add entries here: { "bad word": "replacement" }
export const REPLACEMENTS: Record<string, string> = {
  puttane: "perbene",
  zoofilia: "allegria",
};

export function preserveCase(source: string, target: string): string {
  if (source[0] && source[0] !== source[0].toLowerCase()) {
    return target[0].toUpperCase() + target.slice(1);
  }
  return target;
}

// ── In-segment splitting (for plain paragraph text) ──────────────
export type FilterSegment =
  | { type: "plain"; text: string }
  | { type: "patched"; original: string; replacement: string };

export function splitFiltered(text: string): FilterSegment[] {
  const entries = Object.entries(REPLACEMENTS);
  if (!entries.length) return [{ type: "plain", text }];

  const pattern = entries.map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  const segments: FilterSegment[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) segments.push({ type: "plain", text: text.slice(last, m.index) });
    const original = m[0];
    const replacement = preserveCase(original, REPLACEMENTS[original.toLowerCase()]);
    segments.push({ type: "patched", original, replacement });
    last = m.index + original.length;
  }

  if (last < text.length) segments.push({ type: "plain", text: text.slice(last) });
  return segments.length ? segments : [{ type: "plain", text }];
}

// Plain-string version (for non-React contexts)
export function filterLyrics(text: string): string {
  return splitFiltered(text)
    .map((s) => (s.type === "plain" ? s.text : s.replacement))
    .join("");
}

// ── Cross-segment filtering (for chord lines) ────────────────────
// A word may be split across segments: [C]put[G]tane → "put" | "tane"
// We reconstruct the full line text, find replacements, then re-slice.

import type { Segment } from "./chordpro";

export type FilteredSegment = Segment & { patched: boolean };

export function filterLineSegments(segments: Segment[]): FilteredSegment[] {
  const entries = Object.entries(REPLACEMENTS);
  if (!entries.length) return segments.map((s) => ({ ...s, patched: false }));

  // Build full text and per-character chord map (chord only on first char of each segment)
  const charChords: (string | undefined)[] = [];
  for (const seg of segments) {
    for (let i = 0; i < seg.text.length; i++) {
      charChords.push(i === 0 ? seg.chord : undefined);
    }
  }
  const fullText = segments.map((s) => s.text).join("");

  // Find all replacements
  const pattern = entries.map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  const matches: { start: number; end: number; replacement: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(fullText)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      replacement: preserveCase(m[0], REPLACEMENTS[m[0].toLowerCase()]),
    });
  }

  if (!matches.length) return segments.map((s) => ({ ...s, patched: false }));

  // Re-slice full text into new segments
  const result: FilteredSegment[] = [];
  let pos = 0;

  for (const { start, end, replacement } of matches) {
    if (pos < start) emitRange(fullText, charChords, pos, start, result);
    result.push({ chord: charChords[start], text: replacement, patched: true });
    pos = end;
  }
  if (pos < fullText.length) emitRange(fullText, charChords, pos, fullText.length, result);

  return result;
}

function emitRange(
  fullText: string,
  charChords: (string | undefined)[],
  from: number,
  to: number,
  out: FilteredSegment[],
) {
  let start = from;
  for (let i = from + 1; i <= to; i++) {
    if (i === to || charChords[i] !== undefined) {
      out.push({ chord: charChords[start], text: fullText.slice(start, i), patched: false });
      start = i;
    }
  }
}
