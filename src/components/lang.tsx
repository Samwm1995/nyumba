"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "sw" | "en";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "sw", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sw");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nyumba:lang") as Lang | null;
      if (saved === "sw" || saved === "en") setLangState(saved);
      else if (!navigator.language.toLowerCase().startsWith("sw")) setLangState("en");
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("nyumba:lang", l); } catch {}
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/** Renders Swahili or English depending on the chosen language. */
export function Bi({ sw, en }: { sw: React.ReactNode; en: React.ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : sw}</>;
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex overflow-hidden rounded-lg border border-navy/20 text-xs font-bold" role="group" aria-label="Language">
      {(["sw", "en"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`min-h-9 px-2.5 ${lang === l ? "bg-navy text-ivory" : "bg-white text-navy"}`}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
