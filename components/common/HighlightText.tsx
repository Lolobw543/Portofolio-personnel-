"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

interface HighlightTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  color?: string; // e.g. "bg-[#FDE1E8]" or hex "#FDE1E8"
}

export default function HighlightText({
  children,
  delay = 0.2,
  className = "",
  color = "#FDE1E8",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Resolve hex or tailwind class
  const colorMap: Record<string, string> = {
    "bg-[#FDE1E8]": "#FDE1E8",
    "bg-[#DBEAFE]": "#DBEAFE",
    "bg-[#D1FAE5]": "#D1FAE5",
    "bg-[#FEF3C7]": "#FEF3C7",
    "bg-[#EDE9FE]": "#EDE9FE",
  };
  const resolvedColor = colorMap[color] || (color.startsWith("#") ? color : "#FDE1E8");

  return (
    <span
      ref={ref}
      className={`inline px-2 py-0.5 rounded-md [box-decoration-break:clone] [-webkit-box-decoration-break:clone] font-normal transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${resolvedColor}, ${resolvedColor})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        backgroundSize: isInView ? "100% 100%" : "0% 100%",
        transitionDelay: `${delay}s`,
      }}
    >
      <span className="text-[var(--ink)]">{children}</span>
    </span>
  );
}
