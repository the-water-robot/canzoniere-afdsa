export type AlbumMeta = {
  slug: string;
  title: string;
  emoji: string;
  description?: string;
  cover?: string;
  year?: string;
};

export const ALBUMS: AlbumMeta[] = [
  {
    slug: "dlin-dlon",
    title: "Dlin Dlon",
    emoji: "🔔",
    description: "EP d'esordio · 2018",
    cover: "/images/cover-dlindlon.jpg",
    year: "2018",
  },
  {
    slug: "osteria",
    title: "Osteria",
    emoji: "🍷",
    description: "Secondo album",
    cover: "/images/cover-osteria.jpg",
  },
  {
    slug: "inediti",
    title: "Inediti",
    emoji: "✏️",
    description: "Canzoni inedite",
  },
];
