import Link from "next/link";
import path from "path";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <section className="rounded-2xl border border-white/20 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-stone-400">
          12 Gates
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A Bible Study Platform for Reading, Word Study, and Commentary
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
          12 Gates is a growing Bible study platform built around full-chapter
          reading, interlinear Hebrew and Greek word study, Strong&apos;s
          references, and chapter commentary.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/bible"
            className="rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
          >
            Open the Bible
          </Link>

          <Link
            href="/studies"
            className="rounded-lg border-2 border-white/40 px-5 py-3 font-bold transition hover:border-white"
          >
            View Studies
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Current Tools</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Full Bible Reading</h3>
            <p className="mt-2 text-stone-300">
              Read full Old Testament and New Testament chapters with KJV text.
            </p>
          </div>

          <div className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Interlinear Word Study</h3>
            <p className="mt-2 text-stone-300">
              View Hebrew and Greek word cards with transliteration, contextual
              meaning, and Strong&apos;s numbers.
            </p>
          </div>

          <div className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Strong&apos;s References</h3>
            <p className="mt-2 text-stone-300">
              Open Strong&apos;s entries and view where words occur across
              Scripture.
            </p>
          </div>

          <div className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Commentary Pages</h3>
            <p className="mt-2 text-stone-300">
              Chapter commentary pages will be added over time as studies are
              written and refined.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">Site Updates</h2>

        <div className="mt-5 space-y-4">
          <article className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Initial Launch</h3>
            <p className="mt-2 text-stone-300">
              The core Bible study engine is live with full Bible chapter pages,
              interlinear word cards, Strong&apos;s definitions, and occurrence
              pages.
            </p>
          </article>

          <article className="rounded-xl border border-white/20 p-5">
            <h3 className="text-xl font-bold">Coming Next</h3>
            <p className="mt-2 text-stone-300">
              Free resources, written studies, chapter commentary, search tools,
              and deeper Strong&apos;s study features will be added gradually
              after launch.
            </p>
          </article>
        </div>
      </section>

<section className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-6">
  <h2 className="text-2xl font-bold">Stay Connected</h2>

  <p className="mt-3 text-stone-300">
    New content, insights, and studies are posted regularly. Follow updates,
    join discussions, and access all platforms below.
  </p>

  <div className="mt-5">
    <a
      href="https://linktr.ee/myresponse"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-lg border-2 border-white px-5 py-3 font-bold transition hover:bg-white hover:text-black"
    >
      View All Links
    </a>
  </div>
</section>
    </main>
  );
}