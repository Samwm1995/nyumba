"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { clanAreas, clanIntro, allClans } from "@/content/clans";
import { Bi, useLang } from "./lang";

export function ClansView() {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [zone, setZone] = useState<"all" | "Hai" | "Vunjo" | "Rombo">("all");
  const needle = q.trim().toLowerCase();
  const hits = useMemo(() => needle ? clanAreas.filter((a) => a.clans.some((c) => c.toLowerCase().includes(needle))) : [], [needle]);
  const areas = clanAreas.filter((a) => zone === "all" || a.zone === zone);
  const claim = (c: string) => `/changia?kind=clan&topic=${encodeURIComponent("ukoo:" + c)}`;

  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Utamaduni · Ukoo</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy"><Bi sw="Koo za Kichagga" en="Chagga clans" /></h1>
        <div className="mt-3 space-y-3 text-lg text-foreground/80">{(lang === "en" ? clanIntro.en : clanIntro.sw).map((p, i) => <p key={i}>{p}</p>)}</div>
      </div>

      <div className="card p-5">
        <label className="block">
          <span className="font-semibold text-navy"><Bi sw="Ukoo wako unatoka wapi? Andika jina la ukoo" en="Where is your clan from? Type a clan name" /></span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="mf. Makundi, Mushi, Mramba…" className="mt-2 w-full rounded-xl border border-silver p-3 text-lg" />
        </label>
        {needle && (
          <div className="mt-3 text-foreground/80">
            {hits.length ? (
              <ul className="space-y-1">
                {hits.map((a) => <li key={a.slug}>✓ <b>{a.clans.find((c) => c.toLowerCase().includes(needle))}</b> — {a.name} <span className="text-xs text-foreground/50">({a.zone})</span></li>)}
              </ul>
            ) : <p><Bi sw="Hatuna ukoo huu bado." en="We don't have this clan yet." /></p>}
            <Link href={claim(q.trim())} className="btn-amber mt-3 inline-block"><Bi sw={`Huu ni ukoo wangu — ongeza / sahihisha "${q.trim()}"`} en={`This is my clan — add / correct "${q.trim()}"`} /></Link>
          </div>
        )}
        <p className="mt-3 text-xs text-foreground/60"><Bi sw={`Koo ${allClans.length} kwenye orodha. Orodha ni rasimu ya jamii: kila ukoo unawekwa alama ya "umethibitishwa" baada ya wanachama wawili wa ukoo huo kuthibitisha eneo lake.`} en={`${allClans.length} clans listed. This is a community draft: a clan is marked verified once two of its members confirm its home area.`} /></p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "Hai", "Vunjo", "Rombo"] as const).map((z) => <button key={z} onClick={() => setZone(z)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${zone === z ? "bg-navy text-ivory" : "bg-silver/40 text-navy"}`}>{z === "all" ? (lang === "en" ? "All" : "Zote") : z}</button>)}
        <span className="self-center text-xs text-foreground/50"><Bi sw="Hai = magharibi · Vunjo = kati · Rombo = mashariki" en="Hai = west · Vunjo = centre · Rombo = east" /></span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((a) => (
          <section key={a.slug} id={a.slug} className="card p-5">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-navy">{a.name}</h2>
              <span className="rounded-full bg-ivory px-2 py-0.5 text-xs text-coffee">{a.zone}</span>
            </div>
            <p className="mt-1 text-sm text-foreground/70">{lang === "en" ? a.note_en : a.note_sw}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {a.clans.map((c) => (
                <li key={c}><Link href={claim(c)} title={lang === "en" ? "Confirm or correct" : "Thibitisha au sahihisha"} className={`inline-block rounded-lg border px-2.5 py-1 text-sm hover:border-navy ${needle && c.toLowerCase().includes(needle) ? "border-amber bg-amber/20 font-semibold" : "border-silver"}`}>{c}</Link></li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="card bg-navy p-6 text-ivory">
        <h2 className="font-display text-xl font-bold"><Bi sw="Tunachotafuta kwa kila ukoo" en="What we want for every clan" /></h2>
        <ul className="mt-2 grid gap-2 text-silver md:grid-cols-2">
          <li>• <Bi sw="Eneo la asili (mtaa, kata) na maeneo walikohamia" en="Home area (mtaa, ward) and where branches moved" /></li>
          <li>• <Bi sw="Maana ya jina na babu wa kwanza anayekumbukwa" en="Meaning of the name and the first remembered ancestor" /></li>
          <li>• <Bi sw="Miiko, alama au mnyama wa ukoo (kama ipo)" en="Taboos, emblem or clan animal (if any)" /></li>
          <li>• <Bi sw="Koo za jirani wasioana nao (mila ya kuoa nje ya ukoo)" en="Neighbouring clans one does not marry into (exogamy rules)" /></li>
          <li>• <Bi sw="Watu mashuhuri wa ukoo: Mangi, waalimu, wanaspoti, wafanyabiashara" en="Notable clan members: Mangi, teachers, athletes, business people" /></li>
          <li>• <Bi sw="Rekodi ya mzee akisimulia historia ya ukoo kwa lahaja" en="A recording of an elder telling the clan history in the dialect" /></li>
        </ul>
        <Link href="/changia?kind=clan" className="btn-amber mt-4 inline-block"><Bi sw="Changia historia ya ukoo wangu" en="Contribute my clan's history" /></Link>
      </div>
      <p className="text-xs text-foreground/50"><Bi sw="Vyanzo: Urithi Wetu Wachagga; orodha za majina ya Kichagga kwa maeneo (2013); Wikipedia — Chagga people (muundo wa ukoo, asili); maarifa ya jamii. Yote yanasubiri uthibitisho wa wanachama." en="Sources: Urithi Wetu Wachagga; published lists of Chagga surnames by area (2013); Wikipedia — Chagga people (clan structure, origins); community knowledge. All pending member verification." /></p>
    </div>
  );
}
