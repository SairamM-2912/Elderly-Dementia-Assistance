import React, { useState } from 'react';
import { Volume2, CheckCircle2, Clock, Check, Bell, ShieldCheck, Droplet, Box, Sparkles } from 'lucide-react';
import { ASSETS } from '../../data/mockData';
import { speakText, playFriendlyChime } from '../../utils/audio';

export const RemindersScreen: React.FC = () => {
  const [isTaken, setIsTaken] = useState(false);
  const [snoozeActive, setSnoozeActive] = useState(false);
  const [stepWater, setStepWater] = useState(false);
  const [stepBox, setStepBox] = useState(false);
  const [stepSwallow, setStepSwallow] = useState(false);

  const handleReadInstructions = () => {
    speakText(
      'It is 11:30 AM. Time for your heart medication, Lisinopril 10 milligrams. Take one round white pill from your Tuesday Morning pill compartment with a full glass of cool water.'
    );
  };

  const handleTakeMedication = () => {
    setIsTaken(true);
    setStepWater(true);
    setStepBox(true);
    setStepSwallow(true);
    playFriendlyChime();

    speakText(
      'Wonderful, Arthur. Your Lisinopril medication has been recorded as taken. Sarah has received the confirmation on her phone.'
    );
  };

  const handleSnooze = () => {
    setSnoozeActive(true);
    playFriendlyChime();
    speakText(
      'Understood Arthur. Clara will gently remind you again in 15 minutes at 11:45 AM.'
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
                11:30 AM Routine
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Tuesday Morning
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Heart Medication
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Lisinopril 10mg • Daily Blood Pressure Care
            </p>
          </div>

          <button
            onClick={handleReadInstructions}
            className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-sm transition"
            aria-label="Read medication instructions aloud"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* 2. Visual Pill Match Card */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-emerald-500 shadow-md overflow-hidden">
        <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
          <img
            src={ASSETS.pillMatch}
            alt="Lisinopril 10mg Round White Pill"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md">
            <ShieldCheck className="w-4 h-4" />
            <span>Visual Verification Match</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Lisinopril 10mg
              </h2>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                1 Round White Pill
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Dispenser Slot:</span>
              <p className="text-sm font-black text-slate-800 dark:text-slate-200">
                Tuesday AM #1
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            Take with a full glass of cool water. This pill keeps your heart beating smooth and your blood pressure calm.
          </p>

          {/* 3-Step Guided Checklist */}
          <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Gentle Steps:
            </p>

            <button
              onClick={() => setStepWater(!stepWater)}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                stepWater
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center shrink-0">
                  <Droplet className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">1. Pour a full glass of water</span>
              </div>
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  stepWater ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                }`}
              >
                {stepWater && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>

            <button
              onClick={() => setStepBox(!stepBox)}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                stepBox
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">2. Open Tuesday AM box</span>
              </div>
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  stepBox ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                }`}
              >
                {stepBox && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>

            <button
              onClick={() => setStepSwallow(!stepSwallow)}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                stepSwallow
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold">3. Swallow pill with water</span>
              </div>
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  stepSwallow ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                }`}
              >
                {stepSwallow && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
            <button
              onClick={handleTakeMedication}
              className={`w-full min-h-[58px] px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition ${
                isTaken
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>
                {isTaken
                  ? '✓ Medication Confirmed (Sarah Notified)'
                  : '✓ I Have Taken My Medication'}
              </span>
            </button>

            {!isTaken && (
              <button
                onClick={handleSnooze}
                className={`w-full min-h-[50px] px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                  snoozeActive
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-600" />
                <span>
                  {snoozeActive
                    ? 'Reminder Set for 11:45 AM'
                    : 'Remind Me Again in 15 Minutes'}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Daily Pill Schedule Overview */}
      <section className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 space-y-3">
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          Today's Pill Schedule
        </h3>

        <div className="space-y-2 text-sm">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">8:00 AM • Morning Vitamins</p>
                <p className="text-xs text-slate-500">Taken with breakfast</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
              Done ✓
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">11:30 AM • Lisinopril 10mg</p>
                <p className="text-xs text-slate-500">Heart blood pressure care</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-1 rounded-full">
              {isTaken ? 'Done ✓' : 'Due Now'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">8:00 PM • Evening Calcium</p>
                <p className="text-xs text-slate-500">Scheduled for tonight</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">
              Upcoming
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
