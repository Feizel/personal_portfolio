import React, { useState, useEffect, useMemo } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  AwardIcon,
} from "./icons";
import { InkUnderline } from "./sketch";

interface HeroProps {
  onWorkClick?: () => void;
  onContactClick?: () => void;
}

const Hero = ({ onWorkClick, onContactClick }: HeroProps) => {
  const titles = useMemo(
    () => [
      "Feizel",
      "a software developer",
      "a creative technologist",
      "an amateur astronomer",
    ],
    [],
  );

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.substring(0, displayText.length + 1));
          setTypeSpeed(150);
        } else {
          setTypeSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentTitle.substring(0, displayText.length - 1));
          setTypeSpeed(75);
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypeSpeed(500);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex, typeSpeed, titles]);

  const socialClass =
    "p-2 sm:p-3 xl:p-4 2xl:p-5 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300";
  const socialIconClass = "w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7";

  return (
    <section className="flex items-center justify-center pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-0 md:pb-0">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 w-full">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16">
            <h1 className="text-2xl sm:text-[1.5rem] md:text-3xl xl:text-5xl 2xl:text-7xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 xl:mb-8 2xl:mb-10 leading-tight">
              Hi, I'm{" "}
              <span
                className="
                  inline-block
                  min-h-[2.5rem] sm:min-h-[3.5rem] xl:min-h-[4.5rem] 2xl:min-h-[5.5rem] sm:min-w-[18rem] xl:min-w-[20rem] 2xl:min-w-[30rem]
                  text-orange-500 transition-colors duration-300 cursor-default font-display
                "
              >
                {displayText}
                <span className="hidden md:inline animate-blink select-none">
                  |
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-[0.95rem] md:text-2xl xl:text-3xl 2xl:text-4xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 xl:mb-8 leading-relaxed font-light">
              I build{" "}
              <InkUnderline seed={11}>
                <span className="text-gray-900 dark:text-white font-medium">
                  SaaS for factories
                </span>
              </InkUnderline>{" "}
              — cloud software that moves stock, work and paperwork through
              manufacturing and distribution businesses.
            </p>

            <p className="text-sm sm:text-[0.9rem] md:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 leading-relaxed font-light">
              Developer on the cloud platform at{" "}
              <a
                href="https://www.translution.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-medium underline decoration-orange-500/30 hover:decoration-orange-500 transition-all duration-300"
              >
                TransLution Software
              </a>
              . I write the code, and I build alongside AI the way you'd work
              with a mentor — argue with it, verify it, keep what holds up.
              Computer science graduate, GradStar Top 100, three AWS
              certifications.
            </p>

            <div className="flex space-x-2 sm:space-x-3 xl:space-x-5 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20">
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
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 xl:gap-6 2xl:gap-8">
              <button
                onClick={onWorkClick}
                className="
                  px-6 sm:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 xl:py-4 2xl:py-5 border border-orange-500 text-orange-500
                  hover:bg-orange-500 hover:text-white text-sm sm:text-[0.8rem] xl:text-lg 2xl:text-xl
                  transition-colors duration-300 font-medium rounded-lg
                "
              >
                See what I've built
              </button>
              <button
                onClick={onContactClick}
                className="
                  px-6 sm:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 xl:py-4 2xl:py-5 border border-gray-300 dark:border-gray-700
                  text-gray-700 dark:text-gray-300 text-sm sm:text-[0.8rem] xl:text-lg 2xl:text-xl
                  hover:border-gray-400 dark:hover:border-orange-500/50 dark:hover:text-orange-400
                  transition-colors duration-300 font-medium rounded-lg text-center
                "
              >
                Request my CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
