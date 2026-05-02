import { notFound } from "next/navigation";
import { SongView } from "@/components/SongView";
import { getSong, songs } from "@/lib/songs";

export function generateStaticParams() {
  return songs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) return { title: "Canzoniere" };
  return {
    title: `${song.title} — Canzoniere`,
    description: `${song.title}: testo e accordi per chitarra e ukulele.`,
  };
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSong(slug);
  if (!song) notFound();
  return <SongView song={song} />;
}
