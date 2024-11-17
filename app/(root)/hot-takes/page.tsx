import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";
import { Button } from "@/components/ui/button"
import { unstable_noStore as noStore } from "next/cache";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
     
     
     <Table>
     <TableCaption>All the HOT Takes Today!</TableCaption>
      <TableHeader>
      <TableRow>
      <TableHead className="w-[100px]">Post</TableHead>
      <TableHead>User</TableHead>
      <TableHead>Likes</TableHead>
      <TableHead >Comments</TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
      <TableRow>
      <TableCell className="font-medium">Reliance Stock Up!!!</TableCell>
      <TableCell>Parth</TableCell>
      <TableCell>5</TableCell>
      <TableCell >10</TableCell>
      </TableRow>
      </TableBody>
      </Table>

    </div>
  );
}
