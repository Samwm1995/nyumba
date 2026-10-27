"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth, tierLabel, tierPrice } from "@/lib/auth";
import { payment } from "@/content/support";
import { SignIn } from "./sign-in";
import { Bi } from "./lang";

const dateFmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const daysLeft = (d: string) => Math.ceil((new Date(d + "T00:00:00").getTime() - Date.now()) / 86400000);

export function AccountView() {
  const { loading, session, profile, memberships, active, isStaff, signOut, sb, refresh } = useAuth();
  const [tier, setTier] = useState("meku");
  const [busy, setBusy] = useState(false);

  if (loading) return <p className="text-foreground/60">…</p>;
  if (!session) return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-3xl font-black text-navy"><Bi sw="Akaunti yangu" en="My account" /></h1>
      <p className="mt-2 text-foreground/80"><Bi sw="Ingia ili kuona uanachama wako, michango yako na eneo la wanachama." en="Sign in to see your membership, your contributions and the members' area." /></p>
      <div className="mt-4"><SignIn /></div>
      <p className="mt-4 text-sm text-foreground/70"><Bi sw={<>Bado hujajiunga? <Link className="underline" href="/jumuiya">Jisajili hapa</Link>.</>} en={<>Not registered yet? <Link className="underline" href="/jumuiya">Register here</Link>.</>} /></p>
    </div>
  );

  const pending = memberships.find((m) => m.status === "pending");
  const isVisitor = profile?.audience === "visitor";

  const request = async () => {
    if (!sb) return;
    setBusy(true);
    const exp = new Date(); exp.setFullYear(exp.getFullYear() + 1);
    await sb.from("memberships").insert({ user_id: session.user.id, tier, status: "pending", expires_on: exp.toISOString().slice(0, 10) });
    await refresh();
    setBusy(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black text-navy">{profile?.name || session.user.email}</h1>
          <p className="text-sm text-foreground/70">{session.user.email}{profile?.dialect ? ` · ${profile.dialect}` : ""}{profile?.area ? ` · ${profile.area}` : ""}</p>
        </div>
        <div className="flex gap-2">
          {isStaff && <Link href="/ofisi" className="btn-amber"><Bi sw="Ofisi" en="Office" /></Link>}
          <button onClick={signOut} className="btn-secondary"><Bi sw="Toka" en="Sign out" /></button>
        </div>
      </div>

      {/* Membership status */}
      <section className={`card p-6 ${active ? "border-amber ring-2 ring-amber/30" : ""}`}>
        <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Uanachama" en="Membership" /></h2>
        {active ? (
          <div className="mt-2">
            <p className="text-lg"><b>{tierLabel[active.tier] ?? active.tier}</b> · <Bi sw="unaisha" en="expires" /> {dateFmt(active.expires_on)}
              {daysLeft(active.expires_on) <= 30 && <span className="ml-2 rounded-full bg-cherry/10 px-2 py-0.5 text-sm text-cherry"><Bi sw={`siku ${daysLeft(active.expires_on)} zimebaki`} en={`${daysLeft(active.expires_on)} days left`} /></span>}
            </p>
            <Link href="/wanachama" className="btn-primary mt-3 inline-block"><Bi sw="Fungua eneo la wanachama →" en="Open the members' area →" /></Link>
            {daysLeft(active.expires_on) <= 30 && <PayBox tier={active.tier} renew />}
          </div>
        ) : pending ? (
          <div className="mt-2">
            <p><Bi sw={<>Ombi lako la <b>{tierLabel[pending.tier]}</b> linasubiri malipo / uthibitisho.</>} en={<>Your <b>{tierLabel[pending.tier]}</b> request is awaiting payment / confirmation.</>} /></p>
            <PayBox tier={pending.tier} />
          </div>
        ) : (
          <div className="mt-2 space-y-3">
            <p className="text-foreground/80"><Bi sw="Hauna uanachama unaotumika. Chagua ngazi:" en="No active membership. Choose a tier:" /></p>
            <div className="flex flex-wrap gap-2">
              {(isVisitor ? ["friend", "friend_plus"] : ["meku", "mangi", "chifu"]).map((t) => (
                <button key={t} onClick={() => setTier(t)} className={`rounded-xl border px-4 py-2 text-sm ${tier === t ? "border-navy bg-navy text-ivory" : "border-silver"}`}>{tierLabel[t]} · {tierPrice[t]}</button>
              ))}
            </div>
            <button onClick={request} disabled={busy} className="btn-primary"><Bi sw="Omba uanachama" en="Request membership" /></button>
            <p className="text-xs text-foreground/60"><Bi sw="Baada ya kuomba utaona maelekezo ya kulipa. Uanachama unaanza siku malipo yanapothibitishwa." en="You'll see payment instructions after requesting. Membership starts the day payment is confirmed." /></p>
          </div>
        )}
      </section>

      <MyContributions />
    </div>
  );
}

