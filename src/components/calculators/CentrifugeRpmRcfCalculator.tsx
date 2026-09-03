'use client';

import React, { useState } from 'react';
import { Orbit, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export default function CentrifugeRpmRcfCalculator() {
  const [mode, setMode] = useState<'rpmToRcf' | 'rcfToRpm'>('rpmToRcf');
  const [rpm, setRpm] = useState<number>(10000);
  const [rcf, setRcf] = useState<number>(8000);
  const [radiusMm, setRadiusMm] = useState<number>(85); // Rotor radius in mm (typically 50 - 150 mm)

  // Standard Formula:
  // RCF (g-force) = 1.118 * 10^(-5) * r_cm * RPM^2
  // r_cm = radiusMm / 10
  const radiusCm = radiusMm / 10;

  // Computed Values:
  const computedRcf = 1.118e-5 * radiusCm * Math.pow(rpm, 2);
  const computedRpm = radiusCm > 0 && rcf > 0 ? Math.sqrt(rcf / (1.118e-5 * radiusCm)) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl">
            <Orbit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Centrifuge Speed Converter (RPM ↔ RCF / g-Force)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Protocol centrifugation speeds should always be reported in g-force (RCF) for universal reproducibility
            </p>
          </div>
        </div>

        <button
          onClick={() => setMode(mode === 'rpmToRcf' ? 'rcfToRpm' : 'rpmToRcf')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors self-start sm:self-auto"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-rose-500" />
          Switch Direction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Speed Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {mode === 'rpmToRcf' ? 'Rotor Revolutions (RPM)' : 'Target Relative Centrifugal Force (RCF / × g)'}
          </label>
          <input
            type="number"
            min="100"
            max="100000"
            step="100"
            value={mode === 'rpmToRcf' ? rpm : rcf}
            onChange={(e) =>
              mode === 'rpmToRcf'
                ? setRpm(Number(e.target.value))
                : setRcf(Number(e.target.value))
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {mode === 'rpmToRcf' ? 'Tachometer speed' : 'Protocol specification in × g'}
          </span>
        </div>

        {/* Rotor Radius Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Rotor Radius (r in mm)
          </label>
          <input
            type="number"
            min="10"
            max="300"
            value={radiusMm}
            onChange={(e) => setRadiusMm(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
          <div className="flex gap-2 flex-wrap pt-1">
            {[
              { name: 'Microfuge 1.5mL (70mm)', r: 70 },
              { name: 'Benchtop 15mL (85mm)', r: 85 },
              { name: 'High-Speed (115mm)', r: 115 }
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => setRadiusMm(preset.r)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-gradient-to-br from-rose-500/15 via-pink-500/5 to-orange-500/15 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-orange-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          {mode === 'rpmToRcf' ? 'Computed Relative Centrifugal Force' : 'Set Centrifuge Tachometer To'}
        </div>
        <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          {mode === 'rpmToRcf' ? (
            <>
              {Math.round(computedRcf).toLocaleString()}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">× g (RCF)</span>
            </>
          ) : (
            <>
              {Math.round(computedRpm).toLocaleString()}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">RPM</span>
            </>
          )}
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-mono">
          Formula: RCF = 1.118 × 10⁻⁵ × {radiusCm} cm × (RPM)²
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          <strong>Critical Lab Safety:</strong> Always balance centrifuge tubes with opposing blanks of equal weight (within ±0.01 g) before spinning. An unbalanced rotor at 10,000 RPM can shatter the rotor and motor spindle.
        </span>
      </div>
    </div>
  );
}
