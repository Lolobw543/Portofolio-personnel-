const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function createTikTokPhone() {
  const width = 720;
  const height = 1280;
  // 1. Fetch background photo
  const bgRaw = await fetchBuffer("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=720&h=1280&q=85");
  const bg = await sharp(bgRaw)
    .resize(width, height, { fit: "cover" })
    .modulate({ brightness: 0.9, saturation: 1.15 })
    .toBuffer();

  // 2. SVG Overlay for TikTok UI & Hook
  const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Top Gradient & Bottom Gradient -->
    <defs>
      <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="botFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="60%" stop-color="#000000" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="hookGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFE600"/>
        <stop offset="100%" stop-color="#FF3366"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.7"/>
      </filter>
    </defs>
    
    <rect width="${width}" height="180" fill="url(#topFade)"/>
    <rect y="${height - 400}" width="${width}" height="400" fill="url(#botFade)"/>

    <!-- Top Bar -->
    <text x="240" y="70" font-family="-apple-system, system-ui, sans-serif" font-size="20" font-weight="600" fill="rgba(255,255,255,0.6)" text-anchor="middle">Abonnements</text>
    <text x="360" y="70" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF" text-anchor="middle">Pour toi</text>
    <rect x="345" y="82" width="30" height="3" rx="1.5" fill="#FFFFFF"/>
    
    <!-- VIRAL HOOK CALLOUT (CENTER) -->
    <g filter="url(#shadow)" transform="translate(60, 340)">
      <rect width="600" height="150" rx="20" fill="rgba(0,0,0,0.75)" stroke="#FFE600" stroke-width="2"/>
      <rect x="20" y="16" width="130" height="26" rx="6" fill="#FFE600"/>
      <text x="85" y="34" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">HOOK 0–3 SEC</text>
      
      <text x="30" y="78" font-family="-apple-system, system-ui, sans-serif" font-size="24" font-weight="900" fill="#FFFFFF">
        3 PROMPTS IA SECRETS POUR
      </text>
      <text x="30" y="112" font-family="-apple-system, system-ui, sans-serif" font-size="26" font-weight="900" fill="#FFE600">
        MULTIPLIER VOS VUES x10 🚀
      </text>
      <text x="30" y="136" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="rgba(255,255,255,0.75)">
        Stratégie de rétention testée sur 2.5M de vues
      </text>
    </g>

    <!-- RIGHT ACTION SIDEBAR -->
    <!-- Avatar -->
    <g transform="translate(620, 680)">
      <circle cx="26" cy="26" r="26" fill="#6366F1" stroke="#FFF" stroke-width="2"/>
      <text x="26" y="34" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFF" text-anchor="middle">L</text>
      <circle cx="26" cy="52" r="11" fill="#FF3366"/>
      <text x="26" y="56" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFF" text-anchor="middle">+</text>
    </g>

    <!-- Like -->
    <g transform="translate(626, 770)" filter="url(#shadow)">
      <path d="M20 7.5 C15 -2, 0 1, 0 12 C0 22, 20 33, 20 33 C20 33, 40 22, 40 12 C40 1, 25 -2, 20 7.5 Z" fill="#FF3366"/>
      <text x="20" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFF" text-anchor="middle">245.8K</text>
    </g>

    <!-- Comment -->
    <g transform="translate(626, 855)" filter="url(#shadow)">
      <path d="M5 2 C2 2 0 4 0 7 L0 25 C0 28 2 30 5 30 L10 30 L10 36 L18 30 L35 30 C38 30 40 28 40 25 L40 7 C40 4 38 2 35 2 Z" fill="#FFFFFF"/>
      <circle cx="12" cy="16" r="2.5" fill="#000"/>
      <circle cx="20" cy="16" r="2.5" fill="#000"/>
      <circle cx="28" cy="16" r="2.5" fill="#000"/>
      <text x="20" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFF" text-anchor="middle">1,842</text>
    </g>

    <!-- Bookmark -->
    <g transform="translate(626, 940)" filter="url(#shadow)">
      <path d="M8 2 C5 2 3 4 3 7 L3 36 L20 27 L37 36 L37 7 C37 4 35 2 32 2 Z" fill="#FFE600"/>
      <text x="20" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFF" text-anchor="middle">18.3K</text>
    </g>

    <!-- Share -->
    <g transform="translate(626, 1025)" filter="url(#shadow)">
      <path d="M22 6 L36 18 L22 30 L22 22 C10 22 4 28 2 36 C4 22 10 14 22 14 Z" fill="#FFFFFF"/>
      <text x="20" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFF" text-anchor="middle">4,910</text>
    </g>

    <!-- Spinning Audio Disc -->
    <g transform="translate(626, 1110)">
      <circle cx="20" cy="20" r="22" fill="#111" stroke="#333" stroke-width="3"/>
      <circle cx="20" cy="20" r="8" fill="#FF3366"/>
    </g>

    <!-- BOTTOM POST INFO -->
    <g transform="translate(36, 1060)" filter="url(#shadow)">
      <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF">@laurentin_tech</text>
      <text x="0" y="28" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="500" fill="#FFFFFF">
        Le workflow exact pour monter un Reel en 12 minutes ⚡️
      </text>
      <text x="0" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="600" fill="#FFE600">
        #drone #ia #capcut #davinciresolve #viral
      </text>
      
      <!-- Audio line -->
      <g transform="translate(0, 72)">
        <text x="22" y="16" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="500" fill="rgba(255,255,255,0.9)">
          ♫ Laurentin • Son original - Cyber Drone Beat
        </text>
      </g>
    </g>
  </svg>
  `;

  const destPath = path.join(__dirname, "../public/images/content/phone-reel-1.webp");
  await sharp(bg)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile(destPath);
  console.log(`Saved TikTok Phone: ${destPath} (${fs.statSync(destPath).size} bytes)`);
}

async function createInstaReelsPhone() {
  const width = 720;
  const height = 1280;
  // 1. Fetch background photo (cinematic aerial sunset)
  const bgRaw = await fetchBuffer("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=720&h=1280&q=85");
  const bg = await sharp(bgRaw)
    .resize(width, height, { fit: "cover" })
    .modulate({ brightness: 0.95, saturation: 1.2 })
    .toBuffer();

  const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="botFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="50%" stop-color="#000000" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <rect width="${width}" height="140" fill="url(#topFade)"/>
    <rect y="${height - 350}" width="${width}" height="350" fill="url(#botFade)"/>

    <!-- Top Bar: Reels -->
    <text x="36" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">Reels</text>
    
    <!-- Right Actions -->
    <g transform="translate(635, 780)" filter="url(#shadow)">
      <path d="M16 6 C12 0, 0 2, 0 11 C0 19, 16 28, 16 28 C16 28, 32 19, 32 11 C32 2, 20 0, 16 6 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="16" y="44" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF" text-anchor="middle">84.2K</text>
    </g>

    <g transform="translate(635, 865)" filter="url(#shadow)">
      <path d="M4 2 C2 2 0 4 0 7 L0 23 C0 26 2 28 4 28 L8 28 L8 33 L15 28 L28 28 C30 28 32 26 32 23 L32 7 C32 4 30 2 28 2 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="16" y="44" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF" text-anchor="middle">640</text>
    </g>

    <g transform="translate(635, 950)" filter="url(#shadow)">
      <path d="M2 14 L30 2 L18 30 L14 18 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <text x="16" y="44" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF" text-anchor="middle">12.8K</text>
    </g>

    <g transform="translate(635, 1035)" filter="url(#shadow)">
      <circle cx="16" cy="8" r="2.5" fill="#FFF"/>
      <circle cx="16" cy="16" r="2.5" fill="#FFF"/>
      <circle cx="16" cy="24" r="2.5" fill="#FFF"/>
    </g>

    <!-- Bottom Profile & Caption -->
    <g transform="translate(36, 1080)" filter="url(#shadow)">
      <!-- Avatar & Name -->
      <circle cx="20" cy="20" r="20" fill="#E1306C"/>
      <text x="20" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFF" text-anchor="middle">L</text>
      <text x="52" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">laurentin_aero</text>
      <rect x="180" y="10" width="70" height="26" rx="13" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="215" y="27" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle">Suivre</text>

      <text x="0" y="66" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="400" fill="#FFFFFF">
        Du vol brut en D-Log à la 4K cinématique étalonnée ✨
      </text>
      <text x="0" y="90" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="600" fill="#FFFFFF">
        #drone #davinciresolve #cinematography #reels
      </text>

      <!-- Audio Pill -->
      <g transform="translate(0, 110)">
        <rect width="260" height="28" rx="14" fill="rgba(255,255,255,0.2)" backdrop-filter="blur(10px)"/>
        <text x="18" y="18" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="500" fill="#FFFFFF">
          🎵 Laurentin • Audio d&apos;origine
        </text>
      </g>
    </g>
  </svg>
  `;

  const destPath = path.join(__dirname, "../public/images/content/phone-reel-2.webp");
  await sharp(bg)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile(destPath);
  console.log(`Saved Insta Reels Phone: ${destPath} (${fs.statSync(destPath).size} bytes)`);
}

