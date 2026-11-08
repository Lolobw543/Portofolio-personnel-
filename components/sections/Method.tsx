"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE_CONTENT, MethodStep } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import { Workflow } from "lucide-react";

export default function Method() {
  const containerRef = useRef<HTMLElement>(null);
  const steps = SITE_CONTENT.method.steps;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 40%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section
      id="methode"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
        <SectionBadge label={SITE_CONTENT.method.badge} icon={Workflow} />

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--ink)] mt-4">
          De l&apos;idée à la mise en ligne, en{" "}
          <HighlightText>quelques jours</HighlightText>
        </h2>

        <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mt-3 font-normal">
          {SITE_CONTENT.method.subtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Animated Connecting Dashed SVG Line between cards on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 pointer-events-none z-0">
          <svg className="w-full h-32" viewBox="0 0 1000 120" fill="none">
            <motion.path
              d="M 50 60 C 250 10, 350 110, 500 60 C 650 10, 750 110, 950 60"
              stroke="#F43F6E"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* 4 Post-It Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <PostItCard key={step.number} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Single Post-It Card with 3D Pin & Paper Rotation
function PostItCard({ step, index }: { step: MethodStep; index: number }) {
  const pinColors: Record<string, string> = {
    rose: "bg-[#F43F6E] shadow-[#F43F6E]/40",
    amber: "bg-[#F59E0B] shadow-[#F59E0B]/40",
    mint: "bg-[#10B981] shadow-[#10B981]/40",
    lavender: "bg-[#8B5CF6] shadow-[#8B5CF6]/40",
  };

  const bgTints = [
    "bg-[#FFFDF9]", // Cream
    "bg-[#FEFAF6]", // Soft peach
    "bg-[#F8FAF9]", // Soft mint
    "bg-[#F9F8FC]", // Soft lavender
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        zIndex: 20,
        transition: { type: "spring", stiffness: 350, damping: 20 },
      }}
      style={{ rotate: `${step.rotationDeg}deg` }}
      className={`relative rounded-[28px] p-7 ${bgTints[index % bgTints.length]} border border-black/[0.07] shadow-[0_15px_35px_-10px_rgba(20,20,31,0.08)] flex flex-col justify-between min-h-[300px] cursor-default select-none`}
    >
      {/* Realistic 3D Pushpin on top center */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        {/* Pin Head */}
        <div
          className={`w-4 h-4 rounded-full shadow-md border-2 border-white/80 ${
            pinColors[step.pinColor] || pinColors.rose
          }`}
        />
        {/* Pin Needle Shadow */}
        <div className="w-0.5 h-2 bg-black/30 rounded-full" />
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between">
          <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
            {step.number}
          </span>
          <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            Étape {step.number}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-medium tracking-tight text-[var(--ink)]">
            {step.title}
          </h3>
          <p className="text-xs font-semibold text-[#F43F6E] mt-1">{step.subtitle}</p>
        </div>

        <p className="text-xs text-[var(--ink-muted)] leading-relaxed font-light">
          {step.description}
        </p>
      </div>

      <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
        <span>Itération continue</span>
        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
      </div>
    </motion.div>
  );
}
