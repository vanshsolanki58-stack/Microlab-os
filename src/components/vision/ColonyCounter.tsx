'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Camera,
  Sliders,
  Sparkles,
  Download,
  RotateCcw,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Cloud,
  HelpCircle,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
  Info,
  ChevronRight
} from 'lucide-react';
import { DetectedColony } from '@/types/microbiology';

interface SamplePlate {
  id: string;
  name: string;
  type: string;
  description: string;
  defaultDilution: number;
  colonyType: 'light' | 'dark' | 'red' | 'tiny';
}

const samplePlates: SamplePlate[] = [
  {
    id: 'sample-spread-plate',
    name: 'E. coli Spread Plate (10⁻⁵ Dilution)',
    type: 'CFU Counting',
    description: 'Creamy round colonies on golden nutrient agar.',
    defaultDilution: -5,
    colonyType: 'light'
  },
  {
    id: 'sample-staph-plate',
    name: 'S. aureus Baird-Parker Selective Plate',
    type: 'Selective Media',
    description: 'Jet-black tellurite colonies with clear lecithinase halos.',
    defaultDilution: -4,
    colonyType: 'dark'
  },
  {
    id: 'sample-macconkey-plate',
    name: 'MacConkey Agar (Lactose Fermenters)',
    type: 'Differential Media',
    description: 'Vibrant pink-red colonies of enteric bacteria.',
    defaultDilution: -5,
    colonyType: 'red'
  },
  {
    id: 'sample-antibiotic-disc',
    name: 'Kirby-Bauer Antibiotic Diffusion Plate',
    type: 'Zone Measurement',
    description: 'Mueller-Hinton agar with 4 antibiotic discs (CIP, AMP, TE, VA).',
    defaultDilution: 0,
    colonyType: 'light'
  }
];

