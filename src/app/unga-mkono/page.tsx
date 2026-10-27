import Image from "next/image";
import { payment, tiers } from "@/content/support";

export const metadata = { title: "Unga mkono · Support & membership" };

const fmt = (n: number) => "TZS " + n.toLocaleString("en-US");
const wa = (text: string) => `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(text)}`;

export default function Support() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Unga mkono</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy">Kuwa Mwanachama wa Nyumba</h1>
        <p className="mt-3 text-lg text-foreground/80">
          Michango yako inalipia siku za kurekodi wazee, uhifadhi wa sauti, uchapishaji wa vitabu vya misemo na kuendesha tovuti hii.
          Kila shilingi inahesabiwa kwenye ukurasa wa Uwazi.
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
          <h2 className="font-display text-2xl font-bold text-navy">Jinsi ya kulipa</h2>
          <ol className="mt-3 space-y-2 text-foreground/80">
            <li><b>1.</b> Fungua M-Pesa, Tigo Pesa, Airtel Money, HaloPesa au app ya benki yako.</li>
            <li><b>2.</b> Chagua <b>Lipa kwa simu / Lipa Namba</b> na weka <span className="ch text-xl">{payment.lipaNamba}</span> ({payment.accountName}) — au <b>scan TanQR</b> hii.</li>
            <li><b>3.</b> Weka kiasi: Rafiki 10,000 · Mlezi 50,000 · Mzee wa Baraza 250,000 (au kiasi chochote cha mchango).</li>
            <li><b>4.</b> Tuma ujumbe wa uthibitisho na jina lako kwa WhatsApp ili tukuandikishe.</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            <a className="btn-amber" href={wa("Habari Nyumba ya Wachagga! Nimelipa uanachama wa [Rafiki/Mlezi/Mzee]. Jina langu: ____. Lahaja: ____. Ujumbe wa malipo: ____")} target="_blank" rel="noreferrer">Nimelipa — nitumie uthibitisho</a>
            <a className="btn-secondary" href={wa("Habari! Nina swali kuhusu uanachama wa Nyumba ya Wachagga.")} target="_blank" rel="noreferrer">Nina swali</a>
          </div>
          <p className="mt-4 text-xs text-foreground/60">{payment.note} Uanachama ni wa mwaka mmoja kuanzia tarehe ya malipo; utakumbushwa siku 30 kabla haujaisha.</p>
        </div>
      </section>

      <section className="card bg-navy p-6 text-ivory md:p-8">
        <h2 className="font-display text-2xl font-bold">Ukuta wa Marafiki</h2>
        <p className="mt-2 text-silver">Majina ya wanachama waliounga mkono yanaonekana hapa. Kuwa wa kwanza.</p>
      </section>
    </div>
  );
}
