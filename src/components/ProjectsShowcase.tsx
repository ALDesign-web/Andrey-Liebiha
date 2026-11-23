"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Smartphone, Globe, Layers } from "lucide-react";
import { PROJECTS_DATA } from "@/data/portfolioData";
import { Interactive3DPhone } from "@/components/mahjong/Interactive3DPhone";

export function ProjectsShowcase() {
  const mahjong = PROJECTS_DATA.find((p) => p.slug === "expedition-mahjong") ?? PROJECTS_DATA[0];
  const bookify = PROJECTS_DATA.find((p) => p.slug === "bookify") ?? PROJECTS_DATA[1];
  const kinetix = PROJECTS_DATA.find((p) => p.slug === "kinetix-ai") ?? PROJECTS_DATA[2];

  return (
    <section
      id="work"
      className="py-16 sm:py-28 bg-[#0d0f12] border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
              Selected Work · Commercial & Study
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08]">
              Mobile products shaped for touch and clarity.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#adb3b7] max-w-md leading-relaxed">
            Live shipped products led end-to-end across mobile UX/UI, tactile 3D craft, and conversion architecture, followed by a conceptual systems study.
          </p>
        </div>

        {/* Flagship 1: Expedition Mahjong (Mobile Game UX/UI & 3D Craft) */}
        <article className="tm-hover-lift rounded-3xl bg-[#121316] border border-white/[0.09] overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Showcase: 3-Device Perspective Mockup Composition */}
            <Link
              href={`/work/${mahjong.slug}`}
              className="lg:col-span-7 bg-[#08090a] p-5 py-8 sm:p-10 flex items-center justify-center relative overflow-visible group border-b lg:border-b-0 lg:border-r border-white/[0.07]"
              aria-label={`Open ${mahjong.title} case study`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,114,53,0.12),transparent_68%)]"
              />
              <div className="relative grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-[610px] items-center overflow-visible">
                <div className="translate-y-3 overflow-visible">
                  <Interactive3DPhone
                    src="/projects/mahjong/mockups/01_home_hub_upright.webp"
                    alt="Expedition Mahjong 3D Home Hub perspective mockup"
                    sizes="(max-width: 1024px) 30vw, 195px"
                    maxRotateX={11}
                    maxRotateY={16}
                    hoverScale={1.04}
                    stageClassName="relative w-full aspect-[9/19]"
                    imageClassName="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.75)]"
                  />
                </div>
                <div className="-translate-y-2 scale-[1.06] z-10 overflow-visible">
                  <Interactive3DPhone
                    src="/projects/mahjong/mockups/02_gameplay_board_front.webp"
                    alt="Expedition Mahjong front-view 3D gameplay board and bottom booster dock mockup"
                    sizes="(max-width: 1024px) 32vw, 215px"
                    maxRotateX={12}
                    maxRotateY={18}
                    hoverScale={1.05}
                    stageClassName="relative w-full aspect-[9/19.5]"
                    imageClassName="object-contain drop-shadow-[0_28px_46px_rgba(0,0,0,0.85)]"
                  />
                </div>
                <div className="translate-y-4 overflow-visible">
                  <Interactive3DPhone
                    src="/projects/mahjong/mockups/03_victory_upright.webp"
                    alt="Expedition Mahjong 3D victory screen mockup with carved jade CTA"
                    sizes="(max-width: 1024px) 30vw, 195px"
                    maxRotateX={11}
                    maxRotateY={16}
                    hoverScale={1.04}
                    stageClassName="relative w-full aspect-[9/19]"
                    imageClassName="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.75)]"
                  />
                </div>
              </div>
            </Link>

            {/* Editorial Copy & Honest Specs */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7235]/12 border border-[#ff7235]/30 text-xs font-mono text-[#ff8547]">
                    <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                    {mahjong.stageLabel}
                  </span>
                  <span className="text-xs font-mono text-[#adb3b7]">
                    {mahjong.platform} · {mahjong.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f2f5f1] mb-2">
                  {mahjong.title}
                </h3>
                <p className="text-xs font-mono text-[#adb3b7] mb-4">
                  {mahjong.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mb-6">
                  {mahjong.summary}
                </p>

                {/* Honest Craft Specs */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-4 border-y border-white/[0.08]">
                  {mahjong.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-base sm:text-xl font-semibold font-mono text-[#f2f5f1] tabular-nums leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono text-[#adb3b7] mt-0.5 leading-snug">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-xs font-mono text-[#adb3b7]">
                  Thumb-zone UI · PBR materials · Bottom sheets
                </span>
                <Link
                  href={`/work/${mahjong.slug}`}
                  className="tm-press min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Flagship 2: Bookify (Commercial Rebrand & CRO Engine) */}
        <article className="tm-hover-lift rounded-3xl bg-[#121316] border border-white/[0.09] overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Editorial Copy & Verified Funnel Lift */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6 order-2 lg:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-[#f2f5f1]">
                    <Globe className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                    {bookify.stageLabel}
                  </span>
                  <span className="text-xs font-mono text-[#adb3b7]">
                    {bookify.platform} · {bookify.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f2f5f1] mb-2">
                  {bookify.title}
                </h3>
                <p className="text-xs font-mono text-[#adb3b7] mb-4">
                  {bookify.subtitle}
                </p>
                <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mb-6">
                  {bookify.summary}
                </p>

                {/* Verified Metrics */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-4 border-y border-white/[0.08]">
                  {bookify.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-base sm:text-xl font-semibold font-mono text-[#ff7235] tabular-nums leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono text-[#adb3b7] mt-0.5 leading-snug">
                        {metric.label}
                      </div>
                      <div className="text-[10px] font-mono text-[#adb3b7] leading-snug">
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-xs font-mono text-[#adb3b7]">
                  Rebrand · Inline 3-field checkout
                </span>
                <Link
                  href={`/work/${bookify.slug}`}
                  className="tm-press min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-[#f2f5f1] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Clean Bookify Product Visual */}
            <Link
              href={`/work/${bookify.slug}`}
              className="lg:col-span-7 bg-[#08090a] p-4 sm:p-10 flex items-center justify-center relative overflow-hidden group border-b lg:border-b-0 lg:border-l border-white/[0.07] order-1 lg:order-2"
              aria-label={`Open ${bookify.title} case study`}
            >
              <div className="relative w-full aspect-[16/12] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-[1.01] transition-transform duration-300">
                <Image
                  src="/projects/bookify/crop_checkout.webp"
                  alt="Bookify product page featuring Joan Blaeu Atlas Maior with inline Purchase Now express tab"
                  fill
                  sizes="(max-width: 1024px) 92vw, 660px"
                  className="object-cover object-top"
                />
              </div>
            </Link>
          </div>
        </article>

        {/* Secondary Row: Conceptual Study (Kinetix AI Studio) + Confidential Archive */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Kinetix AI Studio: Explicit Study Classification */}
          <article className="md:col-span-7 tm-hover-lift rounded-3xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link
              href={`/work/${kinetix.slug}`}
              className="relative w-full sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#08090a]"
              aria-label={`Open ${kinetix.title} conceptual study`}
            >
              <Image
                src={kinetix.imageSrc}
                alt="Kinetix AI conceptual dark-mode telemetry dashboard exploration"
                fill
                sizes="(max-width: 640px) 90vw, 224px"
                className="object-cover object-top"
              />
            </Link>

            <div className="flex-1 flex flex-col justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-[#adb3b7] mb-3">
                  <Layers className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
                  {kinetix.stageLabel}
                </span>
                <h3 className="text-xl font-semibold text-[#f2f5f1] mb-1.5">
                  {kinetix.title}
                </h3>
                <p className="text-sm text-[#adb3b7] leading-relaxed">
                  {kinetix.summary}
                </p>
              </div>
              <Link
                href={`/work/${kinetix.slug}`}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-mono text-[#ff8547] hover:text-[#ffa043] transition-colors w-fit"
              >
                Watch Reel &amp; Inspect Study
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Confidential Commercial NDA Note */}
          <article className="md:col-span-5 rounded-3xl bg-[#121316]/60 border border-dashed border-white/15 p-6 sm:p-8 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#adb3b7] mb-3">
                <Lock className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                Confidential Work
              </div>
              <h3 className="text-xl font-semibold text-[#f2f5f1] mb-2">
                Aircall, Fintech & Private Mobile Flows
              </h3>
              <p className="text-sm text-[#adb3b7] leading-relaxed">
                Additional native mobile flows, AI communication tools, and internal fintech prototypes under NDA are available for live screen-share review during interviews.
              </p>
            </div>
            <Link
              href="/#contact"
              className="min-h-[44px] inline-flex items-center gap-2 text-sm font-mono text-[#f2f5f1] hover:text-[#ff7235] transition-colors w-fit"
            >
              Request Walkthrough
              <ArrowRight className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
