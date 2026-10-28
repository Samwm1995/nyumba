import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { Nav } from "@/components/nav";
import { LangProvider, LangToggle } from "@/components/lang";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/footer";


export const metadata: Metadata = {
  title: { default: "Nyumba ya Wachagga", template: "%s · Nyumba ya Wachagga" },
  description: "Learn Kichagga in its dialects and keep Chagga culture alive — Vijana wa Kichagga, Kilimanjaro ni kwetu.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
};

export const viewport: Viewport = { themeColor: "#0b1f33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sw" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col">
        <LangProvider><AuthProvider>
        <header className="sticky top-0 z-30 border-b border-silver/60 bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/crest.png" alt="" width={44} height={44} priority />
              <span className="font-display text-base font-bold leading-tight text-navy sm:text-lg">
                Nyumba ya <span className="hidden sm:inline">Wachagga</span>
                <span className="sm:hidden">Wachagga</span>
              </span>
            </Link>
            <div className="flex items-center gap-2"><LangToggle /><Nav /></div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <Footer />
        </AuthProvider></LangProvider>
      </body>
    </html>
  );
}
