import React from "react";
import { AbsoluteFill } from "remotion";
import { KINETIX_COLORS } from "../tokens";

interface StudioBackdropProps {
  /** Subtle ambient tint emphasis per scene */
  accent?: "balanced" | "orange" | "violet";
  /** Show subtle architectural dot matrix */
  showDots?: boolean;
}

/**
 * Clean obsidian studio backdrop with subtle architectural radial depth and dot grid.
 */
export const StudioBackdrop: React.FC<StudioBackdropProps> = ({
  accent = "balanced",
  showDots = true,
}) => {
  const topLeftOpacity = accent === "orange" ? 0.09 : 0.06;
  const bottomRightOpacity = accent === "violet" ? 0.095 : 0.065;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: KINETIX_COLORS.stageBg,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Subtle architectural dot grid */}
      {showDots && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.45,
          }}
        />
      )}

      {/* Subtle corner volumetric lighting */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: -220,
          width: 960,
          height: 960,
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(255, 114, 53, ${topLeftOpacity}) 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -280,
          right: -200,
          width: 980,
          height: 980,
          borderRadius: "9999px",
          background: `radial-gradient(circle, rgba(139, 92, 246, ${bottomRightOpacity}) 0%, transparent 65%)`,
        }}
      />

      {/* Soft studio vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
