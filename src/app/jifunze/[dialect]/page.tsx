import Link from "next/link";
import { notFound } from "next/navigation";
import { dialects, getDialect } from "@/content/dialects";

export function generateStaticParams() {
  return dialects.map((d) => ({ dialect: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ dialect: string }> }) {
  const { dialect } = await params;
  const d = getDialect(dialect);
  return { title: d?.name ?? "Dialect" };
}

export default async function DialectPage({ params }: { params: Promise<{ dialect: string }> }) {
  const { dialect } = await params;
  const d = getDialect(dialect);
  if (!d) notFound();
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-foreground/60"><Link href="/jifunze" className="underline">Jifunze</Link> / {d.name}</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy">{d.name}</h1>
        <p className="text-foreground/60">{d.area}</p>
        <p className="mt-3 max-w-2xl text-foreground/80">{d.description}</p>
        {d.status !== "ready" && (
          <div className="card mt-4 border-amber/50 bg-amber/10 p-4">
            <p className="font-semibold text-navy">We need {d.name} speakers.</p>
            <p className="text-sm text-foreground/80">Lessons for this dialect are built from recordings. If you speak it, <Link href="/changia" className="underline">add your voice</Link> — even ten greetings help.</p>
          </div>
        )}
      </div>

      {d.pronunciation && (
        <section className="card p-5">
          <h2 className="font-display text-lg font-bold text-navy">Sounds to practise</h2>
          <ul className="mt-2 space-y-2">
            {d.pronunciation.map((p) => (
              <li key={p.sound}><span className="ch text-xl">{p.sound}</span> <span className="text-foreground/80">— {p.note}</span></li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-2xl font-bold text-navy">Masomo · Lessons</h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2">
          {d.lessons.map((l, i) => {
            const n = (l.items?.length ?? 0) + (l.drills?.length ?? 0);
            return (
              <li key={l.slug}>
                <Link href={`/jifunze/${d.slug}/${l.slug}`} className="card flex items-center gap-4 p-4 hover:border-navy/40">
                  <span className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-ivory">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-navy">{l.title}</span>
                    <span className="text-sm text-foreground/60">{n} items</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {d.grammar && (
        <section>
          <h2 className="font-display text-2xl font-bold text-navy">Sarufi · Grammar</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {d.grammar.map((g) => (
              <details key={g.title} className="card p-4">
                <summary className="cursor-pointer font-semibold text-navy">{g.title}</summary>
                <p className="mt-2 text-sm text-foreground/80">{g.body}</p>
                <dl className="mt-3 space-y-2">
                  {g.examples.map(([ch, en]) => (
                    <div key={ch}><dt className="ch">{ch}</dt><dd className="text-sm text-foreground/70">{en}</dd></div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </section>
      )}

      {d.conversations && (
        <section>
          <h2 className="font-display text-2xl font-bold text-navy">Mazungumzo · Conversations</h2>
          <div className="mt-3 space-y-3">
            {d.conversations.map((c) => (
              <details key={c.title} className="card p-4">
                <summary className="cursor-pointer font-semibold text-navy">{c.title}</summary>
                <ol className="mt-3 space-y-3">
                  {c.lines.map(([ch, en, sw], i) => (
                    <li key={i} className={`rounded-xl p-3 ${i % 2 ? "bg-ivory" : "bg-silver/30"}`}>
                      <p className="ch">{ch}</p>
                      {sw && <p className="text-sm font-semibold text-navy/80">{sw}</p>}
                      <p className="text-sm text-foreground/70">{en}</p>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </section>
      )}

      {d.texts && (
        <section>
          <h2 className="font-display text-2xl font-bold text-navy">Maandiko · Texts</h2>
          {d.texts.map((t) => (
            <div key={t.title} className="card mt-3 p-5">
              <h3 className="font-display font-bold text-navy">{t.title}</h3>
              <div className="mt-3 space-y-1">{t.lines.map((l, i) => <p key={i} className="ch font-normal">{l}</p>)}</div>
            </div>
          ))}
        </section>
      )}

      {d.source && (
        <p className="text-sm text-foreground/60">
          Source: <em>{d.source.title}</em>, {d.source.authors} ({d.source.year}). {d.source.note}
        </p>
      )}
    </div>
  );
}
