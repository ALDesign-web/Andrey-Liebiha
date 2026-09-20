import React from "react";
import { AbsoluteFill } from "remotion";
import { GlassCard } from "../components/GlassCard";
import { KineticText } from "../components/KineticText";
import { MetricCounter } from "../components/MetricCounter";
import { VideoOverlayHeader } from "../components/VideoOverlayHeader";

interface MetricItem {
  title: string;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  change: string;
  glow: "blue" | "emerald" | "default";
  delay: number;
}

const METRICS: MetricItem[] = [
  {
    title: "OVERALL CONVERSION",
    value: 5.8,
    decimals: 1,
    suffix: "%",
    change: "Up from 2.4% baseline (+141.6% relative lift)",
    glow: "blue",
    delay: 30
  },
  {
    title: "CHECKOUT VELOCITY",
    value: 45,
    decimals: 0,
    suffix: "s",
    change: "Down from 108s (-58.3% friction reduction via 1-tap wallet)",
    glow: "default",
    delay: 55
  },
  {
    title: "AVERAGE ORDER VALUE",
    value: 1595,
    decimals: 0,
    prefix: "₴",
    change: "+28.5% increase through curated cross-sell art collections",
    glow: "emerald",
    delay: 80
  },
  {
    title: "REPEAT RETENTION",
    value: 38.2,
    decimals: 1,
    suffix: "%",
    change: "90-day repeat purchase rate powered by collector loops",
    glow: "default",
    delay: 105
  }
];

const TOKENS = [
  { name: "Obsidian", hex: "#07080C", bg: "bg-[#07080C]", border: "border-white/20" },
  { name: "Royal Blue", hex: "#3B82F6", bg: "bg-[#3B82F6]", border: "border-blue-400" },
  { name: "Emerald", hex: "#10B981", bg: "bg-[#10B981]", border: "border-emerald-400" },
  { name: "Pure Canvas", hex: "#FFFFFF", bg: "bg-white text-black", border: "border-white" }
];

export const Scene5Impact: React.FC = () => {

  return (
    <AbsoluteFill className="bg-[#07080C] text-white flex flex-col justify-center px-14 relative overflow-hidden font-sans select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Overlay */}
      <VideoOverlayHeader
        chapter="07 / 07 • RESULTS & DESIGN SYSTEM"
        stageName="MEASURABLE BUSINESS IMPACT"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full z-10 my-auto space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight">
            <KineticText
              text="Final CRO Metrics & Scalable Component Architecture"
              delay={10}
              highlightWords={["Final", "CRO", "Metrics", "Architecture"]}
              highlightColor="#60A5FA"
            />
          </h2>
          <p className="text-sm text-zinc-400 font-light">
            Validated through 30-day multivariate testing across 120,000+ sessions, driving measurable revenue and customer lifetime value.
          </p>
        </div>

        {/* 4 Grand Metric Cards */}
        <div className="grid grid-cols-4 gap-4">
          {METRICS.map((m, idx) => (
            <GlassCard
              key={idx}
              delay={m.delay}
              glowColor={m.glow}
              className="p-5 flex flex-col justify-between h-[180px] bg-[#0A0D14]/90 border-white/10"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold block mb-2">
                  {m.title}
                </span>
                <div className="text-4xl font-black text-white tracking-tight">
                  <MetricCounter
                    startValue={0}
                    endValue={m.value}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    delay={m.delay + 15}
                  />
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 font-sans leading-snug pt-2 border-t border-white/10">
                {m.change}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom Split: Design System Tokens & Executive Quote */}
        <div className="grid grid-cols-12 gap-5 pt-1">
          {/* Design System Tokens */}
          <div className="col-span-5">
            <GlassCard delay={120} className="p-5 space-y-4 bg-[#0A0E17]/90 border-white/10">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-semibold">
                DESIGN SYSTEM TOKENS & FOUNDATIONS
              </span>

              {/* Swatches */}
              <div className="grid grid-cols-4 gap-2">
                {TOKENS.map((token, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-[#121622] border border-white/10 flex flex-col items-center text-center space-y-1.5"
                  >
                    <div
                      className={`w-6 h-6 rounded-md ${token.bg} border ${token.border} shadow-sm`}
                    />
                    <span className="text-[11px] font-bold text-zinc-200">
                      {token.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      {token.hex}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-zinc-400 font-mono pt-1">
                Typography: Plus Jakarta Sans + Inter + JetBrains Mono
              </div>
            </GlassCard>
          </div>

          {/* Product Design Summary Quote */}
          <div className="col-span-7">
            <GlassCard
              delay={140}
              className="p-5 flex flex-col justify-between h-full bg-[#0A0E17]/90 border-blue-500/30"
              glowColor="blue"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  PRODUCT DESIGN SUMMARY
                </span>
                <blockquote className="text-sm text-zinc-200 leading-relaxed font-light italic">
                  &ldquo;By replacing generic e-commerce templates with intentional visual hierarchy, transparent product specifications, and zero-redirect modal purchasing, Bookify achieved sustainable commercial growth and industry-leading conversion velocity.&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>PORTFOLIO CASE STUDY • 2026 EDITION</span>
                <span className="text-emerald-400 font-semibold">
                  CONFIDENTIAL & PROPRIETARY
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
