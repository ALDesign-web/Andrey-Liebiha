"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls, useReducedMotion, type PanInfo } from "framer-motion";
import { Check, ChevronUp, Lock, Minus, Plus, RotateCcw, Sparkles, X } from "lucide-react";
import { playTactileSound } from "@/lib/tactileAudio";
import { IPhoneProFrame, type DynamicIslandState } from "./IPhoneProFrame";

export type SheetDetent = "closed" | "half" | "expanded";
type SpringPresetId = "snappy" | "bouncy" | "luxury";
type PayMode = "wallet" | "inline";
type OrderStage = "idle" | "processing" | "confirmed";

interface SpringPreset {
  id: SpringPresetId;
  name: string;
  tag: string;
  stiffness: number;
  damping: number;
  mass: number;
  note: string;
  curvePath: string;
}

const SPRING_PRESETS: SpringPreset[] = [
  {
    id: "snappy",
    name: "Apple HIG Snappy",
    tag: "Default iOS Sheet",
    stiffness: 420,
    damping: 34,
    mass: 1,
    note: "Crisp deceleration with virtually zero bounce. Built for frequent commerce gestures.",
    curvePath: "M 4 44 C 24 44, 30 6, 56 8 C 72 9, 86 8, 116 8",
  },
  {
    id: "bouncy",
    name: "Expressive Bounce",
    tag: "Playful Overshoot",
    stiffness: 480,
    damping: 18,
    mass: 0.95,
    note: "Energetic initial impulse with tactile vertical settle for reward and delight states.",
    curvePath: "M 4 44 C 18 44, 24 2, 42 3 C 54 14, 68 6, 84 9 C 98 8, 108 8, 116 8",
  },
  {
    id: "luxury",
    name: "Luxury Damped",
    tag: "Weighted Glide",
    stiffness: 230,
    damping: 30,
    mass: 1.15,
    note: "Heavier inertial curve tuned for collector lookbooks and unhurried inspection modals.",
    curvePath: "M 4 44 C 34 44, 48 16, 78 10 C 96 8, 108 8, 116 8",
  },
];

