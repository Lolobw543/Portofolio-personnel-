"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Play } from "lucide-react";

const NAV_LINKS = [
  { label: "Histoire", href: "#acte-00" },
  { label: "Outils", href: "#arsenal" },
  { label: "Preuves", href: "#acte-07" },
  { label: "Contact", href: "#acte-08" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-full border ${
            scrolled
              ? "py-2 px-3 sm:px-4 bg-white/80 backdrop-blur-xl border-white/80 shadow-[0_12px_32px_rgba(20,20,31,0.08)] max-w-2xl w-full"
              : "py-2.5 px-4 sm:px-6 bg-white/65 backdrop-blur-lg border-white/70 shadow-[0_8px_24px_rgba(20,20,31,0.04)] max-w-3xl w-full"
          }`}
        >
          {/* Logo & Name */}
          <a
            href="#acte-00"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#14141F] flex items-center justify-center text-white font-bold text-xs shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#F43F6E]">
              L
            </div>
            <span className="font-semibold text-sm tracking-tight text-[var(--ink)]">
              Laurentin
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-white/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#acte-08"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#F43F6E] text-white shadow-[0_4px_14px_rgba(244,63,110,0.3)] hover:bg-[#e11d48] hover:shadow-[0_6px_20px_rgba(244,63,110,0.4)] transition-all duration-200 group"
            >
              <span>Me contacter</span>
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[var(--ink)] border border-white/90 shadow-sm"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 inset-x-4 z-50 p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(20,20,31,0.15)] flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-base font-medium text-[var(--ink)] hover:bg-black/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#acte-08"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold bg-[#F43F6E] text-white shadow-[0_6px_20px_rgba(244,63,110,0.3)]"
            >
              <span>Me contacter</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
