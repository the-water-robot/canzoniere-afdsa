"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Song } from "@/lib/chordpro";
import { SongView } from "./SongView";

// Same FNV-1a hash as in chordpro.ts (server-side twin)
function hashPassword(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (Math.imul(h, 0x01000193) >>> 0);
  }
  return h.toString(16).padStart(8, "0");
}

export function PasswordGate({ song }: { song: Song }) {
  const storageKey = `unlocked_${song.slug}`;
  const router = useRouter();

  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === song.passwordHash) {
      setUnlocked(true);
    }
  }, [storageKey, song.passwordHash]);

  if (unlocked) return <SongView song={song} />;

  const attempt = () => {
    if (hashPassword(input) === song.passwordHash) {
      sessionStorage.setItem(storageKey, song.passwordHash!);
      setUnlocked(true);
    } else {
      setShaking(true);
      setInput("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="scene-bg flex min-h-screen items-center justify-center px-6 text-[var(--text)]">
      <div className={`glass w-full max-w-xs rounded-3xl p-8 shadow-2xl ${shaking ? "animate-shake" : ""}`}>
        <div className="mb-6 text-center">
          <div className="mb-2 text-5xl">{song.emoji}</div>
          <h1 className="font-display text-xl font-bold">{song.title}</h1>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Canzone riservata — inserisci la password
          </p>
        </div>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="••••••••"
          autoFocus
          className="mb-4 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-center font-mono text-lg tracking-widest text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-flamingo/50 focus:ring-2 focus:ring-flamingo/20"
        />

        <button
          type="button"
          onClick={attempt}
          className="w-full rounded-full bg-flamingo px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-95"
        >
          Entra
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-3 w-full rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          ← Indietro
        </button>
      </div>
    </div>
  );
}
