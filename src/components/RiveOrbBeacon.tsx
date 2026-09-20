"use client";

import React, { useState } from "react";
import { RiveCanvas } from "@/components/ui/RiveCanvas";
import type { Rive as RiveInstance } from "@rive-app/react-canvas";

interface RiveOrbBeaconProps {
  size?: number;
  className?: string;
}

export function RiveOrbBeacon({ size = 28, className = "" }: RiveOrbBeaconProps) {
  const [riveInstance, setRiveInstance] = useState<RiveInstance | null>(null);

  const handlePointerEnter = () => {
    if (riveInstance) {
      try {
        const inputs = riveInstance.stateMachineInputs("State Machine 1");
        const hoveredInput = inputs?.find((i) => i.name === "isHovered");
        if (hoveredInput) {
          hoveredInput.value = true;
        }
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handlePointerLeave = () => {
    if (riveInstance) {
      try {
        const inputs = riveInstance.stateMachineInputs("State Machine 1");
        const hoveredInput = inputs?.find((i) => i.name === "isHovered");
        if (hoveredInput) {
          hoveredInput.value = false;
        }
      } catch {
        // Fallback gracefully
      }
    }
  };

  const handleClick = () => {
    if (riveInstance) {
      try {
        const inputs = riveInstance.stateMachineInputs("State Machine 1");
        const triggerInput = inputs?.find((i) => i.name === "triggerTap");
        if (triggerInput) {
          triggerInput.fire();
        }
      } catch {
        // Fallback gracefully
      }
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      title="Rive Vector State Machine — Active System Core"
    >
      <RiveCanvas
        src="/rive/orb-beacon.riv"
        stateMachine="State Machine 1"
        className="w-full h-full"
        onRiveReady={setRiveInstance}
        fallback={<span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />}
      />
    </div>
  );
}
