"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/jifunze", label: "Jifunze", en: "Learn" },
  { href: "/linganisha", label: "Linganisha", en: "Compare" },
  { href: "/utamaduni", label: "Utamaduni", en: "Culture" },
  { href: "/changia", label: "Changia", en: "Contribute" },
  { href: "/jumuiya", label: "Jumuiya", en: "Community" },
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="hidden gap-1 md:flex" aria-label="Main">
        {links.map((l) => {
          const active = path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${active ? "bg-navy text-ivory" : "text-navy hover:bg-ivory"}`}
            >
              {l.label} <span className="font-normal opacity-60">· {l.en}</span>
            </Link>
          );
        })}
      </nav>
      <button
        className="btn-secondary md:hidden"
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-silver/60 bg-white p-2 shadow-lg md:hidden" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-ivory">
              {l.label} <span className="font-normal opacity-60">· {l.en}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
