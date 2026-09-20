import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlassCard } from "../components/GlassCard";
import { KineticText } from "../components/KineticText";
import { MetricCounter } from "../components/MetricCounter";
import { VideoOverlayHeader } from "../components/VideoOverlayHeader";

interface StageData {
  stage: string;
  title: string;
  friction: string;
  solution: string;
  uplift: string;
  upliftNumber: number;
  delay: number;
}

const STAGES: StageData[] = [
  {
    stage: "STAGE 01 • DISCOVERY",
    title: "Curated Home Catalog",
    friction: "High bounce rate from generic grids; users overwhelmed.",
    solution: "Editorial visual hero, author credentials (Taschen), instant category pills.",
    uplift: "Click-to-Product",
    upliftNumber: 22.4,
    delay: 40
  },
  {
    stage: "STAGE 02 • IMMERSION",
    title: "Product Architecture",
    friction: "Hesitation on physical edition quality, spread details & binding.",
    solution: "Full double-spread preview, transparent dimension tags, prominent dual CTAs.",
    uplift: "Add to Cart Intent",
    upliftNumber: 31.2,
    delay: 70
  },
  {
    stage: "STAGE 03 • VALIDATION",
    title: "Social Proof & Reviews",
    friction: "Uncertainty on high-ticket books (₴400-₴600) without community proof.",
    solution: "Verified collector badges, rating breakdown, and direct Q&A interaction.",
    uplift: "Trust Uplift",
    upliftNumber: 26.8,
    delay: 100
  },
  {
    stage: "STAGE 04 • CONVERSION",
    title: "Express 1-Tap Checkout",
    friction: "Multi-page redirects causing 68% cart abandonment.",
    solution: "In-context modal checkout with Apple/Google Pay and zero page reloads.",
    uplift: "Checkout Completion",
    upliftNumber: 44.6,
    delay: 130
  }
];

export const Scene2Funnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bottom Benchmark animation
  const benchmarkSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14, stiffness: 80 }
  });

  return (
    <AbsoluteFill className="bg-[#07080C] text-white flex flex-col justify-center px-14 relative overflow-hidden font-sans select-none">
      {/* Ambient Lighting & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Overlay */}
      <VideoOverlayHeader
        chapter="02 / 07 • STRATEGY & METRICS"
        stageName="STAGE-BY-STAGE PERSUASION BLUEPRINT"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full z-10 my-auto space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <div className="text-4xl font-extrabold tracking-tight">
            <KineticText
              text="4-Stage Funnel Diagnosis & Systematic Friction Elimination"
              delay={10}
              highlightWords={["Systematic", "Friction", "Elimination"]}
              highlightColor="#60A5FA"
            />
          </div>
          <p className="text-sm text-zinc-400 font-light max-w-3xl">
            Mapping customer decision points across Discovery, Specification,
            Validation, and Purchase to transform drop-offs into conversion loops.
          </p>
        </div>

        {/* 4 Bento Stages Grid */}
        <div className="grid grid-cols-4 gap-4 relative">
          {STAGES.map((s, idx) => (
            <GlassCard
              key={idx}
              delay={s.delay}
              className="p-5 flex flex-col justify-between h-[290px] border-white/10 hover:border-blue-500/40 transition-colors"
              glowColor={idx === 3 ? "blue" : "default"}
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase block">
                  {s.stage}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {s.title}
                </h3>

                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-zinc-300">
                    <span className="text-red-400 font-mono font-semibold uppercase block text-[9px] mb-0.5">
                      Friction Point
                    </span>
                    {s.friction}
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-2 text-zinc-300">
                    <span className="text-blue-400 font-mono font-semibold uppercase block text-[9px] mb-0.5">
                      UX Solution
                    </span>
                    {s.solution}
                  </div>
                </div>
              </div>

              {/* Metric Pill at bottom of card */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-xs text-emerald-400">
                <span className="text-[10px] text-zinc-400 uppercase font-sans">
                  {s.uplift}
                </span>
                <div className="flex items-center space-x-1 font-bold">
                  <span>▲</span>
                  <MetricCounter
                    startValue={0}
                    endValue={s.upliftNumber}
                    decimals={1}
                    prefix="+"
                    suffix="%"
                    delay={s.delay + 30}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom Benchmark Performance Bar */}
        <div
          className="rounded-xl bg-[#0D1017]/95 border border-blue-500/30 p-4 px-6 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          style={{
            opacity: Math.min(Math.max(benchmarkSpring, 0), 1),
            transform: `translateY(${(1 - benchmarkSpring) * 20}px)`
          }}
        >
          <div className="flex items-center space-x-8 font-mono text-xs">
            <span className="text-zinc-500 font-bold uppercase tracking-wider">
              FUNNEL BENCHMARK:
            </span>
            <div className="flex items-center space-x-2 text-zinc-400">
              <span>Industry:</span>
              <span className="text-zinc-300 font-semibold">2.1% CVR</span>
            </div>
            <span className="text-zinc-600">→</span>
            <div className="flex items-center space-x-2 text-zinc-400">
              <span>Legacy Baseline:</span>
              <span className="text-zinc-300 font-semibold">2.4% CVR</span>
            </div>
            <span className="text-zinc-600">→</span>
            <div className="flex items-center space-x-2 bg-blue-500/15 border border-blue-500/30 px-3 py-1 rounded-md text-blue-300">
              <span className="font-sans font-medium text-white">Bookify Redesign:</span>
              <span className="font-bold text-emerald-400 text-sm">
                <MetricCounter
                  startValue={2.4}
                  endValue={5.8}
                  decimals={1}
                  suffix="% CVR"
                  delay={190}
                />
              </span>
              <span className="text-blue-400 text-[11px] font-bold">
                (+141% Relative Lift)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span>✓</span>
            <span>STATISTICALLY SIGNIFICANT (p &lt; 0.01)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
