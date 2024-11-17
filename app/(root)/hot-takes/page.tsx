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
     <Button variant="outline">Button 1</Button>
     <Button variant="outline">Button 2</Button>
     <Button variant="outline">Button 3</Button>
     <Button variant="outline">Button 4</Button>
     <Button variant="outline">Button 5</Button>
     <Table>
     <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
      <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
      </TableRow>
      </TableHeader>
      <TableBody>
      <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
      </TableBody>
      </Table>

    </div>
  );
}
