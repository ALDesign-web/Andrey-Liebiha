"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Globe,
  FileText,
  Download,
  ExternalLink,
  Smartphone,
} from "lucide-react";
import { EXPERIENCE_TIMELINE, TOOLS_MATRIX, CV_METADATA } from "@/data/portfolioData";
import { downloadCvDocx } from "@/lib/generateCvDocx";

export function ExperienceTimeline() {
  const [viewMode, setViewMode] = useState<"executive" | "detailed">("executive");

  const toolGroups = [
    { title: "Mobile & UI Systems", items: TOOLS_MATRIX.design },
    { title: "Motion & 3D Craft", items: TOOLS_MATRIX.motionAndMedia },
    { title: "Code & Prototyping", items: TOOLS_MATRIX.engineeringAndAI },
  ];

  return (
    <section
      id="experience"
      className="py-16 sm:py-28 bg-[#08090a] border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
              Background & Track Record
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08]">
              Experience across mobile apps, commerce & SaaS.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Concise vs Full Toggle */}
            <div
              role="group"
              aria-label="Experience detail level"
              className="inline-flex rounded-xl p-1 bg-[#121316] border border-white/[0.08]"
            >
              <button
                type="button"
                onClick={() => setViewMode("executive")}
                className={`min-h-[40px] px-3.5 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === "executive"
                    ? "bg-[#ff7235] text-[#08090a] font-semibold"
                    : "text-[#adb3b7] hover:text-[#f2f5f1]"
                }`}
              >
                Summary
              </button>
              <button
                type="button"
                onClick={() => setViewMode("detailed")}
                className={`min-h-[40px] px-3.5 rounded-lg text-xs font-mono transition-colors ${
                  viewMode === "detailed"
                    ? "bg-[#ff7235] text-[#08090a] font-semibold"
                    : "text-[#adb3b7] hover:text-[#f2f5f1]"
                }`}
              >
                Detailed
              </button>
            </div>

            <button
              type="button"
              onClick={() => downloadCvDocx()}
              className="tm-press min-h-[44px] px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
              .DOCX Resume
            </button>

            <Link
              href="/cv"
              className="tm-press min-h-[44px] px-4 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              Printable CV
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Chronological Roles Timeline (Clean Full-Width Stack) */}
        <div className="space-y-6 mb-14">
          {EXPERIENCE_TIMELINE.map((exp) => (
            <article
              key={`${exp.company}-${exp.period}`}
              className="rounded-3xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-4 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1]">
                    {exp.role}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-sm font-mono text-[#ff8547] mt-1">
                    <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#adb3b7] tabular-nums">
                  {exp.period} · {exp.location}
                </div>
              </div>

              {viewMode === "executive" ? (
                <div className="pt-5 space-y-4">
                  <p className="text-sm sm:text-base text-[#e7ece5] leading-relaxed max-w-4xl">
                    {exp.executiveSummary ?? exp.description}
                  </p>
                  {exp.mobileHighlights && exp.mobileHighlights.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {exp.mobileHighlights.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#adb3b7]"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-[#ff7235] shrink-0" aria-hidden="true" />
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-5 space-y-4">
                  <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed max-w-4xl">
                    {exp.description}
                  </p>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#e7ece5] leading-relaxed"
                      >
                        <span className="text-[#ff7235] font-mono mt-0.5" aria-hidden="true">
                          /
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/[0.06]">
                {exp.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-lg bg-[#08090a] border border-white/[0.08] text-xs font-mono text-[#adb3b7]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Decoupled Toolset Directory & Education / Languages Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3-Group Toolset Matrix (No Fake 100% Numbers) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-6">
              Core Toolset & Technical Stack
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {toolGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <div className="text-sm font-semibold text-[#f2f5f1] pb-2 border-b border-white/[0.08]">
                    {group.title}
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="text-xs sm:text-sm text-[#e7ece5] leading-snug">
                          {item.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#adb3b7]">
                          {item.level}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
                <GraduationCap className="w-4 h-4" aria-hidden="true" />
                Education
              </div>
              <h3 className="text-lg font-semibold text-[#f2f5f1]">
                {CV_METADATA.education.degree}
              </h3>
              <p className="text-xs font-mono text-[#adb3b7] mt-1">
                {CV_METADATA.education.field} · {CV_METADATA.education.type}
              </p>
              <p className="text-xs text-[#adb3b7] leading-relaxed mt-2">
                {CV_METADATA.education.details}
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.08]">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#adb3b7] mb-3">
                <Globe className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                Languages
              </div>
              <div className="space-y-2">
                {CV_METADATA.languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-baseline justify-between text-sm"
                  >
                    <span className="font-medium text-[#f2f5f1]">{lang.language}</span>
                    <span className="text-xs font-mono text-[#adb3b7]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
