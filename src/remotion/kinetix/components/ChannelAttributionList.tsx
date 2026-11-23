import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

interface AttributionChannel {
  name: string;
  subtitle: string;
  delta: string;
  dotColor: string;
  deltaColor: string;
}

const CHANNELS: readonly AttributionChannel[] = [
  {
    name: "Instagram Reels",
    subtitle: "9:16 vertical cadence · Hook v3",
    delta: "+24.8% CTR",
    dotColor: "#ff7235",
    deltaColor: "#ff8c57",
  },
  {
    name: "TikTok Spark Ads",
    subtitle: "Sound-synced cutdowns · 18s",
    delta: "+18.2% ROAS",
    dotColor: "#f59e0b",
    deltaColor: "#fb923c",
  },
  {
    name: "YouTube Shorts",
    subtitle: "Loop-end retention framing",
    delta: "+14.6% Watch",
    dotColor: "#10b981",
    deltaColor: "#34d399",
  },
  {
    name: "Threads Pulse",
    subtitle: "Adaptive carousels · Auto-tag",
    delta: "+9.4% Share",
    dotColor: "#38bdf8",
    deltaColor: "#60a5fa",
  },
  {
    name: "LinkedIn Carousel",
    subtitle: "Editorial B2B teardown cards",
    delta: "+7.1% Save",
    dotColor: "#a78bfa",
    deltaColor: "#c4b5fd",
  },
  {
    name: "App Store Clips",
    subtitle: "Interactive tactile preview",
    delta: "+5.3% Install",
    dotColor: "#34d399",
    deltaColor: "#34d399",
  },
];

export interface ChannelAttributionListProps {
  /** Base frame when stagger starts */
  staggerStartFrame?: number;
  /** Skip entrance stagger if already visible */
  alreadyVisible?: boolean;
  /** Highlighted row index (-1 for none) */
  activeIndex?: number;
}

/**
 * Right-hand Channel Attribution module with staggered row entrances and programmable active row focus.
 */
export const ChannelAttributionList: React.FC<ChannelAttributionListProps> = ({
  staggerStartFrame = 35,
  alreadyVisible = false,
  activeIndex = -1,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: 392,
        borderRadius: 14,
        backgroundColor: KINETIX_COLORS.surfaceBase,
        border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "22px 22px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        flexShrink: 0,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: KINETIX_COLORS.textPrimary,
            marginBottom: 4,
          }}
        >
          Channel Attribution
        </div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 12.5,
            color: KINETIX_COLORS.textMuted,
            marginBottom: 16,
          }}
        >
          Top converting formats across 30-day cohort
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {CHANNELS.map((ch, idx) => {
          const rowStart = staggerStartFrame + idx * 9;
          const progress = alreadyVisible
            ? 1
            : interpolate(frame, [rowStart, rowStart + 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });

          const isHighlighted = idx === activeIndex;

          return (
            <div
              key={ch.name}
              style={{
                padding: "13px 14px",
                borderRadius: 10,
                backgroundColor: isHighlighted
                  ? "rgba(255, 114, 53, 0.1)"
                  : "rgba(255, 255, 255, 0.015)",
                border: isHighlighted
                  ? "1px solid rgba(255, 114, 53, 0.38)"
                  : "1px solid rgba(255, 255, 255, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                opacity: progress,
                translate: `0px ${(1 - progress) * 14}px`,
                scale: isHighlighted ? 1.02 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "9999px",
                    backgroundColor: ch.dotColor,
                    boxShadow: isHighlighted
                      ? `0 0 10px ${ch.dotColor}`
                      : "none",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: KINETIX_FONTS.sans,
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: KINETIX_COLORS.textPrimary,
                      lineHeight: 1.25,
                    }}
                  >
                    {ch.name}
                  </div>
                  <div
                    style={{
                      fontFamily: KINETIX_FONTS.sans,
                      fontSize: 11,
                      color: KINETIX_COLORS.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {ch.subtitle}
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontFamily: KINETIX_FONTS.mono,
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: ch.deltaColor,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                {ch.delta}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
