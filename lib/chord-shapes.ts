export type Instrument = "guitar" | "ukulele";

export type ChordShape = {
  name: string;
  // Per-string fret values, low → high.
  // Guitar order: E A D G B e (6 entries)
  // Ukulele order: G C E A      (4 entries)
  // -1 = muted, 0 = open
  frets: number[];
  // Optional finger numbers per string (1=index … 4=pinky, 0/undefined = none)
  fingers?: number[];
  // Barre at fret X covering strings [from..to] (low-high indexing)
  barre?: { fret: number; from: number; to: number };
  // Lowest fret shown when chord starts above the nut (default: 1)
  baseFret?: number;
};

const G: Record<string, ChordShape> = {
  C: { name: "C", frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  G: { name: "G", frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  D: { name: "D", frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  E: { name: "E", frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  A: { name: "A", frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  Am: { name: "Am", frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  Em: { name: "Em", frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  Dm: { name: "Dm", frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  F: {
    name: "F",
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, from: 0, to: 5 },
  },
  Bb: {
    name: "Bb",
    frets: [-1, 1, 3, 3, 3, 1],
    fingers: [0, 1, 2, 3, 4, 1],
    barre: { fret: 1, from: 1, to: 5 },
  },
  Gm: {
    name: "Gm",
    frets: [3, 5, 5, 3, 3, 3],
    fingers: [1, 3, 4, 1, 1, 1],
    baseFret: 3,
    barre: { fret: 3, from: 0, to: 5 },
  },
  A7: { name: "A7", frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0] },
  D7: { name: "D7", frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
  E7: { name: "E7", frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  G7: { name: "G7", frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
  C7: { name: "C7", frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  B7: { name: "B7", frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },
};

const U: Record<string, ChordShape> = {
  C: { name: "C", frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3] },
  G: { name: "G", frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2] },
  D: { name: "D", frets: [2, 2, 2, 0], fingers: [1, 2, 3, 0] },
  E: { name: "E", frets: [4, 4, 4, 2], fingers: [2, 3, 4, 1], baseFret: 2 },
  A: { name: "A", frets: [2, 1, 0, 0], fingers: [2, 1, 0, 0] },
  Am: { name: "Am", frets: [2, 0, 0, 0], fingers: [2, 0, 0, 0] },
  Em: { name: "Em", frets: [0, 4, 3, 2], fingers: [0, 4, 3, 2] },
  Dm: { name: "Dm", frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0] },
  F: { name: "F", frets: [2, 0, 1, 0], fingers: [2, 0, 1, 0] },
  Bb: {
    name: "Bb",
    frets: [3, 2, 1, 1],
    fingers: [3, 2, 1, 1],
    barre: { fret: 1, from: 2, to: 3 },
  },
  Gm: { name: "Gm", frets: [0, 2, 3, 1], fingers: [0, 2, 3, 1] },
  A7: { name: "A7", frets: [0, 1, 0, 0], fingers: [0, 1, 0, 0] },
  D7: { name: "D7", frets: [2, 2, 2, 3], fingers: [1, 2, 3, 4] },
  E7: { name: "E7", frets: [1, 2, 0, 2], fingers: [1, 2, 0, 3] },
  G7: { name: "G7", frets: [0, 2, 1, 2], fingers: [0, 2, 1, 3] },
  C7: { name: "C7", frets: [0, 0, 0, 1], fingers: [0, 0, 0, 1] },
  B7: { name: "B7", frets: [2, 3, 2, 2], fingers: [1, 3, 2, 4] },
};

export const SHAPES: Record<Instrument, Record<string, ChordShape>> = {
  guitar: G,
  ukulele: U,
};

export function getChord(
  instrument: Instrument,
  name: string,
): ChordShape | null {
  return SHAPES[instrument][name] ?? null;
}

export const STRINGS: Record<Instrument, number> = {
  guitar: 6,
  ukulele: 4,
};

export const TUNING_LABELS: Record<Instrument, string[]> = {
  guitar: ["E", "A", "D", "G", "B", "e"],
  ukulele: ["G", "C", "E", "A"],
};
