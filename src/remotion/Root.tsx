import React from "react";
import { Composition, Folder } from "remotion";
import { BookifyVideo } from "./BookifyVideo";
import { FPS, TOTAL_FRAMES } from "./types";
import { KinetixShowcase } from "./kinetix/KinetixShowcase";
import { Scene1TelemetryStage } from "./kinetix/scenes/Scene1TelemetryStage";
import { Scene2MacroTelemetry } from "./kinetix/scenes/Scene2MacroTelemetry";
import { Scene3RoutingGraph } from "./kinetix/scenes/Scene3RoutingGraph";
import { Scene4BentoMicroUI } from "./kinetix/scenes/Scene4BentoMicroUI";
import { Scene5LoopOutro } from "./kinetix/scenes/Scene5LoopOutro";
import "../app/globals.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BookifyCaseStudy"
        component={BookifyVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      <Folder name="KinetixAI">
        <Composition
          id="KinetixShowcase"
          component={KinetixShowcase}
          durationInFrames={1302}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="KinetixScene1Stage"
          component={Scene1TelemetryStage}
          durationInFrames={270}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="KinetixScene2Macro"
          component={Scene2MacroTelemetry}
          durationInFrames={300}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="KinetixScene3Routing"
          component={Scene3RoutingGraph}
          durationInFrames={270}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="KinetixScene4Bento"
          component={Scene4BentoMicroUI}
          durationInFrames={330}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
        <Composition
          id="KinetixScene5Outro"
          component={Scene5LoopOutro}
          durationInFrames={210}
          fps={60}
          width={1920}
          height={1080}
          defaultProps={{}}
        />
      </Folder>
    </>
  );
};
