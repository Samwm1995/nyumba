"use client";
import Link from "next/link";
import { useLang, Bi } from "./lang";
import { articles, pillars } from "@/content/culture";
import { articlesSw, pillarsSw } from "@/content/culture-sw";

export function CultureIndex() {
  const { lang } = useLang();
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-black text-navy"><Bi sw="Utamaduni wa Kichagga" en="Chagga culture" /></h1>
        <p className="mt-2 max-w-2xl text-foreground/80">
          <Bi sw="Mila, historia, chakula, nyimbo na koo — makala fupi ambazo jamii inazipanua na kuzithibitisha. Kila moja inataja chanzo chake."
              en="Customs, history, food, songs and clans — short articles that the community expands and verifies. Every piece names its source." />
        </p>
      </div>
      {pillars.map((p) => {
        const list = articles.filter((a) => a.pillar === p.key);
        return (
          <section key={p.key} id={p.key} className="scroll-mt-20">
            <h2 className="font-display text-2xl font-bold text-navy">{lang === "en" ? p.name : p.sw} <span className="text-base font-normal text-foreground/50">· {lang === "en" ? p.sw : p.name}</span></h2>
            <p className="text-foreground/70">{lang === "en" ? p.blurb : pillarsSw[p.key]?.blurb ?? p.blurb}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {list.map((a) => {
                const sw = articlesSw[a.slug];
                return (
                  <Link key={a.slug} href={`/utamaduni/${a.slug}`} className="card p-5 hover:border-navy/40">
                    <h3 className="font-display font-bold text-navy">{lang === "en" || !sw ? a.title : sw.title}</h3>
                    <p className="mt-1 text-sm text-foreground/75">{lang === "en" || !sw ? a.summary : sw.summary}</p>
                  </Link>
                );
              })}
              {list.length === 0 && <p className="text-sm text-foreground/50"><Bi sw="Bado hakuna — kuwa wa kwanza kuchangia." en="Nothing here yet — be the first to contribute." /></p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function CultureArticle({ slug }: { slug: string }) {
  const { lang } = useLang();
  const a = articles.find((x) => x.slug === slug)!;
  const pillar = pillars.find((p) => p.key === a.pillar)!;
  const sw = articlesSw[slug];
  const useSw = lang !== "en" && !!sw;
  return (
    <article className="mx-auto max-w-2xl">
      <p className="text-sm text-foreground/60"><Link href="/utamaduni" className="underline">Utamaduni</Link> / {lang === "en" ? pillar.name : pillar.sw}</p>
      <h1 className="font-display mt-1 text-3xl font-black text-navy">{useSw ? sw.title : a.title}</h1>
      <p className="mt-2 text-lg text-foreground/80">{useSw ? sw.summary : a.summary}</p>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">{(useSw ? sw.body : a.body).map((p, i) => <p key={i}>{p}</p>)}</div>
      {a.source && <p className="mt-6 text-sm text-foreground/60"><Bi sw="Chanzo" en="Source" />: {a.source}</p>}
      <div className="card mt-8 bg-ivory p-4">
        <p className="font-semibold text-navy"><Bi sw="Unajua zaidi kuhusu hili?" en="Know more about this?" /></p>
        <p className="text-sm text-foreground/80"><Bi sw="Ongeza masahihisho, hadithi ya familia yako, au rekodi ya mzee." en="Add a correction, a story from your family, or a recording of an elder." /> <Link href={`/changia?topic=${a.slug}`} className="underline"><Bi sw="Changia →" en="Contribute →" /></Link></p>
      </div>
    </article>
  );
}
