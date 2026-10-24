import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, pillars } from "@/content/culture";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const pillar = pillars.find((p) => p.key === a.pillar)!;
  return (
    <article className="mx-auto max-w-2xl">
      <p className="text-sm text-foreground/60"><Link href="/utamaduni" className="underline">Utamaduni</Link> / {pillar.sw}</p>
      <h1 className="font-display mt-1 text-3xl font-black text-navy">{a.title}</h1>
      <p className="mt-2 text-lg text-foreground/80">{a.summary}</p>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {a.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {a.source && <p className="mt-6 text-sm text-foreground/60">Source: {a.source}</p>}
      <div className="card mt-8 bg-ivory p-4">
        <p className="font-semibold text-navy">Know more about this?</p>
        <p className="text-sm text-foreground/80">Add a correction, a story from your family, or a recording of an elder. <Link href={`/changia?topic=${a.slug}`} className="underline">Contribute →</Link></p>
      </div>
    </article>
  );
}
