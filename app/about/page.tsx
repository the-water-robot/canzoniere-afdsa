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
          Dal 2017, da Milano al mondo
        </p>

        {/* Bio */}
        <section className="space-y-4 text-base leading-relaxed">
          <p>
            Gli <strong>Animali Fantastici del Sudamerica</strong> sono una band
            milanese che ama cantar storie e far ballare, mescolando folk, latin
            e ritmi travolgenti.
          </p>
          <p>
            Nati da viaggi in compagnia di ukuleli, sogni e buon umore, si sono
            allargati strada facendo con fiati, percussioni e l'arte visiva live
            di <em>Toni $</em>, che trasforma ogni concerto in uno spettacolo
            anche per gli occhi.
          </p>
          <p>
            Dopo l'EP <strong>Dlin Dlon</strong> (2018), ispirato agli incontri
            on the road, hanno servito <strong>Osteria</strong> (2021), un album
            di racconti surreali tra osterie e brindisi musicali. Attualmente
            stanno preparando il loro terzo disco, sempre in equilibrio tra
            realtà e fantasia, pronti a raccontare nuove storie con il ritmo
            giusto.
          </p>
        </section>

        {/* Storytelling — perché questo canzoniere */}
        <section className="glass mt-10 rounded-2xl p-6">
          <h2 className="mb-3 font-display text-xl font-bold">
            🌴 Perché questo canzoniere
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-[var(--text)]/85">
            <p>
              Perché certe serate hanno bisogno di una chitarra. Perché alcune
              canzoni le sai a metà, e quell'altra metà la inventi, e poi ci
              vai avanti tutta la vita.
            </p>
            <p>
              Perché i sogni si mettono in un cassetto, ma ogni tanto bisogna
              aprirlo, spolverarlo, e ricominciare a sognare. Qui dentro ci
              sono le parole e gli accordi di tutto quello che abbiamo scritto
              finora: storie di libertà, di viaggi, di amicizia, di umanità,
              tramonti, brindisi.
            </p>
            <p>
              Per chi suona la chitarra, per chi suona l'ukulele, per chi non
              sa suonare niente ma canta lo stesso a squarciagola,
              stonato, e felice.
            </p>
            <p className="italic text-[var(--muted)]">
              «E anche voi gente, non smettete mai di sognare.»
            </p>
          </div>
        </section>

        {/* Discografia */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold">💿 Discografia</h2>
          <ul className="space-y-4">
            {ALBUMS.filter((a) => a.slug !== "inediti").map((a) => (
              <li
                key={a.slug}
                className="glass flex items-center gap-4 rounded-2xl p-3"
              >
                {a.cover ? (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <span className="text-3xl">{a.emoji}</span>
                )}
                <div className="flex-1">
                  <div className="font-display text-base font-semibold">
                    {a.title}
                  </div>
                  {a.year && (
                    <div className="mt-0.5 font-mono text-xs text-[var(--muted)]">
                      {a.year}
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
