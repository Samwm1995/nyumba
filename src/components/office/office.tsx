"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { SignIn } from "../sign-in";
import { Bi } from "../lang";
import { VerifyQueue } from "./verify";
import { Publishing } from "./publishing";
import { Finance } from "./finance";
import { Leads } from "./leads";
import { Admin } from "./admin";

type Tab = { key: string; sw: string; en: string; show: boolean; el: React.ReactNode };

export function Office() {
  const { loading, session, isStaff, has, roles } = useAuth();
  const [tab, setTab] = useState<string | null>(null);

  if (loading) return <p className="text-foreground/60">…</p>;
  if (!session) return <div className="mx-auto max-w-md"><h1 className="font-display text-3xl font-black text-navy">Ofisi</h1><div className="mt-4"><SignIn next="/ofisi" /></div></div>;
  if (!isStaff) return (
    <div className="card mx-auto max-w-lg p-6">
      <h1 className="font-display text-2xl font-black text-navy"><Bi sw="Ofisi ni ya wafanyakazi tu" en="Staff only" /></h1>
      <p className="mt-2 text-foreground/80"><Bi sw="Akaunti yako haina jukumu la ofisi. Msimamizi anaweza kukupa jukumu (mhakiki, mhariri, fedha, mshirika)." en="Your account has no office role yet. An admin can grant one (verifier, editor, finance, partner)." /></p>
      <Link href="/akaunti" className="btn-secondary mt-4 inline-block">← <Bi sw="Akaunti" en="Account" /></Link>
    </div>
  );

  const tabs: Tab[] = [
    { key: "verify", sw: "Uhakiki", en: "Verification", show: has("verifier") || has("editor"), el: <VerifyQueue /> },
    { key: "publish", sw: "Uchapishaji", en: "Publishing", show: has("editor"), el: <Publishing /> },
    { key: "finance", sw: "Fedha", en: "Finance", show: has("finance"), el: <Finance /> },
    { key: "leads", sw: "Safari (Flightfront)", en: "Trips (Flightfront)", show: has("partner"), el: <Leads /> },
    { key: "admin", sw: "Utawala", en: "Admin", show: has("admin"), el: <Admin /> },
  ].filter((t) => t.show);
  const current = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber">Ofisi</p>
          <h1 className="font-display text-3xl font-black text-navy"><Bi sw="Ofisi ya Nyumba" en="House office" /></h1>
          <p className="text-sm text-foreground/70">{session.user.email} · {roles.map((r) => r.role + (r.dialect ? `:${r.dialect}` : "")).join(", ")}</p>
        </div>
        <Link href="/akaunti" className="text-sm underline"><Bi sw="Akaunti yangu" en="My account" /></Link>
      </div>
      <div className="mt-5 flex flex-wrap gap-2 border-b border-silver pb-3">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${current.key === t.key ? "bg-navy text-ivory" : "bg-silver/40 text-navy hover:bg-silver/70"}`}><Bi sw={t.sw} en={t.en} /></button>
        ))}
      </div>
      <div className="mt-6">{current.el}</div>
    </div>
  );
}

export const Status = ({ s }: { s: string }) => {
  const c: Record<string, string> = { pending: "bg-silver/50", approved_1: "bg-amber/30", verified: "bg-amber/60", published: "bg-navy text-ivory", rejected: "bg-cherry/15 text-cherry", active: "bg-amber/60", lapsed: "bg-silver/50", cancelled: "bg-cherry/15 text-cherry", unmatched: "bg-cherry/15 text-cherry", matched: "bg-amber/60", new: "bg-amber/30", contacted: "bg-silver/50", quoted: "bg-silver/50", booked: "bg-navy text-ivory", lost: "bg-cherry/15 text-cherry", proposed: "bg-silver/50", agreed: "bg-amber/30", paid: "bg-amber/60", live: "bg-navy text-ivory", ended: "bg-silver/50" };
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c[s] ?? "bg-silver/40"}`}>{s}</span>;
};

export const inp = "w-full rounded-xl border border-silver p-2 text-sm";
