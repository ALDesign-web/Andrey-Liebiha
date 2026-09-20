export interface VideoTheme {
  bg: string;
  cardBg: string;
  border: string;
  primary: string;
  accent: string;
  emerald: string;
  textMuted: string;
  textLight: string;
}

export const THEME: VideoTheme = {
  bg: "#07080C",
  cardBg: "rgba(13, 16, 23, 0.85)",
  border: "rgba(59, 130, 246, 0.2)",
  primary: "#3B82F6",
  accent: "#60A5FA",
  emerald: "#10B981",
  textMuted: "#94A3B8",
  textLight: "#F8FAFC"
};

export const FPS = 60;

// Total length: 40 seconds = 2400 frames
export const SCENE_DURATIONS = {
  scene1Hero: 420,        // 7.0s (0 - 420)
  scene2Funnel: 480,      // 8.0s (420 - 900)
  scene3Immersion: 540,   // 9.0s (900 - 1440)
  scene4Checkout: 480,    // 8.0s (1440 - 1920)
  scene5Impact: 480       // 8.0s (1920 - 2400)
};

export const TOTAL_FRAMES = 
  SCENE_DURATIONS.scene1Hero +
  SCENE_DURATIONS.scene2Funnel +
  SCENE_DURATIONS.scene3Immersion +
  SCENE_DURATIONS.scene4Checkout +
  SCENE_DURATIONS.scene5Impact; // 2400 frames
