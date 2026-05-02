export type Line = {
  chords: string[];
  text: string;
};

export type Section = {
  kind: "intro" | "verse" | "chorus" | "bridge" | "outro";
  title: string;
  lines: Line[];
};

export type Song = {
  slug: string;
  title: string;
  emoji: string;
  number: string;
  notes?: string;
  progressions: { label: string; chords: string[] }[];
  sections: Section[];
};

const v = (chords: string[], text: string): Line => ({ chords, text });

const ROSA_FGmC = ["F", "Gm", "C"];
const ROSA_BbFAF = ["Bb", "F", "A7", "F"];
const AmFCG = ["Am", "F", "C", "G"];

export const songs: Song[] = [
  {
    slug: "rosa",
    title: "Rosa",
    emoji: "🌹",
    number: "01",
    notes: "Canzone romantica con influenze latine.",
    progressions: [
      { label: "Strofe", chords: ["F", "Gm", "C"] },
      { label: "Ritornello", chords: ["Bb", "F", "A7", "F"] },
    ],
    sections: [
      {
        kind: "intro",
        title: "Introduzione",
        lines: [
          v(ROSA_FGmC, "Per le strade di Havana Club"),
          v(ROSA_FGmC, "Busco un taxi è un Chevrolet blue"),
          v(ROSA_FGmC, "Portami dove abiti tu - tututurututtu"),
          v(ROSA_FGmC, "Mi dai le chiavi ma tu"),
          v(ROSA_FGmC, "Sei tu che hai il passe-partout"),
          v(ROSA_FGmC, "Per qualsiasi corazon che fa bum bubum bum bum"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(ROSA_BbFAF, "Rosa,"),
          v(ROSA_BbFAF, "Mamacita hermosa"),
          v(ROSA_BbFAF, "Quieres ser mi esposa"),
          v(ROSA_BbFAF, "Vamos a bailar"),
          v(ROSA_BbFAF, "Rosa,"),
          v(ROSA_BbFAF, "Mamacita hermosa"),
          v(ROSA_BbFAF, "Quieres ser mi esposa"),
          v(ROSA_BbFAF, "Vamos a bailar"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(ROSA_FGmC, "Andiamo a letto io e te"),
          v(ROSA_FGmC, "Puoi anche non portare il toupet"),
          v(ROSA_FGmC, "Ti accarezzerò la testa in questo tête-à-tête"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello finale",
        lines: [
          v(ROSA_BbFAF, "Rosa,"),
          v(ROSA_BbFAF, "Mamacita hermosa"),
          v(ROSA_BbFAF, "Quieres ser mi esposa"),
          v(ROSA_BbFAF, "Vamos a bailar"),
          v(ROSA_BbFAF, "Rosa,"),
          v(ROSA_BbFAF, "Mamacita hermosa"),
          v(ROSA_BbFAF, "Quieres ser mi esposa"),
          v(ROSA_BbFAF, "Vamos a bailar"),
          v(ROSA_BbFAF, "Rosa,"),
          v(ROSA_BbFAF, "Mamacita hermosa"),
          v(ROSA_BbFAF, "Quieres ser mi esposa"),
          v(ROSA_BbFAF, "Vamos a bailar"),
        ],
      },
    ],
  },

  {
    slug: "monica",
    title: "Monica",
    emoji: "☕",
    number: "02",
    notes: "Canzone narrativa con ritmo vivace.",
    progressions: [{ label: "Progressione principale", chords: AmFCG }],
    sections: [
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "L'alimentari apre dalle sei alle sette di sera"),
          v(AmFCG, "La signora Rita esce di casa per andare dalla parrucchiera"),
          v(AmFCG, "Un uomo sposta l'auto così poi si parcheggia"),
          v(AmFCG, "Il cielo è coperto da sputi di pioggia"),
          v(AmFCG, "Una coppia cerca il suo alloggio di corsa"),
          v(AmFCG, "Lei è distratta e si scorda la borsa"),
          v(AmFCG, "Spunta poi"),
          v(AmFCG, "Con simpatia fotonica"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "(Monica) Monica (Monica) Monica perché"),
          v(AmFCG, "Esce solo a metà il caffè"),
          v(AmFCG, "(Monica) Monica (Monica) Monica perché"),
          v(AmFCG, "Il divano si chiude da sé"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Monica insegna l'arte agli stranieri"),
          v(AmFCG, "Monica appunta sui post-it i pensieri"),
          v(AmFCG, "E sulle salite di fianco alle case"),
          v(AmFCG, "Nell'aria si sente il profumo di un paese"),
          v(AmFCG, "Dov'è il ragù di lepre? È il menù della domenica"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "(Monica) Monica (Monica) Monica perché"),
          v(AmFCG, "Esce solo a metà il caffè"),
          v(AmFCG, "(Monica) Monica (Monica) Monica perché"),
          v(AmFCG, "Il divano si chiude da sé"),
        ],
      },
    ],
  },

  {
    slug: "giuliano",
    title: "Giuliano",
    emoji: "🕷️",
    number: "03",
    notes: "Canzone dark con ritmo incalzante.",
    progressions: [{ label: "Progressione principale", chords: AmFCG }],
    sections: [
      {
        kind: "intro",
        title: "Introduzione",
        lines: [
          v(AmFCG, "Giuliano Giuliano Giuliano"),
          v(AmFCG, "Vive nell'appennino Tosco-Emiliano"),
          v(AmFCG, "Insegna ai bambini il piano"),
          v(AmFCG, "E ogni tanto ha qualche pensiero strano"),
          v(AmFCG, "È una persona normale"),
          v(AmFCG, "Ma ha questo hobby un po' particolare"),
          v(AmFCG, "Gli piace suonare e cantare"),
          v(AmFCG, "E squartare! Squartare! Squartare!"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "Giuliano,"),
          v(AmFCG, "Ha un hobby strano"),
          v(AmFCG, "Uccide il tempo"),
          v(AmFCG, "E le persone"),
          v(AmFCG, "Malcapitate nella sua abitazione"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Toglie dal corpo la pelle"),
          v(AmFCG, "Alle signorine più belle"),
          v(AmFCG, "Lascia da parte il restante"),
          v(AmFCG, "Al suo cucciolo di ragno gigante"),
          v(AmFCG, "Ritaglia con cura i tattoo"),
          v(AmFCG, "Li appende sul muro di dipinto di blu"),
          v(AmFCG, "E arricchisce la sua collezione"),
          v(AmFCG, "Squartando, squartando persone!"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "Giuliano,"),
          v(AmFCG, "Ha un hobby strano"),
          v(AmFCG, "Uccide il tempo"),
          v(AmFCG, "E le persone"),
          v(AmFCG, "Malcapitate nella sua abitazione"),
        ],
      },
    ],
  },

  {
    slug: "alberto",
    title: "Alberto",
    emoji: "🏝️",
    number: "04",
    notes: "Canzone narrativa con atmosfera caraibica.",
    progressions: [{ label: "Progressione principale", chords: AmFCG }],
    sections: [
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Alberto, Alberto ha studiato"),
          v(AmFCG, "All'università"),
          v(AmFCG, "Dello zucchero filato"),
          v(AmFCG, "Dove ha conosciuto una muchacha"),
          v(AmFCG, "Che ha portato via"),
          v(AmFCG, "Via dalla strada"),
          v(AmFCG, "De L'Havana"),
          v(AmFCG, "Ora, ora sul terrazzo"),
          v(AmFCG, "Una bambina gioca"),
          v(AmFCG, "Con un goldone"),
          v(AmFCG, "Gonfiato"),
          v(AmFCG, "Gonfiato come la piscina"),
          v(AmFCG, "In cui lei nuota"),
          v(AmFCG, "Che il cane svuota"),
          v(AmFCG, "Quando ha sete"),
          v(AmFCG, "Sotto ad un cielo di stelle cadenti.."),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "Alberto ha cresciuto due figlie puttane"),
          v(AmFCG, "Puttane!"),
          v(AmFCG, "Ma in fondo qualcosa di buono c'è"),
          v(AmFCG, "Alberto ha cresciuto due figlie puttane"),
          v(AmFCG, "Puttane!"),
          v(AmFCG, "Ma in fondo è una questione di felicità"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Son passati gli anni e i carnevali"),
          v(AmFCG, "Nelle case particolari"),
          v(AmFCG, "I cantanti e i turisti sessuali"),
          v(AmFCG, "E ora, ora sul terrazzo"),
          v(AmFCG, "Lavora due ragazze"),
          v(AmFCG, "Coi cantanti e i turisti sessuali"),
          v(AmFCG, "Sotto ad un cielo di stelle cadenti.."),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello finale",
        lines: [
          v(AmFCG, "Alberto ha cresciuto due figlie puttane"),
          v(AmFCG, "Puttane!"),
          v(AmFCG, "Ma in fondo qualcosa di buono c'è"),
          v(AmFCG, "Alberto ha cresciuto due figlie puttane"),
          v(AmFCG, "Come la madre!"),
          v(AmFCG, "Ma in fondo è una questione di DNA"),
        ],
      },
    ],
  },

  {
    slug: "molly",
    title: "Molly",
    emoji: "🌺",
    number: "05",
    notes: "Canzone romantica con atmosfera tropicale.",
    progressions: [{ label: "Progressione principale", chords: AmFCG }],
    sections: [
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Molly, Molly come stai"),
          v(AmFCG, "Oggi ti trovo più bella che mai"),
          v(AmFCG, "Sei la più bella delle Hawaii"),
          v(AmFCG, "Tu non ci crederai ma non è per quel Mai Tai"),
          v(AmFCG, "Molly, che dolce la tua bocca"),
          v(AmFCG, "Molly, sei un dolce all'albicocca"),
          v(AmFCG, "Molly, Molly tu mi sciocchi"),
          v(AmFCG, "Mentre mi sbatti gli occhi"),
          v(AmFCG, "Coi reggiseni cocchi"),
          v(AmFCG, "Ahiahiahiahiahiai"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "Molly, perché non ce la dai?"),
          v(AmFCG, "Sei il nostro sogno d'amore lo sai"),
          v(AmFCG, "Facci entrare nella tua Wi-Fi"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Molly, non sai come mi sento"),
          v(AmFCG, "Mi sciolgo sui tuoi capelli al vento"),
          v(AmFCG, "Fai splendere il tramonto"),
          v(AmFCG, "E in meno di un secondo"),
          v(AmFCG, "Sono contento! Sono proprio contento!"),
          v(AmFCG, "Molly che bello il tuo sorriso,"),
          v(AmFCG, "È una luna che illumina il tuo visto,"),
          v(AmFCG, "E se splende all'improvviso"),
          v(AmFCG, "Ti registrerò un inciso"),
          v(AmFCG, "Dove dico per inciso"),
          v(AmFCG, "Ahiahiahiahiahiai"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello finale",
        lines: [
          v(AmFCG, "Molly, perché non ce la dai?"),
          v(AmFCG, "Sei il nostro sogno d'amore lo sai"),
          v(AmFCG, "Facci entrare nella tua Wi-Fi"),
          v(AmFCG, "Ahiahiahiahiahiai"),
          v(AmFCG, "Molly, perché non ce la dai?"),
          v(AmFCG, "Faremo l'amore troppo bello"),
          v(AmFCG, "E poi staremo nudi a mollo nell'atollo"),
          v(AmFCG, "Ahiahiahiahiahiai"),
          v(AmFCG, "Molly, perché non ce la dai, mai?"),
          v(AmFCG, "Sei il nostro sogno d'amore lo sai"),
          v(AmFCG, "Facci entrare nella tua Wi-Fi"),
        ],
      },
    ],
  },

  {
    slug: "sandrona",
    title: "Sandrona",
    emoji: "🌊",
    number: "06",
    notes: "Canzone narrativa con atmosfera onirica.",
    progressions: [{ label: "Progressione principale", chords: AmFCG }],
    sections: [
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "In un inverno che sembra un'estate"),
          v(AmFCG, "Su un prato bagnato di gocce salate"),
          v(AmFCG, "Un arcobaleno appare doppio"),
          v(AmFCG, "Sul tuo doppio mento di fianco al tramonto"),
          v(AmFCG, "In questo cielo, d'oceano sereno"),
          v(AmFCG, "Ora sparisci in un baleno"),
          v(AmFCG, "Come una balena che si fa il bagno"),
          v(AmFCG, "Rispunti all'instante spruzzando champagne"),
          v(AmFCG, "Una lampadina vuol dire un viaggio"),
          v(AmFCG, "Spariamo i Friskies con il tuo aggeggio"),
          v(AmFCG, "Perdiamo le chiavi dell'autonoleggio"),
          v(AmFCG, "Ma non importa, Seattle è peggio"),
          v(AmFCG, "Anche quest'anno è arrivato il Natale"),
          v(AmFCG, "Hai preso il sale per il pesce al sale?"),
          v(AmFCG, "Fai con la mente, le scale di Escher"),
          v(AmFCG, "Hai preso il sale, hai scordato il pesce"),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello",
        lines: [
          v(AmFCG, "È solo un saluto non farmi sedere"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Va bene d'accordo ma solo un bicchiere"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "No non aprire un'altra bottiglia"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Anche se insisti non sposerò tua figlia"),
          v(AmFCG, "(Sandrona)"),
        ],
      },
      {
        kind: "verse",
        title: "Strofa",
        lines: [
          v(AmFCG, "Riguardi le quote delle partite"),
          v(AmFCG, "Al bar dello sport sognando un nipote"),
          v(AmFCG, "Disegni dei cuori con le matite"),
          v(AmFCG, "Su vecchi contratti di case affittate"),
          v(AmFCG, "Cammini sola per il cortile"),
          v(AmFCG, "Incontri persone per offrire cene"),
          v(AmFCG, "Nei buoni propositi su un foglio di brutta"),
          v(AmFCG, "Hai scritto soltanto \"voler bene a tutti\""),
        ],
      },
      {
        kind: "chorus",
        title: "Ritornello finale",
        lines: [
          v(AmFCG, "È solo un saluto non farmi sedere"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Va bene d'accordo ma solo un bicchiere"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "No non aprire un'altra bottiglia"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Anche se insisti non sposerò tua figlia"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Oh Sandrona!"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Oh Sandrona!"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Oh Sandrona!"),
          v(AmFCG, "(Sandrona)"),
          v(AmFCG, "Oh Sandrona!"),
          v(AmFCG, "(Sandrona)"),
        ],
      },
    ],
  },
];

export function getSong(slug: string): Song | undefined {
  return songs.find((s) => s.slug === slug);
}

export function uniqueChords(song: Song): string[] {
  const set = new Set<string>();
  for (const section of song.sections) {
    for (const line of section.lines) {
      for (const chord of line.chords) set.add(chord);
    }
  }
  return Array.from(set);
}
