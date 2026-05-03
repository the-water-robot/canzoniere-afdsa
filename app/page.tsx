import Link from "next/link";
import { loadAlbums } from "@/lib/loader";

const ALBUM_COLORS = [
  "from-coral/15 to-mango/10 border-coral/20",
  "from-ocean/15 to-turquoise/10 border-ocean/20",
  "from-turquoise/15 to-mango/10 border-turquoise/20",
];

const SONG_ACCENTS = [
  "hover:border-coral hover:text-coral",
  "hover:border-mango hover:text-yellow-600",
  "hover:border-turquoise hover:text-teal-600",
  "hover:border-ocean hover:text-sky-600",
  "hover:border-coral hover:text-coral",
  "hover:border-turquoise hover:text-teal-600",
];

export default function Home() {
  const albums = loadAlbums();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
        <header className="mb-12 text-center">
          <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl">
            canzoniere
          </h1>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-coral via-mango to-turquoise" />
          <h2 className="mt-5 font-display text-sm uppercase tracking-[0.3em] text-ink/60">
            Gli Animali Fantastici del Sud America
          </h2>
        </header>

        <div className="space-y-10">
          {albums.map((album, ai) => (
            <section key={album.slug}>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-2xl">{album.emoji}</span>
                <h2 className="font-display text-2xl font-bold text-ink">
                  {album.title}
                </h2>
                {album.description && (
                  <span className="text-sm text-ink/50">{album.description}</span>
                )}
              </div>

              {album.songs.length === 0 ? (
                <div
                  className={
                    "rounded-2xl border bg-gradient-to-br px-5 py-6 text-sm italic text-ink/40 " +
                    ALBUM_COLORS[ai % ALBUM_COLORS.length]
                  }
                >
                  Prossimamente…
                </div>
              ) : (
                <ul
                  className={
                    "rounded-2xl border bg-gradient-to-br p-2 " +
                    ALBUM_COLORS[ai % ALBUM_COLORS.length]
                  }
                >
                  {album.songs.map((song, si) => (
                    <li key={song.slug}>
                      <Link
                        href={`/${song.slug}`}
                        className={
                          "group flex items-center gap-3 rounded-xl px-3 py-3 transition active:bg-ink/5 " +
                          SONG_ACCENTS[si % SONG_ACCENTS.length]
                        }
                      >
                        <span className="w-6 shrink-0 text-center text-lg">
                          {song.emoji}
                        </span>
                        <span className="font-display text-lg font-semibold lowercase text-ink group-hover:text-[inherit]">
                          {song.title}
                        </span>
                        {song.key && (
                          <span className="ml-1 rounded-full border border-ink/10 bg-white/60 px-2 py-0.5 font-mono text-xs text-ink/50">
                            {song.key}
                          </span>
                        )}
                        <span className="ml-auto font-mono text-xs font-bold tracking-widest text-ink/30">
                          {song.number}
                        </span>
                      </Link>
                      {si < album.songs.length - 1 && (
                        <div className="mx-3 h-px bg-ink/5" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-ink/10 pt-6 text-center text-xs uppercase tracking-[0.25em] text-ink/40">
          Gli Animali Fantastici del Sud America
        </footer>
      </div>
    </div>
  );
}
