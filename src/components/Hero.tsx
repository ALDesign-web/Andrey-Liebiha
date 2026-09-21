"use client";

import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_HERO } from "@/data/portfolioData";
import { RiveOrbBeacon } from "@/components/RiveOrbBeacon";

export function Hero() {
  const statAnimClasses = [
    "animate-hero-stat-1",
    "animate-hero-stat-2",
    "animate-hero-stat-3",
    "animate-hero-stat-4"
  ];

  return (
    <section className="relative min-h-[92vh] pt-36 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Ambient background glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-spot-orange pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] glow-spot-cyan pointer-events-none opacity-30 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] glow-spot-indigo pointer-events-none opacity-25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Monospace Eyebrow Badge */}
        <div className="animate-hero-eyebrow flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-[#adb3b7]/20 backdrop-blur-md">
            <RiveOrbBeacon size={20} className="-my-1" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#adb3b7]">
              LEAD PRODUCT DESIGN &amp; SYSTEMS
            </span>
          </div>
          <span className="text-xs font-mono text-[#adb3b7]/60 hidden sm:inline">
            {"// E-COMMERCE CRO • 3D SPATIAL UI • AI SAAS WORKSPACES"}
          </span>
        </div>

        {/* Main Display Headline */}
        <div className="space-y-2 mb-8 max-w-5xl">
          <h1 className="animate-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[0.95] text-white uppercase">
            Product Designer <br />
            <span className="text-gradient-orange">&amp; Systems Architect</span>
          </h1>

          <p className="animate-hero-desc text-lg sm:text-xl md:text-2xl text-[#adb3b7] font-normal max-w-3xl leading-relaxed pt-2">
            Designing <strong className="text-white font-semibold">high-converting digital products</strong>, 
            tactile 3D spatial experiences, and AI-native SaaS platforms with measurable business impact.
          </p>
        </div>

        {/* Action Buttons & Quick Anchors */}
        <div className="animate-hero-cta flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto">
          <a
            href="#projects"
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff7235] to-[#ffa043] text-black font-semibold text-sm shadow-xl shadow-[#ff7235]/25 hover:shadow-[#ff7235]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#lab"
            className="px-6 py-3.5 rounded-full bg-white/[0.05] border border-[#adb3b7]/20 hover:border-[#adb3b7]/40 text-white font-medium text-sm hover:bg-white/[0.08] active:scale-[0.98] transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#ffa043]" />
            <span>Interactive UI Lab</span>
          </a>

          <a
            href="https://www.behance.net/ALMotion3D"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full text-[#adb3b7] hover:text-white active:scale-[0.98] text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
          >
            <span>Behance Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Hero Metrics Bar (Miraclesux Signature Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8">
          {PORTFOLIO_HERO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`${statAnimClasses[idx] || "animate-hero-stats"} p-4 sm:p-5 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 hover:border-[#ff7235]/40 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] transition-all group`}
            >
              <div className="text-2xl sm:text-4xl font-black text-white group-hover:text-[#ff7235] transition-colors tracking-tight font-sans tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-[#e7ece5] mt-1 line-clamp-1">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-[#adb3b7] mt-0.5 line-clamp-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
