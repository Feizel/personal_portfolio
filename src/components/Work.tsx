import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "./icons";
import { projects, bySlug, type Project } from "./workData";

/**
 * Work is one surface with two states: the index and a single case.
 *
 * Both are rendered by the same component under one AnimatePresence, which is
 * what lets the project title and its image carry a shared `layoutId` and
 * physically travel between the two — the row you clicked becomes the heading
 * you land on, rather than one page fading into another.
 *
 * `popLayout` takes the outgoing state out of flow, so the incoming one can
 * settle into its final position while the shared elements are still moving.
 */

const titleId = (slug: string) => `work-title-${slug}`;
const imageId = (slug: string) => `work-image-${slug}`;

/* ---------------------------------------------------------------- index -- */

interface IndexProps {
  onOpen: (slug: string) => void;
}

const WorkIndex = ({ onOpen }: IndexProps) => {
  const calm = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [hoverEnabled, setHoverEnabled] = useState(false);

  // The floating preview trails the cursor rather than tracking it exactly.
  const x = useSpring(0, { stiffness: 350, damping: 40, mass: 0.6 });
  const y = useSpring(0, { stiffness: 350, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setHoverEnabled(fine.matches && !quiet.matches);
    read();
    fine.addEventListener("change", read);
    quiet.addEventListener("change", read);
    return () => {
      fine.removeEventListener("change", read);
      quiet.removeEventListener("change", read);
    };
  }, []);

  const track = useCallback(
    (e: React.MouseEvent) => {
      if (!hoverEnabled) return;
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [hoverEnabled, x, y],
  );

  const current = active !== null ? projects[active] : null;

  return (
    <motion.section
      key="index"
      onMouseMove={track}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
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
            {projects.map((project, i) => (
              <li
                key={project.slug}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                <motion.button
                  type="button"
                  onClick={() => onOpen(project.slug)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  // Rows arrive as you reach them, once, and only when motion
                  // is welcome.
                  initial={calm ? false : { opacity: 0, y: 24 }}
                  whileInView={calm ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i, 4) * 0.06,
                  }}
                  className="group w-full text-left grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-7 sm:py-9 xl:py-11 outline-none"
                >
                  <div className="min-w-0">
                    <motion.h3
                      layoutId={titleId(project.slug)}
                      className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white
                        transition-[color,transform] duration-500 ease-out
                        group-hover:text-orange-500 dark:group-hover:text-orange-400
                        group-focus-visible:text-orange-500
                        motion-safe:group-hover:translate-x-2 motion-safe:group-focus-visible:translate-x-2"
                    >
                      {project.name}
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-500 text-orange-500">
                        <ArrowLeftIcon size={18} className="rotate-180" />
                      </span>
                    </motion.h3>
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
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hoverEnabled && (
        <AnimatePresence>
          {current?.image && (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ x, y }}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
              aria-hidden="true"
            >
              <div className="-translate-y-1/2 translate-x-[12rem]">
                <img
                  src={current.image}
                  alt=""
                  className="w-[22rem] xl:w-[26rem] rounded-lg border border-gray-200 dark:border-gray-800 shadow-2xl shadow-black/40 object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.section>
  );
};

/* ----------------------------------------------------------------- case -- */

interface CaseProps {
  project: Project;
  onBack: () => void;
}

const WorkCase = ({ project, onBack }: CaseProps) => {
  const calm = useReducedMotion();
  const body = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [project.slug]);

  return (
    <motion.section
      key={project.slug}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="max-w-3xl xl:max-w-4xl pt-8 sm:pt-6 md:pt-0">
          <motion.button
            type="button"
            onClick={onBack}
            initial={calm ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 mb-10 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            All work
          </motion.button>

          <motion.h2
            layoutId={titleId(project.slug)}
            className="flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            {project.name}
          </motion.h2>

          <motion.div
            variants={calm ? undefined : body}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-sm text-gray-500 dark:text-gray-400 font-light">
              <span className="text-gray-900 dark:text-white font-medium">
                {project.status ?? project.year}
              </span>
              <span>{project.role}</span>
            </div>

            {/*
              Shots here are a mix of tall phone mockups and wide site
              captures, so the image is capped by height and contained rather
              than run full-bleed — otherwise a portrait screenshot pushes the
              whole case below the fold.
            */}
            {project.image && (
              <motion.div
                layoutId={imageId(project.slug)}
                className="mb-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={`${project.name} interface`}
                  className="mx-auto max-h-[30rem] w-auto max-w-full object-contain"
                />
              </motion.div>
            )}

            <div className="space-y-5 text-base sm:text-lg xl:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              {project.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">
                Built with
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light">
                {project.stack.join(" · ")}
              </p>

              {(project.href || project.repo) && (
                <div className="flex flex-wrap gap-4 mt-8">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLinkIcon size={16} />
                      Visit it
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-orange-500/50 dark:hover:text-orange-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      <GithubIcon size={16} />
                      Read the source
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* ---------------------------------------------------------------- shell -- */

const Work = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = bySlug(slug);
  const guard = useRef(false);

  // An unknown slug is a bad link, not a blank page.
  useEffect(() => {
    if (slug && !project && !guard.current) {
      guard.current = true;
      navigate("/work", { replace: true });
    }
  }, [slug, project, navigate]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {project ? (
        <WorkCase
          key={project.slug}
          project={project}
          onBack={() => navigate("/work")}
        />
      ) : (
        <WorkIndex
          key="index"
          onOpen={(next) => navigate(`/work/${next}`)}
        />
      )}
    </AnimatePresence>
  );
};

export default Work;
