import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

// Smooth Bezier curve matching the terracotta/orange Performance Overview curve
const UPPER_LINE_PATH =
  "M 24 148 C 68 148, 86 132, 128 134 C 170 136, 190 162, 232 158 C 274 154, 294 102, 336 102 C 378 102, 404 60, 442 60 C 480 60, 504 114, 540 108 C 576 102, 608 42, 646 42 C 676 42, 702 104, 738 138";
const UPPER_AREA_PATH = `${UPPER_LINE_PATH} L 738 286 L 24 286 Z`;

// Smooth Bezier curve matching the lower emerald baseline curve
const LOWER_LINE_PATH =
  "M 24 238 C 66 226, 90 218, 128 228 C 166 238, 190 264, 232 256 C 274 248, 298 226, 336 226 C 374 226, 404 214, 442 214 C 480 214, 506 230, 540 226 C 574 222, 608 206, 646 206 C 682 206, 704 226, 738 232";
const LOWER_AREA_PATH = `${LOWER_LINE_PATH} L 738 286 L 24 286 Z`;

const UPPER_TOTAL_LEN = getLength(UPPER_LINE_PATH);

export interface AreaChartSvgProps {
  /** Frame range for initial curve draw-on */
  drawStartFrame?: number;
  drawEndFrame?: number;
  /** Whether curves are already fully drawn on frame 0 */
  alreadyDrawn?: boolean;
  /** Enable interactive scrubber sweep */
  scrubStartFrame?: number;
  scrubEndFrame?: number;
}

/**
 * Dual-layer smooth spline area chart with @remotion/paths draw-on and live scrubber tooltip.
 */
