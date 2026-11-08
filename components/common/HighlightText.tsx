"use client";

import React from "react";
import { motion } from "framer-motion";

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
  return (
    <span className={`relative inline-block whitespace-nowrap px-1.5 py-0.5 mx-0.5 z-0 ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`absolute inset-x-0 bottom-1 top-1.5 rounded-lg -z-10 origin-left ${color}`}
      />
      <span className="relative z-10 text-[var(--ink)] font-normal">{children}</span>
    </span>
  );
}
