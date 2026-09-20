import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Hero } from "./scenes/Scene1Hero";
import { Scene2Funnel } from "./scenes/Scene2Funnel";
import { Scene3Immersion } from "./scenes/Scene3Immersion";
import { Scene4Checkout } from "./scenes/Scene4Checkout";
import { Scene5Impact } from "./scenes/Scene5Impact";
import { SCENE_DURATIONS } from "./types";

export const BookifyVideo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-[#07080C] text-white">
      <Series>
        {/* Scene 1: Executive Summary & Hero Hook (7s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene1Hero}>
          <Scene1Hero />
        </Series.Sequence>

        {/* Scene 2: 4-Stage Funnel Architecture & CRO Diagnostic (8s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene2Funnel}>
          <Scene2Funnel />
        </Series.Sequence>

        {/* Scene 3: Deep Dive: Catalog & Double-Spread Book Preview (9s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene3Immersion}>
          <Scene3Immersion />
        </Series.Sequence>

        {/* Scene 4: Zero-Friction Express 1-Tap Checkout (8s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene4Checkout}>
          <Scene4Checkout />
        </Series.Sequence>

        {/* Scene 5: Final CRO Impact & Design Tokens Outro (8s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.scene5Impact}>
          <Scene5Impact />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
