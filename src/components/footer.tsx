"use client";
import Link from "next/link";
import Image from "next/image";
import { dialects } from "@/content/dialects";
import { payment } from "@/content/support";
import { Bi } from "./lang";

const col = "space-y-1.5 text-sm";
const h = "font-display text-xs font-semibold uppercase tracking-[0.25em] text-amber";
const a = "text-silver hover:text-ivory hover:underline";

export function Footer() {
  const wa = `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent("Habari Nyumba ya Wachagga!")}`;
  return (
    <footer className="mt-12 border-t border-silver/60 bg-navy text-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/crest.png" alt="" width={56} height={56} />
            <span className="font-display text-lg font-bold leading-tight">Nyumba ya<br />Wachagga</span>
          </Link>
          <p className="mt-3 text-sm text-silver"><Bi sw="Jukwaa la Wachagga la kujifunza Kichagga kwa lahaja zake, na kuhifadhi utamaduni wetu — kwa sauti za wazee, mikono ya vijana." en="The Chagga platform for learning Kichagga in its dialects and keeping our culture — in the elders' voices, by the young generation's hands." /></p>
          <p className="mt-3 font-display text-xs tracking-wide text-amber">Vijana wa Kichagga · Kilimanjaro ni Kwetu</p>
        </div>

        <nav className={col} aria-label="Jifunze">
          <p className={h}><Bi sw="Jifunze" en="Learn" /></p>
          {dialects.map((d) => <Link key={d.slug} href={`/jifunze/${d.slug}`} className={`block ${a}`}>{d.name}{d.status !== "ready" && <span className="ml-1 text-xs text-silver/60">· <Bi sw="inakusanywa" en="collecting" /></span>}</Link>)}
          <Link href="/linganisha" className={`block ${a}`}><Bi sw="Linganisha lahaja" en="Compare dialects" /></Link>
          <Link href="/wanachama" className={`block ${a}`}><Bi sw="Kitabu cha wanachama" en="Members' phrasebook" /></Link>
        </nav>

        <nav className={col} aria-label="Utamaduni">
          <p className={h}><Bi sw="Utamaduni" en="Culture" /></p>
          <Link href="/utamaduni" className={`block ${a}`}><Bi sw="Makala zote" en="All articles" /></Link>
          <Link href="/koo" className={`block ${a}`}><Bi sw="Koo za Kichagga" en="Chagga clans" /></Link>
          <Link href="/nyimbo" className={`block ${a}`}><Bi sw="Nyimbo" en="Songs" /></Link>
          <Link href="/utamaduni#chakula" className={`block ${a}`}><Bi sw="Chakula na mbege" en="Food & mbege" /></Link>
          <Link href="/utamaduni#historia" className={`block ${a}`}><Bi sw="Historia na Mangi" en="History & the Mangi" /></Link>
          <Link href="/vivutio" className={`block ${a}`}><Bi sw="Vivutio · tembelea Uchagga" en="Visit Chagga country" /></Link>
        </nav>

        <nav className={col} aria-label="Jumuiya">
          <p className={h}><Bi sw="Jumuiya" en="Community" /></p>
          <Link href="/jumuiya" className={`block ${a}`}><Bi sw="Jiunge" en="Join" /></Link>
          <Link href="/changia" className={`block ${a}`}><Bi sw="Changia msemo / sauti" en="Contribute a phrase / recording" /></Link>
          <Link href="/jumuiya#matukio" className={`block ${a}`}><Bi sw="Matukio" en="Events" /></Link>
          <Link href="/akaunti" className={`block ${a}`}><Bi sw="Akaunti yangu" en="My account" /></Link>
          <Link href="/ofisi" className={`block ${a}`}><Bi sw="Ofisi (wafanyakazi)" en="Office (staff)" /></Link>
        </nav>

        <nav className={col} aria-label="Unga mkono">
          <p className={h}><Bi sw="Unga mkono" en="Support" /></p>
          <Link href="/unga-mkono" className={`block ${a}`}><Bi sw="Uanachama: Meku · Mangi · Chifu" en="Membership: Meku · Mangi · Chifu" /></Link>
          <Link href="/wadhamini" className={`block ${a}`}><Bi sw="Wadhamini" en="Sponsors" /></Link>
          <Link href="/unga-mkono#lipa" className={`block ${a}`}>Lipa Namba {payment.lipaNamba}</Link>
          <a href={wa} target="_blank" rel="noreferrer" className={`block ${a}`}>WhatsApp +255 741 549 014</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={`block ${a} hidden`}>Instagram</a>
        </nav>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-silver/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© Nyumba ya Wachagga · Kizazi Kipya · <Bi sw="Maudhui ya jamii yanathibitishwa na wazungumzaji wawili kabla ya kuchapishwa." en="Community content is verified by two speakers before publishing." /></p>
          <p><Bi sw="Kivunjo kutoka" en="Vunjo course from" /> Leeman & Lauwo (2015), <Bi sw="kwa ruhusa" en="with permission" /> · <Bi sw="Picha" en="Photos" />: Wikimedia Commons (CC) · <Bi sw="Malipo kupitia" en="Payments via" /> Flightfront Ltd</p>
        </div>
      </div>
    </footer>
  );
}
