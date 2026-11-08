"use client";

import React from "react";

interface DraftBadgeProps {
  label?: string;
  missingInfo?: string;
  className?: string;
}

export default function DraftBadge({
  label = "Brouillon",
  missingInfo,
  className = "",
}: DraftBadgeProps) {
  // Always hide in production unless NEXT_PUBLIC_SHOW_DRAFTS is explicitly enabled
  const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";

  if (!showDrafts) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-700 border border-amber-500/30 backdrop-blur-sm shadow-xs ${className}`}
      title={missingInfo ? `À compléter : ${missingInfo}` : "Texte ou visuel provisoire"}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      <span>{label}</span>
      {missingInfo && <span className="opacity-75 hidden sm:inline">• {missingInfo}</span>}
    </span>
  );
}
