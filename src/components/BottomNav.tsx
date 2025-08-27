import React from 'react';
import { User, Briefcase, Code, FolderOpen, Home } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, emoji: '🏠' },
    { id: 'about', label: 'About', icon: User, emoji: '👋' },
    { id: 'experience', label: 'Experience', icon: Briefcase, emoji: '💼' },
    { id: 'skills', label: 'Skills', icon: Code, emoji: '🚀' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, emoji: '📁' }
  ];

  return (
    <nav className="fixed bottom-4 sm:bottom-6 xl:bottom-8 2xl:bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-xl sm:rounded-2xl xl:rounded-3xl px-3 sm:px-4 xl:px-6 2xl:px-8 py-2 sm:py-3 xl:py-4 2xl:py-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex space-x-1 sm:space-x-2 xl:space-x-3 2xl:space-x-4">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`group relative flex flex-col items-center space-y-1 px-2 sm:px-3 xl:px-4 2xl:px-5 py-1 sm:py-2 xl:py-3 2xl:py-4 rounded-lg sm:rounded-xl xl:rounded-2xl transition-all duration-500 ease-out transform ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-500 dark:text-orange-400 scale-110 shadow-lg shadow-orange-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-500/10 hover:scale-105 active:scale-95'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative">
                  <Icon 
                    size={16} 
                    className={`sm:w-5 sm:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 transition-all duration-300 ${
                      isActive ? 'animate-pulse' : 'group-hover:rotate-12'
                    }`} 
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 text-xs sm:text-sm xl:text-base 2xl:text-lg animate-bounce">
                      {item.emoji}
                    </div>
                  )}
                  {!isActive && (
                    <div className="absolute -top-1 -right-1 text-xs sm:text-sm xl:text-base 2xl:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-in zoom-in-50">
                      {item.emoji}
                    </div>
                  )}
                </div>
                <span className={`text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium transition-all duration-300 ${
                  isActive ? 'font-semibold' : 'group-hover:font-semibold'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 xl:w-2 xl:h-2 2xl:w-3 2xl:h-3 bg-orange-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;