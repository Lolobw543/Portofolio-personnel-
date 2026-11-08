"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STORY_CONTENT } from "@/content/story";
import SubtitlesNarrative from "@/components/common/SubtitlesNarrative";
import FilmstripProjects from "./FilmstripProjects";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Act4Build() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act4;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id={act.id}
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Ghost Typography */}
      <motion.div
        style={{ x: ghostX }}
        className="pointer-events-none select-none absolute top-12 right-0 text-[18vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        {act.ghostWord}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Chapter Header Card */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
              04
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3 py-1 rounded-full border border-[#F43F6E]/20">
              {act.tag}
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--ink)]">
            {act.title}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-3 font-normal">
            {act.lead}
          </p>
        </div>

        {/* Narrative Subtitles (Word by Word on Scroll) */}
        <SubtitlesNarrative sentences={act.sentences} />

        {/* 35mm Filmstrip Component */}
        <FilmstripProjects />

        {/* Chapter Transition Hook */}
        <div className="text-center pt-8 border-t border-black/[0.06]">
          <a
            href="#acte-05"
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
