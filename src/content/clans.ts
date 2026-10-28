// Koo za Kichagga — a community directory. Area links are the commonly cited home ridge of each clan name;
// many clans live in several areas. Status "draft" until two members of that clan confirm it (Ofisi → Uhakiki).
// Sources: Urithi Wetu Wachagga (wachagga.com); "Majina ya Kichagga" (thehoodinfotainment, 2013);
// Wikipedia "Chagga people" (clan structure, origins); community knowledge — all pending verification.

export type ClanArea = { slug: string; name: string; zone: "Hai" | "Vunjo" | "Rombo"; note_sw: string; note_en: string; clans: string[] };

export const clanIntro = {
  sw: [
    "Kwa Wachagga, jina la ukoo (ukoo, kihamba cha baba) linarithiwa kutoka kwa baba kwenda kwa mwana — ndiyo maana majina kama Lyimo, Mushi, Kimaro au Massawe yanakuambia mara moja familia inatoka upande gani wa mlima.",
    "Watu wa ukoo mmoja walikaa pamoja: vihamba vya ndugu vinapakana, na mipaka ya koo ilitenganishwa kwa ua au tuta la udongo. Mti wa masale (isale) unatumika kuweka mipaka na amani; mkara ni ndugu wa bwana harusi anayesimama kama mdhamini wa ndoa.",
    "Asili ya koo ni mchanganyiko: koo nyingine zinasema zilitoka Ukambani, Usambara, Upare, Taita au kwa Wamasai; nyingine zinasema zimekuwa mlimani tangu zamani. Kabla ya 1899 kulikuwa na falme (umangi) 37 — kila mmoja na koo zake kuu.",
  ],
  en: [
    "A Chagga surname is a clan name, inherited from father to son — which is why Lyimo, Mushi, Kimaro or Massawe tells you at once which side of the mountain a family comes from.",
    "Clan members lived together: brothers' kihamba plots adjoin, and clan land was separated from the next clan by a hedge or earth bank. The masale (isale) plant marks boundaries and peace; the mkara is the groom's kinsman who stands as trustee of a marriage.",
    "Clan origins are mixed: some clans say they came from Ukamba, Usambara, Upare, Taita or from the Maasai; others say they have always been on the mountain. Before 1899 there were 37 chiefdoms (umangi), each with its leading clans.",
  ],
};

