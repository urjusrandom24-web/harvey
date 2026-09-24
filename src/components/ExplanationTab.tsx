import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  Lightbulb, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  CheckCircle2, 
  Tag, 
  Bookmark, 
  Share2,
  Sparkles,
  ExternalLink,
  BrainCircuit
} from 'lucide-react';
import { ExplanationData, CurriculumMeta } from '../types';

interface ExplanationTabProps {
  explanation: ExplanationData;
  curriculumMeta: CurriculumMeta;
  title: string;
  onOpenTutor: () => void;
}

export const ExplanationTab: React.FC<ExplanationTabProps> = ({
  explanation,
  curriculumMeta,
  title,
  onOpenTutor,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!speechSynthesisAvailable) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${title}. Overview: ${explanation.overview}. Key Principle 1: ${explanation.coreConcepts[0]?.title || ''}. ${explanation.coreConcepts[0]?.explanation || ''}. Memory anchor: ${explanation.memoryAnchor}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Syllabus Alignment Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>{curriculumMeta.standardCode || 'Standard Syllabus Alignment'}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{curriculumMeta.unitAlignment}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          {curriculumMeta.focusTakeaway && (
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{curriculumMeta.focusTakeaway}</p>
          )}
        </div>

        {/* Audio Listen & Ask Tutor CTAs */}
        <div className="flex items-center gap-3">
          {speechSynthesisAvailable && (
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${
                isPlayingAudio
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>Listen to Overview</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onOpenTutor}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask 1-on-1 Exam Tutor</span>
          </button>
        </div>
      </div>

      {/* Big Picture Mechanism Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Big Picture Mechanism & Overview</span>
        </div>
        <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line space-y-3 font-normal">
          {explanation.overview}
        </div>
      </div>

      {/* Memory Anchor / Mental Model */}
      {explanation.memoryAnchor && (
        <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Exam Memory Anchor & Mnemonic
              </div>
              <p className="text-sm font-medium text-slate-100 mt-1 leading-relaxed">
                {explanation.memoryAnchor}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Core Principles Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>01. Core Syllabus Principles</span>
          <span className="text-xs text-slate-400 font-normal">
            ({explanation.coreConcepts?.length || 0} Key Mechanistic Concepts)
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {explanation.coreConcepts?.map((concept, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-semibold text-slate-100 text-base">
                  <span className="text-indigo-400 mr-2 font-mono text-sm">#{index + 1}</span>
                  {concept.title}
                </h4>
              </div>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {concept.explanation}
              </p>

              {concept.examRelevance && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <span className="font-semibold text-emerald-300">Why Examiners Test This: </span>
                    <span className="text-emerald-200/90">{concept.examRelevance}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rubric Watchlist: Common Traps & Fixes */}
      {explanation.rubricWatchlist?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>02. Rubric Trap Watchlist</span>
            <span className="text-xs text-rose-400 font-normal">
              (Common Student Mistakes That Lose Points)
            </span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {explanation.rubricWatchlist.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-xs text-rose-400 font-medium">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-[11px] block text-rose-500">
                      Common Student Misconception
                    </span>
                    <span className="text-rose-200 text-sm">{item.commonMistake}</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-emerald-400">Official Rubric Correction: </span>
                    <span className="text-slate-200">{item.correctApproach}</span>
                  </div>
                  {item.examinerNote && (
                    <div className="text-slate-400 pt-1 border-t border-slate-800/60">
                      <span className="text-amber-400 font-medium">Examiner Tip: </span>
                      {item.examinerNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High-Yield Key Terms Glossary */}
      {explanation.keyTerms?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>03. High-Yield Vocabulary & Definitions</span>
            <span className="text-xs text-slate-400 font-normal">
              (Mandatory Exam Keywords)
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {explanation.keyTerms.map((term, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-indigo-300 font-mono">
                    {term.term}
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
                {term.examContext && (
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">Exam Context:</span> {term.examContext}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
