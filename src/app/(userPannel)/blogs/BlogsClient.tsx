"use client";

import React, { useState } from "react";
import { Search, Calendar, Clock, ArrowRight, User, Droplet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

// --- MOCK DATA ---
const categories = ["All", "Donation Tips", "Success Stories", "Health & Wellness", "Events"];

const featuredPost = {
  id: 1,
  title: "Why Donating Blood During the Summer is More Crucial Than Ever",
  excerpt: "Summer months often see a critical drop in blood donations due to vacations and schools closing. Learn why your contribution is desperately needed right now.",
  category: "Health & Wellness",
  author: "Dr. Sarah Jenkins",
  authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg", 
  date: "Mar 5, 2026",
  readTime: "5 min read",
  imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80", 
};

const recentPosts = [
  {
    id: 2,
    title: "First-Time Donor? Here is Exactly What to Expect",
    excerpt: "Nervous about your first donation? We walk you through the entire process step-by-step so you can feel confident and prepared.",
    category: "Donation Tips",
    author: "Rajat Ghosh",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg", 
    date: "Mar 2, 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "How Rahul's Single Donation Saved Three Lives",
    excerpt: "Read the incredible story of a local hero whose routine blood donation ended up saving a mother and her newborn twins.",
    category: "Success Stories",
    author: "Admin Team",
    authorAvatar: "https://randomuser.me/api/portraits/men/78.jpg", 
    date: "Feb 28, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Top 5 Iron-Rich Foods to Eat Before You Donate",
    excerpt: "Boost your hemoglobin levels naturally! Discover the best meals to prep your body for a successful and healthy blood donation.",
    category: "Health & Wellness",
    author: "Nutritionist Priya",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "Feb 20, 2026",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. ADD FILTERING LOGIC HERE
  const filteredPosts = recentPosts.filter((post) => {
    // Check if it matches the category (or if "All" is selected)
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    // Check if the search query is in the title or excerpt (case-insensitive)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchLower) || 
      post.excerpt.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
          <span className="text-red-600 font-semibold tracking-wider uppercase text-sm flex items-center justify-center gap-2 mb-3">
            <Droplet className="w-4 h-4" /> Our Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Stories, Tips & Updates
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to know about blood donation, inspiring community stories, and how you can make a difference.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-12 space-y-16">

        {/* SECTION 1: Featured Post (Optional: You might want to hide this when searching/filtering, but I left it visible) */}
        <section>
          <Link href={`/blogs/${featuredPost.id}`}>
            <div className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                width={1400}
                height={800}
                className="w-full h-[300px] md:h-[400px] rounded-xl object-cover"
              />

              <div className="flex flex-col justify-center space-y-5 px-2 md:px-6 lg:pr-12">
                <span className="bg-red-50 text-red-600 font-semibold px-3 py-1 rounded-full text-sm w-fit">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
                  <div className="flex items-center gap-2 font-medium text-gray-900">
                    <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
                      <AvatarImage src={featuredPost.authorAvatar} alt={featuredPost.author} />
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {featuredPost.date}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* SECTION 2: Categories & Search */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-0 z-10 bg-gray-50/90 backdrop-blur-md py-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 3: Recent Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Latest Articles</h3>
          </div>

          {/* 2. UPDATE MAPPING AND ADD EMPTY STATE */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link href={`/blogs/${post.id}`} key={post.id} className="h-full">
                  <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">

                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h4>

                      <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-5">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
                            <AvatarImage src={post.authorAvatar} alt={post.author} />
                            <AvatarFallback><User /></AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                        </div>
                        <span className="text-red-600 group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" className="px-8 py-6 text-base font-semibold border-gray-300">
                Load More Articles
              </Button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Blogs;