'use client';

import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface TimePoint {
  timeMin: number;
  od600: number;
}

export default function GrowthKineticsCalculator() {
  const [dataPoints, setDataPoints] = useState<TimePoint[]>([
    { timeMin: 0, od600: 0.05 },
    { timeMin: 30, od600: 0.08 },
    { timeMin: 60, od600: 0.15 },
    { timeMin: 90, od600: 0.32 },
    { timeMin: 120, od600: 0.65 },
    { timeMin: 150, od600: 1.15 },
    { timeMin: 180, od600: 1.62 },
    { timeMin: 210, od600: 1.85 },
    { timeMin: 240, od600: 1.90 }
  ]);

  const [t1, setT1] = useState<number>(60);
  const [t2, setT2] = useState<number>(120);
  const [isLogScale, setIsLogScale] = useState<boolean>(false);

  const pt1 = dataPoints.find((p) => p.timeMin === t1) || dataPoints[2];
  const pt2 = dataPoints.find((p) => p.timeMin === t2) || dataPoints[4];

  // Specific Growth Rate (\mu) in hr^-1:
  // \mu = [ln(OD2) - ln(OD1)] / [(t2 - t1) in hours]
  const deltaHours = (pt2.timeMin - pt1.timeMin) / 60;
  const mu =
    deltaHours > 0 && pt1.od600 > 0 && pt2.od600 > 0
      ? (Math.log(pt2.od600) - Math.log(pt1.od600)) / deltaHours
      : 0;

  // Generation / Doubling Time (g) in minutes:
  // g = (ln(2) / \mu) * 60 minutes
  const doublingTimeMins = mu > 0 ? (Math.LN2 / mu) * 60 : 0;

  const handleAddPoint = () => {
    const lastTime = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].timeMin : 0;
    setDataPoints([...dataPoints, { timeMin: lastTime + 30, od600: 0.5 }]);
  };

  const handleDeletePoint = (index: number) => {
    if (dataPoints.length <= 2) return;
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, field: 'timeMin' | 'od600', val: number) => {
    const updated = [...dataPoints];
    updated[index][field] = val;
    setDataPoints(updated);
  };

  const chartData = dataPoints.map((p) => ({
    timeMin: p.timeMin,
    od600: p.od600,
    lnOd: p.od600 > 0 ? Number(Math.log(p.od600).toFixed(3)) : 0
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Bacterial Growth Kinetics & Doubling Time (g, µ)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Calculate Specific Growth Rate (µ) and Generation Time (g) from OD₆₀₀ data
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsLogScale(!isLogScale)}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isLogScale ? 'Showing: Semi-Log (ln OD)' : 'Showing: Linear (OD600)'}
        </button>
      </div>

      {/* Kinetic Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Selected Range
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
            {pt1.timeMin}m → {pt2.timeMin}m ({deltaHours.toFixed(1)} hrs)
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            OD: {pt1.od600} → {pt2.od600}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Specific Growth Rate (µ)
          </div>
          <div className="text-2xl font-black text-blue-900 dark:text-blue-200 mt-1">
            {mu.toFixed(3)} <span className="text-sm font-normal">hr⁻¹</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400">
            Slope of ln(OD) vs. time
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Generation Time (g)
          </div>
          <div className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1">
            {doublingTimeMins.toFixed(1)} <span className="text-sm font-normal">mins</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
            g = (ln(2) / µ) × 60
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Doublings per Hour
          </div>
          <div className="text-2xl font-black text-purple-900 dark:text-purple-200 mt-1">
            {doublingTimeMins > 0 ? (60 / doublingTimeMins).toFixed(2) : 0}{' '}
            <span className="text-sm font-normal">gen/hr</span>
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400">
            Generations per unit time (k)
          </div>
        </div>
      </div>

      {/* Chart and Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Curve Chart */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="timeMin" unit="m" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={isLogScale ? 'lnOd' : 'od600'}
                  name={isLogScale ? 'ln(OD600)' : 'OD600'}
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table and Interval Select */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Select 2 Log-Phase Points for Slope Calculation:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  Start Point (t₁)
                </span>
                <select
                  value={t1}
                  onChange={(e) => setT1(Number(e.target.value))}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-semibold"
                >
                  {dataPoints.map((p) => (
                    <option key={`t1-${p.timeMin}`} value={p.timeMin}>
                      {p.timeMin}m (OD: {p.od600})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  End Point (t₂)
                </span>
                <select
                  value={t2}
                  onChange={(e) => setT2(Number(e.target.value))}
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-semibold"
                >
                  {dataPoints.map((p) => (
                    <option key={`t2-${p.timeMin}`} value={p.timeMin}>
                      {p.timeMin}m (OD: {p.od600})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 sticky top-0">
                <tr>
                  <th className="p-2">Time (min)</th>
                  <th className="p-2">OD₆₀₀</th>
                  <th className="p-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {dataPoints.map((point, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-2">
                      <input
                        type="number"
                        value={point.timeMin}
                        onChange={(e) => handleUpdate(idx, 'timeMin', Number(e.target.value))}
                        className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={point.od600}
                        onChange={(e) => handleUpdate(idx, 'od600', Number(e.target.value))}
                        className="w-20 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      />
                    </td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => handleDeletePoint(idx)}
                        disabled={dataPoints.length <= 2}
                        className="text-red-500 hover:text-red-700 disabled:opacity-30 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleAddPoint}
            className="w-full py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Time Point
          </button>
        </div>
      </div>
    </div>
  );
}
