"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, CheckCircle2, Smartphone, Mail, Send, Globe } from "lucide-react";
import { PORTFOLIO_HERO, EXPERIENCE_TIMELINE, CV_METADATA, TOOLS_MATRIX } from "@/data/portfolioData";
import { downloadCvDocx } from "@/lib/generateCvDocx";

export default function CvPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-[#e7ece5] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:text-black print:p-0">
      {/* Top Action Bar - Hidden in Print */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#121316] border border-white/10 print:hidden">
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center gap-2 text-xs font-mono text-[#adb3b7] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => downloadCvDocx()}
            className="tm-press min-h-[44px] inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium text-[#f2f5f1] bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-colors"
            title="Download ATS-compliant Word document"
          >
            <Download className="w-3.5 h-3.5 text-[#ff7235] shrink-0" aria-hidden="true" />
            <span className="sm:hidden">.DOCX (ATS)</span>
            <span className="hidden sm:inline">Download .DOCX (ATS)</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="tm-press min-h-[44px] inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#08090a] bg-[#ff7235] hover:bg-[#ff834d] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">Save PDF</span>
            <span className="hidden sm:inline">Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable CV Paper */}
      <article className="max-w-4xl mx-auto bg-[#121316] print:bg-white p-5 sm:p-12 rounded-2xl sm:rounded-3xl border border-white/10 print:border-0 print:p-0 shadow-2xl">
        {/* Header */}
        <header className="border-b border-white/10 print:border-zinc-300 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white print:text-black">
                {PORTFOLIO_HERO.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#ff7235] print:text-zinc-800 mt-1">
                {PORTFOLIO_HERO.role}
              </p>
            </div>
            <div className="text-xs sm:text-right font-mono text-[#adb3b7] print:text-zinc-600 space-y-1">
              <div>{CV_METADATA.location}</div>
              <div className="text-emerald-400 print:text-zinc-800 font-semibold">
                {CV_METADATA.availability}
              </div>
              <div>English: Full Professional (C1/C2)</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-5 text-xs font-mono text-[#c4cacd] print:text-zinc-700 border-t border-white/[0.08] print:border-zinc-200 pt-4">
            <a
              href={`mailto:${CV_METADATA.email}`}
              className="flex items-center gap-1.5 hover:text-white print:text-black"
            >
              <Mail className="w-3.5 h-3.5 text-[#ff7235] print:text-black" aria-hidden="true" />
              {CV_METADATA.email}
            </a>
            <a
              href={CV_METADATA.behance}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white print:text-black"
            >
              <Globe className="w-3.5 h-3.5 text-[#ff7235] print:text-black" aria-hidden="true" />
              behance.net/ALMotion3D
            </a>
            <a
              href={CV_METADATA.telegram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white print:text-black"
            >
              <Send className="w-3.5 h-3.5 text-[#ff7235] print:text-black" aria-hidden="true" />
              t.me/ALMotion3D
            </a>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#adb3b7] print:text-black" aria-hidden="true" />
              iOS HIG & Material 3 · Rive & Motion
            </span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-3">
            Professional Summary
          </h2>
          <p className="text-sm sm:text-base text-[#e7ece5] print:text-zinc-800 leading-relaxed">
            {PORTFOLIO_HERO.bio}
          </p>
        </section>

        {/* Commercial Experience */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-5">
            Commercial Track Record
          </h2>
          <div className="space-y-8">
            {EXPERIENCE_TIMELINE.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-0 sm:pl-4 sm:border-l sm:border-white/10 print:border-zinc-300 space-y-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white print:text-black">
                    {exp.role}{" "}
                    <span className="text-[#ff8547] print:text-zinc-700 font-medium">
                      · {exp.company}
                    </span>
                  </h3>
                  <span className="text-xs font-mono text-[#adb3b7] print:text-zinc-600 bg-white/[0.04] print:bg-zinc-100 px-2.5 py-0.5 rounded">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#adb3b7] print:text-zinc-700 leading-relaxed">
                  {exp.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  {exp.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs sm:text-[13px] text-[#e7ece5] print:text-zinc-800"
                    >
                      <span className="text-[#ff7235] print:text-black mt-0.5">·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {exp.mobileHighlights && exp.mobileHighlights.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-white/[0.03] print:bg-zinc-50 border border-white/[0.07] print:border-zinc-200">
                    <div className="text-[11px] font-mono text-[#ff8547] print:text-zinc-800 uppercase font-semibold mb-1">
                      Mobile Craft & Systems Focus
                    </div>
                    <ul className="text-xs text-[#adb3b7] print:text-zinc-700 space-y-1">
                      {exp.mobileHighlights.map((mItem, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-1.5">
                          <CheckCircle2
                            className="w-3 h-3 text-[#ff7235] print:text-zinc-800 shrink-0"
                            aria-hidden="true"
                          />
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
            Core Toolset & Craft
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] print:bg-zinc-50 border border-white/[0.07] print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                Mobile & UI Systems
              </div>
              <ul className="text-xs text-[#adb3b7] print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.design.map((t, tIdx) => (
                  <li key={tIdx}>· {t.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] print:bg-zinc-50 border border-white/[0.07] print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                Motion & 3D Craft
              </div>
              <ul className="text-xs text-[#adb3b7] print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.motionAndMedia.map((t, tIdx) => (
                  <li key={tIdx}>· {t.name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] print:bg-zinc-50 border border-white/[0.07] print:border-zinc-200">
              <div className="text-xs font-mono font-bold text-white print:text-black mb-2">
                Code & Prototyping
              </div>
              <ul className="text-xs text-[#adb3b7] print:text-zinc-700 space-y-1">
                {TOOLS_MATRIX.engineeringAndAI.map((t, tIdx) => (
                  <li key={tIdx}>· {t.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Languages */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10 print:border-zinc-300">
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-2">
              Academic Education
            </h2>
            <div className="text-sm font-semibold text-white print:text-black">
              {CV_METADATA.education.degree}
            </div>
            <div className="text-xs font-mono text-[#adb3b7] print:text-zinc-600 mt-0.5">
              {CV_METADATA.education.field} · {CV_METADATA.education.type}
            </div>
            <p className="text-xs text-[#adb3b7] print:text-zinc-700 mt-1">
              {CV_METADATA.education.details}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#ff7235] print:text-zinc-800 uppercase mb-2">
              Languages
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm text-[#e7ece5] print:text-zinc-800">
              {CV_METADATA.languages.map((l, lIdx) => (
                <div key={lIdx} className="flex items-baseline justify-between">
                  <span className="font-semibold text-white print:text-black">{l.language}</span>
                  <span className="font-mono text-[#adb3b7] print:text-zinc-600 text-xs">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
