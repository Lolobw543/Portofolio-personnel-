"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Plane, Terminal, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface SplitScreenMergeProps {
  certDate: string;
  certName: string;
}

export default function SplitScreenMerge({
  certDate,
  certName,
}: SplitScreenMergeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Split-screen halves slide towards center
  const leftX = useTransform(scrollYProgress, [0.1, 0.55], ["-35%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.55], ["35%", "0%"]);
  const mergeScale = useTransform(scrollYProgress, [0.45, 0.65], [0.94, 1.02]);
  const fusionGlowOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 1, 0.4]);

  return (
    <div
      ref={containerRef}
      className="relative w-full my-16 overflow-hidden rounded-[36px] bg-[#0A0E17] border border-white/10 shadow-2xl p-4 sm:p-8"
    >
      {/* Central Fusion Glow Beacon */}
      <motion.div
        style={{ opacity: fusionGlowOpacity }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,63,110,0.3)_0%,transparent_70%)] z-10"
      />

      <div className="text-center mb-8 relative z-20">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3.5 py-1.5 rounded-full border border-[#F43F6E]/20">
          La Fusion : Deux Mondes Réunis
        </span>
      </div>

      {/* The 2 halves sliding together */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-20">
        {/* Left Half: Le Ciel (Télépilote Certifié) */}
        <motion.div
          style={{ x: leftX }}
          className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 p-6 flex flex-col justify-between"
        >
          <Image
            src="/images/story/split-sky.webp"
            alt="Le Ciel - Télépilote de drone"
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="relative z-10 flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Plane className="w-5 h-5 text-[#F43F6E]" />
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/80 text-white flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CERTIFIÉ DGAC</span>
            </span>
          </div>

          <div className="relative z-10 text-white">
            <span className="text-[11px] font-mono text-[#F43F6E] block mb-1">
              {certDate}
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">
              Télépilote Professionnel
            </h4>
            <p className="text-xs text-white/70 mt-1">
              {certName} • Précision des trajectoires et rigueur aéronautique
            </p>
          </div>
        </motion.div>

        {/* Right Half: Le Code (Ingénierie Logicielle & IA) */}
        <motion.div
          style={{ x: rightX }}
          className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#0F172A] border border-white/10 p-6 flex flex-col justify-between"
        >
          <Image
            src="/images/story/split-code.webp"
            alt="Le Code - Développement logiciel"
            fill
            className="object-cover opacity-50"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="relative z-10 flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Terminal className="w-5 h-5 text-[#38BDF8]" />
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/80 text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FULL-STACK IA</span>
            </span>
          </div>

          <div className="relative z-10 text-white">
            <span className="text-[11px] font-mono text-[#38BDF8] block mb-1">
              Next.js • Supabase • OpenAI
            </span>
            <h4 className="text-lg sm:text-xl font-bold tracking-tight">
              Ingénierie &amp; Vibe Coding
            </h4>
            <p className="text-xs text-white/70 mt-1">
              Automatisation des démarches, algorithmes de vol &amp; pipelines réactifs
            </p>
          </div>
        </motion.div>
      </div>

      {/* Convergence Banner */}
      <div className="mt-8 text-center relative z-20">
        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
          De cette rencontre naît un projet phare : <span className="text-white font-bold">CertiDrone</span>, conçu pour simplifier chaque préparation de vol.
        </p>
      </div>
    </div>
  );
}