export const AreaChartSvg: React.FC<AreaChartSvgProps> = ({
  drawStartFrame = 25,
  drawEndFrame = 125,
  alreadyDrawn = false,
  scrubStartFrame,
  scrubEndFrame,
}) => {
  const frame = useCurrentFrame();

  const drawProgress = alreadyDrawn
    ? 1
    : interpolate(frame, [drawStartFrame, drawEndFrame], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });

  const lowerDrawProgress = alreadyDrawn
    ? 1
    : interpolate(frame, [drawStartFrame + 14, drawEndFrame + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });

  const upperEvolution = evolvePath(drawProgress, UPPER_LINE_PATH);
  const lowerEvolution = evolvePath(lowerDrawProgress, LOWER_LINE_PATH);

  const clipWidth = interpolate(drawProgress, [0, 1], [0, 760], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Optional live scrubber tooltip along the upper curve
  let scrubberOpacity = 0;
  let scrubberPt: { x: number; y: number } | null = null;
  let scrubberValueLabel = "3.24M Reach";
  let scrubberMonthLabel = "Oct";

  if (scrubStartFrame !== undefined && scrubEndFrame !== undefined) {
    const t = interpolate(frame, [scrubStartFrame, scrubEndFrame], [0.16, 0.84], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });

    scrubberOpacity =
      interpolate(frame, [scrubStartFrame, scrubStartFrame + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }) *
      interpolate(frame, [scrubEndFrame + 24, scrubEndFrame + 40], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

    scrubberPt = getPointAtLength(UPPER_LINE_PATH, UPPER_TOTAL_LEN * t);

    const monthIdx = Math.min(
      MONTHS.length - 1,
      Math.max(0, Math.round(t * (MONTHS.length - 1)))
    );
    scrubberMonthLabel = MONTHS[monthIdx];
    const reachNum = (
      2.15 +
      (1 - (scrubberPt ? scrubberPt.y : 100) / 200) * 1.45
    ).toFixed(2);
    scrubberValueLabel = `${reachNum}M Reach`;
  }

  return (
    <div
      style={{
        flex: 1,
        borderRadius: 14,
        backgroundColor: KINETIX_COLORS.surfaceBase,
        border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "22px 24px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: KINETIX_COLORS.textPrimary,
          }}
        >
          Performance Overview
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                backgroundColor: KINETIX_COLORS.signalOrange,
              }}
            />
            <span
              style={{
                fontFamily: KINETIX_FONTS.mono,
                fontSize: 11,
                color: KINETIX_COLORS.textSecondary,
              }}
            >
              Total Reach
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "9999px",
                backgroundColor: KINETIX_COLORS.emerald,
              }}
            />
            <span
              style={{
                fontFamily: KINETIX_FONTS.mono,
                fontSize: 11,
                color: KINETIX_COLORS.textSecondary,
              }}
            >
              Retention
            </span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ position: "relative", width: "100%", height: 320 }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 760 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="kinetixUpperFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7235" stopOpacity="0.34" />
              <stop offset="65%" stopColor="#ff7235" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff7235" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="kinetixLowerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
              <stop offset="85%" stopColor="#10b981" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <clipPath id="kinetixChartReveal">
              <rect x="0" y="0" width={clipWidth} height="320" />
            </clipPath>
          </defs>

          {/* Subtle Horizontal Gridlines */}
          {[56, 114, 172, 230, 286].map((yPos) => (
            <line
              key={yPos}
              x1="20"
              y1={yPos}
              x2="740"
              y2={yPos}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Clipped Area Fills */}
          <g clipPath="url(#kinetixChartReveal)">
            <path d={UPPER_AREA_PATH} fill="url(#kinetixUpperFill)" />
            <path d={LOWER_AREA_PATH} fill="url(#kinetixLowerFill)" />
          </g>

          {/* Animated Stroke Evolutions */}
          <path
            d={UPPER_LINE_PATH}
            fill="none"
            stroke="#ff8552"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray={upperEvolution.strokeDasharray}
            strokeDashoffset={upperEvolution.strokeDashoffset}
          />
          <path
            d={LOWER_LINE_PATH}
            fill="none"
            stroke="#34d399"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeDasharray={lowerEvolution.strokeDasharray}
            strokeDashoffset={lowerEvolution.strokeDashoffset}
          />

          {/* Interactive Scrubber Guide & Marker */}
          {scrubberPt && scrubberOpacity > 0.01 && (
            <g opacity={scrubberOpacity}>
              <line
                x1={scrubberPt.x}
                y1="28"
                x2={scrubberPt.x}
                y2="286"
                stroke="rgba(255, 133, 82, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle
                cx={scrubberPt.x}
                cy={scrubberPt.y}
                r="10"
                fill="rgba(255, 114, 53, 0.24)"
              />
              <circle
                cx={scrubberPt.x}
                cy={scrubberPt.y}
                r="4.5"
                fill="#ff7235"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Live Glass Tooltip */}
        {scrubberPt && scrubberOpacity > 0.01 && (
          <div
            style={{
              position: "absolute",
              left: `${(scrubberPt.x / 760) * 100}%`,
              top: `${Math.max(8, (scrubberPt.y / 320) * 100 - 18)}%`,
              translate: "-50% -100%",
              opacity: scrubberOpacity,
              padding: "8px 12px",
              borderRadius: 10,
              backgroundColor: "rgba(18, 20, 26, 0.94)",
              border: "1px solid rgba(255, 114, 53, 0.4)",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.7)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: KINETIX_FONTS.mono,
                fontSize: 10.5,
                color: KINETIX_COLORS.textSecondary,
                marginBottom: 2,
              }}
            >
              {scrubberMonthLabel} · 30d Cohort
            </div>
            <div
              style={{
                fontFamily: KINETIX_FONTS.sans,
                fontSize: 13.5,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
                color: KINETIX_COLORS.textPrimary,
              }}
            >
              {scrubberValueLabel}{" "}
              <span style={{ color: KINETIX_COLORS.emerald, fontSize: 12 }}>
                +24.8%
              </span>
            </div>
          </div>
        )}

        {/* X-Axis Month Labels */}
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {MONTHS.map((m) => (
            <span
              key={m}
              style={{
                fontFamily: KINETIX_FONTS.sans,
                fontSize: 12,
                color: KINETIX_COLORS.textMuted,
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
