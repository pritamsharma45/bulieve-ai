import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, Flame, Clock, ThumbsUp } from 'lucide-react';
import { PostCard } from '@/app/components/PostCard';
import prisma from '@/app/lib/db';
import { Suspense } from 'react';
import { SuspenseCard } from '@/app/components/SuspenseCard';
import { unstable_noStore as noStore } from 'next/cache';

// Utility function to calculate trending score
function calculateTrendingScore(post) {
  const now = new Date();
  const postDate = new Date(post.createdAt);
  const hoursSincePosted = (now - postDate) / (1000 * 60 * 60);
  
  // Trending score formula:
  // (likes * 1.5 + comments * 2) / (hours since posted + 2)^1.8
  const score = 
    (post._count.Like * 1.5 + post._count.Comment * 2) / 
    Math.pow(hoursSincePosted + 2, 1.8);
    
  return score;
}

async function getHotTakes(timeframe = '24h') {
  noStore();
  
  const timeframes = {
    '24h': 24,
    '7d': 168,
    '30d': 720
  };
  
  const hours = timeframes[timeframe];
  const date = new Date();
  date.setHours(date.getHours() - hours);

  const posts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: date
      }
    },
    select: {
      id: true,
      title: true,
      textContent: true,
      createdAt: true,
      imageString: true,
      User: {
        select: {
          userName: true,
          image: true,
        }
      },
      Comment: {
        select: {
          id: true,
        }
      },
      Like: {
        select: {
          id: true,
          likeType: true,
        }
      },
      community: {
        select: {
          name: true,
          slug: true,
        }
      },
      _count: {
        select: {
          Like: true,
          Comment: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Calculate trending score for each post and sort
  const scoredPosts = posts.map(post => ({
    ...post,
    trendingScore: calculateTrendingScore(post)
  }))
  .sort((a, b) => b.trendingScore - a.trendingScore);

  return scoredPosts;
}

export default async function HotTakes() {
  return (
    <div className="max-w-[1000px] mx-auto mt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Flame className="text-red-500" />
          Hot Takes
        </h1>
        <p className="text-muted-foreground mt-2">
          Trending discussions and market insights from the community
        </p>
      </div>

      <Suspense fallback={<SuspenseCard />}>
        <HotTakesFeed />
      </Suspense>
    </div>
  );
}

async function HotTakesFeed() {
  const hotTakes = await getHotTakes();

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotTakes.slice(0, 3).map((post, index) => (
            <Card key={post.id} className="border-2 border-red-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-sm">
                      #{index + 1} Trending
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post._count.Like}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>by {post.User.userName}</span>
                  <span>{post._count.Comment} comments</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="24h" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="24h">Last 24 Hours</TabsTrigger>
          <TabsTrigger value="7d">This Week</TabsTrigger>
          <TabsTrigger value="30d">This Month</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {hotTakes.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              imageString={post.imageString}
              jsonContent={post.textContent}
              userName={post.User.userName}
              communityName={post.community?.name}
              communitySlug={post.community?.slug}
              commentAmount={post._count.Comment}
              likeCount={post.Like.filter(like => like.likeType === "LIKE").length}
              createdAt={post.createdAt}
              userImage={post.User.image}
            />
          ))}
        </div>
      </Tabs>
    </div>
  );
}
