import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import {
  getBlogPostBySlug,
  renderMarkdown,
  type BlogPost,
} from "../utils/blogLoader";

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
      <header className="bg-white dark:bg-true-black border-b border-gray-200 dark:border-orange-500/20 pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </button>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-retro">
            {post.title}
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
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

      <article className="max-w-4xl mx-auto px-6 py-12">
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-retro prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-base md:prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-sm md:prose-p:text-base prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-em:italic prose-ul:text-sm md:prose-ul:text-base prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-blockquote:border-orange-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
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
