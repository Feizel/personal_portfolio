import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, AwardIcon } from "./icons";
import { InkUnderline } from "./sketch";
import OrbitField from "./OrbitField";

interface HeroProps {
  onContactClick?: () => void;
  onDiscoverSky?: () => void;
}

/**
 * The headline arrives rather than types.
 *
 * Each line rises out of its own clipped band, staggered, on a spring — so the
 * words settle into place instead of being spelled out one character at a
 * time. Under reduced motion every line is simply present from the first
 * frame; nothing is gated behind an animation that may never run.
 */
const line = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { type: "spring", stiffness: 190, damping: 26, mass: 0.9 },
  },
} as const;

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
} as const;

const Hero = ({ onContactClick, onDiscoverSky }: HeroProps) => {
  const calm = useReducedMotion();

  // With reduced motion on, skip straight to the settled state.
  const container = {
    hidden: {},
    show: {
      transition: calm ? {} : { staggerChildren: 0.09, delayChildren: 0.12 },
    },
  };

  const socialClass =
    "p-2 sm:p-3 xl:p-4 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300";
  const socialIconClass = "w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7";

  /** One clipped band. The mask is what makes the line feel lifted, not faded. */
  const Line = ({ children }: { children: React.ReactNode }) => (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className="block" variants={calm ? undefined : line}>
        {children}
      </motion.span>
    </span>
  );

  return (
    <section className="relative flex items-center justify-center pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-0 overflow-hidden">
      <OrbitField onDiscover={onDiscoverSky} />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 w-full pointer-events-none"
      >
        <div className="max-w-3xl xl:max-w-4xl pointer-events-auto">
          <div className="pt-8 sm:pt-6 md:pt-0 mb-6 sm:mb-8 xl:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-black text-gray-900 dark:text-white mb-6 xl:mb-8 leading-[1.08] tracking-tight font-display">
              <Line>I build software</Line>
              <Line>
                <span className="text-orange-500">for the physical world.</span>
              </Line>
            </h1>

            <motion.p
              variants={calm ? undefined : fade}
              className="text-base sm:text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed font-light max-w-2xl"
            >
              Cloud systems that move stock, work and paperwork through
              factories and warehouses — the{" "}
              <InkUnderline seed={11}>
                <span className="text-gray-900 dark:text-white font-medium">
                  load-bearing kind
                </span>
              </InkUnderline>
              , where a dropped record is a truck that doesn't leave.
            </motion.p>

            <motion.p
              variants={calm ? undefined : fade}
              className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 xl:mb-14 leading-relaxed font-light max-w-2xl"
            >
              Developer on the cloud platform at{" "}
              <a
                href="https://www.translutionsoftware.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium underline decoration-orange-500/30 hover:decoration-orange-500 transition-all duration-300"
              >
                TransLution Software
              </a>
              . Creative technologist, amateur astronomer, and a believer that
              the interface is the argument.
            </motion.p>

            <motion.div
              variants={calm ? undefined : fade}
              className="flex space-x-1 sm:space-x-2 xl:space-x-4 mb-8 sm:mb-10 xl:mb-14"
            >
              <a
                href="https://github.com/Feizel"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className={socialIconClass} />
              </a>
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className={socialIconClass} />
              </a>
              <a
                href="https://www.credly.com/users/feizel/"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Credly certifications"
              >
                <AwardIcon className={socialIconClass} />
              </a>
              <button
                onClick={onContactClick}
                className={socialClass}
                aria-label="Contact"
              >
                <MailIcon className={socialIconClass} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
