import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  Sparkles, 
  Send, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Crown,
  Eye,
  Check,
  RotateCcw
} from 'lucide-react';
import { PracticeTestData, ExamTrackId, FRQGradingResult, SubscriptionStatus } from '../types';

interface PracticeTestTabProps {
  practiceTest: PracticeTestData;
  examTrack: ExamTrackId;
  subscription: SubscriptionStatus;
  onOpenSubscription: () => void;
  onRecordFRQGrade: () => void;
}

export const PracticeTestTab: React.FC<PracticeTestTabProps> = ({
  practiceTest,
  examTrack,
  subscription,
  onOpenSubscription,
  onRecordFRQGrade,
}) => {
  const [activeSection, setActiveSection] = useState<'mcq' | 'frq'>('frq');
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  // FRQ State
  const [studentResponse, setStudentResponse] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<FRQGradingResult | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // Handle MCQ selection
  const handleSelectMCQ = (questionId: string, optIndex: number) => {
    if (mcqSubmitted) return;
    setMcqAnswers((prev) => ({ ...prev, [questionId]: optIndex }));
  };

  const mcqCorrectCount = practiceTest.mcqs.filter(
    (q) => mcqAnswers[q.id] === q.correctIndex
  ).length;

  // Grade FRQ submission
  const handleGradeFRQ = async () => {
    if (!studentResponse.trim()) {
      setGradingError('Please write your response before submitting to the AI examiner.');
      return;
    }

    if (!subscription.isPro && subscription.frqGradesUsed >= subscription.frqLimit) {
      onOpenSubscription();
      return;
    }

    setIsGrading(true);
    setGradingError(null);

    try {
      const allCriteria = practiceTest.frq.questions.flatMap((q) => q.rubricCriteria);
      const totalPoints = practiceTest.frq.questions.reduce((sum, q) => sum + q.points, 0) || 4;

      const res = await fetch('/api/study-kit/grade-frq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examTrack,
          questionPrompt: `${practiceTest.frq.stimulusOrPrompt}\n\n${practiceTest.frq.questions.map((q) => `${q.part}: ${q.prompt}`).join('\n')}`,
          studentResponse: studentResponse.trim(),
          rubricCriteria: allCriteria,
          maxPoints: totalPoints,
          sampleHighScoringResponse: practiceTest.frq.sampleHighScoringResponse,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI examiner grader.');
      }

      const data = await res.json();
      setGradingResult(data.grading);
      onRecordFRQGrade();
    } catch (err: any) {
      console.error('FRQ grading failed:', err);
      setGradingError(err?.message || 'Error evaluating FRQ. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  const totalPossiblePoints = practiceTest.frq.questions.reduce((sum, q) => sum + q.points, 0) || 4;
  const isFrqQuotaReached = !subscription.isPro && subscription.frqGradesUsed >= subscription.frqLimit;

  return (
    <div className="space-y-6">
      {/* Test Benchmark Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <Clock className="w-4 h-4" />
            <span>Official Exam Simulation</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Allotted Time: {practiceTest.timeAllottedMinutes} Minutes</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{practiceTest.title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Section 1: Multiple Choice ({practiceTest.mcqs.length} Stimulus Questions) · Section 2: Free Response Rubric Scoring ({totalPossiblePoints} Pts)
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveSection('frq')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeSection === 'frq'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Section 2: FRQ (AI Grader)
          </button>
          <button
            onClick={() => setActiveSection('mcq')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeSection === 'mcq'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Section 1: MCQs ({practiceTest.mcqs.length})
          </button>
        </div>
      </div>

      {/* SECTION 2: FREE RESPONSE QUESTION (FRQ) WITH AI RUBRIC GRADER */}
      {activeSection === 'frq' && (
        <div className="space-y-6">
          {/* FRQ Stimulus & Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Free Response Scenario & Dataset
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {totalPossiblePoints} Points Total
              </span>
            </div>

            {/* Stimulus */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs md:text-sm text-slate-200 leading-relaxed font-mono">
              {practiceTest.frq.stimulusOrPrompt}
            </div>

            {/* Sub-questions Parts A, B, C */}
            <div className="space-y-4">
              {practiceTest.frq.questions.map((q, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
                    <span className="text-indigo-400">{q.part}</span>
                    <span className="text-slate-400 font-mono">[{q.points} pt{q.points > 1 ? 's' : ''}]</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-200 font-medium">
                    {q.prompt}
                  </div>
                  {/* Rubric criteria hints */}
                  <div className="mt-2.5 pt-2 border-t border-slate-900 text-[11px] text-slate-400 space-y-1">
                    <span className="text-slate-300 font-semibold">Rubric Requirements:</span>
                    {q.rubricCriteria.map((c, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-1.5 text-slate-400">
                        <Check className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Student Typing Area */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">
                  Your Response (Draft Your Exam Solution):
                </label>
                <span className="text-slate-400 font-mono text-[11px]">
                  {studentResponse.trim() ? studentResponse.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <textarea
                rows={9}
                value={studentResponse}
                onChange={(e) => setStudentResponse(e.target.value)}
                placeholder="Write your response clearly using Claim-Evidence-Reasoning (CER)... State your hypothesis, cite data, explain the physiological/chemical/historical mechanism, and state the concluding effect..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs md:text-sm text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Quota Notice if applicable */}
            {isFrqQuotaReached && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-300">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Free tier: 1 FRQ grade used. Upgrade to Pro for unlimited AI rubric evaluations.</span>
                </div>
                <button
                  onClick={onOpenSubscription}
                  className="font-bold underline hover:text-amber-200"
                >
                  Upgrade
                </button>
              </div>
            )}

            {gradingError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{gradingError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400 hidden sm:block">
                Evaluated against official College Board FRQ scoring guidelines.
              </div>
              <button
                type="button"
                onClick={handleGradeFRQ}
                disabled={isGrading || !studentResponse.trim()}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  isGrading || !studentResponse.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
                }`}
              >
                {isGrading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Grading With Rubric Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Grade My FRQ with AI Rubric</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI GRADING REPORT (IF GRADED) */}
          {gradingResult && (
            <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    Official AI Rubric Evaluation
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">Score Report</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {gradingResult.score} / {gradingResult.maxPoints}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Points Awarded</div>
                  </div>

                  <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-center">
                    <div className="text-sm font-bold text-indigo-300">
                      {gradingResult.predictedScoreBand}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Predicted Band</div>
                  </div>
                </div>
              </div>

              {/* Rubric Criteria Checklist */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Detailed Point-by-Point Rubric Checklist:
                </h4>
                <div className="space-y-2.5">
                  {gradingResult.criteriaFeedback.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
                        item.earned
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      {item.earned ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-slate-100">{item.criterion}</div>
                        <div className="text-slate-300 mt-1 leading-relaxed">{item.comment}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Actionable Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Key Strengths Observed
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {gradingResult.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Actionable Improvements to Reach 100%
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {gradingResult.actionableImprovements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model 5/5 Answer Comparison Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="w-full p-3.5 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-semibold text-indigo-300 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-400" />
                    Compare with 5/5 High-Scoring Benchmark Exemplar
                  </span>
                  {showModelAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showModelAnswer && (
                  <div className="mt-3 p-4 bg-slate-950 border border-indigo-500/30 rounded-xl text-xs leading-relaxed text-slate-200 whitespace-pre-line font-mono">
                    {practiceTest.frq.sampleHighScoringResponse}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: TIMED MULTIPLE CHOICE QUESTIONS (MCQs) */}
      {activeSection === 'mcq' && (
        <div className="space-y-4">
          {practiceTest.mcqs.map((q, idx) => {
            const isAnswered = mcqAnswers[q.id] !== undefined;
            const isCorrect = mcqAnswers[q.id] === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-white">Question {idx + 1}</span>
                  <span className="font-mono text-indigo-400">{q.syllabusSkill}</span>
                </div>

                <div className="text-sm font-semibold text-slate-100">{q.question}</div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = mcqAnswers[q.id] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (mcqSubmitted) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-medium';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectMCQ(q.id, optIdx)}
                        disabled={mcqSubmitted}
                        className={`w-full text-left p-3 border rounded-xl text-xs flex items-center gap-3 transition ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                          {letter}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {mcqSubmitted && optIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {mcqSubmitted && (
                  <div className="pt-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-semibold text-emerald-400">Rationale: </span>
                    {q.rationale}
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit MCQ Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {Object.keys(mcqAnswers).length} of {practiceTest.mcqs.length} answered
            </span>
            <div className="flex items-center gap-3">
              {mcqSubmitted ? (
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Section Score: {mcqCorrectCount} / {practiceTest.mcqs.length}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setMcqSubmitted(true)}
                  disabled={Object.keys(mcqAnswers).length === 0}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                >
                  Submit Section 1 for Scoring
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
