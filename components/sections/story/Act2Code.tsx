"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import SubtitlesNarrative from "@/components/common/SubtitlesNarrative";
import { Code, Terminal, ArrowRight, Cpu } from "lucide-react";

export default function Act2Code() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act2;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [120, -120]);

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
              02
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/20">
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

        {/* Ambient Dark Code Room Scene */}
        <div className="relative w-full rounded-[40px] overflow-hidden bg-[#0A0D14] shadow-2xl border border-white/10 aspect-[16/9] max-h-[650px] my-10">
          <Image
            src="/images/story/code-night-room.webp"
            alt="Chambre la nuit éclairée par l'écran d'ordinateur"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 1440px) 100vw, 1400px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-black/50 pointer-events-none" />

          {/* Terminal Code Snippet Floating in Center */}
          <div className="absolute bottom-8 sm:bottom-12 inset-x-6 sm:inset-x-12 p-5 sm:p-7 rounded-2xl bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 font-mono text-xs sm:text-sm text-slate-300 max-w-2xl select-none">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-white/50 ml-2">builder_terminal.ts</span>
            </div>
            <p className="text-[#38BDF8]">{`const curiosity = new Passion("informatique");`}</p>
            <p className="text-white/80">{`while (curiosity.isActive) {`}</p>
            <p className="pl-4 text-emerald-400">{`await experiment.démonterEtReconstruire();`}</p>
            <p className="text-white/80">{`}`}</p>
          </div>
        </div>

        {/* Narrative Subtitles (Word by Word on Scroll) */}
        <SubtitlesNarrative sentences={act.sentences} />

        {/* 3 Polaroid Photogrammes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-16 max-w-5xl mx-auto">
          {act.visuals.map((visual, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, rotate: idx === 1 ? 0 : idx === 0 ? 2 : -2 }}
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
            href="#acte-03"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3B82F6] hover:underline"
          >
            <span>{act.transitionHook}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
