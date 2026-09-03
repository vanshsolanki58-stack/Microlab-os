'use client';

import React, { useState } from 'react';
import { equipmentData } from '@/data/equipmentData';
import { EquipmentSOP, AcademicLevel } from '@/types/microbiology';
import EquipmentDetailModal from '@/components/equipment/EquipmentDetailModal';
import {
  Cog,
  Search,
  Filter,
  ArrowRight,
  Shield,
  Layers,
  Wrench,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface Props {
  selectedLevel: AcademicLevel;
}

export default function EquipmentDirectory({ selectedLevel }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeEquipment, setActiveEquipment] = useState<EquipmentSOP | null>(null);

  const categories = [
    'All',
    'Sterilization',
    'Imaging',
    'Containment',
    'Analytical',
    'Incubation & Mixing',
    'Centrifugation',
    'Molecular & Electrophoresis',
    'Fermentation'
  ];

  // Filter equipment based on global academic level + local category + search
  const filteredEquipment = equipmentData.filter((item) => {
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aliases.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Laboratory Machinery Directory
              </h2>
              {selectedLevel !== 'All' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                  {selectedLevel} Level Equipment
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any instrument below to view its working principle, physical parts, step-by-step SOP, calibration, and error prevention guide.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machinery name or alias..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Machinery Name-First List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            onClick={() => setActiveEquipment(eq)}
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  eq.level === 'BSc'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : eq.level === 'MSc'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                }`}>
                  {eq.level} Tier
                </span>

                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {eq.category}
                </span>
              </div>

              {/* Machinery Name as primary visual focal point */}
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {eq.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {eq.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" /> {eq.partsUsed.length} Key Parts
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Wrench className="w-3.5 h-3.5 text-amber-500" /> SOP & Calibration
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
              <span>View Full SOP, Parts & Diagnostics</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Detail Modal */}
      {activeEquipment && (
        <EquipmentDetailModal
          equipment={activeEquipment}
          onClose={() => setActiveEquipment(null)}
        />
      )}
    </div>
  );
}
