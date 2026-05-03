export type AlbumMeta = {
  slug: string;
  title: string;
  emoji: string;
  description?: string;
};

export const ALBUMS: AlbumMeta[] = [
  {
    slug: "dlin-dlon",
    title: "Dlin Dlon",
    emoji: "🔔",
    description: "Il primo album",
  },
  {
    slug: "osteria",
    title: "Osteria",
    emoji: "🍷",
    description: "Il secondo album",
  },
  {
    slug: "inediti",
    title: "Inediti",
    emoji: "✏️",
    description: "Canzoni inedite",
  },
];
