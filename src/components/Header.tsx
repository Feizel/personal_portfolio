import React, { useState, useEffect } from "react";
import { navItems } from "./navItems";
import { InkUnderline } from "./sketch";

interface HeaderProps {
  currentPath: string;
  onNavigate: (view: string) => void;
}

/**
 * The header and the floating dock render the same list, in the same order.
 * Above `md` the header carries it; below that the header keeps only the
 * wordmark, which is the way home, and the dock carries everything else.
 *
 * The current page is marked with a drawn rule rather than a CSS one, and
 * each destination has its own pen — so the nav is where the ink introduces
 * itself, before anyone finds it on a page.
 */
const Header = ({ currentPath, onNavigate }: HeaderProps) => {
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
      <nav
        aria-label="Primary"
        className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-4"
      >
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => onNavigate("home")}
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 font-cursive"
          >
            Feizel
          </button>

          <div className="hidden md:flex items-center gap-5 sm:gap-8">
            {navItems.map(({ label, view, path, tone }, i) => {
              const active =
                !!path &&
                (currentPath === path ||
                  (path === "/blog" && currentPath.startsWith("/blog")) ||
                  (path === "/builds" && currentPath.startsWith("/builds")));

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
                  {active ? (
                    <InkUnderline tone={tone} seed={40 + i}>
                      {label}
                    </InkUnderline>
                  ) : (
                    label
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
