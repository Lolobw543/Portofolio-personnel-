"use client";

import React from "react";
import { SITE_CONTENT } from "@/content/site";
import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-12 overflow-hidden border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Top row: links & scroll to top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b border-black/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#14141F] flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
            <div>
              <p className="font-semibold text-sm text-[var(--ink)]">Laurentin</p>
              <p className="text-xs text-[var(--ink-muted)]">Entrepreneur & Télépilote</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {SITE_CONTENT.contact.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/70 backdrop-blur-md border border-white/80 text-[var(--ink)] hover:text-[#F43F6E] hover:border-[#F43F6E]/30 transition-all duration-200 shadow-sm"
              >
                {social.name}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/80 border border-white/90 shadow-sm hover:bg-white text-[var(--ink)] hover:text-[#F43F6E] transition-all group"
          >
            <span>Retour en haut</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Giant Interactive Monogram / Name in Outline that fills on hover */}
        <div className="w-full py-16 text-center select-none overflow-hidden">
          <h2 className="text-[17vw] leading-[0.85] font-black tracking-tighter text-outline hover:text-[#14141F] transition-all duration-700 cursor-default uppercase">
            {SITE_CONTENT.footer.giantName}
          </h2>
        </div>

        {/* Bottom row: copyright */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <p>{SITE_CONTENT.footer.copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>{SITE_CONTENT.footer.mentions}</span>
            <Heart className="w-3.5 h-3.5 text-[#F43F6E] fill-[#F43F6E]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
