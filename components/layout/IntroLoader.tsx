"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Skip if query param ?no-loader is present
    if (typeof window !== "undefined" && window.location.search.includes("no-loader")) {
      return;
    }

    // Only show on first visit in session
    const hasSeenLoader = sessionStorage.getItem("laurentin_loader_seen");
    if (!hasSeenLoader) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("laurentin_loader_seen", "true");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FAF8F5] select-none"
        >
          {/* Subtle noise and radial glow */}
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
          <div className="absolute w-72 h-72 rounded-full bg-[#FDE1E8] blur-3xl opacity-60 animate-pulse pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6">
            <svg
              width="90"
              height="90"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              {/* Rounded monogram border */}
              <motion.rect
                x="5"
                y="5"
                width="90"
                height="90"
                rx="24"
                stroke="#14141F"
                strokeWidth="2.5"
                strokeOpacity="0.12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* The "L" Monogram Path drawing */}
              <motion.path
                d="M38 28 V70 H68"
                stroke="#14141F"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Rose accent dot */}
              <motion.circle
                cx="68"
                cy="36"
                r="5"
                fill="#F43F6E"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#14141F]/60 uppercase"
            >
              <span>LAURENTIN</span>
              <span className="w-1 h-1 rounded-full bg-[#F43F6E]" />
              <span>PORTFOLIO</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
