"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT, ProjectItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { FolderGit2, ArrowUpRight, X, ExternalLink, CheckCircle } from "lucide-react";

export default function ProjectsBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const projects = SITE_CONTENT.projects;

  return (
    <section id="realisations" className="relative py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-20 text-center">
        <SectionBadge label="Réalisations & Projets" icon={FolderGit2} />

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--ink)] mt-4">
          Ce que j&apos;ai <HighlightText>conçu et mis en production</HighlightText>
        </h2>

        <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mt-4 font-normal">
          Un mélange de logiciels SaaS, de boutiques e-commerce de marque, d&apos;automatisations IA et de productions aériennes.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <BentoCard
            key={project.id}
            project={project}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Interactive Detail Modal with Shared-Element Feel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Single Bento Card with 3D Tilt and Mouse Halo
function BentoCard({
  project,
  onOpenModal,
}: {
  project: ProjectItem;
  onOpenModal: () => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isNavy = project.theme === "navy";

  return (
    <motion.div
      layoutId={`project-card-${project.id}`}
      onClick={onOpenModal}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[36px] p-7 sm:p-9 cursor-pointer overflow-hidden transition-all duration-500 ${
        project.span
      } ${
        isNavy
          ? "bg-[#1B1B4B] text-white shadow-[0_25px_60px_rgba(27,27,75,0.4)] border border-white/10"
          : "glass-card text-[var(--ink)] shadow-[0_18px_45px_rgba(20,20,31,0.06)] border border-white/90 hover:bg-white/95"
      }`}
    >
      {/* Halo gradient following the mouse pointer */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 rounded-[36px]"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${
              isNavy ? "rgba(244, 63, 110, 0.25)" : "rgba(244, 63, 110, 0.12)"
            }, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        {/* Card Header: Category & Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
              isNavy
                ? "bg-white/10 text-white/90 border border-white/15"
                : "bg-black/[0.04] text-[var(--ink)] border border-black/[0.05]"
            }`}
          >
            {project.badge}
          </span>

          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isNavy
                ? "bg-white/10 text-white group-hover:bg-[#F43F6E] group-hover:scale-110"
                : "bg-black/5 text-[var(--ink)] group-hover:bg-[#F43F6E] group-hover:text-white group-hover:scale-110"
            }`}
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>

        {/* Card Image Preview */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-black/10">
          <PlaceholderBadge />
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Floating Hover "Voir" Pill */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-[var(--ink)] text-xs font-semibold shadow-xl scale-95 group-hover:scale-100 transition-transform">
              Découvrir le projet
            </span>
          </div>
        </div>

        {/* Card Content & Metrics */}
        <div>
          <h3
            className={`text-2xl font-medium tracking-tight ${
              isNavy ? "text-white" : "text-[var(--ink)]"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed ${
              isNavy ? "text-white/70" : "text-[var(--ink-muted)]"
            }`}
          >
            {project.summary}
          </p>
        </div>

        {/* Metrics Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t ${
            isNavy ? "border-white/10" : "border-black/[0.06]"
          }`}
        >
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                {m.label}
              </span>
              <span
                className={`text-xs font-semibold mt-0.5 ${
                  isNavy ? "text-white" : "text-[var(--ink)]"
                }`}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Project Detail Modal with Shared-Element feel
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Dialog Content */}
      <motion.div
        layoutId={`project-card-${project.id}`}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-2xl rounded-[36px] bg-white p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar border border-white/80"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[var(--ink)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#F43F6E]/10 text-[#F43F6E]">
              {project.category}
            </span>
            <span className="text-xs text-[var(--ink-muted)]">{project.badge}</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--ink-muted)] mt-1">{project.subtitle}</p>
          </div>

          {/* Modal Image */}
          <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-900">
            <PlaceholderBadge />
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>

          {/* Contexte & Problématique */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
              Contexte &amp; Objectif
            </h4>
            <p className="text-sm text-[var(--ink)] leading-relaxed font-light">
              {project.context}
            </p>
          </div>

          {/* Outils & Technologies */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
              Outils &amp; Stack technique
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-black/[0.04] text-[var(--ink)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Résultats & Chiffres */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.05]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[11px] text-[var(--ink-muted)]">{m.label}</span>
                <span className="text-sm font-semibold text-[var(--ink)] mt-0.5">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
            <span className="text-xs text-[var(--ink-muted)] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#10B981]" />
              Projet validé &amp; fonctionnel
            </span>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#F43F6E] text-white shadow-md hover:bg-[#e11d48] transition-colors"
              >
                <span>Accéder au projet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
