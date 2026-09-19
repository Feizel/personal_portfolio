import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ClockIcon } from "./icons";
import { localSiderealTime, moonPhase } from "../utils/sky";
import { loadBlogPosts, type BlogPost } from "../utils/blogLoader";

/**
 * Writing, plotted as an observation log.
 *
 * Each piece is a star. Its position on the chart comes from when it was
 * written (right to left, newest first) and how long it takes to read (longer
 * pieces sit higher and burn brighter, the way magnitude works — except here
 * bigger genuinely means more). Consecutive entries are joined, so a year of
 * writing reads as one constellation.
 *
 * The chart is the flourish, not the interface. Everything it shows is also in
 * the log beneath it, which is an ordinary, readable, keyboard-navigable list;
 * pointing at either half highlights the other.
 */

interface Plotted extends BlogPost {
  x: number;
  y: number;
  /** Drawn radius, from read time. */
  r: number;
  minutes: number;
  time: number;
}

const readMinutes = (readTime: string) => {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const calm = useReducedMotion();
  const moon = moonPhase();
  const [lst, setLst] = useState(() => localSiderealTime().text);

  useEffect(() => {
    try {
      setPosts(loadBlogPosts());
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLst(localSiderealTime().text), 1000);
    return () => clearInterval(id);
  }, []);

  /* The chart is drawn in a 100x46 user-space box and scaled to fit. */
  const plotted = useMemo<Plotted[]>(() => {
    if (!posts.length) return [];

    const withTime = posts.map((p) => ({
      ...p,
      minutes: readMinutes(p.readTime),
      time: new Date(p.date).getTime(),
    }));

    const times = withTime.map((p) => p.time);
    const mins = withTime.map((p) => p.minutes);
    const tMin = Math.min(...times);
    const tMax = Math.max(...times);
    const mMin = Math.min(...mins);
    const mMax = Math.max(...mins);

    const span = (v: number, lo: number, hi: number) =>
      hi === lo ? 0.5 : (v - lo) / (hi - lo);

    return withTime.map((p) => ({
      ...p,
      // Oldest on the left, newest on the right.
      x: 8 + span(p.time, tMin, tMax) * 84,
      // Longer reads sit higher.
      y: 38 - span(p.minutes, mMin, mMax) * 26,
      r: 1.1 + span(p.minutes, mMin, mMax) * 2.2,
    }));
  }, [posts]);

  /* Joined in time order, so the line reads left to right. */
  const chain = useMemo(
    () => [...plotted].sort((a, b) => a.time - b.time),
    [plotted],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400 font-light">
          Loading the log…
        </p>
      </div>
    );
  }

  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="pt-8 sm:pt-6 md:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Writing
          </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-10 font-light max-w-2xl">
            An observation log. Notes and longer pieces on AI, cloud, systems,
            and the sky — plotted by when I wrote them and how long they take to
            read.
          </p>

          {/*
            The chart is drawn in two layers: an SVG stretched edge to edge for
            the joining lines, and the stars as positioned elements on top.
            Doing it this way keeps the stars perfectly round at any aspect
            ratio — a single SVG would either letterbox or squash them — and
            lets each one be a real, focusable link.
          */}
          <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/30 overflow-hidden mb-3">
            <div className="relative h-[210px] sm:h-[260px] xl:h-[300px]">
              <svg
                viewBox="0 0 100 46"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {[12, 25, 38].map((y) => (
                  <line
                    key={y}
                    x1="4"
                    x2="96"
                    y1={y}
                    y2={y}
                    className="stroke-gray-300/50 dark:stroke-gray-700/50"
                    strokeWidth="0.1"
                    strokeDasharray="0.6 1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {chain.slice(0, -1).map((star, i) => {
                  const next = chain[i + 1];
                  return (
                    <motion.line
                      key={`${star.slug}-link`}
                      x1={star.x}
                      y1={star.y}
                      x2={next.x}
                      y2={next.y}
                      className="stroke-orange-500/40"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      // A pathLength draw-on fights non-scaling-stroke: the
                      // dash array is computed in user units the stroke no
                      // longer follows, and the line renders dashed. Fading
                      // each segment in keeps the sequence without the artefact.
                      initial={calm ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                    />
                  );
                })}
              </svg>

              {plotted.map((star, i) => {
                const isActive = active === star.slug;
                const size = 7 + star.r * 4;
                return (
                  <motion.button
                    key={star.slug}
                    type="button"
                    initial={calm ? false : { opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    onClick={() => navigate(`/blog/${star.slug}`)}
                    onMouseEnter={() => setActive(star.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(star.slug)}
                    onBlur={() => setActive(null)}
                    aria-label={`${star.title} — ${star.readTime}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                    style={{
                      left: `${star.x}%`,
                      top: `${(star.y / 46) * 100}%`,
                      width: size,
                      height: size,
                    }}
                  >
                    <span
                      className={`block h-full w-full rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-orange-400 ring-8 ring-orange-500/20"
                          : "bg-gray-400 dark:bg-gray-300"
                      }`}
                    />
                  </motion.button>
                );
              })}

              {/* The title of whichever star is being pointed at. */}
              <p
                hidden={!active}
                className="pointer-events-none absolute left-4 top-4 max-w-[70%] font-mono text-[0.65rem] uppercase tracking-[0.18em] text-orange-500 dark:text-orange-400"
              >
                {plotted.find((p) => p.slug === active)?.title}
              </p>
            </div>

            {/* Instruments, for the same reason a real log has them. */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 px-4 pb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              <span>LST {lst}</span>
              <span>
                {moon.name} · {Math.round(moon.illumination * 100)}%
              </span>
              <span>{plotted.length} entries</span>
              <span className="hidden sm:inline">bigger = longer read</span>
            </div>
          </div>

          {/* The log. */}
          <ul className="border-t border-gray-200 dark:border-gray-800">
            {posts.map((post) => {
              const isActive = active === post.slug;
              return (
                <li
                  key={post.slug}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    onMouseEnter={() => setActive(post.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(post.slug)}
                    onBlur={() => setActive(null)}
                    className={`group w-full text-left grid grid-cols-1 sm:grid-cols-[7rem_1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:py-6 transition-colors duration-300 ${
                      isActive ? "bg-orange-500/[0.04]" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                      {new Date(post.date).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>

                    <span className="min-w-0">
                      <span
                        className={`block text-base sm:text-lg xl:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-orange-500 dark:text-orange-400"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {post.title}
                        {post.status && (
                          <span className="ml-3 align-middle font-mono text-[0.6rem] uppercase tracking-widest text-orange-500/80 border border-orange-500/30 rounded px-1.5 py-0.5">
                            {post.status.replace(/-/g, " ")}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400 font-light max-w-2xl">
                        {post.excerpt}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      <ClockIcon size={13} />
                      {post.readTime.replace(" read", "")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blog;
