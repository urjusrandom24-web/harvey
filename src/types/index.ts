export type CurriculumRegion = 
  | 'UGANDA'
  | 'AFRICA_REGIONAL'
  | 'CAMBRIDGE_UK'
  | 'IB_DIPLOMA'
  | 'US_COLLEGEBOARD';

export type ExamTrackId =
  // Uganda New Lower Secondary Curriculum (NLSC / NCDC / UNEB)
  | 'UG_NLSC_BIOLOGY'
  | 'UG_NLSC_CHEMISTRY'
  | 'UG_NLSC_PHYSICS'
  | 'UG_NLSC_MATHEMATICS'
  | 'UG_NLSC_GEOGRAPHY'
  | 'UG_NLSC_HISTORY_POLITICAL'
  | 'UG_NLSC_AGRICULTURE'
  | 'UG_NLSC_ENTREPRENEURSHIP'
  | 'UG_NLSC_ICT'
  | 'UG_NLSC_ENGLISH_LITERATURE'
  | 'UG_NLSC_CRE'
  | 'UG_UACE_BIOLOGY'
  | 'UG_UACE_CHEMISTRY'
  | 'UG_UACE_ECONOMICS'
  // Regional African Curriculums
  | 'KE_CBC_INTEGRATED_SCIENCE'
  | 'WAEC_WASSCE_BIOLOGY'
  | 'WAEC_WASSCE_ECONOMICS'
  // International Cambridge IGCSE & A-Levels
  | 'CAMBRIDGE_IGCSE_BIOLOGY'
  | 'CAMBRIDGE_IGCSE_CHEMISTRY'
  | 'CAMBRIDGE_IGCSE_PHYSICS'
  | 'CAMBRIDGE_A_LEVEL_MATH'
  // International Baccalaureate (IB)
  | 'IB_BIOLOGY_HL'
  | 'IB_CHEMISTRY_HL'
  | 'IB_HISTORY_HL'
  // US & Global AP (College Board)
  | 'AP_BIOLOGY'
  | 'AP_PSYCHOLOGY'
  | 'AP_US_HISTORY'
  | 'AP_CHEMISTRY'
  | 'AP_CALCULUS_BC';

export interface ExamTrackInfo {
  id: ExamTrackId;
  name: string;
  shortName: string;
  board: string;
  country: string;
  region: CurriculumRegion;
  iconName: string;
  primaryColor: string;
  scoringScale: string;
  syllabusUnits: string[];
  description: string;
  competencyFocus?: string;
}

export interface KeyPrinciple {
  title: string;
  explanation: string;
  examRelevance: string;
}

export interface RubricWatchlist {
  commonMistake: string;
  correctApproach: string;
  examinerNote: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
  examContext: string;
}

export interface ExplanationData {
  overview: string;
  coreConcepts: KeyPrinciple[];
  rubricWatchlist: RubricWatchlist[];
  memoryAnchor: string;
  keyTerms: KeyTerm[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syllabusTag: string;
  rating?: 'hard' | 'good' | 'easy';
}

export interface QuizQuestion {
  id: string;
  question: string;
  stimulus?: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  syllabusSkill: string;
}

export interface PracticeTestMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  syllabusSkill: string;
}

export interface FRQPart {
  part: string;
  prompt: string;
  points: number;
  rubricCriteria: string[];
}

export interface PracticeTestFRQ {
  stimulusOrPrompt: string;
  questions: FRQPart[];
  scoringGuide: string;
  sampleHighScoringResponse: string;
}

export interface PracticeTestData {
  title: string;
  timeAllottedMinutes: number;
  mcqs: PracticeTestMCQ[];
  frq: PracticeTestFRQ;
}

export interface CurriculumMeta {
  examTrack: string;
  standardCode: string;
  recommendedTimeMinutes: number;
  unitAlignment: string;
  focusTakeaway?: string;
}

export interface StudyKit {
  id: string;
  title: string;
  createdAt: string;
  examTrack: ExamTrackId;
  unitTopic: string;
  rawNotesSnippet: string;
  curriculumMeta: CurriculumMeta;
  explanation: ExplanationData;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  practiceTest: PracticeTestData;
}

export interface FRQCriterionFeedback {
  criterion: string;
  earned: boolean;
  comment: string;
}

export interface FRQGradingResult {
  score: number;
  maxPoints: number;
  predictedScoreBand: string;
  criteriaFeedback: FRQCriterionFeedback[];
  strengths: string[];
  actionableImprovements: string[];
  revisedExemplar: string;
}

export interface SubscriptionStatus {
  isPro: boolean;
  tier: 'free' | 'pro' | 'school';
  uploadsUsedThisWeek: number;
  uploadLimit: number;
  frqGradesUsed: number;
  frqLimit: number;
  renewalDate?: string;
}
