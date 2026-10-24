"use client";
import { useState } from "react";
import { dialects } from "@/content/dialects";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export function JoinForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const row = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!supabaseConfigured) { setErr("Sign-up opens once the database is connected."); setState("error"); return; }
    setState("sending");
    const { error } = await supabase()!.from("members").insert({
      name: row.name, email: row.email, phone: row.phone || null, dialect: row.dialect, area: row.area || null,
      can_record: row.can_record === "on", note: row.note || null,
    });
    if (error) { setErr(error.message.includes("duplicate") ? "That email is already registered — karibu tena!" : error.message); setState("error"); return; }
    setState("done");
  }

  if (state === "done") return <div className="card mt-4 border-amber/60 bg-amber/10 p-5"><p className="font-display text-lg font-bold text-navy">Karibu nyumbani!</p><p className="text-foreground/80">You are on the register. We will be in touch about recordings and meetups.</p></div>;

  return (
    <form onSubmit={submit} className="card mt-4 space-y-4 p-5">
      <label className="block"><span className="text-sm font-semibold text-navy">Name</span><input name="name" required className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-semibold text-navy">Email</span><input name="email" type="email" required className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
        <label className="block"><span className="text-sm font-semibold text-navy">WhatsApp (optional)</span><input name="phone" className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-semibold text-navy">Your dialect</span>
          <select name="dialect" className="mt-1 w-full rounded-xl border border-silver p-3">
            {dialects.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            <option value="learning">Still learning / not sure</option>
          </select></label>
        <label className="block"><span className="text-sm font-semibold text-navy">Home area</span><input name="area" placeholder="e.g. Kibosho Kati" className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      </div>
      <label className="flex items-center gap-3 rounded-xl border border-silver p-3"><input type="checkbox" name="can_record" className="h-5 w-5" /><span>I can record elders in my area</span></label>
      <label className="block"><span className="text-sm font-semibold text-navy">Anything else</span><textarea name="note" rows={2} className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      {err && <p className="rounded-xl bg-cherry/10 p-3 text-sm text-cherry">{err}</p>}
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "Joining…" : "Join the register"}</button>
    </form>
  );
}
