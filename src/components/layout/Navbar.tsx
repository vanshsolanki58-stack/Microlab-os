'use client';

import React from 'react';
import {
  FlaskConical,
  Sparkles,
  Search,
  Flame,
  Menu,
  X,
  Bot,
  GraduationCap,
  FlaskRound,
  Calculator
} from 'lucide-react';
import { AcademicLevel } from '@/types/microbiology';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLevel: AcademicLevel;
  setSelectedLevel: (level: AcademicLevel) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isRedMode: boolean;
  setIsRedMode: (val: boolean) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedLevel,
  setSelectedLevel,
  searchQuery,
  setSearchQuery,
  isRedMode,
  setIsRedMode
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'practicals', label: 'Practicals Repository', icon: FlaskConical },
    { id: 'vision', label: 'AI Colony Counter', icon: Sparkles, badge: 'AI' },
    { id: 'calculators', label: 'Bio Calculators', icon: Calculator },
    { id: 'equipment', label: 'Machinery SOPs', icon: FlaskConical },
    { id: 'troubleshooting', label: 'Diagnostic Solver', icon: Flame },
    { id: 'notebook', label: 'Lab Notebook', icon: GraduationCap },
    { id: 'copilot', label: 'AI BioCopilot', icon: Bot, badge: 'AI' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('practicals')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                  Micro<span className="text-emerald-600 dark:text-emerald-400">Lab</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                Laboratory Assistant & AI Platform
              </p>
            </div>
          </div>

          {/* Academic Tier Filter (Desktop) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            {(['All', 'BSc', 'MSc', 'PhD'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl === 'All' ? 'All Tiers' : `${lvl} Level`}
              </button>
            ))}
          </div>

          {/* Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search practicals, reagents, stains..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
            />
          </div>

          {/* Right Controls: Microscope Red Mode & Mobile Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRedMode(!isRedMode)}
              title="Microscope Darkroom Red Mode"
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isRedMode
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Red Light</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Primary Nav Bar Tabs */}
        <div className="hidden lg:flex items-center gap-1 py-2 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto text-xs font-bold">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white"
            />
          </div>

          {/* Mobile Tier Selector */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            {(['All', 'BSc', 'MSc', 'PhD'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`flex-1 py-1.5 rounded-lg text-center ${
                  selectedLevel === lvl
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Mobile Nav Links */}
          <div className="space-y-1 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-indigo-500 text-white font-extrabold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
