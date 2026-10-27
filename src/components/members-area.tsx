"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth, tierLabel } from "@/lib/auth";
import { vunjo } from "@/content/vunjo";
import { SignIn } from "./sign-in";
import { Bi, useLang } from "./lang";

/**
 * Premium content lives here, in the browser only: no PDF, no download, printing blocked,
 * and the page re-checks the membership every time it mounts. When the membership lapses
 * the content disappears and the renewal box shows instead.
 */
export function MembersArea() {
  const { loading, session, active, profile } = useAuth();

  // Block printing / save-as while this page is open.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = "@media print { body { display:none !important } }";
    document.head.appendChild(style);
    const onKey = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && ["p", "s"].includes(e.key.toLowerCase())) e.preventDefault(); };
    window.addEventListener("keydown", onKey);
    return () => { style.remove(); window.removeEventListener("keydown", onKey); };
  }, []);

  if (loading) return <p className="text-foreground/60">…</p>;
  if (!session) return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl font-black text-navy"><Bi sw="Eneo la wanachama" en="Members' area" /></h1>
      <p className="mt-2 text-foreground/80"><Bi sw="Ingia ili kufungua kitabu cha misemo cha wanachama." en="Sign in to open the members' phrasebook." /></p>
      <div className="mt-4"><SignIn next="/wanachama" /></div>
    </div>
  );
  if (!active) return (
    <div className="mx-auto max-w-lg card p-6">
      <h1 className="font-display text-2xl font-black text-navy"><Bi sw="Uanachama unahitajika" en="Membership required" /></h1>
      <p className="mt-2 text-foreground/80"><Bi sw="Kitabu cha misemo cha wanachama, sauti za wazee na matoleo ya lahaja zote yanafunguka kwa wanachama wenye uanachama unaotumika (Meku, Mangi, Chifu au Kilimanjaro Friend)." en="The members' phrasebook, elder recordings and all-dialect editions open for members with a valid membership (Meku, Mangi, Chifu or Kilimanjaro Friend)." /></p>
      <Link href="/akaunti" className="btn-amber mt-4 inline-block"><Bi sw="Omba / huisha uanachama →" en="Request / renew membership →" /></Link>
    </div>
  );

  return <Phrasebook tier={active.tier} expires={active.expires_on} name={profile?.name ?? ""} />;
}

