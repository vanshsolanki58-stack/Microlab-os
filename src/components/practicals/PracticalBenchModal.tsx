'use client';

import React, { useState, useEffect } from 'react';
import { Practical, ProtocolStep } from '@/types/microbiology';
import {
  X,
  Clock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  FlaskConical,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  practical: Practical;
  onClose: () => void;
}

export default function PracticalBenchModal({ practical, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'bench' | 'theory' | 'viva' | 'troubleshooting'>('bench');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [selectedViva, setSelectedViva] = useState<number | null>(null);

  // Timer interval handling
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch {
        // audio context fallback
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft]);

  const startStepTimer = (step: ProtocolStep) => {
    if (!step.durationSeconds) return;
    setActiveTimerStep(step.stepNumber);
    setTimeLeft(step.durationSeconds);
    setTimerRunning(true);
  };

  const toggleStepComplete = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
    } else {
      const next = [...completedSteps, stepNum];
      setCompletedSteps(next);
      if (next.length === practical.protocol.length) {
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // confetti fallback
        }
      }
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'bench', label: 'Protocol', count: `${completedSteps.length}/${practical.protocol.length}`, icon: FlaskConical },
    { id: 'theory', label: 'Theory & Principle', icon: BookOpen },
    { id: 'viva', label: 'Viva Q&A', count: practical.vivaQuestions.length, icon: GraduationCap },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: AlertTriangle }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Minimalist Top Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-4 shrink-0 bg-white dark:bg-slate-900">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${
                practical.level === 'BSc'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                  : practical.level === 'MSc'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                  : 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
              }`}>
                {practical.level} Tier
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {practical.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {practical.durationEstimate}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
              {practical.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
            title="Close Protocol"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Minimalist Navigation Bar (No Chopping / Full Horizontal Scroll) */}
        <div className="px-5 sm:px-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-800'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: MINIMALIST STEP-BY-STEP PROTOCOL */}
          {activeTab === 'bench' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Clean Minimal Requirements */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Required Bench Supplies:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Reagents: </span>
                    {practical.requirements.reagents.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Equipment: </span>
                    {practical.requirements.glasswareEquipment.join(', ')}
                  </div>
                </div>
              </div>

              {/* Steps Stepper */}
              <div className="space-y-3">
                {practical.protocol.map((step) => {
                  const isDone = completedSteps.includes(step.stepNumber);
                  const isTimerActive = activeTimerStep === step.stepNumber;

                  return (
                    <div
                      key={step.stepNumber}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50 opacity-90'
                          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Checkbox button */}
                          <button
                            onClick={() => toggleStepComplete(step.stepNumber)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400">
                                {step.stepNumber}
                              </span>
                            )}
                          </button>

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                {step.title}
                              </h3>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {step.description}
                            </p>

                            {/* Minimalist Warning */}
                            {step.criticalWarning && (
                              <div className="mt-2 text-xs flex items-start gap-1.5 text-amber-700 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/30 p-2 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                                <span>{step.criticalWarning}</span>
                              </div>
                            )}

                            {/* Minimalist Tip */}
                            {step.tip && (
                              <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                                <span>{step.tip}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Inline Timer Widget */}
                        {step.durationSeconds && (
                          <div className="shrink-0 flex items-center">
                            {isTimerActive ? (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-mono font-bold">
                                <span className={timeLeft === 0 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}>
                                  {formatTimer(timeLeft)}
                                </span>
                                <button
                                  onClick={() => setTimerRunning(!timerRunning)}
                                  className="p-1 hover:bg-slate-700 rounded"
                                >
                                  {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setTimeLeft(step.durationSeconds || 0);
                                    setTimerRunning(false);
                                  }}
                                  className="p-1 hover:bg-slate-700 rounded"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startStepTimer(step)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
                              >
                                <Clock className="w-3 h-3 text-emerald-500" />
                                <span>{formatTimer(step.durationSeconds)}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: THEORY & PRINCIPLE */}
          {activeTab === 'theory' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Aim of Practical
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                  {practical.aim}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Scientific Principle & Reaction Mechanism
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {practical.principle}
                </p>
              </div>

              {practical.reactionMechanism && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-1 text-xs text-indigo-950 dark:text-indigo-200 font-mono">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-sans">
                    Reaction Chemistry:
                  </div>
                  <div>{practical.reactionMechanism}</div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-1.5 text-xs">
                <div className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Expected Results & Interpretation:
                </div>
                <div className="text-slate-700 dark:text-slate-300 space-y-1">
                  <div><strong>Positive:</strong> {practical.expectedObservations.positiveResult}</div>
                  {practical.expectedObservations.negativeResult && (
                    <div><strong>Negative:</strong> {practical.expectedObservations.negativeResult}</div>
                  )}
                  <div><strong>Visual:</strong> {practical.expectedObservations.visualDescription}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MINIMALIST VIVA Q&A */}
          {activeTab === 'viva' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <p className="text-xs text-slate-400">
                Click any viva defense question to view model answer:
              </p>

              {practical.vivaQuestions.map((viva, idx) => {
                const isOpen = selectedViva === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedViva(isOpen ? null : idx)}
                    className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      <span>Q{idx + 1}: {viva.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </div>

                    {isOpen && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-emerald-600 dark:text-emerald-400">Answer: </strong>
                        {viva.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: MINIMALIST TROUBLESHOOTING */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Common Practical Errors & Solutions:
                </span>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {practical.troubleshootingTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
