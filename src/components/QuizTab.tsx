import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Timer, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizTabProps {
  quiz: QuizQuestion[];
  topicTitle: string;
}

export const QuizTab: React.FC<QuizTabProps> = ({ quiz, topicTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  const activeQ = quiz[currentIndex] || quiz[0];
  const isAnswered = selectedAnswers[currentIndex] !== undefined;
  const isRevealed = revealedQuestions[currentIndex];
  const selectedOpt = selectedAnswers[currentIndex];
  const isCorrect = selectedOpt === activeQ.correctIndex;

  const handleSelectOption = (optIndex: number) => {
    if (isRevealed) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleRevealAnswer = () => {
    if (!isAnswered) return;
    setRevealedQuestions((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setTimerActive(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setRevealedQuestions({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setSecondsElapsed(0);
    setTimerActive(true);
  };

  const handleRetakeMissed = () => {
    const newSelected: Record<number, number> = {};
    const newRevealed: Record<number, boolean> = {};
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        newSelected[idx] = selectedAnswers[idx];
        newRevealed[idx] = true;
      }
    });
    setSelectedAnswers(newSelected);
    setRevealedQuestions(newRevealed);
    setIsCompleted(false);
    // Find first missed index
    const firstMissed = quiz.findIndex((q, idx) => newSelected[idx] === undefined);
    setCurrentIndex(firstMissed >= 0 ? firstMissed : 0);
  };

  // Calculations
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = quiz.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;
  const scorePercentage = Math.round((correctCount / (quiz.length || 1)) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
            Quiz Results Summary
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">{topicTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">Completed in {formatTime(secondsElapsed)}</p>
        </div>

        {/* Score Ring / Box */}
        <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl max-w-sm mx-auto">
          <div className="text-4xl font-extrabold text-white font-mono">
            {correctCount} / {quiz.length}
          </div>
          <div className="text-xs font-semibold mt-1">
            <span className={scorePercentage >= 80 ? 'text-emerald-400' : scorePercentage >= 60 ? 'text-amber-400' : 'text-rose-400'}>
              {scorePercentage}% Accuracy
            </span>
            <span aria-hidden="true" className="text-slate-600 mx-2">·</span>
            <span className="text-slate-400">
              {scorePercentage >= 80 ? 'Predicted AP Score 5' : scorePercentage >= 60 ? 'Predicted AP Score 3-4' : 'Needs Reinforcement (Score 1-2)'}
            </span>
          </div>
        </div>

        {/* Breakdown of questions */}
        <div className="text-left space-y-2 max-w-lg mx-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Question Review:
          </div>
          {quiz.map((q, idx) => {
            const isQCorrect = selectedAnswers[idx] === q.correctIndex;
            return (
              <div
                key={idx}
                className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                  {isQCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}
                  <span className="text-slate-300 truncate">
                    Q{idx + 1}: {q.question}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{q.syllabusSkill}</span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={handleResetQuiz}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Full Quiz</span>
          </button>

          {correctCount < quiz.length && (
            <button
              onClick={handleRetakeMissed}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Retry Missed Questions</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Quiz Header: Question count & timer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">
            Question {currentIndex + 1} of {quiz.length}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono">{activeQ.syllabusSkill}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Timer className="w-4 h-4 text-indigo-400" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>
          <button
            onClick={handleResetQuiz}
            className="text-slate-500 hover:text-slate-300 p-1"
            title="Reset Quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        {/* Stimulus or Scenario Box (if present) */}
        {activeQ.stimulus && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-indigo-200/90 leading-relaxed font-mono">
            <div className="flex items-center gap-1 text-[11px] text-indigo-400 uppercase tracking-wider font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Exam Stimulus / Experimental Data</span>
            </div>
            {activeQ.stimulus}
          </div>
        )}

        {/* Question Text */}
        <div className="text-base font-semibold text-white leading-relaxed">
          {activeQ.question}
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {activeQ.options.map((option, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
            const isSelected = selectedOpt === optIdx;
            const isOptionCorrect = optIdx === activeQ.correctIndex;

            let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200';

            if (isRevealed) {
              if (isOptionCorrect) {
                optionStyle = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200 font-medium';
              } else if (isSelected && !isOptionCorrect) {
                optionStyle = 'bg-rose-500/10 border-rose-500/50 text-rose-200';
              } else {
                optionStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-indigo-600/15 border-indigo-500 text-indigo-200 font-medium';
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                disabled={isRevealed}
                className={`w-full text-left p-3.5 border rounded-xl transition flex items-start gap-3 text-xs md:text-sm ${optionStyle}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition ${
                    isRevealed && isOptionCorrect
                      ? 'bg-emerald-500 text-slate-950'
                      : isRevealed && isSelected && !isOptionCorrect
                      ? 'bg-rose-500 text-white'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {letter}
                </div>
                <div className="flex-1 mt-0.5 leading-normal">{option}</div>
                {isRevealed && isOptionCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                )}
                {isRevealed && isSelected && !isOptionCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Reveal Explanation Bar */}
        {isRevealed ? (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
            isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Correct! Full Rubric Credit</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400">Incorrect Choice</span>
                </>
              )}
            </div>
            <div className="text-slate-200">{activeQ.rationale}</div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleRevealAnswer}
              disabled={!isAnswered}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                isAnswered
                  ? 'bg-slate-800 hover:bg-slate-700 text-white'
                  : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
              }`}
            >
              Check Answer & Explain Rationale
            </button>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              currentIndex === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition active:scale-[0.98]"
          >
            <span>{currentIndex === quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
