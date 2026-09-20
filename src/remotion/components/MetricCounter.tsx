import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface MetricCounterProps {
  startValue?: number;
  endValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  durationFrames?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  startValue = 0,
  endValue,
  decimals = 1,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const springProgress = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 18,
      stiffness: 80,
      mass: 0.9
    }
  });

  const rawValue = interpolate(
    springProgress,
    [0, 1],
    [startValue, endValue],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }
  );

  const formattedNumber = rawValue.toFixed(decimals);

  return (
    <span
      className={`font-mono tabular-nums tracking-tight ${className}`}
      style={{
        ...style,
        willChange: "transform, opacity"
      }}
    >
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
