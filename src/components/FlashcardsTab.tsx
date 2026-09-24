import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  Check, 
  HelpCircle, 
  Shuffle, 
  Layers, 
  Crown,
  Eye,
  EyeOff,
  Flame
} from 'lucide-react';
import { Flashcard, SubscriptionStatus } from '../types';

interface FlashcardsTabProps {
  flashcards: Flashcard[];
  subscription: SubscriptionStatus;
  onOpenSubscription: () => void;
}

export const FlashcardsTab: React.FC<FlashcardsTabProps> = ({
  flashcards: initialCards,
  subscription,
  onOpenSubscription,
}) => {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'mastered'>('all');

  useEffect(() => {
    setCards(initialCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  }, [initialCards]);

  // Freemium limitation: Free users get first 5 cards
  const freeCardLimit = 5;
  const isCapped = !subscription.isPro && cards.length > freeCardLimit;
  const displayedCards = isCapped ? cards.slice(0, freeCardLimit) : cards;

  const filteredCards = displayedCards.filter((c) => {
    if (filterMode === 'unlearned') return c.rating !== 'easy';
    if (filterMode === 'mastered') return c.rating === 'easy';
    return true;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1') {
        handleRate('hard');
      } else if (e.key === '2') {
        handleRate('good');
      } else if (e.key === '3') {
        handleRate('easy');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards.length]);

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRate = (rating: 'hard' | 'good' | 'easy') => {
    if (!activeCard) return;
    setCards((prev) =>
      prev.map((c) => (c.id === activeCard.id ? { ...c, rating } : c))
    );
    handleNext();
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const masteredCount = displayedCards.filter((c) => c.rating === 'easy').length;
  const learningCount = displayedCards.filter((c) => c.rating === 'good' || c.rating === 'hard').length;
  const masteryPercentage = displayedCards.length ? Math.round((masteredCount / displayedCards.length) * 100) : 0;

  if (!activeCard) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
        <Layers className="w-8 h-8 mx-auto text-slate-500 mb-2" />
        <p>No cards match the active filter.</p>
        <button
          onClick={() => setFilterMode('all')}
          className="mt-3 px-3 py-1.5 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700"
        >
          View All Cards
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
        {/* Progress Bar & Stats */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-300">Spaced Repetition Mastery</span>
            <span className="text-emerald-400 font-mono font-semibold">{masteryPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${masteryPercentage}%` }}
            />
            <div
              className="bg-amber-500 transition-all duration-300"
              style={{ width: `${(learningCount / (displayedCards.length || 1)) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5">
            <span>{masteredCount} Mastered</span>
            <span aria-hidden="true">·</span>
            <span>{learningCount} In Progress</span>
            <span aria-hidden="true">·</span>
            <span>{displayedCards.length - masteredCount - learningCount} Unseen</span>
          </div>
        </div>

        {/* Filter & Shuffle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition"
            title="Shuffle Deck"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => {
                setFilterMode('all');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                filterMode === 'all' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({displayedCards.length})
            </button>
            <button
              onClick={() => {
                setFilterMode('unlearned');
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md transition ${
                filterMode === 'unlearned' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Needs Review
            </button>
          </div>
        </div>
      </div>

      {/* Pro Lock Notice for remaining cards */}
      {isCapped && (
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-300">
                Free Preview: Showing 5 of {cards.length} Flashcards
              </div>
              <p className="text-[11px] text-slate-400">
                Upgrade to Pro to unlock the remaining {cards.length - 5} active-recall cards and Anki export.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSubscription}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg shadow transition whitespace-nowrap"
          >
            Unlock Deck
          </button>
        </div>
      )}

      {/* The 3D Flashcard Container */}
      <div className="relative max-w-2xl mx-auto perspective-1000">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full min-h-[340px] bg-slate-900 border-2 rounded-2xl p-8 cursor-pointer select-none transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${
            isFlipped
              ? 'border-indigo-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/30'
              : 'border-slate-800 hover:border-slate-700 bg-slate-900'
          }`}
        >
          {/* Card Header (Syllabus tag & flip hint) */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-indigo-400 font-semibold">
                {activeCard.syllabusTag || 'EXAM-SKILL'}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize">{activeCard.difficulty} Difficulty</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(isFlipped ? activeCard.back : activeCard.front);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                title="Speak text"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Answer' : 'Question (Click / Space to flip)'}</span>
              </div>
            </div>
          </div>

          {/* Main Card Content */}
          <div className="my-auto py-6 text-center">
            {!isFlipped ? (
              <div className="text-lg md:text-xl font-semibold text-slate-100 leading-relaxed">
                {activeCard.front}
              </div>
            ) : (
              <div className="text-base md:text-lg font-medium text-emerald-300 leading-relaxed space-y-2">
                <div>{activeCard.back}</div>
              </div>
            )}

            {/* Hint Dropdown */}
            {activeCard.hint && !isFlipped && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(!showHint);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'Show Syllabus Hint'}</span>
                </button>
                {showHint && (
                  <p className="text-xs text-slate-400 italic mt-1.5 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 max-w-md mx-auto">
                    {activeCard.hint}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Card Footer: Index & Rating Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-3">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <div className="flex items-center gap-1.5">
              {activeCard.rating === 'easy' && (
                <span className="text-emerald-400 font-medium">★ Mastered</span>
              )}
              {activeCard.rating === 'hard' && (
                <span className="text-rose-400 font-medium">Needs Review</span>
              )}
              {activeCard.rating === 'good' && (
                <span className="text-amber-400 font-medium">Almost There</span>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl hover:border-slate-700 transition flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev (←)</span>
          </button>

          {/* Leitner Box Ratings: 1 (Hard), 2 (Good), 3 (Easy) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRate('hard')}
              className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 rounded-lg text-xs font-medium transition"
              title="Press 1"
            >
              1. Hard
            </button>
            <button
              onClick={() => handleRate('good')}
              className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 rounded-lg text-xs font-medium transition"
              title="Press 2"
            >
              2. Good
            </button>
            <button
              onClick={() => handleRate('easy')}
              className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 rounded-lg text-xs font-medium transition"
              title="Press 3"
            >
              3. Mastered
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl hover:border-slate-700 transition flex items-center gap-1 text-xs"
          >
            <span className="hidden sm:inline">Next (→)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
