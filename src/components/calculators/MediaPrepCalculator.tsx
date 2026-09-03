'use client';

import React, { useState } from 'react';
import { FlaskConical, Sparkles, Scale, Info } from 'lucide-react';

interface MediaPreset {
  name: string;
  category: string;
  stdGramsPerLiter: number;
  agarGramsPerLiter: number;
  standardPh: string;
  autoclaveParams: string;
  components: { name: string; gPerLiter: number }[];
  instructions: string;
}

const mediaPresets: MediaPreset[] = [
  {
    name: 'Nutrient Agar (Standard General Purpose)',
    category: 'General Culture',
    stdGramsPerLiter: 28.0,
    agarGramsPerLiter: 15.0,
    standardPh: '7.0 ± 0.2',
    autoclaveParams: '121°C (15 psi) for 15 mins',
    components: [
      { name: 'Peptone / Enzymatic Digest', gPerLiter: 5.0 },
      { name: 'Beef Extract / Yeast Extract', gPerLiter: 3.0 },
      { name: 'Sodium Chloride (NaCl)', gPerLiter: 5.0 },
      { name: 'Bacteriological Agar', gPerLiter: 15.0 }
    ],
    instructions: 'Suspend powder in distilled water, heat with agitation to boiling to dissolve agar completely, autoclave at 121°C for 15 mins. Cool to 45-50°C in water bath before pouring plates (~20 mL per 90mm plate).'
  },
  {
    name: 'Luria-Bertani (LB) Broth / Agar (Miller Formula)',
    category: 'Molecular Biology',
    stdGramsPerLiter: 25.0,
    agarGramsPerLiter: 15.0,
    standardPh: '7.0 ± 0.1',
    autoclaveParams: '121°C (15 psi) for 15 mins',
    components: [
      { name: 'Tryptone', gPerLiter: 10.0 },
      { name: 'Yeast Extract', gPerLiter: 5.0 },
      { name: 'Sodium Chloride (NaCl)', gPerLiter: 10.0 },
      { name: 'Agar (if making solid plates)', gPerLiter: 15.0 }
    ],
    instructions: 'Dissolve in dH2O, adjust pH to 7.0 with 1N NaOH, autoclave. For antibiotic plates (Ampicillin 100µg/mL, Kanamycin 50µg/mL), allow agar to cool to 50°C before adding filter-sterilized antibiotics.'
  },
  {
    name: 'MacConkey Agar (Differential for Enterics)',
    category: 'Selective & Differential',
    stdGramsPerLiter: 51.5,
    agarGramsPerLiter: 13.5,
    standardPh: '7.1 ± 0.2',
    autoclaveParams: '121°C (15 psi) for 15 mins',
    components: [
      { name: 'Pancreatic Digest of Gelatin', gPerLiter: 17.0 },
      { name: 'Peptones (Meat & Casein)', gPerLiter: 3.0 },
      { name: 'Lactose Monohydrate', gPerLiter: 10.0 },
      { name: 'Bile Salts (No. 3)', gPerLiter: 1.5 },
      { name: 'Sodium Chloride', gPerLiter: 5.0 },
      { name: 'Neutral Red Indicator', gPerLiter: 0.03 },
      { name: 'Crystal Violet', gPerLiter: 0.001 },
      { name: 'Agar', gPerLiter: 13.5 }
    ],
    instructions: 'Suspend in distilled water, boil for 1 minute with stirring until dissolved, autoclave at 121°C for 15 minutes. Inhibits Gram-positive bacteria; differentiates lactose fermenters (pink/red) from non-fermenters (colorless).'
  },
  {
    name: 'Mueller-Hinton Agar (MHA - CLSI AST Standard)',
    category: 'Antimicrobial Testing',
    stdGramsPerLiter: 38.0,
    agarGramsPerLiter: 17.0,
    standardPh: '7.3 ± 0.1',
    autoclaveParams: '121°C (15 psi) for 15 mins',
    components: [
      { name: 'Beef Infusion solids', gPerLiter: 2.0 },
      { name: 'Acid Hydrolysate of Casein', gPerLiter: 17.5 },
      { name: 'Starch', gPerLiter: 1.5 },
      { name: 'Agar', gPerLiter: 17.0 }
    ],
    instructions: 'Prepare and autoclave at 121°C for 15 minutes. Cool to 48°C. Pour onto level surface to a precise depth of 4 mm (~25 mL per 90mm Petri dish).'
  },
  {
    name: 'Sabouraud Dextrose Agar (SDA - Fungal Isolation)',
    category: 'Mycology',
    stdGramsPerLiter: 65.0,
    agarGramsPerLiter: 15.0,
    standardPh: '5.6 ± 0.2',
    autoclaveParams: '121°C (15 psi) for 15 mins',
    components: [
      { name: 'Mycological Peptone', gPerLiter: 10.0 },
      { name: 'Dextrose (Glucose)', gPerLiter: 40.0 },
      { name: 'Agar', gPerLiter: 15.0 }
    ],
    instructions: 'Suspend in water, heat to boiling, autoclave at 121°C for 15 min. Low pH (5.6) suppresses bacterial growth and favors fungi/yeasts.'
  }
];

