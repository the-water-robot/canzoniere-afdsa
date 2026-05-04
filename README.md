# Canzoniere — Gli Animali Fantastici del Sud America

**[canzoniere-afdsa.vercel.app](https://canzoniere-afdsa.vercel.app/)**

Canzoniere digitale mobile-first per **Gli Animali Fantastici del Sud America**. Testi e accordi per chitarra e ukulele, con diagrammi SVG interattivi, dark mode, filtro parolacce e protezione per canzoni inedite.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Linguaggio | TypeScript |
| Stile | Tailwind CSS + CSS variables |
| Accordi | `@tombatossals/chords-db` + renderer SVG in-house |
| Deploy | Vercel (autodetect Next.js) |

## Struttura

```
songs/
  dlin-dlon/      # EP d'esordio (2018) — 6 canzoni
  osteria/        # Secondo album (2021) — 11 canzoni
  inediti/        # Fondi di cassetto — canzoni protette da password
lib/
  chordpro.ts     # Parser ChordPro + hash password (FNV-1a)
  loader.ts       # Carica le .cho da disco a build time
  albums.ts       # Metadati album (titolo, cover, anno)
  chords-db.ts    # Adapter @tombatossals/chords-db → ChordShape
  parental-filter.ts  # Filtro parolacce con effetto "bianchetto"
components/
  SongView.tsx    # Vista canzone: testo+accordi, switcher strumento
  ChordDiagram.tsx    # Diagramma SVG accordo (chitarra/ukulele)
  PasswordGate.tsx    # Schermata password per canzoni riservate
  FilteredText.tsx    # Render testo con patch "bianchetto"
  AlbumSection.tsx    # Sezione album collassabile nella home
app/
  page.tsx        # Home — lista album e canzoni
  [slug]/         # Pagina canzone
  about/          # Chi siamo + discografia
```

## Formato canzoni (.cho)

Le canzoni usano un sottoinsieme di [ChordPro](https://www.chordpro.org/):

```chordpro
{title: Rosa}
{emoji: 🌹}
{number: 01}
{key: F}
{notes: Canzone romantica con influenze latine.}

{start_of_verse: Strofa}
[F]Per le strade [Gm]di Havana [C]Club
[F]Busco un taxi [Gm]è un Chevrolet [C]blue
{end_of_verse}

{start_of_chorus: Ritornello}
[C]Rosa [Am]mia [F]Rosa [G]tua
{end_of_chorus}
```

### Direttive supportate

| Direttiva | Descrizione |
|---|---|
| `{title:}` | Titolo della canzone |
| `{emoji:}` | Emoji nella lista |
| `{number:}` | Numero d'ordine nell'album |
| `{key:}` | Tonalità |
| `{notes:}` | Note libere |
| `{password:}` | Protegge la canzone con password (hash FNV-1a, mai in chiaro nel bundle) |
| `{start_of_verse:}` / `{end_of_verse}` | Strofa |
| `{start_of_chorus:}` / `{end_of_chorus}` | Ritornello |
| `{start_of_intro:}` / `{end_of_intro}` | Introduzione |
| `{start_of_bridge:}` / `{end_of_bridge}` | Bridge |
| `{start_of_outro:}` / `{end_of_outro}` | Outro |

## Aggiungere una canzone

1. Crea un file `.cho` nella cartella dell'album giusto (`songs/dlin-dlon/`, `songs/osteria/`, ecc.)
2. Usa il prefisso numerico per l'ordine: `07-nuova-canzone.cho`
3. Aggiungi le direttive header e le sezioni con accordi in stile ChordPro
4. Per proteggerla con password: `{password: latuapassword}`

Non serve toccare il codice — il loader la prende automaticamente alla prossima build.

## Aggiungere un album

1. Aggiungi un oggetto a `lib/albums.ts` con slug, titolo, emoji, cover, anno
2. Crea la cartella `songs/<slug>/` con i file `.cho`

## Filtro parolacce

`lib/parental-filter.ts` contiene un dizionario di sostituzioni. Il filtro è attivo di default e mostra le parole censurate come patch "bianchetto" con penna sopra. Si disattiva dal pulsante scudo nella vista canzone.

Per aggiungere parole al filtro, modifica `REPLACEMENTS` in `lib/parental-filter.ts`:

```ts
const REPLACEMENTS: Record<string, string> = {
  puttane: "perbene",
  zoofilia: "allegria",
  // aggiungi qui
};
```

## Sviluppo locale

```bash
npm install
npm run dev
```

App su `http://localhost:3000`.

## Deploy

Pre-configurato per Vercel. Importa il repo su [vercel.com/new](https://vercel.com/new) — autodetect Next.js, zero config.
