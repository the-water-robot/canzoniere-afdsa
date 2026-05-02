import { NextResponse } from "next/server";
import {
  type Instrument,
  SHAPES,
  STRINGS,
  TUNING_LABELS,
  getChord,
} from "@/lib/chord-shapes";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ instrument: string; name: string }> },
) {
  const { instrument, name } = await ctx.params;

  if (instrument !== "guitar" && instrument !== "ukulele") {
    return NextResponse.json(
      { error: "instrument must be 'guitar' or 'ukulele'" },
      { status: 400 },
    );
  }

  const inst = instrument as Instrument;
  const decoded = decodeURIComponent(name);
  const shape = getChord(inst, decoded);

  if (!shape) {
    return NextResponse.json(
      {
        error: `chord '${decoded}' not found for ${inst}`,
        available: Object.keys(SHAPES[inst]),
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    instrument: inst,
    name: shape.name,
    strings: STRINGS[inst],
    tuning: TUNING_LABELS[inst],
    frets: shape.frets,
    fingers: shape.fingers ?? null,
    barre: shape.barre ?? null,
    baseFret: shape.baseFret ?? 1,
  });
}
