"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { supabase, supabaseConfigured } from "./supabase";

export type Role = "admin" | "finance" | "editor" | "verifier" | "contributor" | "partner";
export type Profile = { id: string; email: string | null; name: string; phone: string | null; dialect: string | null; area: string | null; audience: "chagga" | "visitor"; country: string | null; wants_tier: string | null; can_record: boolean };
export type Membership = { id: string; tier: string; starts_on: string; expires_on: string; status: "pending" | "active" | "lapsed" | "cancelled" };
export type UserRole = { role: Role; dialect: string };

type Ctx = {
  sb: SupabaseClient | null;
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  roles: UserRole[];
  memberships: Membership[];
  active: Membership | null;         // currently valid paid membership
  isStaff: boolean;
  has: (r: Role, dialect?: string) => boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx>({ sb: null, loading: true, session: null, profile: null, roles: [], memberships: [], active: null, isStaff: false, has: () => false, refresh: async () => {}, signOut: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const sb = useMemo(() => (supabaseConfigured ? supabase() : null), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (s: Session | null) => {
    if (!sb || !s) { setProfile(null); setRoles([]); setMemberships([]); setLoading(false); return; }
    const [p, r, m] = await Promise.all([
      sb.from("profiles").select("*").eq("id", s.user.id).maybeSingle(),
      sb.from("user_roles").select("role,dialect").eq("user_id", s.user.id),
      sb.from("memberships").select("id,tier,starts_on,expires_on,status").eq("user_id", s.user.id).order("expires_on", { ascending: false }),
    ]);
    setProfile((p.data as Profile) ?? null);
    setRoles((r.data as UserRole[]) ?? []);
    setMemberships((m.data as Membership[]) ?? []);
    setLoading(false);
  }, [sb]);

  useEffect(() => {
    if (!sb) { setLoading(false); return; }
    sb.auth.getSession().then(({ data }) => { setSession(data.session); load(data.session); });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => { setSession(s); load(s); });
    return () => sub.subscription.unsubscribe();
  }, [sb, load]);

  // computed in the data loader (effect) rather than render, so prerendering stays stable
  const [active, setActive] = useState<Membership | null>(null);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setActive(memberships.find((m) => m.status === "active" && m.expires_on >= today) ?? null);
  }, [memberships]);
  const has = useCallback((r: Role, dialect?: string) =>
    roles.some((x) => x.role === "admin") || roles.some((x) => x.role === r && (x.dialect === "" || !dialect || x.dialect === dialect)), [roles]);
  const isStaff = roles.some((x) => ["admin", "finance", "editor", "verifier", "partner"].includes(x.role));

  const value: Ctx = {
    sb, loading, session, profile, roles, memberships, active, isStaff, has,
    refresh: () => load(session),
    signOut: async () => { await sb?.auth.signOut(); },
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

/** Send a magic link. `meta` is stored on the user and copied into profiles by a DB trigger on first sign-up. */
export async function sendMagicLink(email: string, meta?: Record<string, string | boolean>, next = "/akaunti") {
  const sb = supabase();
  if (!sb) throw new Error("Hifadhidata haijaunganishwa / database not connected");
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { data: meta, emailRedirectTo: `${window.location.origin}${next}` },
  });
  if (error) throw error;
}

export const tierLabel: Record<string, string> = { meku: "Meku", mangi: "Mangi", chifu: "Chifu", friend: "Kilimanjaro Friend", friend_plus: "Kilimanjaro Friend+" };
export const tierPrice: Record<string, string> = { meku: "TZS 10,000", mangi: "TZS 50,000", chifu: "TZS 250,000", friend: "USD 10", friend_plus: "USD 25" };
