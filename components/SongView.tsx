"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Song, Section } from "@/lib/chordpro";
import { uniqueChords } from "@/lib/chordpro";
import { type Instrument, getChord } from "@/lib/chord-shapes";
import { ChordDiagram } from "./ChordDiagram";

const SECTION_LABEL: Record<string, string> = {
  intro:   "text-ocean/70",
  verse:   "text-teal/70",
  chorus:  "text-coral/80",
  bridge:  "text-mango/80",
  outro:   "text-ink/40",
};

const SECTION_BG: Record<string, string> = {
  intro:   "bg-ocean/5",
  verse:   "",
  chorus:  "bg-coral/5",
  bridge:  "bg-mango/8",
  outro:   "bg-ink/3",
};

export function SongView({ song }: { song: Song }) {
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const [openChord, setOpenChord]   = useState<string | null>(null);
  const [fontStep, setFontStep]     = useState(0);

  const chords = useMemo(() => uniqueChords(song), [song]);
  const scale  = 1 + fontStep * 0.1;

  return (
    <div className="min-h-screen text-ink" style={{ background: "var(--sand)" }}>

      {/* Floating orbs — static, subtle */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral/12 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-56 w-56 rounded-full bg-ocean/12 blur-3xl" />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-ink/8 bg-sand/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">

          <Link
            href="/"
            className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/6 active:bg-ink/10"
            aria-label="Torna alla home"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-lg font-bold leading-tight">
              {song.emoji}&nbsp;{song.title}
            </div>
            {song.key && (
              <div className="font-mono text-[0.6rem] uppercase tracking-widest text-ink/40">
                chiave: {song.key}
              </div>
            )}
          </div>

          {/* Instrument toggle */}
          <div className="inline-flex rounded-full bg-ink/8 p-0.5 text-xs font-semibold">
            {(["guitar", "ukulele"] as Instrument[]).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setInstrument(inst)}
                aria-pressed={instrument === inst}
                className={
                  "rounded-full px-3 py-1.5 transition " +
                  (instrument === inst
                    ? "bg-white text-ink shadow-sm"
                    : "text-ink/50 hover:text-ink")
                }
              >
                {inst === "guitar" ? "Chitarra" : "Ukulele"}
              </button>
            ))}
          </div>
        </div>

        {/* Chord strip */}
        <div className="mx-auto flex max-w-2xl items-center gap-1.5 overflow-x-auto px-4 pb-2.5 scrollbar-none">
          {chords.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setOpenChord(c)}
              className="shrink-0 rounded-full bg-white/80 px-2.5 py-0.5 font-mono text-sm font-bold text-coral shadow-sm ring-1 ring-coral/20 transition hover:ring-coral/50"
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex shrink-0 items-center gap-1 pl-2">
            {[["−", -1], ["+", 1]].map(([label, dir]) => (
              <button
                key={String(label)}
                type="button"
                onClick={() => setFontStep((s) => Math.max(-2, Math.min(4, s + Number(dir))))}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[10px] font-bold text-ink/50 ring-1 ring-ink/10 hover:text-ink"
                aria-label={dir === 1 ? "Aumenta testo" : "Riduci testo"}
              >
                A{label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Song body */}
      <main
        className="relative mx-auto max-w-2xl px-4 pb-32 pt-6"
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
          <p className="mt-8 text-sm italic text-ink/40">{song.notes}</p>
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
  const labelColor = SECTION_LABEL[section.kind] ?? "text-ink/40";
  const bg         = SECTION_BG[section.kind]   ?? "";

  return (
    <section className={`mb-8 rounded-xl px-3 py-3 ${bg}`}>
      {section.title && (
        <div className={`mb-2 font-display text-[0.6rem] font-bold uppercase tracking-[0.22em] ${labelColor}`}>
          {section.title}
        </div>
      )}

      <div className="space-y-2">
        {section.lines.map((line, li) => {
          const hasChords = line.segments.some((s) => s.chord);
          if (!hasChords) {
            return (
              <p key={li} className="leading-relaxed text-ink">
                {line.segments.map((s) => s.text).join("")}
              </p>
            );
          }
          return (
            <div key={li} className="flex flex-wrap items-end leading-none">
              {line.segments.map((seg, si) => (
                <InlineSegment
                  key={si}
                  chord={seg.chord}
                  text={seg.text}
                  onChordTap={onChordTap}
                />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InlineSegment({
  chord,
  text,
  onChordTap,
}: {
  chord?: string;
  text: string;
  onChordTap: (c: string) => void;
}) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      {chord ? (
        <button
          type="button"
          onClick={() => onChordTap(chord)}
          className="mb-0.5 font-mono text-[0.7em] font-bold text-coral transition hover:opacity-70"
        >
          {chord}
        </button>
      ) : (
        <span className="mb-0.5 block" style={{ height: "0.7em" }} aria-hidden />
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`Accordo ${name}`}
    >
      <div
        className="w-full max-w-xs rounded-t-3xl bg-white/95 p-6 shadow-2xl backdrop-blur sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="font-display text-3xl font-bold text-ink">{name}</div>
            <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink/40">
              {instrument === "guitar" ? "Chitarra" : "Ukulele"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/40 hover:bg-ink/6"
            aria-label="Chiudi"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center py-2">
          {shape ? (
            <ChordDiagram shape={shape} instrument={instrument} size={160} />
          ) : (
            <p className="py-8 text-center text-sm text-ink/40">
              Diagramma non disponibile per{" "}
              <span className="font-mono font-semibold">{name}</span>.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onSwitchInstrument}
          className="mt-4 w-full rounded-full bg-ink/5 px-4 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/10"
        >
          Mostra su {instrument === "guitar" ? "ukulele" : "chitarra"}
        </button>
      </div>
    </div>
  );
}
