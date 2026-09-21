import React from "react";
import { InkDivider, InkUnderline } from "./sketch";

interface AboutProps {
  onContactClick?: () => void;
  onBlogClick?: () => void;
}

/** Compact CV rows, replacing the Skills and Experience pages. */
const history = [
  {
    heading: "Currently",
    rows: [
      {
        title: "Developer, SaaS & cloud platform",
        place: "TransLution Software",
        year: "",
      },
    ],
  },
  {
    heading: "Before",
    rows: [
      {
        title: "Cloud Engineer Intern",
        place: "Amazon Web Services",
        year: "2024",
      },
      {
        title: "BSc Information Technology",
        place: "University of the Free State",
        year: "2021–24",
      },
    ],
  },
];

const recognition = [
  {
    title: "GradStar Top 100",
    place: "Gautrain GradStar Awards",
    year: "2024",
    href: "https://gradstar.co.za/2024-top-100/",
  },
  { title: "AWS Solutions Architect Associate", place: "", year: "2025" },
  { title: "AWS AI Practitioner", place: "", year: "2025" },
  { title: "AWS Cloud Practitioner", place: "", year: "2025" },
];

const About = ({ onContactClick }: AboutProps) => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-40 xl:pt-48 pb-4 md:pb-16 xl:pb-20 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="max-w-3xl xl:max-w-4xl">
          <div className="pt-8 sm:pt-6 md:pt-0">
            <h2 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <InkUnderline tone="teal" seed={2}>
                About
              </InkUnderline>
            </h2>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-14 font-light">
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
                dropped record is a truck that doesn't leave. I write the
                modules, model the data, and own what ships. It is a good place
                to learn, because the software is allowed to be wrong exactly
                zero times.
              </p>

              <p>
                I build with AI the way you'd work alongside someone further
                along than you — as a{" "}
                <InkUnderline tone="teal" seed={14}>
                  <span className="text-gray-900 dark:text-white font-medium">
                    partner and a mentor
                  </span>
                </InkUnderline>
                , not an autocomplete and not an oracle. I argue with it, ask it
                to explain itself, throw out what doesn't hold up, and write the
                parts it gets wrong. It is the fastest I have ever learned, and
                it only works if you can tell good code from plausible code.
                Most of the job is building that judgement.
              </p>

              <p>
                The other half of how I think is design. I care how a thing
                feels to use, not only whether it returns 200. I call that{" "}
                <InkUnderline tone="violet" seed={7}>
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

            {/* History — what used to be the Experience and Skills pages. */}
            <div className="mt-16 sm:mt-20 space-y-10">
              {history.map((group) => (
                <div key={group.heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    {group.heading}
                  </h3>
                  <InkDivider seed={51} className="mt-3 mb-2" />
                  {group.rows.map((row) => (
                    <div
                      key={row.title}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3"
                    >
                      <div>
                        <p className="text-sm sm:text-base xl:text-lg text-gray-900 dark:text-white font-medium">
                          {row.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                          {row.place}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light tabular-nums">
                        {row.year}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Recognition
                </h3>
                <InkDivider seed={57} className="mt-3 mb-2" />
                {recognition.map((row) => (
                  <div
                    key={row.title}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3"
                  >
                    <div>
                      <p className="text-sm sm:text-base xl:text-lg text-gray-900 dark:text-white font-medium">
                        {row.href ? (
                          <a
                            href={row.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                          >
                            {row.title}
                          </a>
                        ) : (
                          row.title
                        )}
                      </p>
                      {row.place && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                          {row.place}
                        </p>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light tabular-nums">
                      {row.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light">
                I like talking to people building strange, ambitious things. If
                that's you,{" "}
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
