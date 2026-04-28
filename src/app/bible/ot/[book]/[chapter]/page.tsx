export const dynamic = "force-dynamic";
import fs from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import VerseWordStudy from "@/components/VerseWordStudy";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

type Word = {
  word_index?: number;
  original: string;
  translit?: string;
  gloss?: string;
  strongs?: string | null;
};

type Verse = {
  reference: string;
  kjv_reference?: string;
  words: Word[];
  translation: string;
};

type ChapterData = {
  chapter: number;
  verses: Verse[];
};

type LexiconEntry = {
  headword?: string | null;
  translit?: string | null;
  gloss?: string | null;
};

const OT_BOOKS = [
  { slug: "genesis", name: "Genesis", chapters: 50 },
  { slug: "exodus", name: "Exodus", chapters: 40 },
  { slug: "leviticus", name: "Leviticus", chapters: 27 },
  { slug: "numbers", name: "Numbers", chapters: 36 },
  { slug: "deuteronomy", name: "Deuteronomy", chapters: 34 },
  { slug: "joshua", name: "Joshua", chapters: 24 },
  { slug: "judges", name: "Judges", chapters: 21 },
  { slug: "ruth", name: "Ruth", chapters: 4 },
  { slug: "1-samuel", name: "1 Samuel", chapters: 31 },
  { slug: "2-samuel", name: "2 Samuel", chapters: 24 },
  { slug: "1-kings", name: "1 Kings", chapters: 22 },
  { slug: "2-kings", name: "2 Kings", chapters: 25 },
  { slug: "1-chronicles", name: "1 Chronicles", chapters: 29 },
  { slug: "2-chronicles", name: "2 Chronicles", chapters: 36 },
  { slug: "ezra", name: "Ezra", chapters: 10 },
  { slug: "nehemiah", name: "Nehemiah", chapters: 13 },
  { slug: "esther", name: "Esther", chapters: 10 },
  { slug: "job", name: "Job", chapters: 42 },
  { slug: "psalms", name: "Psalms", chapters: 150 },
  { slug: "proverbs", name: "Proverbs", chapters: 31 },
  { slug: "ecclesiastes", name: "Ecclesiastes", chapters: 12 },
  { slug: "song-of-solomon", name: "Song of Solomon", chapters: 8 },
  { slug: "isaiah", name: "Isaiah", chapters: 66 },
  { slug: "jeremiah", name: "Jeremiah", chapters: 52 },
  { slug: "lamentations", name: "Lamentations", chapters: 5 },
  { slug: "ezekiel", name: "Ezekiel", chapters: 48 },
  { slug: "daniel", name: "Daniel", chapters: 12 },
  { slug: "hosea", name: "Hosea", chapters: 14 },
  { slug: "joel", name: "Joel", chapters: 3 },
  { slug: "amos", name: "Amos", chapters: 9 },
  { slug: "obadiah", name: "Obadiah", chapters: 1 },
  { slug: "jonah", name: "Jonah", chapters: 4 },
  { slug: "micah", name: "Micah", chapters: 7 },
  { slug: "nahum", name: "Nahum", chapters: 3 },
  { slug: "habakkuk", name: "Habakkuk", chapters: 3 },
  { slug: "zephaniah", name: "Zephaniah", chapters: 3 },
  { slug: "haggai", name: "Haggai", chapters: 2 },
  { slug: "zechariah", name: "Zechariah", chapters: 14 },
  { slug: "malachi", name: "Malachi", chapters: 4 },
];

export async function generateStaticParams() {
  const params: { book: string; chapter: string }[] = [];

  for (const book of OT_BOOKS) {
    for (let i = 1; i <= book.chapters; i++) {
      params.push({
        book: book.slug,
        chapter: String(i),
      });
    }
  }

  return params;
}

function getBook(slug: string) {
  return OT_BOOKS.find((b) => b.slug === slug);
}

function getChapterData(book: string, chapter: string): ChapterData | null {
  const filePath = path.join(
    DATA_DIR,
    "bible",
    "ot",
    book,
    `${chapter}.json`
  );

  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getLexicon(): Record<string, LexiconEntry> {
  const filePath = path.join(DATA_DIR, "lexicon", "hebrew_strongs.json");

  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function commentaryExists(book: string, chapter: string) {
  const filePath = path.join(
    DATA_DIR,
    "commentary",
    "ot",
    book,
    `${chapter}.json`
  );

  return fs.existsSync(filePath);
}

export default async function OTChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const resolvedParams = await params;

  const book = getBook(resolvedParams.book);
  if (!book) notFound();

  const chapterNum = Number(resolvedParams.chapter);

  if (
    !Number.isInteger(chapterNum) ||
    chapterNum < 1 ||
    chapterNum > book.chapters
  ) {
    notFound();
  }

  const data = getChapterData(resolvedParams.book, resolvedParams.chapter);
  if (!data) notFound();

  const lexicon = getLexicon();

  const hasCommentary = commentaryExists(
    resolvedParams.book,
    resolvedParams.chapter
  );

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < book.chapters ? chapterNum + 1 : null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/bible"
        className="mb-4 inline-block rounded-lg border-2 border-white px-5 py-3 text-base font-bold tracking-wide transition hover:bg-white hover:text-black"
      >
        ← Back to Bible
      </Link>

      <h1 className="text-4xl font-bold">
        {book.name} {chapterNum}
      </h1>

      {hasCommentary && (
        <div className="mt-4">
          <Link
            href={`/commentary/ot/${resolvedParams.book}/${resolvedParams.chapter}`}
            className="inline-block rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Read Chapter Commentary →
          </Link>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        {prevChapter && (
          <Link
            href={`/bible/ot/${resolvedParams.book}/${prevChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            ← Previous Chapter
          </Link>
        )}

        {nextChapter && (
          <Link
            href={`/bible/ot/${resolvedParams.book}/${nextChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Next Chapter →
          </Link>
        )}
      </div>

      <div className="mt-10 space-y-10">
        {data.verses.map((verse) => (
          <section key={verse.reference} className="rounded-lg border p-5">
            <h2 className="text-xl font-bold">
              {verse.kjv_reference ?? verse.reference}
            </h2>

            <VerseWordStudy
              verseReference={verse.reference}
              words={verse.words}
              lexicon={lexicon}
            />

            <p className="mt-4 text-lg leading-8">{verse.translation}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/bible"
          className="inline-block rounded-lg border-2 border-white px-5 py-3 text-base font-bold tracking-wide transition hover:bg-white hover:text-black"
        >
          ← Back to Bible
        </Link>

        {prevChapter && (
          <Link
            href={`/bible/ot/${resolvedParams.book}/${prevChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            ← Previous Chapter
          </Link>
        )}

        {nextChapter && (
          <Link
            href={`/bible/ot/${resolvedParams.book}/${nextChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Next Chapter →
          </Link>
        )}
      </div>
    </main>
  );
}