// Prayers in Kichagga, line by line. Vunjo text: Leeman & Lauwo (2015), shared by Sam Makundi.
export type PrayerLine = { ch: string; sw: string; en: string };
export const lordsPrayerVunjo: { title: string; dialect: string; lines: PrayerLine[]; words: { ch: string; sw: string; en: string }[] } = {
  title: "Kiterewo kya Mndumii · Sala ya Bwana · The Lord's Prayer",
  dialect: "vunjo",
  lines: [
    { ch: "Awu yoŕu, ukeri ipfo Ruwewu, Rina lyapfo Lyitano lyeele", sw: "Baba yetu uliye mbinguni, jina lako litukuzwe", en: "Our Father, who art in heaven, hallowed be thy name" },
    { ch: "Wumangi wopfo wuche", sw: "Ufalme wako uje", en: "Thy kingdom come" },
    { ch: "Kindo ukundi, chandu kekewa ipfo ruwewu, na wuŕo kiwewe na kunu urukenyi", sw: "Mapenzi yako yatimizwe, hapa duniani kama huko mbinguni", en: "Thy will be done, on earth as it is in heaven" },
    { ch: "Kando kaŕu kalufoi luenenge inu", sw: "Utupe leo riziki yetu ya kila siku", en: "Give us this day our daily bread" },
    { ch: "Uluŕee sile tsapfo, cha soe luiŕea wasile waŕu", sw: "Utusamehe makosa yetu, kama sisi tunavyowasamehe waliotukosea", en: "Forgive us our trespasses, as we forgive those who trespass against us" },
    { ch: "Ulaluŕuoe kitewionyi", sw: "Usitutie majaribuni", en: "Lead us not into temptation" },
    { ch: "Indi ulukiŕe shindo shiwicho", sw: "Bali utuokoe na maovu", en: "But deliver us from evil" },
    { ch: "Cha kipfa wumangi nyi wopfo, na pfinya, na ngeela shiyeri shose shilunganyi", sw: "Kwa kuwa ufalme ni wako, na nguvu, na utukufu, hata milele", en: "For thine is the kingdom, the power and the glory, for ever and ever" },
    { ch: "Amen", sw: "Amina", en: "Amen" },
  ],
  words: [
    { ch: "Awu", sw: "Baba", en: "Father" },
    { ch: "Ruwa · Ruwewu", sw: "Mungu · mbinguni", en: "God · in heaven" },
    { ch: "Rina", sw: "Jina", en: "Name" },
    { ch: "Wumangi", sw: "Ufalme (kutoka Mangi)", en: "Kingdom (from Mangi, chief)" },
    { ch: "Kando", sw: "Chakula / mkate", en: "Food / bread" },
    { ch: "Inu", sw: "Leo", en: "Today" },
    { ch: "Sile", sw: "Makosa, dhambi", en: "Wrongs, sins" },
    { ch: "Pfinya", sw: "Nguvu", en: "Power" },
    { ch: "Kuterewa", sw: "Kuomba, kusali", en: "To pray" },
  ],
};
