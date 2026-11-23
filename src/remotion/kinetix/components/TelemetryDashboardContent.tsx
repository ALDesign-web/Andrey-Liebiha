import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";
import { KinetixWindowChrome } from "./KinetixWindowChrome";
import { TelemetryCounter } from "./TelemetryCounter";
import { AreaChartSvg } from "./AreaChartSvg";
import { ChannelAttributionList } from "./ChannelAttributionList";

export interface TelemetryDashboardContentProps {
  mode: "intro" | "macro" | "outro";
}

interface KpiCardSpec {
  label: string;
  fromValue: number;
  toValue: number;
  decimals: number;
  useGrouping?: boolean;
  suffix: string;
  deltaText: string;
  deltaColor: string;
}

const KPI_INTRO: readonly KpiCardSpec[] = [
  {
    label: "Cross-Channel Reach",
    fromValue: 2.84,
    toValue: 3.18,
    decimals: 2,
    suffix: "M",
    deltaText: "+24.6% vs 30d",
    deltaColor: KINETIX_COLORS.emerald,
  },
  {
    label: "Retention Velocity",
    fromValue: 6.1,
    toValue: 6.8,
    decimals: 1,
    suffix: "%",
    deltaText: "+1.9% vs 30d",
    deltaColor: KINETIX_COLORS.emerald,
  },
  {
    label: "Active Pipelines",
    fromValue: 15,
    toValue: 18,
    decimals: 0,
    suffix: "",
    deltaText: "4 automated",
    deltaColor: "#fb923c",
  },
  {
    label: "Published Reels & Shorts",
    fromValue: 1120,
    toValue: 1240,
    decimals: 0,
    useGrouping: true,
    suffix: "",
    deltaText: "+64 this week",
    deltaColor: KINETIX_COLORS.emerald,
  },
];

const KPI_MACRO_LIVE: readonly KpiCardSpec[] = [
  {
    label: "Cross-Channel Reach",
    fromValue: 3.18,
    toValue: 3.24,
    decimals: 2,
    suffix: "M",
    deltaText: "+25.4% vs 30d",
    deltaColor: KINETIX_COLORS.emerald,
  },
  {
    label: "Retention Velocity",
    fromValue: 6.8,
    toValue: 7.1,
    decimals: 1,
    suffix: "%",
    deltaText: "+2.2% vs 30d",
    deltaColor: KINETIX_COLORS.emerald,
  },
  {
    label: "Active Pipelines",
    fromValue: 18,
    toValue: 19,
    decimals: 0,
    suffix: "",
    deltaText: "5 automated",
    deltaColor: "#fb923c",
  },
  {
    label: "Published Reels & Shorts",
    fromValue: 1240,
    toValue: 1252,
    decimals: 0,
    useGrouping: true,
    suffix: "",
    deltaText: "+76 this week",
    deltaColor: KINETIX_COLORS.emerald,
  },
];

/**
 * Shared Kinetix Creator Telemetry Workbench used across Scene 1, Scene 2, and Scene 5.
 */
export const TelemetryDashboardContent: React.FC<
  TelemetryDashboardContentProps
> = ({ mode }) => {
  const frame = useCurrentFrame();

  const sidebarProgress =
    mode === "intro"
      ? interpolate(frame, [0, 45], [0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // In macro mode, highlight Instagram Reels (idx 0) then TikTok Spark Ads (idx 1) right after click press peak
  let activeChannelIdx = -1;
  if (mode === "macro") {
    if (frame >= 92 && frame < 138) activeChannelIdx = 0;
    else if (frame >= 138 && frame < 192) activeChannelIdx = 1;
  }

  const kpis = mode === "macro" ? KPI_MACRO_LIVE : KPI_INTRO;

  return (
    <KinetixWindowChrome sidebarItemProgress={sidebarProgress}>
      {/* Top 4 KPI Tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {kpis.map((kpi, idx) => {
          const cardStart = mode === "intro" ? idx * 6 : 0;
          const cardOpacity = 1;

          const cardScale =
            mode === "intro"
              ? interpolate(frame, [cardStart, cardStart + 24], [0.98, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                })
              : 1;

          // Subtle live pulse on KPI cards in macro phase when numbers tick up (frames 165-260)
          const liveGlowOpacity =
            mode === "macro"
              ? interpolate(
                  frame,
                  [160 + idx * 8, 190 + idx * 8, 250 + idx * 8],
                  [0, 1, 0.25],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                )
              : 0;

          const counterStart =
            mode === "intro"
              ? 8 + idx * 8
              : mode === "macro"
                ? 165 + idx * 10
                : 0;
          const counterEnd =
            mode === "intro"
              ? 95 + idx * 8
              : mode === "macro"
                ? 250 + idx * 10
                : 1;

          return (
            <div
              key={kpi.label}
              style={{
                borderRadius: 14,
                backgroundColor: KINETIX_COLORS.surfaceBase,
                border:
                  liveGlowOpacity > 0.2
                    ? `1px solid rgba(16, 185, 129, ${0.15 + liveGlowOpacity * 0.45})`
                    : `1px solid ${KINETIX_COLORS.borderSubtle}`,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 10,
                opacity: cardOpacity,
                scale: cardScale,
                boxShadow:
                  liveGlowOpacity > 0.2
                    ? `0 0 28px rgba(16, 185, 129, ${liveGlowOpacity * 0.12})`
                    : "none",
              }}
            >
              <div
                style={{
                  fontFamily: KINETIX_FONTS.sans,
                  fontSize: 13,
                  color: KINETIX_COLORS.textSecondary,
                }}
              >
                {kpi.label}
              </div>

              <TelemetryCounter
                fromValue={mode === "outro" ? kpi.toValue : kpi.fromValue}
                toValue={kpi.toValue}
                startFrame={counterStart}
                endFrame={counterEnd}
                decimals={kpi.decimals}
                useGrouping={kpi.useGrouping}
                suffix={kpi.suffix}
                fontSize={36}
              />

              <div
                style={{
                  fontFamily: KINETIX_FONTS.mono,
                  fontSize: 12,
                  fontWeight: 500,
                  color: kpi.deltaColor,
                }}
              >
                {kpi.deltaText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Split: Area Chart + Channel Attribution */}
      <div style={{ flex: 1, display: "flex", gap: 18, minHeight: 0 }}>
        <AreaChartSvg
          alreadyDrawn={mode !== "intro"}
          drawStartFrame={75}
          drawEndFrame={195}
          scrubStartFrame={mode === "macro" ? 15 : undefined}
          scrubEndFrame={mode === "macro" ? 105 : undefined}
        />
        <ChannelAttributionList
          alreadyVisible={mode !== "intro"}
          staggerStartFrame={105}
          activeIndex={activeChannelIdx}
        />
      </div>
    </KinetixWindowChrome>
  );
};
