import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  KINETIX_COLORS,
  KINETIX_SCENE_FRAMES,
  KINETIX_TRANSITION_FRAMES,
} from "./tokens";
import { Scene1TelemetryStage } from "./scenes/Scene1TelemetryStage";
import { Scene2MacroTelemetry } from "./scenes/Scene2MacroTelemetry";
import { Scene3RoutingGraph } from "./scenes/Scene3RoutingGraph";
import { Scene4BentoMicroUI } from "./scenes/Scene4BentoMicroUI";
import { Scene5LoopOutro } from "./scenes/Scene5LoopOutro";

/**
 * Master Kinetix AI Studio product reel composed via TransitionSeries.
 */
export const KinetixShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: KINETIX_COLORS.stageBg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="01 Studio Stage"
          durationInFrames={KINETIX_SCENE_FRAMES.scene1Stage}
        >
          <Scene1TelemetryStage />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: KINETIX_TRANSITION_FRAMES.t12,
          })}
        />

        <TransitionSeries.Sequence
          name="02 Macro Telemetry"
          durationInFrames={KINETIX_SCENE_FRAMES.scene2Macro}
        >
          <Scene2MacroTelemetry />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: KINETIX_TRANSITION_FRAMES.t23,
          })}
        />

        <TransitionSeries.Sequence
          name="03 Routing Graph"
          durationInFrames={KINETIX_SCENE_FRAMES.scene3Routing}
        >
          <Scene3RoutingGraph />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: KINETIX_TRANSITION_FRAMES.t34,
          })}
        />

        <TransitionSeries.Sequence
          name="04 Bento Micro-UI"
          durationInFrames={KINETIX_SCENE_FRAMES.scene4Bento}
        >
          <Scene4BentoMicroUI />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: KINETIX_TRANSITION_FRAMES.t45,
          })}
        />

        <TransitionSeries.Sequence
          name="05 Seamless Outro"
          durationInFrames={KINETIX_SCENE_FRAMES.scene5Outro}
        >
          <Scene5LoopOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
