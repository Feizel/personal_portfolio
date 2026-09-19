import React from "react";
import { InkCircle, InkUnderline } from "./sketch";

interface AboutProps {
  onContactClick?: () => void;
  onBlogClick?: () => void;
}

const About = ({ onContactClick }: AboutProps) => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 2xl:pt-56 pb-4 md:pb-16 xl:pb-20 2xl:pb-24 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12">
        <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 cursor-default">
              About
            </h2>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 font-light">
              The short version, and why I build the things I build.
            </p>

            {/* Profile Image */}
            <div className="flex justify-center mb-10 sm:mb-14 xl:mb-16">
              <div className="relative group">
                <div className="absolute -inset-px bg-orange-500/30 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/feizel.PNG"
                  alt="Feizel"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 xl:w-56 xl:h-56 rounded-full object-cover border-2 border-white dark:border-gray-800"
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              <p>
                I'm a software developer working on a{" "}
                <span className="text-gray-900 dark:text-white font-medium">
                  SaaS platform for manufacturing and distribution
                </span>{" "}
                — the unglamorous, load-bearing kind of software, where a
                dropped record is a truck that doesn't leave. Most of my day is
                data modelling, reviewing code that AI agents wrote, and
                deciding whether it is actually correct. It is a good place to
                learn, because the software is allowed to be wrong exactly zero
                times.
              </p>

              <p>
                The other half of how I think is design. I care how a thing
                feels to use, not only whether it returns 200. I call that{" "}
                <InkUnderline seed={7}>
                  <span className="text-gray-900 dark:text-white font-medium">
                    creative technologist
                  </span>
                </InkUnderline>{" "}
                because the two halves aren't separable in practice: the
                interface is the argument, and a system nobody wants to touch is
                a system that failed.
              </p>

              <blockquote className="my-10 pl-5 border-l border-orange-500/40 text-sm sm:text-base italic text-gray-500 dark:text-gray-400">
                We are made of starstuff. We are a way for the cosmos to know
                itself.
                <cite className="block mt-2 not-italic text-xs text-gray-500 dark:text-gray-500">
                  Carl Sagan
                </cite>
              </blockquote>

              <p>
                Science is the through-line. I read astronomy the way other
                people follow a league — orbital mechanics, telescope optics,
                whatever the current arguments are about dark matter. It shows
                up in my work more than it should: the good engineering
                instincts are the same instincts, which is to say measure first,
                distrust a clean result, and assume the universe is stranger
                than your model of it.
              </p>

              <p>
                I write about all of it —{" "}
                <a
                  href="/blog"
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors underline decoration-orange-500/30 font-medium"
                >
                  notes and longer pieces
                </a>{" "}
                on AI, cloud, and things happening several light years away.
                Writing is how I find out whether I understood something or just
                recognised it.
              </p>
            </div>

            <div className="mt-12 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6">
                For the record
              </h3>
              <div className="space-y-5 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-light">
                <p>
                  <InkUnderline seed={21}>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Three AWS certifications
                    </span>
                  </InkUnderline>{" "}
                  — Cloud Practitioner, AI Practitioner, Solutions Architect
                  Associate — earned inside seven months during my internship.
                </p>
                <p>
                  Co-founded{" "}
                  <a
                    href="https://atomusdev.co.za/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors underline decoration-orange-500/30 font-medium"
                  >
                    Atomus
                  </a>
                  , a small studio where the brief is usually "this should not
                  look like everything else".
                </p>
                <p>
                  Built CloudClassroom during my time at AWS, and scored{" "}
                  <InkCircle seed={34}>
                    <span className="text-gray-900 dark:text-white font-medium">
                      96%
                    </span>
                  </InkCircle>{" "}
                  on my final-year event management system.
                </p>
                <p>
                  Bought a telescope long before I could justify it. Still the
                  best purchase I've made.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light">
                I like talking to people building strange, ambitious things.
                If that's you,{" "}
                <button
                  onClick={onContactClick}
                  className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer underline decoration-orange-500/30"
                >
                  say hello
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