async function createColorGrading() {
  const width = 1280;
  const height = 720;
  // Fetch high-quality landscape photo
  const photoRaw = await fetchBuffer("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&h=720&q=90");
  
  // Left half: Log profile (desaturated, low contrast, washed out)
  const leftHalf = await sharp(photoRaw)
    .extract({ left: 0, top: 0, width: 640, height: 720 })
    .modulate({ saturation: 0.35, brightness: 1.15 })
    .linear(0.65, 45) // flatten contrast
    .toBuffer();

  // Right half: Graded profile (rich saturation, teal shadows, golden highlights, punchy)
  const rightHalf = await sharp(photoRaw)
    .extract({ left: 640, top: 0, width: 640, height: 720 })
    .modulate({ saturation: 1.45, brightness: 0.95 })
    .linear(1.25, -20) // increase contrast
    .tint({ r: 255, g: 215, b: 180 }) // warm film look
    .toBuffer();

  // Combine both halves
  const combined = await sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
  })
    .composite([
      { input: leftHalf, top: 0, left: 0 },
      { input: rightHalf, top: 0, left: 640 },
    ])
    .toBuffer();

  // Overlay with DaVinci Resolve scopes, labels & divider
  const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Center divider line -->
    <line x1="640" y1="0" x2="640" y2="${height}" stroke="#F43F6E" stroke-width="3"/>
    
    <!-- Center badge -->
    <g transform="translate(565, 335)">
      <rect width="150" height="50" rx="25" fill="#14141E" stroke="#F43F6E" stroke-width="2"/>
      <text x="75" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
        AVANT / APRÈS
      </text>
    </g>

    <!-- Top Left Label: RAW LOG -->
    <g transform="translate(40, 40)">
      <rect width="210" height="42" rx="12" fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <circle cx="24" cy="21" r="5" fill="#9CA3AF"/>
      <text x="40" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">
        DJI D-LOG M (RAW)
      </text>
    </g>

    <!-- Top Right Label: GRADED CINEMA -->
    <g transform="translate(1000, 40)">
      <rect width="240" height="42" rx="12" fill="rgba(0,0,0,0.75)" stroke="#F43F6E" stroke-width="1.5"/>
      <circle cx="24" cy="21" r="5" fill="#10B981"/>
      <text x="40" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">
        4K DCI CINÉMA LUT ✓
      </text>
    </g>

    <!-- Bottom Info Bar: DaVinci Resolve Scopes -->
    <g transform="translate(40, ${height - 110})">
      <rect width="${width - 80}" height="70" rx="16" fill="rgba(10,12,20,0.85)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <text x="30" y="32" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#F43F6E">
        DAVINCI RESOLVE STUDIO 19 • COLOR ENGINE
      </text>
      <text x="30" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="400" fill="rgba(255,255,255,0.7)">
        Color Science ACEScct • 33-Point 3D LUT • Étalonnage HDR &amp; Rec.709 • 10-bit 4:2:2
      </text>

      <text x="${width - 120}" y="42" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="800" fill="#10B981" text-anchor="end">
        ✓ ÉTALONNÉ
      </text>
    </g>
  </svg>
  `;

  const destPath = path.join(__dirname, "../public/images/content/color-grading.webp");
  await sharp(combined)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile(destPath);
  console.log(`Saved Color Grading: ${destPath} (${fs.statSync(destPath).size} bytes)`);
}

async function createProjectCovers() {
  const dir = path.join(__dirname, "../public/images/projects");

  // 1. Lunor Cover (Luxury Gold Rings on Silk / Studio)
  const lunorRaw = await fetchBuffer("https://images.unsplash.com/photo-1781901726877-0b5775eea722?auto=format&fit=crop&w=1200&h=800&q=90");
  const lunorSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.75"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#fade)"/>
    
    <g transform="translate(60, 680)">
      <rect width="170" height="32" rx="16" fill="#FFFFFF" fill-opacity="0.15" stroke="#FFFFFF" stroke-width="1"/>
      <text x="85" y="21" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
        SHOPIFY D2C
      </text>
      <text x="0" y="-30" font-family="-apple-system, system-ui, sans-serif" font-size="38" font-weight="300" fill="#FFFFFF" letter-spacing="6">
        LUNOR PARIS
      </text>
      <text x="0" y="-7" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.85)">
        Haute Joaillerie Contemporaine • Identité, Branding &amp; E-Commerce
      </text>
    </g>
  </svg>
  `;
  await sharp(lunorRaw)
    .resize(1200, 800, { fit: "cover" })
    .composite([{ input: Buffer.from(lunorSvg), top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile(path.join(dir, "lunor-cover.webp"));
  console.log("Saved Lunor Cover");

  // 2. Drone Showreel Cover (Epic 4K Aerial Golden Hour)
  const droneRaw = await fetchBuffer("https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&h=800&q=90");
  const droneSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#fade)"/>
    <g transform="translate(60, 680)">
      <rect width="180" height="32" rx="16" fill="#F43F6E" fill-opacity="0.9"/>
      <text x="90" y="21" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
        4K DCI CINEMA
      </text>
      <text x="0" y="-30" font-family="-apple-system, system-ui, sans-serif" font-size="38" font-weight="700" fill="#FFFFFF">
        SHOWREEL AÉRIEN 4K
      </text>
      <text x="0" y="-7" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="400" fill="rgba(255,255,255,0.85)">
        Prises de vues aériennes professionnelles certifiées DGAC • Domaines &amp; Événements
      </text>
    </g>
  </svg>
  `;
  await sharp(droneRaw)
    .resize(1200, 800, { fit: "cover" })
    .composite([{ input: Buffer.from(droneSvg), top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile(path.join(dir, "drone-cover.webp"));
  console.log("Saved Drone Cover");

  // 3. CertiDron SaaS Dashboard Cover
  const certidronSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <!-- Dark Navy Tech Background -->
    <rect width="1200" height="800" fill="#0E121E"/>
    
    <!-- Top Nav Chrome -->
    <rect width="1200" height="60" fill="#161C2C" border-bottom="1px solid rgba(255,255,255,0.1)"/>
    <circle cx="30" cy="30" r="6" fill="#EF4444"/>
    <circle cx="50" cy="30" r="6" fill="#F59E0B"/>
    <circle cx="70" cy="30" r="6" fill="#10B981"/>
    
    <text x="110" y="36" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">CertiDron</text>
    <rect x="195" y="18" width="80" height="24" rx="12" fill="#10B981" fill-opacity="0.2"/>
    <text x="235" y="34" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#10B981" text-anchor="middle">LIVE SAAS</text>

    <!-- Map & Flight Planner Area -->
    <rect x="40" y="90" width="720" height="420" rx="20" fill="#161C2C" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    
    <!-- Radar / Flight Grid -->
    <circle cx="400" cy="300" r="160" fill="none" stroke="rgba(16,185,129,0.2)" stroke-width="1" stroke-dasharray="4 4"/>
    <circle cx="400" cy="300" r="100" fill="none" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
    <circle cx="400" cy="300" r="40" fill="none" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
    <!-- Flight Path -->
    <path d="M 280 340 Q 350 220 440 260 T 520 310" fill="none" stroke="#38BDF8" stroke-width="3"/>
    <circle cx="520" cy="310" r="8" fill="#38BDF8"/>
    <text x="535" y="315" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">DJI MAVIC 3 PRO</text>

    <!-- Map Badges -->
    <rect x="60" y="110" width="160" height="34" rx="10" fill="#0E121E" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="75" y="132" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF">ZONE: S3 AGGLOMÉRATION</text>

    <rect x="230" y="110" width="140" height="34" rx="10" fill="#0E121E" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="245" y="132" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="600" fill="#10B981">PLAFOND: 120M AGL</text>

    <!-- Right Sidebar: AI Mission Assistant -->
    <rect x="790" y="90" width="370" height="420" rx="20" fill="#161C2C" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <text x="820" y="130" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">Copilote Réglementaire IA</text>
    <text x="820" y="152" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="400" fill="rgba(255,255,255,0.6)">Conformité DGAC automatisée</text>

    <g transform="translate(820, 180)">
      <rect width="310" height="50" rx="12" fill="#0E121E"/>
      <circle cx="25" cy="25" r="9" fill="#10B981"/>
      <text x="25" y="29" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="900" fill="#000" text-anchor="middle">✓</text>
      <text x="48" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">Dossier AlphaTango</text>
      <text x="48" y="40" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="400" fill="#10B981">Généré &amp; validé en 12s</text>
    </g>

    <g transform="translate(820, 245)">
      <rect width="310" height="50" rx="12" fill="#0E121E"/>
      <circle cx="25" cy="25" r="9" fill="#10B981"/>
      <text x="25" y="29" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="900" fill="#000" text-anchor="middle">✓</text>
      <text x="48" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">Météo &amp; NOTAM Aérien</text>
      <text x="48" y="40" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="400" fill="#10B981">Vent 14 km/h • Indice Kp 1 (Optimal)</text>
    </g>

    <g transform="translate(820, 310)">
      <rect width="310" height="50" rx="12" fill="#0E121E"/>
      <circle cx="25" cy="25" r="9" fill="#10B981"/>
      <text x="25" y="29" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="900" fill="#000" text-anchor="middle">✓</text>
      <text x="48" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">Notification Préfecture S3</text>
      <text x="48" y="40" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="400" fill="#10B981">Accusé de réception synchronisé</text>
    </g>

    <!-- Bottom Banner -->
    <rect x="40" y="535" width="1120" height="225" rx="20" fill="linear-gradient(90deg, #161C2C, #1E2738)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <g transform="translate(80, 600)">
      <text x="0" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF">
        CertiDron • Plateforme SaaS IA
      </text>
      <text x="0" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.75)">
        Développé en Next.js App Router, Supabase, Stripe &amp; OpenAI API • Conçu pour les télépilotes pros.
      </text>
      <g transform="translate(0, 95)">
        <rect width="140" height="34" rx="17" fill="#F43F6E"/>
        <text x="70" y="22" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFF" text-anchor="middle">TEMPS GAGNÉ : 85%</text>
      </g>
    </g>
  </svg>
  `;
  await sharp(Buffer.from(certidronSvg))
    .webp({ quality: 85 })
    .toFile(path.join(dir, "certidron-cover.webp"));
  console.log("Saved CertiDron Cover");

  // 4. AutoSocial Cover
  const autosocialSvg = `
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" fill="#0F172A"/>
    
    <!-- Header -->
    <rect width="1200" height="60" fill="#1E293B"/>
    <circle cx="30" cy="30" r="6" fill="#EF4444"/>
    <circle cx="50" cy="30" r="6" fill="#F59E0B"/>
    <circle cx="70" cy="30" r="6" fill="#10B981"/>
    <text x="110" y="36" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFF">AutoSocial Pipeline • n8n Engine</text>

    <!-- Canvas Workflow Nodes -->
    <g transform="translate(80, 160)">
      <!-- Trigger Node -->
      <rect x="0" y="80" width="180" height="100" rx="16" fill="#1E293B" stroke="#EA4B71" stroke-width="2"/>
      <text x="90" y="125" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFF" text-anchor="middle">Idée / Note Audio</text>
      <text x="90" y="150" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8" text-anchor="middle">Webhook Déclencheur</text>

      <!-- Arrow 1 -->
      <path d="M 180 130 L 260 130" stroke="#EA4B71" stroke-width="3" stroke-dasharray="6 4"/>

      <!-- Claude Node -->
      <rect x="260" y="80" width="200" height="100" rx="16" fill="#1E293B" stroke="#D97706" stroke-width="2"/>
      <text x="360" y="125" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFF" text-anchor="middle">Claude 3.5 Sonnet</text>
      <text x="360" y="150" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8" text-anchor="middle">Adaptation 4 Formats IA</text>

      <!-- Arrow 2 -->
      <path d="M 460 130 L 540 130" stroke="#D97706" stroke-width="3" stroke-dasharray="6 4"/>

      <!-- Distribution Engine -->
      <rect x="540" y="80" width="180" height="100" rx="16" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
      <text x="630" y="125" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFF" text-anchor="middle">Média &amp; Formats</text>
      <text x="630" y="150" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8" text-anchor="middle">Canva API &amp; 9:16 Render</text>

      <!-- Branches to 4 Outputs -->
      <path d="M 720 130 Q 770 130 800 50" stroke="#38BDF8" stroke-width="2.5"/>
      <path d="M 720 130 Q 770 130 800 110" stroke="#E1306C" stroke-width="2.5"/>
      <path d="M 720 130 Q 770 130 800 170" stroke="#0A66C2" stroke-width="2.5"/>
      <path d="M 720 130 Q 770 130 800 230" stroke="#F43F6E" stroke-width="2.5"/>

      <!-- Outputs -->
      <rect x="800" y="25" width="220" height="45" rx="10" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
      <text x="820" y="52" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">X (Twitter) • Thread auto</text>

      <rect x="800" y="85" width="220" height="45" rx="10" fill="#1E293B" stroke="#E1306C" stroke-width="1.5"/>
      <text x="820" y="112" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">Instagram • Carrousel &amp; Reel</text>

      <rect x="800" y="145" width="220" height="45" rx="10" fill="#1E293B" stroke="#0A66C2" stroke-width="1.5"/>
      <text x="820" y="172" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">LinkedIn • Post B2B</text>

      <rect x="800" y="205" width="220" height="45" rx="10" fill="#1E293B" stroke="#F43F6E" stroke-width="1.5"/>
      <text x="820" y="232" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#FFF">TikTok • Format vertical 9:16</text>
    </g>

    <!-- Bottom Details -->
    <g transform="translate(80, 520)">
      <rect width="1040" height="220" rx="20" fill="#1E293B" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <g transform="translate(40, 50)">
        <text x="0" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF">
          AutoSocial Multi-Platform Pipeline
        </text>
        <text x="0" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.75)">
          Distribution omnicanale autonome alimentée par n8n, Claude 3.5 Sonnet &amp; APIs sociales.
        </text>
        <g transform="translate(0, 95)">
          <rect width="180" height="34" rx="17" fill="#10B981"/>
          <text x="90" y="22" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="800" fill="#000" text-anchor="middle">0 INTERVENTION HUMAINE</text>
        </g>
      </g>
    </g>
  </svg>
  `;
  await sharp(Buffer.from(autosocialSvg))
    .webp({ quality: 85 })
    .toFile(path.join(dir, "autosocial-cover.webp"));
  console.log("Saved AutoSocial Cover");
}

async function main() {
  await createTikTokPhone();
  await createInstaReelsPhone();
  await createColorGrading();
  await createProjectCovers();
  console.log("ALL REALISTIC ASSETS GENERATED SUCCESSFULLY!");
}

main().catch(console.error);
