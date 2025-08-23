import React, { useState, useEffect, useMemo } from 'react';

import { Github, Linkedin, Mail, Award } from 'lucide-react';

const Hero = () => {
  // Memoize titles to keep reference stable and avoid unnecessary effect re-runs
  const titles = useMemo(() => [
    "Feizel",
    "a Software Developer",
    "a Solutions Architect",
    "an Astronomer",
    "a Bookworm",
    "a Deep thinker"
  ], []);

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
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
    <section className="min-h-screen flex items-center justify-start pt-20 pb-12"
    style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Hi, I'm{' '}
              <span
                className="
                  inline-block whitespace-nowrap
                  h-[3.5rem] min-w-[18rem]
                  text-orange-500 hover:text-orange-600 dark:hover:text-orange-400
                  dark:hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]
                  transition-all duration-300 cursor-default font-display
                "
              >
                {displayText}
                <span className="animate-blink">|</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light whitespace-nowrap">
              AWS Intern passionate about cloud computing, AI, and building innovative solutions.<br />
              Recent graduate exploring the intersection of technology and business strategy.
            </p>

            <div className="flex space-x-4 mb-12">
              <a
                href="https://github.com/Feizel"
                className="p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                className="p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.credly.com/users/feizel/"
                className="p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Award size={24} />
              </a>
              <a
                href="mailto:contact@feizelzemaduna.com"
                className="p-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110 hover:rotate-3"
              >
                <Mail size={24} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="
                  px-8 py-3 border-2 border-orange-500 text-orange-500
                  hover:bg-orange-500 hover:text-white
                  transition-all duration-300 font-medium rounded-lg
                  hover:shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-500/50 dark:hover:shadow-xl
                  hover:scale-105 active:scale-95 dark:shadow-orange-500/30 dark:shadow-md
                "
              >
                View My Work
              </button>
              <button
                className="
                  px-8 py-3 border-2 border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-300
                  hover:border-gray-400 dark:hover:border-orange-500/50
                  hover:bg-gray-50 dark:hover:bg-gray-900/50 dark:hover:text-orange-400
                  dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]
                  transition-all duration-300 font-medium rounded-lg
                  hover:scale-105 active:scale-95
                "
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
