"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft,
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Wrench, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  X 
} from "lucide-react";
import { ProjectItem } from "@/types/portfolio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setActiveSlideIndex(0);
    setIsFullScreen(false);
  }, [project]);

  const slides = project?.slides && project.slides.length > 0 ? project.slides : project ? [project.imageSrc] : [];
  const currentSlide = slides[activeSlideIndex] || project?.imageSrc || "";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        if (slides.length > 1) {
          setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }
      } else if (e.key === "ArrowRight") {
        if (slides.length > 1) {
          setActiveSlideIndex((prev) => (prev + 1) % slides.length);
        }
      }
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [project, onClose, isFullScreen, slides.length]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 py-6 sm:py-10 overflow-y-auto no-scrollbar"
      >
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Card */}
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl my-4 sm:my-8 bg-[#0d0e14] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 p-5 sm:p-8 lg:p-10 text-white"
        >
          {/* Top Bar with Single Canonical Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white transition-all cursor-pointer group shadow-sm"
              aria-label="Back to projects"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-orange-400" />
              <span className="text-xs font-semibold">Back to Projects</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 rounded border border-white/10 ml-1">
                ESC
              </kbd>
            </button>

            <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
              <span className="font-mono text-xs text-orange-400 font-semibold px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20">
                {project.number} // {project.categoryLabel}
              </span>
              <span className="hidden md:inline text-zinc-500">•</span>
              <span className="hidden md:inline font-mono text-zinc-400 text-xs">
                {project.client} • {project.year}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-medium mb-6">
            {project.subtitle}
          </p>

          {/* Interactive Slide Deck Gallery Viewer */}
          <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-white/15 bg-black shadow-2xl group">
            <div 
              onClick={() => setIsFullScreen(true)}
              className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] bg-zinc-950 flex items-center justify-center overflow-hidden cursor-zoom-in"
              title="Click to view full screen"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideIndex}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentSlide}
                    alt={`${project.title} - Slide ${activeSlideIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hover Fullscreen Hint Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-xs font-mono border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md z-10 pointer-events-none shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Click for Fullscreen</span>
              </div>

              {/* Slide Navigation Overlay Buttons */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-10"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Floating Slide Counter Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono text-zinc-300">
                <span className="text-orange-400 font-bold">SLIDE {activeSlideIndex + 1}</span>
                <span className="text-zinc-500">/</span>
                <span>{slides.length}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {slides.length > 1 && (
              <div className="p-2.5 bg-[#090a0f] border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {slides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[16/9] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeSlideIndex === idx
                        ? "border-orange-500 ring-2 ring-orange-500/40 scale-105"
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={slide}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Impact Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[130px] shadow-sm hover:border-white/20 transition-all"
              >
                {/* Row 1: Index & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                    METRIC 0{idx + 1}
                  </span>
                  {metric.change && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                      {metric.change}
                    </span>
                  )}
                </div>

                {/* Row 2: Prominent Value */}
                <div className="text-3xl sm:text-4xl lg:text-[36px] font-black text-white font-sans tracking-tight leading-none my-2">
                  {metric.value}
                </div>

                {/* Row 3: Standardized Label with Divider */}
                <div className="text-xs text-zinc-400 font-medium pt-2 border-t border-white/[0.05] line-clamp-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Deep Dive Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 pb-8 border-b border-white/10">
            <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4" />
                The Core Challenge &amp; Friction
              </div>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4" />
                UX Solution &amp; System Architecture
              </div>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables & Toolset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-zinc-300" />
                Key Deliverables &amp; Design Artefacts
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-zinc-300" />
                Design System &amp; Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Clean Footer Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-500">ROLE:</span>{" "}
              <span className="text-zinc-200 font-semibold">{project.role}</span>
            </div>
            <div className="text-zinc-500">
              {project.client} • {project.year} Case Study
            </div>
          </div>
        </motion.div>

        {/* Dedicated Edge-to-Edge Fullscreen Experience */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-[100] bg-[#07080C] select-none overflow-hidden flex items-center justify-center cursor-default"
              onClick={() => setIsFullScreen(false)}
            >
              {/* Edge-to-Edge Fullscreen Canvas */}
              <div 
                className="relative w-screen h-screen flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentSlide}
                      alt={`${project.title} - Slide ${activeSlideIndex + 1}`}
                      fill
                      unoptimized
                      priority
                      quality={100}
                      className="object-contain"
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top-Left Slide Counter */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-7 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-mono text-zinc-400 shadow-[0_8px_30px_rgba(0,0,0,0.6)] pointer-events-none">
                  <span className="text-orange-400 font-bold">{activeSlideIndex + 1}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-300">{slides.length}</span>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <span className="text-zinc-400 hidden sm:inline">{project.title}</span>
                </div>

                {/* Floating Top-Right Exit Button */}
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="absolute top-5 right-5 sm:top-6 sm:right-7 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.6)] group"
                  aria-label="Exit fullscreen"
                >
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px] font-mono group-hover:bg-white/20">
                    ESC
                  </kbd>
                  <span className="text-xs font-mono">exit</span>
                  <X className="w-4 h-4 ml-0.5 text-zinc-400 group-hover:text-white" />
                </button>

                {/* Floating Navigation Arrows */}
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                      }}
                      className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/85 backdrop-blur-xl text-zinc-300 hover:text-white border border-white/15 hover:border-orange-500/50 transition-all hover:scale-110 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.7)] z-30 group"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => (prev + 1) % slides.length);
                      }}
                      className="absolute right-4 sm:right-7 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/85 backdrop-blur-xl text-zinc-300 hover:text-white border border-white/15 hover:border-orange-500/50 transition-all hover:scale-110 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.7)] z-30 group"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
