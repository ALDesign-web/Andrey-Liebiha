"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  Smartphone,
  Layers,
} from "lucide-react";
import { ProjectItem } from "@/types/portfolio";

interface CaseStudyDetailProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function CaseStudyDetail({ project, nextProject }: CaseStudyDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % project.screens.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + project.screens.length) % project.screens.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, project.screens.length]);

  const activeScreen =
    lightboxIndex !== null ? project.screens[lightboxIndex] : null;
  const hasPortraitScreens = project.screens.some(
    (s) => s.orientation === "portrait"
  );

  return (
    <article className="pt-24 sm:pt-36 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Breadcrumb */}
        <Link
          href="/#work"
          className="min-h-[44px] inline-flex items-center gap-2 text-sm font-mono text-[#adb3b7] hover:text-[#f2f5f1] transition-colors mb-5 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
          Back to Selected Work
        </Link>

        {/* Case Study Header */}
        <header className="pb-12 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono border ${
                project.stage === "commercial"
                  ? "bg-[#ff7235]/12 border-[#ff7235]/35 text-[#ff8547]"
                  : "bg-white/[0.05] border-white/15 text-[#adb3b7]"
              }`}
            >
              {project.stageLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#c4cacd]">
              {project.platform}
            </span>
            <span className="text-xs font-mono text-[#adb3b7]">
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.06] mb-4">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-[#c4cacd] max-w-3xl leading-relaxed mb-8">
            {project.subtitle}
          </p>

          {/* Key Metadata Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/[0.08]">
            <div className="md:col-span-5">
              <div className="text-xs font-mono uppercase tracking-wider text-[#adb3b7] mb-1.5">
                My Role
              </div>
              <p className="text-sm text-[#e7ece5] leading-relaxed">
                {project.role}
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl bg-[#121316] border border-white/[0.08] p-3.5 sm:p-4"
                >
                  <div className="text-xs font-mono text-[#adb3b7] mb-1">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-semibold font-mono text-[#f2f5f1] tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-[#ff8547] mt-1">
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Overview, Problem & Solution */}
        <section className="py-12 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
              Context & Scope
            </h2>
            <p className="text-base text-[#e7ece5] leading-relaxed">
              {project.summary}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#121316] border border-white/[0.08] p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#f2f5f1] mb-3">
                The UX Challenge
              </h3>
              <p className="text-sm text-[#adb3b7] leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="rounded-2xl bg-[#121316] border border-white/[0.08] p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#ff8547] mb-3">
                Design Execution
              </h3>
              <p className="text-sm text-[#e7ece5] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        {/* Mobile UX & Motion Focus Callout */}
        <section className="py-10 border-b border-white/[0.08]">
          <div className="rounded-2xl bg-[#ff7235]/[0.06] border border-[#ff7235]/25 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-11 h-11 rounded-xl bg-[#ff7235]/15 border border-[#ff7235]/30 flex items-center justify-center shrink-0">
              {hasPortraitScreens ? (
                <Smartphone className="w-5 h-5 text-[#ff7235]" aria-hidden="true" />
              ) : (
                <Layers className="w-5 h-5 text-[#ff7235]" aria-hidden="true" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#ff8547] mb-2">
                Interaction & Motion Rationale
              </h2>
              <p className="text-sm sm:text-base text-[#e7ece5] leading-relaxed max-w-3xl">
                {project.mobileAndMotionNotes}
              </p>
            </div>
          </div>
        </section>

        {/* Process Breakdown */}
        <section className="py-12 border-b border-white/[0.08]">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-6">
            Key Product & UX Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.processSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl bg-[#121316] border border-white/[0.08] p-6 flex flex-col gap-3"
              >
                <span className="text-xs font-mono text-[#ff8547]">
                  {step.phase}
                </span>
                <h3 className="text-lg font-semibold text-[#f2f5f1]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#adb3b7] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Screen Showcase Grid (Portrait-native for Mobile vs Landscape for Commerce/SaaS) */}
        <section className="py-14 border-b border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff7235]">
                Interface Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2">
                {hasPortraitScreens ? "Shipped Mobile Screens" : "Key Interface Surfaces"}
              </h2>
            </div>
            <p className="text-xs font-mono text-[#adb3b7]">
              Select any screen to inspect full resolution
            </p>
          </div>

          <div
            className={
              hasPortraitScreens
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-cols-1 lg:grid-cols-2 gap-6"
            }
          >
            {project.screens.map((screen, idx) => (
              <figure
                key={screen.src}
                className="rounded-2xl bg-[#121316] border border-white/[0.08] overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-full bg-[#08090a] group overflow-hidden text-left focus-visible:outline-none ${
                    screen.orientation === "portrait"
                      ? "aspect-[9/17.5] sm:aspect-[9/19.2] max-h-[430px] sm:max-h-[520px] mx-auto"
                      : "aspect-[16/11]"
                  }`}
                  aria-label={`Inspect ${screen.title} full screen`}
                >
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    fill
                    sizes={
                      screen.orientation === "portrait"
                        ? "(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 280px"
                        : "(max-width: 1024px) 92vw, 600px"
                    }
                    className={
                      screen.orientation === "portrait"
                        ? "object-contain p-1.5 sm:p-3 group-hover:scale-[1.02] transition-transform duration-300"
                        : "object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                    }
                  />
                  <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#08090a]/85 border border-white/15 flex items-center justify-center text-[#f2f5f1] opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>
                <figcaption className="p-4 sm:p-5 border-t border-white/[0.06] flex-1 flex flex-col justify-between gap-2">
                  <div>
                    {screen.tag && (
                      <span className="text-[11px] font-mono text-[#ff8547] block mb-1">
                        {screen.tag}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-semibold text-[#f2f5f1]">
                      {screen.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
                    {screen.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Deliverables & Tooling */}
        <section className="py-12 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 rounded-2xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-5">
              Deliverables
            </h2>
            <ul className="space-y-3">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#e7ece5]"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#ff7235] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#adb3b7] mb-5">
                Methods & Tooling
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#e7ece5]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {project.behanceUrl && (
              <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#adb3b7]">
                  Visual case archives & motion shots
                </span>
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-1.5 transition-colors"
                >
                  Open Behance Profile
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Next Case Study Navigation */}
        <section className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl bg-[#121316] border border-white/[0.08] p-6 sm:p-8 mt-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#adb3b7] block mb-1.5">
              Next Case Study
            </span>
            <h2 className="text-2xl font-semibold text-[#f2f5f1]">
              {nextProject.title}
            </h2>
            <p className="text-sm text-[#adb3b7] mt-1">{nextProject.subtitle}</p>
          </div>
          <Link
            href={`/work/${nextProject.slug}`}
            className="tm-press min-h-[46px] px-6 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center gap-2 transition-colors shrink-0"
          >
            View {nextProject.title}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      {/* Accessible Fullscreen Lightbox */}
      {activeScreen && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeScreen.title}
          className="fixed inset-0 z-50 bg-[#08090a]/95 backdrop-blur-md flex flex-col justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-6xl w-full mx-auto flex items-start sm:items-center justify-between gap-3 sm:gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-semibold text-[#f2f5f1] truncate">
                {activeScreen.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#adb3b7] line-clamp-2">
                {activeScreen.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="shrink-0 min-w-[44px] min-h-[44px] rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-[#f2f5f1] flex items-center justify-center transition-colors"
              aria-label="Close screen preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 my-4 max-w-5xl w-full mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeScreen.src}
              alt={activeScreen.title}
              fill
              sizes="95vw"
              className="object-contain"
            />
          </div>

          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + project.screens.length) %
                    project.screens.length
                )
              }
              className="min-h-[44px] px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <span className="text-xs font-mono text-[#adb3b7] tabular-nums">
              {lightboxIndex + 1} / {project.screens.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % project.screens.length)
              }
              className="min-h-[44px] px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

