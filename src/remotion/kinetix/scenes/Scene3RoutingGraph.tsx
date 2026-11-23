import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { StudioBackdrop } from "../components/StudioBackdrop";
import { RoutingNodeGraph } from "../components/RoutingNodeGraph";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

/**
 * Scene 3: Multi-Channel Routing Graph with animated paths and luminous data packets.
 */
export const Scene3RoutingGraph: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [6, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const headerTranslateY = interpolate(frame, [6, 30], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const graphScale = interpolate(frame, [0, 270], [0.95, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const graphOpacity = interpolate(frame, [0, 22], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <StudioBackdrop accent="violet" showDots={false} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "48px 80px",
        }}
      >
        {/* Minimalist Section Heading matching crop_node_flow.webp */}
        <Interactive.Div
          name="Routing Header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: headerOpacity,
            translate: `0px ${headerTranslateY}px`,
          }}
        >
          <span
            style={{
              fontFamily: KINETIX_FONTS.mono,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#fb923c",
              textTransform: "uppercase",
            }}
          >
            MULTI-CHANNEL ROUTING · AUTOMATED NODE GRAPH
          </span>
          <div
            style={{
              fontFamily: KINETIX_FONTS.sans,
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: KINETIX_COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            Event-driven asset pipelines connecting briefs, formats, and analytics endpoints
          </div>
        </Interactive.Div>

        {/* Vector Node Routing Graph */}
        <Interactive.Div
          name="Routing Node Graph"
          style={{
            scale: graphScale,
            opacity: graphOpacity,
          }}
        >
          <RoutingNodeGraph />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
