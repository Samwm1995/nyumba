export const payment = {
  provider: "Selcom · TanQR",
  lipaNamba: "6109 9089",
  accountName: "FLIGHTFRONT",
  qr: "/selcom-qr.png",
  whatsapp: "255741549014",
  note: "Malipo yanapokelewa kupitia Flightfront Limited, mshirika wa Nyumba ya Wachagga.",
};

export const tiers = [
  { key: "rafiki", name: "Rafiki", sw: "Rafiki wa Nyumba", price: 10000, period: "kwa mwaka", perks: ["Jina lako kwenye Ukuta wa Marafiki", "Taarifa za masomo na matukio mapya kwanza", "Kadi ya uanachama (PDF)"] },
  { key: "mlezi", name: "Mlezi", sw: "Mlezi wa Lahaja", price: 50000, period: "kwa mwaka", perks: ["Yote ya Rafiki", "Kitabu cha misemo kilichochapishwa (A5)", "Shukrani kwenye ukurasa wa lahaja unayoichagua", "Mwaliko wa Siku ya Kurekodi"], featured: true },
  { key: "mzee", name: "Mzee wa Baraza", sw: "Mzee wa Baraza", price: 250000, period: "kwa mwaka", perks: ["Yote ya Mlezi", "Jina/nembo kwenye ukurasa wa mbele", "Nakala 5 za kitabu kwa shule au kanisa unalochagua", "Kiti cha ushauri kwenye Baraza la Nyumba"] },
];

export const sponsorPackages = [
  { name: "Mdhamini wa Lahaja · Dialect Sponsor", price: "TZS 2,000,000 / mwaka", perks: ["“Masomo ya Kimachame yanaletwa kwako na ___” kwenye kila somo la lahaja hiyo", "Nembo kwenye kitabu cha misemo cha lahaja hiyo", "Machapisho 4 kwenye WhatsApp Channel na mitandao", "Ripoti ya robo mwaka: wanafunzi, misemo, rekodi"] },
  { name: "Mdhamini wa Sehemu · Section Sponsor", price: "TZS 1,000,000 / mwaka", perks: ["Nembo kwenye sehemu moja: Utamaduni, Vivutio au Jumuiya", "Machapisho 2 kwa mwaka", "Shukrani kwenye ukurasa wa Wadhamini"] },
  { name: "Mdhamini wa Tukio · Event Sponsor", price: "kuanzia TZS 500,000", perks: ["Bango na nembo kwenye Siku ya Kurekodi au jioni ya utamaduni", "Kutajwa kwenye matangazo yote ya tukio", "Nafasi ya kuongea / meza ya bidhaa"] },
];

export const attractions = [
  { slug: "materuni", name: "Maporomoko ya Materuni & Kahawa", area: "Materuni, Moshi Vijijini", blurb: "Maporomoko ya mita 150 msituni, kisha kuchoma, kutwanga na kunywa kahawa ya Kichagga shambani — na nyimbo za kutwanga.", tags: ["maporomoko", "kahawa", "siku moja"] },
  { slug: "kinukamori", name: "Maporomoko ya Kinukamori", area: "Marangu", blurb: "Maporomoko ya Marangu yenye hadithi za Kichagga; karibu na nyumba za kale za Kichagga na soko la Marangu.", tags: ["maporomoko", "hadithi"] },
  { slug: "mreshe", name: "Mahandaki ya Mr̲eshe (Chagga Caves)", area: "Marangu / Kilema", blurb: "Mahandaki ya chini ya ardhi yaliyochimbwa karne ya 18–19 kuficha watu na mifugo; ingia ndani na mwongozaji wa eneo.", tags: ["historia"] },
  { slug: "chagga-museum", name: "Chagga Live Museum", area: "Marangu", blurb: "Nyumba ya jadi ya Kichagga (msonge), vyombo, kipata, na maelezo ya maisha ya zamani.", tags: ["utamaduni"] },
  { slug: "ndoro", name: "Maporomoko ya Ndoro", area: "Marangu", blurb: "Maporomoko makubwa kwenye bonde la kijani, njia fupi ya kutembea kupitia vihamba.", tags: ["maporomoko"] },
  { slug: "lake-chala", name: "Ziwa Chala", area: "Rombo", blurb: "Ziwa la kreta la bluu kwenye mpaka wa Kenya, mashariki mwa mlima; kuogelea kwa kayak, kutembea ukingoni.", tags: ["ziwa", "rombo"] },
  { slug: "kikuletwa", name: "Chemchemi za Moto za Kikuletwa", area: "Rundugai, Hai", blurb: "Maji ya bluu yaliyo wazi chini ya mitini; siku ya kupumzika baada ya mlima.", tags: ["maji", "familia"] },
  { slug: "old-moshi", name: "Old Moshi & Mangi Meli", area: "Old Moshi (Tsudunyi)", blurb: "Makazi ya Mangi Meli, mti wa kihistoria na mandhari ya Moshi kutoka juu; historia ya utawala wa kikoloni na upinzani.", tags: ["historia", "mangi"] },
  { slug: "kibo-viewpoints", name: "Kibo & Mawenzi — sehemu za kuona", area: "Marangu / Machame / Rombo", blurb: "Asubuhi na mapema kabla ya mawingu: Kibo kutoka Marangu Mtoni, Mawenzi kutoka Rombo.", tags: ["mandhari", "picha"] },
  { slug: "coffee-homestay", name: "Kulala Kihambani (Coffee Farm Stay)", area: "Machame, Kibosho, Marangu", blurb: "Lala kwenye kihamba, kula mtori na machalari, kunywa mbege na familia; jifunze salamu kwa Kichagga na mwenyeji.", tags: ["familia", "kulala", "chakula"] },
];
