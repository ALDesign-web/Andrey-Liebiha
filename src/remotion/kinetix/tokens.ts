export const KINETIX_FPS = 60;
export const KINETIX_WIDTH = 1920;
export const KINETIX_HEIGHT = 1080;

export const KINETIX_COLORS = {
  stageBg: "#07080a",
  windowBg: "#0a0b0e",
  surfaceBase: "#0e1015",
  surfaceElevated: "#12141a",
  surfaceHighlight: "#171a22",
  borderSubtle: "rgba(255, 255, 255, 0.085)",
  borderStrong: "rgba(255, 255, 255, 0.16)",
  signalOrange: "#ff7235",
  signalOrangeSoft: "rgba(255, 114, 53, 0.16)",
  emerald: "#10b981",
  emeraldSoft: "rgba(16, 185, 129, 0.16)",
  violet: "#8b5cf6",
  violetDeep: "#7c3aed",
  violetSoft: "rgba(139, 92, 246, 0.18)",
  cyan: "#38bdf8",
  textPrimary: "#f4f5f7",
  textSecondary: "#9ca3af",
  textMuted: "#6b7280",
} as const;

export const KINETIX_FONTS = {
  sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

export const KINETIX_SCENE_FRAMES = {
  scene1Stage: 270, // 4.5s
  scene2Macro: 300, // 5.0s
  scene3Routing: 270, // 4.5s
  scene4Bento: 330, // 5.5s
  scene5Outro: 210, // 3.5s
} as const;

export const KINETIX_TRANSITION_FRAMES = {
  t12: 18,
  t23: 20,
  t34: 20,
  t45: 20,
} as const;

export const KINETIX_TOTAL_FRAMES =
  KINETIX_SCENE_FRAMES.scene1Stage +
  KINETIX_SCENE_FRAMES.scene2Macro +
  KINETIX_SCENE_FRAMES.scene3Routing +
  KINETIX_SCENE_FRAMES.scene4Bento +
  KINETIX_SCENE_FRAMES.scene5Outro -
  KINETIX_TRANSITION_FRAMES.t12 -
  KINETIX_TRANSITION_FRAMES.t23 -
  KINETIX_TRANSITION_FRAMES.t34 -
  KINETIX_TRANSITION_FRAMES.t45; // 1302 frames (~21.7s at 60fps)
