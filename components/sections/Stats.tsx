"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONTENT, StatItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import { BarChart3, TrendingUp } from "lucide-react";

export default function Stats() {
  const stats = SITE_CONTENT.stats.items;

  return (
    <section id="chiffres" className="relative py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <SectionBadge label={SITE_CONTENT.stats.badge} icon={BarChart3} />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--ink)] mt-4">
          Quelques repères de <HighlightText>mon parcours</HighlightText>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} index={idx} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8s
    const target = stat.numberValue;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    }

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, stat.numberValue]);

  const isNavy = stat.highlight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`rounded-[30px] p-7 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.02] ${
        isNavy
          ? "bg-[#1B1B4B] text-white shadow-[0_20px_50px_rgba(27,27,75,0.35)] border border-white/10"
          : "glass-card text-[var(--ink)] shadow-[0_12px_32px_rgba(20,20,31,0.05)] border border-white/90"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isNavy ? "bg-white/10 text-white" : "bg-black/[0.04] text-[var(--ink)]"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-[#F43F6E]" />
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
            isNavy ? "bg-white/10 text-white/70" : "bg-black/[0.03] text-[var(--ink-muted)]"
          }`}
        >
          Métrique
        </span>
      </div>

      <div className="my-4">
        <div
          className={`text-4xl sm:text-5xl font-light tracking-tight flex items-baseline gap-1 ${
            isNavy ? "text-white" : "text-[var(--ink)]"
          }`}
        >
          <span>{displayValue}</span>
          <span className="text-[#F43F6E] font-medium">{stat.suffix}</span>
        </div>
        <p
          className={`text-sm font-medium mt-2 leading-snug ${
            isNavy ? "text-white/90" : "text-[var(--ink)]"
          }`}
        >
          {stat.label}
        </p>
      </div>

      <div
        className={`pt-3 border-t text-[11px] font-light ${
          isNavy ? "border-white/10 text-white/50" : "border-black/[0.05] text-[var(--ink-muted)]"
        }`}
      >
        {stat.description}
      </div>
    </motion.div>
  );
}
