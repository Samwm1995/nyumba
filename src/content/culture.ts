import type { CultureArticle } from "./types";

export const pillars: { key: CultureArticle["pillar"]; name: string; sw: string; blurb: string }[] = [
  { key: "mila", name: "Customs", sw: "Mila na Desturi", blurb: "Rites, ceremonies and everyday etiquette." },
  { key: "historia", name: "History", sw: "Historia", blurb: "Chiefdoms, the mountain kingdoms and migration." },
  { key: "chakula", name: "Food & drink", sw: "Chakula", blurb: "Mtori, kiburu, machalari, mbege — and when they are served." },
  { key: "nyimbo", name: "Songs & proverbs", sw: "Nyimbo na Methali", blurb: "Songs, sayings and folktales from the elders." },
  { key: "ukoo", name: "Clans", sw: "Ukoo", blurb: "Clan names, their areas and family lines." },
];

// Seed articles. Short on purpose: each is a starting point for the community to expand and verify.
export const articles: CultureArticle[] = [
  {
    slug: "mbege",
    pillar: "chakula",
    title: "Mbege — banana beer",
    summary: "The drink at the centre of every Chagga gathering, brewed from ripe bananas and finger millet.",
    body: [
      "Mbege (wari in Vunjo) is brewed from ripe bananas that are mashed, boiled and left to ferment, then mixed with a porridge of sprouted finger millet (mbeke) which gives it body and a slightly sour, smoky taste.",
      "It is served from a large pot into gourd cups using a kipata — a calabash ladle on a long stick. Mbege is shared at weddings, funerals, clan meetings and when settling disputes; refusing a cup is a serious matter.",
      "In the Vunjo course the authors note that 'people say the beer in this district is the best in the region' — a claim every Chagga area makes for itself.",
    ],
    source: "Community knowledge; Leeman & Lauwo (2015), Conversation 1.",
  },
  {
    slug: "maruu-na-nyama",
    pillar: "chakula",
    title: "Mar̲uu na nyama — the staple diet",
    summary: "Bananas and meat: the foundation of Chagga cooking, and the root of dishes like mtori and machalari.",
    body: [
      "The banana is the heart of the Chagga homestead (kihamba). Dozens of varieties are grown: some for cooking, some for brewing, some for eating ripe.",
      "Mtori is a smooth soup of cooking bananas and beef, traditionally given to new mothers. Machalari is bananas stewed with meat; kiburu is bananas mashed with beans. Ndafu is roast goat for celebrations.",
    ],
  },
  {
    slug: "kihamba",
    pillar: "mila",
    title: "The kihamba — a Chagga homestead",
    summary: "A family plot on the mountain slopes where bananas, coffee and shade trees grow together.",
    body: [
      "A kihamba is the inherited family plot: a dense garden of banana plants, coffee bushes, fruit trees and timber trees, fed by the mfongo — the irrigation channels Chagga engineers dug across the mountain centuries ago.",
      "Land passes through the family, traditionally to the youngest son, and the kihamba holds the family graves. It is why so many Chagga, wherever they live, still say 'home' means Kilimanjaro.",
    ],
  },
  {
    slug: "mifongo",
    pillar: "historia",
    title: "Mifongo — the irrigation channels",
    summary: "A network of hand-dug furrows that carried water from the forest streams to every kihamba.",
    body: [
      "Long before colonial rule, Chagga communities dug and maintained hundreds of kilometres of irrigation furrows (mfongo, plural mifongo), governed by clan elders who allocated water days to each household.",
      "Many are still in use. They are one of the oldest continuously running irrigation systems in Africa.",
    ],
  },
  {
    slug: "mreshe",
    pillar: "historia",
    title: "Mr̲eshe — the hidden tunnels",
    summary: "Underground passages where people and cattle sheltered from raids.",
    body: [
      "Across Kilimanjaro, especially in Marangu and Kilema, long tunnels were dug into the hillsides. Families and their cattle hid in them during Maasai raids and inter-chiefdom wars in the 18th and 19th centuries.",
      "Some have been reopened for visitors. The word appears in the Vunjo vocabulary list as 'old tunnels dug to conceal people and cattle from raiders'.",
    ],
    source: "Leeman & Lauwo (2015), vocabulary list.",
  },
  {
    slug: "mangi",
    pillar: "historia",
    title: "The Mangi — Chagga chiefdoms",
    summary: "Kilimanjaro was never one kingdom but dozens of chiefdoms, each led by a Mangi.",
    body: [
      "Each ridge of the mountain was its own chiefdom — Machame, Kibosho, Moshi, Marangu, Rombo and many more — ruled by a Mangi. Famous names include Mangi Rindi of Moshi, Mangi Sina of Kibosho, Mangi Marealle of Marangu and Mangi Meli of Moshi.",
      "In 1951 the chiefdoms elected a single paramount chief, Mangi Mkuu Thomas Marealle. Chiefdoms were abolished after independence in 1963, but the identities — and the dialects — remain.",
    ],
  },
  {
    slug: "kinyala-lauwo",
    pillar: "historia",
    title: "Kinyala Johannes Lauwo — the first known to summit",
    summary: "The Marangu guide who led the first recorded ascent of Kilimanjaro in 1889.",
    body: [
      "Yohani Kinyala Lauwo of Marangu guided Hans Meyer and Ludwig Purtscheller to the summit in October 1889 and showed them the tunnel through the glacier now called Johannes Notch.",
      "He is said to have lived to a very great age, dying in 1996. His story is told in the Vunjo course, co-written by his relative Trilas Matesha Lauwo.",
    ],
    source: "Leeman & Lauwo (2015), photo captions.",
  },
  {
    slug: "methali",
    pillar: "nyimbo",
    title: "Proverbs — add yours",
    summary: "We are collecting Chagga proverbs in every dialect, with the meaning and when it is said.",
    body: [
      "This section grows from contributions. Record a proverb from your grandparents under Changia — say it in the dialect, give the Swahili or English meaning, and tell us when people use it.",
    ],
  },
  {
    slug: "ukoo",
    pillar: "ukoo",
    title: "Clan names — a growing directory",
    summary: "Mushi, Moshi, Lyimo, Temu, Kimaro, Lauwo, Massawe, Mmari, Tarimo, Swai, Minja, Urio… and which ridge each comes from.",
    body: [
      "Chagga surnames are clan names, and most are tied to a specific area of the mountain. Add your clan, its home area and anything your family knows of its origin under Changia.",
    ],
  },
];
