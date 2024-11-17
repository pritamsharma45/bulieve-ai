import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  author: string;
  authorImage: string;
  likes: number;
  comments: number;
  timeAgo: string;
  trending?: boolean;
  trendingPosition?: number;
}

type TimeFrame = '24h' | '7d' | '30d';

const HotTakesPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('24h');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data - in real app, this would come from an API
  const samplePosts: Post[] = [
    {
      id: 1,
      title: "Why Bitcoin Could Hit 100k by End of Year",
      author: "CryptoAnalyst",
      authorImage: "/api/placeholder/40/40",
      likes: 245,
      comments: 89,
      timeAgo: "2 hours ago",
      trending: true,
      trendingPosition: 1
    },
    // Add more sample posts as needed
  ];

  const fetchPosts = async (timeframe: TimeFrame) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(samplePosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(timeframe);
  }, [timeframe]);

  const TrendingCard: React.FC<{ post: Post; position: number }> = ({ post, position }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-opacity-10 border-rose-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-rose-500 font-bold">
          <i className="fas fa-chart-line mr-2" />
          <span>#{position} Trending</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <i className="fas fa-thumbs-up mr-2" />
          <span>{post.likes}</span>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>by {post.author}</span>
        <span>{post.comments} comments</span>
      </div>
    </div>
  );

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold">{post.title}</div>
            <div className="text-gray-500 text-sm">
              {post.author} • {post.timeAgo}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <i className="fas fa-thumbs-up" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-comment" />
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="flex items-center mb-8">
        <i className="fas fa-fire-alt text-3xl text-rose-500 mr-4" />
        <h1 className="text-3xl font-bold">Hot Takes</h1>
      </header>

      <section className="bg-white rounded-lg p-4 shadow-sm mb-8">
        <div className="flex gap-4 flex-wrap">
          {(['24h', '7d', '30d'] as TimeFrame[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tf === '24h' ? 'Last 24 Hours' : tf === '7d' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts
              .filter((post) => post.trending)
              .slice(0, 3)
              .map((post, index) => (
                <TrendingCard key={post.id} post={post} position={index + 1} />
              ))}
          </section>

          <section className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default HotTakesPage;