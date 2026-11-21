"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, Volume2, VolumeX, Waves, Zap } from "lucide-react";
import { RiveOrbBeacon } from "@/components/RiveOrbBeacon";
import { RiveSystemSwitch } from "@/components/RiveSystemSwitch";
import { playTactileSound, type TactileSoundVariant } from "@/lib/tactileAudio";
import { IPhoneProFrame } from "./IPhoneProFrame";

function IOSPrefToggle({
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
      className={`relative w-12 h-7 rounded-full p-1 transition-colors border focus-visible:outline-none ${
        checked ? "bg-[#ff7235] border-[#ffa043]/60" : "bg-[#232630] border-white/15"
      }`}
    >
      <motion.span
        layout={!reducedMotion}
        transition={
          reducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 520, damping: 32 }
        }
        className={`block w-5 h-5 rounded-full shadow bg-white ${
          checked ? "ml-auto" : "mr-auto"
        }`}
      />
    </button>
  );
}

type StateNodeId = "idle" | "hover" | "active" | "impulse";

export function RiveStateMachineLab() {
  const shouldReduceMotion = useReducedMotion();
  const impulseTimerRef = useRef<number | null>(null);

  const [riveSwitchOn, setRiveSwitchOn] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(false);

  const [orbTaps, setOrbTaps] = useState(0);
  const [orbHovered, setOrbHovered] = useState(false);
  const [impulseActive, setImpulseActive] = useState(false);
  const [hapticPulseKey, setHapticPulseKey] = useState(0);
  const [lastSoundVariant, setLastSoundVariant] = useState<string>("jade");

  const [eventLog, setEventLog] = useState<string[]>([
    "SM1.isOn -> true (system-switch.riv ready)",
    "OrbBeacon.SM1 listening for isHovered / triggerTap",
    "CoreHaptics.engine armed (.medium tactile impulse)",
  ]);

  useEffect(() => {
    return () => {
      if (impulseTimerRef.current) window.clearTimeout(impulseTimerRef.current);
    };
  }, []);

  const pushLog = (entry: string) => {
    setEventLog((prev) => [entry, ...prev].slice(0, 4));
  };

  const triggerDeviceFeedback = (sound: TactileSoundVariant, logLabel: string) => {
    playTactileSound(sound, sfxEnabled);
    setLastSoundVariant(sound);
    if (hapticEnabled) {
      setHapticPulseKey((k) => k + 1);
      setImpulseActive(true);
      if (impulseTimerRef.current) window.clearTimeout(impulseTimerRef.current);
      impulseTimerRef.current = window.setTimeout(() => setImpulseActive(false), 620);
    }
    pushLog(logLabel);
  };

  const handleRiveSwitchChange = (next: boolean) => {
    setRiveSwitchOn(next);
    triggerDeviceFeedback(
      next ? "toggle-on" : "toggle-off",
      `SM1.isOn -> ${next ? "true" : "false"} · Synced Phone Runtime`
    );
  };

  const handleOrbFire = () => {
    const nextCount = orbTaps + 1;
    setOrbTaps(nextCount);
    triggerDeviceFeedback("jade", `Orb.triggerTap() #${nextCount} · CoreHaptics.impact(.rigid)`);
  };

  const activeNode: StateNodeId = impulseActive
    ? "impulse"
    : riveSwitchOn
      ? "active"
      : orbHovered
        ? "hover"
        : "idle";

  const waveformHeights = impulseActive
    ? [12, 26, 36, 20, 32, 24, 14]
    : riveSwitchOn
      ? [8, 14, 18, 12, 16, 11, 7]
      : [4, 5, 4, 6, 4, 5, 4];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left: Dual Rive Runtime Playground & Live State Machine Inspector */}
      <div className="lg:col-span-6 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff8547]">
            Live Rive Runtimes & State Machine Inputs
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#f2f5f1] mt-2 mb-3">
            Synchronized Rive state machines &amp; tactile hardware.
          </h3>
          <p className="text-sm sm:text-base text-[#adb3b7] leading-relaxed">
            Both Rive canvases run live vector state machines connected to the iPhone Pro on the
            right. Every switch flip or orb tap drives WebAudio acoustic cues and simulated Core
            Haptics feedback.
          </p>
        </div>

        {/* Side-by-side Real Rive Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 1: Real system-switch.riv */}
          <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 flex flex-col items-center justify-between gap-3">
            <div className="w-full flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#adb3b7]">system-switch.riv</span>
              <span className={riveSwitchOn ? "text-[#ff8547]" : "text-[#adb3b7]"}>
                isOn={String(riveSwitchOn)}
              </span>
            </div>
            <div
              className={`px-3 py-2 rounded-2xl border transition-colors ${
                riveSwitchOn
                  ? "bg-[#ff7235]/12 border-[#ff7235]/40 shadow-[0_0_24px_rgba(255,114,53,0.18)]"
                  : "bg-[#121316] border-white/10"
              }`}
            >
              <RiveSystemSwitch
                checked={riveSwitchOn}
                onChange={handleRiveSwitchChange}
                width={132}
                height={68}
              />
            </div>
            <span className="text-[11px] font-mono text-[#adb3b7]">
              Tap Rive Switch ({riveSwitchOn ? "Active" : "Standby"})
            </span>
          </div>

          {/* Card 2: Real orb-beacon.riv */}
          <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 flex flex-col items-center justify-between gap-3">
            <div className="w-full flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#adb3b7]">orb-beacon.riv</span>
              <span className="text-[#ff8547] tabular-nums">taps: {orbTaps}</span>
            </div>
            <button
              type="button"
              onPointerEnter={() => setOrbHovered(true)}
              onPointerLeave={() => setOrbHovered(false)}
              onClick={handleOrbFire}
              aria-label="Fire Rive orb beacon triggerTap input"
              className="w-20 h-20 rounded-2xl bg-[#121316] hover:bg-[#181a20] border border-white/10 hover:border-[#ff7235]/50 flex items-center justify-center transition-colors"
            >
              <RiveOrbBeacon size={54} />
            </button>
            <span className="text-[11px] font-mono text-[#adb3b7]">
              Hover + tap to fire triggerTap
            </span>
          </div>
        </div>

        {/* Live State Graph Pills */}
        <div className="rounded-2xl bg-[#0a0b0e] border border-white/[0.08] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#f2f5f1] inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#ff7235]" aria-hidden="true" />
              State Machine Graph
            </span>
            <span className="text-[11px] text-[#adb3b7]">Active Node: {activeNode}</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-[11px] font-mono text-center">
            {(
              [
                { id: "idle", label: "Idle" },
                { id: "hover", label: "Hover" },
                { id: "active", label: "isOn:true" },
                { id: "impulse", label: "Impulse" },
              ] as const
            ).map((node) => {
              const lit = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  className={`py-2 px-1 rounded-lg border transition-colors ${
                    lit
                      ? "bg-[#ff7235]/20 border-[#ff7235] text-[#f2f5f1] font-semibold"
                      : "bg-[#121316] border-white/[0.06] text-[#adb3b7]"
                  }`}
                >
                  {node.label}
                </div>
              );
            })}
          </div>

          {/* Live Event Stream */}
          <div
            data-rive-event-log="true"
            className="pt-2 border-t border-white/[0.06] space-y-1 font-mono text-[11px]"
          >
            {eventLog.map((line, idx) => (
              <div
                key={`${idx}-${line}`}
                className={`truncate ${idx === 0 ? "text-[#ff8547]" : "text-[#adb3b7]/80"}`}
              >
                &gt; {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Synchronized iPhone Pro Settings & Core Haptics Monitor */}
      <div className="lg:col-span-6 flex justify-center">
        <IPhoneProFrame
          islandState={impulseActive ? "haptic" : "idle"}
          islandLabel={impulseActive ? "Core Haptic" : undefined}
          hapticPulseKey={hapticPulseKey}
        >
          <div className="px-3.5 pt-2 pb-4 flex-1 flex flex-col justify-between bg-[#0a0b0e]">
            {/* App Screen Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff8547]">
                    Audio-Haptic Engine
                  </div>
                  <h4 className="text-base font-semibold text-[#f2f5f1]">Preferences Sync</h4>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono text-[#f2f5f1]">
                  {sfxEnabled ? (
                    <Volume2 className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
                  ) : (
                    <VolumeX className="w-3 h-3 text-[#adb3b7]" aria-hidden="true" />
                  )}
                  {sfxEnabled ? "SFX On" : "Muted"}
                </span>
              </div>

              {/* Interactive iOS Toggles inside Phone */}
              <div className="rounded-2xl bg-[#14171f] border border-white/[0.09] divide-y divide-white/[0.06] px-3">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-[#f2f5f1]">Rive Master Runtime</div>
                    <div className="text-[10px] font-mono text-[#adb3b7]">
                      Syncs with left .riv switch
                    </div>
                  </div>
                  <IOSPrefToggle
                    checked={riveSwitchOn}
                    onChange={handleRiveSwitchChange}
                    label="Sync Rive Master Runtime"
                    reducedMotion={shouldReduceMotion}
                  />
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-[#f2f5f1]">Acoustic SFX</div>
                    <div className="text-[10px] font-mono text-[#adb3b7]">
                      WebAudio physical synth
                    </div>
                  </div>
                  <IOSPrefToggle
                    checked={sfxEnabled}
                    onChange={(next) => {
                      setSfxEnabled(next);
                      if (next) playTactileSound("toggle-on", true);
                      pushLog(`AudioEngine.sfx -> ${next ? "enabled" : "muted"}`);
                    }}
                    label="Toggle Phone Acoustic SFX"
                    reducedMotion={shouldReduceMotion}
                  />
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-[#f2f5f1]">Core Haptics</div>
                    <div className="text-[10px] font-mono text-[#adb3b7]">
                      Micro-impulse feedback
                    </div>
                  </div>
                  <IOSPrefToggle
                    checked={hapticEnabled}
                    onChange={(next) => {
                      setHapticEnabled(next);
                      playTactileSound(next ? "toggle-on" : "toggle-off", sfxEnabled);
                      pushLog(`CoreHaptics.enabled -> ${next}`);
                    }}
                    label="Toggle Phone Core Haptics"
                    reducedMotion={shouldReduceMotion}
                  />
                </div>

                <div className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-[#f2f5f1]">Ambient Score</div>
                    <div className="text-[10px] font-mono text-[#adb3b7]">
                      Adaptive board soundbed
                    </div>
                  </div>
                  <IOSPrefToggle
                    checked={ambientEnabled}
                    onChange={(next) => {
                      setAmbientEnabled(next);
                      triggerDeviceFeedback(
                        next ? "toggle-on" : "toggle-off",
                        `Audio.ambientScore -> ${next}`
                      );
                    }}
                    label="Toggle Ambient Score"
                    reducedMotion={shouldReduceMotion}
                  />
                </div>
              </div>

              {/* Core Haptics Oscilloscope Visualizer inside Phone */}
              <div className="rounded-2xl bg-[#12141a] border border-white/[0.08] p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#adb3b7] mb-2">
                  <span className="inline-flex items-center gap-1 text-[#f2f5f1]">
                    <Waves className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
                    Taptic Waveform
                  </span>
                  <span className="text-[#ff8547]">{lastSoundVariant}</span>
                </div>
                <div className="h-10 flex items-center justify-center gap-1.5">
                  {waveformHeights.map((h, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ height: shouldReduceMotion ? 10 : h }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                      className={`w-1.5 rounded-full ${
                        impulseActive || riveSwitchOn ? "bg-[#ff7235]" : "bg-white/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tactile Material Sound Tester inside Phone */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] font-mono text-[#adb3b7] flex items-center justify-between">
                <span>Test Tactile Material Clicks</span>
                <Zap className="w-3 h-3 text-[#ff7235]" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: "ivory" as const, label: "Ivory" },
                    { id: "jade" as const, label: "Jade" },
                    { id: "stone" as const, label: "Obsidian" },
                  ] as const
                ).map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() =>
                      triggerDeviceFeedback(mat.id, `MaterialTap.${mat.id}() -> Synth + Haptic`)
                    }
                    className="tm-press min-h-[36px] rounded-xl bg-white/[0.06] hover:bg-[#ff7235]/20 border border-white/10 hover:border-[#ff7235]/50 text-[11px] font-mono text-[#f2f5f1] transition-colors"
                  >
                    {mat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </IPhoneProFrame>
      </div>
    </div>
  );
}
