import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { SubscriptionStatus } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionStatus;
  onUpgradeToPro: (tier: 'pro' | 'school') => void;
  onToggleFree: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  subscription,
  onUpgradeToPro,
  onToggleFree,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = (tier: 'pro' | 'school') => {
    setIsProcessing(true);
    setTimeout(() => {
      onUpgradeToPro(tier);
      setIsProcessing(false);
      setSuccessMessage('Congratulations! Pro Exam Master status activated.');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1500);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="relative px-6 pt-8 pb-6 text-center border-b border-slate-800 bg-gradient-to-b from-indigo-950/40 to-slate-900">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Targeted Curriculum Pricing</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Unlock Top-Band Exam Mastery
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Stop studying generic flashcards. Train exclusively against CollegeBoard & official exam syllabus rubrics with unlimited AI note synthesis and FRQ grading.
          </p>

          {/* Billing Switcher */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg font-semibold transition ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                Save 38%
              </span>
            </button>
          </div>
        </div>

        {/* Success toast */}
        {successMessage && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 p-3 text-center text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE TIER */}
          <div className={`rounded-2xl p-6 border flex flex-col justify-between transition ${
            !subscription.isPro ? 'bg-slate-950/60 border-slate-700' : 'bg-slate-950/30 border-slate-800/80'
          }`}>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Free Starter</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Essential study kit generation for casual review.</p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>3 Uploads / week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>5 Flashcards per deck preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>Core stimulus multiple-choice quiz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>1 AI Rubric FRQ evaluation / week</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {!subscription.isPro ? (
                <div className="w-full py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold text-center border border-slate-700">
                  Current Active Plan
                </div>
              ) : (
                <button
                  onClick={onToggleFree}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition border border-slate-800"
                >
                  Switch to Free Demo Tier
                </button>
              )}
            </div>
          </div>

          {/* PRO EXAM MASTER (FEATURED) */}
          <div className="relative rounded-2xl p-6 border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
              Most Popular for 5s & 7s
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Pro Exam Master</span>
                <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$7.50' : '$12'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {billingCycle === 'annual' ? 'Billed annually ($89/yr)' : 'Billed monthly'}
              </div>

              <div className="mt-5 space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Unlimited note & syllabus uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Full active recall decks (unlimited cards)</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Unlimited AI Rubric FRQ Grading</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Predicted AP (1-5) / IB (1-7) score bands</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>1-on-1 Socratic AI Exam Tutor Chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Voice synthesis audio overview</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleUpgrade('pro')}
                disabled={isProcessing || (subscription.isPro && subscription.tier === 'pro')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 transition shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {subscription.isPro && subscription.tier === 'pro' ? (
                  <span>Active Pro Plan</span>
                ) : (
                  <>
                    <span>Upgrade to Pro Exam Master</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SCHOOL / TUTOR BUNDLE */}
          <div className="rounded-2xl p-6 border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tutoring Cohort / School
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$24' : '$29'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">For AP teachers, tutors, and study groups.</p>

              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Everything in Pro Exam Master</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Up to 10 student collaborative seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Custom syllabus & teacher rubric upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Cohort analytics & weak-spot heatmaps</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleUpgrade('school')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition border border-slate-800"
              >
                {subscription.tier === 'school' ? 'Active School Plan' : 'Select Cohort Tier'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee & Trust */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30-Day Score Guarantee · Cancel anytime with 1-click</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Aligned with CollegeBoard 2026 course curriculum updates.
          </div>
        </div>
      </div>
    </div>
  );
};
