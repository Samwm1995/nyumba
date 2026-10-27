"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth, tierLabel } from "@/lib/auth";
import { Bi } from "../lang";
import { Status, inp } from "./office";

type M = { id: string; user_id: string; tier: string; starts_on: string; expires_on: string; status: string; profiles?: { name: string; email: string | null; phone: string | null } | null };
type P = { id: string; created_at: string; source: string; reference: string | null; payer_name: string | null; payer_phone: string | null; amount: number; currency: string; paid_at: string | null; matched_user: string | null; purpose: string | null; status: string; notes: string | null };
type S = { id: string; company: string; package: string; amount: number | null; status: string; starts_on: string | null; ends_on: string | null; contact_name: string | null; contact: string | null };

const d = (s: string) => new Date(s + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const addYear = (from: Date) => { const x = new Date(from); x.setFullYear(x.getFullYear() + 1); return x.toISOString().slice(0, 10); };

/** Back office (finance): record Selcom payments, match them to members, activate/renew memberships, sponsors. */
export function Finance() {
  const { sb, session } = useAuth();
  const [pending, setPending] = useState<M[]>([]);
  const [expiring, setExpiring] = useState<M[]>([]);
  const [active, setActive] = useState<M[]>([]);
  const [payments, setPayments] = useState<P[]>([]);
  const [sponsors, setSponsors] = useState<S[]>([]);
  const [tab, setTab] = useState<"members" | "payments" | "sponsors">("members");

  const load = useCallback(async () => {
    if (!sb) return;
    const today = new Date().toISOString().slice(0, 10);
    const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
    const sel = "*, profiles!memberships_user_id_fkey(name,email,phone)";
    const [p, e, a, pay, sp] = await Promise.all([
      sb.from("memberships").select(sel).eq("status", "pending").order("created_at"),
      sb.from("memberships").select(sel).eq("status", "active").gte("expires_on", today).lte("expires_on", in30).order("expires_on"),
      sb.from("memberships").select(sel).eq("status", "active").gte("expires_on", today).order("expires_on", { ascending: false }).limit(200),
      sb.from("payments").select("*").order("created_at", { ascending: false }).limit(100),
      sb.from("sponsors").select("*").order("status"),
    ]);
    setPending((p.data as M[]) ?? []); setExpiring((e.data as M[]) ?? []); setActive((a.data as M[]) ?? []); setPayments((pay.data as P[]) ?? []); setSponsors((sp.data as S[]) ?? []);
  }, [sb]);
  useEffect(() => { load(); }, [load]);

  /** Activate a pending membership (payment confirmed): 1 year from today. */
  const activate = async (m: M, ref?: string) => {
    if (!sb) return;
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await sb.from("memberships").update({ status: "active", starts_on: today, expires_on: addYear(new Date()), activated_by: session!.user.id }).eq("id", m.id);
    if (error) return alert(error.message);
    if (ref) await sb.from("payments").update({ status: "matched", matched_user: m.user_id, matched_membership: m.id, purpose: "membership" }).eq("id", ref);
    load();
  };
  /** Renew an active membership: +1 year from current expiry. */
  const renew = async (m: M) => {
    if (!sb) return;
    const base = new Date(m.expires_on + "T00:00:00") > new Date() ? new Date(m.expires_on + "T00:00:00") : new Date();
    await sb.from("memberships").update({ expires_on: addYear(base), activated_by: session!.user.id }).eq("id", m.id);
    load();
  };
  const addPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const { error } = await sb!.from("payments").insert({ source: f.source, reference: f.reference || null, payer_name: f.payer_name || null, payer_phone: f.payer_phone || null, amount: Number(f.amount), currency: f.currency, paid_at: f.paid_at ? new Date(f.paid_at).toISOString() : new Date().toISOString(), purpose: f.purpose || null, notes: f.notes || null });
    if (error) alert(error.message); else { e.currentTarget.reset(); load(); }
  };
  const addSponsor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const { error } = await sb!.from("sponsors").insert({ company: f.company, package: f.package, amount: f.amount ? Number(f.amount) : null, contact_name: f.contact_name || null, contact: f.contact || null, status: "proposed", created_by: session!.user.id });
    if (error) alert(error.message); else { e.currentTarget.reset(); load(); }
  };
  const setSponsorStatus = async (s: S, status: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "live" && !s.starts_on) { patch.starts_on = new Date().toISOString().slice(0, 10); patch.ends_on = addYear(new Date()); }
    await sb!.from("sponsors").update(patch).eq("id", s.id); load();
  };

  const unmatched = payments.filter((p) => p.status === "unmatched");
  const total = payments.filter((p) => p.status !== "refunded").reduce((a, p) => a + Number(p.amount), 0);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label={<Bi sw="Wanachama hai" en="Active members" />} v={active.length} />
        <Kpi label={<Bi sw="Wanasubiri malipo" en="Awaiting payment" />} v={pending.length} warn={pending.length > 0} />
        <Kpi label={<Bi sw="Zinaisha ≤30 siku" en="Expiring ≤30 days" />} v={expiring.length} warn={expiring.length > 0} />
        <Kpi label={<Bi sw="Malipo (TZS)" en="Payments (TZS)" />} v={total.toLocaleString("en-US")} />
      </div>
      <div className="mt-5 flex gap-2">
        {(["members", "payments", "sponsors"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs font-semibold ${tab === t ? "bg-navy text-ivory" : "bg-silver/40"}`}>{t}</button>)}
      </div>

      {tab === "members" && (
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <section>
            <h3 className="font-display text-lg font-bold text-navy"><Bi sw="Maombi yanayosubiri malipo" en="Requests awaiting payment" /></h3>
            <ul className="mt-2 space-y-2">
              {pending.map((m) => (
                <li key={m.id} className="card p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div><b>{m.profiles?.name || "—"}</b> · {tierLabel[m.tier]}<br /><span className="text-xs text-foreground/60">{m.profiles?.email} · {m.profiles?.phone}</span></div>
                    <Status s={m.status} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <select id={`ref-${m.id}`} className={inp + " max-w-[260px]"} defaultValue="">
                      <option value="">— <Bi sw="Linganisha na malipo" en="match a payment" /> —</option>
                      {unmatched.map((p) => <option key={p.id} value={p.id}>{p.amount.toLocaleString()} {p.currency} · {p.payer_name ?? p.payer_phone ?? p.reference}</option>)}
                    </select>
                    <button className="btn-primary text-xs" onClick={() => activate(m, (document.getElementById(`ref-${m.id}`) as HTMLSelectElement).value || undefined)}>✓ <Bi sw="Washa (mwaka 1)" en="Activate (1 year)" /></button>
                  </div>
                </li>
              ))}
              {pending.length === 0 && <li className="text-sm text-foreground/60"><Bi sw="Hakuna." en="None." /></li>}
            </ul>
          </section>
          <section>
            <h3 className="font-display text-lg font-bold text-navy"><Bi sw="Zinaisha ndani ya siku 30" en="Expiring within 30 days" /></h3>
            <p className="text-xs text-foreground/60"><Bi sw="Wakumbushe (WhatsApp/email). Mwanachama akilipa, bonyeza Huisha." en="Remind them (WhatsApp/email). When they pay, click Renew." /></p>
            <ul className="mt-2 space-y-2">
              {expiring.map((m) => (
                <li key={m.id} className="card flex items-center justify-between gap-2 p-3 text-sm">
                  <div><b>{m.profiles?.name}</b> · {tierLabel[m.tier]} · <span className="text-cherry">{d(m.expires_on)}</span><br /><span className="text-xs text-foreground/60">{m.profiles?.email} · {m.profiles?.phone}</span></div>
                  <div className="flex gap-1">
                    {m.profiles?.phone && <a className="btn-secondary text-xs" target="_blank" rel="noreferrer" href={`https://wa.me/${m.profiles.phone.replace(/\D/g, "").replace(/^0/, "255")}?text=${encodeURIComponent(`Habari ${m.profiles.name}! Uanachama wako wa ${tierLabel[m.tier]} katika Nyumba ya Wachagga unaisha ${d(m.expires_on)}. Huisha kwa Lipa Namba 6109 9089 (FLIGHTFRONT). Aika mnu!`)}`}>WhatsApp</a>}
                    <button className="btn-primary text-xs" onClick={() => renew(m)}><Bi sw="Huisha" en="Renew" /></button>
                  </div>
                </li>
              ))}
              {expiring.length === 0 && <li className="text-sm text-foreground/60"><Bi sw="Hakuna." en="None." /></li>}
            </ul>
            <h3 className="mt-6 font-display text-lg font-bold text-navy"><Bi sw="Wanachama hai" en="Active members" /> ({active.length})</h3>
            <ul className="mt-2 max-h-80 overflow-y-auto text-sm">
              {active.map((m) => <li key={m.id} className="flex justify-between border-t border-silver/50 py-1"><span>{m.profiles?.name} <span className="text-xs text-foreground/50">{m.profiles?.email}</span></span><span>{tierLabel[m.tier]} · {d(m.expires_on)}</span></li>)}
            </ul>
          </section>
        </div>
      )}

      {tab === "payments" && (
        <div className="mt-4 grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={addPayment} className="card grid gap-2 self-start p-4">
            <h3 className="font-display text-lg font-bold text-navy"><Bi sw="Rekodi malipo" en="Record a payment" /></h3>
            <p className="text-xs text-foreground/60"><Bi sw="Kutoka taarifa ya Selcom au ujumbe wa M-Pesa. Baadaye hii itajazwa kiotomatiki." en="From the Selcom statement or an M-Pesa SMS. Later this is filled automatically." /></p>
            <select name="source" className={inp}><option value="selcom">Selcom / Lipa Namba</option><option value="bank">Bank</option><option value="card">Card (Flightfront)</option><option value="cash">Cash</option><option value="other">Other</option></select>
            <input name="reference" placeholder="Ref / transaction ID" className={inp} />
            <input name="payer_name" placeholder="Jina la mlipaji" className={inp} />
            <input name="payer_phone" placeholder="Simu" className={inp} />
            <div className="grid grid-cols-[1fr_80px] gap-2"><input name="amount" type="number" step="0.01" required placeholder="Kiasi" className={inp} /><select name="currency" className={inp}><option>TZS</option><option>USD</option></select></div>
            <input name="paid_at" type="datetime-local" className={inp} />
            <select name="purpose" className={inp}><option value="membership">membership</option><option value="sponsorship">sponsorship</option><option value="donation">donation</option><option value="event">event</option><option value="trip">trip</option></select>
            <input name="notes" placeholder="Maelezo" className={inp} />
            <button className="btn-primary"><Bi sw="Hifadhi" en="Save" /></button>
          </form>
          <section>
            <h3 className="font-display text-lg font-bold text-navy"><Bi sw="Malipo" en="Payments" /> <span className="text-sm font-normal text-foreground/60">· {unmatched.length} <Bi sw="hayajalinganishwa" en="unmatched" /></span></h3>
            <div className="card mt-2 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-navy text-left text-ivory"><tr><th className="p-2">Tarehe</th><th className="p-2">Mlipaji</th><th className="p-2">Kiasi</th><th className="p-2">Ref</th><th className="p-2">Kusudi</th><th className="p-2">Hali</th></tr></thead>
                <tbody>{payments.map((p) => <tr key={p.id} className="border-t border-silver/50"><td className="p-2">{new Date(p.paid_at ?? p.created_at).toLocaleDateString("en-GB")}</td><td className="p-2">{p.payer_name ?? "—"}<br /><span className="text-xs text-foreground/50">{p.payer_phone}</span></td><td className="p-2">{Number(p.amount).toLocaleString()} {p.currency}</td><td className="p-2 text-xs">{p.reference}</td><td className="p-2">{p.purpose}</td><td className="p-2"><Status s={p.status} /></td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {tab === "sponsors" && (
        <div className="mt-4 grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={addSponsor} className="card grid gap-2 self-start p-4">
            <h3 className="font-display text-lg font-bold text-navy"><Bi sw="Mdhamini mpya" en="New sponsor" /></h3>
            <input name="company" required placeholder="Kampuni" className={inp} />
            <select name="package" className={inp}><option value="dialect">Dialect Sponsor · 2,000,000</option><option value="section">Section Sponsor · 1,000,000</option><option value="event">Event Sponsor · 500,000+</option></select>
            <input name="amount" type="number" placeholder="Kiasi TZS" className={inp} />
            <input name="contact_name" placeholder="Mtu wa mawasiliano" className={inp} />
            <input name="contact" placeholder="Simu / email" className={inp} />
            <button className="btn-primary"><Bi sw="Hifadhi" en="Save" /></button>
          </form>
          <ul className="space-y-2">
            {sponsors.map((s) => (
              <li key={s.id} className="card flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
                <div><b>{s.company}</b> · {s.package} · {s.amount?.toLocaleString()} TZS<br /><span className="text-xs text-foreground/60">{s.contact_name} · {s.contact}{s.ends_on ? ` · hadi ${d(s.ends_on)}` : ""}</span></div>
                <div className="flex items-center gap-1"><Status s={s.status} />
                  <select className={inp + " w-auto"} value={s.status} onChange={(e) => setSponsorStatus(s, e.target.value)}>{["proposed", "agreed", "paid", "live", "ended"].map((x) => <option key={x}>{x}</option>)}</select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Kpi({ label, v, warn }: { label: React.ReactNode; v: number | string; warn?: boolean }) {
  return <div className={`card p-4 ${warn ? "border-amber" : ""}`}><p className="text-xs uppercase tracking-wider text-foreground/60">{label}</p><p className="font-display text-2xl font-black text-navy">{v}</p></div>;
}
