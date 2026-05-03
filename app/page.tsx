import Image from "next/image";
import { loadAlbums } from "@/lib/loader";
import { AlbumSection } from "@/components/AlbumSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const albums = loadAlbums();

  return (
    <div className="scene-bg relative min-h-screen text-[var(--text)]">

      {/* Animated orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="animate-orb-a absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky/25 blur-3xl" />
        <div className="animate-orb-b absolute -right-24 top-20  h-72 w-72 rounded-full bg-flamingo/22 blur-3xl" />
        <div className="animate-orb-c absolute bottom-0  left-1/3 h-96 w-96 rounded-full bg-solar/18 blur-3xl" />
        <div className="animate-orb-a absolute right-1/4 top-1/2 h-56 w-56 rounded-full bg-violet/15 blur-3xl" />
      </div>

      {/* Theme toggle — top right */}
      <div className="fixed right-4 top-4 z-40">
        <ThemeToggle className="glass rounded-full shadow-sm" />
      </div>

      <div className="relative mx-auto max-w-lg px-5 pb-24 pt-12">

        {/* Hero band image */}
        <div className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="/images/band-total.jpg"
            alt="Gli Animali Fantastici del Sud America"
            width={900}
            height={320}
            className="w-full object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="rainbow-text font-display text-6xl font-bold leading-none tracking-tight sm:text-7xl">
            canzoniere
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Gli Animali Fantastici del Sud America
          </p>
        </header>

        {/* Albums */}
        <div className="space-y-4">
          {albums.map((album, ai) => (
            <AlbumSection
              key={album.slug}
              album={album}
              accentIdx={ai}
              defaultOpen={ai === 0}
            />
          ))}
        </div>

        <footer className="mt-14 text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          Gli Animali Fantastici del Sud America
        </footer>
      </div>
    </div>
  );
}
