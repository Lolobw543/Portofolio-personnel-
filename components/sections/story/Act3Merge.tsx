"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import SubtitlesNarrative from "@/components/common/SubtitlesNarrative";
import SplitScreenMerge from "./SplitScreenMerge";
import { ExternalLink, Compass, CloudSun, ShieldCheck, ArrowRight } from "lucide-react";

export default function Act3Merge() {
  const containerRef = useRef<HTMLElement>(null);
  const act = STORY_CONTENT.acts.act3;
  const metrics = STORY_CONTENT.metrics;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

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
              03
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3 py-1 rounded-full border border-[#F43F6E]/20">
              {act.tag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{metrics.certDate}</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--ink)]">
            {act.title}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-3 font-normal">
            {act.lead}
          </p>
        </div>

        {/* 1. MOTIF SPLIT-SCREEN FUSION */}
        <SplitScreenMerge certDate={metrics.certDate} certName={metrics.certName} />

        {/* 2. SUBTITLES NARRATIVE */}
        <SubtitlesNarrative sentences={act.sentences} />

        {/* 3. REVEAL : REAL CERTIDRONE DASHBOARD FRAME */}
        <div className="relative my-16 rounded-[36px] bg-[#14141F] p-4 sm:p-7 shadow-[0_30px_90px_rgba(20,20,31,0.35)] border border-white/10 text-white">
          <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-[#FAFAFA] shadow-inner">
            <Image
              src="/images/saas/certidron-dashboard.webp"
              alt="Plateforme CertiDrone SaaS"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1440px) 100vw, 1300px"
            />
          </div>

          {/* Bottom Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium text-white/90">
                CertiDrone • Copilote de préparation de vol pour télépilotes
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 font-mono text-[10px]">
                {metrics.productStatus}
              </span>
            </div>

            <a
              href="https://certidrone.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F43F6E] text-white font-semibold hover:bg-[#e11d48] transition-colors shadow-md"
            >
              <span>Accéder à certidrone.fr</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4. TWO FLOATING PANELS: FLIGHT PLAN & AERO WEATHER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Panel 1: Plan de vol IA */}
          <div className="rounded-3xl p-6 bg-white shadow-xl border border-black/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                <Compass className="w-4 h-4 text-[#38BDF8]" />
                <span>Plan de Vol IA</span>
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                Optimisé S1/S2/S3
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src="/images/saas/panel-flightplan.webp"
                alt="Plan de vol IA optimisé"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Calcul autonome des trajectoires photogrammétriques, évitement des zones réglementaires sensibles et respect des hauteurs max.
            </p>
          </div>

          {/* Panel 2: Météo Aéronautique */}
          <div className="rounded-3xl p-6 bg-white shadow-xl border border-black/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                <CloudSun className="w-4 h-4 text-[#F59E0B]" />
                <span>Météo Aéronautique &amp; Espace Aérien</span>
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                METAR / TAF
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src="/images/saas/panel-weather.webp"
                alt="Météo aéronautique temps réel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Analyse du vent en altitude à 120m AGL, indice géomagnétique Kp pour la stabilité GNSS et validation de la fenêtre de vol.
            </p>
          </div>
        </div>

        {/* Chapter Transition Hook */}
        <div className="text-center pt-8 border-t border-black/[0.06]">
          <a
            href="#acte-04"
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
