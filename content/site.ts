/**
 * SOURCE UNIQUE DE VÉRITÉ — CONTENU DU PORTFOLIO DE LAURENTIN
 * 
 * Modifiez facilement toutes vos informations, textes, chiffres, liens et projets ici.
 * Tous les éléments non encore confirmés sont explicitement balisés [À REMPLACER].
 */

export interface ToolItem {
  id: string;
  name: string;
  category: "IA" | "Création" | "Réseaux" | "Google" | "Business" | "Stack Technique";
  color: string;
  description: string;
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
  placeholder?: boolean;
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
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://portofoliopersonellll.vercel.app",
    ogImage: "/images/og-image.webp",
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
    photoPlaceholder: "/me-cutout.webp",
    photoAlt: "Laurentin — Télépilote de drone et créateur de SaaS",
    placeholder: false,
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
    description: "Une pile technologique complète pour concevoir, prototyper, automatiser et piloter en pleine autonomie.",
    categories: [
      "Tous",
      "IA",
      "Création",
      "Réseaux",
      "Google",
      "Business",
    ] as const,

    // Les 33 outils majeurs maîtrisés, dans l'ordre exact demandé
    primaryTools: [
      // IA
      { id: "chatgpt", name: "ChatGPT", category: "IA", color: "#10A37F", description: "Agents autonomes & Prompting avancé" },
      { id: "gemini", name: "Gemini", category: "IA", color: "#8E75FF", description: "Raisonnement multimodal & analyse poussée" },
      { id: "claude", name: "Claude", category: "IA", color: "#D97706", description: "Architecture logique & vibe coding" },
      { id: "kimi", name: "Kimi", category: "IA", color: "#0066FF", description: "Analyse de contextes massifs" },
      { id: "antigravity", name: "Antigravity", category: "IA", color: "#6366F1", description: "Agentic coding orchestré" },
      { id: "codex", name: "Codex", category: "IA", color: "#10A37F", description: "Génération & complétion de code" },
      { id: "lovable", name: "Lovable", category: "IA", color: "#FF3366", description: "Prototypage full-stack instantané" },
      { id: "cursor", name: "Cursor", category: "IA", color: "#141414", description: "IDE IA & vibe coding quotidien" },
      { id: "bolt", name: "Bolt", category: "IA", color: "#F59E0B", description: "Scaffolding d'applications in-browser" },
      { id: "n8n", name: "n8n", category: "IA", color: "#EA4B71", description: "Pipelines autonomes & auto-hébergement" },
      { id: "make", name: "Make", category: "IA", color: "#6D28D9", description: "Orchestration multi-services API" },

      // Création
      { id: "figma", name: "Figma", category: "Création", color: "#F24E1E", description: "Design systems & UI/UX réactives" },
      { id: "canva", name: "Canva", category: "Création", color: "#00C4CC", description: "Visuels marketing rapides & déclinaisons" },
      { id: "photoroom", name: "Photoroom", category: "Création", color: "#EC4899", description: "Détourage IA & packshots e-commerce" },
      { id: "capcut", name: "CapCut", category: "Création", color: "#000000", description: "Montage percutant pour formats courts" },
      { id: "davinci", name: "DaVinci Resolve", category: "Création", color: "#FF453A", description: "Étalonnage cinématique & colorimétrie 4K" },

      // Réseaux
      { id: "discord", name: "Discord", category: "Réseaux", color: "#5865F2", description: "Gestion de communauté & webhooks" },
      { id: "tiktok", name: "TikTok", category: "Réseaux", color: "#000000", description: "Création virale & stratégie d'accroche" },
      { id: "instagram", name: "Instagram", category: "Réseaux", color: "#E1306C", description: "Reels & identité visuelle soignée" },
      { id: "facebook", name: "Facebook", category: "Réseaux", color: "#1877F2", description: "Meta Ads & acquisition" },
      { id: "linkedin", name: "LinkedIn", category: "Réseaux", color: "#0A66C2", description: "Personal branding B2B" },
      { id: "x", name: "X (Twitter)", category: "Réseaux", color: "#000000", description: "Veille technologique & audience building" },

      // Google
      { id: "google", name: "Google", category: "Google", color: "#4285F4", description: "Écosystème Workspace & Cloud" },
      { id: "gmail", name: "Gmail", category: "Google", color: "#EA4335", description: "Routage d'emails & automatisation" },
      { id: "gdrive", name: "Google Drive", category: "Google", color: "#34A853", description: "Stockage cloud & assets sécurisés" },
      { id: "gdocs", name: "Google Docs", category: "Google", color: "#4285F4", description: "Rédaction assistée & scripts IA" },
      { id: "gsheets", name: "Google Sheets", category: "Google", color: "#0F9D58", description: "Bases de données légères & synchronisation" },
      { id: "youtube", name: "YouTube", category: "Google", color: "#FF0000", description: "Diffusion 4K & shorts optimisés" },

      // Business
      { id: "shopify", name: "Shopify", category: "Business", color: "#7AB55C", description: "Boutiques en ligne à fort taux de conversion" },
      { id: "stripe", name: "Stripe", category: "Business", color: "#635BFF", description: "Facturation SaaS & abonnements sécurisés" },
      { id: "paypal", name: "PayPal", category: "Business", color: "#00457C", description: "Passerelle de paiement internationale" },
      { id: "phantom", name: "Phantom", category: "Business", color: "#8E75FF", description: "Transactions crypto & Web3" },
      { id: "notion", name: "Notion", category: "Business", color: "#000000", description: "Second cerveau, documentation & CRM" },
    ] as ToolItem[],

