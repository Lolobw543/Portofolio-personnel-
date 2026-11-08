/**
 * SOURCE UNIQUE DE VÉRITÉ — CONTENU DU PORTFOLIO DE LAURENTIN
 * 
 * Modifiez facilement toutes vos informations, textes, chiffres, liens et projets ici.
 * Les éléments marqués [À REMPLACER] sont pré-remplis avec des valeurs élégantes en attendant vos données définitives.
 */

export interface ToolItem {
  id: string;
  name: string;
  category: "IA" | "Dev & Build" | "Création" | "Réseaux" | "Google" | "Paiement & Business";
  iconName: string; // Utilisé pour mapper l'icône Simple Icon ou Lucide
  color: string;
  url?: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  isFeatured?: boolean;
  theme: "light" | "navy";
  span: "col-span-1" | "col-span-2" | "md:col-span-2" | "md:col-span-3" | "col-span-full";
  summary: string;
  context: string;
  toolsUsed: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  coverImage: string;
  videoPlaceholder?: string;
}

export interface ChapterItem {
  number: string;
  ghostWord: string;
  badge: string;
  title: string;
  highlightWords: string[];
  description: string[];
  tags: string[];
  projectPreview: {
    title: string;
    subtitle: string;
    badge: string;
    metrics: string;
    tagline: string;
  };
}

export interface MethodStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  rotationDeg: number;
  pinColor: "rose" | "amber" | "mint" | "lavender";
}

export interface StatItem {
  value: string;
  numberValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  highlight?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  tag: string;
  accentColor: string;
}

