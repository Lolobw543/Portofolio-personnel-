"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT, ChapterItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import { Sparkles, ArrowUpRight, Cpu, Layers, Video, ShieldCheck, ShoppingBag } from "lucide-react";

export default function Chapters() {
  const chapters = SITE_CONTENT.chapters;

  return (
    <section id="chapitres" className="relative py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {chapters.map((chapter, index) => (
          <ChapterBlock key={chapter.number} chapter={chapter} index={index} />
        ))}
      </div>
    </section>
  );
}

function ChapterBlock({ chapter, index }: { chapter: ChapterItem; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  // Parallax on ghost number and horizontal slide on ghost word
  const ghostNumY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ghostWordX = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [-80, 80] : [80, -80]
  );
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [4, 0, 0, 4]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  const iconByNumber: Record<string, React.ReactNode> = {
    "01": <Cpu className="w-4 h-4 text-[#F43F6E]" />,
    "02": <Layers className="w-4 h-4 text-[#3B82F6]" />,
    "03": <ShoppingBag className="w-4 h-4 text-[#D97706]" />,
    "04": <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
    "05": <Video className="w-4 h-4 text-[#8B5CF6]" />,
  };

  return (
    <motion.div
      ref={blockRef}
      style={{
        opacity: opacityValue,
        filter: useTransform(blurValue, (v) => `blur(${v}px)`),
      }}
      className="relative rounded-[36px] glass-card p-6 sm:p-10 lg:p-16 overflow-hidden border border-white/80 shadow-[0_20px_60px_-15px_rgba(20,20,31,0.06)]"
    >
      {/* Background Ghost Number */}
      <motion.div
        style={{ y: ghostNumY }}
        className="absolute -top-12 -right-8 pointer-events-none select-none text-[18vw] font-black text-black/[0.03] leading-none z-0"
      >
        {chapter.number}
      </motion.div>

      {/* Horizontal Sliding Ghost Word */}
      <motion.div
        style={{ x: ghostWordX }}
        className="absolute bottom-4 left-0 pointer-events-none select-none text-[12vw] font-black uppercase text-outline opacity-40 leading-none whitespace-nowrap z-0"
      >
        {chapter.ghostWord}
      </motion.div>

      {/* Content Layout: Sticky Left, Scrolling Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
              {chapter.number}
            </span>
            <SectionBadge label={chapter.badge} icon={Sparkles} />
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--ink)] leading-tight">
            {chapter.title.split("&").map((part, pIdx, arr) => (
              <React.Fragment key={pIdx}>
                {pIdx === 0 ? <HighlightText>{part.trim()}</HighlightText> : ` & ${part.trim()}`}
                {pIdx < arr.length - 1 && " "}
              </React.Fragment>
            ))}
          </h3>

          {/* Description phrases */}
          <div className="flex flex-col gap-3 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
            {chapter.description.map((phrase, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F43F6E] mt-2 flex-shrink-0" />
                <p>{phrase}</p>
              </div>
            ))}
          </div>

          {/* Skill & Tool Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {chapter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-[var(--ink)] border border-black/[0.06] shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Project Preview Card or Drone Interactive Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {chapter.number === "04" ? (
            /* Special Drone Showcase with Horizontal Gallery & Video Previews */
            <div className="rounded-[28px] p-6 sm:p-8 bg-[#1B1B4B] text-white shadow-[0_25px_60px_-15px_rgba(27,27,75,0.4)] border border-white/10 flex flex-col gap-6 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F43F6E] text-white">
                  Télépilote Certifié DGAC
                </span>
                <span className="text-xs text-white/60">Scénarios S1 • S2 • S3</span>
              </div>

              <div>
                <h4 className="text-2xl font-medium tracking-tight text-white">
                  Captation & Cinématique Aérienne 4K
                </h4>
                <p className="text-sm text-white/70 mt-1 font-light">
                  Survolez les cartes pour prévisualiser les prises de vue en conditions réelles.
                </p>
              </div>

              {/* Horizontal Scrollable Gallery Cards */}
              <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x">
                {[
                  {
                    title: "Château & Domaine Viticole",
                    location: "Bordeaux, France",
                    tag: "4K DCI • S3 Urbain",
                    color: "from-amber-500/30 to-purple-900/40",
                  },
                  {
                    title: "Villa Contemporaine d'Exception",
                    location: "Côte d'Azur",
                    tag: "Slow-Mo 60fps • S1",
                    color: "from-blue-500/30 to-indigo-900/40",
                  },
                  {
                    title: "Suivi de Chantier & Télémétrie",
                    location: "Île-de-France",
                    tag: "Orthophoto & 4K",
                    color: "from-emerald-500/30 to-teal-900/40",
                  },
                ].map((shot, idx) => (
                  <div
                    key={idx}
                    className="snap-center flex-shrink-0 w-64 sm:w-72 rounded-2xl p-5 bg-white/10 border border-white/15 relative overflow-hidden group hover:border-[#F43F6E]/50 transition-all cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${shot.color} opacity-40 group-hover:opacity-70 transition-opacity`} />
                    <div className="relative z-10 flex flex-col justify-between h-40">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-white/90">
                          {shot.tag}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#F43F6E] transition-colors">
                          <Video className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-white tracking-tight">
                          {shot.title}
                        </h5>
                        <p className="text-xs text-white/60 mt-0.5">{shot.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/70">
                <span>[À REMPLACER: vos propres vidéos drone]</span>
                <a
                  href="#contact"
                  className="text-[#F43F6E] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Réserver un vol</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Standard Chapter Project Preview Card */
            <div className="group relative rounded-[28px] p-6 sm:p-8 bg-[#1B1B4B] text-white shadow-[0_25px_60px_-15px_rgba(27,27,75,0.4)] border border-white/10 overflow-hidden hover:shadow-[0_30px_70px_-10px_rgba(244,63,110,0.3)] transition-all duration-500">
              {/* Background Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#F43F6E]/20 blur-3xl group-hover:bg-[#F43F6E]/35 transition-colors duration-500" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#3B82F6]/20 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-white">
                    {chapter.projectPreview.badge}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F43F6E] text-white">
                    {chapter.projectPreview.metrics}
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                    {chapter.projectPreview.title}
                  </h4>
                  <p className="text-sm text-white/70 mt-2 font-light leading-relaxed">
                    {chapter.projectPreview.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed font-normal">
                  {chapter.projectPreview.tagline}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-white/50">Projet concret & résultats</span>
                  <a
                    href="#realisations"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F43F6E] group-hover:text-white transition-colors"
                  >
                    <span>Voir en détail</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Micro Card / Live Metric */}
          <div className="p-5 rounded-[24px] bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center">
                {iconByNumber[chapter.number]}
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--ink)]">Expertise {chapter.number}</p>
                <p className="text-[11px] text-[var(--ink-muted)]">Prêt à intégrer dans vos projets</p>
              </div>
            </div>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--ink)] text-white hover:bg-[#F43F6E] transition-colors"
            >
              Échanger
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
