import Link from "next/link";
import { dialects } from "@/content/dialects";

export const metadata = { title: "Linganisha · Compare dialects" };

// Build a table of English prompts → each dialect's phrase, from the "salamu" lesson of each dialect.
function rows() {
  const byEn = new Map<string, Record<string, string>>();
  for (const d of dialects) {
    const l = d.lessons.find((x) => x.slug === "salamu");
    for (const it of l?.items ?? []) {
      const key = it.en.replace(/[.?]$/, "").toLowerCase();
      const r = byEn.get(key) ?? {};
      r.__en = it.en;
      r[d.slug] = it.ch;
      byEn.set(key, r);
    }
  }
  return [...byEn.values()];
}

export default function Compare() {
  const data = rows();
  return (
    <div>
      <h1 className="font-display text-3xl font-black text-navy">Linganisha lahaja</h1>
      <p className="mt-2 max-w-2xl text-foreground/80">
        The same phrase across the dialects, side by side. Empty cells are waiting for a speaker of that dialect —
        <Link href="/changia" className="underline"> fill one in</Link>.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-navy text-left text-ivory">
            <tr>
              <th className="p-3">English</th>
              {dialects.map((d) => <th key={d.slug} className="p-3">{d.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.__en} className="border-t border-silver/50">
                <td className="p-3 text-foreground/80">{r.__en}</td>
                {dialects.map((d) => (
                  <td key={d.slug} className="p-3">
                    {r[d.slug] && !r[d.slug].startsWith("[") ? <span className="ch">{r[d.slug]}</span> : <span className="text-foreground/40">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
