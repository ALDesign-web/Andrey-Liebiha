"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Play, FileText, ArrowUpRight, Smartphone } from "lucide-react";
import { PORTFOLIO_HERO } from "@/data/portfolioData";
import { RiveOrbBeacon } from "@/components/RiveOrbBeacon";
import { Interactive3DPhone } from "@/components/mahjong/Interactive3DPhone";

const HERO_PHONES = [
  {
    id: "gameplay",
    tab: "3D Board",
    screenTitle: "Core 3D Gameplay & Dock",
    meta: "Expedition Mahjong · Bottom-Arc Booster Bar",
    src: "/projects/mahjong/mockups/02_gameplay_board_upright.webp",
    alt: "3D iPhone render displaying Expedition Mahjong core 3D tile board and bottom timber booster dock",
  },
  {
    id: "home",
    tab: "Home Hub",
    screenTitle: "Tactile Expedition Hub",
    meta: "Expedition Mahjong · World Map & 4-Tab Nav",
    src: "/projects/mahjong/mockups/01_home_hub_upright.webp",
    alt: "3D iPhone render displaying Expedition Mahjong tactile map home screen and carved Play button",
  },
  {
    id: "victory",
    tab: "Victory",
    screenTitle: "Victory Celebration Loop",
    meta: "Expedition Mahjong · Carved Jade Primary CTA",
    src: "/projects/mahjong/mockups/03_victory_upright.webp",
    alt: "3D iPhone render displaying Expedition Mahjong portrait victory celebration screen with jade primary CTA button",
  },
  {
    id: "paywall",
    tab: "Paywall",
    screenTitle: "VIP & No-Ads Framing",
    meta: "Expedition Mahjong · Amethyst $1.99/mo Pass",
    src: "/projects/mahjong/mockups/06_subscription_upright.webp",
    alt: "3D iPhone render showing Expedition Mahjong VIP monthly subscription paywall with amethyst tactile button",
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activePhone = HERO_PHONES[activeIndex];

  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex flex-col justify-start overflow-hidden border-b border-white/[0.06]"
    >
      {/* Subtle Single-Accent Ambient Spot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] w-[520px] h-[520px] rounded-full glow-spot-orange blur-3xl opacity-80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left Column: Clear Positioning & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Role Eyebrow with Rive Beacon */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 sm:mb-6">
              <RiveOrbBeacon size={18} />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#e7ece5]">
                {PORTFOLIO_HERO.role}
              </span>
            </div>

            {/* Max 2-line Display Headline */}
            <h1 className="animate-hero-title text-[clamp(2.15rem,7.2vw,4.25rem)] font-semibold tracking-[-0.035em] leading-[1.04] text-[#f2f5f1] mb-4 sm:mb-6">
              {PORTFOLIO_HERO.headlineTop}
              <br />
              <span className="text-gradient-orange">{PORTFOLIO_HERO.headlineBottom}</span>
            </h1>

            {/* Tight <= 20-word Value Proposition */}
            <p className="animate-hero-desc text-sm sm:text-lg text-[#adb3b7] max-w-xl leading-relaxed mb-6 sm:mb-8">
              {PORTFOLIO_HERO.tagline}
            </p>

            {/* Primary & Secondary CTAs Above Fold */}
            <div className="animate-hero-cta w-full sm:w-auto flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-7 sm:mb-10">
              <Link
                href="/#work"
                className="tm-press min-h-[44px] sm:min-h-[46px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                Explore Case Studies
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/#lab"
                className="tm-press min-h-[44px] sm:min-h-[46px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/12 hover:border-[#ff7235]/40 text-[#f2f5f1] text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                Motion Lab
              </Link>

              <div className="flex items-center gap-4 pl-0.5 sm:pl-1">
                <Link
                  href="/cv"
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-mono text-[#adb3b7] hover:text-[#f2f5f1] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#ff7235]" aria-hidden="true" />
                  CV
                </Link>
                <a
                  href="https://www.behance.net/ALMotion3D"
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1 text-sm font-mono text-[#adb3b7] hover:text-[#f2f5f1] transition-colors"
                >
                  Behance
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Verified Proof Strip */}
            <div className="animate-hero-stats w-full pt-5 sm:pt-7 border-t border-white/[0.08] grid grid-cols-3 gap-2.5 sm:gap-6">
              <div>
                <div className="text-sm sm:text-3xl font-semibold font-mono tracking-tight text-[#f2f5f1] tabular-nums leading-tight">
                  43+ Screens
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-[#adb3b7] mt-1 leading-snug">
                  Expedition Mahjong (iOS & Android)
                </div>
              </div>
              <div>
                <div className="text-sm sm:text-3xl font-semibold font-mono tracking-tight text-[#ff7235] tabular-nums leading-tight">
                  5.8% CVR
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-[#adb3b7] mt-1 leading-snug">
                  +141.6% lift on Bookify checkout
                </div>
              </div>
              <div>
                <div className="text-sm sm:text-3xl font-semibold font-mono tracking-tight text-[#f2f5f1] tabular-nums leading-tight">
                  7+ Years
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-[#adb3b7] mt-1 leading-snug">
                  Mobile UX/UI, 3D & Rive systems
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Mobile Craft Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[420px] rounded-3xl bg-[#121316]/90 border border-white/[0.09] p-4 sm:p-6 relative overflow-visible">
              {/* Top Stage Bar */}
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#adb3b7]">
                  <Smartphone className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                  <span>{activePhone.screenTitle}</span>
                </div>
                <span className="text-[11px] font-mono text-[#adb3b7] tabular-nums">
                  {activeIndex + 1} / {HERO_PHONES.length}
                </span>
              </div>

              {/* Interactive Cursor-Tracking 3D Phone Viewport */}
              <div className="relative w-full flex items-center justify-center py-2 overflow-visible">
                <Interactive3DPhone
                  maxRotateX={14}
                  maxRotateY={20}
                  showHint
                  stageClassName="relative w-[170px] sm:w-[230px] h-[280px] sm:h-[400px]"
                  customVisual={
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePhone.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.96 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0.01 }
                            : { type: "spring", stiffness: 280, damping: 24 }
                        }
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={activePhone.src}
                          alt={activePhone.alt}
                          fill
                          priority
                          sizes="(max-width: 640px) 170px, 230px"
                          className="object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.75)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  }
                />
              </div>

              {/* Screen Context & Switcher Controls */}
              <div className="mt-2.5 sm:mt-3 pt-3.5 sm:pt-4 border-t border-white/[0.08] flex flex-col gap-2.5 sm:gap-3">
                <p className="text-[11px] sm:text-xs font-mono text-[#adb3b7] text-center">
                  {activePhone.meta}
                </p>

                <div
                  role="tablist"
                  aria-label="Preview mobile screens"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2"
                >
                  {HERO_PHONES.map((phone, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={phone.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveIndex(idx)}
                        className={`tm-press min-h-[44px] px-1.5 sm:px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-mono transition-colors ${
                          isSelected
                            ? "bg-[#ff7235] text-[#08090a] font-semibold"
                            : "bg-white/[0.04] hover:bg-white/[0.08] text-[#c4cacd] border border-white/[0.08]"
                        }`}
                      >
                        {phone.tab}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
