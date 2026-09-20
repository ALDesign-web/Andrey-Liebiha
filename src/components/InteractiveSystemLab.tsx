"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Sliders, 
  TrendingUp, 
  Zap,
  Code2,
  Cpu,
  Layers,
  CheckCircle2
} from "lucide-react";
import { RiveSystemSwitch } from "@/components/RiveSystemSwitch";
import { RiveOrbBeacon } from "@/components/RiveOrbBeacon";

export function InteractiveSystemLab() {
  const [activeTab, setActiveTab] = useState<"ai-workflow" | "design-system" | "cro-simulator" | "rive-runtime">("ai-workflow");

  // Tab 1: AI Workflow State
  const [simulating, setSimulating] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(3);

  // Tab 2: Design System State
  const [buttonVariant, setButtonVariant] = useState<"glow-orange" | "glass" | "solid-emerald" | "outline">("glow-orange");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [tokenMode, setTokenMode] = useState<"dark-luxe" | "cyber-cyan">("dark-luxe");

  // Tab 3: CRO Simulator State
  const [trafficVolume, setTrafficVolume] = useState(25000);
  const [cvrBoost, setCvrBoost] = useState(48); // % uplift

  // Tab 4: Rive Runtime State
  const [riveSwitchOn, setRiveSwitchOn] = useState(true);
  const [riveBeaconClicks, setRiveBeaconClicks] = useState(0);

  const runSimulation = () => {
    setSimulating(true);
    setPipelineStep(1);
    const interval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  // CRO Calculation
  const baselineCVR = 2.4; // 2.4%
  const optimizedCVR = baselineCVR * (1 + cvrBoost / 100);
  const avgDealValue = 450; // $450/deal
  const baselineRevenue = Math.round((trafficVolume * (baselineCVR / 100)) * avgDealValue);
  const optimizedRevenue = Math.round((trafficVolume * (optimizedCVR / 100)) * avgDealValue);
  const revenueGain = optimizedRevenue - baselineRevenue;

  return (
    <section id="lab" className="py-24 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] glow-spot-orange pointer-events-none opacity-15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE TECHNICAL LAB &amp; PROTOTYPING
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            Live Craft <span className="text-gradient-orange">&amp; Technical Prototyping</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto measure-prose">
            Demonstrating production-grade interaction design, design system token architecture, 
            and AI agent canvas prototypes directly in code.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("ai-workflow")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
              activeTab === "ai-workflow"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold shadow-lg shadow-orange-500/25"
                : "bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Agent Canvas Orchestrator</span>
          </button>

          <button
            onClick={() => setActiveTab("design-system")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
              activeTab === "design-system"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold shadow-lg shadow-orange-500/25"
                : "bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Design Tokens &amp; Component Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("cro-simulator")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "cro-simulator"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold shadow-lg shadow-orange-500/25"
                : "bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>CRO &amp; Revenue Uplift Engine</span>
          </button>

          <button
            onClick={() => setActiveTab("rive-runtime")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "rive-runtime"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold shadow-lg shadow-orange-500/25"
                : "bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Rive Vector Runtime (CLI &amp; RML)</span>
          </button>
        </div>

        {/* Tab 1: AI Agent Canvas Simulator */}
        <AnimatePresence mode="wait">
          {activeTab === "ai-workflow" && (
            <motion.div
              key="ai-workflow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#0f1015] border border-white/10 shadow-2xl shadow-black/80"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    3-Tier Progressive Disclosure Architecture
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    AI Social Operations &amp; Streaming Token Canvas
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Interactive simulation of sub-100ms streaming LLM tokens, brand memory calibration, and predictive virality scoring.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={runSimulation}
                    disabled={simulating}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>{simulating ? "Streaming Tokens..." : "Simulate 3-Tier Pipeline"}</span>
                  </button>
                  <button
                    onClick={() => setPipelineStep(1)}
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Reset flow"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Node Pipeline Visualization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                {[
                  {
                    step: 1,
                    title: "01. Intent Matrix",
                    sub: "Brand Tone Calibration",
                    detail: "Memory Knobs Synced",
                    status: pipelineStep >= 1 ? "Active" : "Queued"
                  },
                  {
                    step: 2,
                    title: "02. AI Ideation Core",
                    sub: "Streaming Generation",
                    detail: "Latency <85ms tokens",
                    status: pipelineStep >= 2 ? "Active" : "Pending"
                  },
                  {
                    step: 3,
                    title: "03. Multi-Channel Sync",
                    sub: "Platform Adaptations",
                    detail: "X, LinkedIn, IG Formats",
                    status: pipelineStep >= 3 ? "Active" : "Pending"
                  },
                  {
                    step: 4,
                    title: "04. Predictive Dispatch",
                    sub: "Virality Radar Score",
                    detail: "Heatmap Auto-Queued (94.2)",
                    status: pipelineStep >= 4 ? "Completed" : "Pending"
                  }
                ].map((node) => {
                  const isCurrent = pipelineStep === node.step;
                  const isPassed = pipelineStep >= node.step;
                  return (
                    <div
                      key={node.step}
                      className={`p-5 rounded-2xl border transition-all duration-300 ${
                        isCurrent
                          ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/10"
                          : isPassed
                          ? "bg-white/[0.03] border-white/20"
                          : "bg-white/[0.01] border-white/5 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-semibold text-zinc-400">
                          {node.title}
                        </span>
                        {isPassed && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </div>
                      <div className="text-base font-bold text-white mb-1">
                        {node.sub}
                      </div>
                      <div className="text-xs font-mono text-orange-300">
                        {node.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console Output Inspector */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 space-y-1">
                <div className="text-zinc-500 flex items-center justify-between pb-2 border-b border-white/5">
                  <span>LURO ENGINE STREAM // OBSIDIAN_GLASS_V2</span>
                  <span className="text-emerald-400">● 60 FPS MOTION VERIFIED</span>
                </div>
                <div className="text-orange-400 pt-1">
                  &gt; Active Stage: Zone 0{pipelineStep} of 4 • Status: {pipelineStep === 4 ? "OPTIMAL_15MIN_WINDOW_DISPATCH" : "STREAMING_LLM_FEEDBACK"}
                </div>
                <div className="text-zinc-400">
                  &gt; Telemetry: &#123; streaming_latency: &quot;74ms&quot;, virality_propensity: 94.2, wcag_aaa: true &#125;
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Design Tokens & Component Matrix */}
          {activeTab === "design-system" && (
            <motion.div
              key="design-system"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#0f1015] border border-white/10 shadow-2xl shadow-black/80 space-y-8"
            >
              {/* Controls bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-white/10">
                {/* Variant selection */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Obsidian Token Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "glow-orange", label: "Amber Pulse" },
                      { id: "glass", label: "Obsidian Glass" },
                      { id: "solid-emerald", label: "Jade Material" },
                      { id: "outline", label: "Subtle 1px Border" }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setButtonVariant(v.id as typeof buttonVariant)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          buttonVariant === v.id
                            ? "bg-white text-black border-white font-bold"
                            : "bg-white/[0.02] border-white/10 text-zinc-300 hover:text-white"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density selector */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Thumb-Zone &amp; Layout Density
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDensity("comfortable")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        density === "comfortable"
                          ? "bg-orange-500/20 border-orange-500 text-orange-300 font-bold"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Web Viewport
                    </button>
                    <button
                      onClick={() => setDensity("compact")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        density === "compact"
                          ? "bg-orange-500/20 border-orange-500 text-orange-300 font-bold"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Mobile Ergonomic
                    </button>
                  </div>
                </div>

                {/* Token Theme */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                    Palette Spectrum Tokens
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTokenMode("dark-luxe")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        tokenMode === "dark-luxe"
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Obsidian / Amber
                    </button>
                    <button
                      onClick={() => setTokenMode("cyber-cyan")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        tokenMode === "cyber-cyan"
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                          : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Cyan / Emerald
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Render Preview */}
              <div className="p-8 rounded-2xl bg-black/50 border border-white/10 flex flex-col items-center justify-center gap-6 min-h-[180px]">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Live Figma Token Component Output (WCAG AAA)
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Dynamic Button */}
                  <button
                    className={`transition-all duration-300 cursor-pointer ${
                      density === "compact" ? "px-4 py-2 text-xs" : "px-6 py-3.5 text-sm"
                    } ${
                      buttonVariant === "glow-orange"
                        ? "rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold shadow-lg shadow-orange-500/30 hover:scale-105"
                        : buttonVariant === "glass"
                        ? "rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/15"
                        : buttonVariant === "solid-emerald"
                        ? "rounded-full bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-400/25 hover:scale-105"
                        : "rounded-full border border-white/30 text-white hover:border-white font-medium"
                    }`}
                  >
                    <span>Execute Primary Action</span>
                  </button>

                  {/* Dynamic Badge */}
                  <div
                    className={`flex items-center gap-2 rounded-full border ${
                      density === "compact" ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-xs"
                    } ${
                      tokenMode === "dark-luxe"
                        ? "bg-orange-500/10 border-orange-500/30 text-orange-300"
                        : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                    } font-mono`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    <span>TOKEN_STATE: WCAG_AAA_SYNCED</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: CRO & Revenue Uplift Engine */}
          {activeTab === "cro-simulator" && (
            <motion.div
              key="cro-simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#0f1015] border border-white/10 shadow-2xl shadow-black/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Sliders and controls */}
                <div className="space-y-6">
                  {/* Slider 1: Traffic */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        MONTHLY VISITORS
                      </span>
                      <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                        {trafficVolume.toLocaleString()} Sessions
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={trafficVolume}
                      onChange={(e) => setTrafficVolume(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #f97316 0%, #f59e0b ${((trafficVolume - 5000) / (100000 - 5000)) * 100}%, rgba(255,255,255,0.08) ${((trafficVolume - 5000) / (100000 - 5000)) * 100}%, rgba(255,255,255,0.08) 100%)`
                      }}
                      className="custom-range-slider"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 tabular-nums">
                      <span>5,000</span>
                      <span>50,000</span>
                      <span>100,000</span>
                    </div>
                  </div>

                  {/* Slider 2: CVR Boost */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        BOOKIFY CVR LIFT FACTOR
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 tabular-nums">
                        +{cvrBoost}% Lift
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="2"
                      value={cvrBoost}
                      onChange={(e) => setCvrBoost(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #06b6d4 ${((cvrBoost - 10) / (150 - 10)) * 100}%, rgba(255,255,255,0.08) ${((cvrBoost - 10) / (150 - 10)) * 100}%, rgba(255,255,255,0.08) 100%)`
                      }}
                      className="custom-range-slider custom-range-slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 tabular-nums">
                      <span>+10% Base</span>
                      <span>+80% High</span>
                      <span>+150% Max</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-zinc-200 block mb-1">Validated CRO Methodology (Bookify Case):</strong>
                    Replacing multi-page redirects with in-context modal purchasing and 1-tap Apple/Google Pay 
                    lifted baseline e-commerce conversion from 2.4% to 5.8% (+141.6% relative lift).
                  </div>
                </div>

                {/* Live ROI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                    <span className="text-xs font-mono text-zinc-300">BASELINE REVENUE</span>
                    <div className="my-3">
                      <div className="text-2xl sm:text-3xl font-black text-zinc-200 tabular-nums">
                        ${(baselineRevenue / 1000).toFixed(0)}k
                      </div>
                      <span className="text-[11px] text-zinc-400 tabular-nums">at {baselineCVR}% Legacy Baseline</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">E-Commerce Benchmark</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 via-[#0f1015] to-amber-500/10 border border-orange-500/40 shadow-xl shadow-orange-500/10 flex flex-col justify-between">
                    <span className="text-xs font-mono text-orange-400 font-semibold">OPTIMIZED FUNNEL REVENUE</span>
                    <div className="my-3">
                      <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                        ${(optimizedRevenue / 1000).toFixed(0)}k
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                        at {optimizedCVR.toFixed(2)}% Redesigned CVR
                      </span>
                    </div>
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 tabular-nums">
                      +${(revenueGain / 1000).toFixed(0)}k Validated Lift
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Rive Vector Runtime & CLI State Machine Engine */}
          {activeTab === "rive-runtime" && (
            <motion.div
              key="rive-runtime"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#0f1015] border border-white/10 shadow-2xl shadow-black/80"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    RIVE CLI &amp; RML TEXT-BASED VECTOR RUNTIME
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Hardware-Accelerated State Machines (Zero DOM Bloat)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl">
                    Authored as human- and agent-readable RML markup code, compiled via the new Rive CLI in 2ms, 
                    and rendered at 60–120fps through WebGL/WebGPU with direct React 19 state binding.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Sub-2ms Compile • &lt;1.2 KB Assets</span>
                </div>
              </div>

              {/* Live Interactive Widgets Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                {/* Widget 1: Tactile State Machine Switch */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-orange-400" />
                        Live Rive State Machine Switch
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        1,162 bytes (.riv)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mb-6">
                      Click the toggle below. The transition interpolates keyframes natively inside Rive&apos;s C++ runtime canvas without any React re-render overhead or CSS layout reflows.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-black/40 border border-white/5 gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                      <span className="text-xs font-mono text-zinc-400">STATE MACHINE INPUT</span>
                      <span className="text-lg font-bold text-white font-mono">
                        isOn = <span className={riveSwitchOn ? "text-orange-400" : "text-zinc-500"}>{String(riveSwitchOn)}</span>
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Current Timeline: <strong className="text-zinc-200">{riveSwitchOn ? "IdleOn" : "IdleOff"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <RiveSystemSwitch
                        checked={riveSwitchOn}
                        onChange={setRiveSwitchOn}
                        width={130}
                        height={70}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">FORMAT</span>
                      <strong className="text-zinc-300">RML (XML text)</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">RENDER</span>
                      <strong className="text-zinc-300">Canvas2D / WebGL</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">FPS</span>
                      <strong className="text-emerald-400">60-120 FPS</strong>
                    </div>
                  </div>
                </div>

                {/* Widget 2: Ambient Multi-Layer Beacon */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Ambient System Core (Multi-Layer)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        855 bytes (.riv)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mb-6">
                      An interactive radial beacon running independent animation layers (breathing core, halo expansion, radar wave) with zero CPU overhead.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-black/40 border border-white/5 gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                      <span className="text-xs font-mono text-zinc-400">CONCURRENT LAYERS</span>
                      <span className="text-sm font-semibold text-white">
                        Pulse + Wave + Core Shaders
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {riveBeaconClicks > 0
                          ? `Interactive trigger pulses fired: ${riveBeaconClicks}`
                          : "Tap or hover the beacon for micro-feedback"}
                      </span>
                    </div>

                    <div 
                      onClick={() => setRiveBeaconClicks((prev) => prev + 1)}
                      className="flex items-center justify-center p-2 rounded-2xl bg-white/[0.03] border border-white/10"
                    >
                      <RiveOrbBeacon size={64} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">DOM NODES</span>
                      <strong className="text-emerald-400">1 &lt;canvas&gt;</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">AUTO-PAUSE</span>
                      <strong className="text-zinc-300">IntersectionObs</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">GIT DIFF</span>
                      <strong className="text-zinc-300">Line-by-line</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture & Engineering Deep-Dive */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>CODE-FIRST RML WORKFLOW</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Animations are defined as declarative RML XML files in Git. AI coding agents and developers can scaffold and refactor state machines as code, while designers can polish curves in the Rive GUI.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>LIGHTNING-FAST COMPILE</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    The Rive CLI compiles RML projects to binary <code className="text-orange-300">.riv</code> runtime files in ~2ms. Integrated seamlessly into <code className="text-zinc-200">npm run rive:build</code> and Next.js prebuild pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>LOTTIE VS RIVE REVOLUTION</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Replaces massive 150KB JSON Lottie files (and thousands of CPU-draining SVG DOM nodes) with tiny &lt;1.2KB binaries running on hardware-accelerated Canvas with true state machines.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
