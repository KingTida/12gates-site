import Link from "next/link";

export default function Resources() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-bold">Resources</h1>

      <p className="mt-4 max-w-3xl text-stone-300">
        This page contains free resources, datasets, and tools used to help build
        this platform. Full credit is given to the original creators and
        contributors.
      </p>

      {/* Section: Data Sources */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Core Data Sources</h2>

        <div className="mt-5 grid gap-4">
          <a
            href="https://github.com/STEPBible/STEPBible-Data"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 p-4 transition hover:border-white"
          >
            <h3 className="text-lg font-bold">STEPBible Data</h3>
            <p className="mt-1 text-sm text-stone-300">
              Primary dataset for biblical texts, Strong's references, and
              linguistic data.
            </p>
          </a>

          <a
            href="https://github.com/Clear-Bible/macula-hebrew/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 p-4 transition hover:border-white"
          >
            <h3 className="text-lg font-bold">Macula Hebrew</h3>
            <p className="mt-1 text-sm text-stone-300">
              Annotated Hebrew Bible dataset with detailed linguistic structure.
            </p>
          </a>

          <a
            href="https://github.com/openscriptures/morphhb"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 p-4 transition hover:border-white"
          >
            <h3 className="text-lg font-bold">Open Scriptures MorphHB</h3>
            <p className="mt-1 text-sm text-stone-300">
              Morphologically tagged Hebrew Bible text.
            </p>
          </a>

          <a
            href="https://github.com/openscriptures/strongs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 p-4 transition hover:border-white"
          >
            <h3 className="text-lg font-bold">Open Scriptures Strong's</h3>
            <p className="mt-1 text-sm text-stone-300">
              Strong’s Concordance data used for lexical references.
            </p>
          </a>
        </div>
      </section>

      {/* Future Expansion */}
      <section className="mt-12 rounded-2xl border border-white/20 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">More Coming Soon</h2>

        <p className="mt-2 text-stone-300">
          Additional study materials, downloads, and curated resources will be
          added over time.
        </p>
      </section>
    </main>
  );
}