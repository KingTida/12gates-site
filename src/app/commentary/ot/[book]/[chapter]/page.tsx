import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";


const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

type CommentaryBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

type CommentarySection = {
  heading: string;
  verse?: string;
  body: CommentaryBlock[];
};

type CommentaryData = {
  title: string;
  summary?: string;
  sections: CommentarySection[];
};

function getCommentary(book: string, chapter: string): CommentaryData | null {
  const filePath = path.join(
    DATA_DIR,
    "commentary",
    "ot",
    book,
    `${chapter}.json`
  );

  if (!fs.existsSync(filePath)) return null;

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function renderBlock(block: CommentaryBlock, index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={index} className="text-lg leading-8">
        {block.text}
      </p>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={index}
        className="border-l-4 border-white/60 pl-4 text-lg italic leading-8 text-gray-300"
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="list-disc space-y-2 pl-6 text-lg leading-8">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default async function CommentaryChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const resolvedParams = await params;

  const commentary = getCommentary(
    resolvedParams.book,
    resolvedParams.chapter
  );

  if (!commentary) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex flex-wrap gap-4">
        <Link
          href="/bible"
          className="rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
        >
          ← Back to Bible
        </Link>

        <Link
          href={`/bible/ot/${resolvedParams.book}/${resolvedParams.chapter}`}
          className="rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
        >
          ← Back to Chapter
        </Link>
      </div>

      <h1 className="text-4xl font-bold">{commentary.title}</h1>

      {commentary.summary && (
        <p className="mt-4 rounded-lg border-2 border-white/40 p-5 text-lg leading-8 text-gray-300">
          {commentary.summary}
        </p>
      )}

      <div className="mt-10 space-y-10">
        {commentary.sections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            id={section.verse}
            className="rounded-lg border border-white/30 p-6"
          >
            <h2 className="text-2xl font-bold">{section.heading}</h2>

            {section.verse && (
              <Link
                href={`/bible/ot/${resolvedParams.book}/${resolvedParams.chapter}`}
                className="mt-2 inline-block text-sm font-bold underline"
              >
                View {section.verse} in Bible →
              </Link>
            )}

            <div className="mt-5 space-y-5">
              {section.body.map((block, blockIndex) =>
                renderBlock(block, blockIndex)
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}