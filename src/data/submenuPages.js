import {
  BadgeDollarSign,
  Briefcase,
  Compass,
  FileText,
  Hammer,
  Landmark,
  Newspaper,
  Pickaxe,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

export const submenuPages = [
  {
    path: "/abi/nos-actualites",
    category: "abi",
    title: "Nos actualites",
    topic: "la veille ABI et les actualites utiles",
    heroEyebrow: "Actualites ABI",
    heroIcon: Newspaper,
    heroTitle: "Les informations ABI qui comptent pour vos decisions.",
    heroDescription:
      "Lancements, nouveautes, conseils et annonces utiles dans un espace plus lisible.",
    heroDescriptionSecondary:
      "L'objectif est d'aider a comprendre plus vite ce qui peut avoir un impact sur vos projets.",
    primaryLabel: "Voir les opportunites",
    primaryTo: "/investment",
    secondaryLabel: "Voir les biens",
    secondaryTo: "/properties",
    highlightTitle:
      "Des contenus relies aux vrais parcours du site public et pas a une simple vitrine d'information.",
  },
  {
    path: "/abi/nos-intervenants",
    category: "abi",
    title: "Nos intervenants",
    topic: "les intervenants et les expertises mobilisees",
    heroEyebrow: "ABI Experts",
    heroIcon: UserRound,
    heroTitle: "Des intervenants fiables pour cadrer chaque projet.",
    heroDescription:
      "Commercial, technique, juridique ou accompagnement terrain: ABI structure les bons relais.",
    heroDescriptionSecondary:
      "Vous savez mieux qui intervient, pourquoi et a quel moment du parcours.",
    primaryLabel: "Devenir partenaire",
    primaryTo: "/partnership",
    secondaryLabel: "Qui sommes-nous",
    secondaryTo: "/abi/qui-sommes-nous",
    highlightTitle:
      "Une chaine d'expertise plus claire pour mieux piloter l'acquisition, la construction et l'investissement.",
  },
  {
    path: "/abi/nos-agences",
    category: "abi",
    title: "Nos agences",
    topic: "le reseau d'agences ABI",
    heroEyebrow: "Reseau ABI",
    heroIcon: Landmark,
    heroTitle: "Des agences de proximite pour garder vos projets sous controle.",
    heroDescription:
      "Le digital reste central, mais la presence locale permet une execution plus concrete.",
    heroDescriptionSecondary:
      "Vous retrouvez des points de contact utiles pour orienter, verifier et avancer.",
    primaryLabel: "Trouver un bien",
    primaryTo: "/properties",
    secondaryLabel: "Qui sommes-nous",
    secondaryTo: "/abi/qui-sommes-nous",
    highlightTitle:
      "Des agences pensees comme prolongement du service ABI, pas comme une rupture dans l'experience.",
  },
  {
    path: "/construction/mon-projet-sur-mesure",
    category: "construction",
    title: "Mon projet sur mesure",
    topic: "un projet de construction sur mesure",
    heroEyebrow: "Construction sur mesure",
    heroIcon: Pickaxe,
    heroTitle: "Un projet pense selon votre budget, vos usages et votre rythme.",
    heroDescription:
      "ABI aide a transformer une intention de construire en base plus lisible et plus defendable.",
    heroDescriptionSecondary:
      "Le sur-mesure sert a cadrer, pas a compliquer.",
    primaryLabel: "Voir les offres",
    primaryTo: "/construction",
    secondaryLabel: "Nos plans",
    secondaryTo: "/construction/nos-plans",
    highlightTitle:
      "Une meilleure coherence entre envie, faisabilite, budget et execution chantier.",
  },
  {
    path: "/construction/nos-plans",
    category: "construction",
    title: "Nos plans",
    topic: "les plans et bases de conception ABI",
    heroEyebrow: "Plans ABI",
    heroIcon: FileText,
    heroTitle: "Des plans plus lisibles pour lancer une construction sur de meilleurs reperes.",
    heroDescription:
      "Vous comparez plus vite les volumes, usages et configurations sans repartir de zero.",
    heroDescriptionSecondary:
      "Les plans servent de base concrete pour mieux arbitrer.",
    primaryLabel: "Voir les modeles",
    primaryTo: "/house-models",
    secondaryLabel: "Projet sur mesure",
    secondaryTo: "/construction/mon-projet-sur-mesure",
    highlightTitle:
      "Une base de conception utile pour accelerer les bons choix sans casser la coherence du projet.",
  },
  {
    path: "/construction/achever-ma-construction",
    category: "construction",
    title: "Achever ma construction",
    topic: "la reprise et la finalisation d'une construction",
    heroEyebrow: "Achever la construction",
    heroIcon: ShieldCheck,
    heroTitle: "Un accompagnement plus net pour finaliser ou reprendre un chantier.",
    heroDescription:
      "ABI aide a remettre de l'ordre dans un projet deja lance mais encore incomplet.",
    heroDescriptionSecondary:
      "Le chantier redevient pilotable au lieu de rester subi.",
    primaryLabel: "Finir ma construction",
    primaryTo: "/construction/achever/finir-ma-construction",
    secondaryLabel: "Renovation",
    secondaryTo: "/construction/achever/renovation-modification",
    highlightTitle:
      "Des solutions pour finir, corriger ou transformer sans repartir dans le flou.",
  },
  {
    path: "/construction/offres/terrain-constructible",
    category: "construction",
    title: "Terrain constructible",
    topic: "le choix d'un terrain constructible",
    heroEyebrow: "Terrain constructible",
    heroIcon: Compass,
    heroTitle: "Des terrains identifiables plus vite pour lancer un projet plus proprement.",
    heroDescription:
      "ABI aide a lire le potentiel d'un terrain avant de pousser la decision trop loin.",
    heroDescriptionSecondary:
      "Zone, accessibilite et projection du projet sont regardees ensemble.",
    primaryLabel: "Voir les offres",
    primaryTo: "/construction",
    secondaryLabel: "Projet sur mesure",
    secondaryTo: "/construction/mon-projet-sur-mesure",
    highlightTitle:
      "Un terrain mieux choisi facilite toutes les etapes suivantes du projet de construction.",
  },
  {
    path: "/construction/offres/maison-terrain",
    category: "construction",
    title: "Maison + Terrain",
    topic: "une formule maison plus terrain",
    heroEyebrow: "Maison + Terrain",
    heroIcon: Hammer,
    heroTitle: "Une formule plus lisible pour avancer sur un projet deja mieux structure.",
    heroDescription:
      "Le terrain et la maison sont relus comme un ensemble coherent des le depart.",
    heroDescriptionSecondary:
      "Cela reduit les ecarts entre intention, faisabilite et execution.",
    primaryLabel: "Voir les offres",
    primaryTo: "/construction",
    secondaryLabel: "Voir les modeles",
    secondaryTo: "/house-models",
    highlightTitle:
      "Un projet plus fluide quand l'emplacement et le bati avancent ensemble dans la meme logique.",
  },
  {
    path: "/construction/offres/programme-en-cours",
    category: "construction",
    title: "Programme en cours",
    topic: "les programmes de construction en cours",
    heroEyebrow: "Programme en cours",
    heroIcon: Hammer,
    heroTitle: "Suivre des programmes en cours avec une lecture plus claire du potentiel.",
    heroDescription:
      "ABI met en contexte l'avancement, les points d'attention et la maturite du programme.",
    heroDescriptionSecondary:
      "Vous lisez mieux ce qui est deja fait, ce qui reste a faire et ce que cela implique.",
    primaryLabel: "Voir les projets",
    primaryTo: "/construction",
    secondaryLabel: "Achever ma construction",
    secondaryTo: "/construction/achever-ma-construction",
    highlightTitle:
      "Un programme se lit mieux quand l'avancement et les conditions sont relies de maniere concrete.",
  },
  {
    path: "/construction/achever/finir-ma-construction",
    category: "construction",
    title: "Finir ma construction",
    topic: "la finition d'un chantier",
    heroEyebrow: "Fin de chantier",
    heroIcon: Hammer,
    heroTitle: "Finaliser un chantier avec plus de methode et moins de fatigue decisionnelle.",
    heroDescription:
      "ABI aide a transformer le reste a faire en plan d'action plus clair.",
    heroDescriptionSecondary:
      "Le but est de sortir d'un chantier suspendu pour aller vers la livraison.",
    primaryLabel: "Achever ma construction",
    primaryTo: "/construction/achever-ma-construction",
    secondaryLabel: "Voir les offres",
    secondaryTo: "/construction",
    highlightTitle:
      "Quand le chantier est deja avance, le vrai enjeu est souvent de terminer proprement avec les bons arbitrages.",
  },
  {
    path: "/construction/achever/renovation-modification",
    category: "construction",
    title: "Renovation & Modification",
    topic: "la renovation et la modification d'un bati",
    heroEyebrow: "Renovation & Modification",
    heroIcon: Pickaxe,
    heroTitle: "Repenser, corriger ou transformer un bati avec plus de logique.",
    heroDescription:
      "ABI aide a structurer les interventions sans perdre la coherence d'ensemble.",
    heroDescriptionSecondary:
      "L'objectif est de mieux valoriser l'existant tout en maitrisant les arbitrages.",
    primaryLabel: "Voir les solutions",
    primaryTo: "/construction/achever-ma-construction",
    secondaryLabel: "Voir les biens",
    secondaryTo: "/properties",
    highlightTitle:
      "Une renovation bien cadree peut creer plus de valeur qu'une reprise confuse et mal sequencee.",
  },
  {
    path: "/investment/je-veux-investir",
    category: "investment",
    title: "Je veux investir",
    topic: "l'entree dans un parcours d'investissement",
    heroEyebrow: "Investir avec ABI",
    heroIcon: Briefcase,
    heroTitle: "Un parcours plus lisible pour passer de l'intention a l'action.",
    heroDescription:
      "ABI clarifie le pourquoi, le comment et le niveau d'engagement adapte a votre profil.",
    heroDescriptionSecondary:
      "Vous avancez avec une strategie plus simple a comprendre et a assumer.",
    primaryLabel: "Voir les opportunites",
    primaryTo: "/investment",
    secondaryLabel: "Pourquoi investir",
    secondaryTo: "/investment/je-veux-investir/pourquoi-investir",
    highlightTitle:
      "Investir avec plus de clarte, moins de bruit et des choix mieux cadres par rapport a votre objectif.",
  },
  {
    path: "/investment/ou-investir",
    category: "investment",
    title: "Ou investir",
    topic: "le choix des zones et contextes d'investissement",
    heroEyebrow: "Ou investir",
    heroIcon: Compass,
    heroTitle: "Lire les zones et les contextes avant de choisir une opportunite.",
    heroDescription:
      "ABI aide a relier un investissement a un territoire, un usage et un potentiel reel.",
    heroDescriptionSecondary:
      "Le bon emplacement depend autant de votre objectif que du marche local.",
    primaryLabel: "Nos conseils",
    primaryTo: "/investment/ou-investir/nos-conseils",
    secondaryLabel: "Meilleurs investissements",
    secondaryTo: "/investment/ou-investir/meilleurs-investissements",
    highlightTitle:
      "Le lieu compte autant que l'offre pour la qualite d'un investissement defendable dans le temps.",
  },
  {
    path: "/investment/je-veux-investir/pourquoi-investir",
    category: "investment",
    title: "Pourquoi investir",
    topic: "les raisons et objectifs d'un investissement",
    heroEyebrow: "Pourquoi investir",
    heroIcon: BadgeDollarSign,
    heroTitle: "Comprendre pourquoi un investissement peut servir une vraie strategie.",
    heroDescription:
      "ABI remet l'investissement dans une logique de projection, de rendement ou de diversification.",
    heroDescriptionSecondary:
      "Le premier sujet n'est pas le produit. C'est la raison d'investir.",
    primaryLabel: "Je veux investir",
    primaryTo: "/investment/je-veux-investir",
    secondaryLabel: "Voir les opportunites",
    secondaryTo: "/investment",
    highlightTitle:
      "Le pourquoi reste la base qui organise l'offre, l'horizon et la tolerance au risque.",
  },
  {
    path: "/investment/je-veux-investir/investir-avec-abi",
    category: "investment",
    title: "Investir avec ABI",
    topic: "la methode ABI pour investir",
    heroEyebrow: "Methode ABI",
    heroIcon: Briefcase,
    heroTitle: "Une methode ABI pour comparer, comprendre et choisir plus proprement.",
    heroDescription:
      "La plateforme structure les opportunites pour les rendre plus accessibles a la decision.",
    heroDescriptionSecondary:
      "Vous gardez une lecture plus nette entre le projet, l'offre et votre strategie.",
    primaryLabel: "Voir les investissements",
    primaryTo: "/investment",
    secondaryLabel: "Pourquoi investir",
    secondaryTo: "/investment/je-veux-investir/pourquoi-investir",
    highlightTitle:
      "Investir avec une plateforme qui cherche a rendre la decision plus nette, plus lisible et plus coherente.",
  },
  {
    path: "/investment/je-veux-investir/premier-investissement",
    category: "investment",
    title: "Faire mon premier investissement",
    topic: "le premier investissement",
    heroEyebrow: "Premier investissement",
    heroIcon: WalletCards,
    heroTitle: "Faire un premier pas avec une lecture plus simple des enjeux.",
    heroDescription:
      "ABI aide a rendre le premier investissement plus compréhensible et moins intimidant.",
    heroDescriptionSecondary:
      "Le but est d'entrer avec une base claire, pas avec une pression inutile.",
    primaryLabel: "Je veux investir",
    primaryTo: "/investment/je-veux-investir",
    secondaryLabel: "Investir avec ABI",
    secondaryTo: "/investment/je-veux-investir/investir-avec-abi",
    highlightTitle:
      "Le premier investissement doit d'abord etre compris pour etre bien assume sur la duree.",
  },
  {
    path: "/investment/ou-investir/nos-conseils",
    category: "investment",
    title: "Nos conseils",
    topic: "les conseils ABI pour mieux investir",
    heroEyebrow: "Conseils ABI",
    heroIcon: FileText,
    heroTitle: "Des conseils utiles pour lire les opportunites avec plus de discernement.",
    heroDescription:
      "ABI partage des repères pratiques pour clarifier les choix d'investissement.",
    heroDescriptionSecondary:
      "L'objectif n'est pas de surcharger. Il est d'aider a mieux trier.",
    primaryLabel: "Ou investir",
    primaryTo: "/investment/ou-investir",
    secondaryLabel: "Meilleurs investissements",
    secondaryTo: "/investment/ou-investir/meilleurs-investissements",
    highlightTitle:
      "Un bon conseil sert a clarifier l'action, pas a compliquer l'analyse des opportunites.",
  },
  {
    path: "/investment/ou-investir/meilleurs-investissements",
    category: "investment",
    title: "Nos meilleurs investissements",
    topic: "la selection ABI des meilleurs investissements",
    heroEyebrow: "Selection ABI",
    heroIcon: BadgeDollarSign,
    heroTitle: "Des opportunites mieux qualifiees pour concentrer votre attention la ou elle compte.",
    heroDescription:
      "ABI met en avant les opportunites les plus coherentes selon leur potentiel et leur lisibilite.",
    heroDescriptionSecondary:
      "Le meilleur investissement reste celui qui est defendable dans votre propre cadre de decision.",
    primaryLabel: "Voir les offres",
    primaryTo: "/investment",
    secondaryLabel: "Nos conseils",
    secondaryTo: "/investment/ou-investir/nos-conseils",
    highlightTitle:
      "Mieux filtrer les projets permet de consacrer plus de temps aux opportunites qui meritent vraiment l'analyse.",
  },
];
