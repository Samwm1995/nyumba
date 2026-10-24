import Link from "next/link";
import { notFound } from "next/navigation";
import { dialects, getDialect } from "@/content/dialects";
import { LessonView } from "@/components/lesson-view";

export function generateStaticParams() {
  return dialects.flatMap((d) => d.lessons.map((l) => ({ dialect: d.slug, lesson: l.slug })));
}

export default async function LessonPage({ params }: { params: Promise<{ dialect: string; lesson: string }> }) {
  const { dialect, lesson } = await params;
  const d = getDialect(dialect);
  const l = d?.lessons.find((x) => x.slug === lesson);
  if (!d || !l) notFound();
  const idx = d.lessons.indexOf(l);
  const prev = d.lessons[idx - 1];
  const next = d.lessons[idx + 1];
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground/60">
          <Link href="/jifunze" className="underline">Jifunze</Link> / <Link href={`/jifunze/${d.slug}`} className="underline">{d.name}</Link> / Lesson {idx + 1}
        </p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy">{l.title}</h1>
        {l.intro && <p className="mt-2 max-w-2xl text-foreground/80">{l.intro}</p>}
      </div>
      <LessonView lesson={l} dialect={d.name} />
      <div className="flex justify-between gap-3 border-t border-silver/60 pt-4">
        {prev ? <Link href={`/jifunze/${d.slug}/${prev.slug}`} className="btn-secondary">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/jifunze/${d.slug}/${next.slug}`} className="btn-primary">{next.title} →</Link> : <Link href={`/jifunze/${d.slug}`} className="btn-primary">Done ✓</Link>}
      </div>
    </div>
  );
}
