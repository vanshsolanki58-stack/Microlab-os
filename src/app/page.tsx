'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { practicalsData } from '@/data/practicalsData';
import { AcademicLevel, Practical } from '@/types/microbiology';
import PracticalBenchModal from '@/components/practicals/PracticalBenchModal';
import EquipmentDirectory from '@/components/equipment/EquipmentDirectory';
import ColonyCounter from '@/components/vision/ColonyCounter';
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
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const [hasEnteredApp, setHasEnteredApp] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('practicals');
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRedMode, setIsRedMode] = useState<boolean>(false);

  // Active calculator sub-tab
  const [activeCalc, setActiveCalc] = useState<
    'cfu' | 'kinetics' | 'media' | 'molarity' | 'centrifuge' | 'zoi'
  >('cfu');

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
    'Fermentation & Enzymology',
    'Hematology & Urinalysis'
  ];

  const handleNavigateToAi = (query?: string) => {
    setActiveTab('copilot');
  };

  const handleTierSelect = (level: AcademicLevel) => {
    setSelectedLevel(level);
    setHasEnteredApp(true);
  };

  // =========================================================================
  // LANDING PAGE (TIER SELECTION)
  // =========================================================================
  if (!hasEnteredApp) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-12 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 mb-6">
              <FlaskConical className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              MicroLab OS
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Advanced virtual laboratory assistant, protocol repository, and AI bio-copilot. Select your academic tier to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['All', 'BSc', 'MSc', 'PhD'] as AcademicLevel[]).map((level) => {
              const info = {
                All: { desc: 'Full Access', color: 'from-slate-500 to-slate-700', icon: GraduationCap },
                BSc: { desc: 'Undergraduate', color: 'from-emerald-500 to-teal-600', icon: BookOpen },
                MSc: { desc: 'Postgraduate', color: 'from-blue-500 to-indigo-600', icon: Target },
                PhD: { desc: 'Research/Doctoral', color: 'from-purple-500 to-pink-600', icon: Sparkles }
              }[level];
              const Icon = info.icon;

              return (
                <button
                  key={level}
                  onClick={() => handleTierSelect(level)}
                  className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {level === 'All' ? 'All Tiers' : `${level} Level`}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {info.desc}
                  </p>
                  <ArrowRight className="w-5 h-5 mt-6 text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN APPLICATION
  // =========================================================================
  return (
    <div className={`min-h-screen ${isRedMode ? 'bg-black text-red-500 selection:bg-red-900 selection:text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'} transition-colors`}>
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
        {/* PRACTICALS REPOSITORY HUB */}
        {activeTab === 'practicals' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-8 sm:p-10 shadow-xl shadow-emerald-950/10">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  Standard Operating Procedures
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Microbiology Bench Protocols
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  Comprehensive, step-by-step practicals tailored for {selectedLevel === 'All' ? 'all' : selectedLevel} level students. Select an experiment below to enter the interactive bench mode.
                </p>

                <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => setActiveTab('vision')}
                    className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" /> AI Colony Counter
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
                </div>
              </div>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPracticals.map((prac) => (
                <div
                  key={prac.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300 dark:hover:border-emerald-700"
                >
                  <div className="space-y-4">
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

        {/* AI COLONY COUNTER */}
        {activeTab === 'vision' && <ColonyCounter />}

        {/* SMART LAB CALCULATORS */}
        {activeTab === 'calculators' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto">
              {[
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

            {activeCalc === 'cfu' && <SerialDilutionCalculator />}
            {activeCalc === 'kinetics' && <GrowthKineticsCalculator />}
            {activeCalc === 'media' && <MediaPrepCalculator />}
            {activeCalc === 'molarity' && <MolarityDilutionCalculator />}
            {activeCalc === 'centrifuge' && <CentrifugeRpmRcfCalculator />}
            {activeCalc === 'zoi' && <ZoneOfInhibitionCalculator />}
          </div>
        )}

        {/* MACHINERY & EQUIPMENT SOPS */}
        {activeTab === 'equipment' && (
          <EquipmentDirectory selectedLevel={selectedLevel} />
        )}

        {/* DIAGNOSTIC & TROUBLESHOOTING MATRIX */}
        {activeTab === 'troubleshooting' && (
          <TroubleshootingViewer
            selectedLevel={selectedLevel}
            onNavigateToAi={handleNavigateToAi}
          />
        )}

        {/* DIGITAL LAB NOTEBOOK (ELN) */}
        {activeTab === 'notebook' && <DigitalLabNotebook />}

        {/* AI LAB COPILOT */}
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
