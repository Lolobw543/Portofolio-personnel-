"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "navy" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "group relative inline-flex items-center gap-3 rounded-full font-medium transition-all duration-300 select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[#F43F6E] text-white shadow-[0_10px_25px_rgba(244,63,110,0.35)] hover:shadow-[0_14px_32px_rgba(244,63,110,0.45)] hover:bg-[#e11d48]",
    secondary:
      "bg-white/80 text-[var(--ink)] backdrop-blur-md border border-white/90 shadow-[0_8px_24px_rgba(20,20,31,0.06)] hover:bg-white hover:shadow-[0_12px_28px_rgba(20,20,31,0.1)]",
    navy:
      "bg-[#1B1B4B] text-white shadow-[0_10px_25px_rgba(27,27,75,0.3)] hover:bg-[#14143a] hover:shadow-[0_14px_30px_rgba(27,27,75,0.4)]",
    outline:
      "bg-transparent text-[var(--ink)] border border-[var(--ink)]/20 hover:border-[var(--ink)] hover:bg-[var(--ink)]/5",
  };

  const iconCircleStyles = {
    primary: "bg-white/20 text-white group-hover:bg-white group-hover:text-[#F43F6E]",
    secondary: "bg-[var(--ink)]/5 text-[var(--ink)] group-hover:bg-[#F43F6E] group-hover:text-white",
    navy: "bg-white/15 text-white group-hover:bg-[#F43F6E] group-hover:text-white",
    outline: "bg-[var(--ink)]/10 text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white",
  };

  const Content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      >
        <span className="tracking-tight">{children}</span>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300 ${iconCircleStyles[variant]}`}
        >
          {icon || <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />}
        </span>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {Content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {Content}
    </button>
  );
}
