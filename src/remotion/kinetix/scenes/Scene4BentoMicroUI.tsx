import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { StudioBackdrop } from "../components/StudioBackdrop";
import { AnimatedCursor, CursorWaypoint } from "../components/AnimatedCursor";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

const RETENTION_BARS = [
  { height: 74, active: false },
  { height: 126, active: false },
  { height: 214, active: true },
  { height: 164, active: false },
  { height: 186, active: false },
] as const;

const TAG_ROWS = [
  ["#instagram", "#reels", "#creator", "#youtube", "#node", "#hooks"],
  ["#tiktok", "#shorts", "#retention", "#workflow", "#analytics", "#clips"],
  ["#threads", "#carousel", "#synthesis", "#topics", "#growth", "#studio"],
] as const;

const PROMPT_TEXT = "add a new background";

const BENTO_CURSOR_WAYPOINTS: readonly CursorWaypoint[] = [
  { frame: 48, x: 1040, y: 120 },
  { frame: 80, x: 935, y: 218 },
  { frame: 102, x: 935, y: 218 },
  { frame: 155, x: 560, y: 545 },
  { frame: 182, x: 652, y: 545 },
  { frame: 206, x: 652, y: 545 },
];

/**
 * Isolated Cohort Retention Bars leaf component.
 */
const CohortRetentionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const badgeScale = interpolate(frame, [46, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 140 }),
  });

  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#0c0d12",
        border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bar Chart Visual */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 22,
          paddingBottom: 24,
          position: "relative",
        }}
      >
        {RETENTION_BARS.map((bar, idx) => {
          const barProgress = interpolate(
            frame,
            [12 + idx * 6, 46 + idx * 6],
            [0.08, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 160 }),
            }
          );

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                position: "relative",
              }}
            >
              {bar.active && (
                <div
                  style={{
                    padding: "5px 12px",
                    borderRadius: 9,
                    backgroundColor: "#a78bfa",
                    color: "#090a0f",
                    fontFamily: KINETIX_FONTS.mono,
                    fontSize: 13,
                    fontWeight: 700,
                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.45)",
                    scale: badgeScale,
                  }}
                >
                  ▲ 2K
                </div>
              )}
              <div
                style={{
                  width: 52,
                  height: bar.height * barProgress,
                  borderRadius: "26px 26px 12px 12px",
                  background: bar.active
                    ? "linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)"
                    : "linear-gradient(180deg, #272935 0%, #1c1e27 100%)",
                  boxShadow: bar.active
                    ? "0 0 36px rgba(139, 92, 246, 0.35)"
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Card Copy */}
      <div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: KINETIX_COLORS.textPrimary,
            marginBottom: 8,
          }}
        >
          Cohort Retention Signals
        </div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 15,
            lineHeight: 1.5,
            color: KINETIX_COLORS.textSecondary,
          }}
        >
          Track drop-off frames, completion loops, and surface highest-leverage creative variants.
        </div>
      </div>
    </div>
  );
};

/**
 * Isolated Token & Command Action Card leaf component.
 */
const TokenCommandCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Click happens at frame 86
  const btnPress = interpolate(frame, [84, 88, 96], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const isOptimized = frame >= 92;
  const statusOpacity = interpolate(frame, [92, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#0c0d12",
        border: isOptimized
          ? "1px solid rgba(139, 92, 246, 0.45)"
          : `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Token Metadata */}
      <div
        style={{
          fontFamily: KINETIX_FONTS.mono,
          fontSize: 13.5,
          lineHeight: 1.75,
          color: KINETIX_COLORS.textMuted,
        }}
      >
        <div>
          surface.elevated:{" "}
          <span style={{ color: KINETIX_COLORS.textSecondary }}>#0e1017</span>{" "}
          | accent.signal:{" "}
          <span style={{ color: KINETIX_COLORS.signalOrange }}>#ff7235</span>
        </div>
        <div>
          cohort.retention.velocity -&gt;{" "}
          <span
            style={{
              color: isOptimized ? KINETIX_COLORS.emerald : "#a78bfa",
            }}
          >
            {isOptimized ? "+14.2% hook calibrated" : "adaptive tone calibration"}
          </span>
        </div>
      </div>

      {/* Center Action Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          margin: "12px 0",
        }}
      >
        <div
          style={{
            padding: "16px 30px",
            borderRadius: 14,
            background: isOptimized
              ? "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)"
              : "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
            border: "1px solid rgba(196, 181, 253, 0.4)",
            boxShadow: isOptimized
              ? "0 12px 34px rgba(139, 92, 246, 0.45)"
              : "0 8px 24px rgba(109, 40, 217, 0.25)",
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 18,
            fontWeight: 600,
            color: "#ffffff",
            scale: btnPress,
          }}
        >
          ✦ {isOptimized ? "Hook & Tone Calibrated" : "Optimize Hook & Tone"}
        </div>

        {isOptimized && (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 9999,
              backgroundColor: KINETIX_COLORS.emeraldSoft,
              border: "1px solid rgba(16, 185, 129, 0.35)",
              fontFamily: KINETIX_FONTS.mono,
              fontSize: 12.5,
              fontWeight: 600,
              color: "#34d399",
              opacity: statusOpacity,
            }}
          >
            AA/AAA Verified
          </span>
        )}
      </div>

      {/* Bottom Token Footer */}
      <div
        style={{
          fontFamily: KINETIX_FONTS.mono,
          fontSize: 12.5,
          color: KINETIX_COLORS.textMuted,
        }}
      >
        contrast.wcag: AAA 14.2:1 | radius.lock: 14px | grid.unit: 8pt
      </div>
    </div>
  );
};

/**
 * Isolated Visual Asset Synthesis Card leaf component.
 */
const AssetSynthesisCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Typing animation frames 115..165
  const charsShown = Math.floor(
    interpolate(frame, [115, 165], [0, PROMPT_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = PROMPT_TEXT.slice(0, charsShown);

  // Generate click at frame 188
  const genBtnScale = interpolate(frame, [186, 190, 198], [1, 0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const framesGenerated = frame >= 195;
  const card1Scale = interpolate(frame, [196, 224], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 150 }),
  });
  const card2Scale = interpolate(frame, [206, 236], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 150 }),
  });
  const cardsOpacity = interpolate(frame, [196, 214], [0.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#0c0d12",
        border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "26px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 18,
      }}
    >
      {/* Inner Modal */}
      <div
        style={{
          borderRadius: 14,
          backgroundColor: "#11131b",
          border: `1px solid ${KINETIX_COLORS.borderStrong}`,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 13,
            color: KINETIX_COLORS.textSecondary,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: KINETIX_COLORS.textPrimary,
                fontWeight: 500,
              }}
            >
              ✦ Create
            </span>
            <span>Upload</span>
            <span>+ Custom</span>
          </div>
          <span style={{ color: KINETIX_COLORS.textMuted }}>×</span>
        </div>

        {/* Prompt Input & Generate Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              flex: 1,
              height: 36,
              padding: "0 12px",
              borderRadius: 8,
              backgroundColor: "#090a0e",
              border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              fontFamily: KINETIX_FONTS.sans,
              fontSize: 13.5,
              color: KINETIX_COLORS.textPrimary,
            }}
          >
            {typedText || (
              <span style={{ color: KINETIX_COLORS.textMuted }}>
                Describe story backdrop...
              </span>
            )}
            {frame >= 115 && frame <= 178 && (
              <span
                style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 15,
                  backgroundColor: "#a78bfa",
                  marginLeft: 2,
                }}
              />
            )}
          </div>
          <div
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              backgroundColor: framesGenerated ? "#7c3aed" : "#222532",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              display: "flex",
              alignItems: "center",
              fontFamily: KINETIX_FONTS.sans,
              fontSize: 13,
              fontWeight: 600,
              color: "#ffffff",
              scale: genBtnScale,
            }}
          >
            Generate
          </div>
        </div>

        {/* Synthesized Story Frames */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            opacity: cardsOpacity,
          }}
        >
          <div
            style={{
              height: 108,
              borderRadius: 10,
              background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: framesGenerated ? card1Scale : 0.96,
              boxShadow: framesGenerated
                ? "0 10px 26px rgba(56, 189, 248, 0.25)"
                : "none",
            }}
          >
            <div
              style={{
                width: 48,
                height: 68,
                borderRadius: 7,
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            />
          </div>
          <div
            style={{
              height: 108,
              borderRadius: 10,
              background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: framesGenerated ? card2Scale : 0.96,
              boxShadow: framesGenerated
                ? "0 10px 26px rgba(139, 92, 246, 0.3)"
                : "none",
            }}
          >
            <div
              style={{
                width: 48,
                height: 68,
                borderRadius: 7,
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Card Copy */}
      <div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: KINETIX_COLORS.textPrimary,
            marginBottom: 6,
          }}
        >
          Visual Asset Synthesis
        </div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 15,
            lineHeight: 1.45,
            color: KINETIX_COLORS.textSecondary,
          }}
        >
          Generate vertical story frames and adaptive backdrops with locked AA/AAA surface contrast.
        </div>
      </div>
    </div>
  );
};

/**
 * Isolated Semantic Tag & Topic Clustering Radar Card leaf component.
 */
const SemanticTagRadarCard: React.FC = () => {
  const frame = useCurrentFrame();

  const pulsePhase = interpolate(frame, [20, 310], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) % 1;

  const ringScale = 0.75 + pulsePhase * 0.75;
  const ringOpacity = (1 - pulsePhase) * 0.55;

  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: "#0c0d12",
        border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
        padding: "26px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Tag Cloud + Concentric Radar */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
          position: "relative",
        }}
      >
        {TAG_ROWS.map((row, rIdx) => (
          <div
            key={rIdx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: rIdx === 1 ? 26 : 0,
              paddingRight: rIdx === 1 ? 10 : 18,
            }}
          >
            {row.map((tag, tIdx) => {
              const distFromCenter = Math.abs(tIdx - 2.5) + Math.abs(rIdx - 1);
              const waveHighlight = Math.max(
                0,
                1 - Math.abs(pulsePhase * 4 - distFromCenter) * 0.85
              );

              return (
                <span
                  key={tag}
                  style={{
                    fontFamily: KINETIX_FONTS.mono,
                    fontSize: 15,
                    color:
                      waveHighlight > 0.35
                        ? "#e9d5ff"
                        : "rgba(255, 255, 255, 0.22)",
                    opacity: 0.45 + waveHighlight * 0.55,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        ))}

        {/* Concentric Radar Rings & # Hub */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 190,
              height: 190,
              borderRadius: "9999px",
              border: "1px solid rgba(167, 139, 250, 0.35)",
              scale: ringScale,
              opacity: ringOpacity,
            }}
          />
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.035)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "9999px",
                  backgroundColor: "#2e313d",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: KINETIX_FONTS.sans,
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                #
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Copy */}
      <div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: KINETIX_COLORS.textPrimary,
            marginBottom: 6,
          }}
        >
          Semantic Tag &amp; Topic Clustering
        </div>
        <div
          style={{
            fontFamily: KINETIX_FONTS.sans,
            fontSize: 15,
            lineHeight: 1.45,
            color: KINETIX_COLORS.textSecondary,
          }}
        >
          Context-aware audience affinity scoring and reach-weighted topic recommendations calibrated for high-retention mobile feeds.
        </div>
      </div>
    </div>
  );
};

/**
 * Scene 4: Modular Dark-Surface Bento & AI Asset Synthesis Micro-Interactions.
 */
export const Scene4BentoMicroUI: React.FC = () => {
  const frame = useCurrentFrame();

  // Gentle StorageBox-style camera glide across the bento modules
  const camScale = interpolate(
    frame,
    [0, 70, 145, 225, 330],
    [0.98, 1.07, 1.09, 1.07, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    }
  );

  const camX = interpolate(frame, [0, 85, 195, 330], [0, -48, 42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const camY = interpolate(frame, [0, 85, 195, 330], [0, 46, -54, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  return (
    <AbsoluteFill>
      <StudioBackdrop accent="violet" />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Bento Grid Rig"
          style={{
            position: "relative",
            width: 1520,
            height: 860,
            scale: camScale,
            translate: `${camX}px ${camY}px`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 22,
          }}
        >
          <CohortRetentionCard />
          <TokenCommandCard />
          <AssetSynthesisCard />
          <SemanticTagRadarCard />

          {/* Cursor locked inside Bento coordinate plane */}
          <AnimatedCursor
            waypoints={BENTO_CURSOR_WAYPOINTS}
            clickFrames={[86, 188]}
            fadeInRange={[44, 58]}
            fadeOutRange={[228, 250]}
          />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
