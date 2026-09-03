'use client';

import React, { useState } from 'react';
import { EquipmentSOP } from '@/types/microbiology';
import {
  X,
  Cog,
  ShieldAlert,
  Sliders,
  Wrench,
  AlertOctagon,
  CheckSquare,
  Layers,
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';

interface Props {
  equipment: EquipmentSOP;
  onClose: () => void;
}

export default function EquipmentDetailModal({ equipment, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'parts' | 'sop' | 'errors' | 'calibration'>('parts');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/70">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                equipment.level === 'BSc'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : equipment.level === 'MSc'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
              }`}>
                {equipment.level} Tier
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {equipment.category} Equipment
              </span>

              {equipment.aliases.map((alias, i) => (
                <span key={i} className="text-xs text-slate-500 dark:text-slate-400">
                  aka: {alias}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {equipment.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {equipment.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('parts')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'parts'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Parts & Hardware Anatomy ({equipment.partsUsed.length})
          </button>
          <button
            onClick={() => setActiveTab('sop')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'sop'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" /> Operational SOP (Step-by-Step)
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'errors'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-red-500" /> Error Causes & False Results ({equipment.causesOfErrorsAndFalseResults.length})
          </button>
          <button
            onClick={() => setActiveTab('calibration')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'calibration'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" /> Calibration & Maintenance
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PARTS USED & ANATOMY */}
          {activeTab === 'parts' && (
            <div className="space-y-6">
              {/* Working Principle */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <Cog className="w-4 h-4" /> Scientific Working Principle
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {equipment.principle}
                </p>
              </div>

              {/* Parts Used Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" /> Key Mechanical & Electronic Components Used
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {equipment.partsUsed.map((part, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {part.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                        {part.function}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPERATIONAL SOP */}
          {activeTab === 'sop' && (
            <div className="space-y-6">
              {/* Critical Safety Box */}
              <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Non-Negotiable Bench Safety Rules:
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
                  {equipment.criticalSafetyRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Three SOP Phases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Pre-Check */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">
                      Pre-Flight Checklist
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {equipment.standardOperatingProcedure.preCheck.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Operation */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">
                      Standard Run Operation
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {equipment.standardOperatingProcedure.operation.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">▶</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Shutdown */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="w-6 h-6 rounded-lg bg-slate-700 text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200">
                      Post-Run & Shutdown
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {equipment.standardOperatingProcedure.shutdown.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">■</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ERROR CAUSES & FALSE RESULTS */}
          {activeTab === 'errors' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200">
                <Info className="w-4 h-4 inline-block mr-1 text-amber-600" />
                This diagnostic matrix highlights the exact operational mistakes that cause laboratory contamination, sample loss, equipment damage, or false experimental data.
              </div>

              <div className="space-y-3">
                {equipment.causesOfErrorsAndFalseResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950/60 shadow-xs space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 rounded-xl shrink-0">
                        <AlertOctagon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400">
                          Error Symptom #{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.errorSymptom}
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                        <strong className="text-slate-700 dark:text-slate-300 block mb-1">
                          🔍 Underlying Technical Cause:
                        </strong>
                        <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.underlyingCause}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                        <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                          🛠️ Immediate Fix & Prevention SOP:
                        </strong>
                        <span className="text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                          {item.fixAndPrevention}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CALIBRATION & MAINTENANCE */}
          {activeTab === 'calibration' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> Calibration Protocol & Validation Standards
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {equipment.calibrationSteps.map((cal, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{cal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-emerald-500" /> Routine Preventive Maintenance Schedule
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {equipment.routineMaintenance.map((maint, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{maint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
