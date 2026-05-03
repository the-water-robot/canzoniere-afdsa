"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Song, Section } from "@/lib/chordpro";
import { uniqueChords } from "@/lib/chordpro";
import { type Instrument, getChord } from "@/lib/chord-shapes";
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
  const scale = 1 + fontStep * 0.1;

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-ink/5 active:bg-ink/10"
            aria-label="Torna alla home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-lg font-semibold">
              {song.emoji} {song.title}
            </div>
            {song.key && (
              <div className="text-xs uppercase tracking-widest text-ink/50">
                Tonalità: {song.key}
              </div>
            )}
          </div>

          <div className="inline-flex rounded-full border border-ink/15 bg-white p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setInstrument("guitar")}
              aria-pressed={instrument === "guitar"}
              className={
                "rounded-full px-3 py-1.5 transition " +
                (instrument === "guitar" ? "bg-ink text-cream" : "text-ink/60 hover:text-ink")
              }
            >
              Chitarra
            </button>
            <button
              type="button"
              onClick={() => setInstrument("ukulele")}
              aria-pressed={instrument === "ukulele"}
              className={
                "rounded-full px-3 py-1.5 transition " +
                (instrument === "ukulele" ? "bg-ink text-cream" : "text-ink/60 hover:text-ink")
              }
            >
              Ukulele
            </button>
          </div>
        </div>

        {/* Chord strip + font controls */}
        <div className="mx-auto flex max-w-3xl items-center gap-2 overflow-x-auto px-4 pb-2.5 scrollbar-none">
          {chords.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setOpenChord(c)}
              className="shrink-0 rounded-full border border-ink/15 bg-white px-3 py-1 font-mono text-sm font-bold text-ink shadow-sm hover:border-coral hover:text-coral"
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setFontStep((s) => Math.max(s - 1, -2))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-white text-[11px] font-bold text-ink/60 hover:text-ink"
              aria-label="Riduci testo"
            >A−</button>
            <button
              type="button"
              onClick={() => setFontStep((s) => Math.min(s + 1, 4))}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-white text-[11px] font-bold text-ink/60 hover:text-ink"
              aria-label="Aumenta testo"
            >A+</button>
          </div>
        </div>
      </header>

      <main
        className="mx-auto max-w-3xl space-y-4 px-4 pb-32 pt-5"
        style={{ fontSize: `${scale}rem` }}
      >
        {song.sections.map((section, idx) => (
          <SectionBlock
            key={idx}
            section={section}
            onChordTap={setOpenChord}
          />
        ))}

        {song.notes && (
          <p className="mt-6 rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm italic text-ink/60">
            {song.notes}
          </p>
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

function SectionBlock({
  section,
  onChordTap,
}: {
  section: Section;
  onChordTap: (c: string) => void;
}) {
  const style = SECTION_STYLES[section.kind] ?? "border-ink/20 bg-ink/5";
  return (
    <section className={`rounded-2xl border-l-4 px-4 py-4 sm:px-5 ${style}`}>
      {section.title && (
        <h2 className="mb-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/50">
          {section.title}
        </h2>
      )}
      <div className="space-y-2.5">
        {section.lines.map((line, li) => {
          const hasChords = line.segments.some((s) => s.chord);
          if (!hasChords) {
            return (
              <div key={li} className="leading-snug text-ink">
                {line.segments.map((s, si) => s.text).join("")}
              </div>
            );
          }
          return (
            <div key={li} className="flex flex-wrap leading-none">
              {line.segments.map((seg, si) => (
                <ChordSegment key={si} chord={seg.chord} text={seg.text} onChordTap={onChordTap} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ChordSegment({
  chord,
  text,
  onChordTap,
}: {
  chord?: string;
  text: string;
  onChordTap: (c: string) => void;
}) {
  return (
    <span className="inline-flex flex-col items-start leading-none" style={{ marginRight: text ? undefined : "0.5ch" }}>
      {chord ? (
        <button
          type="button"
          onClick={() => onChordTap(chord)}
          className="mb-0.5 font-mono text-[0.75em] font-bold text-coral hover:underline"
        >
          {chord}
        </button>
      ) : (
        <span className="mb-0.5 block h-[0.75em]" aria-hidden />
      )}
      <span className="text-ink">{text || " "}</span>
    </span>
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
            <div className="font-display text-2xl font-bold">{name}</div>
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
              Diagramma non disponibile per{" "}
              <span className="font-mono font-semibold">{name}</span>.
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onSwitchInstrument}
          className="mt-3 w-full rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-ink/30"
        >
          Mostra su {instrument === "guitar" ? "ukulele" : "chitarra"}
        </button>
      </div>
    </div>
  );
}
