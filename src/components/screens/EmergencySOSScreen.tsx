import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Phone, PhoneCall, Volume2, CheckCircle2, Lock, Heart, MapPin, Radio, AlertCircle } from 'lucide-react';
import { ASSETS } from '../../data/mockData';
import { speakText, stopSpeech, playFriendlyChime } from '../../utils/audio';

interface EmergencySOSScreenProps {
  onCancelSOS: () => void;
}

export const EmergencySOSScreen: React.FC<EmergencySOSScreenProps> = ({ onCancelSOS }) => {
  const [countdown, setCountdown] = useState(15);
  const [isCancelled, setIsCancelled] = useState(false);
  const [callingSarah, setCallingSarah] = useState(false);
  const [callingEMS, setCallingEMS] = useState(false);
  const [cancelProgress, setCancelProgress] = useState(0);

  const holdTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Play calm reality grounding voice reassurance upon entering SOS
  useEffect(() => {
    speakText(
      'Arthur, I am right here with you. Please sit comfortably and breathe slowly. Help is on the way. Your daughter Sarah is 10 minutes away.'
    );

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      stopSpeech();
    };
  }, []);

  // Press and hold for 2s to cancel
  const handleHoldStart = () => {
    setCancelProgress(0);
    const startTime = Date.now();
    const duration = 2000;

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setCancelProgress(progress);

      if (progress >= 100) {
        clearInterval(progressIntervalRef.current!);
        handleConfirmCancel();
      }
    }, 50);
  };

  const handleHoldEnd = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setCancelProgress(0);
  };

  const handleConfirmCancel = () => {
    setIsCancelled(true);
    playFriendlyChime();
    speakText('Emergency call cancelled. Sarah has been notified that you are safe and sound, Arthur.');
    setTimeout(() => {
      onCancelSOS();
    }, 2500);
  };

  const handleCallSarahDirect = () => {
    setCallingSarah(true);
    playFriendlyChime();
    speakText('Connecting to Sarah on speakerphone now.');
    setTimeout(() => setCallingSarah(false), 4000);
  };

  const handleCall911 = () => {
    setCallingEMS(true);
    playFriendlyChime();
    speakText('Dialing local emergency medical services dispatch.');
    setTimeout(() => setCallingEMS(false), 4000);
  };

  if (isCancelled) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Assistance Request Cancelled
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
          We notified Sarah that you are OK and safe at home. Returning to your morning schedule...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Clara Voice Companion Active Banner */}
      <section className="bg-rose-950 text-rose-100 rounded-3xl p-4 border border-rose-800 flex items-center gap-3 shadow-lg">
        <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 animate-pulse">
          <Volume2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-300">
            Clara Voice Companion Active
          </span>
          <p className="text-sm font-bold text-white">
            “Arthur, I’m right here with you. Sarah is 10 min away.”
          </p>
        </div>
      </section>

      {/* 2. Assistance Activated Main Card */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-rose-500 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-600 animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black text-rose-600 uppercase tracking-tight">
              Assistance Activated
            </h1>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Code: <strong className="text-slate-900 dark:text-white">MEM-4829</strong>
          </span>
        </div>

        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Living Room • Armchair Dock, 742 Evergreen Terrace</span>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-rose-50 dark:bg-rose-950/40 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900">
          Arthur, help is on the way. Please sit comfortably and breathe slowly. Your daughter Sarah and local first responders have received your exact location.
        </p>

        {/* Dispatch Window & Countdown */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">
              Dispatch Window
            </span>
            <span className="font-black text-amber-400">
              Auto-speaker in {countdown}s
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${(countdown / 15) * 100}%` }}
            />
          </div>

          {/* Hold to Cancel 2s tactile button */}
          <div className="pt-1">
            <button
              onMouseDown={handleHoldStart}
              onMouseUp={handleHoldEnd}
              onTouchStart={handleHoldStart}
              onTouchEnd={handleHoldEnd}
              className="relative w-full min-h-[56px] rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm flex items-center justify-center overflow-hidden border border-slate-700 active:scale-98 select-none"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-emerald-600 transition-all"
                style={{ width: `${cancelProgress}%` }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>I Am OK • Hold to Cancel (2s)</span>
              </span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-1.5">
              Press and hold for 2 seconds if pressed by accident
            </p>
          </div>
        </div>
      </section>

      {/* 3. Primary Contacts */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
          Primary Response Contacts
        </h2>

        {/* Sarah Direct Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={ASSETS.sarahSOS}
              alt="Sarah Miller"
              className="w-18 h-18 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Primary Contact • Daughter
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Sarah Miller
              </h3>
              <p className="text-xs text-slate-500">
                Auto-speaker connects in {countdown}s • 5 min away
              </p>
            </div>
          </div>

          <button
            onClick={handleCallSarahDirect}
            className="w-full sm:w-auto min-h-[50px] px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
          >
            <Phone className={`w-4 h-4 ${callingSarah ? 'animate-bounce' : ''}`} />
            <span>{callingSarah ? 'Connecting...' : 'Call Sarah Immediately'}</span>
          </button>
        </div>

        {/* 911 EMS Medical Dispatch */}
        <div className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl p-5 border border-rose-300 dark:border-rose-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-rose-950 dark:text-rose-200">
                Medical Dispatch 911
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                Paramedics & Local EMS • Direct Emergency Line
              </p>
            </div>
          </div>

          <button
            onClick={handleCall911}
            className="w-full sm:w-auto min-h-[50px] px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
          >
            <PhoneCall className="w-5 h-5" />
            <span>{callingEMS ? 'Dialing 911...' : 'Call 911 Dispatch'}</span>
          </button>
        </div>
      </section>

      {/* 4. What To Do Right Now Grounding Steps */}
      <section className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 space-y-3">
        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
          What To Do Right Now, Arthur
        </h3>

        <div className="space-y-2.5 text-sm">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Stay seated comfortably in your armchair. Please do not stand up quickly.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              The front door smart bolt has unlocked automatically for Sarah and first responders.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Keep this screen in front of you. Sarah’s voice will come through the speaker.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
