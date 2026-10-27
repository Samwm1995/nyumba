"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Bi } from "../lang";
import { Status } from "./office";

type C = { id: string; created_at: string; contributor: string | null; kind: string; dialect: string; chagga: string; swahili: string | null; english: string | null; context: string | null; speaker_name: string | null; audio_path: string | null; status: string; profiles?: { name: string; area: string | null } | null };

/** Mid office: verifiers approve/reject contributions in their dialect. Two approvals → verified. */
export function VerifyQueue() {
  const { sb, session, has } = useAuth();
  const [rows, setRows] = useState<C[]>([]);
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [note, setNote] = useState<Record<string, string>>({});
  const [audio, setAudio] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<"pending" | "approved_1" | "rejected">("pending");

  const load = useCallback(async () => {
    if (!sb || !session) return;
    const { data } = await sb.from("contributions").select("*, profiles!contributions_contributor_fkey(name,area)").in("status", [filter]).order("created_at").limit(100);
    setRows((data as C[]) ?? []);
    const { data: ap } = await sb.from("approvals").select("contribution_id").eq("verifier", session.user.id);
    setMine(new Set((ap ?? []).map((a) => a.contribution_id)));
  }, [sb, session, filter]);
  useEffect(() => { load(); }, [load]);

  const decide = async (id: string, decision: "approve" | "reject") => {
    if (!sb || !session) return;
    const { error } = await sb.from("approvals").insert({ contribution_id: id, verifier: session.user.id, decision, note: note[id] || null });
    if (error) alert(error.message); else load();
  };
  const play = async (c: C) => {
    if (!sb || !c.audio_path) return;
    const { data } = await sb.storage.from("audio").createSignedUrl(c.audio_path, 600);
    if (data?.signedUrl) setAudio((a) => ({ ...a, [c.id]: data.signedUrl }));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["pending", "approved_1", "rejected"] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === f ? "bg-navy text-ivory" : "bg-silver/40"}`}>{f}</button>)}
        <span className="ml-auto text-sm text-foreground/60">{rows.length}</span>
      </div>
      <p className="mt-2 text-sm text-foreground/70"><Bi sw="Msemo unahitaji wahakiki wawili wa lahaja hiyo. Huwezi kuhakiki mchango wako mwenyewe." en="A phrase needs two verifiers of that dialect. You cannot verify your own contribution." /></p>
      {rows.length === 0 && <p className="mt-6 text-foreground/60"><Bi sw="Foleni tupu." en="Queue is empty." /></p>}
      <ul className="mt-4 space-y-3">
        {rows.map((c) => {
          const own = c.contributor === session?.user.id;
          const can = has("verifier", c.dialect) && !own && !mine.has(c.id) && c.status !== "rejected";
          return (
            <li key={c.id} className="card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="ch text-xl">{c.chagga}</p>
                  <p className="text-sm text-foreground/80">{c.swahili && <>🇹🇿 {c.swahili} · </>}{c.english && <>🇬🇧 {c.english}</>}</p>
                  {c.context && <p className="mt-1 text-xs text-foreground/60">{c.context}</p>}
                  <p className="mt-1 text-xs text-foreground/60">{c.dialect} · {c.kind}{c.speaker_name ? ` · msemaji: ${c.speaker_name}` : ""}{c.profiles?.name ? ` · kutoka: ${c.profiles.name}${c.profiles.area ? ` (${c.profiles.area})` : ""}` : ""} · {new Date(c.created_at).toLocaleDateString("en-GB")}</p>
                </div>
                <Status s={c.status} />
              </div>
              {c.audio_path && (audio[c.id] ? <audio controls controlsList="nodownload" src={audio[c.id]} className="mt-2 h-9 w-full" /> : <button className="btn-secondary mt-2 text-xs" onClick={() => play(c)}>▶ <Bi sw="Sikiliza sauti" en="Play audio" /></button>)}
              {can ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input placeholder="Maoni (si lazima)" value={note[c.id] ?? ""} onChange={(e) => setNote({ ...note, [c.id]: e.target.value })} className="min-w-[200px] flex-1 rounded-xl border border-silver p-2 text-sm" />
                  <button className="btn-primary text-sm" onClick={() => decide(c.id, "approve")}>✓ <Bi sw="Sahihi" en="Approve" /></button>
                  <button className="btn-secondary text-sm text-cherry" onClick={() => decide(c.id, "reject")}>✗ <Bi sw="Kataa" en="Reject" /></button>
                </div>
              ) : (
                <p className="mt-2 text-xs text-foreground/50">{own ? <Bi sw="Mchango wako" en="Your own contribution" /> : mine.has(c.id) ? <Bi sw="Umeshahakiki" en="You already reviewed this" /> : c.status === "rejected" ? "" : <Bi sw="Si lahaja yako" en="Not your dialect" />}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
