import React, { useState } from 'react';
import { Battery, Wifi, User, Moon, Sun, Shield, AlertTriangle } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { AppTab } from '../types';

interface HeaderProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  isNightMode: boolean;
  onToggleNightMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isNightMode,
  onToggleNightMode,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isNightMode
          ? 'bg-[#0b1120]/95 text-white border-b border-slate-800'
          : 'bg-[#f7f9fb]/95 text-[#191c1e] border-b border-slate-200/80'
      } backdrop-blur-md`}
    >
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onSelectTab(isNightMode ? 'night' : 'today')}
          className="flex items-center gap-2 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          aria-label="Return to home view"
        >
          <img
            src={ASSETS.logo}
            alt="Memoria Logo"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              // Fallback to stylized SVG if external image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span
              className={`text-xl font-bold tracking-tight leading-none ${
                isNightMode ? 'text-white' : 'text-[#191c1e]'
              }`}
            >
              Memoria
            </span>
            {currentTab === 'caregiver' && (
              <span className="text-[11px] font-semibold text-emerald-600 tracking-wide">
                Caregiver Hub
              </span>
            )}
          </div>
        </button>

        {/* Status & Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Night Mode Quick Pill */}
          <button
            onClick={onToggleNightMode}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isNightMode
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title="Toggle Circadian Night / Sundowning Mode"
            aria-label="Toggle Night Mode"
          >
            {isNightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-bold">{isNightMode ? 'Day Mode' : 'Night Mode'}</span>
          </button>

          {/* Battery & Network Status Pill */}
          <div
            className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold ${
              isNightMode ? 'bg-slate-800 text-slate-300' : 'bg-[#eceef0] text-[#45464d]'
            }`}
          >
            <Battery className="w-4 h-4 text-emerald-500" />
            <Wifi className="w-3.5 h-3.5" />
            <span>98%</span>
          </div>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                currentTab === 'caregiver'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : isNightMode
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-[#191c1e] text-white hover:bg-black'
              }`}
              aria-label="Open mode options"
              title="Switch screen modes"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Dropdown Menu for Screen Switching */}
            {showMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                role="menu"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Viewing Role
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Arthur Miller (Oakridge Suite)
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectTab('today');
                    setShowMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    currentTab === 'today' ? 'text-emerald-600 font-bold' : 'text-slate-700 dark:text-slate-200'
                  }`}
                  role="menuitem"
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Patient Day Schedule</span>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('night');
                    setShowMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    currentTab === 'night' ? 'text-emerald-600 font-bold' : 'text-slate-700 dark:text-slate-200'
                  }`}
                  role="menuitem"
                >
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>Sundowning Night Grounding</span>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('caregiver');
                    setShowMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-left text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                    currentTab === 'caregiver' ? 'text-emerald-600 font-bold' : 'text-slate-700 dark:text-slate-200'
                  }`}
                  role="menuitem"
                >
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Caregiver Hub (Sarah's View)</span>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('sos');
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  role="menuitem"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Emergency Help Flow (SOS)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
