"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT, ToolItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import { Wrench } from "lucide-react";

export default function Arsenal() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const tools = SITE_CONTENT.arsenal.tools;
  const categories = SITE_CONTENT.arsenal.categories;

  // Split into 3 balanced rows for the marquee
  const row1 = tools.slice(0, Math.ceil(tools.length / 3));
  const row2 = tools.slice(Math.ceil(tools.length / 3), Math.ceil((tools.length * 2) / 3));
  const row3 = tools.slice(Math.ceil((tools.length * 2) / 3));

  // Filtered tools
  const filteredTools =
    selectedCategory === "Tous"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  // Parallax subtle shifts for rows
  const row1Shift = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const row2Shift = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const row3Shift = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="arsenal"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <SectionBadge label={SITE_CONTENT.arsenal.badge} icon={Wrench} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--ink)] max-w-2xl"
        >
          Les outils que je <HighlightText delay={0.3}>maîtrise au quotidien</HighlightText>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mt-4"
        >
          {SITE_CONTENT.arsenal.description}
        </motion.p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 select-none cursor-pointer ${
                  isActive
                    ? "bg-[#14141F] text-white shadow-[0_6px_20px_rgba(20,20,31,0.2)] scale-105"
                    : "bg-white/80 text-[var(--ink-muted)] hover:text-[var(--ink)] border border-white/80 hover:bg-white shadow-sm"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-[#14141F] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Arsenal Display: Continuous Marquee Rows (When "Tous" is selected) OR Responsive Grid (When Filtered) */}
      <AnimatePresence mode="wait">
        {selectedCategory === "Tous" ? (
          <motion.div
            key="marquee-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col gap-5 py-4 overflow-hidden relative"
          >
            {/* Edge Blur Gradients */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

            {/* Row 1: Left */}
            <motion.div style={{ x: row1Shift }} className="w-full overflow-hidden">
              <div className="animate-marquee-left flex gap-4 items-center">
                {[...row1, ...row1, ...row1].map((tool, idx) => (
                  <ToolCard key={`${tool.id}-${idx}`} tool={tool} />
                ))}
              </div>
            </motion.div>

            {/* Row 2: Right */}
            <motion.div style={{ x: row2Shift }} className="w-full overflow-hidden">
              <div className="animate-marquee-right flex gap-4 items-center">
                {[...row2, ...row2, ...row2].map((tool, idx) => (
                  <ToolCard key={`${tool.id}-${idx}`} tool={tool} />
                ))}
              </div>
            </motion.div>

            {/* Row 3: Left */}
            <motion.div style={{ x: row3Shift }} className="w-full overflow-hidden">
              <div className="animate-marquee-left flex gap-4 items-center">
                {[...row3, ...row3, ...row3].map((tool, idx) => (
                  <ToolCard key={`${tool.id}-${idx}`} tool={tool} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Filtered Grid View with Framer Motion Layout */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-8"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative p-5 rounded-[24px] glass-card flex flex-col items-center text-center gap-3 hover:shadow-[0_12px_32px_rgba(244,63,110,0.18)] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-black/[0.04] group-hover:scale-110 transition-transform duration-300"
                  style={{ color: tool.color }}
                >
                  <ToolLogo name={tool.name} id={tool.id} color={tool.color} className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--ink)] tracking-tight">{tool.name}</h4>
                  <p className="text-[11px] text-[var(--ink-muted)] mt-1 line-clamp-1">{tool.description}</p>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/[0.04] text-[var(--ink-muted)]">
                  {tool.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Single Marquee Tool Card
function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <div className="group relative flex-shrink-0 cursor-pointer">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-card transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_30px_rgba(244,63,110,0.25)] group-hover:bg-white select-none">
        {/* Tool Icon with gray-to-color transition */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center bg-white shadow-sm border border-black/[0.04] transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110"
          style={{ color: tool.color }}
        >
          <ToolLogo name={tool.name} id={tool.id} color={tool.color} className="w-5 h-5" />
        </div>

        {/* Name */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-[var(--ink)] tracking-tight whitespace-nowrap">
            {tool.name}
          </span>
          <span className="text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
            {tool.category}
          </span>
        </div>
      </div>

      {/* Floating Tooltip with description on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
        <div className="px-3 py-1.5 rounded-xl bg-[#14141F] text-white text-[11px] shadow-xl border border-white/10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F43F6E]" />
          <span>{tool.description || tool.name}</span>
        </div>
      </div>
    </div>
  );
}