export default function MediaPrepCalculator() {
  const [selectedMediaIdx, setSelectedMediaIdx] = useState<number>(0);
  const [targetVolumeMl, setTargetVolumeMl] = useState<number>(500);
  const [customPlateCount, setCustomPlateCount] = useState<number>(25);
  const [usePlateMode, setUsePlateMode] = useState<boolean>(false);

  const media = mediaPresets[selectedMediaIdx];

  // Volume calculations:
  // In plate mode, volume = plateCount * 20 mL
  const effectiveVolumeMl = usePlateMode ? customPlateCount * 20 : targetVolumeMl;
  const scaleMultiplier = effectiveVolumeMl / 1000;
  const totalGramsNeeded = media.stdGramsPerLiter * scaleMultiplier;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
          <FlaskConical className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Culture Media Batch Scaler & Recipe Formulator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Scale dehydrated powders or prepare from scratch for custom volumes and Petri dish batches
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Media Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Select Standard Media Formulation
          </label>
          <select
            value={selectedMediaIdx}
            onChange={(e) => setSelectedMediaIdx(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
          >
            {mediaPresets.map((m, idx) => (
              <option key={idx} value={idx}>
                {m.name} ({m.category})
              </option>
            ))}
          </select>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>Standard: <strong>{media.stdGramsPerLiter} g/L</strong></span>
            <span>•</span>
            <span>pH: <strong>{media.standardPh}</strong></span>
          </div>
        </div>

        {/* Volume Mode Toggle & Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Batch Quantity Goal
            </label>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setUsePlateMode(false)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${!usePlateMode ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                By Volume (mL)
              </button>
              <button
                onClick={() => setUsePlateMode(true)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${usePlateMode ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                By Plates (90mm)
              </button>
            </div>
          </div>

          {!usePlateMode ? (
            <div className="flex gap-2">
              <input
                type="number"
                min="10"
                max="10000"
                step="50"
                value={targetVolumeMl}
                onChange={(e) => setTargetVolumeMl(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="flex items-center px-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-semibold">
                mL
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="200"
                value={customPlateCount}
                onChange={(e) => setCustomPlateCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <span className="flex items-center px-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 text-sm font-semibold">
                Plates (~{customPlateCount * 20} mL)
              </span>
            </div>
          )}
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Estimated plates yield: ~{Math.floor(effectiveVolumeMl / 20)} plates (at 20 mL/plate)
          </span>
        </div>
      </div>

      {/* Result Hero Banner */}
      <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-yellow-500/15 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-yellow-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Scale className="w-4 h-4" />
              Total Ready-Mix Powder to Weigh
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              {totalGramsNeeded.toFixed(2)}{' '}
              <span className="text-xl font-medium text-slate-500 dark:text-slate-400">grams</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Suspend in exactly <strong>{effectiveVolumeMl} mL</strong> of distilled water ($dH_2O$)
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/50 text-xs space-y-1">
            <div><strong>Autoclave:</strong> {media.autoclaveParams}</div>
            <div><strong>Pour Temp:</strong> 45°C - 50°C (comfortably warm to bare hand)</div>
            <div><strong>Target pH:</strong> {media.standardPh}</div>
          </div>
        </div>
      </div>

      {/* Reagent Breakdown Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-500" />
          Raw Chemical Component Breakdown (To prepare from scratch):
        </h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5">Component / Reagent</th>
                <th className="p-2.5">Standard Recipe (1.0 L)</th>
                <th className="p-2.5 text-right font-bold text-amber-600 dark:text-amber-400">
                  Mass for {effectiveVolumeMl} mL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {media.components.map((comp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-2.5 font-sans font-medium text-slate-800 dark:text-slate-200">
                    {comp.name}
                  </td>
                  <td className="p-2.5 text-slate-500 dark:text-slate-400">
                    {comp.gPerLiter.toFixed(2)} g
                  </td>
                  <td className="p-2.5 text-right font-bold text-slate-900 dark:text-white">
                    {(comp.gPerLiter * scaleMultiplier).toFixed(3)} g
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/30 text-xs text-slate-600 dark:text-slate-300">
        <strong>Bench Advice:</strong> {media.instructions}
      </div>
    </div>
  );
}
