"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { ARCHIVAL_HOTSPOTS, ArchivalHotspot } from "./bookifyData";

const ZOOM_FACTOR = 2.2;
const LOUPE_SIZE = 164;
const SPRING_LENS = { stiffness: 320, damping: 28, mass: 0.5 };

export function ArchivalPrintLoupe() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const [stageDims, setStageDims] = useState({ width: 800, height: 588 });
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [coords, setCoords] = useState({ xPercent: 59, yPercent: 52 });

  const rawX = useMotionValue((59 / 100) * 800);
  const rawY = useMotionValue((52 / 100) * 588);
  const smoothX = useSpring(rawX, SPRING_LENS);
  const smoothY = useSpring(rawY, SPRING_LENS);

  const lensTranslateX = useTransform(smoothX, (v) => v - LOUPE_SIZE / 2);
  const lensTranslateY = useTransform(smoothY, (v) => v - LOUPE_SIZE / 2);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const updateDims = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setStageDims({ width: rect.width, height: rect.height });
      }
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const jumpOrGlideTo = (xPct: number, yPct: number, width: number, height: number, snapFirst: boolean) => {
    const px = (xPct / 100) * width;
    const py = (yPct / 100) * height;
    if (snapFirst || shouldReduceMotion) {
      rawX.jump(px);
      rawY.jump(py);
      smoothX.jump(px);
      smoothY.jump(py);
    } else {
      rawX.set(px);
      rawY.set(py);
    }
    setCoords({ xPercent: xPct, yPercent: yPct });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPct = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(4, Math.min(96, ((e.clientY - rect.top) / rect.height) * 100));
    const firstReveal = !isPointerInside && activePresetId === null;
    setStageDims({ width: rect.width, height: rect.height });
    setActivePresetId(null);
    setIsPointerInside(true);
    jumpOrGlideTo(xPct, yPct, rect.width, rect.height, firstReveal);
  };

  const handlePointerLeave = () => {
    setIsPointerInside(false);
  };

  const handleSelectPreset = (hotspot: ArchivalHotspot) => {
    if (activePresetId === hotspot.id) {
      setActivePresetId(null);
      return;
    }
    const rect = stageRef.current?.getBoundingClientRect();
    const w = rect?.width || stageDims.width;
    const h = rect?.height || stageDims.height;
    if (rect?.width && rect?.height) {
      setStageDims({ width: w, height: h });
    }
    const firstReveal = !isPointerInside && activePresetId === null;
    setActivePresetId(hotspot.id);
    jumpOrGlideTo(hotspot.xPercent, hotspot.yPercent, w, h, firstReveal);
  };

  const showLoupe = isPointerInside || activePresetId !== null;
  const activePreset = ARCHIVAL_HOTSPOTS.find((h) => h.id === activePresetId);

  const pxX = (coords.xPercent / 100) * stageDims.width;
  const pxY = (coords.yPercent / 100) * stageDims.height;
  const bgOffsetX = LOUPE_SIZE / 2 - pxX * ZOOM_FACTOR;
  const bgOffsetY = LOUPE_SIZE / 2 - pxY * ZOOM_FACTOR;

  return (
    <div className="space-y-4">
      <div
        ref={stageRef}
        data-loupe-stage="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative aspect-[1600/1177] w-full rounded-2xl overflow-hidden bg-white border border-white/[0.12] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)] cursor-crosshair select-none"
      >
        <Image
          src="/projects/bookify/crop_atlas_spread.webp"
          alt="Macro archival view of Joan Blaeu Atlas Maior Of 1665 double-page engraving and open spine spreads"
          width={1600}
          height={1177}
          unoptimized
          className="w-full h-full object-cover"
        />

        {/* Always-mounted GPU Optical Collector Magnifier Loupe */}
        <motion.div
          data-loupe-lens="true"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: showLoupe ? 1 : 0, scale: showLoupe ? 1 : 0.92 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: LOUPE_SIZE,
            height: LOUPE_SIZE,
            left: 0,
            top: 0,
            x: shouldReduceMotion ? pxX - LOUPE_SIZE / 2 : lensTranslateX,
            y: shouldReduceMotion ? pxY - LOUPE_SIZE / 2 : lensTranslateY,
            backgroundImage: "url(/projects/bookify/crop_atlas_spread.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: `${stageDims.width * ZOOM_FACTOR}px ${stageDims.height * ZOOM_FACTOR}px`,
            backgroundPosition: `${bgOffsetX}px ${bgOffsetY}px`,
          }}
          className="pointer-events-none absolute rounded-full border-2 border-[#ff7235] shadow-[0_24px_56px_rgba(0,0,0,0.72),inset_0_0_18px_rgba(0,0,0,0.22)] ring-4 ring-black/35 bg-white"
        >
          <div className="absolute inset-0 rounded-full flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full border border-[#ff7235]/85" />
          </div>
        </motion.div>
      </div>

      {/* External Tactile Presets & Inspection Readout (never overlapping image) */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#adb3b7] pr-1">
            <Search className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
            2.2x Loupe Presets:
          </span>
          {ARCHIVAL_HOTSPOTS.map((spot) => {
            const isSelected = activePresetId === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelectPreset(spot)}
                className={`tm-press min-h-[38px] px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                  isSelected
                    ? "bg-[#ff7235] border-[#ff7235] text-[#08090a] font-semibold"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-[#c4cacd]"
                }`}
              >
                {spot.label}
              </button>
            );
          })}
        </div>

        <p className="text-xs font-mono text-[#adb3b7] min-h-[1.25rem]">
          {activePreset
            ? activePreset.note
            : "Move cursor over the map spread or tap any preset to inspect print engraving fidelity."}
        </p>
      </div>
    </div>
  );
}
