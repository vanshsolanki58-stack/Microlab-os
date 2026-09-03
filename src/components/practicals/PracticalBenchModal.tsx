'use client';

import React, { useState, useEffect } from 'react';
import { Practical, ProtocolStep } from '@/types/microbiology';
import {
  X,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  FlaskConical,
  GraduationCap
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
      // Play audio notification beep if browser allows
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch {
        // AudioContext ignored if blocked by autoplay policy
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
        // All steps finished! Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                practical.level === 'BSc'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : practical.level === 'MSc'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
              }`}>
                {practical.level} Tier
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {practical.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Shield className="w-3 h-3" /> {practical.biosafetyLevel}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Est: {practical.durationEstimate}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {practical.title}
            </h2>
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
            onClick={() => setActiveTab('bench')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'bench'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> Interactive Bench Protocol ({completedSteps.length}/{practical.protocol.length})
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'theory'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Aim, Principle & Chemistry
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'viva'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Viva & Defense Questions ({practical.vivaQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'troubleshooting'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Error Troubleshooting
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'bench' && (
            <div className="space-y-6">
              {/* Materials & Reagents Pill Grid */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Bench Requirements Checklist:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                  {practical.requirements.microorganisms && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <strong className="text-slate-900 dark:text-white block mb-1">Microorganisms:</strong>
                      <span className="text-slate-600 dark:text-slate-300 italic">
                        {practical.requirements.microorganisms.join(', ')}
                      </span>
                    </div>
                  )}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">Reagents:</strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {practical.requirements.reagents.join(', ')}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-white block mb-1">Apparatus & PPE:</strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {[...practical.requirements.glasswareEquipment, ...practical.requirements.safetyPPE].join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Protocol Step Timeline */}
              <div className="space-y-4">
                {practical.protocol.map((step) => {
                  const isDone = completedSteps.includes(step.stepNumber);
                  const isTimerActive = activeTimerStep === step.stepNumber;

                  return (
                    <div
                      key={step.stepNumber}
                      className={`p-5 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <button
                            onClick={() => toggleStepComplete(step.stepNumber)}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                            }`}
                          >
                            {isDone && <CheckCircle className="w-4 h-4" />}
                          </button>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                Step {step.stepNumber}
                              </span>
                              <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {step.description}
                            </p>

                            {step.criticalWarning && (
                              <div className="mt-2.5 flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 font-medium">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                                <span><strong>Warning:</strong> {step.criticalWarning}</span>
                              </div>
                            )}

                            {step.tip && (
                              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">
                                💡 Tip: {step.tip}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Step Timer if defined */}
                        {step.durationSeconds && (
                          <div className="shrink-0 flex flex-col items-end gap-1.5">
                            {isTimerActive ? (
                              <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md">
                                <span className={timeLeft === 0 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}>
                                  {formatTimer(timeLeft)}
                                </span>
                                <button
                                  onClick={() => setTimerRunning(!timerRunning)}
                                  className="p-1 hover:bg-slate-800 rounded"
                                >
                                  {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  onClick={() => {
                                    setTimeLeft(step.durationSeconds || 0);
                                    setTimerRunning(false);
                                  }}
                                  className="p-1 hover:bg-slate-800 rounded"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startStepTimer(step)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                              >
                                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                Timer ({formatTimer(step.durationSeconds)})
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

          {activeTab === 'theory' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Aim & Scope
                </h3>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  {practical.aim}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Detailed Scientific Principle
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {practical.principle}
                </p>
              </div>

              {practical.reactionMechanism && (
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2 font-mono text-xs text-indigo-900 dark:text-indigo-200">
                  <strong className="block text-indigo-700 dark:text-indigo-400 font-sans uppercase font-bold text-xs">
                    Chemical Reactions & Stoichiometry:
                  </strong>
                  {practical.reactionMechanism}
                </div>
              )}

              <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Expected Results & Interpretation Guide
                </h3>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2">
                  <div><strong>Positive:</strong> {practical.expectedObservations.positiveResult}</div>
                  {practical.expectedObservations.negativeResult && (
                    <div><strong>Negative:</strong> {practical.expectedObservations.negativeResult}</div>
                  )}
                  <div><strong>Visual:</strong> {practical.expectedObservations.visualDescription}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'viva' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Click each card to expand the examiner's expected answer and scientific rationale:
              </div>

              {practical.vivaQuestions.map((viva, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedViva(selectedViva === idx ? null : idx)}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 cursor-pointer transition-all bg-white dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      Q{idx + 1}: {viva.question}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      {selectedViva === idx ? 'Hide Answer' : 'Show Answer'}
                    </span>
                  </div>

                  {selectedViva === idx && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                      <strong>Answer:</strong> {viva.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                  Common Practical Errors & Solutions:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {practical.troubleshootingTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
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
