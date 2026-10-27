"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "./lang";
import { useAuth } from "@/lib/auth";

const links = [
  { href: "/jifunze", label: "Jifunze", en: "Learn" },
  { href: "/linganisha", label: "Linganisha", en: "Compare" },
  { href: "/utamaduni", label: "Utamaduni", en: "Culture" },
  { href: "/vivutio", label: "Vivutio", en: "Visit" },
  { href: "/changia", label: "Changia", en: "Contribute" },
  { href: "/jumuiya", label: "Jumuiya", en: "Community" },
  { href: "/wadhamini", label: "Wadhamini", en: "Sponsors" },
  { href: "/unga-mkono", label: "Unga mkono", en: "Support" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const { session, isStaff, active } = useAuth();
  const account = session
    ? { href: isStaff ? "/ofisi" : active ? "/wanachama" : "/akaunti", label: isStaff ? "Ofisi" : active ? "Wanachama" : "Akaunti", en: isStaff ? "Office" : active ? "Members" : "Account" }
    : { href: "/akaunti", label: "Ingia", en: "Sign in" };
  const all = [...links, account];
  return (
    <>
      <nav className="hidden gap-1 lg:flex" aria-label="Main">
        {all.map((l) => {
          const active = path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2.5 py-2 text-sm font-semibold ${active ? "bg-navy text-ivory" : l.href === "/unga-mkono" ? "bg-amber/20 text-navy hover:bg-amber/40" : l === account ? "border border-navy/30 text-navy hover:bg-ivory" : "text-navy hover:bg-ivory"}`}
            >
              {lang === "en" ? l.en : l.label}
            </Link>
          );
        })}
      </nav>
      <button
        className="btn-secondary lg:hidden"
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-silver/60 bg-white p-2 shadow-lg lg:hidden" aria-label="Main">
          {all.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-ivory">
              {lang === "en" ? l.en : l.label} <span className="font-normal opacity-60">· {lang === "en" ? l.label : l.en}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