export function ExpressSheetLab() {
  const shouldReduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const timerRef = useRef<number | null>(null);

  const [detent, setDetent] = useState<SheetDetent>("half");
  const [presetId, setPresetId] = useState<SpringPresetId>("snappy");
  const [payMode, setPayMode] = useState<PayMode>("wallet");
  const [shippingTier, setShippingTier] = useState<"express" | "standard">("express");
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("Olena Kovalenko");
  const [phoneInput, setPhoneInput] = useState("+380 67 000 42 18");
  const [branchInput, setBranchInput] = useState("Kyiv, Nova Poshta #14");
  const [orderStage, setOrderStage] = useState<OrderStage>("idle");

  // Gesture telemetry
  const [dragYTelemetry, setDragYTelemetry] = useState(0);
  const [lastVelocity, setLastVelocity] = useState(0);
  const [hapticPulseKey, setHapticPulseKey] = useState(0);

  const activePreset = SPRING_PRESETS.find((p) => p.id === presetId) ?? SPRING_PRESETS[0];
  const unitPrice = 1595;
  const totalPrice = unitPrice * quantity;

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const islandState: DynamicIslandState =
    orderStage === "processing"
      ? "scanning"
      : orderStage === "confirmed"
        ? "confirmed"
        : "idle";

  const islandLabel =
    orderStage === "processing"
      ? "Face ID"
      : orderStage === "confirmed"
        ? `Paid ₴${totalPrice.toLocaleString("en-US")}`
        : undefined;

  const selectDetent = (next: SheetDetent) => {
    setDetent(next);
    setDragYTelemetry(0);
    playTactileSound(next === "closed" ? "toggle-off" : "ivory");
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragYTelemetry(Math.round(info.offset.y));
    setLastVelocity(Math.round(info.velocity.y));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setLastVelocity(Math.round(info.velocity.y));
    setDragYTelemetry(0);

    if (detent === "expanded") {
      if (info.offset.y > 165 || info.velocity.y > 680) {
        selectDetent("closed");
      } else if (info.offset.y > 48 || info.velocity.y > 240) {
        selectDetent("half");
      }
      return;
    }

    if (detent === "half") {
      if (info.offset.y < -36 || info.velocity.y < -260) {
        selectDetent("expanded");
      } else if (info.offset.y > 68 || info.velocity.y > 280) {
        selectDetent("closed");
      }
    }
  };

  const handleCheckoutSubmit = () => {
    if (orderStage !== "idle") return;
    setOrderStage("processing");
    playTactileSound("toggle-on");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(
      () => {
        setOrderStage("confirmed");
        setHapticPulseKey((k) => k + 1);
        playTactileSound("jade");
      },
      shouldReduceMotion ? 90 : 720
    );
  };

  const handleReset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setOrderStage("idle");
    setDetent("half");
    setDragYTelemetry(0);
    setLastVelocity(0);
    setQuantity(1);
    playTactileSound("ivory");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left: Exact 9:19.5 iPhone Pro Hardware Stage */}
      <div className="lg:col-span-6 flex justify-center">
        <IPhoneProFrame
          islandState={islandState}
          islandLabel={islandLabel}
          hapticPulseKey={hapticPulseKey}
          springConfig={{
            stiffness: activePreset.stiffness,
            damping: activePreset.damping,
            mass: activePreset.mass,
          }}
        >
          {/* Underlying Product Detail View */}
          <div className="px-3.5 pt-2 pb-4 flex-1 flex flex-col justify-between bg-[#0a0b0e]">
            <div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 mb-3 bg-white">
                <Image
                  src="/projects/bookify/crop_atlas_spread.webp"
                  alt="Joan Blaeu Atlas Maior collector edition preview"
                  width={1600}
                  height={1177}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#ff8547]">Collector Edition · Hardcover</span>
                <span className="text-[#adb3b7]">512 pp</span>
              </div>
              <h3 className="text-[17px] font-semibold text-[#f2f5f1] mt-1 leading-snug">
                Joan Blaeu. Atlas Maior
              </h3>
              <p className="text-xs text-[#adb3b7] mt-1 leading-relaxed">
                Archival linen reprint with gilded compass spreads and bilingual essay.
              </p>

              {/* Edition Meta Tags */}
              <div className="grid grid-cols-2 gap-1.5 mt-3 text-[10px] font-mono">
                <div className="rounded-lg bg-white/[0.04] border border-white/[0.07] px-2.5 py-1.5 text-[#c4cacd]">
                  Weight: 4.27 kg
                </div>
                <div className="rounded-lg bg-white/[0.04] border border-white/[0.07] px-2.5 py-1.5 text-[#c4cacd]">
                  24.7 x 37.5 cm
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-[#adb3b7] block">
                  Store AOV Bundle
                </span>
                <span className="text-lg font-semibold font-mono text-[#f2f5f1] tabular-nums">
                  ₴{totalPrice.toLocaleString("en-US")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOrderStage("idle");
                  selectDetent("half");
                }}
                className="tm-press min-h-[42px] px-4 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-xs font-semibold transition-colors"
              >
                Express Buy
              </button>
            </div>
          </div>

          {/* Interactive Dimming Scrim */}
          <AnimatePresence>
            {detent !== "closed" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: detent === "expanded" ? 0.72 : 0.48 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                onClick={() => selectDetent("closed")}
                className="absolute inset-0 bg-black backdrop-blur-[2px] z-10"
              />
            )}
          </AnimatePresence>

          {/* Multi-Detent Draggable Sheet */}
          <AnimatePresence>
            {detent !== "closed" && (
              <motion.div
                data-sheet-detent={detent}
                drag={shouldReduceMotion ? false : "y"}
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: detent === "expanded" ? -18 : -160, bottom: 250 }}
                dragElastic={0.14}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : {
                        type: "spring",
                        stiffness: activePreset.stiffness,
                        damping: activePreset.damping,
                        mass: activePreset.mass,
                      }
                }
                className="absolute inset-x-0 bottom-0 z-20 rounded-t-[26px] bg-[#151820] border-t border-white/15 px-3.5 pb-3.5 shadow-[0_-18px_40px_rgba(0,0,0,0.75)] flex flex-col"
              >
                {/* Drag Handle + Header */}
                <div
                  onPointerDown={(e) => {
                    if (!shouldReduceMotion) dragControls.start(e);
                  }}
                  className="touch-none cursor-grab active:cursor-grabbing -mx-3.5 px-3.5 pt-2.5 pb-2 flex flex-col gap-2 select-none"
                >
                  <div className="flex justify-center">
                    <span className="w-9 h-1 rounded-full bg-white/30" aria-hidden="true" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-[#f2f5f1]">
                        Express Checkout
                      </span>
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => selectDetent(detent === "half" ? "expanded" : "half")}
                        aria-label={detent === "half" ? "Expand checkout sheet" : "Collapse to half sheet"}
                        className="px-1.5 py-0.5 rounded-md bg-white/[0.08] hover:bg-white/[0.14] text-[10px] font-mono text-[#ff8547] inline-flex items-center gap-0.5 transition-colors"
                      >
                        <ChevronUp
                          className={`w-3 h-3 transition-transform ${
                            detent === "expanded" ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                        {detent === "half" ? "Full" : "Half"}
                      </button>
                    </div>
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => selectDetent("closed")}
                      aria-label="Dismiss checkout sheet"
                      className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-[#adb3b7] hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mode Tabs inside Sheet */}
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#0b0d12] border border-white/[0.08] mb-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPayMode("wallet");
                      setOrderStage("idle");
                      playTactileSound("ivory");
                    }}
                    className={`min-h-[34px] rounded-lg text-[11px] font-mono transition-colors ${
                      payMode === "wallet"
                        ? "bg-[#f2f5f1] text-[#08090a] font-semibold"
                        : "text-[#adb3b7] hover:text-white"
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPayMode("inline");
                      setOrderStage("idle");
                      if (detent === "half") selectDetent("expanded");
                      else playTactileSound("ivory");
                    }}
                    className={`min-h-[34px] rounded-lg text-[11px] font-mono transition-colors ${
                      payMode === "inline"
                        ? "bg-[#ff7235] text-[#08090a] font-semibold"
                        : "text-[#adb3b7] hover:text-white"
                    }`}
                  >
                    3-Field Quick
                  </button>
                </div>

                {/* Summary Row with Quantity Stepper */}
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-2 mb-2.5 flex items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="min-w-0">
                    <div className="text-[#f2f5f1] font-medium truncate">Atlas Maior</div>
                    <div className="text-[10px] text-[#adb3b7]">
                      {shippingTier === "express" ? "Nova Poshta Priority" : "Standard Courier"}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setQuantity((q) => Math.max(1, q - 1));
                        playTactileSound("ivory");
                      }}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 rounded-md bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-[#f2f5f1]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center text-[#f2f5f1] tabular-nums">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setQuantity((q) => Math.min(5, q + 1));
                        playTactileSound("ivory");
                      }}
                      aria-label="Increase quantity"
                      className="w-6 h-6 rounded-md bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-[#f2f5f1]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Expanded Detent Extra Fields */}
                <motion.div
                  initial={false}
                  animate={{
                    height: detent === "expanded" ? "auto" : 0,
                    opacity: detent === "expanded" ? 1 : 0,
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.01 }
                      : {
                          type: "spring",
                          stiffness: activePreset.stiffness,
                          damping: activePreset.damping,
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      {(["express", "standard"] as const).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setShippingTier(tier);
                            playTactileSound("ivory");
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-mono border text-left transition-colors ${
                            shippingTier === tier
                              ? "bg-[#ff7235]/15 border-[#ff7235]/50 text-[#f2f5f1]"
                              : "bg-[#0b0d12] border-white/[0.08] text-[#adb3b7]"
                          }`}
                        >
                          <div className="font-semibold">
                            {tier === "express" ? "Priority Air" : "Courier"}
                          </div>
                          <div className="text-[9px] text-[#adb3b7]">
                            {tier === "express" ? "Tomorrow · Free" : "2-3 Days"}
                          </div>
                        </button>
                      ))}
                    </div>

                    {payMode === "inline" && (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          aria-label="Recipient name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full h-8 px-2.5 rounded-lg bg-[#0b0d12] border border-white/12 text-[11px] font-mono text-[#f2f5f1] focus:outline-none focus:border-[#ff7235]"
                        />
                        <div className="grid grid-cols-2 gap-1.5">
                          <input
                            type="tel"
                            aria-label="Recipient phone"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            placeholder="Phone"
                            className="w-full h-8 px-2 rounded-lg bg-[#0b0d12] border border-white/12 text-[10px] font-mono text-[#f2f5f1] focus:outline-none focus:border-[#ff7235]"
                          />
                          <input
                            type="text"
                            aria-label="Delivery branch"
                            value={branchInput}
                            onChange={(e) => setBranchInput(e.target.value)}
                            placeholder="Branch"
                            className="w-full h-8 px-2 rounded-lg bg-[#0b0d12] border border-white/12 text-[10px] font-mono text-[#f2f5f1] focus:outline-none focus:border-[#ff7235]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Persistent Pay CTA */}
                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  className={`tm-press min-h-[42px] w-full rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
                    orderStage === "confirmed"
                      ? "bg-emerald-500 text-[#08090a]"
                      : "bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a]"
                  }`}
                >
                  {orderStage === "idle" && (
                    <>
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      {payMode === "wallet"
                        ? `Pay ₴${totalPrice.toLocaleString("en-US")} with Face ID`
                        : `Complete Order · ₴${totalPrice.toLocaleString("en-US")}`}
                    </>
                  )}
                  {orderStage === "processing" && <span>Authorizing Face ID...</span>}
                  {orderStage === "confirmed" && (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      Confirmed Under 45s
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </IPhoneProFrame>
      </div>

      {/* Right: Spring Physics Tuner, Detent Switcher & Gesture Telemetry */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
            Multi-Detent Physics · Bookify Conversion System
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
            Zero-redirect checkout with tunable spring physics.
          </h3>
          <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
            Drag the sheet upward into the full 3-field form or flick downward to dismiss. Switch
            spring presets below to feel how stiffness and damping tune both the sheet detent and
            Dynamic Island payment feedback.
          </p>
        </div>

        {/* Live Spring Physics Tuner */}
        <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#f2f5f1] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
              Spring Curve Tuner
            </span>
            <span className="text-[11px] font-mono text-[#ff8547] tabular-nums">
              k={activePreset.stiffness} · c={activePreset.damping} · m={activePreset.mass}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SPRING_PRESETS.map((preset) => {
              const selected = preset.id === presetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setPresetId(preset.id);
                    playTactileSound("ivory");
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    selected
                      ? "bg-[#ff7235]/12 border-[#ff7235]/60 text-[#f2f5f1]"
                      : "bg-[#121316] border-white/[0.08] hover:border-white/20 text-[#adb3b7]"
                  }`}
                >
                  <div className="text-xs font-semibold text-[#f2f5f1]">{preset.name}</div>
                  <div className="text-[10px] font-mono text-[#adb3b7] mt-0.5">{preset.tag}</div>
                </button>
              );
            })}
          </div>

          {/* Curve Visualizer + Description */}
          <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
            <svg
              width="120"
              height="48"
              viewBox="0 0 120 48"
              fill="none"
              aria-hidden="true"
              className="shrink-0 rounded-lg bg-[#121316] border border-white/[0.06]"
            >
              <line x1="0" y1="8" x2="120" y2="8" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
              <motion.path
                key={activePreset.id}
                d={activePreset.curvePath}
                stroke="#ff7235"
                strokeWidth="2"
                strokeLinecap="round"
                initial={shouldReduceMotion ? false : { pathLength: 0.15, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <p className="text-xs text-[#adb3b7] leading-relaxed">{activePreset.note}</p>
          </div>
        </div>

        {/* Detent Controller & Real-Time Gesture Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl bg-[#0a0b0e] border border-white/[0.07] p-3">
            <div className="text-[10px] font-mono text-[#adb3b7]">Detent</div>
            <div className="text-sm font-mono font-semibold text-[#f2f5f1] capitalize mt-0.5">
              {detent}
            </div>
          </div>
          <div className="rounded-xl bg-[#0a0b0e] border border-white/[0.07] p-3">
            <div className="text-[10px] font-mono text-[#adb3b7]">Drag Y Offset</div>
            <div className="text-sm font-mono font-semibold text-[#f2f5f1] tabular-nums mt-0.5">
              {dragYTelemetry}px
            </div>
          </div>
          <div className="rounded-xl bg-[#0a0b0e] border border-white/[0.07] p-3">
            <div className="text-[10px] font-mono text-[#adb3b7]">Release Velocity</div>
            <div className="text-sm font-mono font-semibold text-[#f2f5f1] tabular-nums mt-0.5">
              {lastVelocity} px/s
            </div>
          </div>
          <div className="rounded-xl bg-[#ff7235]/10 border border-[#ff7235]/30 p-3">
            <div className="text-[10px] font-mono text-[#ff8547]">CVR Impact</div>
            <div className="text-sm font-mono font-semibold text-[#f2f5f1] tabular-nums mt-0.5">
              45s · 5.8%
            </div>
          </div>
        </div>

        {/* Direct Detent Trigger Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {(["expanded", "half", "closed"] as const).map((target) => {
            const active = detent === target;
            return (
              <button
                key={target}
                type="button"
                onClick={() => selectDetent(target)}
                className={`tm-press min-h-[42px] px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  active
                    ? "bg-[#ff7235] text-[#08090a]"
                    : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-[#f2f5f1]"
                }`}
              >
                {target === "expanded"
                  ? "Full Detent"
                  : target === "half"
                    ? "Half Detent"
                    : "Dismiss Sheet"}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs font-mono text-[#adb3b7] hover:text-[#f2f5f1] inline-flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
