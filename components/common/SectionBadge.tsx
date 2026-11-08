import React from "react";
import { Sparkles, LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  label: string;
  icon?: LucideIcon;
  variant?: "light" | "navy" | "accent";
  className?: string;
}

export default function SectionBadge({
  label,
  icon: Icon = Sparkles,
  variant = "light",
  className = "",
}: SectionBadgeProps) {
  const variantStyles = {
    light:
      "bg-white/80 border-white/90 text-[var(--ink)] shadow-[0_4px_16px_rgba(20,20,31,0.04)]",
    navy:
      "bg-white/10 border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
    accent:
      "bg-[var(--accent-soft)] border-[#F43F6E]/20 text-[#E11D48] shadow-[0_4px_16px_rgba(244,63,110,0.1)]",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md border uppercase ${variantStyles[variant]} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 text-[#F43F6E]" />
      <span>{label}</span>
    </div>
  );
}
