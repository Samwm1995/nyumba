// Nyimbo za Kichagga. Videos are embedded from YouTube (nothing is copied or downloaded).
// Lyrics are transcribed by the community: each song has an empty transcription slot until members fill
// it through Changia (kind = song, topic = wimbo:<slug>); verified lines are then published here.
export type SongLine = { ch: string; sw?: string; en?: string };
export type Song = {
  slug: string;
  title: string;
  artist: string;
  youtube: string;          // video id
  kind: "asili" | "kisasa" | "injili";
  dialect?: string;
  gloss_sw?: string;        // meaning of the title / theme, where we are sure
  gloss_en?: string;
  words?: { ch: string; sw: string; en: string }[];  // key words confirmed against the Vunjo course
  lyrics: SongLine[];       // verified transcription (empty = still collecting)
  source?: string;
};

export const songs: Song[] = [
  {
    slug: "aneny-ruwa", title: "Aneny Ruwa", artist: "Ezron Macha", youtube: "ScTI4x1N0U4", kind: "injili",
    gloss_sw: "Tumshukuru Mungu — Ruwa ni jina la Mungu kwa Kichagga.", gloss_en: "Let us thank God — Ruwa is the Chagga name for God.",
    words: [{ ch: "Ruwa", sw: "Mungu", en: "God" }, { ch: "Shiimbo sha Ruwa", sw: "Nyimbo za Mungu", en: "Hymns" }, { ch: "Aika", sw: "Asante", en: "Thank you" }],
    lyrics: [], source: "Urithi Wetu Wachagga (wachagga.com)",
  },
  {
    slug: "mbege", title: "Mbege", artist: "Lyimo", youtube: "RAEh-XwRWX0", kind: "kisasa",
    gloss_sw: "Wimbo kuhusu mbege — kinywaji cha ndizi na ulezi kinachoshirikishwa kwenye kila tukio la Kichagga.", gloss_en: "A song about mbege — the banana-and-millet brew shared at every Chagga gathering.",
    words: [{ ch: "Mbege", sw: "Pombe ya ndizi", en: "Banana beer" }, { ch: "Mar̲uu", sw: "Ndizi", en: "Bananas" }, { ch: "Kipata", sw: "Kibuyu cha kuchotea", en: "Gourd ladle" }],
    lyrics: [], source: "Urithi Wetu Wachagga (wachagga.com)",
  },
  {
    slug: "chamecha", title: "Chamecha", artist: "Lyimo", youtube: "US6rHT2XGA0", kind: "kisasa",
    lyrics: [], source: "Urithi Wetu Wachagga (wachagga.com)",
  },
  {
    slug: "kyashika", title: "Kyashika (Krismasi)", artist: "Lyimo", youtube: "DdoqT1zkg_g", kind: "kisasa",
    gloss_sw: "Wimbo wa Krismasi: msimu wa sikukuu unafika, watu wanarudi nyumbani na Kilimanjaro inafurahi kuwaona wanawe wakirudi.", gloss_en: "A Christmas song: the season arrives, people travel home, and Kilimanjaro is glad to see its children return.",
    lyrics: [], source: "Urithi Wetu Wachagga (wachagga.com)",
  },
  {
    slug: "maka-mhya", title: "Maka Mhya (Mwaka Mpya)", artist: "Lyimo", youtube: "XfoV3eRaLKc", kind: "kisasa",
    gloss_sw: "Wimbo wa Mwaka Mpya — maka = mwaka, mhya = mpya.", gloss_en: "A New Year song — maka = year, mhya = new.",
    words: [{ ch: "Maka", sw: "Mwaka", en: "Year" }, { ch: "Mhya", sw: "Mpya", en: "New" }],
    lyrics: [], source: "Urithi Wetu Wachagga (wachagga.com)",
  },
  {
    slug: "ngoma-ya-asili", title: "Ngoma ya asili ya Kichagga", artist: "Wachezaji wa jadi", youtube: "VoiM6Vg0cU8", kind: "asili",
    gloss_sw: "Wachagga wakicheza ngoma ya asili — tusaidie kutambua eneo, jina la ngoma na maneno ya wimbo.", gloss_en: "Chagga traditional dance — help us name the area, the dance and the words.",
    lyrics: [],
  },
];
