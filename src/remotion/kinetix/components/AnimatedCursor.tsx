import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export interface CursorWaypoint {
  frame: number;
  x: number;
  y: number;
}

export interface AnimatedCursorProps {
  /** Monotonically increasing frame waypoints */
  waypoints: readonly CursorWaypoint[];
  /** Frame windows where click press + ripple triggers */
  clickFrames?: readonly number[];
  /** Optional fade in/out frame boundaries */
  fadeInRange?: readonly [number, number];
  fadeOutRange?: readonly [number, number];
}

/**
 * Sleek macOS-style vector pointer with keyframed easing, click press scale, and ripple ring.
 */
export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  waypoints,
  clickFrames = [],
  fadeInRange = [0, 12],
  fadeOutRange,
}) => {
  const frame = useCurrentFrame();

  if (waypoints.length === 0) return null;

  const inputFrames = waypoints.map((w) => w.frame);
  const xValues = waypoints.map((w) => w.x);
  const yValues = waypoints.map((w) => w.y);

  const x =
    waypoints.length === 1
      ? xValues[0]
      : interpolate(frame, inputFrames, xValues, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        });

  const y =
    waypoints.length === 1
      ? yValues[0]
      : interpolate(frame, inputFrames, yValues, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.22, 1, 0.36, 1),
        });

  const fadeInOpacity = interpolate(frame, fadeInRange, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOutOpacity = fadeOutRange
    ? interpolate(frame, fadeOutRange, [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Compute click press compression and ripple from nearest click frame
  let pressScale = 1;
  let activeRippleProgress: number | null = null;

  for (const cf of clickFrames) {
    const dt = frame - cf;
    if (dt >= -2 && dt <= 10) {
      const localPress = interpolate(dt, [-2, 3, 10], [1, 0.84, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      });
      pressScale = Math.min(pressScale, localPress);
    }
    if (dt >= 2 && dt <= 24) {
      activeRippleProgress = interpolate(dt, [2, 24], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        translate: `${x}px ${y}px`,
        opacity: fadeInOpacity * fadeOutOpacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Click Ripple Ring */}
      {activeRippleProgress !== null && (
        <div
          style={{
            position: "absolute",
            left: -18,
            top: -18,
            width: 36,
            height: 36,
            borderRadius: "9999px",
            border: "2px solid rgba(139, 92, 246, 0.85)",
            backgroundColor: "rgba(139, 92, 246, 0.14)",
            scale: 0.35 + activeRippleProgress * 1.45,
            opacity: 1 - activeRippleProgress,
          }}
        />
      )}

      {/* High-DPI Vector Pointer */}
      <svg
        width="30"
        height="34"
        viewBox="0 0 28 32"
        fill="none"
        style={{
          scale: pressScale,
          transformOrigin: "2px 2px",
          filter: "drop-shadow(0 6px 14px rgba(0, 0, 0, 0.75))",
        }}
      >
        <path
          d="M2.5 2.5L2.5 25.5L8.6 19.6L13.2 28.8L16.7 27.1L12.1 17.9L20.5 17.9L2.5 2.5Z"
          fill="#0d0f14"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
