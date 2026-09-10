import React, { useState } from 'react';
import { Volume2, Phone, Sparkles, Heart, Play, Square, MessageCircle } from 'lucide-react';
import { FAMILIAR_CONTACTS, ASSETS } from '../../data/mockData';
import { FamiliarContact } from '../../types';
import { speakText, stopSpeech, playFriendlyChime } from '../../utils/audio';

export const FamilyScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'family' | 'care'>('all');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [callingContact, setCallingContact] = useState<string | null>(null);

  const filteredContacts = FAMILIAR_CONTACTS.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  const handleReadAloudHeader = () => {
    speakText(
      'Familiar Faces. These are the people who love you and visit often. Your daughter Sarah is visiting today at 1:00 PM.'
    );
  };

  const handlePlayVoiceNote = (contact: FamiliarContact) => {
    if (playingVoiceId === contact.id) {
      stopSpeech();
      setPlayingVoiceId(null);
      return;
    }

    stopSpeech();
    setPlayingVoiceId(contact.id);
    playFriendlyChime();

    const noteToSpeak =
      contact.voiceMessage || `${contact.name} says: thinking of you today and sending love!`;

    speakText(noteToSpeak, {
      onEnd: () => setPlayingVoiceId(null),
      onError: () => setPlayingVoiceId(null),
    });
  };

  const handleCall = (contact: FamiliarContact) => {
    setCallingContact(contact.id);
    playFriendlyChime();
    speakText(`Calling ${contact.name} now on hands-free speaker.`, {
      onEnd: () => {
        setTimeout(() => setCallingContact(null), 3000);
      },
    });
  };

  const sarah = FAMILIAR_CONTACTS.find((c) => c.id === 'sarah-miller');

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Header orientation banner */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Tuesday Afternoon • Oct 24 • 12:15 PM
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              Familiar Faces
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              People who love you and visit often.
            </p>
          </div>

          <button
            onClick={handleReadAloudHeader}
            className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 shadow-sm transition"
            aria-label="Read section aloud"
            title="Read aloud"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-bold transition shrink-0 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            All (4)
          </button>
          <button
            onClick={() => setActiveFilter('family')}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-bold transition shrink-0 ${
              activeFilter === 'family'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Close Family (3)
          </button>
          <button
            onClick={() => setActiveFilter('care')}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-bold transition shrink-0 ${
              activeFilter === 'care'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Care Team (1)
          </button>
        </div>
      </section>

      {/* 2. Today's Visitor Hero Card: Sarah Miller */}
      {sarah && (activeFilter === 'all' || activeFilter === 'family') && (
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 shadow-xl border border-emerald-500">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 text-xs font-extrabold tracking-wide uppercase">
              Visiting Today at 1:00 PM
            </span>
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300 animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={ASSETS.sarahFamily}
              alt="Sarah Miller"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white/40 shadow-xl shrink-0"
            />

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-black">{sarah.name}</h2>
              <p className="text-emerald-100 font-semibold text-sm mt-0.5">
                {sarah.relation} • {sarah.subtext}
              </p>
              <p className="text-sm text-white/90 mt-2 leading-relaxed bg-black/15 p-3 rounded-xl">
                “{sarah.memoryNote}”
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handlePlayVoiceNote(sarah)}
              className={`min-h-[52px] px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                playingVoiceId === sarah.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-emerald-950 hover:bg-emerald-50'
              }`}
            >
              {playingVoiceId === sarah.id ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Voice Note</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-emerald-900" />
                  <span>Listen to Sarah's Voice Note</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCall(sarah)}
              disabled={callingContact === sarah.id}
              className="min-h-[52px] px-4 rounded-2xl bg-emerald-950/70 hover:bg-emerald-950 text-white font-bold text-sm flex items-center justify-center gap-2 border border-emerald-400/40 shadow-lg transition active:scale-95"
            >
              <Phone
                className={`w-4 h-4 ${callingContact === sarah.id ? 'animate-bounce' : ''}`}
              />
              <span>
                {callingContact === sarah.id ? 'Connecting Call...' : 'Call Sarah (One Tap)'}
              </span>
            </button>
          </div>
        </section>
      )}

      {/* 3. Familiar Family & Care Team List */}
      <section className="space-y-3.5">
        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
          More Loved Ones
        </h2>

        <div className="space-y-3">
          {filteredContacts
            .filter((c) => c.id !== 'sarah-miller')
            .map((contact) => (
              <div
                key={contact.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={contact.photoUrl}
                    alt={contact.name}
                    className="w-18 h-18 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-md shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {contact.relation}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {contact.subtext}
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
                      {contact.memoryNote}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => handlePlayVoiceNote(contact)}
                    className={`flex-1 sm:flex-none min-h-[46px] px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      playingVoiceId === contact.id
                        ? 'bg-rose-500 text-white'
                        : 'bg-emerald-50 dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                    }`}
                    title="Hear Voice Note"
                  >
                    {playingVoiceId === contact.id ? (
                      <Square className="w-4 h-4 fill-white" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    <span>{playingVoiceId === contact.id ? 'Stop' : 'Hear Voice'}</span>
                  </button>

                  <button
                    onClick={() => handleCall(contact)}
                    className="flex-1 sm:flex-none min-h-[46px] px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 4. Reality Grounding Assistant Prompt */}
      <section className="bg-amber-50/80 dark:bg-amber-950/30 rounded-3xl p-4 border border-amber-200 dark:border-amber-900/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-black text-amber-950 dark:text-amber-200 uppercase tracking-wide">
            Need Help Remembering?
          </h4>
          <p className="text-xs text-amber-900 dark:text-amber-300">
            Ask Clara: <span className="font-bold">“Who is visiting today?”</span> or{' '}
            <span className="font-bold">“Tell me about Emma’s painting.”</span>
          </p>
        </div>
      </section>
    </div>
  );
};
