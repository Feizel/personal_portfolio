import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "./icons";
import { experiments, bySlug, type Experiment } from "./experimentsData";

/**
 * Experiments is one surface with two states: the cabinet and a single case.
 *
 * The cabinet is a plan chest. Each experiment is a shallow drawer with its
 * label on the face; pulling one open slides its contents out, and pulling
 * another closes the first — a real chest only gives you one drawer at a time
 * without tipping over.
 *
 * A drawer is a look, not the whole story. Its title carries a shared
 * `layoutId` into the case heading, so opening the full write-up lifts the
 * label off the drawer and carries it to the top of the page.
 */

const titleId = (slug: string) => `xp-title-${slug}`;

/* -------------------------------------------------------------- cabinet -- */

interface CabinetProps {
  onOpen: (slug: string) => void;
}

const Cabinet = ({ onOpen }: CabinetProps) => {
  const calm = useReducedMotion();
  const [pulled, setPulled] = useState<string | null>(null);

  return (
    <motion.section
      key="cabinet"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="pt-8 sm:pt-6 md:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experiments
          </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 font-light max-w-2xl">
            Things I built to find out whether I could. Pull a drawer.
          </p>

          {/* The chest. */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50/40 dark:bg-gray-900/20">
            {experiments.map((xp, i) => {
              const open = pulled === xp.slug;
              return (
                <div
                  key={xp.slug}
                  className={
                    i > 0 ? "border-t border-gray-200 dark:border-gray-800" : ""
                  }
                >
                  {/* Drawer face. */}
                  <h3>
                    <button
                      type="button"
                      onClick={() => setPulled(open ? null : xp.slug)}
                      aria-expanded={open}
                      aria-controls={`drawer-${xp.slug}`}
                      className="group w-full flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-5 sm:py-7 text-left outline-none focus-visible:bg-orange-500/[0.06]"
                    >
                      {/* The pull. It slides out as the drawer opens. */}
                      <span
                        aria-hidden="true"
                        className="relative flex-shrink-0 h-4 w-9 sm:w-11"
                      >
                        <motion.span
                          animate={{ x: open ? 5 : 0 }}
                          transition={
                            calm
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 30 }
                          }
                          className={`absolute inset-y-0 left-0 right-0 rounded-full border transition-colors duration-300 ${
                            open
                              ? "border-orange-500/70 bg-orange-500/15"
                              : "border-gray-300 dark:border-gray-700 group-hover:border-orange-500/50"
                          }`}
                        >
                          <span
                            className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                              open
                                ? "bg-orange-500"
                                : "bg-gray-400 dark:bg-gray-600"
                            }`}
                          />
                        </motion.span>
                      </span>

                      <motion.span
                        layoutId={titleId(xp.slug)}
                        className={`flex-1 min-w-0 text-lg sm:text-2xl xl:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                          open
                            ? "text-orange-500 dark:text-orange-400"
                            : "text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400"
                        }`}
                      >
                        {xp.name}
                      </motion.span>

                      {/* Specimen number, the way a drawer is labelled. */}
                      <span className="flex-shrink-0 font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 tabular-nums">
                        <span className="hidden sm:inline">
                          {String(i + 1).padStart(2, "0")} ·{" "}
                        </span>
                        {xp.status ?? xp.year}
                      </span>
                    </button>
                  </h3>

                  {/* Drawer contents. */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`drawer-${xp.slug}`}
                        initial={calm ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          calm
                            ? { duration: 0 }
                            : {
                                height: {
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 34,
                                },
                                opacity: { duration: 0.25 },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-7">
                          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-true-black/60 p-4 sm:p-6 grid gap-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-7">
                            {xp.image && (
                              <div className="rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 overflow-hidden">
                                <img
                                  src={xp.image}
                                  alt={`${xp.name} interface`}
                                  loading="lazy"
                                  className="mx-auto max-h-56 w-auto max-w-full object-contain"
                                />
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="text-sm sm:text-base xl:text-lg text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                                {xp.line}
                              </p>

                              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
                                <dt className="text-gray-400 dark:text-gray-500">
                                  Role
                                </dt>
                                <dd className="text-gray-600 dark:text-gray-300 normal-case tracking-normal font-sans text-sm">
                                  {xp.role}
                                </dd>
                                <dt className="text-gray-400 dark:text-gray-500">
                                  Built with
                                </dt>
                                <dd className="text-gray-600 dark:text-gray-300 normal-case tracking-normal font-sans text-sm">
                                  {xp.stack.join(" · ")}
                                </dd>
                              </dl>

                              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <button
                                  type="button"
                                  onClick={() => onOpen(xp.slug)}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                                >
                                  Read the write-up
                                  <ArrowLeftIcon size={15} className="rotate-180" />
                                </button>

                                {xp.href && (
                                  <a
                                    href={xp.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                  >
                                    <ExternalLinkIcon size={15} />
                                    Visit it
                                  </a>
                                )}
                                {xp.repo && (
                                  <a
                                    href={xp.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                  >
                                    <GithubIcon size={15} />
                                    Source
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ----------------------------------------------------------------- case -- */

interface CaseProps {
  experiment: Experiment;
  onBack: () => void;
}

const Case = ({ experiment, onBack }: CaseProps) => {
  const calm = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [experiment.slug]);

  return (
    <motion.section
      key={experiment.slug}
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
            All experiments
          </motion.button>

          <motion.h2
            layoutId={titleId(experiment.slug)}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            {experiment.name}
          </motion.h2>

          <motion.div
            initial={calm ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-sm text-gray-500 dark:text-gray-400 font-light">
              <span className="text-gray-900 dark:text-white font-medium">
                {experiment.status ?? experiment.year}
              </span>
              <span>{experiment.role}</span>
            </div>

            {/*
              Shots here are a mix of tall phone mockups and wide site
              captures, so the image is capped by height and contained rather
              than run full-bleed.
            */}
            {experiment.image && (
              <div className="mb-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 overflow-hidden">
                <img
                  src={experiment.image}
                  alt={`${experiment.name} interface`}
                  className="mx-auto max-h-[30rem] w-auto max-w-full object-contain"
                />
              </div>
            )}

            <div className="space-y-5 text-base sm:text-lg xl:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              {experiment.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">
                Built with
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light">
                {experiment.stack.join(" · ")}
              </p>

              {(experiment.href || experiment.repo) && (
                <div className="flex flex-wrap gap-4 mt-8">
                  {experiment.href && (
                    <a
                      href={experiment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLinkIcon size={16} />
                      Visit it
                    </a>
                  )}
                  {experiment.repo && (
                    <a
                      href={experiment.repo}
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

const Experiments = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const experiment = bySlug(slug);
  const guard = useRef(false);

  // An unknown slug is a bad link, not a blank page.
  useEffect(() => {
    if (slug && !experiment && !guard.current) {
      guard.current = true;
      navigate("/experiments", { replace: true });
    }
  }, [slug, experiment, navigate]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {experiment ? (
        <Case
          key={experiment.slug}
          experiment={experiment}
          onBack={() => navigate("/experiments")}
        />
      ) : (
        <Cabinet
          key="cabinet"
          onOpen={(next) => navigate(`/experiments/${next}`)}
        />
      )}
    </AnimatePresence>
  );
};

export default Experiments;
