"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth, type Role } from "@/lib/auth";
import { dialects } from "@/content/dialects";
import { Bi } from "../lang";
import { inp } from "./office";

type P = { id: string; name: string; email: string | null; dialect: string | null; area: string | null; audience: string; created_at: string; can_record: boolean };
type R = { user_id: string; role: Role; dialect: string; granted_at: string };
type A = { id: number; at: string; actor: string | null; action: string; entity: string | null; detail: Record<string, unknown> | null };

const ROLES: { r: Role; sw: string; en: string; office: string }[] = [
  { r: "verifier", sw: "Mhakiki — anathibitisha misemo ya lahaja yake", en: "Verifier — approves phrases in their dialect", office: "mid" },
  { r: "editor", sw: "Mhariri — anachapisha, matukio, faili za wanachama", en: "Editor — publishes, events, members' files", office: "back" },
  { r: "finance", sw: "Fedha — malipo, uanachama, wadhamini", en: "Finance — payments, memberships, sponsors", office: "back" },
  { r: "partner", sw: "Mshirika (Flightfront) — safari", en: "Partner (Flightfront) — trips", office: "front" },
  { r: "admin", sw: "Msimamizi — kila kitu + majukumu", en: "Admin — everything + roles", office: "back" },
];

/** Admin: grant/revoke roles, see people, audit log. */
export function Admin() {
  const { sb, session } = useAuth();
  const [people, setPeople] = useState<P[]>([]);
  const [roles, setRoles] = useState<R[]>([]);
  const [audit, setAudit] = useState<A[]>([]);
  const [q, setQ] = useState("");
  const [pick, setPick] = useState<{ user: string; role: Role; dialect: string }>({ user: "", role: "verifier", dialect: "" });

  const load = useCallback(async () => {
    if (!sb) return;
    const [p, r, a] = await Promise.all([
      sb.from("profiles").select("id,name,email,dialect,area,audience,created_at,can_record").order("created_at", { ascending: false }).limit(500),
      sb.from("user_roles").select("user_id,role,dialect,granted_at"),
      sb.from("audit_log").select("*").order("at", { ascending: false }).limit(50),
    ]);
    setPeople((p.data as P[]) ?? []); setRoles((r.data as R[]) ?? []); setAudit((a.data as A[]) ?? []);
  }, [sb]);
  useEffect(() => { load(); }, [load]);

  const grant = async () => {
    if (!sb || !pick.user) return;
    const { error } = await sb.from("user_roles").insert({ user_id: pick.user, role: pick.role, dialect: pick.role === "verifier" ? pick.dialect : "", granted_by: session!.user.id });
    if (error) alert(error.message); else load();
  };
  const revoke = async (r: R) => {
    if (!confirm(`Ondoa ${r.role}${r.dialect ? ":" + r.dialect : ""}?`)) return;
    await sb!.from("user_roles").delete().match({ user_id: r.user_id, role: r.role, dialect: r.dialect }); load();
  };

  const filtered = people.filter((p) => !q || [p.name, p.email, p.area, p.dialect].some((s) => s?.toLowerCase().includes(q.toLowerCase())));
  const name = (id: string | null) => people.find((p) => p.id === id)?.name || people.find((p) => p.id === id)?.email || id?.slice(0, 8) || "—";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section>
        <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Toa jukumu" en="Grant a role" /></h2>
        <div className="card mt-3 grid gap-2 p-4">
          <select className={inp} value={pick.user} onChange={(e) => setPick({ ...pick, user: e.target.value })}>
            <option value="">— <Bi sw="chagua mtu" en="choose a person" /> —</option>
            {people.map((p) => <option key={p.id} value={p.id}>{p.name || "(no name)"} · {p.email}</option>)}
          </select>
          <select className={inp} value={pick.role} onChange={(e) => setPick({ ...pick, role: e.target.value as Role })}>
            {ROLES.map((r) => <option key={r.r} value={r.r}>{r.r}</option>)}
          </select>
          {pick.role === "verifier" && (
            <select className={inp} value={pick.dialect} onChange={(e) => setPick({ ...pick, dialect: e.target.value })}>
              <option value=""><Bi sw="Lahaja zote" en="All dialects" /></option>
              {dialects.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </select>
          )}
          <button className="btn-primary" onClick={grant} disabled={!pick.user}><Bi sw="Toa jukumu" en="Grant" /></button>
        </div>
        <ul className="mt-3 space-y-1 text-xs text-foreground/70">
          {ROLES.map((r) => <li key={r.r}><b className="text-navy">{r.r}</b> <span className="rounded bg-silver/40 px-1">{r.office} office</span> — <Bi sw={r.sw} en={r.en} /></li>)}
        </ul>

        <h2 className="mt-8 font-display text-xl font-bold text-navy"><Bi sw="Wenye majukumu" en="Current staff" /></h2>
        <ul className="mt-2 divide-y divide-silver/50 text-sm">
          {roles.map((r) => (
            <li key={r.user_id + r.role + r.dialect} className="flex items-center justify-between py-1.5">
              <span><b>{name(r.user_id)}</b> · {r.role}{r.dialect ? `:${r.dialect}` : ""}</span>
              {r.user_id !== session?.user.id && <button className="text-xs text-cherry underline" onClick={() => revoke(r)}><Bi sw="ondoa" en="revoke" /></button>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Watu" en="People" /> <span className="text-sm font-normal text-foreground/60">({people.length})</span></h2>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="tafuta…" className={inp + " max-w-[200px]"} />
        </div>
        <div className="card mt-2 max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <tbody>{filtered.map((p) => <tr key={p.id} className="border-t border-silver/50"><td className="p-2"><b>{p.name || "—"}</b><br /><span className="text-xs text-foreground/60">{p.email}</span></td><td className="p-2 text-xs">{p.audience}<br />{p.dialect} {p.area}</td><td className="p-2 text-xs">{p.can_record ? "🎙 rec" : ""}<br />{new Date(p.created_at).toLocaleDateString("en-GB")}</td></tr>)}</tbody>
          </table>
        </div>

        <h2 className="mt-8 font-display text-xl font-bold text-navy"><Bi sw="Kumbukumbu" en="Audit log" /></h2>
        <ul className="mt-2 max-h-72 overflow-y-auto text-xs">
          {audit.map((a) => <li key={a.id} className="border-t border-silver/50 py-1"><span className="text-foreground/50">{new Date(a.at).toLocaleString("en-GB")}</span> · <b>{name(a.actor)}</b> · {a.action} {a.detail ? <span className="text-foreground/60">{JSON.stringify(a.detail)}</span> : null}</li>)}
        </ul>
      </section>
    </div>
  );
}
