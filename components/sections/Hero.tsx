"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import MagneticButton from "@/components/common/MagneticButton";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { Plane, Code, Sparkles, ShoppingBag, ChevronDown, CheckCircle2 } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax on scroll for background ghost text and elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.7], [0.12, 0.28]);
  const ghostBlur = useTransform(scrollYProgress, [0, 0.6], [8, 0]);

  // 3D Tilt interaction on photo card
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(x);
    cardY.set(y);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const iconMap: Record<string, React.ReactNode> = {
    plane: <Plane className="w-3.5 h-3.5 text-[#F43F6E]" />,
    code: <Code className="w-3.5 h-3.5 text-[#3B82F6]" />,
    sparkles: <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />,
    "shopping-bag": <ShoppingBag className="w-3.5 h-3.5 text-[#10B981]" />,
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 lg:px-12 overflow-hidden"
    >
      {/* Huge Ghost Text "LAURENTIN" in outline behind */}
      <motion.div
        aria-hidden="true"
        style={{
          y: ghostY,
          opacity: ghostOpacity,
          filter: useTransform(ghostBlur, (val) => `blur(${val}px)`),
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap z-0"
      >
        <span className="text-[20vw] font-black uppercase text-outline tracking-tighter leading-none block">
          LAURENTIN
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 my-auto">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 order-2 lg:order-1">
          <div>
            <SectionBadge label={SITE_CONTENT.hero.badge} icon={Sparkles} />
          </div>

          {/* Main Title with lightweight geometry & pink highlighter */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-light tracking-[-0.035em] text-[var(--ink)] leading-[1.14]">
            Je pilote des <HighlightText delay={0.2}>drones</HighlightText>, je construis des{" "}
            <HighlightText delay={0.4}>SaaS</HighlightText> et j&apos;automatise tout avec{" "}
            <span className="inline-block whitespace-nowrap"><HighlightText delay={0.6}>l&apos;IA</HighlightText>.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-xl font-normal leading-relaxed">
            {SITE_CONTENT.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton href={SITE_CONTENT.hero.ctaPrimary.href} variant="primary" size="lg">
              {SITE_CONTENT.hero.ctaPrimary.label}
            </MagneticButton>
            <MagneticButton href={SITE_CONTENT.hero.ctaSecondary.href} variant="secondary" size="lg">
              {SITE_CONTENT.hero.ctaSecondary.label}
            </MagneticButton>
          </div>

          {/* Proof micro-bar */}
          <div className="flex items-center gap-4 pt-4 text-xs text-[var(--ink-muted)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Certifié DGAC</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F43F6E]" />
              <span>Full-Stack & IA</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Basé à Auch (32)</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Photo Card with Floating Badges */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 perspective-[1200px]">
          <div
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* The 3D tilting portrait card */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="w-full h-full rounded-[32px] p-2.5 glass-card relative overflow-hidden group shadow-[0_25px_60px_-15px_rgba(20,20,31,0.12)] transition-shadow duration-500 hover:shadow-[0_35px_80px_-15px_rgba(244,63,110,0.2)]"
            >
              {/* Inner card frame */}
              <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-gradient-to-b from-[#1C1F2E] via-[#141622] to-[#0D0E16]">
                {/* Studio Ambient Backlight behind Laurentin */}
                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#F43F6E]/40 via-[#8B5CF6]/25 to-[#38BDF8]/30 blur-3xl pointer-events-none" />
                
                {/* Subtle tech micro-grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60" />

                {/* Laurentin Cutout Portrait in 3D depth */}
                <div
                  className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center pointer-events-none overflow-hidden"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="relative w-full h-full flex items-end justify-center">
                    <Image
                      src="/me-cutout.webp"
                      alt={SITE_CONTENT.hero.photoAlt}
                      width={486}
                      height={913}
                      priority
                      className="w-auto h-[100%] max-h-none object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Subtle vignette fade at the very bottom edge */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0E16]/85 via-[#0D0E16]/30 to-transparent pointer-events-none z-20" />

                {/* Bottom card tag */}
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs px-3.5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg z-30"
                  style={{ transform: "translateZ(45px)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span className="font-semibold tracking-wide">Laurentin</span>
                  </div>
                  <span className="text-[11px] text-white/70 font-medium">Auch (32) • France</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Badges around the photo */}
            {/* Badge 1: Top Left */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -left-4 sm:-left-8 z-20 px-3.5 py-2 rounded-2xl glass-card text-xs font-semibold text-[var(--ink)] flex items-center gap-2 shadow-lg select-none"
            >
              <div className="w-6 h-6 rounded-full bg-[#FDE1E8] flex items-center justify-center">
                {iconMap.plane}
              </div>
              <span>Télépilote DGAC certifié</span>
            </motion.div>

            {/* Badge 2: Right Middle */}
            <motion.div
              animate={{
                y: [0, 9, 0],
                rotate: [1, -1.5, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/3 -right-4 sm:-right-8 z-20 px-3.5 py-2 rounded-2xl glass-card text-xs font-semibold text-[var(--ink)] flex items-center gap-2 shadow-lg select-none"
            >
              <div className="w-6 h-6 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                {iconMap.code}
              </div>
              <span>Créateur de SaaS</span>
            </motion.div>

            {/* Badge 3: Left Lower (Positioned at top-[62%] to never overlap the bottom Laurentin tag) */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-1.5, 1, -1.5],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-[62%] -left-4 sm:-left-8 z-20 px-3.5 py-2 rounded-2xl glass-card text-xs font-semibold text-[var(--ink)] flex items-center gap-2 shadow-lg select-none"
            >
              <div className="w-6 h-6 rounded-full bg-[#EDE9FE] flex items-center justify-center">
                {iconMap.sparkles}
              </div>
              <span>IA & Automatisation</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full flex justify-center mt-12 relative z-10"
      >
        <a
          href="#manifeste"
          className="flex flex-col items-center gap-1.5 text-xs text-[var(--ink-muted)] hover:text-[#F43F6E] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium">Découvrir</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-9 rounded-full border border-[var(--ink)]/20 flex items-center justify-center group-hover:border-[#F43F6E]/40"
          >
            <ChevronDown className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[#F43F6E]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
