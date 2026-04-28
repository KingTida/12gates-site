"use client";

type LexiconEntry = {
  headword?: string | null;
  translit?: string | null;
  gloss?: string | null;
};

type WordStudyCardProps = {
  original: string;
  translit?: string;
  gloss?: string;
  strongs?: string | null;
  lexicon?: LexiconEntry | null;
};

export default function WordStudyCard({
  original,
  translit,
  gloss,
  strongs,
  lexicon,
}: WordStudyCardProps) {
  return (
    <details className="min-w-28 rounded border-2 border-white/40 p-3 text-center transition hover:border-white">
      <summary className="cursor-pointer list-none">
        <div className="text-2xl" dir="rtl">
          {original}
        </div>
        <div className="mt-1 text-sm">{translit}</div>
        <div className="mt-1 text-sm font-medium">{gloss}</div>
        {strongs && <div className="mt-1 text-xs text-gray-400">{strongs}</div>}
      </summary>

      <div className="mt-4 border-t border-white/30 pt-3 text-left text-sm">
        <div className="font-bold">Strong&apos;s Detail</div>

        {strongs ? (
          <>
            <p className="mt-2">
              <span className="font-semibold">Number:</span> {strongs}
            </p>

            {lexicon?.headword && (
              <p className="mt-1">
                <span className="font-semibold">Headword:</span>{" "}
                <span dir="rtl">{lexicon.headword}</span>
              </p>
            )}

            {lexicon?.translit && (
              <p className="mt-1">
                <span className="font-semibold">Lexicon translit:</span>{" "}
                {lexicon.translit}
              </p>
            )}

            {lexicon?.gloss && (
              <p className="mt-1">
                <span className="font-semibold">Definition:</span>{" "}
                {lexicon.gloss}
              </p>
            )}

            {!lexicon && (
              <p className="mt-2 text-gray-400">No lexicon entry found yet.</p>
            )}
          </>
        ) : (
          <p className="mt-2 text-gray-400">No Strong&apos;s number.</p>
        )}
      </div>
    </details>
  );
}