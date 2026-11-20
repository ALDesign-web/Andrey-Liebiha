"use client";

export type TactileSoundVariant =
  | "ivory"
  | "jade"
  | "stone"
  | "toggle-on"
  | "toggle-off"
  | "shuffle";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextCtor();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Synthesizes subtle physical audio feedback for tactile UI interactions
 * (carved bone tiles, polished jade stones, mechanical toggle clicks).
 */
export function playTactileSound(variant: TactileSoundVariant, enabled = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Short noise burst for physical surface impact
    const noiseDuration = variant === "shuffle" ? 0.085 : 0.04;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * noiseDuration));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp((-i / bufferSize) * 4.5);
      channelData[i] = (Math.random() * 2 - 1) * decay;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = variant === "jade" ? 4.2 : 2.6;
    bandpass.frequency.setValueAtTime(
      variant === "jade"
        ? 1450
        : variant === "ivory"
          ? 1100
          : variant === "shuffle"
            ? 900
            : variant === "toggle-on"
              ? 1650
              : 1050,
      now
    );

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(variant === "shuffle" ? 0.09 : 0.06, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);

    // 2. Resonant tonal body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    const startFreq =
      variant === "jade"
        ? 780
        : variant === "ivory"
          ? 560
          : variant === "stone"
            ? 340
            : variant === "toggle-on"
              ? 640
              : variant === "toggle-off"
                ? 440
                : 490;
    const endFreq =
      variant === "toggle-on"
        ? 920
        : variant === "toggle-off"
          ? 310
          : variant === "shuffle"
            ? 740
            : startFreq * 0.58;

    const toneDur = variant === "shuffle" ? 0.08 : 0.048;

    osc.type = variant === "stone" ? "triangle" : "sine";
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + toneDur);

    oscGain.gain.setValueAtTime(variant === "stone" ? 0.08 : 0.055, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + toneDur);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + toneDur);
  } catch {
    // Ignore audio context restrictions gracefully
  }
}
