import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "./icons";
import { InkBadge, InkCard, InkDivider, InkUnderline } from "./sketch";
import { builds, bySlug, type Build, type BuildState } from "./buildsData";
import type { InkTone } from "./sketchContext";

/**
 * Builds is one surface with two states: the board and a single case.
 *
 * The board is four cards pinned to a wall. Each is drawn rather than
 * bordered, in its own ink, and sits at a slight angle — four hands rather
 * than four rows of a table. Hovering straightens a card and lifts it, which
 * is the whole hover state; nothing slides or reveals.
 *
 * The previous version was a plan chest: one drawer open at a time, contents
 * folding in and out. With four entries it was a lot of machinery to hide
 * four short paragraphs, and on a phone it was a column of closed lids.
 *
 * A card's title carries a shared `layoutId` into the case heading, so opening
 * the write-up lifts the name off the card and carries it to the top.
 */

const titleId = (slug: string) => `build-title-${slug}`;

/** Angles are fixed per position, so the wall looks the same on every visit. */
const TILT = [-1.4, 1.2, 0.9, -1.1];

/** ACTIVE reads warm, PAUSED reads held, ARCHIVED reads quiet. */
const stateTone: Record<BuildState, InkTone> = {
  ACTIVE: "teal",
  PAUSED: "amber",
  ARCHIVED: "default",
};

const stateText: Record<BuildState, string> = {
  ACTIVE: "text-teal-700 dark:text-teal-300",
  PAUSED: "text-amber-700 dark:text-amber-300",
  ARCHIVED: "text-gray-500 dark:text-gray-400",
};

const StateTag = ({ state, seed }: { state: BuildState; seed?: number }) => (
  <InkBadge
    tone={stateTone[state]}
    seed={seed}
    className={`[padding:5px_11px] font-mono text-[0.6rem] uppercase tracking-[0.18em] ${stateText[state]}`}
  >
    {state}
  </InkBadge>
);

/* ---------------------------------------------------------------- board -- */

