import Link from "next/link";
import Image from "next/image";
import { dialects } from "@/content/dialects";
import { pillars } from "@/content/culture";
import { Bi } from "@/components/lang";
import { Photo } from "@/components/photo";
import type { ImgKey } from "@/content/images";

const pillarPhoto: Record<string, ImgKey> = { mila: "chaggaDecember", historia: "marealle", chakula: "mbege", nyimbo: "mbegeSeller", ukoo: "marangu" };

export default function Home() {
  const vunjo = dialects.find((d) => d.slug === "vunjo")!;
  const phraseCount = vunjo.lessons.reduce((n, l) => n + (l.items?.length ?? 0) + (l.drills?.length ?? 0), 0);
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-navy text-ivory">
        <Photo k="hero" hero priority ratio="aspect-[16/10] sm:aspect-[21/9] md:aspect-[5/2]" sizes="100vw" className="rounded-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 md:p-8">
          <Image src="/crest.png" alt="" width={120} height={120} priority className="hidden w-20 shrink-0 sm:block md:w-28" />
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-amber md:text-sm">Vijana wa Kichagga · Kilimanjaro ni Kwetu</p>
            <h1 className="font-display mt-1 text-3xl font-black leading-tight md:text-5xl"><Bi sw="Jifunze Kichagga. Jue Uchagga." en="Learn Chagga. Know Chagga land." /></h1>
          </div>
        </div>
      </section>

      <section className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <Photo k="kibo" ratio="aspect-[4/3]" />
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Vijana wa Kichagga · Kivunjo</p>
          <h1 className="font-display mt-2 text-4xl font-black leading-tight text-navy md:text-5xl">
            <Bi sw="Jifunze Kivunjo" en="Learn Kivunjo" />
          </h1>
          <p className="mt-2 text-lg font-semibold text-navy/80"><Bi sw="Lugha ya Marangu · Kilema · Mamba · Mwika · Kirua Vunjo" en="The Chagga dialect of Marangu · Kilema · Mamba · Mwika · Kirua Vunjo" /></p>
          <p className="mt-4 text-lg text-foreground/80">
            <Bi sw={<>Salamu, maswali na majibu, namba na mazungumzo — {phraseCount} misemo ya Kivunjo kutoka kwa wazee wetu, tayari kujifunza kwenye simu yako.</>}
                en={<>Greetings, questions and answers, numbers and conversations — {phraseCount} Vunjo phrases from our elders, each in Kivunjo, Swahili and English, with flashcards that remember your progress.</>} />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/jifunze/vunjo/salamu" className="btn-primary"><Bi sw="Anza somo la 1 · Salamu" en="Start lesson 1 · Greetings" /></Link>
            <Link href="/jifunze/vunjo" className="btn-secondary"><Bi sw="Masomo yote" en="All lessons" /></Link>
          </div>
          <p className="mt-3 text-sm text-foreground/70"><Bi sw={<>Unapanda Kilimanjaro? <Link href="/jumuiya" className="underline">Jifunze salamu wanazotumia waongoza njia →</Link></>} en={<>Climbing Kilimanjaro? <Link href="/jumuiya" className="underline">Learn the greetings your guides use →</Link></>} /></p>
          <p className="mt-4 text-sm text-foreground/60">
            <Bi sw={<>Kimachame, Kikibosho na Kirombo zinakuja — tunatafuta wazungumzaji. <Link href="/changia" className="underline">Changia sauti yako</Link>.</>}
                en={<>Kimachame, Kikibosho and Kirombo are coming — we are looking for speakers. <Link href="/changia" className="underline">Add your voice</Link>.</>} />
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-navy"><Bi sw="Lahaja" en="Dialects" /></h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dialects.map((d) => (
            <Link key={d.slug} href={`/jifunze/${d.slug}`} className="card p-5 hover:border-navy/40">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-navy">{d.name}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${d.status === "ready" ? "bg-navy text-ivory" : "bg-ivory text-coffee"}`}>
                  {d.status === "ready" ? <Bi sw="Tayari" en="Ready" /> : <Bi sw="Inakusanywa" en="Collecting" />}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/70">{d.area}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-navy"><Bi sw="Utamaduni" en="Culture" /></h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <Link key={p.key} href={p.key === "ukoo" ? "/koo" : p.key === "nyimbo" ? "/nyimbo" : `/utamaduni#${p.key}`} className="card overflow-hidden hover:border-navy/40">
              <Photo k={pillarPhoto[p.key] ?? "mbege"} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 20vw, 50vw" className="!rounded-none" />
              <div className="p-4">
              <h3 className="font-display font-bold text-navy">{p.sw}</h3>
              <p className="mt-1 text-sm text-foreground/70">{p.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card bg-navy p-6 text-ivory md:p-8">
        <h2 className="font-display text-2xl font-bold"><Bi sw="Inavyokua" en="How it grows" /></h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          <li><span className="font-display text-amber">1 · Wazee record</span><p className="mt-1 text-silver"><Bi sw="Wazee wanasema maneno, methali na hadithi kwa lahaja yao." en="Elders say the words, proverbs and stories in their own dialect." /></p></li>
          <li><span className="font-display text-amber">2 · Vijana transcribe</span><p className="mt-1 text-silver"><Bi sw="Vijana wanaandika na kuongeza Kiswahili na Kiingereza." en="Young members write them down and add the Swahili and English." /></p></li>
          <li><span className="font-display text-amber">3 · Wahakiki verify</span><p className="mt-1 text-silver"><Bi sw="Wazungumzaji wawili wa lahaja hiyo wanathibitisha kabla ya kuchapishwa, na chanzo kinatajwa." en="Two speakers of that dialect confirm it before it goes live, with the source named." /></p></li>
        </ol>
      </section>
    </div>
  );
}
