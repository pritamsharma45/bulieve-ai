import prisma from "@/app/lib/db";
import {NewsCard} from "./components/newsCard";
import { Button } from "@/components/ui/button"
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import HotTakesBanner from "./components/hottakesbanner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
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

// Dummy data for hot takes with expanded descriptions
const hotTakes = [
  {
    title: "Reliance Stock Up!!!",
    user: "Parth",
    likes: 5,
    comments: 10,
    description: "Reliance Industries stock surged 5% today following stellar Q4 results. The company's digital and retail segments showed exceptional growth, with Jio platforms leading the charge. Analysts are bullish on the stock, citing strong fundamentals and expanding market presence. The company's recent green energy initiatives have also attracted positive attention from ESG-focused investors."
  },
  {
    title: "Tech Stocks Rally Continues",
    user: "Sarah",
    likes: 15,
    comments: 8,
    description: "The tech sector's impressive rally shows no signs of slowing down. Major players like Apple, Microsoft, and Google have all posted significant gains this week. AI-related stocks are particularly strong performers, with companies involved in semiconductor manufacturing and cloud computing infrastructure leading the charge. The rally is supported by strong earnings reports and positive forward guidance."
  },
  {
    title: "Bitcoin Hits New High",
    user: "Alex",
    likes: 25,
    comments: 20,
    description: "Bitcoin has reached another all-time high, breaking through the crucial resistance level. The surge is attributed to increased institutional adoption and the recent spot ETF approvals. On-chain metrics show strong holder conviction, with a significant portion of supply remaining dormant. Market analysts suggest this could be the beginning of a new bull run."
  },
  {
    title: "Fed Rate Decision Impact",
    user: "Michael",
    likes: 12,
    comments: 15,
    description: "The Federal Reserve's latest rate decision has sent ripples through the market. While rates remained unchanged, the Fed's commentary suggests a more dovish stance going forward. Bond yields responded immediately, with the 10-year Treasury yield declining. This has positive implications for growth stocks and real estate investments. Market participants are now pricing in potential rate cuts later this year."
  },
  {
    title: "Market Analysis 2024",
    user: "Jessica",
    likes: 18,
    comments: 12,
    description: "A comprehensive analysis of market trends for 2024 reveals interesting patterns. Sectors showing strength include AI, renewable energy, and healthcare innovation. Value stocks are showing signs of a comeback, while small caps remain under pressure. International markets, particularly emerging markets in Asia, present compelling opportunities. The analysis also highlights potential risks including geopolitical tensions and inflation concerns."
  }
];

// Carousel items data remains the same
const carouselItems = [
  {
    title: "Market Trends",
    description: "Analysis of current market trends and future predictions",
    imageUrl: "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/shot2.png",
    category: "Analysis"
  },
  {
    title: "Stock Picks",
    description: "Top stock picks for the upcoming quarter",
    imageUrl: "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/debris_blend.png",
    category: "Investment"
  },
  {
    title: "Economic Outlook",
    description: "Global economic outlook and key indicators",
    imageUrl: "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/debris_blend.png",
    category: "Economy"
  },
  {
    title: "Crypto Updates",
    description: "Latest developments in cryptocurrency markets",
    imageUrl: "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/debris_blend.png",
    category: "Crypto"
  },
  {
    title: "Tech Sector",
    description: "Technology sector performance and analysis",
    imageUrl: "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/debris_blend.png",
    category: "Technology"
  }
];

const ExpandableTableRow = ({ take }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow 
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="font-medium">
          <div className="flex items-center space-x-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{take.title}</span>
          </div>
        </TableCell>
        <TableCell>{take.user}</TableCell>
        <TableCell>{take.likes}</TableCell>
        <TableCell>{take.comments}</TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={4} className="bg-gray-50">
            <div className="p-4">
              <p className="text-gray-700 leading-relaxed">{take.description}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

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

      {/* Table Section */}
      <section className="w-full overflow-x-auto">
        <Table>
          <TableCaption>All the HOT Takes Today!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotTakes.map((take, index) => (
              <ExpandableTableRow key={index} take={take} />
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
}