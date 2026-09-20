import React from "react";
import { Composition } from "remotion";
import { BookifyVideo } from "./BookifyVideo";
import { FPS, TOTAL_FRAMES } from "./types";
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
    </>
  );
};
