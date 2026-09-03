'use client';

import React, { useState } from 'react';
import { Beaker, Sparkles } from 'lucide-react';

export default function MolarityDilutionCalculator() {
  const [activeTab, setActiveTab] = useState<'molarity' | 'c1v1'>('c1v1');

  // C1V1 = C2V2 State:
  const [c1, setC1] = useState<number>(100); // 100 mg/mL or 100 mM
  const [c1Unit, setC1Unit] = useState<string>('mM');
  const [c2, setC2] = useState<number>(5); // 5 mM
  const [v2, setV2] = useState<number>(50); // 50 mL
  const [v2Unit, setV2Unit] = useState<string>('mL');

  // Solid Molarity State:
  const [molecularWeight, setMolecularWeight] = useState<number>(58.44); // NaCl default
  const [targetMolarity, setTargetMolarity] = useState<number>(1.0); // 1.0 M
  const [targetVolume, setTargetVolume] = useState<number>(250); // 250 mL

  // Calculations:
  // C1 * V1 = C2 * V2 -> V1 = (C2 * V2) / C1
  const requiredStockV1 = c1 > 0 ? (c2 * v2) / c1 : 0;
  const diluentVolume = Math.max(0, v2 - requiredStockV1);

  // Mass (g) = Molarity (mol/L) * Volume (L) * Molecular Weight (g/mol)
  const massGrams = (targetMolarity * (targetVolume / 1000) * molecularWeight);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Beaker className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Reagent Molarity & Dilution Calculator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Solve stock dilutions (C₁V₁ = C₂V₂) or solid reagent weighing mass
            </p>
          </div>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('c1v1')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'c1v1'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            C₁V₁ = C₂V₂ Dilution
          </button>
          <button
            onClick={() => setActiveTab('molarity')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'molarity'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Solid Molarity (Mass = M · V · MW)
          </button>
        </div>
      </div>

      {activeTab === 'c1v1' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Stock Concentration C1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Stock Concentration (C₁)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.001"
                  step="any"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <select
                  value={c1Unit}
                  onChange={(e) => setC1Unit(e.target.value)}
                  className="px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="M">M</option>
                  <option value="mM">mM</option>
                  <option value="µM">µM</option>
                  <option value="mg/mL">mg/mL</option>
                  <option value="%">% (w/v)</option>
                  <option value="X">X (e.g. 50X)</option>
                </select>
              </div>
            </div>

            {/* Target Concentration C2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Desired Working Conc (C₂)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.0001"
                  step="any"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {c1Unit}
                </span>
              </div>
            </div>

            {/* Target Volume V2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Desired Final Volume (V₂)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={v2}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <select
                  value={v2Unit}
                  onChange={(e) => setV2Unit(e.target.value)}
                  className="px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="mL">mL</option>
                  <option value="µL">µL</option>
                  <option value="L">L</option>
                </select>
              </div>
            </div>
          </div>

          {/* C1V1 Result Banner */}
          <div className="bg-gradient-to-br from-indigo-500/15 via-blue-500/5 to-purple-500/15 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
              Preparation Recipe
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Pipette <span className="text-indigo-600 dark:text-indigo-400">{requiredStockV1.toFixed(3)} {v2Unit}</span> of Stock ({c1} {c1Unit})
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
              Add to <strong>{diluentVolume.toFixed(3)} {v2Unit}</strong> of solvent / sterile water to bring total volume up to <strong>{v2} {v2Unit}</strong>.
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Formula Weight / MW (g/mol)
              </label>
              <input
                type="number"
                step="any"
                value={molecularWeight}
                onChange={(e) => setMolecularWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <div className="flex gap-1.5 flex-wrap pt-1">
                {[
                  { name: 'NaCl', mw: 58.44 },
                  { name: 'Tris-Base', mw: 121.14 },
                  { name: 'Glucose', mw: 180.16 },
                  { name: 'EDTA-Na2', mw: 372.24 }
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setMolecularWeight(preset.mw)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-slate-600 dark:text-slate-300 font-semibold"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Desired Molarity (Molar, M)
              </label>
              <input
                type="number"
                step="any"
                value={targetMolarity}
                onChange={(e) => setTargetMolarity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {targetMolarity * 1000} mM
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Target Solution Volume (mL)
              </label>
              <input
                type="number"
                step="any"
                value={targetVolume}
                onChange={(e) => setTargetVolume(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                = {(targetVolume / 1000).toFixed(3)} Liters
              </span>
            </div>
          </div>

          {/* Molarity Result Banner */}
          <div className="bg-gradient-to-br from-indigo-500/15 via-blue-500/5 to-purple-500/15 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Required Dry Chemical Mass
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              {massGrams.toFixed(4)}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">grams</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-mono">
              Formula: Mass (g) = {targetMolarity} M × {(targetVolume / 1000).toFixed(3)} L × {molecularWeight} g/mol = {massGrams.toFixed(4)} g
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