export const clanAreas: ClanArea[] = [
  { slug: "siha", name: "Siha · Masama · Kibongoto", zone: "Hai", note_sw: "Magharibi kabisa; falme za kale za Samake, Nguni, Kyuu na Mae. Ukoo wa Nkini ni wafua chuma maarufu wa Mae.", note_en: "The far west; ancient chiefdoms of Samake, Nguni, Kyuu and Mae. The Nkini clan were the famed blacksmiths of Mae.",
    clans: ["Nkini", "Shoo", "Mmari", "Nnko", "Kileo", "Kimambo", "Mbwambo", "Laswai", "Kimaro", "Sumari"] },
  { slug: "machame", name: "Machame · Kyuu", zone: "Hai", note_sw: "Ufalme mkubwa wa upande wa Hai; lahaja ya Kimachame.", note_en: "The large western chiefdom; home of the Kimachame dialect.",
    clans: ["Mushi", "Kimaro", "Swai", "Nkya", "Lema", "Urassa", "Ndosi", "Meena", "Mmari", "Ngowi", "Shirima", "Mallya", "Sawe", "Towo", "Mboya", "Nasari", "Lyatuu", "Kweka", "Mfinanga"] },
  { slug: "kibosho", name: "Kibosho", zone: "Hai", note_sw: "Wakibosho wanasema wamekuwa mlimani tangu zamani; ufalme wa Mangi Sina.", note_en: "The Kibosho say they have always inhabited the mountain; the chiefdom of Mangi Sina.",
    clans: ["Kessy", "Urio", "Minja", "Temba", "Towo", "Mkony", "Kimario", "Tarimo", "Mrosso", "Mmbando", "Ndesano", "Makule", "Shao", "Chao", "Akaro", "Matemba", "Morio", "Tilla", "Mafole", "Rite", "Mashayo", "Makawia", "Kituo", "Lyakundia", "Ndenshau", "Matowo", "Mariale"] },
  { slug: "uru-old-moshi", name: "Uru · Old Moshi (Tsudunyi)", zone: "Vunjo", note_sw: "Makazi ya Mangi Meli; Wamoshi wanasimuliwa kutoka Usambara. Lahaja ya Kiuru/Kimoshi.", note_en: "Seat of Mangi Meli; the Wamoshi are said to have come from Usambara. Kiuru/Kimoshi dialect.",
    clans: ["Moshi", "Temu", "Mlay", "Mlaki", "Kileo", "Kimambo", "Tesha", "Moshiro", "Mselle", "Mchome", "Olomi", "Mneney", "Mariki"] },
  { slug: "kirua-vunjo", name: "Kirua Vunjo", zone: "Vunjo", note_sw: "Kati ya Old Moshi na Kilema; sehemu ya eneo la Kivunjo.", note_en: "Between Old Moshi and Kilema; part of the Kivunjo-speaking belt.",
    clans: ["Lyimo", "Massawe", "Mtui", "Njau", "Mamuya", "Materu", "Ndesanjo"] },
  { slug: "kilema", name: "Kilema", zone: "Vunjo", note_sw: "Misheni ya kwanza ya Kikatoliki Uchagani (1890); mahandaki ya Mr̲eshe.", note_en: "First Catholic mission in Chagga land (1890); the Mr̲eshe tunnels.",
    clans: ["Sawe", "Usiri", "Shayo", "Kiwelu", "Makundi", "Urasa", "Mtui", "Moshi", "Meela", "Minja", "Njau", "Mosha"] },
  { slug: "marangu", name: "Marangu", zone: "Vunjo", note_sw: "Ufalme wa Mangi Marealle; Wamarangu wanasimuliwa kutoka Ukambani. Lango la Marangu la kupanda Kilimanjaro.", note_en: "Chiefdom of Mangi Marealle; the Wamarangu are said to descend from Ukamba. The Marangu gate to Kilimanjaro.",
    clans: ["Marealle", "Lyimo", "Massawe", "Lauwo", "Munuo", "Kiwelu", "Mmasi", "Makundi", "Shayo", "Mtui", "Kimario", "Lema"] },
  { slug: "mamba", name: "Mamba", zone: "Vunjo", note_sw: "Mashariki ya Marangu; vihamba vya kahawa na migomba.", note_en: "East of Marangu; coffee and banana homesteads.",
    clans: ["Lyimo", "Massawe", "Makundi", "Meena", "Mamuya", "Kavishe", "Mlaki", "Tesha", "Kimario"] },
  { slug: "mwika", name: "Mwika", zone: "Vunjo", note_sw: "Mpaka wa mashariki wa Kivunjo, kabla ya Rombo.", note_en: "The eastern edge of Kivunjo, before Rombo.",
    clans: ["Lyimo", "Massawe", "Shayo", "Mcharo", "Mkenda", "Tarimo", "Meena"] },
  { slug: "rombo", name: "Rombo · Mkuu · Mashati · Useri · Keni", zone: "Rombo", note_sw: "Upande wa mashariki hadi mpaka wa Kenya; Ziwa Chala. Lahaja ya Kirombo.", note_en: "The eastern side to the Kenyan border; Lake Chala. Kirombo dialect.",
    clans: ["Mramba", "Tarimo", "Kavishe", "Mariki", "Laswai", "Mallya", "Mrema", "Mkenda", "Massawe", "Lyaruu", "Makyao", "Mowo", "Lamtey", "Tairo", "Kauki", "Mtei", "Msuya", "Mcharo", "Kiriama", "Mchau", "Mushi"] },
];

export const allClans = [...new Set(clanAreas.flatMap((a) => a.clans))].sort((a, b) => a.localeCompare(b));
