"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { STORY_CONTENT } from "@/content/story";
import {
  MapPin,
  Download,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  Compass,
  ArrowUpRight,
} from "lucide-react";

export default function Act8Future() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const act = STORY_CONTENT.acts.act8;
  const candidate = STORY_CONTENT.candidate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          need: formData.message,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      alert("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={act.id}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Chapter Header Card */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-[#14141F] text-white flex items-center justify-center font-bold text-xs">
              08
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F43F6E] bg-[#F43F6E]/10 px-3 py-1 rounded-full border border-[#F43F6E]/20">
              {act.tag}
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[var(--ink)]">
            {act.title}
          </h2>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mt-3 font-normal">
            {act.lead}
          </p>

          {/* Joli Panneau Motion Design pour Auch (32) */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-md border border-black/5 cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F43F6E] to-[#8B5CF6] flex items-center justify-center text-white shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-[var(--ink)] block">
                {candidate.locationLabel}
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] block">
                {candidate.locationDetail}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 Qualités Piliers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {candidate.qualities.map((quality, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-7 bg-white shadow-lg border border-black/5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F43F6E] font-bold block mb-2">
                  {quality.origin}
                </span>
                <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight mb-2">
                  {quality.title}
                </h3>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                  {quality.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & CV Download Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left: Message & CV Button */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl p-8 bg-[#14141F] text-white shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                Un projet ou une opportunité ?
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Je suis toujours enthousiaste à l&apos;idée d&apos;échanger avec des créateurs, des équipes innovantes et des passionnés de tech et d&apos;aéronautique.
              </p>

              {/* Bouton Télécharger mon CV */}
              <a
                href="/cv.pdf"
                download="CV-Laurentin.pdf"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-[var(--ink)] font-bold text-xs hover:bg-[#F43F6E] hover:text-white transition-all shadow-md group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Télécharger mon CV (PDF)</span>
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/5 text-xs text-[var(--ink-muted)] flex items-center justify-between">
              <span>Réponse garantie</span>
              <span className="font-semibold text-[var(--ink)]">Sous 24 à 48h</span>
            </div>
          </div>

          {/* Right: Functional Contact Form */}
          <div className="lg:col-span-7 rounded-3xl p-8 bg-white shadow-xl border border-black/5">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)]">Message bien reçu !</h3>
                <p className="text-xs text-[var(--ink-muted)] max-w-sm">
                  Merci de votre message. Je vous répondrai très rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--ink)] block mb-1.5">
                    Votre Nom ou Entreprise
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sophie Martin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/10 text-xs text-[var(--ink)] focus:outline-none focus:border-[#F43F6E] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--ink)] block mb-1.5">
                    Votre Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sophie@entreprise.fr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/10 text-xs text-[var(--ink)] focus:outline-none focus:border-[#F43F6E] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--ink)] block mb-1.5">
                    Votre Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Parlez-moi de votre projet, d'une opportunité ou simplement d'une envie d'échanger..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/10 text-xs text-[var(--ink)] focus:outline-none focus:border-[#F43F6E] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#F43F6E] text-white text-xs font-semibold hover:bg-[#e11d48] transition-colors shadow-md disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <span>Envoyer mon message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5. GÉNÉRIQUE DE FIN DE FILM (END CREDITS ROLL) */}
        <div className="mt-32 pt-16 border-t border-black/[0.06] text-center select-none">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--ink-muted)] block mb-4">
            — GÉNÉRIQUE DE FIN —
          </span>
          <div className="space-y-2 text-xs text-[var(--ink-muted)] font-light max-w-md mx-auto">
            <p>
              <strong className="font-semibold text-[var(--ink)]">Réalisation &amp; Code :</strong> Laurentin
            </p>
            <p>
              <strong className="font-semibold text-[var(--ink)]">Pilotage Drone :</strong> Certifié DGAC STS-01 / STS-02
            </p>
            <p>
              <strong className="font-semibold text-[var(--ink)]">Moteur Logique :</strong> Next.js, Supabase, Tailwind, Claude 3.5
            </p>
            <p>
              <strong className="font-semibold text-[var(--ink)]">Lieu de Production :</strong> Auch (32), France
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
