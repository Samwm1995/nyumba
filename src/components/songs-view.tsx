"use client";
import Link from "next/link";
import { useState } from "react";
import { songs, type Song } from "@/content/songs";
import { Bi, useLang } from "./lang";

const kindLabel = { asili: ["Asili", "Traditional"], kisasa: ["Kisasa", "Contemporary"], injili: ["Injili", "Gospel"] } as const;

export function SongsView() {
  const { lang } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Utamaduni · Shiimbo</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy"><Bi sw="Nyimbo za Kichagga" en="Chagga songs" /></h1>
        <p className="mt-3 text-lg text-foreground/80">
          <Bi sw="Sikiliza, kisha tusaidie kuandika maneno. Kila wimbo una nafasi ya maneno kwa Kichagga, Kiswahili na Kiingereza — mistari inayothibitishwa na wazungumzaji wawili inachapishwa hapa na jina lako linatajwa."
              en="Listen, then help us write the words down. Every song has a slot for the lyrics in Chagga, Swahili and English — lines confirmed by two speakers are published here with your name credited." />
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {songs.map((s) => <SongCard key={s.slug} s={s} lang={lang} playing={open === s.slug} onPlay={() => setOpen(s.slug)} />)}
      </div>

      <div className="card bg-ivory p-5">
        <p className="font-semibold text-navy"><Bi sw="Unajua wimbo wa Kichagga ambao haupo hapa?" en="Know a Chagga song that isn't here?" /></p>
        <p className="text-sm text-foreground/80"><Bi sw="Nyimbo za harusi, za kutwanga, za ngoma, nyimbo za kanisani kwa Kichagga, au wimbo wa msanii wa leo — tuma jina, kiungo cha YouTube na maneno unayoyajua." en="Wedding songs, pounding songs, dance songs, church songs in Chagga, or a modern artist — send the name, YouTube link and whatever words you know." /> <Link href="/changia?kind=song" className="underline"><Bi sw="Changia wimbo →" en="Contribute a song →" /></Link></p>
      </div>
      <p className="text-xs text-foreground/50"><Bi sw="Video zinachezwa moja kwa moja kutoka YouTube (hakuna nakala inayohifadhiwa hapa). Haki za nyimbo ni za wasanii wake." en="Videos play directly from YouTube (no copies are stored here). Song rights remain with the artists." /></p>
    </div>
  );
}

function SongCard({ s, lang, playing, onPlay }: { s: Song; lang: string; playing: boolean; onPlay: () => void }) {
  const en = lang === "en";
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-video bg-navy">
        {playing ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${s.youtube}?autoplay=1&rel=0`} title={s.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button onClick={onPlay} className="group absolute inset-0 flex items-center justify-center" aria-label={`Play ${s.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${s.youtube}/hqdefault.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cherry text-ivory shadow-lg"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">{s.title}</h2>
            <p className="text-sm text-foreground/70">{s.artist}</p>
          </div>
          <span className="rounded-full bg-ivory px-2 py-0.5 text-xs text-coffee">{kindLabel[s.kind][en ? 1 : 0]}</span>
        </div>
        {(s.gloss_sw || s.gloss_en) && <p className="mt-2 text-foreground/80">{en ? s.gloss_en ?? s.gloss_sw : s.gloss_sw ?? s.gloss_en}</p>}
        {s.words?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {s.words.map((w) => <span key={w.ch} className="rounded-lg border border-silver px-2 py-1 text-xs"><span className="ch text-sm">{w.ch}</span> · {en ? w.en : w.sw}</span>)}
          </div>
        ) : null}
        <div className="mt-4 rounded-xl border border-dashed border-silver p-3">
          <p className="text-sm font-semibold text-navy"><Bi sw="Maneno ya wimbo" en="Lyrics" /></p>
          {s.lyrics.length ? (
            <ul className="mt-2 space-y-1 text-sm">{s.lyrics.map((l, i) => <li key={i}><span className="ch">{l.ch}</span>{(en ? l.en : l.sw) && <span className="text-foreground/70"> — {en ? l.en ?? l.sw : l.sw ?? l.en}</span>}</li>)}</ul>
          ) : (
            <p className="mt-1 text-sm text-foreground/70"><Bi sw="Bado hayajaandikwa. Unaweza kusikia maneno? Andika mstari mmoja au zaidi — hata kwa Kiswahili tu." en="Not transcribed yet. Can you make out the words? Write one line or more — even just the Swahili meaning." /></p>
          )}
          <Link href={`/changia?kind=song&topic=${encodeURIComponent("wimbo:" + s.slug)}`} className="btn-secondary mt-3 inline-block text-sm"><Bi sw="Andika maneno / sahihisha" en="Transcribe / correct" /></Link>
        </div>
      </div>
    </article>
  );
}
