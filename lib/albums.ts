export type AlbumMeta = {
  slug: string;
  title: string;
  emoji: string;
  description?: string;
  cover?: string;
  year?: string;
  authors?: string;
};

export const ALBUMS: AlbumMeta[] = [
  {
    slug: "dlin-dlon",
    title: "Dlin Dlon",
    emoji: "🔔",
    description: "EP d'esordio · 2018",
    cover: "/images/cover-dlindlon.jpg",
    year: "2018",
    authors: "Ilacqua P., Piotti D.",
  },
  {
    slug: "osteria",
    title: "Osteria",
    emoji: "🍷",
    description: "Secondo album",
    cover: "/images/cover-osteria.jpg",
    authors: "Ilacqua P., Piotti D., Pruneddu D.",
  },
  {
    slug: "inediti",
    title: "Fondi di cassetto e altri sogni",
    emoji: "🗄️",
    description: "Canzoni in cantiere",
    authors: "Ilacqua P., Piotti D.",
  },
];

export function albumBySlug(slug: string): AlbumMeta | undefined {
  return ALBUMS.find((a) => a.slug === slug);
}
