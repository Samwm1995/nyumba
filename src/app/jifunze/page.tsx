import Link from "next/link";
import { dialects } from "@/content/dialects";

export const metadata = { title: "Jifunze · Learn" };

export default function Learn() {
  return (
    <div>
      <h1 className="font-display text-3xl font-black text-navy">Jifunze Kichagga</h1>
      <p className="mt-2 max-w-2xl text-foreground/80">
        Pick your dialect. Each has short lessons with the English prompt, the Chagga phrase, and the yes/no replies —
        the way the elders taught it. Audio from native speakers is added as it is contributed.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {dialects.map((d) => (
          <Link key={d.slug} href={`/jifunze/${d.slug}`} className="card p-6 hover:border-navy/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-navy">{d.name}</h2>
                <p className="text-sm text-foreground/60">{d.area}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${d.status === "ready" ? "bg-navy text-ivory" : "bg-ivory text-coffee"}`}>
                {d.status === "ready" ? `${d.lessons.length} lessons` : "Collecting"}
              </span>
            </div>
            <p className="mt-3 text-foreground/80">{d.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
