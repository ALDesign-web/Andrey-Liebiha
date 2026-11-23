import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

export interface TelemetryCounterProps {
  /** Base numeric value */
  fromValue: number;
  /** Target numeric value */
  toValue: number;
  /** Start frame for the interpolation */
  startFrame: number;
  /** End frame for the interpolation */
  endFrame: number;
  decimals?: number;
  useGrouping?: boolean;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: number;
}

/**
 * Isolated frame-driven tabular-nums counter.
 * Keeps useCurrentFrame() scoped to the numeric node only.
 */
export const TelemetryCounter: React.FC<TelemetryCounterProps> = ({
  fromValue,
  toValue,
  startFrame,
  endFrame,
  decimals = 0,
  useGrouping = false,
  prefix = "",
  suffix = "",
  color = KINETIX_COLORS.textPrimary,
  fontSize = 40,
}) => {
  const frame = useCurrentFrame();

  const val = interpolate(frame, [startFrame, endFrame], [fromValue, toValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });

  return (
    <span
      style={{
        fontFamily: KINETIX_FONTS.sans,
        fontSize,
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.025em",
        fontVariantNumeric: "tabular-nums",
        color,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
