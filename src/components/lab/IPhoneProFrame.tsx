"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, ScanFace, Waves } from "lucide-react";

export type DynamicIslandState = "idle" | "scanning" | "confirmed" | "haptic";

export interface IPhoneProFrameProps {
  children: React.ReactNode;
  islandState?: DynamicIslandState;
  islandLabel?: string;
  hapticPulseKey?: number;
  springConfig?: { stiffness: number; damping: number; mass?: number };
  screenClassName?: string;
  className?: string;
}

const DEFAULT_SPRING = { stiffness: 380, damping: 30, mass: 1 };

export function IPhoneProFrame({
  children,
  islandState = "idle",
  islandLabel,
  hapticPulseKey = 0,
  springConfig = DEFAULT_SPRING,
  screenClassName = "",
  className = "",
}: IPhoneProFrameProps) {
  const shouldReduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hapticPulseKey || shouldReduceMotion || !shellRef.current) return;
    shellRef.current.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(-3px, 1px, 0)" },
        { transform: "translate3d(3px, -1px, 0)" },
        { transform: "translate3d(-1.5px, 0, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 175, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
  }, [hapticPulseKey, shouldReduceMotion]);

  const islandDims =
    islandState === "confirmed"
      ? { width: 164, height: 30 }
      : islandState === "scanning" || islandState === "haptic"
        ? { width: 138, height: 28 }
        : { width: 84, height: 24 };

  return (
    <div
      ref={shellRef}
      data-iphone-pro-frame="true"
      className={`relative w-[274px] sm:w-[300px] aspect-[9/19.5] rounded-[46px] p-[9px] bg-gradient-to-b from-[#353945] via-[#1c1e24] to-[#2c303b] shadow-[0_32px_70px_-16px_rgba(0,0,0,0.88),inset_0_1px_1px_rgba(255,255,255,0.28)] select-none ${className}`}
    >
      {/* Titanium Side Hardware Buttons */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[15%] -left-[3px] w-[3px] h-5 rounded-l-sm bg-[#464b59]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[21.5%] -left-[3px] w-[3px] h-10 rounded-l-sm bg-[#464b59]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[30.5%] -left-[3px] w-[3px] h-10 rounded-l-sm bg-[#464b59]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[25%] -right-[3px] w-[3px] h-14 rounded-r-sm bg-[#464b59]"
      />

      {/* Inner OLED Display */}
      <div
        className={`relative w-full h-full rounded-[38px] bg-[#08090c] overflow-hidden ring-1 ring-black/95 flex flex-col ${screenClassName}`}
      >
        {/* Top iOS Status Row & Live Morphing Dynamic Island */}
        <div className="relative z-30 h-11 px-5 pt-1.5 flex items-center justify-between text-[11px] font-mono text-[#f2f5f1] shrink-0">
          <span className="tracking-tight font-semibold tabular-nums">9:41</span>

          {/* Dynamic Island */}
          <motion.div
            data-dynamic-island={islandState}
            animate={islandDims}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { type: "spring", ...springConfig }
            }
            className="absolute left-1/2 top-2.5 -translate-x-1/2 rounded-full bg-black border border-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.7)] flex items-center justify-center px-2.5 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {islandState === "idle" && (
                <motion.div
                  key="di-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="w-full flex items-center justify-end pr-0.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#131722] ring-1 ring-[#1e2638]" />
                </motion.div>
              )}

              {islandState === "scanning" && (
                <motion.div
                  key="di-scanning"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex items-center gap-2 text-[10px] font-mono text-[#ff8547]"
                >
                  <ScanFace className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
                  <span>{islandLabel || "Face ID"}</span>
                </motion.div>
              )}

              {islandState === "haptic" && (
                <motion.div
                  key="di-haptic"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-[#ff8547]"
                >
                  <Waves className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{islandLabel || "Taptic"}</span>
                </motion.div>
              )}

              {islandState === "confirmed" && (
                <motion.div
                  key="di-confirmed"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-400 whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" aria-hidden="true" />
                  </span>
                  <span>{islandLabel || "Paid"}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Status Icons (5G + Battery SVG) */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="text-[10px] font-semibold">5G</span>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <rect
                x="0.75"
                y="1.25"
                width="16"
                height="7.5"
                rx="2"
                stroke="#f2f5f1"
                strokeOpacity="0.65"
                strokeWidth="1"
              />
              <rect x="2.2" y="2.7" width="11.5" height="4.6" rx="1" fill="#f2f5f1" />
              <path d="M18 3.6V6.4" stroke="#f2f5f1" strokeOpacity="0.65" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Active OLED Screen Canvas */}
        <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>

        {/* Persistent Home Bar */}
        <div className="relative z-30 pt-1.5 pb-2 flex justify-center pointer-events-none shrink-0 bg-gradient-to-t from-black/50 to-transparent">
          <span className="w-28 h-[4px] rounded-full bg-white/35" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
