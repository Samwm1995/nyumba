"use client";
import { useState } from "react";
import { dialects } from "@/content/dialects";
import { payment } from "@/content/support";
import { Bi, useLang } from "./lang";

// Registration has two paths. Until the Google Form backend is wired, both paths hand over to
// WhatsApp with a structured message so nothing is lost; the sheet is filled by the team.
type Path = "chagga" | "visitor" | null;

const wa = (text: string) => `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(text)}`;

export function JoinForm() {
  const [path, setPath] = useState<Path>(null);
  const { setLang } = useLang();

  if (!path) {
    return (
      <div className="card mt-4 p-5">
        <p className="font-semibold text-navy"><Bi sw="Wewe ni nani?" en="Who are you?" /></p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button className="card p-5 text-left hover:border-navy/40" onClick={() => setPath("chagga")}>
            <span className="font-display text-lg font-bold text-navy">Mimi ni Mchagga</span>
            <span className="mt-1 block text-sm text-foreground/70">Chagga at home or in the diaspora · Mwanajumuiya</span>
          </button>
          <button className="card p-5 text-left hover:border-navy/40" onClick={() => { setPath("visitor"); setLang("en"); }}>
            <span className="font-display text-lg font-bold text-navy">I&apos;m a visitor / climber</span>
            <span className="mt-1 block text-sm text-foreground/70">Learn Chagga for your Kilimanjaro trip · Kilimanjaro Friend</span>
          </button>
        </div>
      </div>
    );
  }

  if (path === "chagga") return <ChaggaForm back={() => setPath(null)} />;
  return <VisitorForm back={() => setPath(null)} />;
}

function Field({ label, name, type = "text", required, placeholder }: { label: React.ReactNode; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-silver p-3" />
    </label>
  );
}

function ChaggaForm({ back }: { back: () => void }) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const msg = `USAJILI — Nyumba ya Wachagga\nJina: ${d.name}\nLahaja: ${d.dialect}\nEneo: ${d.area}\nWhatsApp: ${d.phone}\nEmail: ${d.email || "-"}\nNaweza kurekodi wazee: ${d.can_record ? "Ndiyo" : "Hapana"}\nUanachama: ${d.tier}\nMengine: ${d.note || "-"}`;
    window.open(wa(msg), "_blank");
  };
  return (
    <form onSubmit={submit} className="card mt-4 space-y-4 p-5">
      <button type="button" onClick={back} className="text-sm underline">← <Bi sw="Rudi" en="Back" /></button>
      <Field label={<Bi sw="Jina kamili" en="Full name" />} name="name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp" name="phone" required placeholder="07xx xxx xxx" />
        <Field label={<Bi sw="Email (si lazima)" en="Email (optional)" />} name="email" type="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Lahaja yako" en="Your dialect" /></span>
          <select name="dialect" className="mt-1 w-full rounded-xl border border-silver p-3">
            {dialects.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
            <option value="najifunza">Najifunza / sina uhakika</option>
          </select></label>
        <Field label={<Bi sw="Eneo la nyumbani" en="Home area" />} name="area" placeholder="mf. Kibosho Kati" />
      </div>
      <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Uanachama" en="Membership" /></span>
        <select name="tier" className="mt-1 w-full rounded-xl border border-silver p-3">
          <option value="Bure">Bure — nataka tu taarifa</option>
          <option value="Rafiki 10,000">Rafiki — TZS 10,000 / mwaka</option>
          <option value="Mlezi 50,000">Mlezi — TZS 50,000 / mwaka</option>
          <option value="Mzee wa Baraza 250,000">Mzee wa Baraza — TZS 250,000 / mwaka</option>
        </select></label>
      <label className="flex items-center gap-3 rounded-xl border border-silver p-3"><input type="checkbox" name="can_record" className="h-5 w-5" /><span><Bi sw="Naweza kurekodi wazee eneo langu" en="I can record elders in my area" /></span></label>
      <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Mengine" en="Anything else" /></span><textarea name="note" rows={2} className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      <button className="btn-primary w-full"><Bi sw="Jiunge (inafungua WhatsApp)" en="Join (opens WhatsApp)" /></button>
      <p className="text-xs text-foreground/60"><Bi sw="Ukichagua uanachama wa kulipia, utapewa maelekezo ya Lipa Namba baada ya kujiandikisha." en="If you choose a paid tier you'll get Lipa Namba instructions after registering." /></p>
    </form>
  );
}

function VisitorForm({ back }: { back: () => void }) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const msg = `KILIMANJARO FRIEND — registration\nName: ${d.name}\nCountry: ${d.country}\nEmail: ${d.email}\nWhatsApp: ${d.phone || "-"}\nClimb / visit date: ${d.date || "-"}\nTour operator: ${d.operator || "-"}\nPackage: ${d.tier}\nInterested in: ${d.extras || "-"}`;
    window.open(wa(msg), "_blank");
  };
  return (
    <form onSubmit={submit} className="card mt-4 space-y-4 p-5">
      <button type="button" onClick={back} className="text-sm underline">← Back</button>
      <p className="text-foreground/80">Learn the greetings your guides and porters actually use — most Kilimanjaro crews speak Kivunjo or Kimachame. Your fee funds recordings of Chagga elders.</p>
      <Field label="Full name" name="name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="WhatsApp (optional, with country code)" name="phone" placeholder="+44 …" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Country" name="country" required />
        <Field label="Climb / visit date" name="date" type="date" />
      </div>
      <Field label="Tour operator (if booked)" name="operator" />
      <label className="block"><span className="text-sm font-semibold text-navy">Package</span>
        <select name="tier" className="mt-1 w-full rounded-xl border border-silver p-3">
          <option value="Free">Free — greetings sheet (PDF)</option>
          <option value="Kilimanjaro Friend $10">Kilimanjaro Friend — $10: climbers&apos; phrase pack, audio, certificate</option>
          <option value="Kilimanjaro Friend+ $25">Kilimanjaro Friend+ — $25: plus printed phrasebook delivered to your hotel in Moshi</option>
        </select></label>
      <label className="block"><span className="text-sm font-semibold text-navy">Also interested in</span>
        <select name="extras" className="mt-1 w-full rounded-xl border border-silver p-3">
          <option value="">—</option>
          <option>Materuni waterfall & coffee day trip</option>
          <option>Chagga village & caves tour (Marangu)</option>
          <option>Airport transfer (JRO)</option>
          <option>Zanzibar after the climb</option>
        </select></label>
      <button className="btn-primary w-full">Register (opens WhatsApp)</button>
      <p className="text-xs text-foreground/60">Card payment link and receipt are issued by Flightfront Limited, our travel partner. Trips are optional and quoted separately.</p>
    </form>
  );
}
