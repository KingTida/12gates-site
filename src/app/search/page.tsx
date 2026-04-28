import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export default function Search() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-bold">Search</h1>

      <p className="mt-4 max-w-3xl text-stone-300">
        The search system is currently under construction.
      </p>

      <section className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-6">
        <h2 className="text-2xl font-bold">Planned Features</h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300">
          <li>Bible text search across Old and New Testament</li>
          <li>Strong&apos;s number search (Hebrew and Greek)</li>
          <li>Word and phrase search across verses</li>
          <li>Future commentary and study search</li>
        </ul>
      </section>

      <section className="mt-6 rounded-2xl border border-white/20 p-6">
        <h2 className="text-xl font-bold">Goal</h2>

        <p className="mt-3 text-stone-300">
          The goal of the search system is to allow fast and structured access
          to Scripture, making it easier to locate verses, study specific words,
          and explore connections across the text.
        </p>
      </section>
    </main>
  );
}