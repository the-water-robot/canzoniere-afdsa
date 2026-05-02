# Canzoniere

Mobile-first songbook with guitar and ukulele chord diagrams. Frame in stile Ultimate Guitar.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Static chord library (SVG render in-house)

## Sviluppo

```bash
npm install
npm run dev
```

App su `http://localhost:3000`.

## Deploy

Pre-configurato per Vercel. Importa il repo su [vercel.com/new](https://vercel.com/new) — autodetect Next.js.

## API accordi

- `GET /api/chords/guitar` — elenco tutti gli accordi disponibili (chitarra)
- `GET /api/chords/ukulele` — elenco tutti gli accordi disponibili (ukulele)
- `GET /api/chords/guitar/Am` — diagramma di un singolo accordo
- `GET /api/chords/ukulele/F` — idem per ukulele

Risposta esempio:

```json
{
  "instrument": "guitar",
  "name": "Am",
  "strings": 6,
  "tuning": ["E","A","D","G","B","e"],
  "frets": [-1,0,2,2,1,0],
  "fingers": [0,0,2,3,1,0],
  "barre": null,
  "baseFret": 1
}
```

`frets[i]`: tasto premuto sulla corda `i` (`-1` = mutata, `0` = aperta).

## Aggiungere una canzone

1. Aggiungi un oggetto a `lib/songs.ts`.
2. Se serve un nuovo accordo, aggiungilo a `lib/chord-shapes.ts` per entrambi gli strumenti.