const Board = ({ onOpen }: { onOpen: (slug: string) => void }) => {
  const calm = useReducedMotion();
  const navigate = useNavigate();

  return (
    <motion.section
      key="board"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="pt-8 sm:pt-6 md:pt-0">
          <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <InkUnderline tone="violet" seed={3}>
              Builds
            </InkUnderline>
          </h2>
          <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 font-light max-w-2xl">
            Things I built to find out whether I could. Each one says whether
            it is still alive.
          </p>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
            {builds.map((build, i) => (
              <motion.article
                key={build.slug}
                initial={calm ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
                /*
                 * The tilt is a CSS variable so it can be applied only from
                 * `sm` up: at 375px a rotated full-width card pushes past the
                 * viewport and puts a scrollbar on the page.
                 */
                style={{ "--tilt": `${TILT[i % TILT.length]}deg` } as React.CSSProperties}
                className="group relative sm:rotate-[var(--tilt)] sm:hover:rotate-0 sm:focus-within:rotate-0 sm:hover:-translate-y-1 sm:focus-within:-translate-y-1 transition-transform duration-300 ease-out"
              >
                <InkCard
                  tone={build.tone}
                  seed={11 + i * 7}
                  className="h-full flex flex-col bg-white/60 dark:bg-white/[0.02] px-5 sm:px-6 py-6 sm:py-7"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <StateTag state={build.state} seed={60 + i} />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 tabular-nums">
                      {build.year}
                    </span>
                  </div>

                  <h3 className="mb-3">
                    {/*
                      Stretched hit area: the title is the real control, and
                      its pseudo-element covers the card. Everything else that
                      can be clicked is lifted above it with `relative z-10`.
                    */}
                    <button
                      type="button"
                      onClick={() => onOpen(build.slug)}
                      className="text-left outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-orange-500/60"
                    >
                      <motion.span
                        layoutId={titleId(build.slug)}
                        className="block text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300"
                      >
                        {build.name}
                      </motion.span>
                    </button>
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    {build.line}
                  </p>

                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                    {build.role}
                  </p>

                  {build.stack && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {build.stack.map((tool, t) => (
                        <InkBadge
                          key={tool}
                          tone={build.tone}
                          seed={200 + i * 10 + t}
                          className="[padding:4px_10px] text-[0.7rem] text-gray-600 dark:text-gray-300"
                        >
                          {tool}
                        </InkBadge>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-5">
                    <InkDivider tone={build.tone} seed={80 + i} className="mb-5" />

                    <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <button
                        type="button"
                        onClick={() => onOpen(build.slug)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                      >
                        Open
                        <ArrowLeftIcon size={14} className="rotate-180" />
                      </button>

                      {build.post && (
                        <button
                          type="button"
                          onClick={() => navigate(build.post!)}
                          className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                          <ExternalLinkIcon size={14} />
                          Case study
                        </button>
                      )}

                      {build.href && (
                        <a
                          href={build.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                          <ExternalLinkIcon size={14} />
                          Visit
                        </a>
                      )}

                      {build.repo && (
                        <a
                          href={build.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                          <GithubIcon size={14} />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </InkCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ----------------------------------------------------------------- case -- */

const Case = ({ build, onBack }: { build: Build; onBack: () => void }) => {
  const calm = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [build.slug]);

  return (
    <motion.section
      key={build.slug}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20"
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
            All builds
          </motion.button>

          <motion.h2
            layoutId={titleId(build.slug)}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            {build.name}
          </motion.h2>

          <motion.div
            initial={calm ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-sm text-gray-500 dark:text-gray-400 font-light">
              <StateTag state={build.state} seed={9} />
              <span className="text-gray-900 dark:text-white font-medium">
                {build.year}
              </span>
              <span>{build.role}</span>
            </div>

            {/*
              Shots here are a mix of tall phone mockups and wide site
              captures, so the image is capped by height and contained rather
              than run full-bleed.
            */}
            {build.image && (
              <InkCard
                tone={build.tone}
                seed={21}
                className="mb-12 bg-gray-50/60 dark:bg-white/[0.02] p-3"
              >
                <img
                  src={build.image}
                  alt={`${build.name} interface`}
                  className="mx-auto max-h-[30rem] w-auto max-w-full object-contain"
                />
              </InkCard>
            )}

            <div className="space-y-5 text-base sm:text-lg xl:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              {build.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <InkDivider tone={build.tone} seed={31} className="mt-12 mb-8" />

            {build.stack && (
              <>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">
                  Built with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {build.stack.map((tool, t) => (
                    <InkBadge
                      key={tool}
                      tone={build.tone}
                      seed={300 + t}
                      className="[padding:5px_12px] text-sm text-gray-600 dark:text-gray-300"
                    >
                      {tool}
                    </InkBadge>
                  ))}
                </div>
              </>
            )}

            {(build.post || build.href || build.repo) && (
              <div className="flex flex-wrap gap-4 mt-8">
                {build.post && (
                  <button
                    type="button"
                    onClick={() => navigate(build.post!)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLinkIcon size={16} />
                    Read the case study
                  </button>
                )}
                {build.href && (
                  <a
                    href={build.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLinkIcon size={16} />
                    Visit it
                  </a>
                )}
                {build.repo && (
                  <a
                    href={build.repo}
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* ---------------------------------------------------------------- shell -- */

const Builds = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const build = bySlug(slug);

  // An unknown slug is a bad link, not a blank page.
  useEffect(() => {
    if (slug && !build) navigate("/builds", { replace: true });
  }, [slug, build, navigate]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {build ? (
        <Case
          key={build.slug}
          build={build}
          onBack={() => navigate("/builds")}
        />
      ) : (
        <Board key="board" onOpen={(next) => navigate(`/builds/${next}`)} />
      )}
    </AnimatePresence>
  );
};

export default Builds;
