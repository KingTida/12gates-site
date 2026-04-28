import Link from "next/link";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
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

function TestamentSection({
  title,
  testament,
  books,
  defaultOpen = false,
}: {
  title: string;
  testament: "ot" | "nt";
  books: { slug: string; name: string; chapters: number }[];
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="rounded-xl border-2 border-white/50 p-5"
    >
      <summary className="cursor-pointer text-3xl font-bold">
        {title}
      </summary>

      <div className="mt-8 space-y-6">
        {books.map((book) => (
          <section
            key={book.slug}
            className="rounded-lg border-2 border-white/40 p-5"
          >
            <h2 className="text-2xl font-bold">
              <Link
                href={`/bible/${testament}/${book.slug}/1`}
                className="underline"
              >
                {book.name}
              </Link>
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(
                { length: book.chapters },
                (_, index) => index + 1
              ).map((chapter) => (
                <Link
                  key={chapter}
                  href={`/bible/${testament}/${book.slug}/${chapter}`}
                  className="rounded border-2 border-white/50 px-3 py-2 font-bold transition hover:border-white hover:bg-white hover:text-black"
                >
                  {chapter}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}

export default function BiblePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold">Bible</h1>

      <p className="mt-3 text-lg text-gray-300">
        Select a testament, book, and chapter.
      </p>

      <div className="mt-8 space-y-8">
        <TestamentSection
          title="Old Testament"
          testament="ot"
          books={OT_BOOKS}
          defaultOpen={true}
        />

        <TestamentSection
          title="New Testament"
          testament="nt"
          books={NT_BOOKS}
        />
      </div>
    </main>
  );
}