    // Groupe séparé : Stack Technique
    techStack: [
      { id: "nextjs", name: "Next.js", category: "Stack Technique", color: "#000000", description: "Framework React App Router full-stack" },
      { id: "typescript", name: "TypeScript", category: "Stack Technique", color: "#3178C6", description: "Typage statique & robustesse logicielle" },
      { id: "tailwind", name: "Tailwind CSS", category: "Stack Technique", color: "#06B6D4", description: "Design moderne, responsive & performant" },
      { id: "supabase", name: "Supabase", category: "Stack Technique", color: "#3ECF8E", description: "PostgreSQL temps réel, Auth & Storage" },
      { id: "vercel", name: "Vercel", category: "Stack Technique", color: "#000000", description: "Déploiement Edge mondial & CI/CD instantané" },
    ] as ToolItem[],
  },

  chapters: {
    ai: {
      number: "01",
      badge: "Cœur d'expertise",
      title: "Intelligence Artificielle & Automatisation",
      highlightWords: ["Intelligence Artificielle", "Automatisation"],
      tagline: "De l'idée brute au post prêt et programmé sur 4 réseaux en 90 secondes.",
      speedMetric: "90 secondes",
      metrics: "[À REMPLACER: +30h économisées / mois]",
      description: [
        "Je conçois des pipelines autonomes qui remplacent les tâches répétitives par de la valeur pure.",
        "Workflows avancés n8n et Make connectés aux meilleurs LLMs (Claude, GPT-4o, Gemini) pour générer, enrichir et publier sans intervention humaine.",
        "Automatisation intégrale de la production de contenu et du cross-posting sur TikTok, Instagram, LinkedIn et X.",
        "Des agents IA sur-mesure capables de monitorer des opportunités et d'exécuter des flux complexes 24h/24.",
      ],
      nodes: [
        { id: "idea", label: "Idée Brute", icon: "sparkles", type: "input" },
        { id: "n8n", label: "n8n Workflow", icon: "n8n", type: "process" },
        { id: "chatgpt", label: "ChatGPT / Claude", icon: "chatgpt", type: "llm" },
        { id: "tiktok", label: "TikTok", icon: "tiktok", type: "output" },
        { id: "instagram", label: "Instagram", icon: "instagram", type: "output" },
        { id: "linkedin", label: "LinkedIn", icon: "linkedin", type: "output" },
        { id: "x", label: "X (Twitter)", icon: "x", type: "output" },
      ],
      workflowDemo: {
        realMedia: null as string | null, // Si renseigné (ex. "/videos/mon-vrai-workflow.mp4" ou "/images/mon-workflow.webp"), s'affiche à la place
        disclaimer: "Exemple illustratif • Pipeline réel déployé avec n8n & Claude",
        note: {
          appTitle: "Notes",
          folder: "Vidéos & Drones",
          date: "Aujourd'hui à 09:41",
          lines: [
            "Idée post : Comment cartographier 45 hectares de vignobles en 12 minutes chrono avec un drone 4K.",
            "Pipeline IA : photogrammétrie + analyse foliaire automatique par computer vision.",
            "Résultat pour le vigneron : rapport phytosanitaire envoyé avant recharge des batteries. Montrer le avant/après détection.",
          ],
        },
        workflow: {
          name: "Omnichannel Content Pipeline v2.4",
          status: "Actif",
          triggerNode: {
            id: "trigger",
            name: "Webhook Mobile Note",
            sublabel: "Écoute note audio & texte",
            logo: "n8n",
            duration: "0.2s",
          },
          llmNode: {
            id: "claude",
            name: "Claude",
            sublabel: "Structuration & 4 angles",
            logo: "claude",
            duration: "0.9s",
          },
          processNode: {
            id: "process",
            name: "Format & Media Engine",
            sublabel: "Adaptation 9:16, 16:9, carrousels",
            logo: "codex",
            duration: "0.4s",
          },
          branches: [
            {
              id: "linkedin",
              name: "LinkedIn API",
              sublabel: "Post B2B & carrousel",
              logo: "linkedin",
              duration: "0.5s",
            },
            {
              id: "instagram",
              name: "Instagram Graph API",
              sublabel: "Reels & carrousel photo",
              logo: "instagram",
              duration: "0.6s",
            },
            {
              id: "tiktok",
              name: "TikTok Content API",
              sublabel: "Format vertical 9:16",
              logo: "tiktok",
              duration: "0.8s",
            },
            {
              id: "x",
              name: "X API v2",
              sublabel: "Thread & visuels",
              logo: "x",
              duration: "0.3s",
            },
          ],
          logs: [
            "✓ 09:41:02 • Déclencheur reçu via Webhook Mobile",
            "✓ 09:41:03 • Structuration & 4 angles éditoriaux générés par Claude",
            "✓ 09:41:04 • Visuels & formats verticaux 9:16 générés et vérifiés",
            "✓ 09:41:05 • 4 publications programmées et synchronisées avec succès",
          ],
        },
        author: {
          name: "Laurentin",
          handle: "@laurentin_tech",
          title: "Télépilote de drone certifié • SaaS & IA Builder",
          avatar: "/images/ai/avatar-laurentin.webp",
        },
        posts: {
          linkedin: {
            network: "LinkedIn",
            badge: "Post B2B",
            publishedTime: "Publié il y a 1 min",
            text: "45 hectares de vignobles cartographiés en 12 minutes chrono. 🚁🍇\n\nGrâce à la photogrammétrie par drone et un pipeline d'analyse IA, le vigneron reçoit son bilan foliaire avant même que les premières batteries ne soient rechargées.\n\nCe n'est plus du futur : c'est notre protocole de production au quotidien.",
            image: "/images/ai/post-linkedin.webp",
            likes: "142",
            comments: "28",
            reposts: "14",
          },
          instagram: {
            network: "Instagram",
            badge: "Reel / Post",
            publishedTime: "Publié il y a 1 min",
            text: "Du vol autonome à la cartographie agronomique en 12 minutes. L'alliance de la 4K aérienne et de l'IA pour valoriser nos terroirs. 🚁✨",
            image: "/images/ai/post-instagram.webp",
            likes: "389",
            comments: "42",
          },
          tiktok: {
            network: "TikTok",
            badge: "9:16 Vertical",
            publishedTime: "Il y a 1 min",
            text: "POV : tu cartographies 45 hectares de vignobles avec ton drone et l'IA analyse les parcelles en direct 🤯🍇 #drone #ia #tech #entrepreneur",
            image: "/images/ai/post-tiktok.webp",
            musicTitle: "Laurentin • Original Sound - Cyber Drone",
            likes: "2.4k",
            comments: "156",
            saves: "412",
            shares: "89",
          },
          x: {
            network: "X (Twitter)",
            badge: "Thread",
            publishedTime: "1 min",
            text: "Vol drone terminé à 09:30.\nRapport d'analyse foliaire IA envoyé à l'exploitant à 09:42.\n\nZéro saisie manuelle. 100% automatisé avec n8n et Claude. 🧵👇",
            image: "/images/ai/post-x.webp",
            retweets: "38",
            quotes: "9",
            likes: "284",
            views: "14.2k",
          },
        },
      },
      images: {
        nodes: "/images/ai/workflow-nodes.webp",
        robotHand: "/images/ai/robot-hand.webp",
        feed1: "/images/ai/phone-posts-1.webp",
        feed2: "/images/ai/phone-posts-2.webp",
        sphere: "/images/ai/network-sphere.webp",
      },
      placeholder: true,
    },

    saas: {
      number: "02",
      badge: "SaaS & Build",
      title: "SaaS & Développement Assisté par IA",
      highlightWords: ["SaaS", "Développement"],
      tagline: "Projet phare : CertiDrone, copilote IA des télépilotes professionnels.",
      statusMetric: "En cours de lancement",
      complianceMetric: "[À REMPLACER: Temps de conformité divisé par 4]",
      description: [
        "Le 'vibe coding' poussé à son paroxysme : concevoir des applications web et logicielles complètes en quelques jours plutôt qu'en plusieurs mois.",
        "Projet phare : CertiDrone, une solution SaaS conçue pour les télépilotes, automatisant la préparation de mission, la conformité réglementaire DGAC et les déclarations de vol grâce à l'IA.",
        "Développement full-stack moderne : Next.js App Router, bases Supabase, auth sécurisée et intégration Stripe pour les abonnements.",
        "Conception orientée rentabilité et time-to-market immédiat.",
      ],
      panels: [
        { title: "Plan de vol IA", metric: "Optimisé S1/S2/S3", image: "/images/saas/panel-flightplan.webp" },
        { title: "Météo & Espace aérien", metric: "Temps réel", image: "/images/saas/panel-weather.webp" },
        { title: "Conformité DGAC", metric: "100% AlphaTango", image: "/images/saas/panel-compliance.webp" },
      ],
      images: {
        dashboard: "/images/saas/certidron-dashboard.webp",
        laptop: "/images/saas/laptop-code.webp",
      },
      placeholder: true,
    },

    lunor: {
      number: "03",
      badge: "E-Commerce & Joaillerie",
      title: "E-Commerce & Marque Lunor",
      highlightWords: ["E-Commerce", "Lunor"],
      brandName: "Lunor",
      revenueMetric: "[À REMPLACER: +120k€ générés]",
      conversionMetric: "[À REMPLACER: 3.8% de conversion]",
      tagline: "Du design du packaging aux tunnels d'achat ultra-fluides sur Shopify.",
      description: [
        "Lancer et faire croître des marques directes au consommateur (D2C) avec une exigence visuelle digne du luxe.",
        "Création intégrale de la marque de bijoux Lunor : identité visuelle raffinée, storytelling, boutique Shopify hautement optimisée pour le taux de conversion.",
        "Automatisations des stocks, des e-mails transactionnels et du support client pour une gestion fluide.",
        "Maîtrise des leviers d'acquisition payants (Meta Ads, TikTok Ads) et du marketing d'influence.",
      ],
      images: {
        ring: "/images/lunor/ring-silk.webp",
        necklace: "/images/lunor/necklace-cream.webp",
        earrings: "/images/lunor/earrings-macro.webp",
        packaging: "/images/lunor/packaging-luxury.webp",
        model: "/images/lunor/model-editorial.webp",
        shopify: "/images/lunor/shopify-store.webp",
      },
      placeholder: true,
    },

    drone: {
      number: "04",
      badge: "Air & Image Aérienne",
      title: "Drone & Image Aérienne Certifiée",
      highlightWords: ["Drone", "Image Aérienne"],
      hoursMetric: "[À REMPLACER: 100h+ de vol]",
      certification: "[À REMPLACER: 100% DGAC]",
      tagline: "Des angles inédits et une stabilité absolue pour magnifier n'importe quel domaine.",
      description: [
        "Télépilote de drone professionnel certifié par la DGAC (Direction Générale de l'Aviation Civile).",
        "Captation photo et vidéo 4K cinématique pour l'immobilier de prestige, le tourisme, les événements et les suivis de chantiers.",
        "Maîtrise totale des scénarios de vol réglementaires S1, S2, S3 en milieu urbain et naturel.",
        "Rendu couleur soigné avec étalonnage professionnel pour donner un souffle spectaculaire à chaque prise.",
      ],
      hud: {
        altitude: "ALT: 120m AGL",
        gps: "48°51'24\" N 2°21'07\" E",
        battery: "BAT: 94%",
        camera: "4K DCI • 60 FPS • D-LOG",
        shutter: "1/120s • ISO 100",
      },
      gallery: [
        { title: "Château & Vignobles", location: "Bordeaux", tag: "S3 Urbain • 4K", image: "/images/drone/chateau-vineyard.webp" },
        { title: "Villa d'Exception", location: "Côte d'Azur", tag: "S1 • 60fps", image: "/images/drone/villa-riviera.webp" },
        { title: "Suivi de Chantier", location: "Île-de-France", tag: "Orthophoto", image: "/images/drone/aerial-ortho.webp" },
        { title: "Falaise & Couchant", location: "Normandie", tag: "Golden Hour", image: "/images/drone/coast-sunset.webp" },
        { title: "Forêt & Brume", location: "Vosges", tag: "Cinématique", image: "/images/drone/forest-mist.webp" },
        { title: "Perspective Urbaine", location: "Paris", tag: "S3 • Autorisé", image: "/images/drone/city-topdown.webp" },
      ],
      images: {
        hero: "/images/drone/drone-hero.webp",
        flight: "/images/drone/drone-flight.webp",
      },
      placeholder: true,
    },

    content: {
      number: "05",
      badge: "Post-Production",
      title: "Création de Contenu & Montage Vidéo",
      highlightWords: ["Création de Contenu", "Montage Vidéo"],
      viewsMetric: "[À REMPLACER: 2.5M+ vues cumulées]",
      retentionMetric: "[À REMPLACER: 85% de rétention à 3s]",
      tagline: "Rythme millimétré, sound design immersif et storytelling percutant.",
      description: [
        "La vidéo est le médium roi de la conversion et de la mémorisation.",
        "Montage dynamique de formats courts percutants (Reels, TikTok, Shorts) sur CapCut et DaVinci Resolve.",
        "Intégration d'effets visuels, de sound design captivant, de sous-titres dynamiques et de transitions chirurgicales.",
        "Stratégie de rétention pour captiver l'attention dès les 3 premières secondes.",
      ],
      tracks: [
        { name: "Piste A (Caméra principale)", color: "bg-blue-500" },
        { name: "Piste B (B-Rolls 4K & Drone)", color: "bg-emerald-500" },
        { name: "FX & Sound Design immersif", color: "bg-rose-500" },
        { name: "Sous-titres dynamiques IA", color: "bg-amber-500" },
      ],
      images: {
        timeline: "/images/content/editor-timeline.webp",
        reel1: "/images/content/phone-reel-1.webp",
        reel2: "/images/content/phone-reel-2.webp",
        colorGrading: "/images/content/color-grading.webp",
      },
      placeholder: true,
    },
  },

  projects: [
    {
      id: "certidron",
      title: "CertiDrone",
      subtitle: "Plateforme SaaS IA pour télépilotes de drones",
      category: "SaaS & IA",
      badge: "Projet Phare",
      isFeatured: true,
      theme: "navy",
      span: "md:col-span-2",
      summary: "Automatisation complète des démarches réglementaires, dossiers de vol et vérifications météo/espace aérien pour les pilotes professionnels.",
      context: "La réglementation des vols de drone est chronophage et complexe. CertiDrone simplifie la préparation en générant les documents de vol conformes DGAC en quelques secondes grâce à l'IA.",
      toolsUsed: ["Next.js", "TypeScript", "Tailwind", "Supabase", "OpenAI API", "Stripe"],
      metrics: [
        { label: "Temps gagné", value: "[À REMPLACER: 85%]" },
        { label: "Conformité", value: "[À REMPLACER: 100% DGAC]" },
        { label: "Statut", value: "En cours de lancement" },
      ],
      tags: ["SaaS", "IA Copilot", "Next.js", "Aviation DGAC"],
      demoUrl: "https://certidrone.fr",
      coverImage: "/images/projects/certidron-cover.webp",
      placeholder: true,
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
        { label: "Ventes", value: "[À REMPLACER: +120k€]" },
      ],
      tags: ["E-Commerce", "Branding", "Shopify", "Design System"],
      demoUrl: "https://lunor-paris.com",
      coverImage: "/images/projects/lunor-cover.webp",
      placeholder: true,
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
      toolsUsed: ["n8n", "Claude", "Airtable", "Webhooks", "Canva API"],
      metrics: [
        { label: "Publications", value: "[À REMPLACER: +150/mois]" },
        { label: "Temps humain", value: "[À REMPLACER: 0 clic requis]" },
      ],
      tags: ["n8n", "Make", "IA Générative", "Social Media"],
      demoUrl: "#contact",
      coverImage: "/images/projects/autosocial-cover.webp",
      placeholder: true,
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
        { label: "Heures", value: "[À REMPLACER: 100h+ vol]" },
      ],
      tags: ["Drone", "Cinématique", "DaVinci Resolve", "Immobilier"],
      demoUrl: "#drone-showreel",
      coverImage: "/images/projects/drone-cover.webp",
      placeholder: true,
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
        value: "[À REMPLACER: 15+]",
        numberValue: 15,
        suffix: "+",
        label: "Projets digitaux conçus & livrés",
        description: "[À REMPLACER: SaaS, e-commerce, flux IA]",
        highlight: false,
      },
      {
        value: "[À REMPLACER: 4]",
        numberValue: 4,
        suffix: "",
        label: "SaaS & logiciels développés",
        description: "Dont CertiDrone, copilote IA pour télépilotes",
        highlight: true,
      },
      {
        value: "[À REMPLACER: 100h+]",
        numberValue: 100,
        suffix: "h+",
        label: "Heures de vol de drone certifiées",
        description: "Vols DGAC sans incident, en S1, S2 et S3",
        highlight: false,
      },
      {
        value: "[À REMPLACER: 30h+]",
        numberValue: 30,
        suffix: "h/sem",
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
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@laurentin.design",
    socials: [
      { name: "LinkedIn", url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/laurentin", handle: "Laurentin" },
      { name: "Instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/laurentin", handle: "@laurentin" },
      { name: "X (Twitter)", url: process.env.NEXT_PUBLIC_X_URL || "https://x.com/laurentin", handle: "@laurentin" },
      { name: "YouTube", url: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@laurentin", handle: "Laurentin" },
    ],
    availabilityNote: "Disponible pour missions ponctuelles & collaborations stratégiques",
    location: "France • Déplacements possibles & Remote",
    cvUrl: process.env.NEXT_PUBLIC_CV_URL || "",
  },

  footer: {
    giantName: "LAURENTIN",
    copyright: "© 2026 Laurentin. Tous droits réservés.",
    mentions: "Conçu avec passion, codé au millimètre.",
  },
};
