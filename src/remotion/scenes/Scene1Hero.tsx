import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GlassCard } from "../components/GlassCard";
import { MetricCounter } from "../components/MetricCounter";
import { KineticText } from "../components/KineticText";
import { VideoOverlayHeader } from "../components/VideoOverlayHeader";

export const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the main hero block
  const badgeProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 }
  });

  const subtitleProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 90 }
  });

  return (
    <AbsoluteFill className="bg-[#07080C] text-white flex flex-col justify-center px-16 relative overflow-hidden font-sans select-none">
      {/* Background Tech Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Overlay */}
      <VideoOverlayHeader chapter="01 / 07 • EXECUTIVE SUMMARY" />

      {/* Central Content Area */}
      <div className="grid grid-cols-12 gap-10 items-center max-w-7xl mx-auto w-full z-10 my-auto">
        {/* Left Column: Headline & Big Metrics */}
        <div className="col-span-8 space-y-7">
          {/* Badge */}
          <div
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs tracking-wider uppercase backdrop-blur-md"
            style={{
              opacity: Math.min(Math.max(badgeProgress, 0), 1),
              transform: `translateY(${(1 - badgeProgress) * 15}px)`
            }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-blue-500 -ml-4" />
            <span>PRODUCT DESIGN & FUNNEL CRO CASE STUDY</span>
          </div>

          {/* Kinetic Title */}
          <div className="text-5xl font-black tracking-tight leading-[1.12]">
            <KineticText
              text="Transforming Art Book Discovery into High-Conversion Sales Funnel"
              delay={20}
              highlightWords={["High-Conversion", "Sales", "Funnel"]}
              highlightColor="#38BDF8"
            />
          </div>

          {/* Subtitle */}
          <div
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-light"
            style={{
              opacity: Math.min(Math.max(subtitleProgress, 0), 1),
              transform: `translateY(${(1 - subtitleProgress) * 15}px)`
            }}
          >
            A strategic UX/UI redesign of the Bookify e-commerce platform,
            engineered to eliminate cognitive friction, amplify social proof,
            and streamline single-tap checkout.
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-4 pt-3">
            {/* Metric 1 */}
            <GlassCard delay={80} glowColor="blue" className="p-5">
              <span className="text-[11px] font-mono tracking-wider text-blue-400 uppercase font-semibold block mb-1">
                Conversion Lift
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                <MetricCounter
                  startValue={0}
                  endValue={34.2}
                  decimals={1}
                  prefix="+"
                  suffix="%"
                  delay={90}
                />
              </div>
              <span className="text-xs text-zinc-400 mt-1 block">
                Funnel CVR Improvement
              </span>
            </GlassCard>

            {/* Metric 2 */}
            <GlassCard delay={100} glowColor="default" className="p-5">
              <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold block mb-1">
                Checkout Velocity
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                <MetricCounter
                  startValue={0}
                  endValue={58.0}
                  decimals={1}
                  prefix="-"
                  suffix="%"
                  delay={110}
                />
              </div>
              <span className="text-xs text-zinc-400 mt-1 block">
                Time to Complete Purchase
              </span>
            </GlassCard>

            {/* Metric 3 */}
            <GlassCard delay={120} glowColor="emerald" className="p-5">
              <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold block mb-1">
                Avg Order Value
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                <MetricCounter
                  startValue={0}
                  endValue={28.5}
                  decimals={1}
                  prefix="+"
                  suffix="%"
                  delay={130}
                />
              </div>
              <span className="text-xs text-zinc-400 mt-1 block">
                AOV via Visual Curation
              </span>
            </GlassCard>
          </div>
        </div>

        {/* Right Column: Project Brief & Specifications */}
        <div className="col-span-4">
          <GlassCard delay={70} className="p-7 space-y-5 border-white/10 bg-[#0A0D14]/90">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                PROJECT BRIEF & SPECS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block font-mono">
                  Product
                </span>
                <span className="text-zinc-200 font-medium text-sm">
                  Bookify Art & Collector Books
                </span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase tracking-wider block font-mono">
                  Role
                </span>
                <span className="text-blue-400 font-medium text-sm">
                  Lead / Senior Product Designer
                </span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase tracking-wider block font-mono">
                  Core Objective
                </span>
                <span className="text-zinc-200 font-medium text-sm">
                  Funnel Optimization & CRO
                </span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase tracking-wider block font-mono">
                  Deliverables
                </span>
                <span className="text-zinc-300 font-medium">
                  Landing, Product, Reviews, Checkout
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono">
                <span className="text-zinc-500 uppercase">Standard</span>
                <span className="text-emerald-400">Retina 4K UHD (3840px)</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};
