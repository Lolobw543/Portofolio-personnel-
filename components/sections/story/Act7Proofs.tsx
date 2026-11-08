"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { STORY_CONTENT } from "@/content/story";
import {
  FileText,
  ShieldCheck,
  Plane,
  Video,
  Clock,
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ProofDossier {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  problem: string;
  action: string;
  result: string;
  metricBadge: string;
  tags: string[];
  externalUrl?: string;
}

const DOSSIERS: ProofDossier[] = [
  {
    id: "certidrone",
    number: "DOSSIER 01",
    title: "CertiDrone • Copilote SaaS pour Télépilotes",
    category: "SaaS & IA Aéronautique",
    image: "/images/saas/certidron-dashboard.webp",
    problem: "La préparation des vols de drone professionnels est fastidieuse : conformité AlphaTango, NOTAMs, vérifications météo et déclarations préfectorales mobilisent des heures avant chaque décollage.",
    action: "Développement d'un SaaS complet (Next.js, Supabase, APIs météo & cartographie, Stripe, OpenAI) qui centralise et automatise la préparation des vols pour le lendemain depuis son ordinateur.",
    result: "Plateforme fonctionnelle et sécurisée, actuellement en phase bêta privée en attente de lancement officiel.",
    metricBadge: "Statut : En Bêta",
    tags: ["Next.js App Router", "Supabase", "OpenAI API", "Réglementation DGAC"],
    externalUrl: "https://certidrone.fr",
  },
  {
    id: "vols-drone",
    number: "DOSSIER 02",
    title: "Opérations Aériennes Certifiées",
    category: "Drone Professionnel STS-01/STS-02",
    image: "/images/drone/chateau-vineyard.webp",
    problem: "Capturer des domaines prestigieux (vignobles, châteaux, chantiers, immobilier de luxe) en respectant les exigences légales strictes de sécurité aérienne.",
    action: "Télépilotage certifié DGAC (scénarios STS-01 & STS-02), cadrages cinématiques 4K DCI, planification au millimètre et respect rigoureux des protocoles de sécurité.",
    result: "Environ 200 vols réalisés depuis mes débuts, avec une tolérance zéro à l'incident et un rendu visuel d'exception.",
    metricBadge: "~200 Vols Réalisés",
    tags: ["4K DCI", "DJI Pro", "DGAC Certifié", "Scénarios S1/S2/S3"],
  },
  {
    id: "lunor",
    number: "DOSSIER 03",
    title: "LUNOR • Marque de Bijoux & E-Commerce",
    category: "Branding D2C & Shopify",
    image: "/images/projects/lunor-cover.webp",
    problem: "Lancer une marque de joaillerie contemporaine de zéro et créer un univers visuel digne du luxe accessible sans budget d'agence démesuré.",
    action: "Création intégrale de l'identité de marque, charte graphique, shooting studio, packaging et boutique Shopify hautement optimisée pour la conversion.",
    result: "Une marque vivante avec ses tunnels d'achat directs et une grande leçon apprise : la nécessité absolue d'une régularité sans faille sur les réseaux sociaux.",
    metricBadge: "Marque D2C Vivante",
    tags: ["Shopify", "Branding Luxe", "Packshots IA", "Social Ads"],
  },
  {
    id: "content-video",
    number: "DOSSIER 04",
    title: "Post-Production Vidéo & Rétention",
    category: "Montage Cinéma & Formats Courts",
    image: "/images/content/color-grading.webp",
    problem: "Capter et retenir l'attention dès les 3 premières secondes dans un flux social saturé.",
    action: "Montage rythmé sur CapCut et DaVinci Resolve, étalonnage cinématique des profils D-Log, sound design immersif et sous-titres dynamiques mot-à-mot.",
    result: "Plus de 180 vidéos montées et étalonnées avec des hooks visuels percutants et une colorimétrie soignée.",
    metricBadge: "+180 Vidéos Montées",
    tags: ["DaVinci Resolve", "CapCut", "Étalonnage 4K", "Rétention 3s"],
  },
];

export default function Act7Proofs() {
  const [selectedDossier, setSelectedDossier] = useState<ProofDossier | null>(null);
  const act = STORY_CONTENT.acts.act7;
  const metrics = STORY_CONTENT.metrics;

  return (
    <section
      id={act.id}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Chapter Header Card */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
              07
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

          {/* 3 Key Metric Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 flex items-center gap-2">
              <Plane className="w-4 h-4 text-emerald-600" />
              <span>~{metrics.flightsCount} vols de drone</span>
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700 border border-rose-500/20 flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-600" />
              <span>~{metrics.videosCount} vidéos montées</span>
            </span>
            <span className="px-4 py-2 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-800 border border-blue-500/20 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>~{metrics.hoursSavedWeekly}h / semaine économisées</span>
            </span>
          </div>
        </div>

        {/* 4 Case Files (Dossiers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {DOSSIERS.map((dossier) => (
            <motion.div
              key={dossier.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedDossier(dossier)}
              className="rounded-[36px] bg-white p-7 sm:p-9 border border-black/5 shadow-[0_15px_45px_rgba(20,20,31,0.06)] flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#F43F6E] font-bold">
                    {dossier.number}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/5 text-[var(--ink)]">
                    {dossier.metricBadge}
                  </span>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 mb-6">
                  <Image
                    src={dossier.image}
                    alt={dossier.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                </div>

                <h3 className="text-xl font-bold text-[var(--ink)] tracking-tight mb-2">
                  {dossier.title}
                </h3>
                <span className="text-xs text-[var(--ink-muted)] block mb-4 font-mono">
                  {dossier.category}
                </span>

                <div className="space-y-3 text-xs text-[var(--ink-muted)]">
                  <div>
                    <strong className="text-[var(--ink)]">Problème : </strong>
                    <span>{dossier.problem}</span>
                  </div>
                  <div>
                    <strong className="text-[var(--ink)]">Ce que j&apos;ai fait : </strong>
                    <span>{dossier.action}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {dossier.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/[0.03] text-[var(--ink)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#F43F6E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Examiner</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Detail Dossier */}
      <AnimatePresence>
        {selectedDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[36px] bg-white p-8 shadow-2xl border border-black/10"
            >
              <button
                onClick={() => setSelectedDossier(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[var(--ink)] hover:bg-[#F43F6E] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono text-[#F43F6E] font-bold block mb-1">
                {selectedDossier.number}
              </span>
              <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">
                {selectedDossier.title}
              </h3>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 mb-6">
                <Image
                  src={selectedDossier.image}
                  alt={selectedDossier.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-[var(--ink)]">
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-1">
                    1. Le Problème
                  </span>
                  <p>{selectedDossier.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)] block mb-1">
                    2. Ce que j&apos;ai fait
                  </span>
                  <p>{selectedDossier.action}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    3. Le Résultat
                  </span>
                  <p className="font-medium">{selectedDossier.result}</p>
                </div>
              </div>

              {selectedDossier.externalUrl && (
                <div className="mt-6 pt-4 border-t border-black/5 flex justify-end">
                  <a
                    href={selectedDossier.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F43F6E] text-white text-xs font-semibold hover:bg-[#e11d48] transition-colors"
                  >
                    <span>Ouvrir {selectedDossier.externalUrl}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
