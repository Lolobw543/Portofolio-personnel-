"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface HighlightTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  color?: string;
}

export default function HighlightText({
  children,
  delay = 0.2,
  className = "",
  color = "bg-[#FDE1E8]",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`absolute -inset-x-1.5 bottom-0.5 top-1 rounded-md z-0 origin-left ${color}`}
      />
      <span className="relative z-10 text-[var(--ink)] font-normal">{children}</span>
    </span>
  );
}
