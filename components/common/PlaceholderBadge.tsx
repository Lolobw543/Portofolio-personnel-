"use client";

import React from "react";

export default function PlaceholderBadge({ className = "" }: { className?: string }) {
  const show = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
  if (!show) return null;

  return (
    <div
      className={`absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-amber-500/90 text-white backdrop-blur-md shadow-md border border-white/20 select-none pointer-events-none ${className}`}
    >
      Image IA / À remplacer
    </div>
  );
}
