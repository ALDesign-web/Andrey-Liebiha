import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: "blue" | "emerald" | "default";
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  delay = 0,
  glowColor = "default",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 110,
      mass: 0.8
    }
  });

  const opacity = Math.min(Math.max(progress, 0), 1);
  const scale = 0.9 + progress * 0.1;
  const translateY = (1 - progress) * 20;

  const glowShadow =
    glowColor === "blue"
      ? "0 0 35px -5px rgba(59, 130, 246, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)"
      : glowColor === "emerald"
      ? "0 0 35px -5px rgba(16, 185, 129, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)"
      : "0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)";

  const borderColor =
    glowColor === "blue"
      ? "rgba(59, 130, 246, 0.35)"
      : glowColor === "emerald"
      ? "rgba(16, 185, 129, 0.35)"
      : "rgba(255, 255, 255, 0.08)";

  return (
    <div
      className={`relative rounded-2xl bg-[#0D1017]/90 backdrop-blur-xl border p-6 overflow-hidden ${className}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        boxShadow: glowShadow,
        borderColor,
        ...style,
        willChange: "transform, opacity"
      }}
    >
      {/* Top subtle highlight shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
