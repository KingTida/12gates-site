import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

type Occurrence = {
  testament?: "ot" | "nt";
  book: string;
  chapter: number;
  reference: string;
  kjv_reference: string;
  translation: string;
  word: string;
  translit: string;
  gloss: string;
  word_index?: number;
};

type LexiconEntry = {
  headword?: string | null;
  translit?: string | null;
  pronunciation?: string | null;
  gloss?: string | null;
  definition?: string | null;
  kjv_def?: string | null;
  derivation?: string | null;
};

function readJson<T>(parts: string[], fallback: T): T {
  const filePath = path.join(process.cwd(), ...parts);

  if (!fs.existsSync(filePath)) return fallback;

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export default async function StrongsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const strongs = resolvedParams.id.toUpperCase();

  const isHebrew = strongs.startsWith("H");
  const isGreek = strongs.startsWith("G");

  if (!isHebrew && !isGreek) notFound();

  const index = readJson<Record<string, Occurrence[]>>(
    [
      "data",
      "indexes",
      isHebrew ? "strongs_ot_index.json" : "strongs_nt_index.json",
    ],
    {}
  );

  const lexicon = readJson<Record<string, LexiconEntry>>(
    [
      "data",
      "lexicon",
      isHebrew ? "hebrew_strongs.json" : "greek_strongs.json",
    ],
    {}
  );

  const occurrences = index[strongs];
  const entry = lexicon[strongs];

  if (!occurrences && !entry) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/bible"
        className="mb-4 inline-block rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
      >
        ← Back to Bible
      </Link>

      <h1 className="text-4xl font-bold">{strongs}</h1>

      <div className="mt-4 rounded-lg border-2 border-white/40 p-5">
        {entry?.headword && (
          <p>
            <span className="font-semibold">Headword:</span>{" "}
            <span dir={isHebrew ? "rtl" : "ltr"}>{entry.headword}</span>
          </p>
        )}

        {entry?.translit && (
          <p className="mt-2">
            <span className="font-semibold">Transliteration:</span>{" "}
            {entry.translit}
          </p>
        )}

        {entry?.pronunciation && (
          <p className="mt-2">
            <span className="font-semibold">Pronunciation:</span>{" "}
            {entry.pronunciation}
          </p>
        )}

        {entry?.derivation && (
          <p className="mt-2">
            <span className="font-semibold">Derivation:</span>{" "}
            {entry.derivation}
          </p>
        )}

        {(entry?.definition || entry?.gloss) && (
          <p className="mt-2 leading-7">
            <span className="font-semibold">Definition:</span>{" "}
            {entry.definition || entry.gloss}
          </p>
        )}

        {entry?.kjv_def && (
          <p className="mt-2 leading-7">
            <span className="font-semibold">KJV usage:</span>{" "}
            {entry.kjv_def}
          </p>
        )}
      </div>

      <h2 className="mt-8 text-2xl font-bold">
        {isHebrew ? "OT" : "NT"} Occurrences ({occurrences?.length ?? 0})
      </h2>

      <div className="mt-4 space-y-3">
        {(occurrences ?? []).map((occurrence, index) => (
          <Link
            key={`${occurrence.reference}-${occurrence.word_index ?? index}`}
            href={`/bible/${isHebrew ? "ot" : "nt"}/${occurrence.book}/${occurrence.chapter}`}
            className="block rounded-lg border-2 border-white/40 p-4 transition hover:border-white"
          >
            <div className="font-bold">{occurrence.kjv_reference}</div>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              {occurrence.translation}
            </p>

            <div className="mt-2 text-sm">
              <span dir={isHebrew ? "rtl" : "ltr"} className="text-lg">
                {occurrence.word}
              </span>{" "}
              — {occurrence.gloss}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}