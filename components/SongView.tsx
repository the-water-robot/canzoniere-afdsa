"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Song, Section } from "@/lib/chordpro";
import { uniqueChords } from "@/lib/chordpro";
import { type Instrument, getChord } from "@/lib/chord-shapes";
import { ChordDiagram } from "./ChordDiagram";
import { ThemeToggle } from "./ThemeToggle";

// Per-kind accent colours (CSS variable names / tailwind classes)
const KIND_LABEL: Record<string, string> = {
  intro:   "text-sky",
  verse:   "text-[var(--muted)]",
  chorus:  "text-flamingo",
  bridge:  "text-solar",
  outro:   "text-violet",
};
const KIND_BG: Record<string, string> = {
  intro:   "bg-sky/6",
  chorus:  "bg-flamingo/6",
  bridge:  "bg-solar/6",
  outro:   "bg-violet/6",
};
const KIND_CHORD: Record<string, string> = {
  intro:   "text-sky",
  chorus:  "text-flamingo",
  bridge:  "text-solar",
  outro:   "text-violet",
};

export function SongView({ song }: { song: Song }) {
  const [instrument, setInstrument] = useState<Instrument>("guitar");
  const [openChord, setOpenChord]   = useState<string | null>(null);
  const [fontStep,  setFontStep]    = useState(0);

  const chords = useMemo(() => uniqueChords(song), [song]);
  const scale  = 1 + fontStep * 0.1;

  return (
    <div className="scene-bg relative min-h-screen text-[var(--text)]">

      {/* Fixed orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="animate-orb-b absolute -right-20 -top-20 h-64 w-64 rounded-full bg-flamingo/18 blur-3xl" />
        <div className="animate-orb-a absolute bottom-10 -left-16 h-56 w-56 rounded-full bg-sky/18 blur-3xl" />
      </div>

      {/* ── Sticky header ───────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-2 px-3 py-2.5">

          <Link
            href="/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--border)] hover:text-[var(--text)]"
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
              <div className="font-mono text-[0.58rem] uppercase tracking-widest text-[var(--muted)]">
                chiave {song.key}
              </div>
            )}
          </div>

          {/* Instrument toggle */}
          <div className="inline-flex rounded-full bg-[var(--border)] p-0.5 text-xs font-semibold">
            {(["guitar", "ukulele"] as Instrument[]).map((inst) => (
              <button
                key={inst}
                type="button"
                onClick={() => setInstrument(inst)}
                aria-pressed={instrument === inst}
                className={
                  "rounded-full px-2.5 py-1.5 transition " +
                  (instrument === inst
                    ? "bg-[var(--bg)] text-[var(--text)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--text)]")
                }
              >
                {inst === "guitar" ? "Chitarra" : "Ukulele"}
              </button>
            ))}
          </div>

          <ThemeToggle />
        </div>

        {/* Chord strip */}
        <div className="mx-auto flex max-w-2xl items-center gap-1.5 overflow-x-auto px-3 pb-2.5 scrollbar-none">
          {chords.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setOpenChord(c)}
              className="shrink-0 rounded-full bg-flamingo/10 px-2.5 py-0.5 font-mono text-sm font-bold text-flamingo ring-1 ring-flamingo/25 transition hover:bg-flamingo/20"
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex shrink-0 items-center gap-1 pl-2">
            {([["−", -1], ["+", 1]] as [string, number][]).map(([lbl, d]) => (
              <button
                key={lbl}
                type="button"
                onClick={() => setFontStep((s) => Math.max(-2, Math.min(4, s + d)))}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--border)] text-[10px] font-bold text-[var(--muted)] hover:text-[var(--text)]"
                aria-label={d > 0 ? "Testo più grande" : "Testo più piccolo"}
              >
                A{lbl}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Song body ────────────────────────────────────── */}
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
          <p className="mt-8 text-sm italic text-[var(--muted)]">{song.notes}</p>
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

function SectionBlock({ section, onChordTap }: { section: Section; onChordTap: (c: string) => void }) {
  const label     = KIND_LABEL[section.kind] ?? "text-[var(--muted)]";
  const bg        = KIND_BG[section.kind]    ?? "";
  const chordColor = KIND_CHORD[section.kind] ?? "text-flamingo";

  return (
    <section className={`mb-7 rounded-xl px-3 py-3 ${bg}`}>
      {section.title && (
        <div className={`mb-2 font-display text-[0.58rem] font-bold uppercase tracking-[0.25em] ${label}`}>
          {section.title}
        </div>
      )}
      <div className="space-y-2">
        {section.lines.map((line, li) => {
          const hasChords = line.segments.some((s) => s.chord);
          if (!hasChords) {
            return (
              <p key={li} className="leading-relaxed text-[var(--text)]">
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
                  chordColor={chordColor}
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
  chord, text, chordColor, onChordTap,
}: {
  chord?: string; text: string; chordColor: string; onChordTap: (c: string) => void;
}) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      {chord ? (
        <button
          type="button"
          onClick={() => onChordTap(chord)}
          className={`mb-0.5 font-mono text-[0.7em] font-bold transition hover:opacity-70 ${chordColor}`}
        >
          {chord}
        </button>
      ) : (
        <span className="mb-0.5 block" style={{ height: "0.7em" }} aria-hidden />
      )}
      <span className="text-[var(--text)]">{text || " "}</span>
    </span>
  );
}

function ChordSheet({
  name, instrument, onClose, onSwitchInstrument,
}: {
  name: string; instrument: Instrument; onClose: () => void; onSwitchInstrument: () => void;
}) {
  const shape = getChord(instrument, name);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`Accordo ${name}`}
    >
      <div
        className="glass w-full max-w-xs rounded-t-3xl p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="font-display text-3xl font-bold text-[var(--text)]">{name}</div>
            <div className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-widest text-[var(--muted)]">
              {instrument === "guitar" ? "🎸 Chitarra" : "🎵 Ukulele"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--border)]"
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
            <p className="py-8 text-center text-sm text-[var(--muted)]">
              Diagramma non disponibile per{" "}
              <span className="font-mono font-semibold">{name}</span>.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onSwitchInstrument}
          className="mt-4 w-full rounded-full bg-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:opacity-80"
        >
          Mostra su {instrument === "guitar" ? "🎵 Ukulele" : "🎸 Chitarra"}
        </button>
      </div>
    </div>
  );
}
