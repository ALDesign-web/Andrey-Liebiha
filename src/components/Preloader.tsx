"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const ASSETS_TO_PRELOAD = [
  "/projects/bookify/slide_01.webp",
  "/projects/mahjong/slide_01.jpg",
  "/projects/luro/slide_01.jpg",
  "/projects/project-4.jpg"
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while preloading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const totalCount = ASSETS_TO_PRELOAD.length;

    // Preload & decode images
    ASSETS_TO_PRELOAD.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      const onDone = () => {
        loadedCount += 1;
        if (typeof img.decode === "function") {
          img.decode().catch(() => {});
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
    });

    // Smooth progress timer (guarantees completion within 900ms)
    const startTime = performance.now();
    const duration = 850; // ms

    let animFrame: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / duration);
      const assetRatio = totalCount > 0 ? loadedCount / totalCount : 1;
      
      // Combine time progression with asset readiness
      const combined = Math.min(100, Math.round((timeRatio * 0.7 + assetRatio * 0.3) * 100));
      
      setProgress(combined);

      if (timeRatio < 1 || assetRatio < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = originalOverflow;
        }, 220);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0.95,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#18181b] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden"
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#ff7235]/15 via-[#ffa043]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-gradient-to-br from-[#adb3b7]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Status Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ff7235] to-[#ffa043] flex items-center justify-center text-black font-bold text-xs shadow-md shadow-[#ff7235]/25">
                AL
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-tight">
                  Andrii Liebiha
                </span>
                <span className="text-[10px] font-mono text-[#adb3b7]">
                  Senior Product Designer &amp; Systems Architect
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#adb3b7]/20 text-[11px] font-mono text-[#adb3b7]">
              <Sparkles className="w-3 h-3 text-[#ffa043]" />
              <span>INITIALIZING SYSTEM</span>
            </div>
          </div>

          {/* Center Progress Slider HUD */}
          <div className="max-w-md w-full mx-auto z-10 flex flex-col items-center">
            {/* Huge Tabular Percent Display */}
            <div className="text-6xl sm:text-7xl font-black text-white tracking-tight font-sans tabular-nums mb-6 flex items-baseline gap-1">
              <span>{progress.toString().padStart(2, "0")}</span>
              <span className="text-2xl sm:text-3xl text-[#ff7235] font-bold">%</span>
            </div>

            {/* Glowing Neon Progress Slider Bar */}
            <div className="w-full relative">
              {/* Outer Slider Track */}
              <div className="w-full h-1.5 sm:h-2 bg-white/[0.08] rounded-full overflow-hidden border border-[#adb3b7]/20 shadow-inner">
                {/* Active Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ff7235] via-[#ffa043] to-[#ff7235] rounded-full shadow-[0_0_18px_rgba(255,114,53,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Slider Thumb / Glowing Cursor */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#ff7235] shadow-[0_0_14px_rgba(255,114,53,1)] pointer-events-none transition-all duration-75"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Micro Metadata Subtext */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PRE-CACHING 4K GRAPHICS
              </span>
              <span className="text-zinc-400 tabular-nums">
                {progress === 100 ? "READY" : "DECODING VRAM..."}
              </span>
            </div>
          </div>

          {/* Bottom Confidential Badge */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10 border-t border-white/[0.05] pt-4">
            <span>© 2026 ANDRII LIEBIHA PORTFOLIO</span>
            <span className="hidden sm:inline">120HZ COMPOSITOR ACTIVE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
