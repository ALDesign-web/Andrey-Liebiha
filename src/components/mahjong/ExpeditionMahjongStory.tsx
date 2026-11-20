"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  Volume2,
  VolumeX,
  Rotate3d,
  Layers,
  Sparkles,
} from "lucide-react";
import { ProjectItem, ProjectScreen } from "@/types/portfolio";
import { playTactileSound } from "@/lib/tactileAudio";
import {
  HERO_TRIPTYCH,
  HOME_HOTSPOTS,
  GAMEPLAY_BEATS,
  PBR_MATERIALS,
  MONETIZATION_MODES,
  GameplayBeat,
} from "./mahjongStoryData";
import { StickyGameplayStage, SensoryAndFunnelLab } from "./GameplaySimulator";
import { Interactive3DPhone } from "./Interactive3DPhone";

const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 };
const SPRING_SMOOTH = { type: "spring" as const, stiffness: 200, damping: 24, mass: 1 };
const EASE_SNAP = [0.22, 1, 0.36, 1] as const;

interface ExpeditionMahjongStoryProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function ExpeditionMahjongStory({
  project,
  nextProject,
}: ExpeditionMahjongStoryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Hero state (mobile tab switcher + pronounced spring-smoothed scroll choreography + pointer-tracked 3D triptych tilt)
  const [heroMobileIdx, setHeroMobileIdx] = useState(1);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothHeroScroll = useSpring(heroScrollProgress, { stiffness: 110, damping: 22, mass: 0.25 });

  const bgParallaxY = useTransform(smoothHeroScroll, [0, 1], [0, 180]);
  const bgParallaxScale = useTransform(smoothHeroScroll, [0, 1], [1, 1.15]);

  const lockupY = useTransform(smoothHeroScroll, [0, 0.7], [0, -70]);
  const lockupOpacity = useTransform(smoothHeroScroll, [0, 0.65], [1, 0.15]);

  const centerScrollY = useTransform(smoothHeroScroll, [0, 1], [0, -85]);
  const centerScrollScale = useTransform(smoothHeroScroll, [0, 0.85], [1, 1.11]);

  const leftWingX = useTransform(smoothHeroScroll, [0, 1], [0, -175]);
  const rightWingX = useTransform(smoothHeroScroll, [0, 1], [0, 175]);
  const wingScrollY = useTransform(smoothHeroScroll, [0, 1], [0, 60]);
  const leftWingRotateZ = useTransform(smoothHeroScroll, [0, 1], [0, -10]);
  const rightWingRotateZ = useTransform(smoothHeroScroll, [0, 1], [0, 10]);
  const leftWingRotateY = useTransform(smoothHeroScroll, [0, 1], [0, 16]);
  const rightWingRotateY = useTransform(smoothHeroScroll, [0, 1], [0, -16]);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 170, damping: 20 });
  const tiltY = useSpring(rawTiltY, { stiffness: 170, damping: 20 });

  const handleHeroMouseMove = (e: React.PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawTiltY.set(normX * 26);
    rawTiltX.set(-normY * 18);
  };

  const resetHeroTilt = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  };

  // Act II: Interactive Hotspots
  const [activeHotspotId, setActiveHotspotId] = useState<string>(HOME_HOTSPOTS[2].id);
  const [homeViewMode, setHomeViewMode] = useState<"3d" | "flat">("3d");
  const activeHotspot =
    HOME_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? HOME_HOTSPOTS[0];

  // Act III: Scrollytelling beats
  const [activeBeat, setActiveBeat] = useState<GameplayBeat["id"]>("board");
  const beatRefs = useRef<Record<GameplayBeat["id"], HTMLDivElement | null>>({
    board: null,
    victory: null,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    (Object.keys(beatRefs.current) as GameplayBeat["id"][]).forEach((beatKey) => {
      const el = beatRefs.current[beatKey];
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveBeat(beatKey);
            }
          });
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Act IV: PBR Material Atelier
  const [activeMaterialId, setActiveMaterialId] = useState<string>(PBR_MATERIALS[0].id);
  const activeMaterial =
    PBR_MATERIALS.find((m) => m.id === activeMaterialId) ?? PBR_MATERIALS[0];

  // Act V: Monetization Switchboard
  const [activeMonetizationId, setActiveMonetizationId] =
    useState<(typeof MONETIZATION_MODES)[number]["id"]>("vip");
  const activeMonetization =
    MONETIZATION_MODES.find((m) => m.id === activeMonetizationId) ?? MONETIZATION_MODES[0];

  // Act VI: Vault Filmstrip + Lightbox
  const [vaultTab, setVaultTab] = useState<"mockups" | "screens" | "slides">("mockups");
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const mockupItems: ProjectScreen[] = project.mockups ?? [];
  const screenItems: ProjectScreen[] = project.screens;
  const slideItems: ProjectScreen[] = (project.slides ?? []).map((src, idx) => ({
    src,
    title: `${project.title} — Presentation Slide ${String(idx + 1).padStart(2, "0")}`,
    caption: "4K widescreen product case study deck board with updated 3D device mockups.",
    orientation: "landscape",
    tag: `Slide ${String(idx + 1).padStart(2, "0")} / ${project.slides.length}`,
  }));

  const currentVaultItems =
    vaultTab === "mockups"
      ? mockupItems
      : vaultTab === "screens"
        ? screenItems
        : slideItems;

  const allLightboxItems = [...mockupItems, ...screenItems, ...slideItems];

  const openInLightbox = (groupOffset: number, idx: number) => {
    playTactileSound("ivory", soundEnabled);
    setLightboxIndex(groupOffset + idx);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % allLightboxItems.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + allLightboxItems.length) % allLightboxItems.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, allLightboxItems.length]);

  const scrollFilmstrip = (dir: -1 | 1) => {
    if (!filmstripRef.current) return;
    filmstripRef.current.scrollBy({
      left: dir * 340,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const activeLightboxItem =
    lightboxIndex !== null ? allLightboxItems[lightboxIndex] : null;

  return (
    <article className="bg-[#08090a] text-[#f2f5f1] overflow-x-clip relative">
      {/* Subtle fixed film grain overlay (ultra low opacity, pointer-events none) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =================================================================== */}
      {/* ACT I: AWWWARDS Z-AXIS CINEMATIC HERO                               */}
      {/* =================================================================== */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroMouseMove}
        onPointerLeave={resetHeroTilt}
        className="relative min-h-[100dvh] pt-20 pb-8 sm:pt-24 sm:pb-10 flex flex-col justify-between overflow-x-clip border-b border-white/[0.06]"
      >
        {/* Nano Banana 2 Pro Obsidian Basalt Backdrop + Scroll Parallax (clipped strictly inside backdrop wrapper) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <motion.div
            style={shouldReduceMotion ? undefined : { y: bgParallaxY, scale: bgParallaxScale }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/projects/mahjong/art/hero_sanctuary_bg_v2.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_42%,rgba(8,9,10,0.45)_0%,rgba(8,9,10,0.88)_75%,#08090a_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090a] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between gap-4 sm:gap-5">
          {/* Top Bar: Breadcrumb + Sound Switch */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/#work"
              className="min-h-[40px] inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#c4cacd] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
              Back to Selected Work
            </Link>

            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                playTactileSound(next ? "toggle-on" : "toggle-off", true);
              }}
              className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/12 text-xs font-mono text-[#e7ece5] inline-flex items-center gap-2 active:scale-95 transition-[transform,background-color]"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#71717a]" aria-hidden="true" />
              )}
              <span>Tactile Audio: {soundEnabled ? "On" : "Muted"}</span>
            </button>
          </div>

          {/* Center Editorial Lockup (scroll-linked upward parallax & fade) */}
          <motion.div
            style={shouldReduceMotion ? undefined : { y: lockupY, opacity: lockupOpacity }}
            className="w-full"
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
              }}
              className="text-center max-w-5xl mx-auto flex flex-col items-center"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: EASE_SNAP } },
                }}
                className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#ff8547] mb-1.5"
              >
                {project.client} · {project.platform} · {project.year}
              </motion.span>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE_SNAP } },
                }}
                className="text-[clamp(1.65rem,4.9vw,4.35rem)] font-semibold tracking-[-0.04em] leading-[1.02] text-[#f2f5f1] whitespace-nowrap"
              >
                EXPEDITION <span className="text-gradient-orange">MAHJONG</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_SNAP } },
                }}
                className="text-sm sm:text-base text-[#c4cacd] max-w-xl leading-relaxed mt-2"
              >
                43+ portrait screens, 8 PBR tile materials, and zero-friction mobile flow engineered across 200 levels.
              </motion.p>

              {/* Single Focused Hero CTA */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_SNAP } },
                }}
                className="mt-3.5"
              >
                <a
                  href="#act-anatomy"
                  onClick={() => playTactileSound("jade", soundEnabled)}
                  className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center gap-2 shadow-[0_12px_36px_rgba(255,114,53,0.3)] hover:-translate-y-0.5 active:scale-[0.98] transition-[transform,background-color]"
                >
                  Start Interactive Walkthrough
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Z-Axis 3D Triptych (Desktop: oversized interactive 3D phones + pronounced scroll fan-out choreography) */}
          <div className="hidden md:flex flex-col items-center justify-center [perspective:1400px] overflow-visible">
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }
              }
              className="relative flex items-center justify-center w-full max-w-5xl h-[465px] md:h-[495px] lg:h-[570px] xl:h-[600px] mt-3 mb-1 overflow-visible"
            >
              {/* Left Flanking Phone (outer motion handles wide scroll fan-out & counter-tilt, inner handles Z-depth position & individual 3D cursor tilt) */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: leftWingX,
                        y: wingScrollY,
                        rotateZ: leftWingRotateZ,
                        rotateY: leftWingRotateY,
                        transformStyle: "preserve-3d",
                      }
                }
                className="absolute z-10 flex items-center justify-center"
              >
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -165, rotateY: 16, scale: 0.9 }}
                  animate={{ opacity: 0.94, x: -245, rotateY: 16, scale: 0.9 }}
                  transition={{ duration: 0.75, ease: EASE_SNAP }}
                  style={shouldReduceMotion ? undefined : { transform: "translateZ(-24px)", transformStyle: "preserve-3d" }}
                  className="relative w-[188px] md:w-[205px] lg:w-[235px] xl:w-[248px] aspect-[9/19.2] overflow-visible"
                >
                  <Interactive3DPhone
                    src={HERO_TRIPTYCH[0].src}
                    alt={HERO_TRIPTYCH[0].alt}
                    sizes="250px"
                    priority
                    maxRotateX={14}
                    maxRotateY={18}
                    hoverScale={1.06}
                    imageClassName="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </motion.div>

              {/* Focal Center Phone (outer motion lifts & scales on scroll, inner elevated on Z axis) */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : { y: centerScrollY, scale: centerScrollScale, transformStyle: "preserve-3d" }
                }
                className="relative z-20 flex items-center justify-center overflow-visible"
              >
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE_SNAP }}
                  style={shouldReduceMotion ? undefined : { transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                  className="relative w-[215px] md:w-[225px] lg:w-[260px] xl:w-[272px] aspect-[9/19.5] overflow-visible"
                >
                  <Interactive3DPhone
                    src={HERO_TRIPTYCH[1].src}
                    alt={HERO_TRIPTYCH[1].alt}
                    sizes="280px"
                    priority
                    maxRotateX={15}
                    maxRotateY={20}
                    hoverScale={1.05}
                    stageClassName="relative w-full aspect-[9/19.5]"
                    imageClassName="object-contain drop-shadow-[0_38px_72px_rgba(0,0,0,0.95)]"
                  />
                </motion.div>
              </motion.div>

              {/* Right Flanking Phone */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: rightWingX,
                        y: wingScrollY,
                        rotateZ: rightWingRotateZ,
                        rotateY: rightWingRotateY,
                        transformStyle: "preserve-3d",
                      }
                }
                className="absolute z-10 flex items-center justify-center"
              >
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: 165, rotateY: -16, scale: 0.9 }}
                  animate={{ opacity: 0.94, x: 245, rotateY: -16, scale: 0.9 }}
                  transition={{ duration: 0.75, ease: EASE_SNAP }}
                  style={shouldReduceMotion ? undefined : { transform: "translateZ(-24px)", transformStyle: "preserve-3d" }}
                  className="relative w-[188px] md:w-[205px] lg:w-[235px] xl:w-[248px] aspect-[9/19.2] overflow-visible"
                >
                  <Interactive3DPhone
                    src={HERO_TRIPTYCH[2].src}
                    alt={HERO_TRIPTYCH[2].alt}
                    sizes="250px"
                    priority
                    maxRotateX={14}
                    maxRotateY={18}
                    hoverScale={1.06}
                    imageClassName="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="relative z-30 inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#adb3b7]">
              <Rotate3d className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
              <span>Move cursor to orbit 3D stage</span>
            </div>
          </div>

          {/* Mobile Collapse (< md): Enlarged single focal 3D device + scroll lift + 3 switch tabs */}
          <div className="flex md:hidden flex-col items-center gap-4 pt-2">
            <motion.div
              style={shouldReduceMotion ? undefined : { y: centerScrollY, scale: centerScrollScale }}
              className="relative w-[250px] sm:w-[275px] aspect-[9/19.5]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={HERO_TRIPTYCH[heroMobileIdx].id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HERO_TRIPTYCH[heroMobileIdx].src}
                    alt={HERO_TRIPTYCH[heroMobileIdx].alt}
                    fill
                    priority
                    sizes="275px"
                    className="object-contain drop-shadow-[0_26px_46px_rgba(0,0,0,0.92)]"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/10 gap-1">
              {HERO_TRIPTYCH.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playTactileSound("ivory", soundEnabled);
                    setHeroMobileIdx(idx);
                  }}
                  className={`min-h-[38px] px-3.5 rounded-full text-xs font-mono transition-colors ${
                    heroMobileIdx === idx
                      ? "bg-[#ff7235] text-[#08090a] font-semibold"
                      : "text-[#c4cacd]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Role & Scope Metadata Strip */}
          <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-mono text-[#adb3b7]">
            <span>Role: Lead Mobile UX/UI Designer</span>
            <span className="hidden sm:inline text-white/25">•</span>
            <span>Scope: 43+ Portrait Screens · 200 Levels</span>
            <span className="hidden sm:inline text-white/25">•</span>
            <span>Craft: 8 PBR Themes · Unity &amp; HIG Ready</span>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* ACT II: CHAPTER 01 — INTERACTIVE UX HOTSPOT STAGE (HOME HUB)        */}
      {/* =================================================================== */}
      <section
        id="act-anatomy"
        className="py-20 sm:py-28 bg-[#0d0f13] border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Narrative + Interactive Architectural Selector */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff8547]">
                  Chapter 01 · Breaking the 2D Commodity Trap
                </span>
                <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] mt-2 leading-[1.06]">
                  An entry screen with physical weight.
                </h2>
                <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mt-3 max-w-xl">
                  Casual puzzle stores are flooded with flat vector clutter. Here, the first viewport acts like an explorer&apos;s tabletop: warm bone controls inside lower thumb reach and zero nagging badges. Click any hotspot on the device or below to inspect the UX logic.
                </p>
              </div>

              {/* Selectable UX Anatomy Callout List */}
              <div className="space-y-2.5">
                {HOME_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeHotspotId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => {
                        playTactileSound("ivory", soundEnabled);
                        setActiveHotspotId(spot.id);
                      }}
                      className={`w-full text-left rounded-2xl border p-4 transition-[background-color,border-color,transform] active:scale-[0.99] ${
                        isActive
                          ? "bg-[#ff7235]/10 border-[#ff7235]/50"
                          : "bg-[#12141a]/80 border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full text-xs font-mono font-semibold flex items-center justify-center shrink-0 ${
                              isActive
                                ? "bg-[#ff7235] text-[#08090a]"
                                : "bg-white/[0.07] text-[#c4cacd]"
                            }`}
                          >
                            {spot.code}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-[#f2f5f1]">
                            {spot.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#ff8547] shrink-0">
                          {spot.metric}
                        </span>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={SPRING_SNAPPY}
                          className="text-xs sm:text-sm text-[#d4d8da] leading-relaxed mt-2.5 pl-10"
                        >
                          {spot.detail}
                        </motion.p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Hotspot Phone Viewport */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Toggle between 3D Mockup & Flat UI */}
              <div className="inline-flex p-1 rounded-full bg-[#12141a] border border-white/12 mb-5 gap-1">
                {[
                  { id: "3d", label: "3D Mockup" },
                  { id: "flat", label: "Flat UI Spec" },
                ].map((opt) => {
                  const selected = homeViewMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        playTactileSound("ivory", soundEnabled);
                        setHomeViewMode(opt.id as "3d" | "flat");
                      }}
                      className="relative px-4 py-1.5 rounded-full text-xs font-mono min-h-[36px]"
                    >
                      {selected && (
                        <motion.span
                          layoutId="homeSpecToggle"
                          transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                          className="absolute inset-0 rounded-full bg-[#ff7235]"
                        />
                      )}
                      <span
                        className={`relative z-10 font-medium ${
                          selected ? "text-[#08090a]" : "text-[#c4cacd]"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Interactive3DPhone
                src={
                  homeViewMode === "3d"
                    ? "/projects/mahjong/mockups/01_home_hub_front.webp"
                    : undefined
                }
                alt={
                  homeViewMode === "3d"
                    ? "Expedition Mahjong interactive home hub 3D mockup"
                    : undefined
                }
                customVisual={
                  homeViewMode === "flat" ? (
                    <div className="relative w-[90%] h-full rounded-[38px] overflow-hidden border-[3px] border-white/18 bg-[#08090a] shadow-2xl">
                      <Image
                        src="/projects/mahjong/screens/01_home_hub.webp"
                        alt="Expedition Mahjong flat home hub UI screen"
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  ) : undefined
                }
                floatingLayer={
                  <>
                    {/* Pulsing Hotspot Dots directly mapped in Z-depth over UI elements */}
                    {HOME_HOTSPOTS.map((spot) => {
                      const isSelected = spot.id === activeHotspotId;
                      return (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => {
                            playTactileSound("ivory", soundEnabled);
                            setActiveHotspotId(spot.id);
                          }}
                          style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                          aria-label={`Inspect hotspot ${spot.code}: ${spot.label}`}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center z-20 group focus-visible:outline-none"
                        >
                          {isSelected && !shouldReduceMotion && (
                            <span className="absolute w-9 h-9 rounded-full bg-[#ff7235]/35 animate-ping" />
                          )}
                          <span
                            className={`relative w-7 h-7 rounded-full font-mono text-[11px] font-bold flex items-center justify-center border shadow-lg transition-[transform,background-color] ${
                              isSelected
                                ? "bg-[#ff7235] text-[#08090a] border-white scale-110"
                                : "bg-[#08090a]/85 text-white border-white/60 group-hover:scale-110"
                            }`}
                          >
                            {spot.code}
                          </span>
                        </button>
                      );
                    })}
                  </>
                }
                floatingZ={34}
                maxRotateX={13}
                maxRotateY={18}
                showHint
                stageClassName="relative w-full max-w-[300px] sm:max-w-[330px] aspect-[9/19.2]"
                className="w-full"
              />

              {/* Active Hotspot Quick Caption */}
              <div className="mt-4 text-center max-w-xs">
                <span className="text-xs font-mono text-[#ff8547]">
                  Pin {activeHotspot.code} · {activeHotspot.label}
                </span>
                <p className="text-xs text-[#adb3b7] mt-1">{activeHotspot.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* ACT III: CHAPTER 02 — STICKY SCROLLYTELLING GAMEPLAY LOOP           */}
      {/* =================================================================== */}
      <section
        id="act-gameplay"
        className="py-20 sm:py-28 bg-[#08090a] border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff8547]">
              Chapter 02 · Interactive Sticky Narrative
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] mt-2 leading-[1.06]">
              From tactile puzzle flow to sculpted victory momentum.
            </h2>
            <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mt-3">
              Move between the two core gameplay moments below and inspect the front-facing 3D device with live cursor rotation or Flat UI Spec.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: 2 Scrollytelling Narrative Beats */}
            <div className="lg:col-span-6 space-y-6 lg:space-y-24 lg:py-8">
              {GAMEPLAY_BEATS.map((beat) => {
                const isCurrent = activeBeat === beat.id;
                return (
                  <div
                    key={beat.id}
                    ref={(el) => {
                      beatRefs.current[beat.id] = el;
                    }}
                    onClick={() => {
                      playTactileSound("ivory", soundEnabled);
                      setActiveBeat(beat.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveBeat(beat.id);
                      }
                    }}
                    className={`rounded-3xl border p-6 sm:p-8 cursor-pointer transition-[background-color,border-color,transform] ${
                      isCurrent
                        ? "bg-[#12141a] border-[#ff7235]/55 shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                        : "bg-[#12141a]/45 border-white/[0.07] opacity-80 hover:opacity-100 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                        Beat {beat.step} · {beat.eyebrow}
                      </span>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ff7235]/15 border border-[#ff7235]/35 text-[10px] font-mono text-[#ff8547]">
                          Active Stage
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1] leading-snug mb-3">
                      {beat.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed mb-4">
                      {beat.body}
                    </p>
                    <div className="pt-3 border-t border-white/[0.07] text-xs font-mono text-[#e7ece5]">
                      → {beat.highlight}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Living Interactive Phone Stage */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <div className="rounded-3xl bg-[#101218] border border-white/[0.09] p-6 sm:p-10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,114,53,0.12),transparent_70%)]">
                <StickyGameplayStage
                  activeBeat={activeBeat}
                  soundEnabled={soundEnabled}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* ACT IV: CHAPTER 03 — MATERIAL ATELIER (MACRO ART + 8 PBR INSPECTOR) */}
      {/* =================================================================== */}
      <section
        id="act-materials"
        className="py-20 sm:py-28 bg-[#0d0f13] border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Widescreen Editorial Break via Nano Banana 2 Pro */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] max-h-[540px] w-full bg-[#08090a] shadow-2xl">
            <Image
              src="/projects/mahjong/art/pbr_atelier_macro_v2.webp"
              alt="Macro studio composition featuring all 8 authentic Expedition Mahjong tile materials: Imperial Jade, Royal Velvet fur, Onyx Marble, Craquelure Porcelain, Chipped Obsidian, Raw Clay, Antique Ivory, and Classic Bone"
              fill
              sizes="(max-width: 1280px) 96vw, 1240px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/25 to-transparent" />
            <div className="absolute bottom-5 inset-x-5 sm:bottom-8 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff8547]">
                  Chapter 03 · 8 Physical PBR Material Suites
                </span>
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white mt-1.5">
                  Crafted like collectible tabletop stones.
                </h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#08090a]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-[#e7ece5] w-fit">
                Jade · Velvet · Obsidian · Clay
              </span>
            </div>
          </div>

          {/* Interactive 8-Theme Real Tile Material Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: 8 Authentic Game Tile Theme Selectors */}
            <div className="lg:col-span-5 rounded-3xl bg-[#12141a] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-semibold text-[#f2f5f1] mb-1">
                  Inspect All 8 Production Suites
                </h3>
                <p className="text-xs sm:text-sm text-[#adb3b7]">
                  Tap any real game tile to inspect its PBR shader behavior and hear its acoustic profile.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {PBR_MATERIALS.map((mat) => {
                  const selected = mat.id === activeMaterialId;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => {
                        playTactileSound(mat.sound, soundEnabled);
                        setActiveMaterialId(mat.id);
                      }}
                      className={`min-h-[54px] px-2.5 sm:px-3 py-2 rounded-xl border text-left flex items-center gap-2 sm:gap-2.5 active:scale-[0.97] transition-[transform,border-color,background-color] ${
                        selected
                          ? "bg-white/[0.09] border-[#ff7235]/60 text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                          : "bg-[#08090a] border-white/[0.07] text-[#adb3b7] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span className="relative w-5 h-7 sm:w-6 sm:h-8 shrink-0">
                        <Image
                          src={mat.tileSrc}
                          alt=""
                          fill
                          loading="eager"
                          sizes="28px"
                          className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
                        />
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-medium leading-tight">
                        {mat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Interactive 3D Real Tile Specimen & Shader Spec */}
            <div className="lg:col-span-7 rounded-3xl bg-[#12141a] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-center gap-6 relative overflow-visible">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 transition-colors duration-500"
                  style={{ backgroundColor: activeMaterial.accentHex }}
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Real 3D Game Tile Specimen with Cursor Rotation */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center overflow-visible">
                  <Interactive3DPhone
                    maxRotateX={16}
                    maxRotateY={22}
                    hoverScale={1.07}
                    showHint
                    hintText="Move cursor to rotate tile in 3D"
                    stageClassName="relative w-[170px] sm:w-[195px] aspect-[812/1100]"
                    customVisual={
                      <div className="relative w-full h-full">
                        {PBR_MATERIALS.map((mat) => {
                          const isActiveMat = mat.id === activeMaterial.id;
                          return (
                            <motion.div
                              key={mat.id}
                              initial={false}
                              animate={
                                shouldReduceMotion
                                  ? { opacity: isActiveMat ? 1 : 0 }
                                  : {
                                      opacity: isActiveMat ? 1 : 0,
                                      scale: isActiveMat ? 1 : 0.92,
                                    }
                              }
                              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                              className={`absolute inset-0 ${
                                isActiveMat ? "z-10" : "z-0 pointer-events-none"
                              }`}
                            >
                              <Image
                                src={mat.tileSrc}
                                alt={mat.tileAlt}
                                fill
                                loading="eager"
                                sizes="200px"
                                className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    }
                  />
                </div>

                {/* Shader Metadata */}
                <div className="sm:col-span-7 space-y-3.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                    PBR Material Spec
                  </div>
                  <h4 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1]">
                    {activeMaterial.name} · {activeMaterial.finish}
                  </h4>
                  <p className="text-sm text-[#adb3b7] leading-relaxed">
                    {activeMaterial.shaderNote}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[#e7ece5]">
                    <span className="px-3 py-1.5 rounded-lg bg-[#08090a] border border-white/10">
                      Acoustic: {activeMaterial.acousticFeel}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#08090a] border border-white/10">
                      Roughness: {activeMaterial.roughness}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* ACT V: CHAPTER 04 — MONETIZATION SWITCHBOARD & SENSORY FUNNEL       */}
      {/* =================================================================== */}
      <section
        id="act-monetization"
        className="py-20 sm:py-28 bg-[#08090a] border-b border-white/[0.06] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Monetization Switchboard framed with Nano Banana 2 Pro editorial art */}
          <div className="relative rounded-3xl border border-white/[0.09] bg-[#101218] p-6 sm:p-10 lg:p-12 overflow-visible">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
              <Image
                src="/projects/mahjong/art/monetization_craft_stage.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d12]/95 via-[#0b0d12]/80 to-[#0b0d12]/90" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left: Narrative + Switchboard Tabs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8547]">
                    Chapter 04 · Ethical Monetization Architecture
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f2f5f1] mt-2 leading-[1.08]">
                    Clarity over dark patterns.
                  </h2>
                </div>

                {/* Sliding Pill Switchboard */}
                <div
                  role="tablist"
                  aria-label="Inspect monetization states"
                  className="inline-flex flex-wrap p-1 rounded-2xl sm:rounded-full bg-[#08090a]/90 border border-white/12 gap-1"
                >
                  {MONETIZATION_MODES.map((mode) => {
                    const selected = mode.id === activeMonetizationId;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => {
                          playTactileSound(mode.id === "vip" ? "stone" : "ivory", soundEnabled);
                          setActiveMonetizationId(mode.id);
                        }}
                        className="relative px-4 py-2.5 rounded-xl sm:rounded-full text-xs font-mono transition-colors min-h-[42px]"
                      >
                        {selected && (
                          <motion.span
                            layoutId="monetizationPill"
                            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                            className="absolute inset-0 rounded-xl sm:rounded-full bg-[#ff7235]"
                          />
                        )}
                        <span
                          className={`relative z-10 font-semibold ${
                            selected ? "text-[#08090a]" : "text-[#c4cacd] hover:text-white"
                          }`}
                        >
                          {mode.tabLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMonetization.id}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={SPRING_SNAPPY}
                    className="space-y-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-xs font-mono text-[#ff8547]">
                        {activeMonetization.badge}
                      </span>
                      <span className="text-xs font-mono text-[#c4cacd]">
                        {activeMonetization.priceTag}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {activeMonetization.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#c4cacd] leading-relaxed">
                      {activeMonetization.rationale}
                    </p>
                    <ul className="space-y-2 pt-1">
                      {activeMonetization.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-[#e7ece5]">
                          <CheckCircle2 className="w-4 h-4 text-[#ff7235] mt-0.5 shrink-0" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      {activeMonetization.complianceNote}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Live Morphing Interactive 3D Device Showcase */}
              <div className="lg:col-span-5 flex justify-center overflow-visible">
                <Interactive3DPhone
                  maxRotateX={14}
                  maxRotateY={20}
                  showHint
                  stageClassName="relative w-full max-w-[275px] sm:max-w-[305px] aspect-[9/19.2]"
                  className="w-full"
                  customVisual={
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMonetization.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, filter: "blur(5px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(5px)" }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={activeMonetization.screenSrc}
                          alt={activeMonetization.screenAlt}
                          fill
                          sizes="305px"
                          className="object-contain drop-shadow-[0_28px_52px_rgba(0,0,0,0.92)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  }
                />
              </div>
            </div>
          </div>

          {/* Interactive Sensory Switches & Two-Step Rate-Us Simulator */}
          <SensoryAndFunnelLab soundEnabled={soundEnabled} />
        </div>
      </section>

      {/* =================================================================== */}
      {/* ACT VI: PERSPECTIVE FILMSTRIP VAULT & NEXT CASE STUDY               */}
      {/* =================================================================== */}
      <section
        id="act-vault"
        className="py-20 sm:py-28 bg-[#0d0f13] border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff8547] inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                Complete Asset Archive
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold text-[#f2f5f1] mt-2">
                Inspect every mockup, flat screen &amp; deck slide.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                role="tablist"
                aria-label="Filter asset archive"
                className="inline-flex p-1 rounded-full bg-[#12141a] border border-white/12 gap-1"
              >
                {[
                  { id: "mockups", label: `3D Mockups (${mockupItems.length})` },
                  { id: "screens", label: `Flat UI (${screenItems.length})` },
                  { id: "slides", label: `4K Deck (${slideItems.length})` },
                ].map((tab) => {
                  const selected = vaultTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => {
                        playTactileSound("ivory", soundEnabled);
                        setVaultTab(tab.id as "mockups" | "screens" | "slides");
                        if (filmstripRef.current) filmstripRef.current.scrollLeft = 0;
                      }}
                      className="relative px-3.5 py-2 rounded-full text-xs font-mono min-h-[38px]"
                    >
                      {selected && (
                        <motion.span
                          layoutId="vaultTabPill"
                          transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                          className="absolute inset-0 rounded-full bg-[#ff7235]"
                        />
                      )}
                      <span
                        className={`relative z-10 font-medium ${
                          selected ? "text-[#08090a]" : "text-[#c4cacd]"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollFilmstrip(-1)}
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center text-[#f2f5f1] active:scale-95 transition-[transform,background-color]"
                  aria-label="Scroll archive left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFilmstrip(1)}
                  className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center text-[#f2f5f1] active:scale-95 transition-[transform,background-color]"
                  aria-label="Scroll archive right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Perspective Filmstrip */}
          <div
            ref={filmstripRef}
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin"
          >
            {currentVaultItems.map((item, idx) => {
              const globalOffset =
                vaultTab === "mockups"
                  ? 0
                  : vaultTab === "screens"
                    ? mockupItems.length
                    : mockupItems.length + screenItems.length;
              const isLandscape = item.orientation === "landscape";

              return (
                <figure
                  key={`${vaultTab}-${item.src}`}
                  className={`snap-start shrink-0 rounded-2xl bg-[#12141a] border border-white/[0.08] overflow-hidden flex flex-col ${
                    isLandscape ? "w-[320px] sm:w-[460px]" : "w-[240px] sm:w-[270px]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openInLightbox(globalOffset, idx)}
                    className={`relative w-full bg-[#08090a] group text-left focus-visible:outline-none ${
                      isLandscape
                        ? "aspect-[16/9] overflow-hidden"
                        : vaultTab === "mockups"
                          ? "aspect-[9/17.5] p-4 overflow-visible"
                          : "aspect-[9/17.5] overflow-hidden"
                    }`}
                    aria-label={`Inspect ${item.title} full screen`}
                  >
                    {vaultTab === "mockups" && !isLandscape ? (
                      <Interactive3DPhone
                        src={item.src}
                        alt={item.title}
                        sizes="240px"
                        maxRotateX={10}
                        maxRotateY={14}
                        hoverScale={1.04}
                        stageClassName="relative w-full h-full aspect-[9/17.5]"
                        className="w-full h-full"
                        imageClassName="object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.88)]"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes={isLandscape ? "460px" : "270px"}
                        className={
                          isLandscape
                            ? "object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            : "object-contain p-2.5 rounded-[24px] group-hover:scale-[1.02] transition-transform duration-300"
                        }
                      />
                    )}
                    <span className="pointer-events-none absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#08090a]/85 border border-white/15 flex items-center justify-center text-[#f2f5f1] opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                  <figcaption className="p-4 border-t border-white/[0.06] flex-1 flex flex-col justify-between gap-1.5">
                    {item.tag && (
                      <span className="text-[10px] font-mono text-[#ff8547] uppercase tracking-wider">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-sm font-semibold text-[#f2f5f1]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#adb3b7] line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Deliverables & Tooling Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 pt-12 border-t border-white/[0.08]">
            <div className="lg:col-span-6 rounded-2xl bg-[#12141a] border border-white/[0.08] p-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-4">
                Shipped Deliverables
              </h3>
              <ul className="space-y-2.5">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-[#e7ece5]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff7235] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-2xl bg-[#12141a] border border-white/[0.08] p-6 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#adb3b7] mb-4">
                  Methods &amp; Tooling
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-[#08090a] border border-white/[0.08] text-xs font-mono text-[#e7ece5]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.behanceUrl && (
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 w-fit transition-colors"
                >
                  Open Behance Profile
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Next Case Study Closer */}
          <div className="mt-10 rounded-3xl bg-[#12141a] border border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#adb3b7] block mb-1">
                Next Commercial Case Study
              </span>
              <h3 className="text-2xl font-semibold text-[#f2f5f1]">
                {nextProject.title}
              </h3>
              <p className="text-sm text-[#adb3b7] mt-1">{nextProject.subtitle}</p>
            </div>
            <Link
              href={`/work/${nextProject.slug}`}
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center gap-2 shrink-0 active:scale-[0.98] transition-[transform,background-color]"
            >
              View {nextProject.title}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Accessible Fullscreen Lightbox */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          className="fixed inset-0 z-50 bg-[#08090a]/95 backdrop-blur-md flex flex-col justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-6xl w-full mx-auto flex items-start sm:items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-semibold text-[#f2f5f1] truncate">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#adb3b7] line-clamp-2">
                {activeLightboxItem.caption}
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
              src={activeLightboxItem.src}
              alt={activeLightboxItem.title}
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
                  (lightboxIndex - 1 + allLightboxItems.length) % allLightboxItems.length
                )
              }
              className="min-h-[44px] px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <span className="text-xs font-mono text-[#adb3b7] tabular-nums">
              {lightboxIndex + 1} / {allLightboxItems.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % allLightboxItems.length)
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
