import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-8 right-8 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-orange-500/30 rounded-full shadow-lg hover:shadow-xl dark:shadow-orange-500/20 dark:hover:shadow-orange-500/40 transition-all duration-300 hover:scale-110 active:scale-95 z-40 dark:hover:border-orange-500/50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-orange-500 dark:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;