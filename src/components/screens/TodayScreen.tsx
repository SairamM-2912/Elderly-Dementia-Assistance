import React, { useState } from 'react';
import { Volume2, Sun, CheckCircle2, Clock, MapPin, Pill, Utensils, Trees, Coffee, Phone, ArrowRight } from 'lucide-react';
import { ASSETS, INITIAL_SCHEDULE } from '../../data/mockData';
import { AppTab, ScheduleItem } from '../../types';
import { VoiceCompanionBar } from '../VoiceCompanionBar';
import { speakText, playFriendlyChime } from '../../utils/audio';

interface TodayScreenProps {
  onSelectTab: (tab: AppTab) => void;
  isNightMode: boolean;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ onSelectTab, isNightMode }) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [isCallingSarah, setIsCallingSarah] = useState(false);
  const [isPlayingGreeting, setIsPlayingGreeting] = useState(false);

  const immediateTask = schedule.find((item) => item.isImmediate) || schedule[0];
  const upcomingTasks = schedule.filter((item) => item.id !== immediateTask.id);

  const handleReadOrientation = () => {
    setIsPlayingGreeting(true);
    speakText(
      'Good Morning, Arthur. It is 10:15 AM on Tuesday, October 24th, 2023. Outside it is sunny and 68 degrees. Your next activity is Morning Snack and Tea at 10:30 in the kitchen.',
      {
        onEnd: () => setIsPlayingGreeting(false),
        onError: () => setIsPlayingGreeting(false),
      }
    );
  };

  const handleToggleTask = (taskId: string) => {
    playFriendlyChime();
    setSchedule((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === 'completed' ? 'pending' : 'completed';
          return {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'completed' ? '10:31 AM' : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleCallSarah = () => {
    setIsCallingSarah(true);
    playFriendlyChime();
    speakText('Calling your daughter Sarah now on speakerphone.', {
      onEnd: () => {
        setTimeout(() => {
          setIsCallingSarah(false);
        }, 3000);
      },
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Header Greeting & Orientation Banner */}
      <section className="bg-[#f0f4f7] dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Reality Grounding
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Good Morning, Arthur
            </h1>
          </div>

          <button
            onClick={handleReadOrientation}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md shrink-0 ${
              isPlayingGreeting
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-100'
            }`}
            title="Read orientation aloud"
            aria-label="Read time, date, and weather aloud"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Big tactile time & weather cards */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-3.5 border border-slate-200/60 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Current Time</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              10:15 <span className="text-sm font-bold text-slate-500">AM</span>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 truncate">
              Tuesday, Oct 24
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-3.5 border border-slate-200/60 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Today's Weather</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              68° <span className="text-sm font-bold text-amber-600">Sunny</span>
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 truncate">
              Oakridge, Safe at Home
            </p>
          </div>
        </div>
      </section>

      {/* 2. Clara Voice Companion Bar */}
      <VoiceCompanionBar isNightMode={isNightMode} />

      {/* 3. Immediate Task (NOW) */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500 text-white tracking-wider animate-pulse">
              NOW
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Immediate Task
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            {immediateTask.location}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-amber-300 dark:border-amber-500/40 shadow-md overflow-hidden transition-all">
          {immediateTask.image && (
            <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img
                src={immediateTask.image}
                alt={immediateTask.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{immediateTask.time}</span>
              </div>
            </div>
          )}

          <div className="p-5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {immediateTask.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {immediateTask.description}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleToggleTask(immediateTask.id)}
                className={`w-full min-h-[56px] px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition ${
                  immediateTask.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>
                  {immediateTask.status === 'completed'
                    ? '✓ Snack Enjoyed (Completed)'
                    : 'I Had My Snack'}
                </span>
              </button>

              <button
                onClick={() =>
                  speakText(
                    'At 10:30 AM, you have your morning tea and blueberry muffin ready in the kitchen.'
                  )
                }
                className="min-h-[48px] px-4 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 shrink-0"
                aria-label="Listen to task instructions"
              >
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <span className="hidden sm:inline">Listen</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Coming Up Next Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            Coming Up Next
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {upcomingTasks.length} scheduled items
          </span>
        </div>

        <div className="space-y-2.5">
          {upcomingTasks.map((task) => {
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                } flex items-center justify-between gap-3`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : task.id === 'task-medication'
                        ? 'bg-rose-100 text-rose-700'
                        : task.id === 'task-lunch'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.id === 'task-medication' ? (
                      <Pill className="w-5 h-5" />
                    ) : task.id === 'task-lunch' ? (
                      <Utensils className="w-5 h-5" />
                    ) : task.id === 'task-walk' ? (
                      <Trees className="w-5 h-5" />
                    ) : (
                      <Coffee className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                        {task.time}
                      </span>
                      {task.tag && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            task.tag === 'Done'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {task.tag}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-base font-bold truncate ${
                        isCompleted
                          ? 'line-through text-slate-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Quick Action or View button */}
                <div className="shrink-0 flex items-center gap-1.5">
                  {task.id === 'task-medication' ? (
                    <button
                      onClick={() => onSelectTab('reminders')}
                      className="min-h-[44px] px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-emerald-600'
                      }`}
                      aria-label="Toggle task status"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Caregiver Quick Card (Sarah Miller) */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl p-5 border border-emerald-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={ASSETS.sarahHero}
            alt="Sarah Miller"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md shrink-0"
          />

          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              Primary Caregiver
            </span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white truncate">
              Sarah Miller
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Daughter • 5 min away • Visiting at 1:00 PM
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-slate-700 flex items-center gap-3">
          <button
            onClick={handleCallSarah}
            disabled={isCallingSarah}
            className="flex-1 min-h-[50px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
          >
            <Phone className={`w-4 h-4 ${isCallingSarah ? 'animate-bounce' : ''}`} />
            <span>{isCallingSarah ? 'Connecting to Sarah...' : 'Call Sarah (One Tap)'}</span>
          </button>

          <button
            onClick={() => onSelectTab('family')}
            className="min-h-[50px] px-4 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-600 flex items-center gap-1.5 shrink-0"
          >
            <span>Family</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
