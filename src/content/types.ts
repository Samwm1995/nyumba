export type Phrase = { en: string; ch: string; reply?: string; audio?: string };
export type Drill = { en: string; q: string; yes: string; no: string; audio?: string };

export type Lesson = {
  slug: string;
  title: string;
  intro?: string;
  items?: Phrase[];
  drills?: Drill[];
};

export type GrammarCard = { title: string; body: string; examples: [string, string][] };
export type Conversation = { title: string; lines: [string, string][] };
export type TextBlock = { title: string; lines: string[] };

export type Dialect = {
  slug: string;
  name: string;
  area: string;
  description: string;
  status?: "ready" | "collecting";
  source?: { title: string; authors: string; year: string; note?: string };
  pronunciation?: { sound: string; note: string }[];
  lessons: Lesson[];
  grammar?: GrammarCard[];
  conversations?: Conversation[];
  texts?: TextBlock[];
};

export type CultureArticle = {
  slug: string;
  pillar: "mila" | "historia" | "chakula" | "nyimbo" | "ukoo";
  title: string;
  summary: string;
  body: string[];
  source?: string;
};
