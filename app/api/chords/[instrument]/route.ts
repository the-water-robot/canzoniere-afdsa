import { NextResponse } from "next/server";
import {
  type Instrument,
  SHAPES,
  STRINGS,
  TUNING_LABELS,
} from "@/lib/chord-shapes";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ instrument: string }> },
) {
  const { instrument } = await ctx.params;

  if (instrument !== "guitar" && instrument !== "ukulele") {
    return NextResponse.json(
      { error: "instrument must be 'guitar' or 'ukulele'" },
      { status: 400 },
    );
  }

  const inst = instrument as Instrument;
  const dict = SHAPES[inst];

  return NextResponse.json({
    instrument: inst,
    strings: STRINGS[inst],
    tuning: TUNING_LABELS[inst],
    chords: Object.keys(dict).map((name) => ({
      name,
      frets: dict[name].frets,
      fingers: dict[name].fingers ?? null,
      barre: dict[name].barre ?? null,
      baseFret: dict[name].baseFret ?? 1,
    })),
  });
}
