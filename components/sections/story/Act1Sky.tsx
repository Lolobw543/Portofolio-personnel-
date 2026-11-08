"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import SubtitlesNarrative from "@/components/common/SubtitlesNarrative";
import { Plane, Compass, ArrowRight } from "lucide-react";

export default function Act1Sky() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const kenBurnsScale = useTransform(scrollYProgress, [0.1, 0.8], [1, 1.12]);

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
              01
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3 py-1 rounded-full border border-[#F43F6E]/20">
              {act.tag}
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--ink)]">
            {act.title}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-xl mt-3 font-normal">
            {act.lead}
          </p>
        </div>

        {/* Cinematic Letterbox Fullscreen Scene */}
        <div className="relative w-full rounded-[40px] overflow-hidden bg-black shadow-2xl border border-white/10 aspect-[16/9] max-h-[650px] my-10">
          {/* Cinema Letterbox Bars */}
          <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-black z-20 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-6 sm:h-10 bg-black z-20 pointer-events-none" />

          {/* Ken Burns Moving Aerial Background */}
          <motion.div
            style={{ scale: kenBurnsScale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/story/sky-countryside.webp"
              alt="Vue aérienne du ciel au crépuscule"
              fill
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1400px"
            />
          </motion.div>

          {/* Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10" />

          {/* HUD Overlay details */}
          <div className="absolute inset-x-8 bottom-12 z-20 flex items-center justify-between text-white font-mono text-xs select-none pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>HORIZON LIBRE • VOL EN VUE DIRECTE</span>
            </div>
            <span className="text-white/60">DÉCLIC INITIAL • ENFANCE</span>
          </div>
        </div>

        {/* Narrative Subtitles (Word by Word on Scroll) */}
        <SubtitlesNarrative sentences={act.sentences} />

        {/* 3 Polaroid Photogrammes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-16 max-w-5xl mx-auto">
          {act.visuals.map((visual, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, rotate: idx === 1 ? 0 : idx === 0 ? -2 : 2 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl p-4 bg-white shadow-xl border border-black/5 flex flex-col justify-between cursor-default"
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 mb-3">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
              </div>
              <p className="font-serif italic text-xs text-[var(--ink-muted)] text-center py-1">
                {visual.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chapter Transition Hook */}
        <div className="text-center pt-8 border-t border-black/[0.06]">
          <a
            href="#acte-02"
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
