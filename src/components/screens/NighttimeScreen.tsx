import React, { useState, useEffect } from 'react';
import { Moon, Volume2, Lock, Lightbulb, Play, Square, Check, Sparkles, Phone, Compass, ShieldCheck } from 'lucide-react';
import { BEDTIME_CHECKLIST } from '../../data/mockData';
import { BedtimeCheckItem } from '../../types';
import {
  speakText,
  stopSpeech,
  playFriendlyChime,
  startSleepSoundscape,
  stopSleepSoundscape,
  isSoundscapeActive,
} from '../../utils/audio';

export const NighttimeScreen: React.FC = () => {
  const [checklist, setChecklist] = useState<BedtimeCheckItem[]>(BEDTIME_CHECKLIST);
  const [isPlayingRain, setIsPlayingRain] = useState(false);
  const [isPlayingGoodnight, setIsPlayingGoodnight] = useState(false);
  const [amberLightOn, setAmberLightOn] = useState(true);
  const [callingSarah, setCallingSarah] = useState(false);

  useEffect(() => {
    return () => {
      stopSleepSoundscape();
      stopSpeech();
    };
  }, []);

  const handleReadOrientation = () => {
    speakText(
      'It is 8:45 PM on Tuesday evening, Arthur. It is nighttime. Your house is locked, cozy, and safe. There is nothing you need to do tonight. Sleep peacefully.'
    );
  };

  const handlePlayGoodnight = () => {
    if (isPlayingGoodnight) {
      stopSpeech();
      setIsPlayingGoodnight(false);
      return;
    }

    setIsPlayingGoodnight(true);
    playFriendlyChime();
    speakText(
      'Hi Dad! It’s Sarah. Just wanted to let you know everything is safe and locked up for the night. Have sweet dreams, and I will see you tomorrow morning at 9:00 AM. I love you!',
      {
        onEnd: () => setIsPlayingGoodnight(false),
        onError: () => setIsPlayingGoodnight(false),
      }
    );
  };

  const handleToggleRain = () => {
    if (isPlayingRain || isSoundscapeActive()) {
      stopSleepSoundscape();
      setIsPlayingRain(false);
    } else {
      const started = startSleepSoundscape();
      if (started) {
        setIsPlayingRain(true);
      }
    }
  };

  const handleToggleCheck = (id: string) => {
    playFriendlyChime();
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isConfirmed: !item.isConfirmed };
        }
        return item;
      })
    );
  };

  const handleCallSarah = () => {
    setCallingSarah(true);
    playFriendlyChime();
    speakText('Calling your daughter Sarah on bedside speaker.');
    setTimeout(() => setCallingSarah(false), 4000);
  };

  return (
    <div className="space-y-6 pb-24 text-slate-100">
      {/* 1. Header Grounding Card */}
      <section className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">
                8:45 PM • Tuesday Evening
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              It is nighttime, Arthur.
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed font-medium">
              Your house is locked, cozy, and safe. There is nothing you need to do tonight. Sleep peacefully.
            </p>
          </div>

          <button
            onClick={handleReadOrientation}
            className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center shrink-0 shadow-md transition"
            aria-label="Read nighttime reassurance aloud"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* 2. Spatial Grounding Anchor (742 Evergreen Terrace) */}
      <section className="bg-indigo-950/40 rounded-3xl p-5 border border-indigo-900/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-900 text-indigo-300 flex items-center justify-center shrink-0">
          <Compass className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
            Your Home
          </span>
          <h3 className="text-base font-black text-white truncate">
            742 Evergreen Terrace, Oakridge
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            You are in your favorite armchair. Sarah is resting at home and will visit tomorrow at 9:00 AM.
          </p>
        </div>
      </section>

      {/* 3. Pre-recorded Goodnight Message from Sarah */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-5 border border-emerald-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Daughter's Evening Note
            </span>
            <h3 className="text-base font-black text-white">
              “Goodnight Dad, you are safe.”
            </h3>
            <p className="text-xs text-slate-300">
              Recorded by Sarah today at 7:15 PM
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayGoodnight}
          className={`w-full sm:w-auto min-h-[48px] px-5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95 ${
            isPlayingGoodnight
              ? 'bg-rose-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isPlayingGoodnight ? (
            <>
              <Square className="w-4 h-4 fill-white" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Listen to Sarah's Voice</span>
            </>
          )}
        </button>
      </section>

      {/* 4. Evening Peace-of-Mind Checklist */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Evening Peace-of-Mind
          </h2>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>All 4 Secured</span>
          </span>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => handleToggleCheck(item.id)}
              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                item.isConfirmed
                  ? 'bg-slate-900 border-slate-700 text-slate-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.label}</h4>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>

              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                  item.isConfirmed
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'border-2 border-slate-700'
                }`}
              >
                {item.isConfirmed && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Calming Sleep Soundscapes (Gentle Rain & Soft Piano) */}
      <section className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-md space-y-3">
        <h3 className="text-base font-black text-white uppercase tracking-wider">
          Calming Sleep Soundscapes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleToggleRain}
            className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
              isPlayingRain
                ? 'bg-emerald-950/60 border-emerald-500 text-white'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div>
              <p className="text-sm font-black text-white">Gentle Rain & Fireplace</p>
              <p className="text-xs text-slate-400 mt-0.5">Warm pink noise soundscape</p>
            </div>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isPlayingRain ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {isPlayingRain ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-current" />}
            </div>
          </button>

          <button
            onClick={() => {
              playFriendlyChime();
              speakText('Playing peaceful bedtime melody.');
            }}
            className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between transition"
          >
            <div>
              <p className="text-sm font-black text-white">Soft Piano & Strings</p>
              <p className="text-xs text-slate-400 mt-0.5">Gentle acoustic lullaby</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-700 text-slate-300 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </div>
          </button>
        </div>
      </section>

      {/* 6. Quick Bedside Controls */}
      <section className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setAmberLightOn(!amberLightOn);
            playFriendlyChime();
          }}
          className={`p-4 rounded-2xl border font-bold text-xs flex flex-col justify-between min-h-[90px] transition ${
            amberLightOn
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>{amberLightOn ? 'Amber Nightlight: ON' : 'Amber Nightlight: OFF'}</span>
        </button>

        <button
          onClick={handleCallSarah}
          disabled={callingSarah}
          className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs flex flex-col justify-between min-h-[90px] transition active:scale-95"
        >
          <Phone className={`w-5 h-5 text-emerald-400 ${callingSarah ? 'animate-bounce' : ''}`} />
          <span>{callingSarah ? 'Calling Sarah...' : 'Bedside Call to Sarah'}</span>
        </button>
      </section>
    </div>
  );
};
