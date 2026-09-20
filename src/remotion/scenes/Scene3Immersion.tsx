import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { DeviceMockup3D } from "../components/DeviceMockup3D";
import { GlassCard } from "../components/GlassCard";
import { KineticText } from "../components/KineticText";
import { MetricCounter } from "../components/MetricCounter";
import { VideoOverlayHeader } from "../components/VideoOverlayHeader";

export const Scene3Immersion: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom sequence on the mockup
  const zoomProgress = interpolate(frame, [100, 300], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill className="bg-[#07080C] text-white flex flex-col justify-center px-14 relative overflow-hidden font-sans select-none">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Overlay */}
      <VideoOverlayHeader
        chapter="03-04 / 07 • IMMERSION & SPECIFICATION"
        stageName="INFORMATION ARCHITECTURE & PROOF"
      />

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-10 items-center max-w-7xl mx-auto w-full z-10 my-auto">
        {/* Left Column: 3D Device Viewport Mockup */}
        <div className="col-span-6 relative flex justify-center">
          <DeviceMockup3D
            imageSrc={staticFile("projects/bookify/crop_product_detail.png")}
            url="bookify.store/books/classics/joan-blaeu-atlas-maior"
            delay={10}
            rotateX={3}
            rotateY={-5}
            rotateZ={0}
            scale={0.9 * zoomProgress}
            className="w-full max-w-[560px]"
          />

          {/* Glowing Focus Callout Ring on Atlas Maior Spread */}
          <div
            className="absolute top-[38%] left-[22%] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all"
            style={{
              opacity: interpolate(frame, [40, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp"
              })
            }}
          >
            <div
              className="w-28 h-28 rounded-full border border-blue-400/80 shadow-[0_0_25px_rgba(59,130,246,0.6)] animate-ping"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-blue-600/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
              🔍 Double-Spread 4K Preview
            </div>
          </div>
        </div>

        {/* Right Column: Architecture Callouts & Metric Highlights */}
        <div className="col-span-6 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase font-semibold">
              STAGE 02 ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              <KineticText
                text="Decision Clarity & Visual Proof"
                delay={20}
                highlightWords={["Decision", "Visual", "Proof"]}
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
                  Double-Spread Interior Preview
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                High-definition multi-page interior preview (Atlas Maior 1665) removes the primary obstacle in online art book purchases — seeing print and paper fidelity.
              </p>
            </GlassCard>

            <GlassCard delay={70} className="p-4 space-y-1 bg-[#0A0E17]/90 border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  B
                </span>
                <span className="text-sm font-bold text-white">
                  Transparent Physical Specifications
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                Comprehensive physical attributes (Hardcover, dimensions, 4.27kg, 512 pages, release year) placed directly adjacent to imagery.
              </p>
            </GlassCard>

            <GlassCard delay={100} className="p-4 space-y-1 bg-[#0A0E17]/90 border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">
                  C
                </span>
                <span className="text-sm font-bold text-white">
                  High-Contrast Dual Action Hierarchy
                </span>
              </div>
              <p className="text-xs text-zinc-400 pl-7 leading-relaxed">
                Distinction between instant checkout (&quot;Buy Now&quot;) and cart addition with secondary wishlist trigger for non-immediate buyers.
              </p>
            </GlassCard>
          </div>

          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1 font-mono">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-emerald-400 text-xs">
              <span className="text-[11px] text-zinc-300">Add to Cart Rate</span>
              <span className="font-bold text-sm">
                <MetricCounter
                  startValue={0}
                  endValue={31.2}
                  decimals={1}
                  prefix="▲ +"
                  suffix="%"
                  delay={120}
                />
              </span>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 flex items-center justify-between text-blue-400 text-xs">
              <span className="text-[11px] text-zinc-300">Inquiries on Specs</span>
              <span className="font-bold text-sm">
                <MetricCounter
                  startValue={0}
                  endValue={35.0}
                  decimals={0}
                  prefix="▼ -"
                  suffix="%"
                  delay={140}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
