"use client";

import React from "react";
import { Smartphone, Sparkles, TrendingUp, Component } from "lucide-react";
import { SKILL_PILLARS } from "@/data/portfolioData";

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />,
  TrendingUp: <TrendingUp className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />,
  Component: <Component className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />,
};

export function DesignPillars() {
  return (
    <section
      id="pillars"
      className="py-16 sm:py-28 bg-[#0d0f12] border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
              Design Approach
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08] mb-5">
              Grounded in ergonomics, built with motion.
            </h2>
            <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mb-6">
              Academic training in Industrial & Product Design combined with 7+ years shipping mobile and web software means every interface starts with human posture, attention hierarchy, and responsive physics before visual polish.
            </p>
            <div className="rounded-2xl bg-[#121316] border border-white/[0.08] p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                From Figma to Running Code
              </div>
              <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
                Alongside Figma Libraries and PBR shader pipelines, I prototype real interaction states in React, Framer Motion, and Rive so engineering teams inherit verified timing curves and zero guesswork.
              </p>
            </div>
          </div>

          {/* Right Stacked Discipline Breakdown (no 4-equal-card clichés) */}
          <div className="lg:col-span-7 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {SKILL_PILLARS.map((pillar) => (
              <div key={pillar.title} className="py-8 first:pt-2 last:pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#ff7235]/10 border border-[#ff7235]/25 flex items-center justify-center">
                      {PILLAR_ICONS[pillar.iconName] ?? PILLAR_ICONS.Smartphone}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#adb3b7]">
                      {pillar.tag}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#ff8547]">
                    {pillar.focusArea}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mb-4 max-w-2xl">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-[#121316] border border-white/[0.08] text-xs font-mono text-[#e7ece5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
