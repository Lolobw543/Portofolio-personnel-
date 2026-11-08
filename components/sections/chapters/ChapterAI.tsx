"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { Sparkles, Zap, Clock, ArrowRight } from "lucide-react";

export default function ChapterAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.ai;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax on ghost typography & elements
  const ghostX = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const phoneLeftY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const phoneRightY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const pathDraw = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <div
      id="chapitre-01"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 left-0 pointer-events-none select-none text-[15vw] font-black uppercase text-outline opacity-25 leading-none whitespace-nowrap z-0"
      >
        AUTOMATION • AGENTS • AI PIPELINE
      </motion.div>

      {/* Chapter Text directly on background (No card border) */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={Sparkles} />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F43F6E]/10 text-[#F43F6E] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.speedMetric}</span>
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          {data.title.split("&")[0]} &{" "}
          <HighlightText>{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Central Animated SVG Workflow Network */}
        <div className="relative my-20 w-full rounded-[36px] bg-gradient-to-br from-[#E7E3FB]/40 via-[#FDE1E8]/30 to-white/70 backdrop-blur-xl border border-white/80 p-8 sm:p-14 shadow-[0_20px_60px_-15px_rgba(142,117,255,0.12)]">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
              Flux d&apos;Automatisation Omnicanal en Direct
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Left Input Node: Raw Idea */}
            <div className="lg:col-span-3 flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-xl border border-black/5 flex items-center justify-center relative group">
                <Sparkles className="w-9 h-9 text-[#F43F6E] animate-pulse" />
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F43F6E] text-white">
                  INPUT
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--ink)]">1 Idée brute</span>
              <span className="text-[11px] text-[var(--ink-muted)]">Audio, note ou brief</span>
            </div>

            {/* Middle Pipeline: n8n + ChatGPT/Claude with animated connections */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6 relative">
              <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none -z-10" viewBox="0 0 400 160">
                <motion.path
                  d="M 20 80 Q 200 20 380 80"
                  fill="none"
                  stroke="#F43F6E"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  style={{ pathLength: pathDraw }}
                />
              </svg>

              <div className="flex items-center gap-6">
                {/* n8n Node */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center p-2.5">
                    <ToolLogo id="n8n" name="n8n" size={40} />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--ink)]">n8n Workflow</span>
                </div>

                <ArrowRight className="w-5 h-5 text-[#F43F6E] animate-pulse" />

                {/* Claude / LLM Node */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center p-2.5">
                    <ToolLogo id="claude" name="Claude" size={40} />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--ink)]">Claude 3.5 Sonnet</span>
                </div>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-white/90 border border-black/5 text-xs font-semibold text-[#14141F] shadow-sm flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Génération multi-formats, ton adapté & SEO</span>
              </div>
            </div>

            {/* Right Output Nodes: 4 Social Networks */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                { id: "tiktok", name: "TikTok", label: "Script + Audio" },
                { id: "instagram", name: "Instagram", label: "Reels & Carousel" },
                { id: "linkedin", name: "LinkedIn", label: "Post B2B + Thread" },
                { id: "x", name: "X (Twitter)", label: "Thread viral" },
              ].map((social) => (
                <div
                  key={social.id}
                  className="p-3.5 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <ToolLogo id={social.id} name={social.name} size={32} />
                  <div className="text-left">
                    <span className="text-xs font-semibold text-[var(--ink)] block">{social.name}</span>
                    <span className="text-[10px] text-[var(--ink-muted)] block">{social.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Side Phone Mockups sliding with parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          {/* Left phone with feed */}
          <motion.div
            style={{ y: phoneLeftY }}
            className="relative rounded-[36px] overflow-hidden p-2.5 bg-black shadow-2xl max-w-sm mx-auto"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
              <Image
                src={data.images.feed1}
                alt="Feed réseaux sociaux automatisé"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
            <div className="p-4 text-white text-xs">
              <span className="font-semibold text-rose-400">Instagram & TikTok Auto</span>
              <p className="text-white/60 text-[11px] mt-0.5">Visuels, accroches & programmation sans intervention</p>
            </div>
          </motion.div>

          {/* Right phone with feed */}
          <motion.div
            style={{ y: phoneRightY }}
            className="relative rounded-[36px] overflow-hidden p-2.5 bg-black shadow-2xl max-w-sm mx-auto"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
              <Image
                src={data.images.feed2}
                alt="Feed LinkedIn et X automatisé"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
            <div className="p-4 text-white text-xs">
              <span className="font-semibold text-blue-400">LinkedIn & X Pipeline</span>
              <p className="text-white/60 text-[11px] mt-0.5">Veille automatique et distribution à fort impact</p>
            </div>
          </motion.div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#F43F6E]">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