function Phrasebook({ tier, expires, name }: { tier: string; expires: string; name: string }) {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string>(vunjo.lessons[0].slug);
  const lessons = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return vunjo.lessons;
    return vunjo.lessons.map((l) => ({
      ...l,
      items: (l.items ?? []).filter((i) => [i.ch, i.en, i.sw].some((s) => s?.toLowerCase().includes(t))),
      drills: (l.drills ?? []).filter((d) => [d.q, d.en, d.sw, d.yes, d.no].some((s) => s?.toLowerCase().includes(t))),
    })).filter((l) => (l.items?.length ?? 0) + (l.drills?.length ?? 0) > 0);
  }, [q]);

  return (
    <div className="select-none" onContextMenu={(e) => e.preventDefault()}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber"><Bi sw="Toleo la wanachama" en="Members' edition" /></p>
          <h1 className="font-display text-3xl font-black text-navy">Jifunze Kivunjo</h1>
          <p className="text-sm text-foreground/70">{name} · {tierLabel[tier]} · <Bi sw="hadi" en="until" /> {new Date(expires + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "sw" ? "Tafuta msemo…" : "Search a phrase…"} className="w-full rounded-xl border border-silver p-3 sm:w-72" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="card hidden self-start p-3 lg:block">
          {vunjo.lessons.map((l, i) => (
            <button key={l.slug} onClick={() => { setOpen(l.slug); setQ(""); }} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${open === l.slug && !q ? "bg-navy text-ivory" : "hover:bg-silver/40"}`}>{i + 1}. {l.title}</button>
          ))}
        </nav>
        <div className="space-y-6">
          {(q ? lessons : lessons.filter((l) => l.slug === open)).map((l, idx) => (
            <section key={l.slug} className="card p-5 md:p-6">
              <h2 className="font-display text-2xl font-bold text-navy">{q ? "" : `${vunjo.lessons.indexOf(vunjo.lessons.find((x) => x.slug === l.slug)!) + 1}. `}{l.title}</h2>
              {l.intro && !q && <p className="mt-1 text-foreground/70">{l.intro}</p>}
              <table className="mt-4 w-full text-sm">
                <thead><tr className="text-left text-xs uppercase tracking-wider text-foreground/60"><th className="py-1">Kichagga</th><th className="py-1">Kiswahili</th><th className="py-1">English</th></tr></thead>
                <tbody>
                  {(l.items ?? []).map((it, i) => (
                    <tr key={i} className="border-t border-silver/50 align-top">
                      <td className="py-2 pr-3"><span className="ch text-base">{it.ch}</span>{it.reply && <div className="text-xs text-foreground/60">↳ {it.reply}</div>}</td>
                      <td className="py-2 pr-3 text-foreground/80">{it.sw ?? ""}</td>
                      <td className="py-2 text-foreground/80">{it.en}</td>
                    </tr>
                  ))}
                  {(l.drills ?? []).map((d, i) => (
                    <tr key={"d" + i} className="border-t border-silver/50 align-top">
                      <td className="py-2 pr-3"><span className="ch text-base">{d.q}</span><div className="text-xs text-foreground/60">✓ {d.yes} · ✗ {d.no}</div></td>
                      <td className="py-2 pr-3 text-foreground/80">{d.sw ?? ""}</td>
                      <td className="py-2 text-foreground/80">{d.en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!q && idx === 0 && (
                <div className="mt-4 flex justify-between text-sm">
                  <button className="btn-secondary" disabled={vunjo.lessons.findIndex((x) => x.slug === open) === 0} onClick={() => setOpen(vunjo.lessons[vunjo.lessons.findIndex((x) => x.slug === open) - 1].slug)}>← <Bi sw="Nyuma" en="Back" /></button>
                  <button className="btn-primary" disabled={vunjo.lessons.findIndex((x) => x.slug === open) === vunjo.lessons.length - 1} onClick={() => setOpen(vunjo.lessons[vunjo.lessons.findIndex((x) => x.slug === open) + 1].slug)}><Bi sw="Mbele" en="Next" /> →</button>
                </div>
              )}
            </section>
          ))}
          {q && lessons.length === 0 && <p className="text-foreground/60"><Bi sw="Hakuna msemo uliopatikana." en="No phrase found." /></p>}

          <section className="card p-5">
            <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Sarufi kwa ufupi" en="Grammar in brief" /></h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {(vunjo.grammar ?? []).map((g) => (
                <div key={g.title} className="rounded-xl border border-silver p-3 text-sm">
                  <p className="font-semibold text-navy">{g.title}</p>
                  <p className="mt-1 text-foreground/80">{g.body}</p>
                  {g.examples?.length ? <ul className="mt-2 space-y-1">{g.examples.map((e, i) => <li key={i}><span className="ch">{e[0]}</span> — {e[1]}</li>)}</ul> : null}
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Mazungumzo" en="Conversations" /></h2>
            {(vunjo.conversations ?? []).map((c) => (
              <div key={c.title} className="mt-4">
                <p className="font-semibold text-navy">{c.title}</p>
                <ul className="mt-1 space-y-1 text-sm">
                  {c.lines.map((ln, i) => <li key={i} className="grid gap-1 sm:grid-cols-3"><span className="ch">{ln[0]}</span><span className="text-foreground/80">{ln[2] ?? ""}</span><span className="text-foreground/80">{ln[1]}</span></li>)}
                </ul>
              </div>
            ))}
          </section>

          <p className="text-xs text-foreground/50"><Bi sw="Maudhui haya ni ya wanachama pekee; yanapatikana mtandaoni tu kwa muda wa uanachama. Chanzo: Leeman & Lauwo (2015), kwa ruhusa ya waandishi." en="Members-only content, available online for the duration of your membership. Source: Leeman & Lauwo (2015), with the authors' permission." /></p>
        </div>
      </div>
    </div>
  );
}