export const SITE_CONTENT = {
  meta: {
    siteName: "Laurentin • Portfolio",
    author: "Laurentin",
    role: "Télépilote de drone • SaaS Builder • Expert IA & E-commerce",
    headline: "Je pilote des drones, je construis des SaaS et j'automatise tout avec l'IA.",
    description: "Portfolio personnel de Laurentin : jeune entrepreneur français, télépilote de drone certifié, créateur de SaaS, de marques e-commerce et d'automatisations IA.",
    locale: "fr_FR",
    siteUrl: "https://laurentin.design", // [À REMPLACER si nom de domaine différent]
  },

  navigation: {
    links: [
      { label: "Profil", href: "#hero" },
      { label: "Outils", href: "#arsenal" },
      { label: "Expertises", href: "#chapitres" },
      { label: "Réalisations", href: "#realisations" },
      { label: "Méthode", href: "#methode" },
    ],
    cta: {
      label: "Me contacter",
      href: "#contact",
    },
  },

  hero: {
    badge: "Entrepreneur & Télépilote certifié",
    titleParts: [
      { text: "Je pilote des " },
      { text: "drones", highlight: true },
      { text: ", je construis des " },
      { text: "SaaS", highlight: true },
      { text: " et j'automatise tout avec " },
      { text: "l'IA", highlight: true },
      { text: "." },
    ],
    subtitle:
      "Allier précision aérienne, ingénierie logicielle accélérée par l'IA et vision business pour bâtir des projets percutants et autonomes.",
    ctaPrimary: {
      label: "Découvrir mes réalisations",
      href: "#realisations",
    },
    ctaSecondary: {
      label: "Me contacter",
      href: "#contact",
    },
    floatingBadges: [
      { label: "Télépilote DGAC certifié", icon: "plane", delay: 0 },
      { label: "Créateur de SaaS", icon: "code", delay: 0.15 },
      { label: "Workflows IA & n8n", icon: "sparkles", delay: 0.3 },
      { label: "E-commerce & Branding", icon: "shopping-bag", delay: 0.45 },
    ],
    photoPlaceholder: "/me.jpg", // [À REMPLACER par votre propre photo portrait]
    photoAlt: "Laurentin — Télépilote de drone et créateur de SaaS",
  },

  manifesto: {
    badge: "Vision",
    lead: "Je ne me contente pas de piloter des drones. Je crée des marques, des logiciels et des automatisations qui travaillent à ma place.",
    highlightWords: ["drones", "marques", "logiciels", "automatisations", "travaillent à ma place"],
    authorName: "Laurentin",
    authorRole: "Créateur & Opérateur tech",
  },

  arsenal: {
    badge: "Mon arsenal d'outils",
    title: "Les outils que je maîtrise au quotidien",
    titleHighlight: "maîtrise au quotidien",
    description: "Une pile technologique pensée pour concevoir, tester et automatiser à la vitesse de la lumière.",
    categories: [
      "Tous",
      "IA",
      "Dev & Build",
      "Création",
      "Réseaux",
      "Google",
      "Paiement & Business",
    ] as const,
    tools: [
      // IA
      { id: "chatgpt", name: "ChatGPT", category: "IA", iconName: "SiOpenai", color: "#10A37F", description: "Prompting avancé & Agents" },
      { id: "gemini", name: "Gemini", category: "IA", iconName: "SiGooglegemini", color: "#8E75FF", description: "Multimodalité & Analyse approfondie" },
      { id: "claude", name: "Claude", category: "IA", iconName: "SiAnthropic", color: "#D97706", description: "Raisonnement & Coding d'élite" },
      { id: "kimi", name: "Kimi", category: "IA", iconName: "SiSparklines", color: "#0066FF", description: "Contexte ultra-long" },
      { id: "antigravity", name: "Antigravity", category: "IA", iconName: "SiGoogle", color: "#4285F4", description: "Agentic coding orchestré" },
      { id: "codex", name: "OpenAI Codex", category: "IA", iconName: "SiOpenai", color: "#000000", description: "Synthèse de code & scripts" },
      { id: "lovable", name: "Lovable", category: "IA", iconName: "SiHeart", color: "#FF3366", description: "Prototypage full-stack ultra-rapide" },
      { id: "cursor", name: "Cursor", category: "IA", iconName: "SiVscodium", color: "#000000", description: "IDE IA & vibe coding quotidien" },
      { id: "bolt", name: "Bolt.new", category: "IA", iconName: "SiLightning", color: "#FFB000", description: "Scaffolding web in-browser" },
      { id: "n8n", name: "n8n", category: "IA", iconName: "SiN8N", color: "#EA4B71", description: "Workflows IA auto-hébergés complexes" },
      { id: "make", name: "Make", category: "IA", iconName: "SiMake", color: "#6D28D9", description: "Automatisations API multi-services" },

      // Dev & Build
      { id: "nextjs", name: "Next.js", category: "Dev & Build", iconName: "SiNextdotjs", color: "#000000", description: "Framework React full-stack" },
      { id: "typescript", name: "TypeScript", category: "Dev & Build", iconName: "SiTypescript", color: "#3178C6", description: "Typage strict & fiabilité" },
      { id: "tailwind", name: "Tailwind CSS", category: "Dev & Build", iconName: "SiTailwindcss", color: "#06B6D4", description: "Design responsive & fluide" },
      { id: "supabase", name: "Supabase", category: "Dev & Build", iconName: "SiSupabase", color: "#3ECF8E", description: "Base Postgres & auth intégrée" },
      { id: "vercel", name: "Vercel", category: "Dev & Build", iconName: "SiVercel", color: "#000000", description: "Déploiements Edge instantanés" },

      // Création
      { id: "figma", name: "Figma", category: "Création", iconName: "SiFigma", color: "#F24E1E", description: "UI/UX, design systems & prototypes" },
      { id: "canva", name: "Canva", category: "Création", iconName: "SiCanva", color: "#00C4CC", description: "Templates graphiques rapides" },
      { id: "photoroom", name: "Photoroom", category: "Création", iconName: "SiCamera", color: "#FF4A70", description: "Détourage IA & packshots e-commerce" },
      { id: "capcut", name: "CapCut", category: "Création", iconName: "SiCapcut", color: "#000000", description: "Montages dynamiques formats courts" },
      { id: "davinci", name: "DaVinci Resolve", category: "Création", iconName: "SiResolve", color: "#FF5500", description: "Étalonnage cinématique & colorimétrie" },

      // Réseaux
      { id: "discord", name: "Discord", category: "Réseaux", iconName: "SiDiscord", color: "#5865F2", description: "Gestion de communauté & webhooks" },
      { id: "tiktok", name: "TikTok", category: "Réseaux", iconName: "SiTiktok", color: "#000000", description: "Contenus viraux & trends" },
      { id: "instagram", name: "Instagram", category: "Réseaux", iconName: "SiInstagram", color: "#E4405F", description: "Image de marque & Reels" },
      { id: "facebook", name: "Facebook", category: "Réseaux", iconName: "SiFacebook", color: "#1877F2", description: "Meta Ads & acquisition" },
      { id: "linkedin", name: "LinkedIn", category: "Réseaux", iconName: "SiLinkedin", color: "#0A66C2", description: "Personal branding & réseau pro" },
      { id: "x", name: "X (Twitter)", category: "Réseaux", iconName: "SiX", color: "#000000", description: "Veille tech & audience building" },

      // Google
      { id: "google", name: "Google Ecosystem", category: "Google", iconName: "SiGoogle", color: "#4285F4", description: "Workspace & APIs" },
      { id: "gmail", name: "Gmail", category: "Google", iconName: "SiGmail", color: "#EA4335", description: "Gestion de boîte automatisée" },
      { id: "gdrive", name: "Google Drive", category: "Google", iconName: "SiGoogledrive", color: "#34A853", description: "Stockage & pipelines cloud" },
      { id: "gdocs", name: "Google Docs", category: "Google", iconName: "SiGoogledocs", color: "#4285F4", description: "Scripts & génération de docs" },
      { id: "gsheets", name: "Google Sheets", category: "Google", iconName: "SiGooglesheets", color: "#34A853", description: "Bases de données légères & triggers" },
      { id: "youtube", name: "YouTube", category: "Google", iconName: "SiYoutube", color: "#FF0000", description: "Hébergement vidéo 4K & shorts" },

      // Paiement & Business
      { id: "shopify", name: "Shopify", category: "Paiement & Business", iconName: "SiShopify", color: "#7AB55C", description: "Plateforme e-commerce & conversion" },
      { id: "stripe", name: "Stripe", category: "Paiement & Business", iconName: "SiStripe", color: "#635BFF", description: "Paiements récurrents SaaS & checkout" },
      { id: "paypal", name: "PayPal", category: "Paiement & Business", iconName: "SiPaypal", color: "#00457C", description: "Passerelle de paiement globale" },
      { id: "phantom", name: "Phantom", category: "Paiement & Business", iconName: "SiSolana", color: "#AB9FF2", description: "Web3 & paiements on-chain" },
      { id: "notion", name: "Notion", category: "Paiement & Business", iconName: "SiNotion", color: "#000000", description: "Second cerveau, CRM & gestion de projet" },
    ] as ToolItem[],
  },

  chapters: [
    {
      number: "01",
      ghostWord: "AUTOMATION",
      badge: "Cœur d'expertise",
      title: "Intelligence Artificielle & Automatisation",
      highlightWords: ["Intelligence Artificielle", "Automatisation"],
      description: [
        "Je conçois des pipelines autonomes qui remplacent les tâches répétitives par de la valeur pure.",
        "Workflows avancés n8n et Make connectés à des modèles LLM (Claude, GPT-4, Gemini) pour générer, enrichir et publier sans intervention humaine.",
        "Automatisation intégrale de la production de contenu et du cross-posting sur TikTok, Instagram, LinkedIn et X.",
        "Des agents IA sur-mesure capables de monitorer des opportunités et d'exécuter des flux complexes 24h/24.",
      ],
      tags: ["n8n", "Make", "Agents IA", "Multi-Posting Automatisé", "Webhooks", "OpenAI / Claude API"],
      projectPreview: {
        title: "Système de Publication Omnicanale IA",
        subtitle: "De l'idée brute au post prêt et programmé sur 4 réseaux en 90 secondes.",
        badge: "100% Automatisé",
        metrics: "+30h économisées / mois",
        tagline: "Génération de scripts, visuels IA, titrage SEO et programmation automatique sans clic.",
      },
    },
    {
      number: "02",
      ghostWord: "SOFTWARE",
      badge: "SaaS & Build",
      title: "SaaS & Développement Assisté par IA",
      highlightWords: ["SaaS", "Développement"],
      description: [
        "Le 'vibe coding' poussé à son paroxysme : concevoir des applications web et logicielles complètes en quelques jours plutôt qu'en plusieurs mois.",
        "Projet phare : CertiDron, une solution SaaS conçue pour les télépilotes, automatisant la préparation, la conformité réglementaire et les autorisations de vol grâce à l'IA.",
        "Développement full-stack moderne : Next.js App Router, bases Supabase, auth sécurisée et intégration Stripe pour les abonnements.",
        "Conception orientée rentabilité et time-to-market immédiat.",
      ],
      tags: ["CertiDron", "Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe Billing", "Vibe Coding"],
      projectPreview: {
        title: "CertiDron — IA pour Télépilotes",
        subtitle: "Automatisation de plans de vol, déclarations AlphaTango et conformité DGAC.",
        badge: "SaaS en production",
        metrics: "Temps de conformité divisé par 4",
        tagline: "Le copilote intelligent qui libère les télépilotes des contraintes administratives.",
      },
    },
    {
      number: "03",
      ghostWord: "COMMERCE",
      badge: "E-Commerce & Branding",
      title: "E-Commerce & Création de Marques",
      highlightWords: ["E-Commerce", "Création de Marques"],
      description: [
        "Lancer et faire croître des marques directes au consommateur (D2C) avec une exigence visuelle digne du luxe.",
        "Création de la marque de bijoux Lunor : identité visuelle raffinée, storytelling, boutique Shopify hautement optimisée pour le taux de conversion.",
        "Automatisations des stocks, des e-mails transactionnels et du support client pour une gestion fluide.",
        "Maîtrise des leviers d'acquisition payants (Meta Ads, TikTok Ads) et du marketing d'influence.",
      ],
      tags: ["Shopify", "Lunor Bijoux", "Conversion Rate Optimization", "Branding", "Meta Ads", "Logistique D2C"],
      projectPreview: {
        title: "Lunor — Joaillerie Moderne",
        subtitle: "Boutique en ligne haut de gamme et expérience client fluide.",
        badge: "Marque D2C",
        metrics: "[À REMPLACER: +120k€ générés]",
        tagline: "Du design du packaging aux tunnels d'achat ultra-fluides sur Shopify.",
      },
    },
    {
      number: "04",
      ghostWord: "SKYLINE",
      badge: "Air & Image",
      title: "Drone & Image Aérienne Certifiée",
      highlightWords: ["Drone", "Image Aérienne"],
      description: [
        "Télépilote de drone professionnel certifié par la DGAC (Direction Générale de l'Aviation Civile).",
        "Captation photo et vidéo 4K cinématique pour l'immobilier de prestige, le tourisme, les événements et les suivis de chantiers.",
        "Maîtrise totale des scénarios de vol réglementaires S1, S2, S3 en milieu urbain et naturel.",
        "Rendu couleur soigné avec étalonnage professionnel pour donner un souffle spectaculaire à chaque prise.",
      ],
      tags: ["Télépilote DGAC", "Vidéo 4K", "Étalonnage Cinématique", "Immobilier de prestige", "Scénarios S1/S2/S3"],
      projectPreview: {
        title: "Galerie Aérienne Cinématique",
        subtitle: "Prises de vues aériennes dynamiques et travellings immersifs.",
        badge: "Certifié DGAC",
        metrics: "[À REMPLACER: 100+ vols certifiés]",
        tagline: "Des angles inédits et une stabilité absolue pour magnifier n'importe quel domaine.",
      },
    },
    {
      number: "05",
      ghostWord: "CONTENT",
      badge: "Post-Production",
      title: "Création de Contenu & Montage Vidéo",
      highlightWords: ["Création de Contenu", "Montage Vidéo"],
      description: [
        "La vidéo est le médium roi de la conversion et de la mémorisation.",
        "Montage dynamique de formats courts percutants (Reels, TikTok, Shorts) sur CapCut et DaVinci Resolve.",
        "Intégration d'effets visuels, de sound design captivant, de sous-titres dynamiques et de transitions chirurgicales.",
        "Stratégie de rétention pour captiver l'attention dès les 3 premières secondes.",
      ],
      tags: ["DaVinci Resolve", "CapCut Pro", "Formats Courts Viraux", "Sound Design", "Motion Design", "Hooks & Rétention"],
      projectPreview: {
        title: "Production Vidéo & Formats Courts",
        subtitle: "Des formats conçus pour capter l'attention et générer de l'engagement massif.",
        badge: "Haute rétention",
        metrics: "[À REMPLACER: 2.5M+ vues cumulées]",
        tagline: "Rythme millimétré, sound design immersif et storytelling percutant.",
      },
    },
  ] as ChapterItem[],

  projects: [
    {
      id: "certidron",
      title: "CertiDron",
      subtitle: "Plateforme SaaS IA pour télépilotes de drones",
      category: "SaaS & IA",
      badge: "Projet Phare",
      isFeatured: true,
      theme: "navy",
      span: "md:col-span-2",
      summary: "Automatisation complète des démarches réglementaires, dossiers de vol et vérifications météo/espace aérien pour les pilotes professionnels.",
      context: "La réglementation des vols de drone est chronophage et complexe. CertiDron simplifie la préparation en générant les documents de vol conformes DGAC en quelques secondes grâce à l'IA.",
      toolsUsed: ["Next.js", "TypeScript", "Tailwind", "Supabase", "OpenAI API", "Stripe"],
      metrics: [
        { label: "Temps gagné", value: "85%" },
        { label: "Conformité", value: "100% DGAC" },
        { label: "Statut", value: "Live SaaS" },
      ],
      tags: ["SaaS", "IA Copilot", "Next.js", "Aviation DGAC"],
      demoUrl: "https://certidron.fr", // [À REMPLACER si url différente]
      coverImage: "/projects/certidron.png",
    },
    {
      id: "lunor",
      title: "Lunor Joaillerie",
      subtitle: "Boutique e-commerce & identité de marque",
      category: "E-Commerce",
      badge: "E-Commerce D2C",
      isFeatured: true,
      theme: "light",
      span: "col-span-1",
      summary: "Création intégrale d'une marque de bijoux contemporains : branding, charte graphique, shooting et boutique Shopify à fort taux de conversion.",
      context: "Développement d'une identité intemporelle et minimaliste. Expérience mobile-first fluide avec tunnels d'achat optimisés pour le checkout direct.",
      toolsUsed: ["Shopify", "Figma", "Photoroom", "Meta Ads", "Klaviyo"],
      metrics: [
        { label: "Conversion", value: "[À REMPLACER: 3.8%]" },
        { label: "Boutique", value: "Shopify Custom" },
      ],
      tags: ["E-Commerce", "Branding", "Shopify", "Design System"],
      demoUrl: "https://lunor-paris.com", // [À REMPLACER]
      coverImage: "/projects/lunor.png",
    },
    {
      id: "autosocial",
      title: "AutoSocial Multi-Platform",
      subtitle: "Pipeline d'automatisation de contenu omnicanal",
      category: "IA & Automatisation",
      badge: "Système Autonome",
      isFeatured: false,
      theme: "light",
      span: "col-span-1",
      summary: "Workflow n8n / Make qui transforme un sujet d'actualité ou une note brute en 4 formats de publication calibrés (LinkedIn, X, TikTok, Instagram).",
      context: "Éliminer le travail manuel de copywriting et de redimensionnement de contenu pour maintenir une présence active et consistante 7j/7.",
      toolsUsed: ["n8n", "Claude 3.5 Sonnet", "Airtable", "Webhooks", "Canva API"],
      metrics: [
        { label: "Publications", value: "[À REMPLACER: +150/mois]" },
        { label: "Temps humain", value: "0 clic requis" },
      ],
      tags: ["n8n", "Make", "IA Générative", "Social Media"],
      demoUrl: "#contact",
      coverImage: "/projects/autosocial.png",
    },
    {
      id: "drone-showreel",
      title: "Showreel Aérien 4K",
      subtitle: "Prises de vues aériennes d'exception & étalonnage",
      category: "Drone & Vidéo",
      badge: "Télépilote DGAC",
      isFeatured: false,
      theme: "navy",
      span: "md:col-span-2",
      summary: "Série de captations aériennes cinématiques pour domaines viticoles, immobilier de luxe et paysages naturels français.",
      context: "Vols réalisés dans le respect strict des autorisations DGAC, avec télémétrie précise et étalonnage couleur sur DaVinci Resolve.",
      toolsUsed: ["Drone DJI Pro", "DaVinci Resolve", "Filtres ND", "4K 60fps"],
      metrics: [
        { label: "Résolution", value: "4K DCI Cinema" },
        { label: "Sécurité", value: "Scénarios S1/S2/S3" },
      ],
      tags: ["Drone", "Cinématique", "DaVinci Resolve", "Immobilier"],
      demoUrl: "#drone-showreel",
      coverImage: "/projects/drone.png",
    },
  ] as ProjectItem[],

  method: {
    badge: "Ma méthode de travail",
    title: "De l'idée à la mise en ligne, en quelques jours",
    titleHighlight: "quelques jours",
    subtitle: "Une approche pragmatique, débarrassée du superflu : on itère vite, on valide avec de vrais utilisateurs, et on automatise dès le premier jour.",
    steps: [
      {
        number: "01",
        title: "On échange",
        subtitle: "Cadrage précis & objectifs",
        description: "Un call direct de 30 minutes pour cerner votre besoin, vos contraintes et l'angle d'attaque le plus rapide.",
        rotationDeg: -2.5,
        pinColor: "rose",
      },
      {
        number: "02",
        title: "Je prépare tout",
        subtitle: "Architecture & maquettes",
        description: "Wireframes interactifs, choix de la stack tech idéale, structure de base de données et validation du design system.",
        rotationDeg: 1.8,
        pinColor: "amber",
      },
      {
        number: "03",
        title: "Je construis & j'automatise",
        subtitle: "Vibe coding & intégration IA",
        description: "Développement en temps réel, mise en place des flux n8n/Make, tests de robustesse et configuration des paiements.",
        rotationDeg: -1.5,
        pinColor: "mint",
      },
      {
        number: "04",
        title: "Je livre & j'améliore",
        subtitle: "Mise en ligne & passation",
        description: "Déploiement sur votre nom de domaine, formation vidéo personnalisée pour tout piloter en totale autonomie.",
        rotationDeg: 2.2,
        pinColor: "lavender",
      },
    ] as MethodStep[],
  },

  stats: {
    badge: "Impact chiffré",
    title: "Quelques repères de mon parcours",
    titleHighlight: "mon parcours",
    items: [
      {
        value: "15+",
        numberValue: 15,
        suffix: "+",
        label: "Projets digitaux conçus & livrés",
        description: "[À REMPLACER: SaaS, boutiques Shopify, automatisations]",
        highlight: false,
      },
      {
        value: "4",
        numberValue: 4,
        suffix: "",
        label: "SaaS & logiciels développés",
        description: "Dont CertiDron, copilote IA pour télépilotes",
        highlight: true,
      },
      {
        value: "100h+",
        numberValue: 100,
        suffix: "h+",
        label: "Heures de vol de drone certifiées",
        description: "Vols DGAC sans incident, en S1, S2 et S3",
        highlight: false,
      },
      {
        value: "30h+",
        numberValue: 30,
        suffix: "h/semaine",
        label: "Économisées grâce à l'IA",
        description: "Sur les workflows de création et de diffusion",
        highlight: false,
      },
    ] as StatItem[],
  },

  services: [
    {
      id: "drone",
      number: "01",
      title: "Vidéo & Photo Aérienne par Drone",
      badge: "Certifié DGAC",
      description: "Prises de vues 4K cinématiques pour valoriser un bien immobilier, un événement ou un site naturel. Préparation réglementaire et autorisations incluses.",
      features: [
        "Captation 4K 60fps & photos haute résolution",
        "Conformité réglementaire totale (S1 / S2 / S3)",
        "Étalonnage couleur pro sur DaVinci Resolve",
        "Livraison rapide sous 48h",
      ],
      tag: "Immobilier • Tourisme • Entreprise",
      accentColor: "#F43F6E",
    },
    {
      id: "ia-automation",
      number: "02",
      title: "Workflows & Automatisations IA",
      badge: "Productivité maximale",
      description: "Architecture de pipelines autonomes avec n8n, Make et les meilleurs LLMs. Vos tâches chronophages s'exécutent toutes seules pendant que vous développez votre business.",
      features: [
        "Génération et publication automatique multi-réseaux",
        "Agents IA connectés à vos outils (Notion, Sheets, CRM)",
        "Traitement de leads et emails automatisé",
        "Zéro maintenance complexe requise",
      ],
      tag: "n8n • Make • OpenAI • Claude",
      accentColor: "#8E75FF",
    },
    {
      id: "saas-web",
      number: "03",
      title: "Création de SaaS & Sites Web",
      badge: "Vibe Coding Rapide",
      description: "Du simple MVP au SaaS complet avec authentification et abonnements Stripe. Des interfaces modernes, fluides et optimisées pour le référencement.",
      features: [
        "Next.js App Router, TypeScript & Tailwind CSS",
        "Base de données Supabase & Auth sécurisée",
        "Paiements Stripe prêts à encaisser",
        "Déploiement Vercel ultra-rapide",
      ],
      tag: "Next.js • Supabase • Stripe",
      accentColor: "#06B6D4",
    },
    {
      id: "video-content",
      number: "04",
      title: "Création de Contenu & Formats Courts",
      badge: "Forte rétention",
      description: "Montage percutant de Reels, TikToks et Shorts calibrés pour l'algorithme : accroche puissante, rythme dynamique, sous-titres et sound design soigné.",
      features: [
        "Scripts optimisés pour la rétention",
        "Montage dynamique sur CapCut Pro & DaVinci",
        "Déclinaisons multi-plateformes",
        "Stratégie de personal branding",
      ],
      tag: "CapCut • DaVinci • TikTok • Reels",
      accentColor: "#F59E0B",
    },
  ] as ServiceItem[],

  contact: {
    badge: "Contact & Collaboration",
    title: "Un projet en tête ? Parlons-en.",
    titleHighlight: "Parlons-en.",
    subtitle: "Que ce soit pour un vol de drone, une automatisation IA sur-mesure, ou le développement d'un nouveau produit digital, je vous réponds sous 24 heures.",
    email: "contact@laurentin.design", // [À REMPLACER par votre vrai email]
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/laurentin", handle: "Laurentin" }, // [À REMPLACER]
      { name: "Instagram", url: "https://instagram.com/laurentin", handle: "@laurentin" }, // [À REMPLACER]
      { name: "X (Twitter)", url: "https://x.com/laurentin", handle: "@laurentin" }, // [À REMPLACER]
      { name: "YouTube", url: "https://youtube.com/@laurentin", handle: "Laurentin" }, // [À REMPLACER]
    ],
    availabilityNote: "Disponible pour missions ponctuelles & collaborations stratégiques",
    location: "France • Déplacements possibles & Remote",
  },

  footer: {
    giantName: "LAURENTIN",
    copyright: `© ${new Date().getFullYear()} Laurentin. Tous droits réservés.`,
    mentions: "Conçu avec passion, codé au millimètre.",
  },
};
