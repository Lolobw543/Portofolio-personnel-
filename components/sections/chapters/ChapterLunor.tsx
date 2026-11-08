"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { ShoppingBag, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";

export default function ChapterLunor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.lunor;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax inverted scroll velocities for the editorial collage
  const ghostX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const colLeftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const colRightY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const shopifyScrollY = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "-35%"]);

  return (
    <div
      id="chapitre-03"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center bg-gradient-to-b from-transparent via-[#FAF5EE]/60 to-transparent"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 left-0 pointer-events-none select-none text-[15vw] font-serif italic text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        LUNOR • HAUTE JOAILLERIE • D2C
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header copy with Editorial Luxury Serif Accent */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={ShoppingBag} />
          {data.revenueMetric && !data.revenueMetric.startsWith("[") && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-800">
              {data.revenueMetric}
            </span>
          )}
          {data.conversionMetric && !data.conversionMetric.startsWith("[") && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-700">
              {data.conversionMetric}
            </span>
          )}
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          E-Commerce & Marque{" "}
          <span className="font-serif italic font-normal tracking-wide text-[#92400E]">
            {data.brandName}
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Asymmetrical Editorial Product Collage in Inverted Parallax */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-20 items-center">
          {/* Left Column (Parallax Down/Up) */}
          <motion.div style={{ y: colLeftY }} className="lg:col-span-5 flex flex-col gap-8">
            {/* Ring on Silk: Arched frame */}
            <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl border border-white/80 group">
              <PlaceholderBadge />
              <Image
                src={data.images.ring}
                alt="Bague Lunor sur soie"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 text-white text-xs">
                <div>
                  <span className="font-serif italic text-base">La Bague Solaire</span>
                  <p className="text-white/70 text-[11px]">Or recyclé 18k &amp; travail de texture</p>
                </div>
              </div>
            </div>

            {/* Earrings Macro: Round circular frame */}
            <div className="relative rounded-[32px] overflow-hidden aspect-square shadow-xl border border-white/80 max-w-xs mx-auto group">
              <PlaceholderBadge />
              <Image
                src={data.images.earrings}
                alt="Boucles d'oreilles Lunor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="320px"
              />
            </div>
          </motion.div>

          {/* Right Column: Necklace & Packaging (Inverted Parallax) */}
          <motion.div style={{ y: colRightY }} className="lg:col-span-7 flex flex-col gap-8">
            {/* Necklace editorial */}
            <div className="relative rounded-[36px] overflow-hidden aspect-[16/10] shadow-2xl border border-white/80 group">
              <PlaceholderBadge />
              <Image
                src={data.images.necklace}
                alt="Collier Lunor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              <div className="absolute bottom-6 right-6 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md text-[var(--ink)] text-xs font-medium shadow-lg flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Direction artistique épurée</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Luxury Packaging */}
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-lg border border-white/80">
                <PlaceholderBadge />
                <Image
                  src={data.images.packaging}
                  alt="Packaging bijouterie Lunor"
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>

              {/* Model Back View */}
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] shadow-lg border border-white/80">
                <PlaceholderBadge />
                <Image
                  src={data.images.model}
                  alt="Mannequin éditorial Lunor"
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Shopify Store Mockup with Internal Scroll */}
        <div className="my-16 rounded-[36px] bg-white/90 backdrop-blur-xl border border-white/90 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(20,20,31,0.08)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block">
                Boutique Shopify Lunor Paris
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] block">
                Expérience client fluide, tunnels de conversion & checkout optimisé
              </span>
            </div>
            <a
              href="https://lunor-paris.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#14141F] text-white hover:bg-[#F43F6E] transition-colors"
            >
              <span>Visiter la boutique</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Viewport Frame with internally scrolling page content */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-black/10 bg-slate-50">
            <PlaceholderBadge />
            <motion.div style={{ y: shopifyScrollY }} className="relative w-full h-[180%]">
              <Image
                src={data.images.shopify}
                alt="Maquette de la boutique Shopify Lunor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </motion.div>
          </div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#D97706]">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
