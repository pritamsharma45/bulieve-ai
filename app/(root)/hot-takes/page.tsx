import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import HotTakesBanner from "./components/hottakesbanner";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Your existing dummy data remains the same
const hotTakes = [
  { post: "Reliance Stock Up!!!", user: "Parth", likes: 5, comments: 10 },
  { post: "Tech Stocks Rally Continues", user: "Sarah", likes: 15, comments: 8 },
  { post: "Bitcoin Hits New High", user: "Alex", likes: 25, comments: 20 },
  { post: "Fed Rate Decision Impact", user: "Michael", likes: 12, comments: 15 },
  { post: "Market Analysis 2024", user: "Jessica", likes: 18, comments: 12 }
];

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Banner Section with gradient background */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-lg">
          <div className="p-6">
            <HotTakesBanner />
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Featured Insights
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Latest market analysis and trends
                  </CardDescription>
                </div>
                <span className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                  New
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {item.category}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                              Read more
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </CardContent>
          </Card>
        </section>

        {/* Hot Takes Table Section */}
        <section className="w-full">
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Hot Takes
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Today's most engaging market discussions
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    Live Updates
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="w-[250px]">Post</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-center">Likes</TableHead>
                      <TableHead className="text-center">Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hotTakes.map((take, index) => (
                      <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-medium">{take.post}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-800">
                            {take.user}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800">
                            {take.likes}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                            {take.comments}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}