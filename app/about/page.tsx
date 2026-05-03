import Image from "next/image";
import Link from "next/link";
import { ALBUMS } from "@/lib/albums";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Chi siamo — Canzoniere",
  description:
    "La storia degli Animali Fantastici del Sud America e del canzoniere.",
};

export default function AboutPage() {
  return (
    <div className="scene-bg relative min-h-screen text-[var(--text)]">

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="animate-orb-a absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet/15 blur-3xl" />
        <div className="animate-orb-b absolute -right-20 top-1/2 h-64 w-64 rounded-full bg-flamingo/15 blur-3xl" />
        <div className="animate-orb-c absolute -bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-solar/15 blur-3xl" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--border)] hover:text-[var(--text)]"
            aria-label="Torna alla home"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="flex-1 truncate font-display text-lg font-bold">
            Chi siamo
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative mx-auto max-w-2xl px-5 pb-24 pt-8">

        {/* Hero squared */}
        <div className="relative mb-8 aspect-square overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/band-squared.jpg"
            alt="Gli Animali Fantastici del Sud America"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="rainbow-text mb-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Gli Animali Fantastici del Sud America
        </h1>
        <p className="mb-10 text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
          Dal 2015, da Milano al mondo
        </p>

        {/* Bio */}
        <section className="space-y-4 text-base leading-relaxed">
          <p>
            Tutto è iniziato in viaggio: una chitarra, un ukulele, una valigia
            piena di storie. Gli <strong>Animali Fantastici del Sud America</strong>{" "}
            sono un progetto musicale nato a <strong>Milano</strong> dall'incontro
            tra <strong>Pit</strong> (voce) e <strong>Dave</strong> (corde),
            cresciuto poi tra una sagra di paese e una spiaggia caraibica.
          </p>
          <p>
            Le canzoni nascono dalle persone incontrate per strada — Rosa a
            L'Avana, Molly alle Hawaii, Sandrona da chissà dove — e da quelle
            inventate per stare meglio. Storie cantate dove ogni traccia porta
            il nome di una persona reale, una vita vera vissuta come finzione,
            o una fantasia vissuta come realtà.
          </p>
          <p>
            In studio e dal vivo si aggiungono <em>Camilla</em> (sax),{" "}
            <em>Jeqi</em> (basso), <em>Marci</em> (percussioni),{" "}
            <em>Brivido</em> (tromba), <em>Il Maestro</em> (violino) e{" "}
            <em>Toni $</em> (fischio e pittura dal vivo). Una band-orchestra
            che cambia forma ad ogni tappa.
          </p>
        </section>

        {/* Storytelling — perché questo canzoniere */}
        <section className="glass mt-10 rounded-2xl p-6">
          <h2 className="mb-3 font-display text-xl font-bold">
            🌴 Perché questo canzoniere
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-[var(--text)]/85">
            <p>
              Perché le canzoni si imparano cantandole insieme. Perché ogni
              tanto serve un posto dove trovare il giro giusto senza dover
              chiedere a chi le ha scritte, e perché un'osteria senza canzoniere
              è solo un bar con i tavoli sporchi.
            </p>
            <p>
              Qui dentro ci sono i testi e gli accordi di tutto quello che
              abbiamo scritto: per chi suona la chitarra, per chi suona
              l'ukulele, per chi vuole solo cantare a squarciagola.
              Aggiungeremo brani man mano che escono, alle stelle cadenti
              non si comanda.
            </p>
            <p className="italic text-[var(--muted)]">
              «Una rosa, se non si chiamasse rosa, avrebbe comunque lo stesso profumo.»
            </p>
          </div>
        </section>

        {/* Discografia */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold">💿 Discografia</h2>
          <ul className="space-y-3">
            {ALBUMS.map((a) => (
              <li
                key={a.slug}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <span className="text-2xl">{a.emoji}</span>
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">
                    {a.title}
                  </div>
                  {a.description && (
                    <div className="text-xs text-[var(--muted)]">
                      {a.description}
                    </div>
                  )}
                  {a.authors && (
                    <div className="mt-0.5 text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                      {a.authors}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Press kit + contatti */}
        <section className="mt-10 text-center">
          <a
            href="/press-kit/gli-animali-fantastici-del-sudamerica.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:scale-105 hover:shadow-md"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Scarica il press kit (PDF)
          </a>
        </section>

        <Link
          href="/"
          className="mt-12 block text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)] transition hover:text-[var(--text)]"
        >
          ← Torna al canzoniere
        </Link>
      </main>
    </div>
  );
}
