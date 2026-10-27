import { attractions, payment } from "@/content/support";

export const metadata = { title: "Vivutio · Chagga attractions" };

const book = (name: string) =>
  `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(`Habari Flightfront! Nimeona "${name}" kwenye Nyumba ya Wachagga. Naomba bei na ratiba. Idadi ya watu: __. Tarehe: __.`)}`;

export default function Attractions() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Vivutio</p>
        <h1 className="font-display mt-1 text-3xl font-black text-navy">Tembelea Uchagga</h1>
        <p className="mt-3 text-lg text-foreground/80">
          Maporomoko, mahandaki ya kale, makazi ya Mangi, vihamba vya kahawa — vivutio vya Kilimanjaro vilivyoelezwa na Wachagga wenyewe.
          Safari zinapangwa na <b>Flightfront</b>, mshirika rasmi wa usafiri wa Nyumba ya Wachagga; sehemu ya mapato inarudi kwenye kazi ya kuhifadhi lugha.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {attractions.map((a) => (
          <article key={a.slug} className="card flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-navy">{a.name}</h2>
                <p className="text-sm text-foreground/60">{a.area}</p>
              </div>
            </div>
            <p className="mt-2 flex-1 text-foreground/80">{a.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {a.tags.map((t) => <span key={t} className="rounded-full bg-ivory px-2 py-0.5 text-xs text-coffee">{t}</span>)}
            </div>
            <a href={book(a.name)} target="_blank" rel="noreferrer" className="btn-primary mt-4">Panga safari na Flightfront</a>
          </article>
        ))}
      </div>
      <div className="card bg-ivory p-5">
        <p className="font-semibold text-navy">Una kivutio cha kwenu ambacho hakipo hapa?</p>
        <p className="text-sm text-foreground/80">Tuma jina, eneo na picha kupitia <a href="/changia" className="underline">Changia</a> — tutakiongeza na kukutaja.</p>
      </div>
    </div>
  );
}
