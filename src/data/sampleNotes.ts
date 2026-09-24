import { ExamTrackInfo, ExamTrackId } from '../types';

export const EXAM_TRACKS: ExamTrackInfo[] = [
  // ==========================================
  // UGANDA: NEW LOWER SECONDARY CURRICULUM (NLSC / NCDC / UNEB)
  // ==========================================
  {
    id: 'UG_NLSC_BIOLOGY',
    name: 'Uganda NLSC: Biology & Health Sciences',
    shortName: 'Biology (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Dna',
    primaryColor: 'emerald',
    scoringScale: 'Competency Descriptor (Scores 1-3 & Scores out of 10 / 20 / 80)',
    syllabusUnits: [
      'Theme 1: Diversity of Living Things & Classification',
      'Theme 2: Cell Structure & Organization',
      'Theme 3: Nutrition in Plants & Animals',
      'Theme 4: Transport of Materials in Organisms',
      'Theme 5: Gaseous Exchange & Respiration',
      'Theme 6: Excretion & Homeostasis in Organisms',
      'Theme 7: Coordination & Response (Nervous & Endocrine)',
      'Theme 8: Locomotion & Support',
      'Theme 9: Reproduction, Growth & Development',
      'Theme 10: Genetics & Evolution',
      'Theme 11: Ecology & Environmental Conservation',
      'Theme 12: Health, Hygiene & Disease Control',
    ],
    description: 'New competence-based lower secondary curriculum emphasizing practical inquiry, disease prevention, local ecosystems, and activity of integration.',
    competencyFocus: 'Activity of Integration, Scientific Process Skills, Ecological Stewardship, and Practical Health Applications.',
  },
  {
    id: 'UG_NLSC_CHEMISTRY',
    name: 'Uganda NLSC: Chemistry',
    shortName: 'Chemistry (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'FlaskConical',
    primaryColor: 'cyan',
    scoringScale: 'Competency Descriptor (Scores 1-3 & Activity of Integration)',
    syllabusUnits: [
      'Theme 1: Chemistry & Society (Safe Laboratory Practice)',
      'Theme 2: Nature & States of Matter (Particulate Theory)',
      'Theme 3: Elements, Compounds & Mixtures (Separation Techniques)',
      'Theme 4: Atomic Structure & The Periodic Table',
      'Theme 5: Chemical Bonding & Formula Writing',
      'Theme 6: Acids, Bases, Salts & Soil pH Applications',
      'Theme 7: Carbon & Its Compounds in Everyday Life',
      'Theme 8: Rates of Reactions & Energy Changes',
      'Theme 9: Metals: Occurrence, Extraction & Reactivity Series',
      'Theme 10: Chemistry of the Atmosphere & Environmental Pollution',
    ],
    description: 'Practical inquiry into chemical phenomena, local industrial extraction (limestone, iron), environmental sustainability, and consumer products.',
    competencyFocus: 'Real-world problem solving, qualitative analysis, and value addition from local mineral/chemical resources.',
  },
  {
    id: 'UG_NLSC_PHYSICS',
    name: 'Uganda NLSC: Physics',
    shortName: 'Physics (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Zap',
    primaryColor: 'amber',
    scoringScale: 'Competency Descriptor (Scores 1-3 & UNEB UCE Paper)',
    syllabusUnits: [
      'Theme 1: Measurements & Physical Quantities',
      'Theme 2: Mechanics: Force, Motion, Vectors & Pressure',
      'Theme 3: Work, Energy, Power & Renewable Energy Sources',
      'Theme 4: Thermal Physics, Heat Transfer & Thermal Expansion',
      'Theme 5: Light & Optics (Reflection, Refraction & Optical Instruments)',
      'Theme 6: Waves, Sound & Vibrations',
      'Theme 7: Electrostatics, Current Electricity & Domestic Wiring',
      'Theme 8: Magnetism & Electromagnetism (Dynamos & Motors)',
      'Theme 9: Introductory Electronics & Telecommunications',
    ],
    description: 'Hands-on exploration of mechanical systems, solar energy, electrical circuit safety, and everyday technology in Uganda.',
    competencyFocus: 'Apparatus fabrication, electrical safety, energy efficiency, and mathematical physics modeling.',
  },
  {
    id: 'UG_NLSC_MATHEMATICS',
    name: 'Uganda NLSC: Mathematics',
    shortName: 'Mathematics (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Calculator',
    primaryColor: 'blue',
    scoringScale: 'Competency Scores (Numerical Analysis & Modeling)',
    syllabusUnits: [
      'Theme 1: Number Patterns, Sequences & Real Numbers',
      'Theme 2: Commercial Arithmetic: Interest, Hire Purchase & URA Taxation',
      'Theme 3: Algebraic Expressions, Equations & Inequalities',
      'Theme 4: Coordinate Geometry, Angles, Bearings & Mensuration',
      'Theme 5: Trigonometry & Circle Properties',
      'Theme 6: Vectors & Matrices in 2D Space',
      'Theme 7: Data Collection, Statistics & Probability Distributions',
      'Theme 8: Geometric Transformations & Linear Programming',
    ],
    description: 'Competence-focused mathematics connecting algebraic logic to agribusiness planning, budget forecasting, and geometric designs.',
    competencyFocus: 'Real-life problem modeling, financial calculation, and geometric spatial awareness.',
  },
  {
    id: 'UG_NLSC_GEOGRAPHY',
    name: 'Uganda NLSC: Geography',
    shortName: 'Geography (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Globe',
    primaryColor: 'teal',
    scoringScale: 'Competency Descriptor (Item-Based Criterion)',
    syllabusUnits: [
      'Theme 1: Map Reading, Grid References & Aerial Photo Interpretation',
      'Theme 2: Fieldwork Techniques & Local Community Inquiry',
      'Theme 3: Physical Geography of Uganda & East Africa (Relief & Drainage)',
      'Theme 4: Weather & Climate Systems of East Africa',
      'Theme 5: Vegetation Zones, Forestry & Wildlife Conservation',
      'Theme 6: Agriculture & Livestock Farming in Uganda',
      'Theme 7: Mining, Industrialization & Energy Resources in East Africa',
      'Theme 8: Population Dynamics, Settlement & Urbanization in Uganda',
      'Theme 9: Environmental Degradation, Climate Change & Mitigation',
    ],
    description: 'Fieldwork-driven study of Ugandan landscapes, Lake Victoria basin, Albertine Rift resources, and sustainable urbanization.',
    competencyFocus: 'Fieldwork reporting, map work interpretation, and natural resource conservation planning.',
  },
  {
    id: 'UG_NLSC_HISTORY_POLITICAL',
    name: 'Uganda NLSC: History & Political Education',
    shortName: 'History & Politics (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Landmark',
    primaryColor: 'yellow',
    scoringScale: 'Competency Scores (Critical Historical Inquiry)',
    syllabusUnits: [
      'Theme 1: Origin & Migration of the People of Uganda & East Africa',
      'Theme 2: Pre-Colonial Social, Political & Economic Systems (Buganda, Bunyoro, Ankole, Acholi)',
      'Theme 3: Long-Distance Trade & Introduction of Foreign Religions in East Africa',
      'Theme 4: Scramble, Partition & Colonial Conquest of Uganda',
      'Theme 5: Collaboration & Resistance to Colonial Rule (Kabelega, Mwanga, Kakungulu)',
      'Theme 6: Nationalism & the Struggle for Independence in Uganda & East Africa',
      'Theme 7: Post-Independence Governance, Political Instability & Constitutionalism',
      'Theme 8: Citizenship, Human Rights, Democracy & Rule of Law',
      'Theme 9: Regional Integration: East African Community (EAC) & African Union (AU)',
    ],
    description: 'Deep engagement with African identity, pre-colonial heritage, democratic citizenship, and East African socio-political development.',
    competencyFocus: 'Historical document analysis, civic responsibility, constitutional literacy, and peaceful conflict resolution.',
  },
  {
    id: 'UG_NLSC_AGRICULTURE',
    name: 'Uganda NLSC: Agriculture',
    shortName: 'Agriculture (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Sprout',
    primaryColor: 'emerald',
    scoringScale: 'Competency Descriptor (Practical Agribusiness Assessment)',
    syllabusUnits: [
      'Theme 1: Soil Science, Fertility & Soil Conservation in Uganda',
      'Theme 2: Crop Production: Staple Crops (Matooke, Cassava, Maize, Coffee)',
      'Theme 3: Crop Protection: Weeds, Pests & Disease Management',
      'Theme 4: Livestock Production: Dairy, Poultry, Piggery & Aquaculture',
      'Theme 5: Animal Health & Parasite Control',
      'Theme 6: Farm Structures, Simple Implements & Irrigation Technology',
      'Theme 7: Agribusiness, Value Addition, Post-Harvest Handling & Marketing',
    ],
    description: 'Modern agricultural methods, sustainable farming, organic fertilizers, and commercial agribusiness value addition in Uganda.',
    competencyFocus: 'Practical enterprise project, value addition, soil fertility testing, and agribusiness profitability.',
  },
  {
    id: 'UG_NLSC_ENTREPRENEURSHIP',
    name: 'Uganda NLSC: Entrepreneurship & Business',
    shortName: 'Entrepreneurship (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'TrendingUp',
    primaryColor: 'indigo',
    scoringScale: 'Competency Descriptor (Business Pitch & Financial Records)',
    syllabusUnits: [
      'Theme 1: Entrepreneurship Concept & Personal Entrepreneurial Characteristics',
      'Theme 2: Business Opportunity Identification & Market Research in Uganda',
      'Theme 3: Business Planning & Generating a Bankable Business Plan',
      'Theme 4: Financial Literacy: Personal Budgeting, Savings & Investment',
      'Theme 5: Basic Bookkeeping, Cash Books & Financial Statements',
      'Theme 6: Legal Forms of Business & Registration with URSB & Local Councils',
      'Theme 7: Taxation in Uganda: URA VAT, Income Tax & Local Licenses',
      'Theme 8: Marketing Strategies, Customer Relations & Business Ethics',
    ],
    description: 'Enterprise creation, business plan formulation, bookkeeping, and regulatory compliance within the Ugandan economic landscape.',
    competencyFocus: 'Mini-enterprise creation, financial ledger balancing, and viable commercial ideation.',
  },
  {
    id: 'UG_NLSC_ICT',
    name: 'Uganda NLSC: Information & Communications Technology (ICT)',
    shortName: 'ICT (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Laptop',
    primaryColor: 'sky',
    scoringScale: 'Competency Descriptor (Practical Digital Portfolio)',
    syllabusUnits: [
      'Theme 1: Introduction to Computer Systems & Hardware Architecture',
      'Theme 2: Operating Systems & File Management',
      'Theme 3: Word Processing for Professional Documentation',
      'Theme 4: Electronic Spreadsheets for Data Analysis & Mathematical Modeling',
      'Theme 5: Digital Presentation Tools & Graphic Media',
      'Theme 6: Internet, Email, Web Browsing & Search Engine Strategies',
      'Theme 7: Website Design Fundamentals (HTML/CSS & CMS Platforms)',
      'Theme 8: Programming Logic, Algorithms & Python / Scratch Basics',
      'Theme 9: Cybersecurity, Data Privacy & Ethical Computing in Uganda',
    ],
    description: 'Practical digital literacy, spreadsheet calculation, algorithmic logic, and safe internet usage tailored to modern African industry.',
    competencyFocus: 'Spreadsheet formulas, digital artifact design, cyber safety, and coding fundamentals.',
  },
  {
    id: 'UG_NLSC_ENGLISH_LITERATURE',
    name: 'Uganda NLSC: English Language & Literature in English',
    shortName: 'English & Literature (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Book',
    primaryColor: 'violet',
    scoringScale: 'Competency Scores (Communicative Competency)',
    syllabusUnits: [
      'Theme 1: Functional Writing: Official Letters, Minutes, Reports & Curricula Vitae',
      'Theme 2: Reading Comprehension, Summarizing & Synthesis Skills',
      'Theme 3: Grammatical Structures, Sentence Variety & Mechanics of Writing',
      'Theme 4: Oral Literature: Folk Tales, Proverbs, Riddles & Cultural Poetry',
      'Theme 5: African Prose & Novels (Thematic Analysis & Character Development)',
      'Theme 6: Drama & Play Analysis (Plot, Conflict & Stage Conventions)',
      'Theme 7: Poetry Analysis (Diction, Tone, Imagery & Poetic Devices)',
    ],
    description: 'Communicative fluency, functional workplace communication, critical text comprehension, and African literary appreciation.',
    competencyFocus: 'Formal correspondence, thematic essay composition, and literary critique.',
  },
  {
    id: 'UG_NLSC_CRE',
    name: 'Uganda NLSC: Christian Religious Education (CRE)',
    shortName: 'CRE (NLSC)',
    board: 'UNEB / NCDC',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Cross',
    primaryColor: 'rose',
    scoringScale: 'Competency Scores (Moral & Ethical Reflection)',
    syllabusUnits: [
      'Theme 1: God, Creation & Stewardship of the Environment',
      'Theme 2: The Family, Community & Changing Social Patterns in Uganda',
      'Theme 3: Social Justice, Integrity & Anti-Corruption in Public Life',
      'Theme 4: The Ministry, Parables & Sacrificial Life of Jesus Christ',
      'Theme 5: Christian Living in a Diverse Contemporary Society',
    ],
    description: 'Values-based ethical education, character formation, scripture analysis, and community service in Uganda.',
    competencyFocus: 'Moral discernment, social justice analysis, and compassionate leadership.',
  },
  {
    id: 'UG_UACE_BIOLOGY',
    name: 'Uganda UACE: Biology (P530 A-Level)',
    shortName: 'A-Level Biology (UACE)',
    board: 'UNEB UACE',
    country: 'Uganda',
    region: 'UGANDA',
    iconName: 'Microscope',
    primaryColor: 'emerald',
    scoringScale: 'Grade A to F (Principal Pass System)',
    syllabusUnits: [
      'Unit 1: Cytology, Cell Ultrastructure & Macromolecular Biochemistry',
      'Unit 2: Plant Water Relations, Translocation & Transpiration',
      'Unit 3: Animal Physiology: Digestion, Gas Exchange & Circulatory Systems',
      'Unit 4: Homeostasis, Osmoregulation & Thermoregulation',
      'Unit 5: Nervous & Chemical Coordination, Sensory Receptors & Muscle Action',
      'Unit 6: Molecular Genetics, DNA Replication, Protein Synthesis & Gene Tech',
      'Unit 7: Population Ecology, Energy Flow & Biospheric Biomes',
      'Unit 8: Evolutionary Biology & Speciation Mechanisms',
    ],
    description: 'Advanced Level principal biology for university pre-med, pharmacy, and biological sciences entrance in Uganda.',
    competencyFocus: 'Detailed mechanistic essays, practical dissection, microscopy, and physiological biochemistry.',
  },

  // ==========================================
  // REGIONAL AFRICA (KENYA CBC & WEST AFRICA WAEC)
  // ==========================================
  {
    id: 'KE_CBC_INTEGRATED_SCIENCE',
    name: 'Kenya CBC: Integrated Science (Junior Secondary)',
    shortName: 'Kenya CBC Science',
    board: 'KNEC / KICD',
    country: 'Kenya',
    region: 'AFRICA_REGIONAL',
    iconName: 'Sparkles',
    primaryColor: 'emerald',
    scoringScale: 'Level 1 to 4 (Exceeding Expectations)',
    syllabusUnits: [
      'Strand 1: Living Things and Their Environment',
      'Strand 2: Matter and Its Transformations',
      'Strand 3: Energy, Forces and Simple Machines',
      'Strand 4: Earth, Space and Environmental Sustainability',
    ],
    description: 'Kenya competency-based curriculum emphasizing inquiry, experimentation, and indigenous knowledge.',
  },
  {
    id: 'WAEC_WASSCE_BIOLOGY',
    name: 'West Africa WAEC / WASSCE: Biology',
    shortName: 'WAEC Biology',
    board: 'WAEC',
    country: 'Nigeria & West Africa',
    region: 'AFRICA_REGIONAL',
    iconName: 'Dna',
    primaryColor: 'green',
    scoringScale: 'Grades A1 to F9',
    syllabusUnits: [
      'Section A: Organization of Life & Cell Structure',
      'Section B: Plant & Animal Nutrition, Transport & Respiration',
      'Section C: Excretion, Homeostasis & Reproduction',
      'Section D: Ecology, Energy Flow & Habitats',
      'Section E: Genetics, Heredity & Evolution',
    ],
    description: 'Standard West African examination syllabus for Senior Secondary School students across Nigeria, Ghana, and Sierra Leone.',
  },
  {
    id: 'WAEC_WASSCE_ECONOMICS',
    name: 'West Africa WAEC / WASSCE: Economics',
    shortName: 'WAEC Economics',
    board: 'WAEC',
    country: 'Nigeria & West Africa',
    region: 'AFRICA_REGIONAL',
    iconName: 'TrendingUp',
    primaryColor: 'amber',
    scoringScale: 'Grades A1 to F9',
    syllabusUnits: [
      'Unit 1: Scarcity, Choice, Scale of Preference & Opportunity Cost',
      'Unit 2: Theory of Consumer Behavior, Demand & Supply Dynamics',
      'Unit 3: Production, Cost Concepts & Market Structures',
      'Unit 4: National Income Accounting & Inflation',
      'Unit 5: Public Finance, Taxation & Fiscal Policy',
      'Unit 6: International Trade, Balance of Payments & African Trade Agreements',
    ],
    description: 'Analytical economics emphasizing developing economies, resource allocation, and macroeconomic stabilization.',
  },

  // ==========================================
  // CAMBRIDGE INTERNATIONAL (IGCSE & A-LEVELS)
  // ==========================================
  {
    id: 'CAMBRIDGE_IGCSE_BIOLOGY',
    name: 'Cambridge IGCSE: Biology (0610 / 0970)',
    shortName: 'Cambridge IGCSE Bio',
    board: 'Cambridge Assessment (CAIE)',
    country: 'International / UK',
    region: 'CAMBRIDGE_UK',
    iconName: 'Dna',
    primaryColor: 'teal',
    scoringScale: 'Grades A* to G (or 9-1)',
    syllabusUnits: [
      'Topic 1: Characteristics & Classification of Living Organisms',
      'Topic 2: Organization of the Organism & Cell Structure',
      'Topic 3: Movement into and out of Cells (Osmosis, Active Transport)',
      'Topic 4: Biological Molecules & Enzymes',
      'Topic 5: Plant Nutrition & Photosynthesis',
      'Topic 6: Human Nutrition, Transport & Gas Exchange',
      'Topic 7: Diseases, Immunity & Drugs',
      'Topic 8: Reproduction & Inheritance',
      'Topic 9: Ecosystems, Human Influences & Biotechnology',
    ],
    description: 'Rigorous international curriculum emphasizing experimental skills, command words, and global environmental issues.',
  },
  {
    id: 'CAMBRIDGE_IGCSE_CHEMISTRY',
    name: 'Cambridge IGCSE: Chemistry (0620 / 0971)',
    shortName: 'Cambridge IGCSE Chem',
    board: 'Cambridge Assessment (CAIE)',
    country: 'International / UK',
    region: 'CAMBRIDGE_UK',
    iconName: 'FlaskConical',
    primaryColor: 'cyan',
    scoringScale: 'Grades A* to G (or 9-1)',
    syllabusUnits: [
      'Topic 1: States of Matter & Separation Techniques',
      'Topic 2: Atoms, Elements, Compounds & Stoichiometry',
      'Topic 3: Electrochemistry, Chemical Energetics & Reaction Rates',
      'Topic 4: Acids, Bases, Salts & The Periodic Table',
      'Topic 5: Metals & Chemical Extraction',
      'Topic 6: Organic Chemistry: Alkanes, Alkenes, Alcohols & Polymers',
    ],
    description: 'Global benchmark for foundational chemistry with practical test papers and analytical stoichiometry.',
  },
  {
    id: 'CAMBRIDGE_A_LEVEL_MATH',
    name: 'Cambridge International A-Level: Mathematics (9709)',
    shortName: 'Cambridge A-Level Math',
    board: 'Cambridge Assessment (CAIE)',
    country: 'International / UK',
    region: 'CAMBRIDGE_UK',
    iconName: 'Calculator',
    primaryColor: 'blue',
    scoringScale: 'Grades A* to E',
    syllabusUnits: [
      'Paper 1: Pure Mathematics 1 (Quadratics, Functions, Differentiation, Integration)',
      'Paper 3: Pure Mathematics 3 (Logarithms, Trigonometry, Complex Numbers, Differential Eq)',
      'Paper 4: Mechanics (Forces, Kinematics, Newton’s Laws, Energy)',
      'Paper 5: Probability & Statistics 1 (Discrete Random Variables, Normal Dist)',
    ],
    description: 'Premier pre-university mathematics qualification recognized worldwide for STEM degrees.',
  },

  // ==========================================
  // INTERNATIONAL BACCALAUREATE (IB DIPLOMA)
  // ==========================================
  {
    id: 'IB_BIOLOGY_HL',
    name: 'IB Diploma: Biology Higher Level (HL)',
    shortName: 'IB Biology HL',
    board: 'International Baccalaureate',
    country: 'International (Geneva)',
    region: 'IB_DIPLOMA',
    iconName: 'Microscope',
    primaryColor: 'rose',
    scoringScale: 'Grades 1 to 7',
    syllabusUnits: [
      'Theme A: Unity and Diversity (Cell Theory, Evolutionary Origins)',
      'Theme B: Biomolecules (Carbohydrates, Lipids, Nucleic Acids, Enzymes)',
      'Theme C: Interaction & Interdependence (Ecology, Neural Signaling)',
      'Theme D: Continuity & Change (Genetics, Gene Expression, Epigenetics)',
      'Experimental Programme: Scientific Inquiry & Data Analysis',
    ],
    description: 'Holistic, concept-driven diploma syllabus emphasizing inquiry, Nature of Science (NOS), and synoptic connections.',
  },
  {
    id: 'IB_CHEMISTRY_HL',
    name: 'IB Diploma: Chemistry Higher Level (HL)',
    shortName: 'IB Chemistry HL',
    board: 'International Baccalaureate',
    country: 'International (Geneva)',
    region: 'IB_DIPLOMA',
    iconName: 'FlaskConical',
    primaryColor: 'purple',
    scoringScale: 'Grades 1 to 7',
    syllabusUnits: [
      'Topic 1: Stoichiometric Relationships',
      'Topic 2 & 12: Atomic Structure & Electron Configurations',
      'Topic 3 & 13: Periodicity & Transition Metals',
      'Topic 4 & 14: Chemical Bonding & Structure (Hybridization, MO)',
      'Topic 5 & 15: Energetics / Thermodynamics (Born-Haber, Gibbs Free Energy)',
      'Topic 6 & 16: Chemical Kinetics & Rate Mechanisms',
      'Topic 7 & 17: Equilibrium & Le Chatelier Calculations',
      'Topic 8 & 18: Acids & Bases (Buffer Solutions, Salt Hydrolysis)',
      'Topic 9 & 19: Redox Processes & Electrochemical Cells',
      'Topic 10 & 20: Organic Chemistry & Reaction Pathways',
    ],
    description: 'Deep mathematical and theoretical treatment of chemical systems and spectroscopy.',
  },

  // ==========================================
  // US & GLOBAL ADVANCED PLACEMENT (COLLEGE BOARD)
  // ==========================================
  {
    id: 'AP_BIOLOGY',
    name: 'AP Biology',
    shortName: 'AP Biology',
    board: 'College Board',
    country: 'United States & Global',
    region: 'US_COLLEGEBOARD',
    iconName: 'Dna',
    primaryColor: 'emerald',
    scoringScale: 'Score 1 to 5',
    syllabusUnits: [
      'Unit 1: Chemistry of Life',
      'Unit 2: Cell Structure & Function',
      'Unit 3: Cellular Energetics',
      'Unit 4: Cell Communication & Cycle',
      'Unit 5: Heredity',
      'Unit 6: Gene Expression & Regulation',
      'Unit 7: Natural Selection',
      'Unit 8: Ecology',
    ],
    description: 'High-stakes curriculum focused on molecular bio, bioenergetics, genetics, and statistical CER inquiry.',
  },
  {
    id: 'AP_PSYCHOLOGY',
    name: 'AP Psychology',
    shortName: 'AP Psychology',
    board: 'College Board',
    country: 'United States & Global',
    region: 'US_COLLEGEBOARD',
    iconName: 'Brain',
    primaryColor: 'violet',
    scoringScale: 'Score 1 to 5',
    syllabusUnits: [
      'Unit 1: Biological Bases of Behavior',
      'Unit 2: Cognition & Memory',
      'Unit 3: Developmental Psychology',
      'Unit 4: Social Psychology',
      'Unit 5: Clinical Psychology',
    ],
    description: 'Empirical behavioral science, brain anatomy, neurotransmitters, and research methodology.',
  },
  {
    id: 'AP_US_HISTORY',
    name: 'AP US History (APUSH)',
    shortName: 'AP US History',
    board: 'College Board',
    country: 'United States & Global',
    region: 'US_COLLEGEBOARD',
    iconName: 'Landmark',
    primaryColor: 'amber',
    scoringScale: 'Score 1 to 5',
    syllabusUnits: [
      'Period 3: 1754-1800 (Revolution & Constitution)',
      'Period 5: 1844-1877 (Civil War & Reconstruction)',
      'Period 7: 1890-1945 (Imperialism, Great Depression, WWII)',
      'Period 8: 1945-1980 (Cold War & Civil Rights)',
    ],
    description: 'Historical reasoning, DBQ document analysis, causation, continuity & change over time.',
  },
  {
    id: 'AP_CHEMISTRY',
    name: 'AP Chemistry',
    shortName: 'AP Chemistry',
    board: 'College Board',
    country: 'United States & Global',
    region: 'US_COLLEGEBOARD',
    iconName: 'FlaskConical',
    primaryColor: 'sky',
    scoringScale: 'Score 1 to 5',
    syllabusUnits: [
      'Unit 3: Intermolecular Forces & Properties',
      'Unit 5: Kinetics & Rate Laws',
      'Unit 6: Thermodynamics & Enthalpy',
      'Unit 7: Equilibrium & Le Chatelier',
      'Unit 8: Acids and Bases (Buffers)',
    ],
    description: 'Quantitative thermodynamics, rate laws, equilibrium constants, and molecular interactions.',
  },
  {
    id: 'AP_CALCULUS_BC',
    name: 'AP Calculus BC',
    shortName: 'AP Calc BC',
    board: 'College Board',
    country: 'United States & Global',
    region: 'US_COLLEGEBOARD',
    iconName: 'Calculator',
    primaryColor: 'indigo',
    scoringScale: 'Score 1 to 5',
    syllabusUnits: [
      'Unit 6: Integration and Accumulation of Change',
      'Unit 7: Differential Equations & Euler’s Method',
      'Unit 8: Applications of Integration',
      'Unit 9: Parametric Equations, Polar Coordinates & Vector-Valued Functions',
      'Unit 10: Infinite Sequences and Series (Taylor & Maclaurin)',
    ],
    description: 'College-level single-variable calculus including polar, parametric, vectors, and infinite Taylor series.',
  },
];

