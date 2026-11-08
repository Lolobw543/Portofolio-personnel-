"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";

interface FilmScene {
  id: string;
  title: string;
  tag: string;
  image: string;
  story: string;
  learning: string;
  badgeColor: string;
}

const SCENES: FilmScene[] = [
  {
    id: "lunor",
    title: "LUNOR Joaillerie",
    tag: "Marque D2C & E-Commerce",
    image: "/images/projects/lunor-cover.webp",
    story: "Création intégrale d'une marque de bijoux contemporains : charte graphique, shooting, packaging et boutique Shopify optimisée.",
    learning: "Ne jamais négliger l'impact et la constance des publications sur les réseaux sociaux. Le produit ne vit que s'il est vu.",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  {
    id: "certidrone",
    title: "CertiDrone",
    tag: "SaaS IA • En Bêta",
    image: "/images/projects/certidron-cover.webp",
    story: "Résoudre ma propre frustration de pilote : automatiser la préparation des vols pour le lendemain directement depuis son écran.",
    learning: "Construire pour des professionnels impose une tolérance zéro à l'erreur. La conformité réglementaire doit être infaillible.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    id: "autosocial",
    title: "AutoSocial",
    tag: "Pipeline n8n & IA",
    image: "/images/projects/autosocial-cover.webp",
    story: "Conception d'un moteur autonome pour diffuser du contenu sur 4 réseaux sans intervention manuelle quotidienne.",
    learning: "Déléguer aux machines permet de garder l'esprit clair et d'économiser 15 heures par semaine sur des tâches répétitives.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    id: "showreel",
    title: "Showreel Aérien 4K",
    tag: "Prises de vues DGAC",
    image: "/images/projects/drone-cover.webp",
    story: "Environ 200 vols réalisés : vignobles bordelais, falaises normandes, chantiers d'envergure et villas d'exception.",
    learning: "La discipline de la lumière. Savoir attendre les 15 minutes d'or au coucher du soleil pour sublimer un domaine.",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
];

export default function FilmstripProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full my-12">
      {/* 35mm Filmstrip Header Tape */}
      <div className="flex items-center justify-between mb-6 px-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--ink-muted)]">
          Pellicule de Projets • Photogrammes 35mm
        </span>
        <span className="text-xs text-[#F43F6E] font-medium flex items-center gap-1">
          <span>Faire défiler horizontalement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Filmstrip Roll with Sprocket Holes */}
      <div className="relative rounded-[36px] bg-[#0E121E] py-8 px-4 sm:px-6 shadow-2xl border border-white/10 overflow-hidden">
        {/* Top Sprocket Perforations */}
        <div className="flex justify-between gap-2 overflow-hidden mb-6 opacity-30 select-none pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <span key={i} className="w-4 h-6 rounded-sm bg-white/40 flex-shrink-0" />
          ))}
        </div>

        {/* Horizontal Scrollable Scenes */}
        <div className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory no-scrollbar px-2">
          {SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              className="min-w-[320px] sm:min-w-[420px] md:min-w-[480px] rounded-3xl bg-[#161C2C] border border-white/10 p-5 flex flex-col justify-between snap-start flex-shrink-0 shadow-xl transition-transform duration-300 hover:scale-[1.01]"
            >
              <div>
                {/* Scene Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-white/50 tracking-wider">
                    SCÈNE 0{idx + 1}
                  </span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${scene.badgeColor}`}>
                    {scene.tag}
                  </span>
                </div>

                {/* Main Large Visual */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/50 mb-5">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 320px, 480px"
                  />
                </div>

                <h4 className="text-xl font-bold text-white tracking-tight mb-2">
                  {scene.title}
                </h4>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                  {scene.story}
                </p>
              </div>

              {/* What I learned badge */}
              <div className="mt-4 pt-4 border-t border-white/10 rounded-2xl bg-white/[0.04] p-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">
                    Ce que ça m&apos;a appris
                  </span>
                </div>
                <p className="text-xs text-white/90 italic leading-relaxed">
                  « {scene.learning} »
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sprocket Perforations */}
        <div className="flex justify-between gap-2 overflow-hidden mt-6 opacity-30 select-none pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <span key={i} className="w-4 h-6 rounded-sm bg-white/40 flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
