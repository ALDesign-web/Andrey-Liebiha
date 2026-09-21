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
import { LiquidPlasmaSwitch } from "@/components/ui/LiquidPlasmaSwitch";
import { CelestialNovaCore } from "@/components/ui/CelestialNovaCore";

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7235]/10 border border-[#ff7235]/25 text-[#ff7235] text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE TECHNICAL LAB &amp; PROTOTYPING
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            Live Craft <span className="text-gradient-orange">&amp; Technical Prototyping</span>
          </h2>
          <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed max-w-2xl mx-auto measure-prose">
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
                ? "bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold shadow-md shadow-[#ff7235]/20"
                : "bg-white/[0.02] text-[#adb3b7] hover:text-white border border-[#adb3b7]/15 hover:border-[#adb3b7]/30"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Agent Canvas Orchestrator</span>
          </button>

          <button
            onClick={() => setActiveTab("design-system")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98] ${
              activeTab === "design-system"
                ? "bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold shadow-md shadow-[#ff7235]/20"
                : "bg-white/[0.02] text-[#adb3b7] hover:text-white border border-[#adb3b7]/15 hover:border-[#adb3b7]/30"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Design Tokens &amp; Component Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab("cro-simulator")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "cro-simulator"
                ? "bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold shadow-md shadow-[#ff7235]/20"
                : "bg-white/[0.02] text-[#adb3b7] hover:text-white border border-[#adb3b7]/15 hover:border-[#adb3b7]/30"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>CRO &amp; Revenue Uplift Engine</span>
          </button>

          <button
            onClick={() => setActiveTab("rive-runtime")}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "rive-runtime"
                ? "bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold shadow-md shadow-[#ff7235]/20"
                : "bg-white/[0.02] text-[#adb3b7] hover:text-white border border-[#adb3b7]/15 hover:border-[#adb3b7]/30"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ffa043]" />
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
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#adb3b7]/15">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ff7235] uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    3-Tier Progressive Disclosure Architecture
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    AI Social Operations &amp; Streaming Token Canvas
                  </h3>
                  <p className="text-xs sm:text-sm text-[#adb3b7] mt-1">
                    Interactive simulation of sub-100ms streaming LLM tokens, brand memory calibration, and predictive virality scoring.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={runSimulation}
                    disabled={simulating}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold text-xs shadow-md shadow-[#ff7235]/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>{simulating ? "Streaming Tokens..." : "Simulate 3-Tier Pipeline"}</span>
                  </button>
                  <button
                    onClick={() => setPipelineStep(1)}
                    className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#adb3b7] hover:text-white border border-[#adb3b7]/20 transition-all cursor-pointer"
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
                    status: pipelineStep >= 1 ? "Active" : "Idle"
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
                          ? "bg-[#ff7235]/10 border-[#ff7235] shadow-lg shadow-[#ff7235]/15"
                          : isPassed
                          ? "bg-white/[0.03] border-[#adb3b7]/20"
                          : "bg-white/[0.015] border-[#adb3b7]/10 opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-semibold text-[#adb3b7]">
                          {node.title}
                        </span>
                        {isPassed && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </div>
                      <div className="text-base font-bold text-white mb-1">
                        {node.sub}
                      </div>
                      <div className="text-xs font-mono text-[#ff7235]">
                        {node.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console Output Inspector */}
              <div className="p-4 rounded-xl bg-black/25 backdrop-blur-sm border border-[#adb3b7]/12 font-mono text-xs text-[#adb3b7] space-y-1">
                <div className="text-[#adb3b7]/60 flex items-center justify-between pb-2 border-b border-[#adb3b7]/10">
                  <span>LURO ENGINE STREAM // INDUSTRIAL_GRAPHITE_V2</span>
                  <span className="text-emerald-400">● 60 FPS MOTION VERIFIED</span>
                </div>
                <div className="text-[#ff7235] pt-1">
                  &gt; Active Stage: Zone 0{pipelineStep} of 4 • Status: {pipelineStep === 4 ? "OPTIMAL_15MIN_WINDOW_DISPATCH" : "STREAMING_LLM_FEEDBACK"}
                </div>
                <div className="text-[#adb3b7]">
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
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] space-y-8 relative overflow-hidden"
            >
              {/* Controls bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-[#adb3b7]/15">
                {/* Variant selection */}
                <div>
                  <label className="text-xs font-mono text-[#adb3b7] uppercase tracking-wider block mb-2">
                    Graphite Token Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "glow-orange", label: "Vermilion Pulse" },
                      { id: "glass", label: "Graphite Glass" },
                      { id: "solid-emerald", label: "Jade Material" },
                      { id: "outline", label: "Steel 1px Border" }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setButtonVariant(v.id as typeof buttonVariant)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          buttonVariant === v.id
                            ? "bg-white text-black border-white font-bold"
                            : "bg-white/[0.02] border-[#adb3b7]/20 text-[#adb3b7] hover:text-white"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density selector */}
                <div>
                  <label className="text-xs font-mono text-[#adb3b7] uppercase tracking-wider block mb-2">
                    Thumb-Zone &amp; Layout Density
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDensity("comfortable")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        density === "comfortable"
                          ? "bg-[#ff7235]/20 border-[#ff7235] text-[#ff7235] font-bold"
                          : "bg-white/[0.02] border-[#adb3b7]/15 text-[#adb3b7] hover:text-white"
                      }`}
                    >
                      Web Viewport
                    </button>
                    <button
                      onClick={() => setDensity("compact")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        density === "compact"
                          ? "bg-[#ff7235]/20 border-[#ff7235] text-[#ff7235] font-bold"
                          : "bg-white/[0.02] border-[#adb3b7]/15 text-[#adb3b7] hover:text-white"
                      }`}
                    >
                      Mobile Ergonomic
                    </button>
                  </div>
                </div>

                {/* Token Theme */}
                <div>
                  <label className="text-xs font-mono text-[#adb3b7] uppercase tracking-wider block mb-2">
                    Palette Spectrum Tokens
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTokenMode("dark-luxe")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        tokenMode === "dark-luxe"
                          ? "bg-[#ff7235]/20 border-[#ff7235] text-[#ff7235] font-bold"
                          : "bg-white/[0.02] border-[#adb3b7]/15 text-[#adb3b7] hover:text-white"
                      }`}
                    >
                      Graphite / Vermilion
                    </button>
                    <button
                      onClick={() => setTokenMode("cyber-cyan")}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        tokenMode === "cyber-cyan"
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                          : "bg-white/[0.02] border-[#adb3b7]/15 text-[#adb3b7] hover:text-white"
                      }`}
                    >
                      Steel / Cyan
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Render Preview */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-[#adb3b7]/12 backdrop-blur-sm flex flex-col items-center justify-center gap-6 min-h-[180px]">
                <div className="text-xs font-mono text-[#adb3b7]/70 uppercase tracking-wider">
                  Live Figma Token Component Output (WCAG AAA)
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Dynamic Button */}
                  <button
                    className={`transition-all duration-300 cursor-pointer ${
                      density === "compact" ? "px-4 py-2 text-xs" : "px-6 py-3.5 text-sm"
                    } ${
                      buttonVariant === "glow-orange"
                        ? "rounded-full bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-bold shadow-md shadow-[#ff7235]/25 hover:scale-105"
                        : buttonVariant === "glass"
                        ? "rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-[#adb3b7]/20 text-white font-medium hover:bg-white/[0.08]"
                        : buttonVariant === "solid-emerald"
                        ? "rounded-full bg-emerald-400 text-black font-bold shadow-md shadow-emerald-400/20 hover:scale-105"
                        : "rounded-full border border-[#adb3b7]/35 text-white hover:border-white font-medium"
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
                        ? "bg-[#ff7235]/10 border-[#ff7235]/30 text-[#ff7235]"
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
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Sliders and controls */}
                <div className="space-y-6">
                  {/* Slider 1: Traffic */}
                  <div className="p-4 rounded-2xl bg-white/[0.025] border border-[#adb3b7]/12 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#adb3b7]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff7235]" />
                        MONTHLY VISITORS
                      </span>
                      <span className="text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-md border border-[#adb3b7]/20">
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
                        background: `linear-gradient(to right, #ff7235 0%, #ffa043 ${((trafficVolume - 5000) / (100000 - 5000)) * 100}%, rgba(173,179,183,0.18) ${((trafficVolume - 5000) / (100000 - 5000)) * 100}%, rgba(173,179,183,0.18) 100%)`
                      }}
                      className="custom-range-slider"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#adb3b7] tabular-nums">
                      <span>5,000</span>
                      <span>50,000</span>
                      <span>100,000</span>
                    </div>
                  </div>

                  {/* Slider 2: CVR Boost */}
                  <div className="p-4 rounded-2xl bg-white/[0.025] border border-[#adb3b7]/12 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#adb3b7]">
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
                        background: `linear-gradient(to right, #10b981 0%, #06b6d4 ${((cvrBoost - 10) / (150 - 10)) * 100}%, rgba(173,179,183,0.18) ${((cvrBoost - 10) / (150 - 10)) * 100}%, rgba(173,179,183,0.18) 100%)`
                      }}
                      className="custom-range-slider custom-range-slider-emerald"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#adb3b7] tabular-nums">
                      <span>+10% Base</span>
                      <span>+80% High</span>
                      <span>+150% Max</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.025] border border-[#adb3b7]/12 text-xs text-[#adb3b7] leading-relaxed">
                    <strong className="text-white block mb-1">Validated CRO Methodology (Bookify Case):</strong>
                    Replacing multi-page redirects with in-context modal purchasing and 1-tap Apple/Google Pay 
                    lifted baseline e-commerce conversion from 2.4% to 5.8% (+141.6% relative lift).
                  </div>
                </div>

                {/* Live ROI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.025] border border-[#adb3b7]/12 flex flex-col justify-between">
                    <span className="text-xs font-mono text-[#adb3b7]">BASELINE REVENUE</span>
                    <div className="my-3">
                      <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                        ${(baselineRevenue / 1000).toFixed(0)}k
                      </div>
                      <span className="text-[11px] text-[#adb3b7] tabular-nums">at {baselineCVR}% Legacy Baseline</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#adb3b7]/60">E-Commerce Benchmark</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ff7235]/15 via-white/[0.02] to-[#ffa043]/10 border border-[#ff7235]/35 shadow-sm shadow-[#ff7235]/10 flex flex-col justify-between">
                    <span className="text-xs font-mono text-[#ff7235] font-semibold">OPTIMIZED FUNNEL REVENUE</span>
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
              className="p-6 sm:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#adb3b7]/15">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ff7235] uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    RIVE CLI &amp; RML TEXT-BASED VECTOR RUNTIME
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    Kinetic Vector State Machines &amp; Organic Motion
                  </h3>
                  <p className="text-xs sm:text-sm text-[#adb3b7] mt-1 max-w-2xl leading-relaxed">
                    Interactive vector architectures engineered with pure kinetic physics, squash-and-stretch fluid mechanics, and multi-layered reactive particle dynamics.
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff7235]/10 border border-[#ff7235]/25 text-[#ff7235] text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KINETIC VECTOR PLAYGROUND</span>
                </div>
              </div>

              {/* Live Interactive Motion Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                {/* Widget 1: Liquid Plasma Switch */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] border border-[#adb3b7]/12 backdrop-blur-sm flex flex-col justify-between space-y-6 hover:border-[#ff7235]/30 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-white uppercase tracking-wider flex items-center gap-2 font-bold">
                        <Layers className="w-3.5 h-3.5 text-[#ff7235]" />
                        Liquid Plasma Kinetic Switch
                      </span>
                      <span className="text-[10px] font-mono text-[#ff7235] bg-[#ff7235]/10 px-2 py-0.5 rounded border border-[#ff7235]/20">
                        FLUID HYDRODYNAMICS
                      </span>
                    </div>
                    <p className="text-xs text-[#adb3b7] leading-relaxed">
                      Tap the capsule to trigger fluid squash-and-stretch deformation, magnetic droplet separation, and expanding chromatic light waves.
                    </p>
                  </div>

                  <div className="py-8 flex items-center justify-center rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                    <LiquidPlasmaSwitch />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#adb3b7] pt-3 border-t border-[#adb3b7]/10">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">PHYSICS</span>
                      <strong className="text-white">Squash &amp; Stretch</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">TENSION</span>
                      <strong className="text-white">Metaball Droplet</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">OPTICS</span>
                      <strong className="text-[#ff7235]">Radial Ripple</strong>
                    </div>
                  </div>
                </div>

                {/* Widget 2: Celestial Nova Core */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] border border-[#adb3b7]/12 backdrop-blur-sm flex flex-col justify-between space-y-6 hover:border-cyan-400/30 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-white uppercase tracking-wider flex items-center gap-2 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Celestial Nova Core
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        3D GYRO &amp; PARTICLES
                      </span>
                    </div>
                    <p className="text-xs text-[#adb3b7] leading-relaxed">
                      Hover and drag for 3D gyro tilt. Tap the core directly to trigger an implosion, nova shockwaves, and shifting chromatic energy spectra.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 overflow-hidden">
                    <CelestialNovaCore />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[#adb3b7] pt-3 border-t border-[#adb3b7]/10">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">INTERACTION</span>
                      <strong className="text-white">3D Gyro Parallax</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">DETONATION</span>
                      <strong className="text-white">Nova Photon Burst</strong>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <span className="block text-zinc-500">HARMONICS</span>
                      <strong className="text-cyan-400">Tri-Spectrum</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture & Engineering Deep-Dive */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#adb3b7]/15">
                <div className="p-5 rounded-2xl bg-[#242424]/40 border border-[#adb3b7]/12 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#ff7235] font-bold uppercase">
                    <Code2 className="w-4 h-4" />
                    <span>CODE-FIRST RML WORKFLOW</span>
                  </div>
                  <p className="text-xs text-[#adb3b7] leading-relaxed">
                    Animations are authored as declarative RML XML files directly in Git. AI coding agents and developers can scaffold state machines as code, while designers refine curves in visual tools.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#242424]/40 border border-[#adb3b7]/12 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <Zap className="w-4 h-4" />
                    <span>TACTILE ORGANIC RESPONSE</span>
                  </div>
                  <p className="text-xs text-[#adb3b7] leading-relaxed">
                    Every tap and pointer gesture produces tangible kinetic consequence — fluid stretching, particle detonations, and light blooms that make interfaces feel alive under the thumb.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#242424]/40 border border-[#adb3b7]/12 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>HARDWARE ACCELERATION</span>
                  </div>
                  <p className="text-xs text-[#adb3b7] leading-relaxed">
                    Replaces heavy SVG DOM trees with hardware-accelerated rendering contexts, eliminating layout reflows and delivering frictionless 60fps kinetic motion.
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
