"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface SubtitlesNarrativeProps {
  sentences: {
    text: string;
    highlightWords?: string[];
    draft?: boolean;
    missingInfo?: string;
  }[];
  className?: string;
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
}

function NarrativeWord({ word, progress, range, isHighlighted }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const highlightScale = useTransform(progress, [range[1] - 0.03, range[1]], [0, 1]);

  return (
    <span className="relative inline-block mx-[0.18em] my-[0.08em] whitespace-nowrap">
      {isHighlighted && (
        <motion.span
          style={{ scaleX: highlightScale }}
          className="absolute inset-x-0 bottom-1 top-2 bg-[#FDE1E8] rounded-md -z-10 origin-left"
        />
      )}
      <motion.span
        style={{ opacity }}
        className={`transition-colors duration-200 ${
          isHighlighted ? "font-semibold text-[var(--ink)]" : "font-light text-[var(--ink)]"
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function SubtitlesNarrative({
  sentences,
  className = "",
}: SubtitlesNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });

  // Flatten all words across sentences and retain highlight status
  const allWords: { word: string; isHighlighted: boolean }[] = [];

  sentences.forEach((sentence) => {
    const rawWords = sentence.text.split(" ");
    const highlights = sentence.highlightWords || [];

    rawWords.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9à-ÿ]/gi, "");
      const isHigh = highlights.some((h) => {
        const cleanH = h.toLowerCase().replace(/[^a-z0-9à-ÿ]/gi, "");
        return cleanH.includes(cleanWord) && cleanWord.length > 2;
      });
      allWords.push({ word, isHighlighted: isHigh });
    });
  });

  return (
    <div
      ref={containerRef}
      className={`relative my-8 max-w-4xl mx-auto text-center ${className}`}
    >
      <p className="text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.35] tracking-[-0.02em] select-none">
        {allWords.map((item, idx) => {
          const start = idx / allWords.length;
          const end = Math.min((idx + 1) / allWords.length, 1);
          return (
            <NarrativeWord
              key={idx}
              word={item.word}
              progress={scrollYProgress}
              range={[start, end]}
              isHighlighted={item.isHighlighted}
            />
          );
        })}
      </p>
    </div>
  );
}
