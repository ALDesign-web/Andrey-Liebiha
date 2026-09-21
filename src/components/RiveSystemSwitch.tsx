"use client";

import React, { useState, useEffect, useRef } from "react";
import { RiveCanvas } from "@/components/ui/RiveCanvas";
import type { Rive as RiveInstance } from "@rive-app/react-canvas";

interface RiveSystemSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  width?: number;
  height?: number;
  className?: string;
}

export function RiveSystemSwitch({
  checked: controlledChecked,
  onChange,
  width = 120,
  height = 64,
  className = "",
}: RiveSystemSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(controlledChecked ?? false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const riveRef = useRef<RiveInstance | null>(null);

  // Sync external prop change to Rive state machine
  useEffect(() => {
    if (riveRef.current) {
      try {
        const inputs = riveRef.current.stateMachineInputs("State Machine 1");
        const onInput = inputs?.find((i) => i.name === "isOn");
        if (onInput && onInput.value !== isChecked) {
          onInput.value = isChecked;
        }
      } catch {
        // Safe fallback
      }
    }
  }, [isChecked]);

  const handleRiveReady = (rive: RiveInstance) => {
    riveRef.current = rive;
    try {
      const inputs = rive.stateMachineInputs("State Machine 1");
      const onInput = inputs?.find((i) => i.name === "isOn");
      if (onInput) {
        onInput.value = isChecked;
      }
    } catch {
      // Safe fallback
    }
  };

  const handleToggle = () => {
    const nextVal = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextVal);
    }
    if (riveRef.current) {
      try {
        const inputs = riveRef.current.stateMachineInputs("State Machine 1");
        const onInput = inputs?.find((i) => i.name === "isOn");
        if (onInput) {
          onInput.value = nextVal;
        }
      } catch {
        // Safe fallback
      }
    }
    onChange?.(nextVal);
  };

  return (
    <div
      role="switch"
      aria-checked={isChecked}
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7235] rounded-full ${className}`}
      style={{ width, height }}
      title="Rive 60fps Vector State Machine Switch"
    >
      <RiveCanvas
        src="/rive/system-switch.riv"
        stateMachine="State Machine 1"
        className="w-full h-full"
        onRiveReady={handleRiveReady}
        fallback={
          <div
            className={`w-full h-full rounded-full transition-colors ${
              isChecked ? "bg-[#ff7235]" : "bg-[#242424]"
            }`}
          />
        }
      />
    </div>
  );
}
