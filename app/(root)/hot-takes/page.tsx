import prisma from "@/app/lib/db";

import { unstable_noStore as noStore } from "next/cache";
import HotTakesBanner from "./components/hottakesbanner";
import { ExpandableTable } from "./components/expandable-table";
import { NewsCarousel } from "./components/news-carousel";

// Move dummy data to a separate data file or keep it here
export const hotTakes = [
  {
    title: "Reliance Stock Up!!!",
    user: "Parth",
    likes: 5,
    comments: 10,
    description: "Reliance Industries stock surged 5% today following stellar Q4 results. The company's digital and retail segments showed exceptional growth, with Jio platforms leading the charge. Analysts are bullish on the stock, citing strong fundamentals and expanding market presence."
  },
  {
    title: "Tech Stocks Rally Continues",
    user: "Sarah",
    likes: 15,
    comments: 8,
    description: "The tech sector's impressive rally shows no signs of slowing down. Major players like Apple, Microsoft, and Google have all posted significant gains this week. AI-related stocks are particularly strong performers, with companies involved in semiconductor manufacturing and cloud computing infrastructure leading the charge."
  },
  {
    title: "Bitcoin Hits New High",
    user: "Alex",
    likes: 25,
    comments: 20,
    description: "Bitcoin has reached another all-time high, breaking through the crucial resistance level. The surge is attributed to increased institutional adoption and the recent spot ETF approvals. On-chain metrics show strong holder conviction, with a significant portion of supply remaining dormant."
  },
  {
    title: "Fed Rate Decision Impact",
    user: "Michael",
    likes: 12,
    comments: 15,
    description: "The Federal Reserve's latest rate decision has sent ripples through the market. While rates remained unchanged, the Fed's commentary suggests a more dovish stance going forward. Bond yields responded immediately, with the 10-year Treasury yield declining."
  },
  {
    title: "Market Analysis 2024",
    user: "Jessica",
    likes: 18,
    comments: 12,
    description: "A comprehensive analysis of market trends for 2024 reveals interesting patterns. Sectors showing strength include AI, renewable energy, and healthcare innovation. Value stocks are showing signs of a comeback, while small caps remain under pressure."
  }
];

export const carouselItems = [
  {
    title: "Market Trends",
    description: "Analysis of current market trends and future predictions",
    imageUrl: "/api/placeholder/600/400",
    category: "Analysis"
  },
  {
    title: "Stock Picks",
    description: "Top stock picks for the upcoming quarter",
    imageUrl: "/api/placeholder/600/400",
    category: "Investment"
  },
  {
    title: "Economic Outlook",
    description: "Global economic outlook and key indicators",
    imageUrl: "/api/placeholder/600/400",
    category: "Economy"
  },
  {
    title: "Crypto Updates",
    description: "Latest developments in cryptocurrency markets",
    imageUrl: "/api/placeholder/600/400",
    category: "Crypto"
  },
  {
    title: "Tech Sector",
    description: "Technology sector performance and analysis",
    imageUrl: "/api/placeholder/600/400",
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
    <div className="container mx-auto px-4 py-6 space-y-6">
      <section className="w-full">
        <HotTakesBanner />
      </section>

      <section className="w-full overflow-x-auto">
        <ExpandableTable data={hotTakes} />
      </section>

      <section className="w-full flex justify-center">
        <NewsCarousel items={carouselItems} />
      </section>
    </div>
  );
}