"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, ShieldCheck, FileText, Sparkles, Layers, Eye } from "lucide-react";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { ProjectItem } from "@/types/portfolio";
import { ProjectModal } from "./ProjectModal";

export function ProjectsShowcase() {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] glow-spot-orange pointer-events-none opacity-20 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] glow-spot-cyan pointer-events-none opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              FEATURED CASE STUDIES &amp; PRODUCTION CRAFT
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              Selected Works <br />
              <span className="text-gradient-orange">&amp; Quantifiable Impact</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            Detailed 0-to-1 case studies demonstrating conversion optimization, tactile 3D mobile experiences, 
            and AI-native SaaS workbench architectures.
          </p>
        </div>

        {/* Project Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence>
            {PROJECTS_DATA.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveModalProject(project)}
                className="group relative rounded-3xl bg-[#0f1015] border border-white/10 hover:border-orange-500/40 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)] cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient Top Spotlight Sheen */}
                <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-orange-500/15 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                  {/* Card Meta Header */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                      {project.number} // 2026
                    </span>
                    <span className="font-mono text-xs text-zinc-300 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Image Card Container (16:9 full fit) */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-black border border-white/[0.08] shadow-inner">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity pointer-events-none" />

                    {/* Hover Action Badge */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-semibold text-xs shadow-xl backdrop-blur-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Deep Dive ({project.slides.length} Slides)</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-orange-400 transition-all shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Metrics & Tools Chips */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Primary Metric Pill */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {project.metrics[0]?.value}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {project.metrics[0]?.label}
                    </span>
                  </div>

                  {/* Tools Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300"
                      >
                        {tool.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* NDA / Confidential Archive Card */}
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-3xl bg-gradient-to-br from-[#12131a] to-[#090a0f] border border-dashed border-white/20 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group hover:border-orange-500/40 transition-all duration-300"
            >
                {/* Ambient glow in corner */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Top Bar with NDA Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>CONFIDENTIAL &amp; PROPRIETARY</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">15+ ARCHIVED SYSTEMS</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
                    Enterprise Archive <br />
                    <span className="text-zinc-400">&amp; NDA Portfolio</span>
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    In addition to the 3 public case studies presented above, I have engineered 
                    15+ enterprise SaaS platforms, fintech checkout cores, and multi-brand design systems.
                  </p>

                  {/* List of Protected Domains */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>B2B Enterprise Workflow &amp; AI CRM Engines</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Multi-Brand Token Systems for 40+ Engineering Squads</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>High-Security Cloud Analytics &amp; Telemetry Dashboards</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-zinc-500 font-mono">
                    Protected under Mutual NDA
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 hover:scale-105"
                  >
                    <span>Request Private Walkthrough</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

