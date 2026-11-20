"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Zap,
} from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import {
  BOOKIFY_HERO_METRICS,
  FUNNEL_PROFILES,
  COLLECTOR_SPECS,
  LOCALE_PROFILES,
  BOOKIFY_GALLERY_SCREENS,
  BookifyGalleryItem,
} from "./bookifyData";
import { BookifyPdpSandbox } from "./BookifyPdpSandbox";
import { ArchivalPrintLoupe } from "./ArchivalPrintLoupe";

const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 };
const SPRING_SMOOTH = { type: "spring" as const, stiffness: 200, damping: 24, mass: 1 };

interface BookifyCaseStudyProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function BookifyCaseStudy({ project, nextProject }: BookifyCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Page scroll reading progress hairline
  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 220, damping: 30, mass: 0.25 });

  // Hero scroll elevation parallax (never combined with entrance animate on same node)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(heroScrollProgress, [0, 1], [0, -52]);

  // Interactive section state
  const [funnelView, setFunnelView] = useState<"legacy" | "bookify">("bookify");
  const [localeView, setLocaleView] = useState<"ua" | "global">("ua");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const activeFunnel = FUNNEL_PROFILES[funnelView];
  const activeLocale = LOCALE_PROFILES[localeView];
  const activeLightboxItem: BookifyGalleryItem | null =
    lightboxIdx !== null ? BOOKIFY_GALLERY_SCREENS[lightboxIdx] : null;

  const openLightboxBySrc = (src: string) => {
    const found = BOOKIFY_GALLERY_SCREENS.findIndex((item) => item.src === src);
    setLightboxIdx(found >= 0 ? found : 0);
  };

  useEffect(() => {
    if (lightboxIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev + 1) % BOOKIFY_GALLERY_SCREENS.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIdx((prev) =>
          prev === null
            ? null
            : (prev - 1 + BOOKIFY_GALLERY_SCREENS.length) % BOOKIFY_GALLERY_SCREENS.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIdx]);

  const scrollToSandbox = () => {
    const el = document.getElementById("bookify-sandbox");
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <article className="relative overflow-x-clip bg-[#08090a] text-[#f2f5f1]">
      {/* Scroll Reading Progress Indicator */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothPageProgress }}
          className="fixed top-0 inset-x-0 z-40 h-[2px] origin-left bg-[#ff7235] pointer-events-none"
        />
      )}

      {/* ====================================================================
          ACT I: ASYMMETRIC EDITORIAL HERO
         ==================================================================== */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/[0.08]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[6%] w-[520px] h-[520px] rounded-full glow-spot-orange blur-3xl opacity-90"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Clean Back Navigation */}
          <div className="animate-hero-eyebrow flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
            <Link
              href="/#work"
              className="min-h-[44px] inline-flex items-center gap-2 text-sm font-mono text-[#adb3b7] hover:text-[#f2f5f1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
              Back to Selected Work
            </Link>
            <span className="text-xs font-mono tracking-[0.16em] uppercase text-[#adb3b7]">
              bookify.com.ua · Commercial E-Commerce
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left 6 cols: Display Typography & Single Primary CTA */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <p className="animate-hero-eyebrow text-xs font-mono uppercase tracking-[0.2em] text-[#ff7235] mb-4">
                Art Bookstore Rebrand &amp; CRO
              </p>

              <h1 className="animate-hero-title text-[clamp(2.2rem,3.9vw,3.6rem)] font-semibold tracking-[-0.038em] leading-[1.03] text-[#f2f5f1] mb-6">
                <span className="block sm:whitespace-nowrap">Editorial craft.</span>
                <span className="block text-gradient-orange sm:whitespace-nowrap">
                  45-second checkout.
                </span>
              </h1>

              <p className="animate-hero-desc text-base sm:text-lg text-[#adb3b7] leading-relaxed max-w-md mb-8">
                Transforming Kyiv art bookstore Knyharnia Nebo into Bookify, replacing multi-page
                cart friction with inline collector confidence.
              </p>

              <div className="animate-hero-cta flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToSandbox}
                  className="tm-press min-h-[48px] px-6 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Zap className="w-4 h-4" aria-hidden="true" />
                  Test 45s Checkout
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxIdx(0)}
                  className="min-h-[48px] px-2 inline-flex items-center gap-1.5 text-sm font-mono text-[#c4cacd] hover:text-[#f2f5f1] transition-colors"
                >
                  <Maximize2 className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
                  Inspect All 6 Screens
                </button>
              </div>
            </div>

            {/* Right 6 cols: Scroll-Parallax Flagship Visual */}
            <div className="lg:col-span-6">
              <motion.div style={{ y: shouldReduceMotion ? 0 : heroParallaxY }}>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
                  className="rounded-2xl border border-white/[0.12] bg-[#121316] p-2.5 sm:p-3.5 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.85)]"
                >
                  <div className="aspect-[1600/1341] w-full rounded-xl overflow-hidden bg-white">
                    <Image
                      src="/projects/bookify/crop_product_detail.webp"
                      alt="Bookify flagship collector page featuring Joan Blaeu Atlas Maior Of 1665"
                      width={1600}
                      height={1341}
                      priority
                      unoptimized
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Grounded Architectural Project Ledger */}
          <dl className="animate-hero-stats mt-14 pt-7 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#adb3b7]">
                Client Transformation
              </dt>
              <dd className="text-sm font-medium text-[#f2f5f1] mt-1">
                Bookify (ex-Knyharnia Nebo)
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#adb3b7]">
                Lead Role
              </dt>
              <dd className="text-sm font-medium text-[#f2f5f1] mt-1">
                Rebranding, UX/UI &amp; CRO Lead
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#adb3b7]">
                Timeline
              </dt>
              <dd className="text-sm font-medium text-[#f2f5f1] mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#adb3b7]">
                Platform Scope
              </dt>
              <dd className="text-sm font-medium text-[#f2f5f1] mt-1">{project.platform}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ====================================================================
          ACT II: MONUMENTAL CRO PROOF & FUNNEL COMPARATOR
         ==================================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Oversized Typographic Stat Strip */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.09] border-y border-white/[0.09]"
          >
            {BOOKIFY_HERO_METRICS.map((metric) => (
              <div key={metric.label} className="py-8 md:py-10 md:px-8 first:md:pl-0 last:md:pr-0">
                <div
                  className={`text-5xl sm:text-6xl font-semibold tracking-[-0.04em] tabular-nums ${
                    metric.highlight ? "text-[#ff7235]" : "text-[#f2f5f1]"
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-[#f2f5f1] mt-3">{metric.label}</div>
                <div className="text-xs font-mono text-[#adb3b7] mt-1">{metric.delta}</div>
              </div>
            ))}
          </motion.div>

          {/* Interactive Before / After Funnel Comparator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
              className="lg:col-span-5 space-y-6"
            >
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235]">
                Checkout Funnel Compression
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-[#f2f5f1]">
                Cutting six redirects down to one inline tab
              </h2>
              <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
                Analytics from Knyharnia Nebo revealed 68% mobile abandonment between the Cart page
                and mandatory account creation. Removing page hops kept buying momentum intact.
              </p>

              {/* Segmented Toggle */}
              <div
                role="tablist"
                aria-label="Compare legacy vs Bookify checkout funnel"
                className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10"
              >
                {(["legacy", "bookify"] as const).map((key) => {
                  const active = funnelView === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFunnelView(key)}
                      className={`relative min-h-[42px] px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                        active
                          ? "text-[#08090a] font-semibold"
                          : "text-[#adb3b7] hover:text-[#f2f5f1]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="bookify-funnel-toggle"
                          transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                          className="absolute inset-0 rounded-full bg-[#ff7235]"
                        />
                      )}
                      <span className="relative z-10">{FUNNEL_PROFILES[key].label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="lg:col-span-7 rounded-2xl bg-[#121316] border border-white/[0.09] p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFunnel.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6, transition: { duration: 0.14 } }
                  }
                  transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-white/[0.08]">
                    <div>
                      <span className="text-xs font-mono text-[#ff7235]">
                        {activeFunnel.stepCount}
                      </span>
                      <h3 className="text-xl font-semibold text-[#f2f5f1] mt-1">
                        {activeFunnel.cvr} · {activeFunnel.abandonment}
                      </h3>
                    </div>
                    <span className="text-2xl font-mono font-semibold text-[#f2f5f1] tabular-nums">
                      {activeFunnel.totalDuration} total
                    </span>
                  </div>

                  <p className="text-sm text-[#adb3b7]">{activeFunnel.summary}</p>

                  <div className="space-y-3">
                    {activeFunnel.steps.map((step, idx) => {
                      const barWidth = Math.max(14, Math.min(100, (step.durationSec / 28) * 100));
                      const isExpress = activeFunnel.id === "bookify";
                      return (
                        <div
                          key={step.label}
                          className="rounded-xl bg-white/[0.025] border border-white/[0.07] p-3.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                            <span className="font-medium text-[#f2f5f1]">
                              {idx + 1}. {step.label}
                            </span>
                            <div className="flex items-center gap-3 text-xs font-mono">
                              <span className={isExpress ? "text-[#ff7235]" : "text-[#adb3b7]"}>
                                {step.frictionNote}
                              </span>
                              <span className="text-[#f2f5f1] tabular-nums">
                                {step.durationSec}s
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#adb3b7] mt-1">{step.detail}</p>
                          <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              initial={shouldReduceMotion ? false : { scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0.01 }
                                  : { ...SPRING_SMOOTH, delay: idx * 0.04 }
                              }
                              style={{ width: `${barWidth}%` }}
                              className={`h-full origin-left rounded-full ${
                                isExpress ? "bg-[#ff7235]" : "bg-[#adb3b7]/55"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ACT III: INTERACTIVE PDP & LIVE 45s CHECKOUT SANDBOX
         ==================================================================== */}
      <section
        id="bookify-sandbox"
        className="py-20 sm:py-28 border-b border-white/[0.08] scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235] mb-3">
              Product Detail Architecture
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-[#f2f5f1]">
              Three conversion tabs anchored inside a single page
            </h2>
          </motion.div>

          <BookifyPdpSandbox onOpenScreen={openLightboxBySrc} />
        </div>
      </section>

      {/* ====================================================================
          ACT IV: COLLECTOR PRINT LOUPE & PHYSICAL CERTAINTY
         ==================================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 cols: Interactive Optical Magnifier */}
          <div className="lg:col-span-7">
            <ArchivalPrintLoupe />
          </div>

          {/* Right 5 cols: Editorial Story + Technical Spec Ledger */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235]">
              High-Ticket Buyer Confidence
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-[#f2f5f1]">
              Replicating physical paper weight on a glass screen
            </h2>
            <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
              Collectors spending $260 on Joan Blaeu&apos;s Atlas Maior want proof of paper stock,
              binding thickness, and engraving sharpness before committing. High-res spread previews
              and explicit physical dimensions replaced pre-purchase support tickets.
            </p>

            {/* Clean Hairline Ledger */}
            <dl className="pt-2 border-t border-white/[0.1] divide-y divide-white/[0.07]">
              {COLLECTOR_SPECS.map((spec) => (
                <div key={spec.label} className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-xs font-mono text-[#adb3b7]">{spec.label}</dt>
                  <dd className="text-sm font-medium text-[#f2f5f1] text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          ACT V: REBRAND & DUAL-LOCALE MERCHANDISING
         ==================================================================== */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 5 cols: Interactive Dual-Locale Switcher */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
              className="lg:col-span-5 space-y-6"
            >
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235]">
                Dual-Locale Merchandising
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-[#f2f5f1]">
                One design system from ₴400 gifts to $260 folios
              </h2>

              <div
                role="tablist"
                aria-label="Switch Bookify currency locale model"
                className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/10"
              >
                {(["ua", "global"] as const).map((loc) => {
                  const active = localeView === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setLocaleView(loc)}
                      className={`relative min-h-[42px] px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
                        active
                          ? "text-[#08090a] font-semibold"
                          : "text-[#adb3b7] hover:text-[#f2f5f1]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="bookify-locale-toggle"
                          transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                          className="absolute inset-0 rounded-full bg-[#ff7235]"
                        />
                      )}
                      <span className="relative z-10">{LOCALE_PROFILES[loc].tabLabel}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocale.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6, transition: { duration: 0.14 } }
                  }
                  transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
                  className="space-y-4 rounded-2xl bg-[#121316] border border-white/[0.09] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                    <span className="text-sm font-semibold text-[#f2f5f1]">
                      {activeLocale.title}
                    </span>
                    <span className="text-xs font-mono text-[#ff7235]">
                      {activeLocale.currencyRange}
                    </span>
                  </div>
                  <p className="text-sm text-[#adb3b7] leading-relaxed">{activeLocale.summary}</p>
                  <div className="space-y-2 pt-2">
                    {activeLocale.featuredEditions.map((edition) => (
                      <div
                        key={edition.title}
                        className="flex items-center justify-between gap-3 py-1.5 border-b border-white/[0.05] last:border-b-0 text-xs"
                      >
                        <div>
                          <div className="font-medium text-[#f2f5f1]">{edition.title}</div>
                          <div className="font-mono text-[#adb3b7]">{edition.meta}</div>
                        </div>
                        <span className="font-mono font-semibold text-[#ff7235] tabular-nums shrink-0">
                          {edition.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#e7ece5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                    <span>Routing: {activeLocale.fulfillment}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right 7 cols: Full Curated Catalog Showcase */}
            <div className="lg:col-span-7">
              <button
                type="button"
                onClick={() => openLightboxBySrc("/projects/bookify/crop_catalog_browser.webp")}
                className="group w-full text-left rounded-2xl border border-white/[0.11] bg-[#121316] p-2.5 sm:p-3 transition-colors hover:border-[#ff7235]/45"
                aria-label="Inspect full Bookify Editorial Collector Catalog screenshot"
              >
                <div className="aspect-[1600/1341] w-full rounded-xl overflow-hidden bg-white">
                  <Image
                    src="/projects/bookify/crop_catalog_browser.webp"
                    alt="Bookify editorial catalog displaying Alfred Hitchcock 95/100 highlight and New Arrivals grid"
                    width={1600}
                    height={1341}
                    unoptimized
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1 text-xs font-mono text-[#adb3b7]">
                  <span>Catalog Hierarchy: 95/100 Feature + New Arrivals</span>
                  <span className="inline-flex items-center gap-1 text-[#f2f5f1] group-hover:text-[#ff7235] transition-colors">
                    Inspect
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Wide Panoramic AOV Cross-Sell Bridge */}
          <div className="rounded-2xl border border-white/[0.11] bg-[#121316] p-3 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <h3 className="text-lg font-semibold text-[#f2f5f1]">
                  Inline Action + Curated Cross-Sell Bridge
                </h3>
                <p className="text-sm text-[#adb3b7]">
                  Anchoring related monographs immediately beneath the Buy Now row drove +28.5% AOV lift.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openLightboxBySrc("/projects/bookify/crop_checkout_modal_action.webp")}
                className="min-h-[40px] px-3.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-1.5 self-start transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                Enlarge Strip
              </button>
            </div>
            <div className="aspect-[1600/412] w-full rounded-xl overflow-hidden bg-white border border-white/10">
              <Image
                src="/projects/bookify/crop_checkout_modal_action.webp"
                alt="Zoomed horizontal view of Bookify three-field inline checkout bar directly above related art books"
                width={1600}
                height={412}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ACT VI: PRODUCTION CONTACT SHEET & NEXT CASE CLOSER
         ==================================================================== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#ff7235] mb-2">
                  Archive Contact Sheet
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#f2f5f1]">
                  Complete production screen reel
                </h2>
              </div>
              <span className="text-xs font-mono text-[#adb3b7]">
                Click any frame to open fullscreen lightbox
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BOOKIFY_GALLERY_SCREENS.map((item, idx) => {
                const isWide = item.width / item.height > 2.2;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIdx(idx)}
                    className={`group text-left rounded-2xl border border-white/[0.09] hover:border-[#ff7235]/45 bg-[#121316] p-3 transition-colors ${
                      isWide ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className="w-full rounded-xl overflow-hidden bg-white"
                      style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={item.width}
                        height={item.height}
                        unoptimized
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-3.5 px-1">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#ff7235]">
                          {item.category}
                        </span>
                        <h3 className="text-base font-semibold text-[#f2f5f1] mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#adb3b7] mt-1">{item.caption}</p>
                      </div>
                      <Maximize2
                        className="w-4 h-4 text-[#adb3b7] group-hover:text-[#ff7235] shrink-0 mt-1 transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Next Case Transition */}
          <div className="pt-12 border-t border-white/[0.09] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#adb3b7]">
                Next Case Study
              </span>
              <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#f2f5f1] mt-1">
                {nextProject.title}
              </h3>
              <p className="text-sm text-[#adb3b7] mt-1 max-w-xl">{nextProject.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/work/${nextProject.slug}`}
                className="tm-press min-h-[48px] px-6 py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
              >
                Explore {nextProject.title}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#contact"
                className="min-h-[48px] px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#f2f5f1] text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FULLSCREEN LIGHTBOX MODAL
         ==================================================================== */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-mono text-[#ff7235]">{activeLightboxItem.category}</span>
              <h3 className="text-base sm:text-lg font-semibold text-[#f2f5f1]">
                {activeLightboxItem.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close lightbox"
              className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-[#f2f5f1] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[74vh] w-full flex items-center justify-center">
              <Image
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                width={activeLightboxItem.width}
                height={activeLightboxItem.height}
                unoptimized
                className="max-h-[74vh] w-auto max-w-full rounded-xl object-contain bg-white shadow-2xl"
              />
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-[#adb3b7]">{activeLightboxItem.caption}</p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((prev) =>
                    prev === null
                      ? 0
                      : (prev - 1 + BOOKIFY_GALLERY_SCREENS.length) % BOOKIFY_GALLERY_SCREENS.length
                  )
                }
                aria-label="Previous screen"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-[#f2f5f1] flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-[#adb3b7] tabular-nums px-1">
                {(lightboxIdx ?? 0) + 1} / {BOOKIFY_GALLERY_SCREENS.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setLightboxIdx((prev) =>
                    prev === null ? 0 : (prev + 1) % BOOKIFY_GALLERY_SCREENS.length
                  )
                }
                aria-label="Next screen"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-[#f2f5f1] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
