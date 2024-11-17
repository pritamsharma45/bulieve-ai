import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ThumbsUp, MessageSquare } from 'lucide-react';

// Replace the existing Table section with this new component
const SocialFeed = () => {
  const hotTakes = [
    { post: "Reliance Stock Up!!!", user: "Parth", likes: 5, comments: 10 },
    { post: "Tech Stocks Rally Continues", user: "Sarah", likes: 15, comments: 8 },
    { post: "Bitcoin Hits New High", user: "Alex", likes: 25, comments: 20 },
    { post: "Fed Rate Decision Impact", user: "Michael", likes: 12, comments: 15 },
    { post: "Market Analysis 2024", user: "Jessica", likes: 18, comments: 12 }
  ];

  return (
    <div className="grid gap-4">
      {hotTakes.map((post, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {post.user.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{post.user}</p>
                <p className="text-sm text-gray-500">Posted today</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{post.post}</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SocialFeed;
