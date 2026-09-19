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
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 cursor-pointer font-cursive"
          >
            Feizel
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={onBlogClick}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 font-medium"
            >
              Writing
            </button>
            <button
              onClick={onContactClick}
              className="px-5 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 font-medium rounded-lg"
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
