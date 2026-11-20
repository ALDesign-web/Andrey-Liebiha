"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2, Vibrate, Music, Star, CheckCircle2, MessageSquare } from "lucide-react";
import { playTactileSound } from "@/lib/tactileAudio";
import { Interactive3DPhone } from "./Interactive3DPhone";

const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30, mass: 1 };
const SPRING_SMOOTH = { type: "spring" as const, stiffness: 200, damping: 24, mass: 1 };

interface StickyGameplayStageProps {
  activeBeat: "board" | "victory";
  soundEnabled: boolean;
}

export function StickyGameplayStage({ activeBeat, soundEnabled }: StickyGameplayStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [boardViewMode, setBoardViewMode] = useState<"3d" | "flat">("3d");

  return (
    <div className="flex flex-col items-center">
      {/* Contextual Top Utility Pill above Sticky Stage */}
      <div className="w-full max-w-[340px] mb-4 flex items-center justify-center">
        {activeBeat === "board" && (
          <div
            role="tablist"
            aria-label="Inspect gameplay hardware or flat UI spec"
            className="inline-flex p-1 rounded-full bg-[#12141a] border border-white/12 gap-1"
          >
            {[
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
                    setBoardViewMode(mode.id as "3d" | "flat");
                  }}
                  className="relative px-4 py-2 rounded-full text-xs font-mono transition-colors focus-visible:outline-none min-h-[38px]"
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

        {activeBeat === "victory" && (
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-xs font-mono text-emerald-300">
            Victory Flow · 3-Tier Visual Weight
          </span>
        )}
      </div>

      {/* Main Sticky Phone Viewport */}
      <div className="relative w-full max-w-[310px] sm:max-w-[330px] flex flex-col items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          {activeBeat === "board" && (
            <motion.div
              key={`beat-board-${boardViewMode}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={shouldReduceMotion ? { duration: 0.01 } : SPRING_SMOOTH}
              className="relative w-full flex items-center justify-center overflow-visible"
            >
              {boardViewMode === "3d" ? (
                <Interactive3DPhone
                  src="/projects/mahjong/mockups/02_gameplay_board_front.webp"
                  alt="Expedition Mahjong front-view 3D gameplay board mockup"
                  sizes="330px"
                  maxRotateX={14}
                  maxRotateY={20}
                  showHint
                  className="w-full"
                  stageClassName="relative w-full aspect-[9/19.2]"
                />
              ) : (
                <Interactive3DPhone
                  maxRotateX={13}
                  maxRotateY={18}
                  showHint
                  className="w-full"
                  stageClassName="relative w-full aspect-[9/19.2]"
                  customVisual={
                    <div className="relative w-[90%] h-full rounded-[38px] overflow-hidden border-[3px] border-white/18 bg-[#08090a] shadow-[0_28px_60px_rgba(0,0,0,0.85)]">
                      <Image
                        src="/projects/mahjong/screens/02_gameplay_board.webp"
                        alt="Expedition Mahjong flat gameplay HUD and thumb booster dock"
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  }
                />
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
              className="relative w-full flex items-center justify-center overflow-visible"
            >
              <Interactive3DPhone
                src="/projects/mahjong/mockups/03_victory_upright.webp"
                alt="Expedition Mahjong victory celebration 3D mockup with emerald jade Play CTA"
                sizes="330px"
                maxRotateX={14}
                maxRotateY={20}
                showHint
                className="w-full"
                stageClassName="relative w-full aspect-[9/19.2]"
                imageClassName="object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
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
          <div className="sm:col-span-5 max-w-[215px] w-full mx-auto overflow-visible">
            <Interactive3DPhone
              src="/projects/mahjong/mockups/07_settings_upright.webp"
              alt="Expedition Mahjong audio and haptic settings 3D mockup"
              sizes="215px"
              maxRotateX={13}
              maxRotateY={18}
              showHint
              stageClassName="relative w-full aspect-[9/19.2]"
              imageClassName="object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.85)]"
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
          <div className="sm:col-span-5 max-w-[215px] w-full mx-auto overflow-visible">
            <Interactive3DPhone
              src="/projects/mahjong/mockups/08_rate_us_upright.webp"
              alt="Expedition Mahjong newly updated two-step sentiment funnel 3D mockup"
              sizes="215px"
              maxRotateX={13}
              maxRotateY={18}
              showHint
              stageClassName="relative w-full aspect-[9/19.2]"
              imageClassName="object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.85)]"
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
