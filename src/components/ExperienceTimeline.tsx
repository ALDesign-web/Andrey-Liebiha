"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Wrench,
  CheckCircle2,
  Code2,
  Video,
  Layers,
  Download,
  FileText,
  Smartphone,
  GraduationCap,
  Globe2,
  ExternalLink,
  Sparkles,
  Printer
} from "lucide-react";
import { EXPERIENCE_TIMELINE, TOOLS_MATRIX, CV_METADATA } from "@/data/portfolioData";
import { downloadCvDocx } from "@/lib/generateCvDocx";

export function ExperienceTimeline() {
  const [viewMode, setViewMode] = useState<"executive" | "detailed">("executive");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadDocx = async () => {
    setIsDownloading(true);
    try {
      downloadCvDocx("Andrii_Liebiha_Senior_Product_Designer_CV.docx");
    } catch (e) {
      console.error("Failed to generate DOCX:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  const toolsetCards = [
    {
      category: "Mobile & UI Design Systems",
      badge: "MUST HAVE",
      badgeColor: "text-[#ff7235] bg-[#ff7235]/10 border-[#ff7235]/25",
      dotColor: "bg-[#ff7235]",
      icon: <Layers className="w-4 h-4 text-[#ff7235]" />,
      tools: TOOLS_MATRIX.design
    },
    {
      category: "3D, Motion & Sensory Haptics",
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
      {/* Glow background accents */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] glow-spot-orange pointer-events-none opacity-15 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] glow-spot-cyan pointer-events-none opacity-15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        {/* Availability Badge Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-zinc-300 tracking-wide uppercase">
              {CV_METADATA.availability}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono text-zinc-400">
              {CV_METADATA.location}
            </span>
          </div>

          {/* Quick Format Indicator for conservative recruiters */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#adb3b7]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>ATS-READY .DOCX &amp; PRINTABLE PDF COMPLIANT</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="space-y-4 mb-8 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff7235] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7235]" />
            MOBILE ARCHITECTURE, SYSTEMS &amp; CAREER TRACK
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
            <span className="block">PROVEN TRACK RECORD</span>
            <span className="block text-gradient-orange">&amp; TECHNICAL MASTERY</span>
          </h2>
          <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed max-w-2xl">
            Leading 0-to-1 mobile applications, spatial 3D interfaces, and cross-platform design systems from early vision to high-impact production releases.
          </p>
        </div>

        {/* Executive CV Control & Export Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-md mb-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
            <button
              onClick={() => setViewMode("executive")}
              className={`relative px-4 sm:px-5 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 z-10 whitespace-nowrap cursor-pointer ${
                viewMode === "executive" ? "text-white" : "text-[#adb3b7] hover:text-white"
              }`}
            >
              {viewMode === "executive" && (
                <motion.div
                  layoutId="cvModeIndicator"
                  className="absolute inset-0 bg-[#ff7235] rounded-lg shadow-sm shadow-[#ff7235]/30 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Executive Summary
            </button>

            <button
              onClick={() => setViewMode("detailed")}
              className={`relative px-4 sm:px-5 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 z-10 whitespace-nowrap cursor-pointer ${
                viewMode === "detailed" ? "text-white" : "text-[#adb3b7] hover:text-white"
              }`}
            >
              {viewMode === "detailed" && (
                <motion.div
                  layoutId="cvModeIndicator"
                  className="absolute inset-0 bg-[#ff7235] rounded-lg shadow-sm shadow-[#ff7235]/30 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Detailed CV
            </button>
          </div>

          {/* Document Download Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadDocx}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-100 hover:text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 hover:border-blue-400 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap shadow-sm shadow-blue-500/10 cursor-pointer"
              title="Download ATS-compliant Word (.docx) document"
            >
              <FileText className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isDownloading ? "BUILDING..." : "DOWNLOAD .DOCX (ATS)"}</span>
              <Download className="w-3.5 h-3.5 text-blue-400/80 shrink-0 ml-0.5" />
            </button>

            <Link
              href="/cv"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-100 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              title="Open Printable / PDF Version"
            >
              <Printer className="w-4 h-4 text-zinc-300 shrink-0" />
              <span>VIEW / PRINT .PDF</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Unified Column Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
          <div className="lg:col-span-7 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#adb3b7] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#ff7235]" />
              {viewMode === "executive" ? "Key Milestones (Executive Glance)" : "Full Experience Log & Achievements"}
            </h3>
            <span className="text-[11px] font-mono text-[#adb3b7]/60 tabular-nums">2018 - PRESENT</span>
          </div>

          <div className="lg:col-span-5 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#adb3b7] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              Core Toolset &amp; Requirements
            </h3>
            <span className="text-[11px] font-mono text-[#adb3b7]/60">GLOBAL TECH BENCHMARK</span>
          </div>
        </div>

        {/* Symmetrically Paired Grid */}
        <div className="flex flex-col gap-6">
          {EXPERIENCE_TIMELINE.map((experience, idx) => {
            const toolset = toolsetCards[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "200px 0px 200px 0px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
              >
                {/* Left Card: Experience Milestone (7 cols) */}
                <div className="lg:col-span-7 h-full p-5 sm:p-7 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 hover:border-[#ff7235]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#ff7235]/10 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff7235] shrink-0" />
                        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {experience.role}
                        </h4>
                      </div>

                      <span className="text-[11px] sm:text-xs font-mono text-[#ff7235] bg-[#ff7235]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#ff7235]/25">
                        {experience.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#adb3b7] pl-0 sm:pl-5">
                      {experience.company} <span className="text-[#adb3b7]/40">•</span> {experience.location}
                    </div>

                    {/* Mode Dependent Content View */}
                    <AnimatePresence mode="wait">
                      {viewMode === "executive" ? (
                        <motion.div
                          key="exec-view"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="pl-0 sm:pl-5 space-y-3"
                        >
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                            {experience.executiveSummary || experience.description}
                          </p>

                          {/* Mobile highlights pill bar */}
                          {experience.mobileHighlights && experience.mobileHighlights.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {experience.mobileHighlights.slice(0, 2).map((mh, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                                >
                                  <Smartphone className="w-3 h-3 text-cyan-400" />
                                  {mh}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="detailed-view"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="pl-0 sm:pl-5 space-y-3"
                        >
                          <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
                            {experience.description}
                          </p>

                          {/* Specific Mobile Architecture Highlights */}
                          {experience.mobileHighlights && experience.mobileHighlights.length > 0 && (
                            <div className="p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                                <Smartphone className="w-3.5 h-3.5" />
                                Mobile Application Architecture &amp; Ergonomics
                              </div>
                              <ul className="space-y-1 text-xs text-zinc-300">
                                {experience.mobileHighlights.map((mItem, mIdx) => (
                                  <li key={mIdx} className="flex items-start gap-1.5">
                                    <span className="text-cyan-400 mt-0.5">•</span>
                                    <span>{mItem}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Highlights (Shown fully in detailed mode, top highlights in executive) */}
                  <div className="pt-4 mt-4 border-t border-[#adb3b7]/15 pl-0 sm:pl-5 space-y-2">
                    {(viewMode === "executive" ? experience.highlights.slice(0, 2) : experience.highlights).map(
                      (highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#e7ece5] leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      )
                    )}

                    {/* Tool tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {experience.tools.map((tool, toolIdx) => (
                        <span
                          key={toolIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Card: Toolset Category (5 cols) */}
                <div className="lg:col-span-5 h-full p-5 sm:p-7 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-[#adb3b7]/12 hover:border-[#adb3b7]/30 transition-all duration-300 shadow-[inset_0_1px_0_rgba(173,179,183,0.08)] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-[#adb3b7]/15 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${toolset.dotColor}`} />
                      <span className="text-xs font-mono text-white font-bold uppercase tracking-wider truncate">
                        {toolset.category}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${toolset.badgeColor}`}
                    >
                      {toolset.badge}
                    </span>
                  </div>

                  <div className="space-y-2.5 py-3 flex-1 flex flex-col justify-center">
                    {toolset.tools.map((tool, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 pb-2 border-b border-[#adb3b7]/10 last:border-0 last:pb-0"
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

                  <div className="pt-3 text-[10px] font-mono text-[#adb3b7]/70 flex flex-wrap items-center justify-between gap-1 border-t border-[#adb3b7]/15">
                    <span>PROFICIENCY BENCHMARK</span>
                    <span className="text-emerald-400/90 font-semibold">100% PRODUCTION READY</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed CV View: Academic Education & Language Verification Blocks */}
        <AnimatePresence>
          {viewMode === "detailed" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
            >
              {/* Higher Education Card */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-[#adb3b7]/15 backdrop-blur-md space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#ff7235] uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#ff7235]" />
                  Formal Academic Background
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {CV_METADATA.education.degree}
                </h4>
                <div className="text-xs font-mono text-zinc-400">
                  {CV_METADATA.education.field} • {CV_METADATA.education.type}
                </div>
                <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
                  {CV_METADATA.education.details}
                </p>
              </div>

              {/* Languages Card */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-[#adb3b7]/15 backdrop-blur-md space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                    Language Proficiency
                  </div>
                  <div className="space-y-2.5">
                    {CV_METADATA.languages.map((lang, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-center justify-between pb-2 border-b border-white/5 last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-semibold text-white">{lang.language}</span>
                        <div className="text-right">
                          <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {lang.level}
                          </span>
                          <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                            {lang.details}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>ATS &amp; VERIFICATION READY</span>
                  <button
                    onClick={handleDownloadDocx}
                    className="text-[#ff7235] hover:underline inline-flex items-center gap-1"
                  >
                    Download .DOCX <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
