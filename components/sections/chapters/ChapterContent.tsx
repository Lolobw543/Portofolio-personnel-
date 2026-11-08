"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { Video, Flame, Music, Layers, Play } from "lucide-react";

export default function ChapterContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.content;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dynamic Playhead position driven by scroll
  const playheadX = useTransform(scrollYProgress, [0.2, 0.7], ["15%", "85%"]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // 3 Phones staggered vertical scroll
  const phone1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phone2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const phone3Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div
      id="chapitre-05"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 left-0 pointer-events-none select-none text-[15vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        VIDEO EDITING • REELS • TIKTOK
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header copy directly on background */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={Video} />
          {data.viewsMetric && !data.viewsMetric.startsWith("[") && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>{data.viewsMetric}</span>
            </span>
          )}
          {data.retentionMetric && !data.retentionMetric.startsWith("[") && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800">
              {data.retentionMetric}
            </span>
          )}
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          {data.title.split("&")[0]} &{" "}
          <HighlightText color="bg-[#FED7AA]">{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Stylized NLE Video Editor Timeline with moving playhead */}
        <div className="relative my-20 rounded-[36px] bg-[#14141E] p-6 sm:p-10 shadow-2xl border border-white/10 text-white overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-white/60 ml-2 font-mono">DaVinci Resolve / CapCut Timeline 4K</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>00:00:18:24</span>
            </div>
          </div>

          {/* Timeline Multi-Track Rows */}
          <div className="relative flex flex-col gap-3 py-4">
            {/* Moving Playhead Needle on scroll */}
            <motion.div
              style={{ left: playheadX }}
              className="absolute top-0 bottom-0 w-0.5 bg-[#F43F6E] z-30 pointer-events-none"
            >
              <div className="w-3 h-3 rounded-full bg-[#F43F6E] -translate-x-[5px] -translate-y-1 shadow-[0_0_10px_#F43F6E]" />
            </motion.div>

            {/* Track 1: Main Video */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[11px] font-mono text-white/50 truncate">V1 • Caméra</span>
              <div className="flex-1 h-12 rounded-xl bg-white/5 p-1 flex gap-2 overflow-hidden border border-white/5">
                <div className="w-1/3 h-full rounded-lg bg-blue-600/70 flex items-center px-3 text-[10px] font-medium truncate">
                  Master Shot 4K
                </div>
                <div className="w-1/4 h-full rounded-lg bg-blue-500/80 flex items-center px-3 text-[10px] font-medium truncate">
                  Zoom Travell
                </div>
                <div className="w-1/3 h-full rounded-lg bg-blue-600/70 flex items-center px-3 text-[10px] font-medium truncate">
                  Clôture
                </div>
              </div>
            </div>

            {/* Track 2: B-Roll & Drone */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[11px] font-mono text-white/50 truncate">V2 • B-Roll</span>
              <div className="flex-1 h-12 rounded-xl bg-white/5 p-1 flex gap-2 overflow-hidden border border-white/5">
                <div className="w-1/5 ml-28 h-full rounded-lg bg-emerald-600/80 flex items-center px-3 text-[10px] font-medium truncate">
                  Drone Plan S1
                </div>
                <div className="w-1/4 ml-12 h-full rounded-lg bg-emerald-500/80 flex items-center px-3 text-[10px] font-medium truncate">
                  Macro Bijou
                </div>
              </div>
            </div>

            {/* Track 3: Sound FX & Voiceover */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[11px] font-mono text-white/50 truncate">A1 • Sound FX</span>
              <div className="flex-1 h-12 rounded-xl bg-white/5 p-1 flex gap-2 overflow-hidden border border-white/5">
                <div className="w-full h-full rounded-lg bg-purple-600/60 flex items-center justify-between px-3 text-[10px] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-purple-300" />
                    Basse &amp; Whoosh Sound Design
                  </span>
                  <span className="text-white/40 font-mono">-14 LUFS</span>
                </div>
              </div>
            </div>

            {/* Track 4: Kinetic Subtitles */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[11px] font-mono text-white/50 truncate">TXT • Sous-titres</span>
              <div className="flex-1 h-10 rounded-xl bg-white/5 p-1 flex gap-2 overflow-hidden border border-white/5">
                <div className="w-1/6 ml-8 h-full rounded-md bg-amber-500/80 flex items-center justify-center text-[10px] font-bold text-black">
                  HOOK 3s
                </div>
                <div className="w-1/6 ml-4 h-full rounded-md bg-rose-500/80 flex items-center justify-center text-[10px] font-bold text-white">
                  MOT-À-MOT
                </div>
                <div className="w-1/5 ml-8 h-full rounded-md bg-amber-500/80 flex items-center justify-center text-[10px] font-bold text-black">
                  CTA FINAL
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Staggered Mobile Phones (Reels & TikToks) scrolling at varied speeds */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-16 items-center">
          {/* Phone 1 */}
          <motion.div
            style={{ y: phone1Y }}
            className="rounded-[36px] overflow-hidden p-2.5 bg-black shadow-2xl relative"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
              <Image
                src={data.images.reel1}
                alt="Reel viral format court"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 350px"
              />
              <div className="absolute bottom-5 inset-x-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white text-xs">
                <span className="font-bold text-rose-400 block">Accroche Rétention</span>
                <span className="text-[11px] text-white/70 block">Mots soulignés en direct</span>
              </div>
            </div>
          </motion.div>

          {/* Phone 2 (Center highlight) */}
          <motion.div
            style={{ y: phone2Y }}
            className="rounded-[36px] overflow-hidden p-2.5 bg-black shadow-2xl relative border-2 border-[#F43F6E]/40"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
              <Image
                src={data.images.reel2}
                alt="Format court avec hook percutant"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 350px"
              />
              <div className="absolute bottom-5 inset-x-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white text-xs">
                <span className="font-bold text-amber-400 block">+100k Vues / Vidéo</span>
                <span className="text-[11px] text-white/70 block">Cadence &amp; cut millimétré</span>
              </div>
            </div>
          </motion.div>

          {/* Phone 3 / Color Grading Preview */}
          <motion.div
            style={{ y: phone3Y }}
            className="rounded-[36px] overflow-hidden p-2.5 bg-black shadow-2xl relative"
          >
            <PlaceholderBadge />
            <div className="relative aspect-[9/16] w-full rounded-[28px] overflow-hidden bg-slate-900">
              <Image
                src={data.images.colorGrading}
                alt="Étalonnage colorimétrique DaVinci Resolve"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 350px"
              />
              <div className="absolute bottom-5 inset-x-4 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white text-xs">
                <span className="font-bold text-blue-400 block">Étalonnage Cinéma</span>
                <span className="text-[11px] text-white/70 block">LUTs &amp; courbes personnalisées</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-600">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
