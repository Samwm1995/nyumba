"use client";
import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

type Ev = { id: string; title: string; starts_at: string; location: string | null; description: string | null; dialect: string | null };

export function EventsList() {
  const [events, setEvents] = useState<Ev[] | null>(null);
  useEffect(() => {
    if (!supabaseConfigured) { setEvents([]); return; }
    supabase()!.from("events").select("*").gte("starts_at", new Date().toISOString()).order("starts_at").limit(20)
      .then(({ data }) => setEvents((data as Ev[]) ?? []));
  }, []);
  if (events === null) return <p className="mt-4 text-sm text-foreground/60">Loading…</p>;
  if (events.length === 0) return (
    <div className="card mt-4 p-5">
      <p className="font-semibold text-navy">No upcoming events yet.</p>
      <p className="text-sm text-foreground/80">The first one should be a recording day — a Saturday in Moshi with elders from two or three dialects. Join the register and we will announce it.</p>
    </div>
  );
  return (
    <ul className="mt-4 space-y-3">
      {events.map((e) => (
        <li key={e.id} className="card p-4">
          <p className="text-sm font-semibold text-amber">{new Date(e.starts_at).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
          <h3 className="font-display text-lg font-bold text-navy">{e.title}</h3>
          {e.location && <p className="text-sm text-foreground/70">{e.location}</p>}
          {e.description && <p className="mt-1 text-foreground/80">{e.description}</p>}
        </li>
      ))}
    </ul>
  );
}
