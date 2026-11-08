"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { STORY_CONTENT } from "@/content/story";
import { Play, Pause, Disc, ChevronRight } from "lucide-react";

export default function CinematicPlayerBar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  const [timecode, setTimecode] = useState("00:00:00:00");
  const [activeActIndex, setActiveActIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const actsList = Object.values(STORY_CONTENT.acts);

  // Compute timecode & detect active act from scroll
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Total film duration: 8 minutes 45 seconds (525 seconds)
      const totalSeconds = 525;
      const currentSec = Math.floor(latest * totalSeconds);
      const minutes = Math.floor(currentSec / 60);
      const seconds = currentSec % 60;
      const frames = Math.floor((latest * totalSeconds * 24) % 24);

      const tc = `00:0${minutes}:${seconds.toString().padStart(2, "0")}:${frames
        .toString()
        .padStart(2, "0")}`;
      setTimecode(tc);

      // Determine active act based on threshold
      const actIdx = Math.min(
        Math.floor(latest * actsList.length),
        actsList.length - 1
      );
      setActiveActIndex(actIdx);
    });
  }, [scrollYProgress, actsList.length]);

  const scrollToAct = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentAct = actsList[activeActIndex] || actsList[0];

  return (
    <aside
      aria-label="Contrôle de lecture du film"
      className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-8 z-40 max-w-4xl mx-auto pointer-events-none"
    >
      <div className="pointer-events-auto rounded-full bg-[#0D111C]/90 backdrop-blur-2xl border border-white/15 px-3.5 sm:px-6 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-white flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Play/Timecode indicator */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#F43F6E] flex items-center justify-center text-white shadow-[0_0_12px_#F43F6E]">
            <Play className="w-3 h-3 fill-white ml-0.5" />
          </div>
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-white/90">
            {timecode}
          </span>
        </div>

        {/* Center: Scrubber Bar with 9 Chapter Markers */}
        <div className="flex-1 hidden sm:flex items-center gap-1 relative py-2">
          {/* Background track */}
          <div className="absolute inset-x-0 h-1 rounded-full bg-white/10" />

          {/* Active progress bar */}
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="absolute left-0 right-0 h-1 rounded-full bg-gradient-to-r from-[#F43F6E] via-[#8B5CF6] to-[#38BDF8] origin-left"
          />

          {/* 9 Chapter Markers */}
          <div className="relative w-full flex justify-between z-10 px-1">
            {actsList.map((act, idx) => {
              const isActive = idx === activeActIndex;
              const isPast = idx <= activeActIndex;

              return (
                <button
                  key={act.id}
                  onClick={() => scrollToAct(act.id)}
                  title={`${act.tag} : ${act.title}`}
                  className="group/marker relative p-1 -m-1 focus:outline-none"
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#F43F6E] scale-125 shadow-[0_0_10px_#F43F6E]"
                        : isPast
                        ? "bg-white/80 group-hover/marker:scale-125"
                        : "bg-white/25 group-hover/marker:bg-white/50"
                    }`}
                  />
                  {/* Tooltip on marker hover */}
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none px-2 py-1 rounded-md bg-black/90 text-[10px] text-white whitespace-nowrap border border-white/10">
                    {act.tag} • {act.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Act Name & Link */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => scrollToAct(currentAct.id)}
            className="flex items-center gap-1.5 text-left group cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#F43F6E]">
              {currentAct.tag}
            </span>
            <span className="text-xs font-semibold text-white/90 truncate max-w-[110px] sm:max-w-[160px] group-hover:text-white transition-colors">
              {currentAct.title}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
}
