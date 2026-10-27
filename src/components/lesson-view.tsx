"use client";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/content/types";

type Card = { en: string; sw?: string; ch: string; yes?: string; no?: string; reply?: string; audio?: string };

function toCards(l: Lesson): Card[] {
  const a: Card[] = (l.items ?? []).map((i) => ({ en: i.en, sw: i.sw, ch: i.ch, reply: i.reply, audio: i.audio }));
  const b: Card[] = (l.drills ?? []).map((d) => ({ en: d.en, sw: d.sw, ch: d.q, yes: d.yes, no: d.no, audio: d.audio }));
  return [...a, ...b];
}

export function LessonView({ lesson, dialect }: { lesson: Lesson; dialect: string }) {
  const cards = useMemo(() => toCards(lesson), [lesson]);
  const [mode, setMode] = useState<"list" | "cards">("list");
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const key = `nyumba:${dialect}:${lesson.slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setKnown(new Set(JSON.parse(raw)));
    } catch {}
  }, [key]);

  const mark = (ok: boolean) => {
    const s = new Set(known);
    if (ok) s.add(i); else s.delete(i);
    setKnown(s);
    try { localStorage.setItem(key, JSON.stringify([...s])); } catch {}
    setFlipped(false);
    setI((i + 1) % cards.length);
  };

  const c = cards[i];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button className={mode === "list" ? "btn-primary" : "btn-secondary"} onClick={() => setMode("list")}>List</button>
        <button className={mode === "cards" ? "btn-primary" : "btn-secondary"} onClick={() => setMode("cards")}>Flashcards</button>
        <span className="ml-auto text-sm text-foreground/60">{known.size}/{cards.length} learned</span>
      </div>

      {mode === "list" ? (
        <ol className="space-y-2">
          {cards.map((c, idx) => (
            <li key={idx} className={`card p-4 ${known.has(idx) ? "border-amber/60" : ""}`}>
              <p className="ch text-xl">{c.ch}</p>
              {c.sw && <p className="text-base font-semibold text-navy/80">{c.sw}</p>}
              <p className="text-sm text-foreground/60">{c.en}</p>
              {c.reply && <p className="mt-1 text-sm text-foreground/80">↳ {c.reply}</p>}
              {c.yes && (
                <div className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                  <p><span className="rounded bg-navy px-1.5 py-0.5 text-xs text-ivory">Yee</span> <span className="ch font-normal">{c.yes}</span></p>
                  {c.no && <p><span className="rounded bg-coffee px-1.5 py-0.5 text-xs text-ivory">Ote</span> <span className="ch font-normal">{c.no}</span></p>}
                </div>
              )}
              {c.audio ? (
                <audio controls preload="none" src={c.audio} className="mt-2 h-9 w-full" />
              ) : (
                <p className="mt-2 text-xs text-foreground/50">No audio yet — speakers can add it under Changia.</p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <div className="mx-auto max-w-xl">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="card flex min-h-64 w-full flex-col items-center justify-center p-6 text-center"
            aria-live="polite"
          >
            {!flipped ? (
              <>
                <p className="text-sm uppercase tracking-wider text-foreground/50">Kiswahili · English</p>
                <p className="mt-2 text-2xl font-semibold text-navy">{c.sw ?? c.en}</p>
                {c.sw && <p className="mt-1 text-base text-foreground/60">{c.en}</p>}
                <p className="mt-6 text-sm text-foreground/50">Tap to reveal</p>
              </>
            ) : (
              <>
                <p className="text-sm uppercase tracking-wider text-foreground/50">{dialect}</p>
                <p className="ch mt-2 text-3xl">{c.ch}</p>
                {c.reply && <p className="mt-3 text-sm text-foreground/80">↳ {c.reply}</p>}
                {c.yes && <p className="mt-3 text-sm"><strong>Yee:</strong> {c.yes}</p>}
                {c.no && <p className="text-sm"><strong>Ote:</strong> {c.no}</p>}
              </>
            )}
          </button>
          <div className="mt-3 flex items-center justify-between gap-2">
            <button className="btn-secondary" onClick={() => { setFlipped(false); setI((i - 1 + cards.length) % cards.length); }}>←</button>
            <span className="text-sm text-foreground/60">{i + 1} / {cards.length}</span>
            <button className="btn-secondary" onClick={() => { setFlipped(false); setI((i + 1) % cards.length); }}>→</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="btn-secondary" onClick={() => mark(false)}>Still learning</button>
            <button className="btn-amber" onClick={() => mark(true)}>Got it ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}
