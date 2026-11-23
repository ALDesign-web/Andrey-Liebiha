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

/**
 * Scene 1: Straight-on (0deg) close-up on Kinetix STUDIO header & KPIs,
 * panning across the telemetry strip and pulling out to reveal the full workbench.
 */
export const Scene1TelemetryStage: React.FC = () => {
  const frame = useCurrentFrame();

  // Close-up opening (scale 1.46) -> pan across KPIs (f=105) -> pull-out full view (f=230) -> subtle push
  const rigScale = interpolate(
    frame,
    [0, 105, 230, 270],
    [1.46, 1.32, 1.0, 1.02],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.37, 0, 0.63, 1),
    }
  );

  const camX = interpolate(frame, [0, 105, 230, 270], [235, -35, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.37, 0, 0.63, 1),
  });

  const camY = interpolate(frame, [0, 105, 230, 270], [175, 135, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.37, 0, 0.63, 1),
  });

  // Subtle rim light sweep across top bezel
  const sheenX = interpolate(frame, [25, 190], [-600, 1650], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

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
          name="Telemetry Straight Stage"
          style={{
            position: "relative",
            width: 1520,
            height: 880,
            translate: `${camX}px ${camY}px`,
            scale: rigScale,
          }}
        >
          <TelemetryDashboardContent mode="intro" />

          {/* Subtle Specular Bezel Sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -120,
                left: 0,
                width: 340,
                height: 1120,
                translate: `${sheenX}px 0px`,
                rotate: "18deg",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.045) 50%, transparent 100%)",
              }}
            />
          </div>
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
