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
    const key = original.toLowerCase();
    const replacement = preserveCase(original, REPLACEMENTS[key] ?? original);
    segments.push({ type: "patched", original, replacement });
    last = m.index + original.length;
  }

  if (last < text.length) segments.push({ type: "plain", text: text.slice(last) });
  return segments.length ? segments : [{ type: "plain", text }];
}

// Plain-string version (used where React nodes aren't possible)
export function filterLyrics(text: string): string {
  return splitFiltered(text)
    .map((s) => (s.type === "plain" ? s.text : s.replacement))
    .join("");
}
