"use client";
import { useState } from "react";
import { dialects } from "@/content/dialects";
import Link from "next/link";
import { sendMagicLink, useAuth } from "@/lib/auth";
import { Bi, useLang } from "./lang";
import { SignIn } from "./sign-in";

// Registration has two paths. Both create an account (magic link by email); the DB trigger
// copies the details into the profile, opens a pending membership and (visitors) a trip lead.
type Path = "chagga" | "visitor" | null;

function useRegister() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const register = async (em: string, meta: Record<string, string | boolean>) => {
    setState("sending"); setEmail(em);
    try { await sendMagicLink(em, meta, "/akaunti"); setState("sent"); }
    catch (ex) { setErr(ex instanceof Error ? ex.message : "Error"); setState("error"); }
  };
  return { state, err, email, register };
}

function Sent({ email, sw, en }: { email: string; sw: string; en: string }) {
  return (
    <div className="mt-4 space-y-3">
      <p className="font-display text-xl font-bold text-navy"><Bi sw="Karibu Nyumbani!" en="Welcome home!" /></p>
      <SignIn presetEmail={email} next="/akaunti" />
      {(sw || en) && <p className="text-sm text-foreground/70"><Bi sw={sw} en={en} /></p>}
    </div>
  );
}

export function JoinForm() {
  const [path, setPath] = useState<Path>(null);
  const { setLang } = useLang();
  const { session } = useAuth();

  if (session) return (
    <div className="card mt-4 p-5">
      <p className="font-semibold text-navy"><Bi sw="Umeshaingia." en="You're signed in." /></p>
      <Link href="/akaunti" className="btn-primary mt-3 inline-block"><Bi sw="Nenda kwenye akaunti yangu →" en="Go to my account →" /></Link>
    </div>
  );

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
  const { state, err, email, register } = useRegister();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    register(d.email.trim(), { name: d.name, phone: d.phone, dialect: d.dialect, area: d.area ?? "", audience: "chagga", tier: d.tier, can_record: !!d.can_record, note: d.note ?? "" });
  };
  if (state === "sent") return <Sent email={email} sw="Ukichagua uanachama wa kulipia, maelekezo ya Lipa Namba yako kwenye akaunti yako." en="If you chose a paid tier, Lipa Namba instructions are in your account." />;
  return (
    <form onSubmit={submit} className="card mt-4 space-y-4 p-5">
      <button type="button" onClick={back} className="text-sm underline">← <Bi sw="Rudi" en="Back" /></button>
      <Field label={<Bi sw="Jina kamili" en="Full name" />} name="name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp" name="phone" required placeholder="07xx xxx xxx" />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Lahaja yako" en="Your dialect" /></span>
          <select name="dialect" className="mt-1 w-full rounded-xl border border-silver p-3">
            {dialects.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            <option value="other">Najifunza / sina uhakika</option>
          </select></label>
        <Field label={<Bi sw="Eneo la nyumbani" en="Home area" />} name="area" placeholder="mf. Kibosho Kati" />
      </div>
      <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Uanachama" en="Membership" /></span>
        <select name="tier" className="mt-1 w-full rounded-xl border border-silver p-3">
          <option value="">Bure — nataka tu taarifa</option>
          <option value="meku">Meku — TZS 10,000 / mwaka</option>
          <option value="mangi">Mangi — TZS 50,000 / mwaka</option>
          <option value="chifu">Chifu — TZS 250,000 / mwaka</option>
        </select></label>
      <label className="flex items-center gap-3 rounded-xl border border-silver p-3"><input type="checkbox" name="can_record" className="h-5 w-5" /><span><Bi sw="Naweza kurekodi wazee eneo langu" en="I can record elders in my area" /></span></label>
      <label className="block"><span className="text-sm font-semibold text-navy"><Bi sw="Mengine" en="Anything else" /></span><textarea name="note" rows={2} className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "…" : <Bi sw="Jiunge" en="Join" />}</button>
      {state === "error" && <p className="text-sm text-cherry">{err}</p>}
      <p className="text-xs text-foreground/60"><Bi sw="Tunakutumia kiungo cha kuingia kwa email — hakuna nenosiri. Ukichagua uanachama wa kulipia, maelekezo ya Lipa Namba yanakuja baada ya kuingia." en="We email you a sign-in link — no password. If you choose a paid tier, Lipa Namba instructions appear after you sign in." /></p>
    </form>
  );
}

function VisitorForm({ back }: { back: () => void }) {
  const { state, err, email, register } = useRegister();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    register(d.email.trim(), { name: d.name, phone: d.phone ?? "", country: d.country, audience: "visitor", tier: d.tier, travel_date: d.date ?? "", operator: d.operator ?? "", extras: d.extras ?? "" });
  };
  if (state === "sent") return <Sent email={email} sw="" en="Your free greetings sheet is in the Learn section; paid packs unlock in your account once payment is confirmed." />;
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
          <option value="">Free — online greetings sheet</option>
          <option value="friend">Kilimanjaro Friend — $10: climbers&apos; phrase pack, audio, certificate (online)</option>
          <option value="friend_plus">Kilimanjaro Friend+ — $25: plus a personal greeting video from a Chagga elder in your guides&apos; dialect</option>
        </select></label>
      <label className="block"><span className="text-sm font-semibold text-navy">Also interested in</span>
        <select name="extras" className="mt-1 w-full rounded-xl border border-silver p-3">
          <option value="">—</option>
          <option>Materuni waterfall & coffee day trip</option>
          <option>Chagga village & caves tour (Marangu)</option>
          <option>Airport transfer (JRO)</option>
          <option>Zanzibar after the climb</option>
        </select></label>
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "…" : "Register"}</button>
      {state === "error" && <p className="text-sm text-cherry">{err}</p>}
      <p className="text-xs text-foreground/60">Card payment link and receipt are issued by Flightfront Limited, our travel partner. Trips are optional and quoted separately.</p>
    </form>
  );
}
