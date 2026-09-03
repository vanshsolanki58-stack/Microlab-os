'use client';

import React, { useState } from 'react';
import { troubleshootingData } from '@/data/troubleshootingData';
import { TroubleshootingEntry, AcademicLevel } from '@/types/microbiology';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Bot,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  Lightbulb
} from 'lucide-react';

interface Props {
  selectedLevel?: AcademicLevel;
  onNavigateToAi?: (query?: string) => void;
}

export default function TroubleshootingViewer({ selectedLevel = 'All', onNavigateToAi }: Props) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>('Staining');
  const [activeSymptomId, setActiveSymptomId] = useState<string | null>(troubleshootingData[0].id);
  const [customUserQuery, setCustomUserQuery] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  const topicCategories = [
    { id: 'Staining', name: 'Staining & Colors', desc: 'Gram stains, Endospores, Acid-fast, and smear morphology issues', icon: '🟣' },
    { id: 'Culture & Isolation', name: 'Streaking & Plate Growth', desc: 'Confluent lawns, lack of single colonies, growth failure', icon: '🧫' },
    { id: 'Media Preparation', name: 'Agar & Broth Preparation', desc: 'Agar failed to solidify, cracking, pH and precipitation', icon: '🧪' },
    { id: 'Contamination', name: 'Contamination Diagnosis', desc: 'Fungal molds, water bath slime, incubator spores', icon: '🦠' },
    { id: 'PCR & Gel Electrophoresis', name: 'PCR & Gel Electrophoresis', desc: 'Vertical smears, primer dimers, missing bands, reversed leads', icon: '🧬' }
  ];

  // Get symptoms for selected topic
  const matchingSymptoms = troubleshootingData.filter((item) =>
    selectedTopic ? item.category === selectedTopic : true
  );

  const activeEntry = troubleshootingData.find((t) => t.id === activeSymptomId) || matchingSymptoms[0];

  const handleCustomQuerySubmit = () => {
    if (!customUserQuery.trim()) return;
    const q = customUserQuery.toLowerCase();
    
    // Quick intelligent diagnostic match
    if (q.includes('gram') || q.includes('pink') || q.includes('purple')) {
      setCustomAnswer(`🔍 Diagnostic for: "${customUserQuery}"
• Root Cause: Decolorizer (95% Ethanol) was likely applied too long (>15s), or culture was >24 hours old.
• Immediate Fix: Use an 18-24h fresh culture. Decolorize for only 10-15s until runoff is pale.`);
    } else if (q.includes('streak') || q.includes('lawn') || q.includes('single')) {
      setCustomAnswer(`🔍 Diagnostic for: "${customUserQuery}"
• Root Cause: Inoculating loop was not flamed between sectors, or was re-dipped into stock tube.
• Immediate Fix: Flame and cool loop before Sector 2 and 3; make only 1-2 cross-strokes.`);
    } else if (q.includes('agar') || q.includes('liquid') || q.includes('solid')) {
      setCustomAnswer(`🔍 Diagnostic for: "${customUserQuery}"
• Root Cause: Acidic pH (<5.0) during autoclaving hydrolyzes agar polysaccharides, destroying gelling capacity.
• Immediate Fix: Autoclave agar and acidic nutrients separately, or adjust pH after cooling to 50°C.`);
    } else {
      setCustomAnswer(`🔍 Analysis for: "${customUserQuery}"
• Likely Root Cause: Reagent degradation, uncalibrated incubation temperature, or aseptic technique breach.
• Recommended Action: Check controls, verify incubator reads 37.0°C, and ensure flame sterilization.`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Step 1: "What is your bench problem about?" */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
              Step 1 of 2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              What is your laboratory question or error about?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select the area where you experienced an issue on the bench:
            </p>
          </div>
        </div>

        {/* Category Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topicCategories.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic.id);
                const firstMatch = troubleshootingData.find((t) => t.category === topic.id);
                if (firstMatch) setActiveSymptomId(firstMatch.id);
              }}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedTopic === topic.id
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 shadow-xs ring-1 ring-red-400/20'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">{topic.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {topic.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {topic.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Suggested Symptoms + Diagnosis + Side AI Co-Pilot Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Suggested Questions & Detailed Diagnostic Card */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 2: Suggested Questions for Selected Category */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Step 2: Common Symptoms & Errors
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Select the exact symptom you are observing:
            </h3>

            <div className="space-y-2">
              {matchingSymptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => setActiveSymptomId(symptom.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                    activeSymptomId === symptom.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                  }`}
                >
                  <span>{symptom.problemSymptom}</span>
                  <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                </button>
              ))}
            </div>
          </div>

          {/* Active Diagnostic Detail */}
          {activeEntry && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-xl shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    Symptom Analysis
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {activeEntry.problemSymptom}
                  </h3>
                </div>
              </div>

              {/* Root Causes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                  Likely Root Causes:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeEntry.possibleCauses.map((cause, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                    >
                      {cause}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bench Diagnostic Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" /> Bench Diagnostic Checklist:
                </h4>
                <div className="space-y-1.5">
                  {activeEntry.diagnosticChecklist.map((chk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corrective Action & Prevention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Immediate Corrective Action:
                  </h4>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {activeEntry.correctiveActions.map((act, i) => (
                      <li key={i}>• {act}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Prevention Best Practices:
                  </h4>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {activeEntry.preventionMeasures.map((prev, i) => (
                      <li key={i}>• {prev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Dedicated Custom Query Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Have a different bench error or custom question?
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type your specific symptom below (e.g. &quot;Why did my broth turn black?&quot; or &quot;Why did colonies form inside Kirby-Bauer clearing zone?&quot;):
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={customUserQuery}
                onChange={(e) => setCustomUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomQuerySubmit()}
                placeholder="Type your bench question here..."
                className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleCustomQuerySubmit}
                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Diagnose
              </button>
            </div>

            {customAnswer && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap animate-in fade-in">
                {customAnswer}
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Side AI Co-Pilot Recommendation Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4 sticky top-24">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit">
              <Bot className="w-8 h-8 text-indigo-300" />
            </div>

            <h3 className="text-lg font-black leading-tight">
              Didn&apos;t find your exact answer?
            </h3>

            <p className="text-xs text-indigo-100 leading-relaxed">
              Try our specialized <strong>AI BioCopilot</strong>! It can interpret complex multi-step protocol failures, calculate tailored reagent dilutions, and explain biochemical mechanisms in conversational detail.
            </p>

            <button
              onClick={() => onNavigateToAi && onNavigateToAi(customUserQuery || activeEntry?.problemSymptom)}
              className="w-full py-3 px-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Ask AI BioCopilot Directly
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
