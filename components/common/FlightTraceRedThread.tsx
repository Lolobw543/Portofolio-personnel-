"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Navigation, Terminal, CheckCircle2 } from "lucide-react";

export default function FlightTraceRedThread() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 180 });

  // Map progress to stages:
  // 0.0 -> 0.25 : Sky (Drone icon)
  // 0.25 -> 0.45 : Code (Terminal / Cursor icon)
  // 0.45 -> 1.0 : CertiDrone & Beyond (Target / Success Pin)
  const [stage, setStage] = useState<"drone" | "code" | "landed">("drone");

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.26) {
        setStage("drone");
      } else if (latest < 0.48) {
        setStage("code");
      } else {
        setStage("landed");
      }
    });
  }, [scrollYProgress]);

  // Position indicator along the vertical height (from 8% to 92%)
  const topPercent = useTransform(smoothProgress, [0, 1], ["6%", "94%"]);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block fixed left-6 xl:left-10 top-0 bottom-0 w-8 z-30 pointer-events-none"
    >
      {/* Background dashed flight corridor line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-16 bottom-16 w-px border-l-2 border-dashed border-[#F43F6E]/25" />

      {/* Trailing illuminated progress line */}
      <motion.div
        style={{ height: topPercent }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-transparent via-[#F43F6E] to-[#F43F6E] origin-top shadow-[0_0_8px_#F43F6E]"
      />

      {/* Floating Animated Vehicle at head of trajectory */}
      <motion.div
        style={{ top: topPercent }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-[#F43F6E]/40 flex items-center justify-center transition-colors duration-500"
      >
        {stage === "drone" && (
          <Navigation className="w-4 h-4 text-[#F43F6E] -rotate-45 animate-pulse" />
        )}
        {stage === "code" && (
          <Terminal className="w-4 h-4 text-[#3B82F6] animate-pulse" />
        )}
        {stage === "landed" && (
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
        )}

        {/* Pulse beacon halo */}
        <span className="absolute -inset-1 rounded-full bg-[#F43F6E]/20 animate-ping pointer-events-none" />
      </motion.div>
    </div>
  );
}
