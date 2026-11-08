"use client";

import React from "react";

export default function PlaceholderBadge({ className = "", label = "Brouillon / À remplacer" }: { className?: string; label?: string }) {
  // Only display when NEXT_PUBLIC_SHOW_DRAFTS is explicitly set to true
  const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";
  if (!showDrafts) return null;

  return (
    <div
      className={`absolute top-3 left-3 z-30 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-amber-500/90 text-white backdrop-blur-md shadow-md border border-white/20 select-none pointer-events-none ${className}`}
    >
      {label}
    </div>
  );
}
