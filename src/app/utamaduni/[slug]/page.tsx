import { notFound } from "next/navigation";
import { articles } from "@/content/culture";
import { CultureArticle } from "@/components/culture-view";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!articles.some((a) => a.slug === slug)) notFound();
  return <CultureArticle slug={slug} />;
}
