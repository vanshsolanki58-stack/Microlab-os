'use client';

import React, { useState } from 'react';
import {
  Beaker,
  Scale,
  Percent,
  Droplets,
  Layers,
  FlaskRound,
  Check,
  Copy,
  Sparkles,
  Info,
  Lightbulb,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { AcademicLevel } from '@/types/microbiology';

interface Props {
  selectedLevel?: AcademicLevel;
}

interface AcidPreset {
  name: string;
  formula: string;
  mw: number;
  nFactor: number;
  density: number; // g/mL
  purity: number; // %
  defaultMolarity: number;
}

const concentratedReagents: AcidPreset[] = [
  {
    name: 'Hydrochloric Acid (HCl)',
    formula: 'HCl',
    mw: 36.46,
    nFactor: 1,
    density: 1.19,
    purity: 37.0,
    defaultMolarity: 12.08
  },
  {
    name: 'Sulfuric Acid (H₂SO₄)',
    formula: 'H2SO4',
    mw: 98.08,
    nFactor: 2,
    density: 1.84,
    purity: 98.0,
    defaultMolarity: 18.39
  },
  {
    name: 'Nitric Acid (HNO₃)',
    formula: 'HNO3',
    mw: 63.01,
    nFactor: 1,
    density: 1.42,
    purity: 68.0,
    defaultMolarity: 15.33
  },
  {
    name: 'Glacial Acetic Acid (CH₃COOH)',
    formula: 'CH3COOH',
    mw: 60.05,
    nFactor: 1,
    density: 1.05,
    purity: 99.8,
    defaultMolarity: 17.45
  },
  {
    name: 'Phosphoric Acid (H₃PO₄)',
    formula: 'H3PO4',
    mw: 98.00,
    nFactor: 3,
    density: 1.685,
    purity: 85.0,
    defaultMolarity: 14.62
  },
  {
    name: 'Ammonium Hydroxide (NH₄OH)',
    formula: 'NH4OH',
    mw: 35.05,
    nFactor: 1,
    density: 0.90,
    purity: 28.0,
    defaultMolarity: 7.19
  }
];

export default function SolutionChemistrySuite({ selectedLevel = 'All' }: Props) {
  // Determine default tab based on academic level
  const defaultTab =
    selectedLevel === 'BSc'
      ? 'percentages'
      : selectedLevel === 'PhD'
      ? 'buffer'
      : 'normality';

  const [activeConcept, setActiveConcept] = useState<
    'percentages' | 'normality' | 'molality' | 'stockAcids' | 'ppm' | 'buffer'
  >(defaultTab);

  // ==========================================
  // 1. PERCENTAGE CONCENTRATIONS STATE (BSc Friendly)
  // ==========================================
  const [percentType, setPercentType] = useState<'wv' | 'ww' | 'vv'>('wv');
  const [targetPercentage, setTargetPercentage] = useState<number>(10); // 10%
  const [targetSolutionAmount, setTargetSolutionAmount] = useState<number>(250); // 250 mL or g

  const percentSoluteReq = (targetPercentage / 100) * targetSolutionAmount;
  const percentSolventReq =
    percentType === 'ww'
      ? targetSolutionAmount - percentSoluteReq
      : targetSolutionAmount - (percentType === 'vv' ? percentSoluteReq : 0);

  // ==========================================
  // 2. NORMALITY STATE
  // ==========================================
  const [normMw, setNormMw] = useState<number>(98.08); // H2SO4 default
  const [valencyFactor, setValencyFactor] = useState<number>(2); // n-factor
  const [targetNormality, setTargetNormality] = useState<number>(0.1); // 0.1 N
  const [normVolumeMl, setNormVolumeMl] = useState<number>(500); // 500 mL

  const equivalentWeight = valencyFactor > 0 ? normMw / valencyFactor : normMw;
  const normMassGrams = targetNormality * equivalentWeight * (normVolumeMl / 1000);
  const correspondingMolarity = valencyFactor > 0 ? targetNormality / valencyFactor : targetNormality;

  // ==========================================
  // 3. MOLALITY STATE
  // ==========================================
  const [soluteMw, setSoluteMw] = useState<number>(58.44); // NaCl
  const [targetMolality, setTargetMolality] = useState<number>(0.5); // 0.5 m
  const [solventMassGrams, setSolventMassGrams] = useState<number>(1000); // 1000 g water

  const molalitySoluteMass = targetMolality * (solventMassGrams / 1000) * soluteMw;

  // ==========================================
  // 4. CONCENTRATED STOCK ACIDS/BASES STATE
  // ==========================================
  const [selectedAcidIdx, setSelectedAcidIdx] = useState<number>(0);
  const [customDensity, setCustomDensity] = useState<number>(1.19);
  const [customPurity, setCustomPurity] = useState<number>(37.0);
  const [customAcidMw, setCustomAcidMw] = useState<number>(36.46);
  const [desiredAcidMolarity, setDesiredAcidMolarity] = useState<number>(1.0); // 1 M
  const [desiredAcidVolumeMl, setDesiredAcidVolumeMl] = useState<number>(500); // 500 mL

  const currentAcid = concentratedReagents[selectedAcidIdx];
  const stockMolarity =
    customAcidMw > 0 ? (10 * customDensity * customPurity) / customAcidMw : 0;
  const acidVolumeToPipetteMl =
    stockMolarity > 0 ? (desiredAcidMolarity * desiredAcidVolumeMl) / stockMolarity : 0;

  // ==========================================
  // 5. PPM & PPB STATE
  // ==========================================
  const [targetPpm, setTargetPpm] = useState<number>(50);
  const [ppmSolutionVolumeL, setPpmSolutionVolumeL] = useState<number>(1.0);
  const ppmSoluteMg = targetPpm * ppmSolutionVolumeL;
  const ppmSoluteGrams = ppmSoluteMg / 1000;

  // ==========================================
  // 6. BUFFER PH STATE
  // ==========================================
  const [pKa, setPKa] = useState<number>(7.21);
  const [desiredBufferPh, setDesiredBufferPh] = useState<number>(7.4);
  const [totalBufferConcM, setTotalBufferConcM] = useState<number>(0.1);
  const [bufferVolumeMl, setBufferVolumeMl] = useState<number>(1000);

  const ratioBaseToAcid = Math.pow(10, desiredBufferPh - pKa);
  const conjAcidM = totalBufferConcM / (1 + ratioBaseToAcid);
  const conjBaseM = (totalBufferConcM * ratioBaseToAcid) / (1 + ratioBaseToAcid);

  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter available chemistry concepts by Academic Level
  const allConceptTabs = [
    { id: 'percentages', label: '% Concentrations (w/v, v/v)', level: 'BSc', icon: Percent, desc: 'Everyday lab solutions (e.g. 70% alcohol, 10% SDS, 0.9% saline)' },
    { id: 'normality', label: 'Normality (N) & Eq. Weight', level: 'MSc', icon: Scale, desc: 'Reactive acid/base strength for titrations' },
    { id: 'stockAcids', label: 'Stock Acid Dilution (HCl, H₂SO₄)', level: 'MSc', icon: Beaker, desc: 'Calculate exact pipetting from concentrated commercial bottles' },
    { id: 'molality', label: 'Molality (m, mol/kg)', level: 'PhD', icon: Droplets, desc: 'Temperature-proof mass-based solutions' },
    { id: 'ppm', label: 'PPM / PPB Trace Concentrations', level: 'PhD', icon: Layers, desc: 'Antibiotic MIC and heavy metal trace dilutions' },
    { id: 'buffer', label: 'Buffer pH (Henderson-Hasselbalch)', level: 'PhD', icon: Sparkles, desc: 'Phosphate (PBS), Tris, and biological buffer recipes' }
  ];

  const visibleTabs = allConceptTabs.filter((tab) =>
    selectedLevel === 'All' ? true : selectedLevel === 'BSc' ? tab.level === 'BSc' || tab.level === 'MSc' : true
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-600 text-white rounded-2xl shadow-md">
            <FlaskRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Biochemical & Solution Chemistry Suite
              </h2>
              {selectedLevel !== 'All' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  {selectedLevel} Tier Content
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Simplified, step-by-step chemical calculations with real-world lab recipes and plain-English explanations.
            </p>
          </div>
        </div>
      </div>

      {/* Concept Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-x-auto text-xs font-bold">
        {visibleTabs.map((tab) => {
          const isSelected = activeConcept === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveConcept(tab.id as typeof activeConcept)}
              className={`px-3.5 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          CONCEPT 1: PERCENTAGE CONCENTRATIONS (Beginner Friendly)
      ========================================================================= */}
      {activeConcept === 'percentages' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Beginner Friendly Plain-English Explanation */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              What is a Percentage Solution in Simple Terms?
            </div>
            <p>
              Just like adding sugar to a cup of tea, a percentage solution tells you how many grams of powder or mL of liquid are mixed into <strong>100 mL of water</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <strong>% w/v (Solid in Liquid):</strong> e.g. 10% SDS = 10 grams in 100 mL water.
              </div>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <strong>% v/v (Liquid in Liquid):</strong> e.g. 70% Ethanol = 70 mL alcohol + 30 mL water.
              </div>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-800">
                <strong>0.9% Normal Saline:</strong> 0.9 grams NaCl in 100 mL water.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Solution Type
              </label>
              <select
                value={percentType}
                onChange={(e) => setPercentType(e.target.value as typeof percentType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="wv">% (w/v) — Solid powder in water (e.g. Agarose, SDS)</option>
                <option value="vv">% (v/v) — Liquid in water (e.g. 70% Ethanol, Glycerol)</option>
                <option value="ww">% (w/w) — Solid by total weight</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Desired Percentage (%)
              </label>
              <input
                type="number"
                step="any"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <div className="flex gap-1.5 flex-wrap pt-1">
                {[
                  { name: '70% Ethanol', val: 70, type: 'vv' },
                  { name: '10% SDS', val: 10, type: 'wv' },
                  { name: '0.9% Saline', val: 0.9, type: 'wv' },
                  { name: '1% Agarose', val: 1, type: 'wv' }
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setTargetPercentage(preset.val);
                      setPercentType(preset.type as typeof percentType);
                    }}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Total Volume You Want to Make (mL)
              </label>
              <input
                type="number"
                step="any"
                value={targetSolutionAmount}
                onChange={(e) => setTargetSolutionAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {(targetSolutionAmount / 1000).toFixed(3)} Liters
              </span>
            </div>
          </div>

          {/* Simple Step-by-Step Recipe Card */}
          <div className="bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-cyan-500/15 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-cyan-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Your Step-by-Step Bench Recipe:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80">
                <span className="text-xs text-slate-400 font-bold uppercase">Step 1</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {percentType === 'vv' ? 'Pipette ' : 'Weigh '}
                  <span className="text-emerald-600 dark:text-emerald-400">{percentSoluteReq.toFixed(2)}</span>
                  <span className="text-base font-medium text-slate-500 dark:text-slate-400">
                    {percentType === 'vv' ? ' mL' : ' grams'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {percentType === 'vv' ? 'of 100% pure stock liquid' : 'of dry chemical powder on analytical balance'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80">
                <span className="text-xs text-slate-400 font-bold uppercase">Step 2</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Bring to <span className="text-emerald-600 dark:text-emerald-400">{targetSolutionAmount}</span>
                  <span className="text-base font-medium text-slate-500 dark:text-slate-400"> mL</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  with distilled water (dH₂O) in a graduated cylinder / volumetric flask.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONCEPT 2: NORMALITY (N) & EQUIVALENT WEIGHT
      ========================================================================= */}
      {activeConcept === 'normality' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-indigo-800 dark:text-indigo-300">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              What is Normality (N) in Simple Words?
            </div>
            <p>
              Think of Normality as the <strong>chemical reactive strength</strong> of an acid or base. While Molarity (M) counts molecules, Normality (N) counts how many <em>reactive hands</em> (H⁺ or OH⁻ ions) each molecule has!
            </p>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-800 font-mono text-[11px]">
              Example: 1 Molar H₂SO₄ has 2 reactive H⁺ ions (n-factor = 2), so its Normality is <strong>2.0 N</strong>!
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Molecular Weight (g/mol)
              </label>
              <input
                type="number"
                step="any"
                value={normMw}
                onChange={(e) => setNormMw(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {[
                  { name: 'H2SO4', mw: 98.08, n: 2 },
                  { name: 'HCl', mw: 36.46, n: 1 },
                  { name: 'NaOH', mw: 40.0, n: 1 },
                  { name: 'Oxalic Acid', mw: 126.07, n: 2 }
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setNormMw(p.mw);
                      setValencyFactor(p.n);
                    }}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Valency Factor (n-factor)
              </label>
              <select
                value={valencyFactor}
                onChange={(e) => setValencyFactor(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value={1}>n = 1 (1 reactive arm: HCl, HNO3, NaOH, KOH)</option>
                <option value={2}>n = 2 (2 reactive arms: H2SO4, Oxalic Acid, Ca(OH)2)</option>
                <option value={3}>n = 3 (3 reactive arms: H3PO4, Citric Acid)</option>
                <option value={5}>n = 5 (Redox: KMnO4 in acidic medium)</option>
              </select>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Equivalent Wt = {equivalentWeight.toFixed(2)} g
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Desired Normality (N)
              </label>
              <input
                type="number"
                step="any"
                value={targetNormality}
                onChange={(e) => setTargetNormality(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {correspondingMolarity.toFixed(4)} Molar (M)
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Volume to Prepare (mL)
              </label>
              <input
                type="number"
                step="any"
                value={normVolumeMl}
                onChange={(e) => setNormVolumeMl(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {(normVolumeMl / 1000).toFixed(2)} L
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500/15 via-blue-500/5 to-purple-500/15 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Weigh on Analytical Scale:
              </span>
              <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
                {normMassGrams.toFixed(4)}{' '}
                <span className="text-xl font-medium text-slate-500 dark:text-slate-400">grams</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Dissolve completely in distilled water and make up to <strong>{normVolumeMl} mL</strong>.
              </p>
            </div>

            <button
              onClick={() => handleCopy(`${normMassGrams.toFixed(4)} g`)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Recipe'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONCEPT 3: CONCENTRATED STOCK ACID/BASE PIPETTING
      ========================================================================= */}
      {activeConcept === 'stockAcids' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-950 dark:text-amber-200 leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Critical Safety Rule: Acid into Water (A&W)
            </div>
            <p>
              Commercial acid bottles (like 37% HCl or 98% H₂SO₄) are extremely concentrated. <strong>ALWAYS pour acid into water</strong>, never pour water into acid!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Select Concentrated Acid Bottle
              </label>
              <select
                value={selectedAcidIdx}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setSelectedAcidIdx(idx);
                  const reagent = concentratedReagents[idx];
                  setCustomDensity(reagent.density);
                  setCustomPurity(reagent.purity);
                  setCustomAcidMw(reagent.mw);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 text-sm"
              >
                {concentratedReagents.map((r, i) => (
                  <option key={i} value={i}>
                    {r.name} ({r.purity}%, ρ={r.density})
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Stock Molarity ≈ {stockMolarity.toFixed(2)} M
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Desired Working Molarity (M)
              </label>
              <input
                type="number"
                step="any"
                value={desiredAcidMolarity}
                onChange={(e) => setDesiredAcidMolarity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                e.g. 1.0 M or 0.1 M
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Total Volume to Prepare (mL)
              </label>
              <input
                type="number"
                step="any"
                value={desiredAcidVolumeMl}
                onChange={(e) => setDesiredAcidVolumeMl(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {(desiredAcidVolumeMl / 1000).toFixed(2)} Liters
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-red-500/15 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-red-950/40 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Safe Pipetting Recipe:
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Pipette <span className="text-amber-600 dark:text-amber-400">{acidVolumeToPipetteMl.toFixed(2)} mL</span> of {currentAcid.name}
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              Pour into ~{Math.round(desiredAcidVolumeMl * 0.7)} mL of water inside a fume hood, swirl, and top up to <strong>{desiredAcidVolumeMl} mL</strong>.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONCEPT 4: MOLALITY (m) - Temperature-Proof Concentration
      ========================================================================= */}
      {activeConcept === 'molality' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-950 dark:text-blue-200 leading-relaxed font-mono">
            <div><strong>Principle of Molality (m):</strong> Solute moles per kilogram of solvent.</div>
            <div className="mt-1">Molality (m) = Moles / kg solvent = (W₂ × 1000) / (M₂ × W₁ in grams)</div>
            <div className="mt-1 font-sans text-slate-600 dark:text-slate-400">
              Unlike Molarity, <strong>Molality never changes with temperature</strong> because mass does not expand when heated!
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Solute Formula Weight (g/mol)
              </label>
              <input
                type="number"
                step="any"
                value={soluteMw}
                onChange={(e) => setSoluteMw(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Desired Molality (mol/kg or m)
              </label>
              <input
                type="number"
                step="any"
                value={targetMolality}
                onChange={(e) => setTargetMolality(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Mass of Water / Solvent (g)
              </label>
              <input
                type="number"
                step="any"
                value={solventMassGrams}
                onChange={(e) => setSolventMassGrams(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/15 via-teal-500/5 to-cyan-500/15 dark:from-blue-950/40 dark:via-teal-950/20 dark:to-cyan-950/40 border border-blue-200 dark:border-blue-800/60 rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Solute Mass to Weigh:
            </span>
            <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
              {molalitySoluteMass.toFixed(4)}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">grams</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              Dissolve in exactly <strong>{solventMassGrams} grams</strong> of water.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONCEPT 5: PPM & PPB TRACE CONCENTRATIONS
      ========================================================================= */}
      {activeConcept === 'ppm' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 text-xs text-teal-950 dark:text-teal-200 leading-relaxed font-mono">
            <div>1 ppm = 1 mg / Liter = 1 µg / mL</div>
            <div>1 ppb = 1 µg / Liter = 1 ng / mL</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Target Concentration in PPM (mg/L)
              </label>
              <input
                type="number"
                step="any"
                value={targetPpm}
                onChange={(e) => setTargetPpm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Volume to Prepare (Liters)
              </label>
              <input
                type="number"
                step="any"
                value={ppmSolutionVolumeL}
                onChange={(e) => setPpmSolutionVolumeL(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/15 via-emerald-500/5 to-cyan-500/15 dark:from-teal-950/40 dark:via-emerald-950/20 dark:to-cyan-950/40 border border-teal-200 dark:border-teal-800/60 rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
              Required Chemical Mass:
            </span>
            <div className="text-4xl font-black text-slate-900 dark:text-white mt-1">
              {ppmSoluteMg.toFixed(2)}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">mg</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              = {ppmSoluteGrams.toFixed(5)} grams in {ppmSolutionVolumeL} L water.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          CONCEPT 6: BUFFER PH (Henderson-Hasselbalch)
      ========================================================================= */}
      {activeConcept === 'buffer' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-xs text-purple-950 dark:text-purple-200 leading-relaxed font-mono">
            <div>pH = pKa + log10([Conjugate Base A⁻] / [Weak Acid HA])</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Buffer Acid pKa
              </label>
              <input
                type="number"
                step="0.01"
                value={pKa}
                onChange={(e) => setPKa(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <div className="flex gap-1 flex-wrap pt-1">
                {[
                  { name: 'PBS (pKa2)', pka: 7.21 },
                  { name: 'Tris', pka: 8.06 },
                  { name: 'Acetate', pka: 4.76 }
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPKa(p.pka)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Target Buffer pH
              </label>
              <input
                type="number"
                step="0.01"
                value={desiredBufferPh}
                onChange={(e) => setDesiredBufferPh(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Total Buffer Molarity (M)
              </label>
              <input
                type="number"
                step="0.01"
                value={totalBufferConcM}
                onChange={(e) => setTotalBufferConcM(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-300">
                Total Volume (mL)
              </label>
              <input
                type="number"
                step="100"
                value={bufferVolumeMl}
                onChange={(e) => setBufferVolumeMl(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-3xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <span className="text-xs font-bold uppercase text-purple-700 dark:text-purple-400">
                1. Conjugate Base [A⁻]
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {(conjBaseM * 1000).toFixed(2)} <span className="text-sm font-medium">mM</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                = {(conjBaseM * (bufferVolumeMl / 1000)).toFixed(4)} moles
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                2. Weak Acid [HA]
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {(conjAcidM * 1000).toFixed(2)} <span className="text-sm font-medium">mM</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                = {(conjAcidM * (bufferVolumeMl / 1000)).toFixed(4)} moles
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
