import prisma from "@/app/lib/db";


import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import HotTakesBanner from "./components/hottakesbanner";
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
import { MessageSquare, ThumbsUp } from "lucide-react";

// Dummy data for hot takes
const hotTakes = [
  { post: "Reliance Stock Up!!!", user: "Parth", likes: 5, comments: 10 },
  { post: "Tech Stocks Rally Continues", user: "Sarah", likes: 15, comments: 8 },
  { post: "Bitcoin Hits New High", user: "Alex", likes: 25, comments: 20 },
  { post: "Fed Rate Decision Impact", user: "Michael", likes: 12, comments: 15 },
  { post: "Market Analysis 2024", user: "Jessica", likes: 18, comments: 12 }
];

// Dummy data for carousel
const carouselItems = [
  {
    title: "Market Trends",
    description: "Analysis of current market trends and future predictions",
    imageUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg",
    category: "Analysis"
  },
  {
    title: "Stock Picks",
    description: "Top stock picks for the upcoming quarter",
    imageUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg",
    category: "Investment"
  },
  {
    title: "Economic Outlook",
    description: "Global economic outlook and key indicators",
    imageUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg",
    category: "Economy"
  },
  {
    title: "Crypto Updates",
    description: "Latest developments in cryptocurrency markets",
    imageUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg",
    category: "Crypto"
  },
  {
    title: "Tech Sector",
    description: "Technology sector performance and analysis",
    imageUrl: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back05.jpg",
    category: "Technology"
  }
];




const HotTakesWall = () => (
  <div className="w-full">
    <h2 className="text-2xl font-bold mb-6 text-center">Today's Hot Takes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hotTakes.map((take, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{take.post}</CardTitle>
            <CardDescription className="text-sm">Posted by {take.user}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{take.likes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">{take.comments}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

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
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Banner Section */}
      <section className="w-full">
        <HotTakesBanner />
      </section>

         {/* Carousel Section */}
         <section className="w-full flex justify-center">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Table Section */}
      <section className="w-full overflow-x-auto">
        <Table>
          <TableCaption>All the HOT Takes Today!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Post</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotTakes.map((take, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{take.post}</TableCell>
                <TableCell>{take.user}</TableCell>
                <TableCell>{take.likes}</TableCell>
                <TableCell>{take.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section className="w-full">
        <HotTakesWall />
      </section>
   
    </div>
  );
}