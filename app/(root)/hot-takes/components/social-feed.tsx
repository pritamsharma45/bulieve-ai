"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ThumbsUp, MessageSquare, Send, Share2, Twitter, Facebook, Linkedin, Link2, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SocialFeed = () => {
  const allPosts = [
    { id: 1, post: "Reliance Stock Up!!!", user: "Parth", likes: 5, comments: [], liked: false },
    { id: 2, post: "Tech Stocks Rally Continues", user: "Sarah", likes: 15, comments: [], liked: false },
    { id: 3, post: "Bitcoin Hits New High", user: "Alex", likes: 25, comments: [], liked: false },
    { id: 4, post: "Fed Rate Decision Impact", user: "Michael", likes: 12, comments: [], liked: false },
    { id: 5, post: "Market Analysis 2024", user: "Jessica", likes: 18, comments: [], liked: false },
    { id: 6, post: "SPX Technical Analysis shows bullish pattern", user: "Robert", likes: 32, comments: [], liked: false },
    { id: 7, post: "Oil prices surge amid geopolitical tensions", user: "Emma", likes: 45, comments: [], liked: false },
    { id: 8, post: "Tesla announces new factory location", user: "David", likes: 67, comments: [], liked: false },
    { id: 9, post: "Gold reaches 6-month high", user: "Sophie", likes: 28, comments: [], liked: false },
    { id: 10, post: "JPMorgan upgrades tech sector", user: "James", likes: 41, comments: [], liked: false },
    { id: 11, post: "NFT market shows signs of recovery", user: "Linda", likes: 19, comments: [], liked: false },
    { id: 12, post: "Real estate sector outlook for 2024", user: "Peter", likes: 23, comments: [], liked: false },
    { id: 13, post: "AI stocks continue to outperform", user: "Anna", likes: 56, comments: [], liked: false },
    { id: 14, post: "New crypto regulations announced", user: "Chris", likes: 34, comments: [], liked: false },
    { id: 15, post: "Small caps showing momentum", user: "Maria", likes: 29, comments: [], liked: false }
  ];

  const POSTS_PER_PAGE = 5;
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [posts, setPosts] = useState(allPosts);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleShare = (platform, post) => {
    const text = encodeURIComponent(`${post.post} - shared by ${post.user}`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${text}&body=${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
      setLoading(false);
    }, 500);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  const addComment = (postId) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { 
            id: Date.now(), 
            user: 'Current User', 
            text: commentText,
            timestamp: new Date().toLocaleString()
          }]
        };
      }
      return post;
    }));

    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Search Bar */}
        <div className="sticky top-4 z-10 backdrop-blur-md bg-white/80 rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              placeholder="Search for hot takes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.slice(0, visiblePosts).map((post) => (
            <Card key={post.id} className="w-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-inner">
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.user}</p>
                    <p className="text-sm text-gray-500">Posted today</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">{post.post}</p>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <div className="w-full border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <Button 
                      variant="ghost" 
                      className={`flex items-center space-x-2 transition-colors ${post.liked ? 'text-blue-500' : 'hover:text-blue-500'}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <ThumbsUp className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleShare('twitter', post)}>
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('facebook', post)}>
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin', post)}>
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('email', post)}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('copy', post)}>
                          <Link2 className="w-4 h-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {expandedComments[post.id] && (
                  <div className="w-full mt-4 space-y-4">
                    <div className="space-y-2">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
                              {comment.user.charAt(0)}
                            </div>
                            <span className="font-medium text-sm">{comment.user}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Write a comment..."
                        value={newComments[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addComment(post.id);
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        size="sm"
                        onClick={() => addComment(post.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {visiblePosts < filteredPosts.length && (
          <div className="flex justify-center pt-4 pb-8">
            <Button 
              onClick={loadMorePosts}
              disabled={loading}
              variant="outline"
              className="w-full max-w-xs bg-white/80 hover:bg-white/90 transition-colors duration-300"
            >
              {loading ? 'Loading...' : 'Load More Posts'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeed;