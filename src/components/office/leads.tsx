"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Bi } from "../lang";
import { Status, inp } from "./office";

type L = { id: string; created_at: string; name: string | null; contact: string | null; country: string | null; travel_date: string | null; operator: string | null; interest: string | null; source: string | null; status: string; notes: string | null };

/** Front office (partner = Flightfront): trip & climber leads from visitor registrations and Vivutio. */
export function Leads() {
  const { sb } = useAuth();
  const [rows, setRows] = useState<L[]>([]);
  const [show, setShow] = useState<"open" | "all">("open");
  const load = useCallback(async () => {
    if (!sb) return;
    const q = sb.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
    const { data } = show === "open" ? await q.in("status", ["new", "contacted", "quoted"]) : await q;
    setRows((data as L[]) ?? []);
  }, [sb, show]);
  useEffect(() => { load(); }, [load]);

  const set = async (id: string, patch: Partial<L>) => { await sb!.from("leads").update(patch).eq("id", id); load(); };

  return (
    <div>
      <div className="flex items-center gap-2">
        {(["open", "all"] as const).map((f) => <button key={f} onClick={() => setShow(f)} className={`rounded-full px-3 py-1 text-xs font-semibold ${show === f ? "bg-navy text-ivory" : "bg-silver/40"}`}>{f}</button>)}
        <span className="ml-auto text-sm text-foreground/60">{rows.length}</span>
      </div>
      <p className="mt-2 text-sm text-foreground/70"><Bi sw="Wageni waliojisajili na kuonyesha nia ya safari, na maombi kutoka Vivutio. Flightfront inatoa bei na kuhudumia." en="Visitors who registered with trip interests, plus requests from Vivutio. Flightfront quotes and serves them." /></p>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-navy text-left text-ivory"><tr><th className="p-2">Date</th><th className="p-2">Name</th><th className="p-2">Contact</th><th className="p-2">Country</th><th className="p-2">Travel</th><th className="p-2">Interest</th><th className="p-2">Status</th><th className="p-2">Notes</th></tr></thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id} className="border-t border-silver/50 align-top">
                <td className="p-2 text-xs">{new Date(l.created_at).toLocaleDateString("en-GB")}</td>
                <td className="p-2 font-semibold">{l.name}</td>
                <td className="p-2 text-xs">{l.contact}</td>
                <td className="p-2">{l.country}</td>
                <td className="p-2 text-xs">{l.travel_date ?? "—"}{l.operator ? <><br />{l.operator}</> : null}</td>
                <td className="p-2 text-xs">{l.interest}</td>
                <td className="p-2"><select className={inp + " w-auto"} value={l.status} onChange={(e) => set(l.id, { status: e.target.value })}>{["new", "contacted", "quoted", "booked", "lost"].map((x) => <option key={x}>{x}</option>)}</select></td>
                <td className="p-2"><input className={inp} defaultValue={l.notes ?? ""} onBlur={(e) => e.target.value !== (l.notes ?? "") && set(l.id, { notes: e.target.value })} /></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={8} className="p-4 text-center text-foreground/60"><Bi sw="Hakuna." en="None." /></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
