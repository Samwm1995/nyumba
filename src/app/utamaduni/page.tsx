import Link from "next/link";
import { articles, pillars } from "@/content/culture";

export const metadata = { title: "Utamaduni · Culture" };

export default function Culture() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-black text-navy">Utamaduni wa Kichagga</h1>
        <p className="mt-2 max-w-2xl text-foreground/80">
          Customs, history, food, songs and clans — short articles that the community expands and verifies. Every piece names its source.
        </p>
      </div>
      {pillars.map((p) => {
        const list = articles.filter((a) => a.pillar === p.key);
        return (
          <section key={p.key} id={p.key} className="scroll-mt-20">
            <h2 className="font-display text-2xl font-bold text-navy">{p.sw} <span className="text-base font-normal text-foreground/50">· {p.name}</span></h2>
            <p className="text-foreground/70">{p.blurb}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {list.map((a) => (
                <Link key={a.slug} href={`/utamaduni/${a.slug}`} className="card p-5 hover:border-navy/40">
                  <h3 className="font-display font-bold text-navy">{a.title}</h3>
                  <p className="mt-1 text-sm text-foreground/75">{a.summary}</p>
                </Link>
              ))}
              {list.length === 0 && <p className="text-sm text-foreground/50">Nothing here yet — be the first to contribute.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
