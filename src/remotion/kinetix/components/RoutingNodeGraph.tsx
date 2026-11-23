import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";

interface NodePathSpec {
  id: string;
  d: string;
  nodeCx: number;
  nodeCy: number;
  kind: "input" | "output";
  icon: "image" | "bolt" | "radar" | "brief" | "music" | "wand";
}

// 1440x680 coordinate space matching crop_node_flow.webp geometry
const NODE_PATHS: readonly NodePathSpec[] = [
  {
    id: "in-top",
    d: "M 180 120 L 420 120 L 530 292 L 642 292",
    nodeCx: 140,
    nodeCy: 120,
    kind: "input",
    icon: "image",
  },
  {
    id: "in-mid",
    d: "M 300 340 L 642 340",
    nodeCx: 260,
    nodeCy: 340,
    kind: "input",
    icon: "bolt",
  },
  {
    id: "in-bot",
    d: "M 160 560 L 420 560 L 530 388 L 642 388",
    nodeCx: 120,
    nodeCy: 560,
    kind: "input",
    icon: "radar",
  },
  {
    id: "out-top",
    d: "M 798 292 L 910 292 L 1020 120 L 1260 120",
    nodeCx: 1300,
    nodeCy: 120,
    kind: "output",
    icon: "brief",
  },
  {
    id: "out-mid",
    d: "M 798 340 L 1140 340",
    nodeCx: 1180,
    nodeCy: 340,
    kind: "output",
    icon: "music",
  },
  {
    id: "out-bot",
    d: "M 798 388 L 910 388 L 1020 560 L 1280 560",
    nodeCx: 1320,
    nodeCy: 560,
    kind: "output",
    icon: "wand",
  },
];

const PATH_LENGTHS = NODE_PATHS.map((p) => getLength(p.d));

