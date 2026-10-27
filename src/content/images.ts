// Photographs from Wikimedia Commons, all Creative Commons licensed. Each use must carry the credit
// (<Credit img={...} />). Replace with our own photos from recording days as they come in.
export type Img = { file: string; path: string; by: string; license: string; alt: string; alt_sw: string; w: number; h: number };

/** Direct thumbnail URL on upload.wikimedia.org (no redirect), so next/image can optimise it. */
// Wikimedia only serves bucketed widths (500 / 1280 / 1920 confirmed).
export const wm = (img: Img, width: 500 | 1280 | 1920 = 1280) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${img.path}/${width}px-${img.path.split("/").pop()}`;
export const wmPage = (img: Img) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(img.file.replace(/ /g, "_"))}`;

export const images = {
  hero: { file: "The view of mountain Kilimanjaro from Moshi town in Tanzania.jpg", path: "2/23/The_view_of_mountain_Kilimanjaro_from_Moshi_town_in_Tanzania.jpg", by: "Prosper Phissoo", license: "CC BY-SA 4.0", alt: "Kilimanjaro seen from Moshi town", alt_sw: "Kilimanjaro ikionekana kutoka mjini Moshi", w: 4864, h: 2736 },
  kibo: { file: "Kili Peak-2.jpg", path: "1/17/Kili_Peak-2.jpg", by: "Daniel Msirikale", license: "CC BY-SA 4.0", alt: "Snow-capped Kibo peak", alt_sw: "Kilele cha Kibo chenye theluji", w: 2500, h: 1667 },
  materuni: { file: "Vodopad Materuni u podnožju Nacionalnoga parka Kilimandžaro.jpg", path: "e/e8/Vodopad_Materuni_u_podno%C5%BEju_Nacionalnoga_parka_Kilimand%C5%BEaro.jpg", by: "Thomas Andy Branson", license: "CC BY-SA 4.0", alt: "Materuni waterfall", alt_sw: "Maporomoko ya Materuni", w: 5106, h: 3826 },
  chala: { file: "Lake Chala.jpg", path: "0/0e/Lake_Chala.jpg", by: "Joachim Huber", license: "CC BY-SA 2.0", alt: "Lake Chala crater lake", alt_sw: "Ziwa Chala", w: 3008, h: 2000 },
  kikuletwa: { file: "Kikuletwa hot spring 01.jpg", path: "8/80/Kikuletwa_hot_spring_01.jpg", by: "ZuriyEyna", license: "CC BY-SA 4.0", alt: "Kikuletwa hot springs", alt_sw: "Chemchemi za Kikuletwa", w: 3024, h: 4032 },
  moshi: { file: "Moshi - Tanzania.jpg", path: "3/3d/Moshi_-_Tanzania.jpg", by: "Wikimedia Commons contributor", license: "CC BY 4.0", alt: "Moshi, Tanzania", alt_sw: "Mji wa Moshi", w: 4000, h: 3000 },
  marangu: { file: "Marangu-2.jpg", path: "0/0a/Marangu-2.jpg", by: "Fanny Schertzer", license: "CC BY-SA 3.0", alt: "Marangu, at the foot of Kilimanjaro", alt_sw: "Marangu, chini ya Kilimanjaro", w: 3316, h: 2210 },
  maranguRoute: { file: "Kilimanjaro seen from Marangu route (16866692488).jpg", path: "6/69/Kilimanjaro_seen_from_Marangu_route_%2816866692488%29.jpg", by: "Wikimedia Commons contributor", license: "CC BY-SA 2.0", alt: "Kilimanjaro from the Marangu route", alt_sw: "Kilimanjaro kutoka njia ya Marangu", w: 3888, h: 2187 },
  mbege: { file: "Kibosho Maua Tanzania.jpg", path: "e/e8/Kibosho_Maua_Tanzania.jpg", by: "Leloojr", license: "CC BY-SA 4.0", alt: "Drinking mbege in Kibosho", alt_sw: "Kunywa mbege Kibosho", w: 3104, h: 1746 },
  mbegeSeller: { file: "Продавец бананового пива.jpg", path: "3/35/%D0%9F%D1%80%D0%BE%D0%B4%D0%B0%D0%B2%D0%B5%D1%86_%D0%B1%D0%B0%D0%BD%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE%D0%B3%D0%BE_%D0%BF%D0%B8%D0%B2%D0%B0.jpg", by: "Sergei Andreichuk", license: "CC BY-SA 4.0", alt: "Banana beer seller", alt_sw: "Muuza mbege", w: 2400, h: 3600 },
  chaggaDecember: { file: "December chagga 05.jpg", path: "e/ea/December_chagga_05.jpg", by: "Iddtembe255", license: "CC BY-SA 4.0", alt: "Christmas and New Year celebrations in Chagga land", alt_sw: "Sherehe za Krismasi na Mwaka Mpya Uchagani", w: 4160, h: 3120 },
  marealle: { file: "Mangi Marealle of Marangu c.1890s.jpg", path: "e/e7/Mangi_Marealle_of_Marangu_c.1890s.jpg", by: "Halidtz", license: "CC BY-SA 4.0", alt: "Mangi Marealle of Marangu, c. 1890s", alt_sw: "Mangi Marealle wa Marangu, miaka ya 1890", w: 2211, h: 2948 },
  coffee: { file: "Coffee Pulping Machine with Washing Tank - Tanzania.jpg", path: "d/d4/Coffee_Pulping_Machine_with_Washing_Tank_-_Tanzania.jpg", by: "Wikimedia Commons contributor", license: "CC BY-SA 4.0", alt: "Coffee pulping on a Kilimanjaro farm", alt_sw: "Kumenya kahawa kihambani", w: 2715, h: 4077 },
} satisfies Record<string, Img>;

export type ImgKey = keyof typeof images;

/** Which photo illustrates which attraction / article. */
export const attractionImage: Record<string, ImgKey> = {
  materuni: "materuni", kinukamori: "marangu", mreshe: "maranguRoute", "chagga-museum": "marangu", ndoro: "marangu",
  "lake-chala": "chala", kikuletwa: "kikuletwa", "old-moshi": "hero", "kibo-viewpoints": "kibo", "coffee-homestay": "coffee",
};
export const articleImage: Record<string, ImgKey> = {
  mbege: "mbege", "maruu-na-nyama": "mbegeSeller", kihamba: "coffee", mifongo: "maranguRoute", mreshe: "marangu",
  mangi: "marealle", "kinyala-lauwo": "kibo", methali: "chaggaDecember", ukoo: "chaggaDecember",
};
