import Image from "next/image";
import { payment, tiers } from "@/content/support";
import { Bi } from "@/components/lang";

export const metadata = { title: "Unga mkono · Support & membership" };

const fmt = (n: number) => "TZS " + n.toLocaleString("en-US");
const wa = (text: string) => `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(text)}`;

export default function Support() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Unga mkono</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy"><Bi sw="Kuwa Mwanachama wa Nyumba" en="Become a member of the House" /></h1>
        <p className="mt-3 text-lg text-foreground/80">
          <Bi sw="Michango yako inalipia siku za kurekodi wazee, uhifadhi wa sauti, uchapishaji wa vitabu vya misemo na kuendesha tovuti hii. Kila shilingi inahesabiwa kwenye ukurasa wa Uwazi."
              en="Your contribution pays for recording days with elders, audio archiving, printed phrasebooks and running this site. Every shilling is accounted for on the Transparency page." />
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.key} className={`card flex flex-col p-6 ${t.featured ? "border-amber ring-2 ring-amber/40" : ""}`}>
            <p className="font-display text-xl font-bold text-navy">{t.sw}</p>
            <p className="mt-1 font-display text-3xl font-black text-navy">{fmt(t.price)} <span className="text-sm font-normal text-foreground/60">{t.period}</span></p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/80">
              {t.perks.map((p) => <li key={p} className="flex gap-2"><span className="text-amber">✓</span>{p}</li>)}
            </ul>
            <a href="#lipa" className={`mt-5 ${t.featured ? "btn-amber" : "btn-primary"}`}>Chagua {t.name}</a>
          </div>
        ))}
      </div>

      <section id="lipa" className="card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
        <Image src={payment.qr} alt="TanQR ya kulipa" width={220} height={220} className="mx-auto rounded-xl border border-silver" />
        <div>
          <h2 className="font-display text-2xl font-bold text-navy"><Bi sw="Jinsi ya kulipa" en="How to pay" /></h2>
          <ol className="mt-3 space-y-2 text-foreground/80">
            <li><b>1.</b> <Bi sw="Fungua M-Pesa, Tigo Pesa, Airtel Money, HaloPesa au app ya benki yako." en="Open M-Pesa, Tigo Pesa, Airtel Money, HaloPesa or your bank app (visitors: card link via WhatsApp)." /></li>
            <li><b>2.</b> <Bi sw={<>Chagua <b>Lipa kwa simu / Lipa Namba</b> na weka</>} en={<>Choose <b>Lipa Namba</b> and enter</>} /> <span className="ch text-xl">{payment.lipaNamba}</span> ({payment.accountName}) — <Bi sw={<>au <b>scan TanQR</b> hii.</>} en={<>or <b>scan this TanQR</b>.</>} /></li>
            <li><b>3.</b> <Bi sw="Weka kiasi: Meku 10,000 · Mangi 50,000 · Chifu 250,000 (au kiasi chochote cha mchango)." en="Amount: Meku 10,000 · Mangi 50,000 · Chifu 250,000 (or any donation)." /></li>
            <li><b>4.</b> <Bi sw="Tuma ujumbe wa uthibitisho na jina lako kwa WhatsApp ili tukuandikishe." en="Send the confirmation message and your name on WhatsApp so we can register you." /></li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <a className="btn-amber" href={wa("Habari Nyumba ya Wachagga! Nimelipa uanachama wa [Meku/Mangi/Chifu]. Jina langu: ____. Lahaja: ____. Ujumbe wa malipo: ____")} target="_blank" rel="noreferrer">Nimelipa — nitumie uthibitisho</a>
            <a className="btn-secondary" href={wa("Habari! Nina swali kuhusu uanachama wa Nyumba ya Wachagga.")} target="_blank" rel="noreferrer">Nina swali</a>
          </div>
          <p className="mt-4 text-xs text-foreground/60">{payment.note} Uanachama ni wa mwaka mmoja kuanzia tarehe ya malipo; utakumbushwa siku 30 kabla haujaisha.</p>
        </div>
      </section>

      <section className="card bg-navy p-6 text-ivory md:p-8">
        <h2 className="font-display text-2xl font-bold"><Bi sw="Ukuta wa Wameku" en="Wall of Elders" /></h2>
        <p className="mt-2 text-silver"><Bi sw="Majina ya wanachama waliounga mkono yanaonekana hapa. Kuwa wa kwanza." en="Supporting members are named here. Be the first." /></p>
      </section>
    </div>
  );
}