function PayBox({ tier, renew }: { tier: string; renew?: boolean }) {
  const { session } = useAuth();
  const isUsd = tier.startsWith("friend");
  const wa = `https://wa.me/${payment.whatsapp}?text=${encodeURIComponent(`Nimelipa uanachama ${tierLabel[tier]} (${tierPrice[tier]}). Email: ${session?.user.email}. Ujumbe wa malipo: ____`)}`;
  return (
    <div className="mt-4 grid gap-4 rounded-xl border border-silver bg-ivory/60 p-4 md:grid-cols-[auto_1fr]">
      {!isUsd && <Image src={payment.qr} alt="TanQR" width={140} height={140} className="rounded-lg border border-silver" />}
      <div className="text-sm">
        <p className="font-semibold text-navy">{renew ? <Bi sw="Huisha uanachama" en="Renew" /> : <Bi sw="Lipa" en="Pay" />} {tierLabel[tier]} — {tierPrice[tier]}</p>
        {isUsd ? (
          <p className="mt-1 text-foreground/80">We&apos;ll send a card payment link (Flightfront Limited) to your email within a day. Or pay by mobile money to Lipa Namba <b>{payment.lipaNamba}</b> if you are in Tanzania.</p>
        ) : (
          <p className="mt-1 text-foreground/80"><Bi sw={<>Lipa Namba <b className="ch text-base">{payment.lipaNamba}</b> ({payment.accountName}) kwa M-Pesa, Tigo Pesa, Airtel Money, HaloPesa au benki — au scan TanQR.</>} en={<>Lipa Namba <b className="ch text-base">{payment.lipaNamba}</b> ({payment.accountName}) via M-Pesa, Tigo Pesa, Airtel Money, HaloPesa or bank — or scan the TanQR.</>} /></p>
        )}
        <a href={wa} target="_blank" rel="noreferrer" className="btn-amber mt-3 inline-block"><Bi sw="Nimelipa — tuma uthibitisho" en="I've paid — send confirmation" /></a>
        <p className="mt-2 text-xs text-foreground/60"><Bi sw="Timu ya fedha inathibitisha malipo na kuwasha uanachama, kawaida ndani ya saa 24." en="Our finance team confirms the payment and activates your membership, usually within 24 hours." /></p>
      </div>
    </div>
  );
}

function MyContributions() {
  const { sb, session } = useAuth();
  const [rows, setRows] = useState<{ id: string; kind: string; dialect: string; chagga: string; status: string; created_at: string }[] | null>(null);
  useEffect(() => {
    if (!sb || !session) return;
    sb.from("contributions").select("id,kind,dialect,chagga,status,created_at").eq("contributor", session.user.id).order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => setRows(data ?? []));
  }, [sb, session]);
  const label: Record<string, string> = { pending: "inasubiri", approved_1: "imethibitishwa 1/2", verified: "imethibitishwa", published: "imechapishwa", rejected: "imekataliwa" };
  return (
    <section className="card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy"><Bi sw="Michango yangu" en="My contributions" /></h2>
        <Link href="/changia" className="btn-secondary text-sm"><Bi sw="+ Changia" en="+ Contribute" /></Link>
      </div>
      {!rows || rows.length === 0 ? <p className="mt-2 text-sm text-foreground/70"><Bi sw="Bado hujachangia msemo wowote." en="You haven't contributed anything yet." /></p> : (
        <ul className="mt-3 divide-y divide-silver/60 text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-2">
              <span><span className="ch">{r.chagga}</span> <span className="text-foreground/60">· {r.dialect} · {r.kind}</span></span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "published" ? "bg-amber/20 text-coffee" : r.status === "rejected" ? "bg-cherry/10 text-cherry" : "bg-silver/40"}`}>{label[r.status] ?? r.status}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
