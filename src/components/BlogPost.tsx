import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import {
  getBlogPostBySlug,
  renderMarkdown,
  type BlogPost,
} from "../utils/blogLoader";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const BlogPostComponent = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      try {
        const blogPost = getBlogPostBySlug(slug);
        setPost(blogPost);
      } catch (error) {
        console.error("Error loading blog post:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Loading blog post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            Back to Journal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-14 sm:pt-16 md:pt-20 xl:pt-24 2xl:pt-28">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-4 sm:py-6 xl:py-8 2xl:py-10">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 text-sm sm:text-base xl:text-lg 2xl:text-xl"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-2" />
            Back to Journal
          </button>
          <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 font-retro">
            {post.title}
          </h1>
          <div className="flex items-center flex-wrap gap-2 sm:gap-6 xl:gap-8 2xl:gap-10 text-xs sm:text-sm xl:text-base 2xl:text-lg text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-1" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 mr-1" />
              Written by:{" "}
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium transition-colors duration-300 hover:underline"
              >
                Feizel
              </a>
            </div>
          </div>
        </div>
      </header>

      <article className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-8 sm:py-12 xl:py-16 2xl:py-20">
        <div
          className="prose prose-sm sm:prose-base md:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert max-w-none prose-headings:font-retro prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-lg sm:text-xl md:prose-h2:text-2xl xl:prose-h2:text-3xl 2xl:prose-h2:text-4xl prose-h2:mt-6 sm:prose-h2:mt-8 xl:prose-h2:mt-10 2xl:prose-h2:mt-12 prose-h2:mb-3 sm:prose-h2:mb-4 xl:prose-h2:mb-6 2xl:prose-h2:mb-8 prose-h3:text-sm sm:text-base md:prose-h3:text-lg xl:prose-h3:text-xl 2xl:prose-h3:text-2xl prose-h3:mt-4 sm:prose-h3:mt-6 xl:prose-h3:mt-8 2xl:prose-h3:mt-10 prose-h3:mb-2 xl:prose-h3:mb-3 2xl:prose-h3:mb-4 prose-p:text-xs sm:prose-p:text-sm md:prose-p:text-base xl:prose-p:text-lg 2xl:prose-p:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-em:italic prose-ul:text-xs sm:prose-ul:text-sm md:prose-ul:text-base xl:prose-ul:text-lg 2xl:prose-ul:text-xl prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-blockquote:border-orange-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full font-medium dark:shadow-orange-500/20 dark:shadow-sm font-retro"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostComponent;
