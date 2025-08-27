import React, { useState, useEffect } from "react";

interface HeaderProps {
  onContactClick: () => void;
  onBlogClick: () => void;
  onHomeClick?: () => void;
}

const Header = ({ onContactClick, onBlogClick, onHomeClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/10 dark:bg-true-black/10 backdrop-filter backdrop-blur-md border border-gray-200/20 dark:border-orange-500/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-4">
        <div className="flex justify-between items-center">
          <div
            onClick={onHomeClick}
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 cursor-pointer font-cursive"
          >
            Feizel
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={onBlogClick}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-medium"
            >
              Journal
            </button>
            <button
              onClick={onContactClick}
              className="px-6 py-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all duration-300 font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/25 dark:hover:shadow-orange-500/50 dark:hover:shadow-lg hover:scale-105 active:scale-95 dark:shadow-orange-500/30 dark:shadow-md"
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
