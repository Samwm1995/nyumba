import { ImageResponse } from "next/og";
import { getDialect } from "@/content/dialects";
import { lordsPrayerVunjo } from "@/content/prayers";
import { crestDataUri, cinzelB64, cinzelXB64, ss4B64, ss6B64, ss7B64, ss4XB64, ss6XB64, ss7XB64 } from "./assets";


/**
 * Share card renderer: /api/card?d=vunjo&l=salamu&p=1&f=story|square
 * p = part (6 phrases per story, 4 per square). l=sala-ya-bwana renders the prayer.
 * Fonts and crest are inlined (assets.ts); nothing is fetched.
 */
type Row = { ch: string; sw?: string; en: string; yes?: string; no?: string };


export async function GET(req: Request) {
  const u = new URL(req.url);
  const d = u.searchParams.get("d") ?? "vunjo";
  const l = u.searchParams.get("l") ?? "salamu";
  const f = u.searchParams.get("f") === "square" && l !== "sala-ya-bwana" ? "square" : "story";
  const p = Math.max(1, Number(u.searchParams.get("p") ?? 1));
  const per = f === "story" ? 6 : 4;

  let title = "", kicker = "", sub = "", rows: Row[] = [], parts = 1;
  if (l === "sala-ya-bwana") {
    title = "Sala ya Bwana"; kicker = "Dini · Kiterewo kya Mndumii"; sub = "Kivunjo · Baba Yetu";
    rows = lordsPrayerVunjo.lines.map((x) => ({ ch: x.ch, sw: x.sw, en: x.en }));
  } else {
    const dialect = getDialect(d);
    const lesson = dialect?.lessons.find((x) => x.slug === l);
    if (!dialect || !lesson) return new Response("Not found", { status: 404 });
    const idx = dialect.lessons.indexOf(lesson) + 1;
    const all: Row[] = [
      ...(lesson.items ?? []).map((i) => ({ ch: i.ch, sw: i.sw, en: i.en })),
      ...(lesson.drills ?? []).map((x) => ({ ch: x.q, sw: x.sw, en: x.en, yes: x.yes, no: x.no })),
    ];
    parts = Math.max(1, Math.ceil(all.length / per));
    rows = all.slice((p - 1) * per, p * per);
    title = lesson.title; kicker = `Jifunze ${dialect.name} · Somo ${idx}`; sub = `${dialect.name} · ${dialect.area}${parts > 1 ? ` · ${p}/${parts}` : ""}`;
  }

  const buf = (x: string) => Buffer.from(x, "base64").buffer as ArrayBuffer;

  const W = 1080, H = f === "story" ? 1920 : 1080, S = f === "story";
  const crest = crestDataUri;
  const prayer = l === "sala-ya-bwana";
  const chSize = prayer ? 34 : S ? (rows.length === 1 ? 88 : 44) : rows.length === 1 ? 62 : 33;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", flexDirection: "column", padding: S ? "72px 80px" : "56px 64px", background: "linear-gradient(180deg,#163a5c 0%,#0b1f33 45%,#0b1f33 100%)", color: "#f3f0e6", fontFamily: "SS, SSX" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={crest} width={S ? 150 : 110} height={S ? 150 : 110} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cinzel, CinzelX", color: "#e07a2f", letterSpacing: 8, textTransform: "uppercase", fontSize: S ? 24 : 20 }}>{kicker}</div>
            <div style={{ fontFamily: "Cinzel, CinzelX", fontSize: S ? 54 : 40, lineHeight: 1.05, marginTop: 8, textTransform: "uppercase" }}>{title}</div>
            <div style={{ color: "#c9d3dd", fontSize: S ? 24 : 19, marginTop: 6 }}>{sub}</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", gap: prayer ? 20 : S ? 34 : 22, margin: S ? "40px 0" : "24px 0" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", borderLeft: "6px solid #e07a2f", paddingLeft: S ? 28 : 22 }}>
              <div style={{ fontFamily: "Cinzel, CinzelX", fontSize: chSize, lineHeight: 1.15, color: "#ffffff", textTransform: "uppercase" }}>{r.ch}</div>
              {r.sw && <div style={{ fontSize: prayer ? 22 : S ? 30 : 23, fontWeight: 600, marginTop: 8 }}>{r.sw}</div>}
              <div style={{ fontSize: prayer ? 20 : S ? 26 : 20, color: "#c9d3dd", marginTop: 2 }}>{r.en}</div>
              {r.yes && <div style={{ fontSize: S ? 24 : 19, color: "#e07a2f", marginTop: 6 }}>{`✓ ${r.yes}   ·   ✗ ${r.no}`}</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(201,211,221,.25)", paddingTop: 28 }}>
          <div style={{ fontFamily: "Cinzel, CinzelX", fontSize: S ? 30 : 24, color: "#e07a2f" }}>nyumbayawachagga.co.tz</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: S ? 22 : 17, color: "#c9d3dd", lineHeight: 1.3 }}>
            <div>Vijana wa Kichagga · Kilimanjaro ni Kwetu</div>
            <div>Kichagga · Kiswahili · English</div>
          </div>
        </div>
      </div>
    ),
    {
      width: W, height: H,
      fonts: [
        { name: "Cinzel", data: buf(cinzelB64), weight: 700, style: "normal" },
        { name: "CinzelX", data: buf(cinzelXB64), weight: 700, style: "normal" },
        { name: "SS", data: buf(ss4B64), weight: 400, style: "normal" },
        { name: "SS", data: buf(ss6B64), weight: 600, style: "normal" },
        { name: "SS", data: buf(ss7B64), weight: 700, style: "normal" },
        { name: "SSX", data: buf(ss4XB64), weight: 400, style: "normal" },
        { name: "SSX", data: buf(ss6XB64), weight: 600, style: "normal" },
        { name: "SSX", data: buf(ss7XB64), weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
    },
  );
}
