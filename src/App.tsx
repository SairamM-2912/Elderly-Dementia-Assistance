import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppTab } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { TodayScreen } from './components/screens/TodayScreen';
import { FamilyScreen } from './components/screens/FamilyScreen';
import { RemindersScreen } from './components/screens/RemindersScreen';
import { ExercisesScreen } from './components/screens/ExercisesScreen';
import { EmergencySOSScreen } from './components/screens/EmergencySOSScreen';
import { CaregiverHubScreen } from './components/screens/CaregiverHubScreen';
import { NighttimeScreen } from './components/screens/NighttimeScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('today');
  const [isNightMode, setIsNightMode] = useState(false);

  const handleSelectTab = (tab: AppTab) => {
    setCurrentTab(tab);
    if (tab === 'night') {
      setIsNightMode(true);
    } else if (tab !== 'sos' && tab !== 'caregiver' && isNightMode) {
      setIsNightMode(false);
    }
  };

  const handleToggleNightMode = () => {
    if (isNightMode) {
      setIsNightMode(false);
      setCurrentTab('today');
    } else {
      setIsNightMode(true);
      setCurrentTab('night');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isNightMode ? 'bg-[#060b13] text-slate-100' : 'bg-[#f7f9fb] text-[#191c1e]'
      } flex flex-col items-center`}
    >
      {/* Persistent App Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isNightMode={isNightMode}
        onToggleNightMode={handleToggleNightMode}
      />

      {/* Quick Screen Switcher Bar for Effortless Screen Navigation */}
      <div className="w-full max-w-md px-4 pt-20 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            onClick={() => handleSelectTab('today')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'today'
                ? 'bg-emerald-700 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            ☀️ Today
          </button>

          <button
            onClick={() => handleSelectTab('family')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'family'
                ? 'bg-emerald-700 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            👥 Family
          </button>

          <button
            onClick={() => handleSelectTab('reminders')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'reminders'
                ? 'bg-emerald-700 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            💊 Reminders
          </button>

          <button
            onClick={() => handleSelectTab('exercises')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'exercises'
                ? 'bg-emerald-700 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            🌸 Exercises
          </button>

          <button
            onClick={() => handleSelectTab('caregiver')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'caregiver'
                ? 'bg-emerald-700 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            🛡️ Caregiver Hub
          </button>

          <button
            onClick={() => handleSelectTab('night')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'night'
                ? 'bg-indigo-600 text-white shadow-sm'
                : isNightMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            🌙 Night Mode
          </button>

          <button
            onClick={() => handleSelectTab('sos')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              currentTab === 'sos'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200'
            }`}
          >
            🆘 Emergency SOS
          </button>
        </div>
      </div>

      {/* Main Responsive Screen Canvas */}
      <main className="w-full max-w-md px-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full"
          >
            {currentTab === 'today' && (
              <TodayScreen onSelectTab={handleSelectTab} isNightMode={isNightMode} />
            )}

            {currentTab === 'family' && <FamilyScreen />}

            {currentTab === 'reminders' && <RemindersScreen />}

            {currentTab === 'exercises' && <ExercisesScreen />}

            {currentTab === 'caregiver' && <CaregiverHubScreen />}

            {currentTab === 'night' && <NighttimeScreen />}

            {currentTab === 'sos' && (
              <EmergencySOSScreen onCancelSOS={() => handleSelectTab('today')} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Accessible Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isNightMode={isNightMode}
      />
    </div>
  );
}
