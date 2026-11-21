"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Compass, Hand, Play, RotateCcw } from "lucide-react";
import { playTactileSound } from "@/lib/tactileAudio";
import { IPhoneProFrame } from "./IPhoneProFrame";

type HandSide = "right" | "left";
type ReachZone = "natural" | "stretch" | "shift";

interface BenchmarkTarget {
  id: number;
  x: number; // in 0..180 viewBox units (right-hand baseline)
  y: number; // in 0..390 viewBox units
  expectedZone: "natural" | "shift";
  label: string;
}

const BENCHMARK_TARGETS: BenchmarkTarget[] = [
  { id: 1, x: 118, y: 332, expectedZone: "natural", label: "Hint Booster" },
  { id: 2, x: 28, y: 58, expectedZone: "shift", label: "Top Score Pill" },
  { id: 3, x: 74, y: 336, expectedZone: "natural", label: "Shuffle Action" },
  { id: 4, x: 38, y: 86, expectedZone: "shift", label: "Upper Corner" },
  { id: 5, x: 146, y: 324, expectedZone: "natural", label: "Settings Dock" },
];

const SVG_W = 180;
const SVG_H = 390;

export function ThumbZoneLab() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const [hand, setHand] = useState<HandSide>("right");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [targetDensity, setTargetDensity] = useState<"tactile" | "compact">("tactile");

  // Biomechanical hover/tap probe in 180x390 SVG coordinates
  const [probe, setProbe] = useState<{ x: number; y: number }>({ x: 112, y: 326 });

  // 5-Tap Reachability Speed Test
  const [testActive, setTestActive] = useState(false);
  const [testIndex, setTestIndex] = useState(0);
  const [targetShownAt, setTargetShownAt] = useState<number>(0);
  const [naturalTimes, setNaturalTimes] = useState<number[]>([]);
  const [shiftTimes, setShiftTimes] = useState<number[]>([]);
  const [testDone, setTestDone] = useState(false);

  const pivotX = hand === "right" ? 166 : 14;
  const pivotY = 334;

  const dx = probe.x - pivotX;
  const dy = probe.y - pivotY;
  const distSvg = Math.hypot(dx, dy);
  const zone: ReachZone = distSvg <= 132 ? "natural" : distSvg <= 215 ? "stretch" : "shift";
  // Approximate real iPhone 6.3" OLED physical scale (SVG 180 units ~ 68mm width => 0.38 mm/unit)
  const distMm = Math.round(distSvg * 0.38);
  const angleDeg = Math.round((Math.atan2(Math.abs(dy), Math.abs(dx)) * 180) / Math.PI);

  const updateProbeFromPointer = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    const x = Math.max(8, Math.min(172, ((clientX - rect.left) / rect.width) * SVG_W));
    const y = Math.max(12, Math.min(378, ((clientY - rect.top) / rect.height) * SVG_H));
    setProbe({ x, y });
  };

  const handleStartTest = () => {
    setTestActive(true);
    setTestDone(false);
    setTestIndex(0);
    setNaturalTimes([]);
    setShiftTimes([]);
    setTargetShownAt(Date.now());
    playTactileSound("toggle-on");
  };

  const handleBenchmarkTap = (target: BenchmarkTarget) => {
    const now = Date.now();
    const elapsed = Math.max(90, Math.min(2800, now - targetShownAt));
    if (target.expectedZone === "natural") {
      setNaturalTimes((prev) => [...prev, elapsed]);
      playTactileSound("jade");
    } else {
      setShiftTimes((prev) => [...prev, elapsed]);
      playTactileSound("stone");
    }

    if (testIndex + 1 >= BENCHMARK_TARGETS.length) {
      setTestActive(false);
      setTestDone(true);
    } else {
      setTestIndex((idx) => idx + 1);
      setTargetShownAt(Date.now());
    }
  };

  const activeTargetRaw = testActive ? BENCHMARK_TARGETS[testIndex] : null;
  const activeTarget = activeTargetRaw
    ? {
        ...activeTargetRaw,
        x: hand === "right" ? activeTargetRaw.x : SVG_W - activeTargetRaw.x,
      }
    : null;

  const avgNatural =
    naturalTimes.length > 0
      ? Math.round(naturalTimes.reduce((a, b) => a + b, 0) / naturalTimes.length)
      : null;
  const avgShift =
    shiftTimes.length > 0
      ? Math.round(shiftTimes.reduce((a, b) => a + b, 0) / shiftTimes.length)
      : null;

  const zoneLabel =
    zone === "natural"
      ? "Natural Thumb Arc"
      : zone === "stretch"
        ? "Stretch Boundary"
        : "Grip-Shift Required";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left: Exact 9:19.5 iPhone Pro Ergonomic Probe Stage */}
      <div className="lg:col-span-6 flex justify-center">
        <IPhoneProFrame
          islandState={testActive ? "haptic" : "idle"}
          islandLabel={testActive ? `Tap ${testIndex + 1}/5` : undefined}
        >
          <div
            ref={stageRef}
            data-reach-canvas="true"
            onPointerMove={(e) => {
              if (e.pointerType !== "touch") updateProbeFromPointer(e.clientX, e.clientY);
            }}
            onClick={(e) => updateProbeFromPointer(e.clientX, e.clientY)}
            className="relative w-full h-full overflow-hidden cursor-crosshair select-none"
          >
            <Image
              src="/projects/mahjong/screens/02_gameplay_board.webp"
              alt="Expedition Mahjong gameplay layout under ergonomic thumb-reach heatmap"
              width={620}
              height={1344}
              unoptimized
              className="w-full h-full object-cover"
            />

            {/* Proportional 9:19.5 SVG Thumb Arc Map + Probe Vector */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {showHeatmap && (
                <g>
                  {/* Hard Reach Outer Tint */}
                  <rect width={SVG_W} height={SVG_H} fill="rgba(244, 63, 94, 0.14)" />
                  {/* Stretch Arc */}
                  <circle
                    cx={pivotX}
                    cy={pivotY}
                    r={215}
                    fill="rgba(245, 158, 11, 0.16)"
                    stroke="rgba(245, 158, 11, 0.65)"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />
                  {/* Natural 1-Hand Thumb Arc */}
                  <circle
                    cx={pivotX}
                    cy={pivotY}
                    r={132}
                    fill="rgba(16, 185, 129, 0.2)"
                    stroke="rgba(16, 185, 129, 0.85)"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Live Reach Vector from Palm Pivot */}
              <line
                x1={pivotX}
                y1={pivotY}
                x2={probe.x}
                y2={probe.y}
                stroke={
                  zone === "natural" ? "#10b981" : zone === "stretch" ? "#f59e0b" : "#f43f5e"
                }
                strokeWidth="1.35"
                strokeDasharray="3 2.5"
              />

              {/* Palm Anchor Pivot */}
              <circle cx={pivotX} cy={pivotY} r="4.5" fill="#ff7235" stroke="#08090a" strokeWidth="1.2" />

              {/* Cursor / Touch Probe Reticle */}
              <circle
                cx={probe.x}
                cy={probe.y}
                r="7"
                fill="rgba(8,9,10,0.45)"
                stroke={
                  zone === "natural" ? "#10b981" : zone === "stretch" ? "#f59e0b" : "#f43f5e"
                }
                strokeWidth="1.5"
              />
            </svg>

            {/* Bottom Hit-Target Density Comparator Ring */}
            {showHeatmap && !testActive && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center"
              >
                <div
                  className={`w-full rounded-xl border px-2.5 flex items-center justify-between text-[10px] font-mono backdrop-blur-sm transition-all duration-200 ${
                    targetDensity === "tactile"
                      ? "h-11 bg-emerald-950/75 border-emerald-400/70 text-emerald-100"
                      : "h-7 bg-rose-950/80 border-rose-400/75 text-rose-100"
                  }`}
                >
                  <span>
                    {targetDensity === "tactile"
                      ? "48px Safe Dock Targets"
                      : "32px Cramped (Mis-Tap Risk)"}
                  </span>
                  <span className="font-semibold">
                    {targetDensity === "tactile" ? "HIG PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            )}

            {/* Playable 5-Tap Reach Benchmark Target */}
            {activeTarget && (
              <motion.button
                key={activeTarget.id}
                data-reach-target="true"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBenchmarkTap(activeTarget);
                }}
                initial={shouldReduceMotion ? false : { scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  left: `${(activeTarget.x / SVG_W) * 100}%`,
                  top: `${(activeTarget.y / SVG_H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 min-w-[44px] min-h-[44px] px-3 rounded-full bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-[10px] font-mono font-bold shadow-[0_0_0_6px_rgba(255,114,53,0.3)] flex items-center justify-center whitespace-nowrap"
              >
                Tap #{activeTarget.id}
              </motion.button>
            )}
          </div>
        </IPhoneProFrame>
      </div>

      {/* Right: Handedness Switcher, Probe Telemetry & Speed Benchmark */}
      <div className="lg:col-span-6 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
            Biomechanical Ergonomics · HIG &amp; Material 3
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
            Designing inside the natural thumb arc.
          </h3>
          <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
            Move your cursor or tap inside the iPhone Pro to inspect physical reach distance from
            the palm pivot. Switch handedness or run the 5-tap speed test to measure bottom dock
            ergonomics against top-corner stretching.
          </p>
        </div>

        {/* Handedness & Heatmap Controls */}
        <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex p-1 rounded-full bg-[#121316] border border-white/10">
              {(["right", "left"] as const).map((side) => {
                const selected = hand === side;
                return (
                  <button
                    key={side}
                    type="button"
                    onClick={() => {
                      setHand(side);
                      playTactileSound("ivory");
                    }}
                    className={`relative min-h-[38px] px-3.5 rounded-full text-xs font-mono transition-colors ${
                      selected
                        ? "bg-[#ff7235] text-[#08090a] font-semibold"
                        : "text-[#adb3b7] hover:text-[#f2f5f1]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Hand className="w-3.5 h-3.5" aria-hidden="true" />
                      {side === "right" ? "Right Hand" : "Left Hand"}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowHeatmap((prev) => !prev)}
              className={`min-h-[38px] px-3.5 rounded-full text-xs font-mono border transition-colors ${
                showHeatmap
                  ? "bg-white/[0.08] border-white/20 text-[#f2f5f1]"
                  : "bg-transparent border-white/10 text-[#adb3b7]"
              }`}
            >
              Arc Overlay: {showHeatmap ? "On" : "Off"}
            </button>
          </div>

          {/* Live Biomechanical Readout */}
          <div
            data-reach-readout="true"
            className="grid grid-cols-3 gap-2.5 pt-3 border-t border-white/[0.06]"
          >
            <div className="rounded-xl bg-[#121316] border border-white/[0.06] p-2.5">
              <div className="text-[10px] font-mono text-[#adb3b7]">Reach Zone</div>
              <div
                className={`text-xs font-mono font-semibold mt-0.5 ${
                  zone === "natural"
                    ? "text-emerald-400"
                    : zone === "stretch"
                      ? "text-amber-400"
                      : "text-rose-400"
                }`}
              >
                {zoneLabel}
              </div>
            </div>
            <div className="rounded-xl bg-[#121316] border border-white/[0.06] p-2.5">
              <div className="text-[10px] font-mono text-[#adb3b7]">Thumb Span</div>
              <div className="text-xs font-mono font-semibold text-[#f2f5f1] tabular-nums mt-0.5">
                {distMm} mm
              </div>
            </div>
            <div className="rounded-xl bg-[#121316] border border-white/[0.06] p-2.5">
              <div className="text-[10px] font-mono text-[#adb3b7]">Sweep Angle</div>
              <div className="text-xs font-mono font-semibold text-[#f2f5f1] tabular-nums mt-0.5 inline-flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
                {angleDeg} deg
              </div>
            </div>
          </div>

          {/* Hit Target Geometry Toggle */}
          <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setTargetDensity("tactile");
                  playTactileSound("toggle-on");
                }}
                className={`min-h-[42px] px-3 rounded-xl text-xs font-mono border transition-colors ${
                  targetDensity === "tactile"
                    ? "bg-[#ff7235]/15 border-[#ff7235]/55 text-[#f2f5f1] font-semibold"
                    : "bg-white/[0.03] border-white/[0.08] text-[#adb3b7]"
                }`}
              >
                48px Tactile HIG
              </button>
              <button
                type="button"
                onClick={() => {
                  setTargetDensity("compact");
                  playTactileSound("toggle-off");
                }}
                className={`min-h-[42px] px-3 rounded-xl text-xs font-mono border transition-colors ${
                  targetDensity === "compact"
                    ? "bg-[#ff7235]/15 border-[#ff7235]/55 text-[#f2f5f1] font-semibold"
                    : "bg-white/[0.03] border-white/[0.08] text-[#adb3b7]"
                }`}
              >
                32px Mis-Tap Risk
              </button>
            </div>
          </div>
        </div>

        {/* Playable 5-Tap Reachability Speed Benchmark */}
        <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-[#f2f5f1]">
              Interactive 5-Tap Reach Benchmark
            </div>
            <p className="text-xs text-[#adb3b7]">
              {testDone && avgNatural !== null && avgShift !== null
                ? `Result: Bottom Arc ${avgNatural}ms vs Top Corner ${avgShift}ms (+${Math.max(0, avgShift - avgNatural)}ms faster inside thumb zone)`
                : testActive
                  ? `Tap glowing target #${testIndex + 1} (${BENCHMARK_TARGETS[testIndex].label}) inside phone`
                  : "Measure your real latency between the bottom dock and upper opposite corner."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartTest}
            className="tm-press min-h-[42px] px-4 py-2 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-xs font-mono font-semibold inline-flex items-center justify-center gap-1.5 shrink-0 transition-colors"
          >
            {testDone ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Run Again
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                {testActive ? "Restart" : "Start Reach Test"}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