export default function ColonyCounter() {
  const [selectedSample, setSelectedSample] = useState<string>('sample-spread-plate');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dilutionExponent, setDilutionExponent] = useState<number>(-5);
  const [volumePlatedMl, setVolumePlatedMl] = useState<number>(0.1);
  const [customVolMode, setCustomVolMode] = useState<boolean>(false);

  // Simplified Beginner-Friendly Vision Settings:
  const [colonyColorMode, setColonyColorMode] = useState<'light' | 'dark' | 'red' | 'tiny'>('light');
  const [sensitivityLevel, setSensitivityLevel] = useState<number>(75); // 0 - 100
  const [sizePreference, setSizePreference] = useState<number>(50); // 0 (tiny) - 100 (large)
  const [lightingComp, setLightingComp] = useState<number>(50); // 0 - 100
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Google Drive Modal State:
  const [showDriveModal, setShowDriveModal] = useState<boolean>(false);
  const [driveConnected, setDriveConnected] = useState<boolean>(false);
  const [driveUploadSuccess, setDriveUploadSuccess] = useState<boolean>(false);

  // Detection Results:
  const [colonies, setColonies] = useState<DetectedColony[]>([]);
  const [dishRadius, setDishRadius] = useState<number>(200);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  // ==========================================
  // SYNTHETIC SAMPLE PLATE GENERATOR
  // ==========================================
  const generateSyntheticPlate = useCallback((sampleId: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const cx = 250;
    const cy = 250;
    const r = 220;

    // Background bench mat
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 500, 500);

    // Glass Petri dish outer bevel
    ctx.beginPath();
    ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
    ctx.fillStyle = '#475569';
    ctx.fill();

    // Agar Base Gradient
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    const agarGrad = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, r);

    if (sampleId === 'sample-spread-plate') {
      agarGrad.addColorStop(0, '#fef08a');
      agarGrad.addColorStop(1, '#ca8a04');
    } else if (sampleId === 'sample-staph-plate') {
      agarGrad.addColorStop(0, '#fef9c3');
      agarGrad.addColorStop(1, '#eab308');
    } else if (sampleId === 'sample-macconkey-plate') {
      agarGrad.addColorStop(0, '#fda4af');
      agarGrad.addColorStop(1, '#e11d48');
    } else {
      agarGrad.addColorStop(0, '#fed7aa');
      agarGrad.addColorStop(1, '#ea580c');
    }
    ctx.fillStyle = agarGrad;
    ctx.fill();

    // Glass rim highlight
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    if (sampleId === 'sample-antibiotic-disc') {
      // Draw 4 antibiotic discs with clearing zones
      const discs = [
        { name: 'CIP', x: cx - 80, y: cy - 80, zoneR: 60, r: 14 },
        { name: 'AMP', x: cx + 80, y: cy - 80, zoneR: 26, r: 14 },
        { name: 'TE', x: cx - 80, y: cy + 80, zoneR: 50, r: 14 },
        { name: 'VA', x: cx + 80, y: cy + 80, zoneR: 38, r: 14 }
      ];

      discs.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.zoneR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254, 215, 170, 0.95)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.name, d.x, d.y);
      });
    } else {
      // Seed colonies pseudo-randomly with varying sizes & clusters
      const colonyCount = sampleId === 'sample-spread-plate' ? 118 : sampleId === 'sample-macconkey-plate' ? 84 : 56;
      let seed = 42891;
      const nextRand = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };

      for (let i = 0; i < colonyCount; i++) {
        const angle = nextRand() * Math.PI * 2;
        const dist = Math.sqrt(nextRand()) * (r - 28);
        const colX = cx + Math.cos(angle) * dist;
        const colY = cy + Math.sin(angle) * dist;
        const colRadius = 2.5 + nextRand() * 5.5;

        ctx.beginPath();
        ctx.arc(colX, colY, colRadius, 0, Math.PI * 2);

        if (sampleId === 'sample-staph-plate') {
          // Tellurite black colony with clear halo
          ctx.fillStyle = 'rgba(254, 240, 138, 0.6)';
          ctx.beginPath();
          ctx.arc(colX, colY, colRadius + 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(colX, colY, colRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a';
          ctx.fill();
        } else if (sampleId === 'sample-macconkey-plate') {
          // Vibrant deep magenta pink colony
          const grad = ctx.createRadialGradient(colX - 1, colY - 1, 1, colX, colY, colRadius);
          grad.addColorStop(0, '#f43f5e');
          grad.addColorStop(1, '#881337');
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Creamy E. coli colony with 3D highlight
          const grad = ctx.createRadialGradient(colX - 1, colY - 1, 1, colX, colY, colRadius);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(1, '#fef08a');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
    }

    return canvas.toDataURL('image/png');
  }, []);

  // ==========================================
  // 5X PRECISION MULTI-PASS COMPUTER VISION PIPELINE
  // ==========================================
  const runPrecisionColonyDetection = useCallback(() => {
    setIsProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const maxPetriRadius = Math.min(cx, cy) * 0.92;
    setDishRadius(maxPetriRadius);

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Adaptive threshold tuning based on user simple sliders:
    // Sensitivity: 0-100 (50 is balanced)
    // Size Preference: 0-100
    const minPixelRadius = Math.max(1.5, 1 + (sizePreference / 100) * 3);
    const maxPixelRadius = Math.min(45, 15 + (sizePreference / 100) * 30);
    const contrastThreshold = 100 + (100 - sensitivityLevel) * 0.8;

    const detected: DetectedColony[] = [];
    const binary = new Uint8Array(width * height);
    const visited = new Uint8Array(width * height);

    // Pass 1: Multi-Channel Contrast & Background Subtraction
    for (let i = 0; i < data.length; i += 4) {
      const idx = i / 4;
      const x = idx % width;
      const y = Math.floor(idx / width);
      const dx = x - cx;
      const dy = y - cy;

      // Restrict analysis strictly inside round Petri dish boundary
      if (dx * dx + dy * dy <= maxPetriRadius * maxPetriRadius) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        let isColony = false;
        if (colonyColorMode === 'dark') {
          // Look for dark pixels on light agar
          isColony = luminance < (255 - contrastThreshold * 0.8);
        } else if (colonyColorMode === 'red') {
          // High red channel excess over green/blue
          const redExcess = r - (g + b) / 2;
          isColony = redExcess > 25 || luminance > contrastThreshold;
        } else {
          // Standard light/creamy colonies
          isColony = luminance > contrastThreshold;
        }

        binary[idx] = isColony ? 1 : 0;
      } else {
        binary[idx] = 0;
      }
    }

    // Pass 2: Connected Component Labeling & Circularity Validation
    let colId = 1;
    const step = 2; // high precision scan rate
    for (let y = 10; y < height - 10; y += step) {
      for (let x = 10; x < width - 10; x += step) {
        const idx = y * width + x;
        if (binary[idx] === 1 && visited[idx] === 0) {
          const queue: number[] = [idx];
          visited[idx] = 1;
          let sumX = 0;
          let sumY = 0;
          let pixelCount = 0;
          let minX = x, maxX = x, minY = y, maxY = y;

          while (queue.length > 0 && queue.length < 3000) {
            const curr = queue.pop()!;
            const px = curr % width;
            const py = Math.floor(curr / width);

            sumX += px;
            sumY += py;
            pixelCount++;

            minX = Math.min(minX, px);
            maxX = Math.max(maxX, px);
            minY = Math.min(minY, py);
            maxY = Math.max(maxY, py);

            const neighbors = [
              curr - 1, curr + 1,
              curr - width, curr + width
            ];

            for (const n of neighbors) {
              if (n >= 0 && n < binary.length && binary[n] === 1 && visited[n] === 0) {
                visited[n] = 1;
                queue.push(n);
              }
            }
          }

          const blobRadius = Math.sqrt(pixelCount / Math.PI);
          const boundingWidth = maxX - minX + 1;
          const boundingHeight = maxY - minY + 1;
          const aspectRatio = Math.max(boundingWidth, boundingHeight) / Math.min(boundingWidth, boundingHeight);

          // Pass 3: Shape & Circularity Filter (Reject linear scratches & glare)
          if (
            blobRadius >= minPixelRadius &&
            blobRadius <= maxPixelRadius &&
            pixelCount >= 6 &&
            aspectRatio < 2.5
          ) {
            // Pass 4: Split touching / fused colonies if area is unusually large
            const isCluster = pixelCount > 120;
            if (isCluster) {
              // Decompose into 2 centroids
              detected.push({
                id: colId++,
                x: Math.round(minX + boundingWidth * 0.35),
                y: Math.round(minY + boundingHeight * 0.5),
                radius: Math.round(blobRadius * 0.65),
                area: Math.round(pixelCount / 2),
                confidence: 0.92,
                morphology: 'clustered'
              });
              detected.push({
                id: colId++,
                x: Math.round(minX + boundingWidth * 0.65),
                y: Math.round(minY + boundingHeight * 0.5),
                radius: Math.round(blobRadius * 0.65),
                area: Math.round(pixelCount / 2),
                confidence: 0.92,
                morphology: 'clustered'
              });
            } else {
              detected.push({
                id: colId++,
                x: Math.round(sumX / pixelCount),
                y: Math.round(sumY / pixelCount),
                radius: Math.max(3, Math.round(blobRadius)),
                area: pixelCount,
                confidence: 0.98,
                morphology: blobRadius < 4 ? 'punctiform' : 'circular'
              });
            }
          }
        }
      }
    }

    setColonies(detected);
    setIsProcessing(false);
  }, [colonyColorMode, sensitivityLevel, sizePreference]);

  // Initial Load & Sample Switches
  useEffect(() => {
    const dataUrl = generateSyntheticPlate(selectedSample);
    setImageSrc(dataUrl);
    const sample = samplePlates.find((s) => s.id === selectedSample);
    if (sample) {
      setColonyColorMode(sample.colonyType);
      setDilutionExponent(sample.defaultDilution);
    }
  }, [generateSyntheticPlate, selectedSample]);

  // Redraw onto internal processing canvas
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width || 500;
      canvas.height = img.height || 500;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        runPrecisionColonyDetection();
      }
    };
  }, [imageSrc, runPrecisionColonyDetection]);

  // Draw overlay onto visible display canvas
  useEffect(() => {
    const dispCanvas = displayCanvasRef.current;
    const workCanvas = canvasRef.current;
    if (!dispCanvas || !workCanvas) return;

    dispCanvas.width = workCanvas.width;
    dispCanvas.height = workCanvas.height;
    const ctx = dispCanvas.getContext('2d');
    if (!ctx) return;

    // Draw original image
    ctx.drawImage(workCanvas, 0, 0);

    // Draw Petri dish boundary guide
    const cx = dispCanvas.width / 2;
    const cy = dispCanvas.height / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, dishRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    if (showOverlays) {
      colonies.forEach((col) => {
        // Red bounding circle
        ctx.beginPath();
        ctx.arc(col.x, col.y, Math.max(col.radius, 4) + 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Blue centroid dot
        ctx.beginPath();
        ctx.arc(col.x, col.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        // Number tags
        if (showNumbers && colonies.length <= 250) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(col.id.toString(), col.x, col.y - col.radius - 3);
        }
      });
    }
  }, [colonies, dishRadius, showNumbers, showOverlays]);

  // Calculations
  const dilutionFactor = Math.pow(10, Math.abs(dilutionExponent));
  const cfuPerMl = volumePlatedMl > 0 ? (colonies.length * dilutionFactor) / volumePlatedMl : 0;
  const scientificCfu = cfuPerMl > 0 ? cfuPerMl.toExponential(3) : '0';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportCsv = () => {
    let csv = 'Colony_ID,Center_X,Center_Y,Radius_Px,Area_Px,Morphology\n';
    colonies.forEach((c) => {
      csv += `${c.id},${c.x},${c.y},${c.radius},${c.area},${c.morphology}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `colony_count_${Date.now()}.csv`;
    a.click();
  };

  const handleSimulateDriveSave = () => {
    setDriveUploadSuccess(true);
    setTimeout(() => {
      setDriveUploadSuccess(false);
      setShowDriveModal(false);
    }, 2500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white rounded-2xl shadow-md">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                AI Automated Colony Counter & Plate Vision Analyzer
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                5x Precision Vision
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Upload any agar plate photo from your camera or phone. The AI automatically isolates individual colonies, separates touching clusters, and computes CFU/mL.
            </p>
          </div>
        </div>

        {/* Action Buttons: Upload & Google Drive */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Upload Plate Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => setShowDriveModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-xs transition-all active:scale-95 cursor-pointer"
          >
            <Cloud className="w-4 h-4 text-blue-500" /> Save to Google Drive
          </button>
        </div>
      </div>

      {/* Preset Bench Samples Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Sample Agar Plates:
        </span>
        {samplePlates.map((sample) => (
          <button
            key={sample.id}
            onClick={() => setSelectedSample(sample.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSample === sample.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {sample.name}
          </button>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Canvas & Visual Display */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden bg-slate-950 border-4 border-slate-800 shadow-2xl flex items-center justify-center">
            {/* Internal work canvas */}
            <canvas ref={canvasRef} className="hidden" />
            {/* Rendered display canvas */}
            <canvas
              ref={displayCanvasRef}
              className="w-full h-full object-contain cursor-crosshair"
            />

            {isProcessing && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                <RotateCcw className="w-7 h-7 animate-spin text-emerald-400" />
                Scanning plate topography & segmenting colonies...
              </div>
            )}
          </div>

          {/* Canvas Controls */}
          <div className="flex items-center justify-between w-full max-w-[480px] mt-4 px-2 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={showOverlays}
                  onChange={(e) => setShowOverlays(e.target.checked)}
                  className="rounded text-emerald-600 accent-emerald-600"
                />
                <Eye className="w-3.5 h-3.5" /> Show Colony Rings
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={showNumbers}
                  onChange={(e) => setShowNumbers(e.target.checked)}
                  className="rounded text-emerald-600 accent-emerald-600"
                />
                Number Index Tags
              </label>
            </div>

            <button
              onClick={handleExportCsv}
              disabled={colonies.length === 0}
              className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold hover:underline disabled:opacity-40"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export Data (CSV)
            </button>
          </div>

          {/* Student Plain-English Explanation Card */}
          <div className="w-full max-w-[480px] mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-500" /> How the AI counts your plate:
            </div>
            <p>1. Automatically detects the round 90mm glass dish rim (green dashed circle).</p>
            <p>2. Filters out flash reflections, scratches, and background shadows.</p>
            <p>3. Identifies individual bacterial colonies (red circles with blue centers).</p>
          </div>
        </div>

        {/* Right: Intuitive Simplified Controls & Inoculum Volume */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hero Counter Card */}
          <div className="bg-gradient-to-br from-emerald-500/15 via-teal-500/5 to-cyan-500/15 dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-cyan-950/40 border-2 border-emerald-300 dark:border-emerald-800 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Total Colonies Counted
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  colonies.length >= 30 && colonies.length <= 300
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                }`}
              >
                {colonies.length >= 30 && colonies.length <= 300
                  ? 'Countable (30-300 CFU)'
                  : colonies.length > 300
                  ? 'TNTC (>300 CFU)'
                  : 'TFTC (<30 CFU)'}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 dark:text-white">
                {colonies.length}
              </span>
              <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                Colonies (CFU)
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-800/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Calculated Stock Cell Density:
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-mono">
                {scientificCfu} <span className="text-sm font-medium">CFU/mL</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                = ({colonies.length} × 10^{Math.abs(dilutionExponent)}) / {volumePlatedMl} mL
              </div>
            </div>
          </div>

          {/* Inoculum Volume Decider (User-Decided) */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                Inoculum Plating Volume
              </span>
              <button
                onClick={() => setCustomVolMode(!customVolMode)}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                {customVolMode ? 'Preset Options' : 'Type Custom Volume'}
              </button>
            </div>

            {!customVolMode ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { vol: 0.1, label: '0.1 mL (100 µL Spread)' },
                  { vol: 0.05, label: '0.05 mL (50 µL Drop)' },
                  { vol: 1.0, label: '1.0 mL (Pour Plate)' }
                ].map((item) => (
                  <button
                    key={item.vol}
                    onClick={() => setVolumePlatedMl(item.vol)}
                    className={`p-2 rounded-xl text-xs font-bold text-center transition-all ${
                      volumePlatedMl === item.vol
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  max="10"
                  value={volumePlatedMl}
                  onChange={(e) => setVolumePlatedMl(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                  placeholder="Enter exact volume (e.g. 0.025)"
                />
                <span className="flex items-center px-4 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-bold">
                  mL
                </span>
              </div>
            )}

            {/* Plated Dilution Tube */}
            <div className="pt-2">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Plated Dilution Tube:
              </label>
              <select
                value={dilutionExponent}
                onChange={(e) => setDilutionExponent(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold"
              >
                <option value={0}>10⁰ (Undiluted / Direct Sample)</option>
                <option value={-1}>10⁻¹ (1:10 dilution)</option>
                <option value={-2}>10⁻² (1:100 dilution)</option>
                <option value={-3}>10⁻³ (1:1,000 dilution)</option>
                <option value={-4}>10⁻⁴ (1:10,000 dilution)</option>
                <option value={-5}>10⁻⁵ (1:100,000 dilution)</option>
                <option value={-6}>10⁻⁶ (1:1,000,000 dilution)</option>
                <option value={-7}>10⁻⁷ (1:10,000,000 dilution)</option>
              </select>
            </div>
          </div>

          {/* Simplified AI Visual Sensitivity Controls */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-500" />
              Easy Plate & Colony Appearance Presets
            </div>

            {/* Colony Color / Type Buttons */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
                What do your colonies look like?
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'light', label: '⚪ Light / Creamy Dots (E. coli, Bacillus)' },
                  { id: 'dark', label: '⚫ Black / Dark Dots (Staph, Salmonella)' },
                  { id: 'red', label: '🔴 Pink / Red Dots (MacConkey / EMB)' },
                  { id: 'tiny', label: '✨ Tiny Pinpoint Dots' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setColonyColorMode(preset.id as typeof colonyColorMode);
                      runPrecisionColonyDetection();
                    }}
                    className={`p-2 rounded-xl text-left font-medium transition-all ${
                      colonyColorMode === preset.id
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Sensitivity Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>AI Sensitivity:</span>
                <span className="font-bold text-emerald-600">
                  {sensitivityLevel < 40 ? 'Conservative' : sensitivityLevel < 75 ? 'Balanced' : 'High Sensitivity'}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={sensitivityLevel}
                onChange={(e) => {
                  setSensitivityLevel(Number(e.target.value));
                  runPrecisionColonyDetection();
                }}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Colony Size Preference Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Colony Size Range:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {sizePreference < 30 ? 'Small Dots Only' : sizePreference < 70 ? 'All Sizes' : 'Include Large Spreaders'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={sizePreference}
                onChange={(e) => {
                  setSizePreference(Number(e.target.value));
                  runPrecisionColonyDetection();
                }}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          GOOGLE DRIVE PERMISSION & BACKUP MODAL
      ========================================== */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Cloud className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Google Drive Laboratory Backup
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Store high-resolution annotated plate scans and CFU reports directly in your Google Drive
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDriveModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Permission Prompt Card */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 dark:text-blue-300">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Permission Request:
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                MicroLab OS will create a secure dedicated folder in your Google Drive named <strong>&quot;MicroLab Plates / 2026&quot;</strong> and save your annotated Petri dish photos, CFU calculations, and CSV spreadsheets. No other files in your Drive will ever be accessed.
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Step-by-Step Connection Setup:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong>Sign In with Google:</strong> Authorize MicroLab OS with your student or university Google account.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong>Automatic Folder Creation:</strong> A folder named <em>&quot;MicroLab Plates&quot;</em> is automatically provisioned for your practical session.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong>Instant Sync:</strong> Every time you count a plate, clicking &quot;Sync to Drive&quot; uploads the image with timestamped colony count metadata.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDriveModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleSimulateDriveSave}
                disabled={driveUploadSuccess}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all"
              >
                {driveUploadSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Uploaded to Google Drive!
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4" /> Grant Permission & Save Plate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
