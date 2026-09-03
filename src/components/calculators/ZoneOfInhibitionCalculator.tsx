'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

interface AntibioticStandard {
  id: string;
  name: string;
  code: string;
  potency: string;
  organismGroup: string;
  resistantMaxMm: number;
  intermediateMinMm: number;
  intermediateMaxMm: number;
  susceptibleMinMm: number;
  clinicalNote: string;
}

const clsiAntibiotics: AntibioticStandard[] = [
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    code: 'CIP-5',
    potency: '5 µg',
    organismGroup: 'Enterobacteriaceae & Pseudomonas',
    resistantMaxMm: 15,
    intermediateMinMm: 16,
    intermediateMaxMm: 20,
    susceptibleMinMm: 21,
    clinicalNote: 'Broad-spectrum fluoroquinolone targeting bacterial DNA gyrase (topoisomerase II).'
  },
  {
    id: 'ampicillin',
    name: 'Ampicillin',
    code: 'AMP-10',
    potency: '10 µg',
    organismGroup: 'Enterobacteriaceae',
    resistantMaxMm: 13,
    intermediateMinMm: 14,
    intermediateMaxMm: 16,
    susceptibleMinMm: 17,
    clinicalNote: 'Beta-lactam targeting transpeptidase. High resistance rates due to beta-lactamases.'
  },
  {
    id: 'gentamicin',
    name: 'Gentamicin',
    code: 'CN-10',
    potency: '10 µg',
    organismGroup: 'Enterobacteriaceae & Staphylococci',
    resistantMaxMm: 12,
    intermediateMinMm: 13,
    intermediateMaxMm: 14,
    susceptibleMinMm: 15,
    clinicalNote: 'Aminoglycoside binding the 30S ribosomal subunit to inhibit protein synthesis.'
  },
  {
    id: 'tetracycline',
    name: 'Tetracycline',
    code: 'TE-30',
    potency: '30 µg',
    organismGroup: 'General Aerobes',
    resistantMaxMm: 14,
    intermediateMinMm: 15,
    intermediateMaxMm: 18,
    susceptibleMinMm: 19,
    clinicalNote: 'Binds reversibly to 30S subunit, preventing aminoacyl-tRNA attachment.'
  },
  {
    id: 'vancomycin',
    name: 'Vancomycin',
    code: 'VA-30',
    potency: '30 µg',
    organismGroup: 'Staphylococcus aureus (MRSA)',
    resistantMaxMm: 14,
    intermediateMinMm: 15,
    intermediateMaxMm: 16,
    susceptibleMinMm: 17,
    clinicalNote: 'Glycopeptide inhibiting cell wall synthesis. Note: CLSI recommends broth microdilution for VISA/VRSA.'
  },
  {
    id: 'chloramphenicol',
    name: 'Chloramphenicol',
    code: 'C-30',
    potency: '30 µg',
    organismGroup: 'General Bacteria',
    resistantMaxMm: 12,
    intermediateMinMm: 13,
    intermediateMaxMm: 17,
    susceptibleMinMm: 18,
    clinicalNote: 'Inhibits peptidyl transferase on 50S ribosomal subunit.'
  }
];

export default function ZoneOfInhibitionCalculator() {
  const [selectedAntibioticId, setSelectedAntibioticId] = useState<string>('ciprofloxacin');
  const [measuredDiameterMm, setMeasuredDiameterMm] = useState<number>(24);

  const ab = clsiAntibiotics.find((a) => a.id === selectedAntibioticId) || clsiAntibiotics[0];

  // Determine CLSI Interpretation:
  let status: 'Susceptible' | 'Intermediate' | 'Resistant' = 'Susceptible';
  if (measuredDiameterMm <= ab.resistantMaxMm) {
    status = 'Resistant';
  } else if (
    measuredDiameterMm >= ab.intermediateMinMm &&
    measuredDiameterMm <= ab.intermediateMaxMm
  ) {
    status = 'Intermediate';
  } else {
    status = 'Susceptible';
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2.5 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Kirby-Bauer Zone of Inhibition (CLSI M100 Matcher)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare measured clearing diameter (mm) against Clinical & Laboratory Standards Institute breakpoints
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Antibiotic Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Select Antibiotic Disc & Potency
          </label>
          <select
            value={selectedAntibioticId}
            onChange={(e) => setSelectedAntibioticId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
          >
            {clsiAntibiotics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.code}, {item.potency}) — {item.organismGroup}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Target organism group: {ab.organismGroup}
          </span>
        </div>

        {/* Measured Diameter Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Measured Zone Diameter (including 6mm disc)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="6"
              max="45"
              value={measuredDiameterMm}
              onChange={(e) => setMeasuredDiameterMm(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="w-20 px-3 py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-base">
              {measuredDiameterMm} mm
            </div>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Minimum diameter is 6 mm (no clearing beyond disc)
          </span>
        </div>
      </div>

      {/* Breakpoint Bar Diagram */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>CLSI Breakpoint Range:</span>
          <span className="font-mono">
            R: ≤{ab.resistantMaxMm}mm | I: {ab.intermediateMinMm}-{ab.intermediateMaxMm}mm | S: ≥{ab.susceptibleMinMm}mm
          </span>
        </div>

        <div className="h-6 w-full rounded-lg overflow-hidden flex font-bold text-[10px] text-white text-center leading-6">
          <div
            style={{ width: `${(ab.resistantMaxMm / 40) * 100}%` }}
            className="bg-red-500 hover:opacity-90 transition-all flex items-center justify-center"
          >
            Resistant (≤{ab.resistantMaxMm}mm)
          </div>
          <div
            style={{
              width: `${((ab.intermediateMaxMm - ab.resistantMaxMm) / 40) * 100}%`
            }}
            className="bg-amber-500 hover:opacity-90 transition-all flex items-center justify-center"
          >
            Intermediate
          </div>
          <div className="flex-1 bg-emerald-500 hover:opacity-90 transition-all flex items-center justify-center">
            Susceptible (≥{ab.susceptibleMinMm}mm)
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div
        className={`border rounded-2xl p-5 flex items-center justify-between gap-4 transition-all ${
          status === 'Susceptible'
            ? 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
            : status === 'Intermediate'
            ? 'bg-amber-500/10 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            : 'bg-red-500/10 border-red-300 dark:border-red-800 text-red-950 dark:text-red-200'
        }`}
      >
        <div className="flex items-center gap-3.5">
          {status === 'Susceptible' && (
            <div className="p-3 bg-emerald-500 text-white rounded-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          )}
          {status === 'Intermediate' && (
            <div className="p-3 bg-amber-500 text-white rounded-xl">
              <AlertTriangle className="w-7 h-7" />
            </div>
          )}
          {status === 'Resistant' && (
            <div className="p-3 bg-red-500 text-white rounded-xl">
              <XCircle className="w-7 h-7" />
            </div>
          )}

          <div>
            <div className="text-xs uppercase font-bold tracking-wider opacity-80">
              Clinical Interpretation (CLSI M100)
            </div>
            <div className="text-2xl sm:text-3xl font-black">
              {ab.name} — {status.toUpperCase()}
            </div>
            <div className="text-xs mt-0.5 opacity-90">
              Measured: <strong>{measuredDiameterMm} mm</strong> (Threshold for Susceptible: ≥{ab.susceptibleMinMm} mm)
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
        <Info className="w-4 h-4 shrink-0 text-teal-500 mt-0.5" />
        <span><strong>Pharmacological Context:</strong> {ab.clinicalNote}</span>
      </div>
    </div>
  );
}
