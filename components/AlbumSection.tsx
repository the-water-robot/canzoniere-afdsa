"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Album } from "@/lib/loader";

const SONG_COLORS = [
  "bg-sky/15 text-sky",
  "bg-flamingo/15 text-flamingo",
  "bg-solar/20 text-yellow-600 dark:text-solar",
  "bg-tangerine/15 text-tangerine",
  "bg-violet/15 text-violet",
  "bg-lime/15 text-lime",
];

const ACCENT_BORDER = [
  "border-sky/40",
  "border-flamingo/40",
  "border-solar/40",
];

const ACCENT_GLOW = [
  "shadow-sky/20",
  "shadow-flamingo/20",
  "shadow-solar/20",
];

type Props = { album: Album; accentIdx: number; defaultOpen?: boolean };

export function AlbumSection({ album, accentIdx, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const ai = accentIdx % 3;

  return (
    <section>
      {/* Album header — always visible, clickable */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          "glass w-full overflow-hidden rounded-2xl transition-shadow hover:shadow-lg " +
          ACCENT_BORDER[ai] + " " + (open ? `shadow-lg ${ACCENT_GLOW[ai]}` : "")
        }
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 p-4">
          {/* Cover art */}
          {album.cover ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={album.cover}
                alt={`Cover ${album.title}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[var(--border)] text-3xl">
              {album.emoji}
            </div>
          )}

          <div className="min-w-0 flex-1 text-left">
            <div className="font-display text-xl font-bold text-[var(--text)]">
              {album.title}
            </div>
            {album.description && (
              <div className="mt-0.5 text-xs text-[var(--muted)]">
                {album.description}
              </div>
            )}
            <div className="mt-1 text-xs text-[var(--muted)]">
              {album.songs.length > 0
                ? `${album.songs.length} canzoni`
                : "Prossimamente…"}
            </div>
          </div>

          {/* Chevron */}
          <svg
            className={
              "mr-1 h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-300 " +
              (open ? "rotate-180" : "")
            }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Song list — collapsible */}
      <div className={`collapse-content ${open ? "" : "closed"}`}>
        <div className="collapse-inner">
          {album.songs.length === 0 ? (
            <p className="px-4 py-5 text-sm italic text-[var(--muted)]">
              Nessuna canzone ancora…
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5 pb-1">
              {album.songs.map((song, si) => (
                <li key={song.slug}>
                  <Link
                    href={`/${song.slug}`}
                    className="glass group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:scale-[1.01] hover:shadow-md active:scale-[0.99]"
                  >
                    <span
                      className={
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg " +
                        SONG_COLORS[si % SONG_COLORS.length]
                      }
                    >
                      {song.emoji}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="font-display text-base font-semibold lowercase leading-tight text-[var(--text)]">
                        {song.title}
                      </div>
                      {song.key && (
                        <div className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
                          {song.key}
                        </div>
                      )}
                    </div>

                    <span className="font-mono text-xs font-bold tracking-widest text-[var(--muted)] opacity-50">
                      {song.number}
                    </span>

                    <svg
                      className="h-4 w-4 shrink-0 text-[var(--muted)] opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
