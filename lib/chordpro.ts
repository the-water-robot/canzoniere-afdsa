export type Segment = {
  chord?: string;
  text: string;
};

export type ChordLine = {
  segments: Segment[];
};

export type SectionKind =
  | "intro"
  | "verse"
  | "chorus"
  | "bridge"
  | "outro"
  | "tab"
  | "grid";

export type Section = {
  kind: SectionKind;
  title: string;
  lines: ChordLine[];
};

export type Song = {
  slug: string;
  albumSlug: string;
  title: string;
  emoji: string;
  number: string;
  key?: string;
  notes?: string;
  spotifyId?: string;
  passwordHash?: string;
  sections: Section[];
};

type Directive = { key: string; value: string };

function parseDirective(line: string): Directive | null {
  const m = line.match(/^\{([^:}]+)(?::([^}]*))?\}$/);
  if (!m) return null;
  return { key: m[1].trim().toLowerCase(), value: (m[2] ?? "").trim() };
}

function parseLine(raw: string): ChordLine {
  const segments: Segment[] = [];
  let remaining = raw;
  while (remaining.length > 0) {
    const bracketIdx = remaining.indexOf("[");
    if (bracketIdx === -1) {
      segments.push({ text: remaining });
      break;
    }
    if (bracketIdx > 0) {
      segments.push({ text: remaining.slice(0, bracketIdx) });
    }
    const closeIdx = remaining.indexOf("]", bracketIdx);
    if (closeIdx === -1) {
      segments.push({ text: remaining.slice(bracketIdx) });
      break;
    }
    const chord = remaining.slice(bracketIdx + 1, closeIdx);
    remaining = remaining.slice(closeIdx + 1);
    const nextBracket = remaining.indexOf("[");
    segments.push({
      chord,
      text: nextBracket === -1 ? remaining : remaining.slice(0, nextBracket),
    });
    remaining = nextBracket === -1 ? "" : remaining.slice(nextBracket);
  }
  return { segments };
}

const SECTION_OPEN: Record<string, SectionKind> = {
  start_of_verse: "verse",
  sov: "verse",
  start_of_chorus: "chorus",
  soc: "chorus",
  start_of_intro: "intro",
  soi: "intro",
  start_of_bridge: "bridge",
  sob: "bridge",
  start_of_outro: "outro",
  start_of_tab: "tab",
  start_of_grid: "grid",
};

const SECTION_CLOSE = new Set([
  "end_of_verse",
  "eov",
  "end_of_chorus",
  "eoc",
  "end_of_intro",
  "eoi",
  "end_of_bridge",
  "eob",
  "end_of_outro",
  "end_of_tab",
  "end_of_grid",
]);

export function parseChordPro(source: string, filename: string): Omit<Song, "slug" | "albumSlug"> {
  const lines = source.split("\n");

  let title = filename.replace(/^\d+-/, "").replace(/\.cho$|\.chordpro$/, "");
  let emoji = "🎵";
  let number = "";
  let key: string | undefined;
  let notes: string | undefined;
  let spotifyId: string | undefined;
  let passwordHash: string | undefined;

  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "" || line.startsWith("#")) {
      continue;
    }

    const directive = parseDirective(line);
    if (directive) {
      const { key: k, value: v } = directive;

      if (k === "title" || k === "t") { title = v; continue; }
      if (k === "key") { key = v; continue; }
      if (k === "emoji") { emoji = v; continue; }
      if (k === "number") { number = v; continue; }
      if (k === "notes") { notes = v; continue; }
      if (k === "spotify") { spotifyId = v; continue; }
      if (k === "password") { passwordHash = simpleHash(v); continue; }

      if (SECTION_CLOSE.has(k)) {
        currentSection = null;
        continue;
      }

      const sectionKind = SECTION_OPEN[k];
      if (sectionKind) {
        currentSection = { kind: sectionKind, title: v || sectionKind, lines: [] };
        sections.push(currentSection);
        continue;
      }

      if (k === "comment" || k === "c" || k === "comment_italic" || k === "ci") {
        if (!currentSection) {
          currentSection = { kind: "verse", title: v, lines: [] };
          sections.push(currentSection);
        }
        continue;
      }

      continue;
    }

    if (!currentSection) {
      currentSection = { kind: "verse", title: "", lines: [] };
      sections.push(currentSection);
    }
    currentSection.lines.push(parseLine(line));
  }

  return { title, emoji, number, key, notes, spotifyId, passwordHash, sections };
}

// Deterministic hash used server-side only — maps plaintext password to hex string.
// Client receives only the hash, never the plaintext.
function simpleHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (Math.imul(h, 0x01000193) >>> 0);
  }
  return h.toString(16).padStart(8, "0");
}

export function uniqueChords(song: Song): string[] {
  const set = new Set<string>();
  for (const section of song.sections) {
    for (const line of section.lines) {
      for (const seg of line.segments) {
        if (seg.chord) set.add(seg.chord);
      }
    }
  }
  return Array.from(set);
}
