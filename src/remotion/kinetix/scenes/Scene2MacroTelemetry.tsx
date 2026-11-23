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
import { AnimatedCursor, CursorWaypoint } from "../components/AnimatedCursor";

const MACRO_CURSOR_WAYPOINTS: readonly CursorWaypoint[] = [
  { frame: 10, x: 460, y: 550 },
  { frame: 55, x: 920, y: 465 },
  { frame: 84, x: 1275, y: 406 },
  { frame: 108, x: 1275, y: 406 },
  { frame: 130, x: 1275, y: 481 },
  { frame: 158, x: 1275, y: 481 },
];

/**
 * Scene 2: Straight-on (0deg) macro camera push-in on Performance Overview,
 * Channel Attribution rows, and live-ticking KPI cards.
 */
export const Scene2MacroTelemetry: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase A (0..110): Push straight into lower-right chart + channel attribution
  // Phase B (150..250): Pan smoothly up-left to top KPI strip as metrics live-tick
  const camScale = interpolate(
    frame,
    [0, 110, 150, 250, 300],
    [1.02, 1.38, 1.38, 1.44, 1.36],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    }
  );

  const camX = interpolate(
    frame,
    [0, 110, 150, 250, 300],
    [0, -165, -165, 80, 50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    }
  );

  const camY = interpolate(
    frame,
    [0, 110, 150, 250, 300],
    [0, -100, -100, 175, 140],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    }
  );

  return (
    <AbsoluteFill>
      <StudioBackdrop accent="orange" />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Interactive.Div
          name="Macro Telemetry Rig"
          style={{
            position: "relative",
            width: 1520,
            height: 880,
            translate: `${camX}px ${camY}px`,
            scale: camScale,
          }}
        >
          <TelemetryDashboardContent mode="macro" />

          {/* Cursor lives inside the 1520x880 UI plane to remain locked to elements */}
          <AnimatedCursor
            waypoints={MACRO_CURSOR_WAYPOINTS}
            clickFrames={[90, 136]}
            fadeInRange={[8, 22]}
            fadeOutRange={[160, 178]}
          />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
