"use client";

import React from "react";
import ChapterAI from "./chapters/ChapterAI";
import ChapterSaaS from "./chapters/ChapterSaaS";
import ChapterLunor from "./chapters/ChapterLunor";
import ChapterDrone from "./chapters/ChapterDrone";
import ChapterContent from "./chapters/ChapterContent";

export default function Chapters() {
  return (
    <section id="chapitres" className="relative w-full flex flex-col">
      {/* 01 IA & AUTOMATISATION */}
      <ChapterAI />

      {/* 02 SAAS & DÉVELOPPEMENT */}
      <ChapterSaaS />

      {/* 03 E-COMMERCE & LUNOR */}
      <ChapterLunor />

      {/* 04 DRONE & IMAGE AÉRIENNE */}
      <ChapterDrone />

      {/* 05 CRÉATION DE CONTENU & MONTAGE VIDÉO */}
      <ChapterContent />
    </section>
  );
}
