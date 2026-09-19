import React from 'react';
import {
  UserIcon,
  BriefcaseIcon,
  CodeIcon,
  FolderIcon,
  HomeIcon,
} from './icons';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'About', icon: UserIcon },
    { id: 'experience', label: 'Experience', icon: BriefcaseIcon },
    { id: 'skills', label: 'Skills', icon: CodeIcon },
    { id: 'projects', label: 'Projects', icon: FolderIcon },
  ];

  return (
    <nav className="fixed bottom-4 sm:bottom-6 xl:bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-800/80 rounded-2xl px-2 sm:px-3 xl:px-4 py-2 sm:py-2.5 shadow-lg shadow-black/5 dark:shadow-black/40">
        <div className="flex space-x-0.5 sm:space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex flex-col items-center gap-1 px-2.5 sm:px-3.5 xl:px-4 py-1.5 sm:py-2 rounded-xl transition-colors duration-300 ${
                  isActive
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon
                  size={16}
                  className="sm:w-[18px] sm:h-[18px] xl:w-5 xl:h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span
                  className={`text-[0.65rem] sm:text-xs xl:text-sm transition-all duration-300 ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute inset-x-2 -bottom-0.5 h-px bg-orange-500 transition-transform duration-300 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
