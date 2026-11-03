// Swahili versions of the culture content. Keyed by article slug / pillar key.
export const pillarsSw: Record<string, { blurb: string }> = {
  mila: { blurb: "Mila, sherehe na adabu za kila siku." },
  historia: { blurb: "Umangi, falme za mlimani na uhamiaji." },
  chakula: { blurb: "Mtori, kiburu, machalari, mbege — na zinapotolewa." },
  nyimbo: { blurb: "Nyimbo, methali na hadithi kutoka kwa wazee." },
  ukoo: { blurb: "Majina ya koo, maeneo yao na nasaba." },
  dini: { blurb: "Ruwa, warimu, ujio wa Kanisa — na sala kwa Kichagga." },
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
  ruwa: {
    title: "Ruwa — Mungu wa mlima",
    summary: "Kabla ya misheni, Wachagga walikuwa tayari wanamwomba Mungu mmoja, Ruwa, aliyeketi juu ya Kibo; warimu (mizimu ya wazee) walisimama kati ya walio hai na Yeye.",
    body: [
      "Ruwa ni jina la Mungu kwa Kichagga — neno lilelile la jua na anga katika usemi wa zamani. Mlima wenyewe ulikuwa kiti chake: watu waliomba na kumwaga sadaka wakielekea Kibo, na theluji iliitwa paji la uso wa Mungu (Ushangunyi lo Ruwa).",
      "Ruwa alikuwa mwema na wa mbali. Maisha ya kila siku yalisimamiwa na warimu, waliolinda kihamba na walioweza kuleta ugonjwa au baraka. Familia ilidumisha amani kwa sadaka za mbege, maziwa na nyama zilizomwagwa chini ya masale, mzee wa ukoo akisema maneno.",
      "Matambiko yaliandamana na maisha yote: kumpa mtoto jina, jando na mafunzo ya wazee, ndoa yenye mkara kama mdhamini, na mazishi ndani ya kihamba ili mtu abaki na ardhi ya familia. Msamiati huu — kuterewa (kuomba), warimu, isale — bado unatumika kanisani na nyumbani.",
      "Hili ni somo linaloendelea: ongeza wanachosema wazee wako kuhusu Ruwa, warimu na sala za zamani kupitia Changia, kwa lahaja yako.",
    ],
  },
  ukristo: {
    title: "Ujio wa Kanisa",
    summary: "Wamisionari Wakatoliki walijenga Kilema mwaka 1890 na Walutheri Machame na Old Moshi 1893; ndani ya vizazi viwili Wachagga wengi walikuwa Wakristo — na Kichagga kikaingia kwenye kitabu cha nyimbo.",
    body: [
      "Mapadri wa Roho Mtakatifu walianzisha misheni ya Kikatoliki Kilema 1890, na misheni ya Kilutheri ya Leipzig ikafunguliwa Machame na Old Moshi (Kidia) 1893. Marangu, Mamba, Mwika na Rombo zikafuata. Shule za misheni, vyama vya ushirika vya kahawa na makanisa vilikua pamoja — ndiyo maana jamii za Kichagga zimefungamana sana na parokia zao hadi leo.",
      "Wamisionari walijifunza lahaja. Katekisimu, nyimbo na sehemu za Biblia zilichapishwa kwa Kimachame na Kimoshi/Kivunjo, na Sala ya Bwana na nyimbo (shiimbo sha Ruwa) ziliimbwa kwa Kichagga muda mrefu kabla Kiswahili hakijachukua nafasi kanisani.",
      "Leo Wachagga wengi ni Walutheri (KKKT Dayosisi ya Kaskazini) au Wakatoliki (Jimbo la Moshi), na familia za Kiislamu hasa mijini. Sikukuu za Kikristo — Krismasi na Mwaka Mpya zaidi — ndizo wakati ughaibuni unarudi nyumbani, na Kichagga kinasikika zaidi kanisani na mezani.",
      "Tunakusanya sala, nyimbo na baraka kwa kila lahaja. Sala ya Bwana kwa Kivunjo iko hapa chini; tuma yako kwa Kimachame, Kikibosho au Kirombo.",
    ],
  },
  "sala-ya-bwana": {
    title: "Sala ya Bwana — Kiterewo kya Mndumii (Kivunjo)",
    summary: "Baba Yetu kwa Kivunjo, mstari kwa mstari na Kiswahili na Kiingereza, kama inavyoombwa makanisani Vunjo.",
    body: [],
  },
};
