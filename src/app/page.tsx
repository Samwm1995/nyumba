import Link from "next/link";
import Image from "next/image";
import { dialects } from "@/content/dialects";
import { pillars } from "@/content/culture";

export default function Home() {
  const vunjo = dialects.find((d) => d.slug === "vunjo")!;
  const phraseCount = vunjo.lessons.reduce((n, l) => n + (l.items?.length ?? 0) + (l.drills?.length ?? 0), 0);
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <Image src="/crest.png" alt="Nyumba ya Wachagga crest" width={520} height={520} priority className="mx-auto w-64 md:w-full" />
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Vijana wa Kichagga · Kivunjo</p>
          <h1 className="font-display mt-2 text-4xl font-black leading-tight text-navy md:text-5xl">
            Jifunze Kivunjo
          </h1>
          <p className="mt-2 text-lg font-semibold text-navy/80">Lugha ya Marangu · Kilema · Mamba · Mwika · Kirua Vunjo</p>
          <p className="mt-4 text-lg text-foreground/80">
            Salamu, maswali na majibu, namba na mazungumzo — {phraseCount} misemo ya Kivunjo kutoka kwa wazee wetu, tayari kujifunza kwenye simu yako.
            Learn the Vunjo dialect lesson by lesson, with flashcards that remember your progress.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/jifunze/vunjo/salamu" className="btn-primary">Anza somo la 1 · Salamu</Link>
            <Link href="/jifunze/vunjo" className="btn-secondary">Masomo yote</Link>
          </div>
          <p className="mt-3 text-sm text-foreground/70">Climbing Kilimanjaro? <Link href="/jumuiya" className="underline">Learn the greetings your guides use →</Link></p>
          <p className="mt-4 text-sm text-foreground/60">
            Kimachame, Kikibosho na Kirombo zinakuja — tunatafuta wazungumzaji. <Link href="/changia" className="underline">Changia sauti yako</Link>.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-navy">Lahaja · Dialects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dialects.map((d) => (
            <Link key={d.slug} href={`/jifunze/${d.slug}`} className="card p-5 hover:border-navy/40">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-navy">{d.name}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${d.status === "ready" ? "bg-navy text-ivory" : "bg-ivory text-coffee"}`}>
                  {d.status === "ready" ? "Ready" : "Collecting"}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/70">{d.area}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-navy">Utamaduni · Culture</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <Link key={p.key} href={`/utamaduni#${p.key}`} className="card p-5 hover:border-navy/40">
              <h3 className="font-display font-bold text-navy">{p.sw}</h3>
              <p className="mt-1 text-sm text-foreground/70">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="card bg-navy p-6 text-ivory md:p-8">
        <h2 className="font-display text-2xl font-bold">How it grows</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          <li><span className="font-display text-amber">1 · Wazee record</span><p className="mt-1 text-silver">Elders say the words, proverbs and stories in their own dialect.</p></li>
          <li><span className="font-display text-amber">2 · Vijana transcribe</span><p className="mt-1 text-silver">Young members write them down and add the Swahili and English.</p></li>
          <li><span className="font-display text-amber">3 · Wahakiki verify</span><p className="mt-1 text-silver">Two speakers of that dialect confirm it before it goes live, with the source named.</p></li>
        </ol>
      </section>
    </div>
  );
}
