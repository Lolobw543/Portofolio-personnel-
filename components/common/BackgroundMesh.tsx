"use client";

import React from "react";

export default function BackgroundMesh() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    >
      {/* Base Tint */}
      <div className="absolute inset-0 bg-[#FAF8F5]" />

      {/* Animated Pastel Blobs */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full animate-mesh-1 opacity-70 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(253, 225, 232, 0.85) 0%, rgba(254, 205, 219, 0.4) 60%, transparent 80%)",
        }}
      />
      
      <div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full animate-mesh-2 opacity-65 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(231, 227, 251, 0.9) 0%, rgba(216, 245, 230, 0.4) 55%, transparent 80%)",
        }}
      />

      <div
        className="absolute top-[60%] -left-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full animate-mesh-1 opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 229, 217, 0.8) 0%, rgba(253, 225, 232, 0.35) 60%, transparent 80%)",
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full animate-mesh-2 opacity-65 blur-[125px]"
        style={{
          background: "radial-gradient(circle, rgba(216, 245, 230, 0.75) 0%, rgba(231, 227, 251, 0.4) 55%, transparent 80%)",
        }}
      />

      {/* Subtle Noise / Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
    </div>
  );
}
