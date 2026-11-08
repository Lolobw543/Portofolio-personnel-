"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONTENT, ServiceItem } from "@/content/site";
import SectionBadge from "@/components/common/SectionBadge";
import HighlightText from "@/components/common/HighlightText";
import MagneticButton from "@/components/common/MagneticButton";
import {
  MessageSquare,
  Plane,
  Cpu,
  Layers,
  Video,
  Send,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", need: "" });
  const [loading, setLoading] = useState(false);

  const services = SITE_CONTENT.services;
  const contact = SITE_CONTENT.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous smooth dispatch
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 800);
  };

  const serviceIcon: Record<string, React.ReactNode> = {
    drone: <Plane className="w-5 h-5 text-[#F43F6E]" />,
    "ia-automation": <Cpu className="w-5 h-5 text-[#8E75FF]" />,
    "saas-web": <Layers className="w-5 h-5 text-[#06B6D4]" />,
    "video-content": <Video className="w-5 h-5 text-[#F59E0B]" />,
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* Part 1: 4 Services Cards */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <SectionBadge label="Mes Services" icon={Layers} />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[var(--ink)] mt-4">
              Ce que je peux <HighlightText>réaliser pour vous</HighlightText>
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mt-3 font-normal">
              Des interventions ciblées et à fort impact, du ciel au code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} icon={serviceIcon[service.id]} />
            ))}
          </div>
        </div>

        {/* Part 2: Final Contact & Conversation Block */}
        <div className="relative rounded-[36px] bg-[#1B1B4B] text-white p-8 sm:p-12 lg:p-16 shadow-[0_30px_70px_rgba(27,27,75,0.45)] border border-white/10 overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#F43F6E]/18 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3B82F6]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct Info & Socials */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <SectionBadge label={contact.badge} icon={MessageSquare} variant="navy" />

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Un projet en tête ? <span className="text-[#F43F6E] font-normal">Parlons-en.</span>
              </h3>

              <p className="text-sm text-white/70 font-light leading-relaxed">
                {contact.subtitle}
              </p>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10 text-xs text-white/80">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F43F6E]" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                  <span>{contact.availabilityNote}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#3B82F6]" />
                  <span>{contact.location}</span>
                </div>
              </div>

              {/* Social Link Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {contact.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white/10 backdrop-blur-xl p-6 sm:p-8 border border-white/15">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-[#10B981]" />
                    </div>
                    <h4 className="text-2xl font-medium text-white">Message envoyé !</h4>
                    <p className="text-xs text-white/70 max-w-sm">
                      Merci pour votre message. Je vous réponds sous 24h ouvrées.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", need: "" });
                      }}
                      className="mt-2 text-xs text-[#F43F6E] underline cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Votre nom ou entreprise
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Alexandre Dumont"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#F43F6E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Votre adresse email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#F43F6E] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Votre besoin ou projet
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.need}
                        onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                        placeholder="Décrivez en quelques lignes ce que vous souhaitez accomplir (drone, automatisation, SaaS, vidéo...)"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#F43F6E] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm bg-[#F43F6E] text-white shadow-lg hover:bg-[#e11d48] transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            <span>Envoyer ma demande</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Single Service Card
function ServiceCard({ service, icon }: { service: ServiceItem; icon: React.ReactNode }) {
  return (
    <div className="group rounded-[30px] p-7 glass-card flex flex-col justify-between min-h-[360px] border border-white/90 shadow-[0_12px_32px_rgba(20,20,31,0.05)] hover:shadow-[0_20px_45px_rgba(244,63,110,0.14)] hover:bg-white/90 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-black/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] text-[var(--ink-muted)]">
            {service.badge}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">
            {service.title}
          </h3>
          <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed font-light">
            {service.description}
          </p>
        </div>

        {/* Feature bullets */}
        <div className="flex flex-col gap-2 pt-2">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] text-[var(--ink)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between">
        <span className="text-[10px] text-[var(--ink-muted)] font-medium uppercase tracking-wider">
          {service.tag}
        </span>
        <a
          href="#contact"
          className="text-xs font-semibold text-[#F43F6E] hover:underline"
        >
          Commander
        </a>
      </div>
    </div>
  );
}
