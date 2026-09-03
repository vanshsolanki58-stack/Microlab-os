'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { practicalsData } from '@/data/practicalsData';
import { AcademicLevel, Practical } from '@/types/microbiology';
import PracticalBenchModal from '@/components/practicals/PracticalBenchModal';
import EquipmentDirectory from '@/components/equipment/EquipmentDirectory';
import ColonyCounter from '@/components/vision/ColonyCounter';
import SolutionChemistrySuite from '@/components/calculators/SolutionChemistrySuite';
import SerialDilutionCalculator from '@/components/calculators/SerialDilutionCalculator';
import GrowthKineticsCalculator from '@/components/calculators/GrowthKineticsCalculator';
import MediaPrepCalculator from '@/components/calculators/MediaPrepCalculator';
import MolarityDilutionCalculator from '@/components/calculators/MolarityDilutionCalculator';
import CentrifugeRpmRcfCalculator from '@/components/calculators/CentrifugeRpmRcfCalculator';
import ZoneOfInhibitionCalculator from '@/components/calculators/ZoneOfInhibitionCalculator';
import TroubleshootingViewer from '@/components/troubleshooting/TroubleshootingViewer';
import DigitalLabNotebook from '@/components/notebook/DigitalLabNotebook';
import AiLabCopilot from '@/components/assistant/AiLabCopilot';
import {
  FlaskConical,
  Sparkles,
  Clock,
  BookOpen,
  TrendingUp,
  Calculator,
  Scale,
  Beaker,
  Orbit,
  Target,
  Filter,
  Flame,
  FlaskRound
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('practicals');
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRedMode, setIsRedMode] = useState<boolean>(false);

  // Active calculator sub-tab
  const [activeCalc, setActiveCalc] = useState<
    'chemistry' | 'cfu' | 'kinetics' | 'media' | 'molarity' | 'centrifuge' | 'zoi'
  >('chemistry');

  // Modals state
  const [activePractical, setActivePractical] = useState<Practical | null>(null);

  // Filter practicals by global level + category + search
  const filteredPracticals = practicalsData.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const categories = [
    'All',
    'Staining & Microscopy',
    'Media Preparation & Sterilization',
    'Isolation & Pure Culture',
    'Biochemical Characterization',
    'Antimicrobial & Pharmacological',
    'Growth Kinetics & Physiology',
    'Molecular Biology & Genetics',
    'Fermentation & Enzymology'
  ];

  const handleNavigateToAi = (query?: string) => {
    setActiveTab('copilot');
  };

  return (
    <div className={`min-h-screen ${isRedMode ? 'bg-black text-red-500 selection:bg-red-900 selection:text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'} transition-colors`}>
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isRedMode={isRedMode}
        setIsRedMode={setIsRedMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* =========================================================================
            TAB 1: PRACTICALS REPOSITORY HUB
        ========================================================================= */}
        {activeTab === 'practicals' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-8 sm:p-10 shadow-xl shadow-emerald-950/10">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  Standard Operating Procedures & Academic Bench Manual
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Microbiology Laboratory Practicals & Bench Protocols
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  From undergraduate fundamental aseptic techniques to PhD molecular genetics and industrial bioreactor kinetics. Complete with step-by-step timers, chemical stoichiometry, and viva examinations.
                </p>

                {/* Quick Feature Jump Pill Buttons */}
                <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => setActiveTab('chemistry')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-95 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <FlaskRound className="w-4 h-4" /> Solution Chemistry Suite
                  </button>
                  <button
                    onClick={() => setActiveTab('vision')}
                    className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Snap & Count Colonies
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('calculators');
                      setActiveCalc('cfu');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold transition-all border border-emerald-500/30 flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4" /> CFU/mL Calculator
                  </button>
                  <button
                    onClick={() => setActiveTab('troubleshooting')}
                    className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold transition-all border border-emerald-500/30 flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-red-400" /> Solve Staining Errors
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Scrollbar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Practicals Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPracticals.map((prac) => (
                <div
                  key={prac.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300 dark:hover:border-emerald-700"
                >
                  <div className="space-y-4">
                    {/* Level & Badge Bar */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          prac.level === 'BSc'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : prac.level === 'MSc'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                        }`}
                      >
                        {prac.level} Level
                      </span>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3" /> {prac.durationEstimate}
                        </span>
                        <span>•</span>
                        <span className="font-semibold">{prac.biosafetyLevel}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                        {prac.category}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {prac.title}
                      </h2>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {prac.summary}
                    </p>

                    {/* Tag chips */}
                    <div className="flex gap-1.5 flex-wrap pt-1">
                      {prac.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setActivePractical(prac)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 hover:text-white dark:hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" /> Open Bench Protocol
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: SOLUTION CHEMISTRY SUITE
        ========================================================================= */}
        {activeTab === 'chemistry' && (
          <SolutionChemistrySuite selectedLevel={selectedLevel} />
        )}

        {/* =========================================================================
            TAB 3: AI COLONY COUNTER
        ========================================================================= */}
        {activeTab === 'vision' && <ColonyCounter />}

        {/* =========================================================================
            TAB 4: SMART LAB CALCULATORS
        ========================================================================= */}
        {activeTab === 'calculators' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Calculator Sub-Nav */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: 'chemistry', label: 'Solution Chemistry (N, m, %)', icon: FlaskRound },
                { id: 'cfu', label: 'CFU/mL & Serial Dilution', icon: Calculator },
                { id: 'kinetics', label: 'Growth Kinetics (µ & g)', icon: TrendingUp },
                { id: 'media', label: 'Media Batch Formulator', icon: Scale },
                { id: 'molarity', label: 'Molarity & C1V1 Dilution', icon: Beaker },
                { id: 'centrifuge', label: 'Centrifuge RPM ↔ RCF', icon: Orbit },
                { id: 'zoi', label: 'Zone of Inhibition (CLSI)', icon: Target }
              ].map((c) => {
                const isSelected = activeCalc === c.id;
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCalc(c.id as typeof activeCalc)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Active Calculator Component Rendering */}
            {activeCalc === 'chemistry' && <SolutionChemistrySuite selectedLevel={selectedLevel} />}
            {activeCalc === 'cfu' && <SerialDilutionCalculator />}
            {activeCalc === 'kinetics' && <GrowthKineticsCalculator />}
            {activeCalc === 'media' && <MediaPrepCalculator />}
            {activeCalc === 'molarity' && <MolarityDilutionCalculator />}
            {activeCalc === 'centrifuge' && <CentrifugeRpmRcfCalculator />}
            {activeCalc === 'zoi' && <ZoneOfInhibitionCalculator />}
          </div>
        )}

        {/* =========================================================================
            TAB 5: MACHINERY & EQUIPMENT SOPS (Name-First Directory)
        ========================================================================= */}
        {activeTab === 'equipment' && (
          <EquipmentDirectory selectedLevel={selectedLevel} />
        )}

        {/* =========================================================================
            TAB 6: DIAGNOSTIC & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        {activeTab === 'troubleshooting' && (
          <TroubleshootingViewer
            selectedLevel={selectedLevel}
            onNavigateToAi={handleNavigateToAi}
          />
        )}

        {/* =========================================================================
            TAB 7: DIGITAL LAB NOTEBOOK (ELN)
        ========================================================================= */}
        {activeTab === 'notebook' && <DigitalLabNotebook />}

        {/* =========================================================================
            TAB 8: AI LAB COPILOT
        ========================================================================= */}
        {activeTab === 'copilot' && <AiLabCopilot />}
      </main>

      {/* Practical Detail Bench Modal */}
      {activePractical && (
        <PracticalBenchModal
          practical={activePractical}
          onClose={() => setActivePractical(null)}
        />
      )}
    </div>
  );
}
