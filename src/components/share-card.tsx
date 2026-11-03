"use client";
import { useState } from "react";
import { Bi } from "./lang";

/** "Shiriki" — renders the lesson card on the server and opens the phone's share sheet (WhatsApp, IG, status…). */
export function ShareCard({ dialect, lesson, parts = 1, title }: { dialect: string; lesson: string; parts?: number; title: string }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const share = async (f: "story" | "square", p: number) => {
    const key = `${f}${p}`;
    setBusy(key);
    const url = `/api/card?d=${dialect}&l=${lesson}&f=${f}&p=${p}`;
    try {
      const blob = await fetch(url).then((r) => r.blob());
      const file = new File([blob], `nyumba-${lesson}-${f}-${p}.png`, { type: "image/png" });
      const text = `${title} — Jifunze Kichagga: https://www.nyumbayawachagga.co.tz/jifunze/${dialect}/${lesson}`;
      if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text });
      } else {
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
      }
    } catch { /* user cancelled */ }
    setBusy(null);
  };

  return (
    <div className="relative">
      <button onClick={() => (parts === 1 ? share("story", 1) : setOpen((o) => !o))} className="btn-amber flex items-center gap-2" disabled={!!busy}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v14" /></svg>
        {busy ? "…" : <Bi sw="Shiriki picha" en="Share as image" />}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-2xl border border-silver bg-white p-3 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60"><Bi sw="Status / Story (wima)" en="Status / Story (tall)" /></p>
          <div className="mt-1 flex flex-wrap gap-1">{Array.from({ length: parts }, (_, i) => <button key={i} onClick={() => share("story", i + 1)} className="rounded-lg border border-silver px-3 py-1 text-sm hover:border-navy">{i + 1}</button>)}</div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground/60"><Bi sw="Post (mraba)" en="Post (square)" /></p>
          <div className="mt-1 flex flex-wrap gap-1">{Array.from({ length: Math.ceil((parts * 6) / 4) }, (_, i) => <button key={i} onClick={() => share("square", i + 1)} className="rounded-lg border border-silver px-3 py-1 text-sm hover:border-navy">{i + 1}</button>)}</div>
          <p className="mt-2 text-[11px] text-foreground/50"><Bi sw="Kwenye simu inafungua WhatsApp/Instagram moja kwa moja; kwenye kompyuta inapakua picha." en="On a phone this opens WhatsApp/Instagram directly; on a computer it downloads the image." /></p>
        </div>
      )}
    </div>
  );
}
