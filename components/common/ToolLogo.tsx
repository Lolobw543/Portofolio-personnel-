"use client";

import React from "react";
import Image from "next/image";

interface ToolLogoProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
}

// Maps any tool ID or alias directly to its local official SVG in /public/logos/
export default function ToolLogo({ id, name, size = 48, className = "" }: ToolLogoProps) {
  const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Aliases map
  const aliasMap: Record<string, string> = {
    openai: "chatgpt",
    chatgpt: "chatgpt",
    gemini: "gemini",
    claude: "claude",
    kimi: "kimi",
    antigravity: "antigravity",
    codex: "codex",
    lovable: "lovable",
    cursor: "cursor",
    bolt: "bolt",
    n8n: "n8n",
    make: "make",
    figma: "figma",
    canva: "canva",
    photoroom: "photoroom",
    capcut: "capcut",
    davinci: "davinci",
    davinciresolve: "davinci",
    discord: "discord",
    tiktok: "tiktok",
    instagram: "instagram",
    facebook: "facebook",
    linkedin: "linkedin",
    x: "x",
    twitter: "x",
    google: "google",
    gmail: "gmail",
    gdrive: "gdrive",
    googledrive: "gdrive",
    gdocs: "gdocs",
    googledocs: "gdocs",
    gsheets: "gsheets",
    googlesheets: "gsheets",
    youtube: "youtube",
    shopify: "shopify",
    stripe: "stripe",
    paypal: "paypal",
    phantom: "phantom",
    notion: "notion",
    nextjs: "nextjs",
    typescript: "typescript",
    tailwind: "tailwind",
    tailwindcss: "tailwind",
    supabase: "supabase",
    vercel: "vercel",
  };

  const fileKey = aliasMap[cleanId] || cleanId;

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/logos/${fileKey}.svg`}
        alt={`${name} official logo`}
        width={size}
        height={size}
        className="w-full h-full object-contain filter-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        priority
      />
    </div>
  );
}
