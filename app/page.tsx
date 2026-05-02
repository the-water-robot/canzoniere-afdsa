import Link from "next/link";
import { songs } from "@/lib/songs";

const COLORS = [
  "from-coral/20 to-coral/5 hover:border-coral",
  "from-mango/30 to-mango/5 hover:border-mango",
  "from-turquoise/25 to-turquoise/5 hover:border-turquoise",
  "from-ocean/25 to-ocean/5 hover:border-ocean",
  "from-coral/15 to-mango/10 hover:border-coral",
  "from-ocean/20 to-turquoise/10 hover:border-ocean",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
        <header className="mb-10 text-center">
          <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl">
            canzoniere
          </h1>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-coral via-mango to-turquoise" />
          <h2 className="mt-5 font-display text-sm uppercase tracking-[0.3em] text-ink/60">
            Gli Animali Fantastici del Sud America
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {songs.map((song, i) => (
            <li key={song.slug}>
              <Link
                href={`/${song.slug}`}
                className={
                  "group flex items-center gap-4 rounded-2xl border border-ink/10 bg-gradient-to-br p-5 shadow-sm transition active:scale-[0.99] " +
                  COLORS[i % COLORS.length]
                }
              >
                <span className="text-3xl">{song.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl font-semibold lowercase text-ink">
                    {song.title}
                  </div>
                  <div className="mt-0.5 text-xs uppercase tracking-widest text-ink/50">
                    {song.progressions[0]?.chords.join(" · ")}
                  </div>
                </div>
                <div className="font-mono text-xs font-bold tracking-widest text-ink/40">
                  {song.number}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-12 border-t border-ink/10 pt-6 text-center text-xs uppercase tracking-[0.25em] text-ink/40">
          Gli Animali Fantastici del Sud America
        </footer>
      </div>
    </div>
  );
}
