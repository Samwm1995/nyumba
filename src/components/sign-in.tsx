"use client";
import { useEffect, useState } from "react";
import { sendMagicLink, useAuth } from "@/lib/auth";
import { Bi } from "./lang";

/**
 * Passwordless sign-in. We email a 6-digit code (and a link). Typing the code works from any
 * device/browser and is immune to email link scanners; the link also works on the same browser.
 */
export function SignIn({ next = "/akaunti", compact = false, presetEmail }: { next?: string; compact?: boolean; presetEmail?: string }) {
  const { sb } = useAuth();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "verifying" | "error">(presetEmail ? "sent" : "idle");
  const [err, setErr] = useState("");
  const [email, setEmail] = useState(presetEmail ?? "");
  const [code, setCode] = useState("");

  // If we landed here from an email link, finish the exchange and surface any error.
  useEffect(() => {
    if (!sb) return;
    const u = new URL(window.location.href);
    const c = u.searchParams.get("code");
    const hash = new URLSearchParams(u.hash.slice(1));
    const desc = u.searchParams.get("error_description") ?? hash.get("error_description");
    if (desc) { setErr(desc.replace(/\+/g, " ") + " — " + (navigator.language.startsWith("sw") ? "omba msimbo mpya hapa chini." : "request a new code below.")); setState("error"); }
    if (c) {
      sb.auth.exchangeCodeForSession(c).then(({ error }) => {
        if (error) { setErr(error.message + " — " + (navigator.language.startsWith("sw") ? "omba msimbo mpya hapa chini." : "request a new code below.")); setState("error"); }
        else window.history.replaceState({}, "", u.pathname);
      });
    }
  }, [sb]);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setState("sending"); setErr("");
    try { await sendMagicLink(email.trim(), undefined, next); setState("sent"); }
    catch (ex) { setErr(ex instanceof Error ? ex.message : "Error"); setState("error"); }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sb) return;
    setState("verifying"); setErr("");
    const { error } = await sb.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: "email" });
    if (error) { setErr(error.message); setState("sent"); }
    else window.location.assign(next);
  };

  const box = `card ${compact ? "p-4" : "p-6"} space-y-3`;

  if (state === "sent" || state === "verifying") return (
    <form onSubmit={verify} className={`${box} border-amber/60 bg-amber/10`}>
      <p className="font-semibold text-navy"><Bi sw="Angalia barua pepe yako" en="Check your email" /></p>
      <p className="text-sm text-foreground/80"><Bi sw={<>Tumetuma msimbo wa tarakimu 6 kwa <b>{email}</b>. Uandike hapa:</>} en={<>We sent a 6-digit code to <b>{email}</b>. Type it here:</>} /></p>
      <input inputMode="numeric" pattern="[0-9]*" maxLength={8} autoFocus value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" className="ch w-full rounded-xl border border-silver p-3 text-center text-2xl tracking-[0.4em]" />
      <button className="btn-primary w-full" disabled={state === "verifying" || code.length < 6}>{state === "verifying" ? "…" : <Bi sw="Ingia" en="Sign in" />}</button>
      {err && <p className="text-sm text-cherry">{err}</p>}
      <p className="text-xs text-foreground/60"><Bi sw="Haijafika? Angalia Spam/Promotions, au" en="Nothing yet? Check Spam/Promotions, or" /> <button type="button" onClick={() => send()} className="underline"><Bi sw="tuma tena" en="resend" /></button>. <Bi sw="Kiungo kilichomo kwenye barua pia kinafanya kazi kwenye kivinjari hiki hiki." en="The link in the email also works on this same browser." /></p>
    </form>
  );
  return (
    <form onSubmit={send} className={box}>
      {!compact && <p className="font-display text-xl font-bold text-navy"><Bi sw="Ingia" en="Sign in" /></p>}
      <p className="text-sm text-foreground/80"><Bi sw="Hakuna nenosiri — tunakutumia msimbo kwa barua pepe." en="No password — we email you a code." /></p>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@..." className="w-full rounded-xl border border-silver p-3" />
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "…" : <Bi sw="Nitumie msimbo" en="Send me a code" />}</button>
      {state === "error" && <p className="text-sm text-cherry">{err}</p>}
    </form>
  );
}
