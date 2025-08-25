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
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex space-x-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`group relative flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-500 ease-out transform ${
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
                    size={20} 
                    className={`transition-all duration-300 ${
                      isActive ? 'animate-pulse' : 'group-hover:rotate-12'
                    }`} 
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 text-xs animate-bounce">
                      {item.emoji}
                    </div>
                  )}
                  {!isActive && (
                    <div className="absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-in zoom-in-50">
                      {item.emoji}
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'font-semibold' : 'group-hover:font-semibold'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
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