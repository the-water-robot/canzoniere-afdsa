// Parental control word replacements.
// Add entries here: { "bad word": "replacement" }
export const REPLACEMENTS: Record<string, string> = {
  puttane: "perbene",
  zoofilia: "allegria",
};

function preserveCase(source: string, target: string): string {
  if (source[0] && source[0] !== source[0].toLowerCase()) {
    return target[0].toUpperCase() + target.slice(1);
  }
  return target;
}

export function filterLyrics(text: string): string {
  let out = text;
  for (const [bad, good] of Object.entries(REPLACEMENTS)) {
    out = out.replace(new RegExp(bad, "gi"), (m) => preserveCase(m, good));
  }
  return out;
}
