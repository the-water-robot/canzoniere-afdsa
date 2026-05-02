"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Song } from "@/lib/songs";
import { uniqueChords } from "@/lib/songs";
import {
  type Instrument,
  getChord,
} from "@/lib/chord-shapes";
import { ChordDiagram } from "./ChordDiagram";

const SECTION_STYLES: Record<string, string> = {
  intro: "border-ocean/40 bg-ocean/5",
  verse: "border-turquoise/40 bg-turquoise/5",
  chorus: "border-coral/50 bg-coral/10",
  bridge: "border-mango/60 bg-mango/15",
  outro: "border-ink/30 bg-ink/5",
};

export function SongView({ song }: { song: Song }) {
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const [openChord, setOpenChord] = useState<string | null>(null);
  const [fontStep, setFontStep] = useState(0);

  const chords = useMemo(() => uniqueChords(song), [song]);

  const fontSize = 1 + fontStep * 0.1;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5 active:bg-ink/10"
            aria-label="Torna alla home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-lg font-semibold leading-tight">
              {song.emoji} {song.title}
            </div>
            <div className="text-xs uppercase tracking-widest text-ink/50">
              {song.progressions[0]?.chords.join(" · ")}
            </div>
          </div>

          <div className="inline-flex rounded-full border border-ink/15 bg-white p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInstrument("guitar")}
              className={
                "rounded-full px-3 py-1.5 transition " +
                (instrument === "guitar"
                  ? "bg-ink text-cream"
                  : "text-ink/70 hover:text-ink")
              }
              aria-pressed={instrument === "guitar"}
            >
              Chitarra
            </button>
            <button
              type="button"
              onClick={() => setInstrument("ukulele")}
              className={
                "rounded-full px-3 py-1.5 transition " +
                (instrument === "ukulele"
                  ? "bg-ink text-cream"
                  : "text-ink/70 hover:text-ink")
              }
              aria-pressed={instrument === "ukulele"}
            >
              Ukulele
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl items-center gap-2 overflow-x-auto px-4 pb-3">
          {chords.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setOpenChord(c)}
              className="shrink-0 rounded-full border border-ink/15 bg-white px-3 py-1 font-mono text-sm font-semibold text-ink shadow-sm hover:border-coral hover:text-coral"
            >
              {c}
            </button>
          ))}

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setFontStep((s) => Math.max(s - 1, -2))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-white text-sm font-semibold text-ink/70 hover:text-ink"
              aria-label="Riduci dimensione testo"
            >
              A−
            </button>
            <button
              type="button"
              onClick={() => setFontStep((s) => Math.min(s + 1, 4))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-white text-sm font-semibold text-ink/70 hover:text-ink"
              aria-label="Aumenta dimensione testo"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      <main
        className="mx-auto max-w-3xl px-4 pb-32 pt-6"
        style={{ fontSize: `${fontSize}rem` }}
      >
        {song.sections.map((section, idx) => (
          <section
            key={idx}
            className={
              "mb-5 rounded-2xl border-l-4 px-4 py-4 sm:px-5 " +
              (SECTION_STYLES[section.kind] ?? "border-ink/20 bg-ink/5")
            }
          >
            <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
              {section.title}
            </h2>

            <div className="space-y-3 leading-relaxed">
              {section.lines.map((line, li) => (
                <div key={li}>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                    {line.chords.map((c, ci) => (
                      <button
                        key={ci}
                        type="button"
                        onClick={() => setOpenChord(c)}
                        className="font-mono text-sm font-bold text-coral underline-offset-4 hover:underline"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="text-ink">{line.text}</div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {song.notes && (
          <div className="mt-8 rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm italic text-ink/70">
            {song.notes}
          </div>
        )}
      </main>

      {openChord && (
        <ChordSheet
          name={openChord}
          instrument={instrument}
          onClose={() => setOpenChord(null)}
          onSwitchInstrument={() =>
            setInstrument((i) => (i === "guitar" ? "ukulele" : "guitar"))
          }
        />
      )}
    </div>
  );
}

function ChordSheet({
  name,
  instrument,
  onClose,
  onSwitchInstrument,
}: {
  name: string;
  instrument: Instrument;
  onClose: () => void;
  onSwitchInstrument: () => void;
}) {
  const shape = getChord(instrument, name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Accordo ${name}`}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="font-display text-2xl font-bold text-ink">
              {name}
            </div>
            <div className="text-xs uppercase tracking-widest text-ink/50">
              {instrument === "guitar" ? "Chitarra" : "Ukulele"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5"
            aria-label="Chiudi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center py-3">
          {shape ? (
            <ChordDiagram shape={shape} instrument={instrument} size={170} />
          ) : (
            <div className="px-4 py-8 text-center text-sm text-ink/60">
              Diagramma non disponibile per <span className="font-mono font-semibold">{name}</span> ({instrument === "guitar" ? "chitarra" : "ukulele"}).
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSwitchInstrument}
          className="mt-3 w-full rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/80 hover:border-ink/30"
        >
          Mostra su {instrument === "guitar" ? "ukulele" : "chitarra"}
        </button>
      </div>
    </div>
  );
}
