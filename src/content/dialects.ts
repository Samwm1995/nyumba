import type { Dialect } from "./types";
import { vunjo } from "./vunjo";

// Starter phrases shared across dialects so the compare view has something to show.
// Entries marked [KUTHIBITISHWA] need confirmation by a native speaker before they go live.
const starter = (ch: Record<string, string>) => [
  { en: "How are you?", ch: ch.how ?? "" },
  { en: "I am well", ch: ch.well ?? "" },
  { en: "Thank you", ch: ch.thanks ?? "" },
  { en: "Goodbye", ch: ch.bye ?? "" },
  { en: "Water", ch: ch.water ?? "" },
  { en: "Bananas", ch: ch.bananas ?? "" },
  { en: "Beer (mbege)", ch: ch.beer ?? "" },
  { en: "God", ch: ch.god ?? "" },
];

export const machame: Dialect = {
  slug: "machame",
  name: "Kimachame",
  area: "Machame · Masama · Siha · Kibongoto (Hai, western Kilimanjaro)",
  description:
    "The western dialect of Kichagga, spoken in Hai district. One of the largest Chagga dialect groups.",
  status: "collecting",
  lessons: [
    {
      slug: "salamu",
      title: "Greetings — awaiting native-speaker audio",
      intro: "We are collecting these from Kimachame speakers. Know the dialect? Add your voice under Changia.",
      items: starter({ how: "[KUTHIBITISHWA]", well: "", thanks: "", bye: "", water: "", bananas: "", beer: "", god: "" }),
    },
  ],
};

export const rombo: Dialect = {
  slug: "rombo",
  name: "Kirombo",
  area: "Rombo · Mashati · Useri · Mkuu (eastern Kilimanjaro)",
  description:
    "Spoken on the eastern side of the mountain, bordering Kenya. Rombo speech is noticeably different from Vunjo and Machame.",
  status: "collecting",
  lessons: [
    {
      slug: "salamu",
      title: "Greetings — awaiting native-speaker audio",
      intro: "We are collecting these from Kirombo speakers. Know the dialect? Add your voice under Changia.",
      items: starter({}),
    },
  ],
};

export const kibosho: Dialect = {
  slug: "kibosho",
  name: "Kikibosho / Kiuru",
  area: "Kibosho · Uru · Old Moshi (central Kilimanjaro)",
  description:
    "The central dialects around Kibosho, Uru and Old Moshi, between the Machame and Vunjo areas.",
  status: "collecting",
  lessons: [
    {
      slug: "salamu",
      title: "Greetings — awaiting native-speaker audio",
      intro: "We are collecting these from Kibosho and Uru speakers. Know the dialect? Add your voice under Changia.",
      items: starter({}),
    },
  ],
};

export const dialects: Dialect[] = [{ ...vunjo, status: "ready" }, machame, kibosho, rombo];

export const getDialect = (slug: string) => dialects.find((d) => d.slug === slug);