export interface SampleNotePreset {
  id: string;
  title: string;
  examTrack: ExamTrackId;
  unitTopic: string;
  country: string;
  previewSnippet: string;
  content: string;
}

export const SAMPLE_NOTE_PRESETS: SampleNotePreset[] = [
  // 1. UGANDA NEW LOWER SECONDARY CURRICULUM BIOLOGY
  {
    id: 'sample-ug-nlsc-bio',
    title: 'Uganda NLSC: Gaseous Exchange, Respiratory Surfaces & Malaria Vector Control',
    examTrack: 'UG_NLSC_BIOLOGY',
    unitTopic: 'Theme 5: Gaseous Exchange & Respiration',
    country: 'Uganda',
    previewSnippet: 'Adaptations of alveoli, mechanism of ventilation in humans and bony fish, and community vector control...',
    content: `# Uganda New Lower Secondary Curriculum (NLSC): Biology & Health Sciences
## Theme 5: Gaseous Exchange & Respiratory Mechanisms

### 1. The Concept of Gaseous Exchange
Gaseous exchange is the physical process by which oxygen diffuses into an organism from the respiratory medium (air or water) across a specialized respiratory surface, while carbon dioxide diffuses out.

### 2. Characteristics of Efficient Respiratory Surfaces (UNEB Activity of Integration Criteria)
1. **Large Surface Area to Volume Ratio**: Provides maximum contact area for diffusion (e.g. millions of alveoli in mammalian lungs; highly branched gill filaments in Tilapia).
2. **Extremely Thin Epithelium**: Typically one cell thick, creating a minimal diffusion pathway.
3. **Moist Surface**: Gases must dissolve in moisture before they can diffuse across living cell membranes.
4. **Dense Network of Blood Capillaries**: Maintains a steep concentration gradient between blood and the respiratory medium.
5. **Well-Ventilated**: Continuous movement of air/water maintains fresh oxygen supply.

### 3. Human Respiratory System & Ventilation Mechanism
- **Inhalation (Breathing In)**:
  - External intercostal muscles contract; internal intercostal muscles relax.
  - Rib cage moves upwards and outwards.
  - Diaphragm muscles contract, causing the diaphragm to flatten downwards.
  - Volume of thoracic cavity increases; pressure inside lungs drops below atmospheric pressure.
  - Air rushes into the lungs via trachea, bronchi, and bronchioles to equalize pressure.
- **Exhalation (Breathing Out)**:
  - External intercostal muscles relax; internal intercostal muscles contract.
  - Rib cage drops downwards and inwards under gravity and muscular action.
  - Diaphragm relaxes, returning to its dome-shaped position.
  - Thoracic volume decreases; intra-pulmonary pressure exceeds atmospheric pressure, forcing air out.

### 4. Gaseous Exchange in Bony Fish (Nile Perch / Tilapia)
- Respiratory organ: **Gills** supported by gill arches, protected by the operculum.
- Water flows across gill lamellae in the opposite direction to blood flow (**Counter-Current Flow System**).
- Counter-current exchange ensures a concentration gradient is maintained across the entire length of the capillary bed, achieving up to 85% oxygen extraction compared to only ~50% in parallel flow.

### 5. Community Health & Respiratory Disease Management in Uganda
- **Pneumonia & Tuberculosis (TB)**: Bacterial infections affecting alveoli; high risk in crowded or poorly ventilated homesteads. Prevention: early screening at health centers, BCG immunization, completing the full 6-month DOTS treatment course to prevent multi-drug resistant TB (MDR-TB).
- **Asthma**: Chronic inflammation of bronchioles triggered by smoke from firewood/charcoal stoves, pollen, or dust. Activity of integration recommendations: clean cooking stoves (improved cookstoves), proper ventilation in kitchens.`,
  },

  // 2. UGANDA NLSC: CHEMISTRY
  {
    id: 'sample-ug-nlsc-chem',
    title: 'Uganda NLSC: Acids, Bases, Soil pH & Agricultural Lime in Uganda',
    examTrack: 'UG_NLSC_CHEMISTRY',
    unitTopic: 'Theme 6: Acids, Bases, Salts & Soil pH Applications',
    country: 'Uganda',
    previewSnippet: 'pH scale, plant indicators, soil acidity in tea/coffee growing regions of Uganda, and neutralization...',
    content: `# Uganda New Lower Secondary Curriculum (NLSC): Chemistry
## Theme 6: Acids, Bases, Salts & Soil pH Applications in Ugandan Agriculture

### 1. Nature of Acids and Alkalis
- **Acids**: Substances that produce hydrogen ions (H+) as the only positive ions when dissolved in water.
  - Mineral acids: Hydrochloric acid (HCl), Sulfuric acid (H2SO4), Nitric acid (HNO3).
  - Organic acids: Ethanoic acid in vinegar, Citric acid in oranges/lemons, Lactic acid in sour milk.
- **Alkalis / Bases**: Metal oxides and hydroxides that react with acids to form salt and water only (neutralization). Water-soluble bases are called alkalis, producing hydroxide ions (OH-).
  - Sodium hydroxide (NaOH), Calcium hydroxide (Ca(OH)2 - slaked lime), Aqueous ammonia (NH3(aq)).

### 2. The pH Scale & Local Plant Indicators
- The pH scale ranges from 0 (strongly acidic) to 14 (strongly alkaline), with 7 representing neutrality.
- **Local Plant Indicators (NCDC Practical Investigation)**:
  - Extracts from red hibiscus flowers, red cabbage leaves, or beetroot boiled in water change distinct colors in acid versus alkali.
  - Hibiscus extract turns bright pink/red in lemon juice/acid, and dark green/yellow in wood ash solution/alkali.

### 3. Real-World Application: Soil Acidity & Agribusiness in Uganda
- **Problem Scenario (Activity of Integration)**:
  - Farmers in southwestern Uganda (Kabale, Kisoro) and Mount Elgon slopes face declining crop yields due to soil acidification caused by heavy rainfall leaching basic cations (Ca2+, Mg2+, K+) leaving acidic H+ and Al3+ ions.
  - Crops like beans, maize, and bananas prefer slightly acidic to neutral soils (pH 6.0 - 7.0), while tea thrives in acidic soil (pH 4.5 - 5.5).
- **Remediation via Neutralization (Agricultural Liming)**:
  - Farmers apply agricultural lime (calcium carbonate, CaCO3) or slaked lime (Ca(OH)2) quarried locally in Tororo and Hima.
  - Equation: CaCO3(s) + 2H+(aq) -> Ca2+(aq) + H2O(l) + CO2(g)
  - Wood ash from kitchen fires is also traditionally spread over vegetable gardens as a rich local source of potassium carbonate (K2CO3) to neutralize acidic soils.`,
  },

  // 3. UGANDA NLSC: HISTORY & POLITICAL EDUCATION
  {
    id: 'sample-ug-nlsc-history',
    title: 'Uganda NLSC: Pre-Colonial Kingdoms, Colonial Resistance & Democratic Governance',
    examTrack: 'UG_NLSC_HISTORY_POLITICAL',
    unitTopic: 'Theme 5 & 8: Colonial Resistance & Democratic Citizenship',
    country: 'Uganda',
    previewSnippet: 'Kabalega and Mwanga resistance, the 1900 Buganda Agreement, and the 1995 Constitution of Uganda...',
    content: `# Uganda New Lower Secondary Curriculum (NLSC): History & Political Education
## Theme 5 & 8: Colonial Encounter, Resistance & Constitutional Democracy in Uganda

### 1. Pre-Colonial Political Systems in Uganda
- **Centralized Kingdoms**: Buganda, Bunyoro-Kitara, Ankole, and Tooro. Governed by hereditary monarchs (Kabaka, Omukama, Omugabe) supported by councils of chiefs (Lukiiko), royal prime ministers (Katikkiro), and standing armies.
- **Segmentary / Decentralized Societies**: Acholi, Langi, Iteso, Lugbara, and Bakiga. Governed through clan elders, age-set systems, and consensus-driven councils rather than a centralized king.

### 2. African Resistance to Colonial Encroachment
- **Omukama Kabalega of Bunyoro**:
  - Fiercely resisted British imperial expansion led by Captain Lugard and Colonel Colvile.
  - Formed the well-trained *Abarusura* standing army; waged a protracted 9-year guerrilla war (1890-1899) using scorched-earth tactics in the forests of Budongo.
  - Captured in Dokolo in 1899 alongside Kabaka Mwanga II of Buganda and exiled to the Seychelles Islands.
- **Kabaka Mwanga II of Buganda**:
  - Resisted growing European missionary and British imperial control over his sovereignty.
  - Dismissed Christian converts and launched the 1897 rebellion against the British protectorate administration.

### 3. The 1900 Buganda Agreement & Its Impact
- Signed between Sir Harry Johnston (for Britain) and Buganda regents (Sir Apollo Kaggwa, Stanislaus Mugwanya, Zakaria Kisingiri).
- Introduced **Mailo Land** (dividing 19,600 sq miles between the British Crown, Kabaka, and 1,000 chiefs), transforming peasant cultivators into rent-paying tenants (*kibanja* holders).
- Established indirect rule, using Buganda administrative agents (like Semei Kakungulu) to spread British control across eastern and northern Uganda.

### 4. Constitutionalism & Democratic Governance under the 1995 Constitution
- **Preamble & Sovereign Power**: "All power belongs to the people, who shall exercise their sovereignty in accordance with this Constitution."
- **Three Arms of Government**:
  - **The Executive**: Headed by the President and Cabinet; enforces laws and manages national governance.
  - **The Legislature (Parliament of Uganda)**: Elected representatives who enact laws, approve budgets, and oversee executive accountability.
  - **The Judiciary**: Independent courts (Supreme Court, Court of Appeal/Constitutional Court, High Court) interpreting the law and protecting human rights.
- **Civic Rights & Duties of a Citizen**:
  - Fundamental rights: Right to life, freedom from torture, freedom of expression, right to fair hearing.
  - Civic duties: Paying lawful taxes to URA, protecting public property, defending the nation, respecting the national flag and anthem.`,
  },

  // 4. US / INTERNATIONAL AP BIOLOGY
  {
    id: 'sample-ap-bio-energetics',
    title: 'AP Biology: Cellular Respiration, Chemiosmosis & ATP Synthase',
    examTrack: 'AP_BIOLOGY',
    unitTopic: 'Unit 3: Cellular Energetics',
    country: 'United States & Global',
    previewSnippet: 'Glycolysis, pyruvate oxidation, Krebs cycle, and proton pumping in the inner mitochondrial membrane...',
    content: `# AP Biology Unit 3: Cellular Respiration & Mitochondrial Bioenergetics

## 1. Overview of Metabolic Pathways
Aerobic cellular respiration converts chemical energy stored in glucose into biologically usable ATP through coupled redox reactions:
C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~30-32 ATP.
The overall process is exergonic (ΔG = -686 kcal/mol).

## 2. Stepwise Breakdown
- **Glycolysis (Cytosol)**:
  - Glucose (6C) is split into 2 Pyruvate (3C).
  - Energy investment: 2 ATP consumed by hexokinase and PFK.
  - Energy payoff: 4 ATP synthesized via substrate-level phosphorylation + 2 NADH reduced.
  - Net yield: 2 ATP, 2 NADH, 2 Pyruvate.
  - Anaerobic; conserved across all 3 biological domains.

- **Pyruvate Oxidation & Citric Acid Cycle (Mitochondrial Matrix)**:
  - Pyruvate enters matrix via transport protein; converted to Acetyl-CoA (2C), releasing CO2 and 1 NADH per pyruvate.
  - Krebs Cycle oxidizes acetyl groups to 2 CO2 each.
  - Yields per glucose: 6 NADH, 2 FADH2, 2 ATP (or GTP).

- **Oxidative Phosphorylation & Chemiosmosis (Inner Mitochondrial Membrane)**:
  - Complex I, III, IV actively pump H+ from the matrix INTO the intermembrane space using electron free energy.
  - Generates an electrochemical gradient: high [H+] and low pH in intermembrane space; low [H+] and higher pH in matrix.
  - Terminal electron acceptor is O2: 1/2 O2 + 2H+ + 2e- -> H2O.
  - ATP Synthase F0/F1 complex acts as a rotary motor. Protons flow down gradient into matrix, driving ADP + Pi phosphorylation.

## 3. Critical AP Exam Pitfalls & Inhibitors
- Uncouplers (e.g., DNP, thermogenin in brown fat): Dissipate the H+ proton gradient without inhibiting the ETC. Result: oxygen consumption continues or increases, ATP synthesis stops, energy released as heat.
- Cyanide / Carbon Monoxide: Bind Cytochrome c oxidase (Complex IV), blocking electron transfer to O2. The entire ETC backs up, NADH cannot be oxidized to NAD+, ATP drops to near zero.
- PFK Regulation: Allosterically inhibited by ATP and Citrate (negative feedback); stimulated by AMP.`,
  },

  // 5. AP US HISTORY
  {
    id: 'sample-apush-depression',
    title: 'AP US History: The Great Depression, New Deal & Constitutional Friction',
    examTrack: 'AP_US_HISTORY',
    unitTopic: 'Period 7: 1890-1945',
    country: 'United States & Global',
    previewSnippet: 'Causes of the 1929 crash, Hoover vs FDR, Relief/Recovery/Reform, and the Court-Packing Scheme...',
    content: `# APUSH Period 7: The Great Depression & Franklin D. Roosevelt's New Deal

## 1. Structural Causes of the Great Depression
- Stock Market Crash of October 29, 1929 (Black Tuesday) triggered by speculative buying on margin (10% down).
- Agricultural overproduction and plunging crop prices throughout the 1920s.
- Unequal wealth distribution: bottom 60% of Americans lived near or below subsistence level.
- Unregulated banking system: lack of deposit insurance sparked catastrophic bank runs.
- Hawley-Smoot Tariff (1930): Raised import duties to 60%, provoking international retaliatory tariffs and shrinking world trade by 66%.

## 2. Hoover's Associationalism vs. FDR's First 100 Days
- **Herbert Hoover**: Believed in "rugged individualism" and voluntary cooperation. Created Reconstruction Finance Corporation (RFC) in 1932, but direct relief was seen as paternalistic.
- **Franklin D. Roosevelt (1933)**: Pragmatic experimentation ("bold, persistent experimentation").
  - Emergency Banking Relief Act & "Fireside Chat": declared 4-day National Bank Holiday.
  - Glass-Steagall Act (1933): Separated commercial from investment banking and created the FDIC.
  - SEC (1934): Regulated stock market and prohibited insider trading.`,
  },
];
