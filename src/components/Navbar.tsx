import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Crown,
  BookOpen,
  ChevronDown,
  Globe,
  Settings,
  Sparkle
} from 'lucide-react';
import { ExamTrackId, SubscriptionStatus, CurriculumRegion } from '../types';
import { EXAM_TRACKS } from '../data/sampleNotes';

interface NavbarProps {
  currentTrackId: ExamTrackId;
  onSelectTrack: (trackId: ExamTrackId) => void;
  subscription: SubscriptionStatus;
  onOpenUpload: () => void;
  onOpenSubscription: () => void;
  onOpenBrandModal: () => void;
  brandName: string;
  brandTagline: string;
  savedKitsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTrackId,
  onSelectTrack,
  subscription,
  onOpenUpload,
  onOpenSubscription,
  onOpenBrandModal,
  brandName,
  brandTagline,
  savedKitsCount,
}) => {
  const currentTrack = EXAM_TRACKS.find((t) => t.id === currentTrackId) || EXAM_TRACKS[0];
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<CurriculumRegion | 'ALL'>('ALL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const regionTabs: { key: CurriculumRegion | 'ALL'; label: string; flag: string }[] = [
    { key: 'ALL', label: 'All Curricula', flag: '🌐' },
    { key: 'UGANDA', label: 'Uganda NLSC', flag: '🇺🇬' },
    { key: 'AFRICA_REGIONAL', label: 'Africa (CBC/WAEC)', flag: '🌍' },
    { key: 'CAMBRIDGE_UK', label: 'Cambridge', flag: '🇬🇧' },
    { key: 'IB_DIPLOMA', label: 'IB Diploma', flag: '🌐' },
    { key: 'US_COLLEGEBOARD', label: 'AP / US', flag: '🇺🇸' },
  ];

  const filteredTracks = selectedRegionFilter === 'ALL'
    ? EXAM_TRACKS
    : EXAM_TRACKS.filter((t) => t.region === selectedRegionFilter);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand with interactive Name Lab button */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">{brandName}</span>
              <button
                type="button"
                onClick={onOpenBrandModal}
                className="text-[10px] bg-slate-900 border border-slate-700/80 hover:border-indigo-500 text-indigo-300 px-2 py-0.5 rounded font-medium flex items-center gap-1 transition"
                title="Change or test brand names"
              >
                <span>Name Lab</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[280px]">
              {brandTagline}
            </p>
          </div>
        </div>

        {/* Center: Curriculum & Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs hover:border-slate-700 transition"
          >
            <span className="text-slate-400 hidden md:inline">Curriculum:</span>
            <span className="font-semibold text-white max-w-[170px] sm:max-w-[220px] truncate">
              {currentTrack.country === 'Uganda' ? '🇺🇬 ' : ''}{currentTrack.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[340px] sm:w-[460px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2">
              {/* Region Filter Chips */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-[11px] mb-2">
                {regionTabs.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setSelectedRegionFilter(r.key)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition ${
                      selectedRegionFilter === r.key
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{r.flag} {r.label}</span>
                  </button>
                ))}
              </div>

              {/* Scrollable list of subjects */}
              <div className="max-h-[360px] overflow-y-auto space-y-1 pr-1">
                {filteredTracks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      onSelectTrack(t.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                      t.id === currentTrackId
                        ? 'bg-indigo-600/20 text-indigo-200 font-semibold border border-indigo-500/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-slate-100">
                        <span>{t.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {t.board} · {t.country} · {t.scoringScale}
                      </div>
                    </div>
                    {t.id === currentTrackId && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right CTA / Subscription status */}
        <div className="flex items-center gap-3">
          {/* Quota / Tier info */}
          <button
            onClick={onOpenSubscription}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-2 ${
              subscription.isPro
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {subscription.isPro ? (
              <>
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Pro Unlimited</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline text-slate-400">Plan:</span>
                <span className="font-semibold text-slate-200">
                  {Math.max(0, subscription.uploadLimit - subscription.uploadsUsedThisWeek)}/
                  {subscription.uploadLimit} Free Left
                </span>
                <span className="text-indigo-400 font-semibold ml-1">Upgrade</span>
              </>
            )}
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/25 transition active:scale-[0.98]"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Notes</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </div>
    </header>
  );
};
