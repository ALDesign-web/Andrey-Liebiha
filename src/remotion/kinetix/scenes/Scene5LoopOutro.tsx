import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { StudioBackdrop } from "../components/StudioBackdrop";
import { TelemetryDashboardContent } from "../components/TelemetryDashboardContent";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

/**
 * Scene 5: Straight-on (0deg) pull-back to clean full-frame workbench pose.
 */
export const Scene5LoopOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const rigScale = interpolate(frame, [0, 105], [1.1, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const camY = interpolate(frame, [0, 105], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtle rim sweep
  const sheenX = interpolate(frame, [30, 165], [-500, 1650], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Minimal watermark pill appears mid-scene and fades out cleanly before loop point
  const brandOpacity =
    interpolate(frame, [45, 75], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    interpolate(frame, [165, 198], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill>
      <StudioBackdrop accent="balanced" />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Outro Straight Stage"
          style={{
            position: "relative",
            width: 1520,
            height: 880,
            translate: `0px ${camY}px`,
            scale: rigScale,
          }}
        >
          <TelemetryDashboardContent mode="outro" />

          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -120,
                left: 0,
                width: 340,
                height: 1120,
                translate: `${sheenX}px 0px`,
                rotate: "18deg",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)",
              }}
            />
          </div>
        </Interactive.Div>
      </AbsoluteFill>

      {/* Subtle Bottom Brand Mark */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          translate: "-50% 0px",
          opacity: brandOpacity,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 16px",
          borderRadius: 9999,
          backgroundColor: "rgba(12, 13, 18, 0.85)",
          border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L21 12L12 21L3 12L12 3Z" stroke="#ff7235" strokeWidth="2.5" />
        </svg>
        <span
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 13.5,
            fontWeight: 600,
            color: KINETIX_COLORS.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          Kinetix AI Studio
        </span>
        <span
          style={{
            fontFamily: KINETIX_FONTS.mono,
            fontSize: 11,
            color: KINETIX_COLORS.textMuted,
          }}
        >
          · 8pt Obsidian System
        </span>
      </div>
    </AbsoluteFill>
  );
};
