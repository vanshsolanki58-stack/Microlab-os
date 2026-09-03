export type AcademicLevel = 'All' | 'BSc' | 'MSc' | 'PhD';

export type PracticalCategory = 
  | 'Staining & Microscopy'
  | 'Media Preparation & Sterilization'
  | 'Isolation & Pure Culture'
  | 'Biochemical Characterization'
  | 'Antimicrobial & Pharmacological'
  | 'Growth Kinetics & Physiology'
  | 'Environmental & Industrial'
  | 'Virology & Immunology'
  | 'Molecular Biology & Genetics'
  | 'Fermentation & Enzymology';

export interface ProtocolStep {
  stepNumber: number;
  title: string;
  description: string;
  durationSeconds?: number;
  criticalWarning?: string;
  tip?: string;
  requiresGlovesOrPPE?: boolean;
}

export interface VivaQuestion {
  question: string;
  answer: string;
  explanation?: string;
}

export interface Practical {
  id: string;
  title: string;
  level: 'BSc' | 'MSc' | 'PhD';
  category: PracticalCategory;
  durationEstimate: string;
  biosafetyLevel: 'BSL-1' | 'BSL-2' | 'BSL-3';
  summary: string;
  aim: string;
  principle: string;
  reactionMechanism?: string;
  requirements: {
    microorganisms?: string[];
    reagents: string[];
    media?: string[];
    glasswareEquipment: string[];
    safetyPPE: string[];
  };
  protocol: ProtocolStep[];
  expectedObservations: {
    positiveResult?: string;
    negativeResult?: string;
    visualDescription: string;
    interpretationGuide: string;
  };
  troubleshootingTips: string[];
  vivaQuestions: VivaQuestion[];
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export interface EquipmentPart {
  name: string;
  function: string;
  locationOrMaintenance?: string;
}

export interface EquipmentSOP {
  id: string;
  name: string;
  tagline: string;
  aliases: string[];
  level: 'BSc' | 'MSc' | 'PhD';
  category: 'Sterilization' | 'Containment' | 'Analytical' | 'Imaging' | 'Incubation & Mixing' | 'Centrifugation' | 'Molecular & Electrophoresis' | 'Fermentation';
  iconType: string;
  principle: string;
  partsUsed: EquipmentPart[];
  standardOperatingProcedure: {
    preCheck: string[];
    operation: string[];
    shutdown: string[];
  };
  criticalSafetyRules: string[];
  calibrationSteps: string[];
  routineMaintenance: string[];
  causesOfErrorsAndFalseResults: {
    errorSymptom: string;
    underlyingCause: string;
    fixAndPrevention: string;
  }[];
}

export interface TroubleshootingEntry {
  id: string;
  level?: 'BSc' | 'MSc' | 'PhD';
  category: 'Staining' | 'Culture & Isolation' | 'Media Preparation' | 'Contamination' | 'PCR & Gel Electrophoresis' | 'Biochemical Testing';
  problemSymptom: string;
  possibleCauses: string[];
  diagnosticChecklist: string[];
  correctiveActions: string[];
  preventionMeasures: string[];
}

export interface LabNoteEntry {
  id: string;
  title: string;
  date: string;
  practicalId?: string;
  sampleId: string;
  organism: string;
  observations: string;
  calculatedCfu?: number;
  dilutionFactor?: string;
  notes: string;
  tags: string[];
}

export interface DetectedColony {
  id: number;
  x: number;
  y: number;
  radius: number;
  area: number;
  confidence: number;
  morphology: 'punctiform' | 'circular' | 'clustered';
}

export interface ColonyDetectionResult {
  totalCount: number;
  dilutionFactor: number;
  platingVolumeMl: number;
  cfuPerMl: number;
  averageDiameterMm: number;
  morphologySummary: string;
  detectedColonies: DetectedColony[];
}
