"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, CheckCircle2, Globe, Smartphone, Mail } from "lucide-react";
import { PORTFOLIO_HERO, EXPERIENCE_TIMELINE, CV_METADATA, TOOLS_MATRIX } from "@/data/portfolioData";
import { downloadCvDocx } from "@/lib/generateCvDocx";

export default function CvPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-200 py-12 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:text-black print:p-0">
      {/* Top Action Bar - Hidden in Print */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO PORTFOLIO
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => downloadCvDocx()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 hover:border-blue-500 transition-all shadow-sm active:scale-95"
            title="Download ATS-compliant Word document"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            DOWNLOAD .DOCX (ATS)
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-[#ff7235] hover:bg-[#ff844f] transition-all shadow-md shadow-[#ff7235]/20 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            PRINT / SAVE AS PDF
          </button>
        </div>
      </div>

      {/* Main Printable CV Paper */}
      <article className="max-w-4xl mx-auto bg-[#14161d] print:bg-white p-8 sm:p-12 rounded-3xl border border-white/10 print:border-0 print:p-0 shadow-2xl">
        {/* Header */}
        <header className="border-b border-zinc-800 print:border-zinc-300 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
                {PORTFOLIO_HERO.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#ff7235] print:text-blue-700 mt-1">
                Senior Product Designer &amp; Mobile Systems Architect
              </p>
            </div>
            <div className="text-xs sm:text-right font-mono text-zinc-400 print:text-zinc-600 space-y-1">
              <div>{CV_METADATA.location}</div>
              <div className="text-emerald-400 print:text-emerald-700 font-semibold">{CV_METADATA.availability}</div>
              <div>English: Full Professional (C1/C2)</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-zinc-400 print:text-zinc-600 border-t border-zinc-800/60 print:border-zinc-200 pt-4">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#ff7235] print:text-black" />
              andriiliebiha.com
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
              iOS 18+ HIG &amp; Material 3 Specialist
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
              Direct inquiries via portfolio
            </span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-3">
            01. Professional Summary
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 print:text-zinc-800 leading-relaxed">
            {PORTFOLIO_HERO.bio}
          </p>
        </section>

        {/* Commercial Experience */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-5">
            02. Commercial Track Record
          </h2>
          <div className="space-y-8">
            {EXPERIENCE_TIMELINE.map((exp, idx) => (
              <div key={idx} className="relative pl-0 sm:pl-4 sm:border-l sm:border-zinc-800 print:border-zinc-300 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white print:text-black">
                    {exp.role}{" "}
                    <span className="text-[#ff7235] print:text-blue-700 font-medium">
                      @ {exp.company}
                    </span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600 bg-white/5 print:bg-zinc-100 px-2 py-0.5 rounded">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 print:text-zinc-700 leading-relaxed">
                  {exp.description}
                </p>

                {/* Bullet Highlights */}
                <div className="pt-2 space-y-1.5">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-zinc-300 print:text-zinc-800">
                      <span className="text-[#ff7235] print:text-black mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Specific Focus */}
                {exp.mobileHighlights && exp.mobileHighlights.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-white/[0.02] print:bg-zinc-50 border border-white/5 print:border-zinc-200">
                    <div className="text-[11px] font-mono text-cyan-400 print:text-blue-800 uppercase font-semibold mb-1">
                      Mobile Application Craft &amp; Systems:
                    </div>
                    <ul className="text-xs text-zinc-400 print:text-zinc-700 space-y-1">
                      {exp.mobileHighlights.map((mItem, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 print:text-blue-800 shrink-0" />
                          <span>{mItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Matrix */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-4">
            03. Core Toolset &amp; Technical Proficiency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] print:bg-zinc-50 border border-white/5 print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                Mobile &amp; UI Systems
              </div>
              <ul className="text-xs text-zinc-400 print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.design.map((t, tIdx) => (
                  <li key={tIdx}>• {t.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] print:bg-zinc-50 border border-white/5 print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                3D, Motion &amp; Media
              </div>
              <ul className="text-xs text-zinc-400 print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.motionAndMedia.map((t, tIdx) => (
                  <li key={tIdx}>• {t.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] print:bg-zinc-50 border border-white/5 print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                Code &amp; AI Workbenches
              </div>
              <ul className="text-xs text-zinc-400 print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.engineeringAndAI.map((t, tIdx) => (
                  <li key={tIdx}>• {t.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Languages */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-800 print:border-zinc-300">
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-2">
              04. Academic Education
            </h2>
            <div className="text-sm font-bold text-white print:text-black">
              {CV_METADATA.education.degree}
            </div>
            <div className="text-xs font-mono text-zinc-400 print:text-zinc-600 mt-0.5">
              {CV_METADATA.education.field} • {CV_METADATA.education.type}
            </div>
            <p className="text-xs text-zinc-400 print:text-zinc-700 mt-1">
              {CV_METADATA.education.details}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-2">
              05. Languages
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-zinc-300 print:text-zinc-800">
              {CV_METADATA.languages.map((l, lIdx) => (
                <div key={lIdx} className="flex items-baseline justify-between">
                  <span className="font-semibold text-white print:text-black">{l.language}</span>
                  <span className="font-mono text-zinc-400 print:text-zinc-600 text-xs">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
