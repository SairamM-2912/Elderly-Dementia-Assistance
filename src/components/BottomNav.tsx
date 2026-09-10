import React from 'react';
import { Calendar, Users, Bell, PhoneCall, Sparkles, Shield, RotateCcw } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  isNightMode: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  isNightMode,
}) => {
  // If in Caregiver Mode, show caregiver-specific quick switcher or return button
  if (currentTab === 'caregiver') {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-lg"
        aria-label="Caregiver navigation"
      >
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                Caregiver Monitoring Mode
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                Viewing telemetry for Arthur Miller
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('today')}
            className="min-h-[48px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return to Patient Tablet</span>
          </button>
        </div>
      </nav>
    );
  }

  const navItems = [
    {
      id: 'today' as AppTab,
      label: 'Today',
      icon: Calendar,
    },
    {
      id: 'family' as AppTab,
      label: 'Family',
      icon: Users,
    },
    {
      id: 'reminders' as AppTab,
      label: 'Reminders',
      icon: Bell,
    },
    {
      id: 'exercises' as AppTab,
      label: 'Exercises',
      icon: Sparkles,
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isNightMode
          ? 'bg-[#0b1120]/95 border-t border-slate-800'
          : 'bg-[#f7f9fb]/95 border-t border-slate-200'
      } shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl`}
      aria-label="Patient navigation"
    >
      <div className="max-w-md mx-auto px-2 py-2 flex items-center justify-between gap-1 min-h-[72px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 min-h-[58px] rounded-xl flex flex-col items-center justify-center transition-all ${
                isActive
                  ? isNightMode
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-inner'
                    : 'bg-[#e6e8ea] text-[#191c1e] font-bold shadow-sm'
                  : isNightMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-[#45464d] hover:text-[#191c1e]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[13px] tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* Emergency Help Action Button */}
        <button
          onClick={() => onSelectTab('sos')}
          className="flex-[1.2] min-h-[58px] px-3 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition ml-1"
          aria-label="Emergency help button"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
          <span className="text-base tracking-wide">Help</span>
        </button>
      </div>
    </nav>
  );
};
