"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useDragControls, type PanInfo } from "framer-motion";
import {
  Smartphone,
  Cpu,
  Hand,
  Check,
  X,
  Lock,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { RiveOrbBeacon } from "@/components/RiveOrbBeacon";

function TactileSwitch({
  checked,
  onChange,
  label,
  reducedMotion,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  reducedMotion: boolean | null;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-16 h-9 rounded-full p-1 transition-colors border focus-visible:outline-none ${
        checked
          ? "bg-[#ff7235] border-[#ffa043]/60"
          : "bg-[#22252e] border-white/15"
      }`}
    >
      <motion.span
        layout={!reducedMotion}
        transition={
          reducedMotion
            ? { duration: 0.01 }
            : { type: "spring", stiffness: 500, damping: 32 }
        }
        className={`block w-7 h-7 rounded-full shadow-md bg-gradient-to-b from-white to-zinc-200 ${
          checked ? "ml-auto" : "mr-auto"
        }`}
      />
    </button>
  );
}

type LabTab = "checkout-sheet" | "rive-haptics" | "thumb-zone";
type PayMethod = "apple-pay" | "inline-fields";
type OrderState = "idle" | "processing" | "confirmed";

export function InteractiveSystemLab() {
  const [activeTab, setActiveTab] = useState<LabTab>("checkout-sheet");
  const shouldReduceMotion = useReducedMotion();
  const sheetDragControls = useDragControls();

  // Tab 1 state: Mobile Express Checkout Sheet
  const [sheetOpen, setSheetOpen] = useState(true);
  const [payMethod, setPayMethod] = useState<PayMethod>("apple-pay");
  const [orderState, setOrderState] = useState<OrderState>("idle");
  const [phoneInput, setPhoneInput] = useState("+380 67 000 42 18");

  // Tab 2 state: Rive State Machines + Mobile Screens
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [beaconTaps, setBeaconTaps] = useState(0);

  // Tab 3 state: Thumb-zone Ergonomics Inspector
  const [showArcOverlay, setShowArcOverlay] = useState(true);
  const [targetDensity, setTargetDensity] = useState<"tactile" | "compact">("tactile");

  const handleConfirmPurchase = () => {
    if (orderState !== "idle") return;
    setOrderState("processing");
    window.setTimeout(() => {
      setOrderState("confirmed");
    }, shouldReduceMotion ? 80 : 650);
  };

  const resetCheckoutPrototype = () => {
    setOrderState("idle");
    setSheetOpen(true);
  };

  const handleSheetDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 70 || info.velocity.y > 320) {
      setSheetOpen(false);
    }
  };

  const tabs: { id: LabTab; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: "checkout-sheet",
      label: "Express Bottom Sheet",
      sub: "Spring drag physics & 3-field checkout",
      icon: <Smartphone className="w-4 h-4" aria-hidden="true" />,
    },
    {
      id: "rive-haptics",
      label: "Rive State Machines",
      sub: "Live vector runtime & tactile toggles",
      icon: <Cpu className="w-4 h-4" aria-hidden="true" />,
    },
    {
      id: "thumb-zone",
      label: "Thumb-Zone Ergonomics",
      sub: "Portrait reach arc & target sizing",
      icon: <Hand className="w-4 h-4" aria-hidden="true" />,
    },
  ];

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
              Interactive Craft · Live Browser Prototypes
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#f2f5f1] leading-[1.08]">
              Mobile Interaction & Motion Lab.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#adb3b7] max-w-md leading-relaxed">
            Interactive studies demonstrating bottom-sheet gestures, genuine Rive state machines, and one-handed mobile reachability.
          </p>
        </div>

        {/* Lab Mode Tabs */}
        <div
          role="tablist"
          aria-label="Mobile interaction prototypes"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8"
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`tm-press min-h-[56px] sm:min-h-[60px] text-left px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                  active
                    ? "bg-[#16181d] border-[#ff7235]/55 text-[#f2f5f1]"
                    : "bg-[#121316]/80 border-white/[0.08] hover:border-white/20 text-[#adb3b7]"
                }`}
              >
                <span
                  className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? "bg-[#ff7235] text-[#08090a]" : "bg-white/[0.06] text-[#adb3b7]"
                  }`}
                >
                  {tab.icon}
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#f2f5f1]">
                    {tab.label}
                  </div>
                  <div className="text-xs font-mono text-[#adb3b7] mt-0.5">
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Prototype Stage Container */}
        <div className="rounded-3xl bg-[#121316] border border-white/[0.09] p-4 sm:p-10">
          {activeTab === "checkout-sheet" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left: Simulated iPhone Viewport */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[300px] sm:max-w-[320px] h-[470px] sm:h-[560px] rounded-[34px] sm:rounded-[40px] border-[5px] sm:border-[6px] border-[#24272f] bg-[#0b0c0f] shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Dynamic Island + Status Row */}
                  <div className="pt-2.5 sm:pt-3 px-5 sm:px-6 flex items-center justify-between text-[11px] font-mono text-[#e7ece5]">
                    <span>9:41</span>
                    <span className="w-16 sm:w-20 h-4 sm:h-5 rounded-full bg-black border border-white/10" aria-hidden="true" />
                    <span>5G</span>
                  </div>

                  {/* Underlying Product Screen */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 mb-3 sm:mb-4 bg-[#14161b]">
                        <Image
                          src="/projects/bookify/crop_atlas_spread.webp"
                          alt="Joan Blaeu Atlas collector book preview"
                          fill
                          sizes="280px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-xs font-mono text-[#ff8547]">
                        Collector Edition · Hardcover
                      </div>
                      <h3 className="text-lg font-semibold text-[#f2f5f1] mt-1">
                        Atlas Maior of 1665
                      </h3>
                      <p className="text-xs text-[#adb3b7] mt-1 leading-relaxed">
                        Multilingual archival reprint · 512 pages, gilded plate spreads.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-[#adb3b7] block">
                          Collector Bundle · Store AOV
                        </span>
                        <span className="text-lg font-semibold font-mono text-[#f2f5f1] tabular-nums">
                          ₴1,595
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderState("idle");
                          setSheetOpen(true);
                        }}
                        className="min-h-[44px] px-4 rounded-xl bg-[#ff7235] text-[#08090a] text-xs font-semibold"
                      >
                        Express Buy
                      </button>
                    </div>
                  </div>

                  {/* Scrim when sheet open */}
                  <AnimatePresence>
                    {sheetOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                        onClick={() => setSheetOpen(false)}
                        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Spring-Animated Draggable Bottom Sheet */}
                  <AnimatePresence>
                    {sheetOpen && (
                      <motion.div
                        drag={shouldReduceMotion ? false : "y"}
                        dragControls={sheetDragControls}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 220 }}
                        dragElastic={0.12}
                        onDragEnd={handleSheetDragEnd}
                        initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%" }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0.01 }
                            : { type: "spring", stiffness: 360, damping: 32 }
                        }
                        className="absolute inset-x-0 bottom-0 z-20 rounded-t-[26px] sm:rounded-t-[28px] bg-[#16181f] border-t border-white/15 p-4 sm:p-5 pt-0 shadow-2xl"
                      >
                        {/* Touch-Safe Drag Handle Header (scroll-safe on mobile body) */}
                        <div
                          onPointerDown={(e) => {
                            if (!shouldReduceMotion) {
                              sheetDragControls.start(e);
                            }
                          }}
                          className="touch-none cursor-grab active:cursor-grabbing -mx-4 sm:-mx-5 px-4 sm:px-5 pt-3 pb-2.5 mb-2 flex flex-col gap-2 select-none"
                        >
                          <div className="flex justify-center">
                            <span className="w-10 h-1 rounded-full bg-white/30" aria-hidden="true" />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#f2f5f1]">
                              Express Checkout
                            </span>
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={() => setSheetOpen(false)}
                              className="min-w-[44px] min-h-[44px] -my-2 -mr-2 rounded-full flex items-center justify-center text-[#adb3b7] hover:text-white"
                              aria-label="Dismiss checkout sheet"
                            >
                              <span className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center">
                                <X className="w-4 h-4" />
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Payment Method Switch */}
                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 p-1 rounded-xl bg-[#0d0f14] border border-white/[0.08] mb-3.5 sm:mb-4">
                          <button
                            type="button"
                            onClick={() => {
                              setPayMethod("apple-pay");
                              setOrderState("idle");
                            }}
                            className={`min-h-[44px] rounded-lg text-xs font-mono transition-colors ${
                              payMethod === "apple-pay"
                                ? "bg-white text-[#08090a] font-semibold"
                                : "text-[#adb3b7] hover:text-white"
                            }`}
                          >
                            1-Tap Wallet
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPayMethod("inline-fields");
                              setOrderState("idle");
                            }}
                            className={`min-h-[44px] rounded-lg text-xs font-mono transition-colors ${
                              payMethod === "inline-fields"
                                ? "bg-[#ff7235] text-[#08090a] font-semibold"
                                : "text-[#adb3b7] hover:text-white"
                            }`}
                          >
                            3-Field Quick
                          </button>
                        </div>

                        {payMethod === "apple-pay" ? (
                          <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 mb-4 text-xs font-mono space-y-1.5">
                            <div className="flex justify-between text-[#adb3b7]">
                              <span>Item</span>
                              <span className="text-[#f2f5f1]">Atlas Maior (x1)</span>
                            </div>
                            <div className="flex justify-between text-[#adb3b7]">
                              <span>Nova Poshta Priority</span>
                              <span className="text-[#f2f5f1]">Tomorrow</span>
                            </div>
                            <div className="flex justify-between pt-1.5 border-t border-white/[0.08] font-semibold text-[#f2f5f1]">
                              <span>Total</span>
                              <span className="tabular-nums">₴1,595</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2.5 mb-4">
                            <input
                              type="text"
                              aria-label="Recipient phone"
                              value={phoneInput}
                              onChange={(e) => setPhoneInput(e.target.value)}
                              className="w-full min-h-[42px] px-3 rounded-xl bg-[#0b0c0f] border border-white/12 text-xs font-mono text-[#f2f5f1]"
                            />
                            <div className="text-[11px] font-mono text-[#adb3b7]">
                              No account wall · SMS receipt & tracking auto-linked
                            </div>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleConfirmPurchase}
                          className={`tm-press min-h-[46px] w-full rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                            orderState === "confirmed"
                              ? "bg-emerald-500 text-[#08090a]"
                              : "bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a]"
                          }`}
                        >
                          {orderState === "idle" && (
                            <>
                              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                              {payMethod === "apple-pay" ? "Pay ₴1,595 Now" : "Complete Order · ₴1,595"}
                            </>
                          )}
                          {orderState === "processing" && <span>Authorizing...</span>}
                          {orderState === "confirmed" && (
                            <>
                              <Check className="w-4 h-4" aria-hidden="true" />
                              Order Confirmed (Under 45s)
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: UX & Motion Explanation */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                    Inspired by Bookify Conversion Redesign
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
                    Removing checkout detours via draggable bottom sheets.
                  </h3>
                  <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
                    Drag the bottom sheet downward to dismiss or toggle between 1-Tap Wallet and 3-Field Quick Buy. Instead of pushing mobile buyers across three separate URLs, contextual sheet overlays keep product context visible behind a light scrim.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-white/[0.08]">
                  <div className="rounded-2xl bg-[#08090a] border border-white/[0.07] p-3.5 sm:p-4">
                    <div className="text-xs font-mono text-[#adb3b7]">Legacy Flow</div>
                    <div className="text-lg sm:text-xl font-semibold font-mono text-[#f2f5f1] mt-1 tabular-nums">
                      108s · 4 Pages
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#ff7235]/10 border border-[#ff7235]/30 p-3.5 sm:p-4">
                    <div className="text-xs font-mono text-[#ff8547]">Express Flow</div>
                    <div className="text-lg sm:text-xl font-semibold font-mono text-[#f2f5f1] mt-1 tabular-nums">
                      45s · 5.8% CVR
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setSheetOpen((prev) => !prev)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-[#ff7235] hover:bg-[#ff834d] text-[#08090a] text-xs font-mono font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    {sheetOpen ? "Dismiss Sheet" : "Open Express Sheet"}
                  </button>
                  <button
                    type="button"
                    onClick={resetCheckoutPrototype}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono text-[#f2f5f1] inline-flex items-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
                    Reset Prototype
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rive-haptics" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Live Rive State Machine Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                    Spring Toggles & Rive Runtime
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
                    Tactile preference switches & vector motion.
                  </h3>
                  <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
                    Designed for fast thumb switching inside preferences sheets: high-contrast spring toggles mirror native iOS/Android physical switches, paired below with a live Rive vector beacon listening to hover and tap state inputs.
                  </p>
                </div>

                {/* Tactile Controls */}
                <div className="space-y-3 rounded-2xl bg-[#08090a] border border-white/[0.08] p-5">
                  <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.06]">
                    <div>
                      <div className="text-sm font-medium text-[#f2f5f1]">Sound Effects</div>
                      <div className="text-xs font-mono text-[#adb3b7]">
                        State: {sfxEnabled ? "Active" : "Muted"} · Acoustic tile tap cues
                      </div>
                    </div>
                    <TactileSwitch
                      checked={sfxEnabled}
                      onChange={setSfxEnabled}
                      label="Toggle Sound Effects"
                      reducedMotion={shouldReduceMotion}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.06]">
                    <div>
                      <div className="text-sm font-medium text-[#f2f5f1]">Haptic Engine</div>
                      <div className="text-xs font-mono text-[#adb3b7]">
                        State: {hapticEnabled ? "Active" : "Disabled"} · Core Haptics / Vibration
                      </div>
                    </div>
                    <TactileSwitch
                      checked={hapticEnabled}
                      onChange={setHapticEnabled}
                      label="Toggle Haptic Engine"
                      reducedMotion={shouldReduceMotion}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <div>
                      <div className="text-sm font-medium text-[#f2f5f1]">Ambient Score</div>
                      <div className="text-xs font-mono text-[#adb3b7]">
                        State: {musicEnabled ? "Active" : "Paused"} · Background soundscape
                      </div>
                    </div>
                    <TactileSwitch
                      checked={musicEnabled}
                      onChange={setMusicEnabled}
                      label="Toggle Ambient Score"
                      reducedMotion={shouldReduceMotion}
                    />
                  </div>
                </div>

                {/* Live Orb Beacon Trigger */}
                <div className="flex items-center gap-4 rounded-2xl bg-[#08090a] border border-white/[0.08] p-4">
                  <button
                    type="button"
                    onClick={() => setBeaconTaps((c) => c + 1)}
                    className="min-w-[52px] min-h-[52px] rounded-xl bg-[#121316] border border-white/10 flex items-center justify-center shrink-0"
                    aria-label="Trigger Rive vector beacon state"
                  >
                    <RiveOrbBeacon size={40} />
                  </button>
                  <div>
                    <div className="text-sm font-medium text-[#f2f5f1]">
                      Live Rive State Machine (orb-beacon.riv)
                    </div>
                    <div className="text-xs font-mono text-[#adb3b7] mt-0.5 tabular-nums">
                      Hover or tap orb to fire triggerTap · {beaconTaps} {beaconTaps === 1 ? "trigger" : "triggers"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Shipped Screen Translation */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full max-w-[260px] sm:max-w-[300px] relative aspect-[9/19.5] rounded-3xl overflow-hidden border border-white/12 bg-[#08090a] shadow-2xl p-3">
                  <Image
                    src="/projects/mahjong/mockups/07_settings_mock.webp"
                    alt="Expedition Mahjong shipped audio and haptic preferences 3D iPhone mockup showing physical toggle switches"
                    fill
                    sizes="300px"
                    className="object-contain p-3 drop-shadow-[0_20px_34px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <p className="text-xs font-mono text-[#adb3b7] text-center mt-4 max-w-xs">
                  Shipped settings architecture from Expedition Mahjong translating physical ceramic toggle states cleanly into iOS and Android preferences.
                </p>
              </div>
            </div>
          )}

          {activeTab === "thumb-zone" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left: Ergonomic Reach Stage */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[260px] sm:max-w-[300px] relative aspect-[9/19.5] rounded-[34px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-[#08090a] shadow-2xl">
                  <Image
                    src="/projects/mahjong/screens/02_gameplay_board.webp"
                    alt="Expedition Mahjong core gameplay board demonstrating lower-half thumb-zone booster dock"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />

                  {/* Optional Ergonomic Reach Overlay */}
                  {showArcOverlay && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4"
                    >
                      <div className="mt-8 rounded-xl bg-black/80 border border-white/20 px-3 py-2 text-[11px] font-mono text-[#f2f5f1]">
                        Safe Top HUD: Passive Score & Pairs Telemetry (No stretch required)
                      </div>

                      <div className="relative rounded-2xl bg-[#ff7235]/20 border-2 border-[#ff7235] p-3 backdrop-blur-[1px]">
                        <div className="text-[11px] font-mono font-semibold text-[#ffd1bd] uppercase tracking-wider">
                          Natural One-Hand Thumb Arc
                        </div>
                        <div className="text-xs text-white mt-1">
                          Back, Hint, Shuffle, Undo & Settings dock placed in bottom thumb zone (min 48px targets).
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Target Density & Ergonomic Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
                    Mobile Human Factors · HIG & Material 3
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
                    Designing for effortless single-hand grip.
                  </h3>
                  <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
                    Every core trigger sits inside the lower arc reachable without hand repositioning, while informational telemetry stays anchored cleanly under the Dynamic Island / safe-area inset.
                  </p>
                </div>

                {/* Controls */}
                <div className="space-y-4 rounded-2xl bg-[#08090a] border border-white/[0.08] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-[#f2f5f1]">
                        Thumb-Reach Overlay
                      </div>
                      <div className="text-xs font-mono text-[#adb3b7]">
                        Toggle ergonomic zone annotations
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowArcOverlay((prev) => !prev)}
                      className={`min-h-[44px] px-4 rounded-xl text-xs font-mono font-semibold transition-colors ${
                        showArcOverlay
                          ? "bg-[#ff7235] text-[#08090a]"
                          : "bg-white/[0.06] text-[#f2f5f1] border border-white/15"
                      }`}
                    >
                      {showArcOverlay ? "Overlay On" : "Overlay Off"}
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="text-xs font-mono text-[#adb3b7] mb-2.5">
                      Compare Hit-Target Sizing
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTargetDensity("tactile")}
                        className={`min-h-[44px] px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono border transition-colors ${
                          targetDensity === "tactile"
                            ? "bg-[#ff7235]/15 border-[#ff7235]/50 text-[#f2f5f1]"
                            : "bg-white/[0.03] border-white/[0.08] text-[#adb3b7]"
                        }`}
                      >
                        48px Tactile Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetDensity("compact")}
                        className={`min-h-[44px] px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono border transition-colors ${
                          targetDensity === "compact"
                            ? "bg-[#ff7235]/15 border-[#ff7235]/50 text-[#f2f5f1]"
                            : "bg-white/[0.03] border-white/[0.08] text-[#adb3b7]"
                        }`}
                      >
                        32px Mis-Tap Risk
                      </button>
                    </div>

                    {/* Live Target Geometry Sample */}
                    <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-[#121316] border border-white/[0.06] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
                      <div>
                        <div className="text-xs font-mono text-[#adb3b7]">
                          Measured Action Height
                        </div>
                        <div className="text-sm sm:text-base font-semibold font-mono text-[#f2f5f1] tabular-nums mt-0.5">
                          {targetDensity === "tactile" ? "48px · Zero-strain tap" : "32px · Below 44px Apple HIG"}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`shrink-0 rounded-xl bg-[#ff7235] text-[#08090a] font-semibold inline-flex items-center gap-1.5 px-4 transition-[height,font-size] duration-200 ${
                          targetDensity === "tactile" ? "h-12 text-xs" : "h-8 text-[11px]"
                        }`}
                      >
                        Continue
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
