import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ClockIcon } from "./icons";
import { localSiderealTime, moonPhase } from "../utils/sky";
import { loadBlogPosts, type BlogPost } from "../utils/blogLoader";

/**
 * Writing, read as a spectrum.
 *
 * Split a star's light and you get a band crossed by bright lines; which lines
 * appear is what tells you what the star is made of. This does the same thing
 * with a year of writing — every piece is an emission line, placed by when it
 * was written and burning in proportion to how long it takes to read. The
 * whole body of work is one reading.
 *
 * It is a band rather than a plot because a band survives a phone. Drag a
 * finger along it and the nearest line takes over; the vertical axis is not
 * carrying information, so nothing is lost at 380px wide.
 *
 * The spectrum is the flourish, not the interface. Everything it encodes is
 * also in the log beneath it, which is an ordinary, readable, keyboard
 * navigable list; touching either half lights the other.
 */

interface Line extends BlogPost {
  /** Position along the band, 0-100. */
  x: number;
  /** 0-1, from read time. Drives width, brightness and height. */
  strength: number;
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
  const bandRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

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

  const lines = useMemo<Line[]>(() => {
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
      // Inset from both edges so the outermost lines are never clipped.
      x: 7 + span(p.time, tMin, tMax) * 86,
      strength: span(p.minutes, mMin, mMax),
    }));
  }, [posts]);

  /* One spring drives the marker and the readout, so they travel as one. */
  const markX = useSpring(50, { stiffness: 300, damping: 34, mass: 0.7 });
  const markOn = useSpring(0, { stiffness: 220, damping: 30 });
  const leftPct = useTransform(markX, (v) => `${v}%`);

  const activeLine = useMemo(
    () => lines.find((l) => l.slug === active) ?? null,
    [lines, active],
  );

  // Follow the active entry wherever the change came from: the band, the log,
  // or the keyboard.
  useEffect(() => {
    if (!activeLine) {
      markOn.set(0);
      return;
    }
    markX.set(activeLine.x);
    markOn.set(1);
  }, [activeLine, markX, markOn]);

  /** Nearest line to a client x position. Works for pointer and for touch. */
  const pick = useCallback(
    (clientX: number) => {
      const el = bandRef.current;
      if (!el || !lines.length) return;
      const rect = el.getBoundingClientRect();
      const px = ((clientX - rect.left) / rect.width) * 100;

      let best = lines[0];
      let bestD = Infinity;
      for (const line of lines) {
        const d = Math.abs(line.x - px);
        if (d < bestD) {
          bestD = d;
          best = line;
        }
      }
      if (best.slug !== active) setActive(best.slug);
    },
    [lines, active],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pick(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    // A mouse tracks on hover; a finger only tracks once it is down, so the
    // band never hijacks a scroll that happened to start on top of it.
    if (e.pointerType === "mouse" || dragging.current) pick(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

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
            Split a star's light and the bright lines tell you what it is made
            of. This is the same reading, taken of a year's writing — one line
            per piece, burning as long as the piece takes.
          </p>

          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/30 overflow-hidden mb-3">
            {/* The band. */}
            <div
              ref={bandRef}
              role="group"
              aria-label="Spectrum of writing. Drag along it, or use the list below."
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseLeave={() => setActive(null)}
              className="relative h-32 sm:h-40 xl:h-48 cursor-crosshair touch-pan-y select-none"
            >
              {/* The continuum: a dispersed spectrum, heavily dimmed so the
                  emission lines are what the eye actually catches. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.16] dark:opacity-[0.22]"
                style={{
                  background:
                    "linear-gradient(90deg, #6d28d9 0%, #2563eb 22%, #0891b2 40%, #16a34a 55%, #eab308 72%, #f97316 86%, #dc2626 100%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 dark:from-black/60 dark:to-black/70"
              />

              {/* Emission lines. */}
              {lines.map((line, i) => {
                const isActive = active === line.slug;
                const width = 1.5 + line.strength * 3.5;
                return (
                  <motion.button
                    key={line.slug}
                    type="button"
                    initial={calm ? false : { opacity: 0, scaleY: 0.2 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                    onClick={() => navigate(`/blog/${line.slug}`)}
                    onFocus={() => setActive(line.slug)}
                    onBlur={() => setActive(null)}
                    aria-label={`${line.title} — ${line.readTime}`}
                    className="absolute top-0 bottom-0 -translate-x-1/2 outline-none"
                    style={{ left: `${line.x}%`, width: Math.max(width, 3) }}
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        opacity: isActive ? 1 : 0.55 + line.strength * 0.3,
                        scaleX: isActive ? 1.8 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className="absolute left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        width,
                        // Longer pieces cut deeper into the band.
                        top: `${14 - line.strength * 8}%`,
                        bottom: `${14 - line.strength * 8}%`,
                        background: isActive
                          ? "rgb(251 191 36)"
                          : "rgba(255,255,255,0.92)",
                        boxShadow: isActive
                          ? "0 0 18px 4px rgba(251,191,36,0.55)"
                          : `0 0 ${6 + line.strength * 10}px ${1 + line.strength * 2}px rgba(255,255,255,0.35)`,
                      }}
                    />
                  </motion.button>
                );
              })}

              {/* The marker travels between lines rather than reappearing. */}
              <motion.div
                aria-hidden="true"
                style={{ left: leftPct, opacity: markOn }}
                className="pointer-events-none absolute -bottom-px h-2 w-px -translate-x-1/2 bg-orange-400"
              />
              <motion.div
                aria-hidden="true"
                style={{ left: leftPct, opacity: markOn }}
                className="pointer-events-none absolute -top-px h-2 w-px -translate-x-1/2 bg-orange-400"
              />
            </div>

            {/* Readout. Fixed height so the band never jumps as it changes. */}
            <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 min-h-[3.75rem] flex items-center">
              {activeLine ? (
                <button
                  type="button"
                  onClick={() => navigate(`/blog/${activeLine.slug}`)}
                  className="text-left w-full group"
                >
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
                    {new Date(activeLine.date)
                      .toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "short",
                      })
                      .toUpperCase()}{" "}
                    · {activeLine.readTime.replace(" read", "").toUpperCase()}
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                    {activeLine.title}
                  </span>
                </button>
              ) : (
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                  <span className="sm:hidden">Drag along the band</span>
                  <span className="hidden sm:inline">
                    Move across the band · brighter and wider = longer read
                  </span>
                </p>
              )}
            </div>

            {/* Instruments, for the same reason a real log has them. */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-gray-200 dark:border-gray-800 px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
              <span>LST {lst}</span>
              <span>
                {moon.name} · {Math.round(moon.illumination * 100)}%
              </span>
              <span>{lines.length} lines</span>
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
