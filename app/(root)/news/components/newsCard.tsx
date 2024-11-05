'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsItem {
  link: string;
  title: string;
  summary: string | null;
  published_at: Date | null;
}

interface NewsData {
  title: string
  description: string
  items: NewsItem[]
  last_updated: string
}

export function NewsCard({ newsItems }: { newsItems: NewsItem[] }) {
  const newsData: NewsData = {
    "title": "Zee News :Business",
    "description": "Visit Zee News for latest India news, get latest news from India and all over the world. We provide you latest celebrity news, latest bollywood news and entertainment news with fastest top stories online about cricket, sports, business, bollywood, entertainment, lifestyle, world and science to get yourself updated.",
    "items": newsItems,
    "last_updated": "2024-10-30T18:36:43.078917"
  }

  const [selectedNews, setSelectedNews] = useState(newsData.items[0])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{newsData.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2" />
                Trending News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {newsData.items.map((news, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedNews.title === news.title ? 'bg-primary/10' : 'hover:bg-secondary'
                    }`}
                    onClick={() => setSelectedNews(news)}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {news.title}
                    </h3>
                    {news.summary && (
                        <p className="text-xs text-muted-foreground mb-2">
                        {news.summary.length > 140 ? `${news.summary.slice(0, 140)}...` : news.summary}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {news.published_at ? new Date(news.published_at).toLocaleString() : "N/A"}
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{selectedNews.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI-Generated Summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg mb-4">
                <p className="text-orange-800 dark:text-orange-200">
                  {selectedNews.summary || "No summary available"}
                </p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="mr-1 h-4 w-4" />
                {selectedNews.published_at ? new Date(selectedNews.published_at).toLocaleString() : "N/A"}
              </div>
              <Button asChild>
                <a
                  href={selectedNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block"
                >
                  Read full article
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-6">
        Last updated: {new Date(newsData.last_updated).toLocaleString()}
      </p>
    </div>
  )
}

