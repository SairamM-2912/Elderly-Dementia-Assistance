import React, { useState } from 'react';
import { Sparkles, Heart, Mic, Music, Volume2, CheckCircle2, RefreshCw, Smile, ArrowRight } from 'lucide-react';
import { ASSETS } from '../../data/mockData';
import { speakText, playFriendlyChime } from '../../utils/audio';

export const ExercisesScreen: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [flowerFeedback, setFlowerFeedback] = useState<string | null>(null);
  const [playingTune, setPlayingTune] = useState(false);
  const [matchingGameOpen, setMatchingGameOpen] = useState(false);

  // 4-card gentle picture match mini game
  const [cards, setCards] = useState([
    { id: 1, symbol: '🌸', matched: false, flipped: false },
    { id: 2, symbol: '☕', matched: false, flipped: false },
    { id: 3, symbol: '🌸', matched: false, flipped: false },
    { id: 4, symbol: '☕', matched: false, flipped: false },
  ]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleSelectFlower = (name: string, feedback: string) => {
    setSelectedFlower(name);
    setFlowerFeedback(feedback);
    playFriendlyChime();

    speakText(feedback);
  };

  const handlePlayTune = () => {
    setPlayingTune(true);
    playFriendlyChime();
    speakText(
      'Playing a gentle hum of your favorite classic melody: You Are My Sunshine.',
      {
        onEnd: () => {
          setTimeout(() => setPlayingTune(false), 2000);
        },
      }
    );
  };

  const handleCardClick = (index: number) => {
    if (cards[index].flipped || cards[index].matched || selectedCards.length >= 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (newCards[first].symbol === newCards[second].symbol) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        playFriendlyChime();
        setSelectedCards([]);
        speakText('Wonderful match, Arthur!');
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
          setSelectedCards([]);
        }, 1200);
      }
    }
  };

  const resetCards = () => {
    setCards([
      { id: 1, symbol: '🌸', matched: false, flipped: false },
      { id: 2, symbol: '☕', matched: false, flipped: false },
      { id: 3, symbol: '🌸', matched: false, flipped: false },
      { id: 4, symbol: '☕', matched: false, flipped: false },
    ]);
    setSelectedCards([]);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#eef6f3] to-[#e4f1ec] dark:from-slate-800 dark:to-slate-800 rounded-3xl p-5 border border-emerald-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Wednesday Afternoon • Comfort Mode
          </span>
          <span className="text-xs font-bold text-slate-500">
            1 of 2 Moments Enjoyed
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Afternoon Brain Wellness, Arthur
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          No rush, no timer, no wrong answers. Just fun, gentle remembering at your own peaceful pace.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-emerald-200/60 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-4">
          <div className="bg-emerald-600 h-full rounded-full w-1/2 transition-all duration-500" />
        </div>
      </section>

      {/* 2. Featured Story: The Summer Rose Garden */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
        <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900">
          <img
            src={ASSETS.roseGarden}
            alt="Summer Rose Garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Memory Spotlight</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <span>Photo Association</span>
            <span>•</span>
            <span>Warm Word Recall</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            The Summer Rose Garden
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-200 mt-2 leading-relaxed font-medium">
            “Sarah brought hydrangeas yesterday. What color flowers do you love best in the summer garden?”
          </p>

          {/* Accessible Flower Options */}
          <div className="grid grid-cols-1 gap-2.5 mt-4">
            <button
              onClick={() =>
                handleSelectFlower(
                  'Soft Pink Roses',
                  'Soft pink roses have always been your favorite, Arthur. You planted them by the back porch in 1984.'
                )
              }
              className={`p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between ${
                selectedFlower === 'Soft Pink Roses'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🌹</span>
                <span>Soft Pink Roses</span>
              </div>
              {selectedFlower === 'Soft Pink Roses' && (
                <CheckCircle2 className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>

            <button
              onClick={() =>
                handleSelectFlower(
                  'Purple Hydrangeas',
                  'Purple hydrangeas are beautiful! Your granddaughter Emma loves painting their petals in watercolor.'
                )
              }
              className={`p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between ${
                selectedFlower === 'Purple Hydrangeas'
                  ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-400 text-purple-900 dark:text-purple-200 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🪻</span>
                <span>Purple Hydrangeas</span>
              </div>
              {selectedFlower === 'Purple Hydrangeas' && (
                <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
              )}
            </button>

            <button
              onClick={() =>
                handleSelectFlower(
                  'Golden Sunflowers',
                  'Golden sunflowers bring sunshine to any day! They always stood tall near your backyard garden fence.'
                )
              }
              className={`p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between ${
                selectedFlower === 'Golden Sunflowers'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🌻</span>
                <span>Golden Sunflowers</span>
              </div>
              {selectedFlower === 'Golden Sunflowers' && (
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              )}
            </button>
          </div>

          {/* Feedback & Memory Note */}
          {flowerFeedback && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium animate-in fade-in">
              “{flowerFeedback}”
            </div>
          )}

          {/* Tap & Speak with Clara button */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                playFriendlyChime();
                speakText(
                  'Clara is listening. Tell me about what you remember in the garden, Arthur.'
                );
              }}
              className="w-full sm:w-auto flex-1 min-h-[52px] px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition"
            >
              <Mic className="w-5 h-5" />
              <span>Tap & Speak with Clara</span>
            </button>

            <span className="text-xs text-slate-500 text-center sm:text-right">
              Every memory shared brings joy to your family
            </span>
          </div>
        </div>
      </section>

      {/* 3. More Relaxed Activities */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
          More Relaxed Activities
        </h2>

        <div className="space-y-2.5">
          {/* Familiar Tunes & Songs */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  Familiar Tunes & Songs
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Auditory Recall • “You Are My Sunshine”
                </p>
              </div>
            </div>

            <button
              onClick={handlePlayTune}
              className={`min-h-[44px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition ${
                playingTune
                  ? 'bg-indigo-600 text-white animate-pulse'
                  : 'bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{playingTune ? 'Playing Melody...' : 'Hum Along'}</span>
            </button>
          </div>

          {/* Picture Pair Matching */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    Picture Pair Matching
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gentle 4-card memory match
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMatchingGameOpen(!matchingGameOpen)}
                className="min-h-[44px] px-4 rounded-xl bg-amber-50 dark:bg-slate-700 hover:bg-amber-100 text-amber-800 dark:text-amber-300 font-bold text-xs shrink-0 transition"
              >
                {matchingGameOpen ? 'Close' : 'Play'}
              </button>
            </div>

            {/* Interactive Matching Cards */}
            {matchingGameOpen && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
                  <span>Tap two cards to find matching pairs:</span>
                  <button
                    onClick={resetCards}
                    className="flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {cards.map((card, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      className={`h-20 rounded-2xl text-2xl flex items-center justify-center font-bold border transition-all active:scale-95 ${
                        card.flipped || card.matched
                          ? 'bg-white dark:bg-slate-700 border-emerald-500 shadow-md'
                          : 'bg-emerald-100/60 dark:bg-slate-900 border-emerald-300 dark:border-slate-700 text-transparent'
                      }`}
                    >
                      {card.flipped || card.matched ? card.symbol : '❓'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Word & Proverbs Recall */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  Word & Proverbs Recall
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  “A stitch in time saves...”
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playFriendlyChime();
                speakText('A stitch in time saves nine! You always remembered that one.');
              }}
              className="min-h-[44px] px-4 rounded-xl bg-teal-50 dark:bg-slate-700 hover:bg-teal-100 text-teal-800 dark:text-teal-300 font-bold text-xs shrink-0 transition"
            >
              Reveal
            </button>
          </div>
        </div>
      </section>

      {/* 4. Streak Card (3 Days in a Row) */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-5 shadow-lg flex items-center gap-4">
        <img
          src={ASSETS.sarahStreak}
          alt="Sarah Miller"
          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/50 shadow-md shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-amber-100 text-xs font-black uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>3 Days in a Row!</span>
          </div>
          <h3 className="text-xl font-black mt-0.5">12 Wonderful Memories</h3>
          <p className="text-xs text-amber-100 mt-0.5 leading-relaxed">
            Sarah and David love reading your answers. Keep up the peaceful rhythm!
          </p>
        </div>
      </section>
    </div>
  );
};
