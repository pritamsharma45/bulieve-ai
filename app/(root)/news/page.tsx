import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";

import { unstable_noStore as noStore } from "next/cache";

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
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
     <NewsCard newsItems={allNewsItems} />
    </div>
  );
}

