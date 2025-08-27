import React, { useState, useEffect, useMemo } from "react";
import { Github, Linkedin, Mail, Award } from "lucide-react";

const Hero = () => {
  // Memoize titles to keep reference stable and avoid unnecessary effect re-runs
  const titles = useMemo(
    () => [
      "Feizel 👋",
      "a Software Developer 💻",
      "a Solutions Architect ☁️",
      "an Astronomer 🌌",
      "a Bookworm 📚",
      "a Deep thinker 🤔",
    ],
    []
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

  return (
    <section
      className="flex items-center justify-center pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-0 md:pb-0"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 w-full">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16">
            <h1 className="text-2xl sm:text-[1.5rem] md:text-3xl xl:text-5xl 2xl:text-7xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 xl:mb-8 2xl:mb-10 leading-tight">
              Hi, I'm{" "}
              <span
                className="
                  inline-block
                  min-h-[2.5rem] sm:min-h-[3.5rem] xl:min-h-[4.5rem] 2xl:min-h-[5.5rem] sm:min-w-[18rem] xl:min-w-[20rem] 2xl:min-w-[30rem]
                  text-orange-500 hover:text-orange-600 dark:hover:text-orange-400
                  dark:hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]
                  transition-all duration-300 cursor-default font-display
                "
              >
                {displayText}
                <span className="animate-blink">|</span>
              </span>
            </h1>

            <p className="text-base sm:text-[0.95rem] md:text-2xl xl:text-3xl 2xl:text-4xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 leading-relaxed font-light">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-medium">
                AWS Intern
              </span>{" "}
              passionate about{" "}
              <span className="text-blue-500 dark:text-blue-400 font-medium">
                cloud computing ☁️
              </span>
              ,{" "}
              <span className="text-purple-500 dark:text-purple-400 font-medium">
                AI 🤖
              </span>
              , and building{" "}
              <span className="text-green-500 dark:text-green-400 font-medium">
                innovative solutions
              </span>
              .
              <br />
              I'm a recent Information Technology graduate with a computer
              science major exploring the intersection between Cloud Technology,
              Artificial Intelligence, and Business Strategy 🚀.
            </p>

            <div className="flex space-x-3 sm:space-x-4 xl:space-x-6 2xl:space-x-8 mb-8 sm:mb-12 xl:mb-16 2xl:mb-20">
              <a
                href="https://github.com/Feizel"
                className="p-2 sm:p-3 xl:p-4 2xl:p-5 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  size={20}
                  className="sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                className="p-2 sm:p-3 xl:p-4 2xl:p-5 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={20}
                  className="sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                />
              </a>
              <a
                href="https://www.credly.com/users/feizel/"
                className="p-2 sm:p-3 xl:p-4 2xl:p-5 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Award
                  size={20}
                  className="sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                />
              </a>
              <a
                href="mailto:feizel.maduna@gmail.com"
                className="p-2 sm:p-3 xl:p-4 2xl:p-5 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
              >
                <Mail
                  size={20}
                  className="sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 xl:gap-6 2xl:gap-8">
              <button
                className="
                  group relative px-6 sm:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 xl:py-4 2xl:py-5 border-2 border-orange-500 text-orange-500
                  hover:bg-orange-500 hover:text-white text-sm sm:text-[0.8rem] xl:text-lg 2xl:text-xl
                  transition-all duration-500 ease-out font-medium rounded-lg
                  hover:shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-500/50 dark:hover:shadow-xl
                  hover:scale-105 active:scale-95 dark:shadow-orange-500/30 dark:shadow-md
                  transform hover:rotate-1
                "
              >
                <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  🎯
                </span>{" "}
                View My Work
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-xs">
                  ✨
                </div>
              </button>
              <button
                className="
                  group relative px-6 sm:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 xl:py-4 2xl:py-5 border-2 border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300 text-sm sm:text-[0.8rem] xl:text-lg 2xl:text-xl
                  hover:border-gray-400 dark:hover:border-orange-500/50
                  hover:bg-gray-50 dark:hover:bg-gray-900/50 dark:hover:text-orange-400
                  dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]
                  transition-all duration-500 ease-out font-medium rounded-lg
                  hover:scale-105 active:scale-95 transform hover:-rotate-1
                "
              >
                <span className="inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  📄
                </span>{" "}
                Download Resume
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse text-xs">
                  💫
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
