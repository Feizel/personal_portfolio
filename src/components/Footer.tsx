import React from "react";
import { GithubIcon, LinkedinIcon, MailIcon, AwardIcon, OrbitIcon } from "./icons";
import { useSketch } from "./sketchContext";

interface FooterProps {
  onViewChange?: (view: string) => void;
}

const links: { label: string; view: string }[] = [
  { label: "Home", view: "home" },
  { label: "Builds", view: "builds" },
  { label: "About", view: "about" },
  { label: "Writing", view: "blog" },
];

const interests = [
  "SaaS and cloud platforms",
  "ERP and manufacturing systems",
  "AI-augmented development",
  "Astronomy",
];

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const { loud } = useSketch();

  const socialClass =
    "p-3 bg-white dark:bg-gray-900 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 border border-gray-200 dark:border-gray-800";

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/20 border-t border-gray-200 dark:border-gray-800 pt-16 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white font-cursive">
              Feizel
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Software developer and creative technologist. I build cloud
              software for manufacturing, and write about AI, systems and the
              sky.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/Feizel"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/feizel-ze-maduna/"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://www.credly.com/users/feizel"
                className={socialClass}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Credly certifications"
              >
                <AwardIcon size={20} />
              </a>
              <a
                href="mailto:feizel.maduna@gmail.com"
                className={socialClass}
                aria-label="Email"
              >
                <MailIcon size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500">
              Explore
            </h3>
            <div className="space-y-3">
              {links.map(({ label, view }) => (
                <button
                  key={view}
                  onClick={() => onViewChange?.(view)}
                  className="block text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 font-light text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-500">
              Currently interested in
            </h3>
            <div className="space-y-3">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center text-gray-600 dark:text-gray-400"
                >
                  <span className="w-1 h-1 mr-3 rounded-full bg-orange-500/70"></span>
                  <span className="font-light">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 flex items-center font-light text-sm">
              <OrbitIcon size={16} className="mr-2 text-orange-500" />
              Built by Feizel, in South Africa
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs font-light">
              {/* The one easter egg, stated plainly rather than hidden meanly. */}
              Press{" "}
              <kbd className="px-1.5 py-0.5 border border-gray-300 dark:border-gray-700 rounded text-[0.7rem] font-mono">
                ~
              </kbd>{" "}
              {loud ? "to ease off" : "to press harder"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
