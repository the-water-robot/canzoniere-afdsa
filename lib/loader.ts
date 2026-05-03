import fs from "fs";
import path from "path";
import { parseChordPro, type Song } from "./chordpro";
import { ALBUMS, type AlbumMeta } from "./albums";

export type Album = AlbumMeta & { songs: Song[] };

const SONGS_DIR = path.join(process.cwd(), "songs");

function slugify(filename: string): string {
  return filename.replace(/^\d+-/, "").replace(/\.cho$|\.chordpro$/, "");
}

function loadAlbumSongs(albumSlug: string): Song[] {
  const dir = path.join(SONGS_DIR, albumSlug);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".cho") || f.endsWith(".chordpro"))
    .sort();
  return files.map((filename) => {
    const source = fs.readFileSync(path.join(dir, filename), "utf-8");
    const parsed = parseChordPro(source, filename);
    return { ...parsed, slug: slugify(filename), albumSlug };
  });
}

export function loadAlbums(): Album[] {
  return ALBUMS.map((meta) => ({
    ...meta,
    songs: loadAlbumSongs(meta.slug),
  }));
}

export function loadAllSongs(): Song[] {
  return loadAlbums().flatMap((a) => a.songs);
}

export function loadSong(slug: string): Song | undefined {
  return loadAllSongs().find((s) => s.slug === slug);
}

export function uniqueChords(song: Song): string[] {
  const set = new Set<string>();
  for (const section of song.sections) {
    for (const line of section.lines) {
      for (const seg of line.segments) {
        if (seg.chord) set.add(seg.chord);
      }
    }
  }
  return Array.from(set);
}
