import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export default function Studies() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-bold">Studies</h1>

      <p className="mt-4 max-w-3xl text-stone-300">
        This section will grow over time with specialized Bible studies,
        written notes, research, and resources that I have created or found
        worth sharing.
      </p>

      <section className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-6">
        <h2 className="text-2xl font-bold">Coming Soon</h2>

        <p className="mt-3 text-stone-300">
          Future studies may include chapter studies, topical studies, original
          language notes, historical background, and reflections from ongoing
          Bible reading.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-white/20 p-6">
        <h2 className="text-xl font-bold">Purpose</h2>

        <p className="mt-3 text-stone-300">
          The goal of this page is to collect helpful study material in one
          place so readers can go deeper beyond the chapter pages.
        </p>
      </section>
    </main>
  );
}