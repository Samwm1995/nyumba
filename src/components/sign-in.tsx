"use client";
import { useState } from "react";
import { sendMagicLink } from "@/lib/auth";
import { Bi } from "./lang";

export function SignIn({ next = "/akaunti", compact = false }: { next?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try { await sendMagicLink(email.trim(), undefined, next); setState("sent"); }
    catch (ex) { setErr(ex instanceof Error ? ex.message : "Error"); setState("error"); }
  };

  if (state === "sent") return (
    <div className={`card ${compact ? "p-4" : "p-6"} border-amber/60 bg-amber/10`}>
      <p className="font-semibold text-navy"><Bi sw="Angalia barua pepe yako" en="Check your email" /></p>
      <p className="mt-1 text-sm text-foreground/80"><Bi sw={<>Tumetuma kiungo cha kuingia kwa <b>{email}</b>. Bonyeza kiungo hicho kwenye simu au kompyuta hii hii.</>} en={<>We sent a sign-in link to <b>{email}</b>. Open it on this same device.</>} /></p>
    </div>
  );
  return (
    <form onSubmit={submit} className={`card ${compact ? "p-4" : "p-6"} space-y-3`}>
      {!compact && <p className="font-display text-xl font-bold text-navy"><Bi sw="Ingia" en="Sign in" /></p>}
      <p className="text-sm text-foreground/80"><Bi sw="Hakuna nenosiri — tunakutumia kiungo kwa barua pepe." en="No password — we email you a sign-in link." /></p>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@..." className="w-full rounded-xl border border-silver p-3" />
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "…" : <Bi sw="Nitumie kiungo" en="Send me a link" />}</button>
      {state === "error" && <p className="text-sm text-cherry">{err}</p>}
    </form>
  );
}
