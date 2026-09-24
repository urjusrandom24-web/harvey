/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  CheckSquare, 
  FileText, 
  Upload, 
  Sparkles, 
  Crown, 
  Flame, 
  BrainCircuit, 
  ChevronRight,
  Plus,
  Trash2,
  FolderOpen,
  ArrowRight,
  Globe
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { UploadModal } from './components/UploadModal';
import { ExplanationTab } from './components/ExplanationTab';
import { FlashcardsTab } from './components/FlashcardsTab';
import { QuizTab } from './components/QuizTab';
import { PracticeTestTab } from './components/PracticeTestTab';
import { SubscriptionModal } from './components/SubscriptionModal';
import { TutorDrawer } from './components/TutorDrawer';
import { BrandNameModal } from './components/BrandNameModal';
import { ExamTrackId, StudyKit, SubscriptionStatus } from './types';
import { EXAM_TRACKS, SAMPLE_NOTE_PRESETS } from './data/sampleNotes';

export default function App() {
  // Brand name and tagline state with persistence
  const [brandName, setBrandName] = useState<string>(() => {
    return localStorage.getItem('syllabus_ai_brand_name') || 'Kredo';
  });
  const [brandTagline, setBrandTagline] = useState<string>(() => {
    return localStorage.getItem('syllabus_ai_brand_tagline') || 'Uganda NLSC, East Africa & Global Curriculum AI';
  });
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const [currentTrackId, setCurrentTrackId] = useState<ExamTrackId>('UG_NLSC_BIOLOGY');
  const [activeTab, setActiveTab] = useState<'explanation' | 'flashcards' | 'quiz' | 'test'>('explanation');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Freemium subscription state
  const [subscription, setSubscription] = useState<SubscriptionStatus>(() => {
    const saved = localStorage.getItem('syllabus_ai_sub');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      isPro: false,
      tier: 'free',
      uploadsUsedThisWeek: 1,
      uploadLimit: 3,
      frqGradesUsed: 0,
      frqLimit: 1,
    };
  });

  useEffect(() => {
    localStorage.setItem('syllabus_ai_sub', JSON.stringify(subscription));
  }, [subscription]);

  // Saved kits in localStorage
  const [savedKits, setSavedKits] = useState<StudyKit[]>(() => {
    const saved = localStorage.getItem('syllabus_ai_kits_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return [];
  });

  const [activeKitId, setActiveKitId] = useState<string>('');

  // Initial load: If no kits saved, generate from flagship Uganda NLSC preset
  useEffect(() => {
    if (savedKits.length === 0) {
      loadInitialFlagshipKits();
    } else if (!activeKitId) {
      setActiveKitId(savedKits[0].id);
      setCurrentTrackId(savedKits[0].examTrack);
    }
  }, []);

  const loadInitialFlagshipKits = () => {
    const ugandaPreset = SAMPLE_NOTE_PRESETS[0]; // Uganda NLSC Biology
    const apPreset = SAMPLE_NOTE_PRESETS[3]; // AP Biology

    const ugandaKit: StudyKit = {
      id: 'default-ug-nlsc-gaseous-exchange',
      title: ugandaPreset.title,
      createdAt: new Date().toISOString(),
      examTrack: ugandaPreset.examTrack,
      unitTopic: ugandaPreset.unitTopic,
      rawNotesSnippet: ugandaPreset.content,
      curriculumMeta: {
        examTrack: 'Uganda NLSC (NCDC / UNEB)',
        standardCode: 'Theme 5: Gaseous Exchange & Respiratory Mechanisms',
        recommendedTimeMinutes: 30,
        unitAlignment: 'Core Competency: Life Science & Community Health',
        focusTakeaway: 'Adaptations of respiratory surfaces, counter-current mechanism in fish, and tuberculosis/malaria prevention in Uganda.',
      },
      explanation: {
        overview:
          'Gaseous exchange in living organisms involves the continuous diffusion of oxygen into body cells and the release of carbon dioxide across specialized membranes. Because rate of diffusion decreases exponentially with animal size, complex organisms rely on folded, highly vascularized surfaces like alveoli in humans and gill lamellae in Nile perch.\n\nIn the New Lower Secondary Curriculum (NLSC), learners must connect these physiological mechanisms to real-world health and community interventions across Uganda—such as combating respiratory tract infections in enclosed smoky kitchens and preventing vector breeding sites.',
        coreConcepts: [
          {
            title: 'Counter-Current Flow in Bony Fish (Tilapia / Nile Perch)',
            explanation:
              'Water flows across gill lamellae in the exact opposite direction to blood in the gill capillaries. This ensures an oxygen concentration gradient is maintained along the entire gill surface, achieving up to 80-85% oxygen extraction compared to parallel flow.',
            examRelevance: 'UNEB Section B Item frequently requires learners to draw flow arrows and explain why parallel flow would stall halfway through diffusion equilibrium.',
          },
          {
            title: 'Adaptations of Human Alveoli for Gaseous Exchange',
            explanation:
              'Human lungs contain ~300-500 million alveoli presenting over 70 square meters of surface area. Each alveolus has a single-cell-thick epithelial wall, is lined with a thin film of moisture for gas dissolution, and is surrounded by dense capillary meshwork.',
            examRelevance: 'Tested as an essential biological design principle: matching high metabolic demand with maximized surface-area-to-volume ratio.',
          },
          {
            title: 'Ventilation Mechanics: Boyle’s Law in the Thoracic Cavity',
            explanation:
              'Inhalation is an active muscular process where contraction of the diaphragm (flattening) and external intercostal muscles increases thoracic volume, lowering internal pressure below atmospheric pressure so air rushes in. Exhalation under resting conditions is largely passive recoil.',
            examRelevance: 'UNEB examiners test the distinction between physical breathing (ventilation) and biochemical cellular respiration.',
          },
        ],
        rubricWatchlist: [
          {
            commonMistake: 'Confusing ventilation (breathing) with cellular respiration.',
            correctApproach: 'State clearly that ventilation is the physical intake and expulsion of air, while respiration is the chemical breakdown of glucose inside cells to yield ATP.',
            examinerNote: 'UNEB markers award zero marks if a candidate writes that lungs "respirate" or that respiration takes place inside the trachea.',
          },
          {
            commonMistake: 'Claiming gills absorb oxygen by "pumping" gases across membranes.',
            correctApproach: 'Gases move strictly by passive diffusion down a partial pressure gradient. No ATP is consumed directly in gas diffusion across the epithelial barrier.',
            examinerNote: 'Watch for incorrect claims of active transport in gaseous exchange.',
          },
        ],
        memoryAnchor: 'Alveoli Rule of 4: "Moist, Thin, Broad, and Bleeding (Vascularized) — where oxygen keeps on speeding!"',
        keyTerms: [
          { term: 'Counter-Current Flow', definition: 'Flow of blood and water in opposite directions across gill lamellae to maintain concentration gradient.', examContext: 'High-yield UNEB Item-based question on fish respiration.' },
          { term: 'Alveolar Surfactant', definition: 'Phospholipid substance reducing surface tension within alveoli, preventing lung collapse.', examContext: 'Crucial for infant respiratory distress syndrome.' },
          { term: 'Activity of Integration', definition: 'Competence assessment where learners synthesize knowledge to solve real community challenges.', examContext: 'Core exam format in Uganda New Lower Secondary Curriculum.' },
          { term: 'Partial Pressure Gradient', definition: 'The difference in concentration of an individual gas between two regions driving passive diffusion.', examContext: 'Applies to alveolar-capillary exchange.' },
          { term: 'Directly Observed Therapy (DOTS)', definition: 'Community health strategy ensuring TB patients take medication under observation for 6 months.', examContext: 'Uganda public health syllabus application.' },
        ],
      },
      flashcards: [
        {
          id: 'fc-ug-1',
          front: 'What are the 4 fundamental characteristics of an efficient respiratory surface in living organisms?',
          back: '1. Large surface area to volume ratio\n2. Thin membrane (one cell thick)\n3. Moist surface for gas dissolution\n4. Rich capillary blood supply for steep concentration gradient',
          hint: 'Think about surface area, thickness, moisture, and transport.',
          difficulty: 'easy',
          syllabusTag: 'NLSC-Bio-Theme5',
        },
        {
          id: 'fc-ug-2',
          front: 'Explain why counter-current exchange in fish gills is far more efficient than parallel (co-current) flow.',
          back: 'In counter-current flow, blood continuously encounters water with higher oxygen saturation, maintaining a diffusion gradient across the entire length of the capillary (extracting ~80-85% of O2 vs ~50% in parallel flow).',
          hint: 'Consider what happens when both liquids reach 50% equilibrium.',
          difficulty: 'hard',
          syllabusTag: 'NLSC-Bio-Theme5',
        },
        {
          id: 'fc-ug-3',
          front: 'What causes intra-thoracic pressure to drop below atmospheric pressure during human inhalation?',
          back: 'Contraction of diaphragm muscles (moving downward) and external intercostal muscles (raising rib cage upward/outward) expands thoracic volume. By Boyle\'s Law, increased volume drops pressure.',
          hint: 'Focus on volume change and Boyle\'s gas law.',
          difficulty: 'medium',
          syllabusTag: 'NLSC-Bio-Theme5',
        },
        {
          id: 'fc-ug-4',
          front: 'Why does a tobacco smoker suffer from reduced oxygen carrying capacity and shortness of breath?',
          back: 'Carbon monoxide binds irreversibly to hemoglobin with 200x higher affinity than oxygen (forming carboxyhemoglobin), while tar damages cilia and destroys alveolar walls (emphysema).',
          hint: 'Think of hemoglobin affinity and cilia paralysis.',
          difficulty: 'medium',
          syllabusTag: 'NLSC-Bio-Health',
        },
        {
          id: 'fc-ug-5',
          front: 'In rural Uganda, why are children living in households using open firewood kitchens at high risk of acute respiratory infections?',
          back: 'Incomplete combustion of biomass releases fine particulate matter (PM2.5) and toxic polycyclic hydrocarbons that paralyze respiratory cilia, irritate bronchiole lining, and allow opportunistic bacterial invasion (pneumonia).',
          hint: 'Relate to indoor air pollution and cilia defense.',
          difficulty: 'hard',
          syllabusTag: 'NLSC-Community-Health',
        },
      ],
      quiz: [
        {
          id: 'q-ug-1',
          question: 'A Senior 3 learner investigates Tilapia respiration in Lake Victoria and observes that when water temperature rises during a dry season, fish surface frequently to gulp atmospheric air. What biological explanation accounts for this behavior?',
          stimulus: 'Observation: Lake Victoria inshore waters experiencing elevated water temperatures and increased fish surfacing.',
          options: [
            'Warm water holds less dissolved oxygen, while fish metabolic rate and oxygen demand increase with temperature.',
            'Fish gills are unable to operate in water above 20°C due to enzyme denaturation.',
            'Warm water reverses the counter-current blood flow in gill filaments.',
            'Elevated temperature causes water to become hypertonic to the fish body fluids.',
          ],
          correctIndex: 0,
          rationale: 'Gas solubility in water decreases as temperature rises. Simultaneously, fish are poikilotherms whose metabolic rate doubles with every 10°C rise (Q10 rule), forcing them to seek more oxygenated surface water.',
          syllabusSkill: 'Scientific Inquiry & Environmental Adaptation',
        },
        {
          id: 'q-ug-2',
          question: 'During a classroom demonstration, a bell jar with two balloons attached to a Y-tube and a rubber sheet base is used. When the rubber sheet is pulled downward, the balloons inflate. Which human organ does the rubber sheet represent?',
          options: [
            'The intercostal muscles.',
            'The diaphragm.',
            'The pleural membrane.',
            'The bronchial tree.',
          ],
          correctIndex: 1,
          rationale: 'The rubber sheet models the diaphragm. Pulling it downward increases the internal volume of the jar, lowering internal air pressure and causing air to rush into the balloons (lungs).',
          syllabusSkill: 'Model Analysis & Physiological Representation',
        },
        {
          id: 'q-ug-3',
          question: 'In the treatment of Tuberculosis in Uganda, the Ministry of Health enforces the DOTS (Directly Observed Therapy, Short-course) protocol. Why is completing the full 6-month antibiotic regimen mandatory even if symptoms disappear after 3 weeks?',
          options: [
            'To prevent surviving latent Mycobacterium tuberculosis bacteria from developing Multi-Drug Resistance (MDR-TB).',
            'Because the antibiotics only begin functioning after 90 days in the bloodstream.',
            'To replace the natural gut microbiome with laboratory-engineered flora.',
            'To build hereditary genetic immunity for the patient’s future children.',
          ],
          correctIndex: 0,
          rationale: 'Premature cessation leaves the hardiest bacterial sub-populations alive, which rapidly multiply into antibiotic-resistant strains (MDR-TB and XDR-TB) requiring costly secondary treatments.',
          syllabusSkill: 'Community Health & Pharmacology Application',
        },
      ],
      practiceTest: {
        title: 'Uganda NLSC Assessment: Activity of Integration on Respiratory Health & Environment',
        timeAllottedMinutes: 25,
        mcqs: [
          {
            id: 'pt-ug-1',
            question: 'Which of the following blood vessels carries blood with the highest concentration of oxygen in the human respiratory-circulatory circuit?',
            options: [
              'Pulmonary artery leaving the right ventricle.',
              'Pulmonary vein entering the left atrium.',
              'Superior vena cava entering the right atrium.',
              'Hepatic portal vein entering the liver.',
            ],
            correctIndex: 1,
            rationale: 'The pulmonary vein carries freshly oxygenated blood from the alveolar capillary beds of the lungs directly to the left atrium of the heart.',
            syllabusSkill: 'Circulatory & Respiratory Integration',
          },
          {
            id: 'pt-ug-2',
            question: 'How do insect spiracles and tracheae differ fundamentally from mammalian lungs in transporting oxygen to body tissues?',
            options: [
              'Insects dissolve oxygen in hemoglobin within their hemolymph.',
              'Tracheae deliver gaseous oxygen directly to individual body cells without using a blood circulatory system.',
              'Insects rely on counter-current exchange across external gill flaps.',
              'Insect spiracles absorb oxygen by active endocytosis.',
            ],
            correctIndex: 1,
            rationale: 'The tracheal system delivers air directly to target tissues via microscopic tracheoles; their hemolymph does not carry respiratory pigments.',
            syllabusSkill: 'Comparative Physiology',
          },
        ],
        frq: {
          stimulusOrPrompt:
            'CONTEXT (Uganda NLSC Activity of Integration):\nIn a trading center in Wakiso District, many families cook inside unventilated single-room houses using charcoal stoves. Local clinic health reports show a high prevalence of chronic bronchitis among women and pneumonia among toddlers under 5 years. Furthermore, a nearby swamp where tilapia are farmed is experiencing sewage pollution that causes fish deaths.\n\nTASK:\nAs a Senior 3 Biology learner assigned to the Community Health & Environment Outreach Committee, analyze the biological causes of these respiratory issues and provide actionable recommendations.',
          questions: [
            {
              part: 'Part A',
              prompt: 'Explain the physiological mechanism by which continuous inhalation of biomass smoke damages the human respiratory tract and predisposes children to pneumonia.',
              points: 2,
              rubricCriteria: [
                '1 pt: Explains that smoke particulates paralyze or destroy respiratory cilia and trigger excessive mucus secretion.',
                '1 pt: Explains that trapped pathogens in stagnant mucus cannot be cleared, permitting bacterial colonisation of alveoli.',
              ],
            },
            {
              part: 'Part B',
              prompt: 'Explain why sewage pollution into the fish swamp leads to mass Tilapia suffocation, making reference to gill structure and water dissolved oxygen levels.',
              points: 2,
              rubricCriteria: [
                '1 pt: Explains that organic waste stimulates rapid aerobic bacterial decomposition (eutrophication), depleting dissolved oxygen in water.',
                '1 pt: Explains that suspended sludge clogs delicate gill lamellae, reducing the surface area available for counter-current diffusion.',
              ],
            },
          ],
          scoringGuide:
            'Total 4 points. Evaluated against UNEB Competence Descriptors: Score 3 (Outstanding Mastery), Score 2 (Moderate Competence), Score 1 (Basic Attempt).',
          sampleHighScoringResponse:
            'Part A: Continuous exposure to indoor biomass smoke damages the ciliated columnar epithelium lining the trachea and bronchioles. Fine particulates paralyze the cilia while stimulating goblet cells to hyper-secrete mucus. Because the mucociliary escalator fails, pathogen-laden mucus accumulates in the bronchial tree. Opportunistic bacteria (such as Streptococcus pneumoniae) migrate downward into the delicate alveoli, causing fluid accumulation and inflammatory consolidation (pneumonia).\n\nPart B: When untreated sewage enters the fish swamp, aerobic decomposer microorganisms multiply exponentially, consuming dissolved oxygen during biological decomposition. As aquatic dissolved oxygen plummets, Tilapia cannot extract sufficient oxygen even via counter-current flow. Additionally, particulate sewage sludge physically coats and clogs the microscopic gill lamellae, blocking water flow and drastically reducing the effective surface area for gaseous diffusion.',
        },
      },
    };

    setSavedKits([ugandaKit]);
    setActiveKitId(ugandaKit.id);
    setCurrentTrackId(ugandaKit.examTrack);
    localStorage.setItem('syllabus_ai_kits_v2', JSON.stringify([ugandaKit]));
  };

  const handleGenerateStudyKit = async (data: {
    title: string;
    content: string;
    examTrack: ExamTrackId;
    unitTopic: string;
  }) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/study-kit/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          examTrack: data.examTrack,
          unitTopic: data.unitTopic,
          studyGoal: 'comprehensive',
        }),
      });

      if (!res.ok) {
        throw new Error('Server error generating curriculum study kit.');
      }

      const result = await res.json();
      const generated = result.studyKit;

      const newKit: StudyKit = {
        id: `kit-${Date.now()}`,
        title: data.title,
        createdAt: new Date().toISOString(),
        examTrack: data.examTrack,
        unitTopic: data.unitTopic,
        rawNotesSnippet: data.content,
        curriculumMeta: generated.curriculumMeta || {
          examTrack: data.examTrack,
          standardCode: `${data.examTrack} Module`,
          recommendedTimeMinutes: 30,
          unitAlignment: data.unitTopic,
        },
        explanation: generated.explanation,
        flashcards: generated.flashcards,
        quiz: generated.quiz,
        practiceTest: generated.practiceTest,
      };

      const updatedKits = [newKit, ...savedKits];
      setSavedKits(updatedKits);
      setActiveKitId(newKit.id);
      setCurrentTrackId(data.examTrack);
      localStorage.setItem('syllabus_ai_kits_v2', JSON.stringify(updatedKits));

      setSubscription((prev) => ({
        ...prev,
        uploadsUsedThisWeek: prev.uploadsUsedThisWeek + 1,
      }));

      setActiveTab('explanation');
    } finally {
      setIsGenerating(false);
    }
  };

  const activeKit = savedKits.find((k) => k.id === activeKitId) || savedKits[0];

  const handleDeleteKit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedKits.filter((k) => k.id !== id);
    setSavedKits(updated);
    localStorage.setItem('syllabus_ai_kits_v2', JSON.stringify(updated));
    if (activeKitId === id && updated.length > 0) {
      setActiveKitId(updated[0].id);
      setCurrentTrackId(updated[0].examTrack);
    }
  };

  const handleUpgradeToPro = (tier: 'pro' | 'school') => {
    setSubscription({
      isPro: true,
      tier,
      uploadsUsedThisWeek: 1,
      uploadLimit: 9999,
      frqGradesUsed: 0,
      frqLimit: 9999,
      renewalDate: '2027-09-23',
    });
  };

  const handleToggleFree = () => {
    setSubscription({
      isPro: false,
      tier: 'free',
      uploadsUsedThisWeek: 2,
      uploadLimit: 3,
      frqGradesUsed: 0,
      frqLimit: 1,
    });
  };

  const handleRecordFRQGrade = () => {
    setSubscription((prev) => ({
      ...prev,
      frqGradesUsed: prev.frqGradesUsed + 1,
    }));
  };

  const handleSelectBrandName = (name: string, tagline?: string) => {
    setBrandName(name);
    localStorage.setItem('syllabus_ai_brand_name', name);
    if (tagline) {
      setBrandTagline(tagline);
      localStorage.setItem('syllabus_ai_brand_tagline', tagline);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar with Brand Name Lab */}
      <Navbar
        currentTrackId={currentTrackId}
        onSelectTrack={(track) => {
          setCurrentTrackId(track);
          const matchingKit = savedKits.find((k) => k.examTrack === track);
          if (matchingKit) {
            setActiveKitId(matchingKit.id);
          }
        }}
        subscription={subscription}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenBrandModal={() => setIsBrandModalOpen(true)}
        brandName={brandName}
        brandTagline={brandTagline}
        savedKitsCount={savedKits.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Kit Navigation & Fast Preset Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          {/* Active Kit Selector / Breadcrumb */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0">
            <div className="text-xs text-slate-400 flex items-center gap-1.5 flex-shrink-0 font-medium">
              <FolderOpen className="w-4 h-4 text-indigo-400" />
              <span>Study Sets:</span>
            </div>

            <div className="flex items-center gap-1.5">
              {savedKits.map((kit) => (
                <div
                  key={kit.id}
                  onClick={() => {
                    setActiveKitId(kit.id);
                    setCurrentTrackId(kit.examTrack);
                  }}
                  className={`group px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition flex items-center gap-2 whitespace-nowrap border ${
                    kit.id === activeKit?.id
                      ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/40 font-semibold'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="truncate max-w-[170px]">{kit.title}</span>
                  {savedKits.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteKit(kit.id, e)}
                      className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-0.5 rounded transition"
                      title="Remove set"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-indigo-400 text-xs rounded-lg flex items-center gap-1 transition"
                title="Add new notes"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Notes</span>
              </button>
            </div>
          </div>

          {/* Core Feature Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('explanation')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'explanation'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explanation & Traps</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Active Flashcards ({activeKit?.flashcards?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Quiz ({activeKit?.quiz?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('test')}
              className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'test'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>
                {activeKit?.examTrack?.startsWith('UG_') ? 'UNEB Activity Exam' : 'FRQ Rubric Exam'}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        {activeKit && (
          <div>
            {activeTab === 'explanation' && (
              <ExplanationTab
                explanation={activeKit.explanation}
                curriculumMeta={activeKit.curriculumMeta}
                title={activeKit.title}
                onOpenTutor={() => setIsTutorOpen(true)}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsTab
                flashcards={activeKit.flashcards}
                subscription={subscription}
                onOpenSubscription={() => setIsSubscriptionOpen(true)}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizTab
                quiz={activeKit.quiz}
                topicTitle={activeKit.title}
              />
            )}

            {activeTab === 'test' && (
              <PracticeTestTab
                practiceTest={activeKit.practiceTest}
                examTrack={activeKit.examTrack}
                subscription={subscription}
                onOpenSubscription={() => setIsSubscriptionOpen(true)}
                onRecordFRQGrade={handleRecordFRQGrade}
              />
            )}
          </div>
        )}
      </main>

      {/* Socratic AI Tutor Drawer */}
      {activeKit && (
        <TutorDrawer
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          examTrack={activeKit.examTrack}
          topicTitle={activeKit.title}
          noteContext={activeKit.rawNotesSnippet}
        />
      )}

      {/* Upload Notes Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentTrackId={currentTrackId}
        subscription={subscription}
        onGenerate={handleGenerateStudyKit}
        onOpenSubscription={() => {
          setIsUploadOpen(false);
          setIsSubscriptionOpen(true);
        }}
        isGenerating={isGenerating}
      />

      {/* Brand Name Development Studio Modal */}
      <BrandNameModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        currentBrandName={brandName}
        onSelectBrandName={handleSelectBrandName}
      />

      {/* Freemium & Pro Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        subscription={subscription}
        onUpgradeToPro={handleUpgradeToPro}
        onToggleFree={handleToggleFree}
      />
    </div>
  );
}
