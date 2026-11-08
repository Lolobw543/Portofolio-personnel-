"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import { Plane, Code, Sparkles, ChevronDown } from "lucide-react";

export default function Act0Opening() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.7], [0.12, 0.28]);

  // 3D Tilt interaction on photo card
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(x);
    cardY.set(y);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <section
      id={act.id}
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 lg:px-12 overflow-hidden"
    >
      {/* Huge Ghost Text in outline */}
      <motion.div
        style={{ y: ghostY, opacity: ghostOpacity }}
        className="pointer-events-none select-none absolute top-12 left-1/2 -translate-x-1/2 text-[18vw] font-black uppercase text-outline leading-none whitespace-nowrap z-0"
      >
        LAURENTIN
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Opening Title & Subtitle */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              00
            </span>
            <SectionBadge label="Un Film au Scroll" icon={Sparkles} />
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
              Télépilote de drone certifié
            </span>
          </div>

          {/* Film Typewriter Opening Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[-0.03em] text-[var(--ink)] leading-[1.08]">
            Moi, c&apos;est <HighlightText>Laurentin</HighlightText>.
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light text-[var(--ink-muted)] leading-relaxed max-w-2xl">
            Depuis tout petit, deux choses me fascinent :
          </p>

          {/* Two Giant Words: Les Drones / L'Informatique */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 my-2">
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/90 border border-white/90 shadow-md backdrop-blur-md">
              <Plane className="w-5 h-5 text-[#F43F6E]" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)]">
                LES DRONES
              </span>
            </div>

            <span className="text-sm font-serif italic text-[var(--ink-muted)]">&amp;</span>

            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/90 border border-white/90 shadow-md backdrop-blur-md">
              <Code className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink)]">
                L&apos;INFORMATIQUE
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl font-normal leading-relaxed">
            Deux univers que tout semblait opposer, jusqu&apos;à ce qu&apos;ils se rejoignent dans un projet : automatiser le ciel avec le code.
          </p>

          {/* CTA to scroll */}
          <div className="flex items-center gap-4 pt-4">
            <a
              href="#acte-01"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#14141F] text-white hover:bg-[#F43F6E] transition-colors shadow-md"
            >
              <span>Commencer l&apos;histoire</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>

            <span className="text-xs text-[var(--ink-muted)] font-mono">
              Durée estimée : 4 min de lecture
            </span>
          </div>
        </div>

        {/* Right Column: Large Photo Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-md aspect-[4/5] rounded-[36px] p-3 bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(20,20,31,0.12)] cursor-pointer select-none"
          >
            <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-900 shadow-inner">
              <Image
                src={act.visuals[0].src}
                alt={act.visuals[0].alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 450px"
              />

              {/* Film Grain & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Card Tape */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-bold tracking-tight block">
                    Laurentin
                  </span>
                  <span className="text-[11px] text-white/70 block">
                    Auch (32) • Télépilote DGAC &amp; SaaS Builder
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
