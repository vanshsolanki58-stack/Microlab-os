'use client';

import React, { useState, useEffect } from 'react';
import { LabNoteEntry } from '@/types/microbiology';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  Save,
  Check
} from 'lucide-react';

export default function DigitalLabNotebook() {
  const [entries, setEntries] = useState<LabNoteEntry[]>([
    {
      id: 'entry-1',
      title: 'Gram Staining of Soil Unknown Isolate #4B',
      date: '2026-09-02',
      sampleId: 'SOIL-ISO-4B',
      organism: 'Bacillus subtilis-like isolate',
      observations: 'Microscopic field revealed long purple rod chains under 100x oil immersion. Clear oval uncolored spore-like voids observed inside cell centers.',
      calculatedCfu: 1200000,
      dilutionFactor: '10^-5 (120 colonies)',
      notes: 'Passed Schaeffer-Fulton confirmative spore test. Stored slant at 4°C.',
      tags: ['Gram Stain', 'Soil Microbes', 'Endospores']
    }
  ]);

  const [activeEntryId, setActiveEntryId] = useState<string>('entry-1');
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  const activeEntry = entries.find((e) => e.id === activeEntryId) || entries[0];

  const handleCreateNew = () => {
    const newEntry: LabNoteEntry = {
      id: `entry-${Date.now()}`,
      title: 'New Microbiology Lab Session',
      date: new Date().toISOString().split('T')[0],
      sampleId: `SAMPLE-${Math.floor(100 + Math.random() * 900)}`,
      organism: '',
      observations: '',
      calculatedCfu: undefined,
      dilutionFactor: '',
      notes: '',
      tags: ['Benchwork']
    };
    setEntries([newEntry, ...entries]);
    setActiveEntryId(newEntry.id);
  };

  const handleUpdateActive = (field: keyof LabNoteEntry, val: string | number | string[]) => {
    setEntries(
      entries.map((e) => (e.id === activeEntryId ? { ...e, [field]: val } : e))
    );
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleDelete = (id: string) => {
    if (entries.length <= 1) return;
    const remaining = entries.filter((e) => e.id !== id);
    setEntries(remaining);
    setActiveEntryId(remaining[0].id);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `microlab_notebook_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Electronic Lab Notebook (ELN)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Log daily practical observations, sample IDs, CFU calculations, and export records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Lab Note
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all"
          >
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Note List */}
        <div className="md:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {entries.map((entry) => {
            const isSelected = entry.id === activeEntryId;
            return (
              <div
                key={entry.id}
                onClick={() => setActiveEntryId(entry.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 shadow-xs'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" /> {entry.date}
                  </span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {entry.sampleId}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {entry.title || 'Untitled Session'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {entry.organism ? `Organism: ${entry.organism}` : entry.observations || 'No observations yet'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Note Editor */}
        {activeEntry && (
          <div className="md:col-span-8 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={activeEntry.title}
                onChange={(e) => handleUpdateActive('title', e.target.value)}
                placeholder="Practical Title / Experiment Name"
                className="text-base sm:text-lg font-bold bg-transparent text-slate-900 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-purple-500 focus:outline-none w-full"
              />

              <div className="flex items-center gap-2 shrink-0">
                {savedStatus && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Auto-saved
                  </span>
                )}
                <button
                  onClick={() => handleDelete(activeEntry.id)}
                  disabled={entries.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Sample ID</label>
                <input
                  type="text"
                  value={activeEntry.sampleId}
                  onChange={(e) => handleUpdateActive('sampleId', e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Date</label>
                <input
                  type="date"
                  value={activeEntry.date}
                  onChange={(e) => handleUpdateActive('date', e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Organism / Strain</label>
                <input
                  type="text"
                  value={activeEntry.organism}
                  placeholder="e.g. E. coli K12"
                  onChange={(e) => handleUpdateActive('organism', e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 italic"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Microscopic & Macroscopic Observations:
              </label>
              <textarea
                rows={4}
                value={activeEntry.observations}
                onChange={(e) => handleUpdateActive('observations', e.target.value)}
                placeholder="Describe colony color, margin, elevation, Gram reaction, motility, or biochemical color shifts..."
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Dilution & Count Metadata:
                </label>
                <input
                  type="text"
                  value={activeEntry.dilutionFactor}
                  placeholder="e.g. 10^-5 (85 colonies)"
                  onChange={(e) => handleUpdateActive('dilutionFactor', e.target.value)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Computed Viable Count (CFU/mL):
                </label>
                <input
                  type="number"
                  value={activeEntry.calculatedCfu || ''}
                  placeholder="e.g. 8500000"
                  onChange={(e) => handleUpdateActive('calculatedCfu', Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Bench Notes, Viva Insights & Storage:
              </label>
              <textarea
                rows={2}
                value={activeEntry.notes}
                onChange={(e) => handleUpdateActive('notes', e.target.value)}
                placeholder="Incubation conditions, glycerol stock location, next steps..."
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
