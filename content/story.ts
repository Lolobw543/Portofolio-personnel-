/**
 * SOURCE UNIQUE DE VÉRITÉ — LE FILM NARRATIF DE LAURENTIN
 * 
 * Ce fichier structure toute l'histoire, les actes, les repères temporels,
 * les phrases de narration (voix-off au scroll) et les métadonnées du film.
 * Règle d'or : aucun fait inventé. Tout élément non confirmé porte [À COMPLÉTER]
 * et le flag draft: true pour être balisé visuellement.
 */

export interface NarrativeSentence {
  text: string;
  highlightWords?: string[];
  draft?: boolean;
  missingInfo?: string;
}

export interface FilmVisual {
  type: "fullscreen" | "polaroid" | "split" | "filmstrip" | "workflow" | "dossier" | "mockup";
  src: string;
  alt: string;
  caption?: string;
  placeholder?: boolean;
}

export interface StoryAct {
  id: string;
  actNumber: number;
  timecode: string; // Ex: "00:00:15:00"
  tag: string; // "Chapitre 1"
  title: string; // "Le ciel"
  ghostWord: string; // "SKYLINE", "SOFTWARE", "CERTIDRON"...
  lead: string;
  sentences: NarrativeSentence[];
  transitionHook: string; // Accroche vers l'acte suivant
  visuals: FilmVisual[];
  metaBadge?: string;
}

export interface CandidateQuality {
  title: string;
  origin: string;
  description: string;
}

export interface StoryContent {
  meta: {
    title: string;
    description: string;
    author: string;
    location: string;
    department: string;
    cvUrl: string;
  };
  player: {
    totalDuration: string;
    totalActs: number;
  };
  acts: {
    act0: StoryAct;
    act1: StoryAct;
    act2: StoryAct;
    act3: StoryAct;
    act4: StoryAct;
    act5: StoryAct;
    act6: StoryAct;
    act7: StoryAct;
    act8: StoryAct;
  };
  metrics: {
    flightsCount: number;
    videosCount: number;
    hoursSavedWeekly: number;
    certDate: string;
    certName: string;
    productStatus: string;
  };
  candidate: {
    locationLabel: string;
    locationDetail: string;
    qualities: CandidateQuality[];
  };
}

