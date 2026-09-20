import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightColor?: string;
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  highlightColor = "#3B82F6",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      className={`inline-flex flex-wrap gap-x-2 gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * 4;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: {
            damping: 14,
            stiffness: 120,
            mass: 0.8
          }
        });

        const opacity = Math.min(Math.max(progress, 0), 1);
        const translateY = (1 - progress) * 24;
        const blur = (1 - progress) * 8;
        const isHighlighted = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span
            key={index}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              filter: `blur(${blur}px)`,
              color: isHighlighted ? highlightColor : "inherit",
              display: "inline-block",
              willChange: "transform, opacity, filter"
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
