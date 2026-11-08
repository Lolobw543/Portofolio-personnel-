"use client";

import React from "react";
import * as siIcons from "simple-icons";
import Image from "next/image";

interface ToolLogoProps {
  name: string;
  id: string;
  color?: string;
  className?: string;
}

// Map each tool ID to either an official local SVG or a Simple Icons entry
export default function ToolLogo({ name, id, color = "#14141F", className = "w-6 h-6" }: ToolLogoProps) {
  // Check local SVG first
  const localSvgIds = ["openai", "chatgpt", "canva", "linkedin", "capcut", "cursor", "lovable", "bolt"];
  const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (localSvgIds.includes(cleanId) || (cleanId === "chatgpt" && localSvgIds.includes("openai"))) {
    const file = cleanId === "chatgpt" ? "openai" : cleanId;
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src={`/logos/${file}.svg`}
          alt={`${name} logo`}
          width={24}
          height={24}
          className="w-full h-full object-contain filter group-hover:drop-shadow-[0_4px_12px_rgba(244,63,110,0.3)]"
          style={{ color }}
        />
      </div>
    );
  }

  // Map to simple-icons
  const simpleIconsMap: Record<string, string> = {
    gemini: "siGoogle",
    claude: "siAnthropic",
    n8n: "siN8n",
    make: "siMake",
    nextjs: "siNextdotjs",
    typescript: "siTypescript",
    tailwind: "siTailwindcss",
    supabase: "siSupabase",
    vercel: "siVercel",
    figma: "siFigma",
    photoroom: "siFigma", // placeholder for photoroom or clean camera
    davinci: "siResolve",
    discord: "siDiscord",
    tiktok: "siTiktok",
    instagram: "siInstagram",
    facebook: "siFacebook",
    x: "siX",
    google: "siGoogle",
    gmail: "siGmail",
    gdrive: "siGoogledrive",
    gdocs: "siGoogledocs",
    gsheets: "siGooglesheets",
    youtube: "siYoutube",
    shopify: "siShopify",
    stripe: "siStripe",
    paypal: "siPaypal",
    phantom: "siSolana",
    notion: "siNotion",
    codex: "siOpenai",
    antigravity: "siGoogle",
  };

  const siKey = simpleIconsMap[cleanId];
  // @ts-expect-error dynamic simple-icons lookup
  const iconObj = siKey ? siIcons[siKey] : null;

  if (iconObj && iconObj.svg) {
    return (
      <div
        className={`flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${className}`}
        dangerouslySetInnerHTML={{ __html: iconObj.svg }}
      />
    );
  }

  // Elegant fallback: Monogram tile
  return (
    <div
      className={`rounded-lg bg-black/5 flex items-center justify-center font-bold text-xs uppercase tracking-tighter text-[var(--ink)] ${className}`}
      style={{ color }}
    >
      {name.slice(0, 2)}
    </div>
  );
}