export const STORY_CONTENT: StoryContent = {
  meta: {
    title: "Laurentin • Du Ciel au Code — Un Récit Interactif",
    description: "Le parcours de Laurentin : télépilote professionnel de drone certifié, créateur de CertiDrone, de la marque LUNOR et de pipelines d'automatisation IA.",
    author: "Laurentin",
    location: "Auch",
    department: "32",
    cvUrl: "/cv.pdf",
  },

  player: {
    totalDuration: "00:08:45:00",
    totalActs: 9,
  },

  metrics: {
    flightsCount: 200, // ~200 vols effectués
    videosCount: 180, // ~180 vidéos montées
    hoursSavedWeekly: 15, // ~15h économisées par semaine
    certDate: "29 août 2025",
    certName: "Certificat de Télépilote Professionnel (STS-01 / STS-02)",
    productStatus: "En bêta (en attente de lancement)",
  },

  candidate: {
    locationLabel: "Auch (32)",
    locationDetail: "Gers, Occitanie • Mobilité France & Télétravail",
    qualities: [
      {
        title: "La rigueur du télépilote",
        origin: "Forge aéronautique",
        description: "En vol comme en production logicielle, l'erreur n'est pas une option. Vérifications pré-vol, respect strict des protocoles et sang-froid.",
      },
      {
        title: "La curiosité du développeur",
        origin: "Culture tech & vibe coding",
        description: "Comprendre les entrailles des systèmes, tester les derniers modèles d'IA, assembler des briques logicielles pour résoudre des problèmes concrets.",
      },
      {
        title: "L'autonomie du bâtisseur",
        origin: "Projets D2C & SaaS",
        description: "Partir d'une idée brute et la livrer en production : du design de l'interface jusqu'à l'acquisition, la distribution et l'automatisation.",
      },
    ],
  },

  acts: {
    // 0. OUVERTURE
    act0: {
      id: "acte-00",
      actNumber: 0,
      timecode: "00:00:00:00",
      tag: "Ouverture",
      title: "Moi, c'est Laurentin",
      ghostWord: "ORIGIN",
      lead: "Depuis tout petit, deux choses me fascinent : les drones et l'informatique.",
      metaBadge: "Télépilote de drone certifié • Builder",
      sentences: [
        {
          text: "Moi, c'est Laurentin.",
          highlightWords: ["Laurentin"],
        },
        {
          text: "Depuis l'enfance, deux passions occupent mon esprit : le ciel et le code.",
          highlightWords: ["ciel", "code"],
        },
        {
          text: "Deux univers en apparence opposés, qui ne demandaient qu'à se rejoindre.",
          highlightWords: ["rejoindre"],
        },
      ],
      transitionHook: "Tout commence par un premier regard vers le haut...",
      visuals: [
        {
          type: "fullscreen",
          src: "/me.jpg",
          alt: "Portrait de Laurentin",
          caption: "Laurentin • Télépilote & Créateur",
          placeholder: false,
        },
      ],
    },

    // 1. LE CIEL
    act1: {
      id: "acte-01",
      actNumber: 1,
      timecode: "00:01:05:00",
      tag: "Chapitre 1",
      title: "Le Ciel",
      ghostWord: "SKYLINE",
      lead: "La fascination du vol. Le bruit caractéristique des hélices, l'horizon qui bascule.",
      sentences: [
        {
          text: "Mon premier drone était un jouet qu'on m'a offert étant enfant.",
          highlightWords: ["premier drone", "jouet"],
        },
        {
          text: "Une simple manette entre les mains, et le sol s'éloignait.",
          highlightWords: ["manette", "sol s'éloignait"],
        },
        {
          text: "Ce jour-là, le déclic s'est produit : voir le monde d'en haut n'était plus un jeu, c'était une vocation.",
          highlightWords: ["déclic", "vocation"],
        },
        {
          text: "Apprendre à lire le vent, anticiper la météo, respecter la trajectoire.",
          highlightWords: ["lire le vent", "trajectoire"],
        },
      ],
      transitionHook: "Mais quand la nuit tombait, une autre lumière m'attirait...",
      visuals: [
        {
          type: "polaroid",
          src: "/images/story/sky-silhouette.webp",
          alt: "Silhouette d'enfant regardant le ciel",
          caption: "Le premier regard vers l'horizon",
          placeholder: true,
        },
        {
          type: "polaroid",
          src: "/images/story/sky-first-drone.webp",
          alt: "Premier drone au crépuscule",
          caption: "L'apprentissage du vol",
          placeholder: true,
        },
        {
          type: "polaroid",
          src: "/images/story/sky-field-remote.webp",
          alt: "Télécommande et champ",
          caption: "Précision et repères au sol",
          placeholder: true,
        },
      ],
    },

    // 2. LE CODE
    act2: {
      id: "acte-02",
      actNumber: 2,
      timecode: "00:02:18:00",
      tag: "Chapitre 2",
      title: "Le Code",
      ghostWord: "SOFTWARE",
      lead: "La lumière bleutée d'un écran dans le noir. L'envie irrépressible de comprendre comment ça marche.",
      sentences: [
        {
          text: "J'ai toujours aimé l'informatique. Pas seulement pour consommer des outils, mais pour les démonter.",
          highlightWords: ["l'informatique", "démonter"],
        },
        {
          text: "Comprendre ce qui se cache sous l'interface, tester, casser, réparer.",
          highlightWords: ["tester", "casser", "réparer"],
        },
        {
          text: "Le terminal devient un terrain de jeu où quelques lignes de code créent une mécanique autonome.",
          highlightWords: ["terminal", "mécanique autonome"],
        },
        {
          text: "Pendant des années, le ciel était dehors et le code était dedans.",
          highlightWords: ["dehors", "dedans"],
        },
      ],
      transitionHook: "Deux mondes parallèles. Jusqu'au jour où ils sont entrés en collision...",
      visuals: [
        {
          type: "polaroid",
          src: "/images/story/code-night-room.webp",
          alt: "Écran d'ordinateur allumé la nuit",
          caption: "La curiosité des premières nuits de code",
          placeholder: true,
        },
        {
          type: "polaroid",
          src: "/images/story/code-screen.webp",
          alt: "Lignes de code et terminal",
          caption: "Comprendre les rouages logiciels",
          placeholder: true,
        },
        {
          type: "polaroid",
          src: "/images/story/code-electronics.webp",
          alt: "Composants et bureau tech",
          caption: "Assembler et expérimenter",
          placeholder: true,
        },
      ],
    },

    // 3. QUAND TOUT SE REJOINT
    act3: {
      id: "acte-03",
      actNumber: 3,
      timecode: "00:03:30:00",
      tag: "Chapitre 3",
      title: "Quand Tout Se Rejoint",
      ghostWord: "CERTIDRON",
      lead: "Le 29 août 2025, j'obtiens mon certificat de télépilote professionnel de drone (STS-01 / STS-02). Et sur le terrain, le déclic s'impose.",
      sentences: [
        {
          text: "Le 29 août 2025, je deviens officiellement télépilote professionnel certifié (scénarios STS-01 & STS-02).",
          highlightWords: ["29 août 2025", "télépilote professionnel certifié", "STS-01", "STS-02"],
        },
        {
          text: "Face aux contraintes du terrain, un constat saute aux yeux : la préparation manuelle des vols est lourde et répétitive.",
          highlightWords: ["contraintes du terrain", "lourde et répétitive"],
        },
        {
          text: "Une évidence s'impose : pourquoi ne pas automatiser directement depuis son ordinateur l'ensemble de ses missions de vol pour le lendemain ?",
          highlightWords: ["automatiser", "ordinateur", "missions de vol"],
        },
        {
          text: "C'est ainsi qu'est né CertiDrone : le copilote SaaS propulsé par l'IA pour planifier, sécuriser et simplifier chaque vol.",
          highlightWords: ["CertiDrone", "copilote SaaS", "IA"],
        },
        {
          text: "Aujourd'hui en phase bêta, en attente de lancement officiel.",
          highlightWords: ["phase bêta", "lancement"],
        },
      ],
      transitionHook: "Mais la passion de construire ne s'arrête pas au ciel...",
      visuals: [
        {
          type: "split",
          src: "/images/story/split-sky.webp",
          alt: "Le ciel et le drone",
          caption: "Le ciel : la rigueur aéronautique",
          placeholder: false,
        },
        {
          type: "split",
          src: "/images/story/split-code.webp",
          alt: "Le code et le terminal",
          caption: "Le code : la puissance logicielle",
          placeholder: false,
        },
        {
          type: "mockup",
          src: "/images/saas/certidron-dashboard.webp",
          alt: "Interface officielle de CertiDrone",
          caption: "CertiDrone • Actuellement en bêta",
          placeholder: false,
        },
      ],
    },

    // 4. CONSTRUIRE
    act4: {
      id: "acte-04",
      actNumber: 4,
      timecode: "00:04:45:00",
      tag: "Chapitre 4",
      title: "Construire",
      ghostWord: "COMMERCE",
      lead: "J'ai toujours aimé les drones, l'informatique... et le commerce. Créer de vrais produits, les confronter au marché et en tirer des leçons.",
      sentences: [
        {
          text: "Au-delà du code, j'ai toujours eu une attirance viscérale pour le commerce.",
          highlightWords: ["commerce", "attirance viscérale"],
        },
        {
          text: "J'ai créé LUNOR, ma propre marque de bijoux contemporains : de l'identité visuelle à la boutique Shopify en direct.",
          highlightWords: ["LUNOR", "marque de bijoux", "Shopify"],
        },
        {
          text: "Plusieurs autres projets SaaS et boutiques e-commerce ont suivi, chacun conçu comme un laboratoire d'apprentissage.",
          highlightWords: ["SaaS", "e-commerce", "apprentissage"],
        },
        {
          text: "Ma plus grande leçon : ne jamais sous-estimer la régularité et l'impact des publications sur les réseaux sociaux.",
          highlightWords: ["ne jamais sous-estimer", "régularité", "réseaux sociaux"],
        },
      ],
      transitionHook: "Pour publier avec constance sans s'épuiser, il fallait une méthode radicale...",
      visuals: [
        {
          type: "filmstrip",
          src: "/images/projects/lunor-cover.webp",
          alt: "LUNOR Joaillerie",
          caption: "LUNOR • Marque D2C & Boutique Shopify",
          placeholder: false,
        },
        {
          type: "filmstrip",
          src: "/images/projects/certidron-cover.webp",
          alt: "CertiDrone SaaS",
          caption: "CertiDrone • SaaS d'automatisation de vol",
          placeholder: false,
        },
        {
          type: "filmstrip",
          src: "/images/projects/autosocial-cover.webp",
          alt: "AutoSocial Pipeline",
          caption: "AutoSocial • Moteur omnicanal autonome",
          placeholder: false,
        },
        {
          type: "filmstrip",
          src: "/images/projects/drone-cover.webp",
          alt: "Showreel Aérien",
          caption: "Showreel Aérien 4K • Captation & Post-production",
          placeholder: false,
        },
      ],
    },

    // 5. AUTOMATISER
    act5: {
      id: "acte-05",
      actNumber: 5,
      timecode: "00:05:55:00",
      tag: "Chapitre 5",
      title: "Automatiser",
      ghostWord: "AUTOMATION",
      lead: "Faire travailler les machines à ma place. Des pipelines autonomes pour libérer du temps et décupler la cadence.",
      sentences: [
        {
          text: "Plutôt que de répéter les mêmes gestes chaque jour, je conçois des systèmes autonomes.",
          highlightWords: ["systèmes autonomes"],
        },
        {
          text: "Workflows n8n et Make connectés à Claude 3.5 Sonnet pour transformer une note brute en 4 formats sociaux prêts à diffuser.",
          highlightWords: ["n8n", "Make", "Claude 3.5 Sonnet", "4 formats sociaux"],
        },
        {
          text: "Résultat mesuré au quotidien : environ 15 heures économisées chaque semaine sur ma production.",
          highlightWords: ["15 heures économisées", "chaque semaine"],
        },
        {
          text: "L'intelligence artificielle n'est pas un gadget : c'est un multiplicateur de force.",
          highlightWords: ["multiplicateur de force"],
        },
      ],
      transitionHook: "Ces automatisations s'appuient sur un arsenal technologique éprouvé...",
      visuals: [
        {
          type: "workflow",
          src: "/images/ai/phone-posts-1.webp",
          alt: "Pipeline n8n et Claude",
          caption: "Pipeline omnicanal autonome en production",
          placeholder: false,
        },
      ],
    },

    // 6. MA BOÎTE À OUTILS
    act6: {
      id: "acte-06",
      actNumber: 6,
      timecode: "00:06:50:00",
      tag: "Chapitre 6",
      title: "Ma Boîte à Outils",
      ghostWord: "ARSENAL",
      lead: "La palette complète que je maîtrise au quotidien pour concevoir, prototyper, piloter et automatiser en pleine autonomie.",
      sentences: [
        {
          text: "Chaque outil a une place précise dans mon flux de travail.",
          highlightWords: ["flux de travail"],
        },
        {
          text: "De la 4K D-Log dans DaVinci Resolve au vibe coding sur Cursor, en passant par l'orchestration n8n et Next.js.",
          highlightWords: ["DaVinci Resolve", "Cursor", "n8n", "Next.js"],
        },
      ],
      transitionHook: "Les outils ne valent rien sans preuves d'exécution...",
      visuals: [],
    },

    // 7. LES PREUVES
    act7: {
      id: "acte-07",
      actNumber: 7,
      timecode: "00:07:30:00",
      tag: "Chapitre 7",
      title: "Les Preuves",
      ghostWord: "PROOF",
      lead: "Des réalisations concrètes et mesurées. Pas de promesses théoriques : des heures de vol, du code livré et des médias produits.",
      sentences: [
        {
          text: "Environ 200 vols de drone réalisés depuis mes débuts, avec une rigueur absolue.",
          highlightWords: ["200 vols de drone", "rigueur absolue"],
        },
        {
          text: "Plus de 180 vidéos montées et étalonnées pour les formats courts et cinématiques.",
          highlightWords: ["180 vidéos montées", "formats courts"],
        },
        {
          text: "CertiDrone développé et stabilisé en phase bêta, prêt pour son décollage.",
          highlightWords: ["CertiDrone", "phase bêta"],
        },
        {
          text: "Une marque de joaillerie (LUNOR) construite de zéro, de l'écrin au checkout Shopify.",
          highlightWords: ["LUNOR", "de zéro", "Shopify"],
        },
      ],
      transitionHook: "L'histoire ne fait que commencer...",
      visuals: [],
    },

    // 8. LA SUITE
    act8: {
      id: "acte-08",
      actNumber: 8,
      timecode: "00:08:15:00",
      tag: "Épilogue",
      title: "Écrivons la Suite",
      ghostWord: "FUTURE",
      lead: "Basé à Auch (32) dans le Gers, ouvert aux échanges passionnants, aux défis techniques et aux collaborations d'envergure.",
      sentences: [
        {
          text: "Ce portfolio est avant tout mon carnet de bord personnel : il raconte d'où je viens et comment je construis.",
          highlightWords: ["carnet de bord personnel", "comment je construis"],
        },
        {
          text: "Basé à Auch (32 - Gers), mobile et habitué au travail à distance.",
          highlightWords: ["Auch (32)", "Gers", "travail à distance"],
        },
        {
          text: "Toujours curieux de rencontrer des équipes et des fondateurs qui partagent cette exigence du ciel et du code.",
          highlightWords: ["exigence du ciel et du code"],
        },
      ],
      transitionHook: "Fin du film. Début de la collaboration.",
      visuals: [],
    },
  },
};
