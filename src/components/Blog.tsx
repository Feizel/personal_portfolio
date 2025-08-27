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
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-14 sm:pt-16 md:pt-20 xl:pt-24 2xl:pt-28">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-8 sm:py-12 xl:py-16 2xl:py-20">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 text-sm sm:text-base xl:text-lg 2xl:text-xl"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-2" />
            Back to Portfolio
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 xl:mb-6 2xl:mb-8 font-retro">
            My Journal
          </h1>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-gray-600 dark:text-gray-300 font-light">
            Casual reflections on tech, AI, cloud, business, and space
          </p>
        </div>
      </header>

      <main className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-8 sm:py-12 xl:py-16 2xl:py-20">
        {blogPosts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 xl:py-16 2xl:py-20">
            <p className="text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400">
              No blog posts found. Posts count: {blogPosts.length}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 2xl:gap-12">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 dark:hover:border-orange-400/50 dark:hover:shadow-orange-500/20 dark:hover:shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.02] cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <div className="p-4 sm:p-6 xl:p-7 2xl:p-8">
                  <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm xl:text-base 2xl:text-lg text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-1" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 xl:mb-4 2xl:mb-6 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-retro">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 font-light leading-relaxed">
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
