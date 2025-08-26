import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { loadBlogPosts, type BlogPost } from "../utils/blogLoader";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const posts = loadBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading notes...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
            My Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light">
            Casual reflections on tech, AI, cloud, business, and space
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found. Posts count: {blogPosts.length}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-retro">
                    {post.title}
                  </h2>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 font-light leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full font-medium font-retro"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full font-medium font-retro">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
