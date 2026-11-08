"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT, ToolItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import { Wrench, Layers } from "lucide-react";

export default function Arsenal() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const tools = SITE_CONTENT.arsenal.primaryTools;
  const techStack = SITE_CONTENT.arsenal.techStack;
  const categories = SITE_CONTENT.arsenal.categories;

  // Split the 33 primary tools into 3 balanced rows for the marquee
  const row1 = tools.slice(0, 11);
  const row2 = tools.slice(11, 22);
  const row3 = tools.slice(22, 33);

  // Parallax subtle shifts for rows
  const row1Shift = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const row2Shift = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const row3Shift = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Initial cloud scatter to converged rows along entry scroll
  const cloudConvergence = useTransform(scrollYProgress, [0, 0.35], [20, 0]);
  const cloudBlur = useTransform(scrollYProgress, [0, 0.25], [10, 0]);

  const filteredTools =
    selectedCategory === "Tous"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

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

      {/* Main Display: 3 Marquee Rows (When "Tous" is selected) OR Responsive Grid (When Filtered) */}
      <AnimatePresence mode="wait">
        {selectedCategory === "Tous" ? (
          <motion.div
            key="marquee-view"
            style={{
              y: cloudConvergence,
              filter: useTransform(cloudBlur, (v) => `blur(${v}px)`),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-8 py-8 overflow-hidden relative"
          >
            {/* Edge Fade Gradients (left and right only) */}
            <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-20 pointer-events-none" />

            {/* Row 1: Left */}
            <motion.div style={{ x: row1Shift }} className="w-full overflow-visible py-4">
              <div className="animate-marquee-left flex gap-5 items-center">
                {[...row1, ...row1].map((tool, idx) => (
                  <ArsenalTile key={`${tool.id}-r1-${idx}`} tool={tool} />
                ))}
              </div>
            </motion.div>

            {/* Row 2: Right */}
            <motion.div style={{ x: row2Shift }} className="w-full overflow-visible py-4">
              <div className="animate-marquee-right flex gap-5 items-center">
                {[...row2, ...row2].map((tool, idx) => (
                  <ArsenalTile key={`${tool.id}-r2-${idx}`} tool={tool} />
                ))}
              </div>
            </motion.div>

            {/* Row 3: Left (alternative speed) */}
            <motion.div style={{ x: row3Shift }} className="w-full overflow-visible py-4">
              <div className="animate-marquee-left-alt flex gap-5 items-center">
                {[...row3, ...row3].map((tool, idx) => (
                  <ArsenalTile key={`${tool.id}-r3-${idx}`} tool={tool} />
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
            className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 py-8"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                className="group relative p-6 rounded-[28px] glass-card flex flex-col items-center text-center gap-3.5 hover:shadow-[0_16px_40px_rgba(244,63,110,0.22)] hover:bg-white transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-black/[0.04] group-hover:scale-115 transition-transform duration-300">
                  <ToolLogo id={tool.id} name={tool.name} size={48} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--ink)] tracking-tight">{tool.name}</h4>
                  <p className="text-[11px] text-[var(--ink-muted)] mt-1 line-clamp-2">{tool.description}</p>
                </div>
                <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[var(--ink-muted)]">
                  {tool.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Groupe Séparé : Stack Technique */}
      <div className="max-w-4xl mx-auto mt-20 pt-10 border-t border-black/[0.06]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/[0.04] text-[var(--ink-muted)] uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Stack Technique & Production</span>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            Les fondations sur lesquelles je déploie mes plateformes et SaaS.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.id}
              className="group p-5 rounded-[24px] glass-card flex flex-col items-center text-center gap-3 hover:shadow-[0_12px_32px_rgba(59,130,246,0.2)] hover:bg-white transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-black/[0.04] group-hover:scale-115 transition-transform duration-300">
                <ToolLogo id={tech.id} name={tech.name} size={42} />
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--ink)] block">{tech.name}</span>
                <span className="text-[10px] text-[var(--ink-muted)] block mt-0.5">{tech.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Single Marquee Tool Tile with Fixed Hit Area and Scaled Internal Element (Point 1)
function ArsenalTile({ tool }: { tool: ToolItem }) {
  return (
    <div className="group relative flex-shrink-0 w-32 sm:w-36 h-36 sm:h-40 cursor-pointer z-10 hover:z-40">
      {/* Floating Tooltip inside fixed wrapper: moves with the tile, never clipped */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-200 z-50 whitespace-nowrap">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#14141F] text-white text-[11px] shadow-2xl border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F43F6E] animate-ping" />
          <span className="font-medium">{tool.name}</span>
          <span className="text-white/60">• {tool.description}</span>
        </div>
      </div>

      {/* Internal Interactive Element: zooms 1.2 on hover without altering outer hit zone */}
      <div className="w-full h-full p-4 sm:p-5 rounded-[28px] glass-card flex flex-col items-center justify-between transition-transform duration-300 ease-out group-hover:scale-120 group-hover:shadow-[0_22px_55px_rgba(244,63,110,0.3)] group-hover:bg-white group-hover:border-[#F43F6E]/40 pointer-events-none select-none">
        {/* Real Logo in Vibrant Color permanently */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-black/[0.03]">
          <ToolLogo id={tool.id} name={tool.name} size={48} />
        </div>

        {/* Tool Name underneath */}
        <div className="text-center w-full mt-2">
          <span className="text-xs font-semibold text-[var(--ink)] tracking-tight block truncate">
            {tool.name}
          </span>
          <span className="text-[10px] text-[var(--ink-muted)] block truncate">
            {tool.category}
          </span>
        </div>
      </div>
    </div>
  );
}
