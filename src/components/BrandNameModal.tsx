import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Lightbulb, 
  Globe, 
  Compass, 
  Award,
  Layers,
  Edit3
} from 'lucide-react';

export interface BrandCandidate {
  id: string;
  name: string;
  tagline: string;
  marketAngle: string;
  whyItWorks: string;
  bestFor: string;
  accent: string;
}

export const BRAND_CANDIDATES: BrandCandidate[] = [
  {
    id: 'kredo',
    name: 'Kredo',
    tagline: 'Competence-Driven & Global Exam Mastery',
    marketAngle: 'Global & African Hybrid',
    whyItWorks: 'Rooted in "Credo" (knowledge, trust, achievement). 2 syllables, ultra-memorable, sounds like Duolingo or Canva. Highly marketable in Uganda, East Africa, UK, and US.',
    bestFor: 'Best all-around commercial EdTech brand that can raise venture capital or scale internationally.',
    accent: 'from-emerald-500 to-indigo-600',
  },
  {
    id: 'elimupass',
    name: 'ElimuPass',
    tagline: 'Uganda NLSC & Pan-African Syllabus AI',
    marketAngle: 'Culturally Resonant African Focus',
    whyItWorks: 'Leverages the Swahili word "Elimu" (Education / Wisdom) known across Uganda, Kenya, Tanzania, and Rwanda. Instantly evokes trust among parents, students, and UNEB educators.',
    bestFor: 'Dominating Uganda, Kenya CBC, and East African regional curriculum markets.',
    accent: 'from-amber-500 to-emerald-600',
  },
  {
    id: 'syllabus-ai',
    name: 'SyllabusAI',
    tagline: 'Curriculum-Anchored Exam & Rubric Engine',
    marketAngle: 'High-Intent SEO & Direct Utility',
    whyItWorks: 'Tells the student immediately: this is NOT a generic chatbot. It maps notes directly to official syllabus units, mark schemes, and examiner criteria.',
    bestFor: 'Direct search engine traffic, high-school teachers, and curriculum-focused study cohorts.',
    accent: 'from-indigo-500 to-teal-500',
  },
  {
    id: 'unebmaster',
    name: 'UNEBMaster Global',
    tagline: 'The Ultimate Uganda NLSC & UCE Exam Companion',
    marketAngle: 'Hyper-Local Exam Authority',
    whyItWorks: 'Ugandan students and schools specifically search for UNEB past papers, NCDC activities of integration, and grading descriptors. Instant product-market fit.',
    bestFor: 'Targeting Uganda secondary schools (Senior 1-4 & A-Level) with international Cambridge/IB tracks.',
    accent: 'from-yellow-500 to-red-600',
  },
  {
    id: 'skolarpass',
    name: 'SkolarPass',
    tagline: 'Active-Recall & Item-Based Exam Coach',
    marketAngle: 'Academic Premium Brand',
    whyItWorks: 'Clean modern spelling of Scholar. Sounds like an all-access pass to top-band grades (Grade 5, Grade 7, or Distinction 1).',
    bestFor: 'Subscription monetization and premium freemium conversions.',
    accent: 'from-violet-500 to-emerald-500',
  },
];

interface BrandNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBrandName: string;
  onSelectBrandName: (name: string, tagline?: string) => void;
}

export const BrandNameModal: React.FC<BrandNameModalProps> = ({
  isOpen,
  onClose,
  currentBrandName,
  onSelectBrandName,
}) => {
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Brand Development Studio</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Choose or Develop App Brand Name
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Switch between brand names tailored for Uganda's New Lower Secondary Curriculum, East Africa, or global international expansion.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Options List */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {BRAND_CANDIDATES.map((candidate) => {
            const isSelected = currentBrandName.toLowerCase().includes(candidate.name.toLowerCase());

            return (
              <div
                key={candidate.id}
                onClick={() => {
                  onSelectBrandName(candidate.name, candidate.tagline);
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-950 border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${candidate.accent} flex items-center justify-center text-white font-bold text-lg shadow`}>
                      {candidate.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{candidate.name}</span>
                        <span className="text-[11px] text-indigo-400 font-mono">
                          {candidate.marketAngle}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        {candidate.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isSelected ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <Check className="w-3.5 h-3.5" />
                        Active Name
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-slate-800 hover:border-slate-700">
                        Apply Name
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-300">Why It Works: </span>
                    <span className="text-slate-400">{candidate.whyItWorks}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Best Positioned For: </span>
                    <span className="text-slate-400">{candidate.bestFor}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Custom Name Option */}
          <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full text-left flex items-center justify-between text-xs text-slate-400 hover:text-white"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  Have another brand name in mind? Type your custom name
                </span>
                <span className="text-indigo-400">Enter custom →</span>
              </button>
            ) : (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Enter Custom App Name:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. BrainSpark Uganda, Kredo, SomaSmart..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customName.trim()) {
                        onSelectBrandName(customName.trim(), 'National & Global Curriculum AI');
                        setShowCustomInput(false);
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Active Name: <strong className="text-white">{currentBrandName}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
