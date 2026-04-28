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

const NT_BOOKS = [
  { slug: "matthew", name: "Matthew", chapters: 28 },
  { slug: "mark", name: "Mark", chapters: 16 },
  { slug: "luke", name: "Luke", chapters: 24 },
  { slug: "john", name: "John", chapters: 21 },
  { slug: "acts", name: "Acts", chapters: 28 },
  { slug: "romans", name: "Romans", chapters: 16 },
  { slug: "1-corinthians", name: "1 Corinthians", chapters: 16 },
  { slug: "2-corinthians", name: "2 Corinthians", chapters: 13 },
  { slug: "galatians", name: "Galatians", chapters: 6 },
  { slug: "ephesians", name: "Ephesians", chapters: 6 },
  { slug: "philippians", name: "Philippians", chapters: 4 },
  { slug: "colossians", name: "Colossians", chapters: 4 },
  { slug: "1-thessalonians", name: "1 Thessalonians", chapters: 5 },
  { slug: "2-thessalonians", name: "2 Thessalonians", chapters: 3 },
  { slug: "1-timothy", name: "1 Timothy", chapters: 6 },
  { slug: "2-timothy", name: "2 Timothy", chapters: 4 },
  { slug: "titus", name: "Titus", chapters: 3 },
  { slug: "philemon", name: "Philemon", chapters: 1 },
  { slug: "hebrews", name: "Hebrews", chapters: 13 },
  { slug: "james", name: "James", chapters: 5 },
  { slug: "1-peter", name: "1 Peter", chapters: 5 },
  { slug: "2-peter", name: "2 Peter", chapters: 3 },
  { slug: "1-john", name: "1 John", chapters: 5 },
  { slug: "2-john", name: "2 John", chapters: 1 },
  { slug: "3-john", name: "3 John", chapters: 1 },
  { slug: "jude", name: "Jude", chapters: 1 },
  { slug: "revelation", name: "Revelation", chapters: 22 },
];

export async function generateStaticParams() {
  const params: { book: string; chapter: string }[] = [];

  for (const book of NT_BOOKS) {
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
  return NT_BOOKS.find((b) => b.slug === slug);
}

function getChapterData(book: string, chapter: string): ChapterData | null {
  const filePath = path.join(
    DATA_DIR,
    "bible",
    "nt",
    book,
    `${chapter}.json`
  );

  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getLexicon(): Record<string, LexiconEntry> {
  const filePath = path.join(DATA_DIR, "lexicon", "greek_strongs.json");

  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function commentaryExists(book: string, chapter: string) {
  const filePath = path.join(
    DATA_DIR,
    "commentary",
    "nt",
    book,
    `${chapter}.json`
  );

  return fs.existsSync(filePath);
}

export default async function NTChapterPage({
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
            href={`/commentary/nt/${resolvedParams.book}/${resolvedParams.chapter}`}
            className="inline-block rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Read Chapter Commentary →
          </Link>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4">
        {prevChapter && (
          <Link
            href={`/bible/nt/${resolvedParams.book}/${prevChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            ← Previous Chapter
          </Link>
        )}

        {nextChapter && (
          <Link
            href={`/bible/nt/${resolvedParams.book}/${nextChapter}`}
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
            href={`/bible/nt/${resolvedParams.book}/${prevChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            ← Previous Chapter
          </Link>
        )}

        {nextChapter && (
          <Link
            href={`/bible/nt/${resolvedParams.book}/${nextChapter}`}
            className="rounded border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Next Chapter →
          </Link>
        )}
      </div>
    </main>
  );
}