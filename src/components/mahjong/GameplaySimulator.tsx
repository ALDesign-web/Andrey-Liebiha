"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls, PanInfo, useReducedMotion } from "framer-motion";
import { RotateCw, Sparkles, Volume2, Vibrate, Music, Star, CheckCircle2, MessageSquare } from "lucide-react";
import { playTactileSound } from "@/lib/tactileAudio";

const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 };
const SPRING_SMOOTH = { type: "spring" as const, stiffness: 200, damping: 24, mass: 1 };

interface StickyGameplayStageProps {
  activeBeat: "board" | "stuck" | "victory";
  soundEnabled: boolean;
}

export function StickyGameplayStage({ activeBeat, soundEnabled }: StickyGameplayStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [boardViewMode, setBoardViewMode] = useState<"3d" | "flat" | "xray">("xray");
  const [sheetDismissed, setSheetDismissed] = useState(false);
  const [stuckCompareShipped, setStuckCompareShipped] = useState(false);
  const [wheelSpinCount, setWheelSpinCount] = useState(0);
  const [shuffleToast, setShuffleToast] = useState(false);
  const dragControls = useDragControls();

  const handleSheetDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 75 || info.velocity.y > 260) {
      playTactileSound("ivory", soundEnabled);
      setSheetDismissed(true);
    }
  };

  const handleWheelShuffle = () => {
    playTactileSound("shuffle", soundEnabled);
    setWheelSpinCount((c) => c + 1);
    setShuffleToast(true);
    setTimeout(() => {
      setSheetDismissed(true);
      setTimeout(() => setShuffleToast(false), 1600);
    }, 520);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Contextual Top Utility Pill above Sticky Stage */}
      <div className="w-full max-w-[340px] mb-4 flex items-center justify-center">
        {activeBeat === "board" && (
          <div
            role="tablist"
            aria-label="Inspect gameplay ergonomics mode"
            className="inline-flex p-1 rounded-full bg-[#12141a] border border-white/12 gap-1"
          >
            {[
              { id: "xray", label: "Thumb X-Ray" },
              { id: "3d", label: "3D Device" },
              { id: "flat", label: "Flat Spec" },
            ].map((mode) => {
              const selected = boardViewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    playTactileSound("ivory", soundEnabled);
                    setBoardViewMode(mode.id as "3d" | "flat" | "xray");
                  }}
                  className="relative px-3.5 py-2 rounded-full text-xs font-mono transition-colors focus-visible:outline-none min-h-[38px]"
                >
                  {selected && (
                    <motion.span
                      layoutId="boardViewPill"
                      transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                      className="absolute inset-0 rounded-full bg-[#ff7235]"
                    />
                  )}
                  <span
                    className={`relative z-10 font-medium ${
                      selected ? "text-[#08090a]" : "text-[#c4cacd] hover:text-white"
                    }`}
                  >
                    {mode.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {activeBeat === "stuck" && (
          <div className="inline-flex p-1 rounded-full bg-[#12141a] border border-white/12 gap-1">
            <button
              type="button"
              onClick={() => {
                playTactileSound("ivory", soundEnabled);
                setStuckCompareShipped(false);
                setSheetDismissed(false);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-mono transition-colors min-h-[38px] ${
                !stuckCompareShipped ? "bg-[#ff7235] text-[#08090a] font-semibold" : "text-[#c4cacd]"
              }`}
            >
              Live Sheet Simulator
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound("ivory", soundEnabled);
                setStuckCompareShipped(true);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-mono transition-colors min-h-[38px] ${
                stuckCompareShipped ? "bg-[#ff7235] text-[#08090a] font-semibold" : "text-[#c4cacd]"
              }`}
            >
              Shipped UI
            </button>
          </div>
        )}

        {activeBeat === "victory" && (
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-xs font-mono text-emerald-300">
            Victory Flow · 3-Tier Visual Weight
          </span>
        )}
      </div>

      {/* Main Sticky Phone Viewport */}
      <div className="relative w-full max-w-[310px] sm:max-w-[330px] aspect-[9/19.2] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeBeat === "board" && (
            <motion.div
              key={`beat-board-${boardViewMode}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
              className="relative w-full h-full flex items-center justify-center"
            >
              {boardViewMode === "3d" ? (
                <Image
                  src="/projects/mahjong/mockups/02_gameplay_board_mock.webp"
                  alt="Expedition Mahjong 3D gameplay board perspective mockup"
                  fill
                  sizes="330px"
                  className="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
                />
              ) : (
                <div className="relative w-[90%] h-full rounded-[38px] overflow-hidden border-[3px] border-white/18 bg-[#08090a] shadow-[0_28px_60px_rgba(0,0,0,0.85)]">
                  <Image
                    src="/projects/mahjong/screens/02_gameplay_board.webp"
                    alt="Expedition Mahjong flat gameplay HUD and thumb booster dock"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  {boardViewMode === "xray" && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3"
                    >
                      <div className="mt-7 rounded-xl bg-black/80 backdrop-blur-sm border border-sky-400/35 px-3 py-2 text-[11px] font-mono text-sky-200">
                        Passive Top HUD · Safe-Area Locked
                      </div>
                      <div className="rounded-2xl bg-[#ff7235]/20 border-2 border-[#ff7235] p-2.5 backdrop-blur-[2px]">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ffd1bd]">
                          Thumb-Reach Timber Dock
                        </div>
                        <div className="text-[11px] text-white/95 leading-snug mt-0.5">
                          5 core controls anchored in bottom arc · Zero top stretching
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeBeat === "stuck" && (
            <motion.div
              key={`beat-stuck-${stuckCompareShipped ? "shipped" : "sim"}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
              className="relative w-[90%] h-full rounded-[38px] overflow-hidden border-[3px] border-white/18 bg-[#08090a] shadow-[0_28px_60px_rgba(0,0,0,0.85)]"
            >
              {stuckCompareShipped ? (
                <Image
                  src="/projects/mahjong/screens/04_stuck_recovery.webp"
                  alt="Expedition Mahjong shipped deadlock recovery bottom sheet"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <>
                  {/* Underlying live tile board stays readable */}
                  <Image
                    src="/projects/mahjong/screens/02_gameplay_board.webp"
                    alt="Underlying active game board behind parchment recovery sheet"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />

                  {/* Shuffle confirmation badge */}
                  <AnimatePresence>
                    {shuffleToast && (
                      <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.94 }}
                        transition={SPRING_SNAPPY}
                        className="absolute top-16 inset-x-4 z-30 rounded-2xl bg-emerald-950/90 border border-emerald-400/40 px-3.5 py-2.5 text-center shadow-xl"
                      >
                        <div className="text-xs font-mono text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                          Tiles Shuffled · Streak Preserved
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reopen Pill when dismissed */}
                  {sheetDismissed && (
                    <div className="absolute inset-x-0 bottom-20 z-20 flex justify-center px-4">
                      <button
                        type="button"
                        onClick={() => {
                          playTactileSound("ivory", soundEnabled);
                          setSheetDismissed(false);
                        }}
                        className="px-4 py-2.5 rounded-full bg-[#12141a]/95 border border-[#ff7235]/60 text-xs font-mono text-[#ff8547] shadow-lg active:scale-95 transition-transform"
                      >
                        Re-trigger &ldquo;No more moves!&rdquo;
                      </button>
                    </div>
                  )}

                  {/* Draggable Parchment Bottom Sheet Simulator */}
                  <AnimatePresence>
                    {!sheetDismissed && (
                      <motion.div
                        drag={shouldReduceMotion ? false : "y"}
                        dragControls={dragControls}
                        dragListener={false}
                        dragConstraints={{ top: 0, bottom: 260 }}
                        dragElastic={0.14}
                        onDragEnd={handleSheetDragEnd}
                        initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%" }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                        transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
                        className="absolute inset-x-0 bottom-0 h-[53%] z-20 rounded-t-[28px] border-t border-amber-200/40 bg-gradient-to-b from-[#d8c199] to-[#c4a777] text-[#1a1612] p-4 flex flex-col justify-between shadow-[0_-18px_40px_rgba(0,0,0,0.65)]"
                      >
                        <div
                          onPointerDown={(e) => {
                            if (!shouldReduceMotion) dragControls.start(e);
                          }}
                          className="touch-none cursor-grab active:cursor-grabbing -mx-4 px-4 pt-0.5 pb-2"
                        >
                          <div className="w-10 h-1 rounded-full bg-[#1a1612]/25 mx-auto mb-2.5" />
                          <div className="flex items-center justify-between">
                            <span className="w-6" />
                            <h4 className="text-base font-bold tracking-tight text-[#161310]">
                              No more moves!
                            </h4>
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={() => {
                                playTactileSound("ivory", soundEnabled);
                                setSheetDismissed(true);
                              }}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-[#1a1612]/70 hover:text-black font-bold text-sm"
                              aria-label="Close deadlock sheet"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* Interactive Rotating Shuffle Helm */}
                        <div className="flex flex-col items-center justify-center my-auto">
                          <button
                            type="button"
                            onClick={handleWheelShuffle}
                            className="group relative w-24 h-24 rounded-full bg-gradient-to-br from-[#8c592b] to-[#563314] border-2 border-[#f1dfc0]/40 shadow-[0_12px_24px_rgba(0,0,0,0.4)] flex items-center justify-center active:scale-95 transition-transform"
                            aria-label="Spin shuffle helm to recover board"
                          >
                            <motion.div
                              animate={{ rotate: wheelSpinCount * 360 }}
                              transition={{ type: "spring", stiffness: 160, damping: 18 }}
                              className="w-16 h-16 rounded-full bg-[#efe1c6] border border-[#b99663] flex items-center justify-center shadow-inner"
                            >
                              <RotateCw className="w-7 h-7 text-[#c92a2a]" aria-hidden="true" />
                            </motion.div>
                            <span className="absolute -bottom-1 right-1 w-6 h-6 rounded-full bg-white text-[#1a1612] text-xs font-bold flex items-center justify-center shadow">
                              3
                            </span>
                          </button>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#3b2f21] mt-2">
                            Tap helm to shuffle · or drag down
                          </span>
                        </div>

                        <div className="text-center pb-1">
                          <p className="text-[11px] text-[#2a2219] leading-tight">
                            &ldquo;Broken brush in hand — dawn begins again.&rdquo;
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              playTactileSound("stone", soundEnabled);
                              setSheetDismissed(true);
                            }}
                            className="mt-1.5 text-xs font-semibold underline text-[#2a2219]/75 hover:text-black"
                          >
                            Restart
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          )}

          {activeBeat === "victory" && (
            <motion.div
              key="beat-victory"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src="/projects/mahjong/mockups/03_victory_mock.webp"
                alt="Expedition Mahjong victory celebration 3D mockup with emerald jade Play CTA"
                fill
                sizes="330px"
                className="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface SensoryAndFunnelLabProps {
  soundEnabled: boolean;
}

export function SensoryAndFunnelLab({ soundEnabled }: SensoryAndFunnelLabProps) {
  const shouldReduceMotion = useReducedMotion();
  const [sfxOn, setSfxOn] = useState(true);
  const [hapticOn, setHapticOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [sentimentPath, setSentimentPath] = useState<"idle" | "good" | "improve">("idle");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const toggleSwitch = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    current: boolean
  ) => {
    const next = !current;
    playTactileSound(next ? "toggle-on" : "toggle-off", soundEnabled);
    setter(next);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
      {/* Left Card: Live Sensory Toggles + Settings 3D Mockup */}
      <div className="rounded-3xl bg-[#12141a] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-5 relative aspect-[9/18] max-w-[200px] w-full mx-auto">
            <Image
              src="/projects/mahjong/mockups/07_settings_mock.webp"
              alt="Expedition Mahjong audio and haptic settings 3D mockup"
              fill
              sizes="200px"
              className="object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.85)]"
            />
          </div>

          <div className="sm:col-span-7 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8547]">
              Sensory Control · Cloud Save
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1]">
              Tactile Toggles &amp; Cross-Platform Progress
            </h3>
            <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
              Independent ceramic sliders for soundscapes, Taptic feedback, and background music alongside Apple &amp; Google Play cloud saves. Test the physical spring switches below:
            </p>

            {/* 3 Working Ceramic Spring Toggles */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {[
                { label: "SFX", active: sfxOn, icon: Volume2, toggle: () => toggleSwitch(setSfxOn, sfxOn) },
                { label: "Haptic", active: hapticOn, icon: Vibrate, toggle: () => toggleSwitch(setHapticOn, hapticOn) },
                { label: "Music", active: musicOn, icon: Music, toggle: () => toggleSwitch(setMusicOn, musicOn) },
              ].map((ctrl) => {
                const Icon = ctrl.icon;
                return (
                  <button
                    key={ctrl.label}
                    type="button"
                    role="switch"
                    aria-checked={ctrl.active}
                    onClick={ctrl.toggle}
                    className="rounded-2xl bg-[#08090a] border border-white/10 p-3 flex flex-col items-center gap-2.5 hover:border-white/20 active:scale-95 transition-[transform,border-color]"
                  >
                    <Icon
                      className={`w-4 h-4 ${ctrl.active ? "text-emerald-400" : "text-[#71717a]"}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                        ctrl.active ? "bg-emerald-700 justify-end" : "bg-white/15 justify-start"
                      }`}
                    >
                      <motion.span
                        layout
                        transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SNAPPY}
                        className="w-5 h-5 rounded-full bg-gradient-to-b from-[#f4e4c7] to-[#cbb084] shadow-md"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-[#e7ece5]">{ctrl.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Card: Interactive Two-Step Sentiment Simulator + Fresh RATE US Mockup */}
      <div className="rounded-3xl bg-[#12141a] border border-white/[0.09] p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-5 relative aspect-[9/18] max-w-[200px] w-full mx-auto">
            <Image
              src="/projects/mahjong/mockups/08_rate_us_mock.webp"
              alt="Expedition Mahjong newly updated two-step sentiment funnel 3D mockup"
              fill
              sizes="200px"
              className="object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.85)]"
            />
          </div>

          <div className="sm:col-span-7 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8547]">
              Organic Rating Funnel · Two-Step Routing
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#f2f5f1]">
              Routing Positivity Without Coercive Popups
            </h3>
            <p className="text-xs sm:text-sm text-[#adb3b7] leading-relaxed">
              Contextual sheet triggers post-streak while leaving active tiles visible above. Try both response branches:
            </p>

            {/* Interactive Simulation Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  playTactileSound("jade", soundEnabled);
                  setSentimentPath("good");
                  setFeedbackSent(false);
                }}
                className={`min-h-[42px] px-4 rounded-xl text-xs font-semibold transition-[transform,background-color] active:scale-95 ${
                  sentimentPath === "good"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-950/60 border border-emerald-500/35 text-emerald-200 hover:bg-emerald-900/60"
                }`}
              >
                Simulate &ldquo;Good&rdquo;
              </button>
              <button
                type="button"
                onClick={() => {
                  playTactileSound("ivory", soundEnabled);
                  setSentimentPath("improve");
                  setFeedbackSent(false);
                }}
                className={`min-h-[42px] px-4 rounded-xl text-xs font-semibold transition-[transform,background-color] active:scale-95 ${
                  sentimentPath === "improve"
                    ? "bg-[#b99b6b] text-[#08090a]"
                    : "bg-white/[0.06] border border-white/15 text-[#e7ece5] hover:bg-white/[0.1]"
                }`}
              >
                Simulate &ldquo;Need to improve&rdquo;
              </button>
            </div>

            {/* Simulated Branch Output */}
            <AnimatePresence mode="wait">
              {sentimentPath === "good" && (
                <motion.div
                  key="branch-good"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={SPRING_SNAPPY}
                  className="rounded-2xl bg-[#08090a] border border-emerald-500/30 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                    ))}
                    <span className="text-[11px] font-mono text-emerald-300 ml-1">
                      SKStoreReviewController
                    </span>
                  </div>
                  <p className="text-xs text-[#adb3b7]">
                    Triggers native iOS / Android in-app review sheet seamlessly in 1 tap.
                  </p>
                </motion.div>
              )}

              {sentimentPath === "improve" && (
                <motion.div
                  key="branch-improve"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={SPRING_SNAPPY}
                  className="rounded-2xl bg-[#08090a] border border-[#ff7235]/35 p-3.5 flex items-center justify-between gap-3"
                >
                  {feedbackSent ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      Direct bug report routed to QA without hurting store score.
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-xs text-[#c4cacd]">
                        <MessageSquare className="w-4 h-4 text-[#ff8547] shrink-0" aria-hidden="true" />
                        <span>Opens private support channel instead of store 1★ frustration.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playTactileSound("ivory", soundEnabled);
                          setFeedbackSent(true);
                        }}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-[#ff7235] text-[#08090a] text-[11px] font-mono font-semibold"
                      >
                        Send
                      </button>
                    </>
                  )}
                </motion.div>
              )}

              {sentimentPath === "idle" && (
                <motion.div
                  key="branch-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl bg-[#08090a]/70 border border-white/[0.07] p-3.5 text-xs font-mono text-[#71717a]"
                >
                  Select an option above to preview conditional user routing.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
