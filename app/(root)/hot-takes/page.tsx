import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";
import { Button } from "@/components/ui/button"
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


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
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
     
     <div className="w-full">
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
     
     <div className="w-full">
      <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
    </div>
  );
}
