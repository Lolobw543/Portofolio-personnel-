const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function createFlightPlan() {
  const width = 800;
  const height = 600;
  const dir = path.join(__dirname, "../public/images/saas");

  // Satellite Terrain Photo
  const mapPhotoRaw = await fetchBuffer("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&h=600&q=85");
  const mapBg = await sharp(mapPhotoRaw)
    .resize(width, height, { fit: "cover" })
    .modulate({ brightness: 0.65, saturation: 0.85 })
    .png()
    .toBuffer();

  const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050B14" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#050B14" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="botFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050B14" stop-opacity="0"/>
        <stop offset="100%" stop-color="#050B14" stop-opacity="0.95"/>
      </linearGradient>
      <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#EF4444" stroke-width="2" stroke-opacity="0.4"/>
      </pattern>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Top & Bottom Gradient Fades -->
    <rect width="${width}" height="100" fill="url(#topFade)"/>
    <rect y="${height - 110}" width="${width}" height="110" fill="url(#botFade)"/>

    <!-- Grid Lines (UTM / GPS Grid) -->
    <line x1="160" y1="0" x2="160" y2="${height}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="320" y1="0" x2="320" y2="${height}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="480" y1="0" x2="480" y2="${height}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="640" y1="0" x2="640" y2="${height}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="0" y1="150" x2="${width}" y2="150" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="0" y1="300" x2="${width}" y2="300" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="0" y1="450" x2="${width}" y2="450" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <!-- Restricted Zone Red Box (Avoided by AI) -->
    <g transform="translate(480, 180)">
      <rect width="240" height="150" rx="12" fill="url(#diagonalHatch)" stroke="#EF4444" stroke-width="2" stroke-dasharray="6 4"/>
      <rect x="15" y="15" width="210" height="30" rx="8" fill="rgba(239,68,68,0.85)"/>
      <text x="120" y="35" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">
        ZONE RESTREINTE LF-R 14
      </text>
      <text x="120" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#FCA5A5" text-anchor="middle">
        Contournée par l&apos;IA (+150m buffer)
      </text>
    </g>

    <!-- Photogrammetry Lawnmower Survey Grid (Calculated Flight Plan) -->
    <g filter="url(#glow)">
      <!-- Corridor Safety Buffer -->
      <polygon points="120,200 440,200 440,460 120,460" fill="rgba(56,189,248,0.08)" stroke="#38BDF8" stroke-width="1" stroke-dasharray="4 4"/>
      
      <!-- Lawnmower Path -->
      <path d="M 150,220 L 410,220 L 410,260 L 150,260 L 150,300 L 410,300 L 410,340 L 150,340 L 150,380 L 410,380 L 410,420 L 150,420"
            fill="none" stroke="#38BDF8" stroke-width="2.5"/>

      <!-- Camera Trigger Dots along the path -->
      <circle cx="210" cy="220" r="3" fill="#38BDF8"/>
      <circle cx="280" cy="220" r="3" fill="#38BDF8"/>
      <circle cx="350" cy="220" r="3" fill="#38BDF8"/>
      <circle cx="210" cy="260" r="3" fill="#38BDF8"/>
      <circle cx="280" cy="260" r="3" fill="#38BDF8"/>
      <circle cx="350" cy="260" r="3" fill="#38BDF8"/>
      <circle cx="210" cy="300" r="3" fill="#38BDF8"/>
      <circle cx="280" cy="300" r="3" fill="#38BDF8"/>
      <circle cx="350" cy="300" r="3" fill="#38BDF8"/>
      <circle cx="210" cy="340" r="3" fill="#38BDF8"/>
      <circle cx="280" cy="340" r="3" fill="#38BDF8"/>
      <circle cx="350" cy="340" r="3" fill="#38BDF8"/>
      <circle cx="210" cy="380" r="3" fill="#38BDF8"/>
      <circle cx="280" cy="380" r="3" fill="#38BDF8"/>
      <circle cx="350" cy="380" r="3" fill="#38BDF8"/>
    </g>

    <!-- Waypoints Pins -->
    <!-- WP1: Takeoff -->
    <g transform="translate(100, 160)">
      <circle cx="15" cy="15" r="14" fill="#10B981" stroke="#FFF" stroke-width="2"/>
      <text x="15" y="20" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="900" fill="#000" text-anchor="middle">WP1</text>
      <text x="36" y="19" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFF">DÉCOLLAGE 0m</text>
    </g>

    <!-- WP2: Mission Start -->
    <g transform="translate(150, 220)">
      <circle cx="0" cy="0" r="8" fill="#38BDF8" stroke="#FFF" stroke-width="2"/>
      <text x="12" y="4" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#38BDF8">WP2 (120m)</text>
    </g>

    <!-- Active Drone Icon at WP3 -->
    <g transform="translate(350, 300)">
      <circle cx="0" cy="0" r="18" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="7" fill="#38BDF8"/>
      <!-- Heading Arrow -->
      <path d="M 0 -12 L 6 0 L -6 0 Z" fill="#38BDF8"/>
      <rect x="15" y="-14" width="125" height="28" rx="6" fill="#0B132B" stroke="#38BDF8" stroke-width="1"/>
      <text x="25" y="5" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="800" fill="#FFF">
        DJI M3P • 42 km/h
      </text>
    </g>

    <!-- WP5: RTH / Landing -->
    <g transform="translate(150, 420)">
      <circle cx="0" cy="0" r="12" fill="#F43F6E" stroke="#FFF" stroke-width="2"/>
      <text x="0" y="4" font-family="-apple-system, system-ui, sans-serif" font-size="9" font-weight="900" fill="#FFF" text-anchor="middle">RTH</text>
      <text x="18" y="4" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#F43F6E">ATTERRISSAGE</text>
    </g>

    <!-- TOP HEADER BAR -->
    <g transform="translate(30, 30)">
      <rect width="400" height="42" rx="12" fill="#0F172A" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <circle cx="22" cy="21" r="6" fill="#10B981"/>
      <text x="38" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">
        PLAN DE VOL IA • MISSION S3 URBAIN
      </text>
      <text x="${width - 150}" y="26" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#38BDF8" text-anchor="end">
        ALT: 120M AGL ✓
      </text>
    </g>

    <!-- BOTTOM METRICS DOCK -->
    <g transform="translate(30, ${height - 85})">
      <rect width="${width - 60}" height="65" rx="16" fill="#0A0F1D" stroke="rgba(56,189,248,0.3)" stroke-width="1.5"/>
      
      <!-- Stat 1 -->
      <g transform="translate(25, 20)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">SURFACE COUVERTE</text>
        <text x="0" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">42 Hectares</text>
      </g>

      <!-- Stat 2 -->
      <g transform="translate(195, 20)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">DURÉE VOL EST.</text>
        <text x="0" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#38BDF8">11 min 40s</text>
      </g>

      <!-- Stat 3 -->
      <g transform="translate(345, 20)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">CLICHÉS 4K</text>
        <text x="0" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">84 Photos</text>
      </g>

      <!-- Stat 4 -->
      <g transform="translate(485, 20)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#94A3B8">RÉSOLUTION SOL</text>
        <text x="0" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">1.4 cm/px</text>
      </g>

      <!-- Validation Pill Right -->
      <g transform="translate(${width - 200}, 14)">
        <rect width="125" height="36" rx="18" fill="#10B981"/>
        <text x="62" y="23" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="900" fill="#000000" text-anchor="middle">
          CONFORME DGAC
        </text>
      </g>
    </g>
  </svg>
  `;

  await sharp(mapBg)
    .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .webp({ quality: 90 })
    .toFile(path.join(dir, "panel-flightplan.webp"));
  console.log("Saved panel-flightplan.webp");
}

async function createAeroWeather() {
  const width = 800;
  const height = 600;
  const dir = path.join(__dirname, "../public/images/saas");

  const weatherSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Deep Navy Aviation Background -->
    <rect width="${width}" height="${height}" fill="#080C16"/>

    <!-- Concentric Radar Scan Rings -->
    <g transform="translate(620, 240)">
      <circle cx="0" cy="0" r="180" fill="none" stroke="rgba(56,189,248,0.12)" stroke-width="1"/>
      <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(56,189,248,0.18)" stroke-width="1"/>
      <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(56,189,248,0.25)" stroke-width="1"/>
      <!-- Radar Sweep Beam -->
      <path d="M 0 0 L 150 -90 A 180 180 0 0 1 180 0 Z" fill="rgba(56,189,248,0.1)"/>
      <line x1="0" y1="0" x2="180" y2="0" stroke="#38BDF8" stroke-width="2"/>
      <circle cx="0" cy="0" r="5" fill="#38BDF8"/>
      <text x="0" y="-190" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#94A3B8" text-anchor="middle">N</text>
      <text x="195" y="4" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#94A3B8">E</text>
      <text x="0" y="200" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#94A3B8" text-anchor="middle">S</text>
      <text x="-205" y="4" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="700" fill="#94A3B8">O</text>
    </g>

    <!-- Top Header -->
    <g transform="translate(30, 30)">
      <rect width="${width - 60}" height="56" rx="14" fill="#0F172A" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="28" cy="28" r="8" fill="#10B981"/>
      <text x="48" y="34" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">
        MÉTÉO AÉRONAUTIQUE EN DIRECT • METAR &amp; TAF
      </text>
      <rect x="${width - 230}" y="14" width="150" height="28" rx="14" fill="rgba(16,185,129,0.2)"/>
      <text x="${width - 155}" y="32" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="800" fill="#10B981" text-anchor="middle">
        GO FOR FLIGHT ✓
      </text>
    </g>

    <!-- LEFT COLUMN: Main Weather Gauges -->
    <!-- Card 1: Wind Gauge -->
    <g transform="translate(30, 110)">
      <rect width="360" height="175" rx="16" fill="#0F172A" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      
      <text x="24" y="32" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">
        VENT &amp; TURBULENCES (AGL)
      </text>
      
      <!-- Ground wind -->
      <g transform="translate(24, 55)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Vent au sol (10m) :</text>
        <text x="140" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF">11 KT (20 km/h)</text>
      </g>

      <!-- Altitude wind -->
      <g transform="translate(24, 85)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Vent à 120m AGL :</text>
        <text x="140" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="900" fill="#38BDF8">14 KT (26 km/h)</text>
      </g>

      <!-- Direction & Gusts -->
      <g transform="translate(24, 115)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Rafales max :</text>
        <text x="140" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FBBF24">16 KT • DIR: 230° SW</text>
      </g>

      <!-- Progress bar wind safe -->
      <g transform="translate(24, 140)">
        <rect width="310" height="8" rx="4" fill="#1E293B"/>
        <rect width="120" height="8" rx="4" fill="#10B981"/>
        <text x="0" y="24" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="600" fill="#10B981">
          ✓ Seuil constructeur respecté (Max: 38 km/h)
        </text>
      </g>
    </g>

    <!-- Card 2: Space Weather & GNSS -->
    <g transform="translate(30, 305)">
      <rect width="360" height="160" rx="16" fill="#0F172A" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      
      <text x="24" y="32" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#F43F6E">
        ACTIVITÉ GÉOMAGNÉTIQUE &amp; GNSS
      </text>

      <g transform="translate(24, 60)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Indice Kp :</text>
        <text x="110" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="900" fill="#10B981">1.2 (Optimal)</text>
        <text x="230" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="600" fill="#10B981">Zéro perturbation</text>
      </g>

      <g transform="translate(24, 95)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Satellites GPS lock :</text>
        <text x="140" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">22 Satellites</text>
      </g>

      <g transform="translate(24, 130)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Constellations :</text>
        <text x="110" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#38BDF8">GPS + Galileo + Glonass (Fix 3D RTK)</text>
      </g>
    </g>

    <!-- RIGHT COLUMN CARDS (overlaid next to radar) -->
    <!-- Card 3: Visibility & Ceiling -->
    <g transform="translate(415, 110)">
      <rect width="355" height="110" rx="16" fill="#0F172A" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <text x="24" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#FBBF24">
        PLAFOND &amp; VISIBILITÉ
      </text>
      
      <g transform="translate(24, 55)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Plafond nuageux :</text>
        <text x="130" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">CAVOK (> 5000 ft)</text>
      </g>

      <g transform="translate(24, 85)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Visibilité au sol :</text>
        <text x="130" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#10B981">> 10 km (Parfaite)</text>
      </g>
    </g>

    <!-- Card 4: Pressure & Temp -->
    <g transform="translate(415, 235)">
      <rect width="355" height="100" rx="16" fill="#0F172A" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <text x="24" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#94A3B8">
        ATMOSPHÈRE &amp; PRESSION
      </text>

      <g transform="translate(24, 55)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Température :</text>
        <text x="100" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">18°C</text>
        <text x="150" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Point de rosée :</text>
        <text x="260" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">10°C</text>
      </g>

      <g transform="translate(24, 80)">
        <text x="0" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="500" fill="#94A3B8">Pression QNH :</text>
        <text x="100" y="0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">1018 hPa (Haute pression)</text>
      </g>
    </g>

    <!-- BOTTOM DECISION BANNER -->
    <g transform="translate(30, 485)">
      <rect width="${width - 60}" height="85" rx="16" fill="#0A1826" stroke="#10B981" stroke-width="1.5"/>
      <g transform="translate(24, 30)">
        <circle cx="12" cy="12" r="12" fill="#10B981"/>
        <text x="12" y="17" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="900" fill="#000" text-anchor="middle">✓</text>
        
        <text x="36" y="10" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="900" fill="#FFFFFF">
          ANALYSE IA : FENÊTRE DE VOL VALIDÉE POUR LES 3 PROCHAINES HEURES
        </text>
        <text x="36" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">
          Aucun cisaillement, stabilité satellitaire maximale, visibilité totale. Vol DGAC S1/S2/S3 autorisé.
        </text>
      </g>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(weatherSvg))
    .webp({ quality: 90 })
    .toFile(path.join(dir, "panel-weather.webp"));
  console.log("Saved panel-weather.webp");
}

async function run() {
  await createFlightPlan();
  await createAeroWeather();
  console.log("SaaS panels generated successfully!");
}

run().catch(console.error);
