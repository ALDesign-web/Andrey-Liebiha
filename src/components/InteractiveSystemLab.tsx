"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Smartphone, Cpu, Hand } from "lucide-react";
import { ExpressSheetLab } from "./lab/ExpressSheetLab";
import { RiveStateMachineLab } from "./lab/RiveStateMachineLab";
import { ThumbZoneLab } from "./lab/ThumbZoneLab";

type LabTab = "checkout-sheet" | "rive-haptics" | "thumb-zone";

const LAB_TABS: { id: LabTab; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: "checkout-sheet",
    label: "Express Bottom Sheet",
    sub: "Multi-detent drag, spring tuner & Dynamic Island",
    icon: <Smartphone className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "rive-haptics",
    label: "Rive State Machines",
    sub: "Live .riv canvases, audio synth & Core Haptics",
    icon: <Cpu className="w-4 h-4" aria-hidden="true" />,
  },
  {
    id: "thumb-zone",
    label: "Thumb-Zone Ergonomics",
    sub: "Biomechanical reach probe & 5-tap speed test",
    icon: <Hand className="w-4 h-4" aria-hidden="true" />,
  },
];

export function InteractiveSystemLab() {
  const [activeTab, setActiveTab] = useState<LabTab>("checkout-sheet");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="lab"
      className="py-16 sm:py-28 bg-[#08090a] border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#ff7235] mb-3">
              Interactive Craft · Live iPhone Pro Prototypes
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08]">
              Mobile Interaction &amp; Motion Lab.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#adb3b7] max-w-md leading-relaxed">
            Playable hardware-proportioned studies covering bottom-sheet spring physics, real Rive
            state machines, and one-handed mobile reachability.
          </p>
        </div>

        {/* Lab Mode Tabs */}
        <div
          role="tablist"
          aria-label="Mobile interaction prototypes"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8"
        >
          {LAB_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`tm-press relative min-h-[60px] text-left px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                  active
                    ? "bg-[#16181d] border-[#ff7235]/60 text-[#f2f5f1]"
                    : "bg-[#121316]/80 border-white/[0.08] hover:border-white/20 text-[#adb3b7]"
                }`}
              >
                <span
                  className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    active ? "bg-[#ff7235] text-[#08090a]" : "bg-white/[0.06] text-[#adb3b7]"
                  }`}
                >
                  {tab.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#f2f5f1]">{tab.label}</div>
                  <div className="text-xs font-mono text-[#adb3b7] mt-0.5 leading-snug">
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Prototype Stage Container */}
        <div className="rounded-3xl bg-[#121316] border border-white/[0.09] p-4 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -6, transition: { duration: 0.14 } }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 260, damping: 26 }
              }
            >
              {activeTab === "checkout-sheet" && <ExpressSheetLab />}
              {activeTab === "rive-haptics" && <RiveStateMachineLab />}
              {activeTab === "thumb-zone" && <ThumbZoneLab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
