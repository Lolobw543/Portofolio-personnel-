const sharp = require("sharp");
const fs = require("fs");

async function generateAssets() {
  const dir = "public/images/ai";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. Avatar Laurentin (Fictional Stylized Icon / Portrait)
  const avatarSvg = `
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1B1B4B" />
        <stop offset="100%" stop-color="#2D2054" />
      </linearGradient>
      <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#F43F6E" />
        <stop offset="100%" stop-color="#3B82F6" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" rx="100" fill="url(#avBg)" />
    <circle cx="100" cy="100" r="85" fill="none" stroke="url(#rim)" stroke-width="4" stroke-dasharray="12 6" />
    <circle cx="100" cy="85" r="32" fill="#FAF8F5" opacity="0.9" />
    <path d="M55 165 C60 125, 140 125, 145 165 Z" fill="#FAF8F5" opacity="0.85" />
    <circle cx="100" cy="85" r="16" fill="none" stroke="#F43F6E" stroke-width="2" />
    <path d="M100 65 V105 M80 85 H120" stroke="#F43F6E" stroke-width="1.5" stroke-dasharray="4 2" />
  </svg>`;
  await sharp(Buffer.from(avatarSvg)).webp({ quality: 90 }).toFile(`${dir}/avatar-laurentin.webp`);

  // 2. Post LinkedIn (16:9 aerial orthophoto with AI bounding boxes)
  const rows = Array.from({ length: 18 }, (_, i) => `<line x1="${i * 50 - 50}" y1="0" x2="${i * 50 + 150}" y2="450" />`).join("");
  const linkedinSvg = `
  <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fieldBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F2B1D" />
        <stop offset="50%" stop-color="#184A34" />
        <stop offset="100%" stop-color="#0D1E16" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#fieldBg)" />
    <g stroke="#2A6B4E" stroke-width="3" opacity="0.6">
      ${rows}
    </g>
    <rect x="180" y="80" width="160" height="110" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="2" stroke-dasharray="6 3" />
    <rect x="180" y="80" width="115" height="24" rx="4" fill="#10B981" />
    <text x="188" y="96" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">ZONE VIGNE A • 98%</text>

    <rect x="420" y="160" width="220" height="140" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 3" />
    <rect x="420" y="160" width="145" height="24" rx="4" fill="#F59E0B" />
    <text x="428" y="176" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="11" font-weight="700">STRESS HYDRIQUE DÉTECTÉ</text>

    <rect x="30" y="390" width="740" height="40" rx="10" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(255,255,255,0.15)" />
    <text x="50" y="415" fill="#38BDF8" font-family="monospace" font-size="12">ALT: 82m • SPEED: 14.2 m/s • 4K DCI • RTK FIX</text>
    <text x="750" y="415" fill="#10B981" font-family="monospace" font-size="12" text-anchor="end">ANALYSE IA : VALIDÉE (12 min)</text>
  </svg>`;
  await sharp(Buffer.from(linkedinSvg)).webp({ quality: 85 }).toFile(`${dir}/post-linkedin.webp`);

  // 3. Post Instagram (Square Golden Hour Vineyard Vista)
  const instagramSvg = `
  <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1E1B4B" />
        <stop offset="40%" stop-color="#6B21A8" />
        <stop offset="70%" stop-color="#C2410C" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
      <linearGradient id="hills" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14532D" />
        <stop offset="100%" stop-color="#052E16" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#sunsetSky)" />
    <circle cx="300" cy="380" r="80" fill="#FEF08A" opacity="0.9" />
    
    <path d="M0 380 Q150 330, 300 370 T600 350 L600 600 L0 600 Z" fill="url(#hills)" />
    <path d="M0 430 Q200 400, 400 440 T600 420 L600 600 L0 600 Z" fill="#0A3319" />
    
    <g transform="translate(240, 140) scale(0.6)">
      <path d="M60 40 H140 M100 10 V70" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="15" r="22" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.8"/>
      <circle cx="150" cy="15" r="22" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.8"/>
      <circle cx="50" cy="65" r="22" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.8"/>
      <circle cx="150" cy="65" r="22" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.8"/>
    </g>

    <rect x="30" y="520" width="540" height="50" rx="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />
    <text x="50" y="551" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="600" font-size="14">Cartographie Domaine Saint-Émilion • 45 Hectares</text>
  </svg>`;
  await sharp(Buffer.from(instagramSvg)).webp({ quality: 85 }).toFile(`${dir}/post-instagram.webp`);

  // 4. Post TikTok (9:16 Vertical Video Preview with Drone Cockpit)
  const tiktokSvg = `
  <svg width="450" height="800" viewBox="0 0 450 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ttSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0284C7" />
        <stop offset="50%" stop-color="#38BDF8" />
        <stop offset="85%" stop-color="#BAE6FD" />
        <stop offset="100%" stop-color="#15803D" />
      </linearGradient>
    </defs>
    <rect width="450" height="800" fill="url(#ttSky)" />
    
    <path d="M0 500 C150 480, 300 520, 450 490 L450 800 L0 800 Z" fill="#166534" />
    <path d="M0 580 C120 560, 280 610, 450 570 L450 800 L0 800 Z" fill="#14532D" />

    <circle cx="225" cy="400" r="90" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="10 6" opacity="0.8" />
    <path d="M190 400 H260 M225 365 V435" stroke="#F43F6E" stroke-width="3" stroke-linecap="round"/>
    
    <line x1="175" y1="340" x2="275" y2="340" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
    <line x1="185" y1="310" x2="265" y2="310" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
    <line x1="175" y1="460" x2="275" y2="460" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>

    <rect x="25" y="60" width="130" height="32" rx="16" fill="rgba(244, 63, 110, 0.9)" />
    <text x="40" y="81" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="12">● LIVE 60 FPS</text>

    <rect x="25" y="700" width="400" height="60" rx="16" fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.2)" />
    <text x="45" y="725" fill="#FFFFFF" font-family="monospace" font-size="13">ALT: 120m | SPD: 48 km/h</text>
    <text x="45" y="745" fill="#34D399" font-family="monospace" font-size="12">✓ 45/45 Ha Cartographiés</text>
  </svg>`;
  await sharp(Buffer.from(tiktokSvg)).webp({ quality: 85 }).toFile(`${dir}/post-tiktok.webp`);

  // 5. Post X (16:9 Data Visualization & Flight Path)
  const gridLines = Array.from({ length: 16 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="450" />`).join("")
    + Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}" />`).join("");

  const xSvg = `
  <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="xBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B0F19" />
        <stop offset="100%" stop-color="#1E293B" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#xBg)" />
    <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
      ${gridLines}
    </g>

    <path d="M 100 350 Q 200 120, 350 250 T 650 150" fill="none" stroke="#38BDF8" stroke-width="4" stroke-dasharray="8 4"/>
    <circle cx="100" cy="350" r="8" fill="#10B981" />
    <text x="115" y="355" fill="#10B981" font-family="monospace" font-size="12">DÉCOLLAGE 09:18</text>

    <circle cx="650" cy="150" r="8" fill="#F43F6E" />
    <text x="560" y="130" fill="#F43F6E" font-family="monospace" font-size="12">ATTERRISSAGE 09:30</text>

    <rect x="180" y="60" width="440" height="110" rx="14" fill="rgba(15, 23, 42, 0.85)" stroke="#38BDF8" stroke-width="1.5" />
    <text x="210" y="95" fill="#94A3B8" font-family="system-ui, sans-serif" font-size="12">RAPPORT D'ANALYSE PARCELLAIRE IA</text>
    <text x="210" y="130" fill="#F8FAFC" font-family="system-ui, sans-serif" font-size="22" font-weight="700">45 Hectares • 100% Conforme</text>
    <text x="210" y="152" fill="#34D399" font-family="monospace" font-size="12">✓ 0 anomalie majeure • NDVI Moyen: 0.78</text>
  </svg>`;
  await sharp(Buffer.from(xSvg)).webp({ quality: 85 }).toFile(`${dir}/post-x.webp`);

  console.log("All 5 realistic social assets generated successfully in public/images/ai/");
}

generateAssets().catch(console.error);
