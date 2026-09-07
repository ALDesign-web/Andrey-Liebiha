"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Detect Safari / WebKit and touch devices.
        // Safari on macOS / iOS already has hardware-accelerated 120Hz Cocoa inertial momentum.
        // Bypassing Lenis in Safari avoids artificial JS friction, giving a buttery-smooth native feel.
        const ua = navigator.userAgent;
        const vendor = navigator.vendor || "";
        const isSafari =
            (/^((?!chrome|android).)*safari/i.test(ua) ||
            (vendor.includes("Apple") && !/Chrome/i.test(ua)));

        const isTouch =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (isSafari || isTouch) {
            // Ensure no lenis styling classes linger on html
            document.documentElement.classList.remove("lenis", "lenis-smooth");
            return;
        }

        // Initialize Lenis strictly on Google Chrome / Chromium desktop where it smooths wheel stepping
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
            syncTouch: false,
        });

        (window as any).lenis = lenis;

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            delete (window as any).lenis;
            document.documentElement.classList.remove("lenis", "lenis-smooth");
        };
    }, []);

    return null;
}
