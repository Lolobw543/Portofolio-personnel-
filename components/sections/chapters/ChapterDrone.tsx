"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import PlaceholderBadge from "@/components/common/PlaceholderBadge";
import { Plane, ShieldCheck, Video, Crosshair, ArrowUpRight } from "lucide-react";

export default function ChapterDrone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.drone;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Drone push-in camera effect: scale 1 -> 1.15 and subtle pan
  const cameraScale = useTransform(scrollYProgress, [0.1, 0.7], [1, 1.18]);
  const cameraY = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-6%"]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [120, -120]);

  // Dynamic HUD telemetry values driven by scroll
  const altitudeValue = useTransform(scrollYProgress, [0.2, 0.6], [85, 120]);
  const batteryValue = useTransform(scrollYProgress, [0.1, 0.9], [96, 78]);
  const timecodeValue = useTransform(scrollYProgress, [0.1, 0.9], [14, 58]);

  return (
    <div
      id="chapitre-04"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 right-0 pointer-events-none select-none text-[15vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        AERIAL • 4K DCI • DGAC PILOT
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header copy directly on background */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={Plane} />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{data.certification}</span>
          </span>
          {data.hoursMetric && !data.hoursMetric.startsWith("[") && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-800">
              {data.hoursMetric}
            </span>
          )}
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          {data.title.split("&")[0]} &{" "}
          <HighlightText color="bg-[#D1FAE5]">{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Pinned Fullscreen Aerial Viewport with Drone HUD Telemetry Overlay */}
        <div className="relative my-20 w-full rounded-[40px] overflow-hidden bg-[#0A0D14] shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-white/10 aspect-[16/9] max-h-[700px]">
          <PlaceholderBadge />

          {/* Advancing Drone Camera Image */}
          <motion.div
            style={{
              scale: cameraScale,
              y: cameraY,
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={data.images.hero}
              alt="Prise de vue aérienne 4K par drone"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1400px"
            />
          </motion.div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

          {/* HUD Drone Overlay (Fine Monospace font, Crosshair & Metrics) */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none text-white/90 font-mono text-xs select-none">
            {/* Top HUD Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold tracking-widest text-[11px] text-rose-400">REC [4K 60FPS]</span>
                <TimecodeDisplay value={timecodeValue} />
              </div>

              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <BatteryDisplay value={batteryValue} />
                <span>•</span>
                <span>ISO 100</span>
                <span>•</span>
                <span>1/120s</span>
              </div>
            </div>

            {/* Center Crosshair Viewfinder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <Crosshair className="w-16 h-16 text-white/35 stroke-[1]" />
              <div className="absolute w-2 h-2 rounded-full bg-rose-500/80" />
            </div>

            {/* Bottom HUD Row with dynamic roll */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-4">
                <span>{data.hud.gps}</span>
                <span className="text-emerald-400 font-bold">GPS: 18 SAT</span>
              </div>

              <div className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-4">
                <AltitudeDisplay value={altitudeValue} />
                <span className="text-white/60">SPEED: 38 km/h</span>
                <span className="text-rose-400 font-semibold">DGAC CONFORME</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Gallery with Video / Photo Preview on Hover */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-[var(--ink)] block">
                Galerie de Prises de Vue Récentes
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] block">
                Domaines d&apos;exception, suivis de chantier, tourisme &amp; paysages naturels
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F43F6E] hover:underline"
            >
              <span>Discuter d&apos;un projet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-[28px] overflow-hidden bg-slate-900 border border-black/5 shadow-lg aspect-[16/10] cursor-pointer"
              >
                <PlaceholderBadge />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      {item.tag}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#F43F6E] transition-colors">
                      <Video className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/70 mt-0.5">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-600">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AltitudeDisplay({ value }: { value: MotionValue<number> }) {
  const [alt, setAlt] = useState(85);
  useMotionValueEvent(value, "change", (latest) => setAlt(Math.round(latest)));
  return <span>ALT: {alt}m AGL</span>;
}

function BatteryDisplay({ value }: { value: MotionValue<number> }) {
  const [bat, setBat] = useState(94);
  useMotionValueEvent(value, "change", (latest) => setBat(Math.round(latest)));
  return <span>BAT: {bat}%</span>;
}

function TimecodeDisplay({ value }: { value: MotionValue<number> }) {
  const [sec, setSec] = useState(14);
  useMotionValueEvent(value, "change", (latest) => setSec(Math.round(latest)));
  const formattedSec = sec < 10 ? `0${sec}` : `${sec}`;
  return <span className="text-white/60">00:14:{formattedSec}</span>;
}
