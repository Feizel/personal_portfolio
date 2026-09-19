import React, { useCallback, useRef, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ExternalLinkIcon, GithubIcon } from "./icons";

/**
 * The work index.
 *
 * A list, not a gallery. Each project is a line of large type; the image only
 * appears when a row is pointed at, floating with the cursor. Nothing competes
 * for attention until you ask it to.
 *
 * On touch and for keyboard users the floating preview never fires, so every
 * row carries its own text — name, line, stack, year — and stands alone.
 */

interface Project {
  name: string;
  line: string;
  year: string;
  stack: string[];
  image?: string;
  href?: string;
  repo?: string;
  /** Shown instead of a link when there is nothing real to open yet. */
  status?: string;
}

const projects: Project[] = [
  {
    name: "Ember",
    line: "A private haptic channel for two people. Touch as a message.",
    year: "2025",
    stack: ["SwiftUI", "CoreHaptics", "CloudKit"],
    image: "/projects/Ember.png",
    href: "https://atomus.co.za",
  },
  {
    name: "Blank",
    line: "A physics playground you steer by tilting the phone.",
    year: "2025",
    stack: ["SwiftUI", "CoreMotion", "Metal", "SpriteKit"],
    image: "/projects/Blank.png",
    href: "https://atomus.co.za",
  },
  {
    name: "Synera",
    line: "Talent mobility, modelled as paths rather than job titles.",
    year: "2025",
    stack: ["React", "Node", "PostgreSQL", "AWS"],
    image: "/projects/synera-ai.png",
    status: "In progress",
  },
  {
    name: "Atomus",
    line: "The studio site. The brief was to not look like everything else.",
    year: "2024",
    stack: ["React", "TypeScript", "Vercel"],
    image: "/projects/atomusdev.png",
    href: "https://atomusdev.co.za",
  },
  {
    name: "626 Creative",
    line: "A studio site for a creative agency, shipped end to end.",
    year: "2024",
    stack: ["React", "TypeScript", "Vercel"],
    image: "/projects/626-creative-agency.png",
    href: "https://www.626.co.za",
  },
  {
    name: "AI Blog Assistant",
    line: "A writing partner that argues with my drafts. Source is public.",
    year: "2024",
    stack: ["Python", "OpenAI API", "Flask"],
    image: "/projects/ai-blog-assistant.png",
    href: "https://ai-blog-assistant.onrender.com",
    repo: "https://github.com/Feizel/AI-Blog-Assistant",
  },
];

const Work = () => {
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  // A spring rather than raw coordinates, so the preview trails the cursor
  // instead of being welded to it.
  const x = useSpring(0, { stiffness: 350, damping: 40, mass: 0.6 });
  const y = useSpring(0, { stiffness: 350, damping: 40, mass: 0.6 });

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setEnabled(fine.matches && !calm.matches);
    read();
    fine.addEventListener("change", read);
    calm.addEventListener("change", read);
    return () => {
      fine.removeEventListener("change", read);
      calm.removeEventListener("change", read);
    };
  }, []);

  const track = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [enabled, x, y],
  );

  const current = active !== null ? projects[active] : null;

  return (
    <section
      ref={frame}
      onMouseMove={track}
      className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="pt-8 sm:pt-6 md:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work
          </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-12 sm:mb-16 font-light max-w-2xl">
            Six things worth showing. Products, studio sites, and one that is
            still being built.
          </p>

          <ul className="border-t border-gray-200 dark:border-gray-800">
            {projects.map((project, i) => {
              const interactive = Boolean(project.href);
              const Row = interactive ? "a" : "div";

              return (
                <li
                  key={project.name}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <Row
                    {...(interactive
                      ? {
                          href: project.href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className={`group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-7 sm:py-9 xl:py-11 outline-none ${
                      interactive ? "cursor-pointer" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:text-orange-500">
                        {project.name}
                        {interactive && (
                          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 transition-all duration-300 text-orange-500">
                            {project.repo ? (
                              <GithubIcon size={18} />
                            ) : (
                              <ExternalLinkIcon size={18} />
                            )}
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base xl:text-lg text-gray-600 dark:text-gray-400 font-light max-w-xl">
                        {project.line}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light">
                        {project.stack.join(" · ")}
                      </p>
                    </div>

                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light tabular-nums whitespace-nowrap">
                      {project.status ?? project.year}
                    </span>
                  </Row>

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 pb-7 text-xs sm:text-sm text-gray-500 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      <GithubIcon size={14} />
                      Read the source
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Floating preview. Pointer devices only. */}
      {enabled && (
        <AnimatePresence>
          {current?.image && (
            <motion.div
              key={current.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ x, y }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
              aria-hidden="true"
            >
              <div className="-translate-x-1/2 -translate-y-1/2 translate-x-[14rem]">
                <img
                  src={current.image}
                  alt=""
                  className="w-[22rem] xl:w-[26rem] rounded-lg border border-gray-200 dark:border-gray-800 shadow-2xl shadow-black/30 object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default Work;
