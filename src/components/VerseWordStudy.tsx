"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Word = {
  word_index?: number;
  original: string;
  translit?: string;
  gloss?: string;
  strongs?: string | null;
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

type VerseWordStudyProps = {
  verseReference: string;
  words: Word[];
  lexicon: Record<string, LexiconEntry>;
};

export default function VerseWordStudy({
  verseReference,
  words,
  lexicon,
}: VerseWordStudyProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  function selectWord(index: number) {
    const nextIndex = selectedIndex === index ? null : index;
    setSelectedIndex(nextIndex);

    if (nextIndex !== null) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  const selectedWord = selectedIndex !== null ? words[selectedIndex] : null;

  const selectedLexicon =
    selectedWord?.strongs ? lexicon[selectedWord.strongs] : null;

  return (
    <div className="relative mt-4">
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap">
        {words.map((word, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={`${verseReference}-${index}`}
              type="button"
              onClick={() => selectWord(index)}
              className={`relative z-10 cursor-pointer touch-manipulation select-none rounded-lg border-2 p-3 text-center transition active:scale-95 ${
                isSelected
                  ? "border-white bg-white text-black"
                  : "border-white/50 bg-black text-white hover:border-white"
              }`}
            >
              <div className="text-3xl leading-tight" dir="auto">
                {word.original}
              </div>

              {word.translit && (
                <div className="mt-2 text-sm leading-tight">
                  {word.translit}
                </div>
              )}

              {word.gloss && (
                <div className="mt-2 text-sm font-medium leading-tight">
                  {word.gloss}
                </div>
              )}

              {word.strongs && (
                <div className="mt-2 text-xs font-bold">{word.strongs}</div>
              )}
            </button>
          );
        })}
      </div>

      {selectedWord && (
        <div
          ref={detailRef}
          className="relative z-20 mt-5 scroll-mt-24 rounded-lg border-2 border-white/60 bg-black p-5"
        >
          <h3 className="text-xl font-bold">Strong&apos;s Detail</h3>

          <div className="mt-4 space-y-2 text-sm leading-6">
            <p>
              <span className="font-semibold">Selected word:</span>{" "}
              <span dir="auto">{selectedWord.original}</span>
            </p>

            {selectedWord.translit && (
              <p>
                <span className="font-semibold">Transliteration:</span>{" "}
                {selectedWord.translit}
              </p>
            )}

            {selectedWord.gloss && (
              <p>
                <span className="font-semibold">Contextual meaning:</span>{" "}
                {selectedWord.gloss}
              </p>
            )}

            {selectedWord.strongs && (
              <p>
                <span className="font-semibold">Strong&apos;s:</span>{" "}
                <Link
                  href={`/bible/strongs/${selectedWord.strongs}`}
                  className="font-bold underline"
                >
                  {selectedWord.strongs}
                </Link>
              </p>
            )}

            {selectedLexicon?.headword && (
              <p>
                <span className="font-semibold">Headword:</span>{" "}
                <span dir="auto">{selectedLexicon.headword}</span>
              </p>
            )}

            {selectedLexicon?.translit && (
              <p>
                <span className="font-semibold">Lexicon translit:</span>{" "}
                {selectedLexicon.translit}
              </p>
            )}

            {selectedLexicon?.pronunciation && (
              <p>
                <span className="font-semibold">Pronunciation:</span>{" "}
                {selectedLexicon.pronunciation}
              </p>
            )}

            {selectedLexicon?.derivation && (
              <p>
                <span className="font-semibold">Derivation:</span>{" "}
                {selectedLexicon.derivation}
              </p>
            )}

            {(selectedLexicon?.definition || selectedLexicon?.gloss) && (
              <p>
                <span className="font-semibold">Definition:</span>{" "}
                {selectedLexicon.definition || selectedLexicon.gloss}
              </p>
            )}

            {selectedLexicon?.kjv_def && (
              <p>
                <span className="font-semibold">KJV usage:</span>{" "}
                {selectedLexicon.kjv_def}
              </p>
            )}

            {selectedWord.strongs && !selectedLexicon && (
              <p className="text-gray-400">Extended STEP identifier; standard lexicon entry not available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}