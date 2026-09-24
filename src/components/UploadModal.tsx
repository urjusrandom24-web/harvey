import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Check, 
  AlertCircle, 
  Zap,
  ArrowRight,
  Layers
} from 'lucide-react';
import { ExamTrackId, SubscriptionStatus } from '../types';
import { EXAM_TRACKS, SAMPLE_NOTE_PRESETS, SampleNotePreset } from '../data/sampleNotes';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrackId: ExamTrackId;
  subscription: SubscriptionStatus;
  onGenerate: (data: {
    title: string;
    content: string;
    examTrack: ExamTrackId;
    unitTopic: string;
  }) => Promise<void>;
  onOpenSubscription: () => void;
  isGenerating: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  currentTrackId,
  subscription,
  onGenerate,
  onOpenSubscription,
  isGenerating,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<ExamTrackId>(currentTrackId);
  const [title, setTitle] = useState('');
  const [unitTopic, setUnitTopic] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTrackInfo = EXAM_TRACKS.find((t) => t.id === selectedTrack) || EXAM_TRACKS[0];

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text || '');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (preset: SampleNotePreset) => {
    setSelectedTrack(preset.examTrack);
    setTitle(preset.title);
    setUnitTopic(preset.unitTopic);
    setContent(preset.content);
    setFileName(`${preset.title}.md`);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!subscription.isPro && subscription.uploadsUsedThisWeek >= subscription.uploadLimit) {
      setErrorMsg('You have reached the free limit of 3 study kits this week. Upgrade to Pro for unlimited uploads!');
      return;
    }

    if (!content.trim()) {
      setErrorMsg('Please paste your lecture notes or upload a notes file.');
      return;
    }

    try {
      await onGenerate({
        title: title.trim() || `${currentTrackInfo.name} Class Notes`,
        content: content.trim(),
        examTrack: selectedTrack,
        unitTopic: unitTopic.trim() || currentTrackInfo.syllabusUnits[0] || 'Unit Concepts',
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to generate study kit. Please try again.');
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isQuotaFull = !subscription.isPro && subscription.uploadsUsedThisWeek >= subscription.uploadLimit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              Upload Curriculum Notes
            </h2>
            <p className="text-xs text-slate-400">
              Transform rough lecture notes into syllabus-aligned explanations, active flashcards, quizzes & FRQs.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quota Banner */}
        {isQuotaFull && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
              <span>You have reached your free weekly limit (3/3 study kits generated).</span>
            </div>
            <button
              onClick={onOpenSubscription}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
            >
              Upgrade to Pro for Unlimited
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Quick Presets Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Or Try Official High-Yield Syllabus Presets:
              </span>
              <span className="text-[11px] text-slate-400">Instant 1-Click Load</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_NOTE_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => handlePresetSelect(p)}
                  className="text-left p-2.5 bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition text-xs group"
                >
                  <div className="flex items-center justify-between text-[11px] text-indigo-400 font-medium mb-1">
                    <span>{p.examTrack.replace('_', ' ')}</span>
                    <span className="text-slate-400 group-hover:text-indigo-300">Load sample →</span>
                  </div>
                  <div className="font-semibold text-slate-200 truncate">{p.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.previewSnippet}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Exam Track & Unit Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Exam Track (Curriculum Anchor)
              </label>
              <select
                value={selectedTrack}
                onChange={(e) => {
                  const val = e.target.value as ExamTrackId;
                  setSelectedTrack(val);
                  const trackObj = EXAM_TRACKS.find((t) => t.id === val);
                  if (trackObj && trackObj.syllabusUnits.length > 0) {
                    setUnitTopic(trackObj.syllabusUnits[0]);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <optgroup label="🇺🇬 Uganda: New Lower Secondary (NLSC) & UACE">
                  {EXAM_TRACKS.filter(t => t.region === 'UGANDA').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌍 Regional Africa (Kenya CBC & WAEC)">
                  {EXAM_TRACKS.filter(t => t.region === 'AFRICA_REGIONAL').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.board})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🇬🇧 Cambridge International (IGCSE & A-Levels)">
                  {EXAM_TRACKS.filter(t => t.region === 'CAMBRIDGE_UK').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌐 International Baccalaureate (IB DP)">
                  {EXAM_TRACKS.filter(t => t.region === 'IB_DIPLOMA').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🇺🇸 United States & Global AP (College Board)">
                  {EXAM_TRACKS.filter(t => t.region === 'US_COLLEGEBOARD').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Syllabus Unit / Topic
              </label>
              <select
                value={unitTopic}
                onChange={(e) => setUnitTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {currentTrackInfo.syllabusUnits.map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
                <option value="Other / General Lecture Notes">Other / Custom Topic</option>
              </select>
            </div>
          </div>

          {/* Note Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Topic or Lecture Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cellular Respiration & Electron Transport Chain"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Drag & Drop File Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 text-center transition ${
              dragOver
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              accept=".txt,.md,.text"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="w-7 h-7 mx-auto text-slate-400 mb-1.5" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop notes (.txt, .md)
              </div>
              {fileName && (
                <div className="mt-2 text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Loaded: {fileName}
                </div>
              )}
            </label>
          </div>

          {/* Raw Text Paste Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Or Paste Lecture / Textbook Notes
              </label>
              <span className="text-[11px] text-slate-400">
                {wordCount} words · {content.length} characters
              </span>
            </div>
            <textarea
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste raw notes, lecture transcript, definitions, or textbook highlights here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span>Aligned to CollegeBoard & Exam Rubrics</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isGenerating}
                className="px-4 py-2 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating || !content.trim()}
                className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  isGenerating || !content.trim()
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Syllabus & Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate AI Study Kit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
