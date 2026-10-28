"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { dialects } from "@/content/dialects";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { SignIn } from "./sign-in";
import { Bi } from "./lang";

const kinds = [
  ["phrase", "Word or phrase"],
  ["proverb", "Proverb (methali)"],
  ["story", "Story (hadithi)"],
  ["song", "Song (wimbo)"],
  ["clan", "Clan information (ukoo)"],
  ["correction", "Correction to existing content"],
] as const;

export function ContributeForm() {
  const sp = useSearchParams();
  const topic = sp.get("topic") ?? "";
  const kindPreset = sp.get("kind") ?? "phrase";
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string>("");
  const [recording, setRecording] = useState(false);
  const [secs, setSecs] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const timer = useRef<number | null>(null);
  const { session, loading } = useAuth();

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
      const r = new MediaRecorder(stream, { mimeType: mime });
      const chunks: BlobPart[] = [];
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = () => {
        const b = new Blob(chunks, { type: mime });
        setBlob(b);
        setUrl(URL.createObjectURL(b));
        stream.getTracks().forEach((t) => t.stop());
      };
      r.start();
      setRec(r);
      setRecording(true);
      setSecs(0);
      timer.current = window.setInterval(() => setSecs((s) => s + 1), 1000);
    } catch {
      setErr("Microphone access was refused. You can still submit text only.");
    }
  }
  function stop() {
    rec?.stop();
    setRecording(false);
    if (timer.current) window.clearInterval(timer.current);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const row = Object.fromEntries(fd.entries()) as Record<string, string>;
    if (!supabaseConfigured) {
      setErr("Submissions open once the database is connected. For now, send it to the team on WhatsApp.");
      setState("error");
      return;
    }
    setState("sending");
    try {
      const sb = supabase()!;
      let audio_path: string | null = null;
      if (blob) {
        const ext = blob.type.includes("mp4") ? "m4a" : "webm";
        const path = `${row.dialect}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await sb.storage.from("audio").upload(path, blob, { contentType: blob.type });
        if (error) throw error;
        audio_path = path;
      }
      const { error } = await sb.from("contributions").insert({
        contributor: session!.user.id,
        kind: row.kind, dialect: row.dialect, chagga: row.chagga, swahili: row.swahili || null, english: row.english || null,
        context: row.context || null, topic: row.topic || null, speaker_name: row.speaker_name || null, audio_path,
      });
      if (error) throw error;
      setState("done");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Something went wrong");
      setState("error");
    }
  }

  if (loading) return <p className="mt-6 text-foreground/60">…</p>;
  if (!session) return (
    <div className="mt-6 max-w-md">
      <p className="text-foreground/80"><Bi sw="Ingia kwanza ili mchango wako uhifadhiwe kwa jina lako na upate taarifa ukithibitishwa." en="Sign in first so your contribution is credited to you and you hear back when it's verified." /></p>
      <div className="mt-3"><SignIn next="/changia" compact /></div>
    </div>
  );

  if (state === "done") {
    return (
      <div className="card mt-6 border-amber/60 bg-amber/10 p-6">
        <p className="font-display text-xl font-bold text-navy">Aika mnu — thank you!</p>
        <p className="mt-2 text-foreground/80">Your contribution is in the queue for verification. Once two speakers confirm it, it goes live with the speaker credited.</p>
        <button className="btn-primary mt-4" onClick={() => { setState("idle"); setBlob(null); setUrl(""); }}>Add another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mt-6 space-y-5 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy">What is it?</span>
          <select name="kind" required defaultValue={kindPreset} className="mt-1 w-full rounded-xl border border-silver p-3">
            {kinds.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy">Dialect</span>
          <select name="dialect" required className="mt-1 w-full rounded-xl border border-silver p-3">
            {dialects.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            <option value="other">Other / not sure</option>
          </select>
        </label>
      </div>
      <input type="hidden" name="topic" value={topic} />
      {topic && <p className="rounded-xl bg-amber/10 p-3 text-sm text-navy">{topic.startsWith("ukoo:") ? <Bi sw={<>Ukoo: <b>{topic.slice(5)}</b> — andika eneo la asili, maana ya jina, babu wa kwanza, miiko, na chochote familia inachokijua. Kwenye kisanduku cha Kichagga andika jina la ukoo.</>} en={<>Clan: <b>{topic.slice(5)}</b> — give the home area, meaning of the name, first ancestor, taboos, anything the family knows. Put the clan name in the Chagga box.</>} /> : topic.startsWith("wimbo:") ? <Bi sw={<>Wimbo: <b>{topic.slice(6)}</b> — andika mistari unayoisikia kwa Kichagga, na maana yake kwa Kiswahili/Kiingereza. Mistari michache inatosha.</>} en={<>Song: <b>{topic.slice(6)}</b> — write the lines you can hear in Chagga and their meaning in Swahili/English. A few lines is enough.</>} /> : <>{topic}</>}</p>}

      <fieldset className="rounded-xl border border-silver p-4">
        <legend className="px-1 text-sm font-semibold text-navy">Recording (optional but valuable)</legend>
        <div className="flex flex-wrap items-center gap-3">
          {!recording ? (
            <button type="button" className="btn-amber" onClick={start}>● Record</button>
          ) : (
            <button type="button" className="btn-primary" onClick={stop}>■ Stop ({secs}s)</button>
          )}
          {url && <audio controls src={url} className="h-10" />}
          {url && <button type="button" className="btn-secondary" onClick={() => { setBlob(null); setUrl(""); }}>Discard</button>}
        </div>
        <p className="mt-2 text-xs text-foreground/60">Say it twice, slowly then naturally. Keep it under a minute.</p>
      </fieldset>

      <label className="block">
        <span className="text-sm font-semibold text-navy">In Chagga (as best you can write it)</span>
        <textarea name="chagga" required rows={2} className="mt-1 w-full rounded-xl border border-silver p-3" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-semibold text-navy">Swahili</span><input name="swahili" className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
        <label className="block"><span className="text-sm font-semibold text-navy">English</span><input name="english" className="mt-1 w-full rounded-xl border border-silver p-3" /></label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-navy">When is it used? Any story behind it?</span>
        <textarea name="context" rows={2} className="mt-1 w-full rounded-xl border border-silver p-3" />
      </label>

      <label className="block"><span className="text-sm font-semibold text-navy">Speaker&apos;s name, if not you (e.g. Bibi Anna Lyimo)</span><input name="speaker_name" className="mt-1 w-full rounded-xl border border-silver p-3" /></label>

      {err && <p className="rounded-xl bg-cherry/10 p-3 text-sm text-cherry">{err}</p>}
      <button className="btn-primary w-full" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit for verification"}</button>
    </form>
  );
}
