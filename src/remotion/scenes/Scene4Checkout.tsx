import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { DeviceMockup3D } from "../components/DeviceMockup3D";
import { GlassCard } from "../components/GlassCard";
import { KineticText } from "../components/KineticText";
import { MetricCounter } from "../components/MetricCounter";
import { VideoOverlayHeader } from "../components/VideoOverlayHeader";

export const Scene4Checkout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Biometric pulse ripple animation
  const rippleScale = interpolate(frame % 90, [0, 90], [1, 2.2]);
  const rippleOpacity = interpolate(frame % 90, [0, 90], [0.8, 0]);

  // Modal pop-out spring
  const modalPop = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14, stiffness: 120 }
  });

  return (
    <AbsoluteFill className="bg-[#07080C] text-white flex flex-col justify-center px-14 relative overflow-hidden font-sans select-none">
      {/* Dynamic Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Overlay */}
      <VideoOverlayHeader
        chapter="06 / 07 • ZERO-FRICTION EXPRESS CHECKOUT"
        stageName="CHECKOUT FRICTION REDUCTION"
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-10 items-center max-w-7xl mx-auto w-full z-10 my-auto">
        {/* Left Column: 3D Viewport with Pop-out Checkout Modal */}
        <div className="col-span-6 relative flex justify-center">
          <DeviceMockup3D
            imageSrc={staticFile("projects/bookify/crop_checkout.png")}
            url="bookify.store/checkout/express-modal"
            delay={10}
            rotateX={3}
            rotateY={-5}
            rotateZ={0}
            scale={0.9}
            className="w-full max-w-[560px]"
          />

          {/* 1-Tap Biometric Payment Highlight Indicator */}
          <div
            className="absolute bottom-[28%] right-[16%] pointer-events-none flex items-center space-x-3"
            style={{
              opacity: Math.min(Math.max(modalPop, 0), 1),
              transform: `scale(${0.9 + modalPop * 0.1}) translateY(${(1 - modalPop) * 15}px)`
            }}
          >
            {/* Animated Pulsing Wave */}
            <div className="relative flex items-center justify-center">
              <div
                className="absolute w-12 h-12 rounded-full bg-blue-500/40 pointer-events-none"
                style={{
                  transform: `scale(${rippleScale})`,
                  opacity: rippleOpacity
                }}
              />
              <div className="w-10 h-10 rounded-full bg-blue-600 border border-white text-white font-bold flex items-center justify-center shadow-[0_0_20px_#3b82f6] text-xs">
                ⚡
              </div>
            </div>

            <div className="bg-[#0D111A]/95 border border-blue-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-xl font-mono text-xs">
              <span className="text-white font-bold block">1-Biometric Tap</span>
              <span className="text-blue-400 text-[10px]">Apple Pay / Google Pay</span>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Architecture & Speed Metric */}
        <div className="col-span-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase font-semibold">
              STAGE 04 ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              <KineticText
                text="Frictionless 1-Tap Conversion"
                delay={20}
                highlightWords={["Frictionless", "1-Tap", "Conversion"]}
                highlightColor="#38BDF8"
              />
            </h2>
          </div>

          {/* Architecture Items */}
          <div className="space-y-3">
            <GlassCard delay={40} className="p-4 space-y-1 bg-[#0A0E17]/90 border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  A
                </span>
                <span className="text-sm font-bold text-white">
                  In-Context Modal Checkout
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                Users never leave the product page. Eliminating full-page redirects protects browsing context and cuts cognitive fatigue.
              </p>
            </GlassCard>

            <GlassCard delay={70} className="p-4 space-y-1 bg-[#0A0E17]/90 border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  B
                </span>
                <span className="text-sm font-bold text-white">
                  1-Click Wallet Integration
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                Prominently placed Apple Pay, Google Pay, and saved cards reduce checkout field inputs from 12 fields down to 1 biometric tap.
              </p>
            </GlassCard>

            <GlassCard delay={100} className="p-4 space-y-1 bg-[#0A0E17]/90 border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  C
                </span>
                <span className="text-sm font-bold text-white">
                  Live Cost Transparency
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                Immediate order summary, taxes, and shipping calculation eliminating last-second price shock abandonments.
              </p>
            </GlassCard>
          </div>

          {/* Big Velocity & Abandonment Cards */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Abandonment Drop */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-emerald-400">
              <span className="text-[10px] text-zinc-400 font-mono uppercase block">
                Cart Abandonment
              </span>
              <div className="text-2xl font-black font-mono mt-0.5">
                <MetricCounter
                  startValue={0}
                  endValue={42.5}
                  decimals={1}
                  prefix="▼ -"
                  suffix="%"
                  delay={120}
                />
              </div>
              <span className="text-[10px] text-emerald-300 font-sans block mt-0.5">
                Reduced Drop-offs
              </span>
            </div>

            {/* Velocity Speed */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-blue-400">
              <span className="text-[10px] text-zinc-400 font-mono uppercase block">
                Avg Checkout Time
              </span>
              <div className="text-2xl font-black font-mono mt-0.5 flex items-center space-x-1">
                <span>⚡</span>
                <MetricCounter
                  startValue={108}
                  endValue={45}
                  decimals={0}
                  suffix="s"
                  delay={130}
                />
              </div>
              <span className="text-[10px] text-blue-300 font-sans block mt-0.5">
                Down from 108s (-58.3%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
