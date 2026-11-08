"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import { Compass } from "lucide-react";

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
}

function Word({ children, progress, range, isHighlighted }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const highlightProgress = useTransform(progress, [range[1] - 0.05, 1], [0, 1]);

  return (
    <span className="relative inline-block mx-[0.2em] my-[0.1em]">
      {isHighlighted && (
        <motion.span
          style={{ scaleX: highlightProgress }}
          className="absolute inset-x-0 bottom-1 top-2 bg-[#FDE1E8] rounded-md -z-10 origin-left"
        />
      )}
      <motion.span
        style={{ opacity }}
        className={`transition-colors duration-200 ${
          isHighlighted ? "font-medium text-[var(--ink)]" : "font-light text-[var(--ink)]"
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  });

  const fullText = SITE_CONTENT.manifesto.lead;
  const words = fullText.split(" ");
  const highlightPhrases = SITE_CONTENT.manifesto.highlightWords;

  // Helper to test if a word belongs to any highlight phrase
  const isWordHighlighted = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[^a-zà-ÿ]/gi, "");
    return highlightPhrases.some((phrase) =>
      phrase.toLowerCase().includes(cleanWord) && cleanWord.length > 2
    );
  };

  return (
    <section
      id="manifeste"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Badge */}
        <div className="flex justify-center mb-10">
          <SectionBadge label={SITE_CONTENT.manifesto.badge} icon={Compass} />
        </div>

        {/* Card backdrop for luxury feel */}
        <div className="relative p-8 sm:p-14 md:p-18 rounded-[36px] glass-card shadow-[0_20px_60px_-15px_rgba(20,20,31,0.06)] border border-white/90">
          {/* Subtle quote accent watermark */}
          <span className="absolute top-6 left-8 text-7xl font-serif text-[#F43F6E]/15 select-none pointer-events-none">
            “
          </span>

          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.3] tracking-[-0.03em] text-center max-w-4xl mx-auto select-none">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isHighlighted={isWordHighlighted(word)}
                >
                  {word}
                </Word>
              );
            })}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-black/[0.06] text-xs text-[var(--ink-muted)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
                L
              </div>
              <div>
                <p className="font-semibold text-[var(--ink)]">{SITE_CONTENT.manifesto.authorName}</p>
                <p>{SITE_CONTENT.manifesto.authorRole}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F43F6E]/10 text-[#F43F6E] font-medium">
                100% orienté exécution & rentabilité
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
