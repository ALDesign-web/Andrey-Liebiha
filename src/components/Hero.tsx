"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ArrowUpRight, Zap, CheckCircle2, Layers, Cpu } from "lucide-react";
import { PORTFOLIO_HERO } from "@/data/portfolioData";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] pt-36 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Ambient background glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] glow-spot-orange pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] glow-spot-cyan pointer-events-none opacity-30 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] glow-spot-indigo pointer-events-none opacity-25 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Monospace Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-300">
              LEAD PRODUCT DESIGN &amp; SYSTEMS
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            // E-COMMERCE CRO • 3D SPATIAL UI • AI SAAS WORKSPACES
          </span>
        </motion.div>

        {/* Main Display Headline */}
        <div className="space-y-2 mb-8 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[0.95] text-white uppercase"
          >
            Product Designer <br />
            <span className="text-gradient-orange">&amp; Systems Architect</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-normal max-w-3xl leading-relaxed pt-2"
          >
            Designing <strong className="text-white font-semibold">high-converting digital products</strong>, 
            tactile 3D spatial experiences, and AI-native SaaS platforms with measurable business impact.
          </motion.p>
        </div>

        {/* Action Buttons & Quick Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#lab"
            className="px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 text-white font-medium text-sm hover:bg-white/[0.08] transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive UI Lab</span>
          </a>

          <a
            href="https://www.behance.net/ALMotion3D"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-full text-zinc-400 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5"
          >
            <span>Behance Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Bottom Hero Metrics Bar (Miraclesux Signature Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
        >
          {PORTFOLIO_HERO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 transition-all group"
            >
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-orange-400 transition-colors tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
