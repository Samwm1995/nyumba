"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Bi } from "../lang";
import { Status, inp } from "./office";

type C = { id: string; kind: string; dialect: string; chagga: string; swahili: string | null; english: string | null; topic: string | null; status: string };
type E = { id: string; title: string; starts_at: string; location: string | null; description: string | null; dialect: string | null; ticket_price: number | null; published: boolean };

/** Back office (editor): publish verified content, manage events, upload members-only files. */
export function Publishing() {
  const { sb, session } = useAuth();
  const [verified, setVerified] = useState<C[]>([]);
  const [events, setEvents] = useState<E[]>([]);
  const [files, setFiles] = useState<{ name: string; created_at: string }[]>([]);

  const load = useCallback(async () => {
    if (!sb) return;
    const [c, e, f] = await Promise.all([
      sb.from("contributions").select("id,kind,dialect,chagga,swahili,english,topic,status").eq("status", "verified").order("created_at"),
      sb.from("events").select("*").order("starts_at", { ascending: false }).limit(50),
      sb.storage.from("members").list("", { limit: 100 }),
    ]);
    setVerified((c.data as C[]) ?? []); setEvents((e.data as E[]) ?? []); setFiles((f.data ?? []).map((x) => ({ name: x.name, created_at: x.created_at ?? "" })));
  }, [sb]);
  useEffect(() => { load(); }, [load]);

  const publish = async (id: string) => { await sb!.from("contributions").update({ status: "published" }).eq("id", id); load(); };
  const saveEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const { error } = await sb!.from("events").insert({ title: d.title, starts_at: new Date(d.starts_at).toISOString(), location: d.location || null, description: d.description || null, dialect: d.dialect || null, ticket_price: d.ticket_price ? Number(d.ticket_price) : null, published: false, created_by: session!.user.id });
    if (error) alert(error.message); else { e.currentTarget.reset(); load(); }
  };
  const togglePub = async (ev: E) => { await sb!.from("events").update({ published: !ev.published }).eq("id", ev.id); load(); };
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !sb) return;
    const { error } = await sb.storage.from("members").upload(f.name, f, { upsert: true });
    if (error) alert(error.message); else load();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section>
        <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Tayari kuchapishwa" en="Ready to publish" /> <span className="text-sm font-normal text-foreground/60">({verified.length})</span></h2>
        <p className="text-sm text-foreground/70"><Bi sw="Zimethibitishwa na wahakiki wawili. Zikichapishwa zinaonekana kwa umma na kuingia kwenye Linganisha." en="Verified by two speakers. Publishing makes them public and adds them to Compare." /></p>
        <ul className="mt-3 space-y-2">
          {verified.map((c) => (
            <li key={c.id} className="card flex items-center justify-between gap-3 p-3">
              <div><p className="ch">{c.chagga}</p><p className="text-xs text-foreground/70">{c.swahili} · {c.english} · <span className="text-foreground/50">{c.dialect} · {c.kind}</span></p></div>
              <button className="btn-primary text-sm" onClick={() => publish(c.id)}><Bi sw="Chapisha" en="Publish" /></button>
            </li>
          ))}
          {verified.length === 0 && <li className="text-sm text-foreground/60"><Bi sw="Hakuna kwa sasa." en="Nothing right now." /></li>}
        </ul>

        <h2 className="mt-8 font-display text-xl font-bold text-navy"><Bi sw="Faili za wanachama" en="Members-only files" /></h2>
        <p className="text-sm text-foreground/70"><Bi sw="Sauti za wazee na matoleo ya wanachama. Zinaonekana ndani ya tovuti tu kwa wanachama wenye uanachama unaotumika." en="Elder recordings and members' editions. Served in-site only to members with a valid membership." /></p>
        <input type="file" onChange={upload} className="mt-2 text-sm" />
        <ul className="mt-2 text-sm">{files.map((f) => <li key={f.name} className="border-t border-silver/50 py-1">{f.name} <span className="text-xs text-foreground/50">{new Date(f.created_at).toLocaleDateString("en-GB")}</span></li>)}</ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Matukio" en="Events" /></h2>
        <form onSubmit={saveEvent} className="card mt-3 grid gap-2 p-4 sm:grid-cols-2">
          <input name="title" required placeholder="Kichwa / title" className={inp + " sm:col-span-2"} />
          <input name="starts_at" type="datetime-local" required className={inp} />
          <input name="location" placeholder="Mahali / location" className={inp} />
          <input name="dialect" placeholder="Lahaja (si lazima)" className={inp} />
          <input name="ticket_price" type="number" placeholder="Kiingilio TZS (si lazima)" className={inp} />
          <textarea name="description" rows={2} placeholder="Maelezo" className={inp + " sm:col-span-2"} />
          <button className="btn-primary sm:col-span-2"><Bi sw="Hifadhi (rasimu)" en="Save as draft" /></button>
        </form>
        <ul className="mt-3 space-y-2">
          {events.map((ev) => (
            <li key={ev.id} className="card flex items-center justify-between gap-3 p-3 text-sm">
              <div><p className="font-semibold text-navy">{ev.title}</p><p className="text-xs text-foreground/60">{new Date(ev.starts_at).toLocaleString("en-GB")} · {ev.location}</p></div>
              <button className={ev.published ? "btn-secondary text-xs" : "btn-amber text-xs"} onClick={() => togglePub(ev)}>{ev.published ? <Bi sw="Ficha" en="Unpublish" /> : <Bi sw="Chapisha" en="Publish" />}</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
