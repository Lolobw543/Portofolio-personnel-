"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import SubtitlesNarrative from "@/components/common/SubtitlesNarrative";
import ToolLogo from "@/components/common/ToolLogo";
import { Sparkles, Zap, Clock, ArrowRight } from "lucide-react";

export default function Act5Automate() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act5;
  const metrics = STORY_CONTENT.metrics;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const pathDraw = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <section
      id={act.id}
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Ghost Typography */}
      <motion.div
        style={{ x: ghostX }}
        className="pointer-events-none select-none absolute top-12 left-0 text-[18vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        {act.ghostWord}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Chapter Header Card */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
              05
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3 py-1 rounded-full border border-[#F43F6E]/20">
              {act.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 border border-rose-500/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>~{metrics.hoursSavedWeekly}h économisées / semaine</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--ink)]">
            {act.title}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-3 font-normal">
            {act.lead}
          </p>
        </div>

        {/* Central Animated Glass Workflow Card */}
        <div className="relative my-16 w-full rounded-[36px] bg-gradient-to-br from-[#E7E3FB]/40 via-[#FDE1E8]/30 to-white/70 backdrop-blur-xl border border-white/80 p-8 sm:p-14 shadow-[0_20px_60px_-15px_rgba(142,117,255,0.12)]">
          <div className="text-center mb-8">
            <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
              Flux d&apos;Automatisation Omnicanal Réel
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

            {/* Middle Pipeline: n8n + Claude with animated connections */}
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
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center p-2.5">
                    <ToolLogo id="n8n" name="n8n" size={40} />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--ink)]">n8n Workflow</span>
                </div>

                <ArrowRight className="w-5 h-5 text-[#F43F6E] animate-pulse" />

                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center p-2.5">
                    <ToolLogo id="claude" name="Claude" size={40} />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--ink)]">Claude 3.5 Sonnet</span>
                </div>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-white/90 border border-black/5 text-xs font-semibold text-[#14141F] shadow-sm flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Génération multicanale instantanée sans clic</span>
              </div>
            </div>

            {/* Right Output Nodes: 4 Social Networks */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {[
                { id: "tiktok", name: "TikTok", label: "Format 9:16 + Hook" },
                { id: "instagram", name: "Instagram", label: "Reels & Carrousel" },
                { id: "linkedin", name: "LinkedIn", label: "Post B2B & Analyse" },
                { id: "x", name: "X (Twitter)", label: "Thread & Visuel" },
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

        {/* Narrative Subtitles (Word by Word on Scroll) */}
        <SubtitlesNarrative sentences={act.sentences} />

        {/* Chapter Transition Hook */}
        <div className="text-center pt-8 border-t border-black/[0.06]">
          <a
            href="#arsenal"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F43F6E] hover:underline"
          >
            <span>{act.transitionHook}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
