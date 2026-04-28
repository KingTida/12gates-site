"use client";

import { useState } from "react";

type Word = {
  original?: string;
  translit?: string;
  gloss?: string;
  strongs?: string;
};

type VerseProps = {
  reference: string;
  words: Word[];
  translation?: string;
  commentary?: string;
};

function shortenGloss(gloss?: string): string {
  if (!gloss) return "—";
  const first = gloss.split(",")[0]?.trim();
  return first || gloss;
}

function cleanTranslit(translit?: string): string {
  if (!translit) return "—";
  return translit.replace(/'/g, "");
}

export default function Verse({
  reference,
  words,
  translation,
  commentary,
}: VerseProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
      <div className="space-y-4">
        <p className="text-sm text-stone-400">{reference}</p>

        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-3">
            {words.map((word, index) => (
              <button
                key={index}
                type="button"
                className="min-w-[120px] rounded-lg border border-stone-800 bg-stone-950/60 p-3 text-left transition hover:border-blue-500 hover:bg-stone-900"
                title={word.gloss || word.strongs || ""}
              >
                <div className="space-y-1">
                  <p className="text-xl font-medium text-stone-100">
                    {word.original || "—"}
                  </p>

                  <p className="text-sm italic text-stone-400">
                    {cleanTranslit(word.translit)}
                  </p>

                  <p className="text-sm text-stone-200">
                    {shortenGloss(word.gloss)}
                  </p>

                  {word.strongs && (
                    <p className="text-xs uppercase tracking-wide text-blue-400">
                      {word.strongs}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {translation && (
          <p className="text-base leading-7 text-stone-200">{translation}</p>
        )}

        {commentary && (
          <div className="pt-1">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-md border border-stone-700 px-3 py-1 text-sm text-stone-200 hover:bg-stone-800"
            >
              {open ? "Hide Commentary" : "Show Commentary"}
            </button>

            {open && (
              <div className="mt-3 rounded-lg border border-stone-800 bg-stone-950/60 p-3">
                <p className="text-sm leading-7 text-stone-300">{commentary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}