import type { ChordShape, Instrument } from "./chord-shapes";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const guitarDb = require("@tombatossals/chords-db/lib/guitar.json") as ChordDb;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ukuleleDb = require("@tombatossals/chords-db/lib/ukulele.json") as ChordDb;

type LibPosition = {
  frets: number[];
  fingers: number[];
  baseFret: number;
  barres: number[];
};

type ChordDb = {
  chords: Record<string, { suffix: string; positions: LibPosition[] }[]>;
};

const ROOT_MAP: Record<string, string> = {
  C: "C",   "C#": "Csharp", Db: "Csharp",
  D: "D",   "D#": "Eb",     Eb: "Eb",
  E: "E",   Fb: "E",
  F: "F",   "F#": "Fsharp", Gb: "Fsharp",
  G: "G",   "G#": "Ab",     Ab: "Ab",
  A: "A",   "A#": "Bb",     Bb: "Bb",
  B: "B",   Cb: "B",
};

function parseChordName(name: string): { key: string; suffix: string } | null {
  const m = name.match(/^([A-G][#b]?)(.*)$/);
  if (!m) return null;
  const key = ROOT_MAP[m[1]];
  if (!key) return null;
  const rest = m[2];
  const suffix = rest === "" ? "major" : rest === "m" ? "minor" : rest;
  return { key, suffix };
}

function toShape(name: string, pos: LibPosition): ChordShape {
  const { frets: rel, fingers, baseFret, barres } = pos;
  const frets = rel.map((f) => (f <= 0 ? f : f + baseFret - 1));

  let barre: ChordShape["barre"];
  if (barres.length > 0) {
    const absBf = barres[0] + baseFret - 1;
    const indices = frets.reduce<number[]>(
      (acc, f, i) => (f === absBf ? [...acc, i] : acc),
      []
    );
    if (indices.length >= 2)
      barre = { fret: absBf, from: indices[0], to: indices[indices.length - 1] };
  }

  return { name, frets, fingers, baseFret, barre };
}

export function getVoicings(instrument: Instrument, chordName: string): ChordShape[] {
  const parsed = parseChordName(chordName);
  if (!parsed) return [];

  const db = instrument === "guitar" ? guitarDb : ukuleleDb;
  const groups = db.chords[parsed.key];
  if (!groups) return [];

  const entry = groups.find((g) => g.suffix === parsed.suffix);
  if (!entry) return [];

  return entry.positions.map((p) => toShape(chordName, p));
}
