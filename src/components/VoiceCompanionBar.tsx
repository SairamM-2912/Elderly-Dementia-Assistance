import React, { useState } from 'react';
import { Mic, Volume2, X, Sparkles, MessageSquare } from 'lucide-react';
import { speakText, stopSpeech, playFriendlyChime } from '../utils/audio';

interface VoiceCompanionBarProps {
  isNightMode?: boolean;
}

export const VoiceCompanionBar: React.FC<VoiceCompanionBarProps> = ({ isNightMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [claraSpeaking, setClaraSpeaking] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const sampleQueries = [
    {
      query: 'What is happening next?',
      answer: 'At 10:30 AM, your warm chamomile tea and blueberry muffin are ready in the kitchen. Then at 11:30 AM, you will take your white heart pill.',
    },
    {
      query: 'Who is visiting today?',
      answer: 'Your daughter Sarah is visiting you today at 1:00 PM. She is bringing homemade vegetable soup to share for lunch.',
    },
    {
      query: 'Where are my reading glasses?',
      answer: 'Your reading glasses are resting on the small wooden side table next to your favorite brown armchair.',
    },
    {
      query: 'What day is it today?',
      answer: 'Today is Tuesday, October 24th. It is a pleasant, sunny morning, about 68 degrees outside.',
    },
  ];

  const handleAsk = (query: string, answer: string) => {
    setIsListening(false);
    setResponseMessage(answer);
    setClaraSpeaking(true);
    playFriendlyChime();

    speakText(answer, {
      onStart: () => setClaraSpeaking(true),
      onEnd: () => setClaraSpeaking(false),
      onError: () => setClaraSpeaking(false),
    });
  };

  const handleMicTap = () => {
    stopSpeech();
    setClaraSpeaking(false);
    setIsListening(true);
    setResponseMessage(null);
    playFriendlyChime();

    // Simulate gentle speech recognition listening for 2.5 seconds
    setTimeout(() => {
      setIsListening(false);
      handleAsk(
        'What is happening next?',
        'Good morning Arthur! It is 10:15 AM on Tuesday. You have morning snack and tea ready in the kitchen, and your daughter Sarah will visit at 1:00 PM for lunch.'
      );
    }, 2400);
  };

  const handleClose = () => {
    stopSpeech();
    setClaraSpeaking(false);
    setIsListening(false);
    setResponseMessage(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Clara Voice Companion Bar on Screen */}
      <div
        className={`w-full rounded-2xl p-4 transition-all shadow-sm ${
          isNightMode
            ? 'bg-slate-900 border border-slate-800 text-slate-100'
            : 'bg-[#e7f3ef] border border-emerald-200/80 text-[#191c1e]'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-emerald-950 dark:text-emerald-300">
                  Talk to Clara
                </span>
                <span className="text-xs bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold px-2 py-0.5 rounded-full">
                  Voice Companion
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Tap anytime to ask: “What is next?” or “Who is visiting?”
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              handleMicTap();
            }}
            className="min-h-[48px] px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 shrink-0"
            aria-label="Tap to speak with Clara"
          >
            <Mic className="w-4 h-4" />
            <span>Tap to Speak</span>
          </button>
        </div>
      </div>

      {/* Clara Interactive Modal Sheet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clara-dialog-title"
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="clara-dialog-title" className="text-xl font-black text-slate-900 dark:text-white">
                    Clara Voice Assistant
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Always here to remind, reassure, and guide you
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Listening Visual State */}
            <div className="my-6 text-center">
              {isListening ? (
                <div className="py-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-75" />
                    <Mic className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-4">
                    Listening to you, Arthur...
                  </p>
                  <p className="text-sm text-slate-500">Speak naturally at your own pace</p>
                </div>
              ) : claraSpeaking ? (
                <div className="py-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                    <Volume2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mt-4">
                    Clara is speaking...
                  </p>
                  <button
                    onClick={() => {
                      stopSpeech();
                      setClaraSpeaking(false);
                    }}
                    className="mt-2 text-xs font-bold text-rose-600 underline"
                  >
                    Tap here to stop voice
                  </button>
                </div>
              ) : (
                <div className="py-2">
                  <button
                    onClick={handleMicTap}
                    className="w-20 h-20 mx-auto rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl active:scale-95 transition"
                    aria-label="Press to talk"
                  >
                    <Mic className="w-10 h-10" />
                  </button>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100 mt-3">
                    Tap the microphone to speak
                  </p>
                </div>
              )}

              {/* Clara Response Box */}
              {responseMessage && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left">
                  <div className="flex items-center gap-2 mb-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <MessageSquare className="w-4 h-4" />
                    <span>Clara says:</span>
                  </div>
                  <p className="text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                    “{responseMessage}”
                  </p>
                </div>
              )}
            </div>

            {/* Quick Sample Questions */}
            <div className="space-y-2 mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Or tap a question:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(item.query, item.answer)}
                    className="w-full text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-200 transition flex items-center justify-between"
                  >
                    <span>“{item.query}”</span>
                    <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
