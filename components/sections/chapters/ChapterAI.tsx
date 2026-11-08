"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import {
  Sparkles,
  Zap,
  Clock,
  Play,
  Check,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Repeat,
  BarChart2,
  Music,
  Terminal,
  MousePointer2,
  ExternalLink,
} from "lucide-react";

export default function ChapterAI() {
  const data = SITE_CONTENT.chapters.ai;
  const demo = data.workflowDemo;

  // Pin container for desktop scrub
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Track scroll step for reactive node and log states
  const [progressVal, setProgressVal] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressVal(latest);
  });

  // 1. Note App Animations (Phase A: 0.0 -> 0.28)
  const noteOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const noteScale = useTransform(scrollYProgress, [0, 0.18, 0.26], [1, 0.98, 0.88]);
  const noteY = useTransform(scrollYProgress, [0, 0.18, 0.26], [0, 0, -35]);

  // 2. Cursor Clicking "Exécuter"
  const cursorOpacity = useTransform(scrollYProgress, [0.15, 0.22, 0.32, 0.36], [0, 1, 1, 0]);
  const cursorX = useTransform(scrollYProgress, [0.15, 0.28], [120, 0]);
  const cursorY = useTransform(scrollYProgress, [0.15, 0.28], [100, 0]);
  const cursorScale = useTransform(scrollYProgress, [0.26, 0.29, 0.32], [1, 0.82, 1]);

  // 3. Workflow Window (Phase B: 0.20 -> 0.72)
  const workflowOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.68, 0.82], [0, 1, 1, 0.35]);
  const workflowScale = useTransform(scrollYProgress, [0.18, 0.28, 0.68, 0.85], [0.94, 1, 1, 0.94]);
  const workflowBlur = useTransform(scrollYProgress, [0.65, 0.82], [0, 5]);

  // Pulse animation on Bézier curves
  const pulseTriggerToClaude = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const pulseClaudeToProcess = useTransform(scrollYProgress, [0.42, 0.54], [0, 1]);
  const pulseProcessToOutputs = useTransform(scrollYProgress, [0.54, 0.66], [0, 1]);

  // 4. Cluster of 4 Realistic Posts (Phase C: 0.60 -> 1.0)
  const postsOpacity = useTransform(scrollYProgress, [0.6, 0.74, 1], [0, 1, 1]);
  const postsScale = useTransform(scrollYProgress, [0.6, 0.78], [0.86, 1]);

  // Parallax offsets for the 4 overlapping posts
  const postLinkedInY = useTransform(scrollYProgress, [0.65, 1], [60, -20]);
  const postInstagramY = useTransform(scrollYProgress, [0.65, 1], [80, 10]);
  const postTikTokY = useTransform(scrollYProgress, [0.65, 1], [100, 30]);
  const postXY = useTransform(scrollYProgress, [0.65, 1], [70, -10]);

  // Derived activation states for nodes
  const isTriggerActive = progressVal >= 0.25;
  const isTriggerDone = progressVal >= 0.36;

  const isClaudeActive = progressVal >= 0.36;
  const isClaudeDone = progressVal >= 0.48;

  const isProcessActive = progressVal >= 0.48;
  const isProcessDone = progressVal >= 0.58;

  const isOutputsActive = progressVal >= 0.58;
  const isOutputsDone = progressVal >= 0.68;

  return (
    <div id="chapitre-01" className="relative w-full">
      {/* Chapter Intro Header */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12 w-full relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {data.number}
          </span>
          <SectionBadge label={data.badge} icon={Sparkles} />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F43F6E]/10 text-[#F43F6E] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.speedMetric}</span>
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--ink)] max-w-4xl leading-[1.1]">
          {data.title.split("&")[0]} &{" "}
          <HighlightText>{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP PINNED SCENE (Screens >= lg)                                     */}
      {/* ========================================================================= */}
      <div ref={sceneRef} className="hidden lg:block relative w-full h-[260vh]">
        <div className="sticky top-20 w-full h-[calc(100vh-5rem)] flex items-center justify-center px-6 overflow-hidden">
          <div className="relative w-full max-w-6xl h-[620px] flex items-center justify-center">

            {/* A. L'IDÉE BRUTE (Carte Smartphone Notes) */}
            <motion.div
              style={{
                opacity: noteOpacity,
                scale: noteScale,
                y: noteY,
              }}
              className="absolute z-30 w-full max-w-md pointer-events-none"
            >
              <div className="rounded-[28px] bg-white/95 p-6 shadow-[0_25px_60px_-15px_rgba(20,20,31,0.22)] border border-black/10 backdrop-blur-xl">
                {/* Notes App Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs">
                    <span>‹ Notes</span>
                    <span className="text-[var(--ink-muted)] font-normal">• {demo.note.folder}</span>
                  </div>
                  <span className="text-[11px] text-[var(--ink-muted)]">{demo.note.date}</span>
                </div>

                {/* Typed text simulation with blinking cursor */}
                <div className="space-y-2.5 font-sans text-sm text-[var(--ink)] leading-relaxed min-h-[110px]">
                  {demo.note.lines.map((line, idx) => (
                    <p key={idx} className={idx === 0 ? "font-semibold text-base" : "text-sm text-[var(--ink-muted)]"}>
                      {line}
                      {idx === 2 && (
                        <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse align-middle" />
                      )}
                    </p>
                  ))}
                </div>

                {/* Footer Tag */}
                <div className="mt-5 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Dictée vocale prête pour l&apos;automatisation
                  </span>
                  <span>3 lignes</span>
                </div>
              </div>
            </motion.div>

            {/* B. L'AUTOMATISATION (Fenêtre macOS / Canvas n8n-style) */}
            <motion.div
              style={{
                opacity: workflowOpacity,
                scale: workflowScale,
                filter: useTransform(workflowBlur, (v) => `blur(${v}px)`),
              }}
              className="absolute inset-0 w-full h-full rounded-[24px] bg-[#FAF8F5] border border-black/10 shadow-[0_30px_90px_-20px_rgba(20,20,31,0.18)] flex flex-col overflow-hidden z-10"
            >
              {/* macOS Window Chrome */}
              <div className="h-12 px-5 bg-white/90 border-b border-black/[0.06] flex items-center justify-between flex-shrink-0 select-none">
                {/* 3 Traffic light dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>

                {/* Window Title */}
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                  <span className="text-xs font-semibold text-[var(--ink)] tracking-tight">
                    {demo.workflow.name}
                  </span>
                </div>

                {/* Right Actions: Status Toggle & "Exécuter" Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{demo.workflow.status}</span>
                  </div>

                  {/* "Exécuter" button with cursor target */}
                  <div className="relative">
                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-[#14141F] text-white text-xs font-medium flex items-center gap-1.5 shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Exécuter</span>
                    </button>

                    {/* Simulated Cursor clicking "Exécuter" */}
                    <motion.div
                      style={{
                        opacity: cursorOpacity,
                        x: cursorX,
                        y: cursorY,
                        scale: cursorScale,
                      }}
                      className="absolute -bottom-6 -right-6 pointer-events-none z-50 text-black drop-shadow-lg"
                    >
                      <MousePointer2 className="w-6 h-6 fill-black text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Main Canvas: Check if user provided `realMedia` */}
              {demo.realMedia ? (
                <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={demo.realMedia}
                    alt="Capture réelle du workflow"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative flex-1 w-full bg-[#F5F3EF] overflow-hidden flex flex-col justify-between">
                  {/* Dot Grid Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(20,20,31,0.2) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* Nodes & Bézier Connections Layout */}
                  <div className="relative flex-1 flex items-center justify-between px-10 py-6 z-10">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
                      {/* Trigger -> Claude */}
                      <path
                        d="M 180 230 C 260 230, 260 230, 330 230"
                        fill="none"
                        stroke={isTriggerDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2.5"
                      />
                      {/* Pulse Trigger -> Claude */}
                      {isTriggerActive && !isTriggerDone && (
                        <circle cx="255" cy="230" r="5" fill="#F43F6E" className="animate-ping" />
                      )}

                      {/* Claude -> Format Engine */}
                      <path
                        d="M 450 230 C 510 230, 510 230, 570 230"
                        fill="none"
                        stroke={isClaudeDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2.5"
                      />
                      {isClaudeActive && !isClaudeDone && (
                        <circle cx="510" cy="230" r="5" fill="#F59E0B" className="animate-ping" />
                      )}

                      {/* Format Engine -> 4 Output Branches (Bézier curves) */}
                      {/* Branch 1: LinkedIn (y=90) */}
                      <path
                        d="M 690 230 C 760 230, 780 90, 850 90"
                        fill="none"
                        stroke={isProcessDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2"
                      />
                      {/* Branch 2: Instagram (y=175) */}
                      <path
                        d="M 690 230 C 760 230, 780 175, 850 175"
                        fill="none"
                        stroke={isProcessDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2"
                      />
                      {/* Branch 3: TikTok (y=265) */}
                      <path
                        d="M 690 230 C 760 230, 780 265, 850 265"
                        fill="none"
                        stroke={isProcessDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2"
                      />
                      {/* Branch 4: X (y=350) */}
                      <path
                        d="M 690 230 C 760 230, 780 350, 850 350"
                        fill="none"
                        stroke={isProcessDone ? "#10B981" : "#D4D2CD"}
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Node 1: Trigger */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-24 h-24 rounded-2xl bg-white shadow-md border flex flex-col items-center justify-center p-2 relative transition-all duration-300 ${
                          isTriggerActive
                            ? "border-[#F43F6E] ring-4 ring-[#F43F6E]/15 scale-105"
                            : "border-black/10"
                        }`}
                      >
                        <ToolLogo id={demo.workflow.triggerNode.logo} name={demo.workflow.triggerNode.name} size={40} />
                        <span className="text-[10px] font-semibold text-[var(--ink)] mt-1 truncate max-w-full">
                          {demo.workflow.triggerNode.name}
                        </span>
                        {isTriggerDone ? (
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            ✓
                          </span>
                        ) : isTriggerActive ? (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-[#F43F6E] text-white text-[9px] font-bold animate-pulse">
                            En cours
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-[var(--ink-muted)]">
                        {isTriggerDone ? `✓ ${demo.workflow.triggerNode.duration}` : "Déclencheur"}
                      </span>
                    </div>

                    {/* Node 2: Claude 3.5 Sonnet */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-24 h-24 rounded-2xl bg-white shadow-md border flex flex-col items-center justify-center p-2 relative transition-all duration-300 ${
                          isClaudeActive && !isClaudeDone
                            ? "border-[#F59E0B] ring-4 ring-[#F59E0B]/20 scale-105"
                            : isClaudeDone
                            ? "border-emerald-500/40"
                            : "border-black/10"
                        }`}
                      >
                        <ToolLogo id={demo.workflow.llmNode.logo} name={demo.workflow.llmNode.name} size={40} />
                        <span className="text-[10px] font-semibold text-[var(--ink)] mt-1 truncate max-w-full">
                          {demo.workflow.llmNode.name}
                        </span>
                        {isClaudeDone ? (
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            ✓
                          </span>
                        ) : isClaudeActive ? (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold animate-pulse">
                            Génération
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-[var(--ink-muted)]">
                        {isClaudeDone ? `✓ ${demo.workflow.llmNode.duration}` : "Agent LLM"}
                      </span>
                    </div>

                    {/* Node 3: Format & Media Engine */}
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-24 h-24 rounded-2xl bg-white shadow-md border flex flex-col items-center justify-center p-2 relative transition-all duration-300 ${
                          isProcessActive && !isProcessDone
                            ? "border-[#3B82F6] ring-4 ring-[#3B82F6]/20 scale-105"
                            : isProcessDone
                            ? "border-emerald-500/40"
                            : "border-black/10"
                        }`}
                      >
                        <ToolLogo id={demo.workflow.processNode.logo} name={demo.workflow.processNode.name} size={40} />
                        <span className="text-[10px] font-semibold text-[var(--ink)] mt-1 truncate max-w-full">
                          {demo.workflow.processNode.name}
                        </span>
                        {isProcessDone ? (
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            ✓
                          </span>
                        ) : isProcessActive ? (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold animate-pulse">
                            Adaptation
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-[var(--ink-muted)]">
                        {isProcessDone ? `✓ ${demo.workflow.processNode.duration}` : "Moteur média"}
                      </span>
                    </div>

                    {/* 4 Output Branches Column */}
                    <div className="flex flex-col gap-3">
                      {demo.workflow.branches.map((b) => (
                        <div
                          key={b.id}
                          className={`w-44 px-3 py-2 rounded-xl bg-white shadow-sm border flex items-center justify-between transition-all duration-300 ${
                            isOutputsDone
                              ? "border-emerald-500/40 bg-emerald-50/20"
                              : isOutputsActive
                              ? "border-[#F43F6E]/40 scale-102"
                              : "border-black/10"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ToolLogo id={b.logo} name={b.name} size={24} />
                            <div>
                              <span className="text-[11px] font-semibold text-[var(--ink)] block leading-tight">
                                {b.name}
                              </span>
                              <span className="text-[9px] text-[var(--ink-muted)] block">
                                {b.sublabel}
                              </span>
                            </div>
                          </div>
                          {isOutputsDone ? (
                            <span className="text-[10px] font-semibold text-emerald-800 flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              <span>{b.duration}</span>
                            </span>
                          ) : isOutputsActive ? (
                            <span className="w-2 h-2 rounded-full bg-[#F43F6E] animate-ping" />
                          ) : (
                            <span className="text-[9px] text-[var(--ink-muted)]">En attente</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logs Drawer Bar at bottom */}
                  <div className="h-24 bg-[#14141F] text-white/90 px-6 py-2.5 flex flex-col justify-center font-mono text-[11px] border-t border-white/10 z-20">
                    <div className="flex items-center justify-between mb-1 text-[10px] text-white/50 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#F43F6E]" />
                        <span>Journal d&apos;exécution temps réel</span>
                      </span>
                      <span>4 tâches</span>
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      {demo.workflow.logs.map((log, idx) => {
                        const showLog =
                          (idx === 0 && isTriggerActive) ||
                          (idx === 1 && isClaudeActive) ||
                          (idx === 2 && isProcessActive) ||
                          (idx === 3 && isOutputsActive);
                        return (
                          <div
                            key={idx}
                            className={`transition-opacity duration-300 truncate ${
                              showLog ? "opacity-100 text-emerald-400" : "opacity-0"
                            }`}
                          >
                            {log}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* C. LE RÉSULTAT : Grappe de 4 vrais posts réalistes en profondeur 3D */}
            <motion.div
              style={{
                opacity: postsOpacity,
                scale: postsScale,
              }}
              className="absolute inset-0 w-full h-full pointer-events-none z-40 flex items-center justify-center"
            >
              <div className="relative w-full h-full">

                {/* 1. Post LinkedIn (Top-Left, Angled -1.5deg) */}
                <motion.div
                  style={{ y: postLinkedInY }}
                  className="absolute left-0 top-0 w-[420px] rounded-2xl bg-white shadow-[0_25px_60px_-15px_rgba(20,20,31,0.25)] border border-black/10 p-4 -rotate-1 pointer-events-auto"
                >
                  {/* LinkedIn Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full relative overflow-hidden bg-[#1B1B4B]">
                        <Image src={demo.author.avatar} alt="Avatar" fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-[var(--ink)]">{demo.author.name}</span>
                          <span className="text-[10px] text-[var(--ink-muted)]">• 1er</span>
                        </div>
                        <span className="text-[10px] text-[var(--ink-muted)] block truncate max-w-[240px]">
                          {demo.author.title}
                        </span>
                        <span className="text-[9px] text-[var(--ink-muted)]">{demo.posts.linkedin.publishedTime} • 🌐</span>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[var(--ink-muted)]" />
                  </div>

                  {/* LinkedIn Body */}
                  <p className="text-xs text-[var(--ink)] leading-relaxed mb-3 whitespace-pre-line font-sans">
                    {demo.posts.linkedin.text}
                  </p>

                  {/* LinkedIn Image */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 border border-black/5 bg-slate-900">
                    <Image
                      src={demo.posts.linkedin.image}
                      alt="Cartographie vignoble drone"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* LinkedIn Metrics & Actions */}
                  <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] pb-2 mb-2 border-b border-black/[0.06]">
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px]">👍</span>
                      <span>{demo.posts.linkedin.likes}</span>
                    </span>
                    <span>{demo.posts.linkedin.comments} commentaires • {demo.posts.linkedin.reposts} partages</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--ink-muted)] pt-0.5">
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /> J&apos;aime</span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><MessageSquare className="w-3.5 h-3.5" /> Commenter</span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><Repeat2 className="w-3.5 h-3.5" /> Republier</span>
                    <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"><Send className="w-3.5 h-3.5" /> Envoyer</span>
                  </div>
                </motion.div>

                {/* 2. Post Instagram (Top-Right, Angled +2deg) */}
                <motion.div
                  style={{ y: postInstagramY }}
                  className="absolute right-4 top-2 w-[340px] rounded-2xl bg-white shadow-[0_30px_70px_-15px_rgba(20,20,31,0.22)] border border-black/10 p-3.5 rotate-2 pointer-events-auto z-20"
                >
                  <div className="flex items-center justify-between pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 to-fuchsia-600">
                        <div className="w-full h-full rounded-full relative overflow-hidden bg-white">
                          <Image src={demo.author.avatar} alt="Avatar" fill className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--ink)] block leading-tight">laurentin_tech</span>
                        <span className="text-[9px] text-[var(--ink-muted)]">Saint-Émilion, France</span>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[var(--ink-muted)]" />
                  </div>

                  <div className="relative w-full h-56 rounded-xl overflow-hidden mb-2.5 bg-black">
                    <Image src={demo.posts.instagram.image} alt="Instagram drone vista" fill className="object-cover" />
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <MessageCircle className="w-4 h-4 text-[var(--ink)]" />
                      <Share2 className="w-4 h-4 text-[var(--ink)]" />
                    </div>
                    <Bookmark className="w-4 h-4 text-[var(--ink)]" />
                  </div>

                  <span className="text-[11px] font-bold text-[var(--ink)] block mb-1">
                    {demo.posts.instagram.likes} J&apos;aime
                  </span>
                  <p className="text-[10px] text-[var(--ink)] leading-snug line-clamp-2">
                    <span className="font-bold mr-1">laurentin_tech</span>
                    {demo.posts.instagram.text}
                  </p>
                  <span className="text-[9px] text-[var(--ink-muted)] block mt-1">
                    {demo.posts.instagram.publishedTime}
                  </span>
                </motion.div>

                {/* 3. TikTok Phone Mockup (Bottom-Left / Center Foreground, Vertical 9:16) */}
                <motion.div
                  style={{ y: postTikTokY }}
                  className="absolute left-64 bottom-2 w-[240px] h-[400px] rounded-[32px] bg-black shadow-[0_35px_80px_-15px_rgba(0,0,0,0.5)] border-4 border-[#2A2A38] p-3 text-white flex flex-col justify-between overflow-hidden pointer-events-auto z-30"
                >
                  <Image src={demo.posts.tiktok.image} alt="TikTok drone video" fill className="object-cover -z-0 opacity-90" />
                  
                  {/* Top Feed tabs */}
                  <div className="relative z-10 flex items-center justify-center gap-3 pt-1 text-[11px] font-bold">
                    <span className="text-white/60">Suivis</span>
                    <span className="text-white border-b-2 border-white pb-0.5">Pour toi</span>
                  </div>

                  {/* Bottom & Right Overlay */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div className="max-w-[160px] space-y-1">
                      <span className="text-xs font-bold block">{demo.author.handle}</span>
                      <p className="text-[10px] text-white/90 leading-tight line-clamp-2">
                        {demo.posts.tiktok.text}
                      </p>
                      <div className="flex items-center gap-1 text-[9px] text-white/80">
                        <Music className="w-2.5 h-2.5 animate-spin" />
                        <span className="truncate">{demo.posts.tiktok.musicTitle}</span>
                      </div>
                    </div>

                    {/* Right action column */}
                    <div className="flex flex-col items-center gap-3 text-white">
                      <div className="flex flex-col items-center">
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        <span className="text-[9px] font-bold">{demo.posts.tiktok.likes}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MessageCircle className="w-5 h-5 fill-white text-white" />
                        <span className="text-[9px] font-bold">{demo.posts.tiktok.comments}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span className="text-[9px] font-bold">{demo.posts.tiktok.saves}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Share2 className="w-5 h-5 fill-white text-white" />
                        <span className="text-[9px] font-bold">{demo.posts.tiktok.shares}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Post X (Bottom-Right, Angled -1deg) */}
                <motion.div
                  style={{ y: postXY }}
                  className="absolute right-2 bottom-6 w-[360px] rounded-2xl bg-white shadow-[0_25px_60px_-15px_rgba(20,20,31,0.22)] border border-black/10 p-4 -rotate-1 pointer-events-auto z-20"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-full relative overflow-hidden bg-black flex-shrink-0">
                      <Image src={demo.author.avatar} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-[var(--ink)]">{demo.author.name}</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                        <span className="text-[10px] text-[var(--ink-muted)]">{demo.author.handle} • {demo.posts.x.publishedTime}</span>
                      </div>

                      <p className="text-xs text-[var(--ink)] leading-relaxed mt-1 whitespace-pre-line font-sans">
                        {demo.posts.x.text}
                      </p>

                      <div className="relative w-full h-36 rounded-xl overflow-hidden mt-2 border border-black/5 bg-slate-900">
                        <Image src={demo.posts.x.image} alt="X flight metrics" fill className="object-cover" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[var(--ink-muted)] mt-3 pt-1">
                        <span className="flex items-center gap-1 hover:text-[#1D9BF0] cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /> 18</span>
                        <span className="flex items-center gap-1 hover:text-emerald-500 cursor-pointer"><Repeat className="w-3.5 h-3.5" /> {demo.posts.x.retweets}</span>
                        <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer"><Heart className="w-3.5 h-3.5" /> {demo.posts.x.likes}</span>
                        <span className="flex items-center gap-1 hover:text-[#1D9BF0] cursor-pointer"><BarChart2 className="w-3.5 h-3.5" /> {demo.posts.x.views}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE ADAPTIVE FLOW (Screens < lg)                                      */}
      {/* ========================================================================= */}
      <div className="block lg:hidden px-6 py-10 space-y-12">
        {/* Étape A : Note Smartphone */}
        <div className="rounded-2xl bg-white p-5 shadow-lg border border-black/10">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 text-xs text-amber-600 font-semibold">
            <span>‹ Notes • {demo.note.folder}</span>
            <span className="text-[10px] text-[var(--ink-muted)]">{demo.note.date}</span>
          </div>
          <div className="space-y-2 text-xs text-[var(--ink)]">
            {demo.note.lines.map((l, i) => (
              <p key={i} className={i === 0 ? "font-semibold text-sm" : "text-[var(--ink-muted)]"}>
                {l}
              </p>
            ))}
          </div>
          <div className="mt-4 pt-2 text-[10px] text-emerald-800 font-medium">
            ✓ Étape 1 : Idée brute capturée
          </div>
        </div>

        {/* Étape B : Fenêtre Workflow Réduite */}
        <div className="rounded-2xl bg-white shadow-xl border border-black/10 overflow-hidden">
          <div className="h-10 px-4 bg-slate-100 flex items-center justify-between border-b border-black/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-[var(--ink)] truncate max-w-[180px]">
              {demo.workflow.name}
            </span>
            <span className="text-[10px] font-bold text-emerald-800">Actif</span>
          </div>

          <div className="p-4 bg-[#F8F7F4] space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-black/5">
              <div className="flex items-center gap-2">
                <ToolLogo id="n8n" name="n8n" size={28} />
                <span className="text-xs font-medium text-[var(--ink)]">Webhook Mobile</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-semibold">✓ 0.2s</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-black/5">
              <div className="flex items-center gap-2">
                <ToolLogo id="claude" name="Claude" size={28} />
                <span className="text-xs font-medium text-[var(--ink)]">Claude 3.5 Sonnet</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-semibold">✓ 0.9s</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-black/5">
              <div className="flex items-center gap-2">
                <ToolLogo id="codex" name="Codex" size={28} />
                <span className="text-xs font-medium text-[var(--ink)]">Format & Media Engine</span>
              </div>
              <span className="text-[10px] text-emerald-800 font-semibold">✓ 0.4s</span>
            </div>
          </div>
        </div>

        {/* Étape C : Carrousel des 4 vrais posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Résultats générés en production
            </span>
            <span className="text-xs text-[#F43F6E] font-medium">4 formats prêts</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar">
            {/* LinkedIn Card */}
            <div className="min-w-[280px] rounded-2xl bg-white p-4 shadow-md border border-black/10 snap-start flex-shrink-0">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-2">
                LinkedIn • Post B2B
              </span>
              <p className="text-xs text-[var(--ink)] mb-2 line-clamp-3">{demo.posts.linkedin.text}</p>
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mb-2">
                <Image src={demo.posts.linkedin.image} alt="Post LinkedIn" fill className="object-cover" />
              </div>
              <span className="text-[10px] text-[var(--ink-muted)]">👍 {demo.posts.linkedin.likes} J&apos;aime</span>
            </div>

            {/* Instagram Card */}
            <div className="min-w-[280px] rounded-2xl bg-white p-4 shadow-md border border-black/10 snap-start flex-shrink-0">
              <span className="text-[10px] font-bold text-fuchsia-700 bg-fuchsia-50 px-2 py-0.5 rounded-full inline-block mb-2">
                Instagram • Post Photo
              </span>
              <p className="text-xs text-[var(--ink)] mb-2 line-clamp-3">{demo.posts.instagram.text}</p>
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mb-2">
                <Image src={demo.posts.instagram.image} alt="Post Instagram" fill className="object-cover" />
              </div>
              <span className="text-[10px] text-[var(--ink-muted)]">❤️ {demo.posts.instagram.likes} J&apos;aime</span>
            </div>

            {/* TikTok Card */}
            <div className="min-w-[280px] rounded-2xl bg-black text-white p-4 shadow-md snap-start flex-shrink-0 relative overflow-hidden">
              <Image src={demo.posts.tiktok.image} alt="Post TikTok" fill className="object-cover opacity-80" />
              <div className="relative z-10 flex flex-col justify-between h-48">
                <span className="text-[10px] font-bold bg-[#F43F6E] px-2 py-0.5 rounded-full self-start">
                  TikTok • 9:16
                </span>
                <div>
                  <p className="text-xs text-white line-clamp-2">{demo.posts.tiktok.text}</p>
                  <span className="text-[10px] text-white/80 mt-1 block">❤️ {demo.posts.tiktok.likes}</span>
                </div>
              </div>
            </div>

            {/* X Card */}
            <div className="min-w-[280px] rounded-2xl bg-white p-4 shadow-md border border-black/10 snap-start flex-shrink-0">
              <span className="text-[10px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full inline-block mb-2">
                X (Twitter) • Thread
              </span>
              <p className="text-xs text-[var(--ink)] mb-2 line-clamp-3">{demo.posts.x.text}</p>
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900 mb-2">
                <Image src={demo.posts.x.image} alt="Post X" fill className="object-cover" />
              </div>
              <span className="text-[10px] text-[var(--ink-muted)]">❤️ {demo.posts.x.likes} • {demo.posts.x.views} vues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mention discrète "Exemple illustratif" */}
      <div className="w-full text-center pb-20 pt-4 px-6 relative z-10">
        <span className="text-[11px] text-[var(--ink-muted)]/70 tracking-wide font-normal">
          {demo.disclaimer}
        </span>
      </div>
    </div>
  );
}
