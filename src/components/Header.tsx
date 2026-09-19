import React, { useState, useEffect } from "react";

interface HeaderProps {
  currentPath: string;
  onContactClick: () => void;
  onNavigate: (view: string) => void;
}

const links = [
  { label: "Work", view: "work", path: "/work" },
  { label: "About", view: "about", path: "/about" },
  { label: "Writing", view: "blog", path: "/blog" },
];

/**
 * The only navigation. The bottom dock is gone: with three destinations it was
 * a second menu covering the footer, so the header carries everything.
 */
const Header = ({ currentPath, onContactClick, onNavigate }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? "bg-white/70 dark:bg-true-black/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/80"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => onNavigate("home")}
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 font-cursive"
          >
            Feizel
          </button>

          <div className="flex items-center gap-5 sm:gap-8">
            {links.map(({ label, view, path }) => {
              const active =
                currentPath === path ||
                (path === "/blog" && currentPath.startsWith("/blog"));

              return (
                <button
                  key={view}
                  onClick={() => onNavigate(view)}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm sm:text-base font-medium transition-colors duration-300 ${
                    active
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 right-0 h-px bg-orange-500 origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}

            <button
              onClick={onContactClick}
              className="px-4 sm:px-5 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium rounded-lg"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
