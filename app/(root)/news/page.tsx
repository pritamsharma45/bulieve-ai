import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";
import { unstable_noStore as noStore } from "next/cache";
import NewsArenaBanner from "./components/newsarenabanner";

async function getData() {
  noStore();
  const data = await prisma.processed_macro_economy_articles.findMany({
    select: {
      title: true,
      link: true,
      summary: true,
      published_at: true,
 
    },
  });
  return data;
}

export default async function News() {
  const allNewsItems = await getData();

  return (
    <div className="mx-auto flex container px-4 py-6 space-y-6">
      <section className="w-full">
        <NewsArenaBanner />
      </section>
     <NewsCard newsItems={allNewsItems} />
    </div>
  );
}

