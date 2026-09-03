'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';

export default function SerialDilutionCalculator() {
  const [colonyCount, setColonyCount] = useState<number>(85);
  const [dilutionExponent, setDilutionExponent] = useState<number>(-5);
  const [volumePlatedMl, setVolumePlatedMl] = useState<number>(0.1);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate CFU/mL:
  // Dilution Factor = 1 / 10^(dilutionExponent) = 10^(-dilutionExponent)
  // CFU/mL = (colonyCount * 10^(-dilutionExponent)) / volumePlatedMl
  const dilutionFactor = Math.pow(10, Math.abs(dilutionExponent));
  const cfuPerMl = volumePlatedMl > 0 ? (colonyCount * dilutionFactor) / volumePlatedMl : 0;

  const scientificCfu = cfuPerMl > 0 ? cfuPerMl.toExponential(3) : '0';
  const parts = scientificCfu.split('e');
  const mantissa = parts[0];
  const exponent = parts[1] ? parseInt(parts[1], 10) : 0;

  const isStatisticallyValid = colonyCount >= 30 && colonyCount <= 300;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${scientificCfu} CFU/mL`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            CFU/mL & Serial Dilution Calculator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Standard viable plate count formula: CFU/mL = (Colonies Counted × Dilution Factor) / Plating Volume (mL)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Colony count input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Colonies Counted (CFU)
          </label>
          <input
            type="number"
            min="0"
            max="1000"
            value={colonyCount}
            onChange={(e) => setColonyCount(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <span className={`text-[11px] font-medium flex items-center gap-1 ${isStatisticallyValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            <AlertCircle className="w-3.5 h-3.5" />
            {isStatisticallyValid ? 'Countable Range (30 - 300 CFU)' : colonyCount > 300 ? 'TNTC (>300 CFU)' : 'TFTC (<30 CFU)'}
          </span>
        </div>

        {/* Dilution tube input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Plated Dilution Tube
          </label>
          <select
            value={dilutionExponent}
            onChange={(e) => setDilutionExponent(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value={-1}>10⁻¹ (1:10 dilution)</option>
            <option value={-2}>10⁻² (1:100 dilution)</option>
            <option value={-3}>10⁻³ (1:1,000 dilution)</option>
            <option value={-4}>10⁻⁴ (1:10,000 dilution)</option>
            <option value={-5}>10⁻⁵ (1:100,000 dilution)</option>
            <option value={-6}>10⁻⁶ (1:1,000,000 dilution)</option>
            <option value={-7}>10⁻⁷ (1:10,000,000 dilution)</option>
          </select>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Dilution Factor = 10^{Math.abs(dilutionExponent)} ({dilutionFactor.toLocaleString()})
          </span>
        </div>

        {/* Volume plated input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Volume Inoculated on Plate
          </label>
          <select
            value={volumePlatedMl}
            onChange={(e) => setVolumePlatedMl(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value={0.1}>0.1 mL (100 µL Spread Plate)</option>
            <option value={0.05}>0.05 mL (50 µL Micro-drop)</option>
            <option value={0.2}>0.2 mL (200 µL)</option>
            <option value={1.0}>1.0 mL (Pour Plate Method)</option>
          </select>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Spread plate standard is 0.1 mL
          </span>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-cyan-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            Computed Stock Cell Concentration
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            {mantissa} × 10<sup>{exponent}</sup> <span className="text-lg font-medium text-slate-500 dark:text-slate-400">CFU/mL</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-mono">
            = {cfuPerMl.toLocaleString()} viable bacterial units per milliliter
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Result' : 'Copy Result'}
        </button>
      </div>

      {/* Step Breakdown */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
        <div><strong>Step 1:</strong> Colonies Counted = {colonyCount}</div>
        <div><strong>Step 2:</strong> Dilution Factor = 10^{Math.abs(dilutionExponent)} ({dilutionFactor.toLocaleString()})</div>
        <div><strong>Step 3:</strong> CFU/mL = ({colonyCount} × {dilutionFactor.toLocaleString()}) / {volumePlatedMl} = {scientificCfu} CFU/mL</div>
      </div>
    </div>
  );
}