const NodeIconGlyph: React.FC<{ icon: NodePathSpec["icon"] }> = ({ icon }) => {
  switch (icon) {
    case "image":
      return (
        <g>
          <rect
            x="-12"
            y="-10"
            width="24"
            height="20"
            rx="4"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <circle cx="-5" cy="-3" r="2.2" fill="#ffffff" />
          <path
            d="M-9 7L-2 0L4 5L8 2L11 7"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "bolt":
      return (
        <path
          d="M2 -13L-9 2H0L-2 13L9 -2H0L2 -13Z"
          fill="#ffffff"
          strokeLinejoin="round"
        />
      );
    case "radar":
      return (
        <g>
          <circle
            cx="0"
            cy="0"
            r="11"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <circle
            cx="0"
            cy="0"
            r="5.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>
      );
    case "brief":
      return (
        <g>
          <path
            d="M-12 -9H-2C0 -9 1 -7 1 -5V10C1 8 -1 7 -3 7H-12V-9Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M12 -9H2C0 -9 -1 -7 -1 -5V10C-1 8 1 7 3 7H12V-9Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
        </g>
      );
    case "music":
      return (
        <path
          d="M-5 9V-9L10 -12V6M-5 9C-5 11.2 -7.2 13 -9.5 13C-11.8 13 -13 11.2 -13 9C-13 6.8 -11.2 5 -9.5 5C-7.2 5 -5 6.8 -5 9ZM10 6C10 8.2 7.8 10 5.5 10C3.2 10 2 8.2 2 6C2 3.8 3.8 2 5.5 2C7.8 2 10 3.8 10 6Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "wand":
      return (
        <g>
          <path
            d="M-10 10L6 -6"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M4 -12L5.5 -8.5L9 -7L5.5 -5.5L4 -2L2.5 -5.5L-1 -7L2.5 -8.5L4 -12Z"
            fill="#ffffff"
          />
        </g>
      );
  }
};

/**
 * Vector Multi-Channel Routing Graph with animated traces, glowing data packets, and pulsing core.
 */
export const RoutingNodeGraph: React.FC = () => {
  const frame = useCurrentFrame();

  // Trace draw-on progress (0..65 frames)
  const inputTraceDraw = interpolate(frame, [10, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const outputTraceDraw = interpolate(frame, [42, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Central chip charge-up
  const coreScale = interpolate(frame, [30, 75], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 160 }),
  });

  // Periodic pulse on core when packets arrive
  const corePulse =
    1 +
    0.045 *
      Math.max(
        0,
        Math.sin(
          interpolate(frame, [85, 250], [0, Math.PI * 5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        )
      );

  // Traveling packet cycle (two waves across frames 65..260)
  const inputPacketProgress = interpolate(frame, [62, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outputPacketProgress = interpolate(frame, [118, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const inputWave2 = interpolate(frame, [140, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outputWave2 = interpolate(frame, [195, 265], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1440,
        height: 680,
        position: "relative",
        borderRadius: 24,
        backgroundColor: "#090a0e",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8)",
        overflow: "hidden",
      }}
    >
      {/* Radial Violet Dot Matrix Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(139, 92, 246, 0.32) 3.2px, transparent 3.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 68% 72% at 50% 50%, black 35%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 72% at 50% 50%, black 35%, transparent 92%)",
          opacity: 0.65,
        }}
      />

      {/* Center Violet Aura */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 460,
          height: 460,
          translate: "-50% -50%",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 68%)",
        }}
      />

      <svg
        width="1440"
        height="680"
        viewBox="0 0 1440 680"
        style={{ position: "relative", zIndex: 2 }}
      >
        <defs>
          <filter id="kinetixPacketGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="kinetixChipGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
        </defs>

        {/* Base dim tracks */}
        {NODE_PATHS.map((p) => (
          <path
            key={`${p.id}-base`}
            d={p.d}
            fill="none"
            stroke="rgba(139, 92, 246, 0.18)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        ))}

        {/* Active Animated Traces */}
        {NODE_PATHS.map((p, idx) => {
          const progress = p.kind === "input" ? inputTraceDraw : outputTraceDraw;
          const evolved = evolvePath(progress, p.d);

          const waveA =
            p.kind === "input" ? inputPacketProgress : outputPacketProgress;
          const waveB = p.kind === "input" ? inputWave2 : outputWave2;

          const activePacketT =
            waveA > 0 && waveA < 1
              ? waveA
              : waveB > 0 && waveB < 1
                ? waveB
                : null;

          const packetPos =
            activePacketT !== null
              ? getPointAtLength(p.d, PATH_LENGTHS[idx] * activePacketT)
              : null;

          // Node ring entrance
          const nodeEnter = interpolate(
            frame,
            [p.kind === "input" ? idx * 6 : 50 + (idx - 3) * 6, (p.kind === "input" ? idx * 6 : 50 + (idx - 3) * 6) + 22],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 160 }),
            }
          );

          // Output node hit flash when wave arrives
          const hitPulse =
            p.kind === "output"
              ? interpolate(frame, [188, 200, 224], [0, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 0;

          return (
            <g key={p.id}>
              <path
                d={p.d}
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeDasharray={evolved.strokeDasharray}
                strokeDashoffset={evolved.strokeDashoffset}
                opacity={0.9}
              />

              {/* Moving Data Packet */}
              {packetPos && (
                <g filter="url(#kinetixPacketGlow)">
                  <circle
                    cx={packetPos.x}
                    cy={packetPos.y}
                    r="8"
                    fill="rgba(196, 181, 253, 0.45)"
                  />
                  <circle
                    cx={packetPos.x}
                    cy={packetPos.y}
                    r="4"
                    fill="#ffffff"
                  />
                </g>
              )}

              {/* Circular Endpoint Node */}
              <g
                transform={`translate(${p.nodeCx}, ${p.nodeCy}) scale(${nodeEnter})`}
              >
                {hitPulse > 0.02 && (
                  <circle
                    cx="0"
                    cy="0"
                    r={44 + hitPulse * 18}
                    fill="none"
                    stroke={`rgba(167, 139, 250, ${0.75 * (1 - hitPulse)})`}
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r="44"
                  fill="rgba(12, 14, 22, 0.9)"
                  stroke="rgba(167, 139, 250, 0.4)"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="30" fill="#7c3aed" />
                <NodeIconGlyph icon={p.icon} />
              </g>
            </g>
          );
        })}

        {/* Central Kinetix Processor Chip */}
        <g transform={`translate(720, 340) scale(${coreScale * corePulse})`}>
          {/* Chip Pins Left & Right */}
          {[-48, -24, 0, 24, 48].map((py) => (
            <g key={py}>
              <rect
                x="-90"
                y={py - 4}
                width="16"
                height="8"
                rx="2"
                fill="rgba(139, 92, 246, 0.45)"
              />
              <rect
                x="74"
                y={py - 4}
                width="16"
                height="8"
                rx="2"
                fill="rgba(139, 92, 246, 0.45)"
              />
            </g>
          ))}
          {/* Chip Pins Top & Bottom */}
          {[-48, -24, 0, 24, 48].map((px) => (
            <g key={px}>
              <rect
                x={px - 4}
                y="-90"
                width="8"
                height="16"
                rx="2"
                fill="rgba(139, 92, 246, 0.45)"
              />
              <rect
                x={px - 4}
                y="74"
                width="8"
                height="16"
                rx="2"
                fill="rgba(139, 92, 246, 0.45)"
              />
            </g>
          ))}

          {/* Outer Bezel */}
          <rect
            x="-76"
            y="-76"
            width="152"
            height="152"
            rx="28"
            fill="#11131c"
            stroke="rgba(167, 139, 250, 0.55)"
            strokeWidth="2"
          />
          {/* Inner Chip Body */}
          <rect
            x="-58"
            y="-58"
            width="116"
            height="116"
            rx="22"
            fill="url(#kinetixChipGrad)"
          />
          {/* Kinetix Diamond Emblem */}
          <path
            d="M 0 -24 L 24 0 L 0 24 L -24 0 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="7.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
