"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SITE_CONTENT } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import ToolLogo from "@/components/common/ToolLogo";
import {
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Workflow,
  Share2,
  Terminal,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Send,
  Eye,
  Info,
} from "lucide-react";

export default function ChapterAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = SITE_CONTENT.chapters.ai;
  const demo = data.workflowDemo;

  const [activeStep, setActiveStep] = useState<number>(1); // 0 = Note, 1 = Workflow, 2 = Posts

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ghostX = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  const steps = [
    { id: 0, label: "01. Note Brute", icon: FileText, desc: "Capture d'idée instantanée" },
    { id: 1, label: "02. Moteur n8n & Claude", icon: Workflow, desc: "Orchestration & IA" },
    { id: 2, label: "03. 4 Formats Déployés", icon: Share2, desc: "Distribution omnicanale" },
  ];

  return (
    <div
      id="chapitre-01"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Giant Ghost Typography crossing screen */}
      <motion.div
        style={{ x: ghostX }}
        className="absolute top-10 left-0 pointer-events-none select-none text-[15vw] font-black uppercase text-outline opacity-20 leading-none whitespace-nowrap z-0"
      >
        AUTOMATION • AGENTS • AI PIPELINE
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header Badges */}
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
          {data.title.split("&")[0]} &amp;{" "}
          <HighlightText>{data.title.split("&")[1]?.trim()}</HighlightText>
        </h2>

        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-4 font-normal">
          {data.tagline}
        </p>

        {/* Interactive 3-Stage Workflow Visualizer */}
        <div className="relative my-14 rounded-[36px] bg-[#141622] p-4 sm:p-8 shadow-[0_30px_90px_rgba(20,22,34,0.45)] border border-white/10 text-white">
          {/* Top Control Bar: macOS Window Dots + 3 Interactive Step Pills */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2 self-start md:self-center">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] inline-block" />
              <span className="ml-3 font-mono text-xs text-white/50 hidden sm:inline-block">
                pipeline.n8n.cloud • {demo.workflow.name}
              </span>
            </div>

            {/* 3 Step Interactive Selector Pills */}
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto justify-center">
              {steps.map((st) => {
                const Icon = st.icon;
                const isActive = activeStep === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(st.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#F43F6E] text-white shadow-md shadow-[#F43F6E]/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Disclaimer pill */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/60 font-mono">
              <Info className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden lg:inline">{demo.disclaimer}</span>
              <span className="lg:hidden">Démo interactive</span>
            </div>
          </div>

          {/* Dynamic Stage View with animated transition */}
          <div className="py-6 min-h-[520px]">
            <AnimatePresence mode="wait">
              {/* STAGE 0: Apple Notes Input Card */}
              {activeStep === 0 && (
                <motion.div
                  key="step-note"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl mx-auto rounded-3xl bg-[#FAF8F5] text-[var(--ink)] p-6 sm:p-10 shadow-2xl border border-white/40"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] text-xs text-[var(--ink-muted)]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#FFD60A] flex items-center justify-center text-black font-bold text-xs shadow-sm">
                        ✎
                      </span>
                      <span className="font-semibold text-[var(--ink)]">{demo.note.appTitle}</span>
                      <span>•</span>
                      <span>{demo.note.folder}</span>
                    </div>
                    <span>{demo.note.date}</span>
                  </div>

                  <div className="mt-6 space-y-4 font-sans text-sm sm:text-base leading-relaxed text-[var(--ink)]">
                    {demo.note.lines.map((line, idx) => (
                      <p key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#F43F6E] mt-2 flex-shrink-0" />
                        <span>{line}</span>
                      </p>
                    ))}
                    <div className="flex items-center gap-2 pt-4 text-xs text-[#F43F6E] font-medium">
                      <span className="inline-block w-2 h-4 bg-[#F43F6E] animate-pulse" />
                      <span>Note enregistrée • Webhook déclenché automatiquement vers n8n</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/[0.08] flex items-center justify-between">
                    <span className="text-xs text-[var(--ink-muted)]">Source : Dictée audio &amp; Note mobile</span>
                    <button
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14141F] text-white text-xs font-semibold hover:bg-black transition-colors"
                    >
                      <span>Voir le workflow n8n</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 1: n8n Workflow Node Canvas */}
              {activeStep === 1 && (
                <motion.div
                  key="step-workflow"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* The visual canvas */}
                  <div className="relative rounded-2xl bg-[#0F111A] p-6 sm:p-8 border border-white/10 overflow-x-auto">
                    {/* Background Dot Grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 min-w-[700px] py-4">
                      {/* Node 1: Webhook Trigger */}
                      <div className="flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 w-48 shadow-lg">
                        <div className="w-12 h-12 rounded-xl bg-[#FF6D5A]/20 flex items-center justify-center p-2 mb-2">
                          <ToolLogo id="n8n" name="n8n" size={28} />
                        </div>
                        <span className="text-xs font-bold text-white text-center">
                          {demo.workflow.triggerNode.name}
                        </span>
                        <span className="text-[10px] text-white/60 text-center mt-1">
                          {demo.workflow.triggerNode.sublabel}
                        </span>
                        <span className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          {demo.workflow.triggerNode.duration} • 200 OK
                        </span>
                      </div>

                      <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0 rotate-90 lg:rotate-0" />

                      {/* Node 2: Claude LLM Node */}
                      <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-[#D97706]/20 to-white/10 backdrop-blur-md border border-[#F59E0B]/40 w-52 shadow-xl relative">
                        <span className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-[#F59E0B] text-black text-[9px] font-bold">
                          LLM COGNITIF
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 mb-2">
                          <ToolLogo id="claude" name="Claude" size={28} />
                        </div>
                        <span className="text-xs font-bold text-white text-center">
                          {demo.workflow.llmNode.name}
                        </span>
                        <span className="text-[10px] text-white/70 text-center mt-1">
                          {demo.workflow.llmNode.sublabel}
                        </span>
                        <span className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B]">
                          {demo.workflow.llmNode.duration} • 4 contextes
                        </span>
                      </div>

                      <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0 rotate-90 lg:rotate-0" />

                      {/* Node 3: Format & Media Engine */}
                      <div className="flex flex-col items-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 w-48 shadow-lg">
                        <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center p-2 mb-2">
                          <ToolLogo id="codex" name="Codex" size={28} />
                        </div>
                        <span className="text-xs font-bold text-white text-center">
                          {demo.workflow.processNode.name}
                        </span>
                        <span className="text-[10px] text-white/60 text-center mt-1">
                          {demo.workflow.processNode.sublabel}
                        </span>
                        <span className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          {demo.workflow.processNode.duration}
                        </span>
                      </div>

                      <ArrowRight className="w-5 h-5 text-white/40 flex-shrink-0 rotate-90 lg:rotate-0" />

                      {/* 4 Output Channels Cluster */}
                      <div className="grid grid-cols-2 gap-2 w-52">
                        {demo.workflow.branches.map((b) => (
                          <div
                            key={b.id}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors"
                          >
                            <ToolLogo id={b.logo} name={b.name} size={20} />
                            <div className="min-w-0">
                              <span className="text-[11px] font-medium text-white truncate block">
                                {b.name.split(" ")[0]}
                              </span>
                              <span className="text-[8px] font-mono text-emerald-400">
                                {b.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Execution Logs Terminal */}
                  <div className="rounded-2xl bg-black/60 p-4 border border-white/10 font-mono text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] pb-2 border-b border-white/10">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CONSOLE D&apos;EXÉCUTION N8N • TEMPS TOTAL : 2.4s</span>
                    </div>
                    {demo.workflow.logs.map((log, idx) => (
                      <div key={idx} className="text-emerald-400/90 text-[11px] flex items-center gap-2">
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F43F6E] text-white text-xs font-semibold hover:bg-[#e11d48] transition-colors shadow-lg"
                    >
                      <span>Voir les 4 publications générées</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: 4 Real Social Posts */}
              {activeStep === 2 && (
                <motion.div
                  key="step-posts"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {/* 1. LinkedIn Card */}
                  <div className="rounded-2xl bg-white text-[var(--ink)] p-4 shadow-xl border border-black/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
                        <ToolLogo id="linkedin" name="LinkedIn" size={24} />
                        <div>
                          <span className="text-xs font-bold block leading-tight">{demo.author.name}</span>
                          <span className="text-[10px] text-[var(--ink-muted)] block truncate max-w-[170px]">
                            {demo.author.title}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--ink)] mt-3 leading-relaxed whitespace-pre-line font-sans">
                        {demo.posts.linkedin.text}
                      </p>
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-3 bg-slate-100">
                        <Image
                          src={demo.posts.linkedin.image}
                          alt="Post LinkedIn"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/[0.06] text-[11px] text-[var(--ink-muted)]">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#0A66C2]" /> {demo.posts.linkedin.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> {demo.posts.linkedin.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="w-3.5 h-3.5" /> {demo.posts.linkedin.reposts}
                      </span>
                    </div>
                  </div>

                  {/* 2. Instagram Card */}
                  <div className="rounded-2xl bg-white text-[var(--ink)] p-4 shadow-xl border border-black/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
                        <ToolLogo id="instagram" name="Instagram" size={24} />
                        <div>
                          <span className="text-xs font-bold block leading-tight">{demo.author.name}</span>
                          <span className="text-[10px] text-[var(--ink-muted)] block">Reels &bull; Audio original</span>
                        </div>
                      </div>
                      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden my-3 bg-slate-900">
                        <Image
                          src={demo.posts.instagram.image}
                          alt="Post Instagram"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-[var(--ink)] leading-relaxed whitespace-pre-line line-clamp-4">
                        {demo.posts.instagram.text}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/[0.06] text-[11px] text-[var(--ink-muted)]">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#E4405F]" /> {demo.posts.instagram.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> {demo.posts.instagram.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5" /> Save
                      </span>
                    </div>
                  </div>

                  {/* 3. TikTok Card */}
                  <div className="rounded-2xl bg-[#000000] text-white p-4 shadow-xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                        <ToolLogo id="tiktok" name="TikTok" size={24} />
                        <div>
                          <span className="text-xs font-bold block leading-tight">{demo.author.name}</span>
                          <span className="text-[10px] text-white/60 block">{demo.author.handle}</span>
                        </div>
                      </div>
                      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden my-3 bg-slate-900">
                        <Image
                          src={demo.posts.tiktok.image}
                          alt="Post TikTok"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed whitespace-pre-line line-clamp-3">
                        {demo.posts.tiktok.text}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] text-white/70">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#FE2C55]" /> {demo.posts.tiktok.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> {demo.posts.tiktok.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5" /> {demo.posts.tiktok.saves}
                      </span>
                    </div>
                  </div>

                  {/* 4. X Card */}
                  <div className="rounded-2xl bg-white text-[var(--ink)] p-4 shadow-xl border border-black/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-3 border-b border-black/[0.06]">
                        <ToolLogo id="x" name="X" size={24} />
                        <div>
                          <span className="text-xs font-bold block leading-tight">{demo.author.name}</span>
                          <span className="text-[10px] text-[var(--ink-muted)] block">{demo.author.handle} &bull; 1m</span>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--ink)] mt-3 leading-relaxed whitespace-pre-line font-sans">
                        {demo.posts.x.text}
                      </p>
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-3 bg-slate-100">
                        <Image
                          src={demo.posts.x.image}
                          alt="Post X"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/[0.06] text-[11px] text-[var(--ink-muted)]">
                      <span className="flex items-center gap-1">
                        <Repeat2 className="w-3.5 h-3.5 text-[#10B981]" /> {demo.posts.x.retweets}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#F43F6E]" /> {demo.posts.x.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {demo.posts.x.views}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative bullet points directly on background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-10 border-t border-black/[0.06]">
          {data.description.map((phrase, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#F43F6E]">0{idx + 1}.</span>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
