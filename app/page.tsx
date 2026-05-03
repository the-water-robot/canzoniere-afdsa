import Link from "next/link";
import { loadAlbums } from "@/lib/loader";

const ALBUM_ACCENT = ["coral", "ocean", "lime"] as const;
const ACCENT_RING  = ["ring-coral/40",  "ring-ocean/40",  "ring-lime/40"];
const ACCENT_DOT   = ["bg-coral",       "bg-ocean",       "bg-lime"];
const ACCENT_HOVER = [
  "hover:bg-coral/8  hover:text-coral",
  "hover:bg-ocean/8  hover:text-ocean",
  "hover:bg-lime/8   hover:text-lime",
];
const SONG_EMOJI_BG = [
  "bg-coral/10", "bg-mango/20", "bg-teal/15",
  "bg-ocean/15", "bg-lime/15",  "bg-coral/10",
];

export default function Home() {
  const albums = loadAlbums();

  return (
    <div className="tropical-bg min-h-screen text-ink">

      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb-a absolute -left-24 -top-24 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
        <div className="orb-b absolute -right-16 top-32 h-64 w-64 rounded-full bg-ocean/20 blur-3xl" />
        <div className="orb-c absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-mango/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-xl px-5 pb-24 pt-14">

        {/* Header */}
        <header className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/50 backdrop-blur">
            Gli Animali Fantastici del Sud America
          </div>
          <h1 className="font-display text-6xl font-bold leading-none tracking-tight text-ink sm:text-7xl">
            canzoniere
          </h1>
          <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            <span className="h-1 w-8 rounded-full bg-mango" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            <span className="h-1 w-5 rounded-full bg-ocean" />
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          </div>
        </header>

        {/* Albums */}
        <div className="space-y-12">
          {albums.map((album, ai) => (
            <section key={album.slug}>

              {/* Album label */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${ACCENT_DOT[ai % 3]}`} />
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  {album.emoji} {album.title}
                </h2>
                {album.description && (
                  <span className="text-xs text-ink/40">{album.description}</span>
                )}
              </div>

              {/* Songs card */}
              <div className={`overflow-hidden rounded-2xl bg-white/55 ring-1 backdrop-blur-sm ${ACCENT_RING[ai % 3]}`}>
                {album.songs.length === 0 ? (
                  <p className="px-5 py-6 text-sm italic text-ink/35">Prossimamente…</p>
                ) : (
                  album.songs.map((song, si) => (
                    <div key={song.slug}>
                      <Link
                        href={`/${song.slug}`}
                        className={`group flex items-center gap-4 px-4 py-3.5 transition-colors ${ACCENT_HOVER[ai % 3]}`}
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${SONG_EMOJI_BG[si % SONG_EMOJI_BG.length]}`}>
                          {song.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-[1.05rem] font-semibold lowercase leading-tight text-ink">
                            {song.title}
                          </div>
                          {song.key && (
                            <div className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-ink/35">
                              {song.key}
                            </div>
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold tracking-widest text-ink/20 group-hover:text-ink/40">
                          {song.number}
                        </span>
                        <svg className="h-4 w-4 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                      {si < album.songs.length - 1 && (
                        <div className="mx-4 h-px bg-ink/5" />
                      )}
                    </div>
                  ))
                )}
              </div>

            </section>
          ))}
        </div>

        <footer className="mt-16 text-center text-xs uppercase tracking-[0.25em] text-ink/30">
          Gli Animali Fantastici del Sud America
        </footer>
      </div>
    </div>
  );
}
