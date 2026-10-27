"use client";
import Image from "next/image";
import { images, wm, wmPage, type ImgKey } from "@/content/images";
import { useLang } from "./lang";

/** A licensed photo with its required credit. `ratio` is a Tailwind aspect class. */
export function Photo({ k, ratio = "aspect-[16/9]", priority, sizes = "(min-width: 768px) 50vw, 100vw", className = "", hero }: { k: ImgKey; ratio?: string; priority?: boolean; sizes?: string; className?: string; hero?: boolean }) {
  const img = images[k];
  const { lang } = useLang();
  return (
    <figure className={`relative overflow-hidden rounded-2xl ${ratio} ${className}`}>
      <Image src={wm(img, hero ? 1920 : 1280)} alt={lang === "sw" ? img.alt_sw : img.alt} fill priority={priority} sizes={sizes} className="object-cover" />
      <figcaption className="absolute bottom-0 right-0 rounded-tl-lg bg-navy/60 px-2 py-0.5 text-[10px] text-ivory/90">
        <a href={wmPage(img)} target="_blank" rel="noreferrer license" className="hover:underline">© {img.by} · {img.license}</a>
      </figcaption>
    </figure>
  );
}
