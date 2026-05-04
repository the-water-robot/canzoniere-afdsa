import { notFound } from "next/navigation";
import { SongView } from "@/components/SongView";
import { PasswordGate } from "@/components/PasswordGate";
import { loadAllSongs, loadSong } from "@/lib/loader";

export function generateStaticParams() {
  return loadAllSongs().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = loadSong(slug);
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
  const song = loadSong(slug);
  if (!song) notFound();
  return song.passwordHash
    ? <PasswordGate song={song} />
    : <SongView song={song} />;
}
