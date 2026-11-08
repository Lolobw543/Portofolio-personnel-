"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { Layers, ShieldCheck, CloudSun, Compass, ExternalLink } from "lucide-react";

export default function ChapterSaaS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.saas;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and 3D depth detachment on scroll
  const ghostX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const dashboardRotateX = useTransform(scrollYProgress, [0.2, 0.6], [8, -4]);
  const dashboardScale = useTransform(scrollYProgress, [0.2, 0.6], [0.94, 1.02]);
  
  // Layered panels detach with depth
  const panel1X = useTransform(scrollYProgress, [0.25, 0.65], [-30, -60]);
  const panel1Y = useTransform(scrollYProgress, [0.25, 0.65], [40, -40]);
  const panel2X = useTransform(scrollYProgress, [0.25, 0.65], [30, 60]);
  const panel2Y = useTransform(scrollYProgress, [0.25, 0.65], [-30, 30]);

  const stackOrbit = [
    { id: "nextjs", name: "Next.js" },
    { id: "typescript", name: "TypeScript" },
    { id: "tailwind", name: "Tailwind" },
    { id: "supabase", name: "Supabase" },
    { id: "stripe", name: "Stripe" },
  ];

  return (
    <div
      id="chapitre-02"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 right-0 pointer-events-none select-none text-[15vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        SAAS • VIBE CODING • CERTIDRONE
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header copy directly on background */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={Layers} />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3B82F6]/10 text-[#2563EB]">
            {data.statusMetric}
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700">
            {data.complianceMetric}
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          {data.title.split("&")[0]} &{" "}
          <HighlightText color="bg-[#DBEAFE]">{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Orbiting Stack Icons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <span className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider mr-2">
            Stack en orbite :
          </span>
          {stackOrbit.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-sm"
            >
              <ToolLogo id={item.id} name={item.name} size={20} />
              <span className="text-xs font-medium text-[var(--ink)]">{item.name}</span>
            </div>
          ))}
        </div>

        {/* 3D Dashboard Mockup with Detached Depth Layers */}
        <div className="relative my-20 perspective-[1400px]">
          {/* Main Dashboard Frame */}
          <motion.div
            style={{
              rotateX: dashboardRotateX,
              scale: dashboardScale,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full rounded-[36px] overflow-hidden bg-[#1B1B4B] p-4 sm:p-6 shadow-[0_30px_90px_rgba(27,27,75,0.4)] border border-white/10"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-[#FAFAFA]">
              <Image
                src={data.images.dashboard}
                alt="Plateforme CertiDrone SaaS"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {/* Bottom Bar: Quick Launch */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mt-2 border-t border-white/10 text-white text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-medium">CertiDrone • Copilote IA de préparation pour télépilotes</span>
              </div>
              <a
                href="https://certidrone.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F43F6E] text-white font-semibold hover:bg-[#e11d48] transition-colors"
              >
                <span>Accéder à certidrone.fr</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Detached Depth Floating Panel 1: Flight Plan (Left Overlap) */}
          <motion.div
            style={{
              x: panel1X,
              y: panel1Y,
            }}
            className="hidden md:flex absolute -bottom-10 -left-6 z-20 w-80 rounded-2xl p-4 bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl flex-col gap-3"
          >
            <PlaceholderBadge />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                <Compass className="w-4 h-4 text-[#3B82F6]" />
                <span>Plan de Vol IA</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                Optimisé S1/S2/S3
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900">
              <Image
                src={data.panels[0].image}
                alt="Plan de vol IA"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">
              Trajectoire générée et calculée en conformité avec les zones LF-R et hauteurs max.
            </p>
          </motion.div>

          {/* Detached Depth Floating Panel 2: Live Weather & Airspace (Right Overlap) */}
          <motion.div
            style={{
              x: panel2X,
              y: panel2Y,
            }}
            className="hidden md:flex absolute -top-8 -right-6 z-20 w-80 rounded-2xl p-4 bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl flex-col gap-3"
          >
            <PlaceholderBadge />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                <CloudSun className="w-4 h-4 text-[#F59E0B]" />
                <span>Météo Aéronautique</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                METAR / TAF
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900">
              <Image
                src={data.panels[1].image}
                alt="Météo et espace aérien"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">
              Analyse du vent en altitude, indice KP et prédictions de turbulences en direct.
            </p>
          </motion.div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#3B82F6]">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
