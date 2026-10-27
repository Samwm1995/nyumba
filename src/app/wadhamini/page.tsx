import { sponsorPackages, payment } from "@/content/support";
import { Bi } from "@/components/lang";

export const metadata = { title: "Wadhamini · Sponsors" };

const ask = `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent("Habari! Tungependa kudhamini Nyumba ya Wachagga. Kampuni: ____. Kifurushi: ____.")}`;

export default function Sponsors() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Wadhamini</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy"><Bi sw="Dhamini lahaja, dhamini kizazi" en="Sponsor a dialect, sponsor a generation" /></h1>
        <p className="mt-3 text-lg text-foreground/80">
          <Bi sw="Biashara za Kichagga zilijenga Kilimanjaro. Nyumba ya Wachagga inawapa wateja wako — vijana wa Kichagga nyumbani na ughaibuni — sababu ya kukukumbuka kila wanapojifunza neno la kwenu."
              en="Chagga businesses built Kilimanjaro. Nyumba ya Wachagga gives your customers — young Chagga at home and abroad — a reason to remember you every time they learn a word from home." />
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {sponsorPackages.map((p) => (
          <div key={p.name} className="card flex flex-col p-6">
            <h2 className="font-display text-lg font-bold text-navy">{p.name}</h2>
            <p className="mt-1 font-display text-xl font-black text-coffee">{p.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/80">{p.perks.map((x) => <li key={x} className="flex gap-2"><span className="text-amber">✓</span>{x}</li>)}</ul>
            <a href={ask} target="_blank" rel="noreferrer" className="btn-primary mt-5"><Bi sw="Ongea nasi" en="Talk to us" /></a>
          </div>
        ))}
      </div>
      <section className="card bg-navy p-6 text-ivory md:p-8">
        <h2 className="font-display text-2xl font-bold">Kwa nini sasa</h2>
        <div className="mt-3 grid gap-4 text-silver md:grid-cols-3">
          <p><b className="text-ivory">Hadhira halisi.</b> Vikundi vya WhatsApp vya Wachagga vyenye maelfu ya wanachama, Dar, Moshi, Arusha na ughaibuni.</p>
          <p><b className="text-ivory">Maudhui ya kudumu.</b> Misemo 312 ya Kivunjo tayari; lahaja nne kwenye njia. Kila somo linaishi kwa miaka.</p>
          <p><b className="text-ivory">Uwazi.</b> Ripoti ya robo mwaka ya wanafunzi, rekodi na matumizi ya fedha kwa kila mdhamini.</p>
        </div>
      </section>
    </div>
  );
}
