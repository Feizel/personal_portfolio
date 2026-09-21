import React from "react";
import { navItems } from "./navItems";
import { InkCard, InkUnderline } from "./sketch";

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

/**
 * The floating dock. Below `md` it is the only navigation, so it renders the
 * same list as the header — Contact included, since an address nobody can
 * reach on a phone is not an address.
 *
 * It sits above the page, so anything that scrolls to the bottom of the
 * document reserves room for it — see the padding on the footer.
 */
const BottomNav: React.FC<BottomNavProps> = ({ currentView, onViewChange }) => (
  <nav
    aria-label="Primary, compact"
    className="md:hidden fixed left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-500"
    style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
  >
    {/* The frame is drawn, not stroked, so the dock boils along with the rest
        of the ink. The blur stays underneath it. */}
    <InkCard
      tone="default"
      seed={7}
      className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl px-1 py-0.5 shadow-lg shadow-black/5 dark:shadow-black/40"
    >
      <div className="flex space-x-0.5 sm:space-x-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          // Contact has no route, so it is never the current page.
          const isActive = !!item.path && currentView === item.view;

          return (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex flex-col items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-colors duration-300 ${
                isActive
                  ? "text-orange-500 dark:text-orange-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon
                size={16}
                className="sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span
                className={`text-[0.65rem] sm:text-xs transition-all duration-300 ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {isActive ? (
                  <InkUnderline tone={item.tone} seed={40 + i}>
                    {item.label}
                  </InkUnderline>
                ) : (
                  item.label
                )}
              </span>
            </button>
          );
        })}
      </div>
    </InkCard>
  </nav>
);

export default BottomNav;
