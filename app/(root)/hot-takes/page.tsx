import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";
import { Button } from "@/components/ui/button"
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
    <div className="mx-auto flex gap-x-10 mt-4 mb-10">
     <Button variant="outline">Button 1</Button>
     <Button variant="outline">Button 2</Button>
     <Button variant="outline">Button 3</Button>
     <Button variant="outline">Button 4</Button>
     <Button variant="outline">Button 5</Button>

    </div>
  );
}
