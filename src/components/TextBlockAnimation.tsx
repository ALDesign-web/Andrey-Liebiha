"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TextBlockAnimationProps {
  children?: React.ReactNode;
  /**
   * Array of text lines to animate.
   * Can be strings, ReactNodes, or objects with content and wrapperClass for alignment.
   */
  lines?: (React.ReactNode | { content: React.ReactNode; wrapperClass?: string })[];
  /**
   * The tag to use for the text wrapper (default: div).
   */
  tag?: any;
  blockColor?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  animateOnScroll?: boolean;
}

export default function TextBlockAnimation({
  children,
  lines,
  tag = "div",
  blockColor = "#4f46e5", // Default indigo-600
  duration = 0.6,
  delay = 0,
  stagger = 0.1,
  className = "",
  animateOnScroll = true,
}: TextBlockAnimationProps) {
  const containerRef = useRef<any>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const blocks = gsap.utils.toArray<HTMLElement>(".text-reveal-block");
      const textLines = gsap.utils.toArray<HTMLElement>(".text-line-content");

      if (blocks.length === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        scrollTrigger: animateOnScroll
          ? {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
          : null,
        delay: delay,
      });

      // 1. Block expands from left to right (scaleX 0 -> 1)
      tl.to(blocks, {
        scaleX: 1,
        duration: duration,
        stagger: stagger,
        transformOrigin: "left center",
      })
        // 2. Text opacity becomes 1
        .set(textLines, { opacity: 1 }, `<${duration / 2}`)
        // 3. Block shrinks from left to right (scaleX 1 -> 0)
        .to(
          blocks,
          {
            scaleX: 0,
            duration: duration,
            stagger: stagger,
            transformOrigin: "right center",
          },
          `<${duration * 0.4}`
        );
    },
    { scope: containerRef, dependencies: [duration, stagger, delay, animateOnScroll] }
  );

  // Helper to render a single line
  const renderLine = (content: React.ReactNode, index: number) => (
    <div
      key={index}
      className="text-line-wrapper relative inline-block align-top overflow-hidden"
    >
      {/* The text content, initially hidden */}
      <div className="text-line-content opacity-0 relative z-0">{content}</div>

      {/* The reveal block, initially scaleX-0 */}
      <div
        className="text-reveal-block absolute top-0 left-0 h-full w-full z-10"
        style={{
          backgroundColor: blockColor,
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );

  let contentToRender;

  if (lines && lines.length > 0) {
    // Render provided lines
    contentToRender = lines.map((lineItem, i) => {
      let content: React.ReactNode;
      let wrapperClass = "";

      if (
        typeof lineItem === "object" &&
        lineItem !== null &&
        "content" in lineItem
      ) {
        content = (lineItem as { content: React.ReactNode; wrapperClass?: string }).content;
        wrapperClass = (lineItem as { content: React.ReactNode; wrapperClass?: string }).wrapperClass || "";
      } else {
        content = lineItem as React.ReactNode;
      }

      return (
        <div key={i} className={`block leading-tight ${wrapperClass}`}>
          {renderLine(content, i)}
        </div>
      );
    });
  } else {
    // Fallback: render children as one block
    contentToRender = renderLine(children, 0);
  }

  const ComponentTag = tag || "div";

  return (
    <ComponentTag ref={containerRef} className={className}>
      {contentToRender}
    </ComponentTag>
  );
}
