import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center gap-1 p-1 rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? 'bg-[#14231B] border-[#2A3F32] shadow-xs'
          : 'bg-[#0E281D] border-emerald-900/60 shadow-xs'
      } ${className}`}
    >
      {/* Sun pill icon */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          !isDark
            ? 'bg-[#EAA044] text-[#0D3828] shadow-sm scale-100 rotate-0'
            : 'text-stone-400 hover:text-stone-200 scale-90'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </div>

      {/* Moon pill icon */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDark
            ? 'bg-[#1E3024] text-[#EAA044] shadow-sm scale-100 rotate-0'
            : 'text-stone-400 hover:text-stone-200 scale-90'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </div>

      {showLabel && (
        <span className="ml-1.5 mr-2 text-xs font-bold text-stone-700 dark:text-stone-200">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
