"use client";

import { useState } from "react";

export default function VerseCommentary({
  notes,
}: {
  notes: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm underline"
      >
        {open ? "Hide Commentary" : "Show Commentary"}
      </button>

      {open && (
        <div className="mt-3 rounded border-2 border-white/40 p-4 text-sm">
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li key={i}>• {note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}