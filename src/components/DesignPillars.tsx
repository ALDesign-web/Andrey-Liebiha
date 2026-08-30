"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Component, TrendingUp, CheckCircle2 } from "lucide-react";
import { SKILL_PILLARS } from "@/data/portfolioData";

export function DesignPillars() {
  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
    Layers: <Layers className="w-5 h-5 text-cyan-400" />,
    Component: <Component className="w-5 h-5 text-orange-400" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-400" />
  };

  return (
    <section id="pillars" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            CORE PRODUCT DESIGN PILLARS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
            Product Craft <br />
            <span className="text-gradient-orange">&amp; Strategic Foundation</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Engineered to set and elevate product design standards across modern enterprise platforms.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-3xl bg-[#0f1015] border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between transform-gpu"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                  {iconMap[pillar.iconName] || <Sparkles className="w-5 h-5 text-orange-400" />}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Skills checklist */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                {pillar.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
