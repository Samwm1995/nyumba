// Swahili versions of the culture content. Keyed by article slug / pillar key.
export const pillarsSw: Record<string, { blurb: string }> = {
  mila: { blurb: "Mila, sherehe na adabu za kila siku." },
  historia: { blurb: "Umangi, falme za mlimani na uhamiaji." },
  chakula: { blurb: "Mtori, kiburu, machalari, mbege — na zinapotolewa." },
  nyimbo: { blurb: "Nyimbo, methali na hadithi kutoka kwa wazee." },
  ukoo: { blurb: "Majina ya koo, maeneo yao na nasaba." },
};

export const articlesSw: Record<string, { title: string; summary: string; body: string[] }> = {
  mbege: {
    title: "Mbege — pombe ya ndizi",
    summary: "Kinywaji kilicho katikati ya kila mkusanyiko wa Kichagga, kinatengenezwa kwa ndizi mbivu na ulezi.",
    body: [
      "Mbege (wari kwa Kivunjo) inatengenezwa kwa ndizi mbivu zinazopondwa, kuchemshwa na kuachwa kuchacha, kisha kuchanganywa na uji wa ulezi ulioota (mbeke) unaoipa uzito na ladha kidogo ya uchachu na moshi.",
      "Inatolewa kutoka kwenye chungu kikubwa kwenda kwenye vikombe vya kibuyu kwa kutumia kipata — kibuyu cha kuchotea chenye mpini mrefu. Mbege inashirikishwa kwenye harusi, misiba, mikutano ya ukoo na usuluhishi wa migogoro; kukataa kikombe ni jambo zito.",
      "Kwenye kitabu cha Kivunjo waandishi wanaandika kwamba 'watu wanasema pombe ya wilaya hii ndiyo bora zaidi mkoani' — madai ambayo kila eneo la Uchagga linajitetea nayo.",
    ],
  },
  "maruu-na-nyama": {
    title: "Mar̲uu na nyama — chakula kikuu",
    summary: "Ndizi na nyama: msingi wa mapishi ya Kichagga, na chanzo cha mtori na machalari.",
    body: [
      "Ndizi ni moyo wa kihamba cha Kichagga. Aina kadhaa zinalimwa: za kupika, za kutengeneza pombe, za kula mbivu.",
      "Mtori ni supu laini ya ndizi za kupika na nyama ya ng'ombe, kijadi hupewa mama aliyejifungua. Machalari ni ndizi zilizopikwa na nyama; kiburu ni ndizi zilizopondwa na maharage. Ndafu ni mbuzi wa kuchoma wa sherehe.",
    ],
  },
  kihamba: {
    title: "Kihamba — makazi ya Kichagga",
    summary: "Shamba la familia kwenye miteremko ya mlima ambapo ndizi, kahawa na miti ya kivuli hukua pamoja.",
    body: [
      "Kihamba ni shamba la urithi la familia: bustani nene ya migomba, mibuni, miti ya matunda na mbao, inayonyweshwa na mfongo — mifereji ya umwagiliaji waliyochimba wahandisi wa Kichagga karne nyingi zilizopita.",
      "Ardhi inapita ndani ya familia, kijadi kwa mtoto wa kiume wa mwisho, na kihamba kinahifadhi makaburi ya familia. Ndiyo maana Wachagga wengi, popote wanapoishi, bado wanasema 'nyumbani' ni Kilimanjaro.",
    ],
  },
  mifongo: {
    title: "Mifongo — mifereji ya umwagiliaji",
    summary: "Mtandao wa mifereji iliyochimbwa kwa mikono iliyoleta maji kutoka vijito vya msituni hadi kila kihamba.",
    body: [
      "Kabla ya ukoloni, jamii za Kichagga zilichimba na kutunza mamia ya kilomita za mifereji (mfongo, wingi mifongo), ikisimamiwa na wazee wa koo waliogawa siku za maji kwa kila kaya.",
      "Mingi bado inatumika. Ni mojawapo ya mifumo ya umwagiliaji inayoendelea kufanya kazi kwa muda mrefu zaidi barani Afrika.",
    ],
  },
  mreshe: {
    title: "Mr̲eshe — mahandaki yaliyofichwa",
    summary: "Njia za chini ya ardhi ambapo watu na mifugo walijificha wakati wa mashambulizi.",
    body: [
      "Kote Kilimanjaro, hasa Marangu na Kilema, mahandaki marefu yalichimbwa ndani ya vilima. Familia na mifugo yao zilijificha humo wakati wa mashambulizi ya Wamaasai na vita kati ya umangi katika karne ya 18 na 19.",
      "Baadhi yamefunguliwa tena kwa wageni. Neno linapatikana kwenye orodha ya msamiati wa Kivunjo kama 'mahandaki ya zamani ya kuficha watu na mifugo dhidi ya wavamizi'.",
    ],
  },
  mangi: {
    title: "Mangi — umangi wa Kichagga",
    summary: "Kilimanjaro haikuwa ufalme mmoja bali umangi kadhaa, kila mmoja ukiongozwa na Mangi.",
    body: [
      "Kila mlima mdogo (ridge) ulikuwa umangi wake — Machame, Kibosho, Moshi, Marangu, Rombo na mingine mingi — ukitawaliwa na Mangi. Majina maarufu ni Mangi Rindi wa Moshi, Mangi Sina wa Kibosho, Mangi Marealle wa Marangu na Mangi Meli wa Moshi.",
      "Mwaka 1951 umangi ulimchagua Mangi Mkuu mmoja, Thomas Marealle. Umangi ulifutwa baada ya uhuru mwaka 1963, lakini utambulisho — na lahaja — zimebaki.",
    ],
  },
  "kinyala-lauwo": {
    title: "Kinyala Johannes Lauwo — wa kwanza kujulikana kufika kileleni",
    summary: "Mwongoza njia wa Marangu aliyeongoza upandaji wa kwanza ulioandikwa wa Kilimanjaro mwaka 1889.",
    body: [
      "Yohani Kinyala Lauwo wa Marangu aliwaongoza Hans Meyer na Ludwig Purtscheller hadi kileleni Oktoba 1889 na kuwaonyesha njia kupitia barafu inayoitwa sasa Johannes Notch.",
      "Inasemekana aliishi hadi umri mkubwa sana, akifariki mwaka 1996. Hadithi yake imo kwenye kitabu cha Kivunjo kilichoandikwa pamoja na ndugu yake Trilas Matesha Lauwo.",
    ],
  },
  methali: {
    title: "Methali — ongeza zako",
    summary: "Tunakusanya methali za Kichagga kwa kila lahaja, pamoja na maana na zinapotumika.",
    body: [
      "Sehemu hii inakua kutokana na michango. Rekodi methali kutoka kwa babu na bibi zako kupitia Changia — isema kwa lahaja, toa maana kwa Kiswahili au Kiingereza, na tuambie watu huitumia lini.",
    ],
  },
  ukoo: {
    title: "Majina ya koo — orodha inayokua",
    summary: "Mushi, Moshi, Lyimo, Temu, Kimaro, Lauwo, Massawe, Mmari, Tarimo, Swai, Minja, Urio… na kila ukoo unatoka eneo gani.",
    body: [
      "Majina ya ukoo ya Kichagga ni majina ya koo, na mengi yanahusiana na eneo mahususi la mlima. Ongeza ukoo wako, eneo lake la asili na chochote familia yako inachokijua kuhusu asili yake kupitia Changia.",
    ],
  },
};
