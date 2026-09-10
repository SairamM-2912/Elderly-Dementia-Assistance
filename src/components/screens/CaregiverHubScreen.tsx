import React, { useState } from 'react';
import { Shield, Battery, CheckCircle2, Phone, Mic, Bell, Radio, MessageSquare, Send, Clock, Heart, Users, ChevronRight } from 'lucide-react';
import { ASSETS, CARE_TIMELINE_EVENTS } from '../../data/mockData';
import { speakText, playFriendlyChime } from '../../utils/audio';

export const CaregiverHubScreen: React.FC = () => {
  const [pingSent, setPingSent] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);
  const [callingDad, setCallingDad] = useState(false);

  const handleSendPing = () => {
    setPingSent(true);
    playFriendlyChime();
    speakText('Notification received from Sarah: Dad, I am on my way soon with lunch!');
    setTimeout(() => setPingSent(false), 5000);
  };

  const handleSendVoiceNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) return;
    setNoteSent(true);
    playFriendlyChime();
    speakText(`Voice note from Sarah delivered to Dad: ${customNote}`);
    setCustomNote('');
    setTimeout(() => setNoteSent(false), 4000);
  };

  const handleCallArthur = () => {
    setCallingDad(true);
    playFriendlyChime();
    speakText('Connecting auto-speaker call to Arthur’s tablet in the living room.', {
      onEnd: () => setTimeout(() => setCallingDad(false), 3000),
    });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Arthur Miller Status Header */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Live Monitoring • Safe at Home
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Battery className="w-3.5 h-3.5" />
            <span>Tablet 94% Docked</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={ASSETS.arthurCaregiver}
            alt="Arthur Miller"
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md shrink-0"
          />

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Arthur Miller (Dad)
            </h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              78 yrs • Oakridge Residence • Morning Routine Active
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-left">
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Meds Today
                </span>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  1 of 2 Taken
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Morning Snack
                </span>
                <p className="text-sm font-black text-emerald-600">
                  Completed ✓
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Current Mood
                </span>
                <p className="text-sm font-black text-slate-900 dark:text-white">
                  Calm & Bright
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Immediate Care Tools */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
          Immediate Care Tools
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCallArthur}
            disabled={callingDad}
            className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-left shadow-md active:scale-95 transition flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Phone className={`w-5 h-5 ${callingDad ? 'animate-bounce' : ''}`} />
            </div>
            <div>
              <p className="text-sm font-black">
                {callingDad ? 'Calling Tablet...' : 'Auto-Speaker Call'}
              </p>
              <p className="text-[11px] text-emerald-100 font-normal">
                Hands-free direct connect
              </p>
            </div>
          </button>

          <button
            onClick={handleSendPing}
            className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-700 hover:bg-black text-white font-bold text-left shadow-md active:scale-95 transition flex flex-col justify-between min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black">Send Quick Reassurance</p>
              <p className="text-[11px] text-slate-300 font-normal">
                Pop-up message on his screen
              </p>
            </div>
          </button>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex flex-col justify-between min-h-[110px]">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Room Sensor
              </p>
              <p className="text-[11px] text-slate-500 font-normal">
                Living room motion: Normal (71°F)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex flex-col justify-between min-h-[110px]">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Fall Sensor Dock
              </p>
              <p className="text-[11px] text-emerald-600 font-normal">
                Active & Calibrated ✓
              </p>
            </div>
          </div>
        </div>

        {pingSent && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold text-xs flex items-center gap-2 border border-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ping sent: “Dad, I'm on my way soon!” displayed on Arthur’s screen.</span>
          </div>
        )}
      </section>

      {/* 3. Clara AI Companion Caregiver Insight */}
      <section className="bg-gradient-to-br from-[#e7f3ef] to-[#d6ece4] dark:from-slate-800 dark:to-slate-800/90 rounded-3xl p-5 border border-emerald-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-emerald-950 dark:text-emerald-300">
              Clara Companion Update for Sarah
            </h3>
            <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400 font-medium">
              Summarized from Arthur's morning speech interactions
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-emerald-100 dark:border-slate-800">
          “Arthur listened to your morning greeting at 10:16 AM. He has asked about lunchtime twice; Clara reassured him you are arriving at 1:00 PM with vegetable soup. His mood has been settled and joyful.”
        </p>

        {/* Send voice/text note to Dad's screen */}
        <form onSubmit={handleSendVoiceNote} className="mt-3 flex gap-2">
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Type a loving note for Dad’s screen..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="min-h-[42px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

        {noteSent && (
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-2">
            ✓ Note delivered to Arthur’s display screen.
          </p>
        )}
      </section>

      {/* 4. Today's Care Timeline */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Today's Care Timeline
          </h2>
          <span className="text-xs font-bold text-slate-500">Live Telemetry</span>
        </div>

        <div className="space-y-2.5">
          {CARE_TIMELINE_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {evt.title}
                  </h4>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${evt.categoryColor}`}
                  >
                    {evt.categoryBadge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {evt.description}
                </p>

                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                  <span>{evt.time}</span>
                  {evt.secondaryInfo && <span>• {evt.secondaryInfo}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
