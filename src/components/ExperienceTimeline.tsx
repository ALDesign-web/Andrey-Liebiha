"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Wrench, CheckCircle2, Sparkles, Code2, Video, Layers } from "lucide-react";
import { EXPERIENCE_TIMELINE, TOOLS_MATRIX } from "@/data/portfolioData";

export function ExperienceTimeline() {
  const toolsetCards = [
    {
      category: "UI & Design Systems",
      badge: "MUST HAVE",
      badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      dotColor: "bg-orange-400",
      icon: <Layers className="w-4 h-4 text-orange-400" />,
      tools: TOOLS_MATRIX.design
    },
    {
      category: "Motion & Adobe CC Suite",
      badge: "MUST HAVE",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      dotColor: "bg-cyan-400",
      icon: <Video className="w-4 h-4 text-cyan-400" />,
      tools: TOOLS_MATRIX.motionAndMedia
    },
    {
      category: "AI Native & Frontend Code",
      badge: "STRONG BONUS",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      dotColor: "bg-emerald-400",
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      tools: TOOLS_MATRIX.engineeringAndAI
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] glow-spot-orange pointer-events-none opacity-15 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] glow-spot-cyan pointer-events-none opacity-15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            PRODUCT STRATEGY &amp; TOOLSET PROFICIENCY
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            Proven Track Record <br />
            <span className="text-gradient-orange">&amp; Technical Mastery</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Leading product design and digital platforms from early conceptual vision to high-impact production releases.
          </p>
        </div>

        {/* Unified Column Headers with 100% Matching Baseline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          <div className="lg:col-span-7 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-orange-400" />
              Strategic Roles &amp; Experience
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">2018 - PRESENT</span>
          </div>

          <div className="lg:col-span-5 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              Core Toolset &amp; Requirements
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">GLOBAL TECH BENCHMARK</span>
          </div>
        </div>

        {/* Symmetrically Paired 3-Row Grid: Perfectly Aligned Start & End */}
        <div className="flex flex-col gap-6">
          {EXPERIENCE_TIMELINE.map((experience, idx) => {
            const toolset = toolsetCards[idx];

            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Left Card: Experience Milestone (7 cols) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="lg:col-span-7 h-full p-5 sm:p-7 rounded-3xl bg-[#0f1015] border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50 shrink-0" />
                        <h4 className="text-base sm:text-xl font-bold text-white tracking-tight">
                          {experience.role}
                        </h4>
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono text-orange-400 bg-orange-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-orange-500/20">
                        {experience.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 pl-0 sm:pl-5">
                      {experience.company} <span className="text-zinc-600">•</span> {experience.location}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-0 sm:pl-5">
                      {experience.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] pl-0 sm:pl-5 space-y-2">
                    {experience.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Card: Toolset Category (5 cols) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.05 }}
                  className="lg:col-span-5 h-full p-5 sm:p-7 rounded-3xl bg-[#0f1015] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${toolset.dotColor}`} />
                      <span className="text-xs font-mono text-white font-bold uppercase tracking-wider truncate">
                        {toolset.category}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${toolset.badgeColor}`}>
                      {toolset.badge}
                    </span>
                  </div>

                  <div className="space-y-2.5 py-3 flex-1 flex flex-col justify-center">
                    {toolset.tools.map((tool, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 pb-2 border-b border-white/[0.04] last:border-0 last:pb-0"
                      >
                        <span className="text-zinc-200 font-medium text-xs sm:text-sm leading-snug">
                          {tool.name}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] text-emerald-400 font-semibold self-start sm:self-auto bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                          {tool.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 text-[10px] font-mono text-zinc-500 flex flex-wrap items-center justify-between gap-1 border-t border-white/[0.04]">
                    <span>PROFICIENCY BENCHMARK</span>
                    <span className="text-emerald-400/90 font-semibold">100% PRODUCTION READY</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
